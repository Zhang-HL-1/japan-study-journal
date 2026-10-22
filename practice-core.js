(function (root) {
  'use strict';
  const blank = () => ({ version: 1, records: {}, days: [], current: null, filters: {} });
  const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  function cleanState(value, bank) {
    if (!value || value.version !== 1 || typeof value.records !== 'object' || !value.records || Array.isArray(value.records)) throw new Error('这不是受支持的练习记录文件。');
    const state = blank();
    for (const q of bank) {
      if (!own(value.records, q.id)) continue;
      const v = value.records[q.id];
      if (!v || typeof v !== 'object') continue;
      const text = key => typeof v[key] === 'string' ? v[key].slice(0, 6000) : '';
      const count = key => Number.isSafeInteger(v[key]) && v[key] >= 0 ? Math.min(v[key], 1000000) : 0;
      state.records[q.id] = { attempts: count('attempts'), correct: v.correct === true ? true : v.correct === false ? false : null, wrongCount: count('wrongCount'), bookmarked: v.bookmarked === true, note: text('note'), draft: text('draft'), answer: (q.type === 'choice' && Number.isInteger(v.answer) && v.answer >= 0 && v.answer < q.options.length) ? v.answer : (typeof v.answer === 'string' ? v.answer.slice(0, 6000) : null), updated: text('updated') };
    }
    if (Array.isArray(value.days)) state.days = [...new Set(value.days.filter(d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)))].sort().slice(-366);
    if (bank.some(q => q.id === value.current)) state.current = value.current;
    const f = value.filters || {};
    for (const key of ['subject','chapter','difficulty','type','scope','order','search','sourceKind','school','major','book']) if (typeof f[key] === 'string') state.filters[key] = f[key].slice(0, key === 'major' ? 1000 : 200);
    return state;
  }
  function parseNumber(raw) {
    const s = String(raw).normalize('NFKC').trim().replace(/[−–]/g, '-');
    const atom = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
    if (atom.test(s)) { const n = Number(s); return Number.isFinite(n) ? n : null; }
    const parts = s.split('/').map(p => p.trim());
    if (parts.length === 2 && parts.every(p => atom.test(p)) && Number(parts[1]) !== 0) {
      const n = Number(parts[0])/Number(parts[1]); return Number.isFinite(n) ? n : null;
    }
    return null;
  }
  function grade(q, answer) {
    if (q.type === 'choice') return Number.isInteger(answer) && answer === q.answer;
    if (q.type === 'numeric') { const n = parseNumber(answer); return n === null ? null : Math.abs(n-q.answer) <= q.tolerance + Number.EPSILON*Math.max(1,Math.abs(q.answer))*8; }
    return null;
  }
  const sourceKinds = { exam: '历年真题', workbook: '参考书 / 练习册', original: '原创题' };
  function provenance(q) {
    return q.provenance || { kind: 'unknown', label: q.source || '来源待标注' };
  }
  function sourceLabel(q) {
    const s = provenance(q);
    return [sourceKinds[s.kind] || '来源待分类', s.school, s.graduate, s.major, s.year,
      s.book, s.edition, s.chapter, s.number && `题号 ${s.number}`, s.page && `第 ${s.page} 页`, s.label].filter(Boolean).join(' · ');
  }
  function sourceMatches(q, f) {
    const s = provenance(q), selected = k => f[k] && f[k] !== 'all';
    if (selected('sourceKind') && s.kind !== f.sourceKind) return false;
    if (s.kind === 'exam') {
      if (selected('school') && s.school !== f.school) return false;
      if (selected('major') && JSON.stringify([s.school, s.graduate || '', s.major]) !== f.major) return false;
    } else if (s.kind === 'workbook') {
      if (selected('book') && s.book !== f.book) return false;
    } else if (selected('school') || selected('major') || selected('book')) return false;
    return true;
  }
  function filterQuestions(bank, filters, records) {
    const search = (filters.search || '').trim().toLowerCase();
    return bank.filter(q => {
      const r = records[q.id] || {};
      if (!sourceMatches(q, filters)) return false;
      if (['subject','chapter','difficulty','type'].some(k => filters[k] && filters[k] !== 'all' && q[k] !== filters[k])) return false;
      if (filters.scope === 'wrong' && r.correct !== false) return false;
      if (filters.scope === 'bookmarked' && !r.bookmarked) return false;
      if (filters.scope === 'unanswered' && r.attempts > 0) return false;
      return !search || [q.title,q.prompt,q.subject,q.chapter,sourceLabel(q)].join(' ').toLowerCase().includes(search);
    });
  }
  function shuffle(list, random = Math.random) {
    const result = list.slice();
    for (let i = result.length-1; i > 0; i--) { const j = Math.floor(random()*(i+1)); [result[i],result[j]] = [result[j],result[i]]; }
    return result;
  }
  function recordResult(state, id, correct, answer, day) {
    const r = state.records[id] || {};
    state.records[id] = { ...r, attempts: (r.attempts || 0)+1, correct: Boolean(correct), wrongCount: (r.wrongCount || 0)+(correct ? 0 : 1), answer, updated: new Date().toISOString() };
    if (!state.days.includes(day)) state.days.push(day);
    state.days = state.days.sort().slice(-366);
    return state.records[id];
  }
  function stats(bank, state) {
    const list = bank.map(q => state.records[q.id] || {});
    const attempted = list.filter(r => r.attempts > 0).length;
    const correct = list.filter(r => r.attempts > 0 && r.correct === true).length;
    return { total: bank.length, attempted, correct, wrong: list.filter(r => r.correct === false).length, bookmarked: list.filter(r => r.bookmarked).length, accuracy: attempted ? Math.round(correct/attempted*100) : 0 };
  }
  const api = { provenance, sourceLabel, sourceMatches, blank, cleanState, parseNumber, grade, filterQuestions, shuffle, recordResult, stats };
  root.QuizCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);

