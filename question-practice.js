(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let paper, index = 0, records = {}, recordState = { writable: true, keepFormal: false, keepLegacy: false }, storageWritable = true, focused = false, zoom = 100;
  const idPattern = /^[a-z0-9][a-z0-9-]{0,120}$/;
  const assetPattern = /^assets\/question-bank\/[a-z0-9-]+\/[a-z0-9-]+\.png$/;
  const pdfPattern = /^assets\/past-papers\/documents\/[a-f0-9]{64}\.pdf$/;
  const params = new URLSearchParams(location.search);
  let requested = params.get('paper');
  let aliasQuestion;
  let queue = null;
  let yearRows = null, yearLoading = false, yearFailed = false, yearTargets = null;
  let yearFilters = {}, yearReturn = new URLSearchParams();
  if (params.get('queue') === '1') {
    try { queue = window.QuestionFlow.readQueue(sessionStorage); } catch { /* 单卷仍可使用。 */ }
  }
  function queueIndex() { return queue ? queue.items.findIndex(q => q.paper === paper.id && q.id === current().id) : -1; }
  function updateNavigation() {
    const at = queueIndex(), total = at >= 0 ? queue.items.length : paper.questions.length, pos = at >= 0 ? at : index;
    $('position').textContent = `${at >= 0 ? '当前题单' : '本卷'}第 ${pos+1} 题 / 共 ${total} 道大题`;
    $('nav-position').textContent = `${pos+1} / ${total}`;
    $('previous').disabled = pos === 0; $('next').disabled = pos === total-1;
    $('complete-next').textContent = pos === total-1 ? '已练习，结束本轮' : '已练习，下一题';
    $('queue-finish').hidden = pos !== total-1 || !record().completed;
    updateYearNavigation(pos === total-1);
  }
  function updateYearNavigation(atEnd) {
    const group = $('year-navigation');
    group.hidden = !atEnd;
    if (!atEnd) return;
    if (!yearRows) {
      $('previous-year').disabled = $('next-year').disabled = true;
      $('year-status').textContent = yearFailed ? '其他年份暂时加载失败，可重试或返回选题。' : '正在查找可继续练习的年份…';
      $('retry-years').hidden = !yearFailed;
      if (!yearLoading && !yearFailed) loadYearNavigation();
      return;
    }
    const items = queue || {items:paper.questions.map(q => ({paper:paper.id,id:q.id}))};
    yearTargets = window.QuestionFlow.adjacentYears(yearRows, items.items, yearFilters, records, queue ? yearReturn.get('series') || '' : paper.id);
    group.hidden = !yearTargets;
    if (!yearTargets) return;
    $('retry-years').hidden = true;
    $('year-status').textContent = yearTargets.previous || yearTargets.next ? '已到本年题单末尾，沿用当前范围继续刷：' : '当前范围暂无其他年份可练习，可返回重新选题。';
    for (const [id, label, target] of [['previous-year','上一年',yearTargets.previous],['next-year','下一年',yearTargets.next]]) {
      $(id).disabled = !target;
      $(id).textContent = target ? `${label} · ${target.year} 年` : `${label} · 暂无题目`;
    }
  }
  async function loadYearNavigation() {
    yearLoading = true; yearFailed = false;
    try {
      const catalog = await fetchJSON('question-catalog.json');
      if (catalog.version !== 1 || !Array.isArray(catalog.questions)) throw new Error('题目索引无效');
      yearRows = catalog.questions;
    } catch { yearFailed = true; }
    finally { yearLoading = false; updateNavigation(); }
  }
  function switchYear(direction) {
    const target = yearTargets?.[direction];
    if (!target || !storageWritable) {
      if (!storageWritable) $('year-status').textContent = '练习记录暂时无法保存，请先导出记录再切换年份。';
      return;
    }
    const items = target.items.slice();
    if (yearReturn.get('order') === 'random') for (let i=items.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [items[i],items[j]]=[items[j],items[i]]; }
    const query = new URLSearchParams(yearReturn); query.set('year',String(target.year));
    try {
      sessionStorage.setItem(window.QuestionFlow.QUEUE_KEY,JSON.stringify({version:1,items}));
      sessionStorage.setItem('japan-study-journal:question-hub-return','?'+query);
    } catch { $('year-status').textContent = '浏览器无法保存新题单，请允许会话存储后重试。'; return; }
    location.assign(window.QuestionFlow.url(items[0]));
  }
  function move(delta) {
    const at = queueIndex();
    if (at < 0) { navigate(index+delta); return; }
    const target = queue.items[at+delta]; if (!target) return;
    if (target.paper !== paper.id) { location.assign(window.QuestionFlow.url(target)); return; }
    const next = paper.questions.findIndex(q => q.id === target.id);
    if (next >= 0) navigate(next);
    else { $('storage-status').textContent = '题单中的题目已变更，请重新选题。'; }
  }
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
    $('question-directory').replaceChildren(...paper.questions.map((q, i) => ({q,i})).filter(({q}) => !queue || queue.items.some(item => item.paper === paper.id && item.id === q.id)).map(({q,i}) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'directory-button';
      button.setAttribute('aria-current', String(index === i));
      button.append(text('span', q.number + (record(q).completed ? '  ✓ 已练习' : '') + (record(q).bookmarked ? '  ★' : ''), record(q).completed ? 'done' : ''), text('strong', q.title));
      button.addEventListener('click', () => navigate(i)); return button;
    }));
    const r = record();
    $('bookmark').textContent = r.bookmarked ? '★ 已收藏' : '☆ 收藏'; $('bookmark').setAttribute('aria-pressed', String(Boolean(r.bookmarked)));
    $('complete').textContent = r.completed ? '取消已练习标记' : '标记本题已练习';
    $('completion-status').textContent = r.completed ? '本题已练习 ✓' : '';
    updateNavigation();
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
    index = next; render();
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
    $('paper-heading').replaceChildren(paper.source.school + ' · ' + yearPhrase(paper.source), document.createTextNode('，'), emphasis);
    $('paper-count').textContent = paper.questions.length + ' 道大题';
    $('source-note').textContent = paper.title + '。' + (paper.source.note || '');
    $('catalog-link').href = 'past-papers.html?' + new URLSearchParams({school:paper.source.schoolId,paper:paper.source.catalogId});
    $('chooser').hidden = true; $('load-status').hidden = true; $('app').hidden = false;
    $('directory-disclosure').open = !matchMedia('(max-width: 800px)').matches;
    if (params.get('queue') === '1') {
      $('back-to-practice').href = 'question-hub.html'; $('back-to-practice').textContent = '← 返回选题';
      try {
        const query = sessionStorage.getItem('japan-study-journal:question-hub-return') || '';
        if (!query || query.startsWith('?')) $('back-to-practice').href = 'question-hub.html' + query;
      } catch { /* 无存储时返回完整题库。 */ }
      $('queue-finish').href = $('back-to-practice').href;
      if (!queue) $('storage-status').textContent = '本次题单已失效，当前可按本卷练习，或返回重新选题。';
    }
    if (queue && !queue.items.some(q => q.paper === paper.id && q.id === (params.get('q') || aliasQuestion))) queue = null;
    if (queue) {
      try { yearReturn = new URLSearchParams(sessionStorage.getItem('japan-study-journal:question-hub-return') || ''); } catch { /* 使用默认范围。 */ }
      yearFilters = Object.fromEntries(yearReturn);
    } else {
      yearFilters = {school:paper.source.school,major:JSON.stringify([paper.source.school,paper.source.graduate,paper.source.major]),scope:'all'};
      yearReturn = new URLSearchParams(yearFilters);
      yearReturn.set('series',paper.id);
    }
    $('previous-year').addEventListener('click', () => switchYear('previous'));
    $('next-year').addEventListener('click', () => switchYear('next'));
    $('retry-years').addEventListener('click', () => { yearFailed = false; updateNavigation(); });
    const start = paper.questions.findIndex(q => q.id === (params.get('q') || aliasQuestion));
    navigate(Math.max(0,start),'replaceState');
    $('bookmark').addEventListener('click', () => { patch({bookmarked:!record().bookmarked}); refresh(); });
    $('complete').addEventListener('click', () => { patch({completed:!record().completed}); refresh(); });
    $('question-note').addEventListener('input', () => { patch({note:$('question-note').value}); $('note-status').textContent = storageWritable ? '已保存' : '仅本次保留'; });
    $('previous').addEventListener('click', () => move(-1)); $('next').addEventListener('click', () => move(1));
    $('complete-next').addEventListener('click', () => {
      patch({completed:true}); refresh();
      if (!storageWritable) { $('completion-status').textContent = '本题标记仅本次保留，请先导出记录再切题。'; return; }
      if (!$('next').disabled) move(1);
      else { $('completion-status').textContent = '本题已练习 ✓ · 已到题单末尾，可选择其他年份继续练习或返回选题。'; $('queue-finish').focus(); }
    });
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
