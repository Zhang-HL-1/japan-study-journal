const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/waseda-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='waseda'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
const prior=papers.filter(p=>!p.id.startsWith('waseda-math-app-')&&!p.id.startsWith('waseda-phys-app-'));
test('Waseda backfill stores six original PDFs and leaves the first 35 groups unchanged',()=>{
 assert.equal(papers.length,41);assert.equal(prior.length,35);assert.equal(manifest.files.length,47);assert.equal(manifest.uniquePDFs,47);assert.equal(manifest.groups,41);assert.equal(manifest.totalPages,584);assert.equal(manifest.yearBasis,'academic');assert.equal(manifest.excluded.length,2);
 assert.equal(manifest.backfill.addedGroups,6);assert.equal(manifest.backfill.addedUniquePDFs,6);assert.equal(manifest.backfill.addedPages,100);assert.equal(manifest.backfill.mathPages,54);assert.equal(manifest.backfill.physicsPages,46);assert.equal(manifest.backfill.priorGroups,35);assert.equal(manifest.backfill.priorUniquePDFs,41);assert.equal(manifest.backfill.priorPages,484);assert.equal(manifest.backfill.skippedNotExam,2);
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),584);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.sha256))).size,47);assert.equal(new Set(papers.map(p=>p.id)).size,41);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(prior)).digest('hex'),'b30cc064bcffd216c4bea1ec55e082e3b07d6fc47865f1fa6ac3d055b2d45adc');
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.path,`assets/past-papers/documents/${f.sha256}.pdf`);assert.ok(f.sourcePath.startsWith('早稻田大学/'));}
 for(const e of manifest.excluded){assert.match(e.reason,/口述試験说明、非笔试/);assert.ok(!fs.existsSync(path.join(root,'assets/past-papers/documents/'+e.sha256+'.pdf')));assert.ok(e.sourcePath.endsWith('_ippan_kou.pdf'));}
 assert.ok(!manifest.excluded.some(e=>/senmon\.pdf$/.test(e.sourcePath)));assert.ok(!manifest.excluded.some(e=>/数学／应用数学或物理学/.test(e.reason)));
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.yearBasis,'academic');assert.equal(p.examYear,undefined);assert.deepEqual(p.admissionYears,[p.paperYear,p.paperYear+1]);assert.equal(p.originalYear,`${p.paperYear}年9月・${p.paperYear+1}年4月入学試験`);assert.equal(p.selectionName,'修士課程・一般入試');for(const f of p.files)assert.ok(f.startPage<=f.pages);}
 assert.match(data.schoolNotes.waseda.text,/41组／47个唯一PDF、584页/);assert.match(data.schoolNotes.waseda.text,/35组／41个唯一PDF、484页/);assert.match(data.schoolNotes.waseda.text,/新增6组、6个唯一PDF、100页/);assert.match(data.schoolNotes.waseda.text,/yearBasis为academic/);assert.match(data.schoolNotes.waseda.text,/右上角戳记不是paperYear/);assert.match(data.schoolNotes.waseda.text,/不建入口、不入库/);
 assert.match(fs.readFileSync(path.join(root,'past-papers.html'),'utf8'),/past-papers-data\.js\?v=20261018-tus-backfill/);
});
test('Waseda backfill adds math and physics departments without mixing them into existing majors',()=>{
 const math=papers.filter(p=>p.department==='数学応用数理専攻'),phys=papers.filter(p=>p.department==='物理学及応用物理学専攻');
 assert.equal(math.length,3);assert.equal(phys.length,3);assert.deepEqual(math.map(p=>p.paperYear),[2025,2024,2023]);assert.deepEqual(phys.map(p=>p.paperYear),[2025,2024,2023]);
 for(const p of math){assert.equal(p.graduateSchool,'基幹理工学研究科');assert.equal(p.files.length,1);assert.equal(p.files[0].kind,'question');assert.equal(p.files[0].label,'専門科目');assert.equal(p.files[0].startPage,1);assert.equal(p.files[0].pages,18);assert.equal(p.admissionYears[0],p.paperYear);assert.equal(p.admissionYears[1],p.paperYear+1);}
 for(const p of phys){assert.equal(p.graduateSchool,'先進理工学研究科');assert.equal(p.admissionYears[0],p.paperYear);assert.equal(p.admissionYears[1],p.paperYear+1);}
 assert.equal(find('waseda-phys-app-2023').files.length,1);assert.equal(find('waseda-phys-app-2023').files[0].startPage,1);assert.equal(find('waseda-phys-app-2023').files[0].pages,15);
 assert.equal(find('waseda-phys-app-2025').files.length,1);assert.equal(find('waseda-phys-app-2025').files[0].startPage,1);assert.equal(find('waseda-phys-app-2025').files[0].pages,15);assert.deepEqual(find('waseda-phys-app-2025').admissionYears,[2025,2026]);assert.equal(find('waseda-phys-app-2025').paperYear,2025);
 const corrected=find('waseda-phys-app-2024');assert.equal(corrected.paperYear,2024);assert.deepEqual(corrected.admissionYears,[2024,2025]);assert.equal(corrected.files.length,2);assert.equal(corrected.files[0].kind,'question');assert.equal(corrected.files[0].startPage,2);assert.equal(corrected.files[1].kind,'other');assert.equal(corrected.files[1].startPage,1);assert.equal(corrected.files[0].sha256,corrected.files[1].sha256);assert.equal(corrected.files[0].pages,16);assert.match(corrected.sourceNote,/含学校订正通知/);assert.match(corrected.files[0].label,/訂正ページ付き/);
 assert.notEqual(math[0].department,'情報理工・情報通信専攻');assert.notEqual(phys[0].department,'電気・情報生命専攻');assert.notEqual(phys[0].department,'共同原子力専攻');assert.ok(!papers.some(p=>p.department==='数学応用数理専攻'&&p.graduateSchool!=='基幹理工学研究科'));assert.ok(!papers.some(p=>p.department==='物理学及応用物理学専攻'&&p.graduateSchool!=='先進理工学研究科'));
 assert.equal(prior.filter(p=>p.department==='電子物理システム学専攻').length,11);assert.equal(prior.filter(p=>p.department==='経営デザイン専攻').length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'waseda',graduate:'基幹理工学研究科',department:'数学応用数理専攻',year:'2025',query:'数学応用数理'}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'waseda',graduate:'先進理工学研究科',department:'物理学及応用物理学専攻',year:'2024',query:''}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'waseda',graduate:'all',department:'数学応用数理専攻',year:'all',query:''}).length,3);
 assert.equal(core.filter(papers,catalog.universities,{school:'waseda',graduate:'all',department:'物理学及応用物理学専攻',year:'all',query:''}).length,3);
 assert.equal(core.filter(papers,catalog.universities,{school:'waseda',graduate:'基幹理工学研究科',department:'物理学及応用物理学専攻',year:'all',query:''}).length,0);
 assert.equal(find('waseda-math-app-2025').files[0].originalName,'51_M_sugaku_2025_September2026_April_ippan_senmon.pdf');assert.equal(find('waseda-phys-app-2025').files[0].sourcePaths[0],'早稻田大学/先进理工/物理学及应用物理/53_M_butsuri_2025_September2026_April_ippan_senmon.pdf');
});
