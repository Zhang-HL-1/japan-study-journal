(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let paper, index = 0, records = {}, recordState = { writable: true, keepFormal: false, keepLegacy: false }, storageWritable = true, focused = false, zoom = 100;
  const idPattern = /^[a-z0-9][a-z0-9-]{0,120}$/;
  const assetPattern = /^assets\/question-bank\/[a-z0-9-]+\/[a-z0-9-]+\.png$/;
  const pdfPattern = /^https:\/\/zhang-hl-1\.github\.io\/japan-study-journal-papers-[12]\/(?:tohoku|tus|science-tokyo|kyushu|hokkaido|keio|uec|sophia|osaka|utokyo|nagoya|kobe|waseda)\/[a-f0-9]{64}\.pdf$/;
  const params = new URLSearchParams(location.search);
  let requested = params.get('paper');
  let aliasQuestion;
  const fetchJSON = async path => { const response = await fetch(path); if (!response.ok) throw new Error('资源加载失败'); return response.json(); };
  function text(tag, value, className) { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; }
  function storageWarning() { $('storage-status').textContent = '浏览器记录无法读取或保存。请导出本次记录备份；原记录未主动覆盖。'; }
  function current() { return paper.questions[index]; }
  function yearPhrase(source) { return window.QuestionBank.yearPhrase(source); }
  function record(q = current()) { return records[q.id] || {}; }
  function save() {
    if (!storageWritable) return;
    try { window.QuestionBank.saveQuestionRecords(localStorage, records, recordState); }
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
  function questionParts(q, interactive = true) {
    if (q.layout !== 'source-page') return q.parts.map(interactive ? crop : image);
    const pages = new Map();
    for (const part of q.parts) {
      if (!pages.has(part.page)) pages.set(part.page, []);
      pages.get(part.page).push(part);
    }
    return [...pages.entries()].map(([page, parts]) => {
      const left = Math.min(...parts.map(p => p.box[0])), top = Math.min(...parts.map(p => p.box[1]));
      const width = Math.max(...parts.map(p => p.box[2])) - left, height = Math.max(...parts.map(p => p.box[3])) - top;
      const sheet = document.createElement('div'); sheet.className = 'source-page-parts'; sheet.dataset.page = page;
      sheet.style.cssText = `position:relative;width:100%;aspect-ratio:${width}/${height};background:white`;
      for (const part of parts) {
        const element = interactive ? crop(part) : image(part), box = part.box;
        element.style.cssText = `position:absolute;left:${(box[0]-left)/width*100}%;top:${(box[1]-top)/height*100}%;width:${(box[2]-box[0])/width*100}%;height:${(box[3]-box[1])/height*100}%;margin:0;min-height:0`;
        sheet.append(element);
      }
      return sheet;
    });
  }
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
  // 标记已练习时的轻量反馈：描线打勾 + 进度条一次脉冲；减少动态效果时只显示静态勾。
  function celebrate() {
    const status = $('completion-status'), ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 20 20'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'done-check');
    const circle = document.createElementNS(ns, 'circle'); circle.setAttribute('cx', '10'); circle.setAttribute('cy', '10'); circle.setAttribute('r', '9');
    const path = document.createElementNS(ns, 'path'); path.setAttribute('d', 'M5.8 10.4l2.8 2.8 5.6-6');
    svg.append(circle, path);
    status.replaceChildren(svg, document.createTextNode('本题已练习'));
    status.classList.remove('is-fresh'); void status.offsetWidth; status.classList.add('is-fresh');
    const box = document.querySelector('.progress-box');
    if (box) { box.classList.remove('is-fresh'); void box.offsetWidth; box.classList.add('is-fresh'); }
  }
  // 换题时题目区域从对应方向轻轻滑入；减少动态效果时不播放。
  function slideIn(direction) {
    const area = $('question-content');
    area.classList.remove('slide-next', 'slide-previous');
    if (!direction || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    void area.offsetWidth; area.classList.add('slide-' + direction);
  }
  // 键盘快捷键：输入框内、按住 Ctrl/⌘/Alt 或放大窗口打开时不拦截。
  function bindShortcuts() {
    const typing = target => target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
      if (typing(event.target) || document.querySelector('dialog[open]')) return;
      const key = event.key, act = fn => { event.preventDefault(); fn(); };
      if (key === 'ArrowLeft' && event.shiftKey) return act(() => { if (!$('previous-paper').disabled) $('previous-paper').click(); });
      if (key === 'ArrowRight' && event.shiftKey) return act(() => { if (!$('next-paper').disabled) $('next-paper').click(); });
      if (event.shiftKey && key !== '?') return;
      if (key === 'ArrowLeft') return act(() => navigate(index - 1));
      if (key === 'ArrowRight') return act(() => navigate(index + 1));
      const lower = key.length === 1 ? key.toLowerCase() : key;
      if (lower === 'f') return act(() => $('bookmark').click());
      if (lower === 'd') return act(() => $('complete').click());
      if (lower === 'z') return act(() => $('enlarge').click());
      if (lower === 'n') return act(() => { $('notes').open = true; $('question-note').focus(); });
      if (key === '?') return act(() => $('shortcut-dialog').showModal());
    });
    $('show-shortcuts').addEventListener('click', () => $('shortcut-dialog').showModal());
    $('close-shortcuts').addEventListener('click', () => $('shortcut-dialog').close());
  }
  // 手机左右滑动换题：水平位移足够大、明显大于垂直位移且动作够快才算。
  function bindSwipe() {
    const area = $('question');
    let start = null;
    area.addEventListener('touchstart', event => {
      if (event.touches.length !== 1 || event.target.closest?.('textarea, input, summary, .crop-button[aria-expanded="true"]')) { start = null; return; }
      const t = event.touches[0]; start = { x: t.clientX, y: t.clientY, at: Date.now() };
    }, { passive: true });
    area.addEventListener('touchend', event => {
      if (!start || document.querySelector('dialog[open]')) { start = null; return; }
      const t = event.changedTouches[0], dx = t.clientX - start.x, dy = t.clientY - start.y, dt = Date.now() - start.at;
      start = null;
      if (dt > 700 || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
      navigate(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });
    area.addEventListener('touchcancel', () => { start = null; }, { passive: true });
  }
  function render() {
    const q = current(), r = record();
    $('position').textContent = `本卷第 ${index+1} 题 / 共 ${paper.questions.length} 道大题`;
    $('nav-position').textContent = `${index+1} / ${paper.questions.length}`;
    $('question-number').textContent = q.number; $('question-title').textContent = q.title;
    $('topics').replaceChildren(...q.topics.map(t => text('span', t)));
    const pages = [...new Set(q.parts.map(part => part.page))];
    const file = window.QuestionBank.sourceForQuestion(paper,q);
    $('common-content').replaceChildren(...window.QuestionBank.commonPartsForQuestion(paper,q).map(crop));
    $('question-source').textContent = `${paper.source.school} · ${yearPhrase(paper.source)} · ${file.displaySubject || file.originalSubject} · 原卷第 ${pages.join('、')} 页`;
    $('original-link').href = file.pdf + '#page=' + pages[0];
    $('question-content').replaceChildren(...questionParts(q));
    $('question-note').value = r.note || ''; $('notes').open = Boolean(r.note);
    $('note-status').textContent = r.note ? '已有笔记' : '';
    $('previous').disabled = index === 0; $('next').disabled = index === paper.questions.length-1;
    refresh();
    document.title = q.number + ' · ' + paper.title + ' · 留日手记';
  }
  function navigate(next, historyMode = 'pushState') {
    if (!Number.isInteger(next) || next < 0 || next >= paper.questions.length) return;
    const direction = next > index ? 'next' : next < index ? 'previous' : '';
    index = next; render();
    slideIn(historyMode === 'replaceState' ? '' : direction);
    window.StudyResume?.save({ paper: paper.id, q: current().id, paperTitle: paper.title, number: current().number, title: current().title, position: index + 1, total: paper.questions.length });
    const url = new URL(location.href); url.searchParams.set('paper', paper.id); url.searchParams.set('q', current().id);
    if (historyMode) history[historyMode](null, '', url);
    if (historyMode === 'pushState') { $('question').focus({preventScroll:true}); $('question').scrollIntoView({ block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  }
  function applyZoom() { $('zoom-content').style.width = Math.round(Math.max(760, Math.min(1100, innerWidth-100))*zoom/100) + 'px'; $('zoom-level').textContent = zoom + '%'; $('zoom-out').disabled = zoom <= 75; $('zoom-in').disabled = zoom >= 200; }
  function openZoom(part) {
    $('zoom-title').textContent = current().number + ' · 原题放大阅读';
    const content = part ? [image(part)] : [...window.QuestionBank.commonPartsForQuestion(paper,current()).map(image), ...questionParts(current(), false)];
    $('zoom-content').replaceChildren(...content); zoom = 100; applyZoom(); $('image-dialog').showModal(); $('zoom-scroll').scrollTo(0,0);
  }
  let yearTargets = { previous: null, next: null };
  function yearLabel(target) { return target ? yearPhrase({ year: target.year, yearBasis: target.yearBasis }) : ''; }
  function showYearNav(targets, message) {
    yearTargets = targets || { previous: null, next: null };
    const previous = $('previous-paper'), next = $('next-paper');
    previous.disabled = !yearTargets.previous;
    next.disabled = !yearTargets.next;
    previous.title = yearTargets.previous ? '' : '暂无更晚年份';
    next.title = yearTargets.next ? '' : '暂无更早年份';
    previous.setAttribute('aria-label', yearTargets.previous ? '上一卷，' + yearLabel(yearTargets.previous) : '上一卷，暂无更晚年份');
    next.setAttribute('aria-label', yearTargets.next ? '下一卷，' + yearLabel(yearTargets.next) : '下一卷，暂无更早年份');
    if (message) { $('paper-year-status').textContent = message; return; }
    const prevText = yearTargets.previous ? '上一卷 ' + yearLabel(yearTargets.previous) : '上一卷：暂无更晚年份';
    const nextText = yearTargets.next ? '下一卷 ' + yearLabel(yearTargets.next) : '下一卷：暂无更早年份';
    $('paper-year-status').textContent = !yearTargets.previous && !yearTargets.next ? '暂无更早／更晚年份' : prevText + ' · ' + nextText;
  }
  function openNeighbor(direction) {
    const target = yearTargets[direction];
    if (!target) return;
    location.assign(window.QuestionBank.practiceURL(target.id, target.firstQuestionId || ''));
  }
  async function loadYearNav(catalog) {
    showYearNav(null, '正在查找相邻年份…');
    try {
      const prefix = (paper.id.match(/^(.*?)\d{4}/) || [])[1] || '';
      const family = prefix ? catalog.papers.filter(item => item && typeof item.id === 'string' && item.id.startsWith(prefix)) : [];
      if (!family.some(item => item.id === paper.id)) throw new Error('当前卷不在索引中');
      const rows = await Promise.all(family.map(async item => {
        const order = catalog.papers.findIndex(entry => entry.id === item.id);
        if (item.id === paper.id) return window.QuestionBank.paperNeighborRow(paper, order);
        const data = await fetchJSON(item.data);
        if (!data || data.id !== item.id || !data.source) throw new Error('相邻试卷无法读取');
        return window.QuestionBank.paperNeighborRow(data, order);
      }));
      showYearNav(window.QuestionBank.adjacentPaperTargets(rows, paper.id));
    } catch {
      showYearNav(null, '相邻年份暂时无法加载');
    }
  }
  function renderChooser(listings) {
    $('chooser').hidden = false; $('app').hidden = true; $('load-status').hidden = true;
    const emphasis = document.createElement('em'); emphasis.textContent = '逐题练习。';
    $('paper-heading').replaceChildren(document.createTextNode('已接入的过去问，'), emphasis);
    $('paper-source').textContent = listings.length ? `共 ${listings.length} 套已拆好的试卷` : '暂时没有可练习的逐题卷';
    document.title = '逐题练习 · 留日手记';
    $('paper-chooser').replaceChildren(...listings.map(item => {
      const link = document.createElement('a'); link.href = window.QuestionBank.practiceURL(item.id);
      link.append(text('strong', item.title), text('span', `${item.provenance.school} / ${item.provenance.graduate} / ${item.provenance.major} · ${item.provenance.year} · ${item.questions.length} 道大题`));
      return link;
    }));
  }
  try {
    if (!window.QuestionBank) throw new Error('逐题练习暂时无法加载');
    if (!requested) {
      const loaded = await window.QuestionBank.loadListings(fetch);
      if (!loaded.listings.length) throw new Error(loaded.failed ? '题库索引无法读取' : '暂时没有可练习的逐题卷');
      renderChooser(loaded.listings);
      return;
    }
    if (!idPattern.test(requested)) throw new Error('无效的试卷编号');
    const catalog = await fetchJSON('question-bank-index.json');
    const resolved = window.QuestionBank.resolveEntry(catalog,requested);
    const entry = resolved.entry; aliasQuestion = resolved.questionId;
    if (entry) requested = entry.id;
    if (!entry || entry.data !== `assets/question-bank/${requested}/paper.json`) throw new Error('这份试卷尚未接入逐题练习');
    paper = await fetchJSON(entry.data);
    if (![1,2].includes(paper.schemaVersion) || paper.id !== requested || (paper.schemaVersion === 1 && !pdfPattern.test(paper.source.pdf)) || !paper.questions.length || paper.questions.length !== entry.questionCount) throw new Error('试卷数据不完整');
    const seen = new Set();
    for (const q of paper.questions) {
      if (!idPattern.test(q.id) || seen.has(q.id) || q.review?.status !== 'verified' || !q.parts.length) throw new Error('题目尚未完成校对');
      seen.add(q.id);
    }
    const files = paper.schemaVersion === 2 ? paper.source.files : [paper.source];
    if (!Array.isArray(files) || !files.length || files.some(f => !pdfPattern.test(f.pdf) || !Number.isInteger(f.pageCount))) throw new Error('原卷来源不完整');
    for (const q of paper.questions) {
      const file = window.QuestionBank.sourceForQuestion(paper,q);
      for (const part of [...window.QuestionBank.commonPartsForQuestion(paper,q), ...q.parts]) {
        if (!assetPattern.test(part.src) || !Number.isFinite(part.width) || !Number.isFinite(part.height) || part.width <= 0 || part.height <= 0 || !Number.isInteger(part.page) || part.page < 1 || part.page > file.pageCount || (paper.schemaVersion === 2 && part.fileId !== q.sourceFileId)) throw new Error('题图数据不完整');
      }
    }
    try {
      recordState = window.QuestionBank.loadQuestionRecords(localStorage);
      records = recordState.records; storageWritable = recordState.writable;
      if (!storageWritable) storageWarning();
    } catch { storageWritable = false; recordState.writable = false; storageWarning(); }
    $('paper-source').textContent = `${paper.source.school} / ${paper.source.graduate} / ${paper.source.major} · ${yearPhrase(paper.source)}`;
    const emphasis = document.createElement('em');
    emphasis.textContent = '逐题练习。';
    $('paper-heading').replaceChildren(paper.title, document.createTextNode('，'), emphasis);
    $('paper-count').textContent = paper.questions.length + ' 道大题';
    $('source-note').textContent = paper.source.note;
    $('catalog-link').href = 'past-papers.html?' + new URLSearchParams({school:paper.source.schoolId,paper:paper.source.catalogId});
    $('chooser').hidden = true; $('load-status').hidden = true; $('app').hidden = false;
    const start = paper.questions.findIndex(q => q.id === (params.get('q') || aliasQuestion));
    navigate(Math.max(0,start),'replaceState');
    $('bookmark').addEventListener('click', () => { patch({bookmarked:!record().bookmarked}); refresh(); });
    $('complete').addEventListener('click', () => { patch({completed:!record().completed}); refresh(); if (record().completed) celebrate(); });
    $('question-note').addEventListener('input', () => { patch({note:$('question-note').value}); $('note-status').textContent = storageWritable ? '已保存' : '仅本次保留'; });
    $('previous').addEventListener('click', () => navigate(index-1)); $('next').addEventListener('click', () => navigate(index+1));
    $('previous-paper').addEventListener('click', () => openNeighbor('previous'));
    $('next-paper').addEventListener('click', () => openNeighbor('next'));
    loadYearNav(catalog);
    bindShortcuts(); bindSwipe();
    $('focus-mode').addEventListener('click', () => { focused = !focused; document.body.classList.toggle('is-focused',focused); $('focus-mode').setAttribute('aria-pressed',String(focused)); $('focus-mode').textContent = focused ? '退出专注' : '专注模式'; });
    $('enlarge').addEventListener('click', () => openZoom());
    $('close-zoom').addEventListener('click', () => $('image-dialog').close());
    $('zoom-out').addEventListener('click', () => { zoom = Math.max(75,zoom-25); applyZoom(); });
    $('zoom-in').addEventListener('click', () => { zoom = Math.min(200,zoom+25); applyZoom(); });
    $('export-records').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify({version:1,records},null,2)],{type:'application/json'});
      const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = '逐题练习记录.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    });
    window.addEventListener('popstate', () => { const id = new URLSearchParams(location.search).get('q'); navigate(Math.max(0,paper.questions.findIndex(q => q.id === id)),null); });
  } catch (error) {
    $('app').hidden = true; $('chooser').hidden = true; $('load-status').hidden = false;
    $('load-status').textContent = error.message + '。请刷新重试，或返回刷题练习。';
    $('paper-source').textContent = '题目暂时无法加载';
  }
})();
