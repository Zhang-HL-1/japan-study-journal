(function(root){
 'use strict';
 const model=typeof module!=='undefined'&&module.exports?require('./github-sync-model.js'):root.JournalSyncModel;
 const BACKUP='japan-study-journal:sync-initial-backup:v1';
 const CONFIG='japan-study-journal:github-sync:v1',META='japan-study-journal:sync-state:v1',FILE='japan-study-journal-progress.json',DESK='japan-study-journal:desk:v1',PRACTICE='japan-study-journal:practice:v1';
 function gistId(value){const text=String(value||'').trim();if(!text)return '';if(/^[a-f0-9]{5,64}$/i.test(text))return text.toLowerCase();try{const u=new URL(text);if(u.protocol==='https:'&&u.hostname==='gist.github.com'&&!u.username&&!u.password){const id=u.pathname.split('/').filter(Boolean).at(-1);if(/^[a-f0-9]{5,64}$/i.test(id))return id.toLowerCase();}}catch{}throw Error('请填写有效的 Gist ID 或 gist.github.com 链接');}
 function create(options){
  const storage=options.storage,request=options.fetch,now=options.now||Date.now,notify=options.notify||(()=>{}),notifyApplied=options.applied||(()=>{}),delay=options.setTimeout||setTimeout,cancel=options.clearTimeout||clearTimeout;
  let timer=null,tail=Promise.resolve(),phase='idle',error='',generation=0,lastAttempt=0;
  const config=()=>{try{const v=JSON.parse(storage().getItem(CONFIG)||'null');return v&&typeof v.token==='string'&&v.token&&gistId(v.gistId)?v:null;}catch{return null;}};
  const status=()=>{const c=config();return {connected:!!c,owner:c?.owner||'',gistId:c?.gistId||'',gistUrl:c?'https://gist.github.com/'+c.gistId:'',lastSyncAt:c?.lastSyncAt||0,phase,error};};
  const emit=()=>notify(status());
  function saveConfig(c){storage().setItem(CONFIG,JSON.stringify(c));}
  function readMeta(){const raw=storage().getItem(META);if(!raw)return {device:(options.device||(()=>crypto.randomUUID()))(),model:model.empty(),fresh:true};const v=JSON.parse(raw);if(typeof v.device!=='string'||!/^[a-zA-Z0-9_-]{8,100}$/.test(v.device))throw Error('本地同步设置无法读取，请先导出备份');return {device:v.device,model:model.parse(JSON.stringify(v.model)),fresh:false};}
  function capture(){const meta=readMeta();const next=model.observe(meta.model,model.snapshot(storage()),meta.device,now(),meta.fresh);if(model.serialize(next)!==model.serialize(meta.model)||!storage().getItem(META))storage().setItem(META,JSON.stringify({device:meta.device,model:next}));return next;}
  function apply(incoming){
   const latest=capture(),combined=model.merge(latest,incoming),data=model.materialize(combined),s=storage();
   const practice=JSON.parse(s.getItem(PRACTICE)||'{"version":1,"records":{},"days":[],"current":null,"filters":{}}');
   const meta=readMeta(),writes=[[DESK,JSON.stringify(data.desk)],[PRACTICE,JSON.stringify({...practice,records:data.practice.records,days:data.practice.days})],[META,JSON.stringify({device:meta.device,model:combined})]],done=[];
   try{for(const [k,v] of writes){const old=s.getItem(k);if(old===v)continue;s.setItem(k,v);done.push([k,old]);}}catch{for(const [k,old] of done.reverse())try{if(old===null)s.removeItem(k);else s.setItem(k,old);}catch{}throw Error('浏览器未能保存合并结果，云端未被覆盖；请先导出备份');}
   notifyApplied();return combined;
  }
  async function api(token,path,init,job){
   job.ensure();const url=new URL(path,'https://api.github.com');if(url.origin!=='https://api.github.com'||url.username||url.password||!/^\/(gists(?:\/|$)|user$)/.test(url.pathname))throw Error('同步地址不正确');
   const controller=new AbortController(),timeout=delay(()=>controller.abort(),20000);let response;
   try{response=await request(url.href,{...init,signal:controller.signal,redirect:'error',credentials:'omit',cache:'no-store',headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'X-GitHub-Api-Version':'2022-11-28',...(init?.body?{'Content-Type':'application/json'}:{})}});}catch{throw Error('无法连接 GitHub，请检查网络；本地数据已保留');}finally{cancel(timeout);}
   job.ensure();if(!response.ok){if(response.status===401)throw Error('GitHub 令牌无效或已过期');if(response.status===403)throw Error('GitHub 权限不足或访问次数受限，请检查 Gist 权限后重试');if(response.status===404)throw Error('找不到同步文件，请检查 Gist ID 和账号');throw Error('GitHub 同步失败（'+response.status+'），本地数据已保留');}
   try{return await response.json();}catch{throw Error('GitHub 返回的数据无法读取');}
  }
  async function contents(gist,id){
   const file=gist.files?.[FILE];if(!file)throw Error('这个 Gist 不是留日手记的同步文件，请勿填写托福的 Gist');
   let text=file.content;
   if(file.truncated||typeof text!=='string'){
    const url=new URL(file.raw_url||'');if(url.protocol!=='https:'||url.hostname!=='gist.githubusercontent.com'||url.username||url.password||!url.pathname.includes('/'+id+'/raw/'))throw Error('同步文件地址不正确');
    const controller=new AbortController(),timeout=delay(()=>controller.abort(),20000);
    try{const response=await request(url.href,{signal:controller.signal,credentials:'omit',redirect:'error',cache:'no-store'});if(!response.ok)throw Error();text=await response.text();}catch{throw Error('同步文件未能完整下载，请检查网络后重试');}finally{cancel(timeout);}
   }
   return model.parse(text);
  }
  function assertGist(gist,owner){if(gist.public!==false)throw Error('只支持 Secret Gist，请勿使用公开 Gist');if(!gist.id||gist.owner?.login!==owner)throw Error('只能连接当前 GitHub 账号拥有的同步文件');}
  function enqueue(task){
   const session=generation,job={ensure(){if(session!==generation)throw Error('同步已取消');}};
   const run=tail.then(async()=>{if(session!==generation)return {ok:false};phase='syncing';error='';emit();lastAttempt=now();try{await task(job);job.ensure();phase='idle';emit();return {ok:true};}catch(e){if(session===generation){phase='idle';error=e.message||'同步失败';emit();}return {ok:false,error:e.message};}});
   tail=run.then(()=>{},()=>{});return run;
  }
  function unschedule(){if(timer!==null){cancel(timer);timer=null;}}
  function changed(){
   try{if(!config()&&!storage().getItem(META))return;const before=storage().getItem(META);capture();if(before===storage().getItem(META))return;if(config()){unschedule();timer=delay(()=>{timer=null;void syncNow();},1500);}}
   catch(e){error='同步未能准备好：'+e.message;emit();}
  }
  async function reconcile(job,pullOnly=false){
   const c=config();if(!c)throw Error('请先连接 GitHub 同步');
   for(let attempt=0;attempt<3;attempt++){
    const local=capture(),gist=await api(c.token,'/gists/'+c.gistId,undefined,job);assertGist(gist,c.owner);const remote=await contents(gist,c.gistId);job.ensure();
    let combined=apply(model.merge(local,remote));
    if(!pullOnly&&model.serialize(combined)!==model.serialize(remote)){
     await api(c.token,'/gists/'+c.gistId,{method:'PATCH',body:JSON.stringify({files:{[FILE]:{content:model.serialize(combined)}}})},job);
     const verify=await api(c.token,'/gists/'+c.gistId,undefined,job);assertGist(verify,c.owner);const after=await contents(verify,c.gistId);job.ensure();
     combined=apply(model.merge(combined,after));
     if(model.serialize(combined)!==model.serialize(after))continue;
    }
    job.ensure();const latest=config();if(!latest||latest.gistId!==c.gistId||latest.token!==c.token)throw Error('同步连接已更改');saveConfig({...latest,lastSyncAt:now()});return;
   }
   throw Error('检测到并发修改，合并数据已保存在本地，请再同步一次');
  }
  function syncNow(){unschedule();return enqueue(job=>reconcile(job));}
  function pull(){unschedule();return enqueue(job=>reconcile(job,true));}
  function connect(tokenInput,idInput){
   unschedule();generation++;const token=String(tokenInput||'').trim();
   return enqueue(async job=>{
    if(!token||token.length>300||/\s/.test(token))throw Error('请填写有效的 GitHub 访问令牌');const explicit=gistId(idInput),user=await api(token,'/user',undefined,job);
    if(typeof user.login!=='string'||!user.login)throw Error('无法读取 GitHub 账号');const prior=config();if(prior&&prior.owner!==user.login)throw Error('请先断开当前账号，再连接其他账号');
    const s=storage();if(!s.getItem(BACKUP)){model.snapshot(s);s.setItem(BACKUP,JSON.stringify({version:1,createdAt:now(),desk:JSON.parse(s.getItem(DESK)||'{"version":1,"items":[]}'),practice:JSON.parse(s.getItem(PRACTICE)||'{"version":1,"records":{},"days":[]}')}));}
    let gist;
    if(explicit)gist=await api(token,'/gists/'+explicit,undefined,job);
    else{
     const matches=[];let complete=false;
     for(let page=1;page<=20;page++){const list=await api(token,'/gists?per_page=100&page='+page,undefined,job);if(!Array.isArray(list))throw Error('Gist 列表无法读取');matches.push(...list.filter(g=>g.public===false&&g.files?.[FILE]));if(list.length<100){complete=true;break;}}
     if(!complete||matches.length>1)throw Error('请在高级设置中填写要使用的 Gist ID，避免连接到错误的同步文件');
     if(matches.length)gist=await api(token,'/gists/'+gistId(matches[0].id),undefined,job);
     else gist=await api(token,'/gists',{method:'POST',body:JSON.stringify({description:'留日手记 · 收藏与练习同步',public:false,files:{[FILE]:{content:model.serialize(capture())}}})},job);
    }
    assertGist(gist,user.login);await contents(gist,gist.id);job.ensure();saveConfig({token,gistId:gistId(gist.id),owner:user.login,lastSyncAt:0});await reconcile(job);
   });
  }
  function invalidate(){generation++;unschedule();phase='idle';error='';emit();}
  function disconnect(){invalidate();storage().removeItem(CONFIG);emit();}
  function auto(){if(config()&&phase!=='syncing'&&(error||now()-lastAttempt>15000))return syncNow();return Promise.resolve({ok:true});}
  return {status,changed,syncNow,pull,connect,disconnect,auto,invalidate};
 }
 const api={CONFIG,META,BACKUP,FILE,gistId,create};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 else{
  root.JournalGitHubSync=api;
  const engine=create({storage:()=>root.localStorage,fetch:(...args)=>root.fetch(...args),notify:state=>root.dispatchEvent(new CustomEvent('journal-sync-status',{detail:state})),applied:()=>root.dispatchEvent(new CustomEvent('journal-sync-applied'))});root.JournalSync=engine;
  const active=()=>root.navigator.onLine!==false&&document.visibilityState==='visible';
  const resume=()=>{if(active())void engine.auto();};root.addEventListener('online',resume);root.addEventListener('focus',resume);document.addEventListener('visibilitychange',resume);
  root.addEventListener('storage',e=>{if(e.key===DESK||e.key===PRACTICE)engine.changed();if(e.key===CONFIG){try{const a=JSON.parse(e.oldValue||'null'),b=JSON.parse(e.newValue||'null');if(a?.token!==b?.token||a?.gistId!==b?.gistId)engine.invalidate();}catch{engine.invalidate();}root.dispatchEvent(new CustomEvent('journal-sync-status',{detail:engine.status()}));}});
  if(active()&&engine.status().connected)void engine.auto();
 }
})(typeof globalThis!=='undefined'?globalThis:this);
