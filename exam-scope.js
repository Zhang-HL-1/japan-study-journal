(function () {
  'use strict';
  const core = window.ExamScopeCore;
  const data = window.EXAM_SCOPE_DATA;
  const get = id => document.getElementById(id);
  if (!core || !data || !Array.isArray(data.universities) || !Array.isArray(data.records)) {
    get('data-status').textContent = '资料暂时无法加载，请刷新页面。';
    return;
  }
  const universities = data.universities;
  const seen = new Set();
  const records = data.records.filter(record => {
    if (!core.validRecord(record, universities) || seen.has(record.id)) return false;
    seen.add(record.id); return true;
  });
  if (records.length !== data.records.length) {
    get('scope-data-error').textContent = '部分资料暂时无法显示，请以学校官方募集要项为准。';
    get('scope-data-error').hidden = false;
  }
  const state = { universityId: 'all', admissionType: 'general', graduateSchool: 'all', department: 'all', entryYear: 'all', query: '' };
  let selectedId = null;
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function option(value, label) { const node = element('option', label); node.value = value; return node; }
  for (const university of universities) {
    get('scope-school').append(option(university.id, university.name));
    const button = element('button', university.name);
    button.type = 'button'; button.dataset.university = university.id; button.setAttribute('aria-pressed', 'false');
    get('school-buttons').append(button);
  }
  get('catalog-total').replaceChildren(document.createTextNode('已收录 '), element('strong', String(records.length)), document.createTextNode(' 条资料'));
  if (records.length) {
    get('data-status').replaceChildren(element('span', '', 'status-dot'), element('p', '按适用年度与学校官方选拔名称查阅。每条资料附核验日期和官方出处。'));
  }
  function options(id, values, current, empty) {
    const select = get(id);
    select.replaceChildren(option('all', values.length ? '全部' : empty), ...values.map(value => option(value, value)));
    select.disabled = !values.length;
    select.value = values.includes(current) ? current : 'all';
    return select.value;
  }
  function updateOptions() {
    const base = records.filter(record => record.admissionType === state.admissionType && (state.universityId === 'all' || record.universityId === state.universityId));
    const unique = values => [...new Set(values)].sort((a,b) => a.localeCompare(b, 'ja'));
    state.graduateSchool = options('scope-graduate', unique(base.map(record => record.graduateSchool)), state.graduateSchool, '尚无研究科资料');
    const departments = base.filter(record => state.graduateSchool === 'all' || record.graduateSchool === state.graduateSchool);
    state.department = options('scope-department', unique(departments.map(record => record.department)), state.department, '尚无专攻资料');
    state.entryYear = options('scope-year', unique(departments.filter(record => state.department === 'all' || record.department === state.department).map(record => record.entryYear)), state.entryYear, '尚无年度资料');
  }
  function showDetail(record, focus) {
    selectedId = record.id;
    const detail = get('scope-detail');
    const university = universities.find(u => u.id === record.universityId);
    detail.replaceChildren(element('p', university.name + ' · ' + record.graduateSchool, 'scope-kicker'), element('h3', record.department + (record.course ? ' · ' + record.course : '')),
      element('p', record.selectionName + ' / ' + record.entryYear), element('p', '资料核验日期：' + record.verifiedAt, 'scope-kicker'));
    for (const [key, title] of [['subjectsOriginal','考试科目 · 官方原文'],['scopeOriginal','考试范围 · 官方原文'],['conditionsOriginal','选答及其他条件 · 官方原文']]) {
      if (typeof record[key] === 'string' && record[key].trim()) {
        const copy = element('p', record[key], 'original-text'); copy.lang = record.originalLanguage || 'ja';
        detail.append(element('h4', title), copy);
      }
    }
    if (!record.subjectsOriginal && !record.scopeOriginal) detail.append(element('p', '考试科目、范围与选答条件请阅读下面的官方对应页。'));
    for (const source of record.sources) {
      const section = element('section', undefined, 'scope-source');
      const url = core.sourceURL(source);
      const link = element('a', source.label + ' ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      section.append(link);
      if (source.kind === 'pdf') {
        section.append(element('small', (source.pdfPage ? 'PDF 第 ' + source.pdfPage + ' 页。' : '') + '手机或内嵌阅读不可用时，可点击上方链接打开官方文件。'));
        const button = element('button', '在本页阅读官方 PDF', 'scope-secondary'); button.type = 'button';
        button.addEventListener('click', () => {
          const frame = element('iframe'); frame.title = source.label + (source.pdfPage ? '：PDF 第 ' + source.pdfPage + ' 页' : ''); frame.src = url; frame.referrerPolicy = 'no-referrer';
          section.append(frame); button.remove();
        }, { once: true });
        section.append(button);
      }
      detail.append(section);
    }
    detail.hidden = false;
    get('scope-results').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.id === selectedId)));
    if (focus) { detail.focus({ preventScroll: true }); detail.scrollIntoView({ behavior: 'auto', block: 'start' }); }
  }
  function render() {
    updateOptions();
    get('scope-school').value = state.universityId;
    document.querySelectorAll('[data-university]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.university === state.universityId)));
    document.querySelectorAll('[data-admission]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.admission === state.admissionType)));
    const school = universities.find(u => u.id === state.universityId)?.name || '全部学校';
    const admission = state.admissionType === 'general' ? '一般入试' : '留学生入试';
    get('result-context').textContent = school + ' · ' + admission;
    const matches = core.filter(records, universities, state);
    get('scope-result-count').textContent = matches.length + ' 条资料';
    const list = get('scope-results'); list.replaceChildren(); list.hidden = !matches.length;
    get('scope-empty').hidden = !!matches.length;
    get('scope-empty-reset').hidden = !records.length;
    get('scope-empty-title').textContent = records.length ? '暂时没有匹配的资料。' : (state.universityId === 'all' ? '从这里开始，读懂考试。' : school + '的资料待添加。');
    get('scope-empty-copy').textContent = records.length ? '试试其他学校、入试类型或关键词，也可以清除筛选查看资料。' : (state.universityId === 'all' ? admission + '资料尚未添加。之后可以在这里按学校、研究科、专攻及入试类型查阅考试科目与范围。' : school + '的' + admission + '科目与范围尚未收录，添加后会在这里显示官方原文和出处。');
    for (const record of matches) {
      const button = element('button', undefined, 'scope-result'); button.type = 'button'; button.dataset.id = record.id;
      button.setAttribute('aria-pressed', String(record.id === selectedId));
      button.append(element('span', universities.find(u => u.id === record.universityId).name + ' · ' + record.graduateSchool), element('strong', record.department + (record.course ? ' · ' + record.course : '')), element('span', record.selectionName + ' / ' + record.entryYear));
      button.addEventListener('click', () => showDetail(record, true)); list.append(button);
    }
    const selected = matches.find(record => record.id === selectedId);
    if (selected) showDetail(selected, false);
    else { selectedId = null; get('scope-detail').replaceChildren(); get('scope-detail').hidden = true; }
  }
  function setSchool(id) { state.universityId = id; state.graduateSchool = 'all'; state.department = 'all'; state.entryYear = 'all'; render(); }
  document.querySelectorAll('[data-university]').forEach(button => button.addEventListener('click', () => setSchool(button.dataset.university)));
  document.querySelectorAll('[data-admission]').forEach(button => button.addEventListener('click', () => { state.admissionType = button.dataset.admission; state.graduateSchool = 'all'; state.department = 'all'; state.entryYear = 'all'; render(); }));
  get('scope-school').addEventListener('change', event => setSchool(event.target.value));
  get('scope-graduate').addEventListener('change', event => { state.graduateSchool = event.target.value; state.department = 'all'; state.entryYear = 'all'; render(); });
  get('scope-department').addEventListener('change', event => { state.department = event.target.value; state.entryYear = 'all'; render(); });
  get('scope-year').addEventListener('change', event => { state.entryYear = event.target.value; render(); });
  get('scope-query').addEventListener('input', event => { state.query = event.target.value; render(); });
  function reset() { Object.assign(state, { universityId: 'all', admissionType: 'general', graduateSchool: 'all', department: 'all', entryYear: 'all', query: '' }); get('scope-query').value = ''; render(); }
  get('scope-reset').addEventListener('click', reset); get('scope-empty-reset').addEventListener('click', reset);
  render();
})();
