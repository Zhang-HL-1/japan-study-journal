(function(root){
 'use strict';
 const KEY='japan-study-journal:desk:v1',MAX_FAVORITES=200,MAX_BYTES=1024*1024;
 const key=item=>item.type+':'+item.id;
 const empty=()=>({version:1,items:[]});
 function item(value){
  if(!value||!['scope','paper'].includes(value.type)||typeof value.id!=='string'||!value.id||value.id.length>200||typeof value.title!=='string'||!value.title.trim()||value.title.length>400||typeof value.subtitle!=='string'||value.subtitle.length>600)throw Error('资料条目格式不正确');
  const result={type:value.type,id:value.id,title:value.title,subtitle:value.subtitle,file:0,admission:'general',favoriteAt:0};
  if(value.type==='paper'){if(!Number.isInteger(value.file)||value.file<0||value.file>1000)throw Error('原卷序号不正确');result.file=value.file;}
  if(value.type==='scope'){if(!['general','international'].includes(value.admission))throw Error('入试类别不正确');result.admission=value.admission;}
  for(const field of ['favoriteAt']){if(!Number.isSafeInteger(value[field])||value[field]<0||value[field]>8640000000000000)throw Error('记录日期不正确');result[field]=value[field];}
  return result;
 }
 function parse(raw){
  if(typeof raw!=='string'||raw.length>MAX_BYTES)throw Error('备份文件过大或格式不正确');
  const value=JSON.parse(raw);
  if(value?.version!==1||!Array.isArray(value.items)||value.items.length>250)throw Error('不支持的书桌备份格式');
  const items=value.items.map(item);
  if(new Set(items.map(key)).size!==items.length||items.filter(i=>i.favoriteAt).length>MAX_FAVORITES)throw Error('备份有重复条目或收藏过多');
  return trim({version:1,items});
 }
 function trim(data){return {version:1,items:data.items.filter(i=>i.favoriteAt)};}
 function href(entry){
  const params=new URLSearchParams(entry.type==='scope'?{record:entry.id,admission:entry.admission}:{paper:entry.id,file:String(entry.file)});
  return (entry.type==='scope'?'exam-scope.html':'past-papers.html')+'?'+params;
 }
 function merge(current,incoming){
  const map=new Map(current.items.map(i=>[key(i),i]));
  for(const next of incoming.items){const old=map.get(key(next));map.set(key(next),old?{...old,favoriteAt:Math.max(old.favoriteAt,next.favoriteAt)}:next);}
  if([...map.values()].filter(i=>i.favoriteAt).length>MAX_FAVORITES)throw Error('合并后收藏超过 200 条，请先整理收藏');
  return trim({version:1,items:[...map.values()]});
 }
 function create(getStorage,now=Date.now,onChange=()=>{}){
  function changed(){try{onChange();}catch{}}
  const failure=error=>({ok:false,error:String(error.message||error)});
  function read(){try{const storage=getStorage(),raw=storage.getItem(KEY);if(raw===null)return {ok:true,data:empty()};const data=parse(raw);
   // Migrate the previous favorites + history format once, preserving every favorite.
   if(JSON.parse(raw).items.some(i=>Object.prototype.hasOwnProperty.call(i,'lastOpenedAt')||!i.favoriteAt))storage.setItem(KEY,JSON.stringify(data));
   return {ok:true,data};}catch(error){return failure(error);}}
  function update(fn){const result=read();if(!result.ok)return result;try{const data=trim(fn(result.data));getStorage().setItem(KEY,JSON.stringify(data));changed();return {ok:true,data};}catch(error){return failure(error);}}
  function favorite(value,on){return update(data=>{const clean=item({...value,favoriteAt:0}),old=data.items.find(i=>key(i)===key(clean));
   if(on&&!old?.favoriteAt&&data.items.filter(i=>i.favoriteAt).length>=MAX_FAVORITES)throw Error('收藏已达 200 条，请先整理收藏');
   return {version:1,items:[...data.items.filter(i=>key(i)!==key(clean)),{...clean,...old,favoriteAt:on?(old?.favoriteAt||now()):0}]};
  });}
  function importText(raw){try{const incoming=parse(raw);return update(data=>merge(data,incoming));}catch(error){return failure(error);}}
  function exportText(){try{const raw=getStorage().getItem(KEY);if(raw===null)return {ok:true,text:JSON.stringify(empty())};try{return {ok:true,text:JSON.stringify(parse(raw))};}catch{return {ok:true,text:raw};}}catch(error){return failure(error);}}
  function clear(){try{getStorage().removeItem(KEY);changed();return {ok:true,data:empty()};}catch(error){return failure(error);}}
  return {read,favorite,importText,exportText,clear};
 }
 const api={KEY,MAX_FAVORITES,MAX_BYTES,key,parse,href,merge,create};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.StudyDeskCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
