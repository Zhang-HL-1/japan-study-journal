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
function boot(bank=fixtures,storageValue=null,blockStorage=false,options={}) {
  const html=fs.readFileSync(path.join(root,'drill.html'),'utf8'); const ids={};
  for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) { const el=new Element(m[1]); el.id=m[3]; el.hidden=/\bhidden\b/.test(m[2]); ids[el.id]=el; }
  for(const m of html.matchAll(/<select id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    for(const o of m[2].matchAll(/<option(?: value="([^"]+)")?>([^<]*)<\/option>/g)) { const el=new Element('option'); el.value=o[1]||o[2];el.textContent=o[2]; ids[m[1]].append(el); }
    ids[m[1]].value=ids[m[1]].options[0].value;
  }
  const scopes=['all','unanswered','wrong','bookmarked'].map(scope=>{const e=new Element('button');e.dataset={scope};return e;});
  const noteDetails=new Element('details'); const timers=[]; const blobs=[];
  const practiceKey='japan-study-journal:practice:v1'; const store=new Map(options.extraStorage||[]); if(storageValue!=null) store.set(practiceKey,storageValue);
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
  document.documentElement={dataset:{}};
  const context={window:{PastPapersCore:require('../past-papers-core.js'),QuestionBank:require('../question-bank.js'),QUESTION_BANK:bank,QUESTION_SUBJECTS:['S1','S2']},document,localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>{if(blockStorage)throw Error('blocked');store.set(k,v);}},sessionStorage:{getItem:()=>null,setItem(){}},Date,Blob,URLSearchParams,URL:{createObjectURL:blob=>{blobs.push(blob);return 'blob:test';},revokeObjectURL(){}},console,confirm:()=>true,matchMedia:()=>({matches:true}),setTimeout:f=>{timers.push(f);return timers.length;},clearTimeout:i=>{timers[i-1]=null;}};
  if(options.fetch){ context.fetch=options.fetch; context.window.fetch=options.fetch; }
  vm.createContext(context); for(const file of ['practice-core.js','practice.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  const app={ids,scopes,blobs,store,dataset:document.documentElement.dataset,state:()=>store.has(practiceKey)?JSON.parse(store.get(practiceKey)):null,raw:()=>store.has(practiceKey)?store.get(practiceKey):null,ready:context.window.__questionBankReady,
    async change(id,value){ids[id].value=value;await ids[id].fire('change');},
    async input(id,value){ids[id].value=value;await ids[id].fire('input');},
    async submit(){await ids['answer-form'].fire('submit');},
    async scope(scope){await scopes.find(s=>s.dataset.scope===scope).click();},
    async choose(index){const radios=ids['answer-inputs'].querySelectorAll('input');radios.forEach((r,i)=>r.checked=i===index);await ids['answer-inputs'].fire('input');},
    flush(){for(const f of timers.splice(0))if(f)f();}
  };return app;
}
test('empty production state renders waiting page and zero stats without errors',()=>{
  const a=boot([]);assert.equal(a.ids['stat-attempted'].textContent,'0 / 0');assert.equal(a.ids['question-card'].hidden,true);assert.equal(a.ids['empty-title'].textContent,'题库正在等你。');assert.equal(a.ids['question-map'].hidden,true);assert.equal(a.ids['empty-reset'].hidden,true);assert.equal(a.ids['list-count'].textContent,'题库筹备中 · 0 题');
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
  for(const name of ['index.html','practice.html','drill.html','past-papers.html','answers.html']) {
    const html=fs.readFileSync(path.join(root,name),'utf8'); const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
    for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {if(/^(?:https?:|data:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])),m[1]);}
  }
});

test('missing question data shows a load failure instead of an endless loading message',()=>{
 const a=boot(null);assert.equal(a.ids['list-count'].textContent,'题库加载失败');assert.equal(a.ids['empty-state'].hidden,false);assert.equal(a.raw(),null);
});


