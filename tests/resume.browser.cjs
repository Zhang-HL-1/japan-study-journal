const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { chromium } = require('playwright');
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
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(String(e)));
    const KEY = 'japan-study-journal:last-question:v1';

    // 练一题 → 首页与练习室出现卡片
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    await page.click('#next');
    for (const p of ['index.html', 'practice.html']) {
      await page.goto(origin + '/' + p);
      await page.waitForSelector('.resume-card');
      assert.equal(await page.locator('.resume-close').count(), 1, p);
    }
    // 点 × 关闭：当前页消失，另一个页面也不再显示
    await page.click('.resume-close');
    assert.equal(await page.locator('[data-study-resume]').isHidden(), true);
    await page.goto(origin + '/index.html');
    await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-study-resume]').isHidden(), true);
    // 再练一题 → 卡片回来
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    await page.goto(origin + '/practice.html');
    await page.waitForSelector('.resume-card');
    // 超过 24 小时没练 → 不显示；记录本身保留
    await page.evaluate(key => { const v = JSON.parse(localStorage.getItem(key)); v.at -= 25 * 3600 * 1000; localStorage.setItem(key, JSON.stringify(v)); }, KEY);
    await page.reload();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-study-resume]').isHidden(), true);
    assert.ok(await page.evaluate(key => localStorage.getItem(key), KEY));
    // 另一个标签页关闭后，本页同步隐藏
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    await page.goto(origin + '/index.html');
    await page.waitForSelector('.resume-card');
    const other = await context.newPage();
    await other.goto(origin + '/practice.html');
    await other.click('.resume-close');
    await page.waitForSelector('[data-study-resume]', { state: 'hidden' });
    // 手机宽度下按钮不挤出屏幕
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(origin + '/practice.html');
    await page.waitForSelector('.resume-card');
    const box = await page.locator('.resume-close').boundingBox();
    assert.ok(box.x + box.width <= 375, 'close button stays on screen');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

    assert.deepEqual(errors, []);
    console.log('Resume card checks passed: shows after practice, close hides everywhere, next practice brings it back, hidden after 24 hours, cross-tab close, mobile width.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
