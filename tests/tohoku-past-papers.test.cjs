const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/tohoku-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='tohoku'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
test('Tohoku stores 117 original PDFs, keeps undated booklets out of the year catalog, and does not rewrite other schools',()=>{
 assert.equal(papers.length,84);assert.equal(manifest.files.length,117);assert.equal(manifest.sourceFiles,118);assert.equal(manifest.uniquePDFs,117);assert.equal(manifest.duplicateByteCopies,1);assert.equal(manifest.groups,84);assert.equal(manifest.catalogPDFs,113);assert.equal(manifest.questionPDFs,105);assert.equal(manifest.answerPDFs,2);assert.equal(manifest.otherPDFs,6);assert.equal(manifest.undatedPDFs,4);assert.equal(manifest.totalPages,871);assert.equal(manifest.yearBasis,'mixed');assert.deepEqual(manifest.sharedWithExistingSchools,[]);
 assert.equal(manifest.backfill.addedGroups,17);assert.equal(manifest.backfill.addedUniquePDFs,31);assert.equal(manifest.backfill.addedPages,207);assert.equal(manifest.backfill.skippedNonExam,1);
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),871);
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,113);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.ok(f.sourcePaths.every(p=>p.startsWith('东北大学/')));}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.ok(['academic','exam'].includes(p.yearBasis));assert.equal(p.yearEvidence,'cover');for(const f of p.files){assert.equal(f.startPage,1);assert.ok(f.startPage<=f.pages);}}
 const supplements=data.schoolNotes.tohoku.supplements;assert.deepEqual(supplements.map(s=>s.originalName),['2024秋季大学院入試_応物.pdf','R3.pdf','R4.pdf','R5.pdf']);
 assert.ok(supplements.every(s=>!papers.some(p=>p.files.some(f=>f.sha256===s.sha256))));
 assert.match(data.schoolNotes.tohoku.text,/84组／113个有封面年度/);assert.match(data.schoolNotes.tohoku.text,/yearBasis为mixed/);assert.match(data.schoolNotes.tohoku.text,/按云盘文件夹归类，封面无研究科／专攻名/);assert.match(data.schoolNotes.tohoku.text,/不建真题入口/);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&p.universityId!=='tohoku'&&p.universityId!=='keio'))).digest('hex'),'0e54e9c5cfd1de6336549dd6efa1ee7d2086325820ffaa208129fd0f8231c863');
 const notes={...data.schoolNotes};delete notes.tohoku;delete notes.keio;assert.equal(crypto.createHash('sha256').update(JSON.stringify(notes)).digest('hex'),'5a577bcab0ed011f95ccfcfd9301af3bf5299cc2a161fffbac62946a11eb9ae3');
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
test('Tohoku backfill adds science math, physics and civil from covers and skips the admissions guide',()=>{
 const math=papers.filter(p=>p.department==='数学専攻');assert.equal(math.length,5);assert.deepEqual(math.map(p=>p.paperYear),[2022,2023,2024,2025,2026]);
 for(const p of math){assert.equal(p.graduateSchool,'理学研究科');assert.equal(p.yearBasis,'academic');assert.equal(p.admissionYears,undefined);assert.equal(p.examDates.length,1);assert.ok(p.files.filter(f=>f.kind==='question').length>=3);}
 const y2026=find('tohoku-sci-math-2026');assert.equal(y2026.paperYear,2026);assert.equal(y2026.examYear,2025);assert.deepEqual(y2026.examDates,['2025-08-21']);assert.deepEqual(y2026.files.map(f=>f.kind),['question','question','question','other']);assert.match(y2026.files[3].label,/出題意図・講評/);assert.match(y2026.files[2].originalName,/English/);assert.match(y2026.sourceNote,/不写admissionYears/);
 assert.equal(find('tohoku-sci-math-2022').paperYear,2022);assert.deepEqual(find('tohoku-sci-math-2022').examDates,['2021-08-19']);assert.equal(find('tohoku-sci-math-2025').files.at(-1).kind,'other');
 const phys=papers.filter(p=>p.department==='物理学専攻');assert.equal(phys.length,6);assert.deepEqual(phys.map(p=>p.paperYear),[2021,2022,2023,2024,2025,2026]);
 const r3=find('tohoku-sci-phys-2021');assert.equal(r3.examYear,2020);assert.deepEqual(r3.examDates,['2020-08-24','2020-08-25']);assert.equal(r3.admissionYears,undefined);assert.ok(r3.files.every(f=>/exa-r3/.test(f.originalName)));assert.deepEqual(r3.subjects.slice(0,5),['基礎数学','力学','電磁気学','量子力学','熱・統計力学']);
 const r8=find('tohoku-sci-phys-2026');assert.equal(r8.paperYear,2026);assert.equal(r8.examYear,2025);assert.deepEqual(r8.examDates,['2025-08-19']);assert.equal(r8.files[1].kind,'other');assert.match(r8.files[1].originalName,/exa_obj-r8/);assert.match(r8.sourceNote,/2025年8月19日|２０２５年８月１９日/);
 assert.equal(find('tohoku-sci-phys-2025').files[1].kind,'other');assert.match(find('tohoku-sci-phys-2025').sourceNote,/著作权/);
 const civil=papers.filter(p=>p.department==='土木');assert.equal(civil.length,6);assert.deepEqual(civil.map(p=>p.id),['tohoku-civil-2023-autumn','tohoku-civil-2024-spring','tohoku-civil-2024-autumn','tohoku-civil-2025-spring','tohoku-civil-2025-autumn','tohoku-civil-2026-spring']);
 for(const p of civil){assert.equal(p.graduateSchool,'工学研究科');assert.equal(p.yearBasis,'exam');assert.equal(p.examYear,p.paperYear);assert.equal(p.examDates,undefined);assert.equal(p.admissionYears,undefined);assert.equal(p.files[0].kind,'question');assert.match(p.sourceNote,/不写成土木工学専攻/);}
 assert.equal(find('tohoku-civil-2024-spring').originalYear,'2024春');assert.equal(find('tohoku-civil-2024-autumn').originalYear,'2024秋');assert.equal(find('tohoku-civil-2024-spring').paperYear,find('tohoku-civil-2024-autumn').paperYear);
 assert.equal(papers.some(p=>/募集要項|东北 理学 募集/.test(p.title+p.files.map(f=>f.originalName).join())),false);
 assert.equal(manifest.excluded.length,1);assert.match(manifest.excluded[0].reason,/不是试题/);assert.equal(manifest.files.some(f=>f.sha256==='9001b476802e9885d0076d4de044a66f595c5d601e0a47b672c67847480c1171'),false);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'理学研究科',department:'数学専攻',year:'2026',query:''}).map(p=>p.id),['tohoku-sci-math-2026']);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'理学研究科',department:'物理学専攻',year:'2021',query:''}).map(p=>p.id),['tohoku-sci-phys-2021']);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'all',department:'土木',year:'2024',query:''}).map(p=>p.id).sort(),['tohoku-civil-2024-autumn','tohoku-civil-2024-spring']);
 assert.equal(core.filter(papers,catalog.universities,{school:'tohoku',graduate:'all',department:'all',year:'all',query:'募集要項'}).length,0);
});
