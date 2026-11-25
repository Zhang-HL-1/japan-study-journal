(function () {
  'use strict';
  // 顶栏分组下拉（院校 / 练习）与手机底部标签栏。
  const doc = document;
  const groups = [...doc.querySelectorAll('.main-nav .nav-group')];
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  function setOpen(group, open) {
    const button = group.querySelector('.nav-group-button');
    const menu = group.querySelector('.nav-menu');
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    group.classList.toggle('is-open', open);
  }
  const closeAll = except => groups.forEach(g => { if (g !== except) setOpen(g, false); });

  for (const group of groups) {
    const button = group.querySelector('.nav-group-button');
    const menu = group.querySelector('.nav-menu');
    let timer;
    button.addEventListener('click', event => {
      // 鼠标悬停时菜单已经打开，再点按钮不应把它关掉；键盘（detail 为 0）和触屏才切换开关。
      const open = (event.detail > 0 && finePointer.matches) || button.getAttribute('aria-expanded') !== 'true';
      closeAll(group);
      setOpen(group, open);
      if (open) menu.querySelector('a')?.focus({ preventScroll: true });
    });
    group.addEventListener('pointerenter', () => { if (!finePointer.matches) return; clearTimeout(timer); closeAll(group); setOpen(group, true); });
    group.addEventListener('pointerleave', () => { if (!finePointer.matches) return; timer = setTimeout(() => setOpen(group, false), 160); });
    group.addEventListener('focusout', event => { if (!group.contains(event.relatedTarget)) setOpen(group, false); });
    menu.addEventListener('keydown', event => {
      const links = [...menu.querySelectorAll('a')];
      const at = links.indexOf(doc.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        links[(at + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
      }
    });
  }
  doc.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = groups.find(g => g.classList.contains('is-open'));
    if (open) { setOpen(open, false); open.querySelector('.nav-group-button').focus(); }
  });
  doc.addEventListener('click', event => { if (!event.target.closest('.nav-group')) closeAll(); });

  // ---------- 手机底部标签栏 ----------
  const header = doc.querySelector('.site-header');
  if (!header) return;
  const here = (location.pathname.split('/').pop() || 'index.html');
  const inGroup = id => {
    const group = doc.getElementById('nav-' + id);
    return Boolean(group && group.querySelector('[aria-current="page"]'));
  };
  const icons = {
    home: '<path d="M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3.5v-4.5h-5V17H4a1 1 0 0 1-1-1z"/>',
    schools: '<path d="M2.5 7 10 3.5 17.5 7 10 10.5z"/><path d="M5.5 8.6v4.2c1.2 1.2 2.7 1.8 4.5 1.8s3.3-.6 4.5-1.8V8.6"/>',
    practice: '<path d="M4 3.5h9l3 3V16.5H4z"/><path d="M7 9.5h6M7 12.5h4"/>',
    desk: '<path d="M3 6.5h14v3H3z"/><path d="M5 9.5V16M15 9.5V16M8 6.5V4.5h4v2"/>',
    search: '<circle cx="8.5" cy="8.5" r="5"/><path d="m12.5 12.5 4 4"/>',
  };
  const svg = name => `<svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">${icons[name]}</svg>`;
  const tabs = [
    ['index.html', '首页', 'home', here === 'index.html'],
    ['schools.html', '院校', 'schools', inGroup('schools')],
    ['practice.html', '练习', 'practice', inGroup('practice')],
    ['desk.html', '书桌', 'desk', here === 'desk.html'],
  ];
  const bar = doc.createElement('nav');
  bar.className = 'tab-bar';
  bar.setAttribute('aria-label', '快捷导航');
  for (const [href, label, icon, current] of tabs) {
    const a = doc.createElement('a');
    a.href = href;
    if (current) a.setAttribute('aria-current', 'page');
    a.innerHTML = svg(icon) + '<span></span>';
    a.lastChild.textContent = label;
    bar.append(a);
  }
  const search = doc.createElement('button');
  search.type = 'button';
  search.innerHTML = svg('search') + '<span>搜索</span>';
  search.addEventListener('click', () => { if (window.SiteSearch && window.SiteSearch.open) window.SiteSearch.open(); });
  bar.append(search);
  doc.body.append(bar);
  doc.body.classList.add('has-tab-bar');
})();
