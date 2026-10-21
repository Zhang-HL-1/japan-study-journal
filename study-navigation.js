(function (root) {
  'use strict';
  // A small shared URL contract. Page controllers validate catalog values.
  function read(search, defaults, fields) {
    const params = new URLSearchParams(search || '');
    const state = {...defaults};
    for (const [key, parameter] of Object.entries(fields)) {
      if (!params.has(parameter)) continue;
      state[key] = Array.isArray(defaults[key])
        ? [...new Set(params.getAll(parameter).filter(Boolean))]
        : params.get(parameter);
    }
    return state;
  }
  function url(page, state, defaults, fields, extra = {}) {
    const params = new URLSearchParams();
    for (const [key, parameter] of Object.entries(fields)) {
      const value = state[key];
      if (Array.isArray(value)) value.forEach(item => params.append(parameter, item));
      else if (value !== undefined && value !== '' && value !== defaults[key]) params.set(parameter, value);
    }
    for (const [key, value] of Object.entries(extra)) {
      if (value !== undefined && value !== null && value !== '') params.set(key, value);
    }
    return page + (params.size ? '?' + params.toString() : '');
  }
  function write(window, relative, push = false) {
    if (!window.history || !window.location) return;
    const target = new URL(relative, window.location.href);
    if (target.href === window.location.href) return;
    window.history[push ? 'pushState' : 'replaceState'](null, '', target.href);
  }
  function share(document, window, href) {
    const group = document.createElement('div'); group.className = 'study-detail-actions';
    const link = document.createElement('a'); link.href = href; link.textContent = '资料直达链接';
    const button = document.createElement('button'); button.type = 'button'; button.textContent = '复制资料链接';
    const status = document.createElement('span'); status.setAttribute('role', 'status');
    button.addEventListener('click', async () => {
      try {
        await window.navigator.clipboard.writeText(new URL(href, window.location.href).href);
        status.textContent = '链接已复制';
      } catch {
        status.textContent = '未能自动复制，请长按或右键“资料直达链接”复制。';
      }
    });
    group.append(link, button, status);
    return group;
  }
  // Only exact catalog names are applied. Historical/current names must not be guessed.
  function resolveContext(rows, request, schoolKey, graduateKey) {
    const inSchool = rows.filter(row => row[schoolKey] === request.school);
    const graduate = inSchool.some(row => row[graduateKey] === request.graduate) ? request.graduate : 'all';
    const candidates = inSchool.filter(row => graduate === 'all' || row[graduateKey] === graduate);
    const department = candidates.some(row => row.department === request.department) ? request.department : 'all';
    return {graduate, department, broadened: !!(
      request.graduate && request.graduate !== 'all' && graduate === 'all' ||
      request.department && request.department !== 'all' && department === 'all'
    )};
  }
  const api = {read, url, write, share, resolveContext};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StudyNavigation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
