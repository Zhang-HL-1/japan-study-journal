const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='aoyama');
const state={universityId:'aoyama',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Aoyama preserves five courses and the eligible general route in the foreign view',()=>{
 assert.equal(rs.length,10);assert.equal(new Set(rs.map(r=>r.course)).size,5);
 assert.ok(rs.every(r=>r.graduateSchool==='理工学研究科'&&r.department==='理工学専攻'&&r.degreeProgram==='master'&&r.entryYear==='2027年4月'));
 assert.equal(core.filter(data.records,data.universities,state).length,5);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,10);
 for(const query of ['青山大学','青学','Aoyama Gakuin University'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query}).length,5);
});
test('Aoyama selection constraints remain explicit rather than flattened into subject lists',()=>{
 const general=rs.filter(r=>r.admissionType==='general');
 assert.ok(general.every(r=>r.scopeOriginal.includes('一変数及び二変数')&&r.scopeOriginal.includes('微分方程式')));
 assert.match(general.find(r=>r.course==='機械創造コース').scopeOriginal,/一つの系の全ての問題/);
 assert.match(general.find(r=>r.course==='機械創造コース').scopeOriginal,/５分以内/);
 assert.match(general.find(r=>r.course==='マネジメントテクノロジーコース').scopeOriginal,/研究を希望する専門分野を含む２分野/);
 assert.match(general.find(r=>r.course==='知能情報コース').scopeOriginal,/マルティメディア工学/);
});
test('Aoyama private foreign exams do not inherit unpublished general scope or written English',()=>{
 for(const r of rs.filter(r=>r.admissionType==='international')){
  assert.equal(r.scopeOriginal,undefined);assert.match(r.subjectsOriginal,/筆記試験（専門科目）・口述試問/);
  assert.doesNotMatch(r.subjectsOriginal,/数学|共通科目/);assert.match(r.editorialNote,/没有公布/);
  assert.equal(r.sources[0].pdfPage,18);assert.match(r.conditionsOriginal,/N1.*240点以上/);
  assert.match(r.conditionsOriginal,/G314/);assert.match(r.conditionsOriginal,/両方が必要/);
 }
});
test('Aoyama sources use the current official July guidelines and actual PDF pages',()=>{
 for(const r of rs)for(const s of r.sources){
  assert.equal(new URL(s.url).hostname,'www.aoyama.ac.jp');
  if(s.kind==='pdf'){assert.match(s.url,/uploads\/2026\/07\//);assert.ok(s.pdfPage>=1&&s.pdfPage<=(r.admissionType==='general'?37:41));}
 }
});
