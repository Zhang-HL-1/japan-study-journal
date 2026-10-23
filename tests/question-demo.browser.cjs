const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.STUDY_ROOM_BROWSER||undefined,headless:true,args:['--no-sandbox']});
  for(const width of [390,800,1440]){
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.addInitScript(()=>localStorage.setItem('japan-study-journal:practice:v1',JSON.stringify({sentinel:'existing-paper-records'})));
   await page.goto(origin+'/question-practice.html');await page.locator('#app').waitFor();
   const shot=async suffix=>{if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`question-demo-${width}-${suffix}.png`),fullPage:true});}};
   assert.equal(await page.locator('iframe,object,embed').count(),0);
   assert.match(await page.locator('#paper-source').innerText(),/2026 入学年度/);
   assert.equal(await page.locator('#question-directory button').count(),2);assert.equal(await page.locator('#question-content img').count(),3);
   await page.waitForFunction(()=>[...document.querySelectorAll('#common-content img,#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.match(await page.locator('#original-link').getAttribute('href'),/#page=1$/);
   await shot('q1');
   await page.locator('#enlarge').click();assert.equal(await page.locator('#image-dialog').isVisible(),true);assert.equal(await page.locator('#zoom-content img').count(),4);
   await page.locator('#zoom-in').click();assert.equal(await page.locator('#zoom-level').textContent(),'125%');await page.keyboard.press('Escape');assert.equal(await page.locator('#image-dialog').isVisible(),false);assert.equal(await page.locator('#enlarge').evaluate(e=>e===document.activeElement),true);
   await page.locator('#bookmark').click();await page.locator('#complete').click();await page.locator('#notes summary').click();await page.fill('#question-note','第 1 题：边界条件待复习');
   await page.locator('#next').click();assert.match(page.url(),/q=kobe-ee-2026-denjiki-q2/);assert.match(await page.locator('#original-link').getAttribute('href'),/#page=2$/);
   assert.equal(await page.locator('#question-note').inputValue(),'');assert.equal(await page.locator('#bookmark').getAttribute('aria-pressed'),'false');assert.equal(await page.locator('#completed-count').textContent(),'1 / 2');
   await page.waitForFunction(()=>[...document.querySelectorAll('#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
   await shot('q2');
   await page.locator('#question-content button').last().click();assert.equal(await page.locator('#zoom-content img').count(),1);await page.locator('#close-zoom').click();
   await page.locator('#focus-mode').click();assert.equal(await page.locator('.sidebar').isVisible(),false);await page.locator('#focus-mode').click();
   await page.goBack();assert.equal(await page.locator('#question-note').inputValue(),'第 1 题：边界条件待复习');await page.reload();await page.locator('#app').waitFor();
   assert.equal(await page.locator('#bookmark').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#completed-count').textContent(),'1 / 2');
   assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('japan-study-journal:practice:v1')).sentinel),'existing-paper-records');
   const download=page.waitForEvent('download');await page.locator('#export-records').click();assert.match((await download).suggestedFilename(),/Demo/);
   await page.locator('#complete').click();assert.equal(await page.locator('#completed-count').textContent(),'0 / 2');
   assert.deepEqual(errors,[]);await page.close();
  }
  const bad=await browser.newPage();await bad.goto(origin+'/question-practice.html?paper=not-found');await bad.locator('#load-status').filter({hasText:'尚未接入'}).waitFor();assert.equal(await bad.locator('#app').isHidden(),true);
  await bad.route('**/paper.json',r=>r.abort());await bad.goto(origin+'/question-practice.html');await bad.locator('#load-status').filter({hasText:'刷新重试'}).waitFor();await bad.close();
  const corrupt=await browser.newPage();await corrupt.addInitScript(()=>localStorage.setItem('japan-study-journal:question-demo:v1','broken'));await corrupt.goto(origin+'/question-practice.html');await corrupt.locator('#app').waitFor();await corrupt.locator('#complete').click();assert.equal(await corrupt.evaluate(()=>localStorage.getItem('japan-study-journal:question-demo:v1')),'broken');assert.match(await corrupt.locator('#storage-status').textContent(),/无法读取或保存/);await corrupt.close();
  const tusPapers=[['tus-ee-2025-denshi',4],['tus-ee-2025-kairo',3],['tus-ee-2025-sugaku',4],['tus-ee-2025-denjiki',3],['tus-ee-2025-intl',1]];
  const scienceTokyoPapers=[['science-tokyo-ee-2023',8],['science-tokyo-ee-2024',8],['science-tokyo-ee-2025',8]];
  for(const width of [390,800,1440]){
   for(const [id,count] of tusPapers){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    await page.goto(`${origin}/question-practice.html?paper=${id}`);
    await page.locator('#app').waitFor();
    assert.equal(await page.locator('iframe,object,embed').count(),0);
    assert.equal(await page.locator('#question-directory button').count(),count);
    await page.waitForFunction(()=>[...document.querySelectorAll('#common-content img,#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.match(await page.locator('#paper-heading').innerText(),/东京理科大学/);
    assert.equal(await page.getByText('答案',{exact:true}).count(),0);
    assert.deepEqual(errors,[]);
    await page.close();
   }
  }
  for(const width of [390,800,1440]){
   for(const [id,count] of scienceTokyoPapers){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    await page.goto(`${origin}/question-practice.html?paper=${id}`);
    await page.locator('#app').waitFor();
    assert.equal(await page.locator('iframe,object,embed').count(),0);
    assert.equal(await page.locator('#question-directory button').count(),count);
    await page.waitForFunction(()=>[...document.querySelectorAll('#common-content img,#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.match(await page.locator('#paper-heading').innerText(),/东京科学大学/);
    assert.match(await page.locator('#paper-source').innerText(),/年实施/);
    assert.doesNotMatch(await page.locator('#paper-source').innerText(),/入学年度/);
    assert.match(await page.locator('#question-source').innerText(),/年实施/);
    assert.equal(await page.getByText('答案',{exact:true}).count(),0);
    if(process.env.STUDY_ROOM_SCREENSHOTS&&id==='science-tokyo-ee-2023'&&(width===1440||width===390)){
     fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});
     await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`science-tokyo-ee-2023-${width}.png`),fullPage:true});
    }
    const first=await page.locator('#question-number').innerText();
    await page.locator('#next').click();
    assert.notEqual(await page.locator('#question-number').innerText(),first);
    assert.match(page.url(),new RegExp('paper='+id));
    await page.waitForFunction(()=>[...document.querySelectorAll('#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.deepEqual(errors,[]);
    await page.close();
   }
  }
  console.log('Question demo browser checks passed: 390/800/1440, real PNGs, no embedded PDF, zoom/focus, deep links/history, isolated records, export, and failure states.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
