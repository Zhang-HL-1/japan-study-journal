(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const key = 'japan-study-journal:question-demo:v1';
  let paper, index = 0, records = {}, storageWritable = true, focused = false, zoom = 100;
  const idPattern = /^[a-z0-9][a-z0-9-]{0,120}$/;
  const assetPattern = /^assets\/question-bank\/[a-z0-9-]+\/[a-z0-9-]+\.png$/;
  const pdfPattern = /^assets\/past-papers\/documents\/[a-f0-9]{64}\.pdf$/;
  const params = new URLSearchParams(location.search);
  const requested = params.get('paper') || 'kobe-ee-2026-denjiki';
  const fetchJSON = async path => { const response = await fetch(path); if (!response.ok) throw new Error('资源加载失败'); return response.json(); };
  function text(tag, value, className) { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; }
  function storageWarning() { $('storage-status').textContent = '浏览器记录无法读取或保存。请导出本次记录备份；原记录未主动覆盖。'; }
  function current() { return paper.questions[index]; }
  function record(q = current()) { return records[q.id] || {}; }
  function save() {
    if (!storageWritable) return;
    try { localStorage.setItem(key, JSON.stringify({ version: 1, records })); }
    catch { storageWritable = false; storageWarning(); }
  }
  function patch(values) { records[current().id] = { ...record(), ...values, updatedAt: Date.now() }; save(); }
  function image(part) {
    const img = document.createElement('img'); img.src = part.src; img.alt = part.label + '（日文原卷裁图）';
    img.width = part.width; img.height = part.height; img.decoding = 'async';
    img.addEventListener('error', () => { $('storage-status').textContent = '部分题图加载失败，请刷新或点击「查看原卷」。'; });
    return img;
  }
  function crop(part) { const button = document.createElement('button'); button.type = 'button'; button.className = 'crop-button'; button.setAttribute('aria-label', '放大：' + part.label); button.append(image(part)); button.addEventListener('click', () => openZoom(part)); return button; }
  function refresh() {
    const count = paper.questions.filter(q => record(q).completed).length;
    $('completed-count').textContent = `${count} / ${paper.questions.length}`;
    $('paper-progress').max = paper.questions.length; $('paper-progress').value = count;
    $('question-directory').replaceChildren(...paper.questions.map((q, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'directory-button';
      button.setAttribute('aria-current', String(index === i));
      button.append(text('span', q.number + (record(q).completed ? '  ✓ 已练习' : '') + (record(q).bookmarked ? '  ★' : ''), record(q).completed ? 'done' : ''), text('strong', q.title));
      button.addEventListener('click', () => navigate(i)); return button;
    }));
    const r = record();
    $('bookmark').textContent = r.bookmarked ? '★ 已收藏' : '☆ 收藏'; $('bookmark').setAttribute('aria-pressed', String(Boolean(r.bookmarked)));
    $('complete').textContent = r.completed ? '取消已练习标记' : '标记本题已练习';
    $('completion-status').textContent = r.completed ? '本题已练习 ✓' : '';
  }
  function render() {
    const q = current(), r = record();
    $('position').textContent = `本卷第 ${index+1} 题 / 共 ${paper.questions.length} 道大题`;
    $('nav-position').textContent = `${index+1} / ${paper.questions.length}`;
    $('question-number').textContent = q.number; $('question-title').textContent = q.title;
    $('topics').replaceChildren(...q.topics.map(t => text('span', t)));
    const pages = [...new Set(q.parts.map(part => part.page))];
    $('question-source').textContent = `${paper.source.school} · ${paper.source.year} 入学年度 · ${paper.source.originalSubject} · 原卷第 ${pages.join('、')} 页`;
    $('original-link').href = paper.source.pdf + '#page=' + pages[0];
    $('question-content').replaceChildren(...q.parts.map(crop));
    $('question-note').value = r.note || ''; $('notes').open = Boolean(r.note);
    $('note-status').textContent = r.note ? '已有笔记' : '';
    $('previous').disabled = index === 0; $('next').disabled = index === paper.questions.length-1;
    refresh();
    document.title = q.number + ' · ' + paper.title + ' · 留日手记';
  }
  function navigate(next, historyMode = 'pushState') {
    if (!Number.isInteger(next) || next < 0 || next >= paper.questions.length) return;
    index = next; render();
    const url = new URL(location.href); url.searchParams.set('paper', paper.id); url.searchParams.set('q', current().id);
    if (historyMode) history[historyMode](null, '', url);
    if (historyMode === 'pushState') { $('question').focus({preventScroll:true}); $('question').scrollIntoView({ block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  }
  function applyZoom() { $('zoom-content').style.width = Math.round(Math.max(760, Math.min(1100, innerWidth-100))*zoom/100) + 'px'; $('zoom-level').textContent = zoom + '%'; $('zoom-out').disabled = zoom <= 75; $('zoom-in').disabled = zoom >= 200; }
  function openZoom(part) {
    $('zoom-title').textContent = current().number + ' · 原题放大阅读';
    const parts = part ? [part] : [...paper.commonParts, ...current().parts];
    $('zoom-content').replaceChildren(...parts.map(image)); zoom = 100; applyZoom(); $('image-dialog').showModal(); $('zoom-scroll').scrollTo(0,0);
  }
  try {
    if (!idPattern.test(requested)) throw new Error('无效的试卷编号');
    const catalog = await fetchJSON('question-bank-index.json');
    const entry = catalog.papers.find(p => p.id === requested);
    if (!entry || entry.data !== `assets/question-bank/${requested}/paper.json`) throw new Error('这份试卷尚未接入逐题 Demo');
    paper = await fetchJSON(entry.data);
    if (paper.schemaVersion !== 1 || paper.id !== requested || !pdfPattern.test(paper.source.pdf) || !paper.questions.length || paper.questions.length !== entry.questionCount) throw new Error('试卷数据不完整');
    const seen = new Set();
    for (const q of paper.questions) {
      if (!idPattern.test(q.id) || seen.has(q.id) || q.review?.status !== 'verified' || !q.parts.length) throw new Error('题目尚未完成校对');
      seen.add(q.id);
    }
    for (const part of [...paper.commonParts, ...paper.questions.flatMap(q => q.parts)]) {
      if (!assetPattern.test(part.src) || !Number.isFinite(part.width) || !Number.isFinite(part.height) || part.width <= 0 || part.height <= 0 || !Number.isInteger(part.page) || part.page < 1 || part.page > paper.source.pageCount) throw new Error('题图数据不完整');
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.version !== 1 || !stored.records || typeof stored.records !== 'object' || Array.isArray(stored.records)) throw new Error('Invalid records');
        // Keep other papers' records, while accepting only the documented value types.
        for (const [id, r] of Object.entries(stored.records)) if (idPattern.test(id) && r && typeof r === 'object') records[id] = { completed:r.completed === true, bookmarked:r.bookmarked === true, note:typeof r.note === 'string' ? r.note.slice(0,6000) : '', updatedAt:Number.isFinite(r.updatedAt) ? r.updatedAt : 0 };
      }
    } catch { storageWritable = false; storageWarning(); }
    $('paper-source').textContent = `${paper.source.school} / ${paper.source.graduate} / ${paper.source.major} · ${paper.source.year} 入学年度`;
    const emphasis = document.createElement('em');
    emphasis.textContent = '逐题练习。';
    $('paper-heading').replaceChildren(paper.title, document.createTextNode('，'), emphasis);
    $('paper-count').textContent = paper.questions.length + ' 道大题';
    $('source-note').textContent = paper.source.note;
    $('catalog-link').href = 'past-papers.html?' + new URLSearchParams({school:paper.source.schoolId,paper:paper.source.catalogId});
    $('common-content').replaceChildren(...paper.commonParts.map(crop));
    $('load-status').hidden = true; $('app').hidden = false;
    const start = paper.questions.findIndex(q => q.id === params.get('q'));
    navigate(Math.max(0,start),'replaceState');
    $('bookmark').addEventListener('click', () => { patch({bookmarked:!record().bookmarked}); refresh(); });
    $('complete').addEventListener('click', () => { patch({completed:!record().completed}); refresh(); });
    $('question-note').addEventListener('input', () => { patch({note:$('question-note').value}); $('note-status').textContent = storageWritable ? '已保存' : '仅本次保留'; });
    $('previous').addEventListener('click', () => navigate(index-1)); $('next').addEventListener('click', () => navigate(index+1));
    $('focus-mode').addEventListener('click', () => { focused = !focused; document.body.classList.toggle('is-focused',focused); $('focus-mode').setAttribute('aria-pressed',String(focused)); $('focus-mode').textContent = focused ? '退出专注' : '专注模式'; });
    $('enlarge').addEventListener('click', () => openZoom());
    $('close-zoom').addEventListener('click', () => $('image-dialog').close());
    $('zoom-out').addEventListener('click', () => { zoom = Math.max(75,zoom-25); applyZoom(); });
    $('zoom-in').addEventListener('click', () => { zoom = Math.min(200,zoom+25); applyZoom(); });
    $('export-records').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify({version:1,records},null,2)],{type:'application/json'});
      const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = '逐题Demo练习记录.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    });
    window.addEventListener('popstate', () => { const id = new URLSearchParams(location.search).get('q'); navigate(Math.max(0,paper.questions.findIndex(q => q.id === id)),null); });
  } catch (error) {
    $('app').hidden = true; $('load-status').hidden = false;
    $('load-status').textContent = error.message + '。请刷新重试，或返回整卷练习。';
    $('paper-source').textContent = '题目暂时无法加载';
  }
})();
