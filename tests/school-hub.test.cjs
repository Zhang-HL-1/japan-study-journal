const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const exams=require('../exam-scope-data.js'),papers=require('../past-papers-data.js'),map=require('../campus-map-data.js'),data=require('../school-hub-data.js');
const {build,serialize}=require('../scripts/build-school-index.cjs'),core=require('../exam-scope-core.js');
test('school summaries are deterministic and up to date with all source catalogs',()=>{
 assert.deepEqual(data,build(exams,papers,map));
 assert.equal(fs.readFileSync(path.join(__dirname,'../school-hub-data.js'),'utf8'),serialize(data));
 assert.equal(data.schools.length,23);assert.ok(Buffer.byteLength(serialize(data))<60000);
 assert.equal(data.schools.reduce((n,s)=>n+s.records,0),exams.records.length);
 assert.equal(data.schools.reduce((n,s)=>n+s.papers,0),papers.papers.length);
});
test('every school and graduate count agrees with the destination filters, including overlapping admissions',()=>{
 for(const school of data.schools){
  for(const group of [{...school,name:''},...school.graduates]){
   const rows=exams.records.filter(r=>r.universityId===school.id&&(!group.name||r.graduateSchool===group.name));
   for(const admission of ['general','international'])assert.equal(group[admission],rows.filter(r=>core.matchesAdmission(r,admission)).length,school.id+' '+group.name);
   assert.equal(group.papers,papers.papers.filter(p=>p.universityId===school.id&&(!group.name||p.graduateSchool===group.name)).length);
  }
 }
});
test('missing data and historical names remain explicit without invented equivalences',()=>{
 const tokyo=data.schools.find(s=>s.id==='utokyo');assert.equal(tokyo.papers,0);assert.equal(tokyo.pdfs,0);
 const nagoya=data.schools.find(s=>s.id==='nagoya');for(const name of ['多元数理科学研究科','理学研究科','環境学研究科'])assert.equal(nagoya.graduates.find(g=>g.name===name).campuses,0);
 const historical=data.schools.flatMap(s=>s.graduates).filter(g=>!g.records&&g.papers);assert.ok(historical.length>0);
});
test('school summary remains small, loads no full catalogs, and all page assets exist',()=>{
 const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/schools.html','utf8');
 assert.ok(!/src="(?:exam-scope-data|past-papers-data|campus-map-data)\.js/.test(html));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(/^(#|data:|https?:)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])),m[1]);}
});
