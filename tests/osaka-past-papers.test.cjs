const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/osaka-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='osaka'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
test('Osaka preserves original files, deduplicates one copy, and keeps all previously published records',()=>{
 assert.equal(papers.length,154);assert.equal(manifest.sourceFiles,228);assert.equal(manifest.files.length,227);assert.equal(manifest.duplicateByteCopies,1);assert.equal(manifest.questionPDFs,226);assert.equal(manifest.otherPDFs,1);assert.equal(manifest.totalPages,1539);assert.equal(manifest.backfillGroups,97);assert.equal(manifest.backfillUniquePDFs,132);assert.equal(manifest.backfillPages,819);assert.equal(manifest.skippedNotExam.length,6);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(hash(b),f.sha256);}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.yearBasis,'academic');assert.deepEqual(p.admissionYears,[p.paperYear]);for(const f of p.files){assert.ok(f.startPage<=f.pages);assert.notEqual(f.kind,'answer');}}
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,227);assert.equal(papers.filter(p=>!p.id.startsWith('osaka-science-')&&!p.id.startsWith('osaka-es-')&&!p.id.startsWith('osaka-ist-math-')).length,57);assert.equal(hash(JSON.stringify(data.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&p.universityId!=='osaka'&&p.universityId!=='kyushu'&&p.universityId!=='tohoku'&&p.universityId!=='keio'))),'36b7a4dc7cbcb533d05368b68d095cd06a8c370ca90394a95060b355873659db');
});
test('Osaka uses cover years rather than filenames and distinguishes common basics from course papers',()=>{
 for(const [name,year] of [['2021 basic.pdf',2022],['2022 basic.pdf',2023],['基礎科目.pdf',2024],['2024basic.pdf',2025]]){const p=papers.find(p=>p.files.some(f=>f.originalName===name));assert.equal(p.paperYear,year);assert.equal(p.completeness,'partial');assert.equal(p.files[0].startPage,2);assert.equal(p.examYear,undefined);}
 const courses=papers.filter(p=>p.id.startsWith('osaka-ee-')&&p.paperYear===2026);assert.equal(courses.length,3);assert.equal(new Set(courses.map(p=>p.department)).size,3);assert.ok(courses.every(p=>p.files.length===1&&p.files[0].pages>=16));
 const intelligent=papers.filter(p=>p.id.startsWith('osaka-intelligent'));assert.deepEqual(intelligent.map(p=>p.paperYear),[2021,2022,2023,2024,2025,2026]);assert.deepEqual(intelligent[0].files.map(f=>f.originalName),['R2-1.pdf','R2-2.pdf']);
 const mechanical=papers.filter(p=>p.id.startsWith('osaka-mechanical'));assert.deepEqual(mechanical.map(p=>p.paperYear),Array.from({length:13},(_,i)=>2014+i));assert.match(mechanical.find(p=>p.paperYear===2019).originalYear,/平成31.*2019/);
});
test('Osaka marks incomplete biosystems years and preserves historical exam subject names',()=>{
 const bio=papers.filter(p=>p.id.startsWith('osaka-bio-systems'));assert.equal(bio.length,16);assert.ok(!bio.some(p=>p.paperYear===2014));assert.deepEqual(bio.filter(p=>p.completeness==='partial').map(p=>p.paperYear),[2013,2015,2019]);
 for(const p of bio){assert.match(p.department,p.paperYear<=2013?/^生物工学（専門科目）$/:/^生体システム工学（専門科目）$/);if(p.completeness==='partial'){assert.match(p.title,/部分科目/);assert.equal(p.files.length,1);assert.match(p.files[0].label,p.paperYear===2019?/Ⅱ$/:/Ⅰ$/);}}
 const other=papers.flatMap(p=>p.files).filter(f=>f.kind==='other');assert.equal(other.length,1);assert.equal(other[0].pages,1);assert.match(other[0].label,/科目.*非试题.*非解答/);
});
test('Osaka keeps historical five-major common information papers, dates and both duplicate source paths',()=>{
 const info=papers.filter(p=>p.id.startsWith('osaka-information'));assert.equal(info.length,5);assert.deepEqual(info.flatMap(p=>p.examDates),manifest.informationExamDates);for(const p of info){assert.equal(p.historicalDepartments.length,5);assert.equal(p.examYear,p.paperYear-1);assert.equal(p.files[0].startPage,2);assert.equal(p.department,'情報工学（5専攻共通問題）');}
 const shared=info.find(p=>p.paperYear===2022).files[0];assert.equal(shared.sourcePaths.length,2);assert.ok(shared.sourcePaths.some(p=>p.includes('/情报数理/')));assert.ok(!papers.some(p=>p.department==='情報数理学専攻'));
 assert.equal(core.filter(papers,catalog.universities,{school:'osaka',graduate:'all',year:'2021',query:'2020-08-01'}).length,1);assert.match(manifest.excludedEnvironmentalNote,/環境工学コース/);
});
test('Osaka backfill adds the previously excluded written exams and skips essays and the oral sample',()=>{
 const math=papers.filter(p=>p.department==='数学専攻');assert.equal(math.length,38);assert.ok(math.every(p=>p.graduateSchool==='理学研究科'&&p.yearBasis==='academic'&&p.admissionYears.length===1));
 assert.equal(math.filter(p=>p.paperYear===2021).length,0);assert.equal(math.find(p=>p.id==='osaka-science-math-2011').examDates[0],'2010-08-30');assert.equal(math.find(p=>p.id==='osaka-science-math-2011').files[0].startPage,2);
 assert.equal(math.find(p=>p.id==='osaka-science-math-2023-second').selectionName,'大学院入試（第2次募集）');assert.equal(math.find(p=>p.id==='osaka-science-math-2025-november').selectionName,'大学院入試');
 const physics=papers.filter(p=>p.department==='物理学専攻・宇宙地球科学専攻');assert.equal(physics.length,28);assert.equal(physics.find(p=>p.paperYear===2025).examDates[0],'2024-08-27');assert.equal(physics.find(p=>p.paperYear===2025).examYear,2024);assert.equal(physics.find(p=>p.paperYear===2012).examDates,undefined);
 assert.deepEqual(papers.filter(p=>p.department==='数理科学（専門科目）').map(p=>p.paperYear),[2022,2023,2024,2025,2026]);assert.deepEqual(papers.filter(p=>p.department==='物性物理科学（専門科目）').map(p=>p.paperYear),[2022,2023,2024,2025,2026]);
 const ist=papers.filter(p=>p.department==='情報基礎数学専攻');assert.equal(ist.length,21);assert.deepEqual(ist.map(p=>p.paperYear),Array.from({length:21},(_,i)=>2005+i));assert.ok(ist.every(p=>p.examDates===undefined&&p.files[0].startPage===2));
 assert.equal(core.filter(papers,catalog.universities,{school:'osaka',graduate:'理学研究科',department:'数学専攻',year:'2026',query:''}).length,2);
 assert.ok(!papers.some(p=>p.department==='情報数理学専攻'||/小論文|口述/.test(p.title)));assert.ok(manifest.skippedNotExam.some(s=>s.name==='MA_koutoushimon_sample_JA.pdf'));assert.equal(manifest.skippedNotExam.filter(s=>s.name.startsWith('10_essay_env_')).length,5);
 for(const s of manifest.skippedNotExam)assert.ok(!manifest.files.some(f=>f.sha256===s.sha256));
});

