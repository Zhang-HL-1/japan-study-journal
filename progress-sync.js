(function (root) {
  'use strict';
  // Client-side merge for 留日手记. Progress JSON never contains a token.
  const SITE = 'japan-study-journal';
  const DESK_KEY = 'japan-study-journal:desk:v1';
  const PRACTICE_KEY = 'japan-study-journal:practice:v1';
  const SYNC_STORAGE_KEY = 'japan-study-journal.sync.github.v1';
  const DEVICE_STORAGE_KEY = 'japan-study-journal.device.v1';
  const BASELINE_FILENAME = 'japan-study-journal-progress.json';
  const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=Japan%20Study%20Journal';
  const GIST_DESCRIPTION = '留日手记进度';
  const PUSH_DELAY_MS = 1500;
  const POLL_MS = 30000;
  const FILTER_KEYS = ['subject', 'chapter', 'difficulty', 'type', 'scope', 'order', 'search', 'sourceKind', 'school', 'major', 'book', 'paperYear'];
  const BANNED_IDS = new Set(['__proto__', 'constructor', 'prototype']);
  const SECRET_KEYS = ['token', 'accessToken', 'authorization', 'pat'];

  function deskApi() {
    if (root.StudyDeskCore) return root.StudyDeskCore;
    if (typeof require === 'function') return require('./study-desk-core.js');
    throw new Error('书桌模块未加载。');
  }
  const emptyDesk = () => ({ version: 1, items: [] });
  const emptyPractice = () => ({ version: 1, records: {}, days: [], current: null, filters: {} });
  function count(value) {
    return Number.isSafeInteger(value) && value >= 0 ? Math.min(value, 1000000) : 0;
  }
  function text(value, max) {
    return typeof value === 'string' ? value.slice(0, max || 6000) : '';
  }
  function clock(value) {
    return Number.isSafeInteger(value) && value > 0 && value <= 8640000000000000 ? value : 0;
  }
  function time(value) {
    const parsed = Date.parse(value || '');
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function safeId(id) {
    return typeof id === 'string' && id.length > 0 && id.length <= 200 && !BANNED_IDS.has(id) && !/[\u0000-\u001f]/.test(id);
  }
  function answerOf(value) {
    if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value <= 100000) return value;
    if (typeof value === 'string' && value) return value.slice(0, 6000);
    return null;
  }
  function deviceFilename(id) {
    if (!/^[A-Za-z0-9-]{8,80}$/.test(id)) throw new Error('设备编号不正确。');
    return 'japan-device-' + id + '.json';
  }
  function isDeviceFilename(name) {
    return /^japan-device-[A-Za-z0-9-]{8,80}\.json$/.test(name);
  }
  function isOurGistFilename(name) {
    return name === BASELINE_FILENAME || isDeviceFilename(name);
  }
  function gistIdFromUrl(value) {
    let url;
    try { url = new URL(value); } catch { return null; }
    if (url.hostname !== 'gist.github.com') return null;
    const id = url.pathname.split('/').filter(Boolean).pop() || '';
    if (!/^[a-f0-9]{8,64}$/i.test(id)) throw new Error('链接里没有可用的 Gist ID。');
    return id;
  }
  function parseGistId(input) {
    const trimmed = String(input || '').trim();
    if (!trimmed) return null;
    const fromUrl = gistIdFromUrl(trimmed);
    if (fromUrl) return fromUrl;
    if (/^[a-f0-9]{8,64}$/i.test(trimmed)) return trimmed;
    throw new Error('Gist ID 无法识别。可以留空，或粘贴 gist.github.com 链接。');
  }
  function assertNoSecrets(value) {
    if (!value || typeof value !== 'object') return;
    for (const key of SECRET_KEYS) if (Object.prototype.hasOwnProperty.call(value, key)) throw new Error('进度文件包含令牌字段，已停止同步。');
  }
  function sanitizeRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const record = {
      attempts: count(value.attempts),
      correct: value.correct === true ? true : value.correct === false ? false : null,
      wrongCount: count(value.wrongCount),
      bookmarked: value.bookmarked === true,
      note: text(value.note),
      draft: text(value.draft),
      answer: answerOf(value.answer),
      updated: text(value.updated, 40)
    };
    const bookmarkAt = clock(value.bookmarkAt);
    const noteAt = clock(value.noteAt);
    if (bookmarkAt) record.bookmarkAt = bookmarkAt;
    if (noteAt) record.noteAt = noteAt;
    if (value.completed === true || value.completed === false) record.completed = value.completed === true;
    const meaningful = record.attempts || record.wrongCount || record.bookmarked || record.note || record.draft || record.answer !== null || record.updated || record.bookmarkAt || record.noteAt || record.completed === true || record.completed === false || record.correct === true || record.correct === false;
    return meaningful ? record : null;
  }
  function orderRecord(record) {
    const ordered = {
      attempts: record.attempts,
      correct: record.correct,
      wrongCount: record.wrongCount,
      bookmarked: record.bookmarked,
      note: record.note,
      draft: record.draft,
      answer: record.answer,
      updated: record.updated
    };
    if (record.completed === true || record.completed === false) ordered.completed = record.completed;
    if (record.bookmarkAt) ordered.bookmarkAt = record.bookmarkAt;
    if (record.noteAt) ordered.noteAt = record.noteAt;
    return ordered;
  }
  function sanitizeFilters(filters) {
    const result = {};
    const source = filters && typeof filters === 'object' && !Array.isArray(filters) ? filters : {};
    for (const key of FILTER_KEYS) if (typeof source[key] === 'string') result[key] = source[key].slice(0, key === 'major' ? 1000 : 200);
    return result;
  }
  function sanitizePractice(value) {
    const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    const records = Object.create(null);
    const rawRecords = source.records && typeof source.records === 'object' && !Array.isArray(source.records) ? source.records : {};
    for (const id of Object.keys(rawRecords).sort()) {
      if (!safeId(id)) continue;
      const record = sanitizeRecord(rawRecords[id]);
      if (record) records[id] = record;
    }
    if (Object.keys(records).length > 5000) throw new Error('练习记录过多，已停止同步。');
    return canonicalPractice({
      version: 1,
      records,
      days: Array.isArray(source.days) ? source.days : [],
      current: safeId(source.current) ? source.current : null,
      filters: sanitizeFilters(source.filters),
      filtersUpdatedAt: clock(source.filtersUpdatedAt),
      positionUpdatedAt: clock(source.positionUpdatedAt)
    });
  }
  function canonicalPractice(practice) {
    const records = {};
    for (const id of Object.keys(practice.records || {}).sort()) records[id] = orderRecord(practice.records[id]);
    const result = {
      version: 1,
      records,
      days: mergeDays({ days: practice.days || [] }, { days: [] }),
      current: safeId(practice.current) ? practice.current : null,
      filters: sanitizeFilters(practice.filters)
    };
    if (clock(practice.filtersUpdatedAt)) result.filtersUpdatedAt = clock(practice.filtersUpdatedAt);
    if (clock(practice.positionUpdatedAt)) result.positionUpdatedAt = clock(practice.positionUpdatedAt);
    return result;
  }
  function finalizeDesk(items) {
    const core = deskApi();
    const parsed = core.parse(JSON.stringify({ version: 1, items }));
    parsed.items.sort((a, b) => core.key(a).localeCompare(core.key(b)));
    return parsed;
  }
  function sanitizeDesk(value) {
    if (value == null) return emptyDesk();
    return finalizeDesk(value.items || []);
  }
  function hasGrade(record) {
    return record.attempts > 0 || record.wrongCount > 0 || record.correct === true || record.correct === false;
  }
  function paperLike(id, left, right) {
    if (typeof id === 'string' && id.startsWith('paper:')) return true;
    const marked = [left, right].some(record => record.completed === true || record.completed === false);
    return marked && !hasGrade(left) && !hasGrade(right);
  }
  function mergeText(left, right, field, clockOf) {
    const leftText = left[field] || '';
    const rightText = right[field] || '';
    const leftClock = clockOf(left);
    const rightClock = clockOf(right);
    if (leftClock !== rightClock) {
      const newerText = leftClock > rightClock ? leftText : rightText;
      const olderText = leftClock > rightClock ? rightText : leftText;
      if (newerText) return { value: newerText, clock: Math.max(leftClock, rightClock) };
      if (leftClock > 0 && rightClock > 0) return { value: '', clock: Math.max(leftClock, rightClock) };
      return { value: olderText, clock: 0 };
    }
    if (leftText === rightText) return { value: leftText, clock: leftClock };
    if (!leftText) return { value: rightText, clock: leftClock };
    if (!rightText) return { value: leftText, clock: leftClock };
    if (leftText.length !== rightText.length) return { value: leftText.length > rightText.length ? leftText : rightText, clock: leftClock };
    return { value: leftText > rightText ? leftText : rightText, clock: leftClock };
  }
  function mergeBookmark(left, right) {
    const leftClock = left.bookmarkAt || 0;
    const rightClock = right.bookmarkAt || 0;
    if (leftClock !== rightClock) {
      const winner = leftClock > rightClock ? left : right;
      return { value: winner.bookmarked === true, clock: Math.max(leftClock, rightClock) };
    }
    return { value: left.bookmarked === true || right.bookmarked === true, clock: leftClock };
  }
  function mergeCompleted(left, right) {
    const leftClock = time(left.updated);
    const rightClock = time(right.updated);
    if (leftClock !== rightClock) return (leftClock > rightClock ? left : right).completed === true;
    return left.completed === true || right.completed === true;
  }
  function laterUpdated(left, right) {
    const leftClock = time(left.updated);
    const rightClock = time(right.updated);
    if (leftClock !== rightClock) return leftClock > rightClock ? left.updated : right.updated;
    return (left.updated || '') >= (right.updated || '') ? (left.updated || '') : (right.updated || '');
  }
  function pickOutcome(left, right) {
    if (left.attempts !== right.attempts) return left.attempts > right.attempts ? left : right;
    const leftClock = time(left.updated);
    const rightClock = time(right.updated);
    if (leftClock !== rightClock) return leftClock > rightClock ? left : right;
    const leftKey = JSON.stringify([left.correct, left.answer]);
    const rightKey = JSON.stringify([right.correct, right.answer]);
    return leftKey >= rightKey ? left : right;
  }
  function otherOf(outcome, left, right) {
    return outcome === left ? right : left;
  }
  function mergeRecord(id, leftRaw, rightRaw) {
    const left = sanitizeRecord(leftRaw);
    const right = sanitizeRecord(rightRaw);
    if (!left) return right;
    if (!right) return left;
    const paper = paperLike(id, left, right);
    const outcome = paper ? null : pickOutcome(left, right);
    const note = mergeText(left, right, 'note', record => record.noteAt || 0);
    const draft = mergeText(left, right, 'draft', record => time(record.updated));
    const bookmark = mergeBookmark(left, right);
    const fallback = paper ? right : otherOf(outcome, left, right);
    const primary = paper ? left : outcome;
    const answer = primary.answer !== null && primary.answer !== '' ? primary.answer : fallback.answer;
    const record = {
      attempts: paper ? 0 : Math.max(left.attempts, right.attempts),
      correct: paper ? null : (primary.correct === true || primary.correct === false ? primary.correct : (fallback.correct === true || fallback.correct === false ? fallback.correct : null)),
      wrongCount: paper ? 0 : Math.max(left.wrongCount, right.wrongCount),
      bookmarked: bookmark.value,
      note: note.value,
      draft: draft.value,
      answer: answer === undefined ? null : answer,
      updated: laterUpdated(left, right)
    };
    if (paper) record.completed = mergeCompleted(left, right);
    if (bookmark.clock) record.bookmarkAt = bookmark.clock;
    if (note.clock) record.noteAt = note.clock;
    return sanitizeRecord(record);
  }
  function mergeDays(left, right) {
    return [...new Set([...(left.days || []), ...(right.days || [])].filter(day => typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day)))].sort().slice(-366);
  }
  function mergeFilters(left, right) {
    const leftClock = left.filtersUpdatedAt || 0;
    const rightClock = right.filtersUpdatedAt || 0;
    if (leftClock !== rightClock) {
      const winner = leftClock > rightClock ? left : right;
      return { filters: winner.filters, filtersUpdatedAt: Math.max(leftClock, rightClock) };
    }
    const leftKey = JSON.stringify(left.filters || {});
    const rightKey = JSON.stringify(right.filters || {});
    return { filters: leftKey >= rightKey ? left.filters : right.filters, filtersUpdatedAt: leftClock };
  }
  function mergeCurrent(left, right) {
    const leftClock = left.positionUpdatedAt || 0;
    const rightClock = right.positionUpdatedAt || 0;
    if (leftClock !== rightClock) return leftClock > rightClock ? left.current : right.current;
    return (left.current || '') >= (right.current || '') ? left.current : right.current;
  }
  function mergePractice(leftRaw, rightRaw) {
    const left = sanitizePractice(leftRaw || emptyPractice());
    const right = sanitizePractice(rightRaw || emptyPractice());
    const records = Object.create(null);
    for (const id of [...new Set([...Object.keys(left.records), ...Object.keys(right.records)])].sort()) {
      const merged = mergeRecord(id, left.records[id], right.records[id]);
      if (merged) records[id] = merged;
    }
    const filters = mergeFilters(left, right);
    return canonicalPractice({
      version: 1,
      records,
      days: mergeDays(left, right),
      current: mergeCurrent(left, right),
      filters: filters.filters,
      filtersUpdatedAt: filters.filtersUpdatedAt,
      positionUpdatedAt: Math.max(left.positionUpdatedAt || 0, right.positionUpdatedAt || 0)
    });
  }
  function mergeDesk(leftRaw, rightRaw) {
    const core = deskApi();
    const left = leftRaw || emptyDesk();
    const right = rightRaw || emptyDesk();
    const merged = core.merge(left, right);
    const leftMap = new Map((left.items || []).map(item => [core.key(item), item]));
    const rightMap = new Map((right.items || []).map(item => [core.key(item), item]));
    const items = merged.items.map(item => {
      const leftItem = leftMap.get(core.key(item));
      const rightItem = rightMap.get(core.key(item));
      if (!leftItem) return rightItem;
      if (!rightItem) return leftItem;
      if (leftItem.favoriteAt !== rightItem.favoriteAt) return leftItem.favoriteAt > rightItem.favoriteAt ? leftItem : rightItem;
      return JSON.stringify(leftItem) >= JSON.stringify(rightItem) ? leftItem : rightItem;
    });
    return finalizeDesk(items);
  }
  function mergeSnapshots(local, remote) {
    return {
      version: 1,
      site: SITE,
      desk: mergeDesk(local && local.desk, remote && remote.desk),
      practice: mergePractice(local && local.practice, remote && remote.practice)
    };
  }
  function contentKey(snapshot) {
    return JSON.stringify({ desk: snapshot.desk, practice: snapshot.practice });
  }
  function serializeSnapshot(snapshot, deviceId, savedAt) {
    assertNoSecrets(snapshot);
    return JSON.stringify({
      version: 1,
      site: SITE,
      deviceId: deviceId,
      savedAt: savedAt,
      desk: snapshot.desk,
      practice: snapshot.practice
    }, null, 2);
  }
  function parseSnapshot(raw) {
    let value;
    try { value = JSON.parse(raw); } catch { throw new Error('Gist 内容不是合法 JSON。'); }
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Gist 内容不是进度数据。');
    assertNoSecrets(value);
    if (value.version !== 1) throw new Error('Gist 内容不是可识别的留日手记进度。');
    if (value.site && value.site !== SITE) throw new Error('Gist 内容不是留日手记的进度。');
    if (value.desk == null && value.practice == null) throw new Error('Gist 内容不是留日手记的进度。');
    return mergeSnapshots({ desk: value.desk || emptyDesk(), practice: value.practice || emptyPractice() }, { desk: emptyDesk(), practice: emptyPractice() });
  }
  function projectPractice(previous, state, bank) {
    const base = previous && previous.version === 1 ? sanitizePractice(previous) : emptyPractice();
    const current = sanitizePractice(state || emptyPractice());
    const bankIds = new Set((bank || []).map(question => question && question.id).filter(id => typeof id === 'string'));
    const records = Object.create(null);
    for (const [id, record] of Object.entries(base.records)) if (!bankIds.has(id)) records[id] = record;
    for (const [id, record] of Object.entries(current.records)) records[id] = record;
    return canonicalPractice({
      version: 1,
      records,
      days: current.days,
      current: current.current,
      filters: current.filters,
      filtersUpdatedAt: current.filtersUpdatedAt || 0,
      positionUpdatedAt: current.positionUpdatedAt || 0
    });
  }
  function readDeskRaw(raw) {
    if (raw == null) return { ok: true, desk: emptyDesk() };
    try { return { ok: true, desk: sanitizeDesk(JSON.parse(raw)) }; }
    catch (error) { return { ok: false, error }; }
  }
  function readPracticeRaw(raw) {
    if (raw == null) return { ok: true, practice: emptyPractice() };
    try {
      const value = JSON.parse(raw);
      if (!value || value.version !== 1 || typeof value !== 'object' || Array.isArray(value)) return { ok: false, error: new Error('练习记录版本无法识别。') };
      return { ok: true, practice: sanitizePractice(value) };
    } catch (error) { return { ok: false, error }; }
  }

  const api = {
    SITE, DESK_KEY, PRACTICE_KEY, SYNC_STORAGE_KEY, DEVICE_STORAGE_KEY, BASELINE_FILENAME, TOKEN_URL, GIST_DESCRIPTION, PUSH_DELAY_MS, POLL_MS, FILTER_KEYS,
    emptyDesk, emptyPractice, deviceFilename, isDeviceFilename, isOurGistFilename, parseGistId, sanitizePractice, sanitizeDesk, sanitizeRecord,
    mergePractice, mergeDesk, mergeSnapshots, contentKey, serializeSnapshot, parseSnapshot, projectPractice, readDeskRaw, readPracticeRaw, canonicalPractice
  };
  root.ProgressSync = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
