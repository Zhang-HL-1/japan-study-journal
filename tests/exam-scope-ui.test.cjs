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
test('Rikkyo filters show the same eligible general entry in the foreign view and open actual PDF page 18',async()=>{
 const a=boot(catalog.records);await school(a,'rikkyo').click();assert.equal(a.ids['scope-results'].children.length,1);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.rikkyo.note);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,1);await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-route-note'&&e.textContent.includes('一般选拔入口')));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('未知の問題')&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('guidelines_ai_master.pdf#page=18'));
 a.ids['scope-query'].value='Rikkyo 人工智能';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,1);
});
test('Aoyama course filters open the current official range and keep foreign scope unknown',async()=>{
 const a=boot(catalog.records);await school(a,'aoyama').click();assert.equal(a.ids['scope-results'].children.length,5);
 assert.equal(a.ids['scope-field'].options.length,6);assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.aoyama.note);
 a.ids['scope-field'].value='機械創造コース';await a.ids['scope-field'].fire('change');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('一つの系の全ての問題')));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('2027_in_riko_September-1.pdf#page=14'));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,10);
 a.ids['scope-field'].value='機械創造コース';await a.ids['scope-field'].fire('change');assert.equal(a.ids['scope-results'].children.length,2);
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='aoyama-mechanical-international-private-2027').click();
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='p'&&e.textContent.includes('没有公布')));
});
test('UEC program and month filters retain real foreign general entries and open the detailed range page',async()=>{
 const a=boot(catalog.records);await school(a,'uec').click();assert.equal(a.ids['scope-results'].children.length,26);
 assert.equal(a.ids['scope-graduate'].options.length,2);assert.equal(a.ids['scope-department'].options.length,5);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,26);
 a.ids['scope-department'].value='基盤理工学専攻';await a.ids['scope-department'].fire('change');assert.equal(a.ids['scope-field'].options.length,4);
 a.ids['scope-field'].value='電子工学プログラム';await a.ids['scope-field'].fire('change');assert.equal(a.ids['scope-results'].children.length,2);
 a.ids['scope-year'].value='2026年10月';await a.ids['scope-year'].fire('change');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('全11科目')&&e.lang==='ja'));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('4月入学のみ')));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('ie-p-gene-itn_2027.pdf#page=16'));
});
test('Nagoya filters retain general eligibility and open the actual AI exam table without filling foreign unknown scopes',async()=>{
 const a=boot(catalog.records);await school(a,'nagoya').click();assert.equal(a.ids['scope-results'].children.length,29);
 assert.equal(a.ids['scope-graduate'].options.length,3);assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.nagoya.note);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,41);
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='nagoya-intelligent-systems-general').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('Python 3')&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('7c87fb3ffa6e880b002fdf3d65f61582.pdf#page=14'));
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='nagoya-electrical-1-international-unverified').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='p'&&e.textContent.includes('待核验')));assert.ok(!a.ids['scope-detail'].children.some(e=>e.className==='original-text'));
});
test('Kobe filters the formal fields, renders foreign systems subjects, and opens the real exam-table page',async()=>{
 const a=boot(catalog.records);await school(a,'kobe').click();assert.equal(a.ids['scope-results'].children.length,6);
 assert.equal(a.ids['scope-graduate'].options.length,5);assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.kobe.note);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,14);
 const row=a.ids['scope-results'].children.find(e=>e.dataset.id==='kobe-systems-international');assert.ok(row);await row.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===catalog.records.find(r=>r.id===row.dataset.id).subjectsOriginal));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('x_master_ippan_202608.pdf#page=33'));
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='kobe-ee-foreign-second-pending').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='p'&&e.textContent.includes('待公布')));
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.className==='original-text'));
});
test('Sophia school filters expose one formal engineering department, three divisions and the independent data science program',async()=>{
 const a=boot(catalog.records);await school(a,'sophia').click();
 assert.equal(a.ids['scope-results'].children.length,20);assert.equal(a.ids['scope-graduate'].options.length,3);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.sophia.note);assert.equal(a.ids['scope-directions'].hidden,true);
 a.ids['scope-graduate'].value='理工学研究科';await a.ids['scope-graduate'].fire('change');
 assert.equal(a.ids['scope-department'].options.length,2);assert.equal(a.ids['scope-field'].options.length,4);assert.equal(a.ids['scope-results'].children.length,15);
 a.ids['scope-field'].value='電気・電子工学領域';await a.ids['scope-field'].fire('change');assert.equal(a.ids['scope-results'].children.length,5);
 await school(a,'sophia').click();await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,17);
 a.ids['scope-query'].value='上智 电气电子';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,4);
});
test('Sophia electrical details keep official Japanese original text and open the actual written table page',async()=>{
 const a=boot(catalog.records);await school(a,'sophia').click();
 a.ids['scope-query'].value='電気・電子工学領域 2月 理工基礎';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();
 const r=catalog.records.find(r=>r.id==='sophia-st-electrical-february-general');
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.scopeOriginal&&e.lang==='ja'));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.conditionsOriginal));
 const s=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await s.children.find(e=>e.tag==='button').click();
 assert.ok(s.children.find(e=>e.tag==='iframe').src.endsWith('9_rikougakukenkyuuka_2027.pdf#page=4'));
});
test('Sophia data science remains visible in the foreign view without a fabricated English or foreign-special selection',async()=>{
 const a=boot(catalog.records);await school(a,'sophia').click();await a.tabs[1].click();
 a.ids['scope-query'].value='Sophia 应用数据科学';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,5);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-route-note'&&e.textContent.includes('一般选拔入口')));
 a.ids['scope-query'].value='Sophia 应用数据科学 2月 一般入試';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('国内出願のみ')&&e.textContent.includes('N1合格')));
 const s=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await s.children.find(e=>e.tag==='button').click();
 assert.ok(s.children.find(e=>e.tag==='iframe').src.endsWith('11_ouyoudsprogram_2027.pdf#page=3'));
});
test('Keio direction entries replace stale filters and show current scopes in both admission views',async()=>{
 const a=boot(catalog.records);
 assert.equal(a.ids['scope-directions'].hidden,true);
 await school(a,'keio').click();
 assert.equal(a.ids['scope-directions'].hidden,false);
 assert.equal(a.ids['scope-direction-buttons'].children.length,11);
 a.ids['scope-department'].value='総合デザイン工学専攻';await a.ids['scope-department'].fire('change');
 a.ids['scope-field'].value='教育研究分野：電気情報工学';await a.ids['scope-field'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,3);
 await a.ids['scope-direction-buttons'].children.find(e=>e.textContent==='数理科学').click();
 assert.equal(a.ids['scope-department'].value,'all');assert.equal(a.ids['scope-field'].value,'all');
 assert.equal(a.ids['scope-results'].children.length,3);
 assert.ok(a.ids['scope-results'].children.every(e=>e.dataset.id.startsWith('keio-st-math-')));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,5);
 for(const guide of catalog.catalog.keio.directionGuides) {
  await a.ids['scope-direction-buttons'].children.find(e=>e.textContent===guide.label).click();
  assert.ok(a.ids['scope-results'].children.length>0,guide.label);
  assert.equal(a.ids['scope-direction-note'].textContent,guide.note);
 }
 await a.ids['scope-direction-buttons'].children.find(e=>e.textContent==='マテリアルデザイン科学').click();
 assert.equal(a.ids['scope-results'].children.length,15);
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='keio-st-emerging-physico-chemistry-august').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('論理的説明力・思考力')));
 await a.ids['scope-reset'].click();assert.equal(a.ids['scope-directions'].hidden,true);
 assert.equal(a.ids['scope-field'].value,'all');assert.equal(a.ids['scope-query'].value,'');
});
test('Keio school and field filters render current papers at their actual PDF page',async()=>{
 const a=boot(catalog.records);await school(a,'keio').click();
 assert.equal(a.ids['scope-graduate'].options.length,5);assert.equal(a.ids['scope-results'].children.length,44);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.keio.note);
 a.ids['scope-graduate'].value='理工学研究科';await a.ids['scope-graduate'].fire('change');
 assert.equal(a.ids['scope-department'].options.length,5);
 a.ids['scope-department'].value='総合デザイン工学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,9);
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='keio-st-mechanical-august');assert.ok(entry);await entry.click();
 const r=catalog.records.find(r=>r.id===entry.dataset.id);
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.conditionsOriginal&&e.lang==='ja'));
 const s=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await s.children.find(e=>e.tag==='button').click();
 assert.ok(s.children.find(e=>e.tag==='iframe').src.endsWith('eabf02ff6d7086df662f583a7517435fc1fa8511d4b8709b5b64da204ac26a09#page=18'));
 await school(a,'keio').click();await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,66);
 a.ids['scope-query'].value='庆应 IGP';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,33);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('GRE General Test')));
});
test('Keio electrical Chinese and Japanese searches expose official names and the explanatory mapping',async()=>{
 const a=boot(catalog.records);
 a.ids['scope-query'].value='庆应 电气电子工学';await a.ids['scope-query'].fire('input');
 assert.equal(a.ids['scope-results'].children.length,3);
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='keio-st-electrical-august');assert.ok(entry);await entry.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='h3'&&e.textContent==='総合デザイン工学専攻 · 教育研究分野：電気情報工学'));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-route-note'&&e.textContent.includes('电气电子方向对应当前正式招生分野')));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('記述試問：電気回路、情報工学、物性工学、数学')));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,5);
 a.ids['scope-query'].value='慶應 電気電子工学';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,5);
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='keio-st-electrical-igp-i-4').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('GRE General Test')));
});
test('Keio SFC overseas and KMD keep their real general selections in both admission views',async()=>{
 const a=boot(catalog.records);await school(a,'keio').click();
 a.ids['scope-query'].value='慶應 海外出願';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,2);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('2分以内・50MB以内')));
 await school(a,'keio').click();a.ids['scope-query'].value='KMD';await a.ids['scope-query'].fire('input');
 // KMD is an editorial abbreviation; search supports the full official graduate-school name.
 a.ids['scope-query'].value='メディアデザイン研究科';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,2);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('英語・オンライン')));
});
test('Hokkaido filters both selected graduate schools and opens the actual specialist PDF page',async()=>{
 const a=boot(catalog.records);await school(a,'hokkaido').click();
 assert.equal(a.ids['scope-graduate'].options.length,3);
 assert.equal(a.ids['scope-results'].children.length,15);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.hokkaido.note);
 a.ids['scope-graduate'].value='情報科学院';await a.ids['scope-graduate'].fire('change');
 assert.deepEqual(a.ids['scope-department'].options.slice(1).map(e=>e.value),['情報科学専攻']);
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='hokkaido-ist-bio-general');assert.ok(entry);await entry.click();
 const r=catalog.records.find(r=>r.id===entry.dataset.id);
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.scopeOriginal&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('R09_Apr_master_Adm_Jp.pdf#page=10'));
 await school(a,'hokkaido').click();await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,27);
 a.ids['scope-query'].value='北大 e3';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,6);
 await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('Document Screening')));
});
test('Hokkaido pending second calls show their status without fabricated original subjects',async()=>{
 const rs=catalog.records.filter(r=>r.universityId==='hokkaido'&&r.publicationStatus==='pending');
 const a=boot(rs);await school(a,'hokkaido').click();assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children.find(e=>e.dataset.id==='hokkaido-eng-materials-second-pending').click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='p'&&e.textContent.includes('待公布')));
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.className==='original-text'));
});
test('Kyushu filters all seven faculties and renders current original scope at its real PDF page',async()=>{
 const a=boot(catalog.records);await school(a,'kyushu').click();
 assert.equal(a.ids['scope-graduate'].options.length,8);
 assert.equal(a.ids['scope-results'].children.length,84);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.kyushu.note);
 a.ids['scope-graduate'].value='システム情報科学府';await a.ids['scope-graduate'].fire('change');
 assert.deepEqual(a.ids['scope-department'].options.slice(1).map(e=>e.value),['情報理工学専攻','電気電子工学専攻']);
 a.ids['scope-department'].value='電気電子工学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,4);
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='kyushu-isee-energy-devices-general-written');await entry.click();
 const r=catalog.records.find(r=>r.id===entry.dataset.id);
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.scopeOriginal&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('2027mc_general_guidelines_20260420.pdf#page=10'));
 await school(a,'kyushu').click();await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,119);
 a.ids['scope-query'].value='九大 Nernst Equation';await a.ids['scope-query'].fire('input');
 assert.equal(a.ids['scope-results'].children.length,1);await a.ids['scope-results'].children[0].click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('Nernst Equation')));
});
test('Kyushu designated Earth groups and seasonal life examinations remain separate in filters',async()=>{
 const a=boot(catalog.records);await school(a,'kyushu').click();
 a.ids['scope-graduate'].value='理学府';await a.ids['scope-graduate'].fire('change');
 a.ids['scope-department'].value='地球惑星科学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,19);
 await school(a,'kyushu').click();a.ids['scope-query'].value='九州大学 秋季';await a.ids['scope-query'].fire('input');
 assert.equal(a.ids['scope-results'].children.length,2);
 const essay=a.ids['scope-results'].children.find(e=>e.dataset.id==='kyushu-sls-bioengineering-autumn');await essay.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('小論文')));
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
});
test('Tohoku school, graduate and foreign filters retain original subjects and actual PDF page',async()=>{
 const a=boot(catalog.records);await school(a,'tohoku').click();
 assert.equal(a.ids['scope-graduate'].options.length,7);
 assert.equal(a.ids['scope-results'].children.length,56);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.tohoku.note);
 a.ids['scope-graduate'].value='工学研究科';await a.ids['scope-graduate'].fire('change');
 a.ids['scope-department'].value='電子工学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,1);await a.ids['scope-results'].children[0].click();
 const r=catalog.records.find(r=>r.id==='tohoku-eng-electronics-general');
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===r.scopeOriginal&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=15'));
 await school(a,'tohoku').click();await a.tabs[1].click();
 assert.equal(a.ids['scope-results'].children.length,100);
 a.ids['scope-query'].value='东北大学 微生物学';await a.ids['scope-query'].fire('input');
 assert.ok(a.ids['scope-results'].children.length);
 assert.ok(a.ids['scope-results'].children.every(e=>e.dataset.id.startsWith('tohoku-life-')&&e.dataset.id.endsWith('-1')));
});
test('Tohoku pending English call and SDTM participation render without invented subjects',async()=>{
 const a=boot(catalog.records);await school(a,'tohoku').click();await a.tabs[1].click();
 for(const id of ['tohoku-eng-mechanical-imac-pending','tohoku-ist-sdtm-notice']){
  const entry=a.ids['scope-results'].children.find(e=>e.dataset.id===id);assert.ok(entry);await entry.click();
  assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-record-status'));
  assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
 }
});
test('school filters switch coverage notes and unmatched results remain usable',async()=>{
 const a=boot(catalog.records);
 const generalCount=a.ids['scope-results'].children.length;
 assert.equal(a.ids['scope-data-error'].hidden,true);
 assert.match(a.ids['data-status'].children[1].textContent,/東京大学、京都大学、東京科学大学、早稲田大学、東京理科大学、大阪大学、東北大学、九州大学、北海道大学、慶應義塾大学、上智大学、神戸大学、名古屋大学、電気通信大学、筑波大学、一橋大学、横浜国立大学、明治大学、青山学院大学、立教大学与中央大学/);
 await school(a,'kyoto').click();
 assert.match(a.ids['data-status'].children[1].textContent,/京都大学：/);
 assert.equal(a.ids['scope-graduate'].options.length,5);
 assert.equal(a.ids['scope-results'].children.length,49);
 await school(a,'utokyo').click();
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.utokyo.note);
 await school(a,'science-tokyo').click();
 assert.equal(a.ids['scope-graduate'].options.length,7);
 assert.match(a.ids['data-status'].children[1].textContent,/東京科学大学：/);
 assert.equal(a.ids['scope-results'].children.length,36);
 a.ids['scope-query'].value='没有这一项';await a.ids['scope-query'].fire('input');
 assert.equal(a.ids['scope-results'].hidden,true);
 assert.equal(a.ids['scope-empty-title'].textContent,'暂时没有匹配的资料。');
 assert.match(a.ids['scope-empty-copy'].textContent,/清除筛选/);
 await a.ids['scope-empty-reset'].click();
 assert.equal(a.ids['scope-results'].children.length,generalCount);
});
test('Osaka school and admission filters show the valid records and open the winter original page',async()=>{
 const a=boot(catalog.records);await school(a,'osaka').click();
 assert.equal(a.ids['scope-graduate'].options.length,5);
 assert.equal(a.ids['scope-results'].children.length,38);
 assert.equal(a.ids['data-status'].children[1].textContent,catalog.catalog.osaka.note);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,83);
 assert.ok(!a.ids['scope-results'].children.some(e=>e.dataset.id==='osaka-eng-environment-general'));
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='osaka-eng-environment-foreign-winter');assert.ok(entry);await entry.click();
 const record=catalog.records.find(r=>r.id===entry.dataset.id);
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===record.subjectsOriginal&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=4'));
});
test('Science Tokyo original elective scope opens its actual PDF page and English programs retain degree labels',async()=>{
 const a=boot(catalog.records);await school(a,'science-tokyo').click();
 a.ids['scope-department'].value='電気電子系';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,2);
 const entry=a.ids['scope-results'].children.find(e=>e.dataset.id==='science-ee-b');await entry.click();
 const record=catalog.records.find(r=>r.id==='science-ee-b');
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===record.scopeOriginal));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=34'));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,70);
 const igp=a.ids['scope-results'].children.find(e=>e.dataset.id==='science-ee-igpa-md');assert.ok(igp);
 await igp.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.tag==='p'&&e.textContent.includes('Integrated Doctoral Education Program')&&e.textContent.includes('2027年秋')));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='scope-route-note'&&e.textContent.includes('不能称作独立两年修士')));
});
test('TUS filters retain original scope and PDF pages while distinguishing general and foreign information selections',async()=>{
 const a=boot(catalog.records);await school(a,'tus').click();
 assert.match(a.ids['data-status'].children[1].textContent,/東京理科大学：/);
 assert.equal(a.ids['scope-graduate'].options.length,6);
 assert.equal(a.ids['scope-results'].children.length,30);
 a.ids['scope-department'].value='情報理工学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,1);await a.ids['scope-results'].children[0].click();
 const record=catalog.records.find(record=>record.id==='tus-creative-information');
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent===record.scopeOriginal&&e.lang==='ja'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');
 await source.children.find(e=>e.tag==='button').click();
 assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=17'));
 await a.tabs[1].click();
 assert.equal(a.ids['scope-results'].children.length,54);
 const foreign=a.ids['scope-results'].children.find(e=>e.dataset.id==='tus-creative-information-foreign');assert.ok(foreign);
 await foreign.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('希望専攻分野に関する口頭試問')));
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('13科目')));
});
test('TUS graduate school filters separate the two architecture departments and closed programs have no invented scope',async()=>{
 const a=boot(catalog.records);await school(a,'tus').click();
 a.ids['scope-department'].value='建築学専攻';await a.ids['scope-department'].fire('change');
 assert.equal(a.ids['scope-results'].children.length,2);
 a.ids['scope-graduate'].value='工学研究科';await a.ids['scope-graduate'].fire('change');
 a.ids['scope-department'].value='建築学専攻';await a.ids['scope-department'].fire('change');
 assert.deepEqual(a.ids['scope-results'].children.map(e=>e.dataset.id),['tus-eng-architecture']);
 await school(a,'tus').click();
 const closed=a.ids['scope-results'].children.filter(e=>e.dataset.id.endsWith('-closed'));assert.equal(closed.length,2);
 for(const entry of closed){
  assert.equal(entry.children.find(e=>e.className==='scope-record-status').textContent,'修士募集停止');
  await entry.click();
  assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
 }
 await a.tabs[1].click();
 assert.ok(!a.ids['scope-results'].children.some(e=>e.dataset.id.endsWith('-closed')));
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

test('Tsukuba filters distinguish general and overseas scopes, entry months and English PDF originals',async()=>{
 const a=boot(catalog.records);await school(a,'tsukuba').click();assert.equal(a.ids['scope-results'].children.length,11);
 assert.equal(a.ids['scope-graduate'].options.length,3);assert.equal(a.ids['scope-department'].options.length,5);
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,13);
 a.ids['scope-query'].value='Overseas';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,2);
 a.ids['scope-year'].value='2027年10月';await a.ids['scope-year'].fire('change');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('related knowledge and skills')));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=6'));
});

