const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='kobe'),find=id=>rs.find(r=>r.id==='kobe-'+id);
test('Kobe distinguishes the formal departments, general and foreign routes, and unpublished second calls',()=>{
 assert.equal(rs.length,14);assert.equal(rs.filter(r=>!r.publicationStatus).length,12);
 assert.equal(new Set(rs.map(r=>r.graduateSchool+'/'+r.department)).size,5);
 assert.ok(rs.every(r=>r.degreeProgram==='master'&&r.entryYear==='2027年4月'&&!/社会人|SGU/.test(r.selectionName)));
 const state={universityId:'kobe',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
 assert.equal(core.filter(data.records,data.universities,state).length,6);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,14);
 for(const r of rs.filter(r=>r.publicationStatus==='pending')){assert.ok(!r.subjectsOriginal&&!r.scopeOriginal);assert.equal(r.sources[0].pdfPage,1);assert.match(r.editorialNote,/11月中旬/);}
});
test('Kobe mechanical and systems foreign examinations cannot inherit general professional papers',()=>{
 assert.match(find('mechanical-general').editorialNote,/700分/);
 assert.match(find('mechanical-international').editorialNote,/四科选二/);assert.match(find('mechanical-international').editorialNote,/500分/);
 const gen=find('systems-general'),intl=find('systems-international');
 assert.match(gen.scopeOriginal,/数理計画/);assert.match(gen.editorialNote,/四领域选二/);
 assert.doesNotMatch(intl.subjectsOriginal,/専門科目/);assert.doesNotMatch(intl.scopeOriginal,/数理計画|フーリエ/);
 assert.equal(gen.sources[0].pdfPage,18);assert.equal(intl.sources[0].pdfPage,33);
 assert.ok(intl.sources.some(s=>s.label.includes('受入内诺')&&s.pdfPage===27));
});
test('Kobe electrical papers depend on the first-choice field and preserve distinct specialist choices',()=>{
 for(const route of ['general','international']){
  const phy=find('ee-physics-'+route),info=find('ee-information-'+route);
  assert.match(phy.scopeOriginal,/電磁気学，量子物性工学，半導体デバイス工学/);
  assert.match(info.scopeOriginal,/4分野から3分野を選択/);
  assert.match(info.editorialNote,/第一志望/);assert.match(phy.scopeOriginal,/フーリエ解析/);
  assert.equal(phy.sources[0].pdfPage,route==='general'?14:13);
 }
});
test('Kobe IT keeps the assigned common reading list and first-adviser elective rule',()=>{
 for(const route of ['general','international']){
  const r=find('advanced-it-'+route);assert.equal(r.course,'先端IT');
  assert.match(r.scopeOriginal,/120分でゼロから学べるイノベーション理論/);
  assert.match(r.editorialNote,/第一志望指导教员群/);assert.match(r.editorialNote,/先端IT选择题未公布更细考纲/);
  assert.ok(r.sources.some(s=>s.url.endsWith('M_2027_kadaishiryo_kousei.pdf')&&s.pdfPage===2));
 }
 assert.match(find('advanced-it-general').editorialNote,/不允许辞典/);
 assert.match(find('advanced-it-international').editorialNote,/允许一本/);
});
test('Kobe maritime electrical information uses seven exam-time options and the official information-processing scope',()=>{
 for(const route of ['general','international']){
  const r=find('maritime-electrical-'+route);assert.equal(r.department,'海事科学専攻');assert.equal(r.course,'電気電子情報工学');
  assert.match(r.scopeOriginal,/7問から2問を受験時に選択/);assert.match(r.scopeOriginal,/数学B：統計学/);
  assert.ok(r.sources.some(s=>s.url.endsWith('R8_ms_hani.pdf')&&s.pdfPage===2));
 }
});
test('Kobe sources use the verified official HTTPS domain and actual PDF page bounds',()=>{
 const pages={'master_eng_ippan_2027.pdf':28,'master_eng_foreign_j_2027.pdf':25,'tsuika_eng_20260918.pdf':1,'x_master_ippan_202608.pdf':40,'M_2027_ippan_bosyu-1.pdf':29,'M_2027_ryugaku_bosyu-1.pdf':25,'M_2027_kadaishiryo_kousei.pdf':2,'R8_ms_ippan_for20261020270410.pdf':28,'R8_ms_hani.pdf':2};
 for(const r of rs){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.kobe-u.ac.jp'));if(s.kind==='pdf'){const n=pages[s.url.split('/').at(-1)];assert.ok(n&&s.pdfPage>0&&s.pdfPage<=n);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}}}
 for(const url of ['http://www.eng.kobe-u.ac.jp/a','https://kobe-u.ac.jp.evil.test/a','https://evil-kobe-u.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
