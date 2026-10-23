const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const bankApi = require('../question-bank.js');
const core = require('../practice-core.js');
const index = require('../question-bank-index.json');
const whole = require('../questions.js');
const { subjectsOf } = require('../scripts/build-paper-practice.cjs');

function listings() {
  return index.papers.map(entry => bankApi.listingFromPaper(entry, JSON.parse(fs.readFileSync(path.join(root, entry.data), 'utf8'))));
}

test('subject labels stay aligned with the whole-paper classifier', () => {
  const samples = [['電磁気学'], ['电子电路', '電子回路'], ['电气数学', '電気数学'], ['专业科目合卷', '数学：微分方程', '电磁气学', '电气回路', '量子力学']];
  for (const labels of samples) assert.deepEqual(bankApi.subjectsOf(labels), subjectsOf(labels));
});

test('every indexed paper becomes a question set and stays out of the PDF bank', () => {
  const sets = listings();
  assert.equal(sets.length, index.papers.length);
  assert.equal(whole.some(q => q.type === 'questionSet'), false);
  for (const [entry, set] of index.papers.map((entry, i) => [entry, sets[i]])) {
    assert.equal(set.type, 'questionSet');
    assert.equal(set.id, entry.id);
    assert.equal(whole.some(q => q.id === entry.id), false);
    assert.equal(set.questions.length, entry.questionCount);
    assert.equal(set.paper.catalogId, entry.catalogId);
    assert.equal(set.provenance.kind, 'exam');
    assert.ok(set.subjects.includes(set.subject));
    assert.equal(set.answerText, '');
    assert.deepEqual(set.explanation, []);
    assert.equal(set.questions.some(q => q.answer || q.explanation), false);
    assert.doesNotMatch(set.title + set.prompt, /DEMO|Demo|样例/);
  }
  const byId = Object.fromEntries(sets.map(set => [set.id, set]));
  assert.deepEqual(byId['kobe-ee-2026-denjiki'].subjects, ['电磁学']);
  assert.ok(byId['tus-ee-2025-denshi'].subjects.includes('电路与模拟电子'));
  assert.ok(byId['tus-ee-2025-kairo'].subjects.includes('电路与模拟电子'));
  assert.ok(byId['science-tokyo-ee-2025'].subjects.includes('电磁学'));
  assert.ok(byId['science-tokyo-ee-2025'].subjects.includes('量子力学'));
  assert.match(byId['science-tokyo-ee-2025'].provenance.year, /年实施/);
  assert.match(byId['kobe-ee-2026-denjiki'].provenance.year, /入学年度/);
});

