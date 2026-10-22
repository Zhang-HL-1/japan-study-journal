const test=require('node:test'),assert=require('node:assert/strict');
const model=require('../github-sync-model.js'),sync=require('../github-sync.js'),desk=require('../study-desk-core.js');
const entry=(id='one')=>({type:'scope',id,title:'资料 '+id,subtitle:'大学 · 研究科',admission:'general',file:0,favoriteAt:10});
function memory(){const map=new Map();return {map,getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};}
function observe(storage,device='device-one',base=model.empty(),now=100){return model.observe(base,model.snapshot(storage),device,now);}
function cloud(){
 const id='a'.repeat(32),calls=[];let exists=false,content=model.serialize(model.empty()),publicGist=false,status=200,hold=null;
 const payload=()=>({id,public:publicGist,owner:{login:'learner'},files:{[sync.FILE]:{content}},html_url:'https://gist.github.com/'+id});
 const fetch=async(url,init={})=>{const u=new URL(url),method=init.method||'GET';calls.push({url,method,headers:init.headers,body:init.body,signal:init.signal});assert.equal(u.origin,'https://api.github.com');
  if(status!==200)return {ok:false,status,json:async()=>({})};
  if(hold&&u.pathname==='/gists/'+id&&method==='GET')await hold();
  let value;
  if(u.pathname==='/user')value={login:'learner'};
  else if(u.pathname==='/gists'&&method==='GET')value=exists?[payload()]:[];
  else if(u.pathname==='/gists'&&method==='POST'){const body=JSON.parse(init.body);assert.equal(body.public,false);content=body.files[sync.FILE].content;exists=true;value=payload();}
  else if(u.pathname==='/gists/'+id&&method==='PATCH'){content=JSON.parse(init.body).files[sync.FILE].content;value=payload();}
  else if(u.pathname==='/gists/'+id)value=payload();else throw Error('unexpected endpoint');
  return {ok:true,status:200,json:async()=>JSON.parse(JSON.stringify(value))};
 };
 return {id,calls,fetch,get model(){return model.parse(content);},set model(value){content=model.serialize(value);exists=true;},set public(value){publicGist=value;exists=true;},set status(value){status=value;},set hold(value){hold=value;},set raw(value){content=value;exists=true;}};
}
function device(remote,name='device-one'){
 const storage=memory(),timers=new Map();let time=1000,sequence=0;
 const engine=sync.create({storage:()=>storage,fetch:remote.fetch,device:()=>name,now:()=>++time,setTimeout:(fn,ms)=>{timers.set(++sequence,{fn,ms});return sequence;},clearTimeout:id=>timers.delete(id)});
 const favorites=desk.create(()=>storage,()=>++time,()=>engine.changed());
 return {storage,engine,favorites,timers};
}
test('field-level merge converges, preserving notes, drafts, grading and explicit unbookmarking',()=>{
 const a=memory(),b=memory();a.setItem('japan-study-journal:practice:v1',JSON.stringify({version:1,records:{q:{note:'A note',attempts:2,correct:false,wrongCount:1,answer:'a',updated:'2026-10-22'}},days:['2026-10-22']}));
 const ma=observe(a),data=model.materialize(ma);b.setItem('japan-study-journal:practice:v1',JSON.stringify(data.practice));
 b.setItem('japan-study-journal:practice:v1',JSON.stringify({...data.practice,records:{q:{...data.practice.records.q,draft:'B draft',bookmarked:true}}}));const mb=observe(b,'device-two',ma,200);
 const merged=model.merge(ma,mb);assert.equal(model.serialize(merged),model.serialize(model.merge(mb,ma)));assert.equal(model.serialize(merged),model.serialize(model.merge(merged,mb)));
 const q=model.materialize(merged).practice.records.q;assert.equal(q.note,'A note');assert.equal(q.draft,'B draft');assert.equal(q.attempts,2);assert.equal(q.bookmarked,true);
 b.setItem('japan-study-journal:practice:v1',JSON.stringify({...data.practice,records:{q:{...q,bookmarked:false,note:''}}}));const cleared=observe(b,'device-two',merged,300);assert.equal(model.materialize(model.merge(ma,cleared)).practice.records.q.note,'');assert.equal(model.materialize(model.merge(ma,cleared)).practice.records.q.bookmarked,false);
});
test('favorite tombstones defeat an old device, including its first connection; explicit re-add works',()=>{
 const a=memory();a.setItem(desk.KEY,JSON.stringify({version:1,items:[entry()]}));const original=observe(a);a.setItem(desk.KEY,'{"version":1,"items":[]}');const removed=observe(a,'device-one',original,200);
 const b=memory();b.setItem(desk.KEY,JSON.stringify({version:1,items:[entry()]}));const stale=model.observe(model.empty(),model.snapshot(b),'device-two',500,true);
 assert.equal(model.materialize(model.merge(removed,stale)).desk.items.length,0);
 const readded=observe(b,'device-two',removed,600);assert.equal(model.materialize(model.merge(removed,readded)).desk.items.length,1);
});
test('only personal data are materialized; local filters and recent reading are never sync fields',()=>{
 const s=memory();s.setItem(desk.KEY,JSON.stringify({version:1,items:[{...entry(),lastOpenedAt:300},{...entry('history'),favoriteAt:0,lastOpenedAt:400}]}));
 const text=model.serialize(observe(s));assert.ok(!text.includes('lastOpenedAt'));assert.ok(!text.includes('history'));assert.equal(model.materialize(model.parse(text)).desk.items.length,1);
 assert.throws(()=>model.parse('{"version":1}'));assert.throws(()=>model.parse(JSON.stringify({format:model.FORMAT,version:1,registers:[{kind:'favorite',id:'bad',field:'item',value:entry(),clock:1,device:'device-one'}]})));
});
test('connect creates a dedicated secret gist, two devices merge and propagate cancellations',async()=>{
 const remote=cloud(),a=device(remote),b=device(remote,'device-two');a.favorites.favorite(entry('A'),true);
 assert.equal((await a.engine.connect('fake-token','')).ok,true);assert.equal(remote.calls.filter(c=>c.method==='POST').length,1);assert.equal(a.engine.status().connected,true);
 assert.ok(a.storage.getItem(sync.BACKUP));assert.equal(model.serialize(remote.model).includes('fake-token'),false);
 b.favorites.favorite(entry('B'),true);assert.equal((await b.engine.connect('fake-token','')).ok,true);assert.equal(remote.calls.filter(c=>c.method==='POST').length,1);assert.equal(b.favorites.read().data.items.length,2);
 await a.engine.syncNow();assert.equal(a.favorites.read().data.items.length,2);a.favorites.favorite(entry('A'),false);await a.engine.syncNow();await b.engine.syncNow();assert.deepEqual(b.favorites.read().data.items.map(i=>i.id),['B']);
 assert.equal(model.materialize(remote.model).desk.items.length,1);for(const c of remote.calls)if(c.method==='PATCH')assert.ok(!c.body.includes('fake-token'));
});
test('pull merges without uploading; disconnect retains data and offline changes stay local',async()=>{
 const remote=cloud(),a=device(remote);a.favorites.favorite(entry(),true);await a.engine.connect('fake-token','');const before=remote.calls.filter(c=>c.method==='PATCH').length;
 a.favorites.favorite(entry('offline'),true);await a.engine.pull();assert.equal(remote.calls.filter(c=>c.method==='PATCH').length,before);assert.equal(a.favorites.read().data.items.length,2);
 a.engine.disconnect();const calls=remote.calls.length;a.favorites.favorite(entry('another'),true);await a.engine.auto();assert.equal(remote.calls.length,calls);assert.equal(a.engine.status().connected,false);assert.equal(a.favorites.read().data.items.length,3);
});
test('corrupt, public, foreign and unavailable gists never overwrite local records',async()=>{
 for(const mode of ['corrupt','public','401','foreign']){
  const remote=cloud(),a=device(remote);a.favorites.favorite(entry(),true);const before=a.storage.getItem(desk.KEY);
  if(mode==='corrupt')remote.raw='not json';if(mode==='public')remote.public=true;if(mode==='401')remote.status=401;
  if(mode==='foreign'){remote.raw=JSON.stringify({format:'toefl',version:1,registers:[]});}
  const result=await a.engine.connect('fake-token',mode==='401'?'':remote.id);assert.equal(result.ok,false,mode);assert.equal(a.storage.getItem(desk.KEY),before);assert.equal(remote.calls.some(c=>c.method==='PATCH'),false);
 }
});
test('unconfigured browsing has no requests or sync writes; filter-only changes do not queue uploads',async()=>{
 const remote=cloud(),a=device(remote);a.engine.changed();assert.equal(remote.calls.length,0);assert.equal(a.storage.getItem(sync.META),null);
 await a.engine.connect('fake-token','');const before=a.storage.getItem(sync.META);const practice=JSON.parse(a.storage.getItem('japan-study-journal:practice:v1'));practice.filters={search:'local only'};a.storage.setItem('japan-study-journal:practice:v1',JSON.stringify(practice));a.engine.changed();assert.equal(a.storage.getItem(sync.META),before);assert.equal([...a.timers.values()].filter(t=>t.ms===1500).length,0);
});
test('disconnect during an in-flight read prevents applying or uploading its response',async()=>{
 const remote=cloud(),a=device(remote);await a.engine.connect('fake-token','');let release,entered;const started=new Promise(r=>entered=r),gate=new Promise(r=>release=r);remote.hold=()=>{entered();return gate;};
 const before=a.storage.getItem(desk.KEY),patches=remote.calls.filter(c=>c.method==='PATCH').length,pending=a.engine.syncNow();await started;a.engine.disconnect();assert.equal(remote.calls.at(-1).signal.aborted,true);release();await pending;assert.equal(a.storage.getItem(desk.KEY),before);assert.equal(remote.calls.filter(c=>c.method==='PATCH').length,patches);
});
test('Gist IDs only accept safe identifiers or official HTTPS URLs',()=>{
 assert.equal(sync.gistId('https://gist.github.com/name/'+'a'.repeat(32)),'a'.repeat(32));for(const bad of ['https://evil.test/'+'a'.repeat(32),'javascript:alert(1)','https://user:pass@gist.github.com/name/'+'a'.repeat(32)])assert.throws(()=>sync.gistId(bad));
});

test('failed local application rolls back saved collections and does not overwrite cloud data',async()=>{
 const remote=cloud(),source=memory();source.setItem(desk.KEY,JSON.stringify({version:1,items:[entry('remote')]}));remote.model=observe(source);
 const a=device(remote);a.favorites.favorite(entry('local'),true);const before=a.storage.getItem(desk.KEY),set=a.storage.setItem;a.storage.setItem=(key,value)=>{if(key==='japan-study-journal:practice:v1')throw Error('quota');set(key,value);};
 const result=await a.engine.connect('fake-token',remote.id);assert.equal(result.ok,false);assert.equal(a.storage.getItem(desk.KEY),before);assert.equal(remote.calls.filter(c=>c.method==='PATCH').length,0);
});

test('uploading unchanged personal data does not request an editor re-render',async()=>{
 const remote=cloud(),storage=memory();let applied=0,time=1000;
 const engine=sync.create({storage:()=>storage,fetch:remote.fetch,device:()=> 'device-one',now:()=>++time,applied:()=>applied++});
 desk.create(()=>storage,()=>++time).favorite(entry(),true);await engine.connect('fake-token','');assert.equal(applied,0);await engine.syncNow();assert.equal(applied,0);
});