test('Hitotsubashi general and foreign tabs preserve shared written requirements and different original languages',async()=>{
 const a=boot(catalog.records);await school(a,'hitotsubashi').click();assert.equal(a.ids['scope-results'].children.length,1);
 assert.equal(a.ids['scope-graduate'].options.length,2);assert.equal(a.ids['scope-department'].options.length,2);
 await a.ids['scope-results'].children[0].click();assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='ja'&&e.textContent.includes('統計学・情報学')));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,2);
 a.ids['scope-query'].value='N2';await a.ids['scope-query'].fire('input');assert.equal(a.ids['scope-results'].children.length,1);
 a.ids['scope-year'].value='2027年度';await a.ids['scope-year'].fire('change');assert.equal(a.ids['scope-results'].children.length,1);
 await a.ids['scope-results'].children[0].click();assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='en'&&e.textContent.includes('written examination')));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=11'));
});

test('YNU UI separates national-funded oral selection and does not show closed second-round exams as requirements',async()=>{
 const a=boot(catalog.records);await school(a,'ynu').click();assert.equal(a.ids['scope-results'].children.length,28);
 assert.equal(a.ids['scope-graduate'].options.length,4);
 const closed=a.ids['scope-results'].children.find(e=>e.dataset.id==='ynu-ifgs-ai-second-closed');assert.ok(closed);await closed.click();
 assert.ok(!a.ids['scope-detail'].children.some(e=>e.tag==='h4'&&e.textContent==='考试范围 · 官方原文'));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,38);
 assert.ok(!a.ids['scope-results'].children.some(e=>e.dataset.id.includes('second-closed')));
 a.ids['scope-graduate'].value='環境情報学府';await a.ids['scope-graduate'].fire('change');assert.equal(a.ids['scope-results'].children.length,4);
 const oral=a.ids['scope-results'].children.find(e=>e.dataset.id==='ynu-eis-info-international');assert.ok(oral);await oral.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='ja'&&e.textContent==='口述試験；出願書類審査。'));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('#page=7'));
});

