const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright'),root=path.join(__dirname,'..'),catalog=require('../question-catalog.json');
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser;
 try {
 browser=await chromium.launch({executablePath:process.env.STUDY_ROOM_BROWSER||undefined,headless:true,args:['--no-sandbox']});
 const first=catalog.questions.find(q=>q.id==='waseda-eps-2025-mechanics1-q1');
 const second=catalog.questions.find(q=>q.id==='tus-electrical-2002-general-denjiki-q5');
 for(const width of [390,800,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(origin+'/question-hub.html');await page.locator('#start:enabled').waitFor();
  await page.evaluate(({first,second})=>{localStorage.setItem('japan-study-journal:question-practice:v1',JSON.stringify({version:1,records:{[first.id]:{bookmarked:true,note:'existing note'},[second.id]:{bookmarked:true}}}));localStorage.setItem('japan-study-journal:practice:v1','{"sentinel":true}');},{first,second});
  await page.reload();await page.locator('#start:enabled').waitFor();
  await page.selectOption('#scope','bookmarked');assert.equal(await page.locator('#question-results li').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`question-hub-${width}.png`),fullPage:true});}
  await page.locator('#start').click();await page.locator('#app').waitFor();
  assert.match(page.url(),new RegExp(first.id));assert.equal(await page.locator('#nav-position').innerText(),'1 / 2');
  assert.equal(await page.locator('#question-note').inputValue(),'existing note');
  if(width<=800)assert.equal(await page.locator('#directory-disclosure').getAttribute('open'),null);
  const nav=await page.locator('.question-nav').boundingBox();assert.ok(nav.y>=0&&nav.y+nav.height<=901);
  await page.waitForFunction(()=>[...document.querySelectorAll('#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
  if(process.env.STUDY_ROOM_SCREENSHOTS)await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`question-flow-${width}.png`)});
  await page.locator('#complete-next').click();await page.waitForURL(new RegExp(second.id));await page.locator('#app').waitFor();
  assert.equal(await page.locator('#nav-position').innerText(),'2 / 2');
  assert.match(await page.locator('#question-source').innerText(),/東京理科大学/);
  const paper=JSON.parse(fs.readFileSync(path.join(root,`assets/question-bank/${second.paper}/paper.json`)));
  const q=paper.questions.find(q=>q.id===second.id),bank=require('../question-bank.js');
  assert.equal(await page.locator('#common-content img').count(),bank.commonPartsForQuestion(paper,q).length);
  assert.equal(await page.locator('#original-link').getAttribute('href'),bank.sourceForQuestion(paper,q).pdf+'#page='+q.parts[0].page);
  await page.locator('#previous').click();await page.waitForURL(new RegExp(first.id));await page.locator('#app').waitFor();
  assert.equal(await page.locator('#complete').innerText(),'取消已练习标记');
  await page.locator('#next').click();await page.waitForURL(new RegExp(second.id));await page.locator('#app').waitFor();
  await page.locator('#complete-next').click();assert.equal(await page.locator('#queue-finish').isVisible(),true);
  await page.locator('#queue-finish').click();await page.locator('#start:enabled').waitFor();
  assert.equal(await page.locator('#scope').inputValue(),'bookmarked');
  await page.selectOption('#scope','unanswered');await page.fill('#search',first.id); // Search empty result still allows reset.
  await page.locator('#reset').click();await page.fill('#search',first.title);assert.equal(await page.locator('#question-results li').count(),1);
  await page.selectOption('#scope','unanswered');assert.equal(await page.locator('#question-results li').count(),0);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('japan-study-journal:practice:v1')).sentinel),true);
  // No saved last-position or automatic resume: the hub remains the entry point.
  await page.goto(origin+'/question-hub.html');await page.locator('#start:enabled').waitFor();assert.match(page.url(),/question-hub.html$/);
  assert.deepEqual(errors,[]);await page.close();
 }
 // Single-year queues can continue in either direction without losing filters or records.
 for(const width of [390,800,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  const sample=catalog.questions.find(q=>q.paper==='waseda-eps-2023');
  const filters=new URLSearchParams({school:sample.school,major:sample.majorKey,year:'2023',subject:'力学',scope:'unanswered',order:'random'});
  await page.goto(origin+'/question-hub.html?'+filters);await page.locator('#start:enabled').waitFor();
  assert.equal(await page.locator('#order').inputValue(),'random');
  await page.locator('#start').click();await page.locator('#app').waitFor();
  assert.equal(await page.locator('#year-navigation').isVisible(),false);
  const last=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('japan-study-journal:question-queue:v1')).items.at(-1));
  await page.goto(origin+`/question-practice.html?paper=${last.paper}&q=${last.id}&queue=1`);
  await page.locator('#previous-year:enabled').waitFor();assert.equal(await page.locator('#next').isDisabled(),true);
  assert.match(await page.locator('#previous-year').innerText(),/2022/);assert.match(await page.locator('#next-year').innerText(),/2024/);
  await page.locator('#notes summary').click();await page.fill('#question-note','年份切换保留笔记');await page.locator('#complete-next').click();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  const bar=await page.locator('.question-nav').boundingBox();assert.ok(bar.y>=0&&bar.y+bar.height<=901);
  if(process.env.STUDY_ROOM_SCREENSHOTS)await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`question-years-${width}.png`)});
  await page.locator('#previous-year').click();await page.waitForURL(/paper=waseda-eps-2022/);await page.locator('#app').waitFor();
  const saved=await page.evaluate(()=>({queue:JSON.parse(sessionStorage.getItem('japan-study-journal:question-queue:v1')),query:sessionStorage.getItem('japan-study-journal:question-hub-return'),records:JSON.parse(localStorage.getItem('japan-study-journal:question-practice:v1')).records}));
  const expected=catalog.questions.filter(q=>q.paper==='waseda-eps-2022'&&q.subjects.includes('力学')).map(q=>q.id).sort();
  assert.deepEqual(saved.queue.items.map(q=>q.id).sort(),expected);
  assert.equal(new URLSearchParams(saved.query).get('year'),'2022');assert.equal(new URLSearchParams(saved.query).get('subject'),'力学');assert.equal(new URLSearchParams(saved.query).get('order'),'random');
  assert.equal(saved.records[last.id].note,'年份切换保留笔记');assert.equal(saved.records[last.id].completed,true);
  const end=saved.queue.items.at(-1);await page.goto(origin+`/question-practice.html?paper=${end.paper}&q=${end.id}&queue=1`);
  await page.locator('#next-year:enabled').waitFor();await page.locator('#next-year').click();await page.waitForURL(/paper=waseda-eps-2023/);await page.locator('#app').waitFor();
  assert.deepEqual(errors,[]);await page.close();
 }
 // Direct-paper practice retains the exam track, even after a second year switch.
 {
  const page=await browser.newPage();await page.goto(origin+'/question-practice.html?paper=tus-electrical-2024-intl');await page.locator('#app').waitFor();
  await page.locator('#question-directory button').last().click();await page.locator('#next-year:enabled').waitFor();
  assert.equal(await page.locator('#previous-year').isDisabled(),true);
  await page.locator('#next-year').click();await page.waitForURL(/paper=tus-electrical-2025-intl/);await page.locator('#app').waitFor();
  await page.locator('#question-directory button').last().click();await page.locator('#previous-year:enabled').waitFor();
  assert.equal(await page.locator('#next-year').isDisabled(),true);await page.locator('#previous-year').click();await page.waitForURL(/paper=tus-electrical-2024-intl/);await page.close();
 }
 // Missing queues gracefully preserve direct-paper practice.
 const page=await browser.newPage();await page.goto(origin+`/question-practice.html?paper=${first.paper}&q=${first.id}&queue=1`);await page.locator('#app').waitFor();assert.match(await page.locator('#storage-status').innerText(),/失效/);await page.close();
 console.log('Question flow browser checks passed at 390, 800 and 1440px.');
 }finally{if(browser)await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
