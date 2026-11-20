(function (root) {
  'use strict';
  // 「继续上次」：只记住最后打开的逐题练习位置，独立键名，不改动逐题或整卷练习记录。
  const KEY = 'japan-study-journal:last-question:v1';
  const idPattern = /^[A-Za-z0-9][A-Za-z0-9._-]{0,159}$/;
  const clip = (value, max) => typeof value === 'string' ? value.slice(0, max) : '';

  function normalize(value) {
    if (!value || typeof value !== 'object' || value.version !== 1) return null;
    if (!idPattern.test(value.paper || '') || !idPattern.test(value.q || '')) return null;
    const position = Number.isInteger(value.position) && value.position > 0 ? value.position : 0;
    const total = Number.isInteger(value.total) && value.total >= position ? value.total : 0;
    return {
      version: 1,
      paper: value.paper,
      q: value.q,
      paperTitle: clip(value.paperTitle, 200),
      number: clip(value.number, 40),
      title: clip(value.title, 200),
      position,
      total,
      at: Number.isFinite(value.at) ? value.at : 0,
    };
  }

  function read(storage) {
    try { return normalize(JSON.parse((storage || root.localStorage).getItem(KEY))); }
    catch { return null; }
  }

  function save(entry, storage) {
    const value = normalize({ ...entry, version: 1, at: Date.now() });
    if (!value) return false;
    try { (storage || root.localStorage).setItem(KEY, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function url(entry) {
    return 'question-practice.html?' + new URLSearchParams({ paper: entry.paper, q: entry.q }).toString();
  }

  function ago(at, now = Date.now()) {
    if (!at) return '';
    const minutes = Math.max(0, Math.round((now - at) / 60000));
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes} 分钟前`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} 小时前`;
    const days = Math.round(hours / 24);
    return days < 30 ? `${days} 天前` : '';
  }

  function mount(container, storage) {
    const doc = container && container.ownerDocument;
    if (!doc) return null;
    const entry = read(storage);
    if (!entry) { container.hidden = true; container.replaceChildren(); return null; }
    const make = (tag, text, className) => { const n = doc.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; };
    const link = make('a', '', 'resume-card');
    link.href = url(entry);
    const label = make('span', '继续上次', 'resume-label');
    const when = ago(entry.at);
    if (when) label.append(make('small', ' · ' + when));
    const body = make('span', '', 'resume-body');
    body.append(make('strong', [entry.number, entry.title].filter(Boolean).join(' '), 'resume-title'));
    const meta = [entry.paperTitle, entry.position && entry.total ? `第 ${entry.position} / ${entry.total} 题` : ''].filter(Boolean).join(' · ');
    if (meta) body.append(make('span', meta, 'resume-meta'));
    link.append(label, body, make('span', '→', 'resume-arrow'));
    link.setAttribute('aria-label', `继续上次练习：${[entry.paperTitle, entry.number, entry.title].filter(Boolean).join(' ')}`);
    container.replaceChildren(link);
    container.hidden = false;
    return entry;
  }

  const api = { KEY, read, save, url, ago, mount, normalize };
  root.StudyResume = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root.document) {
    const start = () => root.document.querySelectorAll('[data-study-resume]').forEach(node => mount(node));
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start);
    else start();
  }
})(typeof window !== 'undefined' ? window : globalThis);
