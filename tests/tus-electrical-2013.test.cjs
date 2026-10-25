const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js'),api=require('../question-bank.js'),core=require('../practice-core.js');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const id='tus-electrical-2013-general',paper=read(`assets/question-bank/${id}/paper.json`);
test('2013 keeps directory-based admission year and seven numbered questions from one three-subject compilation',()=>{
 assert.deepEqual(index.papers.filter(e=>e.id.startsWith('tus-electrical-2013-')).map(e=>e.id),[id]);
 assert.equal(paper.source.year,2013);assert.equal(paper.source.yearBasis,'academic');assert.equal(paper.source.yearEvidence,'source-directory');assert.match(paper.source.note,/2013\(H25\).pdf/);assert.match(paper.source.note,/2012-08-03/);
 const source=catalog.papers.find(p=>p.id===paper.source.catalogId);assert.equal(source.paperYear,2013);assert.equal(source.yearEvidence,'source-directory');assert.equal(source.department,'電気工学専攻');assert.equal(source.graduateSchool,'工学研究科');
 assert.equal(paper.questions.length,7);assert.deepEqual(paper.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(paper.source.files.length,3);assert.equal(new Set(paper.source.files.map(f=>f.pdf)).size,1);
 const covered=new Set();
 for(const [i,file] of paper.source.files.entries()){
  assert.equal(hash(file.pdf),file.sha256);assert.equal(file.pageCount,5);assert.ok(source.files.some(f=>f.url===file.pdf));assert.equal(file.yearEvidence,'source-directory');
  const qs=paper.questions.filter(q=>q.sourceFileId===file.id),m=read(`data/question-manifests/${file.id}.json`),p=read(`assets/question-bank/${file.id}/paper.json`);
  assert.equal(qs.length,[2,2,3][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,i)=>String(i+1)));assert.deepEqual(p.coverage,m.coverage);assert.equal(p.coverage.length,5);assert.ok(p.coverage.every(c=>c.reviewed));
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(api.sourceForQuestion(paper,q).id,file.id);assert.ok(api.commonPartsForQuestion(paper,q).every(c=>c.fileId===file.id));q.parts.forEach(p=>covered.add(p.page));}
 }
 assert.deepEqual([...covered].sort(),[1,2,3,4,5]);
 assert.deepEqual(paper.questions.filter(q=>q.sourceFileId.endsWith('-denshi')).map(q=>q.parts[0].page),[5,5]);
 const em=paper.source.files[2].id;assert.deepEqual(paper.coverage.filter(c=>c.fileId===em&&c.questionIds.length).map(c=>c.questionIds.length),[1,2]);
 const listing=api.listingFromPaper(index.papers.find(e=>e.id===id),paper);
 for(const subject of paper.source.subjects)assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2013',subject},{}).map(p=>p.id),[id]);
});
