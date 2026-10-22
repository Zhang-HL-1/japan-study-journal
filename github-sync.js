(function (root) {
  'use strict';
  const progress = root.ProgressSync || (typeof require === 'function' ? require('./progress-sync.js') : null);
  if (!progress) throw new Error('进度合并模块未加载。');
  const API_ROOT = 'https://api.github.com';
  const API_VERSION = '2022-11-28';
  const emptyConfig = () => ({ token: null, gistId: null, gistUrl: null, lastSyncAt: null });

  class SyncError extends Error {
    constructor(message) { super(message); this.name = 'SyncError'; }
  }

  let memory = { phase: 'idle', lastError: null };
  let lastPushed = '';
  let applyingRemote = false;
  let installed = false;
  let pushTimer = 0;
  let tail = Promise.resolve();
  let cached = derive();
  const listeners = new Set();
  let originalSetItem = null;
  let originalRemoveItem = null;

  function storage() {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  }
  function derive() {
    const config = readConfig();
    return {
      connected: Boolean(config.token && config.gistId),
      gistId: config.gistId,
      gistUrl: config.gistUrl,
      lastSyncAt: config.lastSyncAt,
      lastError: memory.lastError,
      phase: memory.phase
    };
  }
  function emit() {
    cached = derive();
    listeners.forEach(listener => listener());
    const target = typeof window !== 'undefined' ? window : null;
    if (target && typeof target.dispatchEvent === 'function' && typeof Event !== 'undefined') {
      target.dispatchEvent(new Event('japan-study-journal:sync-status'));
    }
  }
  function readConfig() {
    const store = storage();
    if (!store) return emptyConfig();
    try {
      const raw = store.getItem(progress.SYNC_STORAGE_KEY);
      if (!raw) return emptyConfig();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return emptyConfig();
      return {
        token: typeof parsed.token === 'string' && parsed.token.trim() ? parsed.token.trim() : null,
        gistId: typeof parsed.gistId === 'string' && parsed.gistId.trim() ? parsed.gistId.trim() : null,
        gistUrl: typeof parsed.gistUrl === 'string' && parsed.gistUrl.trim() ? parsed.gistUrl.trim() : null,
        lastSyncAt: typeof parsed.lastSyncAt === 'number' && Number.isFinite(parsed.lastSyncAt) ? parsed.lastSyncAt : null
      };
    } catch { return emptyConfig(); }
  }
  function writeConfig(next) {
    const store = storage();
    if (!store) throw new SyncError('无法把同步设置写入这台浏览器。');
    try { store.setItem(progress.SYNC_STORAGE_KEY, JSON.stringify(next)); }
    catch { throw new SyncError('无法把同步设置写入这台浏览器。'); }
    emit();
  }
  function hasConnection(config) {
    const current = config || readConfig();
    return Boolean(current.token && current.gistId);
  }
  function requireConfig() {
    const config = readConfig();
    if (!hasConnection(config)) throw new SyncError('未连接。');
    return config;
  }
  function deviceId() {
    const store = storage();
    const existing = store && store.getItem(progress.DEVICE_STORAGE_KEY);
    if (existing && /^[A-Za-z0-9-]{8,80}$/.test(existing)) return existing;
    const id = (root.crypto || crypto).randomUUID();
    if (store) store.setItem(progress.DEVICE_STORAGE_KEY, id);
    return id;
  }
  function toMessage(error) {
    if (error instanceof Error && error.message) return error.message;
    return '同步失败。';
  }
  async function readError(response) {
    if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') return 'GitHub 速率限制已到，请稍后再试。';
    let detail = '';
    try {
      const body = await response.json();
      if (typeof body.message === 'string') detail = body.message;
    } catch { detail = ''; }
    const lower = detail.toLowerCase();
    if (response.status === 401) return '令牌无效或已过期。';
    if (response.status === 403) {
      if (lower.includes('rate limit')) return 'GitHub 速率限制已到，请稍后再试。';
      return '令牌没有 gist 权限。请用仅含 gist 范围的 classic token。';
    }
    if (response.status === 404) return '找不到这个 Gist，或当前令牌无权访问。';
    if (detail) return 'GitHub：' + detail.slice(0, 160);
    return 'GitHub 返回 ' + response.status + '。';
  }
  async function gh(token, path, init) {
    const url = path.startsWith('https://') ? path : API_ROOT + path;
    if (!url.startsWith(API_ROOT + '/') && url !== API_ROOT) throw new SyncError('已拒绝非 GitHub API 的同步地址。');
    let response;
    try {
      response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(20000),
        cache: 'no-store',
        credentials: 'omit',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: 'Bearer ' + token,
          'X-GitHub-Api-Version': API_VERSION,
          ...(init && init.body ? { 'Content-Type': 'application/json' } : {}),
          ...(init && init.headers)
        }
      });
    } catch { throw new SyncError('无法连接 GitHub。检查网络后再试。'); }
    if (response.url && !response.url.startsWith(API_ROOT)) throw new SyncError('已拒绝非 GitHub API 的同步响应。');
    if (!response.ok) throw new SyncError(await readError(response));
    return response;
  }
  async function ghJson(token, path, init) {
    const response = await gh(token, path, init);
    try { return await response.json(); }
    catch { throw new SyncError('GitHub 返回了无法解析的响应。'); }
  }
  function assertSecret(gist) {
    if (gist.public !== false) throw new SyncError('这个 Gist 是公开的。进度只写入私密 Gist。');
  }
  function gistUrlOf(gist, id) {
    return gist.html_url || 'https://gist.github.com/' + id;
  }
  function matchingFiles(gist) {
    return Object.entries(gist.files || {}).filter(([name]) => progress.isOurGistFilename(name)).sort(([a], [b]) => a.localeCompare(b));
  }
  async function fileText(token, file) {
    if (typeof file.content === 'string' && file.truncated !== true) return file.content;
    if (!file.raw_url || !file.raw_url.startsWith('https://gist.githubusercontent.com/')) throw new SyncError('Gist 文件不完整，无法读取。');
    let response;
    try { response = await fetch(file.raw_url, { cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(20000) }); }
    catch { throw new SyncError('无法读取 Gist 原文。'); }
    if (response.url && !response.url.startsWith('https://gist.githubusercontent.com/')) throw new SyncError('已拒绝非 GitHub 的同步响应。');
    if (!response.ok) throw new SyncError('无法读取 Gist 原文。');
    return response.text();
  }
  async function readSnapshotFromGist(token, gist) {
    const files = matchingFiles(gist);
    let merged = { desk: progress.emptyDesk(), practice: progress.emptyPractice() };
    if (!files.length) return merged;
    for (const [, file] of files) {
      if (!file) continue;
      try { merged = progress.mergeSnapshots(merged, progress.parseSnapshot(await fileText(token, file))); }
      catch (error) {
        if (error instanceof SyncError) throw error;
        throw new SyncError(error instanceof Error ? error.message : 'Gist 内容无法读取。');
      }
    }
    return merged;
  }
  function nextLink(header) {
    if (!header) return null;
    for (const part of header.split(',')) {
      const match = /<([^>]+)>;\s*rel="next"/.exec(part);
      const url = match && match[1];
      if (url && url.startsWith(API_ROOT + '/')) return url;
    }
    return null;
  }
  function hasOurFile(gist) {
    return matchingFiles(gist).length > 0;
  }
  function hasAtriumFile(gist) {
    return Object.keys(gist.files || {}).some(name => name === 'atrium-toefl-progress.json' || /^atrium-device-[A-Za-z0-9-]+\.json$/.test(name));
  }
  async function findProgressGist(token) {
    let url = API_ROOT + '/gists?per_page=100';
    for (let page = 0; url && page < 10; page += 1) {
      const response = await gh(token, url);
      let gists;
      try { gists = await response.json(); }
      catch { throw new SyncError('GitHub 返回了无法解析的 Gist 列表。'); }
      if (!Array.isArray(gists)) throw new SyncError('GitHub 返回了无法解析的 Gist 列表。');
      for (const gist of gists) {
        if (gist.public !== false || !gist.id || !hasOurFile(gist) || hasAtriumFile(gist)) continue;
        return gist;
      }
      url = nextLink(response.headers.get('Link'));
    }
    return null;
  }
  async function getGist(token, gistId) {
    const gist = await ghJson(token, '/gists/' + encodeURIComponent(gistId));
    if (!gist.id) throw new SyncError('GitHub 没有返回 Gist ID。');
    assertSecret(gist);
    return gist;
  }
  function localParts() {
    const store = storage();
    const desk = progress.readDeskRaw(store ? store.getItem(progress.DESK_KEY) : null);
    const practice = progress.readPracticeRaw(store ? store.getItem(progress.PRACTICE_KEY) : null);
    return { desk, practice };
  }
  function readableSnapshot(parts) {
    return {
      desk: parts.desk.ok ? parts.desk.desk : progress.emptyDesk(),
      practice: parts.practice.ok ? parts.practice.practice : progress.emptyPractice()
    };
  }
  function applyRemote(merged, parts) {
    const store = storage();
    if (!store) throw new SyncError('无法把同步结果写入这台浏览器。');
    const deskText = JSON.stringify(merged.desk);
    const practiceText = JSON.stringify(merged.practice);
    const deskChanged = parts.desk.ok && store.getItem(progress.DESK_KEY) !== deskText;
    const practiceChanged = parts.practice.ok && store.getItem(progress.PRACTICE_KEY) !== practiceText;
    if (!deskChanged && !practiceChanged) return;
    applyingRemote = true;
    try {
      if (deskChanged) store.setItem(progress.DESK_KEY, deskText);
      if (practiceChanged) store.setItem(progress.PRACTICE_KEY, practiceText);
      const target = typeof window !== 'undefined' ? window : null;
      if (target && typeof target.dispatchEvent === 'function' && typeof Event !== 'undefined') {
        target.dispatchEvent(new Event('japan-study-journal:synced'));
      }
    } catch {
      throw new SyncError('无法把同步结果写入这台浏览器。');
    } finally {
      applyingRemote = false;
    }
  }
  async function patchDevice(token, gistId, snapshot) {
    const body = progress.serializeSnapshot(snapshot, deviceId(), Date.now());
    if (body.length > 1000000) throw new SyncError('进度太大，没有上传。请先减少笔记或收藏。');
    if (body.includes(token)) throw new SyncError('已阻止上传包含令牌的进度。');
    const filename = progress.deviceFilename(deviceId());
    await ghJson(token, '/gists/' + encodeURIComponent(gistId), {
      method: 'PATCH',
      body: JSON.stringify({ files: { [filename]: { content: body } } })
    });
    return progress.contentKey(snapshot);
  }
  async function pushCurrent() {
    const config = requireConfig();
    const parts = localParts();
    if (!parts.desk.ok || !parts.practice.ok) {
      const which = !parts.desk.ok && !parts.practice.ok ? '书桌和练习记录' : (!parts.desk.ok ? '书桌记录' : '练习记录');
      throw new SyncError(which + '无法读取，未上传，避免覆盖另一台设备。');
    }
    const snapshot = readableSnapshot(parts);
    let uploaded = progress.contentKey(snapshot);
    if (uploaded !== lastPushed) {
      await patchDevice(config.token, config.gistId, snapshot);
      const latestParts = localParts();
      const latest = readableSnapshot(latestParts);
      const latestKey = progress.contentKey(latest);
      if (latestKey !== uploaded && latestParts.desk.ok && latestParts.practice.ok) {
        await patchDevice(config.token, config.gistId, latest);
        uploaded = latestKey;
      }
    }
    if (progress.contentKey(readableSnapshot(localParts())) !== uploaded) return;
    lastPushed = uploaded;
    const current = readConfig();
    writeConfig({ ...current, lastSyncAt: Date.now() });
  }
  async function reconcile() {
    const config = requireConfig();
    const gist = await getGist(config.token, config.gistId);
    const remote = await readSnapshotFromGist(config.token, gist);
    let parts = localParts();
    let local = readableSnapshot(parts);
    if (!parts.desk.ok) local = { ...local, desk: remote.desk };
    if (!parts.practice.ok) local = { ...local, practice: remote.practice };
    let merged = progress.mergeSnapshots(local, remote);
    if (parts.desk.ok || parts.practice.ok) applyRemote(merged, parts);
    parts = localParts();
    local = readableSnapshot(parts);
    if (!parts.desk.ok) local = { ...local, desk: remote.desk };
    if (!parts.practice.ok) local = { ...local, practice: remote.practice };
    if (progress.contentKey(local) !== progress.contentKey(merged)) {
      merged = progress.mergeSnapshots(local, remote);
      if (parts.desk.ok || parts.practice.ok) applyRemote(merged, parts);
    }
    const current = readConfig();
    if (current.gistUrl !== gistUrlOf(gist, config.gistId)) writeConfig({ ...current, gistUrl: gistUrlOf(gist, config.gistId) });
    if (!localParts().desk.ok || !localParts().practice.ok) {
      const blocked = localParts();
      const which = !blocked.desk.ok && !blocked.practice.ok ? '书桌和练习记录' : (!blocked.desk.ok ? '书桌记录' : '练习记录');
      throw new SyncError(which + '无法读取。能合并的部分已写回这台浏览器，损坏的部分没有上传。');
    }
    if (progress.contentKey(readableSnapshot(localParts())) !== progress.contentKey(remote)) {
      await pushCurrent();
      return;
    }
    lastPushed = progress.contentKey(readableSnapshot(localParts()));
    writeConfig({ ...readConfig(), gistUrl: gistUrlOf(gist, config.gistId), lastSyncAt: Date.now() });
  }
  async function pullOnly() {
    const config = requireConfig();
    const gist = await getGist(config.token, config.gistId);
    const remote = await readSnapshotFromGist(config.token, gist);
    const parts = localParts();
    const local = readableSnapshot(parts);
    const base = {
      desk: parts.desk.ok ? local.desk : remote.desk,
      practice: parts.practice.ok ? local.practice : remote.practice
    };
    const merged = progress.mergeSnapshots(base, remote);
    if (parts.desk.ok || parts.practice.ok) applyRemote(merged, parts);
    writeConfig({ ...readConfig(), gistUrl: gistUrlOf(gist, config.gistId), lastSyncAt: Date.now() });
    lastPushed = '';
  }
  function runExclusive(task) {
    const run = tail.then(async () => {
      memory = { phase: 'syncing', lastError: null };
      emit();
      try {
        await task();
        memory = { phase: 'idle', lastError: null };
      } catch (error) {
        memory = { phase: 'idle', lastError: toMessage(error) };
      }
      emit();
    });
    tail = run.then(() => undefined, () => undefined);
    return run;
  }
  function clearScheduledPush() {
    if (typeof window === 'undefined' || !window.clearTimeout) return;
    window.clearTimeout(pushTimer);
    pushTimer = 0;
  }
  function schedulePush() {
    if (!hasConnection() || typeof window === 'undefined' || !window.setTimeout) return;
    window.clearTimeout(pushTimer);
    pushTimer = window.setTimeout(() => {
      pushTimer = 0;
      void runExclusive(() => reconcile());
    }, progress.PUSH_DELAY_MS);
  }
  function noteLocalChange() {
    if (applyingRemote || !hasConnection()) return;
    schedulePush();
  }
  function isLocalProgress(store, key) {
    const local = storage();
    return Boolean(local && store === local && (key === progress.DESK_KEY || key === progress.PRACTICE_KEY));
  }
  function installStorageHook() {
    if (originalSetItem || typeof Storage === 'undefined') return;
    originalSetItem = Storage.prototype.setItem;
    originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.setItem = function (key, value) {
      originalSetItem.call(this, key, value);
      if (isLocalProgress(this, key)) noteLocalChange();
    };
    Storage.prototype.removeItem = function (key) {
      originalRemoveItem.call(this, key);
      if (isLocalProgress(this, key)) noteLocalChange();
    };
  }
  function uninstallStorageHook() {
    if (!originalSetItem || typeof Storage === 'undefined') return;
    Storage.prototype.setItem = originalSetItem;
    Storage.prototype.removeItem = originalRemoveItem;
    originalSetItem = null;
    originalRemoveItem = null;
  }
  async function createGist(token, snapshot) {
    const gist = await ghJson(token, '/gists', {
      method: 'POST',
      body: JSON.stringify({
        description: progress.GIST_DESCRIPTION,
        public: false,
        files: { [progress.BASELINE_FILENAME]: { content: progress.serializeSnapshot(snapshot, deviceId(), Date.now()) } }
      })
    });
    if (!gist.id) throw new SyncError('GitHub 没有返回新建的 Gist。');
    if (gist.public !== false) {
      await gh(token, '/gists/' + encodeURIComponent(gist.id), { method: 'DELETE' }).catch(() => undefined);
      throw new SyncError('GitHub 没有创建私密 Gist，已中止。');
    }
    return gist;
  }
  async function resolveGist(token, explicitId, snapshot) {
    if (explicitId) {
      const gist = await getGist(token, explicitId);
      if (hasAtriumFile(gist)) throw new SyncError('这个 Gist 含有托福练习文件。留日手记不会写入，请留空以新建一份。');
      return gist;
    }
    const found = await findProgressGist(token);
    if (found && found.id) return getGist(token, found.id);
    return createGist(token, snapshot);
  }
  function connectGithub(tokenInput, gistInput) {
    clearScheduledPush();
    return runExclusive(async () => {
      const token = String(tokenInput || '').trim();
      if (!token) throw new SyncError('请粘贴访问令牌。');
      if (/\s/.test(token)) throw new SyncError('令牌里有空格，请只粘贴令牌本身。');
      if (token.length > 300) throw new SyncError('令牌看起来不对。');
      const explicitId = progress.parseGistId(gistInput);
      const parts = localParts();
      if (!parts.desk.ok || !parts.practice.ok) throw new SyncError('本地记录无法读取，还没有连接。');
      const gist = await resolveGist(token, explicitId, readableSnapshot(parts));
      if (!gist.id) throw new SyncError('GitHub 没有返回 Gist ID。');
      writeConfig({ token, gistId: gist.id, gistUrl: gistUrlOf(gist, gist.id), lastSyncAt: null });
      await reconcile();
    }).then(() => cached.connected && cached.lastError === null);
  }
  function disconnectGithub() {
    clearScheduledPush();
    const config = readConfig();
    writeConfig({ ...config, token: null });
    lastPushed = '';
    memory = { phase: 'idle', lastError: null };
    emit();
  }
  function clearGithubSyncError() {
    if (!memory.lastError || memory.phase === 'syncing') return;
    memory = { ...memory, lastError: null };
    emit();
  }
  function syncGithubNow() {
    clearScheduledPush();
    return runExclusive(() => reconcile());
  }
  function pullGithub() {
    clearScheduledPush();
    return runExclusive(() => pullOnly());
  }
  function formatSynced(ts, now) {
    const delta = Math.max(0, (now || Date.now()) - ts);
    if (delta < 60000) return '刚刚';
    if (delta < 3600000) return Math.floor(delta / 60000) + ' 分钟前';
    if (delta < 86400000) return Math.floor(delta / 3600000) + ' 小时前';
    return new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(ts);
  }
  function statusLine(sync) {
    if (sync.phase === 'syncing') return { text: '正在同步…', tone: 'muted' };
    if (!sync.connected) return sync.lastError ? { text: '未连接。' + sync.lastError, tone: 'error' } : { text: '未连接', tone: 'muted' };
    const when = sync.lastSyncAt ? '上次同步 ' + formatSynced(sync.lastSyncAt) : '已连接，还没有同步过';
    return sync.lastError ? { text: when + '。' + sync.lastError, tone: 'error' } : { text: when, tone: 'ok' };
  }
  function installGithubSync() {
    if (installed || typeof window === 'undefined') return;
    installed = true;
    installStorageHook();
    window.addEventListener('storage', event => {
      if (!event || event.key !== progress.SYNC_STORAGE_KEY) return;
      emit();
    });
    const autoSync = () => {
      const online = typeof navigator === 'undefined' || navigator.onLine !== false;
      const visible = typeof document === 'undefined' || document.visibilityState !== 'hidden';
      if (hasConnection() && memory.phase !== 'syncing' && online && visible) void syncGithubNow();
    };
    window.addEventListener('focus', autoSync);
    window.addEventListener('online', autoSync);
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', autoSync);
    window.setInterval(autoSync, progress.POLL_MS);
    if (hasConnection()) void syncGithubNow();
  }
  function resetForTests() {
    clearScheduledPush();
    uninstallStorageHook();
    memory = { phase: 'idle', lastError: null };
    lastPushed = '';
    applyingRemote = false;
    installed = false;
    pushTimer = 0;
    tail = Promise.resolve();
    listeners.clear();
    cached = derive();
  }
  function getGithubSyncSnapshot() { return cached; }
  function subscribeGithubSync(listener) { listeners.add(listener); return () => listeners.delete(listener); }

  const api = {
    SyncError, getGithubSyncSnapshot, subscribeGithubSync, connectGithub, disconnectGithub, clearGithubSyncError,
    syncGithubNow, pullGithub, installGithubSync, noteLocalChange, formatSynced, statusLine, resetForTests, deviceId
  };
  root.JapanGithubSync = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined' && typeof document !== 'undefined') installGithubSync();
})(typeof globalThis !== 'undefined' ? globalThis : this);
