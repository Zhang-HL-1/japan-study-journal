const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js'),api=require('../question-bank.js'),core=require('../practice-core.js');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const id='tus-electrical-2016-general',paper=read(`assets/question-bank/${id}/paper.json`);
test('2016 groups all three subjects of the single compilation into one eight-question exam',()=>{
 assert.deepEqual(index.papers.filter(e=>e.id.startsWith('tus-electrical-2016-')).map(e=>e.id),[id]);
 assert.equal(paper.source.year,2016);assert.equal(paper.source.yearBasis,'academic');assert.match(paper.source.note,/平成28年度/);assert.match(paper.source.note,/2015-07-31/);
 const source=catalog.papers.find(p=>p.id===paper.source.catalogId);assert.equal(source.graduateSchool,'工学研究科');assert.equal(source.department,'電気工学専攻');assert.equal(source.paperYear,2016);
 assert.deepEqual(paper.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(paper.source.files.length,3);assert.equal(new Set(paper.source.files.map(f=>f.pdf)).size,1);assert.equal(paper.questions.length,8);
 const contentPages=new Set();
 for(const [i,file] of paper.source.files.entries()){
  assert.equal(file.pageCount,8);assert.equal(hash(file.pdf),file.sha256);assert.ok(source.files.some(f=>f.url===file.pdf));
  const qs=paper.questions.filter(q=>q.sourceFileId===file.id),m=read(`data/question-manifests/${file.id}.json`),component=read(`assets/question-bank/${file.id}/paper.json`);
  assert.equal(qs.length,[2,2,4][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,i)=>String(i+1)));
  assert.deepEqual(component.coverage,m.coverage);assert.ok(component.coverage.every(c=>c.reviewed));assert.equal(component.coverage.length,8);
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(api.sourceForQuestion(paper,q).id,file.id);assert.ok(api.commonPartsForQuestion(paper,q).every(p=>p.fileId===file.id));q.parts.forEach(p=>contentPages.add(p.page));}
 }
 assert.deepEqual([...contentPages].sort(),[2,3,5,6,8]);
 const emf=paper.source.files[2].id;assert.deepEqual(paper.coverage.filter(c=>c.fileId===emf&&c.questionIds.length).map(c=>c.questionIds.length),[2,2]);
 const electronic=paper.questions.filter(q=>q.sourceFileId.endsWith('-denshi'));assert.deepEqual(electronic.map(q=>q.parts[0].page),[8,8]);
 const listing=api.listingFromPaper(index.papers.find(e=>e.id===id),paper);
 for(const subject of paper.source.subjects)assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2016',subject},{}).map(p=>p.id),[id]);
});
