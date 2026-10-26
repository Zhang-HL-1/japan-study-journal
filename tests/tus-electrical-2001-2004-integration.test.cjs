const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const index=require('../question-bank-index.json'),api=require('../question-bank.js'),core=require('../practice-core.js');
const papers=[2001,2002,2004].map(year=>{const id=`tus-electrical-${year}-general`,entries=index.papers.filter(p=>p.id===id);assert.equal(entries.length,1);const entry=entries[0],paper=JSON.parse(fs.readFileSync(entry.data));return{entry,paper,listing:api.listingFromPaper(entry,paper)};});
test('parallel batches remain separately selectable by year and communication subject',()=>{
 for(const [i,{entry,paper}]of papers.entries()){
  assert.equal(entry.questionCount,[11,9,8][i]);assert.equal(paper.questions.length,entry.questionCount);
  for(const subject of paper.source.subjects){const result=core.filterQuestions(papers.map(p=>p.listing),{school:'東京理科大学',major:JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']),paperYear:String(paper.source.year),subject},{});assert.deepEqual(result.map(p=>p.id),[entry.id]);}
 }
 assert.ok(!index.papers.some(p=>p.id.startsWith('tus-electrical-2003-')));
});
test('2001 supplemental sheet and 2002 exam never duplicate shared source-page questions',()=>{
 const used=new Map(),ids=new Set();
 for(const {paper}of papers)for(const q of paper.questions){assert.ok(!ids.has(q.id));ids.add(q.id);const file=paper.source.files.find(f=>f.id===q.sourceFileId);for(const part of q.parts){const key=file.sha256+':'+part.page,previous=used.get(key);if(previous!==undefined)assert.equal(previous,paper.source.year);used.set(key,paper.source.year);}}
 const shared='210bcaad151b4db32c3f9425e1db7655bdc4b30cd3af0cce92277d956db02922';assert.equal(used.get(shared+':8'),2001);for(const page of[1,2,6])assert.equal(used.get(shared+':'+page),2002);assert.equal(ids.size,28);
});
