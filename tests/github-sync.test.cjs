const test = require('node:test');
const assert = require('node:assert/strict');
const progress = require('../progress-sync.js');
const sync = require('../github-sync.js');
const desk = require('../study-desk-core.js');
const quiz = require('../practice-core.js');

const fav = (id, favoriteAt, type = 'scope') => ({ type, id, title: '资料 ' + id, subtitle: '学校 · 研究科', file: type === 'paper' ? 1 : 0, admission: 'general', favoriteAt });
const practice = records => progress.sanitizePractice({ version: 1, records, days: [], current: null, filters: {} });
const graded = (extra) => ({ attempts: 1, correct: true, wrongCount: 0, bookmarked: false, note: '', draft: '', answer: 1, updated: '2026-10-20T00:00:00.000Z', ...extra });
const same = (left, right) => progress.contentKey({ desk: progress.emptyDesk(), practice: left }) === progress.contentKey({ desk: progress.emptyDesk(), practice: right });

test('storage keys and gist names stay separate from the desk, practice, and TOEFL files', () => {
  assert.equal(progress.DESK_KEY, desk.KEY);
  assert.equal(progress.PRACTICE_KEY, 'japan-study-journal:practice:v1');
  assert.equal(progress.SYNC_STORAGE_KEY, 'japan-study-journal.sync.github.v1');
  assert.equal(progress.BASELINE_FILENAME, 'japan-study-journal-progress.json');
  assert.equal(progress.isOurGistFilename('japan-study-journal-progress.json'), true);
  assert.equal(progress.isDeviceFilename(progress.deviceFilename('device-1234')), true);
  assert.equal(progress.isOurGistFilename('atrium-toefl-progress.json'), false);
  assert.equal(progress.isDeviceFilename('atrium-device-device-1234.json'), false);
  assert.equal(progress.parseGistId(''), null);
  assert.equal(progress.parseGistId('https://gist.github.com/someone/abcdef0123456789'), 'abcdef0123456789');
  assert.throws(() => progress.parseGistId('https://gist.github.com/someone/not-an-id'), /Gist ID/);
  assert.throws(() => progress.parseGistId('not a gist'), /Gist ID/);
  assert.match(progress.TOKEN_URL, /scopes=gist/);
});

test('practice merge keeps max counters, newer outcomes, notes, bookmarks, and paper completion', () => {
  const local = practice({
    q1: graded({ attempts: 2, correct: true, wrongCount: 1, updated: '2026-10-22T00:00:00.000Z', note: '保留', noteAt: 10 }),
    q2: graded({ attempts: 4, bookmarked: true, bookmarkAt: 5 }),
    'paper:one': { completed: true, updated: '2026-10-22T00:00:00.000Z', note: '我的推导', attempts: 9, correct: true }
  });
  const remote = practice({
    q1: graded({ attempts: 5, correct: false, wrongCount: 4, updated: '2026-10-21T00:00:00.000Z', note: '' }),
    q3: graded({ attempts: 1, note: '另一台' }),
    'paper:one': { completed: false, updated: '2026-10-22T03:00:00.000Z', note: '' },
    'paper:two': { completed: true, updated: '2026-10-22T01:00:00.000Z' }
  });
  local.days = ['2026-10-01'];
  remote.days = ['2026-10-03', '2026-10-01'];
  local.filters = { subject: '数学', paperYear: '2025' };
  local.filtersUpdatedAt = 20;
  remote.filters = { subject: '物理' };
  remote.filtersUpdatedAt = 10;
  local.current = 'q1';
  local.positionUpdatedAt = 1;
  remote.current = 'q3';
  remote.positionUpdatedAt = 50;
  const once = progress.mergePractice(local, remote);
  const twice = progress.mergePractice(once, remote);
  const swapped = progress.mergePractice(remote, local);
  assert.equal(once.records.q1.attempts, 5);
  assert.equal(once.records.q1.wrongCount, 4);
  assert.equal(once.records.q1.correct, false);
  assert.equal(once.records.q1.note, '保留');
  assert.equal(once.records.q2.bookmarked, true);
  assert.equal(once.records.q3.note, '另一台');
  assert.equal(once.records['paper:one'].completed, false);
  assert.equal(once.records['paper:one'].attempts, 0);
  assert.equal(once.records['paper:one'].correct, null);
  assert.equal(once.records['paper:one'].note, '我的推导');
  assert.equal(once.records['paper:two'].completed, true);
  assert.deepEqual(once.days, ['2026-10-01', '2026-10-03']);
  assert.equal(once.filters.subject, '数学');
  assert.equal(once.filters.paperYear, '2025');
  assert.equal(once.current, 'q3');
  assert.equal(same(once, twice), true);
  assert.equal(same(once, swapped), true);
  const unmarked = progress.mergePractice(practice({ 'paper:old': { completed: false, updated: '2026-10-21T00:00:00.000Z' } }), practice({ 'paper:old': { completed: true, updated: '2026-10-22T00:00:00.000Z' } }));
  assert.equal(unmarked.records['paper:old'].completed, true);
  const unbookmark = progress.mergePractice(practice({ q2: graded({ bookmarked: true, bookmarkAt: 5 }) }), practice({ q2: graded({ bookmarked: false, bookmarkAt: 9 }) }));
  assert.equal(unbookmark.records.q2.bookmarked, false);
  assert.equal(progress.mergePractice(unbookmark, practice({ q2: graded({ bookmarked: true, bookmarkAt: 5 }) })).records.q2.bookmarked, false);
});

