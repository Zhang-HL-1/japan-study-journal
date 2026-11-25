(function (root) {
  'use strict';
  // 「继续上次」：只记住最后打开的逐题练习位置，独立键名，不改动逐题或整卷练习记录。
  const KEY = 'japan-study-journal:last-question:v1';
  // 卡片只在最近 24 小时内练过时显示；点 × 关闭后隐藏，直到下一次打开逐题练习。
  const FRESH_MS = 24 * 3600 * 1000;
  const idPattern = /^[A-Za-z0-9][A-Za-z0-9._-]{0,159}$/;
  // 从「按知识点练」进入时一并记住知识点，继续时回到同一个知识点队列。
  const topicPattern = /^[a-z]+(?:\.[a-z]+)?$/, schoolPattern = /^[a-z][a-z-]{0,40}$/;
  const clip = (value, max) => typeof value === 'string' ? value.slice(0, max) : '';

  function normalize(value) {
    if (!value || typeof value !== 'object' || value.version !== 1) return null;
    if (!idPattern.test(value.paper || '') || !idPattern.test(value.q || '')) return null;
    const position = Number.isInteger(value.position) && value.position > 0 ? value.position : 0;
    const total = Number.isInteger(value.total) && value.total >= position ? value.total : 0;
    const topic = typeof value.topic === 'string' && topicPattern.test(value.topic) ? value.topic : '';
    const extra = topic ? { topic, school: typeof value.school === 'string' && schoolPattern.test(value.school) ? value.school : '', topicName: clip(value.topicName, 60) } : {};
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
      ...(Number.isFinite(value.dismissedAt) ? { dismissedAt: value.dismissedAt } : {}),
      ...extra,
    };
  }

  function read(storage) {
    try { return normalize(JSON.parse((storage || root.localStorage).getItem(KEY))); }
    catch { return null; }
  }

  function save(entry, storage) {
    // 新的一次练习覆盖整条记录，不带 dismissedAt，所以关闭过的卡片会重新出现。
    const { dismissedAt, ...fresh } = entry || {};
    const value = normalize({ ...fresh, version: 1, at: Date.now() });
    if (!value) return false;
    try { (storage || root.localStorage).setItem(KEY, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function visible(entry, now = Date.now()) {
    if (!entry || !entry.at) return false;
    if (entry.dismissedAt && entry.dismissedAt >= entry.at) return false;
    return now - entry.at <= FRESH_MS;
  }

  function dismiss(storage, now = Date.now()) {
    const entry = read(storage);
    if (!entry) return false;
    try { (storage || root.localStorage).setItem(KEY, JSON.stringify(normalize({ ...entry, dismissedAt: now }))); return true; }
    catch { return false; }
  }

  function url(entry) {
    const params = new URLSearchParams({ paper: entry.paper, q: entry.q });
    if (entry.topic) { params.set('topic', entry.topic); if (entry.school) params.set('school', entry.school); }
    return 'question-practice.html?' + params.toString();
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

  function mount(container, storage, now = Date.now()) {
    const doc = container && container.ownerDocument;
    if (!doc) return null;
    const entry = read(storage);
    if (!visible(entry, now)) { container.hidden = true; container.replaceChildren(); return null; }
    const make = (tag, text, className) => { const n = doc.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; };
    const link = make('a', '', 'resume-card');
    link.href = url(entry);
    const label = make('span', '继续上次', 'resume-label');
    const when = ago(entry.at);
    if (when) label.append(make('small', ' · ' + when));
    const body = make('span', '', 'resume-body');
    body.append(make('strong', [entry.number, entry.title].filter(Boolean).join(' '), 'resume-title'));
    const meta = [entry.topicName ? '按知识点：' + entry.topicName : '', entry.paperTitle, entry.position && entry.total ? `第 ${entry.position} / ${entry.total} 题` : ''].filter(Boolean).join(' · ');
    if (meta) body.append(make('span', meta, 'resume-meta'));
    link.append(label, body, make('span', '→', 'resume-arrow'));
    link.setAttribute('aria-label', `继续上次练习：${[entry.paperTitle, entry.number, entry.title].filter(Boolean).join(' ')}`);
    const close = make('button', '×', 'resume-close');
    close.type = 'button';
    close.setAttribute('aria-label', '关闭「继续上次」，下次练习后会再出现');
    close.title = '关闭';
    close.addEventListener('click', () => {
      dismiss(storage);
      container.hidden = true;
      container.replaceChildren();
    });
    container.replaceChildren(link, close);
    container.hidden = false;
    return entry;
  }

  const api = { KEY, FRESH_MS, read, save, url, ago, mount, normalize, visible, dismiss };
  root.StudyResume = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root.document) {
    const start = () => root.document.querySelectorAll('[data-study-resume]').forEach(node => mount(node));
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start);
    else start();
    // 另一个标签页关闭卡片或练了新题时同步；从浏览器缓存返回时重新判断是否过期。
    root.addEventListener('storage', event => { if (event.key === KEY) start(); });
    root.addEventListener('pageshow', event => { if (event.persisted) start(); });
  }
})(typeof window !== 'undefined' ? window : globalThis);
