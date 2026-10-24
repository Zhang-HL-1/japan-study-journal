const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js'),api=require('../question-bank.js'),core=require('../practice-core.js');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const id='tus-electrical-2023-general',paper=read(`assets/question-bank/${id}/paper.json`);
test('2023 electrical general exam groups three subjects into one entry and preserves all 11 numbered questions',()=>{
 assert.deepEqual(index.papers.filter(e=>e.id.startsWith('tus-electrical-2023-')).map(e=>e.id),[id]);
 const scope=catalog.papers.filter(p=>p.universityId==='tus'&&p.graduateSchool==='工学研究科'&&p.department==='電気工学専攻'&&p.paperYear===2023);
 assert.equal(scope.length,1);assert.match(scope[0].selectionName,/一般/);assert.equal(paper.source.catalogId,scope[0].id);
 assert.equal(paper.source.year,2023);assert.equal(paper.source.yearBasis,'academic');assert.match(paper.source.note,/2022-07-22/);
 assert.deepEqual(paper.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(paper.source.files.length,3);assert.equal(paper.questions.length,11);
 for(const [i,file] of paper.source.files.entries()){
  assert.ok(scope[0].files.some(f=>f.url===file.pdf));assert.equal(hash(file.pdf),file.sha256);
  const qs=paper.questions.filter(q=>q.sourceFileId===file.id);assert.equal(qs.length,[3,3,5][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,i)=>String(i+1)));
  const manifest=read(`data/question-manifests/${file.id}.json`),component=read(`assets/question-bank/${file.id}/paper.json`);
  assert.deepEqual(component.source,manifest.source);assert.deepEqual(component.coverage,manifest.coverage);
  assert.deepEqual(component.coverage.map(c=>c.page),Array.from({length:file.pageCount},(_,i)=>i+1));assert.ok(component.coverage.every(c=>c.reviewed));
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(api.sourceForQuestion(paper,q).id,file.id);assert.ok(api.commonPartsForQuestion(paper,q).length>=2);assert.match(q.title,/^(电子回路|电气回路|电磁回路)：/);}
 }
 const em=paper.source.files[2].id;assert.deepEqual(paper.coverage.filter(c=>c.fileId===em&&c.page>1).map(c=>c.questionIds.length),[2,3]);
 const listing=api.listingFromPaper(index.papers.find(e=>e.id===id),paper);
 for(const subject of paper.source.subjects)assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2023',subject},{}).map(p=>p.id),[id]);
});
test('2023 supplementary source audit covers every question crop without registering duplicates',()=>{
 const audit=read('docs/question-bank-tus-electrical-2023-duplicates.json'),queue=read('docs/question-bank-tus-electrical-queue.json');assert.equal(audit.duplicates.length,3);
 for(const d of audit.duplicates){
  assert.equal(hash(d.canonicalPdf),d.canonicalSha256);assert.equal(hash(d.duplicatePdf),d.duplicateSha256);
  const m=read(`data/question-manifests/${d.paperId}.json`);
  assert.deepEqual(d.regions.map(r=>({questionId:r.questionId,page:r.page,box:r.box})),m.questions.flatMap(q=>q.regions.map(r=>({questionId:q.id,page:r.page,box:r.box}))));
  assert.ok(d.regions.every(r=>r.identical&&r.width>0&&r.height>0&&/^[a-f0-9]{64}$/.test(r.samplesSha256)));
  const s=queue.sources.find(s=>s.pdf===d.duplicatePdf);assert.equal(s.status,'duplicate');assert.equal(s.duplicateOf,d.canonicalPdf);assert.equal(s.collectionId,id);assert.deepEqual(s.paperIds,[]);
  assert.ok(!paper.source.files.some(f=>f.pdf===d.duplicatePdf));
 }
 assert.equal(audit.duplicates.reduce((n,d)=>n+d.regions.length,0),11);
});
