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
    const shot = async (page, name) => {
      if (!process.env.STUDY_ROOM_SCREENSHOTS) return;
      fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS, { recursive: true });
      await page.screenshot({ path: path.join(process.env.STUDY_ROOM_SCREENSHOTS, name + '.png'), fullPage: true, animations: 'disabled' });
    };
    const iso = offset => { const d = new Date(); d.setDate(d.getDate() + offset); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); };
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(String(e)));

    // 首页：没有目标时不显示倒计时
    await page.goto(origin + '/index.html');
    assert.equal(await page.locator('[data-target-countdown]').isHidden(), true);
    await page.evaluate(() => localStorage.setItem('japan-study-journal:question-practice:v1', JSON.stringify({ version: 1, records: {} })));

    // 书桌：加入两所学校
    await page.goto(origin + '/desk.html');
    await page.waitForSelector('#target-school option[value="tohoku"]', { state: 'attached' });
    assert.equal(await page.locator('#target-empty').isVisible(), true);
    await page.click('#target-submit');
    assert.match(await page.locator('#target-status').textContent(), /请先选择学校/);
    await page.selectOption('#target-school', 'tohoku');
    await page.fill('#target-deadline', iso(12));
    await page.fill('#target-exam', iso(70));
    await page.fill('#target-note', '一般入試 夏季');
    await page.click('#target-submit');
    await page.waitForSelector('.target-card[data-school="tohoku"]');
    await page.selectOption('#target-school', 'utokyo');
    await page.fill('#target-exam', iso(-3));
    await page.click('#target-submit');
    await page.waitForSelector('.target-card[data-school="utokyo"]');
    assert.equal(await page.locator('#target-count').textContent(), '2 / 4');
    assert.equal(await page.locator('#target-school option[value="tohoku"]').count(), 0, 'chosen schools leave the picker');
    const tohoku = page.locator('.target-card[data-school="tohoku"]');
    assert.match(await tohoku.locator('.target-date').first().textContent(), /还有 12 天/);
    assert.equal(await tohoku.locator('.target-date.is-soon').count(), 1);
    assert.match(await page.locator('.target-card[data-school="utokyo"] .target-date').nth(1).textContent(), /已过/);
    // 进度与知识点缺口来自知识点索引
    await tohoku.locator('.target-progress-line').waitFor();
    assert.match(await tohoku.locator('.target-progress-line').textContent(), /0 \/ \d+/);
    const gap = tohoku.locator('.target-gap').first();
    assert.match(await gap.getAttribute('href'), /topics\.html\?topic=[a-z.]+&school=tohoku/);
    await shot(page, 'targets-desk');

    // 首页倒计时指向最近的未来日期
    await page.goto(origin + '/index.html');
    const countdown = page.locator('[data-target-countdown]');
    await countdown.waitFor();
    assert.match(await countdown.textContent(), /距 東北大学 出願截止还有 12 天/);
    assert.equal(await countdown.locator('a').getAttribute('href'), 'desk.html#target-panel');

    // 修改日期、移除学校、跨标签页同步
    await page.goto(origin + '/desk.html');
    await page.locator('.target-card[data-school="tohoku"] button', { hasText: '修改' }).click();
    assert.equal(await page.locator('#target-school').isDisabled(), true);
    await page.fill('#target-deadline', '');
    await page.click('#target-submit');
    await page.waitForFunction(() => /未填写/.test(document.querySelector('.target-card[data-school="tohoku"] .target-date').textContent));
    const other = await context.newPage();
    other.on('pageerror', e => errors.push(String(e)));
    await other.goto(origin + '/desk.html');
    await other.waitForSelector('.target-card[data-school="utokyo"]');
    await page.locator('.target-card[data-school="utokyo"] button', { hasText: '移除' }).click();
    await other.waitForFunction(() => !document.querySelector('.target-card[data-school="utokyo"]'));
    assert.equal(await page.evaluate(() => localStorage.getItem('japan-study-journal:question-practice:v1')), JSON.stringify({ version: 1, records: {} }));

    // 坏数据与手机宽度
    await page.evaluate(() => localStorage.setItem('japan-study-journal:targets:v1', '{broken'));
    await page.reload();
    await page.waitForSelector('#target-school option[value="tohoku"]', { state: 'attached' });
    assert.equal(await page.locator('.target-card').count(), 0);
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no horizontal scroll at ' + width);
    }
    assert.deepEqual(errors, []);
    console.log('Target school checks passed: empty state, add/validate, picker exclusion, countdown states, progress and topic gaps, homepage countdown, edit, remove with cross-tab sync, broken storage and mobile widths.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
