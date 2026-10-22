const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const quiz = require('../practice-core.js');
const progress = require('../progress-sync.js');
const completion = require('../paper-set-completion.js');
const bank = require('../questions.js');
const catalog = require('../past-papers-data.js');
const papersCore = require('../past-papers-core.js');
const universities = require('../campus-map-data.js').universities;

function memoryStorage(initial) {
  const values = new Map(initial || []);
  let blockWrites = false;
  return {
    values,
    get blockWrites() { return blockWrites; },
    set blockWrites(value) { blockWrites = value; },
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem(key, value) { if (blockWrites) throw new Error('quota'); values.set(key, String(value)); },
    writes: []
  };
}
function tracking(storage) {
  const set = storage.setItem;
  storage.writes = [];
  storage.setItem = (key, value) => { storage.writes.push(key); set.call(storage, key, value); };
  return storage;
}
function comparable(practice) {
  const copy = JSON.parse(JSON.stringify(practice));
  for (const record of Object.values(copy.records)) delete record.updated;
  return copy;
}
function drillSave(previousText, mutate, questions) {
  const previous = previousText == null ? null : JSON.parse(previousText);
  const state = previous ? quiz.cleanState(previous, questions) : quiz.blank();
  mutate(state);
  return progress.projectPractice(previous, state, questions);
}

test('catalog papers map onto QUESTION_BANK whole-paper set ids and ancillary sets do not', () => {
  const questionPapers = catalog.papers.filter(paper => paper.files.some(file => file.kind === 'question'));
  const ancillary = catalog.papers.filter(paper => !paper.files.some(file => file.kind === 'question'));
  assert.equal(questionPapers.length, bank.length);
  assert.ok(ancillary.length > 0);
  assert.equal(new Set(bank.map(question => question.paper.catalogId)).size, bank.length);
  for (const paper of questionPapers) {
    const set = quiz.paperSetForCatalog(paper.id, bank);
    assert.equal(set.id, 'paper:' + paper.id);
    assert.equal(set.type, 'paper');
    assert.equal(set.paper.catalogId, paper.id);
    assert.equal(bank.filter(question => question.paper.catalogId === paper.id).length, 1);
  }
  for (const paper of ancillary) assert.equal(quiz.paperSetForCatalog(paper.id, bank), null);
  assert.equal(quiz.paperSetForCatalog('missing-paper', bank), null);
  assert.equal(quiz.paperSetForCatalog('', bank), null);
});

