const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const index=require('../question-bank-index.json'),catalog=require('../past-papers-data.js'),api=require('../question-bank.js'),core=require('../practice-core.js');
test('Waseda EPS listings preserve combined admission sessions without duplicate 2026 entries',()=>{
 const entries=index.papers.filter(e=>e.id.startsWith('waseda-eps-')),seen=new Set();assert.ok(entries.length>=3);
 for(const e of entries){const p=JSON.parse(fs.readFileSync(e.data)),c=catalog.papers.find(c=>c.id===p.source.catalogId);assert.equal(c.department,'電子物理システム学専攻');assert.equal(c.graduateSchool,'基幹理工学研究科');assert.equal(p.source.yearBasis,'academic');assert.deepEqual(p.source.admissionYears,[p.source.year,p.source.year+1]);assert.equal(p.questions.length,e.questionCount);assert.ok(!seen.has(p.source.sha256));seen.add(p.source.sha256);
  assert.match(e.title,new RegExp(p.source.year+'年9月'));assert.match(e.title,new RegExp((p.source.year+1)+'年4月'));const listing=api.listingFromPaper(e,p);assert.deepEqual(core.filterQuestions([listing],{school:'早稲田大学',major:JSON.stringify(['早稲田大学','基幹理工学研究科','電子物理システム学専攻']),paperYear:String(p.source.year),subject:'all'},{}).map(x=>x.id),[e.id]);
 }
 assert.ok(!entries.some(e=>e.id==='waseda-eps-2026'));assert.ok(!entries.some(e=>Number(e.id.split('-').at(-1))<2022));
});
test('official correction notices stay visible as common material for affected batches',()=>{
 for(const year of [2023,2025].filter(year=>index.papers.some(e=>e.id===`waseda-eps-${year}`))){const p=JSON.parse(fs.readFileSync(`assets/question-bank/waseda-eps-${year}/paper.json`));assert.ok(p.commonParts.some(part=>part.page===1));assert.ok(p.coverage.find(c=>c.page===1).common);assert.ok(p.coverage.every(c=>c.reviewed));assert.match(p.source.note,/訂正|订正/);}
});
