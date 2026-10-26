const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('TUS 2000 has three verified high-resolution subjects, with linked EM questions kept complete',()=>{
 const id='tus-electrical-2000-general',p=read(`assets/question-bank/${id}/paper.json`),catalog=require('../past-papers-data.js').papers.find(x=>x.id===p.source.catalogId);
 assert.equal(catalog.paperYear,2000);assert.equal(catalog.yearBasis,'academic');assert.equal(p.source.year,2000);assert.match(p.source.note,/1999-08-02/);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(p.questions.length,9);
 assert.deepEqual(p.questions.map(q=>q.number),['1','2','1','2','1','2','3、6','4','5']);assert.deepEqual(p.questions.map(q=>q.parts[0].page),[2,2,1,1,3,3,3,3,3]);assert.deepEqual(p.questions.map(q=>q.parts.length),[2,2,2,2,1,1,2,1,1]);
 for(const f of p.source.files){assert.equal(f.pageCount,12);assert.equal(hash(f.pdf),f.sha256);const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.renderScale,4);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.coverage.length,12);assert.ok(m.coverage.every(c=>c.reviewed));assert.ok(m.coverage.slice(3).every(c=>!c.questionIds.length&&/手写解答/.test(c.excluded)));}
 const parts=[...p.commonParts,...p.questions.flatMap(q=>q.parts)];assert.equal(parts.length,18);for(const part of parts){assert.ok([1,2,3].includes(part.page));assert.equal(hash(part.src),part.sha256);assert.ok(Math.abs(part.width-(part.box[2]-part.box[0])*4)<=2);assert.ok(Math.abs(part.height-(part.box[3]-part.box[1])*4)<=2);}
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.answerText&&!q.explanation);}
 const linked=p.questions.find(q=>q.number==='3、6');assert.equal(linked.parts.length,2);assert.match(linked.summary,/引用/);assert.ok(linked.parts[0].box[1]<linked.parts[1].box[1]);
 const em=read(`data/question-manifests/${id}-denjiki.json`);assert.equal(em.commonRegions.length,2);assert.ok(em.commonRegions[1].box[3]>=294);
});
