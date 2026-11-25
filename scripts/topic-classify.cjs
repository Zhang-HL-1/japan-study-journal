'use strict';
// 知识点自动归类：把题目的 topics 标签、题号和中文导航标题与 data/topics/taxonomy.json 的匹配词比对。
// 只读原题数据，不改写；人工修正写在 data/topics/overrides.json。

// 繁简/日中字形统一表放在 text-normalize.js（与全站搜索共用）；这里用其中的 BASE 表，行为不变。
const { normalize } = require('../text-normalize.js');

const SEP = /[\s・·\-‐－—–_/／]+/g;

// 每个匹配词编译成 { kind, test }：
//   sub  普通词，包含即命中；exact  = 开头，整条文本相同才命中；re  re: 开头的正则；
//   all  all: 开头的正则，对同一题所有文本连起来的整体比对（按上下文区分同一个词）。
function compileMatcher(word) {
  if (word.startsWith('all:')) {
    const re = new RegExp(normalize(word.slice(4).replace(SEP, '')), 'u');
    return { kind: 'all', test: text => re.test(text) };
  }
  if (word.startsWith('re:')) {
    const re = new RegExp(normalize(word.slice(3).replace(SEP, '')), 'u');
    return { kind: 're', test: text => re.test(text) };
  }
  if (word.startsWith('=')) {
    const exact = normalize(word.slice(1));
    return { kind: 'exact', test: text => text === exact };
  }
  const needle = normalize(word);
  if (!needle) throw new Error('empty match word');
  return { kind: 'sub', test: text => text.includes(needle) };
}

function compile(taxonomy) {
  const subjects = taxonomy.subjects.map(subject => ({
    id: subject.id,
    match: (subject.match || []).map(word => ({ word, ...compileMatcher(word) })),
    topics: subject.topics.map(topic => ({
      id: topic.id,
      subject: subject.id,
      match: topic.match.map(word => ({ word, ...compileMatcher(word) })),
    })),
  }));
  const topicIds = new Set(subjects.flatMap(s => s.topics.map(t => t.id)));
  const subjectIds = new Set(subjects.map(s => s.id));
  return { subjects, topicIds, subjectIds };
}

// 题号里常带大题名（「力学（その1）(1)」「問題3 電気回路」），去掉序号部分再比对。
function numberText(number) {
  return String(number || '').replace(/[（(][^）)]*[）)]/g, ' ').replace(/(第?[0-9０-９一二三四五六七八九十]+[問题題]?|問題|问题|大問|设问|設問|その[0-9０-９])/g, ' ');
}

// 返回 { topics: [...], subjects: [...], hits: [{ field, text, id, word }] }
// field: tag = 完整标签；title = 中文导航标题；number = 题号里的大题名；paper = 卷子科目名（只做完全匹配）。
// 完全匹配（=）只对整条文本生效（标签、大题名、标题冒号前后的分段、卷子科目名）。
function classify(question, compiled, paperSubjects = []) {
  const sources = [];
  for (const tag of question.topics || []) sources.push({ field: 'tag', raw: tag, text: normalize(tag), whole: true });
  if (question.title) sources.push({ field: 'title', raw: question.title, text: normalize(question.title), whole: false });
  const num = normalize(numberText(question.number));
  // 题号里的大题名只做完全匹配：早稲田「力学」大题也收量子题，不能凭题号就标成力学。
  if (num) sources.push({ field: 'number', raw: question.number, text: num, whole: true, exactOnly: true });
  // 标题常写成「电气回路：无损耗分布参数线路」，冒号前后分开当作整体文本再比对一次。
  if (question.title && /[:：]/.test(question.title)) {
    for (const part of question.title.split(/[:：]/)) {
      const text = normalize(part);
      if (text) sources.push({ field: 'title', raw: part, text, whole: true, exactOnly: true });
    }
  }
  for (const name of paperSubjects) {
    const text = normalize(name);
    if (text) sources.push({ field: 'paper', raw: name, text, whole: true, exactOnly: true });
  }
  const joined = sources.filter(src => src.field !== 'paper').map(src => src.text).join('¦');
  const usable = (m, src) => m.kind === 'all' ? false
    : m.kind === 'exact' ? src.whole
    : !src.exactOnly;
  const find = matchers => {
    for (const src of sources) {
      const m = matchers.find(x => usable(x, src) && x.test(src.text));
      if (m) return { m, src };
    }
    const m = matchers.find(x => x.kind === 'all' && x.test(joined));
    return m ? { m, src: { field: 'all', raw: '（上下文）' } } : null;
  };
  const topics = new Set(), subjects = new Set(), hits = [];
  for (const subject of compiled.subjects) {
    for (const topic of subject.topics) {
      const found = find(topic.match);
      if (found) { topics.add(topic.id); hits.push({ field: found.src.field, text: found.src.raw, id: topic.id, word: found.m.word }); }
    }
    const found = find(subject.match);
    if (found) { subjects.add(subject.id); hits.push({ field: found.src.field, text: found.src.raw, id: subject.id, word: found.m.word }); }
  }
  return { topics: [...topics], subjects: [...subjects], hits };
}

// 人工修正：{ "questions": { "<题目id>": { "add": [...], "remove": [...], "note": "..." } } }
function applyOverride(result, override, compiled) {
  if (!override) return result;
  const topics = new Set(result.topics);
  for (const id of override.remove || []) topics.delete(id);
  for (const id of override.add || []) {
    if (!compiled.topicIds.has(id) && !compiled.subjectIds.has(id)) throw new Error('override uses unknown topic: ' + id);
    topics.add(id);
  }
  const subjects = new Set(result.subjects);
  for (const id of [...topics]) if (compiled.subjectIds.has(id)) { subjects.add(id); topics.delete(id); }
  for (const id of override.remove || []) subjects.delete(id);
  return { ...result, topics: [...topics], subjects: [...subjects] };
}

module.exports = { normalize, compile, classify, applyOverride, numberText };
