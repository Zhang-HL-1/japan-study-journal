const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../past-papers-core.js'),catalog=require('../campus-map-data.js'),production=require('../past-papers-data.js');
const all={school:'all',graduate:'all',year:'all',query:''};
// Synthetic metadata tests only; these are not past questions and never enter the production catalog.
const sample=(changes={})=>({id:'test-paper-1',universityId:'utokyo',title:'Test metadata',graduateSchool:'工学系研究科',department:'テスト専攻',selectionName:'テスト選抜',examYear:2025,subjects:['電気回路'],files:[{label:'問題',kind:'question',url:'assets/past-papers/test-only.pdf'}],...changes});
test('production publishes Waseda and TUS originals while the quiz bank stays empty',()=>{assert.equal(production.version,2);assert.equal(production.papers.length,96);for(const p of production.papers){assert.ok(['waseda','tus'].includes(p.universityId));assert.ok(core.validPaper(p,catalog.universities));}assert.equal(new Set(production.papers.flatMap(p=>p.files.map(f=>f.url))).size,162);assert.deepEqual(require('../questions.js'),[]);assert.equal(catalog.universities.length,23);});
test('past-paper metadata requires known universities, valid years and actual document entries',()=>{
 assert.equal(core.validPaper(sample(),catalog.universities),true);
 for(const changes of [{id:''},{universityId:'unknown'},{title:''},{graduateSchool:''},{selectionName:''},{examYear:'2025'},{examYear:0},{files:[]},{files:[{label:'問題',kind:'question',url:'javascript:alert(1)'}]},{subjects:'電気回路'},{examDates:'2025-01-07'},{examDates:['2025']}])assert.equal(core.validPaper(sample(changes),catalog.universities),false);
 // Historical graduate-school names are allowed; existing campus labels must not rewrite an old paper.
 assert.equal(core.validPaper(sample({graduateSchool:'旧研究科名'}),catalog.universities),true);
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
