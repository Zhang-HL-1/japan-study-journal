(function () {
  'use strict';
  const T = window.TopicIndex;
  const $ = id => document.getElementById(id);
  const idPattern = /^[a-z0-9][a-z0-9-]{0,120}$/;
  const assetPattern = /^assets\/question-bank\/[a-z0-9-]+\/[a-z0-9-]+\.png$/;
  const MAX = 3;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  const fetchJSON = async path => { const r = await fetch(path); if (!r.ok) throw new Error('资源加载失败'); return r.json(); };

  function readParams() {
    const params = new URLSearchParams(location.search);
    const ids = [...new Set((params.get('q') || '').split(',').map(x => x.trim()).filter(x => idPattern.test(x)))].slice(0, MAX);
    return { ids, topic: params.get('topic') || '', school: params.get('school') || '' };
  }

  function column(row, paper, question, topicIndex, opts) {
    const col = el('article', 'compare-col');
    const head = el('header', 'compare-head');
    const meta = el('p', 'compare-meta');
    meta.append(el('span', 'compare-school', paper.school), el('span', '', T.yearText(paper)), el('span', '', paper.subject));
    const title = el('h2', 'compare-title');
    title.append(el('span', 'compare-number', question.number), document.createTextNode(question.title));
    head.append(meta, title);
    const chips = el('p', 'compare-topics');
    for (const id of row.k) {
      const info = T.findTopic(topicIndex, id);
      if (!info) continue;
      const a = el('a', id === opts.topic ? 'is-current' : '', info.name);
      a.href = T.topicsURL({ topic: id, school: opts.school });
      chips.append(a);
    }
    if (chips.childNodes.length) head.append(chips);
    const go = el('a', 'compare-practice', '去逐题练习 →');
    go.href = T.practiceURL(row, opts.topic ? opts : { topic: '' });
    head.append(go);
    const body = el('div', 'compare-body');
    for (const part of question.parts) {
      if (!assetPattern.test(part.src)) continue;
      const img = el('img');
      img.src = part.src; img.alt = (part.label || question.number) + '（日文原卷裁图）';
      img.width = part.width; img.height = part.height; img.loading = 'lazy'; img.decoding = 'async';
      body.append(img);
    }
    col.append(head, body);
    return col;
  }

  async function start() {
    const opts = readParams();
    const back = $('compare-back');
    if (opts.topic || opts.school) back.href = T.topicsURL({ topic: opts.topic, school: opts.school });
    if (opts.ids.length < 2) { $('compare-status').textContent = '至少选 2 题才能对比。请回到知识点列表，勾选想对比的题。'; return; }
    try {
      const [topicIndex, catalog] = await Promise.all([fetchJSON(T.INDEX_PATH), fetchJSON('question-bank-index.json')]);
      const rows = new Map(topicIndex.questions.map(r => [r.q, r]));
      const found = [];
      for (const id of opts.ids) {
        const row = rows.get(id);
        if (!row) continue;
        const entry = catalog.papers.find(p => p.id === row.p);
        if (!entry || entry.data !== `assets/question-bank/${row.p}/paper.json`) continue;
        found.push({ row, entry });
      }
      if (found.length < 2) throw new Error('所选题目找不到了，可能已被重新整理');
      const papers = await Promise.all(found.map(f => fetchJSON(f.entry.data)));
      const cols = found.map((f, i) => {
        const q = papers[i].questions.find(x => x.id === f.row.q);
        return q ? column(f.row, topicIndex.papers[f.row.p], q, topicIndex, opts) : null;
      }).filter(Boolean);
      $('compare-grid').style.setProperty('--cols', String(cols.length));
      $('compare-grid').replaceChildren(...cols);
      const info = T.findTopic(topicIndex, opts.topic);
      $('compare-heading').textContent = info ? `${info.name}：${cols.length} 题并排对比` : `${cols.length} 题并排对比`;
      document.title = (info ? info.name + ' · ' : '') + '同类题对比｜练习室 · 留日手记';
      $('compare-status').textContent = '';
    } catch (error) {
      $('compare-status').textContent = error.message + '。请回到知识点列表重新选择。';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
