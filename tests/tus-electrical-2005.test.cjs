const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('2005 has six complete questions, with answer pages excluded and source hashes intact',()=>{
 const index=read('question-bank-index.json'),entries=index.papers.filter(p=>p.id.startsWith('tus-electrical-2005-'));assert.equal(entries.length,1);
 const p=read(entries[0].data);assert.equal(p.questions.length,6);assert.equal(p.source.year,2005);assert.equal(p.source.yearBasis,'academic');assert.match(p.source.note,/2004-08-02/);
 assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路']);
 assert.deepEqual(p.questions.map(q=>q.number),['1','2','1','2','1','2']);assert.deepEqual(p.questions.map(q=>q.parts[0].page),[1,1,2,2,3,3]);
 assert.deepEqual(p.questions.map(q=>q.parts.length),[4,4,3,4,4,1]);
 for(const f of p.source.files){assert.equal(f.pageCount,6);assert.equal(hash(f.pdf),f.sha256);const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.coverage.length,6);assert.ok(m.coverage.every(c=>c.reviewed));assert.ok(m.coverage.slice(3).every(c=>!c.questionIds.length&&/手写解答/.test(c.excluded)));}
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.layout,'source-page');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.explanation);for(const part of q.parts){assert.ok(part.page<=3);assert.equal(hash(part.src),part.sha256);}}
 for(const part of p.commonParts)assert.equal(hash(part.src),part.sha256);
});
