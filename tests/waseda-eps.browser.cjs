const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright'),root=path.join(__dirname,'..');
(async()=>{
 const entries=require('../question-bank-index.json').papers.filter(p=>p.id.startsWith('waseda-eps-')&&(!process.env.WASEDA_YEARS||process.env.WASEDA_YEARS.split(',').includes(p.id.split('-').at(-1))));assert.ok(entries.length,'Waseda EPS entries must be registered');
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.STUDY_ROOM_BROWSER||undefined,headless:true,args:['--no-sandbox']});
  for(const width of [390,800,1440])for(const entry of entries){
   const paper=JSON.parse(fs.readFileSync(path.join(root,entry.data))),page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:2,reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.goto(`http://127.0.0.1:${server.address().port}/question-practice.html?paper=${entry.id}`);await page.locator('#app').waitFor();
   assert.equal(await page.locator('#question-directory button').count(),paper.questions.length);assert.match(await page.locator('#paper-heading').innerText(),/早[稲稻]田/);assert.match(await page.locator('#paper-heading').innerText(),new RegExp(paper.source.year+'年9月'));
   assert.match(await page.locator('#paper-source').innerText(),/電子物理システム学専攻/);assert.equal(await page.locator('iframe,object,embed').count(),0);
   for(const [n,q]of paper.questions.entries()){
    await page.locator('#question-directory button').nth(n).click();await page.waitForFunction(()=>[...document.querySelectorAll('#common-content img,#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(new URL(page.url()).searchParams.get('q'),q.id);assert.equal(await page.locator('#original-link').getAttribute('href'),paper.source.pdf+'#page='+q.parts[0].page);
    assert.equal(await page.locator('#question-content img').count(),q.parts.length);assert.equal(await page.locator('#common-content img').count(),paper.commonParts.length);
    assert.deepEqual(await page.locator('#question-content img').evaluateAll(es=>es.map(e=>[e.naturalWidth,e.naturalHeight])),q.parts.map(p=>[p.width,p.height]));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.locator('#enlarge').click();assert.equal(await page.locator('#image-dialog').isVisible(),true);assert.equal(await page.locator('#zoom-content img').count(),q.parts.length+paper.commonParts.length);await page.keyboard.press('Escape');assert.equal(await page.locator('#image-dialog').isVisible(),false);
    if(process.env.STUDY_ROOM_SCREENSHOTS&&(width===1440||n===0)){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await page.addStyleTag({content:'.practice-return,.workspace-bar{position:static!important}'});await page.locator('#question-content').screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`${entry.id}-q${n+1}-${width}.png`)});if(n===0)await page.locator('.common').screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`${entry.id}-common-${width}.png`)});}
   }
   assert.deepEqual(errors,[]);assert.equal(await page.getByText('答案',{exact:true}).count(),0);await page.close();
  }
  console.log(`Waseda EPS browser checks passed: ${entries.length} admission batches, all questions at 390/800/1440, source links, original pixels, shared instructions/corrections, zoom and no overflow`);
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
