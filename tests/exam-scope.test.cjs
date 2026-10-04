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

test('Tokyo and Kyoto catalogs have unique validated records and other schools remain pending', () => {
  assert.equal(data.universities.length, 5);
  assert.equal(new Set(data.universities.map(u => u.id)).size, 5);
  assert.ok(data.records.length > 0);
  assert.equal(new Set(data.records.map(record => record.id)).size, data.records.length);
  assert.ok(data.records.every(record => ['utokyo', 'kyoto'].includes(record.universityId) && core.validRecord(record, data.universities)));
  assert.equal(new Set(data.records.filter(record => record.universityId === 'utokyo').map(record => record.graduateSchool)).size, 5);
  assert.equal(new Set(data.records.filter(record => record.universityId === 'kyoto').map(record => record.graduateSchool)).size, 4);
  const pending = data.records.filter(record => ['pending', 'unverified'].includes(record.publicationStatus));
  assert.ok(pending.every(record => !record.subjectsOriginal && !record.scopeOriginal && record.editorialNote));
  for (const record of data.records) for (const source of record.sources) {
    if (source.kind === 'pdf') assert.ok(Number.isInteger(source.pdfPage) && source.pdfPage > 0);
  }
  assert.ok(core.filter(data.records, data.universities, initial).length);
  assert.ok(core.filter(data.records, data.universities, { ...initial, admissionType: 'international' }).length);
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
