/* Listings for papers already split into questions. Not the whole-paper PDF bank. */
(function (root) {
  'use strict';
  const LEGACY_KEY = 'japan-study-journal:question-demo:v1';
  const RECORD_KEY = 'japan-study-journal:question-practice:v1';
  const idPattern = /^[a-z0-9][a-z0-9-]{0,120}$/;
  const subjectRules = [
    ['电磁学', /電磁|电磁/], ['电路与模拟电子', /電気回路|電気・電子回路|電気電子回路|電子回路|回路理論|电气回路|电子回路/],
    ['微积分', /微分[・･]?積分|微積分|微分・積分/], ['线性代数', /線形代数/], ['微分方程', /微分方程式/],
    ['概率与统计', /確率|統計(?!力学)/], ['信号与系统', /信号|信號/], ['数字电子', /論理回路|ディジタル回路|デジタル回路/],
    ['控制工程', /制御/], ['信息论与通信', /情報理論|通信/], ['算法与数据结构', /アルゴリズム|データ構造/],
    ['计算机与编程', /コンピュータ|計算機|プログラミング/], ['离散数学', /離散数学|グラフ理論/],
    ['材料力学', /材料力学|材料の力学/], ['机械力学', /機械力学|振動工学/], ['流体力学', /流体力学|流動/],
    ['热力学与统计力学', /熱力学|熱工学|熱・統計力学|統計力学|伝熱/], ['量子力学', /量子/],
    ['光学', /光学|光波動/], ['固体与半导体物理', /物性|固体|半導体|電子デバイス/],
    ['电力工程', /電力|電気エネルギー/], ['核工程', /原子|放射/], ['化学', /化学|化[1-5]/],
    ['生物学', /生物|生態|細胞|神経|生[1-3]/], ['地球科学', /地球|地[1-2]/],
    ['英语', /英語/], ['材料科学', /材料科学|材料工学|機械材料学/],
    ['土木与环境', /地盤|水工学|構造・材料|環境工学|社会基盤|維持管理/], ['建筑学', /建築|設計製図|即日設計/],
    ['经营与经济', /経営|経済|会計|マーケティング/], ['优化与运筹', /最適化|最適|数理計画|オペレーションズリサーチ/]
  ];
  function subjectsOf(labels) {
    const text = labels.filter(Boolean).join(' / ').normalize('NFKC');
    const known = subjectRules.filter(([, re]) => re.test(text)).map(([name]) => name);
    if (/数学|数[1-3]|解析|代数|幾何/.test(text) && !known.some(name => ['微积分', '线性代数', '微分方程', '概率与统计', '离散数学'].includes(name))) known.push('数学（综合）');
    if (/物理|力学|物[1-3]/.test(text) && !known.some(name => /力学|光学|电磁学|物理/.test(name))) known.push('物理（综合）');
    return known.length ? [...new Set(known)] : ['科目待细分'];
  }
  function yearPhrase(source) {
    if (!source || source.year == null) return '';
    if (source.yearBasis === 'academic') return source.year + ' 入学年度';
    if (source.yearBasis === 'exam') return source.year + ' 年实施';
    return String(source.year);
  }
  function drillSubjects(paper) {
    const source = paper.source || {};
    const labels = [source.subject, ...(source.subjects || []), source.originalSubject, ...(paper.questions || []).flatMap(q => [q.title, ...(Array.isArray(q.topics) ? q.topics : [])])];
    const matched = subjectsOf(labels).filter(name => name !== '科目待细分');
    return [...new Set([source.subject, ...(source.subjects || []), ...matched].filter(Boolean))];
  }
  function listingFromPaper(entry, paper) {
    if (!entry || typeof entry.id !== 'string' || !idPattern.test(entry.id)) throw new Error('无效的试卷编号');
    if (entry.data !== `assets/question-bank/${entry.id}/paper.json`) throw new Error('试卷路径不正确');
    if (!paper || ![1,2].includes(paper.schemaVersion) || paper.id !== entry.id) throw new Error('试卷数据不完整');
    const source = paper.source || {};
    if (source.kind !== 'exam') throw new Error('目前只接入历年真题');
    if (source.catalogId !== entry.catalogId) throw new Error('目录编号不一致');
    if (typeof source.school !== 'string' || typeof source.graduate !== 'string' || typeof source.major !== 'string') throw new Error('出处不完整');
    if (!Number.isInteger(source.year) || typeof source.subject !== 'string' || !source.subject) throw new Error('年份或科目不完整');
    if (!Array.isArray(paper.questions) || !paper.questions.length || paper.questions.length !== entry.questionCount) throw new Error('题数不一致');
    const seen = new Set();
    const questions = paper.questions.map(q => {
      if (!q || !idPattern.test(q.id) || seen.has(q.id) || q.review?.status !== 'verified') throw new Error('题目尚未完成校对');
      seen.add(q.id);
      return { id: q.id, number: String(q.number || ''), title: String(q.title || '') };
    });
    return {
      id: entry.id,
      type: 'questionSet',
      subject: source.subject,
      subjects: drillSubjects(paper),
      chapter: '逐题练习',
      difficulty: '未标注',
      title: entry.title || paper.title,
      prompt: `本卷已拆成 ${questions.length} 道大题。进入逐题练习后按原题裁图作答；同目录的整卷 PDF 仍可在整卷练习中打开。`,
      answerText: '',
      explanation: [],
      hint: '完成标记只记录是否练习过，不表示答对，也不会计入整卷完成。',
      provenance: { kind: 'exam', school: source.school, graduate: source.graduate, major: source.major, year: yearPhrase(source), label: source.originalSubject || source.subject },
      paper: { catalogId: source.catalogId, schoolId: source.schoolId, year: source.year, yearBasis: source.yearBasis || '' },
      questions,
      searchTerms: [source.originalSubject, source.subject, source.school, source.graduate, source.major, ...questions.flatMap(q => [q.number, q.title])].filter(Boolean).join(' ')
    };
  }
  async function loadListings(fetchImpl) {
    const response = await fetchImpl('question-bank-index.json');
    if (!response.ok) throw new Error('题库索引无法读取');
    const index = await response.json();
    if (!index || index.schemaVersion !== 1 || !Array.isArray(index.papers)) throw new Error('题库索引无法读取');
    const results = await Promise.all(index.papers.map(async entry => {
      try {
        if (!entry || entry.data !== `assets/question-bank/${entry.id}/paper.json`) throw new Error('试卷路径不正确');
        const paperResponse = await fetchImpl(entry.data);
        if (!paperResponse.ok) throw new Error('试卷无法读取');
        return listingFromPaper(entry, await paperResponse.json());
      } catch { return null; }
    }));
    return { listings: results.filter(Boolean), failed: results.filter(item => !item).length };
  }
  function sourceForQuestion(paper, question) {
    if (paper.schemaVersion !== 2) return paper.source;
    const file = paper.source.files?.find(file => file.id === question.sourceFileId);
    if (!file) throw new Error('题目原卷文件缺失');
    return file;
  }
  function commonPartsForQuestion(paper, question) {
    return paper.schemaVersion === 2 ? paper.commonParts.filter(part => part.fileId === question.sourceFileId) : paper.commonParts;
  }
  function resolveEntry(catalog, requested) {
    const direct = catalog.papers.find(p => p.id === requested);
    if (direct) return { entry: direct };
    const alias = (catalog.aliases || []).find(a => a.id === requested);
    return alias ? { entry: catalog.papers.find(p => p.id === alias.paperId), questionId: alias.questionId } : {};
  }
  function practiceURL(paperId, questionId) {
    const params = new URLSearchParams({ paper: paperId });
    if (questionId) params.set('q', questionId);
    return 'question-practice.html?' + params.toString();
  }
  function parseQuestionStore(raw) {
    if (raw == null || raw === '') return { missing: true, records: {} };
    let stored;
    try { stored = JSON.parse(raw); } catch { return { broken: true, records: {} }; }
    if (!stored || stored.version !== 1 || !stored.records || typeof stored.records !== 'object' || Array.isArray(stored.records)) return { broken: true, records: {} };
    const records = {};
    for (const [id, value] of Object.entries(stored.records)) {
      if (!idPattern.test(id) || !value || typeof value !== 'object' || Array.isArray(value)) continue;
      records[id] = { completed: value.completed === true, bookmarked: value.bookmarked === true, note: typeof value.note === 'string' ? value.note.slice(0, 6000) : '', updatedAt: Number.isFinite(value.updatedAt) ? value.updatedAt : 0 };
    }
    return { records };
  }
  function loadQuestionRecords(storage) {
    const formal = parseQuestionStore(storage.getItem(RECORD_KEY));
    const legacy = parseQuestionStore(storage.getItem(LEGACY_KEY));
    if (formal.broken && (legacy.broken || legacy.missing)) return { records: {}, writable: false, keepFormal: true, keepLegacy: true };
    if (formal.missing && legacy.broken) return { records: {}, writable: false, keepFormal: true, keepLegacy: true };
    if (formal.broken) return { records: { ...legacy.records }, writable: true, keepFormal: true, keepLegacy: false };
    const records = { ...(legacy.broken ? {} : legacy.records), ...formal.records };
    return { records, writable: true, keepFormal: false, keepLegacy: legacy.broken };
  }
  function saveQuestionRecords(storage, records, flags) {
    if (!flags || flags.writable === false) return;
    const payload = JSON.stringify({ version: 1, records });
    if (!flags.keepFormal) storage.setItem(RECORD_KEY, payload);
    if (!flags.keepLegacy) storage.setItem(LEGACY_KEY, payload);
  }
  // Neighbors share school, graduate school, major, year basis, and exam track.
  // A subject suffix (kairo, denjiki, …) is kept when that year has it; otherwise the earliest indexed paper of the year is used.
  function examTrack(id) {
    const value = String(id || '');
    if (/(?:^|-)intl(?:-|$)/.test(value)) return 'intl';
    if (/(?:^|-)general(?:-|$)/.test(value)) return 'general';
    return 'standard';
  }
  function subjectSlot(id) {
    const stripped = String(id || '').replace(/-(?:intl|general)(?=-|$)/g, '');
    const match = stripped.match(/-(\d{4})(?:-(.+))?$/);
    return match ? match[2] || '' : '';
  }
  function paperNeighborRow(paper, order) {
    const source = paper && paper.source || {};
    const first = Array.isArray(paper && paper.questions) ? paper.questions[0] : null;
    return {
      id: paper && paper.id || '',
      schoolId: source.schoolId || '',
      graduate: source.graduate || '',
      major: source.major || '',
      year: source.year,
      yearBasis: source.yearBasis || '',
      firstQuestionId: first && typeof first.id === 'string' ? first.id : '',
      order: Number.isInteger(order) ? order : 0
    };
  }
  function adjacentPaperTargets(rows, currentId) {
    const list = Array.isArray(rows) ? rows : [];
    const current = list.find(row => row && row.id === currentId);
    if (!current || !Number.isInteger(current.year)) return { previous: null, next: null };
    const series = row => [row.schoolId, row.graduate, row.major, row.yearBasis || '', examTrack(row.id)].join('\0');
    const key = series(current);
    const peers = list.filter(row => row && Number.isInteger(row.year) && series(row) === key);
    const years = [...new Set(peers.map(row => row.year))].sort((a, b) => a - b);
    const pick = year => {
      if (!Number.isInteger(year)) return null;
      const choices = peers.filter(row => row.year === year);
      const slot = subjectSlot(current.id);
      const matched = choices.filter(row => subjectSlot(row.id) === slot);
      return (matched.length ? matched : choices).slice().sort((a, b) => (a.order - b.order) || String(a.id).localeCompare(String(b.id)))[0] || null;
    };
    return {
      previous: pick(years.filter(year => year < current.year).pop()),
      next: pick(years.find(year => year > current.year))
    };
  }
  const api = { sourceForQuestion, commonPartsForQuestion, resolveEntry, LEGACY_KEY, RECORD_KEY, subjectsOf, yearPhrase, drillSubjects, listingFromPaper, loadListings, practiceURL, loadQuestionRecords, saveQuestionRecords, paperNeighborRow, adjacentPaperTargets };
  root.QuestionBank = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
