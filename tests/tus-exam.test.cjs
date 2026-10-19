const test = require('node:test'), assert = require('node:assert/strict');
const data = require('../exam-scope-data.js'), core = require('../exam-scope-core.js');
const rs = data.records.filter(r => r.universityId === 'tus');
const find = id => rs.find(r => r.id === 'tus-' + id);
const added = ['management-summer', 'management-winter', 'management-foreign', 'pharma-science', 'pharma-science-foreign'].map(find);
const bounds = {
  '00_2027_shushi_buisiness_20260803.pdf': 23,
  '2027_sikenkamoku_keiei.pdf': 1,
  '00_2027_shushi_ippan_20260803.pdf': 60,
  '2027_foreign_student_grad.pdf': 55,
  'TOEFLiBT_GraduateAdmission_20260803.pdf': 1,
  '20260403_0103.pdf': 1
};

test('TUS keeps the original fifty-six records and adds only the two past-paper gaps', () => {
  assert.equal(rs.length, 61);
  assert.equal(added.filter(Boolean).length, 5);
  assert.equal(rs.filter(r => !added.includes(r)).length, 56);
  assert.equal(new Set(rs.map(r => r.graduateSchool)).size, 7);
  assert.deepEqual(data.catalog.tus.graduateSchools.slice(-2), ['薬学研究科', '経営学研究科']);
  assert.ok(added.every(r => r.entryYear === '2027年4月' && r.verifiedAt === '2026-10-19' && r.originalLanguage === 'ja' && !r.publicationStatus));
  assert.ok(!rs.some(r => /技術経営|MOT|推薦入学|社会人特別/.test(r.selectionName + r.department)));
  const state = { universityId: 'tus', admissionType: 'general', graduateSchool: 'all', department: 'all', entryYear: 'all', query: '' };
  assert.equal(core.filter(data.records, data.universities, { ...state, department: '経営学専攻' }).length, 2);
  assert.equal(core.filter(data.records, data.universities, { ...state, admissionType: 'international', department: '経営学専攻' }).length, 3);
  assert.equal(core.filter(data.records, data.universities, { ...state, department: '薬科学専攻' }).length, 1);
  assert.equal(core.filter(data.records, data.universities, { ...state, admissionType: 'international', department: '薬科学専攻' }).length, 2);
});

test('management summer and winter share the official seven-subject range without inventing question counts', () => {
  for (const id of ['management-summer', 'management-winter']) {
    const r = find(id);
    assert.equal(r.graduateSchool, '経営学研究科');
    assert.equal(r.admissionType, 'general');
    assert.equal(r.internationalGeneral, true);
    assert.match(r.scopeOriginal, /７科目/);
    assert.match(r.scopeOriginal, /経営管理 新版/);
    assert.match(r.scopeOriginal, /１～３章/);
    assert.match(r.conditionsOriginal, /志望研究室の指定する科目から１科目選択/);
    assert.match(r.conditionsOriginal, /経営一般（企業経営に関する小論文）/);
    assert.match(r.conditionsOriginal, /TOEIC IP/);
    assert.match(r.conditionsOriginal, /Home Editionは不可/);
    assert.doesNotMatch(r.scopeOriginal, /全問|題選択|問を選択/);
    assert.ok(r.sources.some(s => s.url.endsWith('00_2027_shushi_buisiness_20260803.pdf') && s.pdfPage === 5));
    assert.ok(r.sources.some(s => s.url.endsWith('2027_sikenkamoku_keiei.pdf') && s.pdfPage === 1));
  }
  assert.match(find('management-summer').selectionName, /夏期日程/);
  assert.doesNotMatch(find('management-summer').editorialNote, /G372/);
  assert.ok(!find('management-summer').sources.some(s => s.url.includes('TOEFLiBT')));
  assert.match(find('management-winter').selectionName, /冬期日程/);
  assert.match(find('management-winter').editorialNote, /G372/);
  assert.match(find('management-winter').editorialNote, /若干名/);
  assert.ok(find('management-winter').sources.some(s => s.url.endsWith('TOEFLiBT_GraduateAdmission_20260803.pdf') && s.pdfPage === 1));
});

test('management foreign oral examination does not inherit the general written papers', () => {
  const r = find('management-foreign');
  assert.equal(r.admissionType, 'international');
  assert.equal(r.internationalGeneral, undefined);
  assert.equal(r.scopeOriginal, undefined);
  assert.match(r.subjectsOriginal, /希望専攻分野に関する口頭試問/);
  assert.doesNotMatch(r.subjectsOriginal, /筆記|７科目|マーケティング/);
  assert.doesNotMatch((r.conditionsOriginal || '') + (r.editorialNote || ''), /経営管理 新版|１～３章/);
  assert.match(r.conditionsOriginal, /IPテスト、Bridgeは不可/);
  assert.match(r.editorialNote, /0438/);
  assert.doesNotMatch(r.conditionsOriginal, /TOEIC IP、/);
});

test('pharmaceutical science keeps the general lecture limit separate from the foreign waiver', () => {
  const general = find('pharma-science');
  assert.equal(general.admissionType, 'general');
  assert.equal(general.internationalGeneral, true);
  assert.match(general.subjectsOriginal, /有機化学、物理化学、生物科学/);
  assert.match(general.scopeOriginal, /薬品物理化学、分析化学/);
  assert.match(general.scopeOriginal, /２年次までの講義内容/);
  assert.match(general.conditionsOriginal, /ITPのいずれも可/);
  assert.match(general.editorialNote, /题数和选答/);
  assert.doesNotMatch(general.scopeOriginal, /問選択|全問/);
  assert.ok(general.sources.some(s => s.pdfPage === 13 && s.url.endsWith('00_2027_shushi_ippan_20260803.pdf')));
  const foreign = find('pharma-science-foreign');
  assert.equal(foreign.scopeOriginal, undefined);
  assert.match(foreign.subjectsOriginal, /有機化学、物理化学、生物科学/);
  assert.match(foreign.conditionsOriginal, /筆記試験は免除することがある/);
  assert.match(foreign.conditionsOriginal, /ITPは不可/);
  assert.match(foreign.conditionsOriginal, /面接・口頭試問の参考資料/);
  assert.doesNotMatch(foreign.subjectsOriginal + (foreign.scopeOriginal || '') + foreign.conditionsOriginal, /２年次までの講義内容|機能形態学|薬品物理化学/);
  assert.ok(foreign.sources.some(s => s.url.endsWith('20260403_0103.pdf') && s.pdfPage === 1));
});

test('new TUS sources stay on official pages inside the downloaded files', () => {
  for (const r of added) {
    assert.ok(core.validRecord(r, data.universities));
    for (const s of r.sources) {
      const host = new URL(s.url).hostname;
      assert.ok(host === 'www.tus.ac.jp' || host.endsWith('.tus.ac.jp'));
      assert.equal(s.kind, 'pdf');
      const pages = Object.entries(bounds).find(([name]) => s.url.endsWith(name))?.[1];
      assert.ok(pages && s.pdfPage >= 1 && s.pdfPage <= pages, s.url);
      assert.ok(core.sourceURL(s).endsWith('#page=' + s.pdfPage));
    }
  }
});
