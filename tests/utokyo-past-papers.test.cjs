const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/utokyo-ee-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='utokyo'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
const DEPT='電気系工学専攻';
test('UTokyo electrical papers stay on one department and keep original PDF bytes',()=>{
 assert.equal(papers.length,16);assert.equal(manifest.groups,16);assert.equal(manifest.uniquePDFs,47);assert.equal(manifest.files.length,47);assert.equal(manifest.questionPDFs,47);assert.equal(manifest.answerPDFs,0);assert.equal(manifest.duplicateByteCopies,0);assert.equal(manifest.totalPages,443);assert.equal(manifest.yearBasis,'exam');assert.equal(manifest.department,DEPT);assert.equal(manifest.graduateSchool,'工学系研究科');assert.deepEqual(manifest.yearGap,['fy2020']);assert.equal(manifest.skippedAnswers.length,4);assert.deepEqual(manifest.sharedWithExistingSchools,[]);
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),443);
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.sha256))).size,47);
 assert.equal(papers.reduce((n,p)=>n+p.files.reduce((m,f)=>m+((p.files.filter(x=>x.sha256===f.sha256).indexOf(f)===0)?f.pages:0),0),0),443);
 for(const p of papers){assert.equal(p.universityId,'utokyo');assert.equal(p.graduateSchool,'工学系研究科');assert.equal(p.department,DEPT);assert.equal(p.filterDepartments,undefined);assert.equal(p.originalMajor,undefined);assert.equal(p.yearBasis,'exam');assert.equal(p.examYear,p.paperYear);assert.equal(p.admissionYears,undefined);assert.equal(p.sourceBatch,'utokyo-ee-archive-20261107');assert.ok(core.validPaper(p,catalog.universities));assert.ok(p.files.every(f=>f.kind==='question'));assert.ok(!/unofficial-solutions|解答/.test(p.files.map(f=>f.originalName+f.label).join(' ')));}
 for(const f of manifest.files){require('./hosted-pdf.cjs').assertRecord(assert,f);assert.ok(f.sourcePaths.every(p=>p.startsWith('东京大学/工学系研究科/電気系工学専攻/')));}
 for(const skipped of manifest.skippedAnswers){assert.match(skipped.reason,/民间解答/);assert.match(skipped.sourcePath,/unofficial-solutions/);assert.equal(papers.some(p=>p.files.some(f=>f.sha256===skipped.sha256)),false);}
 assert.match(data.schoolNotes.utokyo.text,/16组／47个唯一PDF、443页/);assert.match(data.schoolNotes.utokyo.text,/電気系工学専攻/);assert.match(data.schoolNotes.utokyo.text,/fy2020/);assert.match(data.schoolNotes.utokyo.text,/不入库/);assert.match(data.schoolNotes.utokyo.text,/用户确认/);
 assert.equal(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'all',query:''}).length,16);
 assert.equal(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'all',department:'電気工学・電子工学専攻',year:'all',query:''}).length,0);
 assert.equal(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'all',department:'all',year:'2020',query:''}).length,0);
});
test('UTokyo 2007 uses the printed August date, and later years use the open_inshi fiscal year',()=>{
 const early=find('utokyo-ee-2007-08-28');
 assert.equal(early.paperYear,2007);assert.equal(early.yearEvidence,'cover');assert.deepEqual(early.examDates,['2007-08-28']);assert.deepEqual(early.subjects,['数学','物理']);
 assert.deepEqual(early.files.map(f=>f.label),['数学（日文）','数学（英文）','物理（英文）']);
 assert.match(early.sourceNote,/平成19年8月28日|平成１９年８月２８日|8月28日/);assert.match(early.sourceNote,/2007年9月/);assert.match(early.sourceNote,/電気工学・電子工学専攻/);assert.match(early.sourceNote,/日文物理/);
 assert.equal(early.title.includes('電気工学・電子工学専攻'),false);assert.equal(early.selectionName.includes('電気工学'),false);
 const years=[2012,2013,2014,2015,2016,2017,2018,2019,2021,2022,2023,2024];
 assert.deepEqual(papers.map(p=>p.paperYear),[2007,2008,2011,...years,2025]);
 for(const year of years){const p=find('utokyo-ee-fy'+year);assert.equal(p.yearEvidence,'source-directory');assert.equal(p.originalYear,'fy'+year);assert.equal(p.examDates,undefined);assert.equal(p.selectionName,'過去問サンプル');assert.match(p.sourceNote,/实施的会计年度|实施会计年度/);assert.match(p.sourceNote,/電気系工学専攻/);}
 assert.equal(find('utokyo-ee-fy2012').files.length,1);assert.match(find('utokyo-ee-fy2012').files[0].label,/第1–10問/);
 assert.match(find('utokyo-ee-fy2016').files[0].label,/問題1–4・A–F/);assert.equal(find('utokyo-ee-fy2019').files[0].pages,34);
 const y2021=find('utokyo-ee-fy2021');assert.equal(y2021.files.length,7);assert.equal(y2021.files.at(-1).label,'参考和訳（英文を正規とする）');assert.match(y2021.sourceNote,/不是解答/);assert.ok(y2021.files.slice(0,6).every((f,i)=>f.label===`Problem ${i+1}（英文）`));
 const y2022=find('utokyo-ee-fy2022'),y2023=find('utokyo-ee-fy2023');
 assert.equal(y2022.files.length,12);assert.equal(y2023.files.length,12);
 assert.deepEqual(y2022.files.map(f=>f.label),Array.from({length:6},(_,i)=>[`問題${i+1}（日文）`,`Problem ${i+1}（英文）`]).flat());
 assert.equal(y2022.files[0].sha256===y2022.files[1].sha256,false);
 const y2024=find('utokyo-ee-fy2024');assert.equal(y2024.files.length,2);assert.equal(y2024.files[0].sha256,y2024.files[1].sha256);assert.equal(y2024.files[0].startPage,1);assert.equal(y2024.files[0].endPage,14);assert.equal(y2024.files[1].startPage,15);assert.equal(y2024.files[1].endPage,28);assert.equal(y2024.files[0].pages,28);
 assert.equal(find('utokyo-ee-fy2020'),undefined);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'2007',query:'数学'}).map(p=>p.id),['utokyo-ee-2007-08-28']);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'2024',query:''}).map(p=>p.id),['utokyo-ee-fy2024']);
 const y2008=find('utokyo-ee-2008');
 assert.equal(y2008.yearEvidence,'cover');assert.deepEqual(y2008.examDates,['2008-09-01','2008-09-02']);assert.deepEqual(y2008.subjects,['物理・情報','数学']);
 assert.deepEqual(y2008.files.map(f=>f.label),['物理・情報（日文）','数学（日文）']);assert.equal(y2008.files[0].pages,18);assert.equal(y2008.files[1].pages,8);
 assert.match(y2008.sourceNote,/平成２０年９月１日|平成20年9月1日/);assert.match(y2008.sourceNote,/平成２０年９月２日|平成20年9月2日/);
 const y2011=find('utokyo-ee-2011');
 assert.equal(y2011.paperYear,2011);assert.equal(y2011.yearEvidence,'user-confirmed');assert.equal(y2011.examDates,undefined);assert.deepEqual(y2011.subjects,['数学']);assert.equal(y2011.files.length,1);assert.equal(y2011.files[0].pages,9);
 assert.match(y2011.sourceNote,/用户确认/);assert.match(y2011.sourceNote,/卷面未印/);assert.match(y2011.sourceNote,/平成24年度/);assert.match(y2011.sourceNote,/不并入/);
 assert.equal(find('utokyo-ee-fy2012').files.some(f=>f.sha256===y2011.files[0].sha256),false);
 const y2025=find('utokyo-ee-2025');
 assert.equal(y2025.paperYear,2025);assert.equal(y2025.yearEvidence,'user-confirmed');assert.equal(y2025.examDates,undefined);assert.equal(y2025.subjects,undefined);
 assert.equal(y2025.files.length,2);assert.equal(y2025.files[0].sha256,y2025.files[1].sha256);assert.equal(y2025.files[0].pages,25);
 assert.equal(y2025.files[0].startPage,1);assert.equal(y2025.files[0].endPage,12);assert.equal(y2025.files[1].startPage,13);assert.equal(y2025.files[1].endPage,25);
 assert.match(y2025.sourceNote,/用户确认/);assert.match(y2025.sourceNote,/不猜测实施日/);assert.match(y2025.sourceNote,/不编 examDates/);assert.match(y2025.sourceNote,/不能收成单独的数学或物理/);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'2008',query:''}).map(p=>p.id),['utokyo-ee-2008']);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'2011',query:'数学'}).map(p=>p.id),['utokyo-ee-2011']);
 assert.deepEqual(core.filter(papers,catalog.universities,{school:'utokyo',graduate:'工学系研究科',department:DEPT,year:'2025',query:''}).map(p=>p.id),['utokyo-ee-2025']);
});
