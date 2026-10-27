const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
test('Waseda EPS 2024 preserves independent original questions and excludes blank answer sheets',()=>{
 const id='waseda-eps-2024',m=JSON.parse(fs.readFileSync(`data/question-manifests/${id}.json`)),p=JSON.parse(fs.readFileSync(`assets/question-bank/${id}/paper.json`));assert.equal(m.renderScale,4);assert.equal(p.source.year,2024);assert.deepEqual(p.source.admissionYears,[2024,2025]);assert.equal(p.questions.length,10);assert.deepEqual(p.questions.map(q=>q.parts[0].page),[2,2,3,3,4,4,5,5,6,7]);assert.ok(p.coverage.slice(7).every(c=>c.reviewed&&!c.questionIds.length&&/空白解答/.test(c.excluded)));
 for(const q of p.questions){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.explanation);}
 for(const part of [...p.commonParts,...p.questions.flatMap(q=>q.parts)]){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(part.src)).digest('hex'),part.sha256);assert.ok(Math.abs(part.width-(part.box[2]-part.box[0])*4)<=2);}
 assert.deepEqual(p.questions.slice(0,4).map(q=>q.number),['力学（その1） 問1','力学（その1） 問2','力学（その2） 問1','力学（その2） 問2']);
 assert.equal(p.commonParts.length+p.questions.flatMap(q=>q.parts).length,14);
 assert.equal(p.questions[2].parts.length,2);assert.equal(p.questions[3].parts.length,3);
});
