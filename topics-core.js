(function (root) {
  'use strict';
  // 「按知识点练」的共用逻辑：知识点页面、逐题练习页的知识点模式和测试都用这一份。
  // 只读 data/topics/topic-index.json 与逐题练习记录，不写任何存储。
  const INDEX_PATH = 'data/topics/topic-index.json';
  const topicPattern = /^[a-z]+(?:\.[a-z]+)?$/;
  const schoolPattern = /^[a-z][a-z-]{0,40}$/;
  const SORTS = ['year', 'school'];
  const STATUSES = ['all', 'todo', 'done', 'starred'];

  function findTopic(index, id) {
    if (!index || typeof id !== 'string' || !topicPattern.test(id)) return null;
    for (const subject of index.subjects) {
      if (subject.id === id) return { id, kind: 'subject', subject, name: subject.name, ja: subject.ja, count: subject.count };
      const topic = subject.topics.find(t => t.id === id);
      if (topic) return { id, kind: 'topic', subject, name: topic.name, ja: topic.ja, count: topic.count };
    }
    return null;
  }

  // 科目 id（如 circuit）表示整个科目：所有具体知识点加上「未细分」。
  function inTopic(row, id) {
    if (id.includes('.')) return row.k.includes(id);
    return row.k.some(k => k.startsWith(id + '.')) || (row.s || []).includes(id);
  }

  function normalizeOptions(index, options = {}) {
    const topic = findTopic(index, options.topic) ? options.topic : '';
    const school = typeof options.school === 'string' && schoolPattern.test(options.school) && schools(index).some(s => s.id === options.school) ? options.school : '';
    const sort = SORTS.includes(options.sort) ? options.sort : 'year';
    const status = STATUSES.includes(options.status) ? options.status : 'all';
    return { topic, school, sort, status };
  }

  function schools(index) {
    const seen = new Map();
    for (const paper of Object.values(index.papers)) if (!seen.has(paper.schoolId)) seen.set(paper.schoolId, paper.school || paper.schoolId);
    return [...seen].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }

  // 年份新的在前；同年按学校、卷子、题目原顺序。没有年份的排最后。
  function compareRows(index, sort, order) {
    return (a, b) => {
      const pa = index.papers[a.p], pb = index.papers[b.p];
      const ya = Number.isInteger(pa.year) ? pa.year : -1, yb = Number.isInteger(pb.year) ? pb.year : -1;
      const bySchool = (pa.school || '').localeCompare(pb.school || '', 'ja');
      const primary = sort === 'school' ? (bySchool || yb - ya) : (yb - ya || bySchool);
      return primary || order.get(a) - order.get(b);
    };
  }

  // 题目队列：只看知识点、学校和排序，不按练习状态过滤，做完一题时队列不会跳动。
  function queue(index, options) {
    const opts = normalizeOptions(index, options);
    if (!opts.topic) return [];
    const order = new Map(index.questions.map((row, i) => [row, i]));
    return index.questions
      .filter(row => inTopic(row, opts.topic) && (!opts.school || index.papers[row.p].schoolId === opts.school))
      .sort(compareRows(index, opts.sort, order));
  }

  function statusOf(row, records) {
    const r = (records && records[row.q]) || {};
    return { completed: r.completed === true, bookmarked: r.bookmarked === true, note: typeof r.note === 'string' && r.note.trim() !== '' };
  }

  function list(index, options, records) {
    const opts = normalizeOptions(index, options);
    return queue(index, opts).filter(row => {
      const s = statusOf(row, records);
      return opts.status === 'todo' ? !s.completed : opts.status === 'done' ? s.completed : opts.status === 'starred' ? s.bookmarked : true;
    });
  }

  function progress(index, id, records, school) {
    const rows = queue(index, { topic: id, school });
    return { total: rows.length, done: rows.filter(row => statusOf(row, records).completed).length };
  }

  function neighbors(rows, questionId) {
    const at = rows.findIndex(row => row.q === questionId);
    if (at < 0) return null;
    return { position: at + 1, total: rows.length, previous: rows[at - 1] || null, next: rows[at + 1] || null };
  }

  // 链接只带非默认的筛选，网址短一些；逐题练习页据此重建同一个队列。
  function context(options) {
    const params = new URLSearchParams();
    if (options.topic) params.set('topic', options.topic);
    if (options.school) params.set('school', options.school);
    if (options.sort && options.sort !== 'year') params.set('sort', options.sort);
    return params;
  }

  function practiceURL(row, options) {
    const params = new URLSearchParams({ paper: row.p, q: row.q });
    for (const [key, value] of context(options)) params.set(key, value);
    return 'question-practice.html?' + params.toString();
  }

  function topicsURL(options) {
    const params = context(options);
    if (options.status && options.status !== 'all') params.set('status', options.status);
    const query = params.toString();
    return 'topics.html' + (query ? '?' + query : '');
  }

  function yearText(paper) {
    return Number.isInteger(paper.year) ? paper.year + ' 年' : '年份未标';
  }

  const api = { INDEX_PATH, SORTS, STATUSES, findTopic, inTopic, normalizeOptions, schools, queue, list, statusOf, progress, neighbors, practiceURL, topicsURL, yearText };
  root.TopicIndex = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
