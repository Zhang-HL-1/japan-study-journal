const test=require('node:test'),assert=require('node:assert/strict'),core=require('../study-desk-core.js');
const entry=(id='one',type='scope')=>({type,id,title:'资料 '+id,subtitle:'学校 · 研究科',file:0,admission:'general'});
function setup(){const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};let time=100;return {values,storage,store:core.create(()=>storage,()=>++time)};}
test('favorites retain their chosen PDF file until removed',()=>{
 const {store}=setup();store.favorite({...entry('paper','paper'),file:2},true);
 const items=store.read().data.items;assert.equal(items.length,1);assert.equal(items[0].file,2);assert.match(core.href(items[0]),/file=2/);assert.equal('lastOpenedAt' in items[0],false);
 store.favorite(items[0],false);assert.equal(store.read().data.items.length,0);
});
test('legacy history is removed once while favorite metadata and quiz progress survive',()=>{
 const {store,storage,values}=setup();let writes=0;const set=storage.setItem;storage.setItem=(...args)=>{writes++;set(...args);};
 values.set(core.KEY,JSON.stringify({version:1,items:[{...entry('saved'),favoriteAt:10,lastOpenedAt:50},{...entry('only-history'),favoriteAt:0,lastOpenedAt:60}]}));values.set('japan-study-journal:practice:v1','keep-me');
 assert.equal(store.read().data.items.length,1);assert.equal(writes,1);assert.equal(JSON.parse(values.get(core.KEY)).items[0].id,'saved');assert.equal(values.get(core.KEY).includes('lastOpenedAt'),false);assert.equal(values.get('japan-study-journal:practice:v1'),'keep-me');
 store.read();assert.equal(writes,1);assert.equal(store.visit,undefined);assert.equal(store.clearRecent,undefined);
});
test('reading empty or current storage never writes data',()=>{
 const {store,storage,values}=setup();let writes=0;const set=storage.setItem;storage.setItem=(...args)=>{writes++;set(...args);};
 store.read();store.read();assert.equal(writes,0);assert.equal(values.has(core.KEY),false);store.favorite(entry(),true);const saved=values.get(core.KEY);store.read();store.read();assert.equal(writes,1);assert.equal(values.get(core.KEY),saved);
});
test('legacy backups only restore favorites and cannot reintroduce reading history',()=>{
 const {store}=setup();store.favorite(entry('existing'),true);const legacy={version:1,items:[{...entry('saved'),favoriteAt:10,lastOpenedAt:50},{...entry('only-history'),favoriteAt:0,lastOpenedAt:60}]};
 assert.equal(store.importText(JSON.stringify(legacy)).ok,true);assert.deepEqual(store.read().data.items.map(i=>i.id).sort(),['existing','saved']);assert.equal(store.exportText().text.includes('lastOpenedAt'),false);
});
test('favorite limits and invalid imports fail without changing existing data',()=>{
 const {store,values}=setup();for(let i=0;i<200;i++)assert.equal(store.favorite(entry(String(i)),true).ok,true);
 const before=values.get(core.KEY);assert.equal(store.favorite(entry('extra'),true).ok,false);assert.equal(values.get(core.KEY),before);
 for(const raw of ['broken','{}',JSON.stringify({version:2,items:[]}),'x'.repeat(core.MAX_BYTES+1),JSON.stringify({version:1,items:[{...entry(),lastOpenedAt:0,favoriteAt:1},{...entry(),lastOpenedAt:0,favoriteAt:1}]})]){assert.equal(store.importText(raw).ok,false);assert.equal(values.get(core.KEY),before);}
});
test('imports merge favorites; repeated imports are idempotent',()=>{
 const a=setup(),b=setup();a.store.favorite(entry('existing'),true);b.store.favorite(entry('new'),true);
 const raw=b.store.exportText().text;assert.equal(a.store.importText(raw).ok,true);const once=a.store.exportText().text;a.store.importText(raw);assert.equal(a.store.exportText().text,once);assert.equal(a.store.read().data.items.length,2);
});
test('quota errors, blocked storage, and corrupt content preserve data and never touch quiz progress',()=>{
 const {store,storage,values}=setup();values.set('japan-study-journal:practice:v1','keep-me');store.favorite(entry(),true);const before=values.get(core.KEY);storage.setItem=()=>{throw Error('quota exceeded');};assert.equal(store.favorite(entry(),true).ok,false);assert.equal(values.get(core.KEY),before);
 values.set(core.KEY,'broken json');assert.equal(store.favorite(entry('next'),true).ok,false);assert.equal(values.get(core.KEY),'broken json');assert.equal(store.exportText().text,'broken json');
 store.clear();assert.equal(values.get('japan-study-journal:practice:v1'),'keep-me');assert.equal(values.has(core.KEY),false);
 const blocked=core.create(()=>{throw Error('SecurityError');});assert.equal(blocked.read().ok,false);assert.equal(blocked.favorite(entry(),true).ok,false);assert.equal(blocked.clear().ok,false);
});
test('links are always local and ignore imported URLs or HTML',()=>{
 const {store}=setup();store.importText(JSON.stringify({version:1,items:[{...entry('https://evil.test/?x=<script>'),title:'<img onerror=alert(1)>',href:'javascript:alert(1)',lastOpenedAt:1,favoriteAt:1}]}));
 const saved=store.read().data.items[0],url=new URL(core.href(saved),'https://local.test/journal/');assert.equal(url.origin,'https://local.test');assert.equal(url.pathname,'/journal/exam-scope.html');assert.equal(saved.href,undefined);assert.equal(url.searchParams.get('record'),'https://evil.test/?x=<script>');
});
test('out-of-range dates, file tabs, and invalid types are rejected',()=>{
 const {store}=setup();for(const change of [{type:'external'},{file:-1,type:'paper'},{favoriteAt:Infinity},{admission:'unknown'},{title:''}])assert.equal(store.importText(JSON.stringify({version:1,items:[{...entry(),favoriteAt:1,lastOpenedAt:1,...change}]})).ok,false);
});
test('separate store instances read current data before each write',()=>{
 const {store,storage}=setup(),second=core.create(()=>storage,()=>200);store.favorite(entry('one'),true);second.favorite(entry('two'),true);store.read();assert.equal(second.read().data.items.filter(i=>i.favoriteAt).length,2);
});
