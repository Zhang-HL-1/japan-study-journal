const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('2010 is one five-page source, nine complete numbered questions and four subjects',()=>{
 const id='tus-electrical-2010-general',entry=index.papers.filter(p=>p.id.startsWith('tus-electrical-2010-'));assert.equal(entry.length,1);
 const p=read(entry[0].data),c=catalog.papers.find(c=>c.id===p.source.catalogId);assert.equal(c.paperYear,2010);assert.equal(c.yearBasis,'academic');assert.equal(c.department,'電気工学専攻');
 assert.equal(p.source.year,2010);assert.match(p.source.note,/2009-08-05/);assert.match(p.source.note,/术语表格/);assert.equal(p.questions.length,9);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);
 const covered=new Set();
 for(const [i,f] of p.source.files.entries()){
  assert.equal(hash(f.pdf),f.sha256);assert.equal(f.pageCount,5);const m=read(`data/question-manifests/${f.id}.json`),qs=p.questions.filter(q=>q.sourceFileId===f.id);
  assert.equal(qs.length,[2,2,3,2][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,j)=>String(j+1)));assert.equal(m.coverage.length,5);assert.ok(m.coverage.every(c=>c.reviewed));
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');for(const part of q.parts){covered.add(part.page);assert.equal(hash(part.src),part.sha256);}}
 }
 assert.deepEqual([...covered].sort(),[1,2,3,4,5]);assert.equal(p.questions[0].parts.length,1);assert.equal(p.source.files[3].subject,'英语');assert.ok(p.questions[7].parts[0].box[3]>725);
 assert.deepEqual(p.questions.map(q=>q.parts[0].page),[3,3,2,2,1,1,1,4,5]);
});
test('2010 English and electromagnetism filters resolve to the same complete exam',()=>{
 const api=require('../question-bank.js'),core=require('../practice-core.js'),e=index.papers.find(p=>p.id==='tus-electrical-2010-general'),p=read(e.data),listing=api.listingFromPaper(e,p);
 assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路','英语']);
 for(const subject of ['英语','电磁回路'])assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2010',subject},{}).map(p=>p.id),[e.id]);
 assert.deepEqual(p.questions.filter(q=>q.sourceFileId.endsWith('-english')).map(q=>q.number),['1','2']);
});