test('source controls cascade, mix, restore and reset with real interaction handlers',async()=>{
 const bank=fixtures.map(q=>({...q}));
 bank[0].provenance={kind:'exam',school:'A',graduate:'G',major:'M',year:'2025',number:'1'};
 bank[1].provenance={kind:'exam',school:'B',graduate:'G',major:'M'};
 bank[2].provenance={kind:'workbook',book:'Book',edition:'2',number:'3'};
 const a=boot(bank);
 await a.change('sourceKind','exam');assert.equal(a.ids['book-filters'].hidden,true);
 await a.change('school','A');assert.equal(a.ids.major.options.length,2);
 await a.change('major',JSON.stringify(['A','G','M']));assert.equal(a.ids['question-grid'].children.length,1);
 assert.match(a.ids['question-source'].textContent,/历年真题.*A.*2025/);
 const restored=boot(bank,a.raw());assert.equal(restored.ids.school.value,'A');assert.equal(restored.ids.major.value,JSON.stringify(['A','G','M']));
 await a.change('school','B');assert.equal(a.ids.major.value,'all');assert.match(a.ids['question-title'].textContent,/number/);
 await a.change('sourceKind','all');assert.equal(a.ids.school.value,'all');assert.equal(a.ids['question-grid'].children.length,3);
 await a.change('school','A');await a.change('book','Book');assert.equal(a.ids['question-grid'].children.length,2);
 await a.change('sourceKind','workbook');assert.equal(a.ids['exam-filters'].hidden,true);assert.equal(a.ids['question-grid'].children.length,1);
 await a.ids['reset-filters'].click();assert.equal(a.ids.sourceKind.value,'all');assert.equal(a.ids['question-grid'].children.length,3);
});

test('whole paper reader preserves sources and completion without grading or answer fabrication',async()=>{
 const q=require('../questions.js').find(q=>q.paper.files.filter(f=>f.kind==='question').length>1&&!q.paper.files.some(f=>f.kind==='answer'));
 const a=boot([q]);assert.equal(a.ids['paper-practice'].hidden,false);assert.equal(a.ids['answer-form'].hidden,true);
 assert.match(a.ids['practice-answer-status'].textContent,/未收录参考答案/);
 const files=q.paper.files.filter(f=>f.kind==='question');assert.equal(a.ids['practice-paper-reader'].children.length,1);
 await a.ids['practice-paper-files'].children[1].click();assert.equal(a.ids['practice-paper-reader'].children[0].src,require('../past-papers-core.js').fileURL(files[1]));
 await a.input('question-note','paper note');await a.ids.bookmark.click();await a.ids['complete-paper'].click();
 assert.equal(a.state().records[q.id].completed,true);assert.equal(a.ids['stat-accuracy'].textContent,'—');assert.equal(a.ids['stat-attempted'].textContent,'1 / 1');
 const b=boot([q],a.raw());assert.equal(b.state().records[q.id].completed,true);assert.equal(b.ids['question-note'].value,'paper note');
 await b.scope('unanswered');assert.equal(b.ids['question-card'].hidden,true);assert.equal(b.ids['practice-paper-reader'].children.length,0);
 await b.ids['reset-filters'].click();await b.ids['complete-paper'].click();assert.equal(b.state().records[q.id].completed,false);
});

test('catalog completion stored in practice:v1 is shown as completed by drill', async () => {
  const progress = require('../progress-sync.js');
  require('../practice-core.js');
  const completion = require('../paper-set-completion.js');
  const q = require('../questions.js').find(item => item.type === 'paper' && item.paper && item.paper.catalogId);
  const values = new Map();
  const storage = { getItem: key => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, String(value)) };
  assert.equal(completion.toggle(q.paper.catalogId, storage, [q], '2026-10-22').completed, true);
  assert.deepEqual([...values.keys()], [progress.PRACTICE_KEY]);
  const drill = boot([q], values.get(progress.PRACTICE_KEY));
  assert.equal(drill.ids['complete-paper'].textContent, '取消已练习标记');
  assert.match(drill.ids['paper-completion'].textContent, /本套已练习/);
  await drill.ids['complete-paper'].click();
  assert.equal(drill.ids['complete-paper'].textContent, '标记本套已练习');
  assert.match(drill.ids['paper-completion'].textContent, /尚未标记完成/);
  assert.equal(completion.isCompleted(q.paper.catalogId, { getItem: () => drill.raw(), setItem() {} }, [q]), false);
});

