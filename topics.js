(function () {
  'use strict';
  const T = window.TopicIndex;
  const $ = id => document.getElementById(id);
  let index = null, records = {}, state = {};
  const narrow = matchMedia('(max-width: 860px)');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function readRecords() {
    try { records = window.QuestionBank.loadQuestionRecords(localStorage).records || {}; }
    catch { records = {}; $('topics-storage').hidden = false; }
  }

  function readState() {
    const params = new URLSearchParams(location.search);
    state = T.normalizeOptions(index, {
      topic: params.get('topic') || '', school: params.get('school') || '',
      sort: params.get('sort') || '', status: params.get('status') || '',
    });
  }

  function go(next, mode = 'pushState') {
    state = T.normalizeOptions(index, { ...state, ...next });
    const url = T.topicsURL(state);
    if (mode) history[mode](null, '', url);
    render();
  }

  // 站内链接点击时不整页刷新，只换内容；新标签页打开等组合键照常交给浏览器。
  function link(href, options, className, children) {
    const a = el('a', className);
    a.href = href;
    a.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      go(options);
      if (options.topic !== undefined) {
        $('topics-panel').focus({ preventScroll: true });
        // 右栏顶部不在视野里时滚回去（手机上左栏收起后也是这样）。
        if ($('topics-panel').getBoundingClientRect().top < 0 || narrow.matches) $('topics-panel').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    });
    a.append(...children);
    return a;
  }

  function meter(done, total) {
    const bar = el('span', 'topic-meter');
    bar.setAttribute('aria-hidden', 'true');
    const fill = el('span');
    fill.style.width = total ? Math.round(done / total * 100) + '%' : '0';
    bar.append(fill);
    return bar;
  }

  function countText(done, total) { return done ? `${done} / ${total}` : `${total}`; }

  function renderTree() {
    const tree = $('topics-tree-list');
    tree.replaceChildren(...index.subjects.map(subject => {
      const group = el('section', 'tree-group');
      const all = T.progress(index, subject.id, records, state.school);
      const head = link(T.topicsURL({ ...state, topic: subject.id }), { topic: subject.id }, 'tree-subject', [
        el('span', 'tree-name', subject.name), el('span', 'tree-count', countText(all.done, all.total)),
      ]);
      if (state.topic === subject.id) head.setAttribute('aria-current', 'page');
      const items = el('ul', 'tree-topics');
      for (const topic of subject.topics) {
        const p = T.progress(index, topic.id, records, state.school);
        const item = el('li');
        const a = link(T.topicsURL({ ...state, topic: topic.id }), { topic: topic.id }, 'tree-topic', [
          el('span', 'tree-name', topic.name), el('span', 'tree-count', countText(p.done, p.total)), ...(p.done ? [meter(p.done, p.total)] : []),
        ]);
        if (!p.total) a.classList.add('is-empty');
        if (state.topic === topic.id) a.setAttribute('aria-current', 'page');
        item.append(a);
        items.append(item);
      }
      group.append(head, items);
      return group;
    }));
    const current = T.findTopic(index, state.topic);
    $('topics-tree-current').textContent = current ? (current.kind === 'subject' ? current.name + ' · 全部' : current.subject.name + ' › ' + current.name) : '全部科目';
  }

  // 学校出题倾向：知识点 × 年份的热力图，格子越深该年题数越多。
  function renderTrends() {
    const data = T.trends(index, state.school);
    const name = (T.schools(index).find(s => s.id === state.school) || {}).name || state.school;
    const section = el('section', 'trend-panel');
    section.setAttribute('aria-labelledby', 'trend-title');
    const head = el('div', 'trend-head');
    const h2 = el('h2', '', name + ' · 出题倾向'); h2.id = 'trend-title';
    head.append(h2, el('p', 'trend-sub', `${data.years.length} 个年份 · ${data.questions} 道题 · ${data.topics.length} 个知识点。格子越深，那一年考的题越多；点知识点名进入题目列表。`));
    section.append(head);
    if (!data.topics.length) { section.append(el('p', 'topic-empty', '这所学校还没有拆好的逐题卷。')); return section; }
    const always = data.topics.filter(t => data.years.length >= 3 && t.years >= Math.ceil(data.years.length * 0.8));
    if (always.length) {
      const note = el('p', 'trend-always');
      note.append(el('strong', '', '几乎年年都考：'), document.createTextNode(always.slice(0, 6).map(t => `${t.name}（${t.years}/${data.years.length} 年）`).join('、')));
      section.append(note);
    }
    const scroll = el('div', 'trend-scroll');
    scroll.tabIndex = 0;
    scroll.setAttribute('role', 'region');
    scroll.setAttribute('aria-label', name + ' 各知识点逐年题数，可左右滚动');
    const table = el('table', 'trend-table');
    const thead = el('thead'), hr = el('tr');
    hr.append(el('th', 'trend-topic-head', '知识点'), el('th', 'trend-total-head', '合计'), ...data.years.map(y => { const th = el('th', '', String(y).slice(2)); th.title = y + ' 年'; th.scope = 'col'; return th; }));
    thead.append(hr);
    const tbody = el('tbody');
    for (const t of data.topics) {
      const tr = el('tr');
      const th = el('th'); th.scope = 'row';
      th.append(link(T.topicsURL({ ...state, topic: t.id }), { topic: t.id }, 'trend-topic', [el('span', '', t.name), el('small', '', t.subject)]));
      const total = el('td', 'trend-total', String(t.total));
      tr.append(th, total, ...data.years.map(y => {
        const n = t.counts[y] || 0;
        const td = el('td', 'trend-cell');
        if (n) {
          td.dataset.level = String(Math.min(4, Math.ceil(n / Math.max(1, data.max) * 4)));
          td.textContent = String(n);
          td.title = `${y} 年 · ${t.name} · ${n} 题`;
        } else td.setAttribute('aria-label', `${y} 年 未考`);
        return td;
      }));
      tbody.append(tr);
    }
    table.append(thead, tbody);
    scroll.append(table);
    section.append(scroll);
    return section;
  }

  function schoolPicker() {
    const label = el('label', 'filter-field overview-school');
    const select = el('select');
    select.id = 'overview-school';
    select.append(new Option('全部学校', ''), ...T.schools(index).map(s => new Option(s.name, s.id)));
    select.value = state.school;
    select.addEventListener('change', () => go({ school: select.value }));
    label.append(el('span', '', '看一所学校的出题倾向'), select);
    return label;
  }

  function renderOverview() {
    const wrap = el('div', 'topics-overview');
    wrap.append(schoolPicker());
    if (state.school) wrap.append(renderTrends());
    const intro = el('p', 'topics-lead', state.school ? '下面的数字只统计这所学校的题。' : '先选一个知识点。数字是题数，练过的会显示为「已练 / 总数」。');
    const grid = el('div', 'subject-grid');
    for (const subject of index.subjects) {
      const all = T.progress(index, subject.id, records, state.school);
      const card = el('article', 'subject-card');
      const title = el('h2');
      title.append(link(T.topicsURL({ ...state, topic: subject.id }), { topic: subject.id }, 'subject-link', [
        el('span', '', subject.name), el('small', '', subject.ja),
      ]));
      const meta = el('p', 'subject-meta', `${all.total} 题` + (all.done ? ` · 已练 ${all.done}` : ''));
      const chips = el('ul', 'topic-chips');
      for (const topic of subject.topics) {
        const p = T.progress(index, topic.id, records, state.school);
        if (!p.total) continue;
        const li = el('li');
        li.append(link(T.topicsURL({ ...state, topic: topic.id }), { topic: topic.id }, 'topic-chip' + (p.done && p.done === p.total ? ' is-complete' : ''), [
          el('span', '', topic.name), el('span', 'chip-count', countText(p.done, p.total)),
        ]));
        chips.append(li);
      }
      card.append(title, meta, meter(all.done, all.total), chips);
      grid.append(card);
    }
    wrap.append(intro, grid);
    return wrap;
  }

  function renderRow(row) {
    const paper = index.papers[row.p];
    const s = T.statusOf(row, records);
    const li = el('li');
    const a = el('a', 'topic-row' + (s.completed ? ' is-done' : ''));
    a.href = T.practiceURL(row, state);
    const meta = el('span', 'row-meta');
    meta.append(el('span', 'row-school', paper.school), el('span', '', T.yearText(paper)), el('span', '', paper.subject));
    const main = el('span', 'row-main');
    main.append(el('span', 'row-number', row.n), el('strong', 'row-title', row.t));
    const badges = el('span', 'row-badges');
    if (s.completed) badges.append(el('span', 'badge badge--done', '✓ 已练'));
    if (s.bookmarked) badges.append(el('span', 'badge badge--star', '★ 收藏'));
    if (s.note) badges.append(el('span', 'badge', '笔记'));
    badges.append(el('span', 'row-go', '→'));
    a.append(meta, main, badges);
    li.append(a);
    return li;
  }

  function renderTopic(current) {
    const wrap = el('div', 'topic-detail');
    const all = T.queue(index, state);
    const done = all.filter(row => T.statusOf(row, records).completed).length;
    const rows = T.list(index, state, records);

    const head = el('header', 'topic-head');
    const crumbs = el('p', 'topic-crumbs');
    crumbs.append(link(T.topicsURL({ ...state, topic: '' }), { topic: '' }, '', [document.createTextNode('全部科目')]));
    if (current.kind === 'topic') {
      crumbs.append(document.createTextNode(' › '), link(T.topicsURL({ ...state, topic: current.subject.id }), { topic: current.subject.id }, '', [document.createTextNode(current.subject.name)]));
    }
    const h2 = el('h2', 'topic-title');
    h2.append(document.createTextNode(current.kind === 'subject' ? current.name + ' · 全部' : current.name), el('small', '', current.ja));
    const stat = el('p', 'topic-stat', `${all.length} 题 · 已练 ${done}` + (state.school ? ' · 只看 ' + (T.schools(index).find(s => s.id === state.school) || {}).name : ''));
    head.append(crumbs, h2, stat, meter(done, all.length));
    const startRow = all.find(row => !T.statusOf(row, records).completed) || all[0];
    if (startRow) {
      const start = el('a', 'button primary topic-start', done ? (done === all.length ? '再练一遍 →' : '继续练习 →') : '开始练习 →');
      start.href = T.practiceURL(startRow, state);
      head.append(start);
    }
    if (current.kind === 'subject' && current.subject.unrefined) {
      head.append(el('p', 'topic-note', `其中 ${current.subject.unrefined} 题只能按科目归类（原题标签只有大题名，如「${current.name}」），没有进入具体知识点。`));
    }

    const filters = el('div', 'topic-filters');
    const schoolLabel = el('label', 'filter-field');
    const select = el('select');
    select.id = 'topic-school';
    select.append(new Option('全部学校', ''), ...T.schools(index).map(s => new Option(s.name, s.id)));
    select.value = state.school;
    select.addEventListener('change', () => go({ school: select.value }));
    schoolLabel.append(el('span', '', '学校'), select);

    const statusGroup = el('div', 'status-group');
    statusGroup.setAttribute('role', 'group');
    statusGroup.setAttribute('aria-label', '练习状态');
    for (const [value, label] of [['all', '全部'], ['todo', '未练'], ['done', '已练'], ['starred', '收藏']]) {
      const b = el('button', 'status-button', label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(state.status === value));
      b.addEventListener('click', () => go({ status: value }, 'replaceState'));
      statusGroup.append(b);
    }

    const sortLabel = el('label', 'filter-field');
    const sort = el('select');
    sort.id = 'topic-sort';
    sort.append(new Option('年份新→旧', 'year'), new Option('按学校', 'school'));
    sort.value = state.sort;
    sort.addEventListener('change', () => go({ sort: sort.value }, 'replaceState'));
    sortLabel.append(el('span', '', '排序'), sort);
    filters.append(schoolLabel, statusGroup, sortLabel);

    const listNode = el('ol', 'topic-list');
    listNode.id = 'topic-list';
    listNode.append(...rows.map(renderRow));
    const empty = el('p', 'topic-empty', state.status === 'todo' ? '这个知识点在当前筛选下都练过了。' : state.status === 'starred' ? '还没有收藏这个知识点的题。' : state.status === 'done' ? '还没有练过这个知识点的题。' : '当前筛选下没有题目。');
    empty.hidden = rows.length > 0;
    const count = el('p', 'topic-count', rows.length === all.length ? `共 ${rows.length} 题` : `显示 ${rows.length} / ${all.length} 题`);
    count.setAttribute('aria-live', 'polite');
    wrap.append(head, filters, count, listNode, empty);
    return wrap;
  }

  function render() {
    renderTree();
    const current = T.findTopic(index, state.topic);
    $('topics-panel').replaceChildren(current ? renderTopic(current) : renderOverview());
    // 宽屏时左栏常开；手机上选好知识点后收起，把屏幕留给题目列表。
    $('topics-tree').open = !narrow.matches || !current;
    document.title = (current ? current.name + ' · ' : '') + '按知识点练｜练习室 · 留日手记';
  }

  async function start() {
    try {
      const response = await fetch(T.INDEX_PATH);
      if (!response.ok) throw new Error('知识点索引加载失败');
      index = await response.json();
    } catch (error) {
      $('topics-panel').replaceChildren(el('p', 'topic-empty', error.message + '，请刷新重试。'));
      return;
    }
    readRecords();
    readState();
    const placed = index.questions.filter(row => row.k.length).length;
    $('topics-summary').textContent = `${index.questionCount} 道题 · ${placed} 道已归入具体知识点`;
    render();
    narrow.addEventListener('change', () => { if (!narrow.matches) $('topics-tree').open = true; });
    $('topics-tree').addEventListener('toggle', () => { if (!narrow.matches && !$('topics-tree').open) $('topics-tree').open = true; });
    history.replaceState(null, '', T.topicsURL(state));
    addEventListener('popstate', () => { readState(); render(); });
    // 从逐题练习返回时（含浏览器往返缓存），重新读一次练习记录，刷新对勾。
    addEventListener('pageshow', event => { if (event.persisted) { readRecords(); render(); } });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