test('desk favorites merge by latest favorite time and stay idempotent', () => {
  const local = { version: 1, items: [fav('a', 10), fav('b', 4, 'paper')] };
  const remote = { version: 1, items: [fav('b', 8, 'paper'), fav('c', 3)] };
  const once = progress.mergeDesk(local, remote);
  const twice = progress.mergeDesk(once, remote);
  assert.deepEqual(Object.fromEntries(once.items.map(item => [item.id, item.favoriteAt])), { a: 10, b: 8, c: 3 });
  assert.deepEqual(once.items.map(item => item.type + ':' + item.id), ['paper:b', 'scope:a', 'scope:c']);
  assert.equal(progress.contentKey({ desk: once, practice: progress.emptyPractice() }), progress.contentKey({ desk: twice, practice: progress.emptyPractice() }));
  assert.equal(progress.contentKey({ desk: once, practice: progress.emptyPractice() }), progress.contentKey({ desk: progress.mergeDesk(remote, local), practice: progress.emptyPractice() }));
  assert.throws(() => progress.mergeDesk({ version: 1, items: Array.from({ length: 200 }, (_, i) => fav('l' + i, 1)) }, { version: 1, items: [fav('extra', 2)] }));
});

test('snapshot serialization omits the token and rejects foreign or secret-bearing files', () => {
  const snapshot = progress.mergeSnapshots({ desk: { version: 1, items: [fav('a', 2)] }, practice: practice({ q1: graded() }) }, { desk: progress.emptyDesk(), practice: progress.emptyPractice() });
  const raw = progress.serializeSnapshot(snapshot, 'device-1234', 10);
  assert.equal(raw.includes('token'), false);
  assert.equal(raw.includes('atrium'), false);
  const parsed = progress.parseSnapshot(raw);
  assert.equal(progress.contentKey(parsed), progress.contentKey(snapshot));
  assert.throws(() => progress.parseSnapshot(JSON.stringify({ version: 1, site: progress.SITE, token: 'secret', desk: { version: 1, items: [] }, practice: { version: 1, records: {} } })));
  assert.throws(() => progress.parseSnapshot(JSON.stringify({ version: 1, site: 'atrium', desk: { version: 1, items: [] }, practice: { version: 1, records: {} } })));
});

