const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js');
const read=p=>JSON.parse(fs.readFileSync(p)),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('2007 is one six-page source, seven verified numbered questions and four subjects',()=>{
 const id='tus-electrical-2007-general',entry=index.papers.filter(p=>p.id.startsWith('tus-electrical-2007-'));assert.equal(entry.length,1);
 const p=read(entry[0].data),c=catalog.papers.find(c=>c.id===p.source.catalogId);assert.equal(c.paperYear,2007);assert.equal(c.yearBasis,'academic');assert.equal(c.department,'電気工学専攻');
 assert.equal(p.source.year,2007);assert.match(p.source.note,/2006-08-01/);assert.match(p.source.note,/2题blocked/);assert.equal(p.questions.length,7);assert.equal(new Set(p.source.files.map(f=>f.pdf)).size,1);
 const covered=new Set();
 for(const [i,f] of p.source.files.entries()){
  assert.equal(hash(f.pdf),f.sha256);assert.equal(f.pageCount,6);const m=read(`data/question-manifests/${f.id}.json`),qs=p.questions.filter(q=>q.sourceFileId===f.id);
  assert.equal(qs.length,[2,1,2,2][i]);assert.deepEqual(qs.map(q=>q.number),i===1?['2']:['1','2']);assert.equal(m.coverage.length,6);assert.ok(m.coverage.every(c=>c.reviewed));
  for(const q of qs){assert.equal(q.review.status,'verified');assert.equal(q.titleKind,'editorial');for(const part of q.parts){covered.add(part.page);assert.equal(hash(part.src),part.sha256);}}
 }
 assert.deepEqual([...covered].sort(),[1,2,3,5,6]);assert.equal(p.questions[0].parts.length,2);assert.equal(p.source.files[3].subject,'英语');assert.ok(p.questions[6].parts[0].box[3]>175);
 assert.deepEqual(p.questions.map(q=>q.parts[0].page),[3,3,2,1,1,5,6]);
});
test('2007 English and electromagnetism filters resolve to the same complete exam',()=>{
 const api=require('../question-bank.js'),core=require('../practice-core.js'),e=index.papers.find(p=>p.id==='tus-electrical-2007-general'),p=read(e.data),listing=api.listingFromPaper(e,p);
 assert.deepEqual(p.source.subjects,['电子回路','电气回路','电磁回路','英语']);
 for(const subject of ['英语','电磁回路'])assert.deepEqual(core.filterQuestions([listing],{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:'2007',subject},{}).map(p=>p.id),[e.id]);
 assert.deepEqual(p.questions.filter(q=>q.sourceFileId.endsWith('-english')).map(q=>q.number),['1','2']);
});
test('2007 exposes partial coverage, excludes two blocked questions and filled answer-sheet waveforms',()=>{
 const p=read('assets/question-bank/tus-electrical-2007-general/paper.json'),audit=read('docs/question-bank-tus-electrical-2007-blocked.json');
 assert.match(p.title,/部分：2题待补/);assert.equal(audit.sourceQuestionCount,9);assert.equal(audit.availableQuestions,7);assert.equal(audit.blocked.length,2);
 assert.ok(!p.questions.some(q=>q.id==='tus-electrical-2007-general-kairo-q1'||q.id==='tus-electrical-2007-general-english-q3'));
 assert.ok(p.questions.every(q=>q.parts.every(x=>x.page!==4)));
 const cover=p.commonParts.find(x=>x.page===4);assert.ok(cover);assert.ok(cover.box[3]<=102);
 for(const q of p.questions.filter(q=>q.sourceFileId.endsWith('-english'))){assert.equal(q.layout,'source-page');assert.equal(q.parts.length,4);}
});
