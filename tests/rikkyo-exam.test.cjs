const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='rikkyo'),r=rs[0];
const state={universityId:'rikkyo',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Rikkyo keeps one real masters general route without inventing foreign or spring admissions',()=>{
 assert.equal(rs.length,1);assert.equal(r.graduateSchool,'人工知能科学研究科');assert.equal(r.department,'人工知能科学専攻');
 assert.equal(r.degreeProgram,'master');assert.equal(r.admissionType,'general');assert.equal(r.entryYear,'2027年4月');
 assert.equal(core.filter(data.records,data.universities,state).length,1);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,1);
 assert.doesNotMatch(r.selectionName,/社会人|推薦|春季|外国人/);
 for(const query of ['立教大学 人工智能','Rikkyo AI'])assert.deepEqual(core.filter(data.records,data.universities,{...state,universityId:'all',query}).map(x=>x.id),[r.id]);
});
test('Rikkyo integrated written exam and essay-based interview retain the real stage constraints',()=>{
 assert.match(r.scopeOriginal,/数学・統計学・論理的思考・英語/);assert.match(r.scopeOriginal,/未知の問題/);assert.match(r.scopeOriginal,/出願時に提出したエッセイ/);
 assert.match(r.conditionsOriginal,/120分/);assert.match(r.conditionsOriginal,/日本語のみ/);assert.match(r.conditionsOriginal,/電卓の持ち込みはできません/);
 assert.match(r.conditionsOriginal,/書類審査と筆記試験の結果/);assert.match(r.conditionsOriginal,/2,000文字程度/);
 assert.match(r.conditionsOriginal,/発表時間10分、質疑応答時間10分、交代時間５分/);assert.match(r.editorialNote,/同一卷/);assert.match(r.editorialNote,/未公开具体题数/);
 assert.doesNotMatch(r.subjectsOriginal+r.scopeOriginal,/TOEFL|TOEIC|N1|微分積分|線形代数|プログラミング/);
});
test('Rikkyo safe official PDF references use actual pages rather than printed page numbers',()=>{
 assert.equal(r.sources[0].pdfPage,18);assert.equal(r.sources[1].pdfPage,19);assert.equal(r.sources[2].pdfPage,15);
 for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.rikkyo.ac.jp'));assert.ok(core.sourceURL(s));if(s.kind==='pdf')assert.ok(s.pdfPage>=1&&s.pdfPage<=25);}
 assert.ok(core.sourceURL(r.sources[0]).endsWith('guidelines_ai_master.pdf#page=18'));
 for(const url of ['http://www.rikkyo.ac.jp/a','https://rikkyo.ac.jp.evil.test/a','https://evil-rikkyo.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