test('past-paper completion writes the drill practice record and no extra storage key', () => {
  assert.equal(completion.key(), progress.PRACTICE_KEY);
  assert.equal(progress.PRACTICE_KEY, 'japan-study-journal:practice:v1');
  const source = fs.readFileSync(path.join(__dirname, '../paper-set-completion.js'), 'utf8');
  assert.equal(source.includes('japan-study-journal:desk'), false);
  assert.equal(source.includes('japan-study-journal.sync'), false);
  assert.equal(source.includes(progress.DESK_KEY), false);
  const questionPapers = catalog.papers.filter(paper => paper.files.some(file => file.kind === 'question'));
  const paper = questionPapers[0];
  const other = questionPapers[1];
  const set = quiz.paperSetForCatalog(paper.id, bank);
  const otherSet = quiz.paperSetForCatalog(other.id, bank);
  const ancillary = catalog.papers.find(item => !item.files.some(file => file.kind === 'question'));
  const seed = {
    version: 1,
    records: {
      [set.id]: { attempts: 3, correct: true, wrongCount: 1, bookmarked: true, note: '保留笔记', draft: '草稿', answer: null, updated: '2026-10-21T00:00:00.000Z', completed: false, noteAt: 12, bookmarkAt: 9 },
      [otherSet.id]: { attempts: 4, correct: true, wrongCount: 2, bookmarked: false, note: '另一套', draft: '', answer: null, updated: '2026-10-20T00:00:00.000Z', completed: true },
      'future:keep': { attempts: 2, correct: false, wrongCount: 1, bookmarked: false, note: '题库外', draft: '', answer: 'x', updated: '2026-10-19T00:00:00.000Z' }
    },
    days: ['2026-10-21'],
    current: otherSet.id,
    filters: { subject: '电磁学', paperYear: '2025' },
    filtersUpdatedAt: 20,
    positionUpdatedAt: 7
  };
  const storage = tracking(memoryStorage([[progress.PRACTICE_KEY, JSON.stringify(seed)]]));
  const expected = drillSave(storage.getItem(progress.PRACTICE_KEY), state => quiz.recordPaperCompletion(state, set.id, true, '2026-10-22'), bank);
  const marked = completion.toggle(paper.id, storage, bank, '2026-10-22');
  assert.deepEqual(marked, { ok: true, completed: true, id: set.id });
  assert.deepEqual(storage.writes, [progress.PRACTICE_KEY]);
  const saved = JSON.parse(storage.getItem(progress.PRACTICE_KEY));
  assert.deepEqual(comparable(saved), comparable(expected));
  assert.equal(saved.records[set.id].note, '保留笔记');
  assert.equal(saved.records[set.id].bookmarked, true);
  assert.equal(saved.records[otherSet.id].completed, true);
  assert.equal(saved.records[otherSet.id].note, '另一套');
  assert.equal(saved.records['future:keep'].note, '题库外');
  assert.equal(saved.records['future:keep'].attempts, 2);
  const drill = quiz.cleanState(saved, bank);
  assert.equal(quiz.isDone(set, drill.records[set.id]), true);
  assert.equal(quiz.stats([set], drill).attempted, 1);
  assert.equal(quiz.stats([set], drill).accuracy, 0);
  const synced = progress.readPracticeRaw(storage.getItem(progress.PRACTICE_KEY));
  assert.equal(synced.ok, true);
  assert.equal(synced.practice.records[set.id].completed, true);
  assert.equal(completion.isCompleted(paper.id, storage, bank), true);
  storage.writes.length = 0;
  const unmarkExpected = drillSave(storage.getItem(progress.PRACTICE_KEY), state => quiz.recordPaperCompletion(state, set.id, false, '2026-10-23'), bank);
  const unmarked = completion.toggle(paper.id, storage, bank, '2026-10-23');
  assert.equal(unmarked.completed, false);
  assert.deepEqual(comparable(JSON.parse(storage.getItem(progress.PRACTICE_KEY))), comparable(unmarkExpected));
  assert.equal(quiz.isDone(set, quiz.cleanState(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), bank).records[set.id]), false);
  assert.equal(JSON.parse(storage.getItem(progress.PRACTICE_KEY)).records[set.id].note, '保留笔记');
  assert.deepEqual(storage.writes, [progress.PRACTICE_KEY]);
  const beforeAncillary = storage.getItem(progress.PRACTICE_KEY);
  assert.deepEqual(completion.toggle(ancillary.id, storage, bank, '2026-10-22'), { ok: false, reason: 'unmapped' });
  assert.equal(storage.getItem(progress.PRACTICE_KEY), beforeAncillary);
  storage.values.set(progress.PRACTICE_KEY, '{bad');
  storage.writes.length = 0;
  assert.deepEqual(completion.toggle(paper.id, storage, bank, '2026-10-22'), { ok: false, reason: 'unreadable' });
  assert.equal(storage.getItem(progress.PRACTICE_KEY), '{bad');
  assert.deepEqual(storage.writes, []);
  storage.values.set(progress.PRACTICE_KEY, JSON.stringify(seed));
  storage.blockWrites = true;
  assert.equal(completion.toggle(paper.id, storage, bank, '2026-10-22').reason, 'storage');
  assert.equal(storage.getItem(progress.PRACTICE_KEY), JSON.stringify(seed));
});

test('drill completion is what the past-paper control reads back', () => {
  const paper = catalog.papers.find(item => item.files.some(file => file.kind === 'question'));
  const set = quiz.paperSetForCatalog(paper.id, bank);
  const storage = memoryStorage();
  const state = quiz.blank();
  quiz.recordPaperCompletion(state, set.id, true, '2026-10-22');
  storage.setItem(progress.PRACTICE_KEY, JSON.stringify(progress.projectPractice(null, state, bank)));
  assert.equal(completion.isCompleted(paper.id, storage, bank), true);
  quiz.recordPaperCompletion(state, set.id, false, '2026-10-22');
  storage.setItem(progress.PRACTICE_KEY, JSON.stringify(progress.projectPractice(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), state, bank)));
  assert.equal(completion.isCompleted(paper.id, storage, bank), false);
});

