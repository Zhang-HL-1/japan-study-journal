const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..');

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    try {
      const type = file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.js') ? 'text/javascript; charset=utf-8' : file.endsWith('.css') ? 'text/css; charset=utf-8' : 'application/octet-stream';
      res.setHeader('Content-Type', type);
      res.end(fs.readFileSync(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.STUDY_ROOM_BROWSER || undefined, headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    const github = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('request', request => { if (request.url().includes('github.com')) github.push(request.url()); });
    async function expectPanel(width) {
      await page.setViewportSize({ width, height: 900 });
      await page.locator('#japan-sync-title').waitFor();
      assert.match(await page.locator('#japan-sync').innerText(), /跨设备同步/);
      assert.match(await page.locator('#japan-sync').innerText(), /japan-study-journal-progress\.json/);
      assert.match(await page.locator('#japan-sync').innerText(), /不会写入托福/);
      assert.equal(await page.locator('#japan-sync-status').textContent(), '未连接');
      assert.equal(await page.locator('#japan-sync-connected').isHidden(), true);
      const tokenLink = page.locator('#japan-sync-form a');
      assert.match(await tokenLink.getAttribute('href'), /scopes=gist/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.goto(origin + '/desk.html');
    await expectPanel(1280);
    await expectPanel(390);
    await page.locator('#japan-sync-form button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('#japan-sync-status').textContent.includes('请粘贴访问令牌'));
    await page.fill('#japan-sync-token', 'test token');
    await page.locator('#japan-sync-form button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('#japan-sync-status').textContent.includes('空格'));
    await page.fill('#japan-sync-token', 'test-token');
    await page.fill('#japan-sync-gist', 'not a gist');
    await page.locator('#japan-sync-form button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('#japan-sync-status').textContent.includes('Gist ID'));
    await page.locator('.sync-reveal').click();
    assert.equal(await page.locator('#japan-sync-token').getAttribute('type'), 'text');
    assert.equal(github.length, 0);
    assert.equal(await page.evaluate(() => localStorage.getItem('japan-study-journal.sync.github.v1')), null);

    await page.goto(origin + '/drill.html');
    await page.locator('#japan-sync-title').waitFor();
    await page.setViewportSize({ width: 390, height: 900 });
    assert.match(await page.locator('#japan-sync-status').textContent(), /未连接/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.locator('#complete-paper').click();
    await page.waitForFunction(() => document.querySelector('#paper-completion').textContent.includes('本套已练习'));
    const saved = await page.evaluate(() => localStorage.getItem('japan-study-journal:practice:v1'));
    assert.match(saved, /"completed":true/);
    assert.equal(saved.includes('test-token'), false);
    assert.equal(github.length, 0);

    const scope = await browser.newPage();
    const scopeErrors = [];
    scope.on('pageerror', error => scopeErrors.push(String(error)));
    await scope.goto(origin + '/exam-scope.html');
    await scope.locator('#scope-search, form, main').first().waitFor();
    assert.equal(await scope.locator('#japan-sync').count(), 0);
    assert.deepEqual(scopeErrors, []);
    assert.deepEqual(errors, []);
    console.log('Sync panel checks passed: desk and drill copy, rejected token and Gist ID without GitHub requests, mobile width, and paper completion still saves locally.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
