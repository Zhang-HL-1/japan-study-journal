const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test'),path=require('node:path');
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
const root=path.join(__dirname,'..');
function boot(records=[]) {
 const ids={};const html=fs.readFileSync(root+'/exam-scope.html','utf8');
 for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)){const e=new Element(m[1]);e.id=m[3];e.dataset={};e.hidden=/\bhidden\b/.test(m[2]);ids[m[3]]=e;}
 const all=new Element('button');all.dataset={university:'all'};ids['school-buttons'].append(all);
 const tabs=['general','international'].map(admission=>{const e=new Element('button');e.dataset={admission};return e;});
 const nodes=()=>[...Object.values(ids),...Object.values(ids).flatMap(e=>e.querySelectorAll('*')),...tabs];
 const doc={getElementById:id=>ids[id],createElement:tag=>{const e=new Element(tag);e.dataset={};e.remove=()=>{};return e;},createTextNode:text=>new Element('text'),querySelectorAll:s=>nodes().filter(e=>s==='[data-university]'?e.dataset?.university:s==='[data-admission]'?e.dataset?.admission:false)};
 const data=require(root+'/exam-scope-data.js');const win={ExamScopeCore:require(root+'/exam-scope-core.js'),EXAM_SCOPE_DATA:{...data,records}};
 vm.runInNewContext(fs.readFileSync(root+'/exam-scope.js','utf8'),{window:win,document:doc,URL,Set,console});
 return {ids,tabs,nodes};
}
const catalog=require('../exam-scope-data.js');
const school=(a,id)=>a.ids['school-buttons'].children.find(e=>e.dataset.university===id);
test('school filters switch coverage notes, graduate options and pending school text',async()=>{
 const a=boot(catalog.records);
 const generalCount=a.ids['scope-results'].children.length;
 assert.equal(a.ids['scope-data-error'].hidden,true);
 assert.match(a.ids['data-status'].children[1].textContent,/東京大学、京都大学与早稲田大学/);
 await school(a,'kyoto').click();
 assert.match(a.ids['data-status'].children[1].textContent,/京都大学：/);
 assert.equal(a.ids['scope-graduate'].options.length,5);
 assert.equal(a.ids['scope-results'].children.length,49);
 await school(a,'utokyo').click();
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.utokyo.note);
 await school(a,'science-tokyo').click();
 assert.equal(a.ids['scope-results'].hidden,true);
 assert.match(a.ids['scope-empty-copy'].textContent,/東京大学、京都大学、早稲田大学/);
 await a.ids['scope-empty-reset'].click();
 assert.equal(a.ids['scope-results'].children.length,generalCount);
});
test('Kyoto original strings and actual PDF pages render without alteration',async()=>{
 const a=boot(catalog.records); await school(a,'kyoto').click();
 a.ids['scope-graduate'].value='情報学研究科';await a.ids['scope-graduate'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,7);
 assert.equal(a.ids['scope-department'].options[1].value,'情報学専攻');
 a.ids['scope-query'].value='通信情報システム';await a.ids['scope-query'].fire('input');
 assert.equal(a.ids['scope-results'].children.length,1);await a.ids['scope-results'].children[0].click();
 const record=catalog.records.find(e=>e.id==='kyoto-info-communication');
 const originals=a.ids['scope-detail'].children.filter(e=>e.className==='original-text');
 assert.equal(originals[0].textContent,record.subjectsOriginal);
 assert.equal(originals[1].textContent,record.scopeOriginal);
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=20'));
 await a.tabs[1].click();
 assert.ok(a.ids['scope-results'].children.length);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-route-note'&&e.textContent.includes('一般选拔入口')));
});
test('international tab distinguishes winter notices and excludes them from general tab',async()=>{
 const a=boot(catalog.records);await school(a,'kyoto').click();
 assert.ok(!a.ids['scope-results'].children.some(e=>e.dataset.id==='kyoto-eng-chem-winter-polymer'));
 await a.tabs[1].click();
 const notice=a.ids['scope-results'].children.find(e=>e.dataset.id==='kyoto-eng-chem-winter-polymer');assert.ok(notice);
 assert.match(notice.children.find(e=>e.className==='scope-record-status').textContent,/变更预告/);
 await notice.click();
 assert.match(a.ids['scope-detail'].children.find(e=>e.className==='scope-record-status').textContent,/完整募集要项待公布/);
 const record=catalog.records.find(e=>e.id===notice.dataset.id);
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===record.scopeOriginal));
});
test('Kyoto alias search does not confuse 東京大学 and preserves a usable result list',async()=>{
 const a=boot(catalog.records);a.ids['scope-query'].value='京大 電磁気学';await a.ids['scope-query'].fire('input');
 assert.ok(a.ids['scope-results'].children.length);
 assert.ok(a.ids['scope-results'].children.every(e=>e.dataset.id.startsWith('kyoto-')));
});
test('Waseda filters render original department scope and its official PDF page',async()=>{
 const a=boot(catalog.records); await school(a,'waseda').click();
 assert.match(a.ids['data-status'].children[1].textContent,/早稲田大学：/);
 assert.equal(a.ids['scope-graduate'].options.length,6);
 assert.equal(a.ids['scope-results'].children.length,26);
 a.ids['scope-department'].value='電子物理システム学専攻'; await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,1); await a.ids['scope-results'].children[0].click();
 const record=catalog.records.find(record=>record.id==='waseda-electronic-physical');
 assert.equal(a.ids['scope-detail'].children.find(e=>e.className==='original-text'&&e.textContent===record.scopeOriginal).lang,'ja');
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=3'));
 await a.tabs[1].click();
 assert.equal(a.ids['scope-results'].children.length,42);
 const ao=a.ids['scope-results'].children.find(e=>e.dataset.id==='waseda-electronic-physical-ao'); assert.ok(ao);
 await ao.click(); assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'));
});
test('Waseda closed master admission is clearly labeled and has no fabricated examination scope',async()=>{
 const a=boot(catalog.records);await school(a,'waseda').click();
 const closed=a.ids['scope-results'].children.find(e=>e.dataset.id==='waseda-nano-closed');assert.ok(closed);
 assert.equal(closed.children.find(e=>e.className==='scope-record-status').textContent,'修士募集停止');
 await closed.click();
 assert.match(a.ids['scope-detail'].children.find(e=>e.className==='scope-record-status').textContent,/募集停止/);
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
 await a.tabs[1].click();
 assert.ok(!a.ids['scope-results'].children.some(e=>e.dataset.id==='waseda-nano-closed'));
});
