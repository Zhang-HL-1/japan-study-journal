const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const bank=require('../questions.js'),catalog=require('../past-papers-data.js'),core=require('../practice-core.js'),papers=require('../past-papers-core.js');
const builder=require('../scripts/build-paper-practice.cjs');
test('all catalog question sets and PDFs are covered, ancillary-only entries are excluded',()=>{
 const expected=catalog.papers.filter(p=>p.files.some(f=>f.kind==='question'));
 assert.equal(expected.length,828);assert.equal(bank.length,expected.length);
 assert.deepEqual(new Set(bank.map(q=>q.paper.catalogId)),new Set(expected.map(p=>p.id)));
 const sourceURLs=new Set(expected.flatMap(p=>p.files.filter(f=>f.kind==='question').map(f=>f.url)));
 assert.equal(sourceURLs.size,1118);
 assert.deepEqual(new Set(bank.flatMap(q=>q.paper.files.filter(f=>f.kind==='question').map(f=>f.url))),sourceURLs);
 for(const q of bank){
  const p=expected.find(p=>p.id===q.paper.catalogId);assert.equal(q.id,'paper:'+p.id);assert.equal(q.type,'paper');
  assert.equal(q.paper.sourceNote,p.sourceNote);assert.equal(q.provenance.year,p.originalYear||String(papers.yearOf(p)));
  assert.equal(q.paper.files.length,p.files.length);
  for(let i=0;i<p.files.length;i++){assert.equal(papers.fileURL(q.paper.files[i]),papers.fileURL(p.files[i]));assert.equal(q.paper.files[i].endPage,p.files[i].endPage);assert.ok(fs.existsSync(path.join(__dirname,'..',p.files[i].url)));}
 }
});
test('generated practice catalog stays in sync and runtime bank has no invented answers',()=>{
 assert.equal(fs.readFileSync(path.join(__dirname,'../paper-practice-data.js'),'utf8'),builder.serialize(builder.build()));
 assert.ok(bank.every(q=>q.answerText===''&&q.explanation.length===0));
 assert.ok(bank.every(q=>q.paper.files.every(f=>papers.fileURL(f))));
});
test('known electromagnetism aliases and multi-subject papers filter across schools',()=>{
 for(const text of ['電磁気学','电磁气学','電磁理論'])assert.ok(builder.subjectsOf([text]).includes('电磁学'));
 const subjects=builder.subjectsOf(['電磁気学・電気回路']);assert.ok(subjects.includes('电磁学'));assert.ok(subjects.includes('电路与模拟电子'));
 assert.deepEqual(builder.subjectsOf(['専門科目']),['科目待细分']);
 const matched=core.filterQuestions(bank,{subject:'电磁学'},{});assert.ok(matched.length>0);assert.ok(new Set(matched.map(q=>q.provenance.school)).size>1);
 assert.ok(matched.every(q=>q.subjects.includes('电磁学')));
 assert.ok(core.filterQuestions(bank,{paperYear:'2025'},{}).every(q=>q.paper.year===2025));
});
test('paper completion is retained in backups and never contributes to scoring or wrong answers',()=>{
 const q=bank[0],s=core.blank();core.recordPaperCompletion(s,q.id,true,'2026-10-22');
 assert.equal(core.isDone(q,s.records[q.id]),true);assert.equal(core.stats([q],s).attempted,1);assert.equal(core.stats([q],s).accuracy,0);
 assert.equal(core.filterQuestions([q],{scope:'unanswered'},s.records).length,0);assert.equal(core.filterQuestions([q],{scope:'wrong'},s.records).length,0);
 s.records[q.id].note='我的推导';s.records[q.id].bookmarked=true;
 const restored=core.cleanState(JSON.parse(JSON.stringify(s)),[q]);assert.equal(restored.records[q.id].completed,true);assert.equal(restored.records[q.id].note,'我的推导');
 const graded={id:'single',type:'choice'};core.recordResult(restored,'single',true,1,'2026-10-22');assert.equal(core.stats([q,graded],restored).accuracy,100);
 core.recordPaperCompletion(restored,q.id,false,'2026-10-22');assert.equal(core.isDone(q,restored.records[q.id]),false);assert.equal(restored.records[q.id].note,'我的推导');
});