class Element {
  constructor(tag = 'div') {
    this.tag = tag; this.children = []; this.attrs = {}; this.events = {}; this.hidden = false; this.value = ''; this.className = ''; this.checked = false; this.disabled = false; this.textContent = ''; this.dataset = {};
    this.classList = { toggle: (name, on) => { const set = new Set(this.className.split(' ').filter(Boolean)); if (on) set.add(name); else set.delete(name); this.className = [...set].join(' '); } };
  }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  addEventListener(name, fn) { (this.events[name] ||= []).push(fn); }
  async fire(name, event = {}) { for (const fn of this.events[name] || []) await fn({ preventDefault() {}, target: this, ...event }); }
  click() { return this.fire('click'); }
  focus() {}
  scrollIntoView() {}
  get options() { return this.children.filter(child => child.tag === 'option'); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  querySelectorAll(selector) {
    const elements = this.children.flatMap(child => [child, ...child.querySelectorAll('*')]);
    return elements.filter(el => selector === '*' || selector === el.tag || (selector.startsWith('.') && el.className.split(' ').includes(selector.slice(1))));
  }
}

function browserWindow(storage) {
  const events = {};
  const win = {
    localStorage: storage,
    addEventListener(name, fn) { (events[name] ||= []).push(fn); },
    emit(name, event) { for (const fn of events[name] || []) fn(event); }
  };
  win.QuizCore = quiz;
  win.ProgressSync = progress;
  win.StudyDeskCore = require('../study-desk-core.js');
  win.StudyNavigation = require('../study-navigation.js');
  win.PastPapersCore = papersCore;
  win.CAMPUS_MAP_DATA = { universities };
  win.PAST_PAPERS_DATA = catalog;
  win.QUESTION_BANK = bank;
  return win;
}
function documentFor(win) {
  const ids = {};
  const html = fs.readFileSync(path.join(__dirname, '../past-papers.html'), 'utf8');
  for (const match of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const element = new Element(match[1]);
    element.id = match[3];
    element.hidden = /\bhidden\b/.test(match[2]);
    ids[match[3]] = element;
  }
  const document = {
    getElementById: id => ids[id],
    createElement: tag => new Element(tag)
  };
  win.document = document;
  return { ids, document };
}
function boot(search, storage) {
  const win = browserWindow(storage);
  const { ids, document } = documentFor(win);
  const location = new URL('https://example.test/journal/past-papers.html' + search);
  const stack = [location.href];
  let cursor = 0;
  win.location = location;
  win.history = {
    replaceState(_s, _t, url) { location.href = url; stack[cursor] = url; },
    pushState(_s, _t, url) { location.href = url; stack.splice(++cursor); stack[cursor] = url; }
  };
  const context = vm.createContext({ window: win, document, URL, URLSearchParams, Set, console, CSS: { escape: value => value }, Date });
  const root = path.join(__dirname, '..');
  for (const file of ['study-desk-controls.js', 'paper-set-completion.js', 'past-papers.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return { ids, win };
}
function questionPaper(extra = () => true) {
  return catalog.papers.find(paper => paper.files.some(file => file.kind === 'question') && papersCore.validPaper(paper, universities) && extra(paper));
}

test('desk controls keep the favorite link order and accept an optional control after the desk link', () => {
  const storage = memoryStorage();
  const win = browserWindow(storage);
  const document = { createElement: tag => new Element(tag) };
  win.document = document;
  const context = vm.createContext({ window: win, document, URL, URLSearchParams, console, Date });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../study-desk-controls.js'), 'utf8'), context, { filename: 'study-desk-controls.js' });
  const entry = { type: 'paper', id: 'sample', title: '样卷', subtitle: '学校', file: 0, admission: 'general' };
  const plain = win.StudyDeskControls.attach(entry);
  assert.deepEqual(plain.children.map(child => child.textContent), ['☆ 收藏到书桌', '我的书桌 →', '']);
  const extra = new Element('button');
  extra.textContent = '本套已完成';
  const withExtra = win.StudyDeskControls.attach(entry, extra);
  assert.deepEqual(withExtra.children.map(child => child.textContent), ['☆ 收藏到书桌', '我的书桌 →', '本套已完成', '']);
  assert.equal(withExtra.children[3].getAttribute('role'), 'status');
});

test('past-paper detail toggles the shared completion record and follows drill updates', async () => {
  const paper = questionPaper(item => item.files.length > 1);
  const set = quiz.paperSetForCatalog(paper.id, bank);
  const storage = tracking(memoryStorage());
  const page = boot('?paper=' + encodeURIComponent(paper.id), storage);
  const detail = page.ids['paper-detail'];
  assert.equal(detail.hidden, false);
  const group = detail.querySelector('.desk-controls');
  assert.deepEqual(group.children.slice(0, 3).map(child => child.textContent), ['☆ 收藏到书桌', '我的书桌 →', '本套已完成']);
  assert.equal(group.children[2].dataset.paperSet, set.id);
  assert.equal(group.children[2].getAttribute('aria-pressed'), 'false');
  assert.equal(group.children[3].getAttribute('role'), 'status');
  await group.children[0].click();
  assert.equal(group.children[0].textContent, '★ 已收藏');
  assert.equal(group.children[2].textContent, '本套已完成');
  assert.equal(storage.getItem(progress.PRACTICE_KEY), null);
  storage.writes.length = 0;
  await group.children[2].click();
  assert.equal(group.children[2].textContent, '✓ 已完成');
  assert.equal(group.children[2].getAttribute('aria-pressed'), 'true');
  assert.ok(group.children[2].className.split(' ').includes('is-complete'));
  assert.deepEqual(storage.writes, [progress.PRACTICE_KEY]);
  const marked = quiz.cleanState(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), bank);
  assert.equal(quiz.isDone(set, marked.records[set.id]), true);
  assert.equal(quiz.stats([set], marked).accuracy, 0);
  const files = detail.querySelector('.paper-files');
  await files.children[1].click();
  const again = detail.querySelector('.desk-controls');
  assert.equal(again.children[2].textContent, '✓ 已完成');
  assert.equal(again.children[2].dataset.paperSet, set.id);
  const state = quiz.cleanState(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), bank);
  quiz.recordPaperCompletion(state, set.id, false, '2026-10-22');
  storage.setItem(progress.PRACTICE_KEY, JSON.stringify(progress.projectPractice(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), state, bank)));
  page.win.emit('storage', { key: progress.PRACTICE_KEY });
  assert.equal(again.children[2].textContent, '本套已完成');
  assert.equal(again.children[2].getAttribute('aria-pressed'), 'false');
  assert.equal(again.children[2].className.includes('is-complete'), false);
  await again.children[2].click();
  assert.equal(again.children[2].textContent, '✓ 已完成');
  await again.children[2].click();
  assert.equal(again.children[2].textContent, '本套已完成');
  const cleared = quiz.cleanState(JSON.parse(storage.getItem(progress.PRACTICE_KEY)), bank);
  assert.equal(quiz.isDone(set, cleared.records[set.id]), false);
});