test('Meiji school and subject multiselect keep real scopes, international rules and actual PDF pages',async()=>{
 const a=boot(catalog.records);await school(a,'meiji').click();assert.equal(a.ids['scope-results'].children.length,12);
 assert.equal(a.ids['scope-graduate'].options.length,3);assert.equal(a.ids['scope-department'].options.length,7);
 const rows=a.ids['scope-subject-options'].querySelectorAll('input');
 for(const id of ['information','circuit-theory']){const e=rows.find(e=>e.dataset.subject===id);e.checked=true;await e.fire('change');}
 assert.equal(a.ids['scope-results'].children.length,2);assert.ok(a.ids['scope-results'].children.every(e=>e.dataset.id.includes('ams-network-general')));
 await a.tabs[1].click();assert.equal(a.ids['scope-results'].children.length,4);
 const r=a.ids['scope-results'].children.find(e=>e.dataset.id==='meiji-ams-network-international-ii');await r.click();
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.lang==='ja'&&e.textContent.includes('情報基礎・回路理論')));
 assert.ok(a.ids['scope-detail'].children.some(e=>e.className==='original-text'&&e.textContent.includes('解答を英語でも可')));
 const source=a.ids['scope-detail'].children.find(e=>e.className==='scope-source');await source.children.find(e=>e.tag==='button').click();assert.ok(source.children.find(e=>e.tag==='iframe').src.endsWith('a1778809689243.pdf#page=14'));
 assert.equal(a.ids['scope-subject-mode'],undefined);
 await a.ids['scope-subject-clear'].click();assert.equal(a.ids['scope-results'].children.length,24);
});
test('multi-select subjects preserve checkbox nodes, intersect filters, and support clear and reset',async()=>{
 const a=boot(catalog.records), rows=a.ids['scope-subject-options'].querySelectorAll('input');
 const find=id=>rows.find(e=>e.dataset.subject===id);
 const linear=find('linear-algebra'),circuit=find('circuits');linear.checked=true;await linear.fire('change');circuit.checked=true;await circuit.fire('change');
 const allIds=a.ids['scope-results'].children.map(e=>e.dataset.id);
 assert.ok(allIds.length>0);assert.ok(allIds.every(id=>catalog.records.find(r=>r.id===id)&&require('../exam-scope-core.js').subjects.matches(catalog.records.find(r=>r.id===id),['linear-algebra','circuits'])));
 assert.match(a.ids['scope-result-count'].textContent,/所学校/);assert.equal(a.ids['scope-subject-selected'].children.length,2);
 assert.equal(a.ids['scope-subject-options'].querySelectorAll('input').find(e=>e.dataset.subject==='circuits'),circuit);
 assert.equal(a.ids['scope-subject-mode'],undefined);
 await school(a,'ynu').click();assert.equal(linear.checked,true);assert.equal(circuit.checked,true);assert.ok(a.ids['scope-results'].children.every(e=>e.dataset.id.startsWith('ynu-')));
 await a.tabs[1].click();assert.equal(circuit.checked,true);
 await a.ids['scope-subject-clear'].click();assert.equal(linear.checked,false);assert.equal(a.ids['scope-school'].value,'ynu');assert.equal(a.ids['scope-subject-schools'].hidden,true);
 circuit.checked=true;await circuit.fire('change');await a.ids['scope-reset'].click();assert.equal(circuit.checked,false);assert.equal(a.ids['scope-school'].value,'all');
});
test('subject alias search only narrows choices and selected chips remove individual subjects',async()=>{
 const a=boot(catalog.records),rows=a.ids['scope-subject-options'].querySelectorAll('input'),pick=id=>rows.find(e=>e.dataset.subject===id);
 for(const id of ['circuits','electromagnetism']) {const e=pick(id);e.checked=true;await e.fire('change');}
 const count=a.ids['scope-results'].children.length;
 a.ids['scope-subject-search'].value='电子回路';await a.ids['scope-subject-search'].fire('input');assert.equal(a.ids['scope-results'].children.length,count);
 assert.equal(a.ids['scope-subject-search-empty'].hidden,true);
 await a.ids['scope-subject-selected'].children[0].click();assert.equal(pick('circuits').checked,false);assert.equal(pick('electromagnetism').checked,true);
 a.ids['scope-subject-search'].value='不存在的科目';await a.ids['scope-subject-search'].fire('input');assert.equal(a.ids['scope-subject-search-empty'].hidden,false);
 await a.ids['scope-reset'].click();assert.equal(a.ids['scope-subject-search'].value,'');assert.equal(a.ids['scope-subject-search-empty'].hidden,true);
});

