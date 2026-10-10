const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../exam-scope-core.js');
const data = require('../exam-scope-data.js');
// Only test fixtures: these records are never loaded by production pages.
const universities = [{ id: 'fixture', name: 'Fixture University', aliases: ['QA'] }];
const makeRecord = overrides => ({ id: 'qa-general', universityId: 'fixture', admissionType: 'general', graduateSchool: 'Fixture Graduate School', department: 'Fixture Department',
  selectionName: 'Fixture selection', entryYear: '2027年4月', verifiedAt: '2026-10-03', subjectsOriginal: '数学\n物理', scopeOriginal: 'A < B & C',
  sources: [{ label: 'Official fixture URL', kind: 'pdf', url: 'https://www.t.u-tokyo.ac.jp/fixture.pdf', pdfPage: 3 }], ...overrides });
const initial = { universityId: 'all', admissionType: 'general', graduateSchool: 'all', department: 'all', entryYear: 'all', query: '' };

test('Sophia keeps the three formal engineering divisions and the independent applied data science master program',()=>{
 const rs=data.records.filter(r=>r.universityId==='sophia');
 assert.equal(rs.length,20);assert.ok(rs.every(r=>r.admissionType==='general'&&r.degreeProgram==='master'&&r.entryYear==='2027年4月'&&r.verifiedAt==='2026-10-09'&&!r.publicationStatus));
 const st=rs.filter(r=>r.graduateSchool==='理工学研究科');assert.equal(st.length,15);
 assert.deepEqual([...new Set(st.map(r=>r.department))],['理工学専攻']);
 assert.deepEqual([...new Set(st.map(r=>r.course))].sort(),['機械工学領域','電気・電子工学領域','情報学領域'].sort());
 const ds=rs.filter(r=>r.graduateSchool==='応用データサイエンス学位プログラム');assert.equal(ds.length,5);
 assert.ok(ds.every(r=>r.department===r.graduateSchool&&!r.course));
 for(const forbidden of ['化学領域','応用化学領域','数学領域','物理学領域','生物科学領域','グリーンサイエンス・エンジニアリング領域'])assert.ok(rs.every(r=>r.course!==forbidden));
 assert.ok(rs.every(r=>!r.selectionName.includes('7月')&&!r.department.includes('デジタルグリーン')));
 assert.match(data.catalog.sophia.note,/GSE英語|GSE英语/);assert.match(data.catalog.sophia.note,/未納入|未纳入/);
});
test('Sophia engineering preserves seven preselected written papers, oral scopes and real external English formats',()=>{
 const rs=data.records.filter(r=>r.id.startsWith('sophia-st-')&&r.id.endsWith('-general'));assert.equal(rs.length,6);
 for(const r of rs){
  assert.match(r.scopeOriginal,/7科目から1科目を出願時に選択/);
  for(const subject of ['機械工学基礎','電気・電子工学基礎','化学基礎','数学基礎','物理学基礎','生物科学基礎','情報学基礎'])assert.ok(r.scopeOriginal.includes(subject));
  for(const term of ['電磁気学','電気回路','電子回路','信号処理','計算機ハードウェア','志望動機'])assert.ok(r.scopeOriginal.includes(term));
  assert.ok(r.sources.some(s=>s.url.endsWith('9_rikougakukenkyuuka_2027.pdf')&&s.pdfPage===4));
  for(const term of ['N2','L&R','Home Edition','MyBest','ITP','IP','Academic Module','4技能','2年以内'])assert.ok(r.conditionsOriginal.includes(term));
  assert.match(r.conditionsOriginal,/卒業研究担当教員と同じ/);
  assert.match(r.editorialNote,/未公布更细章节或统一外语最低分/);
 }
});
test('Sophia keeps September internal waivers separate from February and from engineering working professionals',()=>{
 for(const field of ['mechanical','electrical','information']){
  const f=s=>data.records.find(r=>r.id==='sophia-st-'+field+'-'+s);
  const waiver=f('september-waiver');assert.equal(waiver.internationalGeneral,undefined);
  assert.match(waiver.conditionsOriginal,/本学理工学部卒業/);assert.match(waiver.conditionsOriginal,/外国語検定試験の成績提出も免除/);
  assert.equal(waiver.scopeOriginal,'専門の研究内容と志望動機に関する口頭試問。');assert.doesNotMatch(waiver.subjectsOriginal,/筆記試験：/);
  for(const period of ['september','february']){
   const r=f(period+'-working');assert.match(r.scopeOriginal,/実務経験に関する口頭発表/);assert.match(r.scopeOriginal,/予備試問/);
   assert.match(r.conditionsOriginal,/1年以上/);assert.match(r.conditionsOriginal,/開始1ヶ月前/);assert.match(r.conditionsOriginal,/不許可の場合は一般入試/);
   assert.doesNotMatch(r.subjectsOriginal,/理工基礎/);
  }
  assert.equal(f('february-waiver'),undefined);
 }
});
test('Sophia applied data science retains exam-time choices, N1 and the newly opened February general selection',()=>{
 const f=s=>data.records.find(r=>r.id==='sophia-applied-ds-'+s);
 for(const period of ['september','february']){
  const r=f(period+'-general');assert.match(r.scopeOriginal,/指定の問題数を選択/);assert.match(r.scopeOriginal,/問題は試験中に選択/);
  assert.match(r.conditionsOriginal,/N1合格/);assert.doesNotMatch(r.subjectsOriginal,/TOEFL|TOEIC|IELTS|TEAP/);
  assert.match(r.conditionsOriginal,/1,000字/);assert.match(r.conditionsOriginal,/参考文献5点/);assert.match(r.conditionsOriginal,/13:00/);
  assert.ok(r.sources.some(s=>s.url.endsWith('11_ouyoudsprogram_2027.pdf')&&s.pdfPage===3));
 }
 const feb=f('february-general');assert.match(feb.conditionsOriginal,/筆記試験免除制度はありません/);assert.match(feb.conditionsOriginal,/2027年1月7日/);assert.match(feb.conditionsOriginal,/2027年2月20日/);
 assert.equal(f('february-waiver'),undefined);
 const waiver=f('september-waiver');assert.equal(waiver.internationalGeneral,true);assert.match(waiver.conditionsOriginal,/①、②/);assert.match(waiver.conditionsOriginal,/インターン/);assert.match(waiver.scopeOriginal,/9:30/);
 assert.ok(!waiver.conditionsOriginal.includes('本学理工学部卒業'));
});
test('Sophia applied data science working eligibility does not copy the engineering one-year employment rule',()=>{
 for(const period of ['september','february']){
  const r=data.records.find(r=>r.id==='sophia-applied-ds-'+period+'-working');
  assert.doesNotMatch(r.subjectsOriginal,/筆記/);assert.doesNotMatch(r.conditionsOriginal,/実務経験が入学時点で1年以上/);
  assert.match(r.conditionsOriginal,/就業経験がない者/);assert.match(r.conditionsOriginal,/学部卒業後2年未満/);assert.match(r.conditionsOriginal,/4月から正規雇用/);
  assert.match(r.conditionsOriginal,/申請要件①から④/);assert.match(r.editorialNote,/第5页.*第6页/);
  assert.deepEqual(r.sources.filter(s=>s.url.endsWith('11_ouyoudsprogram_2027.pdf')).map(s=>s.pdfPage),[7,5,6,1]);
 }
});
test('Sophia foreign-educated general routes preserve residence restrictions, aliases and safe actual PDF pages',()=>{
 const rs=data.records.filter(r=>r.universityId==='sophia');
 const general=core.filter(data.records,data.universities,{...initial,universityId:'sophia'});
 const international=core.filter(data.records,data.universities,{...initial,universityId:'sophia',admissionType:'international'});
 assert.equal(general.length,20);assert.equal(international.length,17);assert.ok(international.every(r=>r.internationalGeneral&&r.admissionType==='general'));
 for(const q of ['上智','上智大','Sophia','Sophia University'])assert.equal(core.filter(data.records,data.universities,{...initial,query:q}).length,20);
 for(const r of rs){
  if(r.id.includes('february'))assert.match(r.conditionsOriginal,/国内出願のみ/);
  if(r.id.includes('september'))assert.match(r.editorialNote,/已结束/);
  assert.ok(r.sources.some(s=>s.url.endsWith('0_kyotsu_2027.pdf')&&s.pdfPage===7));
  assert.ok(r.sources.some(s=>s.url.endsWith('0_kyotsu_2027.pdf')&&s.pdfPage===6));
  for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.sophia.ac.jp'));if(s.kind==='pdf'){
   const pages=s.url.endsWith('0_kyotsu_2027.pdf')?24:s.url.endsWith('9_rikougakukenkyuuka_2027.pdf')?14:8;
   assert.ok(s.pdfPage>=1&&s.pdfPage<=pages);
  }}
 }
 assert.equal(core.sourceURL({url:'https://adm.sophia.ac.jp/guide.pdf',kind:'pdf',pdfPage:6}),'https://adm.sophia.ac.jp/guide.pdf#page=6');
 for(const url of ['http://adm.sophia.ac.jp/a','https://sophia.ac.jp.evil.test/a','https://evil-sophia.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
 assert.equal(data.records.length,907);assert.equal(data.records.filter(r=>!r.publicationStatus).length,871);
 const html=fs.readFileSync(path.join(__dirname,'../exam-scope.html'),'utf8');assert.match(html,/<strong>907<\/strong>/);assert.match(html,/20261010-subjects/);assert.match(html,/上智大学、神戸大学、名古屋大学、電気通信大学、筑波大学、一橋大学与横浜国立大学/);
});
test('Kyushu keeps seven official faculties and 20 departments with year-specific sources and safe aliases',()=>{
 const records=data.records.filter(r=>r.universityId==='kyushu');
 assert.equal(records.length,119);assert.equal(new Set(records.map(r=>r.graduateSchool)).size,7);
 assert.equal(new Set(records.map(r=>r.graduateSchool+'/'+r.department)).size,20);
 assert.equal(records.filter(r=>r.admissionType==='general').length,84);
 assert.equal(records.filter(r=>r.admissionType==='international').length,35);
 assert.ok(records.every(r=>r.degreeProgram==='master'&&r.verifiedAt==='2026-10-06'&&['2027年4月','2027年10月'].includes(r.entryYear)));
 assert.ok(records.every(r=>r.sources.every(s=>new URL(s.url).hostname.endsWith('.kyushu-u.ac.jp'))));
 assert.equal(core.sourceURL({url:'https://www.isee.kyushu-u.ac.jp/a.pdf',kind:'pdf',pdfPage:10}),'https://www.isee.kyushu-u.ac.jp/a.pdf#page=10');
 for(const url of ['https://kyushu-u.ac.jp.evil.test/x','https://evil-kyushu-u.ac.jp/x','http://www.eng.kyushu-u.ac.jp/x'])assert.equal(core.sourceURL({url,kind:'page'}),null);
 const matches=core.filter(data.records,data.universities,{...initial,query:'九大 半導体デバイス'});
 assert.equal(matches.length,4);assert.ok(matches.every(r=>r.universityId==='kyushu'));
});
test('Kyushu engineering distinguishes general types and English or foreign-specific papers',()=>{
 const f=id=>data.records.find(r=>r.id==='kyushu-'+id);
 assert.match(f('eng-applied-chemistry-general-functional').subjectsOriginal,/筆記試験/);
 assert.match(f('eng-quantum-general').conditionsOriginal,/8科目から3科目/);
 assert.match(f('eng-quantum-general').subjectsOriginal,/小論文/);
 assert.match(f('eng-civil-general').conditionsOriginal,/11問から6問.*少なくとも3問/s);
 assert.doesNotMatch(f('eng-naval-general-type1').subjectsOriginal,/小論文|面接/);
 assert.match(f('eng-naval-general-type2').subjectsOriginal,/小論文.*面接/s);
 assert.match(f('eng-earth-resources-general').conditionsOriginal,/7科目から3/);
 assert.match(f('eng-earth-resources-english').conditionsOriginal,/a specific area/);
 assert.match(f('eng-materials-english').conditionsOriginal,/not required/);
 assert.doesNotMatch(f('eng-hydrogen-english-b').subjectsOriginal,/Dynamics of Machinery|Thermal Engineering|Fluids Engineering/);
 assert.match(f('eng-hydrogen-english-b').scopeOriginal,/Nernst Equation/);
 assert.ok(!f('eng-aerospace-foreign').scopeOriginal);
 assert.match(f('eng-civil-foreign').subjectsOriginal,/数学/);
 assert.ok(!data.records.some(r=>r.universityId==='kyushu'&&r.id.startsWith('kyushu-eng-aerospace-english')));
});
test('Kyushu ISEE uses 2027 two-department reorganization and elective rules across five courses',()=>{
 const rs=data.records.filter(r=>r.universityId==='kyushu'&&r.graduateSchool==='システム情報科学府');
 assert.equal(rs.length,20);assert.deepEqual([...new Set(rs.map(r=>r.department))],['情報理工学専攻','電気電子工学専攻']);
 assert.equal(new Set(rs.map(r=>r.course)).size,5);
 const f=id=>data.records.find(r=>r.id==='kyushu-'+id);
 assert.match(f('isee-ai-robotics-general-written').conditionsOriginal,/6分野から2/);
 assert.match(f('isee-energy-devices-general-written').conditionsOriginal,/5分野から2/);
 assert.doesNotMatch(f('isee-ai-robotics-general-written').subjectsOriginal,/口述/);
 assert.match(f('isee-ai-robotics-general-special').subjectsOriginal,/口述/);
 assert.equal(f('isee-ai-robotics-global-written').entryYear,'2027年10月');
 assert.ok(f('isee-ai-robotics-general-written').sources.some(s=>s.url.endsWith('2027mc_general_guidelines_20260420.pdf')&&s.pdfPage===10));
});
test('Kyushu IGSES keeps first, second and international examinations separate',()=>{
 const f=id=>data.records.find(r=>r.id==='kyushu-'+id);
 const rs=data.records.filter(r=>r.universityId==='kyushu'&&r.graduateSchool==='総合理工学府');
 assert.equal(new Set(rs.map(r=>r.department)).size,1);
 assert.match(f('iges-group1-general-written').conditionsOriginal,/10題から3題.*必須ではない/s);
 assert.match(f('iges-group2-general-written').scopeOriginal,/数学Ⅱ.*圧縮性流体は出題範囲に含まない/s);
 assert.doesNotMatch(f('iges-group2-second').scopeOriginal,/数学Ⅱ|流体力学|電磁気学/);
 assert.match(f('iges-group1-second').conditionsOriginal,/1科目.*変更不可/);
 assert.doesNotMatch(f('iges-group2-general-oral').subjectsOriginal,/筆記|筆答/);
 assert.ok(!f('iges-group1-international-oral'));
 assert.match(f('iges-group2-international-written').conditionsOriginal,/Both questions/);
 assert.ok(f('iges-group2-international-written').sources.some(s=>s.pdfPage===17));
});
test('Kyushu Earth and Planetary Sciences require 2027 supervisor-group designated subjects',()=>{
 const rs=data.records.filter(r=>r.id.startsWith('kyushu-sci-earth-group'));
 assert.equal(rs.length,19);assert.ok(rs.every(r=>r.department==='地球惑星科学専攻'));
 assert.equal(rs.filter(r=>r.subjectsOriginal.split('指定科目（筆記試験）：')[1].split('\n')[0].split('，').length===1).length,2);
 assert.match(rs.find(r=>r.course==='有機宇宙地球化学').subjectsOriginal,/指定科目（筆記試験）：化学\n/);
 assert.match(rs.find(r=>r.course==='地球深部物理学').subjectsOriginal,/電磁気学，物理数学/);
 assert.ok(rs.every(r=>!r.conditionsOriginal.includes('選択')&&r.conditionsOriginal.includes('60分')));
 const chem=data.records.find(r=>r.id==='kyushu-sci-chemistry-general');
 assert.match(chem.conditionsOriginal,/TOEFL試験は対象外/);
 assert.match(chem.conditionsOriginal,/6科目から任意に3/);
 const second=data.records.find(r=>r.id==='kyushu-sci-physics-second');
 assert.doesNotMatch(second.subjectsOriginal,/筆記/);
});
test('Kyushu math, design and life sciences preserve course, English and seasonal distinctions',()=>{
 const f=id=>data.records.find(r=>r.id==='kyushu-'+id);
 assert.match(f('math-mathematics-general').conditionsOriginal,/4問全問.*2問選択/s);
 assert.match(f('math-mma-general').conditionsOriginal,/3問選択/);
 assert.doesNotMatch(f('math-mma-general').subjectsOriginal,/英語|TOEFL/);
 const design=data.records.filter(r=>r.universityId==='kyushu'&&r.graduateSchool==='芸術工学府');
 assert.equal(new Set(design.map(r=>r.course)).size,6);assert.equal(design.length,12);
 assert.match(f('design-acoustic-10').scopeOriginal,/ディジタル信号処理/);
 assert.match(f('design-media-4').conditionsOriginal,/3以上（44点以上）/);
 assert.equal(f('design-media-10').entryYear,'2027年10月');
 assert.match(f('sls-biomedical-general').scopeOriginal,/生化学，有機化学，分析化学/);
 assert.match(f('sls-medical-general').conditionsOriginal,/4問選択/);
 assert.match(f('sls-bioengineering-autumn').subjectsOriginal,/小論文/);
 assert.ok(!f('sls-bioengineering-autumn').scopeOriginal);
 assert.ok(!f('sls-informatics-general').scopeOriginal&&!f('sls-biophysics-general').scopeOriginal);
 assert.ok(!data.records.some(r=>r.universityId==='kyushu'&&r.id.startsWith('kyushu-sls')&&r.degreeProgram==='integrated'));
});