test('named practice picker navigates, updates completion and exits focus without losing records',async()=>{
  const a=boot();
  assert.equal(a.ids['practice-picker'].options.length,3);
  assert.match(a.ids['practice-picker'].options[1].textContent,/fixture number/);
  await a.change('practice-picker','1');
  assert.equal(a.state().current,'qa-number');
  await a.input('question-note','keep this note');
  await a.ids['focus-practice'].click();
  assert.equal(a.ids['focus-practice'].getAttribute('aria-pressed'),'true');
  await a.ids['focus-practice'].click();
  assert.equal(a.ids['focus-practice'].getAttribute('aria-pressed'),'false');
  assert.equal(a.state().records['qa-number'].note,'keep this note');
});

test('indexed question papers filter beside whole papers and link out without PDF or practice records', async () => {
  const paper = require('../questions.js').find(q => q.id === 'paper:kobe-ee-2026');
  const index = require('../question-bank-index.json');
  const legacyKey = 'japan-study-journal:question-demo:v1';
  const legacy = JSON.stringify({ version: 1, records: {
    'kobe-ee-2026-denjiki-q1': { completed: true, bookmarked: true, note: '边界', updatedAt: 5 },
    'kobe-ee-2026-denjiki-q2': { completed: true, bookmarked: false, note: '', updatedAt: 6 }
  } });
  const fetchImpl = async url => ({ ok: true, json: async () => JSON.parse(fs.readFileSync(path.join(root, String(url).split('?')[0]), 'utf8')) });
  const a = boot([paper], null, false, { fetch: fetchImpl, extraStorage: [[legacyKey, legacy]] });
  await a.ready;
  assert.equal(a.dataset.questionBank, 'ready');
  assert.equal(String(a.ids['bank-size'].textContent), String(1 + index.papers.length));
  assert.equal(a.dataset.questionBank, 'ready');
  await a.change('practiceMode', 'questions');
  await a.change('school', '神戸大学');
  await a.change('paperYear', '2026');
  await a.change('subject', '电磁学');
  assert.equal(a.ids['question-grid'].children.length, 1);
  assert.equal(a.ids['paper-practice'].hidden, true);
  assert.equal(a.ids['question-set-practice'].hidden, false);
  assert.equal(a.ids['practice-paper-reader'].children.length, 0);
  assert.equal(a.ids['question-set-links'].querySelector('a').href, 'question-practice.html?paper=kobe-ee-2026-denjiki');
  assert.match(a.ids['question-set-items'].querySelector('a').href, /q=kobe-ee-2026-denjiki-q1/);
  assert.match(a.ids['question-set-progress'].textContent, /2 \/ 2/);
  assert.equal(a.state().records['kobe-ee-2026-denjiki'], undefined);
  assert.equal(a.state().current, 'kobe-ee-2026-denjiki');
  await a.ids.bookmark.click();
  assert.equal(a.state().records['kobe-ee-2026-denjiki'], undefined);
  await a.change('school', '東京理科大学');
  await a.change('major', JSON.stringify(['東京理科大学','創域理工学研究科','電気電子情報工学専攻']));
  await a.change('paperYear', 'all');
  await a.change('subject', '电子电路');
  assert.equal(a.ids['question-grid'].children.length, 1);
  assert.match(a.ids['question-title'].textContent, /电子电路/);
  await a.change('subject', '电路与模拟电子');
  assert.equal(a.ids['question-grid'].children.length, 2);
  await a.change('practiceMode', 'paper');
  await a.change('school', '神戸大学');
  await a.change('paperYear', '2026');
  await a.change('subject', '电磁学');
  assert.equal(a.ids['question-grid'].children.length, 1);
  assert.equal(a.ids['paper-practice'].hidden, false);
  assert.equal(a.ids['question-set-practice'].hidden, true);
  assert.equal(a.ids['practice-paper-reader'].children.length, 1);
});
