(function () {
  'use strict';
  const T = window.StudyTargets;
  const $ = id => document.getElementById(id);
  const schools = ((window.SCHOOL_HUB_DATA && window.SCHOOL_HUB_DATA.schools) || []).map(s => ({ id: s.id, name: s.name }));
  const nameOf = id => (schools.find(s => s.id === id) || {}).name || id;
  let targets = [], topicIndex = null, records = {}, editing = '';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  function a(href, text, className) { const link = el('a', className, text); link.href = href; return link; }
  function status(text) { $('target-status').textContent = text; }

  function readRecords() {
    try { records = window.QuestionBank ? window.QuestionBank.loadQuestionRecords(localStorage).records || {} : {}; }
    catch { records = {}; }
  }

  function dateChip(label, date) {
    const chip = el('p', 'target-date');
    if (!date) { chip.classList.add('is-empty'); chip.append(el('span', 'target-date-label', label), el('span', '', '未填写')); return chip; }
    const days = T.daysUntil(date);
    if (days !== null && days < 0) chip.classList.add('is-past');
    else if (days !== null && days <= 30) chip.classList.add('is-soon');
    chip.append(el('span', 'target-date-label', label), el('strong', '', T.countdownText(days)), el('span', 'target-date-day', date.replace(/-/g, '/')));
    return chip;
  }

  function progressBlock(t) {
    const box = el('div', 'target-progress');
    if (!topicIndex) { box.append(el('p', 'target-muted', '正在统计练习进度……')); return box; }
    const p = T.schoolProgress(topicIndex, t.school, records);
    if (!p.total) {
      box.append(el('p', 'target-muted', '这所学校还没有拆好的逐题卷，可以先看整卷过去问。'));
      return box;
    }
    const line = el('p', 'target-progress-line');
    line.append(el('span', '', '逐题已练'), el('strong', '', `${p.done} / ${p.total}`));
    const meter = el('span', 'topic-meter');
    const fill = el('span'); fill.style.width = Math.round(p.done / p.total * 100) + '%'; meter.append(fill);
    box.append(line, meter);
    if (p.gaps.length) {
      const gaps = el('div', 'target-gaps');
      gaps.append(el('span', 'target-gaps-label', '常考但还没练'));
      for (const g of p.gaps) gaps.append(a('topics.html?' + new URLSearchParams({ topic: g.id, school: t.school }), `${g.name} · ${g.total}`, 'target-gap'));
      box.append(gaps);
    } else box.append(el('p', 'target-muted', '这所学校考过的知识点你都练过了。'));
    return box;
  }

  function card(t) {
    const article = el('article', 'target-card');
    article.dataset.school = t.school;
    const head = el('header', 'target-card-head');
    const title = el('h3');
    title.append(a('schools.html?' + new URLSearchParams({ school: t.school }), nameOf(t.school)));
    if (t.note) head.append(title, el('p', 'target-note', t.note)); else head.append(title);
    const dates = el('div', 'target-dates');
    dates.append(dateChip('出願截止', t.deadline), dateChip('考试', t.exam));
    const links = el('nav', 'target-links');
    links.setAttribute('aria-label', nameOf(t.school) + ' 的资料');
    const hasQuestions = !topicIndex || T.schoolProgress(topicIndex, t.school, {}).total > 0;
    if (hasQuestions) links.append(a('topics.html?' + new URLSearchParams({ school: t.school }), '按知识点练 →'));
    links.append(
      a('past-papers.html?' + new URLSearchParams({ school: t.school }), '过去问'),
      a('exam-scope.html?' + new URLSearchParams({ school: t.school }), '考试范围与要项'),
    );
    const actions = el('div', 'target-actions');
    const edit = el('button', 'plain-button', '修改'); edit.type = 'button';
    edit.addEventListener('click', () => startEdit(t));
    const drop = el('button', 'plain-button', '移除'); drop.type = 'button';
    drop.addEventListener('click', () => {
      targets = T.remove(targets, t.school);
      persist(`已移除 ${nameOf(t.school)}。`);
    });
    actions.append(edit, drop);
    article.append(head, dates, progressBlock(t), links, actions);
    return article;
  }

  function render() {
    const list = $('target-list');
    list.replaceChildren(...targets.map(card));
    $('target-empty').hidden = targets.length > 0;
    const full = targets.length >= T.MAX && !editing;
    $('target-form').hidden = full;
    $('target-full').hidden = !full;
    const select = $('target-school');
    const taken = new Set(targets.map(t => t.school));
    const keep = select.value;
    select.replaceChildren(new Option('选择学校', ''), ...schools.filter(s => !taken.has(s.id) || s.id === editing).map(s => new Option(s.name, s.id)));
    select.value = editing || (taken.has(keep) ? '' : keep);
    select.disabled = Boolean(editing);
    $('target-submit').textContent = editing ? '保存修改' : '加入目标';
    $('target-cancel').hidden = !editing;
    $('target-count').textContent = `${targets.length} / ${T.MAX}`;
  }

  function persist(message) {
    const ok = T.save(targets, localStorage);
    status(ok ? message : '浏览器记录无法保存，本次修改只在当前页面有效。');
    render();
  }

  function startEdit(t) {
    editing = t.school;
    $('target-deadline').value = t.deadline; $('target-exam').value = t.exam; $('target-note').value = t.note;
    render();
    $('target-deadline').focus();
  }

  function resetForm() {
    editing = '';
    $('target-form').reset();
    render();
  }

  function submit(event) {
    event.preventDefault();
    const school = editing || $('target-school').value;
    if (!school) { status('请先选择学校。'); $('target-school').focus(); return; }
    const deadline = $('target-deadline').value, exam = $('target-exam').value;
    if ((deadline && !T.validDate(deadline)) || (exam && !T.validDate(exam))) { status('日期格式不对，请用日期选择器填写。'); return; }
    const wasEditing = Boolean(editing);
    targets = T.upsert(targets, { school, name: nameOf(school), deadline, exam, note: $('target-note').value, addedAt: Date.now() });
    editing = '';
    $('target-form').reset();
    persist(wasEditing ? `已更新 ${nameOf(school)}。` : `已把 ${nameOf(school)} 加入目标。`);
  }

  async function start() {
    if (!T || !$('target-panel')) return;
    targets = T.read(localStorage);
    readRecords();
    $('target-form').addEventListener('submit', submit);
    $('target-cancel').addEventListener('click', resetForm);
    render();
    try {
      const response = await fetch('data/topics/topic-index.json');
      if (!response.ok) throw new Error('index');
      topicIndex = await response.json();
    } catch { topicIndex = { questions: [], papers: {}, subjects: [] }; }
    render();
    addEventListener('pageshow', event => { if (event.persisted) { readRecords(); targets = T.read(localStorage); render(); } });
    addEventListener('storage', event => { if (event.key === T.KEY) { targets = T.read(localStorage); render(); } });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
