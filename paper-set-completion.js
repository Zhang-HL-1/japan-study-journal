(function (root) {
  'use strict';
  // Whole-paper completion is the drill record `completed`.
  // Gist sync already watches ProgressSync.PRACTICE_KEY; do not add another key.
  const buttons = new Set();
  function key() {
    return root.ProgressSync && root.ProgressSync.PRACTICE_KEY ? root.ProgressSync.PRACTICE_KEY : 'japan-study-journal:practice:v1';
  }
  function localDay(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  function safeStorage() {
    try { return root.localStorage || null; } catch { return null; }
  }
  function readState(store, questions) {
    try {
      if (!store || !root.QuizCore) return { ok: false };
      const raw = store.getItem(key());
      if (raw == null) return { ok: true, raw: null, state: root.QuizCore.blank() };
      return { ok: true, raw, state: root.QuizCore.cleanState(JSON.parse(raw), questions) };
    } catch { return { ok: false }; }
  }
  function writeState(store, raw, state, questions) {
    const previous = raw == null ? null : JSON.parse(raw);
    const next = root.ProgressSync ? root.ProgressSync.projectPractice(previous, state, questions) : state;
    const text = JSON.stringify(next);
    if (store.getItem(key()) !== text) store.setItem(key(), text);
    return next;
  }
  function paperSet(catalogId, questions) {
    return root.QuizCore ? root.QuizCore.paperSetForCatalog(catalogId, questions || root.QUESTION_BANK) : null;
  }
  function toggle(catalogId, storage, questions, day) {
    const store = storage || safeStorage();
    const bank = questions || root.QUESTION_BANK;
    const set = paperSet(catalogId, bank);
    if (!root.QuizCore) return { ok: false, reason: 'missing' };
    if (!set) return { ok: false, reason: 'unmapped' };
    const loaded = readState(store, bank);
    if (!loaded.ok) return { ok: false, reason: 'unreadable' };
    const completed = loaded.state.records[set.id]?.completed === true;
    root.QuizCore.recordPaperCompletion(loaded.state, set.id, !completed, day || localDay());
    try {
      const next = writeState(store, loaded.raw, loaded.state, bank);
      return { ok: true, completed: next.records[set.id]?.completed === true, id: set.id };
    } catch { return { ok: false, reason: 'storage' }; }
  }
  function isCompleted(catalogId, storage, questions) {
    const bank = questions || root.QUESTION_BANK;
    const set = paperSet(catalogId, bank);
    const loaded = readState(storage || safeStorage(), bank);
    return Boolean(set && loaded.ok && loaded.state.records[set.id]?.completed === true);
  }
  function paint(button, catalogId) {
    const set = paperSet(catalogId, root.QUESTION_BANK);
    const loaded = readState(safeStorage(), root.QUESTION_BANK);
    const completed = Boolean(set && loaded.ok && loaded.state.records[set.id]?.completed === true);
    button.hidden = !set;
    button.disabled = !set || !loaded.ok;
    button.setAttribute('aria-pressed', completed ? 'true' : 'false');
    button.classList.toggle('is-complete', completed);
    button.textContent = completed ? '✓ 已完成' : '本套已完成';
    button.setAttribute('title', !set ? '' : !loaded.ok ? '练习记录无法读取，完成状态未改动。' : completed ? '再次点击可取消' : '');
  }
  function refresh() {
    for (const item of [...buttons]) {
      if (item.button.isConnected === false) buttons.delete(item);
      else paint(item.button, item.catalogId);
    }
  }
  function control(catalogId) {
    const set = paperSet(catalogId, root.QUESTION_BANK);
    if (!set || !root.document) return null;
    const button = root.document.createElement('button');
    button.type = 'button';
    button.className = 'paper-set-complete';
    if (button.dataset) button.dataset.paperSet = set.id;
    button.addEventListener('click', () => {
      const result = toggle(catalogId);
      paint(button, catalogId);
      if (!result.ok && result.reason !== 'unreadable') button.setAttribute('title', '练习记录未能保存，完成状态未改动。');
    });
    buttons.add({ button, catalogId });
    paint(button, catalogId);
    // The previous detail button is detached after this node is inserted.
    if (typeof queueMicrotask === 'function') queueMicrotask(dropDisconnected);
    return button;
  }
  function dropDisconnected() {
    for (const item of [...buttons]) if (item.button.isConnected === false) buttons.delete(item);
  }
  if (typeof root.addEventListener === 'function') {
    root.addEventListener('storage', event => {
      if (!event || event.key === key() || event.key == null) refresh();
    });
    root.addEventListener('japan-study-journal:synced', refresh);
  }
  const api = { key, toggle, isCompleted, control, refresh };
  root.PaperSetCompletion = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
