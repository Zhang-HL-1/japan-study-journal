const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const data=require('../past-papers-data.js'),manifest=require('../assets/past-papers/keio-import-manifest.json'),core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js');
const papers=data.papers.filter(p=>p.universityId==='keio'),root=path.join(__dirname,'..');
const find=id=>papers.find(p=>p.id===id);
const boundaryIds=['keio-h-system-integration-2021','keio-h-system-integration-2022','keio-h-system-integration-2023','keio-h-system-integration-2024','keio-g-multidisciplinary-2021','keio-g-multidisciplinary-2022','keio-g-multidisciplinary-2023','keio-g-multidisciplinary-2024','keio-i-system-design-2025'];
test('Keio stores 32 original question PDFs and leaves other schools unchanged',()=>{
 assert.equal(papers.length,32);assert.equal(manifest.files.length,32);assert.equal(manifest.inventoryPDFs,47);assert.equal(manifest.sourceFiles,32);assert.equal(manifest.uniquePDFs,32);assert.equal(manifest.duplicateByteCopies,0);assert.equal(manifest.groups,32);assert.equal(manifest.questionPDFs,32);assert.equal(manifest.answerPDFs,0);assert.equal(manifest.totalPages,181);assert.equal(manifest.yearBasis,'exam');assert.equal(manifest.boundaryGroups,9);assert.deepEqual(manifest.sharedWithExistingSchools,[]);
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),181);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,32);assert.equal(new Set(papers.map(p=>p.id)).size,32);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(root,f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.kind,'question');assert.equal(f.path,`assets/past-papers/documents/${f.sha256}.pdf`);assert.ok(f.sourcePaths.every(p=>p.startsWith('庆应义塾大学/')));assert.ok(f.startPage<=f.pages);}
 for(const p of papers){assert.ok(core.validPaper(p,catalog.universities));assert.equal(p.graduateSchool,'理工学研究科');assert.equal(p.selectionName,'前期博士課程 入学試験問題');assert.equal(p.yearBasis,'exam');assert.equal(p.yearEvidence,'cover');assert.equal(p.paperYear,p.examYear);assert.equal(p.admissionYears,undefined);assert.equal(p.examDates,undefined);assert.equal(p.originalYear,undefined);assert.equal(p.dateEvidence,undefined);assert.equal(p.files.length,1);assert.equal(p.files[0].kind,'question');assert.equal(p.files[0].label,'入学試験問題');assert.ok(p.files[0].startPage<=p.files[0].pages);assert.match(p.sourceNote,/只有考试月/);assert.match(p.sourceNote,/无解答/);assert.match(core.fileURL(p.files[0]),new RegExp('#page='+p.files[0].startPage+'$'));}
 assert.match(data.schoolNotes.keio.text,/32组／32个唯一PDF、181页/);assert.match(data.schoolNotes.keio.text,/yearBasis 为 exam/);assert.match(data.schoolNotes.keio.text,/边界／待确认/);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&p.universityId!=='keio'))).digest('hex'),'55f9292b81cbf66ca175d397eef47b0df92767d7a787956a2837f08add449f70');
 const notes={...data.schoolNotes};delete notes.keio;assert.equal(crypto.createHash('sha256').update(JSON.stringify(notes)).digest('hex'),'88760d4004779d59d688ce3b006407364659d8449bc4144fc7b46b53aa0aa559');
 assert.match(fs.readFileSync(path.join(root,'past-papers.html'),'utf8'),/past-papers-data\.js\?v=20261018-science-tokyo-supplement/);
});
test('Keio years come from the August cover month and 2025 letters stay separate',()=>{
 assert.deepEqual([...new Set(papers.map(p=>p.paperYear))],[2021,2022,2023,2024,2025]);
 for(const p of papers)assert.equal(p.examYear,p.paperYear);
 const counts={};for(const p of papers)counts[p.department]=(counts[p.department]||0)+1;
 assert.deepEqual(counts,{
  'J マテリアルデザイン科学':4,'M 応用力学・計算力学':4,'N 情報工学':4,'D 物理情報':4,'I 電気電子工学':4,
  'C 物理情報工学':1,'G 機械工学':1,'H 電気情報工学':1,
  'H システム統合工学':4,'G マルチディシプリナリ・デザイン科学':4,'I システムデザイン工学':1
 });
 assert.equal(find('keio-g-mechanical-2024'),undefined);assert.equal(find('keio-g-mechanical-2021'),undefined);
 assert.equal(find('keio-c-physical-info-2025').department,'C 物理情報工学');assert.equal(find('keio-d-physical-info-2024').department,'D 物理情報');
 assert.notEqual(find('keio-h-electrical-info-2025').department,find('keio-i-electrical-2024').department);
 assert.notEqual(find('keio-h-electrical-info-2025').department,find('keio-h-system-integration-2024').department);
 assert.notEqual(find('keio-g-mechanical-2025').department,find('keio-g-multidisciplinary-2024').department);
 assert.notEqual(find('keio-i-system-design-2025').department,find('keio-i-electrical-2024').department);
 assert.match(find('keio-g-mechanical-2025').sourceNote,/不补/);assert.match(find('keio-c-physical-info-2025').sourceNote,/不合并/);
 assert.equal(core.filter(papers,catalog.universities,{school:'keio',graduate:'理工学研究科',department:'J マテリアルデザイン科学',year:'2021',query:'マテリアルデザイン科学'}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'keio',graduate:'all',department:'all',year:'all',query:'庆应 機械工学'}).length,1);
});
test('Keio keeps both page counts for 2021 scans and opens later booklets where the cover says',()=>{
 const mismatched={
  'keio-h-system-integration-2021':[4,8],'keio-j-material-2021':[4,8],'keio-g-multidisciplinary-2021':[1,2],
  'keio-n-information-2021':[3,6],'keio-d-physical-info-2021':[2,4],'keio-m-applied-mechanics-2021':[5,9],'keio-i-electrical-2021':[3,5]
 };
 for(const [id,[pages,claim]] of Object.entries(mismatched)){
  const p=find(id),f=manifest.files.find(x=>x.groupId===id);
  assert.equal(p.files[0].pages,pages);assert.equal(p.files[0].startPage,1);assert.equal(f.pagesCoverClaim,claim);assert.match(p.sourceNote,new RegExp(`${claim}ページ`));assert.match(p.sourceNote,/实际PDF为/);
 }
 for(const p of papers){if(!mismatched[p.id]){assert.equal(p.files[0].startPage,2);assert.equal(manifest.files.find(f=>f.groupId===p.id).pagesCoverClaim,p.files[0].pages);}}
 const material=find('keio-j-material-2021');assert.match(material.sourceNote,/化学系分野/);assert.match(material.sourceNote,/物理情報工学系分野/);assert.match(material.sourceNote,/不拆不删/);assert.equal(material.files.length,1);
 for(const year of [2022,2023,2024]){const p=find('keio-j-material-'+year);assert.match(p.sourceNote,/化学系分野/);assert.match(p.sourceNote,/各组2问/);assert.equal(p.files.length,1);}
 assert.match(find('keio-g-multidisciplinary-2021').sourceNote,/機械工学/);assert.match(find('keio-g-multidisciplinary-2021').sourceNote,/デザイン科学/);
 assert.match(find('keio-g-multidisciplinary-2022').sourceNote,/ﾏﾙﾁﾃﾞｨｼﾌﾟﾘﾅﾘ･ﾃﾞｻﾞｲﾝ科学/);assert.equal(find('keio-g-multidisciplinary-2022').department,'G マルチディシプリナリ・デザイン科学');
 assert.match(find('keio-c-physical-info-2025').sourceNote,/未写「2ページから」/);assert.match(find('keio-d-physical-info-2022').sourceNote,/未写「2ページから」/);
 assert.equal(papers.filter(p=>p.sourceNote.includes('边界／待确认')).map(p=>p.id).sort().join(),boundaryIds.slice().sort().join());
 assert.equal(manifest.excluded.reduce((n,e)=>n+e.count,0),15);assert.equal(manifest.ambiguities.length,11);
});

