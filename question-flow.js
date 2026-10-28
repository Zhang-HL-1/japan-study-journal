(function(root) {
  'use strict';
  const QUEUE_KEY = 'japan-study-journal:question-queue:v1';
  const valid = value => typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,120}$/.test(value);
  function filter(rows, filters, records = {}) {
    const needle = (filters.search || '').trim().toLocaleLowerCase();
    return rows.filter(q => (!filters.school || filters.school === q.school)
      && (!filters.major || filters.major === q.majorKey)
      && (!filters.year || String(q.year) === filters.year)
      && (!filters.subject || q.subjects.includes(filters.subject))
      && (filters.scope !== 'unanswered' || !records[q.id]?.completed)
      && (filters.scope !== 'bookmarked' || records[q.id]?.bookmarked)
      && (!needle || [q.title,q.number,q.school,q.major,q.year,...q.topics].join(' ').toLocaleLowerCase().includes(needle)));
  }
  function cleanQueue(value) {
    if (!value || value.version !== 1 || !Array.isArray(value.items) || !value.items.length || value.items.length > 10000) return null;
    const seen = new Set();
    if (value.items.some(q => !q || !valid(q.paper) || !valid(q.id) || seen.has(q.id) || !seen.add(q.id))) return null;
    return {version:1, items:value.items.map(q => ({paper:q.paper,id:q.id}))};
  }
  function readQueue(storage) { try { return cleanQueue(JSON.parse(storage.getItem(QUEUE_KEY))); } catch { return null; } }
  function url(item, queued = true) {
    return 'question-practice.html?' + new URLSearchParams({paper:item.paper,q:item.id,...(queued ? {queue:'1'} : {})});
  }
  // A year switch replaces only the year; all other hub filters still apply.
  // Direct-paper links stay in the same paper series (including exam track).
  function adjacentYears(rows, items, filters, records = {}, directPaper = '') {
    const ids = new Set(items.map(q => q.id));
    const current = rows.filter(q => ids.has(q.id));
    const years = new Set(current.map(q => q.year));
    if (!current.length || current.length !== ids.size || years.size !== 1) return null;
    const year = current[0].year;
    let candidates = filter(rows, {...filters, year:''}, records);
    if (directPaper) {
      const series = id => id.replace(/\b\d{4}\b/, '{year}');
      candidates = candidates.filter(q => q.majorKey === current[0].majorKey && series(q.paper) === series(directPaper));
    }
    const available = [...new Set(candidates.map(q => q.year))].sort((a,b) => a-b);
    const target = y => y === undefined ? null : {year:y, items:candidates.filter(q => q.year === y).map(q => ({paper:q.paper,id:q.id}))};
    return {year, previous:target(available.filter(y => y < year).pop()), next:target(available.find(y => y > year))};
  }
  const api = {QUEUE_KEY,filter,cleanQueue,readQueue,url,adjacentYears};
  root.QuestionFlow = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
