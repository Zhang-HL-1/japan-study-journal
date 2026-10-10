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
  const state = { universityId: 'all', admissionType: 'general', graduateSchool: 'all', department: 'all', course: 'all', entryYear: 'all', query: '', subjectIds: [], subjectMode: 'all' };
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
  const addedSchools = universities.filter(university => records.some(record => record.universityId === university.id)).map(university => university.name);
  function publicationLabel(record, short = false) {
    if (record.publicationStatus === 'closed') return short ? '修士募集停止' : '修士課程募集停止 · 请阅读官方通知';
    if (record.publicationStatus === 'notice') return short ? '变更预告 · 完整要项待公布' : '已公布变更预告；完整募集要项待公布';
    if (record.publicationStatus === 'pending') return short ? '要项／案内待公布' : '募集要项／专攻案内待公布';
    return short ? '科目与范围待核验' : '专攻科目与范围待核验';
  }
  function options(id, values, current, empty) {
    const select = get(id);
    select.replaceChildren(option('all', values.length ? '全部' : empty), ...values.map(value => option(value, value)));
    select.disabled = !values.length;
    select.value = values.includes(current) ? current : 'all';
    return select.value;
  }
  function updateOptions() {
    const base = records.filter(record => core.matchesAdmission(record, state.admissionType) && (state.universityId === 'all' || record.universityId === state.universityId));
    const unique = values => [...new Set(values)].sort((a,b) => a.localeCompare(b, 'ja'));
    state.graduateSchool = options('scope-graduate', unique(base.map(record => record.graduateSchool)), state.graduateSchool, '尚无研究科资料');
    const departments = base.filter(record => state.graduateSchool === 'all' || record.graduateSchool === state.graduateSchool);
    state.department = options('scope-department', unique(departments.map(record => record.department)), state.department, '尚无专攻资料');
    const fields = departments.filter(record => state.department === 'all' || record.department === state.department);
    state.course = options('scope-field', unique(fields.map(record => record.course).filter(Boolean)), state.course, '尚无独立方向资料');
    state.entryYear = options('scope-year', unique(fields.filter(record => state.course === 'all' || record.course === state.course).map(record => record.entryYear)), state.entryYear, '尚无年度资料');
  }
  const availableSubjectIds = new Set(records.flatMap(record => core.subjects.classify(record).map(hit => hit.id)));
  const availableSubjects = core.subjects.categories.filter(category => availableSubjectIds.has(category.id));
  const subjectRows = [];
  const subjectGroups = [];
  for (const group of [...new Set(availableSubjects.map(category => category.group))]) {
    const section = element('section'); section.append(element('h5', group));
    get('scope-subject-options').append(section); subjectGroups.push(section);
    for (const category of availableSubjects.filter(category => category.group === group)) {
      const label = element('label', undefined, 'scope-subject-option');
      const input = element('input'); input.type = 'checkbox'; input.value = category.id;
      input.setAttribute('aria-label', category.label); input.dataset.subject = category.id;
      const copy = element('span', category.label); const count = element('small');
      label.append(input, copy, count); section.append(label);
      input.addEventListener('change', () => {
        state.subjectIds = input.checked ? [...new Set([...state.subjectIds, category.id])] : state.subjectIds.filter(id => id !== category.id);
        render();
      });
      subjectRows.push({category, input, label, count, section});
    }
  }
  function searchSubjects() {
    let visible = 0;
    for (const row of subjectRows) {
      row.label.hidden = !core.subjects.search(row.category, get('scope-subject-search').value);
      if (!row.label.hidden) visible++;
    }
    for (const group of subjectGroups) group.hidden = !subjectRows.some(row => row.section === group && !row.label.hidden);
    get('scope-subject-search-empty').hidden = !!visible;
  }
  function updateSubjects() {
    const base = core.filter(records, universities, {...state, subjectIds: []});
    for (const row of subjectRows) {
      const count = new Set(base.filter(record => core.subjects.matches(record, [row.category.id])).map(record => record.universityId)).size;
      row.input.checked = state.subjectIds.includes(row.category.id);
      // Keep zero-result choices available: a school/type change must not silently lose a selection.
      row.count.textContent = count + '校';
      row.count.title = '按学校、入试类型等其他筛选统计；未叠加已选科目';
    }
    get('scope-subject-summary').textContent = state.subjectIds.length ? '已选 ' + state.subjectIds.length + ' 个科目 · 点击修改' : '选择考试科目';
    get('scope-subject-mode').value = state.subjectMode;
    get('scope-subject-clear').disabled = !state.subjectIds.length;
    get('scope-subject-selected').replaceChildren();
    for (const id of state.subjectIds) {
      const category = core.subjects.categories.find(category => category.id === id);
      const button = element('button', category.label + ' ×'); button.type = 'button';
      button.setAttribute('aria-label', '取消选择' + category.label);
      button.addEventListener('click', () => { state.subjectIds = state.subjectIds.filter(value => value !== id); render(); get('scope-subject-summary').focus(); });
      get('scope-subject-selected').append(button);
    }
  }
  function showDetail(record, focus) {
    selectedId = record.id;
    const detail = get('scope-detail');
    const university = universities.find(u => u.id === record.universityId);
    detail.replaceChildren(element('p', university.name + ' · ' + record.graduateSchool, 'scope-kicker'), element('h3', record.department + (record.course ? ' · ' + record.course : '')),
      element('p', record.selectionName + ' / ' + record.entryYear), element('p', '资料核对日期：' + record.verifiedAt, 'scope-kicker'));
    const subjectHits = core.subjects.classify(record);
    if (subjectHits.length) detail.append(element('p', '科目归类：' + subjectHits.map(hit => core.subjects.categories.find(category => category.id === hit.id).label + '（' + hit.term + '）').join('；'), 'scope-subject-evidence'));
    if (record.publicationStatus) detail.append(element('p', publicationLabel(record), 'scope-record-status'));
    if (record.internationalGeneral && state.admissionType === 'international') detail.append(element('p', '一般选拔入口：学校出愿资格包括符合条件的海外学历申请者。请先阅读官方资格与在留身份条件。', 'scope-route-note'));
    if (record.editorialNote) detail.append(element('p', record.editorialNote, 'scope-route-note'));
    for (const [key, title] of [['subjectsOriginal','考试科目 · 官方原文'],['scopeOriginal','考试范围 · 官方原文'],['conditionsOriginal','选答及其他条件 · 官方原文']]) {
      if (typeof record[key] === 'string' && record[key].trim()) {
        const copy = element('p', record[key], 'original-text'); copy.lang = record.originalLanguage || 'ja';
        detail.append(element('h4', title), copy);
      }
    }
    if (!record.subjectsOriginal && !record.scopeOriginal) detail.append(element('p', record.publicationStatus === 'closed' ? '此条为修士招生停止通知。' : '考试科目、范围与选答条件请阅读下面的官方对应页。'));
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
    updateSubjects();
    const guides = data.catalog?.[state.universityId]?.directionGuides || [];
    get('scope-directions').hidden = !guides.length;
    get('scope-direction-buttons').replaceChildren();
    get('scope-direction-note').textContent = guides.find(guide => guide.query === state.query)?.note || '';
    for (const guide of guides) {
      const button = element('button', guide.label); button.type = 'button';
      button.setAttribute('aria-pressed', String(guide.query === state.query));
      button.addEventListener('click', () => {
        Object.assign(state, {graduateSchool:'理工学研究科', department:'all', course:'all', entryYear:'all', query:guide.query});
        get('scope-query').value = guide.query; render();
      });
      get('scope-direction-buttons').append(button);
    }
    const statusNote = data.catalog?.[state.universityId]?.note || data.catalog?.note || '按适用年度与学校官方选拔名称查阅。每条资料附核验日期和官方出处。';
    const statusDot = element('span', '', 'status-dot'); statusDot.setAttribute('aria-hidden', 'true');
    get('data-status').replaceChildren(statusDot, element('p', statusNote));
    get('scope-school').value = state.universityId;
    document.querySelectorAll('[data-university]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.university === state.universityId)));
    document.querySelectorAll('[data-admission]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.admission === state.admissionType)));
    const school = universities.find(u => u.id === state.universityId)?.name || '全部学校';
    const admission = state.admissionType === 'general' ? '一般入试' : '留学生入试';
    get('result-context').textContent = school + ' · ' + admission;
    const matches = core.filter(records, universities, state);
    const matchingSchools = universities.filter(university => matches.some(record => record.universityId === university.id));
    get('scope-result-count').textContent = (state.subjectIds.length ? matchingSchools.length + ' 所学校 · ' : '') + matches.length + ' 条资料';
    get('scope-subject-schools').hidden = !state.subjectIds.length;
    get('scope-subject-schools').textContent = matchingSchools.length ? '匹配学校：' + matchingSchools.map(university => university.name).join('、') : '当前条件下没有匹配学校。';
    const list = get('scope-results'); list.replaceChildren(); list.hidden = !matches.length;
    get('scope-empty').hidden = !!matches.length;
    get('scope-empty-reset').hidden = !records.length;
    const schoolPending = state.universityId !== 'all' && !records.some(record => record.universityId === state.universityId);
    get('scope-empty-title').textContent = schoolPending ? school + '的资料待添加。' : '暂时没有匹配的资料。';
    get('scope-empty-copy').textContent = schoolPending ? '目前已添加' + addedSchools.join('、') + '。其他学校之后逐校核验并添加。' : '试试其他考试科目、研究科、专攻、入试类型或关键词，也可以清除筛选查看资料。';
    for (const record of matches) {
      const button = element('button', undefined, 'scope-result'); button.type = 'button'; button.dataset.id = record.id;
      button.setAttribute('aria-pressed', String(record.id === selectedId));
      button.append(element('span', universities.find(u => u.id === record.universityId).name + ' · ' + record.graduateSchool), element('strong', record.department + (record.course ? ' · ' + record.course : '')), element('span', record.selectionName + ' / ' + record.entryYear));
      if (record.publicationStatus) button.append(element('span', publicationLabel(record, true), 'scope-record-status'));
      else if (record.internationalGeneral && state.admissionType === 'international') button.append(element('span', '一般选拔 · 含海外学历出愿资格', 'scope-route-note'));
      button.addEventListener('click', () => showDetail(record, true)); list.append(button);
    }
    const selected = matches.find(record => record.id === selectedId);
    if (selected) showDetail(selected, false);
    else { selectedId = null; get('scope-detail').replaceChildren(); get('scope-detail').hidden = true; }
  }
  function setSchool(id) { state.universityId = id; state.graduateSchool = 'all'; state.department = 'all'; state.course = 'all'; state.entryYear = 'all'; render(); }
  document.querySelectorAll('[data-university]').forEach(button => button.addEventListener('click', () => setSchool(button.dataset.university)));
  document.querySelectorAll('[data-admission]').forEach(button => button.addEventListener('click', () => { state.admissionType = button.dataset.admission; state.graduateSchool = 'all'; state.department = 'all'; state.course = 'all'; state.entryYear = 'all'; render(); }));
  get('scope-school').addEventListener('change', event => setSchool(event.target.value));
  get('scope-graduate').addEventListener('change', event => { state.graduateSchool = event.target.value; state.department = 'all'; state.course = 'all'; state.entryYear = 'all'; render(); });
  get('scope-department').addEventListener('change', event => { state.department = event.target.value; state.course = 'all'; state.entryYear = 'all'; render(); });
  get('scope-field').addEventListener('change', event => { state.course = event.target.value; state.entryYear = 'all'; render(); });
  get('scope-year').addEventListener('change', event => { state.entryYear = event.target.value; render(); });
  get('scope-query').addEventListener('input', event => { state.query = event.target.value; render(); });
  get('scope-subject-mode').addEventListener('change', event => { state.subjectMode = event.target.value; render(); });
  get('scope-subject-clear').addEventListener('click', () => { state.subjectIds = []; render(); });
  get('scope-subject-search').addEventListener('input', searchSubjects);
  function reset() { Object.assign(state, { universityId: 'all', admissionType: 'general', graduateSchool: 'all', department: 'all', course: 'all', entryYear: 'all', query: '', subjectIds: [], subjectMode: 'all' }); get('scope-query').value = ''; get('scope-subject-search').value = ''; searchSubjects(); render(); }
  get('scope-reset').addEventListener('click', reset); get('scope-empty-reset').addEventListener('click', reset);
  render();
})();