test('ancillary past papers and unreadable practice records do not gain a second completion store', async () => {
  const ancillary = catalog.papers.find(paper => !paper.files.some(file => file.kind === 'question') && papersCore.validPaper(paper, universities));
  assert.ok(ancillary);
  const empty = memoryStorage();
  const ancillaryPage = boot('?paper=' + encodeURIComponent(ancillary.id), empty);
  const ancillaryGroup = ancillaryPage.ids['paper-detail'].querySelector('.desk-controls');
  assert.equal(ancillaryPage.ids['paper-detail'].hidden, false);
  assert.deepEqual(ancillaryGroup.children.map(child => child.textContent), ['☆ 收藏到书桌', '我的书桌 →', '']);
  assert.equal(empty.getItem(progress.PRACTICE_KEY), null);
  const paper = questionPaper();
  const broken = memoryStorage([[progress.PRACTICE_KEY, '{bad']]);
  const brokenPage = boot('?paper=' + encodeURIComponent(paper.id), broken);
  const button = brokenPage.ids['paper-detail'].querySelector('.paper-set-complete');
  assert.equal(button.textContent, '本套已完成');
  assert.equal(button.disabled, true);
  assert.match(button.getAttribute('title'), /无法读取/);
  await button.click();
  assert.equal(broken.getItem(progress.PRACTICE_KEY), '{bad');
  assert.equal(button.textContent, '本套已完成');
});
