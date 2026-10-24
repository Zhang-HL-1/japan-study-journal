const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),catalog=require('../past-papers-data.js'),index=require('../question-bank-index.json'),api=require('../question-bank.js'),builder=require('../scripts/build-question-collections.cjs');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const id='tus-electrical-2021-general',paper=read(`assets/question-bank/${id}/paper.json`),config=read(`data/question-collections/${id}.json`);
test('2021 groups three subjects from two physical PDFs into one 11-question exam, without relabeling missing 2022',()=>{
 const scope=catalog.papers.filter(p=>p.universityId==='tus'&&p.graduateSchool==='工学研究科'&&p.department==='電気工学専攻');assert.equal(scope.some(p=>p.paperYear===2022),false);
 assert.deepEqual(index.papers.filter(e=>e.id.startsWith('tus-electrical-2021-')).map(e=>e.id),[id]);assert.deepEqual(paper,builder.build(config));
 assert.equal(paper.source.year,2021);assert.equal(paper.source.yearBasis,'academic');assert.match(paper.source.note,/2020-07-23/);assert.equal(paper.questions.length,11);
 assert.deepEqual(paper.source.subjects,['电子回路','电气回路','电磁回路']);assert.equal(paper.source.files.length,3);assert.equal(new Set(paper.source.files.map(f=>f.pdf)).size,2);
 for(const [i,file] of paper.source.files.entries()){
  const qs=paper.questions.filter(q=>q.sourceFileId===file.id),m=read(`data/question-manifests/${file.id}.json`),p=read(`assets/question-bank/${file.id}/paper.json`);
  assert.equal(qs.length,[3,3,5][i]);assert.deepEqual(qs.map(q=>q.number),Array.from({length:qs.length},(_,i)=>String(i+1)));assert.equal(hash(file.pdf),file.sha256);
  assert.deepEqual(p.coverage,m.coverage);assert.ok(p.coverage.every(c=>c.reviewed));assert.equal(p.coverage.length,file.pageCount);
  for(const q of qs){assert.equal(api.sourceForQuestion(paper,q).pdf,file.pdf);assert.equal(q.review.status,'verified');assert.equal(q.layout,i<2?'source-page':undefined);assert.ok(q.parts.every(part=>part.fileId===file.id));assert.ok(api.commonPartsForQuestion(paper,q).every(part=>part.fileId===file.id));}
 }
 const main=paper.source.files[0].pdf;assert.equal(paper.source.files[1].pdf,main);
 assert.ok(paper.questions.filter(q=>api.sourceForQuestion(paper,q).pdf===main).every(q=>q.parts.every(p=>[2,3,5,7,8].includes(p.page))));
 assert.deepEqual(paper.questions.filter(q=>q.sourceFileId.endsWith('-denjiki')).map(q=>q.parts[0].page),[1,1,2,3,3]);
 const audit=read('docs/question-bank-tus-electrical-2021-source-audit.json');assert.deepEqual(audit.sources[0].solutionOnlyPages,[6]);assert.ok(audit.electromagnetismCrossCheck.every(q=>q.verified));
});
test('collection layout is explicit and invalid layout flags cannot enter generated data',()=>{
 assert.throws(()=>builder.build({...config,components:config.components.map((c,i)=>i===0?{...c,layout:'guessed'}:c)}),/Invalid question layout/);
 const without=builder.build({...config,components:config.components.map(({layout,...c})=>c)});assert.ok(without.questions.every(q=>q.layout===undefined));
 assert.deepEqual(without.questions.map(q=>q.parts),paper.questions.map(q=>q.parts));
});
