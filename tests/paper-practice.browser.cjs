const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.join(__dirname,'..');
const {chromium}=require('playwright'),bank=require('../questions.js'),index=require('../question-bank-index.json'),QuestionBank=require('../question-bank.js');
const sets=index.papers.map(entry=>QuestionBank.listingFromPaper(entry,JSON.parse(fs.readFileSync(path.join(root,entry.data),'utf8'))));
const all=bank.concat(sets);
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript; charset=utf-8':file.endsWith('.css')?'text/css':file.endsWith('.pdf')?'application/pdf':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.STUDY_ROOM_BROWSER||undefined,headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const shot=async name=>{if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,name+'.png'),fullPage:true});}};
  for(const width of [390,800,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(origin+'/drill.html');
   await page.waitForFunction(()=>document.documentElement.dataset.questionBank==='ready');
   assert.equal(await page.locator('#bank-size').textContent(),String(all.length));assert.equal(await page.locator('#answer-form').isHidden(),true);assert.equal(await page.getByText('Demo',{exact:true}).count(),0);
   assert.equal(await page.locator('#practice-paper-reader iframe').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   if (width <= 800) { assert.equal(await page.locator('#filter-disclosure').getAttribute('open'),null); await page.locator('.filter-summary').click(); }
   await page.locator('#advanced-filters > summary').click();
   await page.selectOption('#sourceKind','exam');await page.selectOption('#subject','电磁学');
   const matches=all.filter(q=>(q.subjects||[q.subject]).includes('电磁学'));assert.equal(await page.locator('#question-grid button').count(),matches.length);
   await page.selectOption('#school','神戸大学');await page.selectOption('#paperYear','2026');
   const kobe=matches.filter(q=>q.provenance.school==='神戸大学'&&q.paper.year===2026);assert.equal(await page.locator('#question-grid button').count(),kobe.length);
   assert.match(await page.locator('#question-source').textContent(),/神戸大学/);assert.match(await page.locator('#practice-paper-files button[aria-pressed=true]').textContent(),/電磁/);
   const buttons=page.locator('#practice-paper-files button');if(await buttons.count()>1){await buttons.last().click();assert.equal(await buttons.last().getAttribute('aria-pressed'),'true');}
   const pdfURL=await page.locator('#practice-paper-reader iframe').getAttribute('src');const pdf=await page.request.get(origin+'/'+pdfURL.split('#')[0]);assert.equal(pdf.status(),200);assert.ok((await pdf.body()).subarray(0,5).equals(Buffer.from('%PDF-')));
   if(await page.locator('.note-details').getAttribute('open')===null)await page.locator('.note-details summary').click();await page.fill('#question-note','原卷练习笔记');await page.locator('#complete-paper').click();assert.equal(await page.locator('#stat-accuracy').textContent(),'—');
   await page.reload();assert.equal(await page.locator('#question-note').inputValue(),'原卷练习笔记');assert.match(await page.locator('#paper-completion').textContent(),/本套已练习/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await shot('paper-practice-'+width);
   await page.locator('#complete-paper').click();
   if(width<=800) await page.locator('.filter-summary').click();
   await page.locator('#reset-filters').click();
   await page.selectOption('#practiceMode','questions');await page.selectOption('#school','東京理科大学');await page.selectOption('#subject','电子电路');
   assert.equal(await page.locator('#question-grid button').count(),1);assert.equal(await page.locator('#practice-paper-reader iframe').count(),0);
   assert.equal(await page.locator('#question-set-links a').first().getAttribute('href'),'question-practice.html?paper=tus-ee-2025-denshi');
   assert.match(await page.locator('#question-set-items a').first().getAttribute('href'),/paper=tus-ee-2025-denshi&q=/);
   await page.selectOption('#school','東京科学大学');await page.selectOption('#paperYear','2025');await page.selectOption('#subject','电磁学');
   assert.equal(await page.locator('#question-grid button').count(),1);assert.match(await page.locator('#question-title').textContent(),/东京科学大学/);
   assert.equal(await page.locator('#question-set-links a').first().getAttribute('href'),'question-practice.html?paper=science-tokyo-ee-2025');
   await page.locator('#reset-filters').click();
  }
  await page.selectOption('#practice-picker','3');assert.match(await page.locator('#position').textContent(),/^4 \/ /);
  await page.locator('#focus-practice').click();assert.equal(await page.locator('.filter-panel').isVisible(),false);await page.keyboard.press('Escape');assert.equal(await page.locator('.filter-panel').isVisible(),true);
  await page.selectOption('#school','上智大学');assert.equal(await page.locator('#practice-reference-links a').count()>0,true);assert.match(await page.locator('#practice-answer-status').textContent(),/附有参考解答/);
  await page.locator('#advanced-filters > summary').click();await page.selectOption('#sourceKind','workbook');assert.equal(await page.locator('#question-card').isHidden(),true);assert.equal(await page.locator('#practice-paper-reader iframe').count(),0);
  await page.locator('#reset-filters').click();await page.locator('.storage-tools > summary').click();await page.locator('#export-progress').click();
  const broken=await browser.newPage();await broken.route('**/paper-practice-data.js*',r=>r.abort());await broken.goto(origin+'/drill.html');assert.equal(await broken.locator('#list-count').textContent(),'题库加载失败');
  assert.deepEqual(errors,[]);console.log('Whole-paper browser checks passed at 390/800/1440px: sources, subject/year filters, actual PDFs, completion, reload, notes, answer links, empty and load-failure states.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
