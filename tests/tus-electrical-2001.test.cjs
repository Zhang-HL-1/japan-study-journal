const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const id='tus-electrical-2001-general';
test('2001 keeps two true source PDFs, eleven complete questions, and exact original pages',()=>{
 const p=read(`assets/question-bank/${id}/paper.json`),catalog=require('../past-papers-data.js').papers.find(c=>c.id===p.source.catalogId);
 assert.equal(catalog.paperYear,2001);assert.equal(p.source.year,2001);assert.equal(p.source.yearBasis,'academic');assert.match(p.source.note,/2000-08-01/);
 assert.deepEqual(p.source.subjects,['电气回路','电子回路','电气通信','电磁回路']);assert.equal(p.questions.length,11);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,2);
 assert.deepEqual(p.questions.map(q=>q.parts[0].page),[1,1,1,5,5,6,6,6,8,8,8]);assert.deepEqual(p.questions.map(q=>q.number),['1','2','3','1','2','1','2','3','1','2','3']);
 for(const [i,f] of p.source.files.entries()){
  assert.equal(hash(f.pdf),f.sha256);assert.equal(f.pageCount,[18,18,18,14][i]);const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.source.originalYear,'平成13年度');assert.equal(m.coverage.length,f.pageCount);assert.ok(m.coverage.every(c=>c.reviewed));
  assert.equal(p.questions.filter(q=>q.sourceFileId===f.id).length,[3,2,3,3][i]);
  if(i<3)assert.ok(m.coverage.filter(c=>c.page>=7).every(c=>!c.questionIds.length&&/手写解答/.test(c.excluded)));
  else assert.ok(m.coverage.filter(c=>[1,2,6].includes(c.page)).every(c=>!c.questionIds.length&&/2002/.test(c.excluded)));
 }
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.answerText&&!q.explanation);for(const part of q.parts)assert.equal(hash(part.src),part.sha256);}
 assert.equal(p.commonParts.length,6);for(const part of p.commonParts)assert.equal(hash(part.src),part.sha256);
});
test('2001 communication retains independent numbered option tables and empty shared answer grid',()=>{
 const m=read(`data/question-manifests/${id}-tsushin.json`);assert.equal(m.questions.length,3);assert.deepEqual(m.questions.map(q=>q.number),['1','2','3']);assert.equal(m.commonRegions.length,3);assert.ok(m.questions[2].regions[0].box[3]>=632);assert.ok(m.questions[2].regions[0].box[2]>=430);assert.match(m.commonRegions[2].label,/空白/);
 const m2=read(`data/question-manifests/${id}-denjiki.json`);assert.equal(m2.source.originalName,'2002(H14).pdf');assert.ok(m2.questions.every(q=>q.regions.every(r=>r.page===8)));assert.ok(m2.coverage.filter(c=>c.page!==8).every(c=>!c.questionIds.length));
});
