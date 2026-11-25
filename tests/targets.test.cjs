'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const T = require('../targets-core.js');
const index = require('../data/topics/topic-index.json');

function memory() {
  const values = new Map();
  return { values, storage: { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) } };
}

test('targets save under their own key, dedupe schools and cap at four', () => {
  const { values, storage } = memory();
  values.set('japan-study-journal:question-practice:v1', 'keep-me');
  let list = [];
  for (const school of ['utokyo', 'tohoku', 'utokyo', 'kyushu', 'osaka', 'kobe']) list = T.upsert(list, { school, name: school, exam: '2027-08-20' });
  assert.deepEqual(list.map(t => t.school), ['utokyo', 'tohoku', 'kyushu', 'osaka']);
  assert.equal(T.save(list, storage), true);
  assert.deepEqual(T.read(storage).map(t => t.school), ['utokyo', 'tohoku', 'kyushu', 'osaka']);
  assert.equal(values.get('japan-study-journal:question-practice:v1'), 'keep-me');
  list = T.upsert(list, { school: 'tohoku', deadline: '2027-06-30', note: '一般入試' });
  assert.equal(list.find(t => t.school === 'tohoku').deadline, '2027-06-30');
  assert.equal(list.length, 4);
  assert.deepEqual(T.remove(list, 'utokyo').map(t => t.school), ['tohoku', 'kyushu', 'osaka']);
});

test('broken, unsafe or impossible values are dropped, storage errors never throw', () => {
  const { values, storage } = memory();
  assert.deepEqual(T.read(storage), []);
  values.set(T.KEY, '{broken');
  assert.deepEqual(T.read(storage), []);
  values.set(T.KEY, JSON.stringify({ version: 1, targets: [{ school: '../x' }, { school: 'kyushu', exam: '2027-02-30', deadline: 'tomorrow', note: 'x'.repeat(200) }] }));
  const [t] = T.read(storage);
  assert.deepEqual([t.school, t.exam, t.deadline, t.note.length], ['kyushu', '', '', 80]);
  const broken = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.deepEqual(T.read(broken), []);
  assert.equal(T.save([], broken), false);
  assert.equal(T.validDate('2028-02-29'), '2028-02-29');
  assert.equal(T.validDate('2027-02-29'), '');
});

test('countdown counts whole local days and picks the nearest future date', () => {
  const now = new Date(2027, 5, 1, 23, 30);
  assert.equal(T.daysUntil('2027-06-01', now), 0);
  assert.equal(T.daysUntil('2027-06-02', now), 1);
  assert.equal(T.daysUntil('2027-05-31', now), -1);
  assert.equal(T.daysUntil('', now), null);
  assert.deepEqual([T.countdownText(3), T.countdownText(0), T.countdownText(-2), T.countdownText(null)], ['还有 3 天', '就是今天', '已过', '']);
  const targets = [
    { school: 'utokyo', name: '東京大学', deadline: '2027-05-20', exam: '2027-08-25' },
    { school: 'tohoku', name: '東北大学', deadline: '2027-06-20', exam: '' },
  ];
  const next = T.nextEvent(targets, null, now);
  assert.deepEqual([next.school, next.kind, next.days, next.name], ['tohoku', 'deadline', 19, '東北大学']);
  assert.equal(T.nextEvent([{ school: 'utokyo', exam: '2020-01-01' }], null, now), null);
});

test('school progress counts completed questions and lists untouched frequent topics', () => {
  const rows = index.questions.filter(r => index.papers[r.p].schoolId === 'tohoku');
  const empty = T.schoolProgress(index, 'tohoku', {});
  assert.equal(empty.total, rows.length);
  assert.equal(empty.done, 0);
  assert.ok(empty.gaps.length > 0 && empty.gaps.length <= 5);
  for (let i = 1; i < empty.topics.length; i++) assert.ok(empty.topics[i - 1].total >= empty.topics[i].total);
  const top = empty.topics[0];
  const first = rows.find(r => r.k.includes(top.id));
  const after = T.schoolProgress(index, 'tohoku', { [first.q]: { completed: true }, other: { completed: true } });
  assert.equal(after.done, 1);
  assert.ok(!after.gaps.some(g => g.id === top.id), 'a practiced topic is no longer a gap');
  assert.equal(T.schoolProgress(index, 'chiba', {}).total, 0);
});
