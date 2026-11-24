'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { compile, classify, applyOverride, normalize } = require('../scripts/topic-classify.cjs');
const { build } = require('../scripts/build-topic-index.cjs');

const root = path.resolve(__dirname, '..');
const taxonomy = require('../data/topics/taxonomy.json');
const overrides = require('../data/topics/overrides.json');
const index = require('../data/topics/topic-index.json');
const bank = require('../question-bank-index.json');
const compiled = compile(taxonomy);
const topicsOf = (tags, extra = {}) => classify({ topics: tags, title: '', number: '', ...extra }, compiled).topics;

test('taxonomy ids are unique, nested under their subject, and every rule compiles', () => {
  const ids = new Set();
  for (const subject of taxonomy.subjects) {
    assert.match(subject.id, /^[a-z]+$/);
    assert.ok(!ids.has(subject.id), subject.id); ids.add(subject.id);
    for (const topic of subject.topics) {
      assert.ok(topic.id.startsWith(subject.id + '.'), topic.id);
      assert.ok(!ids.has(topic.id), topic.id); ids.add(topic.id);
      assert.ok(topic.name && topic.ja && topic.match.length, topic.id);
    }
  }
  assert.equal(compiled.topicIds.size, taxonomy.subjects.reduce((n, s) => n + s.topics.length, 0));
});

test('simplified Chinese, Japanese and mixed spellings land on the same topic', () => {
  assert.equal(normalize('电磁 感应'), normalize('電磁感応'));
  for (const tags of [['运算放大器'], ['演算増幅器'], ['オペアンプ'], ['理想运放']]) assert.ok(topicsOf(tags).includes('electronic.opamp'), tags[0]);
  for (const tags of [['传递函数'], ['伝達関数']]) assert.ok(topicsOf(tags).includes('control.tf'), tags[0]);
  for (const tags of [['ラプラス変換'], ['拉普拉斯变换']]) assert.ok(topicsOf(tags).includes('math.laplace'), tags[0]);
  for (const tags of [['ビオ・サバールの法則'], ['毕奥-萨伐尔定律'], ['ビオサバール']]) assert.ok(topicsOf(tags).includes('em.magnetostatics'), tags[0]);
});

test('words hidden inside longer words do not leak into unrelated topics', () => {
  const never = [
    [['ローレンツ力'], 'em.induction'],
    [['半導体デバイス'], 'device.solid'],
    [['周波数特性'], 'physics.waves'],
    [['プランクの放射則'], 'math.linalg'],
    [['プログラム'], 'math.linalg'],
    [['双极晶体管'], 'device.solid'],
    [['MOSFET'], 'computer.arch'],
    [['SRAM'], 'signal.modulation'],
    [['チャネル長変調'], 'signal.modulation'],
    [['运放电路的传递函数'], 'power.systems'],
    [['时不变电路'], 'power.systems'],
    [['電気双極子'], 'electronic.bjt'],
    [['谐振子'], 'circuit.ac'],
    [['複素関数論'], 'computer.discrete'],
    [['スパムフィルタ'], 'signal.systems'],
    [['米勒指数'], 'electronic.amp'],
    [['マクスウェル分布'], 'em.waves'],
  ];
  for (const [tags, id] of never) assert.ok(!topicsOf(tags).includes(id), `${tags[0]} → ${id}`);
});

test('section names and combined paper subjects never decide a specific topic on their own', () => {
  // 早稲田「力学・回路理論・電磁気学」合卷名、东北「電気工学」大题名都只是科目或无信息。
  const combined = classify({ topics: [], title: '', number: '' }, compiled, ['力学・回路理論・電磁気学']);
  assert.deepEqual(combined.topics, []);
  const section = classify({ topics: ['電磁気学'], title: '电磁气学', number: '問題1' }, compiled);
  assert.deepEqual(section.topics, []);
  assert.deepEqual(section.subjects, ['em']);
  // 「力学」大题里的量子题按量子力学归类，不算经典力学。
  const quantum = classify({ topics: ['力学'], title: '高斯波包与不确定性', number: '力学 問4' }, compiled);
  assert.ok(quantum.topics.includes('physics.quantum'));
  assert.ok(!quantum.topics.includes('physics.mechanics'));
  assert.ok(topicsOf(['力学'], { title: '滑动细杆上质点的拉格朗日运动方程' }).includes('physics.mechanics'));
});

