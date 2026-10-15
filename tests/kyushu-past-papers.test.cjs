const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/kyushu-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='kyushu'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
test('Kyushu keeps 16 original PDFs and 28 groups without answers',()=>{
 assert.equal(papers.length,28);assert.equal(manifest.files.length,16);assert.equal(manifest.inventoryPDFs,16);assert.equal(manifest.uniquePDFs,16);assert.equal(manifest.groups,28);assert.equal(manifest.questionPDFs,16);assert.equal(manifest.answerPDFs,0);assert.equal(manifest.newlyStoredPDFs,14);assert.equal(manifest.reusedExistingPDFs,2);assert.equal(manifest.totalPages,646);assert.equal(manifest.yearBasis,'academic');
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),646);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,16);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.kind,'question');assert.ok(f.startPage<=f.pages);assert.ok(f.sourcePaths.every(p=>p.startsWith('九州大学/')));}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.yearBasis,'academic');assert.equal(p.yearEvidence,'cover');assert.equal(p.dateEvidence,'cover');assert.deepEqual(p.admissionYears,[p.paperYear]);assert.equal(p.examYear,Number(p.examDates[0].slice(0,4)));assert.ok(!p.files.some(f=>f.kind==='answer'));for(const f of p.files){assert.ok(f.startPage<=(f.endPage||f.pages)&&f.endPage<=f.pages);assert.match(core.fileURL(f),new RegExp('#page='+f.startPage+'$'));}}
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.universityId!=='kyushu'&&p.universityId!=='tohoku'))).digest('hex'),'89c0ce98537ddc5d4cb5091e97ce8d34cbe36a5f5d702e4329a7d17644a68fba');
 const notes={...data.schoolNotes};delete notes.kyushu;delete notes.tohoku;assert.equal(crypto.createHash('sha256').update(JSON.stringify(notes)).digest('hex'),'520c255ea633ef9f0449333a4f53325296f7928b498e92e78dfe28f22cb5db61');
 const others=data.papers.filter(p=>p.universityId!=='kyushu'&&p.universityId!=='tohoku');
 assert.equal(others.length,292);assert.ok(!others.some(p=>p.universityId==='kyushu'));
 assert.match(data.schoolNotes.kyushu.text,/28组／16个PDF/);assert.match(data.schoolNotes.kyushu.text,/システム情報科学府/);assert.match(data.schoolNotes.kyushu.text,/理工学専攻/);assert.match(data.schoolNotes.kyushu.text,/上智大学/);
});
test('Kyushu system-information years come from covers and specialty pages stay inside each booklet',()=>{
 const info=['2025','2024','2023','2022','2021'].map(y=>find('kyushu-isee-info-'+y));
 const ee=['2025','2024','2023','2022','2021'].map(y=>find('kyushu-isee-ee-'+y));
 assert.deepEqual(info.map(p=>p.paperYear),[2025,2024,2023,2022,2021]);assert.deepEqual(ee.map(p=>p.paperYear),[2025,2024,2023,2022,2021]);
 assert.deepEqual(info.map(p=>p.files[0].startPage),[8,9,8,7,9]);assert.deepEqual(ee.map(p=>p.files[0].startPage),[8,9,8,7,9]);
 for(const p of [...info,...ee]){assert.equal(p.graduateSchool,'システム情報科学府');assert.equal(p.selectionName,'修士課程入学試験');assert.ok(p.subjects.includes('数学'));assert.equal(p.files[0].startPage>1,true);}
 assert.deepEqual(find('kyushu-isee-info-2021').examDates,['2020-12-05','2020-12-06']);assert.equal(find('kyushu-isee-info-2021').examYear,2020);assert.equal(find('kyushu-isee-info-2021').paperYear,2021);
 assert.deepEqual(find('kyushu-isee-ee-2021').examDates,['2020-12-05','2020-12-06']);assert.match(find('kyushu-isee-ee-2021').sourceNote,/専門Ⅰ/);assert.match(find('kyushu-isee-ee-2021').sourceNote,/専門Ⅱ/);
 assert.deepEqual(find('kyushu-isee-info-2022').examDates,['2021-08-30','2021-08-31']);assert.match(find('kyushu-isee-info-2022').sourceNote,/扫描/);
 assert.deepEqual(find('kyushu-isee-info-2023').examDates,['2022-08-29','2022-08-30']);
 assert.deepEqual(find('kyushu-isee-ee-2024').examDates,['2023-08-29','2023-08-30']);assert.match(find('kyushu-isee-ee-2024').sourceNote,/乱码/);
 assert.deepEqual(find('kyushu-isee-info-2025').examDates,['2024-09-10','2024-09-11']);
 assert.notEqual(find('kyushu-isee-info-2025').files[0].sha256,find('kyushu-isee-ee-2025').files[0].sha256);
 assert.equal(core.filter(papers,catalog.universities,{school:'kyushu',graduate:'システム情報科学府',department:'電気電子工学専攻',year:'2021',query:''}).map(p=>p.id).join(','),'kyushu-isee-ee-2021');
});
test('Kyushu rigaku booklets stay shared and only index mechanical, electrical and information groups',()=>{
 const groups=papers.filter(p=>p.graduateSchool==='理工学専攻');
 assert.equal(groups.length,18);assert.ok(groups.every(p=>p.department===undefined));assert.ok(groups.every(p=>p.selectionName==='博士前期／修士・博士後期・前後期共通'));
 assert.ok(!groups.some(p=>/化学基礎|数学基礎|物理学基礎|生物科学基礎/.test(p.subjects.join(' '))));
 const sep=find('kyushu-rikou-2025-09-mech');assert.equal(sep.paperYear,2025);assert.equal(sep.examYear,2024);assert.deepEqual(sep.examDates,['2024-09-11']);assert.equal(sep.files[0].startPage,1);assert.equal(sep.files[0].endPage,10);
 assert.equal(find('kyushu-rikou-2025-09-elec').files[0].startPage,11);assert.equal(find('kyushu-rikou-2025-09-info').files[0].startPage,43);
 assert.equal(find('kyushu-rikou-2025-02-mech').examYear,2025);assert.deepEqual(find('kyushu-rikou-2025-02-mech').examDates,['2025-02-16']);assert.match(find('kyushu-rikou-2025-02-mech').sourceNote,/第10页.*2024年度/);
 assert.equal(find('kyushu-rikou-2024-09-mech').examDates[0],'2023-09-13');assert.equal(find('kyushu-rikou-2024-02-mech').examDates[0],'2024-02-17');
 assert.equal(find('kyushu-rikou-2023-09-mech').examDates[0],'2022-09-14');assert.equal(find('kyushu-rikou-2023-02-mech').examDates[0],'2023-02-15');
 const shared=new Set(['2ea40898f2ed5fa2361449aaea347c7ca8c9031f1ab52876587d1ec3ef1bbfd2','35ce324ac815139bfff8e1cf90699f1f2edeb82fd08576a611fb7fe302195f7c']);
 const sophia=new Set(data.papers.filter(p=>p.universityId==='sophia').flatMap(p=>p.files.map(f=>f.sha256)));
 for(const sha of shared)assert.ok(sophia.has(sha));
 assert.match(find('kyushu-rikou-2025-09-info').sourceNote,/上智大学/);assert.match(find('kyushu-rikou-2024-02-info').sourceNote,/未见物理学基礎/);assert.match(find('kyushu-rikou-2025-02-info').sourceNote,/未见生物科学基礎/);
 assert.equal(core.filter(papers,catalog.universities,{school:'kyushu',graduate:'all',department:'all',year:'2025',query:'理工基礎 情報学基礎'}).length,2);
});
