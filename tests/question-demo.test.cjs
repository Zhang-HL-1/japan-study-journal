const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),catalog=require('../past-papers-data.js');
const index=require('../question-bank-index.json');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
test('published question papers preserve catalog sources, unique IDs and complete page accounting',()=>{
 const ids=new Set(),papers=new Set();assert.equal(index.schemaVersion,1);
 for(const entry of index.papers){
  assert.ok(!papers.has(entry.id));papers.add(entry.id);
  assert.equal(entry.data,`assets/question-bank/${entry.id}/paper.json`);
  const data=JSON.parse(fs.readFileSync(path.join(root,entry.data)));
  if(data.schemaVersion===2){
   const builder=require('../scripts/build-question-collections.cjs');const config=JSON.parse(fs.readFileSync(path.join(root,'data/question-collections',entry.id+'.json')));
   assert.deepEqual(data,builder.build(config));assert.equal(data.questions.length,entry.questionCount);
   for(const q of data.questions){assert.ok(!ids.has(q.id));ids.add(q.id);assert.equal(q.review.status,'verified');}
   continue;
  }
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/question-manifests',entry.id+'.json')));
  assert.equal(data.id,entry.id);assert.equal(data.questions.length,entry.questionCount);assert.deepEqual(data.source,manifest.source);assert.deepEqual(data.coverage,manifest.coverage);
  assert.equal(hash(data.source.pdf),data.source.sha256);
  if(data.source.normalization){
   const norm=data.source.normalization;
   assert.equal(hash(norm.derivedPdf),norm.derivedSha256);
   assert.equal(norm.pages.length,data.source.pageCount);
   for(const mapped of norm.pages) assert.equal(mapped.derivedRotation,0);
  } else assert.equal(data.source.normalization,undefined);
  const source=catalog.papers.find(p=>p.id===data.source.catalogId);assert.ok(source);assert.equal(source.universityId,data.source.schoolId);
  const file=source.files.find(f=>f.url===data.source.pdf);assert.equal(file.kind,'question');assert.equal(file.originalName,data.source.originalName);assert.equal(file.pages,data.source.pageCount);
  assert.deepEqual(data.coverage.map(c=>c.page).sort((a,b)=>a-b),Array.from({length:data.source.pageCount},(_,i)=>i+1));
  for(const c of data.coverage){assert.equal(c.reviewed,true);assert.deepEqual(c.questionIds.slice().sort(),data.questions.filter(q=>q.parts.some(p=>p.page===c.page)).map(q=>q.id).sort());}
  for(const [i,q] of data.questions.entries()){
   assert.ok(!ids.has(q.id));ids.add(q.id);assert.equal(q.id,manifest.questions[i].id);assert.equal(q.number,manifest.questions[i].number);assert.equal(q.review.status,'verified');assert.equal(q.parts.length,manifest.questions[i].regions.length);
   assert.equal(q.answer,undefined);assert.equal(q.answerText,undefined);assert.equal(q.explanation,undefined);
   q.parts.forEach((part,n)=>{assert.deepEqual(part.box,manifest.questions[i].regions[n].box);assert.equal(part.page,manifest.questions[i].regions[n].page);});
  }
  for(const part of [...data.commonParts,...data.questions.flatMap(q=>q.parts)]){
   assert.match(part.src,new RegExp(`^assets/question-bank/${entry.id}/[a-z0-9-]+\\.png$`));assert.equal(hash(part.src),part.sha256);
   const bytes=fs.readFileSync(path.join(root,part.src));assert.equal(bytes.subarray(1,4).toString(),'PNG');assert.equal(bytes.readUInt32BE(16),part.width);assert.equal(bytes.readUInt32BE(20),part.height);
   assert.ok(part.page>=1&&part.page<=data.source.pageCount);assert.ok(part.box[0]<part.box[2]&&part.box[1]<part.box[3]);
  }
 }
});
test('inventory counts PDFs independently from questions and excludes ancillary files',()=>{
 const result=require('../skills/past-paper-to-questions/scripts/inventory.cjs').inventory(root);
 assert.equal(result.summary.uniqueQuestionPdfs,new Set(catalog.papers.flatMap(p=>p.files.filter(f=>f.kind==='question').map(f=>f.url))).size);
 assert.equal(result.summary.catalogGroups,842);assert.equal(result.summary.uniqueQuestionPdfs,1132);
 const demo=result.sources.find(s=>s.manifests.some(m=>m.id==='kobe-ee-2026-denjiki'));assert.ok(demo);assert.equal(demo.manifests[0].questions,2);assert.ok(demo.references.some(r=>r.catalogId==='kobe-ee-2026'));assert.equal(demo.status,'manifest-present');
});
