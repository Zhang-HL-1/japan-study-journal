const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const origin = 'http://127.0.0.1:' + server.address().port, errors = [];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('pageerror', e => errors.push(String(e)));
    // 桌面：每页 4 个入口，所在分组高亮
    const expected = { 'index.html': '首页', 'schools.html': '院校', 'exam-scope.html': '院校', 'campus-map.html': '院校', 'practice.html': '练习', 'topics.html': '练习', 'drill.html': '练习', 'past-papers.html': '练习', 'answers.html': '练习', 'desk.html': '我的书桌' };
    for (const [file, label] of Object.entries(expected)) {
      await page.goto(origin + '/' + file);
      assert.equal(await page.locator('.main-nav > a, .main-nav > .nav-group').count(), 4, file);
      const active = label.length === 2 && label !== '首页'
        ? await page.locator('.nav-group.is-active .nav-group-button').textContent()
        : await page.locator('.main-nav > a[aria-current="page"]').textContent();
      assert.equal(active.trim(), label, file);
      assert.equal(await page.locator(`.nav-menu a[href="${file}"][aria-current="page"], .main-nav > a[href="${file}"][aria-current="page"]`).count(), 1, file);
    }
    // 悬停打开、移开关闭；键盘 Enter 打开、方向键移动、Esc 关闭并回到按钮
    await page.goto(origin + '/topics.html');
    await page.hover('.nav-group-button[aria-controls="nav-practice"]');
    await page.waitForSelector('#nav-practice:not([hidden])');
    await page.mouse.move(10, 700);
    await page.waitForSelector('#nav-practice', { state: 'hidden' });
    await page.locator('.nav-group-button[aria-controls="nav-schools"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#nav-schools').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'schools.html');
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'exam-scope.html');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#nav-schools').isHidden(), true);
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-controls')), 'nav-schools');
    await page.locator('.nav-group-button[aria-controls="nav-schools"]').click();
    await page.locator('#nav-schools a[href="campus-map.html"]').click();
    await page.waitForURL(/campus-map\.html/);
    assert.equal(await page.locator('.tab-bar').isVisible(), false, 'no tab bar on desktop');

    // 手机：底部标签栏、当前分组、搜索按钮、菜单仍可用、逐题练习页不出现
    const m = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
    m.on('pageerror', e => errors.push(String(e)));
    await m.goto(origin + '/exam-scope.html');
    assert.equal(await m.locator('.tab-bar').isVisible(), true);
    assert.equal(await m.locator('.tab-bar [aria-current="page"]').textContent(), '院校');
    assert.equal(await m.locator('.site-header .search-trigger').isVisible(), false);
    await m.locator('.tab-bar button').click();
    assert.equal(await m.locator('.search-dialog').evaluate(d => d.open), true);
    await m.keyboard.press('Escape');
    await m.locator('.menu-button').click();
    assert.equal(await m.locator('#mobile-nav').isVisible(), true);
    assert.equal(await m.locator('#mobile-nav a[href="topics.html"]').count(), 1);
    await m.locator('#mobile-nav a[href="topics.html"]').click();
    await m.waitForURL(/topics\.html/);
    assert.equal(await m.locator('.tab-bar [aria-current="page"]').textContent(), '练习');
    const bar = await m.locator('.tab-bar').boundingBox();
    const viewport = m.viewportSize();
    assert.ok(Math.abs(bar.y + bar.height - viewport.height) < 2, 'tab bar sticks to the bottom');
    assert.equal(await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await m.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await m.waitForSelector('#app:not([hidden])');
    assert.equal(await m.locator('.tab-bar').count(), 0, 'practice page keeps its swipe area clear');
    assert.equal(await m.locator('.search-trigger').isVisible(), true);

    assert.deepEqual(errors, []);
    console.log('Site nav checks passed: four grouped entries with active state on 10 pages, hover and keyboard dropdowns, mobile tab bar with search, hamburger menu, no tab bar on question practice.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
