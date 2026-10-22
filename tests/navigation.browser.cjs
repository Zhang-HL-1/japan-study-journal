// Run through the CLI/CI; no desktop application or user browser is controlled.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.pdf')?'application/pdf':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
  browser=await chromium.launch({headless:true});
  const origin='http://127.0.0.1:'+server.address().port,errors=[];
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(String(e)));
  const shot=async(name,fullPage=true)=>{if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.evaluate(async()=>{await document.fonts.ready;document.documentElement.style.scrollBehavior='auto';document.body.style.scrollBehavior='auto';window.scrollTo({top:0,left:0,behavior:'instant'});await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));window.scrollTo({top:0,left:0,behavior:'instant'});});await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,name+'.png'),fullPage,animations:'disabled'});}};
  for(const width of [390,900,1440]){
   await page.setViewportSize({width,height:900});await page.goto(origin+'/index.html');
   await page.locator('.desk-card').last().waitFor();
   assert.equal(await page.locator('.hero-actions a[href="past-papers.html"]').isVisible(),true);
   assert.equal(await page.locator('.hero-actions a[href="answers.html"]').isVisible(),true);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await shot('home-'+width);
  }
  await page.goto(origin+'/exam-scope.html?school=waseda');
  await page.selectOption('#scope-department','電気・情報生命専攻');
  await page.locator('#scope-results button').first().click();
  const shared=page.url();assert.ok(new URL(shared).searchParams.get('record'));
  await page.reload();await page.locator('#scope-detail').waitFor();
  assert.equal(await page.locator('#scope-department').inputValue(),'電気・情報生命専攻');
  await shot('scope-desktop');
  await page.locator('#scope-detail a[href^="past-papers.html"]').click();
  await page.locator('.paper-result').first().waitFor();
  assert.equal(await page.locator('#paper-department').inputValue(),'電気・情報生命専攻');
  await page.selectOption('#paper-year','2024');await page.locator('.paper-result').click();
  await page.locator('.paper-files button').nth(1).click();
  assert.equal(new URL(page.url()).searchParams.get('file'),'1');
  const paperURL=page.url();await page.reload();await page.locator('#paper-detail').waitFor();
  assert.equal(await page.locator('.paper-files button').nth(1).getAttribute('aria-pressed'),'true');
  await page.locator('.paper-close').click();assert.equal(await page.locator('#paper-detail').isHidden(),true);
  assert.equal(await page.locator('#paper-year').inputValue(),'2024');
  await page.goBack();await page.locator('#paper-detail').waitFor();assert.equal(page.url(),paperURL);
  for(const width of [390,801,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(origin+'/past-papers.html');
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('#paper-school-shortcuts').getAttribute('open'),null);
   assert.equal(await page.locator('.papers-schools').count(),0);
   assert.equal(await page.locator('#paper-school-select').isVisible(),true);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   if(width===390||width===1440)await shot('papers-filters-'+width,false);
   await page.locator('#paper-school-shortcuts summary').click();
   assert.equal(await page.locator('.paper-school').count(),24);assert.equal(await page.locator('[data-school="waseda"]').isVisible(),true);
   assert.equal(await page.locator('#paper-schools').evaluate(e=>e.scrollHeight<=e.clientHeight+1),true);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.locator('[data-school="waseda"]').click();assert.equal(await page.locator('#paper-school-select').inputValue(),'waseda');
   await page.selectOption('#paper-year','2024');await page.locator('[data-school="keio"]').click();
   assert.equal(await page.locator('#paper-year').inputValue(),'all');assert.equal(await page.locator('#paper-graduate').inputValue(),'all');assert.equal(await page.locator('#paper-school-select').inputValue(),'keio');
   assert.equal(new URL(page.url()).searchParams.get('school'),'keio');assert.equal(await page.locator('[data-school="keio"]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#paper-school-note-panel').isVisible(),true);assert.equal(await page.locator('#paper-school-note').isHidden(),true);
   if(width===1440)await shot('papers-shortcuts-desktop',false);
   await page.reload();assert.equal(await page.locator('#paper-school-select').inputValue(),'keio');assert.equal(await page.locator('#paper-school-shortcuts').getAttribute('open'),null);
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+'/past-papers.html?school=keio');
  await page.locator('#paper-school-select').waitFor();
  assert.equal(await page.locator('#paper-schools').isHidden(),true);
  await page.locator('#paper-school-shortcuts summary').click();await page.fill('#paper-school-query','早稻田');await page.selectOption('#paper-school-select','waseda');
  assert.equal(await page.locator('.paper-result').count(),41);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await shot('papers-navigation-mobile');
  await page.goto(shared);await page.locator('#scope-detail').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await shot('scope-mobile');
  assert.deepEqual(errors,[]);console.log('Navigation checks passed: home at three widths, cross-page context, reload, PDF tab deep links, back and mobile school picker, compact sidebar and school shortcuts at four widths.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
