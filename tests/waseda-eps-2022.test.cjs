const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
test('Waseda EPS 2022 preserves independent original questions and excludes blank answer sheets',()=>{
 const id='waseda-eps-2022',m=JSON.parse(fs.readFileSync(`data/question-manifests/${id}.json`)),p=JSON.parse(fs.readFileSync(`assets/question-bank/${id}/paper.json`));assert.equal(m.renderScale,4);assert.equal(p.source.year,2022);assert.deepEqual(p.source.admissionYears,[2022,2023]);assert.equal(p.questions.length,9);assert.deepEqual(p.questions.map(q=>q.parts[0].page),[2,3,3,4,4,5,5,6,7]);assert.ok(p.coverage.slice(7).every(c=>c.reviewed&&!c.questionIds.length&&/空白解答/.test(c.excluded)));
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.explanation);}
 for(const part of [...p.commonParts,...p.questions.flatMap(q=>q.parts)]){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(part.src)).digest('hex'),part.sha256);assert.ok(Math.abs(part.width-(part.box[2]-part.box[0])*4)<=2);}
 assert.ok(p.questions[5].parts[0].box[3]>=570);assert.ok(p.questions[6].parts[0].box[1]>=576);assert.ok(p.questions[3].parts[0].box[1]<=165);
});
