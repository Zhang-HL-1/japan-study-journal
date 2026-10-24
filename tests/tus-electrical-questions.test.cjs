const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),catalog=require('../past-papers-data.js'),index=require('../question-bank-index.json'),api=require('../question-bank.js'),core=require('../practice-core.js');
const expected={
 'tus-electrical-2025-general-denshi':3,'tus-electrical-2025-general-kairo':2,'tus-electrical-2025-general-denjiki':5,
 'tus-electrical-2025-intl-denshi':3,'tus-electrical-2025-intl-kairo':2,'tus-electrical-2025-intl-denjiki':4
};
const data=Object.keys(expected).map(id=>JSON.parse(fs.readFileSync(path.join(root,`assets/question-bank/${id}/paper.json`),'utf8')));
test('TUS engineering electrical 2025 covers general and international PDFs without mixing similar majors',()=>{
 const scope=catalog.papers.filter(p=>p.universityId==='tus'&&p.graduateSchool==='工学研究科'&&p.department==='電気工学専攻'&&p.paperYear===2025);
 assert.equal(scope.length,2);const pdfs=new Set(scope.flatMap(p=>p.files.filter(f=>f.kind==='question').map(f=>f.url)));
 assert.deepEqual(new Set(data.map(p=>p.source.pdf)),pdfs);assert.equal(data.reduce((n,p)=>n+p.questions.length,0),19);
 for(const p of data){
  assert.equal(p.source.major,'電気工学専攻');assert.equal(p.source.graduate,'工学研究科');assert.equal(p.source.year,2025);assert.equal(p.source.yearBasis,'academic');assert.equal(p.questions.length,expected[p.id]);
  const c=scope.find(c=>c.id===p.source.catalogId);assert.ok(c);assert.match(p.source.note,new RegExp(c.examDates[0]));
  const cover=p.coverage.find(c=>c.page===1);assert.equal(cover.common,true);assert.deepEqual(cover.questionIds,[]);
  assert.deepEqual(p.questions.map(q=>q.number),Array.from({length:p.questions.length},(_,i)=>String(i+1)));
 }
});
test('electromagnetism keeps two numbered questions on each shared page, while dedicated major filters stay separate',()=>{
 const paper=data.find(p=>p.id==='tus-electrical-2025-general-denjiki');
 assert.deepEqual(paper.coverage.find(c=>c.page===2).questionIds,paper.questions.slice(0,2).map(q=>q.id));
 assert.deepEqual(paper.coverage.find(c=>c.page===3).questionIds,paper.questions.slice(2,4).map(q=>q.id));
 const listings=index.papers.map(e=>api.listingFromPaper(e,JSON.parse(fs.readFileSync(path.join(root,e.data),'utf8'))));
 const major=JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']);
 const filtered=core.filterQuestions(listings,{school:'東京理科大学',major,paperYear:'2025',subject:'电磁学'},{});
 assert.deepEqual(new Set(filtered.map(q=>q.id)),new Set(['tus-electrical-2025-general-denjiki','tus-electrical-2025-intl-denjiki']));
 assert.ok(filtered.every(q=>q.provenance.graduate==='工学研究科'&&q.provenance.major==='電気工学専攻'));
});
