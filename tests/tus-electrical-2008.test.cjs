const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('2008 is one seven-page source, eight complete numbered questions and four subjects',()=>{
 const id='tus-electrical-2008-general',entry=index.papers.filter(p=>p.id.startsWith('tus-electrical-2008-'));assert.equal(entry.length,1);
 const p=read(entry[0].data),c=catalog.papers.find(c=>c.id===p.source.catalogId);assert.equal(c.paperYear,2008);assert.equal(c.yearBasis,'academic');assert.equal(c.department,'電気工学専攻');
 assert.equal(p.source.year,2008);assert.match(p.source.note,/2007-08-08/);assert.match(p.source.note,/术语表格/);assert.equal(p.source.files[0].yearEvidence,'cover');assert.equal(p.questions.length,8);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);
 const covered=new Set();
 for(const [i,f] of p.source.files.entries()){
  assert.equal(hash(f.pdf),f.sha256);assert.equal(f.pageCount,7);const m=read(`data/question-manifests/${f.id}.json`),qs=p.questions.filter(q=>q.sourceFileId===f.id);
  assert.equal(qs.length,[2,2,2,2][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,j)=>String(j+1)));assert.equal(m.coverage.length,7);assert.ok(m.coverage.every(c=>c.reviewed));
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');for(const part of q.parts){covered.add(part.page);assert.equal(hash(part.src),part.sha256);}}
 }
 assert.deepEqual([...covered].sort(),[2,3,4,5,6,7]);assert.equal(p.questions[0].parts.length,1);assert.equal(p.source.files[3].subject,'英语');assert.ok(p.questions[6].parts[0].box[3]>610);
 assert.deepEqual(p.questions.map(q=>q.parts[0].page),[5,5,4,4,2,3,6,7]);
});
test('2008 English and electromagnetism filters resolve to the same complete exam',()=>{
 const api=require('../question-bank.js'),core=require('../practice-core.js'),e=index.papers.find(p=>p.id==='tus-electrical-2008-general'),p=read(e.data),listing=api.listingFromPaper(e,p);
 assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路','英语']);
 for(const subject of ['英语','电磁回路'])assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2008',subject},{}).map(p=>p.id),[e.id]);
 assert.deepEqual(p.questions.filter(q=>q.sourceFileId.endsWith('-english')).map(q=>q.number),['1','2']);
});
test('2008 keeps the dated cover as common material and prevents adjacent circuit questions mixing',()=>{
 const p=read('assets/question-bank/tus-electrical-2008-general/paper.json');
 for(const f of p.source.files){const m=read(`data/question-manifests/${f.id}.json`);assert.equal(m.source.yearEvidence,'cover');assert.ok(m.commonRegions.some(r=>r.page===1));assert.equal(m.coverage[0].common,true);assert.deepEqual(m.coverage[0].questionIds,[]);}
 const qs=p.questions.filter(q=>q.sourceFileId.endsWith('-kairo'));assert.deepEqual(qs.map(q=>q.parts.length),[2,3]);assert.ok(qs.every(q=>q.layout==='source-page'));
 assert.deepEqual(qs[0].parts[1].box,[216,253.6,251.2,272.8]);assert.deepEqual(qs[1].parts[0].box,[30.4,264,61.6,292]);
});
