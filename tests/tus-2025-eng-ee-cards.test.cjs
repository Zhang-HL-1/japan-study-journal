const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cards = require('../tus-2025-eng-ee-card-data.js');
const bank = require('../questions.js');
const core = require('../practice-core.js');
const papers = require('../past-papers-core.js');
const catalog = require('../past-papers-data.js');
const scope = require('../exam-scope-data.js');

const root = path.join(__dirname, '..');
const general = catalog.papers.find(p => p.id === 'tus-7bdce392c0bff5f6');
const foreign = catalog.papers.find(p => p.id === 'tus-1f2310ffe00f0b2e');
const generalScope = scope.records.find(item => item.id === 'tus-eng-electrical');
const foreignScope = scope.records.find(item => item.id === 'tus-eng-electrical-foreign');

test('2025 工学研究科 電気工学専攻 cards are general and foreign, limited to exam-scope subjects', () => {
  assert.equal(cards.length, 19);
  for (const entry of [general, foreign]) {
    assert.equal(entry.universityId, 'tus');
    assert.equal(entry.graduateSchool, '工学研究科');
    assert.equal(entry.department, '電気工学専攻');
    assert.equal(entry.paperYear, 2025);
    assert.deepEqual(entry.subjects, ['電子回路', '電気回路', '電磁気学']);
  }
  assert.equal(general.selectionName, '修士課程・一般入試');
  assert.equal(foreign.selectionName, '修士課程・外国人留学生入試');
  assert.match(generalScope.subjectsOriginal, /電磁気学、電気回路、電子回路/);
  assert.match(foreignScope.subjectsOriginal, /電磁気学、電気回路、電子回路（ディジタル回路を含む）/);
  assert.equal(generalScope.id, 'tus-eng-electrical');
  assert.notEqual(generalScope.id, 'tus-creative-electrical');
  assert.deepEqual([...new Set(cards.map(q => q.chapter))].sort(), ['電磁気学', '電気回路', '電子回路'].sort());
  const allowed = new Set(['电磁学', '电路与模拟电子', '数字电子']);
  for (const q of cards) {
    assert.equal(q.type, 'card');
    assert.equal(q.demo, 'tus-2025-ee');
    assert.equal(q.answerText, '');
    assert.deepEqual(q.explanation, []);
    assert.equal(q.blocks, undefined);
    assert.equal(q.paper.year, 2025);
    assert.equal(q.provenance.school, '東京理科大学');
    assert.equal(q.provenance.graduate, '工学研究科');
    assert.equal(q.provenance.major, '電気工学専攻');
    assert.equal(q.provenance.year, '2025年度');
    assert.match(q.provenance.number, /^\[\d\]$/);
    assert.ok(q.subjects.every(subject => allowed.has(subject)));
    assert.equal(bank.filter(item => item.id === q.id).length, 1);
  }
  assert.equal(cards.filter(q => q.provenance.label.startsWith('修士課程・一般入試')).length, 10);
  assert.equal(cards.filter(q => q.provenance.label.startsWith('修士課程・外国人留学生入試')).length, 9);
  assert.equal(cards.filter(q => q.chapter === '電磁気学').length, 9);
  assert.equal(cards.filter(q => q.chapter === '電気回路').length, 4);
  assert.equal(cards.filter(q => q.chapter === '電子回路').length, 6);
  assert.ok(cards.filter(q => q.chapter === '電気回路' || q.chapter === '電子回路').every(q => q.subjects.includes('电路与模拟电子')));
  assert.deepEqual(cards.filter(q => q.subjects.includes('数字电子')).map(q => q.id), [
    'card:tus-2025-ee:general:electronics:3',
    'card:tus-2025-ee:foreign:electronics:3'
  ]);
  assert.equal(cards.some(q => q.chapter === '電気数学'), false);
});

test('each card is one question crop and the original PDFs are unchanged', () => {
  const dir = path.join(root, 'assets/past-papers/cards/tus-2025-ee');
  const images = cards.map(q => path.basename(q.image));
  assert.deepEqual(fs.readdirSync(dir).sort(), images.sort());
  for (const q of cards) {
    const entry = q.sourceCatalogId === general.id ? general : foreign;
    const file = entry.files.find(item => item.url === q.sourcePdf.url);
    assert.ok(file);
    assert.equal(file.kind, 'question');
    assert.equal(papers.fileURL({ url: q.sourcePdf.url, startPage: q.sourcePdf.page }), q.sourcePdf.url + '#page=' + q.sourcePdf.page);
    assert.ok(q.sourcePdf.page >= 2 && q.sourcePdf.page <= file.pages);
    assert.ok(q.prompt.length > 40);
    assert.ok(q.image.startsWith('assets/past-papers/cards/tus-2025-ee/'));
    assert.ok(q.image.endsWith('.png'));
    const bytes = fs.readFileSync(path.join(root, q.image));
    assert.ok(bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])));
    assert.equal(bytes.toString('ascii', 12, 16), 'IHDR');
    assert.ok(bytes.readUInt32BE(16) >= 1400, q.image);
    assert.ok(bytes.readUInt32BE(20) >= 600, q.image);
  }
  for (const entry of [general, foreign]) {
    for (const file of entry.files) {
      const bytes = fs.readFileSync(path.join(root, file.url));
      assert.equal(bytes.length, file.byteSize);
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
    }
  }
});

test('demo filters select this major without mixing in the EEI cards', () => {
  const major = JSON.stringify(['東京理科大学', '工学研究科', '電気工学専攻']);
  const filters = { sourceKind: 'exam', school: '東京理科大学', major, paperYear: '2025', type: 'card' };
  assert.equal(core.filterQuestions(bank, filters, {}).length, 19);
  assert.equal(core.filterQuestions(bank, { ...filters, subject: '电磁学' }, {}).length, 9);
  assert.equal(core.filterQuestions(bank, { ...filters, subject: '电路与模拟电子', chapter: '電子回路' }, {}).length, 6);
  assert.equal(core.filterQuestions(bank, { ...filters, subject: '数字电子' }, {}).length, 2);
  assert.deepEqual(core.filterQuestions(bank, { ...filters, search: 'マクスウェル' }, {}).map(q => q.id), ['card:tus-2025-ee:foreign:em:4']);
  assert.equal(core.filterQuestions(bank, { ...filters, search: '一般入試' }, {}).length, 10);
  const eei = JSON.stringify(['東京理科大学', '創域理工学研究科', '電気電子情報工学専攻']);
  assert.equal(core.filterQuestions(bank, { ...filters, major: eei }, {}).length, 14);
  const q = cards[0];
  const state = core.blank();
  core.recordPaperCompletion(state, q.id, true, '2026-10-22');
  assert.equal(core.stats([q], state).accuracy, 0);
  assert.equal(core.grade(q, 'anything'), null);
});
