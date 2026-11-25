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
    let indexRequests = 0;
    page.on('request', r => { if (r.url().includes('search-index.json')) indexRequests++; });

    // 每个主要页面都有搜索按钮；打开前不下载索引
    for (const p of ['index.html', 'practice.html', 'topics.html', 'drill.html', 'past-papers.html', 'answers.html', 'exam-scope.html', 'schools.html', 'campus-map.html', 'desk.html', 'question-practice.html?paper=utokyo-ee-2023']) {
      await page.goto(origin + '/' + p);
      await page.waitForSelector('.search-trigger', { timeout: 15000 });
    }
    assert.equal(indexRequests, 0, 'index is only fetched when search opens');

    // 按钮打开、输入、键盘选择、Enter 跳转
    await page.goto(origin + '/practice.html');
    await page.click('.search-trigger');
    await page.fill('.search-input', '东北 电气');
    await page.waitForSelector('.search-item');
    assert.equal(indexRequests, 1);
    assert.match(await page.locator('.search-item').first().textContent(), /東北大学.*電気/);
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('.search-item[aria-selected="true"]').count(), 1);
    assert.equal(await page.locator('.search-item').nth(1).getAttribute('aria-selected'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.search-dialog').evaluate(d => d.open), false);

    // 快捷键 / 和 Ctrl+K；输入框里按 / 不触发
    await page.keyboard.press('/');
    assert.equal(await page.locator('.search-dialog').evaluate(d => d.open), true);
    await page.fill('.search-input', '运放');
    await page.waitForFunction(() => /运算放大器/.test(document.querySelector('.search-item')?.textContent || ''));
    await page.keyboard.press('Enter');
    await page.waitForURL(/topics\.html\?topic=electronic\.opamp/);
    await page.waitForSelector('.topic-row');
    await page.keyboard.press('Control+k');
    assert.equal(await page.locator('.search-dialog').evaluate(d => d.open), true);
    await page.fill('.search-input', '完全不存在的词');
    await page.waitForFunction(() => /没有找到/.test(document.querySelector('.search-status').textContent));
    await page.keyboard.press('Escape');
    await page.goto(origin + '/desk.html');
    await page.focus('#desk-query');
    await page.keyboard.press('/');
    assert.equal(await page.locator('.search-dialog').count(), 0, 'typing / in a field does not open search');

    // 逐题练习页：搜索不干扰方向键换题
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    await page.keyboard.press('/');
    await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('#nav-position').textContent(), /^1 \//);
    await page.keyboard.press('Escape');
    await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('#nav-position').textContent(), /^2 \//);

    // 手机：图标按钮、无横向滚动
    const m = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
    m.on('pageerror', e => errors.push(String(e)));
    await m.goto(origin + '/index.html');
    await m.click('.search-trigger');
    await m.fill('.search-input', '早稻田 2024');
    await m.waitForSelector('.search-item');
    assert.equal(await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.STUDY_ROOM_SCREENSHOTS) { fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS, { recursive: true }); await m.screenshot({ path: path.join(process.env.STUDY_ROOM_SCREENSHOTS, 'search-mobile.png') }); }

    assert.deepEqual(errors, []);
    console.log('Site search checks passed: button on 11 pages, lazy index, mixed-script queries, keyboard selection, Enter, / and Ctrl+K, no trigger while typing, practice arrow keys unaffected, empty results and mobile.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
