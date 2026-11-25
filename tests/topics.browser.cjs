const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { chromium, devices } = require('playwright');
const root = path.join(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp' };

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
    const watch = page => page.on('pageerror', e => errors.push(String(e)));
    const shot = async (page, name) => {
      if (!process.env.STUDY_ROOM_SCREENSHOTS) return;
      fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS, { recursive: true });
      await page.screenshot({ path: path.join(process.env.STUDY_ROOM_SCREENSHOTS, name + '.png'), fullPage: true, animations: 'disabled' });
    };
    const index = require('../data/topics/topic-index.json');
    const opampTotal = index.subjects.find(s => s.id === 'electronic').topics.find(t => t.id === 'electronic.opamp').count;

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    watch(page);
    // 练习室入口
    await page.goto(origin + '/practice.html');
    await page.locator('.room-topic-link').click();
    await page.waitForSelector('.subject-card');
    assert.equal(await page.locator('.subject-card').count(), index.subjects.length);
    await shot(page, 'topics-overview');

    // 选知识点：网址、当前项、题数
    await page.locator('.tree-topic', { hasText: '运算放大器' }).click();
    await page.waitForSelector('.topic-row');
    assert.match(page.url(), /topics\.html\?topic=electronic\.opamp$/);
    assert.equal(await page.locator('.topic-row').count(), opampTotal);
    assert.match(await page.locator('.tree-topic[aria-current="page"]').textContent(), /运算放大器/);
    const years = (await page.locator('.row-meta span:nth-child(2)').allTextContents()).map(t => parseInt(t, 10)).filter(Number.isFinite);
    assert.deepEqual(years, [...years].sort((a, b) => b - a));
    await page.selectOption('#topic-school', 'utokyo');
    assert.match(page.url(), /school=utokyo/);
    assert.ok((await page.locator('.row-school').allTextContents()).every(t => t === '東京大学'));
    await page.selectOption('#topic-school', '');
    await page.goBack();
    assert.match(page.url(), /school=utokyo/);
    await page.goForward();
    await page.waitForFunction(n => document.querySelectorAll('.topic-row').length === n, opampTotal);
    await shot(page, 'topics-opamp');

    // 开始练习：进入知识点模式，跨卷下一题
    const firstTitle = await page.locator('.topic-row .row-title').first().textContent();
    await page.locator('.topic-start').click();
    await page.waitForSelector('#topic-bar:not([hidden])');
    assert.equal(await page.locator('#question-title').textContent(), firstTitle);
    assert.equal(await page.locator('#topic-bar-position').textContent(), `第 1 / ${opampTotal} 题`);
    assert.equal(await page.locator('#previous').isDisabled(), true);
    assert.match(await page.locator('#back-to-practice').getAttribute('href'), /topics\.html\?topic=electronic\.opamp/);
    const startPaper = new URL(page.url()).searchParams.get('paper');
    let crossed = false;
    for (let n = 2; n <= 6; n++) {
      const before = page.url();
      await (n % 2 ? page.keyboard.press('ArrowRight') : page.click('#next'));
      await page.waitForFunction(prev => location.href !== prev, before);
      await page.waitForFunction(k => /^第 (\d+) \//.exec(document.getElementById('topic-bar-position')?.textContent ?? '')?.[1] === String(k), n);
      if (new URL(page.url()).searchParams.get('paper') !== startPaper) crossed = true;
      assert.equal(new URL(page.url()).searchParams.get('topic'), 'electronic.opamp');
    }
    assert.ok(crossed, 'next question should move to another paper');
    // 题目下方的知识点链接：当前知识点高亮，链接指向知识点列表
    await page.waitForSelector('#topic-links:not([hidden]) a[aria-current="true"]');
    assert.equal(await page.locator('#topic-links a[aria-current="true"]').textContent(), '运算放大器');
    assert.equal(await page.locator('#topic-links a[aria-current="true"]').getAttribute('href'), 'topics.html?topic=electronic.opamp');
    // 首页「继续上次」带回同一个知识点
    const resumeAt = page.url();
    await page.goto(origin + '/index.html');
    await page.waitForSelector('.resume-card');
    assert.match(await page.locator('.resume-card').textContent(), /按知识点：运算放大器/);
    await page.locator('.resume-card').click();
    await page.waitForSelector('#topic-bar:not([hidden])');
    assert.equal(page.url(), resumeAt);
    await shot(page, 'topics-practice');

    // 标记已练习 → 列表出现对勾、继续练习
    await page.click('#complete');
    const doneTitle = await page.locator('#question-title').textContent();
    await page.locator('#topic-bar-name').click();
    await page.waitForSelector('.topic-row.is-done');
    assert.equal(await page.locator('.topic-row.is-done .row-title').textContent(), doneTitle);
    assert.match(await page.locator('.topic-stat').textContent(), /已练 1/);
    assert.match(await page.locator('.topic-start').textContent(), /继续练习/);
    await page.click('.status-button:has-text("已练")');
    assert.equal(await page.locator('.topic-row').count(), 1);
    await page.click('.status-button:has-text("未练")');
    assert.equal(await page.locator('.topic-row').count(), opampTotal - 1);

    // 只练本卷：退出知识点模式；普通逐题练习不受影响
    await page.locator('.topic-row').nth(2).click();
    await page.waitForSelector('#topic-bar:not([hidden])');
    await page.click('#topic-bar-exit');
    assert.equal(await page.locator('#topic-bar').isHidden(), true);
    assert.doesNotMatch(page.url(), /topic=/);
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    assert.equal(await page.locator('#topic-bar').isHidden(), true);
    // 普通练习也会补上知识点链接，点了进入对应列表
    await page.waitForSelector('#topic-links:not([hidden]) a');
    await page.locator('#topic-links a').first().click();
    await page.waitForSelector('.topic-row');
    // 刷题页入口
    await page.goto(origin + '/drill.html');
    assert.equal(await page.locator('.room-breadcrumb a[href="topics.html"]').count(), 1);
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023');
    await page.waitForSelector('#app:not([hidden])');
    assert.match(await page.locator('#nav-position').textContent(), /^1 \//);

    // 同类题对比：最多勾 3 题，打开对比页并排显示，返回后勾选保留
    await page.goto(origin + '/topics.html?topic=electronic.opamp');
    await page.waitForSelector('.topic-row');
    assert.equal(await page.locator('#compare-bar').isHidden(), true);
    await page.locator('.row-pick input').nth(0).check();
    assert.match(await page.locator('#compare-hint').textContent(), /再选一题/);
    await page.click('#compare-go', { force: true });
    assert.match(page.url(), /topics\.html/, 'cannot compare a single question');
    for (const i of [2, 4]) await page.locator('.row-pick input').nth(i).check();
    await page.locator('.row-pick input').nth(6).click();
    assert.equal(await page.locator('.row-pick input:checked').count(), 3);
    assert.match(await page.locator('#compare-hint').textContent(), /最多同时对比 3 题/);
    const picked = await page.locator('.topic-item:has(.row-pick input:checked) .row-title').allTextContents();
    await page.click('#compare-go');
    await page.waitForSelector('.compare-col');
    assert.equal(await page.locator('.compare-col').count(), 3);
    assert.match(await page.locator('#compare-heading').textContent(), /运算放大器：3 题并排对比/);
    assert.ok((await page.locator('.compare-title').allTextContents()).every((t, i) => t.endsWith(picked[i])));
    assert.ok(await page.locator('.compare-body img').count() >= 3);
    assert.match(await page.locator('.compare-practice').first().getAttribute('href'), /question-practice\.html\?paper=.+&topic=electronic\.opamp/);
    await shot(page, 'topics-compare');
    await page.goBack();
    await page.waitForSelector('.topic-row');
    assert.equal(await page.locator('.row-pick input:checked').count(), 3);
    await page.click('#compare-clear');
    assert.equal(await page.locator('#compare-bar').isHidden(), true);
    await page.goto(origin + '/compare.html?q=..%2Fx,nope');
    await page.waitForFunction(() => /至少选 2 题/.test(document.getElementById('compare-status').textContent));

    // 学校出题倾向：选学校后出现热力图，点知识点进入该校题目
    await page.goto(origin + '/topics.html');
    await page.selectOption('#overview-school', 'tohoku');
    await page.waitForSelector('.trend-table');
    assert.match(page.url(), /topics\.html\?school=tohoku$/);
    assert.match(await page.locator('.trend-always').textContent(), /几乎年年都考/);
    const trendRows = await page.locator('.trend-table tbody tr').count();
    assert.ok(trendRows > 10);
    await page.locator('.trend-topic').first().click();
    await page.waitForSelector('.topic-row');
    assert.match(page.url(), /topic=[a-z.]+&school=tohoku/);
    assert.ok((await page.locator('.row-school').allTextContents()).every(t => t === '東北大学'));
    await shot(page, 'topics-trends');

    // 科目「全部」与非法参数
    await page.goto(origin + '/topics.html?topic=physics');
    await page.waitForSelector('.topic-row');
    assert.match(await page.locator('.topic-title').textContent(), /物理 · 全部/);
    await page.goto(origin + '/topics.html?topic=..%2Fevil&school=%3Cx%3E&sort=x');
    await page.waitForSelector('.subject-card');
    assert.equal(new URL(page.url()).search, '');
    await page.goto(origin + '/question-practice.html?paper=utokyo-ee-2023&topic=nope.nope');
    await page.waitForSelector('#app:not([hidden])');
    await page.waitForTimeout(300);
    assert.equal(await page.locator('#topic-bar').isHidden(), true);

    // 手机：选好知识点后左栏收起，无横向滚动
    const mobile = await browser.newContext({ ...devices['iPhone 13'] });
    const m = await mobile.newPage();
    watch(m);
    await m.goto(origin + '/topics.html');
    await m.waitForSelector('.subject-card');
    assert.equal(await m.locator('#topics-tree').evaluate(d => d.open), true);
    await m.locator('.topic-chip', { hasText: '传递函数·框图' }).click();
    await m.waitForSelector('.topic-row');
    assert.equal(await m.locator('#topics-tree').evaluate(d => d.open), false);
    assert.match(await m.locator('.tree-current').textContent(), /传递函数/);
    await m.goto(origin + '/topics.html?school=kyushu');
    await m.waitForSelector('.trend-table');
    for (const width of [320, 390, 768]) {
      await m.setViewportSize({ width, height: 800 });
      assert.equal(await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no horizontal scroll at ' + width);
    }
    await shot(m, 'topics-mobile');

    assert.deepEqual(errors, []);
    console.log('Topic practice checks passed: practice entry, topic tree, school filter and history, newest-first order, school trend heatmap, side-by-side compare, cross-paper next, topic links, topic-aware resume, completion marks, status filters, exit to single paper, invalid params and mobile layout.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
