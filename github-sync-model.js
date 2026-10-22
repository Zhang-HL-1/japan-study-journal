(function(root){
 'use strict';
 const desk=typeof module!=='undefined'&&module.exports?require('./study-desk-core.js'):root.StudyDeskCore;
 const FORMAT='japan-study-journal-sync',MAX_BYTES=3*1024*1024;
 const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
 const empty=()=>({format:FORMAT,version:1,registers:[]});
 const key=r=>JSON.stringify([r.kind,r.id,r.field]);
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function text(v,max){if(typeof v!=='string'||v.length>max)throw Error('同步文字格式不正确');return v;}
 function count(v){if(!Number.isSafeInteger(v)||v<0||v>1000000)throw Error('练习计数格式不正确');return v;}
 function score(v){
  if(v===null)return null;
  if(!v||typeof v!=='object'||Array.isArray(v))throw Error('作答记录格式不正确');
  const answer=v.answer??null;if(!(answer===null||typeof answer==='string'&&answer.length<=6000||Number.isSafeInteger(answer)&&answer>=0&&answer<1000))throw Error('答案格式不正确');
  const result={attempts:count(v.attempts??0),correct:v.correct===true?true:v.correct===false?false:null,wrongCount:count(v.wrongCount??0),answer,updated:text(v.updated??'',100)};
  return result.attempts||result.wrongCount||answer!==null||result.updated?result:null;
 }
 function register(r){
  if(!r||!['favorite','practice','day'].includes(r.kind)||typeof r.id!=='string'||!r.id||r.id.length>220||!Number.isSafeInteger(r.clock)||r.clock<1||r.clock>8640000000000000||typeof r.device!=='string'||!/^[a-zA-Z0-9_-]{8,100}$/.test(r.device))throw Error('同步记录格式不正确');
  let value;
  if(r.kind==='favorite'){
   if(r.field!=='item')throw Error('收藏字段不正确');
   value=r.value===null?null:desk.parse(JSON.stringify({version:1,items:[r.value]})).items[0];
   if(value===undefined||value&&desk.key(value)!==r.id)throw Error('收藏标识不一致');
  }else if(r.kind==='day'){
   if(r.field!=='done'||!/^\d{4}-\d{2}-\d{2}$/.test(r.id)||r.value!==true)throw Error('练习日期不正确');value=true;
  }else{
   if(r.field==='score')value=score(r.value);
   else if(r.field==='note'||r.field==='draft')value=text(r.value,6000);
   else if(r.field==='bookmarked'&&typeof r.value==='boolean')value=r.value;
   else throw Error('练习字段不正确');
  }
  return {kind:r.kind,id:r.id,field:r.field,value,clock:r.clock,device:r.device};
 }
 function parse(raw){
  if(typeof raw!=='string'||raw.length>MAX_BYTES)throw Error('同步文件过大');const v=JSON.parse(raw);
  if(v?.format!==FORMAT||v.version!==1||!Array.isArray(v.registers)||v.registers.length>25000)throw Error('这不是留日手记的同步文件');
  const registers=v.registers.map(register);if(new Set(registers.map(key)).size!==registers.length)throw Error('同步文件含重复字段');return {...empty(),registers};
 }
 function canonical(model){return {...empty(),registers:[...model.registers].sort((a,b)=>key(a)<key(b)?-1:key(a)>key(b)?1:0)};}
 function serialize(model){if(model.registers.length>25000)throw Error('同步记录过多，请先导出备份');const raw=JSON.stringify(canonical(model));if(new TextEncoder().encode(raw).length>MAX_BYTES)throw Error('同步文件超过 3 MB，请先导出备份并整理笔记');return raw;}
 function merge(a,b){
  const map=new Map(a.registers.map(r=>[key(r),r]));
  for(const r of b.registers){const old=map.get(key(r));if(!old){map.set(key(r),r);continue;}
   const later=r.clock>old.clock||r.clock===old.clock&&r.device>old.device?r:old;
   map.set(key(r),later);
  }
  return canonical({...empty(),registers:[...map.values()]});
 }
 function snapshot(storage){
  const rawDesk=storage.getItem(desk.KEY),favorites=rawDesk===null?{version:1,items:[]}:desk.parse(rawDesk);
  const raw=storage.getItem('japan-study-journal:practice:v1');let practice={version:1,records:{},days:[]};
  if(raw!==null){practice=JSON.parse(raw);if(practice?.version!==1||!practice.records||typeof practice.records!=='object'||Array.isArray(practice.records)||Object.keys(practice.records).length>5000)throw Error('本地练习记录无法读取，已保留原数据');}
  const records=Object.fromEntries(Object.entries(practice.records).map(([id,r])=>{
   if(!id||id.length>220||!r||typeof r!=='object'||Array.isArray(r))throw Error('本地练习条目格式不正确');
   const fields={};if(['attempts','correct','wrongCount','answer','updated'].some(k=>own(r,k)))fields.score=score(r);
   for(const name of ['note','draft'])if(own(r,name))fields[name]=text(r[name],6000);
   if(own(r,'bookmarked')){if(typeof r.bookmarked!=='boolean')throw Error('本地题目收藏格式不正确');fields.bookmarked=r.bookmarked;}
   return [id,fields];
  }));
  const days=Array.isArray(practice.days)?[...new Set(practice.days.filter(d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)))]:[];
  return {favorites,records,days};
 }
 function observe(model,snap,device,now=Date.now(),bootstrap=false){
  const map=new Map(model.registers.map(r=>[key(r),r]));let clock=Math.max(now,...model.registers.map(r=>r.clock),0);
  function put(kind,id,field,value,seed){const r={kind,id,field,value},old=map.get(key(r));if(!old&&(value===false||value===''))return;if(equal(old?.value??null,value))return;const next=++clock;map.set(key(r),{...r,clock:bootstrap&&!old&&Number.isSafeInteger(seed)&&seed>0?seed:next,device});}
  const favorites=new Map(snap.favorites.items.map(i=>[desk.key(i),i]));
  for(const r of model.registers)if(r.kind==='favorite'&&!favorites.has(r.id))put('favorite',r.id,'item',null);
  for(const [id,value] of favorites)put('favorite',id,'item',value,value.favoriteAt);
  for(const [id,fields] of Object.entries(snap.records))for(const [field,value] of Object.entries(fields))put('practice',id,field,value,Date.parse(fields.score?.updated||'')||1);
  for(const day of snap.days)put('day',day,'done',true);
  return canonical({...empty(),registers:[...map.values()]});
 }
 function materialize(model){
  const items=[],records=new Map(),days=[];
  for(const r of model.registers){
   if(r.kind==='favorite'){if(r.value)items.push(r.value);}
   else if(r.kind==='day')days.push(r.id);
   else{const row=records.get(r.id)||{};if(r.field==='score'){if(r.value)Object.assign(row,r.value);}else row[r.field]=r.value;records.set(r.id,row);}
  }
  if(items.length>desk.MAX_FAVORITES)throw Error('合并后收藏超过 200 条，请先在原设备整理收藏');
  return {desk:{version:1,items:items.sort((a,b)=>desk.key(a).localeCompare(desk.key(b)))},practice:{version:1,records:Object.fromEntries(records),days:days.sort().slice(-366)}};
 }
 const api={FORMAT,MAX_BYTES,empty,parse,serialize,merge,snapshot,observe,materialize};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.JournalSyncModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
