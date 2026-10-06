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

test('all seven university catalogs have unique validated records and clear pending entry rules', () => {
  assert.equal(data.universities.length, 7);
  assert.equal(new Set(data.universities.map(u => u.id)).size, 7);
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
