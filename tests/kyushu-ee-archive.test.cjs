const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/kyushu-ee-archive-manifest.json'),core=require('../past-papers-core.js'),map=require('../campus-map-data.js');
test('Kyushu EE archive covers 2008–2026 with unchanged source bytes and five reused records',()=>{
 assert.equal(manifest.files.length,19);assert.equal(manifest.files.filter(f=>f.reused).length,5);
 const added=data.papers.filter(p=>p.sourceBatch===manifest.sourceBatch);assert.equal(added.length,14);assert.equal(added.reduce((n,p)=>n+p.files[0].pages,0),537);
 for(let y=2008;y<=2026;y++)assert.ok(data.papers.some(p=>p.id==='kyushu-isee-ee-'+y));
 for(const f of manifest.files){const p=data.papers.find(p=>p.id===f.paperId);assert.ok(core.validPaper(p,map.universities));assert.equal(p.graduateSchool,'システム情報科学府');const file=p.files.find(x=>x.sha256===f.sha256);assert.ok(file);const b=fs.readFileSync(path.join(__dirname,'..',file.url));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(file.pages,f.pages);}
 assert.equal(data.papers.filter(p=>p.universityId==='kyushu').length,42);assert.match(added.find(p=>p.paperYear===2008).department,/電子デバイス工学/);assert.deepEqual(added.find(p=>p.paperYear===2026).examDates,['2025-08-26']);assert.ok(added.every(p=>p.files[0].startPage===1&&p.examYear===p.paperYear-1));
});
