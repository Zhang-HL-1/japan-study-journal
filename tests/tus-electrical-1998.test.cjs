const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const id='tus-electrical-1998-general';
test('1998 publishes only the complete original question at scale 4 and records all missing content',()=>{
 const p=read(`assets/question-bank/${id}/paper.json`),m=read(`data/question-manifests/${id}-denshi.json`),a=read('docs/question-bank-tus-electrical-1998-blocked.json');
 assert.equal(p.source.year,1998);assert.equal(p.source.yearBasis,'academic');assert.match(p.source.note,/1997-08-02/);assert.match(p.title,/仅电子第1题/);assert.deepEqual(p.source.subjects,['电子回路']);assert.equal(p.questions.length,1);assert.equal(m.renderScale,4);assert.equal(m.source.yearEvidence,'cover');assert.equal(m.source.originalYear,'平成10年度');
 assert.equal(hash(m.source.pdf),m.source.sha256);assert.equal(m.coverage.length,5);assert.ok(m.coverage.every(c=>c.reviewed));assert.match(m.coverage[0].excluded,/真值表表体缺损/);assert.ok(m.coverage.slice(1).every(c=>!c.questionIds.length&&/手写参考解答/.test(c.excluded)));
 const q=p.questions[0];assert.equal(q.number,'1');assert.equal(q.review.status,'verified');assert.equal(q.layout,'source-page');assert.equal(q.parts.length,2);assert.equal(q.titleKind,'editorial');assert.ok(!q.answer&&!q.answerText&&!q.explanation);
 assert.deepEqual(q.parts.map(x=>[x.width,x.height]),[[1272,436],[1072,444]]);assert.ok(q.parts.every(x=>x.page===1&&x.box[3]<=407));for(const part of [...p.commonParts,...q.parts])assert.equal(hash(part.src),part.sha256);
 assert.equal(a.sourceQuestionCount,2);assert.equal(a.availableQuestions,1);assert.equal(a.blocked.length,1);assert.equal(a.blocked[0].questionId,id+'-denshi-q2');assert.equal(a.blocked[0].page,1);assert.equal(a.blocked[0].status,'blocked');assert.match(a.blocked[0].issue,/真值表/);assert.deepEqual(a.missingSubjects.map(s=>s.subject),['电气回路','电磁回路']);assert.ok(!p.questions.some(q=>q.id.endsWith('-q2')));
});
test('1998 retains source hashes and maps the rotated excluded page through a separate derived copy',()=>{
 const m=read(`data/question-manifests/${id}-denshi.json`),n=m.source.normalization;assert.equal(n.derivedPdf,`assets/question-bank/${id}-denshi/normalized.pdf`);assert.notEqual(n.derivedPdf,m.source.pdf);assert.equal(hash(n.derivedPdf),n.derivedSha256);assert.equal(n.pages.length,5);assert.deepEqual(n.pages.map(p=>p.sourceRotation),[0,90,0,0,0]);assert.ok(n.pages.every(p=>p.derivedRotation===0));assert.deepEqual(n.pages.map(p=>p.page),[1,2,3,4,5]);assert.match(n.method,/pixel-for-pixel/);
});
