(function (root) {
  'use strict';
  // 目标学校：最多 4 所，每所可填出願截止日与考试日（用户自己核对官方要项后填写）。
  // 独立键名，不改动任何练习记录；只读逐题练习记录与知识点索引来算进度。
  const KEY = 'japan-study-journal:targets:v1';
  const MAX = 4;
  const schoolPattern = /^[a-z][a-z-]{0,40}$/;
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

  function validDate(value) {
    const m = typeof value === 'string' && datePattern.exec(value);
    if (!m) return '';
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? value : '';
  }

  function normalizeTarget(value) {
    if (!value || typeof value !== 'object' || !schoolPattern.test(value.school || '')) return null;
    return {
      school: value.school,
      name: typeof value.name === 'string' ? value.name.trim().slice(0, 40) : '',
      deadline: validDate(value.deadline),
      exam: validDate(value.exam),
      note: typeof value.note === 'string' ? value.note.trim().slice(0, 80) : '',
      addedAt: Number.isFinite(value.addedAt) ? value.addedAt : 0,
    };
  }

  function normalize(value) {
    if (!value || value.version !== 1 || !Array.isArray(value.targets)) return [];
    const seen = new Set(), out = [];
    for (const item of value.targets) {
      const t = normalizeTarget(item);
      if (!t || seen.has(t.school)) continue;
      seen.add(t.school); out.push(t);
      if (out.length === MAX) break;
    }
    return out;
  }

  function read(storage) {
    try { return normalize(JSON.parse((storage || root.localStorage).getItem(KEY))); }
    catch { return []; }
  }

  function save(targets, storage) {
    const clean = normalize({ version: 1, targets });
    try { (storage || root.localStorage).setItem(KEY, JSON.stringify({ version: 1, targets: clean })); return true; }
    catch { return false; }
  }

  function upsert(targets, target) {
    const t = normalizeTarget(target);
    if (!t) return targets;
    const at = targets.findIndex(x => x.school === t.school);
    if (at >= 0) return targets.map((x, i) => i === at ? { ...t, addedAt: x.addedAt || t.addedAt } : x);
    if (targets.length >= MAX) return targets;
    return [...targets, t];
  }

  function remove(targets, school) { return targets.filter(t => t.school !== school); }

  // 按本地日历计算还剩几天：今天 = 0，过去为负数。
  function daysUntil(date, now = new Date()) {
    if (!validDate(date)) return null;
    const [y, m, d] = date.split('-').map(Number);
    const target = Date.UTC(y, m - 1, d);
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
  }

  function countdownText(days) {
    if (days === null) return '';
    if (days > 0) return `还有 ${days} 天`;
    if (days === 0) return '就是今天';
    return '已过';
  }

  // 下一个尚未过去的日期（首页一行提示用）。
  function nextEvent(targets, names, now = new Date()) {
    let best = null;
    for (const t of targets) {
      for (const [kind, label] of [['deadline', '出願截止'], ['exam', '考试']]) {
        const days = daysUntil(t[kind], now);
        if (days === null || days < 0) continue;
        if (!best || days < best.days) best = { school: t.school, name: (names && names[t.school]) || t.name || t.school, kind, label, days, date: t[kind] };
      }
    }
    return best;
  }

  // 某校逐题完成度与「常考但还没练」的知识点（按该校题数排序）。
  function schoolProgress(index, school, records) {
    const rows = index.questions.filter(r => index.papers[r.p] && index.papers[r.p].schoolId === school);
    const done = r => Boolean(records && records[r.q] && records[r.q].completed === true);
    const byTopic = new Map();
    for (const r of rows) for (const k of r.k) {
      const s = byTopic.get(k) || { id: k, total: 0, done: 0 };
      s.total++; if (done(r)) s.done++;
      byTopic.set(k, s);
    }
    const names = new Map(index.subjects.flatMap(s => s.topics.map(t => [t.id, t.name])));
    const topics = [...byTopic.values()].map(t => ({ ...t, name: names.get(t.id) || t.id })).sort((a, b) => b.total - a.total || a.id.localeCompare(b.id));
    return { total: rows.length, done: rows.filter(done).length, topics, gaps: topics.filter(t => t.done === 0).slice(0, 5) };
  }

  // 首页一行提示：最近一个还没过的出願截止或考试日。
  function mountCountdown(node, storage, now) {
    const doc = node && node.ownerDocument;
    if (!doc) return null;
    const next = nextEvent(read(storage), null, now);
    if (!next) { node.hidden = true; node.replaceChildren(); return null; }
    const link = doc.createElement('a');
    link.href = 'desk.html#target-panel';
    const strong = doc.createElement('strong');
    strong.textContent = next.days === 0 ? '就是今天' : next.days + ' 天';
    link.append(doc.createTextNode(`距 ${next.name} ${next.label}${next.days === 0 ? '：' : '还有 '}`), strong, doc.createTextNode(' →'));
    node.replaceChildren(link);
    node.hidden = false;
    return next;
  }

  const api = { KEY, mountCountdown, MAX, validDate, normalize, read, save, upsert, remove, daysUntil, countdownText, nextEvent, schoolProgress };
  root.StudyTargets = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root.document) {
    const start = () => root.document.querySelectorAll('[data-target-countdown]').forEach(node => mountCountdown(node));
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start);
    else start();
  }
})(typeof window !== 'undefined' ? window : globalThis);
