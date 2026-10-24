(function () {
  'use strict';
  const bank = window.QUESTION_BANK;
  const core = window.QuizCore;
  const key = 'japan-study-journal:practice:v1';
  const $ = id => document.getElementById(id);
  if (!core || !Array.isArray(bank) || bank.some(q => q.type === 'paper') && !window.PastPapersCore) {
    $('bank-notice').textContent = '题库暂时无法加载，请刷新重试，或先查阅过去问。';
    $('list-count').textContent = '题库加载失败';
    $('empty-state').hidden = false;
    $('empty-title').textContent = '题库暂时无法加载。';
    $('empty-copy').textContent = '请检查网络后刷新，或先阅读过去问。';
    $('empty-reset').hidden = true; $('empty-home').hidden = false;
    return;
  }
  let questionSets = [], items = bank.slice(), questionBankFailed = 0, questionBankStatus = 'pending';
  function syncModeChrome() {
    const graded = items.some(q => q.type !== 'paper' && q.type !== 'questionSet');
    $('individual-filters').hidden = !graded;
    $('accuracy-stat').hidden = !graded; $('wrong-stat').hidden = !graded; $('wrong-scope').hidden = !graded;
  }
  syncModeChrome();
  $('filter-disclosure').open = !matchMedia('(max-width: 800px)').matches;
  const defaults = { sourceKind: 'all', school: 'all', major: 'all', book: 'all', paperYear: 'all', subject: 'all', chapter: 'all', difficulty: 'all', type: 'all', scope: 'all', order: 'sequential', search: '', practiceMode: 'all' };
  const typeNames = { paper: '原卷练习 · 不判分', choice: '单选题', numeric: '数值题', written: '解答题 · 自评' };
  let state = core.blank(), list = [], index = 0, locked = false, exposed = false;
  let pendingResume = null, filtersTouched = false;
  let storageFailed = false, preserveUnreadable = false, suppressSave = false, replaceRecords = false, searchTimer;
  const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  function storageMessage(message, warning = false) { $('storage-status').textContent = message; $('storage-status').classList.toggle('is-warning', warning); }
  try {
    const saved = localStorage.getItem(key);
    if (saved) { const parsed = JSON.parse(saved); state = core.cleanState(parsed, bank); pendingResume = { current:parsed?.current, filters:{...state.filters} }; }
  } catch (e) {
    storageFailed = true;
    preserveUnreadable = true;
    storageMessage('无法读取浏览器记录。本次可继续练习，请导出记录备份；原记录未主动删除。', true);
  }
  function save() {
    if (preserveUnreadable || suppressSave) return;
    try {
      const previous = replaceRecords ? null : JSON.parse(localStorage.getItem(key) || 'null');
      const next = window.ProgressSync ? window.ProgressSync.projectPractice(previous, state, bank) : state;
      const text = JSON.stringify(next);
      if (localStorage.getItem(key) === text) return;
      localStorage.setItem(key, text); storageFailed = false;
    }
    catch (e) { storageFailed = true; storageMessage('浏览器无法保存记录（可能禁用了存储或空间已满）。请导出记录，避免刷新后丢失。', true); }
  }
  function touchFilters() { filtersTouched = true; state.filtersUpdatedAt = Date.now(); }
  function applyFilterControls() {
    state.filters = { ...defaults, ...state.filters };
    for (const id of ['sourceKind','paperYear','subject','difficulty','type','order','practiceMode']) {
      if (![...$(id).options].some(o => o.value === state.filters[id])) state.filters[id] = defaults[id];
      $(id).value = state.filters[id];
    }
    if (!['all','wrong','unanswered','bookmarked'].includes(state.filters.scope)) state.filters.scope = 'all';
    updateSources();
    $('search').value = state.filters.search || '';
    updateChapters();
  }
  function reloadFromSync() {
    if (preserveUnreadable) return;
    let parsed;
    try { parsed = JSON.parse(localStorage.getItem(key) || 'null'); } catch { return; }
    if (!parsed) return;
    suppressSave = true;
    try { state = core.cleanState(parsed, items); state.filters.practiceMode = readMode(); applyFilterControls(); rebuild(true); }
    catch { /* 同步结果无法读取时保留当前页面。 */ }
    finally { suppressSave = false; }
  }
  function option(select, value, label) { const el = document.createElement('option'); el.value = value; el.textContent = label; select.append(el); }
  function updateSubjects() {
    const current = state.filters.subject;
    $('subject').replaceChildren(); option($('subject'), 'all', '全部学科');
    [...new Set([...(window.QUESTION_SUBJECTS || []), ...items.flatMap(core.subjectsOf)])].forEach(s => option($('subject'), s, s));
    if (![...$('subject').options].some(o => o.value === current)) state.filters.subject = 'all';
    $('subject').value = state.filters.subject;
  }
  function updateYears() {
    const current = state.filters.paperYear;
    $('paperYear').replaceChildren(); option($('paperYear'), 'all', '全部年份');
    [...new Set(items.filter(q => q.paper && q.paper.year != null).map(q => String(q.paper.year)))].sort((a, b) => Number(b) - Number(a)).forEach(y => option($('paperYear'), y, y));
    if (![...$('paperYear').options].some(o => o.value === current)) state.filters.paperYear = 'all';
    $('paperYear').value = state.filters.paperYear;
  }
  function updateChapters() {
    $('chapter').replaceChildren(); option($('chapter'), 'all', '全部章节');
    [...new Set(items.filter(q => state.filters.subject === 'all' || core.subjectsOf(q).includes(state.filters.subject)).map(q => q.chapter))].forEach(c => option($('chapter'), c, c));
    if (![...$('chapter').options].some(o => o.value === state.filters.chapter)) state.filters.chapter = 'all';
    $('chapter').value = state.filters.chapter;
  }
  function updateSources() {
    const populate = (id, label, entries) => {
      $(id).replaceChildren(); option($(id), 'all', label);
      for (const [value, text] of new Map(entries)) option($(id), value, text);
      if (![...$(id).options].some(o => o.value === state.filters[id])) state.filters[id] = 'all';
      $(id).value = state.filters[id];
    };
    const sources = items.map(core.provenance);
    populate('school', '全部学校 · 跨校练习', sources.filter(s => s.kind === 'exam' && s.school).map(s => [s.school, s.school]));
    populate('major', '全部专攻', sources.filter(s => s.kind === 'exam' && s.major && (state.filters.school === 'all' || s.school === state.filters.school))
      .map(s => [JSON.stringify([s.school, s.graduate || '', s.major]), [s.school, s.graduate, s.major].filter(Boolean).join(' / ')]));
    populate('book', '全部书籍', sources.filter(s => s.kind === 'workbook' && s.book).map(s => [s.book, s.book]));
    $('exam-filters').hidden = !['all', 'exam'].includes(state.filters.sourceKind);
    $('book-filters').hidden = !['all', 'workbook'].includes(state.filters.sourceKind) || !sources.some(s => s.kind === 'workbook');
  }
  function readMode() {
    try {
      const value = sessionStorage.getItem('japan-study-journal:practice-mode');
      return value === 'paper' || value === 'questions' ? value : 'all';
    } catch { return 'all'; }
  }
  function writeMode(value) { try { sessionStorage.setItem('japan-study-journal:practice-mode', value); } catch { /* 会话存储不可用时，本次筛选仍保留在页面上。 */ } }
  state.filters.practiceMode = readMode();
  updateSubjects();
  updateYears();
  applyFilterControls();
  function readQuestionRecordMap() {
    try { return window.QuestionBank ? window.QuestionBank.loadQuestionRecords(localStorage).records : {}; }
    catch { return {}; }
  }
  function record(q) {
    if (q && q.type === 'questionSet') {
      const stored = readQuestionRecordMap();
      const rows = q.questions.map(item => stored[item.id] || {});
      return { completed: rows.length > 0 && rows.every(row => row.completed), bookmarked: rows.some(row => row.bookmarked), correct: null, attempts: 0, wrongCount: 0, note: '' };
    }
    return state.records[q.id] || {};
  }
  function recordsForFilter() {
    const records = { ...state.records };
    for (const set of questionSets) records[set.id] = record(set);
    return records;
  }
  function current() { return list[index]; }
  function setFeedback(text, kind = '') { const el = $('feedback'); el.hidden = false; el.textContent = text; el.className = 'feedback' + (kind ? ` is-${kind}` : ''); }
  function syncScopes() { document.querySelectorAll('[data-scope]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scope === state.filters.scope))); }
  function refreshStats() {
    const s = core.stats(items, { ...state, records: recordsForFilter() });
    $('stat-attempted').textContent = `${s.attempted} / ${s.total}`;
    $('stat-accuracy').textContent = items.some(q => q.type !== 'paper' && q.type !== 'questionSet' && record(q).attempts > 0) ? `${s.accuracy}%` : '—';
    $('stat-wrong').textContent = s.wrong;
    $('stat-saved').textContent = s.bookmarked;
    $('filter-summary-text').textContent = [state.filters.practiceMode === 'questions' ? '逐题' : state.filters.practiceMode === 'paper' ? '整卷' : '', state.filters.school === 'all' ? '全部学校' : state.filters.school, state.filters.subject === 'all' ? '全部科目' : state.filters.subject, state.filters.paperYear === 'all' ? '' : state.filters.paperYear, state.filters.search ? '搜索：' + state.filters.search : ''].filter(Boolean).join(' · ');
    $('practice-picker').disabled = !list.length;
    $('practice-picker').replaceChildren();
    if (!list.length) option($('practice-picker'), '', '暂无匹配练习');
    list.forEach((q,i) => option($('practice-picker'), String(i), `${core.isDone(q,record(q)) ? '✓ ' : ''}${q.title} · ${core.provenance(q).school || core.sourceLabel(q)}`));
    $('practice-picker').value = list.length ? String(index) : '';
    $('stat-days').textContent = state.days.length;
    $('wrong-count').textContent = s.wrong;
    $('bookmark-count').textContent = s.bookmarked;
    const done = list.filter(q => core.isDone(q, record(q))).length;
    $('list-count').textContent = !items.length ? '题库筹备中 · 0 题' : `${state.filters.scope === 'wrong' ? '错题重练' : state.filters.scope === 'bookmarked' ? '收藏练习' : state.filters.scope === 'unanswered' ? '未作答练习' : '当前题单'} · ${list.length} 项练习`;
    $('session-progress').textContent = `本题单已完成 ${done} / ${list.length}`;
    $('progress').max = list.length || 1; $('progress').value = done;
    $('bank-size').textContent = items.length;
    const paperCount = items.filter(q => q.type === 'paper').length;
    const setCount = items.filter(q => q.type === 'questionSet').length;
    $('bank-caption').textContent = !items.length ? '道题 · 等待添加题库' : setCount ? `${paperCount} 套整卷 · ${setCount} 套逐题` : paperCount && paperCount === items.length ? '套原卷 · 按学校与科目练习' : `${paperCount} 套原卷 · ${items.length - paperCount} 道逐题练习`;
    let notice = !items.length ? '刷题功能已就绪，题库暂为空，后续加入你的题目后即可练习。解答题需对照解析自评，不是官方评分。' : setCount ? '整卷练习保留完整 PDF。已逐题拆好的卷出现在同一筛选里，标成「逐题练习」，点进去按题阅读原题。两种记录分开保存；逐题完成不会写成整卷完成，也不自动评分。' : paperCount ? '当前为整卷练习：筛选原卷，在纸上作答，完成后记录进度。科目按目录标注，合卷尚未逐题拆分。' : '先独立作答，再对照参考答案。解答题需自行评估推导过程；练习正确率不是官方评分。';
    if (questionBankStatus === 'error') notice += '逐题卷暂时无法读取，整卷练习仍可使用。';
    else if (questionBankFailed) notice += `有 ${questionBankFailed} 份逐题卷暂时无法读取。`;
    $('bank-notice').textContent = notice;
    drawMap();
  }
  function drawMap() {
    $('question-grid').replaceChildren();
    list.forEach((q, i) => {
      const r = record(q), button = document.createElement('button');
      button.type = 'button';
      const finished = (q.type === 'paper' || q.type === 'questionSet') && r.completed;
      button.textContent = `${i+1}${finished ? ' ✓' : ''}${r.correct === true ? ' ✓' : r.correct === false ? ' ×' : ''}${r.bookmarked ? ' ☆' : ''}`;
      button.setAttribute('aria-label', `第 ${i+1} 项练习：${q.title}，${finished ? '已练习' : r.correct === true ? '已答对' : r.correct === false ? '待复习' : '未作答'}${r.bookmarked ? '，已收藏' : ''}`);
      if (r.correct === true || finished) button.className = 'is-correct';
      if (r.correct === false) button.className = 'is-wrong';
      if (i === index) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => navigate(i));
      $('question-grid').append(button);
    });
  }
  function navigate(i) {
    if (i < 0 || i >= list.length) return;
    index = i;
    if (list[i] && state.current !== list[i].id) state.positionUpdatedAt = Date.now();
    render();
    $('question-card').focus({ preventScroll: true });
    $('question-card').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function rebuild(keepCurrent = false) {
    const old = keepCurrent ? state.current : null;
    list = core.filterQuestions(items, state.filters, recordsForFilter());
    if (state.filters.order === 'random') list = core.shuffle(list);
    index = Math.max(0, list.findIndex(q => q.id === old));
    syncScopes(); render();
  }
  function makeAnswerInputs(q, r, fresh) {
    const area = $('answer-inputs'); area.replaceChildren();
    const answer = fresh ? null : r.attempts > 0 ? r.answer : r.draft;
    if (q.type === 'choice') {
      const fieldset = document.createElement('fieldset'); fieldset.className = 'choice-list';
      const legend = document.createElement('legend'); legend.className = 'sr-only'; legend.textContent = '请选择一个答案'; fieldset.append(legend);
      q.options.forEach((text, i) => {
        const label = document.createElement('label'); label.className = 'choice-option';
        const input = document.createElement('input'); input.type = 'radio'; input.name = 'answer'; input.value = i;
        input.checked = answer !== null && answer !== undefined && answer !== '' && Number(answer) === i;
        input.disabled = locked;
        const letter = document.createElement('span'); letter.textContent = String.fromCharCode(65+i); letter.className = 'choice-letter';
        const copy = document.createElement('span'); copy.textContent = text;
        label.append(input, letter, copy); fieldset.append(label);
      });
      area.append(fieldset); $('input-help').textContent = '选择一个选项后提交，可查看答案和完整推导。';
    } else {
      const label = document.createElement('label'); label.htmlFor = 'response'; label.className = 'answer-label';
      label.textContent = q.type === 'numeric' ? `你的答案${q.unit ? `（${q.unit}）` : ''}` : '你的推导（可先在纸上完成，再记录思路）';
      const input = document.createElement(q.type === 'numeric' ? 'input' : 'textarea'); input.id = 'response'; input.maxLength = 6000;
      if (q.type === 'numeric') { input.type = 'text'; input.inputMode = 'decimal'; input.className = 'numeric-answer'; input.placeholder = '输入数值，例如 0.5 或 1/2'; }
      else { input.rows = 5; input.placeholder = '写出关键公式、步骤和结论……'; }
      input.value = answer === null || answer === undefined ? '' : String(answer); input.disabled = locked; input.setAttribute('aria-describedby','input-help');
      area.append(label,input);
      $('input-help').textContent = q.type === 'numeric' ? `仅输入数值，不要带单位。支持小数、科学计数法和分数。${q.tolerance ? `允许误差 ±${q.tolerance}${q.unit ? ' '+q.unit : ''}。` : '本题要求精确值。'}` : '解答题需对照参考推导自评；不同但等价的正确方法也可以。';
    }
  }
  function renderPaper(q, r) {
    const files = q.paper.files.filter(f => f.kind === 'question');
    const link = (file, label) => {
      const a = document.createElement('a'); a.href = window.PastPapersCore.fileURL(file); a.textContent = label;
      a.target = '_blank'; a.rel = 'noopener'; a.className = 'secondary-button'; return a;
    };
    $('paper-meta').textContent = `本套 ${files.length} 份原卷 · 选择文件开始练习${state.filters.subject !== 'all' ? ' · 筛选科目：' + state.filters.subject : ''}`;
    $('practice-paper-note').textContent = q.paper.sourceNote || '出处以原卷及过去问目录为准。';
    $('practice-paper-files').replaceChildren();
    function showFile(f, i) {
      $('practice-paper-location').textContent = `${i+1} / ${files.length} 份原卷 · PDF ${f.pages} 页 · 从第 ${f.startPage || 1} 页打开${f.endPage ? '，至第 ' + f.endPage + ' 页' : ''}`;
      $('practice-paper-note').textContent = `${core.sourceLabel(q)}\n${f.originalName || f.label}\n原件可能含其他科目或年份，请按目录页码练习。\n目录科目：${q.paper.originalSubjects.join(' / ') || '未细分'}\n${q.paper.examDates.length ? '考试日期：' + q.paper.examDates.join(' / ') + '\n' : ''}${q.paper.sourceNote || '出处以原卷及过去问目录为准。'}`;
      $('practice-paper-actions').replaceChildren(link(f, '新窗口打开原卷 ↗'));
      const download = link(f, '下载原卷 ↓'); download.download = f.originalName || 'past-paper.pdf'; $('practice-paper-actions').append(download);
      const back = document.createElement('a'); back.href = 'past-papers.html?' + new URLSearchParams({school:q.paper.schoolId,paper:q.paper.catalogId}); back.textContent = '查看过去问目录 ↗'; back.className = 'plain-button'; $('practice-paper-actions').append(back);
      const frame = document.createElement('iframe'); frame.src = window.PastPapersCore.fileURL(f); frame.title = q.title + ' · ' + f.label;
      $('practice-paper-reader').replaceChildren(frame);
      [...$('practice-paper-files').children].forEach((b, n) => b.setAttribute('aria-pressed', String(n === i)));
    }
    files.forEach((f,i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'secondary-button'; b.textContent = f.label; b.addEventListener('click', () => showFile(f,i)); $('practice-paper-files').append(b); });
    const refs = q.paper.files.filter(f => f.kind !== 'question');
    $('practice-answer-status').textContent = refs.some(f => f.kind === 'answer') ? '目录中附有参考解答，适用科目与页码以文件和来源说明为准，不自动判分。' : '本套未收录参考答案。订正、出题意图等补充资料不视作答案。';
    $('practice-reference-links').replaceChildren(...refs.map(f => link(f, (f.kind === 'answer' ? '参考解答：' : '补充资料：') + f.label)));
    $('practice-paper-references').open = false;
    $('complete-paper').textContent = r.completed ? '取消已练习标记' : '标记本套已练习';
    $('paper-completion').textContent = r.completed ? '本套已练习 ✓（不计入正确率）' : '尚未标记完成';
    if (files.length) { const preferred = Math.max(0, files.findIndex(f => f.subjects?.includes(state.filters.subject))); showFile(files[preferred],preferred); }
  }
  function renderQuestionSet(q) {
    const stored = readQuestionRecordMap();
    const done = q.questions.filter(item => stored[item.id]?.completed).length;
    $('question-set-meta').textContent = `本卷 ${q.questions.length} 道大题 · ${q.provenance.label || q.subject} · 按原题裁图练习，不嵌入 PDF，不自动评分。`;
    const open = document.createElement('a'); open.className = 'primary-button'; open.href = window.QuestionBank.practiceURL(q.id); open.textContent = '进入逐题练习 →';
    const catalog = document.createElement('a'); catalog.className = 'plain-button'; catalog.href = 'past-papers.html?' + new URLSearchParams({ school: q.paper.schoolId, paper: q.paper.catalogId }); catalog.textContent = '查看过去问目录 ↗';
    $('question-set-links').replaceChildren(open, catalog);
    $('question-set-items').replaceChildren(...q.questions.map(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = window.QuestionBank.practiceURL(q.id, item.id);
      const mark = stored[item.id]?.completed ? '已练习' : '未练习';
      link.textContent = `${item.number} · ${item.title} · ${mark}${stored[item.id]?.bookmarked ? ' · 已收藏' : ''}`;
      li.append(link); return li;
    }));
    $('question-set-progress').textContent = `本卷已练习 ${done} / ${q.questions.length} 道大题。逐题记录与整卷记录分开保存；做完这些题不会把整卷标成已完成。`;
  }
  function render(fresh = false) {
    const q = current();
    $('practice-paper-reader').replaceChildren();
    $('question-card').hidden = !q; $('empty-state').hidden = Boolean(q); $('question-map').hidden = !q;
    if (!q) {
      const scope = state.filters.scope;
      $('empty-title').textContent = !items.length ? '题库正在等你。' : scope === 'wrong' ? '当前筛选下没有待复习错题' : scope === 'bookmarked' ? '当前筛选下还没有收藏题目' : scope === 'unanswered' ? '当前筛选下的题目都练过了' : state.filters.practiceMode === 'questions' ? '当前筛选下没有逐题卷' : '没有匹配的题目';
      $('empty-copy').textContent = !items.length ? '功能已经准备好。加入你的题目后，便可以按学校、专攻或科目练习。已拆好的逐题卷会和整卷一起出现。' : scope === 'bookmarked' ? '练习时点击「☆ 收藏」，就可以把题目留在这里。逐题收藏记在逐题记录里，有收藏的卷也会出现在这里。' : '试试其他学校、专攻、年份、科目或练习形式，或点击下方查看全部题目。';
      $('empty-reset').hidden = !items.length;
      $('empty-home').hidden = Boolean(items.length);
      refreshStats(); save(); return;
    }
    const r = record(q); state.current = q.id;
    locked = !fresh && r.attempts > 0 && typeof r.correct === 'boolean'; exposed = false;
    $('question-tags').replaceChildren();
    const tags = q.type === 'paper' ? [state.filters.subject !== 'all' ? state.filters.subject : core.subjectsOf(q).length > 1 ? '多科目合卷' : core.subjectsOf(q)[0], '原卷练习'] : q.type === 'questionSet' ? [...core.subjectsOf(q), '逐题练习'] : [...core.subjectsOf(q), q.chapter, q.difficulty, typeNames[q.type]];
    tags.filter(Boolean).forEach(tag => { const el = document.createElement('span'); el.textContent = tag; $('question-tags').append(el); });
    $('question-source').textContent = q.type === 'questionSet' ? [q.provenance.school, q.provenance.graduate, q.provenance.major, q.provenance.year].filter(Boolean).join(' / ') : q.type === 'paper' ? [q.provenance.school, q.provenance.graduate].filter(Boolean).join(' / ') : core.sourceLabel(q);
    $('question-title').textContent = `${index+1}. ${q.title}`;
    $('question-prompt').textContent = q.prompt; $('question-prompt').hidden = q.type === 'paper';
    const step = q.type === 'questionSet' ? '卷' : q.type === 'paper' ? '套' : '题';
    $('previous').textContent = `← 上一${step}`; $('next').textContent = `下一${step} →`;
    $('bookmark').hidden = q.type === 'questionSet';
    $('bookmark').setAttribute('aria-pressed',String(Boolean(r.bookmarked))); $('bookmark').textContent = r.bookmarked ? '★ 已收藏' : '☆ 收藏';
    ['feedback','reference-answer','explanation','self-grade'].forEach(id => $(id).hidden = true);
    $('show-answer').textContent = '查看答案'; $('show-explanation').textContent = '查看解析 ↗';
    $('submit-answer').textContent = q.type === 'written' ? '对照答案与解析' : '提交答案'; $('submit-answer').disabled = locked;
    $('retry').hidden = !locked;
    $('question-note').value = q.type === 'questionSet' ? '' : (r.note || '');
    document.querySelector('.note-details').hidden = q.type === 'questionSet';
    document.querySelector('.note-details').open = q.type !== 'questionSet' && Boolean(r.note);
    $('position').textContent = `${index+1} / ${list.length}`;
    $('previous').disabled = index === 0; $('next').disabled = index === list.length-1;
    $('answer-text').textContent = q.answerText;
    $('explanation-steps').replaceChildren();
    q.explanation.forEach(step => { const li = document.createElement('li'); li.textContent = step; $('explanation-steps').append(li); });
    $('hint').textContent = `解题提醒：${q.hint}`;
    $('paper-practice').hidden = q.type !== 'paper';
    $('question-set-practice').hidden = q.type !== 'questionSet';
    $('answer-form').hidden = q.type === 'paper' || q.type === 'questionSet';
    if (q.type === 'paper') { $('retry').hidden = true; renderPaper(q,r); }
    else if (q.type === 'questionSet') { $('retry').hidden = true; renderQuestionSet(q); }
    else makeAnswerInputs(q,r,fresh);
    if (locked) setFeedback(`上次${q.type === 'written' ? '自评' : '作答'}：${r.correct ? '正确 ✓' : '还需复习 ×'} · 累计 ${r.attempts} 次${r.wrongCount ? `，错误 ${r.wrongCount} 次` : ''}。可查看解析或重新作答。`, r.correct ? 'correct' : 'wrong');
    refreshStats(); save();
  }
  function getAnswer() {
    const q = current();
    if (q.type === 'choice') { const selected = document.querySelector('input[name="answer"]:checked'); return selected ? Number(selected.value) : null; }
    return $('response').value.trim();
  }
  function showReference(withExplanation) {
    const q = current(); if (!q || q.type === 'paper' || q.type === 'questionSet') return;
    exposed = true; $('reference-answer').hidden = false; $('show-answer').textContent = '答案已显示';
    if (withExplanation) { $('explanation').hidden = false; $('show-explanation').textContent = '解析已展开'; }
    if (q.type === 'written' && !locked) $('self-grade').hidden = false;
    if (q.type !== 'written') {
      if (!locked) { $('submit-answer').disabled = true; $('retry').hidden = false; setFeedback('答案已显示，本次不计入成绩。点击「重新作答」后可重新判题。'); }
      if (q.type === 'choice') document.querySelectorAll('.choice-option').forEach((el,i) => { el.classList.toggle('correct-option', i === q.answer); const selected = el.querySelector('input').checked; el.classList.toggle('incorrect-option', selected && i !== q.answer); });
    }
  }
  function complete(correct, answer) {
    const q = current(); core.recordResult(state,q.id,correct,answer,localDay()); locked = true;
    $('submit-answer').disabled = true; $('self-grade').hidden = true; $('retry').hidden = false;
    document.querySelectorAll('#answer-inputs input, #answer-inputs textarea').forEach(el => el.disabled = true);
    setFeedback(correct ? `${q.type === 'written' ? '已标记为做对' : '回答正确'} ✓${state.filters.scope === 'wrong' ? '，已移出错题本（点击更新题单刷新）。' : '，继续保持。'}` : '还需复习 ×，已加入错题本。建议对照解析后再试一次。', correct ? 'correct' : 'wrong');
    if (q.type !== 'written') showReference(true);
    refreshStats(); save();
  }
  $('complete-paper').addEventListener('click', () => { const q = current(); if (q?.type !== 'paper') return; core.recordPaperCompletion(state,q.id,!record(q).completed,localDay()); const done = record(q).completed; $('complete-paper').textContent = done ? '取消已练习标记' : '标记本套已练习'; $('paper-completion').textContent = done ? '本套已练习 ✓（不计入正确率）' : '尚未标记完成'; refreshStats(); save(); });
  $('answer-form').addEventListener('submit', event => {
    event.preventDefault(); const q = current(); if (!q || q.type === 'paper' || q.type === 'questionSet' || locked || (exposed && q.type !== 'written')) return;
    const answer = getAnswer();
    if (q.type === 'written') { showReference(true); return; }
    if (answer === null || answer === '') { setFeedback('请先输入或选择答案。'); return; }
    const result = core.grade(q,answer);
    if (result === null) { setFeedback('请输入有效数值，如 −2、0.5、1/2 或 1e-3；不支持算式或单位。'); $('response').focus(); return; }
    complete(result,answer);
  });
  $('show-answer').addEventListener('click', () => showReference(false));
  $('show-explanation').addEventListener('click', () => showReference(true));
  $('mark-correct').addEventListener('click', () => { if (current()?.type === 'written' && !locked && exposed) complete(true,getAnswer()); });
  $('mark-wrong').addEventListener('click', () => { if (current()?.type === 'written' && !locked && exposed) complete(false,getAnswer()); });
  $('retry').addEventListener('click', () => { render(true); document.querySelector('#answer-inputs input, #answer-inputs textarea')?.focus(); });
  $('bookmark').addEventListener('click', () => {
    const q = current(); if (!q || q.type === 'questionSet') return;
    const r = record(q); state.records[q.id] = { ...r, bookmarked: !r.bookmarked, bookmarkAt: Date.now() };
    $('bookmark').setAttribute('aria-pressed', String(!r.bookmarked)); $('bookmark').textContent = r.bookmarked ? '☆ 收藏' : '★ 已收藏'; refreshStats(); save();
  });
  $('answer-inputs').addEventListener('input', () => {
    const q = current(); if (!q || q.type === 'questionSet' || locked) return;
    const r = record(q), answer = getAnswer(); state.records[q.id] = { ...r, draft: answer === null ? '' : String(answer) }; save();
  });
  $('question-note').addEventListener('input', () => { const q = current(); if (!q || q.type === 'questionSet') return; state.records[q.id] = { ...record(q), note: $('question-note').value, noteAt: Date.now() }; save(); });
  $('practice-picker').addEventListener('change', () => navigate(Number($('practice-picker').value)));
  let focused = false;
  function setFocus(value) { focused = value; $('practice-main').classList.toggle('is-focused', focused); $('focus-practice').setAttribute('aria-pressed', String(focused)); $('focus-practice').textContent = focused ? '退出专注 · Esc' : '专注阅读'; }
  $('focus-practice').addEventListener('click', () => setFocus(!focused));
  if (typeof window.addEventListener === 'function') window.addEventListener('keydown', event => { if (event.key === 'Escape') setFocus(false); });
  $('previous').addEventListener('click', () => navigate(index-1)); $('next').addEventListener('click', () => navigate(index+1));
  for (const id of ['sourceKind','school','major','book','paperYear','subject','chapter','difficulty','type','order','practiceMode']) $(id).addEventListener('change', () => { state.filters[id] = $(id).value; if (id === 'practiceMode') writeMode($(id).value); if (id === 'school') state.filters.major = 'all'; if (id === 'sourceKind') { state.filters.school = 'all'; state.filters.major = 'all'; state.filters.book = 'all'; } touchFilters(); updateSources(); if (id === 'subject') { state.filters.chapter = 'all'; updateChapters(); } rebuild(); });
  $('search').addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.filters.search = $('search').value; touchFilters(); rebuild(); }, 200); });
  document.querySelectorAll('[data-scope]').forEach(b => b.addEventListener('click', () => { state.filters.scope = b.dataset.scope; touchFilters(); rebuild(); }));
  function resetFilters() { clearTimeout(searchTimer); state.filters = { ...defaults }; writeMode('all'); touchFilters(); ['sourceKind','paperYear','subject','difficulty','type','order','practiceMode','search'].forEach(id => $(id).value = state.filters[id]); updateSources(); updateChapters(); rebuild(); }
  $('reset-filters').addEventListener('click',resetFilters); $('empty-reset').addEventListener('click',resetFilters);
  $('refresh-list').addEventListener('click', () => rebuild());
  $('export-progress').addEventListener('click', () => {
    const content = JSON.stringify({ ...state, exportedAt: new Date().toISOString() },null,2);
    const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `修考练习记录-${localDay()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    if (!storageFailed) storageMessage('记录已导出。请妥善保管，文件包含你的笔记和作答记录。');
  });
  $('import-progress').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', async event => {
    const file = event.target.files[0]; event.target.value = ''; if (!file) return;
    try {
      if (file.size > 2*1024*1024) throw new Error('文件过大，请选择本网站导出的 JSON 记录（不超过 2 MB）。');
      const imported = core.cleanState(JSON.parse(await file.text()),bank);
      const synced = window.JapanGithubSync && window.JapanGithubSync.getGithubSyncSnapshot().connected;
      if (!confirm('导入会替换当前浏览器的练习记录和笔记。建议先导出备份。' + (synced ? '其他设备上的记录会在下次同步合并回来，不会被这份备份删掉。' : '') + '确定继续吗？')) return;
      state = imported; preserveUnreadable = false; state.filters = { ...defaults }; replaceRecords = true; try { resetFilters(); } finally { replaceRecords = false; }
      if (!storageFailed) storageMessage('记录导入成功。作答、错题、收藏和笔记已恢复。');
    } catch (e) { storageMessage(`导入失败：${e instanceof SyntaxError ? 'JSON 格式无效。' : e.message} 当前记录未改变。`,true); }
  });
  if (typeof window.addEventListener === 'function') {
    window.addEventListener('japan-study-journal:synced', reloadFromSync);
    window.addEventListener('storage', event => { if (event.key === key) reloadFromSync(); });
  }
  function restoreCurrent() {
    if (preserveUnreadable) return;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      const resume = !filtersTouched && pendingResume ? pendingResume.current : saved?.current;
      if (items.some(q => q.id === resume)) state.current = resume;
    } catch { /* 读不到上次位置时留在当前题单。 */ }
  }
  async function attachQuestionSets() {
    const fetchImpl = typeof fetch === 'function' ? fetch : window.fetch;
    if (typeof fetchImpl !== 'function' || !window.QuestionBank) {
      questionBankStatus = 'skipped';
      if (document.documentElement) document.documentElement.dataset.questionBank = 'skipped';
      return;
    }
    try {
      const loaded = await window.QuestionBank.loadListings(fetchImpl);
      questionSets = loaded.listings;
      questionBankFailed = loaded.failed;
      items = bank.concat(questionSets);
      questionBankStatus = 'ready';
      if (document.documentElement) document.documentElement.dataset.questionBank = 'ready';
    } catch {
      questionBankStatus = 'error';
      if (document.documentElement) document.documentElement.dataset.questionBank = 'error';
    }
    if (pendingResume && !filtersTouched) state.filters = { ...defaults, ...pendingResume.filters, practiceMode:readMode() };
    syncModeChrome();
    updateSubjects();
    updateYears();
    applyFilterControls();
    restoreCurrent();
    pendingResume = null;
    rebuild(true);
  }
  rebuild(true);
  window.__questionBankReady = attachQuestionSets();
})();
