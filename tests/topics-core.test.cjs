'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const T = require('../topics-core.js');
const index = require('../data/topics/topic-index.json');

test('topic and subject ids resolve; unsafe or unknown values fall back to defaults', () => {
  assert.equal(T.findTopic(index, 'electronic.opamp').name, '运算放大器');
  assert.equal(T.findTopic(index, 'physics').kind, 'subject');
  for (const bad of ['', '../x', 'electronic.nope', 'x'.repeat(200), null, 'Electronic.opamp']) assert.equal(T.findTopic(index, bad), null);
  assert.deepEqual(T.normalizeOptions(index, { topic: '../evil', school: '<x>', sort: 'random', status: 'everything' }), { topic: '', school: '', sort: 'year', status: 'all' });
  assert.deepEqual(T.normalizeOptions(index, { topic: 'math.linalg', school: 'utokyo', sort: 'school', status: 'todo' }), { topic: 'math.linalg', school: 'utokyo', sort: 'school', status: 'todo' });
  assert.equal(T.normalizeOptions(index, { school: 'no-such-school' }).school, '');
});

test('queue keeps every question of the topic, newest year first, papers in original order', () => {
  const rows = T.queue(index, { topic: 'electronic.opamp' });
  const expected = index.subjects.find(s => s.id === 'electronic').topics.find(t => t.id === 'electronic.opamp').count;
  assert.equal(rows.length, expected);
  const years = rows.map(r => index.papers[r.p].year ?? -1);
  assert.deepEqual(years, [...years].sort((a, b) => b - a));
  // 同一份卷子里的题保持原卷顺序
  const order = new Map(index.questions.map((r, i) => [r.q, i]));
  for (let i = 1; i < rows.length; i++) if (rows[i].p === rows[i - 1].p) assert.ok(order.get(rows[i].q) > order.get(rows[i - 1].q));
  const bySchool = T.queue(index, { topic: 'electronic.opamp', sort: 'school' });
  assert.equal(bySchool.length, rows.length);
  const names = bySchool.map(r => index.papers[r.p].school);
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, 'ja')));
});

test('a subject id covers its topics plus the questions only classified to the subject', () => {
  const subject = index.subjects.find(s => s.id === 'physics');
  const rows = T.queue(index, { topic: 'physics' });
  assert.equal(rows.length, subject.count);
  assert.ok(rows.some(r => !r.k.length && (r.s || []).includes('physics')));
  assert.deepEqual(T.queue(index, {}), []);
});

test('school filter and status filter narrow the list without changing the queue', () => {
  const all = T.queue(index, { topic: 'control.tf' });
  const tokyo = T.queue(index, { topic: 'control.tf', school: 'utokyo' });
  assert.ok(tokyo.length > 0 && tokyo.length < all.length);
  assert.ok(tokyo.every(r => index.papers[r.p].schoolId === 'utokyo'));
  const records = { [all[0].q]: { completed: true }, [all[1].q]: { bookmarked: true, note: ' ' }, [all[2].q]: { note: '想法' } };
  assert.equal(T.list(index, { topic: 'control.tf', status: 'done' }, records).length, 1);
  assert.equal(T.list(index, { topic: 'control.tf', status: 'todo' }, records).length, all.length - 1);
  assert.equal(T.list(index, { topic: 'control.tf', status: 'starred' }, records).length, 1);
  assert.deepEqual(T.statusOf(all[1], records), { completed: false, bookmarked: true, note: false });
  assert.equal(T.statusOf(all[2], records).note, true);
  assert.deepEqual(T.progress(index, 'control.tf', records), { total: all.length, done: 1 });
  assert.equal(T.queue(index, { topic: 'control.tf', status: 'done' }).length, all.length);
});

test('neighbors cross paper boundaries and urls carry only non-default context', () => {
  const rows = T.queue(index, { topic: 'math.complex' });
  const n = T.neighbors(rows, rows[1].q);
  assert.deepEqual([n.position, n.total, n.previous.q, n.next.q], [2, rows.length, rows[0].q, rows[2].q]);
  assert.equal(T.neighbors(rows, rows[0].q).previous, null);
  assert.equal(T.neighbors(rows, rows.at(-1).q).next, null);
  assert.equal(T.neighbors(rows, 'not-here'), null);
  assert.ok(rows.some((r, i) => i && r.p !== rows[i - 1].p), 'queue spans several papers');
  assert.equal(T.practiceURL(rows[0], { topic: 'math.complex', sort: 'year' }), `question-practice.html?paper=${rows[0].p}&q=${rows[0].q}&topic=math.complex`);
  assert.equal(T.practiceURL(rows[0], { topic: 'math.complex', school: 'kobe', sort: 'school', status: 'todo' }), `question-practice.html?paper=${rows[0].p}&q=${rows[0].q}&topic=math.complex&school=kobe&sort=school`);
  assert.equal(T.topicsURL({ topic: '', school: '', sort: 'year', status: 'all' }), 'topics.html');
  assert.equal(T.topicsURL({ topic: 'math.complex', status: 'todo', sort: 'year' }), 'topics.html?topic=math.complex&status=todo');
});

test('school list is unique and names come from the papers', () => {
  const schools = T.schools(index);
  assert.equal(new Set(schools.map(s => s.id)).size, schools.length);
  assert.ok(schools.find(s => s.id === 'utokyo' && s.name === '東京大学'));
  assert.equal(T.yearText({ year: 2024 }), '2024 年');
  assert.equal(T.yearText({ year: null }), '年份未标');
});

test('school trends count questions per topic and year, most frequent topics first', () => {
  const data = T.trends(index, 'tohoku');
  const rows = index.questions.filter(r => index.papers[r.p].schoolId === 'tohoku');
  assert.equal(data.questions, rows.length);
  assert.deepEqual(data.years, [...data.years].sort((a, b) => b - a));
  for (let i = 1; i < data.topics.length; i++) assert.ok(data.topics[i - 1].total >= data.topics[i].total);
  const top = data.topics[0];
  assert.equal(top.total, rows.filter(r => r.k.includes(top.id)).length);
  assert.equal(Object.values(top.counts).reduce((a, b) => a + b, 0), top.total);
  assert.equal(top.years, Object.keys(top.counts).length);
  assert.ok(data.max >= Math.max(...Object.values(top.counts)));
  assert.deepEqual(T.trends(index, 'chiba'), { school: 'chiba', questions: 0, years: [], topics: [], max: 0 });
});
