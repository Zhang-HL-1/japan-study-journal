const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js'),production=require('../past-papers-data.js');
const all={school:'all',graduate:'all',year:'all',query:''};
// Synthetic metadata tests only; these are not past questions and never enter the production catalog.
const sample=(changes={})=>({id:'test-paper-1',universityId:'utokyo',title:'Test metadata',graduateSchool:'工学系研究科',department:'テスト専攻',selectionName:'テスト選抜',examYear:2025,subjects:['電気回路'],files:[{label:'問題',kind:'question',url:'assets/past-papers/test-only.pdf'}],...changes});
test('production publishes twelve university archives and all question sets enter whole-paper practice',()=>{assert.equal(production.version,2);assert.equal(production.papers.length,845);for(const p of production.papers){assert.ok(['waseda','tus','science-tokyo','sophia','kobe','hokkaido','uec','nagoya','osaka','kyushu','tohoku','keio'].includes(p.universityId));assert.ok(core.validPaper(p,catalog.universities));}assert.equal(new Set(production.papers.flatMap(p=>p.files.map(f=>f.url))).size,1162);assert.equal(require('../questions.js').filter(q=>q.type==='paper').length,production.papers.filter(p=>p.files.some(f=>f.kind==='question')).length);assert.equal(catalog.universities.length,23);});
test('Sophia shares original combined PDFs with correct exam dates and question/answer offsets',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/sophia-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='sophia');
 assert.equal(papers.length,6);assert.equal(manifest.files.length,4);assert.equal(manifest.sourceFiles,4);assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,4);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);if(f.kind==='answer'){assert.equal(f.officialByteMatch,true);assert.match(f.officialURL,/^https:\/\/adm\.sophia\.ac\.jp\//);}}
 for(const p of papers){assert.equal(p.paperYear,2025);assert.equal(p.yearBasis,'academic');assert.deepEqual(p.admissionYears,[2025]);assert.equal(p.department,'理工学専攻');assert.equal(p.examYear,Number(p.examDates[0].slice(0,4)));assert.equal(p.files[1].answerProvenance,'official-published');for(const f of p.files){assert.ok(f.startPage<=f.endPage&&f.endPage<=f.pages);assert.match(core.fileURL(f),new RegExp('#page='+f.startPage+'$'));}}
 for(const [key,date,questionStarts,answerStarts] of [['september','2024-09-11',[1,11,43],[1,11,34]],['february','2025-02-16',[1,11,38],[1,11,29]]]){
  ['mechanical','electrical','information'].forEach((subject,i)=>{const p=papers.find(p=>p.id===`sophia-scitec-2025-${key}-${subject}`);assert.deepEqual(p.examDates,[date]);assert.equal(p.files[0].startPage,questionStarts[i]);assert.equal(p.files[1].startPage,answerStarts[i]);});
 }
 assert.match(papers.find(p=>p.id==='sophia-scitec-2025-february-mechanical').sourceNote,/第10页.*2024年度.*冲突/);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'sophia',year:'2025',query:'电气电子'}).length,2);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'sophia',query:'2024-09-11'}).length,3);
 assert.match(production.schoolNotes.sophia.text,/共享4个完整原合册/);
 // Protect all previously published records against changes during the next school import.
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(production.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&['waseda','tus','science-tokyo'].includes(p.universityId)&&!p.id.startsWith('tus-bf-')))).digest('hex'),'aa12b7cd8d71563d6b841d3f6fa056b20df69a5d854f1f6858887addfc13977c');
});
test('past-paper metadata requires known universities, valid years and actual document entries',()=>{
 assert.equal(core.validPaper(sample(),catalog.universities),true);
 for(const changes of [{id:''},{universityId:'unknown'},{title:''},{graduateSchool:''},{selectionName:''},{examYear:'2025'},{examYear:0},{files:[]},{files:[{label:'問題',kind:'question',url:'javascript:alert(1)'}]},{subjects:'電気回路'},{examDates:'2025-01-07'},{examDates:['2025']}])assert.equal(core.validPaper(sample(changes),catalog.universities),false);
 // Historical graduate-school names are allowed; existing campus labels must not rewrite an old paper.
 assert.equal(core.validPaper(sample({graduateSchool:'旧研究科名'}),catalog.universities),true);
});
test('Kobe preserves originals, partial mechanical coverage and three distinct system-information periods',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/kobe-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='kobe');
 assert.equal(papers.length,34);assert.equal(manifest.sourceFiles,78);assert.equal(manifest.files.length,77);assert.equal(manifest.uniquePDFs,77);assert.equal(manifest.groups,34);assert.equal(manifest.totalPages,270);assert.equal(manifest.duplicateByteCopies,0);assert.equal(manifest.excluded.length,1);assert.equal(manifest.excludedFolders.length,0);
 assert.equal(manifest.backfill.addedGroups,22);assert.equal(manifest.backfill.addedUniquePDFs,32);assert.equal(manifest.backfill.addedPages,159);assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),270);
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,77);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of papers){assert.equal(p.yearBasis,'academic');assert.deepEqual(p.admissionYears,[p.paperYear]);for(const f of p.files){assert.equal(f.kind,'question');assert.ok(f.startPage<=f.pages);}}
 const mechanical=papers.filter(p=>p.department==='機械工学専攻');assert.deepEqual(mechanical.map(p=>p.paperYear),[2019,2020,2021,2023,2024,2025]);
 for(const p of mechanical){assert.equal(p.completeness,'partial');assert.match(p.title,/部分科目/);assert.equal(p.files.length,2);assert.deepEqual(p.files.map(f=>f.startPage),[2,1]);assert.equal(p.examYear,undefined);assert.equal(p.examDates,undefined);}
 assert.match(mechanical[0].originalYear,/平成31.*2019/);
 const electrical=papers.filter(p=>p.department==='電気電子工学専攻');assert.deepEqual(electrical.map(p=>p.paperYear),[2024,2025,2026]);
 for(const p of electrical){assert.equal(p.files.length,9);assert.equal(p.files[0].startPage,2);assert.equal(p.examYear,undefined);}
 assert.ok(electrical[0].subjects.includes('電力工学'));assert.ok(electrical[0].subjects.includes('自動制御'));assert.ok(!electrical[1].subjects.includes('電力工学'));assert.ok(electrical[2].subjects.includes('電子情報（データサイエンス）'));
 const systems=papers.filter(p=>p.graduateSchool==='システム情報学研究科');assert.equal(systems.length,3);assert.deepEqual(systems.flatMap(p=>p.examDates),['2024-08-22','2024-11-27','2025-01-22']);
 for(const p of systems){assert.equal(p.paperYear,2025);assert.equal(p.department,'システム情報学専攻');assert.equal(p.examYear,Number(p.examDates[0].slice(0,4)));assert.deepEqual(p.files.map(f=>f.startPage),[2,2]);}
 assert.deepEqual(systems.map(p=>p.files[1].originalName),['2025_expert.pdf','2025_2_expert.pdf','2025_3_expert.pdf']);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'kobe',year:'2025',query:'2024-11-27'}).length,1);
 assert.match(manifest.excluded[0].reason,/学部.*修士ではない/);assert.ok(!fs.existsSync(path.join(__dirname,'..','assets/past-papers/documents/'+manifest.excluded[0].sha256+'.pdf')));
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(production.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&['waseda','tus','science-tokyo','sophia'].includes(p.universityId)&&!p.id.startsWith('tus-bf-')))).digest('hex'),'f77bd2804d3876fc1517100c7e61fea5abf4fb13847e08e6491673d1a3483d93');
 const prior=papers.filter(p=>!p.id.startsWith('kobe-sci-'));assert.equal(prior.length,12);assert.equal(crypto.createHash('sha256').update(JSON.stringify(prior)).digest('hex'),'0581d1451d0d4cd8873076c36668a73f594adbb8e3ed7b49dbd3436ca653f2ee');
});
test('Kobe backfill adds science math and physics as separate departments',()=>{
 const core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js'),production=require('../past-papers-data.js');
 const papers=production.papers.filter(p=>p.universityId==='kobe'),math=papers.filter(p=>p.department==='数学専攻'),phys=papers.filter(p=>p.department==='物理学専攻');
 assert.equal(math.length,12);assert.equal(phys.length,10);assert.ok(math.every(p=>p.graduateSchool==='理学研究科'&&p.yearBasis==='academic'&&p.yearEvidence==='cover'));assert.ok(phys.every(p=>p.graduateSchool==='理学研究科'&&p.yearEvidence==='entry-year-inference'));
 assert.deepEqual(math.map(p=>p.paperYear),[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026]);assert.deepEqual(phys.map(p=>p.paperYear),[2017,2018,2019,2020,2021,2022,2023,2024,2025,2026]);
 assert.equal(math.find(p=>p.paperYear===2015).examDates[0],'2014-08-25');assert.equal(math.find(p=>p.paperYear===2026).examDates[0],'2025-08-21');assert.equal(math.find(p=>p.paperYear===2015).files[0].startPage,1);assert.equal(math.find(p=>p.paperYear===2015).files[0].pages,7);
 assert.equal(phys.find(p=>p.paperYear===2017).examDates[0],'2016-08-23');assert.equal(phys.find(p=>p.paperYear===2017).examYear,2016);assert.equal(phys.find(p=>p.paperYear===2026).examDates[0],'2025-08-19');assert.deepEqual(phys.find(p=>p.paperYear===2017).files.map(f=>f.label),['物理 I','物理 II']);assert.ok(phys.every(p=>p.files.every(f=>f.startPage===1)));
 assert.ok(!papers.some(p=>p.department==='数学専攻'&&p.graduateSchool!=='理学研究科'));assert.ok(!papers.some(p=>['電気電子工学専攻','機械工学専攻','システム情報学専攻'].includes(p.department)&&p.graduateSchool==='理学研究科'));
 assert.match(production.schoolNotes.kobe.text,/34组／77个唯一PDF、270页/);assert.match(production.schoolNotes.kobe.text,/新增22组、32个唯一PDF、159页/);assert.doesNotMatch(production.schoolNotes.kobe.text,/纯数学／纯物理专属目录不录入/);
 assert.equal(core.filter(papers,catalog.universities,{school:'kobe',graduate:'理学研究科',department:'数学専攻',year:'2015',query:''}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'kobe',graduate:'理学研究科',department:'物理学専攻',year:'2017',query:''}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{school:'kobe',graduate:'工学研究科',department:'数学専攻',year:'all',query:''}).length,0);
});
test('Science Tokyo preserves bytes and separates complete years, fragments and unverified photos',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/science-tokyo-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='science-tokyo'&&!p.sourceBatch);
 assert.equal(papers.length,33);assert.equal(manifest.files.length,50);assert.equal(manifest.questionPDFs,48);
 assert.deepEqual(papers.filter(p=>p.completeness==='complete').map(p=>p.examYear),[...Array.from({length:19},(_,i)=>2001+i),2021,2022,2023,2024,2025]);
 assert.deepEqual(papers.filter(p=>p.completeness==='partial').map(p=>p.examYear),[1990,1993,1994,1995,1996,1997,1998,1999,2000]);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.repositoryPath));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.bytes);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.ok(f.source_url.startsWith('https://'));}
 for(const p of papers){assert.equal(p.paperYear,p.examYear);assert.equal(p.yearBasis,'exam');assert.deepEqual(p.admissionYears,[p.examYear+1]);for(const f of p.files)assert.ok(f.startPage<=f.pages);}
 for(const [year,start] of [[1990,1],[1993,6],[1994,13],[1995,18],[1996,22],[1997,29],[1998,34]])assert.equal(papers.find(p=>p.examYear===year).files[0].startPage,start);
 assert.equal(new Set(papers.filter(p=>p.examYear<=1998).map(p=>p.files[0].url)).size,1);
 assert.ok(!papers.some(p=>[1991,1992,2020,2026].includes(p.examYear)));
 assert.match(papers.find(p=>p.examYear===2009).sourceNote,/平成20年8月18日/);
 assert.equal(papers.find(p=>p.examYear===2009).yearEvidence,'entry-year-inference');
 assert.ok(papers.find(p=>p.examYear===2025).files.some(f=>f.kind==='other'&&/非解答/.test(f.label)));
 const supplement=production.schoolNotes['science-tokyo'].supplements[0];assert.match(supplement.label,/待核验/);assert.ok(core.fileURL(supplement));assert.ok(!papers.some(p=>p.files.some(f=>f.url===supplement.url)));
 assert.match(production.schoolNotes['science-tokyo'].text,/2020.*未举行普通笔试/);
});
test('Science Tokyo supplement publishes the remaining 29 groups and keeps the 2020 math paper in 2020',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/science-tokyo-supplement-manifest.json');
 const hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
 const all=production.papers.filter(p=>p.universityId==='science-tokyo'),batch=all.filter(p=>p.sourceBatch==='science-tokyo-drive-20261018'),original=all.filter(p=>!p.sourceBatch);
 const added=['science-tokyo-drive-cs-academic-2020','science-tokyo-drive-cv-academic-2024','science-tokyo-drive-cv-academic-2026','science-tokyo-drive-ict-academic-2020','science-tokyo-drive-ict-academic-2024','science-tokyo-drive-is-academic-2022','science-tokyo-drive-is-academic-2023','science-tokyo-drive-is-academic-2024','science-tokyo-drive-is-academic-2025','science-tokyo-drive-is-academic-2026','science-tokyo-drive-mat-academic-2026','science-tokyo-drive-math-academic-2006','science-tokyo-drive-math-academic-2011','science-tokyo-drive-math-academic-2012','science-tokyo-drive-math-academic-2015','science-tokyo-drive-math-academic-2018','science-tokyo-drive-math-academic-2021','science-tokyo-drive-math-academic-2022','science-tokyo-drive-math-academic-2024','science-tokyo-drive-math-academic-2025','science-tokyo-drive-phys-academic-2020','science-tokyo-drive-phys-academic-2022','science-tokyo-drive-phys-academic-2024','science-tokyo-drive-sc-academic-2022','science-tokyo-drive-sc-academic-2023','science-tokyo-drive-sc-academic-2024','science-tokyo-drive-sc-academic-2025','science-tokyo-drive-sc-academic-2026','science-tokyo-drive-tse-academic-2026'];
 assert.equal(all.length,105);assert.equal(original.length,33);assert.equal(batch.length,72);assert.equal(added.length,29);assert.equal(new Set(all.map(p=>p.id)).size,105);
 assert.equal(manifest.publicationStatus,'complete');assert.equal(manifest.addedGroups,72);assert.equal(manifest.publishedGroups,72);assert.equal(manifest.pendingGroups,0);assert.equal(manifest.addedPDFs,82);assert.equal(manifest.publishedPDFs,82);
 assert.equal(hash(original),'8c46eec3fda9b11b64108df52c1b2a571fe3ec866ae4e56da7bc741ca5015685');
 assert.equal(hash(batch.filter(p=>p.id!=='science-tokyo-drive-math-academic-2020'&&!added.includes(p.id))),'15bf23e988dfd93b687e690f341c54e42e96b2163bb58a65a2349579a433757d');
 assert.equal(new Set(batch.flatMap(p=>p.files.map(f=>f.sha256))).size,82);
 for(const p of batch){assert.equal(p.universityId,'science-tokyo');assert.equal(p.yearBasis,'academic');assert.deepEqual(p.admissionYears,[p.paperYear]);assert.equal(p.sourceBatch,'science-tokyo-drive-20261018');for(const f of p.files){const b=fs.readFileSync(path.join(__dirname,'..',f.url));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);assert.equal(f.startPage,1);}}
 const math=batch.find(p=>p.id==='science-tokyo-drive-math-academic-2020');
 assert.equal(hash({...math,files:[math.files[0]]}),'c906054bd27866f981e063ef1b23e909bf36d9aeb07c0852c50b3ed99f36f647');
 assert.equal(math.paperYear,2020);assert.deepEqual(math.files.map(f=>f.originalName),['2020innsi.pdf','exam_math_20208.pdf']);assert.equal(batch.filter(p=>p.files.some(f=>f.originalName==='exam_math_20208.pdf')).length,1);
 assert.equal(batch.find(p=>p.id==='science-tokyo-drive-math-academic-2006').originalYear,'平成18年度（2006年度）');assert.equal(batch.find(p=>p.id==='science-tokyo-drive-math-academic-2006').paperYear,2006);
 assert.deepEqual(batch.find(p=>p.id==='science-tokyo-drive-math-academic-2022').files.map(f=>f.originalName),['2022innsi.pdf','exam_math_20218.pdf']);assert.equal(batch.find(p=>p.id==='science-tokyo-drive-math-academic-2022').paperYear,2022);
 assert.equal(batch.find(p=>p.files.some(f=>f.originalName==='exam_cs_20198.pdf')).paperYear,2020);
 for(const id of ['science-tokyo-drive-cv-academic-2026','science-tokyo-drive-is-academic-2026','science-tokyo-drive-mat-academic-2026','science-tokyo-drive-sc-academic-2026','science-tokyo-drive-tse-academic-2026']){const p=batch.find(x=>x.id===id);assert.equal(p.files.at(-1).kind,'other');assert.equal(p.files.at(-1).label,'出题意图（非解答）');assert.equal(p.files[0].kind,'question');}
 assert.deepEqual(batch.filter(p=>p.department==='システム制御系').map(p=>p.paperYear).sort(),[2022,2023,2024,2025,2026]);
 assert.deepEqual(batch.filter(p=>p.department==='数理・計算科学系').map(p=>p.paperYear).sort(),[2022,2023,2024,2025,2026]);
 assert.equal(batch.filter(p=>p.department==='数学系').length,27);
 assert.doesNotMatch(production.schoolNotes['science-tokyo'].text,/正在补传/);assert.match(production.schoolNotes['science-tokyo'].text,/72组已全部发布/);
 assert.equal(core.filter(batch,catalog.universities,{school:'science-tokyo',graduate:'理学院',department:'数学系',year:'2020',query:''}).length,1);
 assert.equal(core.filter(batch,catalog.universities,{school:'science-tokyo',graduate:'工学院',department:'システム制御系',year:'2026',query:''}).length,1);
});
test('TUS preserves source PDFs and distinguishes academic years, actual dates and handwritten references',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/tus-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='tus');
 const prior=papers.filter(p=>!p.id.startsWith('tus-bf-')),added=papers.filter(p=>p.id.startsWith('tus-bf-'));
 assert.equal(papers.length,117);assert.equal(prior.length,61);assert.equal(added.length,56);
 assert.equal(manifest.paperGroups,117);assert.equal(manifest.sourceFiles,291);assert.equal(manifest.duplicateByteCopies,72);assert.equal(manifest.files.length,219);assert.equal(manifest.excluded.length,22);
 assert.equal(manifest.files.reduce((n,f)=>n+f.pages,0),1187);assert.equal(manifest.files.reduce((n,f)=>n+f.sourcePaths.length,0),291);
 assert.equal(manifest.backfill.addedGroups,56);assert.equal(manifest.backfill.addedUniquePDFs,98);assert.equal(manifest.backfill.addedPages,544);assert.equal(manifest.backfill.addedSourcePaths,143);
 assert.equal(manifest.backfill.priorGroups,61);assert.equal(manifest.backfill.priorUniquePDFs,121);assert.equal(manifest.backfill.priorPages,643);assert.equal(manifest.backfill.priorSourceFiles,148);
 assert.equal(manifest.backfill.skippedHennyu,4);assert.equal(manifest.backfill.skippedShakaijin,2);assert.equal(manifest.backfill.skippedEssay,16);assert.equal(manifest.backfill.yearBasis,'academic');
 assert.equal(manifest.excluded.filter(e=>/编入/.test(e.reason)).length,4);assert.equal(manifest.excluded.filter(e=>/社会人/.test(e.reason)).length,2);assert.equal(manifest.excluded.filter(e=>/小論文/.test(e.reason)).length,16);
 assert.equal(new Set(prior.map(p=>p.department)).size,11);assert.equal(new Set(production.papers.map(p=>p.id)).size,production.papers.length);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(prior)).digest('hex'),'5e41f1b92a347716ffc09cf9a9e50c6922bbca82146a681607c0aae720906ce3');
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of prior){assert.equal(p.yearBasis,'academic');assert.ok(p.examDates.length);for(const date of p.examDates){assert.match(date,/^\d{4}-\d{2}-\d{2}$/);assert.equal(p.examYear,Number(date.slice(0,4)));}for(const f of p.files){assert.ok(f.startPage<=f.pages);if(f.kind==='answer'){assert.equal(f.answerProvenance,'unofficial-handwritten');assert.match(f.label,/非官方/);}}}
 for(const p of added){assert.equal(p.yearBasis,'academic');assert.equal(p.yearEvidence==='source-directory'?p.department:'薬科学専攻','薬科学専攻');if(p.examDates){assert.equal(p.examDates.length,1);assert.match(p.examDates[0],/^\d{4}-\d{2}-\d{2}$/);assert.equal(p.examYear,Number(p.examDates[0].slice(0,4)));}else assert.equal(p.examYear,undefined);for(const f of p.files){assert.ok(f.startPage<=f.pages);assert.notEqual(f.kind,'answer');}}
 assert.equal(added.filter(p=>p.yearEvidence==='source-directory').length,2);
 const general=papers.find(p=>p.department==='電気工学専攻'&&p.paperYear===2023);assert.deepEqual(general.examDates,['2022-07-22']);assert.equal(core.yearOf(general),2023);
 const foreign=papers.find(p=>p.department==='電気電子情報工学専攻'&&p.paperYear===2024&&p.selectionName.includes('外国人'));assert.deepEqual(foreign.examDates,['2024-01-10']);
 const h=papers.find(p=>p.paperYear===2004);assert.match(h.originalYear,/平成16/);assert.deepEqual(h.examDates,['2003-08-01']);assert.equal(h.files.find(f=>f.kind==='question').startPage,2);
 const p2021=papers.find(p=>p.paperYear===2021);assert.deepEqual(p2021.examDates,['2020-07-23']);assert.ok(p2021.files.some(f=>f.originalName==='2020年夏入.pdf'));assert.equal(p2021.yearEvidence,'cover');assert.ok(!papers.some(p=>p.paperYear===2020));
 const correction=papers.find(p=>p.department==='情報計算科学専攻'&&p.paperYear===2024&&p.selectionName.includes('一般'));assert.equal(correction.files.find(f=>f.kind==='question').startPage,2);assert.equal(correction.files.find(f=>f.kind==='other').startPage,1);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'tus',query:'2024-01-10'}).length,3);
 assert.deepEqual(core.schools(catalog.universities,'东理').map(u=>u.id),['tus']);
 assert.ok(!prior.some(p=>/建築|社会基盤|国際火災|工業化学|数理科学|先端物理/.test(p.department)));
 const chem23=added.find(p=>p.id==='tus-bf-7baf18915f33');assert.equal(chem23.department,'先端化学専攻');assert.equal(chem23.paperYear,2023);assert.equal(chem23.files[0].sourcePaths.length,3);
 const phys23=added.find(p=>p.department==='物理学専攻'&&p.paperYear===2023);assert.ok(phys23.files.some(f=>f.sha256.startsWith('9edbd1f8')));assert.ok(!added.find(p=>p.department==='物理学専攻'&&p.paperYear===2024).files.some(f=>f.sha256.startsWith('9edbd1f8')));
 const mathForeign=added.find(p=>p.department==='数学専攻'&&p.paperYear===2024&&p.selectionName.includes('外国人'));assert.ok(mathForeign.files.some(f=>/応用数学専攻/.test(f.originalName)));assert.equal(mathForeign.files.length,2);
 assert.equal(added.filter(p=>p.department==='応用数学専攻'&&p.paperYear===2025).length,1);assert.equal(added.filter(p=>p.department==='物理学専攻'&&p.paperYear===2025).length,1);
 assert.equal(added.filter(p=>p.department==='工業化学専攻'&&p.paperYear===2025&&p.selectionName.includes('一般')).length,0);
 assert.equal(added.filter(p=>p.graduateSchool==='創域理工学研究科'&&p.department==='建築学専攻'&&p.paperYear===2025&&p.selectionName.includes('一般')).length,0);
 assert.equal(added.filter(p=>p.department==='生命生物科学専攻'&&p.paperYear===2025&&p.selectionName.includes('一般')).length,0);
 const fire=added.filter(p=>p.department==='国際火災科学専攻');assert.ok(fire.filter(p=>p.selectionName.includes('夏')||p.title.includes('一般・外国人')).every(p=>p.selectionName==='修士課程・一般・外国人留学生入試'));
 const fireWinter=added.find(p=>p.id==='tus-bf-819b3ff0f1b1');assert.deepEqual(fireWinter.examDates,['2024-02-24']);assert.equal(fireWinter.files.find(f=>f.kind==='question').startPage,2);assert.equal(fireWinter.files.find(f=>f.kind==='other'&&f.label==='問題訂正').startPage,1);
 const lifeWinter=added.find(p=>p.department==='生命科学専攻'&&p.paperYear===2025&&p.selectionName.includes('冬期'));assert.equal(lifeWinter.files.find(f=>f.kind==='question').startPage,2);assert.equal(lifeWinter.files.find(f=>f.kind==='other').startPage,1);assert.equal(lifeWinter.examDates,undefined);
 assert.deepEqual(added.find(p=>p.department==='薬科学専攻'&&p.paperYear===2023).examDates,['2022-08-23']);assert.deepEqual(added.find(p=>p.department==='薬科学専攻'&&p.paperYear===2024).examDates,['2023-08-22']);assert.deepEqual(added.find(p=>p.department==='薬科学専攻'&&p.paperYear===2025).examDates,['2024-08-22']);
 assert.deepEqual(added.find(p=>p.department==='工業化学専攻'&&p.paperYear===2024&&p.selectionName.includes('外国人')).examDates,['2024-01-08']);
 assert.equal(added.find(p=>p.department==='工業化学専攻'&&p.paperYear===2024&&!p.selectionName.includes('外国人')).files[0].sourcePaths.length,3);
 assert.match(production.schoolNotes.tus.text,/117组／219个唯一PDF、1187页/);assert.match(production.schoolNotes.tus.text,/新增56组、98个唯一PDF、544页/);assert.match(production.schoolNotes.tus.text,/学部编入4份、社会人特别选拔2份、小論文16份/);assert.match(production.schoolNotes.tus.text,/yearEvidence=source-directory/);
 assert.ok(manifest.excluded.every(e=>!papers.some(p=>p.files.some(f=>f.sourcePaths.includes(e.sourcePath)))));
});
test('PDF links accept official university hosts and contained local files, preserving page anchors',()=>{
 assert.equal(core.fileURL({url:'assets/past-papers/2025/電気回路.pdf',startPage:3}),'assets/past-papers/2025/%E9%9B%BB%E6%B0%97%E5%9B%9E%E8%B7%AF.pdf#page=3');
 assert.equal(core.fileURL({url:'https://www.t.u-tokyo.ac.jp/test.pdf',startPage:4}),'https://www.t.u-tokyo.ac.jp/test.pdf#page=4');
 assert.equal(core.fileURL({url:'https://www.kyoto-u.ac.jp/download.php?id=123'}),'https://www.kyoto-u.ac.jp/download.php?id=123');
 for(const url of ['http://www.u-tokyo.ac.jp/test.pdf','https://u-tokyo.ac.jp.evil.com/a.pdf','https://user:pass@www.u-tokyo.ac.jp/a.pdf','//www.u-tokyo.ac.jp/a.pdf','javascript:alert(1)','data:application/pdf,foo','assets/past-papers/../../script.js','assets/past-papers/%2e%2e/secret.pdf','assets/past-papers/%252e%252e/test.pdf','assets/past-papers/fake.html','assets/past-papers/a\\b.pdf','/assets/past-papers/a.pdf'])assert.equal(core.fileURL({url}),null,url);
});
test('school index resolves Chinese aliases and composes AND searches',()=>{
 assert.deepEqual(core.schools(catalog.universities,'东大').map(u=>u.id),['utokyo']);
 assert.deepEqual(core.schools(catalog.universities,'早稻田').map(u=>u.id),['waseda']);assert.equal(core.schools(catalog.universities,'no-such-school').length,0);
});
test('papers filter independently by school, historical graduate school, year and subjects, newest first',()=>{
 const papers=[sample(),sample({id:'test-2',examYear:2023}),sample({id:'test-3',universityId:'waseda',graduateSchool:'基幹理工学研究科',examYear:2024})];
 assert.deepEqual(core.filter(papers,catalog.universities,all).map(p=>p.id),['test-paper-1','test-3','test-2']);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'utokyo',year:'2023'}).length,1);
 assert.equal(core.filter(papers,catalog.universities,{...all,query:'东大 電気回路'}).length,2);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'waseda',graduate:'工学系研究科'}).length,0);
 assert.equal(core.filter(papers,catalog.universities,{...all,query:'no-matching-paper'}).length,0);
});
test('room provides three peer entry cards, an independent PDF library, and existing quiz storage',()=>{
 const root=path.join(__dirname,'..'),room=fs.readFileSync(path.join(root,'practice.html'),'utf8'),drill=fs.readFileSync(path.join(root,'drill.html'),'utf8'),archive=fs.readFileSync(path.join(root,'past-papers.html'),'utf8'),answers=fs.readFileSync(path.join(root,'answers.html'),'utf8');
 assert.equal((room.match(/class="room-path room-path--/g)||[]).length,3);assert.match(room,/href="past-papers.html"/);assert.match(room,/href="drill.html"/);assert.match(room,/href="answers.html"/);assert.match(room,/03 \/ Answers/);assert.match(room,/id="answers-path-title">答案</);assert.ok(!room.includes('src="practice.js"'));
 assert.match(archive,/past-papers-data.js/);assert.match(archive,/src="paper-practice-data\.js(?:\?[^" ]+)?"/);assert.match(archive,/src="questions\.js(?:\?[^" ]+)?"/);assert.match(archive,/src="practice-core\.js(?:\?[^" ]+)?"/);assert.match(archive,/src="paper-set-completion\.js(?:\?[^" ]+)?"/);assert.ok(!/src="practice\.js(?:\?[^" ]+)?"/.test(archive));assert.ok(!archive.includes('answers-data.js'));assert.match(drill,/src="questions\.js(?:\?[^" ]+)?"/);assert.match(drill,/src="practice\.js(?:\?[^" ]+)?"/);assert.ok(!drill.includes('answers-data.js'));
 assert.match(answers,/answers-data\.js/);assert.ok(!answers.includes('past-papers-data.js'));assert.ok(!answers.includes('questions.js'));assert.ok(!answers.includes('过去问答案'));
 assert.match(fs.readFileSync(path.join(root,'practice.js'),'utf8'),/japan-study-journal:practice:v1/);assert.match(fs.readFileSync(path.join(root,'study-room.css'),'utf8'),/prefers-reduced-motion:reduce/);
 for(const name of ['practice.html','drill.html','past-papers.html','answers.html']){const html=fs.readFileSync(path.join(root,name),'utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);for(const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){if(/^(?:https?:|data:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])),m[1]);}}
});


test('Waseda preserves PDF bytes, original years and historical department names',()=>{
 const papers=production.papers.filter(p=>p.sourceBatch!=='science-tokyo-drive-20261018'&&p.universityId==='waseda');const crypto=require('node:crypto'),manifest=require('../assets/past-papers/waseda-import-manifest.json');const prior=papers.filter(p=>!p.id.startsWith('waseda-math-app-')&&!p.id.startsWith('waseda-phys-app-'));assert.equal(manifest.files.length,47);assert.equal(manifest.excluded.length,2);assert.equal(papers.length,41);assert.equal(prior.length,35);assert.equal(crypto.createHash('sha256').update(JSON.stringify(prior)).digest('hex'),'b30cc064bcffd216c4bea1ec55e082e3b07d6fc47865f1fa6ac3d055b2d45adc');
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of papers){assert.equal(p.yearBasis,'academic');assert.equal(p.examYear,undefined);assert.deepEqual(p.admissionYears,[p.paperYear,p.paperYear+1]);for(const f of p.files)assert.ok(f.startPage<=f.pages);}
 const ep=papers.filter(p=>p.department==='電子物理システム学専攻');assert.equal(ep.length,11);assert.ok(ep.some(p=>p.paperYear===2014));assert.ok(ep.some(p=>p.paperYear===2015));assert.ok(papers.some(p=>p.department==='経営デザイン専攻'&&p.paperYear===2023));
 const all={school:'all',graduate:'all',department:'all',year:'all',query:''};assert.equal(core.filter(papers,catalog.universities,{...all,department:'電子物理システム学専攻',year:'2014'}).length,1);
});