test('projectPractice keeps records outside the current bank and cleanState keeps sync clocks', () => {
  const bank = [{ id: 'q1', type: 'choice', options: ['a', 'b'] }];
  const previous = { version: 1, records: { q1: graded({ note: 'new' }), legacy: graded({ note: 'stay' }) }, days: ['2026-10-02'], current: 'q1', filters: { subject: '数学' } };
  const projected = progress.projectPractice(previous, { version: 1, records: { q1: graded({ note: 'new' }) }, days: ['2026-10-02'], current: 'q1', filters: { subject: '数学' } }, bank);
  assert.equal(projected.records.legacy.note, 'stay');
  assert.equal(projected.records.q1.note, 'new');
  const cleaned = quiz.cleanState({ version: 1, records: { q1: { ...graded(), bookmarkAt: 12, noteAt: 13 } }, days: [], current: 'q1', filters: { paperYear: '2024' }, filtersUpdatedAt: 8, positionUpdatedAt: 9 }, bank);
  assert.equal(cleaned.records.q1.bookmarkAt, 12);
  assert.equal(cleaned.records.q1.noteAt, 13);
  assert.equal(cleaned.filters.paperYear, '2024');
  assert.equal(cleaned.filtersUpdatedAt, 8);
  assert.equal(cleaned.positionUpdatedAt, 9);
});

