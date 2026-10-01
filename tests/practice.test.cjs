const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../practice-core.js');
const actualBank = require('../questions.js');
// 以下仅为自动测试数据，不加载到网站中，不是预置题库。
const fixtures = [
  { id: 'test-choice', subject: 'S1', chapter: 'C1', difficulty: '基础', type: 'choice', title: 'Choice fixture', prompt: 'P1', options: ['a','b'], answer: 1 },
  { id: 'test-number', subject: 'S1', chapter: 'C2', difficulty: '进阶', type: 'numeric', title: 'Number fixture', prompt: 'P2', answer: .5, tolerance: .001 },
  { id: 'test-written', subject: 'S2', chapter: 'C3', difficulty: '进阶', type: 'written', title: 'Written fixture', prompt: 'P3' }
];
test('production bank is an array with unique stable IDs', () => {
  assert.ok(Array.isArray(actualBank)); assert.equal(new Set(actualBank.map(q=>q.id)).size,actualBank.length);
  for (const q of actualBank) { assert.equal(typeof q.id,'string'); assert.ok(['choice','numeric','written'].includes(q.type)); assert.ok(Array.isArray(q.explanation)); }
});
test('numeric parser supports decimals, fractions, scientific and full-width input', () => {
  for (const [raw,value] of [[' 0.5 ',.5], ['1 / 2',.5], ['−2',-2], ['１／２',.5], ['1e-3',.001], ['-.5',-.5]]) assert.equal(core.parseNumber(raw),value);
});
test('invalid numeric input is not evaluated', () => {
  for (const s of ['', 'Infinity', 'NaN', '1/0', '1/2/3', '2+2', '0.5 V', 'alert(1)', '1e999', '0x10']) assert.equal(core.parseNumber(s),null);
});
test('choice grading uses selected index, not coercion', () => {
  assert.equal(core.grade(fixtures[0],1),true); assert.equal(core.grade(fixtures[0],0),false); assert.equal(core.grade(fixtures[0],'1'),false);
});
test('numeric grading uses tolerance, distinguishes malformed answers', () => {
  assert.equal(core.grade(fixtures[1],'1/2'),true); assert.equal(core.grade(fixtures[1],'.501'),true);
  assert.equal(core.grade(fixtures[1],'.502'),false); assert.equal(core.grade(fixtures[1],'bad'),null);
  assert.equal(core.grade({type:'numeric',answer:0,tolerance:0},'0'),true);
});
test('written answers do not receive automatic scores', () => { assert.equal(core.grade(fixtures[2],'text'),null); });
test('empty bank has zero stats and filters return empty list', () => {
  const s = core.blank(); assert.deepEqual(core.stats([],s),{total:0,attempted:0,correct:0,wrong:0,bookmarked:0,accuracy:0});
  assert.deepEqual(core.filterQuestions([],{},{}),[]);
});
test('filter combination respects subject, chapter, difficulty and type', () => {
  assert.deepEqual(core.filterQuestions(fixtures,{subject:'S1',chapter:'C2',difficulty:'进阶',type:'numeric'},{}),[fixtures[1]]);
  assert.deepEqual(core.filterQuestions(fixtures,{search:'choice'},{}),[fixtures[0]]);
});
test('wrong answer enters notebook and correct retry removes it', () => {
  const s=core.blank(); core.recordResult(s,'test-choice',false,0,'2026-10-01');
  assert.deepEqual(core.filterQuestions(fixtures,{scope:'wrong'},s.records),[fixtures[0]]);
  core.recordResult(s,'test-choice',true,1,'2026-10-01');
  assert.deepEqual(core.filterQuestions(fixtures,{scope:'wrong'},s.records),[]);
  assert.equal(s.records['test-choice'].attempts,2); assert.equal(s.records['test-choice'].wrongCount,1); assert.deepEqual(s.days,['2026-10-01']);
});
test('unanswered and bookmarked are independent of correctness', () => {
  const s=core.blank(); s.records['test-number']={bookmarked:true}; core.recordResult(s,'test-choice',false,0,'2026-10-01');
  assert.deepEqual(core.filterQuestions(fixtures,{scope:'bookmarked'},s.records),[fixtures[1]]);
  assert.deepEqual(core.filterQuestions(fixtures,{scope:'unanswered'},s.records),[fixtures[1],fixtures[2]]);
});
test('stats use latest answers, include self-evaluated written results', () => {
  const s=core.blank(); core.recordResult(s,'test-choice',true,1,'2026-10-01'); core.recordResult(s,'test-written',false,'note','2026-10-02');
  const v=core.stats(fixtures,s); assert.equal(v.accuracy,50); assert.equal(v.attempted,2); assert.equal(v.wrong,1);
});
test('shuffle preserves all entries and never mutates source', () => {
  const copy=fixtures.slice(); const shuffled=core.shuffle(fixtures,()=>0); assert.deepEqual(fixtures,copy); assert.equal(new Set(shuffled).size,3); assert.notDeepEqual(shuffled,fixtures);
});
test('backup roundtrip preserves notes, bookmarks and answers', () => {
  const s=core.blank(); core.recordResult(s,'test-choice',true,1,'2026-10-01'); Object.assign(s.records['test-choice'],{note:'my note',draft:'1',bookmarked:true}); s.current='test-choice';
  const imported=core.cleanState(JSON.parse(JSON.stringify(s)),fixtures); assert.deepEqual(imported,s);
});
test('backup validation ignores unknown IDs and strips hostile or invalid fields', () => {
  const input=JSON.parse('{"version":1,"records":{"__proto__":{"polluted":true},"unknown":{"attempts":9},"test-choice":{"attempts":-1,"correct":"yes","answer":99,"note":"ok","wrongCount":1.5}},"days":["2026-10-01","invalid","2026-10-01"],"current":"unknown"}');
  const s=core.cleanState(input,fixtures); assert.equal(Object.keys(s.records).length,1); assert.equal({}.polluted,undefined); assert.equal(s.records['test-choice'].attempts,0); assert.equal(s.records['test-choice'].correct,null); assert.equal(s.records['test-choice'].answer,null); assert.deepEqual(s.days,['2026-10-01']); assert.equal(s.current,null);
});
test('malformed backups are rejected', () => { for (const input of [null,{}, {version:2,records:{}}, {version:1,records:[]}]) assert.throws(()=>core.cleanState(input,fixtures)); });
