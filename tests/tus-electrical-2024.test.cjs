const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js'),api=require('../question-bank.js'),core=require('../practice-core.js');
const read=rel=>JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
const hash=rel=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,rel))).digest('hex');
const ids=['tus-electrical-2024-general','tus-electrical-2024-intl'];
const papers=ids.map(id=>read(`assets/question-bank/${id}/paper.json`));
test('2024 engineering electrical exposes two exams with three subjects each and complete numbered questions',()=>{
 assert.deepEqual(index.papers.filter(p=>p.id.startsWith('tus-electrical-2024-')).map(p=>p.id),ids);
 const unique=new Set();
 for(const [i,p] of papers.entries()){
  assert.equal(p.questions.length,[11,10][i]);assert.equal(p.source.files.length,3);
  assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路']);
  assert.equal(p.source.year,2024);assert.equal(p.source.yearBasis,'academic');assert.equal(p.source.graduate,'工学研究科');assert.equal(p.source.major,'電気工学専攻');
  const sourceCatalog=catalog.papers.find(c=>c.id===p.source.catalogId);assert.equal(sourceCatalog.paperYear,2024);assert.match(p.source.note,new RegExp(sourceCatalog.examDates[0]));
  for(const [n,file] of p.source.files.entries()){
   assert.ok(sourceCatalog.files.some(f=>f.url===file.pdf));
   const qs=p.questions.filter(q=>q.sourceFileId===file.id);assert.equal(qs.length,[[3,4,4],[3,3,4]][i][n]);
   assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,n)=>String(n+1)));
   for(const q of qs){assert.ok(!unique.has(q.id));unique.add(q.id);assert.equal(api.sourceForQuestion(p,q).id,file.id);assert.ok(api.commonPartsForQuestion(p,q).every(c=>c.fileId===file.id));}
  }
 }
 assert.equal(unique.size,21);
 const general=papers[0],em=general.source.files[2].id;
 assert.deepEqual(general.coverage.filter(c=>c.fileId===em&&c.page>1).map(c=>c.questionIds.length),[2,2]);
 for(const subject of ['电气回路','电磁回路']){
  const filtered=core.filterQuestions(papers.map(p=>api.listingFromPaper(index.papers.find(e=>e.id===p.id),p)),{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2024',subject},{});
  assert.deepEqual(new Set(filtered.map(p=>p.id)),new Set(ids));
 }
});
test('three supplementary PDFs map to canonical files with pixel checks for every question crop and are never counted twice',()=>{
 const audit=read('docs/question-bank-tus-electrical-2024-duplicates.json'),queue=read('docs/question-bank-tus-electrical-queue.json');
 assert.equal(audit.duplicates.length,3);assert.equal(audit.renderScale,2.5);
 const duplicates=queue.sources.filter(s=>s.status==='duplicate'&&s.collectionId==='tus-electrical-2024-general');assert.equal(duplicates.length,3);
 for(const d of audit.duplicates){
  assert.equal(hash(d.canonicalPdf),d.canonicalSha256);assert.equal(hash(d.duplicatePdf),d.duplicateSha256);assert.notEqual(d.canonicalSha256,d.duplicateSha256);
  const paper=read(`assets/question-bank/${d.paperId}/paper.json`),manifest=read(`data/question-manifests/${d.paperId}.json`);
  const expected=manifest.questions.flatMap(q=>q.regions.map(r=>({questionId:q.id,page:r.page,box:r.box})));
  assert.deepEqual(d.regions.map(r=>({questionId:r.questionId,page:r.page,box:r.box})),expected);
  assert.ok(d.regions.every(r=>r.identical&&r.width>0&&r.height>0&&/^[a-f0-9]{64}$/.test(r.samplesSha256)));
  const source=duplicates.find(s=>s.pdf===d.duplicatePdf);assert.equal(source.duplicateOf,paper.source.pdf);assert.equal(source.collectionId,papers[0].id);assert.deepEqual(source.paperIds,[]);
  assert.ok(!papers.flatMap(p=>p.source.files).some(s=>s.pdf===d.duplicatePdf));
 }
 assert.equal(queue.summary.coveredPdfs,30);assert.equal(queue.summary.duplicatePdfs,6);assert.equal(queue.summary.verifiedQuestions,118);assert.equal(queue.summary.logicalExamPapers,13);
 assert.equal(queue.summary.pendingPdfs+queue.summary.verifiedPdfs+queue.summary.duplicatePdfs,queue.summary.uniqueQuestionPdfs);
});
