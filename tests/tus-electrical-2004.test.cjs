const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('TUS 2004 preserves four non-English subjects and all eight complete question units',()=>{
 const id='tus-electrical-2004-general',p=read(`assets/question-bank/${id}/paper.json`),catalog=require('../past-papers-data.js').papers.find(c=>c.id===p.source.catalogId);
 assert.equal(catalog.paperYear,2004);assert.equal(catalog.yearBasis,'academic');assert.equal(catalog.department,'電気工学専攻');assert.equal(p.source.year,2004);assert.match(p.source.note,/2003-08-01/);assert.match(p.title,/英语未收录/);
 assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路','电气通信']);assert.equal(p.questions.length,8);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);
 assert.deepEqual(p.questions.map(q=>q.parts[0].page),[5,5,3,3,3,2,6,6]);assert.deepEqual(p.questions.map(q=>q.parts.length),[1,1,1,1,1,2,2,2]);assert.deepEqual(p.questions.map(q=>q.number),['1','2','1','2','3','1–4','1','2']);
 for(const f of p.source.files){assert.equal(f.pageCount,14);assert.equal(hash(f.pdf),f.sha256);const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.coverage.length,14);assert.ok(m.coverage.every(c=>c.reviewed));assert.match(m.coverage[0].excluded,/工業化学/);assert.match(m.coverage[3].excluded,/deferred/);assert.ok(m.coverage.slice(6).every(c=>!c.questionIds.length&&/手写解答/.test(c.excluded)));}
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.layout,'source-page');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.answerText&&!q.explanation);for(const part of q.parts){assert.ok([2,3,5,6].includes(part.page));assert.equal(hash(part.src),part.sha256);}}
 assert.equal(p.commonParts.length,4);for(const c of p.commonParts)assert.equal(hash(c.src),c.sha256);
 const em=p.questions.find(q=>q.sourceFileId.endsWith('-denjiki'));assert.match(em.summary,/1）–4）共用/);assert.equal(em.parts[1].page,2);
 const comm=p.questions.filter(q=>q.subject==='电气通信');assert.equal(comm.length,2);assert.ok(comm[0].parts[1].box[3]>=366);assert.ok(comm[1].parts[1].box[3]>=596);
});