test('context rules split the same word by the rest of the question', () => {
  const qm = topicsOf(['期待値', 'シュレディンガー方程式']);
  assert.ok(qm.includes('physics.quantum'));
  assert.ok(!qm.includes('math.prob'));
  const prob = topicsOf(['期待値', '確率密度']);
  assert.ok(prob.includes('math.prob'));
  assert.ok(!prob.includes('physics.quantum'));
  assert.ok(topicsOf(['RC回路', 'ステップ応答']).includes('circuit.transient'));
  assert.ok(!topicsOf(['RC回路', 'ステップ応答']).includes('control.time'));
  assert.ok(topicsOf(['二次遅れ系', 'ステップ応答']).includes('control.time'));
});

test('overrides only add known ids and can move a question out of a topic', () => {
  const base = { topics: ['math.prob'], subjects: [], hits: [] };
  assert.deepEqual(applyOverride(base, { remove: ['math.prob'], add: ['physics.quantum'] }, compiled).topics, ['physics.quantum']);
  assert.deepEqual(applyOverride(base, { add: ['computer'] }, compiled).subjects, ['computer']);
  assert.throws(() => applyOverride(base, { add: ['math.nope'] }, compiled), /unknown topic/);
  for (const [id, entry] of Object.entries(overrides.questions)) {
    for (const t of [...(entry.add || []), ...(entry.remove || [])]) assert.ok(compiled.topicIds.has(t) || compiled.subjectIds.has(t), `${id}: ${t}`);
    assert.ok(entry.note, `${id} needs a note`);
  }
});

test('the committed index covers every question exactly once and matches a fresh build', () => {
  const fresh = build();
  assert.equal(fs.readFileSync(path.join(root, 'data/topics/topic-index.json'), 'utf8'), fresh.index, 'run node scripts/build-topic-index.cjs');
  assert.equal(fs.readFileSync(path.join(root, 'docs/topic-review.md'), 'utf8'), fresh.review, 'run node scripts/build-topic-index.cjs');
  const expected = bank.papers.reduce((n, p) => n + p.questionCount, 0);
  assert.equal(index.questionCount, expected);
  assert.equal(index.questions.length, expected);
  const ids = new Set(index.questions.map(r => r.q));
  assert.equal(ids.size, expected);
  for (const row of index.questions) {
    assert.ok(index.papers[row.p], row.q);
    for (const k of row.k) assert.ok(compiled.topicIds.has(k), `${row.q}: ${k}`);
    for (const s of row.s || []) assert.ok(compiled.subjectIds.has(s), `${row.q}: ${s}`);
    // 已归入具体知识点的科目，不再出现在同一题的「未细分」里。
    for (const s of row.s || []) assert.ok(!row.k.some(k => k.startsWith(s + '.')), `${row.q}: ${s}`);
  }
});

test('every topic has questions and most questions reach a specific topic', () => {
  for (const subject of index.subjects) for (const topic of subject.topics) assert.ok(topic.count > 0, topic.id);
  const placed = index.questions.filter(r => r.k.length).length;
  assert.ok(placed / index.questions.length > 0.8, `only ${placed} placed`);
});

test('known questions sit under the topics a reader would look for', () => {
  const row = id => index.questions.find(r => r.q === id);
  const cases = [
    ['kobe-ee-2015-it-q2', 'signal.info'],
    ['kobe-ee-2020-bussei-q1', 'device.solid'],
    ['waseda-eps-2023-mechanics-q5', 'physics.quantum'],
    ['kyushu-isee-ee-2010-f2', 'computer.logic'],
    ['kobe-ee-2002-denjiki-q1', 'em.electrostatics'],
    ['kyushu-isee-ee-2021-a4', 'circuit.transient'],
    ['kyushu-isee-ee-2023-m3', 'math.vector'],
    ['science-tokyo-ee-2003-am-circuit-2', 'circuit.line'],
  ];
  for (const [id, topic] of cases) {
    const r = row(id);
    if (!r) { assert.fail('missing question ' + id); continue; }
    assert.ok(r.k.includes(topic), `${id} → ${topic}: ${r.k}`);
  }
  assert.ok(!row('waseda-eps-2023-mechanics-q5').k.includes('physics.mechanics'));
});
