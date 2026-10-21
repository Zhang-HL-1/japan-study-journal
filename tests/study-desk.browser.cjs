const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright'),core=require('../study-desk-core.js');const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.pdf')?'application/pdf':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({headless:true});const origin='http://127.0.0.1:'+server.address().port,errors=[];
  const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true}),page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
  const shot=async name=>{if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.evaluate(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));await page.waitForFunction(()=>window.scrollY===0);await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,name+'.png'),fullPage:true,animations:'disabled'});}};
  const scope=require('../exam-scope-data.js').records[0],paper=require('../past-papers-data.js').papers.find(p=>p.files.length>1);
  const scopeURL=origin+'/exam-scope.html?record='+encodeURIComponent(scope.id),paperURL=origin+'/past-papers.html?paper='+encodeURIComponent(paper.id)+'&file=1';
  await page.goto(scopeURL);assert.equal(await page.evaluate(()=>localStorage.getItem('japan-study-journal:desk:v1')),null);await page.locator('.desk-favorite').click();assert.equal(await page.locator('.desk-favorite').getAttribute('aria-pressed'),'true');
  await page.evaluate(()=>localStorage.setItem('japan-study-journal:practice:v1','keep-quiz'));
  await page.goto(paperURL);const beforeBrowse=await page.evaluate(()=>localStorage.getItem('japan-study-journal:desk:v1'));await page.locator('.paper-files button').first().click();await page.locator('.paper-files button').nth(1).click();assert.equal(await page.evaluate(()=>localStorage.getItem('japan-study-journal:desk:v1')),beforeBrowse);await page.locator('.desk-favorite').click();assert.equal(await page.locator('.desk-favorite').getAttribute('aria-pressed'),'true');
  await page.goto(origin+'/desk.html');assert.equal(await page.locator('.desk-item').count(),2);assert.equal(await page.locator('#desk-continue,#desk-tab-recent,#desk-clear-recent').count(),0);assert.match(await page.locator('.desk-item a[href^="past-papers.html"]').getAttribute('href'),/file=1/);await shot('desk-desktop');
  await page.fill('#desk-query','no-match');assert.equal(await page.locator('#desk-empty').isVisible(),true);await page.fill('#desk-query','');
  await page.selectOption('#desk-type','paper');assert.equal(await page.locator('.desk-item').count(),1);await page.selectOption('#desk-type','');
  const downloadPromise=page.waitForEvent('download');await page.locator('#desk-export').click();const download=await downloadPromise,backup=fs.readFileSync(await download.path(),'utf8');assert.equal(core.parse(backup).items.length,2);
  for(const width of [390,801,900,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);if(width===390){await shot('desk-mobile');await page.locator('.menu-button').click();assert.equal(await page.locator('#mobile-nav').isVisible(),true);await page.keyboard.press('Escape');}}
  const reader=await context.newPage();reader.on('pageerror',e=>errors.push(String(e)));await reader.goto(scopeURL);assert.equal(await reader.locator('.desk-favorite').getAttribute('aria-pressed'),'true');
  await page.locator('.desk-item').filter({has:page.locator('a[href^="exam-scope.html"]')}).locator('button').click();
  await reader.waitForFunction(()=>document.querySelector('.desk-favorite').getAttribute('aria-pressed')==='false');await reader.locator('.desk-favorite').click();await page.waitForFunction(()=>document.querySelector('#desk-favorites-count').textContent==='2');
  await reader.close();
  await page.locator('.desk-backup summary').click();page.once('dialog',d=>d.dismiss());await page.locator('#desk-clear-all').click();assert.equal(await page.locator('#desk-favorites-count').textContent(),'2');
  page.once('dialog',d=>d.accept());await page.locator('#desk-clear-all').click();assert.equal(await page.locator('#desk-favorites-count').textContent(),'0');assert.equal(await page.evaluate(()=>localStorage.getItem('japan-study-journal:practice:v1')),'keep-quiz');
  const imported=await browser.newPage();imported.on('pageerror',e=>errors.push(String(e)));await imported.goto(origin+'/desk.html');assert.equal(await imported.locator('#desk-favorites-count').textContent(),'0');
  const upload=raw=>imported.locator('#desk-file').setInputFiles({name:'desk.json',mimeType:'application/json',buffer:Buffer.from(raw)});
  await upload(backup);await imported.waitForFunction(()=>document.querySelector('#desk-favorites-count').textContent==='2');await upload(backup);await imported.waitForFunction(()=>document.querySelector('#desk-status').textContent.includes('备份已合并'));assert.equal(await imported.locator('.desk-item').count(),2);
  await upload('{broken');await imported.waitForFunction(()=>document.querySelector('#desk-status').textContent.includes('操作未完成'));assert.equal(await imported.locator('.desk-item').count(),2);
  const missing={version:1,items:[{type:'scope',id:'removed-item',title:'<img src=x onerror=alert(1)>',subtitle:'Removed catalog entry',file:0,admission:'general',favoriteAt:1,lastOpenedAt:1,href:'javascript:alert(1)'}]};
  await upload(JSON.stringify(missing));await imported.waitForFunction(()=>document.querySelector('#desk-favorites-count').textContent==='3');assert.equal(await imported.locator('#desk-list img').count(),0);
  await imported.locator('a[href*="record=removed-item"]').click();await imported.waitForLoadState('domcontentloaded');assert.match(await imported.locator('#scope-context-note').textContent(),/已不在/);
  const blocked=await browser.newPage();blocked.on('pageerror',e=>errors.push(String(e)));await blocked.addInitScript(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='japan-study-journal:desk:v1')throw new DOMException('Quota exceeded','QuotaExceededError');return set.call(this,k,v);};});
  await blocked.goto(scopeURL);assert.equal(await blocked.locator('.desk-favorite').isDisabled(),false);await blocked.locator('.desk-favorite').click();assert.equal(await blocked.locator('.desk-favorite').getAttribute('aria-pressed'),'false');assert.match(await blocked.locator('.desk-controls').textContent(),/未能保存或读取/);
  const legacy=await browser.newPage();await legacy.goto(origin+'/desk.html');
  await legacy.evaluate(({scope})=>localStorage.setItem('japan-study-journal:desk:v1',JSON.stringify({version:1,items:[{type:'scope',id:scope.id,title:scope.department,subtitle:scope.graduateSchool,file:0,admission:'general',favoriteAt:10,lastOpenedAt:50},{type:'scope',id:'history-only',title:'Old reading',subtitle:'Old school',file:0,admission:'general',favoriteAt:0,lastOpenedAt:60}]})),{scope});
  await legacy.reload();assert.equal(await legacy.locator('.desk-item').count(),1);assert.equal(await legacy.evaluate(()=>localStorage.getItem('japan-study-journal:desk:v1').includes('lastOpenedAt')),false);
  assert.deepEqual(errors,[]);console.log('Desk checks passed: bookmarks, no automatic reading writes, legacy history cleanup, search, export/import, cross-tab sync, safe content, missing records, quota failures, cleanup isolation and four widths.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
