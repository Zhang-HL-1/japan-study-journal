(function (root) {
  'use strict';
  // 全站搜索：学校、考试范围、过去问、逐题卷、知识点与页面。索引在第一次打开搜索时才下载。
  const INDEX_PATH = 'data/search-index.json';
  const TYPES = {
    page: { label: '页面', weight: 6 },
    school: { label: '学校', weight: 5 },
    topic: { label: '知识点', weight: 4 },
    scope: { label: '考试范围', weight: 3 },
    practice: { label: '逐题练习', weight: 2 },
    paper: { label: '过去问', weight: 1 },
  };
  const normalize = text => (root.TextNormalize || require('./text-normalize.js')).normalizeSearch(text);

  function prepare(index) {
    return index.entries.map(([type, title, sub, url, extra]) => ({
      type, title, sub, url,
      titleKey: normalize(title),
      key: normalize([title, sub, extra].join(' ')),
    }));
  }

  // 每个词都要命中；标题命中、整句命中、类型和较短标题排在前面。
  function search(prepared, query, limit = 30) {
    const tokens = String(query || '').trim().split(/\s+/).map(normalize).filter(Boolean);
    if (!tokens.length) return [];
    const whole = tokens.join('');
    const out = [];
    for (const e of prepared) {
      if (!tokens.every(t => e.key.includes(t))) continue;
      let score = (TYPES[e.type] || { weight: 0 }).weight;
      score += tokens.filter(t => e.titleKey.includes(t)).length * 10;
      if (e.titleKey.startsWith(tokens[0])) score += 8;
      if (e.titleKey.includes(whole)) score += 6;
      if (e.titleKey === whole) score += 20;
      score -= Math.min(10, e.title.length / 12);
      out.push({ ...e, score });
    }
    out.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ja'));
    return out.slice(0, limit);
  }

  const api = { INDEX_PATH, TYPES, prepare, search };
  root.SiteSearch = api;
  if (typeof module === 'object' && module.exports) { module.exports = api; return; }
  if (!root.document) return;

  // ---------- 页面上的搜索框 ----------
  const doc = root.document;
  let prepared = null, loading = null, results = [], active = -1, dialog, input, list, statusLine, opener = null;

  function el(tag, className, text) { const n = doc.createElement(tag); if (className) n.className = className; if (text != null) n.textContent = text; return n; }

  function load() {
    if (!loading) loading = fetch(INDEX_PATH).then(r => { if (!r.ok) throw new Error('index'); return r.json(); }).then(data => { prepared = prepare(data); }).catch(err => { loading = null; throw err; });
    return loading;
  }

  function highlight(item, i) {
    const li = el('li', 'search-item');
    li.setAttribute('role', 'option');
    li.id = 'search-option-' + i;
    li.setAttribute('aria-selected', String(i === active));
    const a = el('a', 'search-link');
    a.href = item.url;
    a.tabIndex = -1;
    a.append(el('span', 'search-type search-type--' + item.type, TYPES[item.type].label), el('span', 'search-title', item.title), el('span', 'search-sub', item.sub));
    li.append(a);
    li.addEventListener('mousemove', () => { if (active !== i) { active = i; mark(); } });
    return li;
  }

  function mark() {
    list.querySelectorAll('.search-item').forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    const current = list.querySelector('[aria-selected="true"]');
    if (current) { input.setAttribute('aria-activedescendant', current.id); current.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  }

  function run() {
    const query = input.value;
    if (!query.trim()) { results = []; list.replaceChildren(); statusLine.textContent = '可以搜学校、研究科、专攻、年份或知识点，例如「东北 电气」「运放」「早稻田 2024」。'; return; }
    if (!prepared) { statusLine.textContent = '正在载入搜索索引……'; load().then(run).catch(() => { statusLine.textContent = '搜索索引加载失败，请检查网络后重试。'; }); return; }
    results = search(prepared, query);
    active = results.length ? 0 : -1;
    list.replaceChildren(...results.map(highlight));
    mark();
    statusLine.textContent = results.length ? `${results.length >= 30 ? '前 30' : results.length} 条结果 · ↑↓ 选择，Enter 打开` : '没有找到。换个写法试试：校名、专攻名或知识点名。';
  }

  function build() {
    dialog = el('dialog', 'search-dialog');
    dialog.setAttribute('aria-label', '全站搜索');
    const box = el('div', 'search-box');
    input = el('input', 'search-input');
    input.type = 'text'; input.enterKeyHint = 'search'; input.placeholder = '搜索学校、专攻、过去问、知识点……'; input.autocomplete = 'off'; input.spellcheck = false;
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-expanded', 'true'); input.setAttribute('aria-controls', 'search-results'); input.setAttribute('aria-label', '搜索');
    const close = el('button', 'search-close', 'Esc'); close.type = 'button'; close.setAttribute('aria-label', '关闭搜索');
    close.addEventListener('click', () => dialog.close());
    box.append(input, close);
    statusLine = el('p', 'search-status'); statusLine.setAttribute('role', 'status');
    list = el('ul', 'search-results'); list.id = 'search-results'; list.setAttribute('role', 'listbox');
    dialog.append(box, statusLine, list);
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    // Esc 触发的 cancel 是同步的，先在这里让输入框失焦，下一次按键就不会落在已关闭的对话框里。
    dialog.addEventListener('cancel', () => { if (dialog.contains(doc.activeElement)) doc.activeElement.blur(); });
    dialog.addEventListener('close', () => {
      // 关闭后焦点回到打开前的位置；原来在页面空白处时，至少让输入框失焦，免得方向键等快捷键被吞掉。
      if (opener && opener !== doc.body && opener.isConnected && opener.focus) opener.focus();
      if (dialog.contains(doc.activeElement)) doc.activeElement.blur();
    });
    let timer;
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 80); });
    input.addEventListener('keydown', e => {
      if (e.isComposing) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!results.length) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
        mark();
      } else if (e.key === 'Enter' && active >= 0 && results[active]) {
        e.preventDefault();
        location.href = results[active].url;
      }
    });
    doc.body.append(dialog);
  }

  function open() {
    if (!dialog) build();
    if (dialog.open) return;
    opener = doc.activeElement;
    dialog.showModal();
    input.select();
    run();
    load().catch(() => {});
  }

  function addButton() {
    const button = el('button', 'search-trigger');
    button.type = 'button';
    button.setAttribute('aria-label', '全站搜索（快捷键 /）');
    button.title = '搜索（/ 或 Ctrl+K）';
    button.innerHTML = '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M13 13l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>搜索</span>';
    button.addEventListener('click', open);
    const header = doc.querySelector('.site-header');
    const menu = header && header.querySelector('.menu-button');
    if (menu) header.insertBefore(button, menu);
    else if (header) header.append(button);
    else { const top = doc.querySelector('.site-top nav'); if (top) top.prepend(button); else return; }
  }

  function typing(target) {
    return target && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName));
  }

  function start() {
    api.open = open;
    addButton();
    doc.addEventListener('keydown', e => {
      if (e.isComposing || e.defaultPrevented) return;
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') { e.preventDefault(); open(); return; }
      if (k === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !typing(e.target) && !doc.querySelector('dialog[open]')) { e.preventDefault(); open(); }
    });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start);
  else start();
})(typeof window !== 'undefined' ? window : globalThis);
