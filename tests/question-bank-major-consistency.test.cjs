const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const data=require('../past-papers-data.js');
const root=path.join(__dirname,'..','assets','question-bank');
test('every per-question paper [school, graduate, major] exists in the whole-paper catalog',()=>{
 const keys=new Set(data.papers.map(p=>[p.universityId,p.graduateSchool,p.department].join('|')));
 const missing=[];let n=0;
 for(const dir of fs.readdirSync(root)){const f=path.join(root,dir,'paper.json');if(!fs.existsSync(f))continue;const s=JSON.parse(fs.readFileSync(f,'utf8')).source||{};n++;const k=[s.schoolId,s.graduate,s.major].join('|');if(!keys.has(k))missing.push(`${dir}: ${k}`);}
 assert.ok(n>0);assert.deepEqual(missing,[]);
});
test('question manifests and generated paper.json agree on major',()=>{
 const dir=path.join(__dirname,'..','data','question-manifests');
 for(const f of fs.readdirSync(dir)){const m=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));const p=path.join(root,m.id||f.replace(/\.json$/,''),'paper.json');if(!m.source||!fs.existsSync(p))continue;const s=JSON.parse(fs.readFileSync(p,'utf8')).source;assert.equal(s.major,m.source.major,f);assert.equal(s.graduate,m.source.graduate,f);}
});
