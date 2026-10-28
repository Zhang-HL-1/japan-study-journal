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
  const api = {QUEUE_KEY,filter,cleanQueue,readQueue,url};
  root.QuestionFlow = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
