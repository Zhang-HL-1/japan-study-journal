const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js'),production=require('../past-papers-data.js');
const all={school:'all',graduate:'all',year:'all',query:''};
// Synthetic metadata tests only; these are not past questions and never enter the production catalog.
const sample=(changes={})=>({id:'test-paper-1',universityId:'utokyo',title:'Test metadata',graduateSchool:'工学系研究科',department:'テスト専攻',selectionName:'テスト選抜',examYear:2025,subjects:['電気回路'],files:[{label:'問題',kind:'question',url:'assets/past-papers/test-only.pdf'}],...changes});
test('production publishes nine university archives while the quiz bank stays empty',()=>{assert.equal(production.version,2);assert.equal(production.papers.length,292);for(const p of production.papers){assert.ok(['waseda','tus','science-tokyo','sophia','kobe','hokkaido','uec','nagoya','osaka'].includes(p.universityId));assert.ok(core.validPaper(p,catalog.universities));}assert.equal(new Set(production.papers.flatMap(p=>p.files.map(f=>f.url))).size,462);assert.deepEqual(require('../questions.js'),[]);assert.equal(catalog.universities.length,23);});
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
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(production.papers.filter(p=>['waseda','tus','science-tokyo'].includes(p.universityId)))).digest('hex'),'d1b2db63f10d58346a2a4a273e249f141420e807466d3884ce6008ad311833d6');
});
test('past-paper metadata requires known universities, valid years and actual document entries',()=>{
 assert.equal(core.validPaper(sample(),catalog.universities),true);
 for(const changes of [{id:''},{universityId:'unknown'},{title:''},{graduateSchool:''},{selectionName:''},{examYear:'2025'},{examYear:0},{files:[]},{files:[{label:'問題',kind:'question',url:'javascript:alert(1)'}]},{subjects:'電気回路'},{examDates:'2025-01-07'},{examDates:['2025']}])assert.equal(core.validPaper(sample(changes),catalog.universities),false);
 // Historical graduate-school names are allowed; existing campus labels must not rewrite an old paper.
 assert.equal(core.validPaper(sample({graduateSchool:'旧研究科名'}),catalog.universities),true);
});
test('Kobe preserves originals, partial mechanical coverage and three distinct system-information periods',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/kobe-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='kobe');
 assert.equal(papers.length,12);assert.equal(manifest.sourceFiles,46);assert.equal(manifest.files.length,45);assert.equal(manifest.duplicateByteCopies,0);assert.equal(manifest.excluded.length,1);assert.equal(manifest.excludedFolders.length,4);
 assert.equal(new Set(papers.flatMap(p=>p.files.map(f=>f.url))).size,45);
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
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(production.papers.filter(p=>['waseda','tus','science-tokyo','sophia'].includes(p.universityId)))).digest('hex'),'fe412870427c4e56857547ed5f1fe9ed3f7d0fb7a4caa16500bf28b707e311e1');
});
test('Science Tokyo preserves bytes and separates complete years, fragments and unverified photos',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/science-tokyo-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='science-tokyo');
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
test('TUS preserves source PDFs and distinguishes academic years, actual dates and handwritten references',()=>{
 const crypto=require('node:crypto'),manifest=require('../assets/past-papers/tus-import-manifest.json'),papers=production.papers.filter(p=>p.universityId==='tus');
 assert.equal(papers.length,61);assert.equal(manifest.sourceFiles,148);assert.equal(manifest.duplicateByteCopies,27);assert.equal(manifest.files.length,121);assert.equal(manifest.excluded.length,165);
 assert.equal(new Set(papers.map(p=>p.department)).size,11);assert.equal(new Set(production.papers.map(p=>p.id)).size,production.papers.length);
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.ok(b.subarray(0,5).equals(Buffer.from('%PDF-')));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of papers){assert.equal(p.yearBasis,'academic');assert.ok(p.examDates.length);for(const date of p.examDates){assert.match(date,/^\d{4}-\d{2}-\d{2}$/);assert.equal(p.examYear,Number(date.slice(0,4)));}for(const f of p.files){assert.ok(f.startPage<=f.pages);if(f.kind==='answer'){assert.equal(f.answerProvenance,'unofficial-handwritten');assert.match(f.label,/非官方/);}}}
 const general=papers.find(p=>p.department==='電気工学専攻'&&p.paperYear===2023);assert.deepEqual(general.examDates,['2022-07-22']);assert.equal(core.yearOf(general),2023);
 const foreign=papers.find(p=>p.department==='電気電子情報工学専攻'&&p.paperYear===2024&&p.selectionName.includes('外国人'));assert.deepEqual(foreign.examDates,['2024-01-10']);
 const h=papers.find(p=>p.paperYear===2004);assert.match(h.originalYear,/平成16/);assert.deepEqual(h.examDates,['2003-08-01']);assert.equal(h.files.find(f=>f.kind==='question').startPage,2);
 const p2021=papers.find(p=>p.paperYear===2021);assert.deepEqual(p2021.examDates,['2020-07-23']);assert.ok(p2021.files.some(f=>f.originalName==='2020年夏入.pdf'));assert.equal(p2021.yearEvidence,'cover');assert.ok(!papers.some(p=>p.paperYear===2020));
 const correction=papers.find(p=>p.department==='情報計算科学専攻'&&p.paperYear===2024&&p.selectionName.includes('一般'));assert.equal(correction.files.find(f=>f.kind==='question').startPage,2);assert.equal(correction.files.find(f=>f.kind==='other').startPage,1);
 assert.equal(core.filter(papers,catalog.universities,{...all,school:'tus',query:'2024-01-10'}).length,3);
 assert.deepEqual(core.schools(catalog.universities,'东理').map(u=>u.id),['tus']);
 assert.ok(!papers.some(p=>/建築|社会基盤|国際火災|工業化学|数理科学|先端物理/.test(p.department)));
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
test('room provides two peer entry cards, an independent PDF library, and existing quiz storage',()=>{
 const root=path.join(__dirname,'..'),room=fs.readFileSync(path.join(root,'practice.html'),'utf8'),drill=fs.readFileSync(path.join(root,'drill.html'),'utf8'),archive=fs.readFileSync(path.join(root,'past-papers.html'),'utf8');
 assert.equal((room.match(/class="room-path room-path--/g)||[]).length,2);assert.match(room,/href="past-papers.html"/);assert.match(room,/href="drill.html"/);assert.ok(!room.includes('src="practice.js"'));
 assert.match(archive,/past-papers-data.js/);assert.ok(!archive.includes('src="questions.js"'));assert.match(drill,/src="questions.js"/);assert.match(drill,/src="practice.js"/);
 assert.match(fs.readFileSync(path.join(root,'practice.js'),'utf8'),/japan-study-journal:practice:v1/);assert.match(fs.readFileSync(path.join(root,'study-room.css'),'utf8'),/prefers-reduced-motion:reduce/);
 for(const name of ['practice.html','drill.html','past-papers.html']){const html=fs.readFileSync(path.join(root,name),'utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);for(const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){if(/^(?:https?:|data:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])),m[1]);}}
});


test('Waseda preserves PDF bytes, original years and historical department names',()=>{
 const papers=production.papers.filter(p=>p.universityId==='waseda');const crypto=require('node:crypto'),manifest=require('../assets/past-papers/waseda-import-manifest.json');assert.equal(manifest.files.length,41);assert.equal(manifest.excluded.length,8);assert.equal(new Set(papers.map(p=>p.id)).size,35);assert.equal(crypto.createHash('sha256').update(JSON.stringify(papers)).digest('hex'),'b30cc064bcffd216c4bea1ec55e082e3b07d6fc47865f1fa6ac3d055b2d45adc');
 for(const f of manifest.files){const b=fs.readFileSync(path.join(__dirname,'..',f.path));assert.equal(b.length,f.byteSize);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256);}
 for(const p of papers){assert.equal(p.yearBasis,'academic');assert.equal(p.examYear,undefined);assert.deepEqual(p.admissionYears,[p.paperYear,p.paperYear+1]);for(const f of p.files)assert.ok(f.startPage<=f.pages);}
 const ep=papers.filter(p=>p.department==='電子物理システム学専攻');assert.equal(ep.length,11);assert.ok(ep.some(p=>p.paperYear===2014));assert.ok(ep.some(p=>p.paperYear===2015));assert.ok(papers.some(p=>p.department==='経営デザイン専攻'&&p.paperYear===2023));
 const all={school:'all',graduate:'all',department:'all',year:'all',query:''};assert.equal(core.filter(papers,catalog.universities,{...all,department:'電子物理システム学専攻',year:'2014'}).length,1);
});
