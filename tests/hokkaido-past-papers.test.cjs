const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/hokkaido-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='hokkaido'),root=path.join(__dirname,'..');
test('Hokkaido keeps 29 unique original PDFs with three intentions and no answers',()=>{
 assert.equal(papers.length,16);assert.equal(manifest.files.length,29);assert.equal(manifest.questionPDFs,26);assert.equal(manifest.intentionPDFs,3);assert.equal(manifest.totalPages,241);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,29);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.yearBasis,'academic');assert.equal(p.paperYear,p.examYear+1);for(const f of p.files){assert.ok(f.startPage<=f.pages);assert.notEqual(f.kind,'answer');if(f.kind==='other'){assert.equal(f.pages,1);assert.equal(p.paperYear,2026);assert.match(f.label,/出题意图.*非解答/);}}}
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.universityId!=='hokkaido'&&p.universityId!=='osaka'&&p.universityId!=='uec'&&p.universityId!=='nagoya'))).digest('hex'),'87d974e8bba60a23a16894aae89b781f7346573b4aa51c1dffc2606c301b2364');
});
test('Hokkaido separates academic years from actual dates without inventing dates on undated CSIT covers',()=>{
 for(const p of papers){if(p.graduateSchool==='工学院'){assert.deepEqual(p.examDates,[p.paperYear===2025?'2024-08-20':'2025-08-19']);if(!p.id.includes('mechanical'))assert.deepEqual(p.admissionYears,[p.paperYear-1,p.paperYear]);}else if(p.id.includes('-csit-')){assert.equal(p.examDates,undefined);assert.match(p.sourceNote,/未印具体考试日期/);}else assert.deepEqual(p.examDates,[p.paperYear===2025?'2024-08-27':'2025-08-25']);}
 assert.equal(core.filter(papers,catalog.universities,{school:'hokkaido',graduate:'all',year:'2026',query:'2025-08-25'}).length,4);
 assert.deepEqual([...new Set(papers.map(p=>p.paperYear))],[2025,2026]);
});
test('Hokkaido pairs five information courses and fixes misplaced systems originals with exact first-question pages',()=>{
 const info=papers.filter(p=>p.graduateSchool==='情報科学院');assert.equal(info.length,10);assert.equal(new Set(info.map(p=>p.department)).size,5);
 for(const p of info){assert.match(p.department,/^情報科学専攻／.+コース$/);assert.deepEqual(p.files.map(f=>f.label),['専門科目1','専門科目2']);const code=p.id.split('-')[1],exam=p.examYear;assert.deepEqual(p.files.map(f=>f.originalName),[`${code}01_${exam}.pdf`,`${code}02_${exam}.pdf`]);const start=code==='mn'||code==='seitai'&&exam===2024||code==='sys'&&exam===2025?2:3;assert.deepEqual(p.files.map(f=>f.startPage),[start,start]);}
 const misplaced=info.find(p=>p.id==='hokkaido-sys-2025');assert.ok(misplaced.files.every(f=>f.sourcePaths[0].includes('/媒体网络/')));assert.match(misplaced.sourceNote,/据封面归类|按卷面归类/);
});
test('Hokkaido shared engineering groups preserve original subject changes and correction pages',()=>{
 const eng=papers.filter(p=>p.graduateSchool==='工学院');assert.equal(eng.length,6);assert.equal(manifest.engineeringSharedMajors.length,4);
 for(const p of eng.filter(p=>p.department.includes('研究室群'))){assert.match(p.sourceNote,/跨专攻/);assert.equal(p.files[0].startPage,2);}
 const q25=eng.find(p=>p.id==='hokkaido-applied-quantum-2025'),q26=eng.find(p=>p.id==='hokkaido-applied-quantum-2026');assert.ok(q25.subjects.includes('材料科学'));assert.ok(q26.subjects.includes('材料科学・物理化学'));assert.ok(q26.subjects.includes('電磁気学・電気回路'));
 const m=eng.find(p=>p.id==='hokkaido-mechanical-aerospace-2026');assert.equal(m.files[0].pages,19);assert.match(m.sourceNote,/第15页.*問題訂正/);assert.equal(manifest.correction.noticePage,15);assert.match(data.schoolNotes.hokkaido.text,/16组／29个PDF/);
});
