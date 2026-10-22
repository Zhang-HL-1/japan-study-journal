const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cards = require('../tus-2025-eei-card-data.js');
const bank = require('../questions.js');
const core = require('../practice-core.js');
const papers = require('../past-papers-core.js');
const catalog = require('../past-papers-data.js');
const scope = require('../exam-scope-data.js');

const root = path.join(__dirname, '..');
const entry = catalog.papers.find(p => p.id === 'tus-92e97fbb48a52078');
const exam = scope.records.find(item => item.id === 'tus-creative-electrical');

test('demo cards are the 2025 電気電子情報工学専攻 general paper, split by exam-scope subjects', () => {
  assert.equal(cards.length, 14);
  assert.equal(entry.universityId, 'tus');
  assert.equal(entry.graduateSchool, '創域理工学研究科');
  assert.equal(entry.department, '電気電子情報工学専攻');
  assert.equal(entry.paperYear, 2025);
  assert.equal(entry.selectionName, '修士課程・一般入試');
  assert.deepEqual(entry.subjects, ['電子回路', '電気回路', '電気数学', '電磁気学']);
  assert.match(exam.subjectsOriginal, /電気数学、電磁気学、電気回路、電子回路/);
  assert.deepEqual([...new Set(cards.map(q => q.chapter))].sort(), ['電気数学', '電気回路', '電磁気学', '電子回路'].sort());
  const allowed = new Set(['数学（综合）', '线性代数', '电磁学', '电路与模拟电子']);
  for (const q of cards) {
    assert.equal(q.type, 'card');
    assert.equal(q.demo, 'tus-2025-eei');
    assert.equal(q.answerText, '');
    assert.deepEqual(q.explanation, []);
    assert.equal(q.paper.year, 2025);
    assert.equal(q.provenance.kind, 'exam');
    assert.equal(q.provenance.school, '東京理科大学');
    assert.equal(q.provenance.graduate, '創域理工学研究科');
    assert.equal(q.provenance.major, '電気電子情報工学専攻');
    assert.equal(q.provenance.year, '2025年度');
    assert.match(q.provenance.number, /^\[\d\]$/);
    assert.ok(q.subjects.every(subject => allowed.has(subject)));
    assert.equal(bank.filter(item => item.id === q.id).length, 1);
  }
  assert.deepEqual(cards.filter(q => q.chapter === '電磁気学').map(q => q.subject), ['电磁学', '电磁学', '电磁学']);
  assert.equal(cards.filter(q => q.chapter === '電気回路').length, 3);
  assert.equal(cards.filter(q => q.chapter === '電子回路').length, 4);
  assert.ok(cards.filter(q => q.chapter === '電気回路' || q.chapter === '電子回路').every(q => q.subjects.includes('电路与模拟电子')));
  assert.ok(cards.find(q => q.id === 'card:tus-2025-eei:math:2').subjects.includes('线性代数'));
});

test('each card is one question-area crop and the original PDFs are unchanged', () => {
  const urls = new Set(entry.files.map(file => file.url));
  const dir = path.join(root, 'assets/past-papers/cards/tus-2025-eei');
  const images = cards.map(q => path.basename(q.image));
  assert.deepEqual(fs.readdirSync(dir).sort(), images.sort());
  for (const q of cards) {
    const file = entry.files.find(item => item.label === q.sourcePdf.label);
    assert.equal(q.sourcePdf.url, file.url);
    assert.equal(papers.fileURL({ url: q.sourcePdf.url, startPage: q.sourcePdf.page }), q.sourcePdf.url + '#page=' + q.sourcePdf.page);
    assert.equal(q.blocks, undefined);
    assert.ok(q.prompt.length > 40);
    assert.ok(q.image.startsWith('assets/past-papers/cards/tus-2025-eei/'));
    assert.ok(q.image.endsWith('.png'));
    assert.ok(!urls.has(q.image));
    const bytes = fs.readFileSync(path.join(root, q.image));
    assert.ok(bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])));
    assert.equal(bytes.toString('ascii', 12, 16), 'IHDR');
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    assert.ok(width >= 1400, q.image);
    assert.ok(height >= 600, q.image);
  }
  for (const file of entry.files) {
    const bytes = fs.readFileSync(path.join(root, file.url));
    assert.equal(bytes.length, file.byteSize);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
  }
});

test('subject and chapter filters select cards, and completion is not a score', () => {
  const major = JSON.stringify(['東京理科大学', '創域理工学研究科', '電気電子情報工学専攻']);
  const filters = { sourceKind: 'exam', school: '東京理科大学', major, paperYear: '2025', type: 'card' };
  assert.equal(core.filterQuestions(bank, filters, {}).length, 14);
  assert.deepEqual(core.filterQuestions(bank, { ...filters, search: '図2に示す回路' }, {}).map(q => q.id), ['card:tus-2025-eei:electronics:2']);
  assert.deepEqual(core.filterQuestions(bank, { ...filters, subject: '电磁学' }, {}).map(q => q.chapter), ['電磁気学', '電磁気学', '電磁気学']);
  assert.equal(core.filterQuestions(bank, { ...filters, subject: '电路与模拟电子', chapter: '電子回路' }, {}).length, 4);
  assert.equal(core.filterQuestions(bank, { ...filters, chapter: '電気数学' }, {}).length, 4);
  const q = cards[0];
  const state = core.blank();
  core.recordPaperCompletion(state, q.id, true, '2026-10-22');
  assert.equal(core.isDone(q, state.records[q.id]), true);
  assert.equal(core.stats([q], state).accuracy, 0);
  assert.equal(core.grade(q, 'anything'), null);
  assert.equal(core.filterQuestions([q], { scope: 'wrong' }, state.records).length, 0);
  const restored = core.cleanState(JSON.parse(JSON.stringify(state)), [q]);
  assert.equal(restored.records[q.id].completed, true);
  assert.equal(restored.records[q.id].attempts, 0);
});
