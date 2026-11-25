const test = require('node:test'), assert = require('node:assert/strict');
const resume = require('../resume.js');

function memory() {
  const values = new Map();
  return { values, storage: { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) } };
}

test('saves and reads back the last opened question under its own key', () => {
  const { values, storage } = memory();
  values.set('japan-study-journal:question-practice:v1', 'keep-me');
  assert.equal(resume.save({ paper: 'utokyo-ee-2024', q: 'utokyo-ee-2024-q3', paperTitle: '東京大学 2024', number: '第3問', title: '電磁気', position: 3, total: 6 }, storage), true);
  const entry = resume.read(storage);
  assert.equal(entry.paper, 'utokyo-ee-2024');
  assert.equal(entry.q, 'utokyo-ee-2024-q3');
  assert.equal(entry.position, 3);
  assert.equal(entry.total, 6);
  assert.equal(resume.url(entry), 'question-practice.html?paper=utokyo-ee-2024&q=utokyo-ee-2024-q3');
  assert.equal(values.get('japan-study-journal:question-practice:v1'), 'keep-me');
  assert.deepEqual([...values.keys()].sort(), [resume.KEY, 'japan-study-journal:question-practice:v1'].sort());
});

test('rejects broken, foreign or unsafe stored values', () => {
  const { values, storage } = memory();
  assert.equal(resume.read(storage), null);
  values.set(resume.KEY, '{not json');
  assert.equal(resume.read(storage), null);
  values.set(resume.KEY, JSON.stringify({ version: 2, paper: 'a', q: 'b' }));
  assert.equal(resume.read(storage), null);
  values.set(resume.KEY, JSON.stringify({ version: 1, paper: '../x', q: 'b' }));
  assert.equal(resume.read(storage), null);
  assert.equal(resume.save({ paper: 'a b', q: 'c' }, storage), false);
});

test('storage failures never throw', () => {
  const broken = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(resume.read(broken), null);
  assert.equal(resume.save({ paper: 'a', q: 'b' }, broken), false);
});

test('relative time stays short and drops very old visits', () => {
  const now = 10 * 24 * 3600 * 1000;
  assert.equal(resume.ago(now - 20 * 1000, now), '刚刚');
  assert.equal(resume.ago(now - 5 * 60000, now), '5 分钟前');
  assert.equal(resume.ago(now - 3 * 3600000, now), '3 小时前');
  assert.equal(resume.ago(now - 2 * 86400000, now), '2 天前');
  assert.equal(resume.ago(now - 60 * 86400000, now + 60 * 86400000), '');
});

test('a visit from topic practice keeps its topic and school, and drops unsafe ones', () => {
  const { values, storage } = memory();
  resume.save({ paper: 'kobe-ee-2020', q: 'kobe-ee-2020-q2', paperTitle: '神戸大学 2020', number: '問題2', title: '运放', position: 4, total: 82, topic: 'electronic.opamp', school: 'kobe', topicName: '运算放大器' }, storage);
  const entry = resume.read(storage);
  assert.equal(entry.topic, 'electronic.opamp');
  assert.equal(resume.url(entry), 'question-practice.html?paper=kobe-ee-2020&q=kobe-ee-2020-q2&topic=electronic.opamp&school=kobe');
  values.set(resume.KEY, JSON.stringify({ ...JSON.parse(values.get(resume.KEY)), topic: '../x', school: '<x>' }));
  const unsafe = resume.read(storage);
  assert.equal(unsafe.topic, undefined);
  assert.equal(resume.url(unsafe), 'question-practice.html?paper=kobe-ee-2020&q=kobe-ee-2020-q2');
  values.set(resume.KEY, JSON.stringify({ ...JSON.parse(values.get(resume.KEY)), topic: 'math.linalg', school: '<x>' }));
  assert.equal(resume.url(resume.read(storage)), 'question-practice.html?paper=kobe-ee-2020&q=kobe-ee-2020-q2&topic=math.linalg');
});

test('the card shows for 24 hours after the last practice, and closing hides it until the next practice', () => {
  const { values, storage } = memory();
  const hour = 3600 * 1000;
  resume.save({ paper: 'kobe-ee-2020', q: 'kobe-ee-2020-q2' }, storage);
  const entry = resume.read(storage);
  assert.equal(resume.visible(entry, entry.at + 23 * hour), true);
  assert.equal(resume.visible(entry, entry.at + 25 * hour), false);
  assert.equal(resume.visible({ ...entry, at: 0 }, entry.at), false);
  assert.equal(resume.dismiss(storage, entry.at + hour), true);
  const closed = resume.read(storage);
  assert.equal(closed.dismissedAt, entry.at + hour);
  assert.equal(resume.visible(closed, entry.at + 2 * hour), false);
  // 下一次练习写入新记录，dismissedAt 不再带上，卡片重新出现
  resume.save({ ...closed, q: 'kobe-ee-2020-q3' }, storage);
  const again = resume.read(storage);
  assert.equal(again.dismissedAt, undefined);
  assert.equal(resume.visible(again, again.at + 1000), true);
  // 旧格式（没有 dismissedAt）照常读取
  values.set(resume.KEY, JSON.stringify({ version: 1, paper: 'a1', q: 'b1', at: 5 }));
  assert.equal(resume.read(storage).dismissedAt, undefined);
  assert.equal(resume.dismiss({ getItem() { throw new Error('x'); }, setItem() {} }), false);
});
