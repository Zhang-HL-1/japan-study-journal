const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('2002 retains independent major questions and excludes different years and handwritten answers',()=>{
 const p=read('assets/question-bank/tus-electrical-2002-general/paper.json');assert.equal(p.questions.length,9);assert.equal(p.source.year,2002);assert.equal(p.source.yearBasis,'academic');assert.match(p.source.note,/2001-08-02/);assert.match(p.title,/英语未收录/);
 assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);
 assert.deepEqual(p.questions.map(q=>q.number),['1','2','1','2','1','2','3','4','5']);assert.deepEqual(p.questions.map(q=>q.parts[0].page),[6,6,2,2,1,1,1,1,1]);
 for(const f of p.source.files){assert.equal(hash(f.pdf),f.sha256);assert.equal(f.pageCount,14);const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.coverage.length,14);assert.ok(m.coverage.every(c=>c.reviewed));assert.ok(m.coverage.slice(8).every(c=>!c.questionIds.length&&/手写参考解答/.test(c.excluded)));assert.match(m.coverage[7].excluded,/2001/);assert.ok(m.coverage.slice(2,5).every(c=>!c.questionIds.length&&/英语/.test(c.excluded)));}
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');assert.equal(q.layout,'source-page');assert.ok(!q.answer&&!q.explanation);for(const part of q.parts){assert.ok([1,2,6].includes(part.page));assert.equal(hash(part.src),part.sha256);}}
 for(const part of p.commonParts)assert.equal(hash(part.src),part.sha256);
 const q=p.questions.find(q=>q.id==='tus-electrical-2002-general-denshi-q2');assert.equal(q.parts.length,4);assert.deepEqual(q.parts[2].box,[348,576,468,668]);assert.equal(q.parts[3].label,'電子回路第2题，第4块');
});
