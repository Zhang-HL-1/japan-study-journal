const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/uec-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='uec'),root=path.join(__dirname,'..');
const dates={2020:'2020-08-18',2021:'2021-08-17',2022:'2022-08-17',2023:'2023-08-17',2024:'2024-08-16'};
test('UEC keeps 38 original question PDFs in 20 major-session groups and leaves other schools unchanged',()=>{
 assert.equal(papers.length,20);assert.equal(manifest.files.length,38);assert.equal(manifest.sourceFiles,38);assert.equal(manifest.uniquePDFs,38);assert.equal(manifest.duplicateByteCopies,0);assert.equal(manifest.questionPDFs,38);assert.equal(manifest.answerPDFs,0);assert.equal(manifest.excluded.length,0);assert.equal(manifest.totalPages,413);assert.equal(manifest.yearBasis,'exam');
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,38);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.kind,'question');assert.equal(f.blankPage,2);assert.equal(f.startPage,3);}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.graduateSchool,'情報理工学研究科');assert.equal(p.selectionName,'博士前期課程一般入試');assert.equal(p.yearBasis,'exam');assert.equal(p.yearEvidence,'cover');assert.equal(p.dateEvidence,'cover');assert.equal(p.paperYear,p.examYear);assert.equal(p.admissionYears,undefined);assert.deepEqual(p.examDates,[dates[p.paperYear]]);assert.equal(p.originalYear,`${p.paperYear}年8月${p.paperYear===2020?18:p.paperYear===2024?16:17}日実施`);for(const f of p.files){assert.equal(f.kind,'question');assert.equal(f.startPage,3);assert.ok(f.startPage<=f.pages);}}
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.universityId!=='uec'))).digest('hex'),'3db40a3d840eccc9a380f3da9c2bf589570f03f7d2497f17239c8a52ce4bb47a');
 const notes={...data.schoolNotes};delete notes.uec;assert.equal(crypto.createHash('sha256').update(JSON.stringify(notes)).digest('hex'),'717ad21bc87bd05cc7fa43d341f2a0ba9a602af6ed75076895484bb0a4151039');
 assert.match(data.schoolNotes.uec.text,/20组／38个问题PDF/);
});
test('UEC assigns departments from covers, including the swapped 24.8 folders',()=>{
 assert.deepEqual([...new Set(papers.map(p=>p.department))],['情報学専攻','情報・ネットワーク工学専攻','機械知能システム学専攻','基盤理工学専攻']);
 const info=papers.filter(p=>p.department==='情報学専攻'),net=papers.filter(p=>p.department==='情報・ネットワーク工学専攻'),mech=papers.filter(p=>p.department==='機械知能システム学専攻'),fund=papers.filter(p=>p.department==='基盤理工学専攻');
 assert.equal(info.length,5);assert.equal(net.length,5);assert.equal(mech.length,5);assert.equal(fund.length,5);
 for(const p of info){assert.deepEqual(p.files.map(f=>f.label),['必須問題','選択問題']);assert.ok(p.subjects.includes('計算機工学'));assert.ok(p.subjects.includes('離散数学'));}
 for(const p of net){assert.deepEqual(p.files.map(f=>f.label),['必須問題','選択問題']);assert.ok(p.subjects.includes('離散数学とオートマトン'));assert.ok(p.subjects.includes('数値計算'));}
 for(const p of fund){assert.deepEqual(p.files.map(f=>f.label),['専門科目']);assert.equal(p.files.length,1);assert.ok(p.subjects.includes('量子力学／統計力学'));assert.ok(p.subjects.includes('分子生物学／生物化学'));assert.match(p.sourceNote,/没有必修分册/);}
 for(const p of mech.filter(p=>p.paperYear<=2021))assert.deepEqual(p.files.map(f=>f.label),['必須問題','選択問題']);
 for(const p of mech.filter(p=>p.paperYear>=2022))assert.deepEqual(p.files.map(f=>f.label),['必須問題（数学）','必須問題（物理学）','選択問題']);
 const swappedJ=info.find(p=>p.paperYear===2024),swappedI=net.find(p=>p.paperYear===2024);
 assert.ok(swappedJ.files.every(f=>f.sourcePaths[0].includes('/24.8/情报网络工学/')));assert.match(swappedJ.sourceNote,/按封面归入情報学専攻/);
 assert.ok(swappedI.files.every(f=>f.sourcePaths[0].includes('/24.8/情报学/')));assert.match(swappedI.sourceNote,/按封面归入情報・ネットワーク工学専攻/);
 assert.equal(manifest.folderSwap2024.swapped.length,4);
 const phys=mech.find(p=>p.paperYear===2024).files.find(f=>f.label==='必須問題（物理学）');assert.equal(phys.pages,6);assert.equal(phys.originalName,'kako_6_m_mandatory_buturi202408.pdf');assert.match(mech.find(p=>p.paperYear===2024).sourceNote,/第6页为誤／正/);
 assert.match(mech.find(p=>p.paperYear===2022).sourceNote,/赤字は出題ミスを修正/);
 assert.equal(core.filter(papers,catalog.universities,{school:'uec',graduate:'情報理工学研究科',department:'基盤理工学専攻',year:'2020',query:'2020-08-18'}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'uec',graduate:'all',department:'all',year:'all',query:'电通大 情報学'}).length,5);
});
