const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..');

function paper(id) {
  return JSON.parse(fs.readFileSync(path.join(root, 'assets/question-bank', id, 'paper.json'), 'utf8'));
}

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    try {
      res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.json') ? 'application/json' : file.endsWith('.png') ? 'image/png' : 'application/octet-stream');
      res.end(fs.readFileSync(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.STUDY_ROOM_BROWSER || undefined, headless: true, args: ['--no-sandbox'] });
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(String(error)));
      await page.goto(origin + '/question-practice.html?paper=science-tokyo-ee-2019');
      await page.locator('#app').waitFor();
      await page.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
      assert.equal(await page.locator('#previous').innerText(), '← 上一题');
      assert.equal(await page.locator('#next').innerText(), '下一题 →');
      assert.match(await page.locator('#previous-paper').getAttribute('aria-label'), /2021/);
      assert.match(await page.locator('#next-paper').getAttribute('aria-label'), /2018/);
      assert.match(await page.locator('#paper-year-status').innerText(), /2018/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      const last = paper('science-tokyo-ee-2019').questions.at(-1).id;
      await page.locator('#question-directory button').last().click();
      assert.equal(new URL(page.url()).searchParams.get('q'), last);
      assert.equal(await page.locator('#next').isDisabled(), true);
      await page.locator('#complete').click();
      await page.locator('#next-paper').click();
      await page.locator('#app').waitFor();
      await page.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
      const first = paper('science-tokyo-ee-2018').questions[0].id;
      assert.equal(new URL(page.url()).searchParams.get('paper'), 'science-tokyo-ee-2018');
      assert.equal(new URL(page.url()).searchParams.get('q'), first);
      assert.equal(await page.locator('#previous').isDisabled(), true);
      const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('japan-study-journal:question-practice:v1')));
      assert.equal(stored.version, 1);
      assert.equal(stored.records[last].completed, true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.deepEqual(errors, []);
      await page.close();
    }
    const kairo = await browser.newPage({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce' });
    await kairo.goto(origin + '/question-practice.html?paper=science-tokyo-ee-2015-kairo');
    await kairo.locator('#app').waitFor();
    await kairo.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
    assert.equal(await kairo.locator('#previous-paper').isDisabled(), true);
    assert.match(await kairo.locator('#paper-year-status').innerText(), /暂无更晚年份/);
    assert.match(await kairo.locator('#next-paper').getAttribute('aria-label'), /2014/);
    await kairo.locator('#next-paper').click();
    await kairo.locator('#app').waitFor();
    assert.equal(new URL(kairo.url()).searchParams.get('paper'), 'science-tokyo-ee-2014-kairo');
    assert.equal(new URL(kairo.url()).searchParams.get('q'), paper('science-tokyo-ee-2014-kairo').questions[0].id);
    await kairo.close();
    const waseda = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await waseda.goto(origin + '/question-practice.html?paper=waseda-eps-2019');
    await waseda.locator('#app').waitFor();
    await waseda.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
    assert.match(await waseda.locator('#previous-paper').getAttribute('aria-label'), /2021/);
    assert.match(await waseda.locator('#next-paper').getAttribute('aria-label'), /2018/);
    await waseda.locator('#previous-paper').click();
    await waseda.locator('#app').waitFor();
    assert.equal(new URL(waseda.url()).searchParams.get('paper'), 'waseda-eps-2021');
    await waseda.close();
    const tus = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await tus.goto(origin + '/question-practice.html?paper=tus-electrical-2024-general');
    await tus.locator('#app').waitFor();
    await tus.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
    await tus.locator('#previous-paper').click();
    await tus.locator('#app').waitFor();
    assert.equal(new URL(tus.url()).searchParams.get('paper'), 'tus-electrical-2025-general');
    assert.equal(new URL(tus.url()).searchParams.get('q'), paper('tus-electrical-2025-general').questions[0].id);
    await tus.close();
    const intl = await browser.newPage({ viewport: { width: 800, height: 900 }, reducedMotion: 'reduce' });
    await intl.goto(origin + '/question-practice.html?paper=tus-electrical-2024-intl');
    await intl.locator('#app').waitFor();
    await intl.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
    assert.equal(await intl.locator('#next-paper').isDisabled(), true);
    assert.match(await intl.locator('#paper-year-status').innerText(), /暂无更早年份/);
    assert.match(await intl.locator('#previous-paper').getAttribute('aria-label'), /2025/);
    await intl.close();
    const alone = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    await alone.goto(origin + '/question-practice.html?paper=kobe-ee-2026-denjiki');
    await alone.locator('#app').waitFor();
    await alone.locator('#paper-year-status').filter({ hasNotText: '正在查找' }).waitFor();
    assert.equal(await alone.locator('#previous-paper').isDisabled(), true);
    assert.equal(await alone.locator('#next-paper').isDisabled(), true);
    assert.match(await alone.locator('#paper-year-status').innerText(), /暂无更早／更晚年份/);
    assert.equal(await alone.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await alone.close();
    console.log('Year navigation checks passed for Science Tokyo, Waseda EPS, and TUS electrical.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
