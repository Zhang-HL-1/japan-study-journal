/* 无外部依赖的 DOM 模拟测试；测试记录不会作为网站题库加载。 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
const fixtures = [
  {id:'qa-choice',subject:'S1',chapter:'C1',difficulty:'基础',type:'choice',title:'fixture choice',prompt:'test only',options:['a','b'],answer:1,answerText:'b',explanation:['step'],hint:'test'},
  {id:'qa-number',subject:'S1',chapter:'C2',difficulty:'进阶',type:'numeric',title:'fixture number',prompt:'test only',answer:.5,tolerance:.001,answerText:'0.5',explanation:['step'],hint:'test'},
  {id:'qa-written',subject:'S2',chapter:'C3',difficulty:'进阶',type:'written',title:'fixture written',prompt:'test only',answerText:'reference',explanation:['step'],hint:'test'}
];
class Element {
  constructor(tag='div') { this.tag=tag; this.children=[]; this.attrs={}; this.events={}; this.hidden=false; this.value=''; this.className=''; this.checked=false; this.disabled=false; this.textContent='';
    this.classList={toggle:(name,on)=>{const set=new Set(this.className.split(' ').filter(Boolean)); if(on)set.add(name);else set.delete(name);this.className=[...set].join(' ');}};
  }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children=[...children]; }
  setAttribute(k,v) { this.attrs[k]=String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  addEventListener(k,f) { (this.events[k] ||= []).push(f); }
  async fire(k,event={}) { for(const f of this.events[k] || []) await f({preventDefault(){},target:this,...event}); }
  click() { return this.fire('click'); }
  focus() {} scrollIntoView() {}
  get options() { return this.children.filter(c=>c.tag==='option'); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  querySelectorAll(selector) {
    const elements=this.children.flatMap(c=>[c,...c.querySelectorAll('*')]);
    return elements.filter(el=>selector==='*' || selector===el.tag || (selector.startsWith('.') && el.className.split(' ').includes(selector.slice(1))));
  }
}
function boot(bank=fixtures,storageValue=null,blockStorage=false) {
  const html=fs.readFileSync(path.join(root,'practice.html'),'utf8'); const ids={};
  for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) { const el=new Element(m[1]); el.id=m[3]; el.hidden=/\bhidden\b/.test(m[2]); ids[el.id]=el; }
  for(const m of html.matchAll(/<select id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    for(const o of m[2].matchAll(/<option(?: value="([^"]+)")?>([^<]*)<\/option>/g)) { const el=new Element('option'); el.value=o[1]||o[2];el.textContent=o[2]; ids[m[1]].append(el); }
    ids[m[1]].value=ids[m[1]].options[0].value;
  }
  const scopes=['all','unanswered','wrong','bookmarked'].map(scope=>{const e=new Element('button');e.dataset={scope};return e;});
  const noteDetails=new Element('details'); const timers=[]; const blobs=[]; let stored=storageValue;
  const descendants=()=>Object.values(ids).flatMap(e=>[e,...e.querySelectorAll('*')]);
  const document={getElementById:id=>ids[id] || null,createElement:tag=>{const e=new Element(tag);if(tag==='input'||tag==='textarea')Object.defineProperty(e,'id',{set(id){this._id=id;ids[id]=this;},get(){return this._id;}});return e;},
    querySelector(selector){if(selector==='.note-details')return noteDetails;return this.querySelectorAll(selector)[0]||null;},
    querySelectorAll(selector){
      if(selector==='[data-scope]')return scopes;
      if(selector==='.choice-option')return ids['answer-inputs'].querySelectorAll('.choice-option');
      if(selector==='input[name="answer"]:checked')return ids['answer-inputs'].querySelectorAll('input').filter(e=>e.name==='answer'&&e.checked);
      if(selector==='#answer-inputs input, #answer-inputs textarea')return ids['answer-inputs'].querySelectorAll('*').filter(e=>e.tag==='input'||e.tag==='textarea');
      return descendants().filter(e=>e.tag===selector);
    }};
  const context={window:{QUESTION_BANK:bank,QUESTION_SUBJECTS:['S1','S2']},document,localStorage:{getItem:()=>stored,setItem:(k,v)=>{if(blockStorage)throw Error('blocked');stored=v;}},Date,Blob,URL:{createObjectURL:blob=>{blobs.push(blob);return 'blob:test';},revokeObjectURL(){}},console,confirm:()=>true,matchMedia:()=>({matches:true}),setTimeout:f=>{timers.push(f);return timers.length;},clearTimeout:i=>{timers[i-1]=null;}};
  vm.createContext(context); for(const file of ['practice-core.js','practice.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  const app={ids,scopes,blobs,state:()=>stored?JSON.parse(stored):null,raw:()=>stored,
    async change(id,value){ids[id].value=value;await ids[id].fire('change');},
    async input(id,value){ids[id].value=value;await ids[id].fire('input');},
    async submit(){await ids['answer-form'].fire('submit');},
    async scope(scope){await scopes.find(s=>s.dataset.scope===scope).click();},
    async choose(index){const radios=ids['answer-inputs'].querySelectorAll('input');radios.forEach((r,i)=>r.checked=i===index);await ids['answer-inputs'].fire('input');},
    flush(){for(const f of timers.splice(0))if(f)f();}
  };return app;
}
test('empty production state renders waiting page and zero stats without errors',()=>{
  const a=boot([]);assert.equal(a.ids['stat-attempted'].textContent,'0 / 0');assert.equal(a.ids['question-card'].hidden,true);assert.equal(a.ids['empty-title'].textContent,'题库正在等你。');assert.equal(a.ids['question-map'].hidden,true);assert.equal(a.ids['empty-reset'].hidden,true);
});
test('choice grading, bookmark, notes, wrong retry and stable wrong list',async()=>{
  const a=boot();await a.submit();assert.match(a.ids.feedback.textContent,/先输入或选择/);
  await a.choose(0);await a.submit();assert.equal(a.state().records['qa-choice'].correct,false);assert.equal(a.ids.explanation.hidden,false);
  await a.ids.bookmark.click();await a.input('question-note','saved note');await a.scope('wrong');await a.ids.retry.click();await a.choose(1);await a.submit();
  assert.equal(a.state().records['qa-choice'].correct,true);assert.equal(a.state().records['qa-choice'].note,'saved note');assert.equal(a.state().records['qa-choice'].bookmarked,true);assert.equal(a.ids['question-grid'].children.length,1);
  await a.ids['refresh-list'].click();assert.equal(a.ids['empty-state'].hidden,false);
});
test('numeric validation, grading and persisted position',async()=>{
  const a=boot();await a.change('type','numeric');await a.input('response','0.5 V');await a.submit();assert.match(a.ids.feedback.textContent,/有效数值/);assert.equal(a.state().records['qa-number'],undefined);
  await a.input('response','1/2');await a.submit();assert.equal(a.state().records['qa-number'].correct,true);
  const b=boot(fixtures,a.raw());assert.equal(b.ids.response.value,'1/2');assert.equal(b.ids.response.disabled,true);assert.match(b.ids['question-title'].textContent,/number/);
});
test('revealing objective answer does not score; retry reenables grading',async()=>{
  const a=boot();await a.ids['show-answer'].click();assert.equal(a.ids['submit-answer'].disabled,true);assert.equal(a.state().records['qa-choice'],undefined);
  await a.ids.retry.click();await a.choose(1);await a.submit();assert.equal(a.state().records['qa-choice'].attempts,1);
});
test('written self-assessment saves answer, locks buttons and updates notebook',async()=>{
  const a=boot();await a.change('type','written');await a.input('response','derivation');await a.ids['answer-inputs'].fire('input');await a.submit();assert.equal(a.ids['self-grade'].hidden,false);
  await a.ids['mark-wrong'].click();assert.equal(a.state().records['qa-written'].correct,false);assert.equal(a.state().records['qa-written'].answer,'derivation');assert.equal(a.ids['self-grade'].hidden,true);
  await a.ids['mark-correct'].click();assert.equal(a.state().records['qa-written'].attempts,1);
});
test('filters, chapter reset, search, shuffle and navigation execute',async()=>{
  const a=boot();await a.change('chapter','C2');assert.equal(a.ids['question-grid'].children.length,1);
  await a.change('subject','S2');assert.equal(a.ids.chapter.value,'all');assert.equal(a.ids['question-grid'].children.length,1);
  await a.ids['reset-filters'].click();await a.input('search','nothing matches');a.flush();assert.equal(a.ids['empty-state'].hidden,false);
  await a.ids['empty-reset'].click();await a.change('order','random');assert.equal(a.ids['question-grid'].children.length,3);
  await a.ids['question-grid'].children[2].click();assert.equal(a.ids.next.disabled,true);assert.equal(a.ids.previous.disabled,false);
});
test('backup export, invalid import and confirmed import preserve expected records',async()=>{
  const a=boot();await a.input('question-note','backup note');await a.ids['export-progress'].click();const backup=JSON.parse(await a.blobs[0].text());assert.equal(backup.records['qa-choice'].note,'backup note');
  a.ids['import-file'].files=[{size:7,text:async()=>'{bad'}];await a.ids['import-file'].fire('change');assert.match(a.ids['storage-status'].textContent,/导入失败/);assert.equal(a.state().records['qa-choice'].note,'backup note');
  backup.records['qa-choice'].note='imported note';a.ids['import-file'].files=[{size:100,text:async()=>JSON.stringify(backup)}];await a.ids['import-file'].fire('change');assert.equal(a.state().records['qa-choice'].note,'imported note');assert.match(a.ids['storage-status'].textContent,/导入成功/);
});
test('corrupted existing storage is not overwritten; blocked saving is surfaced',()=>{
  const a=boot([],'corrupt data');assert.equal(a.raw(),'corrupt data');assert.match(a.ids['storage-status'].textContent,/无法读取/);
  const b=boot([],null,true);assert.match(b.ids['storage-status'].textContent,/无法保存/);
});
test('all local page assets and navigation destinations exist; IDs are unique',()=>{
  for(const name of ['index.html','practice.html']) {
    const html=fs.readFileSync(path.join(root,name),'utf8'); const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
    for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {if(/^(?:https?:|data:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split('#')[0])),m[1]);}
  }
});
