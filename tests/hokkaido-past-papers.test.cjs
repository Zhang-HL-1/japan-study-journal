const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/hokkaido-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='hokkaido'),root=path.join(__dirname,'..');
const prior=papers.filter(p=>!p.id.startsWith('hokkaido-env-')&&!p.id.startsWith('hokkaido-nat-')&&!p.id.startsWith('hokkaido-sci-cmp-'));
const added=papers.filter(p=>!prior.includes(p));
const find=id=>papers.find(p=>p.id===id);
const quantum='量子理学専攻・宇宙理学専攻',condensed='物性物理学専攻・宇宙理学専攻';
test('Hokkaido keeps the original 16 groups and adds 40 cover-dated PDFs',()=>{
 assert.equal(papers.length,43);assert.equal(prior.length,16);assert.equal(added.length,27);assert.equal(manifest.files.length,69);assert.equal(manifest.sourceFiles,70);assert.equal(manifest.uniquePDFs,69);assert.equal(manifest.duplicateByteCopies,1);assert.equal(manifest.groups,43);assert.equal(manifest.questionPDFs,65);assert.equal(manifest.intentionPDFs,4);assert.equal(manifest.totalPages,669);assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),669);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.sha256))).size,69);
 assert.equal(manifest.backfill.addedGroups,27);assert.equal(manifest.backfill.addedUniquePDFs,40);assert.equal(manifest.backfill.addedPages,428);assert.equal(manifest.backfill.envPages,57);assert.equal(manifest.backfill.physicsPages,239);assert.equal(manifest.backfill.naturalHistoryPages,132);assert.equal(manifest.backfill.heldYearUncertain,22);assert.equal(manifest.backfill.priorGroups,16);assert.equal(manifest.backfill.priorPages,241);assert.deepEqual(manifest.excludedFolders,[]);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(prior)).digest('hex'),'f0b87e44467e3ed7a4fab0558bf1cba7a9d6718b5f3b5f8c4e2a1cc8a17664c6');
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.path,`assets/past-papers/documents/${f.sha256}.pdf`);}
 for(const h of manifest.heldYearUncertain){assert.equal(h.reason,'无封面，年度仅据文件名，本轮不入库');assert.ok(!fs.existsSync(path.join(root,'assets/past-papers/documents/'+h.sha256+'.pdf')));assert.ok(!papers.some(p=>p.files.some(f=>f.sha256===h.sha256||f.originalName===h.originalName||f.sourcePaths.some(s=>s.endsWith('/'+h.originalName)))));}
 assert.equal(manifest.heldYearUncertain.length,22);assert.ok(manifest.heldYearUncertain.some(h=>h.originalName==='grad_H21_1.pdf'));assert.ok(manifest.heldYearUncertain.some(h=>h.originalName==='p2002-1.pdf'));assert.ok(manifest.heldYearUncertain.some(h=>h.originalName==='p2006-4.pdf'));
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.yearBasis,'academic');for(const f of p.files){assert.ok(f.startPage<=f.pages);assert.notEqual(f.kind,'answer');assert.match(core.fileURL(f),new RegExp('#page='+f.startPage+'$'));}}
 for(const p of prior){assert.equal(p.paperYear,p.examYear+1);for(const f of p.files)if(f.kind==='other'){assert.equal(f.pages,1);assert.equal(p.paperYear,2026);assert.match(f.label,/出题意图.*非解答/);}}
 for(const p of added){assert.equal(p.yearEvidence,'cover');assert.ok(!/grad_H21|p200[2-6]/.test(JSON.stringify(p.files)));}
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&p.universityId!=='hokkaido'&&p.universityId!=='osaka'&&p.universityId!=='uec'&&p.universityId!=='nagoya'&&p.universityId!=='kyushu'&&p.universityId!=='tohoku'&&p.universityId!=='keio'&&!p.id.startsWith('tus-bf-')))).digest('hex'),'c7d0da3800c8a514544875c197dbb5bba91bdaf3ec13778235b0feaf0c34c4d9');
 assert.match(data.schoolNotes.hokkaido.text,/43组／69个唯一PDF、669页/);assert.match(data.schoolNotes.hokkaido.text,/16组／29个PDF、241页/);assert.match(data.schoolNotes.hokkaido.text,/新增27组、40个唯一PDF、428页/);assert.match(data.schoolNotes.hokkaido.text,/量子理学専攻・宇宙理学専攻/);assert.match(data.schoolNotes.hokkaido.text,/不入库/);assert.doesNotMatch(data.schoolNotes.hokkaido.text,/按既定范围排除/);
 assert.match(fs.readFileSync(path.join(root,'past-papers.html'),'utf8'),/past-papers-data\.js\?v=20261018-tus-backfill/);
});
test('Hokkaido separates academic years from actual dates without inventing dates on undated CSIT covers',()=>{
 for(const p of prior){if(p.graduateSchool==='工学院'){assert.deepEqual(p.examDates,[p.paperYear===2025?'2024-08-20':'2025-08-19']);if(!p.id.includes('mechanical'))assert.deepEqual(p.admissionYears,[p.paperYear-1,p.paperYear]);}else if(p.id.includes('-csit-')){assert.equal(p.examDates,undefined);assert.match(p.sourceNote,/未印具体考试日期/);}else assert.deepEqual(p.examDates,[p.paperYear===2025?'2024-08-27':'2025-08-25']);}
 assert.equal(core.filter(papers,catalog.universities,{school:'hokkaido',graduate:'all',year:'2026',query:'2025-08-25'}).length,4);
 assert.deepEqual([...new Set(prior.map(p=>p.paperYear))],[2025,2026]);
});
test('Hokkaido pairs five information courses and fixes misplaced systems originals with exact first-question pages',()=>{
 const info=papers.filter(p=>p.graduateSchool==='情報科学院');assert.equal(info.length,10);assert.equal(new Set(info.map(p=>p.department)).size,5);
 for(const p of info){assert.match(p.department,/^情報科学専攻／.+コース$/);assert.deepEqual(p.files.map(f=>f.label),['専門科目1','専門科目2']);const code=p.id.split('-')[1],exam=p.examYear;assert.deepEqual(p.files.map(f=>f.originalName),[`${code}01_${exam}.pdf`,`${code}02_${exam}.pdf`]);const start=code==='mn'||code==='seitai'&&exam===2024||code==='sys'&&exam===2025?2:3;assert.deepEqual(p.files.map(f=>f.startPage),[start,start]);}
 const misplaced=info.find(p=>p.id==='hokkaido-sys-2025');assert.ok(misplaced.files.every(f=>f.sourcePaths[0].includes('/媒体网络/')));assert.match(misplaced.sourceNote,/据封面归类|按卷面归类/);
});
test('Hokkaido shared engineering groups preserve original subject changes and correction pages',()=>{
 const eng=papers.filter(p=>p.graduateSchool==='工学院'&&!p.id.startsWith('hokkaido-env-'));assert.equal(eng.length,6);assert.equal(manifest.engineeringSharedMajors.length,4);
 for(const p of eng.filter(p=>p.department.includes('研究室群'))){assert.match(p.sourceNote,/跨专攻/);assert.equal(p.files[0].startPage,2);}
 const q25=eng.find(p=>p.id==='hokkaido-applied-quantum-2025'),q26=eng.find(p=>p.id==='hokkaido-applied-quantum-2026');assert.ok(q25.subjects.includes('材料科学'));assert.ok(q26.subjects.includes('材料科学・物理化学'));assert.ok(q26.subjects.includes('電磁気学・電気回路'));
 const m=eng.find(p=>p.id==='hokkaido-mechanical-aerospace-2026');assert.equal(m.files[0].pages,19);assert.match(m.sourceNote,/第15页.*問題訂正/);assert.equal(manifest.correction.noticePage,15);
});
test('Hokkaido backfill follows cover departments, omits undated days, and keeps the duplicate path',()=>{
 const env=added.filter(p=>p.id.startsWith('hokkaido-env-'));assert.equal(env.length,2);assert.ok(env.every(p=>p.examDates===undefined&&p.examYear===p.paperYear-1&&p.admissionYears.join()===`${p.paperYear-1},${p.paperYear}`));assert.match(env[0].sourceNote,/専門1/);assert.equal(find('hokkaido-env-2026').files[1].kind,'other');assert.match(find('hokkaido-env-2026').files[1].label,/出题意图.*非解答/);assert.equal(find('hokkaido-env-2026').files[1].pages,1);
 const early=find('hokkaido-sci-cmp-2006-feb');assert.equal(early.department,quantum);assert.equal(early.paperYear,2006);assert.equal(early.examYear,undefined);assert.equal(early.examDates,undefined);assert.match(early.sourceNote,/2月7日/);assert.match(early.sourceNote,/未印实施年/);
 const second=find('hokkaido-sci-cmp-2007-feb');assert.equal(second.examYear,2007);assert.deepEqual(second.examDates,['2007-02-06']);assert.match(second.selectionName,/第二次募集/);assert.equal(second.department,quantum);
 assert.match(find('hokkaido-sci-cmp-2008-feb').selectionName,/2次募集/);assert.deepEqual(find('hokkaido-sci-cmp-2008-feb').examDates,['2008-02-05']);
 assert.ok(added.filter(p=>p.id.startsWith('hokkaido-sci-cmp-')&&p.paperYear<=2010).every(p=>p.department===quantum));
 assert.ok(added.filter(p=>p.id.startsWith('hokkaido-sci-cmp-')&&p.paperYear>=2011).every(p=>p.department===condensed));
 assert.equal(find('hokkaido-sci-cmp-2009'),undefined);assert.equal(find('hokkaido-sci-cmp-2025'),undefined);
 const packed=find('hokkaido-sci-cmp-2010');assert.equal(packed.files.length,1);assert.match(packed.sourceNote,/午後封面在第2页/);assert.deepEqual(packed.examDates,['2009-08-19']);assert.equal(packed.examYear,2009);
 const morning=find('hokkaido-sci-cmp-2021');assert.equal(morning.completeness,'partial');assert.equal(morning.files.length,1);assert.equal(morning.files[0].originalName,'masterR3_am.pdf');assert.match(morning.sourceNote,/没有午後/);assert.match(morning.title,/午前のみ/);
 const dup=find('hokkaido-sci-cmp-2020');assert.deepEqual(dup.files[1].sourcePaths,['北海道大学/理学院/物性物理学 宇宙理学/masterR2_1st_specialty2.pdf','北海道大学/理学院/物性物理学 宇宙理学/masterR2_1st_specialty2 (1).pdf']);assert.equal(manifest.files.filter(f=>f.sha256===dup.files[1].sha256).length,1);
 const nat=find('hokkaido-nat-2025');assert.equal(nat.files[0].originalName,'2024_01_sci.pdf');assert.equal(nat.files[0].startPage,1);assert.equal(nat.files[0].pages,36);assert.match(nat.sourceNote,/第1页.*訂正/);assert.match(nat.sourceNote,/第2页/);assert.deepEqual(nat.examDates,['2024-08-08']);assert.deepEqual(nat.admissionYears,[2024,2025]);
 assert.match(find('hokkaido-nat-2024').sourceNote,/化学不出题/);assert.match(find('hokkaido-nat-2024-feb').sourceNote,/物理学和化学不出题/);assert.deepEqual(find('hokkaido-nat-2024-feb').admissionYears,[2024]);assert.equal(find('hokkaido-nat-2024-feb').examYear,2024);
 assert.ok(!find('hokkaido-nat-2026').subjects.includes('化学'));assert.equal(find('hokkaido-nat-2026').subjects.length,4);assert.equal(find('hokkaido-nat-2024').subjects.length,5);
 assert.match(find('hokkaido-sci-cmp-2024').sourceNote,/令和7年度/);
 assert.equal(core.filter(papers,catalog.universities,{school:'hokkaido',graduate:'理学院',department:quantum,year:'2007',query:''}).length,2);
 assert.equal(core.filter(papers,catalog.universities,{school:'hokkaido',graduate:'理学院',department:condensed,year:'2011',query:''}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'hokkaido',graduate:'工学院',department:find('hokkaido-env-2025').department,year:'2025',query:''}).length,1);
 assert.equal(papers.filter(p=>p.yearEvidence==='source-filename').length,0);
});
