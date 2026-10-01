(function () {
  'use strict';
  const bank = window.QUESTION_BANK;
  const core = window.QuizCore;
  const key = 'japan-study-journal:practice:v1';
  const $ = id => document.getElementById(id);
  const defaults = { subject: 'all', chapter: 'all', difficulty: 'all', type: 'all', scope: 'all', order: 'sequential', search: '' };
  const typeNames = { choice: '单选题', numeric: '数值题', written: '解答题 · 自评' };
  let state = core.blank(), list = [], index = 0, locked = false, exposed = false;
  let storageFailed = false, preserveUnreadable = false, searchTimer;
  const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  function storageMessage(message, warning = false) { $('storage-status').textContent = message; $('storage-status').classList.toggle('is-warning', warning); }
  try {
    const saved = localStorage.getItem(key);
    if (saved) state = core.cleanState(JSON.parse(saved), bank);
  } catch (e) {
    storageFailed = true;
    preserveUnreadable = true;
    storageMessage('无法读取浏览器记录。本次可继续练习，请导出记录备份；原记录未主动删除。', true);
  }
  function save() {
    if (preserveUnreadable) return;
    try { localStorage.setItem(key, JSON.stringify(state)); storageFailed = false; }
    catch (e) { storageFailed = true; storageMessage('浏览器无法保存记录（可能禁用了存储或空间已满）。请导出记录，避免刷新后丢失。', true); }
  }
  function option(select, value, label) { const el = document.createElement('option'); el.value = value; el.textContent = label; select.append(el); }
  [...new Set([...(window.QUESTION_SUBJECTS || []), ...bank.map(q => q.subject)])].forEach(s => option($('subject'), s, s));
  function updateChapters() {
    $('chapter').replaceChildren(); option($('chapter'), 'all', '全部章节');
    [...new Set(bank.filter(q => state.filters.subject === 'all' || q.subject === state.filters.subject).map(q => q.chapter))].forEach(c => option($('chapter'), c, c));
    if (![...$('chapter').options].some(o => o.value === state.filters.chapter)) state.filters.chapter = 'all';
    $('chapter').value = state.filters.chapter;
  }
  state.filters = { ...defaults, ...state.filters };
  for (const id of ['subject','difficulty','type','order']) {
    if (![...$(id).options].some(o => o.value === state.filters[id])) state.filters[id] = defaults[id];
    $(id).value = state.filters[id];
  }
  if (!['all','wrong','unanswered','bookmarked'].includes(state.filters.scope)) state.filters.scope = 'all';
  $('search').value = state.filters.search;
  updateChapters();
  function record(q) { return state.records[q.id] || {}; }
  function current() { return list[index]; }
  function setFeedback(text, kind = '') { const el = $('feedback'); el.hidden = false; el.textContent = text; el.className = 'feedback' + (kind ? ` is-${kind}` : ''); }
  function syncScopes() { document.querySelectorAll('[data-scope]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scope === state.filters.scope))); }
  function refreshStats() {
    const s = core.stats(bank, state);
    $('stat-attempted').textContent = `${s.attempted} / ${s.total}`;
    $('stat-accuracy').textContent = s.attempted ? `${s.accuracy}%` : '—';
    $('stat-wrong').textContent = s.wrong;
    $('stat-days').textContent = state.days.length;
    $('wrong-count').textContent = s.wrong;
    $('bookmark-count').textContent = s.bookmarked;
    const done = list.filter(q => record(q).attempts > 0).length;
    $('list-count').textContent = `${state.filters.scope === 'wrong' ? '错题重练' : state.filters.scope === 'bookmarked' ? '收藏练习' : state.filters.scope === 'unanswered' ? '未作答练习' : '当前题单'} · ${list.length} 题`;
    $('session-progress').textContent = `本题单已完成 ${done} / ${list.length}`;
    $('progress').max = list.length || 1; $('progress').value = done;
    $('bank-size').textContent = bank.length;
    $('bank-caption').textContent = bank.length ? '道题 · 按章节循序练习' : '道题 · 等待添加题库';
    $('bank-notice').textContent = bank.length ? '先独立作答，再对照参考答案。解答题需自行评估推导过程；练习正确率不是官方评分。' : '刷题功能已就绪，题库暂为空，后续加入你的题目后即可练习。解答题需对照解析自评，不是官方评分。';
    drawMap();
  }
  function drawMap() {
    $('question-grid').replaceChildren();
    list.forEach((q, i) => {
      const r = record(q), button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${i+1}${r.correct === true ? ' ✓' : r.correct === false ? ' ×' : ''}${r.bookmarked ? ' ☆' : ''}`;
      button.setAttribute('aria-label', `第 ${i+1} 题：${q.title}，${r.correct === true ? '已答对' : r.correct === false ? '待复习' : '未作答'}${r.bookmarked ? '，已收藏' : ''}`);
      if (r.correct === true) button.className = 'is-correct';
      if (r.correct === false) button.className = 'is-wrong';
      if (i === index) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => navigate(i));
      $('question-grid').append(button);
    });
  }
  function navigate(i) {
    if (i < 0 || i >= list.length) return;
    index = i; render();
    $('question-card').focus({ preventScroll: true });
    $('question-card').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function rebuild(keepCurrent = false) {
    const old = keepCurrent ? state.current : null;
    list = core.filterQuestions(bank, state.filters, state.records);
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
  function render(fresh = false) {
    const q = current();
    $('question-card').hidden = !q; $('empty-state').hidden = Boolean(q); $('question-map').hidden = !q;
    if (!q) {
      const scope = state.filters.scope;
      $('empty-title').textContent = !bank.length ? '题库正在等你。' : scope === 'wrong' ? '当前筛选下没有待复习错题' : scope === 'bookmarked' ? '当前筛选下还没有收藏题目' : scope === 'unanswered' ? '当前筛选下的题目都练过了' : '没有匹配的题目';
      $('empty-copy').textContent = !bank.length ? '功能已经准备好。加入你的题目后，便可以按学科、章节练习，查看解析并整理错题。' : scope === 'bookmarked' ? '练习时点击「☆ 收藏」，就可以把题目留在这里。也可以重置筛选。' : '试试其他学科、章节或关键词，或点击下方查看全部题目。';
      $('empty-reset').hidden = !bank.length;
      $('empty-home').hidden = Boolean(bank.length);
      refreshStats(); save(); return;
    }
    const r = record(q); state.current = q.id;
    locked = !fresh && r.attempts > 0 && typeof r.correct === 'boolean'; exposed = false;
    $('question-tags').replaceChildren();
    [q.subject, q.chapter, q.difficulty, typeNames[q.type]].forEach(tag => { const el = document.createElement('span'); el.textContent = tag; $('question-tags').append(el); });
    $('question-source').textContent = `${q.source || '来源待标注'} / ${q.id}`;
    $('question-title').textContent = `${index+1}. ${q.title}`;
    $('question-prompt').textContent = q.prompt;
    $('bookmark').setAttribute('aria-pressed',String(Boolean(r.bookmarked))); $('bookmark').textContent = r.bookmarked ? '★ 已收藏' : '☆ 收藏';
    ['feedback','reference-answer','explanation','self-grade'].forEach(id => $(id).hidden = true);
    $('show-answer').textContent = '查看答案'; $('show-explanation').textContent = '查看解析 ↗';
    $('submit-answer').textContent = q.type === 'written' ? '对照答案与解析' : '提交答案'; $('submit-answer').disabled = locked;
    $('retry').hidden = !locked;
    $('question-note').value = r.note || '';
    document.querySelector('.note-details').open = Boolean(r.note);
    $('position').textContent = `${index+1} / ${list.length}`;
    $('previous').disabled = index === 0; $('next').disabled = index === list.length-1;
    $('answer-text').textContent = q.answerText;
    $('explanation-steps').replaceChildren();
    q.explanation.forEach(step => { const li = document.createElement('li'); li.textContent = step; $('explanation-steps').append(li); });
    $('hint').textContent = `解题提醒：${q.hint}`;
    makeAnswerInputs(q,r,fresh);
    if (locked) setFeedback(`上次${q.type === 'written' ? '自评' : '作答'}：${r.correct ? '正确 ✓' : '还需复习 ×'} · 累计 ${r.attempts} 次${r.wrongCount ? `，错误 ${r.wrongCount} 次` : ''}。可查看解析或重新作答。`, r.correct ? 'correct' : 'wrong');
    refreshStats(); save();
  }
  function getAnswer() {
    const q = current();
    if (q.type === 'choice') { const selected = document.querySelector('input[name="answer"]:checked'); return selected ? Number(selected.value) : null; }
    return $('response').value.trim();
  }
  function showReference(withExplanation) {
    const q = current(); if (!q) return;
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
  $('answer-form').addEventListener('submit', event => {
    event.preventDefault(); const q = current(); if (!q || locked || (exposed && q.type !== 'written')) return;
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
    const q = current(); if (!q) return;
    const r = record(q); state.records[q.id] = { ...r, bookmarked: !r.bookmarked };
    $('bookmark').setAttribute('aria-pressed', String(!r.bookmarked)); $('bookmark').textContent = r.bookmarked ? '☆ 收藏' : '★ 已收藏'; refreshStats(); save();
  });
  $('answer-inputs').addEventListener('input', () => {
    const q = current(); if (!q || locked) return;
    const r = record(q), answer = getAnswer(); state.records[q.id] = { ...r, draft: answer === null ? '' : String(answer) }; save();
  });
  $('question-note').addEventListener('input', () => { const q = current(); if (!q) return; state.records[q.id] = { ...record(q), note: $('question-note').value }; save(); });
  $('previous').addEventListener('click', () => navigate(index-1)); $('next').addEventListener('click', () => navigate(index+1));
  for (const id of ['subject','chapter','difficulty','type','order']) $(id).addEventListener('change', () => { state.filters[id] = $(id).value; if (id === 'subject') { state.filters.chapter = 'all'; updateChapters(); } rebuild(); });
  $('search').addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.filters.search = $('search').value; rebuild(); }, 200); });
  document.querySelectorAll('[data-scope]').forEach(b => b.addEventListener('click', () => { state.filters.scope = b.dataset.scope; rebuild(); }));
  function resetFilters() { clearTimeout(searchTimer); state.filters = { ...defaults }; ['subject','difficulty','type','order','search'].forEach(id => $(id).value = state.filters[id]); updateChapters(); rebuild(); }
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
      if (!confirm('导入会替换当前浏览器的练习记录和笔记。建议先导出备份。确定继续吗？')) return;
      state = imported; preserveUnreadable = false; state.filters = { ...defaults }; resetFilters();
      if (!storageFailed) storageMessage('记录导入成功。作答、错题、收藏和笔记已恢复。');
    } catch (e) { storageMessage(`导入失败：${e instanceof SyntaxError ? 'JSON 格式无效。' : e.message} 当前记录未改变。`,true); }
  });
  rebuild(true);
})();
