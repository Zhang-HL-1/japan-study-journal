const test=require('node:test'),assert=require('node:assert/strict'),core=require('../study-desk-core.js');
const entry=(id='one',type='scope')=>({type,id,title:'资料 '+id,subtitle:'学校 · 研究科',file:0,admission:'general'});
function setup(){const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};let time=100;return {values,storage,store:core.create(()=>storage,()=>++time)};}
test('visits deduplicate, update the original PDF tab, and preserve favorites',()=>{
 const {store}=setup();assert.equal(store.visit(entry('paper','paper')).ok,true);store.favorite(entry('paper','paper'),true);store.visit({...entry('paper','paper'),file:2});
 const items=store.read().data.items;assert.equal(items.length,1);assert.equal(items[0].file,2);assert.ok(items[0].favoriteAt);assert.match(core.href(items[0]),/file=2/);
 store.favorite(items[0],false);assert.equal(store.read().data.items[0].favoriteAt,0);
});
test('only the latest 50 visits remain but old favorites survive',()=>{
 const {store}=setup();store.visit(entry('saved'));store.favorite(entry('saved'),true);for(let i=0;i<60;i++)store.visit(entry(String(i)));
 const items=store.read().data.items;assert.equal(items.filter(i=>i.lastOpenedAt).length,50);assert.equal(items.length,51);assert.equal(items.find(i=>i.id==='saved').lastOpenedAt,0);
 store.clearRecent();assert.equal(store.read().data.items.length,1);assert.ok(store.read().data.items[0].favoriteAt);
});
test('favorite limits and invalid imports fail without changing existing data',()=>{
 const {store,values}=setup();for(let i=0;i<200;i++)assert.equal(store.favorite(entry(String(i)),true).ok,true);
 const before=values.get(core.KEY);assert.equal(store.favorite(entry('extra'),true).ok,false);assert.equal(values.get(core.KEY),before);
 for(const raw of ['broken','{}',JSON.stringify({version:2,items:[]}),'x'.repeat(core.MAX_BYTES+1),JSON.stringify({version:1,items:[{...entry(),lastOpenedAt:0,favoriteAt:1},{...entry(),lastOpenedAt:0,favoriteAt:1}]})]){assert.equal(store.importText(raw).ok,false);assert.equal(values.get(core.KEY),before);}
});
test('imports merge favorites and newer visits; repeated imports are idempotent',()=>{
 const a=setup(),b=setup();a.store.visit(entry('existing'));a.store.favorite(entry('existing'),true);b.store.visit(entry('new'));b.store.favorite(entry('new'),true);
 const raw=b.store.exportText().text;assert.equal(a.store.importText(raw).ok,true);const once=a.store.exportText().text;a.store.importText(raw);assert.equal(a.store.exportText().text,once);assert.equal(a.store.read().data.items.length,2);
});
test('quota errors, blocked storage, and corrupt content preserve data and never touch quiz progress',()=>{
 const {store,storage,values}=setup();values.set('japan-study-journal:practice:v1','keep-me');store.visit(entry());const before=values.get(core.KEY);storage.setItem=()=>{throw Error('quota exceeded');};assert.equal(store.favorite(entry(),true).ok,false);assert.equal(values.get(core.KEY),before);
 values.set(core.KEY,'broken json');assert.equal(store.visit(entry('next')).ok,false);assert.equal(values.get(core.KEY),'broken json');assert.equal(store.exportText().text,'broken json');
 store.clear();assert.equal(values.get('japan-study-journal:practice:v1'),'keep-me');assert.equal(values.has(core.KEY),false);
 const blocked=core.create(()=>{throw Error('SecurityError');});assert.equal(blocked.read().ok,false);assert.equal(blocked.visit(entry()).ok,false);assert.equal(blocked.clear().ok,false);
});
test('links are always local and ignore imported URLs or HTML',()=>{
 const {store}=setup();store.importText(JSON.stringify({version:1,items:[{...entry('https://evil.test/?x=<script>'),title:'<img onerror=alert(1)>',href:'javascript:alert(1)',lastOpenedAt:1,favoriteAt:1}]}));
 const saved=store.read().data.items[0],url=new URL(core.href(saved),'https://local.test/journal/');assert.equal(url.origin,'https://local.test');assert.equal(url.pathname,'/journal/exam-scope.html');assert.equal(saved.href,undefined);assert.equal(url.searchParams.get('record'),'https://evil.test/?x=<script>');
});
test('out-of-range dates, file tabs, and invalid types are rejected',()=>{
 const {store}=setup();for(const change of [{type:'external'},{file:-1,type:'paper'},{favoriteAt:Infinity},{lastOpenedAt:-1},{admission:'unknown'},{title:''}])assert.equal(store.importText(JSON.stringify({version:1,items:[{...entry(),favoriteAt:1,lastOpenedAt:1,...change}]})).ok,false);
});
test('separate store instances read current data before each write',()=>{
 const {store,storage}=setup(),second=core.create(()=>storage,()=>200);store.favorite(entry('one'),true);second.favorite(entry('two'),true);store.visit(entry('one'));assert.equal(second.read().data.items.filter(i=>i.favoriteAt).length,2);
});