test('school, major, year and subject filters keep whole papers and question sets distinct', () => {
  const sets = listings();
  const kobePaper = whole.find(q => q.id === 'paper:kobe-ee-2026');
  const mixed = [kobePaper, ...sets];
  const major = JSON.stringify(['東京理科大学', '創域理工学研究科', '電気電子情報工学専攻']);
  const filters = extra => ({ sourceKind: 'exam', school: 'all', major: 'all', paperYear: 'all', subject: 'all', practiceMode: 'all', ...extra });
  assert.deepEqual(core.filterQuestions(mixed, filters({ school: '神戸大学', paperYear: '2026', subject: '电磁学' }), {}).map(q => q.id), ['paper:kobe-ee-2026', 'kobe-ee-2026-denjiki']);
  assert.deepEqual(core.filterQuestions(mixed, filters({ school: '神戸大学', paperYear: '2026', subject: '电磁学', practiceMode: 'questions' }), {}).map(q => q.id), ['kobe-ee-2026-denjiki']);
  assert.deepEqual(core.filterQuestions(mixed, filters({ school: '神戸大学', paperYear: '2026', subject: '电磁学', practiceMode: 'paper' }), {}).map(q => q.id), ['paper:kobe-ee-2026']);
  assert.deepEqual(core.filterQuestions(sets, filters({ school: '東京理科大学', major, subject: '电路与模拟电子', practiceMode: 'questions' }), {}).map(q => q.id), ['tus-ee-2025-denshi', 'tus-ee-2025-kairo']);
  assert.deepEqual(core.filterQuestions(sets, filters({ school: '東京科学大学', major: JSON.stringify(['東京科学大学', '工学院', '電気電子系']), paperYear: '2024', subject: '电磁学' }), {}).map(q => q.id), ['science-tokyo-ee-2024']);
  const done = { 'science-tokyo-ee-2024': { completed: true, bookmarked: true, correct: null, attempts: 0 } };
  assert.equal(core.filterQuestions(sets, filters({ practiceMode: 'questions', scope: 'unanswered' }), done).some(q => q.id === 'science-tokyo-ee-2024'), false);
  assert.deepEqual(core.filterQuestions(sets, filters({ practiceMode: 'questions', scope: 'bookmarked' }), done).map(q => q.id), ['science-tokyo-ee-2024']);
  assert.equal(core.filterQuestions(sets, filters({ practiceMode: 'questions', scope: 'wrong' }), done).length, 0);
  assert.equal(core.stats(sets, { records: done, days: [] }).accuracy, 0);
  assert.equal(core.isDone(by(sets, 'science-tokyo-ee-2024'), done['science-tokyo-ee-2024']), true);
});

function by(list, id) { return list.find(item => item.id === id); }

test('question records read the legacy key and do not overwrite a broken store', () => {
  const legacy = { version: 1, records: { 'kobe-ee-2026-denjiki-q1': { completed: true, bookmarked: false, note: '旧记录', updatedAt: 3 } } };
  const storage = new Map([[bankApi.LEGACY_KEY, JSON.stringify(legacy)]]);
  const store = { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) };
  const loaded = bankApi.loadQuestionRecords(store);
  assert.equal(loaded.writable, true);
  assert.equal(loaded.records['kobe-ee-2026-denjiki-q1'].note, '旧记录');
  loaded.records['kobe-ee-2026-denjiki-q1'].bookmarked = true;
  bankApi.saveQuestionRecords(store, loaded.records, loaded);
  const formal = JSON.parse(storage.get(bankApi.RECORD_KEY));
  const kept = JSON.parse(storage.get(bankApi.LEGACY_KEY));
  assert.equal(formal.records['kobe-ee-2026-denjiki-q1'].completed, true);
  assert.equal(formal.records['kobe-ee-2026-denjiki-q1'].bookmarked, true);
  assert.equal(kept.records['kobe-ee-2026-denjiki-q1'].note, '旧记录');
  const broken = { getItem: key => key === bankApi.LEGACY_KEY ? 'broken' : null, setItem: () => { throw new Error('should not write'); } };
  const blocked = bankApi.loadQuestionRecords(broken);
  assert.equal(blocked.writable, false);
  assert.doesNotThrow(() => bankApi.saveQuestionRecords(broken, { q: { completed: true } }, blocked));
});

test('drill and question practice copy no longer presents the bank as a demo', () => {
  const drill = fs.readFileSync(path.join(root, 'drill.html'), 'utf8');
  const page = fs.readFileSync(path.join(root, 'question-practice.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'question-practice.js'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'question-bank.js'), 'utf8');
  for (const text of [drill, page, script]) assert.doesNotMatch(text, /DEMO|Demo|体验逐题|样例/);
  assert.match(drill, /只看逐题练习/);
  assert.match(drill, /question-bank\.js/);
  assert.doesNotMatch(drill, /question-demo-entry/);
  assert.match(page, /<title>逐题练习 · 留日手记<\/title>/);
  assert.match(page, /逐题练习/);
  assert.match(catalog, /question-practice:v1/);
  assert.match(catalog, /question-demo:v1/);
  assert.match(script, /loadQuestionRecords/);
  assert.match(script, /saveQuestionRecords/);
});
