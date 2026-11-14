const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/hokkaido-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const batch='hokkaido-joele-archive-20261114';
const added=data.papers.filter(p=>p.sourceBatch===batch);
const find=id=>added.find(p=>p.id===id);
const dept='情報科学専攻／情報エレクトロニクスコース';
const oldMajor='情報科学研究科 情報エレクトロニクス専攻';
test('Hokkaido information electronics archive adds six academic groups and leaves 2024–2025 in place',()=>{
 const arch=manifest.joeleArchive;
 assert.equal(arch.sourceBatch,batch);assert.equal(arch.inventoryPDFs,15);assert.equal(arch.newGroups,6);assert.equal(arch.newUniquePDFs,11);assert.equal(arch.newPages,82);assert.equal(arch.reusedPDFs,4);assert.deepEqual(arch.blocked,[]);
 assert.equal(added.length,6);assert.equal(added.reduce((n,p)=>n+p.files.reduce((m,f)=>m+f.pages,0),0),82);assert.equal(new Set(added.flatMap(p=>p.files.map(f=>f.sha256))).size,11);
 assert.deepEqual(added.map(p=>p.id),['hokkaido-joele-2005','hokkaido-joele-2012','hokkaido-joele-2016','hokkaido-joele-2019','hokkaido-joele-2023','hokkaido-joele-2024']);
 const ids=data.papers.filter(p=>p.id.startsWith('hokkaido-joele-')).map(p=>p.id).sort();
 assert.deepEqual(ids,['hokkaido-joele-2005','hokkaido-joele-2012','hokkaido-joele-2016','hokkaido-joele-2019','hokkaido-joele-2023','hokkaido-joele-2024','hokkaido-joele-2025','hokkaido-joele-2026']);
 for(const p of added){
  assert.equal(p.universityId,'hokkaido');assert.equal(p.graduateSchool,'情報科学院');assert.equal(p.department,dept);assert.equal(p.yearBasis,'academic');assert.equal(p.yearEvidence,'cover-exam-date');assert.equal(p.paperYear,p.examYear+1);assert.deepEqual(p.admissionYears,[p.paperYear]);assert.equal(p.originalYear,undefined);assert.ok(core.validPaper(p,catalog.universities));assert.ok(p.files.every(f=>f.kind==='question'));assert.doesNotMatch(p.selectionName,/夏季筆答|修士課程/);
  for(const f of p.files){require('./hosted-pdf.cjs').assertRecord(assert,f,'url');assert.ok(f.startPage<=f.pages);assert.match(core.fileURL(f),new RegExp('#page='+f.startPage+'$'));}
 }
 assert.equal(find('hokkaido-joele-2005').originalMajor,oldMajor);assert.deepEqual(find('hokkaido-joele-2005').examDates,['2004-08-23','2004-08-24']);assert.deepEqual(find('hokkaido-joele-2005').files.map(f=>f.startPage),[2,2]);assert.deepEqual(find('hokkaido-joele-2005').files.map(f=>f.label),['応用数学・情報科学・物理学','応用数学Ⅱ・物理学Ⅱ・電気電子工学']);
 assert.equal(find('hokkaido-joele-2012').originalMajor,oldMajor);assert.deepEqual(find('hokkaido-joele-2012').examDates,['2011-08-18']);assert.deepEqual(find('hokkaido-joele-2012').files.map(f=>[f.label,f.startPage]),[['専門科目1',2],['専門科目2',2]]);
 const partial=find('hokkaido-joele-2016');assert.equal(partial.completeness,'partial');assert.equal(partial.originalMajor,oldMajor);assert.equal(partial.files.length,1);assert.equal(partial.files[0].label,'専門科目2');assert.match(partial.title,/専門科目2のみ/);assert.match(partial.sourceNote,/専門科目1未取得/);assert.deepEqual(partial.examDates,['2015-08-20']);
 const nov=find('hokkaido-joele-2019');assert.equal(nov.examYear,2018);assert.deepEqual(nov.examDates,['2018-11-10']);assert.equal(nov.selectionName,'情報エレクトロニクスコース入学試験');assert.equal(nov.originalMajor,'情報エレクトロニクスコース（封面未印情報科学専攻）');assert.doesNotMatch(nov.selectionName,/夏季/);assert.match(nov.sourceNote,/11月10日/);assert.match(nov.sourceNote,/未印的「平成31年度」/);assert.deepEqual(nov.files.map(f=>f.startPage),[3,3]);
 assert.equal(find('hokkaido-joele-2023').originalMajor,undefined);assert.deepEqual(find('hokkaido-joele-2023').examDates,['2022-08-18']);assert.deepEqual(find('hokkaido-joele-2023').files.map(f=>f.startPage),[2,2]);
 assert.equal(find('hokkaido-joele-2024').originalMajor,undefined);assert.deepEqual(find('hokkaido-joele-2024').examDates,['2023-08-24']);assert.deepEqual(find('hokkaido-joele-2024').files.map(f=>f.startPage),[3,3]);assert.match(find('hokkaido-joele-2024').sourceNote,/横向A4/);
 const kept25=data.papers.find(p=>p.id==='hokkaido-joele-2025'),kept26=data.papers.find(p=>p.id==='hokkaido-joele-2026');
 assert.equal(kept25.sourceBatch,undefined);assert.equal(kept26.sourceBatch,undefined);assert.equal(kept25.paperYear,2025);assert.equal(kept26.paperYear,2026);assert.equal(kept25.selectionName,'修士課程入学試験（夏季筆答）');
 assert.deepEqual(arch.reused.map(f=>f.sha256),kept25.files.concat(kept26.files).map(f=>f.sha256));
 for(const y of arch.missingExamYearsNotInvented)assert.equal(data.papers.some(p=>p.sourceBatch===batch&&p.examYear===y),false);
 assert.match(data.schoolNotes.hokkaido.text,/49组／80个唯一PDF、751页/);assert.match(data.schoolNotes.hokkaido.text,/新增6组、11个唯一PDF、82页/);assert.match(data.schoolNotes.hokkaido.text,/未做逐题拆分/);assert.match(data.schoolNotes.hokkaido.text,/43组／69个唯一PDF、669页/);
});