test('secret gist sync merges devices, skips TOEFL files, and keeps the token local', async () => {
  sync.resetForTests();
  const values = new Map();
  const store = { getItem: key => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) };
  global.localStorage = store;
  const timers = [];
  global.window = {
    setTimeout: (fn, delay) => { timers.push({ fn, delay }); return timers.length; },
    clearTimeout() {},
    setInterval: () => 1,
    addEventListener() {},
    dispatchEvent() {}
  };
  global.document = { visibilityState: 'visible', addEventListener() {} };
  global.navigator = { onLine: true };
  const gist = { id: 'abcdef0123456789', public: false, html_url: 'https://gist.github.com/abcdef0123456789', files: {} };
  const atrium = { id: 'aaaaaaaaaaaaaaaa', public: false, files: { 'atrium-toefl-progress.json': { filename: 'atrium-toefl-progress.json' } } };
  let listed = [atrium];
  let offline = false;
  const posts = [];
  const patches = [];
  global.fetch = async (input, init = {}) => {
    if (offline) throw new TypeError('offline');
    const url = String(input);
    const method = init.method || 'GET';
    assert.equal(String((init.headers || {}).Authorization || '').includes('test-token') || method === 'GET' && url.startsWith('https://gist.githubusercontent.com/'), true);
    if (method === 'POST') {
      const body = JSON.parse(init.body);
      assert.equal(body.public, false);
      assert.ok(body.files[progress.BASELINE_FILENAME]);
      assert.equal(body.files['atrium-toefl-progress.json'], undefined);
      posts.push(body);
      gist.files = body.files;
      return Response.json(gist);
    }
    if (method === 'PATCH') {
      const files = JSON.parse(init.body).files;
      assert.ok(Object.keys(files).every(name => progress.isDeviceFilename(name)));
      patches.push(files);
      gist.files = { ...gist.files, ...files };
      return Response.json(gist);
    }
    if (url.includes('/gists?')) return Response.json(listed);
    if (url.includes('/gists/bbbbbbbbbbbbbbbb')) return Response.json({ id: 'bbbbbbbbbbbbbbbb', public: false, html_url: 'https://gist.github.com/bbbbbbbbbbbbbbbb', files: { [progress.BASELINE_FILENAME]: { content: progress.serializeSnapshot({ desk: progress.emptyDesk(), practice: progress.emptyPractice() }, 'device-other', 1) } } });
    if (url.includes('/gists/aaaaaaaaaaaaaaaa')) return Response.json({ id: 'aaaaaaaaaaaaaaaa', public: false, html_url: 'https://gist.github.com/aaaaaaaaaaaaaaaa', files: { 'atrium-toefl-progress.json': { filename: 'atrium-toefl-progress.json', content: '{}' } } });
    return Response.json(gist);
  };

  assert.equal(await sync.connectGithub(' test token ', ''), false);
  assert.equal(posts.length, 0);
  assert.equal(await sync.connectGithub('test-token', ''), true);
  assert.equal(posts.length, 1);
  assert.equal(sync.getGithubSyncSnapshot().gistId, gist.id);
  assert.equal(JSON.parse(store.getItem(progress.SYNC_STORAGE_KEY)).token, 'test-token');
  assert.equal(JSON.stringify(gist.files).includes('test-token'), false);

  store.setItem(progress.DESK_KEY, JSON.stringify({ version: 1, items: [fav('local', 4)] }));
  store.setItem(progress.PRACTICE_KEY, JSON.stringify(practice({
    q1: graded({ attempts: 2, wrongCount: 1, correct: false }),
    'paper:one': { completed: true, updated: '2026-10-22T02:00:00.000Z', note: '本地笔记' }
  })));
  sync.noteLocalChange();
  assert.equal(timers.at(-1).delay, progress.PUSH_DELAY_MS);
  await sync.syncGithubNow();
  const deviceName = Object.keys(gist.files).find(name => progress.isDeviceFilename(name));
  const pushed = JSON.parse(gist.files[deviceName].content);
  assert.equal(pushed.site, progress.SITE);
  assert.equal(pushed.desk.items[0].id, 'local');
  assert.equal(pushed.practice.records['paper:one'].completed, true);
  assert.equal(pushed.practice.records.q1.attempts, 2);

  gist.files['japan-device-otherdev1.json'] = { content: progress.serializeSnapshot({
    desk: { version: 1, items: [fav('remote', 6)] },
    practice: practice({
      q1: graded({ attempts: 4, wrongCount: 2, correct: true, updated: '2026-10-22T04:00:00.000Z' }),
      'paper:one': { completed: false, updated: '2026-10-22T05:00:00.000Z' }
    })
  }, 'otherdev1', 2) };
  await sync.syncGithubNow();
  const merged = {
    desk: JSON.parse(store.getItem(progress.DESK_KEY)),
    practice: JSON.parse(store.getItem(progress.PRACTICE_KEY))
  };
  assert.deepEqual(merged.desk.items.map(item => item.id).sort(), ['local', 'remote']);
  assert.equal(merged.practice.records.q1.attempts, 4);
  assert.equal(merged.practice.records.q1.correct, true);
  assert.equal(merged.practice.records['paper:one'].completed, false);
  assert.equal(merged.practice.records['paper:one'].note, '本地笔记');
  const before = store.getItem(progress.PRACTICE_KEY);
  await sync.syncGithubNow();
  assert.equal(store.getItem(progress.PRACTICE_KEY), before);
  assert.equal(merged.practice.records.q1.attempts, 4);

  offline = true;
  merged.practice.records.q1.attempts = 6;
  store.setItem(progress.PRACTICE_KEY, JSON.stringify(merged.practice));
  await sync.syncGithubNow();
  assert.match(sync.getGithubSyncSnapshot().lastError, /无法连接 GitHub/);
  assert.equal(JSON.parse(store.getItem(progress.PRACTICE_KEY)).records.q1.attempts, 6);
  offline = false;
  await sync.syncGithubNow();
  assert.equal(sync.getGithubSyncSnapshot().lastError, null);
  assert.equal(JSON.stringify(gist.files).includes('test-token'), false);
  assert.equal(JSON.stringify(gist.files).includes('atrium-'), false);

  sync.resetForTests();
  values.delete(progress.SYNC_STORAGE_KEY);
  listed = [atrium, { id: 'bbbbbbbbbbbbbbbb', public: false, files: { [progress.BASELINE_FILENAME]: { filename: progress.BASELINE_FILENAME } } }];
  const created = posts.length;
  assert.equal(await sync.connectGithub('test-token', ''), true);
  assert.equal(posts.length, created);
  assert.equal(sync.getGithubSyncSnapshot().gistId, 'bbbbbbbbbbbbbbbb');

  sync.resetForTests();
  values.delete(progress.SYNC_STORAGE_KEY);
  assert.equal(await sync.connectGithub('test-token', 'aaaaaaaaaaaaaaaa'), false);
  assert.match(sync.getGithubSyncSnapshot().lastError, /托福/);
  assert.equal(patches.some(files => Object.keys(files).some(name => name.startsWith('atrium-'))), false);
});