test('Hokkaido adds two graduate schools and seven eligible departments with actual 2027 sources',()=>{
 const rs=data.records.filter(r=>r.universityId==='hokkaido');
 assert.equal(rs.length,28);assert.equal(new Set(rs.map(r=>r.graduateSchool)).size,2);
 assert.equal(new Set(rs.map(r=>r.graduateSchool+'/'+r.department)).size,7);
 assert.equal(rs.filter(r=>r.admissionType==='general').length,15);
 assert.equal(rs.filter(r=>r.admissionType==='international').length,13);
 const pending=rs.filter(r=>r.publicationStatus==='pending');assert.equal(pending.length,1);
 assert.ok(pending.every(r=>!r.subjectsOriginal&&!r.scopeOriginal));
 assert.ok(rs.every(r=>r.verifiedAt==='2026-10-09'&&r.entryYear==='2027年4月'&&r.degreeProgram==='master'));
 assert.ok(rs.every(r=>r.sources.every(s=>new URL(s.url).hostname.endsWith('.hokudai.ac.jp'))));
 for(const q of ['北大','北海道大']){
  const hits=core.filter(data.records,data.universities,{...initial,query:q});
  assert.equal(hits.length,15);assert.ok(hits.every(r=>r.universityId==='hokkaido'));
 }
 assert.equal(core.sourceURL({url:'https://www.eng.hokudai.ac.jp/a.pdf',kind:'pdf',pdfPage:18}),'https://www.eng.hokudai.ac.jp/a.pdf#page=18');
 for(const url of ['http://www.eng.hokudai.ac.jp/a','https://hokudai.ac.jp.evil.test/a','https://evil-hokudai.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
test('Hokkaido Engineering keeps research-room groups, oral alternatives and foreign choices distinct',()=>{
 const f=id=>data.records.find(r=>r.id==='hokkaido-eng-'+id);
 const energy=data.records.filter(r=>r.universityId==='hokkaido'&&r.department==='エネルギー環境システム専攻'&&r.admissionType==='general');
 assert.equal(energy.length,2);assert.equal(new Set(energy.map(r=>r.course)).size,2);
 assert.match(f('mechanical-general').conditionsOriginal,/材料力学.*必答.*流体力学.*必答/s);
 assert.match(f('mechanical-general').conditionsOriginal,/550点未満/);
 assert.ok(!f('mechanical-general').scopeOriginal);
 assert.match(f('quantum-general').scopeOriginal,/留数定理/);
 assert.match(f('quantum-general').conditionsOriginal,/計９問から３問/);
 assert.match(f('materials-general').conditionsOriginal,/それぞれの科目.*３題.*２題/s);
 assert.doesNotMatch(f('materials-general-oral').subjectsOriginal,/筆答/);
 assert.doesNotMatch(f('materials-foreign').subjectsOriginal,/Written/);
 assert.ok(!f('mechanical-foreign'));
 assert.equal(data.records.filter(r=>r.universityId==='hokkaido'&&r.selectionName==='Master’s Program e3 Special Selection').length,6);
 const e3=f('mechanical-e3');assert.match(e3.conditionsOriginal,/January 21, 2026.*730/s);
 assert.ok(e3.sources.some(s=>s.pdfPage===9)&&e3.sources.some(s=>s.pdfPage===20));
 assert.doesNotMatch(e3.subjectsOriginal,/Written|CSC/);
});
test('Hokkaido Information Science retains five courses and supervisor-designated foreign questions',()=>{
 const rs=data.records.filter(r=>r.universityId==='hokkaido'&&r.graduateSchool==='情報科学院');
 assert.equal(new Set(rs.map(r=>r.department)).size,1);assert.equal(new Set(rs.map(r=>r.course)).size,5);
 const f=id=>rs.find(r=>r.id==='hokkaido-ist-'+id);
 assert.match(f('bio-general').conditionsOriginal,/３問のうち１問/);
 assert.match(f('bio-foreign').conditionsOriginal,/受入教員が指定/);
 assert.doesNotMatch(f('bio-foreign').scopeOriginal,/３.*問のうち.*１.*問を選択/);
 assert.match(f('cs-general').conditionsOriginal,/基礎数学と情報数学を含む３問/);
 assert.match(f('system-general').scopeOriginal,/離散時間系、時間遅れ要素を含む系は出題範囲外/);
 assert.match(f('electronics-general').subjectsOriginal,/電子回路/);
 assert.ok(f('bio-foreign').sources.some(s=>s.url.endsWith('R09_Apr_master_exam_f_Adm_Jp.pdf')&&s.pdfPage===4));
});
test('Hokkaido skips excluded fields while retaining engineering and its required chemistry subjects',()=>{
 const rs=data.records.filter(r=>r.universityId==='hokkaido');
 const allowed=new Set(['応用物理学専攻','材料科学専攻','機械宇宙工学専攻','人間機械システムデザイン専攻','エネルギー環境システム専攻','量子理工学専攻','情報科学専攻']);
 assert.ok(rs.every(r=>allowed.has(r.department)));
 assert.deepEqual(data.catalog.hokkaido.graduateSchools,['工学院','情報科学院']);
 assert.ok(!rs.some(r=>['理学院','総合化学院','環境科学院','生命科学院'].includes(r.graduateSchool)));
 const materials=rs.find(r=>r.id==='hokkaido-eng-materials-general');
 assert.match(materials.scopeOriginal,/化学/);
 assert.ok(rs.some(r=>r.department==='エネルギー環境システム専攻'));
 assert.equal(rs.filter(r=>r.publicationStatus==='pending')[0].department,'材料科学専攻');
});
test('Keio covers four graduate schools and seven official departments with 2027 sources and safe aliases',()=>{
 const rs=data.records.filter(r=>r.universityId==='keio');
 assert.equal(rs.length,77);assert.equal(new Set(rs.map(r=>r.graduateSchool)).size,4);
 assert.equal(new Set(rs.map(r=>r.graduateSchool+'/'+r.department)).size,7);
 assert.equal(rs.filter(r=>r.admissionType==='general').length,44);
 assert.equal(rs.filter(r=>r.admissionType==='international').length,33);
 assert.equal(rs.filter(r=>core.matchesAdmission(r,'international')).length,66);
 assert.ok(rs.every(r=>r.degreeProgram==='master'&&r.verifiedAt==='2026-10-09'&&['2027年4月','2027年9月'].includes(r.entryYear)&&!r.publicationStatus));
 assert.ok(rs.every(r=>r.sources.every(s=>new URL(s.url).hostname==='keio.ac.jp'||new URL(s.url).hostname.endsWith('.keio.ac.jp'))));
 for(const q of ['庆应','慶應','慶応','慶大','Keio University']){
  const hits=core.filter(data.records,data.universities,{...initial,query:q});
  assert.equal(hits.length,44);assert.ok(hits.every(r=>r.universityId==='keio'));
 }
 assert.equal(core.sourceURL({url:'https://www.kmd.keio.ac.jp/guide.pdf',kind:'pdf',pdfPage:8}),'https://www.kmd.keio.ac.jp/guide.pdf#page=8');
 for(const url of ['http://www.keio.ac.jp/a','https://keio.ac.jp.evil.test/a','https://evil-keio.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
test('Keio electrical common names find the existing official degree records in both admission views',()=>{
 for(const query of ['庆应 电气电子工学','慶應 電気電子工学','Keio Electronics and Electrical Engineering']){
  const general=core.filter(data.records,data.universities,{...initial,query});
  const international=core.filter(data.records,data.universities,{...initial,query,admissionType:'international'});
  assert.equal(general.length,3);assert.equal(international.length,5);
  assert.ok([...general,...international].every(r=>r.id.startsWith('keio-st-electrical-')&&r.department==='総合デザイン工学専攻'&&r.course==='教育研究分野：電気情報工学'));
  assert.equal(new Set([...general,...international].map(r=>r.id)).size,6);
 }
 const r=data.records.find(r=>r.id==='keio-st-electrical-august');
 assert.match(r.editorialNote,/电气电子方向对应当前正式招生分野/);
 assert.match(r.subjectsOriginal,/電気回路、情報工学、物性工学、数学/);
 assert.ok(r.sources.some(s=>s.kind==='page'&&s.url==='https://www.keio.ac.jp/ja/st/department/design-engineering/elec/'));
 assert.ok(core.validRecord(makeRecord({searchAliases:['电气电子工学']}),universities));
 for(const bad of ['电气电子工学',null,[''],[3]])assert.equal(core.validRecord(makeRecord({searchAliases:bad}),universities),false);
});
test('Keio uses current four-school reorganization and includes math, physics and material fields',()=>{
 const rs=data.records.filter(r=>r.universityId==='keio'&&r.graduateSchool==='理工学研究科');
 assert.equal(rs.length,66);
 assert.deepEqual([...new Set(rs.map(r=>r.department))],['先端数物科学専攻','総合デザイン工学専攻','人間・社会システム情報科学専攻','化学・生命情報科学専攻']);
 assert.deepEqual([...new Set(rs.map(r=>r.course))],['教育研究分野：物理情報工学','教育研究分野：機械工学','教育研究分野：電気情報工学','教育研究分野：システムデザイン工学','教育研究分野：オープンサイエンス','教育研究分野：管理工学','教育研究分野：数理科学','教育研究分野：物理学','教育研究分野：分子・生物化学','教育研究分野：創発理化学','教育研究分野：生命システム情報']);
 assert.ok(!rs.some(r=>['基礎理工学専攻','開放環境科学専攻'].includes(r.department)));
 assert.ok(rs.filter(r=>r.admissionType==='general').every(r=>r.sources.some(s=>s.url.includes('5e762733d929fc4a6d26bd2e314e3a71')&&s.pdfPage===1)));
 const system=rs.find(r=>r.id==='keio-st-system-design-august');
 assert.match(system.subjectsOriginal,/建築計画/);assert.match(system.conditionsOriginal,/5問から2問/);
});
test('Keio June, August and early admission preserve actual selection and elective differences',()=>{
 const f=id=>data.records.find(r=>r.id==='keio-st-'+id);
 assert.doesNotMatch(f('electrical-june').subjectsOriginal,/記述試問|GRE|TOEFL|TOEIC/);
 assert.match(f('electrical-june').conditionsOriginal,/書類審査のみ.*口述試問.*8月入学試験/s);
 assert.match(f('mechanical-august').conditionsOriginal,/機械力学・材料力学.*または熱力学・流体力学.*一方/s);
 assert.match(f('physico-august').conditionsOriginal,/全問解答/);
 assert.match(f('electrical-august').conditionsOriginal,/各1問、全問解答/);
 assert.match(f('industrial-august').conditionsOriginal,/必須.*2問.*7分野.*3問.*合計5問/s);
 assert.match(f('open-sciences-august').conditionsOriginal,/英語で出題される場合/);
 assert.match(f('electrical-august').conditionsOriginal,/2024年7月21日.*TOEIC L&R-IP/s);
 assert.ok(f('electrical-august').sources.some(s=>s.pdfPage===18));
 assert.doesNotMatch(f('electrical-early').subjectsOriginal,/記述試問|筆記/);
 assert.match(f('electrical-early').conditionsOriginal,/大学3年次.*2027年2月19日.*2025年1月27日/s);
 assert.ok(!f('electrical-early').internationalGeneral);
});
test('Keio added math, physics and materials keep their current written and non-written routes',()=>{
 const f=key=>data.records.find(r=>r.id==='keio-st-'+key+'-august');
 assert.match(f('math').scopeOriginal,/微分積分、線形代数、集合と位相の基礎、代数学の基礎.*全問解答/);
 assert.match(f('physics').scopeOriginal,/力学・解析力学・電磁気学、熱力学・統計力学、量子力学.*全問解答/);
 assert.match(f('molecular-chemical').scopeOriginal,/小論文形式.*全問解答/);
 assert.match(f('emerging-physico-chemistry').scopeOriginal,/論理的説明力・思考力.*全問解答/);
 for(const key of ['math','physics','molecular-chemical','emerging-physico-chemistry']) {
  const rs=data.records.filter(r=>r.id.startsWith('keio-st-'+key+'-'));
  assert.equal(rs.length,6);
  assert.doesNotMatch(rs.find(r=>r.id.endsWith('-june')).subjectsOriginal,/記述試問|微分積分|量子力学|有機化学/);
  assert.doesNotMatch(rs.find(r=>r.id.endsWith('-early')).subjectsOriginal,/記述試問|微分積分|量子力学|有機化学/);
  assert.equal(rs.filter(r=>r.admissionType==='international').length,3);
  assert.ok(f(key).sources.some(s=>s.pdfPage===18&&s.url.includes('eabf02ff')));
 }
 const materials=core.filter(data.records,data.universities,{...initial,query:'庆应 マテリアルデザイン科学'});
 assert.deepEqual([...new Set(materials.map(r=>r.course))].sort(),['教育研究分野：分子・生物化学','教育研究分野：創発理化学','教育研究分野：物理情報工学'].sort());
 assert.ok(materials.every(r=>r.sources.some(s=>s.url.endsWith('/24MDS.pdf'))));
 const mathOnly=core.filter(data.records,data.universities,{...initial,universityId:'keio',course:'教育研究分野：数理科学'});
 assert.equal(mathOnly.length,3);assert.ok(mathOnly.every(r=>r.id.startsWith('keio-st-math-')));
});
test('Keio Biosciences and Informatics fills the missing field without copying another field or selection paper',()=>{
 const rs=data.records.filter(r=>r.id.startsWith('keio-st-biosciences-informatics-'));
 assert.equal(rs.length,6);assert.ok(rs.every(r=>r.department==='化学・生命情報科学専攻'&&r.course==='教育研究分野：生命システム情報'));
 const august=rs.find(r=>r.id.endsWith('-august'));
 assert.match(august.scopeOriginal,/分子細胞生物学.*生物有機化学.*生化学.*生物物理化学.*情報の基礎.*バイオインフォマティクス.*全問解答/s);
 assert.doesNotMatch(august.scopeOriginal,/無機化学|卒業研究|小論文/);
 assert.ok(august.sources.some(s=>s.pdfPage===18&&s.url.includes('eabf02ff')));
 for(const route of ['june','early'])assert.doesNotMatch(rs.find(r=>r.id.endsWith('-'+route)).subjectsOriginal,/記述試問|分子細胞生物学|バイオインフォマティクス/);
 for(const query of ['庆应 生命システム情報','庆应 生物信息学','Keio Biosciences and Informatics']){
  const general=core.filter(data.records,data.universities,{...initial,query});
  const international=core.filter(data.records,data.universities,{...initial,query,admissionType:'international'});
  assert.equal(general.length,3);assert.equal(international.length,5);
  assert.ok([...general,...international].every(r=>rs.includes(r)));
 }
 assert.equal(data.catalog.keio.directionGuides.find(g=>g.label==='生命システム情報').query,'生命システム情報');
});
test('Keio IGP uses master document screening, GRE recommendations and actual period enrollment',()=>{
 const rs=data.records.filter(r=>r.universityId==='keio'&&r.admissionType==='international');
 assert.equal(rs.filter(r=>r.entryYear==='2027年4月').length,11);assert.equal(rs.filter(r=>r.entryYear==='2027年9月').length,22);
 assert.ok(rs.every(r=>r.originalLanguage==='en'&&r.subjectsOriginal.includes('GRE General Test')&&!/口述|筆記|Written examination/.test(r.subjectsOriginal)));
 assert.ok(rs.every(r=>/desirable score is 160 or higher/.test(r.scopeOriginal)&&/Subject Test: encouraged/.test(r.scopeOriginal)));
 assert.ok(rs.every(r=>/within two years/.test(r.conditionsOriginal)&&/official certification/.test(r.conditionsOriginal)&&r.sources.some(s=>s.pdfPage===13)));
 const second=rs.filter(r=>r.selectionName.endsWith('Period II'));assert.equal(second.length,11);
 assert.ok(second.every(r=>r.entryYear==='2027年9月'&&r.conditionsOriginal.includes('February 1–March 31, 2027')));
});
test('Keio SDM essays and KMD English interviews preserve separate language and contact rules',()=>{
 const sdm=data.records.filter(r=>r.universityId==='keio'&&r.graduateSchool==='システムデザイン・マネジメント研究科');
 assert.equal(sdm.length,5);assert.ok(sdm.every(r=>r.course==='リサーチインテンシブコース'&&/小論文試験・口頭試問/.test(r.subjectsOriginal)&&r.sources.some(s=>s.pdfPage===11)));
 assert.ok(sdm.filter(r=>r.entryYear==='2027年4月').every(r=>/日本語による受験が原則.*N1合格を推奨/s.test(r.conditionsOriginal)));
 assert.ok(sdm.filter(r=>r.entryYear==='2027年9月').every(r=>/英語による受験が原則/.test(r.conditionsOriginal)));
 const kmd=data.records.filter(r=>r.universityId==='keio'&&r.graduateSchool==='メディアデザイン研究科');
 assert.equal(kmd.length,2);assert.ok(kmd.every(r=>/英語・オンライン/.test(r.subjectsOriginal)&&/TOEIC等は受け付けない.*出願前連絡は任意/s.test(r.conditionsOriginal)));
 assert.ok(kmd.every(r=>/1ページ以内.*2ページ以内.*3ページ以内/s.test(r.conditionsOriginal)&&/Dream Futures in 2060/.test(r.scopeOriginal)&&r.sources.some(s=>s.pdfPage===8)));
});
test('Keio SFC overseas is a residence route with pre-interview and research video rather than foreign-only admission',()=>{
 const rs=data.records.filter(r=>r.universityId==='keio'&&r.graduateSchool==='政策・メディア研究科');
 assert.equal(rs.length,4);assert.ok(rs.every(r=>r.department==='政策・メディア専攻'&&r.course==='プログラム：サイバーインフォマティクス（CI）'&&r.admissionType==='general'&&r.internationalGeneral));
 const overseas=rs.filter(r=>r.selectionName.includes('海外出願'));assert.equal(overseas.length,2);
 assert.ok(overseas.every(r=>/国籍を問わず.*継続して日本国外.*オンライン面談.*必須.*2分以内.*50MB/s.test(r.conditionsOriginal)));
 assert.ok(overseas.every(r=>r.subjectsOriginal.includes('出願前：教員とのオンライン面談（必須）')&&r.sources.some(s=>s.pdfPage===18)));
 const domestic=rs.filter(r=>r.selectionName.includes('国内出願'));assert.ok(domestic.every(r=>r.subjectsOriginal.includes('2次選考：面接')));
 assert.ok(rs.every(r=>!r.subjectsOriginal.includes('新規授業科目企画書')));
});
test('all seventeen university catalogs have unique validated records and clear pending entry rules', () => {
  assert.equal(data.universities.length, 17);
  assert.equal(new Set(data.universities.map(u => u.id)).size, 17);
  assert.ok(data.records.length > 0);
  assert.equal(new Set(data.records.map(record => record.id)).size, data.records.length);
  assert.ok(data.records.every(record => core.validRecord(record, data.universities)));
  assert.ok(data.universities.every(university => data.records.some(record => record.universityId === university.id)));
  assert.equal(new Set(data.records.filter(record => record.universityId === 'utokyo').map(record => record.graduateSchool)).size, 5);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'kyoto').map(record => record.graduateSchool)).size, 4);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'waseda').map(record => record.graduateSchool)).size, 5);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'tus').map(record => record.graduateSchool)).size, 5);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'science-tokyo').map(record => record.graduateSchool)).size, 6);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'osaka').map(record => record.graduateSchool)).size, 4);
  const pending = data.records.filter(record => ['pending', 'unverified'].includes(record.publicationStatus));
  assert.ok(pending.every(record => !record.subjectsOriginal && !record.scopeOriginal && record.editorialNote));
  for (const record of data.records) for (const source of record.sources) {
    if (source.kind === 'pdf') assert.ok(Number.isInteger(source.pdfPage) && source.pdfPage > 0);
  }
  assert.ok(core.filter(data.records, data.universities, initial).length);
  assert.ok(core.filter(data.records, data.universities, { ...initial, admissionType: 'international' }).length);
});
test('Tohoku uses six official graduate schools and 34 departments with actual 2027 sources', () => {
  const records=data.records.filter(r=>r.universityId==='tohoku');
  assert.equal(records.length,100);
  assert.equal(new Set(records.map(r=>r.graduateSchool)).size,6);
  assert.equal(new Set(records.map(r=>r.graduateSchool+'/'+r.department)).size,34);
  assert.equal(records.filter(r=>r.admissionType==='general').length,56);
  assert.equal(records.filter(r=>r.publicationStatus==='pending').length,4);
  assert.equal(records.filter(r=>r.publicationStatus==='notice').length,1);
  assert.ok(records.every(r=>r.verifiedAt==='2026-10-06'&&['2027年4月','2027年10月'].includes(r.entryYear)));
  assert.ok(records.every(r=>r.sources.every(s=>new URL(s.url).hostname.endsWith('.tohoku.ac.jp'))));
  assert.equal(core.sourceURL({url:'https://www.eng.tohoku.ac.jp/a.pdf',kind:'pdf',pdfPage:15}),'https://www.eng.tohoku.ac.jp/a.pdf#page=15');
  for(const url of ['https://tohoku.ac.jp.evil.test/x','https://evil-tohoku.ac.jp/x','http://www.eng.tohoku.ac.jp/x'])assert.equal(core.sourceURL({url,kind:'page'}),null);
  const matches=core.filter(data.records,data.universities,{...initial,query:'东北大学 電磁気学'});
  assert.ok(matches.length&&matches.every(r=>r.universityId==='tohoku'));
});
test('Tohoku mechanical mathematics and material choice follow the current general tables', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  for(const id of ['mechanical','finemechanics','robotics','aerospace']){
    const r=find('eng-'+id+'-general');assert.match(r.subjectsOriginal,/数学Ａ.*数学Ｂ/s);
    assert.doesNotMatch(r.subjectsOriginal,/材料力学|熱力学|流体力学|面接/);
    assert.match(r.conditionsOriginal,/原則として面接は実施しない/);
    assert.ok(core.matchesAdmission(r,'international'));
  }
  assert.match(find('eng-quantum-general').scopeOriginal,/放射線基礎/);
  assert.match(find('eng-quantum-general').conditionsOriginal,/5科目から2科目/);
  assert.match(find('eng-metallurgy-general').conditionsOriginal,/5科目5題.*3題/);
  assert.match(find('env-materials-dept1-general').conditionsOriginal,/5科目5題.*3題/);
  assert.match(find('eng-applied-physics-general').scopeOriginal,/基礎科目：力学.*量子力学の3問.*専門科目：統計力学、物性物理の2問/s);
  assert.doesNotMatch(find('eng-technology-social-general').subjectsOriginal,/数学/);
});
test('Tohoku electrical subjects preserve graduate school choice and English score differences', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  assert.match(find('eng-electronics-general').conditionsOriginal,/6題から3題/);
  assert.match(find('eng-electronics-general').conditionsOriginal,/Home Edition.*認めない/);
  assert.match(find('eng-electronics-general').scopeOriginal,/Maxwell方程式.*計算機ソフトウェア.*ラプラス変換/s);
  assert.match(find('ist-group2-dept0-general').conditionsOriginal,/6題から2題.*3題から2題/s);
  assert.match(find('bme-electrical-general').conditionsOriginal,/6題から3題/);
  assert.match(find('bme-electrical-general').editorialNote,/Home Edition/);
  assert.match(find('ist-group2-dept0-general').editorialNote,/未列单独口述日程/);
  assert.match(find('ist-group2-dept0-foreign').subjectsOriginal,/口述試験/);
});
test('Tohoku information groups retain department mapping and different foreign examinations', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  const records=data.records.filter(r=>r.universityId==='tohoku'&&r.graduateSchool==='情報科学研究科');
  assert.equal(records.filter(r=>r.admissionType==='general').length,14);
  assert.equal(records.filter(r=>r.admissionType==='international'&&!r.publicationStatus).length,14);
  assert.equal(find('ist-group6-dept3-general').department,'応用情報科学専攻');
  assert.equal(find('ist-group4-dept2-general').department,'人間社会情報科学専攻');
  assert.doesNotMatch(find('ist-group1-dept0-general').subjectsOriginal,/TOEFL|TOEIC/);
  assert.match(find('ist-group1-dept0-foreign').subjectsOriginal,/TOEFL/);
  assert.doesNotMatch(find('ist-group3-dept0-general').conditionsOriginal,/79|730/);
  assert.match(find('ist-group3-dept0-foreign').conditionsOriginal,/79.*730/);
  assert.match(find('ist-group4-dept2-general').subjectsOriginal,/小論文/);
  assert.doesNotMatch(find('ist-group4-dept2-foreign').subjectsOriginal,/小論文/);
  assert.match(find('ist-group5-dept2-general').conditionsOriginal,/3問/);
  assert.match(find('ist-group5-dept2-foreign').conditionsOriginal,/2問/);
  assert.match(find('ist-group6-dept2-general').conditionsOriginal,/4題/);
  assert.match(find('ist-group6-dept2-foreign').conditionsOriginal,/3題/);
});
test('Tohoku life sciences distinguish first round foundational oral topics from second round', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  assert.match(find('life-brain-general-1').subjectsOriginal,/基礎学力試問/);
  assert.match(find('life-brain-general-1').scopeOriginal,/有機化学.*生態学.*微生物学/s);
  assert.match(find('life-brain-foreign-1').conditionsOriginal,/第一志望分野/);
  for(const id of ['life-brain-general-2','life-brain-foreign-2']){
    assert.ok(!find(id).scopeOriginal);
    assert.doesNotMatch(find(id).subjectsOriginal,/基礎学力試問|筆記/);
  }
  assert.ok(!data.records.some(r=>r.universityId==='tohoku'&&r.graduateSchool==='理学研究科'&&r.department.includes('生物')));
});
test('Tohoku English programs retain independent masters, actual subject choices and announcement status', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  assert.equal(find('eng-iceec').entryYear,'2027年10月');
  assert.equal(find('eng-iceec').degreeProgram,'master');
  assert.match(find('eng-iceec').subjectsOriginal,/oral examination/);
  assert.match(find('eng-sdtm-architecture').scopeOriginal,/Structural Engineering for Building/);
  assert.equal(find('ist-sdtm-notice').publicationStatus,'notice');
  assert.ok(!find('ist-sdtm-notice').subjectsOriginal&&!find('ist-sdtm-notice').scopeOriginal);
  assert.ok(!find('eng-mechanical-imac-pending').subjectsOriginal&&!find('eng-mechanical-imac-pending').scopeOriginal);
  assert.match(find('sci-astronomy-igpas').conditionsOriginal,/Physics/);
  assert.match(find('sci-geophysics-igpas').conditionsOriginal,/Mathematics or Physics/);
  assert.ok(!find('sci-physics-igpas').scopeOriginal);
  assert.ok(!find('sci-physics-foreign').scopeOriginal);
  assert.match(find('sci-math-general').scopeOriginal,/集合と位相.*読解/s);
  assert.ok(find('sci-math-general').sources.some(s=>s.url.endsWith('/mc2027_math.docx')));
  assert.ok(!find('sci-math-general').sources.some(s=>s.url.includes('r3-4mc_math.pdf')));
});
test('Tohoku environmental and biomedical selections do not inherit unrelated general or doctoral papers', () => {
  const find=id=>data.records.find(r=>r.id==='tohoku-'+id);
  assert.match(find('env-energy-dept0-general').conditionsOriginal,/合計6題.*4題/);
  assert.ok(find('env-energy-dept0-general').sources.some(s=>s.pdfPage===1&&s.url.endsWith('/202604_energy_kwe.pdf')));
  assert.equal(find('env-human-security-disaster').department,'先端環境創成学専攻');
  assert.doesNotMatch(find('env-human-security-disaster').subjectsOriginal,/written/);
  assert.ok(!find('env-ieslp-dept0').subjectsOriginal&&!find('env-ieslp-dept0').scopeOriginal);
  assert.ok(!find('env-comprehensive-dept0-general').scopeOriginal);
  assert.match(find('bme-medical-general').conditionsOriginal,/7科目.*2科目/);
  assert.match(find('bme-medical-general').scopeOriginal,/確率統計学/);
  assert.doesNotMatch(find('bme-medical-general').subjectsOriginal,/面接|口述/);
});
test('Osaka keeps actual seasonal routes and the distinct winter subjects', () => {
  const records = data.records.filter(record => record.universityId === 'osaka');
  const find = id => records.find(record => record.id === 'osaka-' + id);
  assert.equal(records.length, 108);
  assert.equal(new Set(records.map(record => record.graduateSchool + '/' + record.department)).size, 20);
  const winter = records.filter(record => record.graduateSchool === '工学研究科' && record.selectionName === '外国人留学生特別選抜（冬季入学試験）');
  assert.equal(winter.length, 5);
  assert.match(find('eng-environment-foreign-summer').subjectsOriginal, /小論文/);
  assert.doesNotMatch(find('eng-environment-foreign-winter').subjectsOriginal, /小論文/);
  assert.match(find('eng-ap-foreign-winter').scopeOriginal, /微分方程式/);
  assert.match(find('eng-ap-foreign-summer').scopeOriginal, /解析学/);
  assert.ok(!find('eng-ee-english-october-winter'));
  assert.ok(!find('eng-earth-english-october-winter'));
  assert.ok(!find('eng-mech-english-october-spring'));
  assert.ok(find('eng-ee-english-october-spring'));
  assert.ok(find('eng-mech-english-october-winter'));
  assert.match(find('eng-phys-english-october-spring').editorialNote, /Department of Applied Physics/);
  assert.ok(records.filter(record => record.graduateSchool === '工学研究科' && record.admissionType === 'general').every(record => !core.matchesAdmission(record, 'international')));
  assert.equal(core.sourceURL({url:'https://www.eng.osaka-u.ac.jp/a.pdf',kind:'pdf',pdfPage:4}), 'https://www.eng.osaka-u.ac.jp/a.pdf#page=4');
  assert.equal(core.sourceURL({url:'https://osaka-u.ac.jp.example.com/a.pdf',kind:'pdf',pdfPage:4}), null);
});
test('Osaka retains the 2027 reorganization, cross-field choice and independent special selection conditions', () => {
  const records = data.records.filter(record => record.universityId === 'osaka');
  const find = id => records.find(record => record.id === 'osaka-' + id);
  assert.deepEqual([...new Set(records.filter(record => record.graduateSchool === '情報科学研究科').map(record => record.department))].sort(), ['情報基礎数学専攻','情報科学専攻'].sort());
  assert.match(find('ist-information-general').scopeOriginal, /以下の5科目から2科目選択/);
  assert.match(find('ist-information-general').scopeOriginal, /必須問題.*1 アルゴリズムとプログラミング／2 計算機システム/s);
  assert.match(find('ist-math-general').subjectsOriginal, /数学、英語/);
  assert.match(find('ist-math-general').conditionsOriginal, /提出する必要はありません/);
  assert.ok(!find('ist-information-foreign-winter').scopeOriginal);
  assert.ok(!find('ist-math-english'));
  assert.match(find('es-materials-general').conditionsOriginal, /志望専攻領域に関係なく/);
  assert.match(find('es-materials-general').scopeOriginal, /３問すべてを解答/);
  assert.match(find('es-materials-general').scopeOriginal, /３問から２問を選択/);
  assert.ok(!find('es-materials-foreign').scopeOriginal);
  assert.match(find('es-materials-foreign').editorialNote, /研究生.*N1／N2/);
  assert.equal(find('es-materials-english-april').degreeProgram, 'master');
});
test('Osaka Science separates the second admission and the master columns of English programs', () => {
  const find = id => data.records.find(record => record.id === 'osaka-' + id);
  assert.match(find('sci-earth-general').subjectsOriginal, /物理/);
  assert.match(find('sci-earth-second').subjectsOriginal, /口頭試問/);
  assert.doesNotMatch(find('sci-earth-second').subjectsOriginal, /物理|筆記/);
  assert.equal(find('sci-biology-second-notice').publicationStatus, 'notice');
  assert.ok(!find('sci-biology-second-notice').subjectsOriginal && !find('sci-biology-second-notice').scopeOriginal);
  assert.match(find('sci-physics-ipc').scopeOriginal, /classical mechanics.*quantum mechanics/);
  assert.match(find('sci-chemistry-sisc').subjectsOriginal, /paper-based tests/);
  assert.equal(find('sci-chemistry-sisc').degreeProgram, 'master');
  assert.ok(find('sci-math-general').sources.some(source => source.url.endsWith('01.MC202704youkou-new.pdf')));
});
test('Science Tokyo distinguishes A and B schedules, English examinations, electives and Earth-Life admission conditions', () => {
  const records = data.records.filter(record => record.universityId === 'science-tokyo');
  const find = id => records.find(record => record.id === 'science-' + id);
  assert.equal(new Set(records.map(record => record.graduateSchool + '/' + record.department)).size, 18);
  assert.ok(records.every(record => record.department.endsWith('系') && !record.graduateSchool.includes('研究科')));
  for (const key of ['math','phys','shs']) assert.ok(!find(key + '-a'));
  assert.match(find('math-b').subjectsOriginal, /英語筆答試験/);
  assert.match(find('math-b').conditionsOriginal, /免除は行いません/);
  assert.doesNotMatch(find('math-b').subjectsOriginal, /英語外部試験/);
  assert.match(find('shs-b').subjectsOriginal, /口頭試問/);
  assert.doesNotMatch(find('shs-b').subjectsOriginal, /筆答試験/);
  assert.match(find('shs-b').conditionsOriginal, /筆答試験 実施しません/);
  assert.match(find('phys-b').scopeOriginal, /物理学実験/);
  assert.match(find('phys-b').conditionsOriginal, /筆答試験当日に持参/);
  assert.match(find('chem-b').scopeOriginal, /計６題から２題/);
  assert.match(find('ee-b').scopeOriginal, /数学（微分方程式/);
  assert.match(find('ee-b').scopeOriginal, /二分野より 1 つ/);
  assert.match(find('ee-b').scopeOriginal, /量子力学\/物性基礎/);
  assert.doesNotMatch(find('ee-a').scopeOriginal, /選択専門科目/);
  assert.match(find('mat-b').scopeOriginal, /各ブロックから、それぞれ 2 問/);
  assert.match(find('cap-b').conditionsOriginal, /同じ科目を選択しても、違う科目/);
  assert.match(find('cap-b').scopeOriginal, /それぞれの時間枠/);
  assert.match(find('is-b').scopeOriginal, /数問の選択/);
  assert.doesNotMatch(find('is-b').scopeOriginal, /12問|１２問|6問|６問/);
  assert.match(find('cs-b').scopeOriginal, /各 1 問、合計 3 問/);
  assert.match(find('cs-b').conditionsOriginal, /日本語で解答すること/);
  assert.match(find('bio-b').scopeOriginal, /合計 8 題中 4 題/);
  assert.match(find('arch-b').scopeOriginal, /計 12 問を出題 全問必答/);
  assert.match(find('arch-b').conditionsOriginal, /全ての指導教員が共通して指定/);
  assert.ok(find('arch-b').sources.some(source => source.pdfPage === 61));
  assert.ok(find('arch-b').sources.some(source => source.pdfPage === 62));
  assert.match(find('tse-b').scopeOriginal, /午前（90 分）：問題 A\n以下の３科目/);
  assert.match(find('tse-b').scopeOriginal, /午後（90 分）：問題 B\n以下の２科目/);
  assert.match(find('eps-earth-life').conditionsOriginal, /A 日程試験で合格する必要/);
  assert.match(find('bio-earth-life').conditionsOriginal, /必要に応じて/);
  assert.match(find('cap-earth-life').conditionsOriginal, /別途英語による選考会/);
  for (const record of records.filter(record => record.admissionType === 'general' && !record.course)) {
    assert.match(record.conditionsOriginal, /志願者は選択できません/);
    if (record.department !== '数学系') {
      assert.match(record.conditionsOriginal, /TOEFL iBT Home Edition/);
      assert.match(record.conditionsOriginal, /TOEFL-ITPやTOEIC-IP.*有効ではありません/);
    }
  }
  const matches = core.filter(data.records, data.universities, { ...initial, query: '东科 電磁気学' });
  assert.ok(matches.length && matches.every(record => record.universityId === 'science-tokyo'));
});
test('Science Tokyo international routes follow current master and integrated program tables rather than doctoral-only descriptions', () => {
  const records = data.records.filter(record => record.universityId === 'science-tokyo' && record.admissionType === 'international');
  const find = id => records.find(record => record.id === 'science-' + id);
  assert.equal(records.length, 34);
  assert.ok(!records.some(record => /IGP\(B\)|Program \(B\)/.test(record.selectionName)));
  assert.ok(!records.some(record => /igpc/.test(record.id) && ['数学系','化学系','社会・人間科学系'].includes(record.department)));
  assert.ok(!records.some(record => /igpa/.test(record.id) && record.graduateSchool === '情報理工学院'));
  assert.equal(records.filter(record => /igpa-m$/.test(record.id)).length, 2);
  for (const key of ['arch','cv']) assert.equal(find(key+'-igpa-m').degreeProgram, 'master');
  for (const key of ['math','phys','chem','eps','mech','sc','ee','ict','iee','mat','cap','bio']) {
    assert.ok(!find(key+'-igpa-m'));
    assert.equal(find(key+'-igpa-md').degreeProgram, 'integrated');
  }
  assert.deepEqual(records.filter(record => /igpc-md$/.test(record.id)).map(record => record.department).sort(), ['応用化学系','地球惑星科学系','生命理工学系'].sort());
  assert.ok(records.filter(record => /igpc-md$/.test(record.id)).every(record => record.course.includes('Earth-Life Science')));
  for (const record of records) {
    assert.equal(record.originalLanguage, 'en');
    assert.match(record.scopeOriginal, /format and content vary by department/);
    assert.doesNotMatch(record.subjectsOriginal, /TOEIC|TOEFL|数学|電磁気学/);
    assert.equal(record.entryYear, record.id.includes('-igpa-') ? '2027年秋' : '2027年4月');
    if (record.degreeProgram === 'integrated') assert.match(record.selectionName, /Integrated Doctoral Education Program/);
  }
});
test('TUS uses current departments and master-only foreign routes without inheriting general examination choices', () => {
  const records = data.records.filter(record => record.universityId === 'tus');
  const find = id => records.find(record => record.id === 'tus-' + id);
  const active = records.filter(record => record.publicationStatus !== 'closed');
  assert.equal(new Set(active.map(record => record.graduateSchool + '/' + record.department)).size, 26);
  assert.equal(active.length, 54);
  assert.equal(active.filter(record => record.admissionType === 'international').length, 26);
  assert.ok(!records.some(record => record.department === '科学教育専攻' && record.admissionType === 'international'));
  assert.match(find('sci-education').selectionName, /卒業見込者（含既卒者）対象/);
  assert.match(find('creative-information').conditionsOriginal, /13科目の中から４科目/);
  assert.match(find('creative-information-foreign').subjectsOriginal, /希望専攻分野に関する口頭試問/);
  assert.doesNotMatch(find('creative-information-foreign').subjectsOriginal, /筆記/);
  assert.equal(find('creative-information-foreign').scopeOriginal, undefined);
  assert.match(find('creative-mechanical-foreign').scopeOriginal, /２科目選択/);
  assert.doesNotMatch(find('creative-mechanical').scopeOriginal, /選択/);
  assert.match(find('eng-architecture').conditionsOriginal, /専門科目A/);
  assert.match(find('eng-architecture').conditionsOriginal, /専門科目B/);
  assert.match(find('eng-architecture-foreign').subjectsOriginal, /英語（筆記）/);
  assert.doesNotMatch(find('eng-architecture-foreign').subjectsOriginal, /TOEIC|TOEFL/);
  assert.match(find('eng-architecture-foreign').scopeOriginal, /１科目/);
  assert.match(find('creative-civil').conditionsOriginal, /数学および専門科目の受験に代える/);
  assert.doesNotMatch(find('creative-civil').conditionsOriginal, /小論文.*代える|面接.*代える/);
  for (const id of ['advanced-physics', 'advanced-physics-foreign', 'advanced-design-foreign', 'life-foreign']) {
    assert.match(find(id).subjectsOriginal, /口頭試問/);
    assert.doesNotMatch(find(id).subjectsOriginal, /筆記試験/);
  }
  assert.equal(find('life-foreign').scopeOriginal, undefined);
  assert.match(find('sci-math').conditionsOriginal, /TOEIC IPも可/);
  assert.ok(find('sci-math-foreign').sources.some(source => source.url.endsWith('20260403_0103.pdf')));
  for (const record of records.filter(record => record.department === '国際火災科学専攻')) {
    assert.equal(record.entryYear, '2027年4月');
    assert.match(record.scopeOriginal, /多項式関数に限る/);
    assert.ok(!record.sources.some(source => source.url.includes('2028')));
    if (record.admissionType === 'international') {
      assert.ok(record.sources.some(source => source.url.endsWith('00_2027_foreign_student_shushi_globalfire.pdf') && source.pdfPage === 5));
      assert.ok(!record.sources.some(source => source.url.endsWith('2027_foreign_student_grad.pdf')));
      assert.doesNotMatch(record.subjectsOriginal, /第一次選考/);
      assert.match(record.conditionsOriginal, /IPテストは不可/);
    }
  }
  for (const id of ['creative-computing-closed', 'creative-management-closed']) {
    const record = find(id);
    assert.equal(record.publicationStatus, 'closed');
    assert.ok(!record.subjectsOriginal && !record.scopeOriginal && !record.internationalGeneral);
    assert.ok(!active.some(activeRecord => activeRecord.department === record.department));
  }
  const matches = core.filter(data.records, data.universities, { ...initial, query: '东理 電磁気学' });
  assert.ok(matches.length && matches.every(record => record.universityId === 'tus'));
});
test('Kyoto uses current official departments, separate selection rules and master-only international routes', () => {
  const kyoto = data.records.filter(record => record.universityId === 'kyoto');
  const find = id => kyoto.find(record => record.id === 'kyoto-' + id);
  assert.equal(new Set(kyoto.map(record => record.department)).size, 21);
  assert.equal(new Set(kyoto.filter(record => record.graduateSchool === '工学研究科').map(record => record.department)).size, 11);
  const info = kyoto.filter(record => record.graduateSchool === '情報学研究科');
  assert.equal(info.length, 7); assert.ok(info.every(record => record.department === '情報学専攻'));
  assert.equal(new Set(info.map(record => record.course)).size, 7);
  assert.ok(!kyoto.some(record => ['地球工学専攻', '材料化学専攻', '高分子化学専攻'].includes(record.department)));
  assert.match(find('eng-ee').scopeOriginal, /5 題から 4 題/);
  assert.match(find('eng-ee').scopeOriginal, /4 題から 3 題/);
  assert.match(find('eng-civil').conditionsOriginal, /3 科目/);
  assert.match(find('eng-civil-type1').conditionsOriginal, /2 科目/);
  assert.match(find('eng-civil-type2').conditionsOriginal, /1 科目/);
  assert.doesNotMatch(find('eng-nuclear').subjectsOriginal, /口頭試問/);
  assert.match(find('eng-nuclear').scopeOriginal, /計 3 問/);
  assert.match(find('eng-chem-creation').scopeOriginal, /高分子化学（必須）/);
  assert.match(find('eng-chem-winter-polymer').scopeOriginal, /高分子合成・高分子物性/);
  assert.equal(find('eng-chem-winter-polymer').publicationStatus, 'notice');
  assert.doesNotMatch(find('eng-chem-winter-polymer').subjectsOriginal, /口頭試問/);
  assert.equal(kyoto.filter(record => record.publicationStatus === 'notice').length, 7);
  for (const record of kyoto.filter(record => record.publicationStatus === 'notice')) {
    assert.ok(record.subjectsOriginal && record.editorialNote.includes('预告') && record.editorialNote.includes('完整'));
  }
  assert.match(find('energy-foundation-1').scopeOriginal, /9 科目から 2/);
  assert.match(find('energy-foundation-1').scopeOriginal, /熱・統計力学と物理化学/);
  assert.match(find('energy-foundation-2').scopeOriginal, /物理系、化学系/);
  assert.doesNotMatch(find('energy-foundation-2').scopeOriginal, /9 科目/);
  assert.doesNotMatch(find('info-advanced-math').subjectsOriginal, /英語/);
  for (const id of ['info-communication', 'info-data']) assert.doesNotMatch(find(id).subjectsOriginal, /口頭試問/);
  assert.match(find('sci-primate-1').scopeOriginal, /oral examinations/);
  assert.doesNotMatch(find('sci-primate-1').scopeOriginal, /２２問|２問/);
  assert.equal(find('sci-primate-2').entryYear, '2027年10月');
  const iesc = kyoto.filter(record => record.course === '国際エネルギー科学コース');
  assert.equal(iesc.length, 3);
  assert.ok(iesc.every(record => record.department !== 'エネルギー応用科学専攻' && record.entryYear === '2027年10月'));
  const aliasMatches = core.filter(data.records, data.universities, {...initial, query: '京大 電磁気学'});
  assert.ok(aliasMatches.length && aliasMatches.every(record => record.universityId === 'kyoto'));
});
test('Waseda keeps master eligibility, examination options and distinct AO rules', () => {
  const records = data.records.filter(record => record.universityId === 'waseda');
  const find = id => records.find(record => record.id === 'waseda-' + id);
  const ao = records.filter(record => record.id.endsWith('-ao'));
  assert.equal(ao.length, 15);
  assert.ok(!ao.some(record => ['材料科学専攻', '経営システム工学専攻', '経営デザイン専攻', '共同原子力専攻', 'ナノ理工学専攻'].includes(record.department)));
  assert.ok(!records.some(record => ['先進理工学専攻', '共同先端生命医科学専攻', '共同先進健康科学専攻'].includes(record.department)));
  assert.match(find('electronic-physical').scopeOriginal, /1 次元系に限定し、スピン自由度は含まない/);
  assert.match(find('electronic-physical').scopeOriginal, /回路の過渡現象/);
  assert.doesNotMatch(find('electronic-physical').subjectsOriginal, /英語|数学/);
  assert.match(find('electronic-physical').conditionsOriginal, /550 以上/);
  assert.match(find('electronic-physical-ao').conditionsOriginal, /800 recommended/);
  assert.match(find('electronic-physical-ao').subjectsOriginal, /Interviews may be conducted/);
  assert.doesNotMatch(find('electronic-physical-ao').subjectsOriginal, /力学|電磁気学|回路理論/);
  assert.match(find('intermedia').conditionsOriginal, /工学部門」2 問と「インターメディア芸術部門」1 問/);
  assert.match(find('modern-mechanical').conditionsOriginal, /同一科目でも可/);
  assert.match(find('architecture').conditionsOriginal, /志望研究指導ごと/);
  assert.match(find('computer-communications').conditionsOriginal, /全 4 題を全問/);
  assert.match(find('integrative-bioscience').subjectsOriginal, /①生命理工学専攻以外/);
  assert.match(find('integrative-bioscience').conditionsOriginal, /②生命理工学専攻の試験問題/);
  assert.match(find('nuclear').conditionsOriginal, /6 題より 4 題/);
  assert.match(find('environment-ao-2').conditionsOriginal, /日本国外在住者は、2月入試には出願できません/);
  assert.equal(find('environment-ao-2').entryYear, '2027年4月');
  assert.match(find('environment').conditionsOriginal, /N2 合格以上/);
  assert.match(find('environment-foreign-11').conditionsOriginal, /N1 以上/);
  assert.match(find('environment-foreign-11').conditionsOriginal, /海外協定校/);
  assert.match(find('environment-foreign-11').subjectsOriginal, /出願書類を基に/);
  assert.doesNotMatch(find('environment-foreign-11').subjectsOriginal, /口述|面接|筆記/);
  assert.ok(find('environment-ao-2').sources.some(source => source.pdfPage === 14 && source.label.includes('日本語')));
  for (const id of ['ips-apr', 'ips-sep']) {
    assert.equal(find(id).department, '情報生産システム工学専攻');
    assert.equal(find(id).admissionType, 'general');
    assert.match(find(id).conditionsOriginal, /面接が必要と判断された者/);
    assert.doesNotMatch(find(id).subjectsOriginal, /数学|筆記|物理/);
  }
  assert.equal(find('ips-sep').entryYear, '2027年9月');
  assert.equal(find('nano-closed').publicationStatus, 'closed');
  assert.equal(find('nano-closed').entryYear, '2027年4月入学以降');
  assert.ok(!find('nano-closed').subjectsOriginal && !find('nano-closed').scopeOriginal && !find('nano-closed').internationalGeneral);
  const matches = core.filter(data.records, data.universities, { ...initial, query: '早大 電磁気学' });
  assert.ok(matches.length && matches.every(record => record.universityId === 'waseda'));
});
test('general and international admissions remain separate even for same department', () => {
  const general = makeRecord(); const international = makeRecord({ id: 'qa-int', admissionType: 'international', selectionName: 'Fixture international route', subjectsOriginal: '口述試験' });
  assert.deepEqual(core.filter([general, international], universities, initial), [general]);
  assert.deepEqual(core.filter([general, international], universities, { ...initial, admissionType: 'international' }), [international]);
});
test('an eligible general route is discoverable by foreign applicants without changing its official selection', () => {
  const general = makeRecord({ internationalGeneral: true }); const special = makeRecord({ id: 'qa-int', admissionType: 'international' });
  assert.deepEqual(core.filter([general, special], universities, { ...initial, admissionType: 'international' }), [general, special]);
  assert.deepEqual(core.filter([general, special], universities, initial), [general]);
  assert.equal(general.admissionType, 'general'); assert.equal(general.selectionName, 'Fixture selection');
});
test('summer and winter Tokyo requirements cannot inherit the other timetable or a doctoral-only route', () => {
  const find = id => data.records.find(record => record.id === 'utokyo-' + id);
  assert.match(find('info-ci').subjectsOriginal, /数学またはプログラミング/);
  assert.match(find('info-ci-winter').subjectsOriginal, /プログラミング/);
  assert.doesNotMatch(find('info-ci-winter').subjectsOriginal, /数学/);
  assert.doesNotMatch(find('info-ipc-winter').subjectsOriginal, /筆記/);
  assert.ok(!data.records.some(record => record.graduateSchool === '情報理工学系研究科' && ['電子情報学専攻', '数理情報学専攻'].includes(record.department) && record.selectionName === '冬入試'));
  assert.doesNotMatch(find('eng-ee').subjectsOriginal, /一般教育科目/);
  assert.match(find('frontier-he-int').conditionsOriginal, /筆記試験および口述試験は課されない/);
});
test('combined filtering supports school aliases, full names, year and exact program', () => {
  const record = makeRecord(); const other = makeRecord({ id: 'qa-other', department: 'Other Department', entryYear: '2028年4月' });
  assert.deepEqual(core.filter([record, other], universities, { ...initial, query: 'ＱＡ 数学', department: record.department, entryYear: record.entryYear }), [record]);
  assert.equal(core.filter([record], universities, { ...initial, universityId: 'missing' }).length, 0);
  assert.equal(core.filter([record], universities, { ...initial, query: 'unknown term' }).length, 0);
  assert.equal(core.filter([record], universities, { ...initial, graduateSchool: 'other' }).length, 0);
});
test('filtering does not rewrite official strings or mutate source records', () => {
  const record = makeRecord(); const before = JSON.stringify(record);
  assert.equal(core.filter([record], universities, { ...initial, query: 'A < B' })[0].scopeOriginal, 'A < B & C');
  assert.equal(JSON.stringify(record), before);
});
test('official PDF page links are retained and unsafe or lookalike URLs are rejected', () => {
  assert.equal(core.sourceURL(makeRecord().sources[0]), 'https://www.t.u-tokyo.ac.jp/fixture.pdf#page=3');
  for (const url of ['javascript:alert(1)', 'http://www.tus.ac.jp/file.pdf', 'https://tus.ac.jp.evil.example/file.pdf', 'https://evil-tus.ac.jp/file.pdf', 'https://user:secret@www.tus.ac.jp/file.pdf', 'not a url']) assert.equal(core.sourceURL({ kind: 'pdf', url }), null);
  assert.equal(core.sourceURL({ kind: 'page', url: 'https://www.waseda.jp/fsci/' }), 'https://www.waseda.jp/fsci/');
});
test('unverified or incomplete records cannot enter the reader', () => {
  const record = makeRecord(); assert.equal(core.validRecord(record, universities), true);
  for (const changes of [{ verifiedAt: '' }, { selectionName: '' }, { graduateSchool: '' }, { department: '' }, { entryYear: '' }, { universityId: 'missing' }, { admissionType: 'unknown' }, { sources: [] }, { sources: [{ label: 'Unsafe', kind: 'page', url: 'https://example.com/' }] }]) assert.equal(core.validRecord({ ...record, ...changes }, universities), false);
});
test('all exam page assets and navigation targets exist with unique HTML ids', () => {
  const root = path.join(__dirname, '..');
  for (const name of ['index.html', 'practice.html', 'exam-scope.html']) {
    const html = fs.readFileSync(path.join(root, name), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]); assert.equal(new Set(ids).size, ids.length);
    for (const match of html.matchAll(/\b(?:src|href)="([^"#]+)"/g)) {
      const url = match[1]; if (/^(?:https?:|data:)/.test(url)) continue;
      assert.ok(fs.existsSync(path.join(root, url.split(/[?#]/)[0])), name + ': ' + url);
    }
    assert.ok(html.includes('href="exam-scope.html"'));
  }
});

