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

test('production publishes only planned school names and no exam records', () => {
  assert.equal(data.universities.length, 5);
  assert.equal(new Set(data.universities.map(u => u.id)).size, 5);
  assert.deepEqual(data.records, []);
  assert.deepEqual(core.filter(data.records, data.universities, initial), []);
});
test('general and international admissions remain separate even for same department', () => {
  const general = makeRecord(); const international = makeRecord({ id: 'qa-int', admissionType: 'international', selectionName: 'Fixture international route', subjectsOriginal: '口述試験' });
  assert.deepEqual(core.filter([general, international], universities, initial), [general]);
  assert.deepEqual(core.filter([general, international], universities, { ...initial, admissionType: 'international' }), [international]);
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
      assert.ok(fs.existsSync(path.join(root, url.split('#')[0])), name + ': ' + url);
    }
    assert.ok(html.includes('href="exam-scope.html"'));
  }
});
