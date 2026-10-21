// Isolated CI browser, controlled only through the CLI.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({headless:true});const origin='http://127.0.0.1:'+server.address().port;
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>requests.push(r.url()));
  const shot=async name=>{if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,name+'.png'),fullPage:true,animations:'disabled'});}};
  await page.goto(origin+'/schools.html');assert.equal(await page.locator('.hub-card').count(),23);
  assert.ok(!requests.some(url=>/\/(exam-scope-data|past-papers-data|campus-map-data)\.js/.test(url)));
  await page.fill('#hub-query','东大');assert.equal(await page.locator('.hub-card').count(),1);
  await page.reload();assert.equal(await page.locator('#hub-query').inputValue(),'东大');
  await page.locator('.hub-card').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#hub-picker').inputValue(),'utokyo');
  assert.match(await page.locator('#hub-detail').textContent(),/过去问待收录/);
  assert.equal(await page.locator('#hub-detail a[href^="past-papers.html"]').count(),0);
  await page.goBack();assert.equal(await page.locator('.hub-card').count(),1);
  await page.locator('#hub-reset').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('.hub-card').count(),23);
  await page.selectOption('#hub-region','kyushu');assert.ok(await page.locator('.hub-card').count()>0);assert.ok(await page.locator('.hub-card').count()<23);
  await page.fill('#hub-query','no-such-school');assert.equal(await page.locator('#hub-empty').isVisible(),true);
  await page.locator('#hub-reset').click();await page.waitForLoadState('domcontentloaded');await shot('schools-directory-desktop');
  await page.selectOption('#hub-picker','waseda');assert.equal(new URL(page.url()).searchParams.get('school'),'waseda');
  await page.reload();assert.equal(await page.locator('#hub-picker').inputValue(),'waseda');await shot('schools-detail-desktop');
  const graduate=page.locator('.hub-graduate').filter({has:page.locator('h4',{hasText:'先進理工学研究科'})});
  await graduate.locator('a[href^="past-papers.html"]').click();await page.waitForLoadState('domcontentloaded');
  assert.equal(await page.locator('#paper-graduate').inputValue(),'先進理工学研究科');assert.ok(await page.locator('.paper-result').count()>0);
  await page.locator('#paper-school-link').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#hub-picker').inputValue(),'waseda');
  const scope=page.locator('.hub-graduate').filter({has:page.locator('h4',{hasText:'先進理工学研究科'})});
  await scope.locator('a[href^="exam-scope.html"]').first().click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#scope-graduate').inputValue(),'先進理工学研究科');
  await page.locator('#scope-school-link').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#hub-picker').inputValue(),'waseda');
  await page.locator('#hub-detail a[href^="campus-map.html"]').first().click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#map-school').inputValue(),'waseda');
  await page.locator('#map-school-link').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#hub-picker').inputValue(),'waseda');
  await page.goto(origin+'/schools.html?school=unknown&region=unknown&q=%3Cimg%20src=x%20onerror=alert(1)%3E');
  assert.equal(await page.locator('#hub-detail').isHidden(),true);assert.equal(await page.locator('#hub-empty').isVisible(),true);assert.equal(await page.locator('#hub-content img').count(),0);
  for(const width of [390,801,900,1440]){
   await page.setViewportSize({width,height:900});await page.goto(origin+'/schools.html?school=nagoya');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.match(await page.locator('#hub-detail').textContent(),/校区对应待补充/);
   if(width===390){await shot('schools-detail-mobile');await page.locator('.menu-button').click();await page.waitForLoadState('domcontentloaded');assert.equal(await page.locator('#mobile-nav').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-nav').isHidden(),true);}
  }
  await page.route('**/school-hub-data.js*',r=>r.fulfill({contentType:'text/javascript',body:'/* unavailable data fixture */'}));
  await page.goto(origin+'/schools.html');assert.match(await page.locator('#hub-status').textContent(),/暂时无法加载/);
  assert.deepEqual(errors,[]);console.log('School hub checks passed: aliases, regions, empty and error states, URL restoration, exact graduate links, back links, and four viewport widths.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
