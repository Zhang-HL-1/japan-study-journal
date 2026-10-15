const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/tohoku-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='tohoku'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
test('Tohoku stores 86 original PDFs, keeps undated booklets out of the year catalog, and does not rewrite other schools',()=>{
 assert.equal(papers.length,67);assert.equal(manifest.files.length,86);assert.equal(manifest.sourceFiles,87);assert.equal(manifest.uniquePDFs,86);assert.equal(manifest.duplicateByteCopies,1);assert.equal(manifest.groups,67);assert.equal(manifest.catalogPDFs,82);assert.equal(manifest.questionPDFs,78);assert.equal(manifest.answerPDFs,2);assert.equal(manifest.otherPDFs,2);assert.equal(manifest.undatedPDFs,4);assert.equal(manifest.totalPages,664);assert.equal(manifest.yearBasis,'mixed');assert.deepEqual(manifest.sharedWithExistingSchools,[]);
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,82);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.ok(f.sourcePaths.every(p=>p.startsWith('东北大学/')));}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.ok(['academic','exam'].includes(p.yearBasis));assert.equal(p.yearEvidence,'cover');for(const f of p.files){assert.equal(f.startPage,1);assert.ok(f.startPage<=f.pages);}}
 const supplements=data.schoolNotes.tohoku.supplements;assert.deepEqual(supplements.map(s=>s.originalName),['2024秋季大学院入試_応物.pdf','R3.pdf','R4.pdf','R5.pdf']);
 assert.ok(supplements.every(s=>!papers.some(p=>p.files.some(f=>f.sha256===s.sha256))));
 assert.match(data.schoolNotes.tohoku.text,/67组／82个有封面年度/);assert.match(data.schoolNotes.tohoku.text,/yearBasis为mixed/);assert.match(data.schoolNotes.tohoku.text,/按云盘文件夹归类，封面无研究科／专攻名/);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.universityId!=='tohoku'&&p.universityId!=='keio'))).digest('hex'),'e091da32f67ce7d82f192f33dff2dc7197ba0c0ebf8357e984e893b83b39ff56');
 const notes={...data.schoolNotes};delete notes.tohoku;delete notes.keio;assert.equal(crypto.createHash('sha256').update(JSON.stringify(notes)).digest('hex'),'664b12618226d8d1c8a96af2b8e30267928acb46b119cf640b0db47ef749a890');
});
test('Tohoku uses cover years, including filename conflicts, and leaves admission years unset unless printed',()=>{
 const app=papers.filter(p=>p.department==='応用物理学専攻'&&p.yearBasis==='exam');assert.deepEqual(app.map(p=>p.paperYear),[2014,2015,2016,2017,2018,2019,2020]);
 for(const p of app){assert.equal(p.examYear,p.paperYear);assert.equal(p.admissionYears,undefined);assert.equal(p.files.length,1);assert.equal(p.files[0].kind,'question');}
 const intention=find('tohoku-appphys-intention-2025');assert.equal(intention.paperYear,2025);assert.equal(intention.yearBasis,'academic');assert.equal(intention.examDates,undefined);assert.equal(intention.admissionYears,undefined);assert.equal(intention.files[0].kind,'other');assert.match(intention.files[0].originalName,/R6/);assert.match(intention.sourceNote,/文件名含R6/);
 const feb=find('tohoku-quantum-2023-04-entry');assert.equal(feb.paperYear,2023);assert.equal(feb.yearBasis,'academic');assert.deepEqual(feb.admissionYears,[2023]);assert.deepEqual(feb.examDates,['2023-02-28']);assert.equal(feb.originalYear,'令和5年4月入学');assert.ok(feb.files.every(f=>/r04Feb_/.test(f.originalName)));
 const spring24=find('tohoku-quantum-2023-spring');assert.equal(spring24.paperYear,2023);assert.equal(spring24.examYear,2024);assert.deepEqual(spring24.examDates,['2024-02-28']);assert.equal(spring24.admissionYears,undefined);
 const mar=find('tohoku-quantum-2024-spring');assert.equal(mar.paperYear,2024);assert.equal(mar.examYear,2025);assert.deepEqual(mar.examDates,['2025-03-04']);assert.ok(mar.files.every(f=>/2025Mar_/.test(f.originalName)));
 const mar26=find('tohoku-quantum-2025-spring');assert.equal(mar26.paperYear,2025);assert.equal(mar26.examYear,2026);assert.deepEqual(mar26.examDates,['2026-03-03']);assert.ok(mar26.files.every(f=>/2026Mar_/.test(f.originalName)));
 const h30=find('tohoku-quantum-2018-autumn');assert.equal(h30.files[0].pages,31);assert.deepEqual(h30.admissionYears,[2019]);assert.deepEqual(h30.subjects,['数学A']);
 const r04=find('tohoku-quantum-2022-autumn');assert.equal(r04.paperYear,2022);assert.deepEqual(r04.admissionYears,[2023]);assert.ok(r04.subjects.includes('原子炉物理学'));assert.ok(!r04.subjects.includes('専門科目'));
 assert.ok(find('tohoku-quantum-2024-autumn').subjects.includes('専門科目'));assert.deepEqual(find('tohoku-quantum-2025-autumn').examDates,['2025-08-26','2025-08-27']);
 assert.equal(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'all',department:'all',year:'all',query:'2023-02-28'}).length,1);
});
test('Tohoku keeps whole mechanical booklets, marks the scope sheet, and records the electrical cover difference',()=>{
 const mech=papers.filter(p=>p.department==='機械系4専攻');assert.deepEqual(mech.map(p=>p.paperYear),[2023,2024,2025]);
 for(const p of mech){assert.equal(p.files.length,1);assert.equal(p.files[0].pages,19);assert.equal(p.files[0].kind,'question');assert.deepEqual(p.subjects,['数学A']);assert.equal(p.admissionYears,undefined);assert.match(p.sourceNote,/不按页拆分/);assert.match(p.sourceNote,/四个专攻/);}
 const scope=find('tohoku-mech-scope-2026');assert.equal(scope.department,'機械系');assert.equal(scope.paperYear,2026);assert.equal(scope.examYear,2026);assert.equal(scope.examDates,undefined);assert.equal(scope.files[0].kind,'other');assert.equal(scope.files[0].pages,1);assert.match(scope.files[0].label,/出題範囲.*非试题.*非解答/);
 const early=find('tohoku-ee-2023-08'),late=find('tohoku-ee-2024-08');
 assert.deepEqual(early.files.map(f=>f.label),['基礎科目','専門科目']);assert.deepEqual(early.examDates,['2023-08-29','2023-08-30']);assert.match(early.selectionName,/情報科学研究科情報・生命系群/);assert.equal(early.graduateSchool,'工学研究科');
 assert.deepEqual(late.files.map(f=>f.label),['基礎専門科目']);assert.deepEqual(late.examDates,['2024-08-27']);assert.match(late.selectionName,/未列情報科学研究科/);assert.match(late.selectionName,/医工学研究科/);
 assert.equal(papers.filter(p=>p.graduateSchool==='情報科学研究科').length,0);assert.equal(papers.filter(p=>p.department==='医工学研究科').length,0);
});
test('Tohoku information-science math sheets stay folder-classified, with commentary typed and 2025 not invented',()=>{
 const math=papers.filter(p=>p.graduateSchool==='情報科学（数学）');assert.equal(math.length,39);
 for(const p of math){assert.equal(p.department,'情報科学（数学）');assert.match(p.selectionName,/按云盘文件夹归类（封面无研究科／专攻名）/);assert.match(p.sourceNote,/按云盘文件夹归类，封面无研究科／专攻名/);assert.equal(p.examDates,undefined);}
 const aug=find('tohoku-info-math-2024-08');assert.equal(aug.yearBasis,'exam');assert.equal(aug.paperYear,2024);assert.deepEqual(aug.files.map(f=>f.kind),['question','answer']);assert.match(aug.files[1].label,/出題意図・解答例/);
 const comments=find('tohoku-info-math-2025-comments');assert.equal(comments.yearBasis,'academic');assert.equal(comments.paperYear,2025);assert.deepEqual(comments.files.map(f=>f.kind),['answer']);assert.deepEqual(comments.files[0].sourcePaths,['东北大学/情报科学/数学/2508comments (1).pdf','东北大学/情报科学/数学/2508comments.pdf']);
 assert.equal(find('tohoku-info-math-2025-08'),undefined);assert.match(find('tohoku-info-math-2004-09').sourceNote,/文本层乱码/);
 assert.equal(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'情報科学（数学）',department:'all',year:'2025',query:''}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'工学研究科',department:'量子エネルギー工学専攻',year:'2025',query:'春季'}).map(p=>p.id).join(),'tohoku-quantum-2025-spring');
});
