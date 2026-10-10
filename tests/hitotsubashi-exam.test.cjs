const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const records=data.records.filter(r=>r.universityId==='hitotsubashi');
const general=records.find(r=>r.admissionType==='general'),foreign=records.find(r=>r.admissionType==='international');
const state={universityId:'hitotsubashi',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Hitotsubashi preserves one formal data-science major and separate nationality-based selection',()=>{
 assert.equal(records.length,2);assert.ok(records.every(r=>r.degreeProgram==='master'&&r.department==='ソーシャル・データサイエンス専攻'&&r.graduateSchool==='ソーシャル・データサイエンス研究科'&&!r.course));
 assert.equal(general.selectionName,'一般選考');assert.equal(general.internationalGeneral,true);assert.equal(foreign.selectionName,'Special Selection for International Students');assert.equal(foreign.internationalGeneral,undefined);assert.match(foreign.editorialNote,/要求非日本国籍/);
 assert.ok(records.every(r=>!r.publicationStatus&&r.entryYear==='2027年度'&&!/SGU|社会人|内部/.test(r.selectionName)));
 assert.equal(core.filter(data.records,data.universities,state).length,1);assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,2);
 for(const query of ['一桥大学','一橋','一桥','Hitotsubashi','Hitotsubashi University'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query}).length,1);
 assert.equal(core.filter(data.records,data.universities,{...state,entryYear:'2028年度'}).length,0);
});
test('Hitotsubashi international selection retains both written sections and its own oral language',()=>{
 for(const r of records){
  assert.match(r.editorialNote,/两部分均须参加/);assert.match(r.editorialNote,/120分钟.*统计2题、信息2题.*任选2题/);assert.match(r.editorialNote,/没有要求每领域各选1题/);assert.match(r.editorialNote,/社会科学60分钟.*经营学、经济学、法学、政治学.*选1题/);
  assert.match(r.editorialNote,/研究计划的问题意识.*利用数据解决问题/);assert.match(r.editorialNote,/超过总定员约5倍/);assert.match(r.editorialNote,/8月20日.*9月4日.*现已结束/);
  assert.ok(r.sources.some(s=>s.kind==='pdf'&&s.pdfPage===11));
 }
 assert.match(general.editorialNote,/一般选考的口述使用日语/);assert.match(foreign.editorialNote,/笔试题提供英语与日语.*口述可用英语或日语/);assert.match(foreign.editorialNote,/双语题目进一步推定/);assert.equal(general.originalLanguage,'ja');assert.equal(foreign.originalLanguage,'en');
 assert.ok(foreign.sources.some(s=>s.kind==='pdf'&&s.pdfPage===12&&s.url.includes('International-Students')));
});
test('Hitotsubashi keeps conditional N1 versus N1-or-N2 proof and verified external English submission',()=>{
 assert.match(general.conditionsOriginal,/該当者.*N1/);assert.doesNotMatch(general.conditionsOriginal,/N2|合格/);assert.match(foreign.conditionsOriginal,/both conditions.*N1 or N2/);
 assert.match(general.editorialNote,/无日本国籍且无日本永住许可.*不满3年/);assert.match(foreign.editorialNote,/无日本永住许可.*不满3年/);
 for(const r of records){
  assert.match(r.editorialNote,/2024年9月.*TOEFL iBT或IELTS Academic/);assert.match(r.editorialNote,/Test Date.*Home Edition.*My Best或ITP/);assert.match(r.editorialNote,/ETS直送.*0436.*99.*副本/);assert.match(r.editorialNote,/IELTS.*机构直送及副本/);
  assert.match(r.editorialNote,/未指定英语最低分/);assert.match(r.editorialNote,/导师事前联系不是必需/);assert.ok(r.sources.some(s=>s.url.endsWith('admission-guide_master.pdf?v=1')&&s.pdfPage===2));
 }
});
test('Hitotsubashi uses FAQ-directed scope and safe official PDF pages without fabricated chapters',()=>{
 for(const r of records){
  assert.match(r.editorialNote,/本科2–3年级.*本科3–4年级/);assert.match(r.editorialNote,/本科1–2年级通识知识/);assert.match(r.editorialNote,/未指定必考章号/);for(const text of ['新装改訂版 現代数理統計学','Python言語によるプログラミングイントロダクション 第3版','はじめてのパターン認識'])assert.ok(r.editorialNote.includes(text));
  assert.deepEqual(r.sources.filter(s=>s.url.endsWith('hitotsubashi_sds_m_2208i_kihon.pdf')).map(s=>s.pdfPage),[10,11]);assert.ok(r.sources.some(s=>s.kind==='page'&&s.url==='https://www.sds.hit-u.ac.jp/faq/'));assert.ok(core.validRecord(r,data.universities));
  for(const s of r.sources){const host=new URL(s.url).hostname;assert.ok(host==='hit-u.ac.jp'||host.endsWith('.hit-u.ac.jp'));if(s.kind==='page'){assert.equal(s.pdfPage,undefined);continue;}const max=s.url.includes('International-Students')?19:s.url.endsWith('hitotsubashi_sds_m_2208i_kihon.pdf')?15:s.url.includes('admission-guide_master')?2:16;assert.ok(s.pdfPage>=1&&s.pdfPage<=max);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}
 }
 for(const url of ['http://hit-u.ac.jp/a','https://hit-u.ac.jp.evil.test/a','https://evil-hit-u.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
