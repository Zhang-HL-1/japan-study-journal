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
   await page.goto(origin+'/question-practice.html?paper=kobe-ee-2026-denjiki');await page.locator('#app').waitFor();
   assert.doesNotMatch(await page.locator('.intro .eyebrow').innerText(),/DEMO|Demo/);
   assert.match(await page.locator('.source-info summary').innerText(),/关于这份试卷/);
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
   const download=page.waitForEvent('download');await page.locator('#export-records').click();assert.match((await download).suggestedFilename(),/逐题练习/);
   await page.locator('#complete').click();assert.equal(await page.locator('#completed-count').textContent(),'0 / 2');
   assert.deepEqual(errors,[]);await page.close();
  }
  for(const width of [390,800,1440]) {
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   await page.goto(origin+'/drill.html');await page.waitForFunction(()=>document.documentElement.dataset.questionBank==='ready');
   if(width<=800) await page.locator('.filter-summary').click();
   await page.selectOption('#practiceMode','questions');await page.selectOption('#school','東京理科大学');
   const major=JSON.stringify(['東京理科大学','工学研究科','電気工学専攻']);
   await page.selectOption('#major',major);await page.selectOption('#paperYear','2025');await page.selectOption('#subject','电磁回路');
   const value=await page.locator('#practice-picker option').evaluateAll(es=>es.find(e=>e.textContent.includes('外国人留学生')).value);
   await page.selectOption('#practice-picker',value);assert.match(await page.locator('#question-title').innerText(),/外国人留学生/);
   await page.locator('#question-set-links a').first().click();await page.locator('#app').waitFor();await page.locator('#next').click();
   await page.locator('#focus-mode').click();await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
   assert.equal(await page.locator('#back-to-practice').isVisible(),true);
   assert.equal(await page.locator('#back-to-practice').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),true);
   await page.route('**/assets/question-bank/**/paper.json',async route=>{await new Promise(resolve=>setTimeout(resolve,300));await route.continue();});
   await page.locator('#back-to-practice').click();await page.waitForURL('**/drill.html#question-card');await page.waitForFunction(()=>document.documentElement.dataset.questionBank==='ready');
   assert.equal(await page.locator('#practiceMode').inputValue(),'questions');assert.equal(await page.locator('#school').inputValue(),'東京理科大学');assert.equal(await page.locator('#major').inputValue(),major);assert.equal(await page.locator('#paperYear').inputValue(),'2025');assert.equal(await page.locator('#subject').inputValue(),'电磁回路');
   assert.match(await page.locator('#question-title').innerText(),/外国人留学生/);assert.equal(new URL(page.url()).hash,'#question-card');await page.close();
  }
  const bad=await browser.newPage();await bad.goto(origin+'/question-practice.html?paper=not-found');await bad.locator('#load-status').filter({hasText:'尚未接入'}).waitFor();assert.equal(await bad.locator('#app').isHidden(),true);
  await bad.route('**/paper.json',r=>r.abort());await bad.goto(origin+'/question-practice.html?paper=kobe-ee-2026-denjiki');await bad.locator('#load-status').filter({hasText:'刷新重试'}).waitFor();await bad.close();
  const corrupt=await browser.newPage();await corrupt.addInitScript(()=>localStorage.setItem('japan-study-journal:question-demo:v1','broken'));await corrupt.goto(origin+'/question-practice.html?paper=kobe-ee-2026-denjiki');await corrupt.locator('#app').waitFor();await corrupt.locator('#complete').click();assert.equal(await corrupt.evaluate(()=>localStorage.getItem('japan-study-journal:question-demo:v1')),'broken');assert.equal(await corrupt.evaluate(()=>localStorage.getItem('japan-study-journal:question-practice:v1')),null);assert.match(await corrupt.locator('#storage-status').textContent(),/无法读取或保存/);await corrupt.close();
  const legacy=await browser.newPage();
  await legacy.addInitScript(()=>localStorage.setItem('japan-study-journal:question-demo:v1',JSON.stringify({version:1,records:{'kobe-ee-2026-denjiki-q1':{completed:true,bookmarked:false,note:'旧记录',updatedAt:4}}})));
  await legacy.goto(origin+'/question-practice.html?paper=kobe-ee-2026-denjiki&q=kobe-ee-2026-denjiki-q1');await legacy.locator('#app').waitFor();
  assert.equal(await legacy.locator('#question-note').inputValue(),'旧记录');assert.match(await legacy.locator('#completion-status').textContent(),/已练习/);
  await legacy.locator('#bookmark').click();
  const migrated=await legacy.evaluate(()=>({formal:JSON.parse(localStorage.getItem('japan-study-journal:question-practice:v1')),legacy:JSON.parse(localStorage.getItem('japan-study-journal:question-demo:v1')),practice:localStorage.getItem('japan-study-journal:practice:v1')}));
  assert.equal(migrated.formal.records['kobe-ee-2026-denjiki-q1'].completed,true);assert.equal(migrated.formal.records['kobe-ee-2026-denjiki-q1'].bookmarked,true);assert.equal(migrated.formal.records['kobe-ee-2026-denjiki-q1'].note,'旧记录');
  assert.equal(migrated.legacy.records['kobe-ee-2026-denjiki-q1'].note,'旧记录');assert.equal(migrated.practice,null);await legacy.close();
  const chooser=await browser.newPage();await chooser.goto(origin+'/question-practice.html');await chooser.locator('#paper-chooser a').first().waitFor();
  const ids=require('../question-bank-index.json').papers.map(paper=>paper.id);
  assert.equal(await chooser.locator('#paper-chooser a').count(),ids.length);assert.equal(await chooser.locator('#app').isHidden(),true);
  const hrefs=await chooser.locator('#paper-chooser a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  for (const id of ids) assert.ok(hrefs.includes('question-practice.html?paper='+id),id);
  assert.doesNotMatch(await chooser.locator('body').innerText(),/DEMO|Demo|样例/);await chooser.close();
  const tusPapers=[['tus-ee-2025-denshi',4],['tus-ee-2025-kairo',3],['tus-ee-2025-sugaku',4],['tus-ee-2025-denjiki',3],['tus-ee-2025-intl',1],['tus-electrical-2025-general',10],['tus-electrical-2025-intl',9],['tus-electrical-2024-general',11],['tus-electrical-2024-intl',10],['tus-electrical-2023-general',11],['tus-electrical-2021-general',11],['tus-electrical-2016-general',8],['tus-electrical-2015-general',8],['tus-electrical-2014-general',8],['tus-electrical-2012-general',8],['tus-electrical-2011-general',8],['tus-electrical-2010-general',9],['tus-electrical-2009-general',8],['tus-electrical-2013-general',7],['tus-electrical-2008-general',8],['tus-electrical-2007-general',8],['tus-electrical-2005-general',6],['tus-electrical-2004-general',8],['tus-electrical-2002-general',9],['tus-electrical-2001-general',11],['tus-electrical-2000-general',9],['tus-electrical-1999-general',4],['tus-electrical-1998-general',1]];
  const aliasPage=await browser.newPage();
  const oldId='tus-electrical-2025-general-kairo',oldQuestion=oldId+'-q2';
  await aliasPage.addInitScript(({question})=>localStorage.setItem('japan-study-journal:question-practice:v1',JSON.stringify({version:1,records:{[question]:{completed:true,bookmarked:true,note:'合卷前笔记',updatedAt:100}}})),{question:oldQuestion});
  await aliasPage.goto(origin+'/question-practice.html?paper='+oldId+'&q='+oldQuestion);await aliasPage.locator('#app').waitFor();
  assert.equal(new URL(aliasPage.url()).searchParams.get('paper'),'tus-electrical-2025-general');assert.equal(new URL(aliasPage.url()).searchParams.get('q'),oldQuestion);
  assert.equal(await aliasPage.locator('#question-note').inputValue(),'合卷前笔记');assert.equal(await aliasPage.locator('#bookmark').getAttribute('aria-pressed'),'true');assert.equal(await aliasPage.locator('#completed-count').textContent(),'1 / 10');
  assert.match(await aliasPage.locator('#question-title').innerText(),/^电气回路：/);await aliasPage.close();
  const scienceTokyoPapers=[['science-tokyo-ee-1990',3],['science-tokyo-ee-1993',5],['science-tokyo-ee-1994',3],['science-tokyo-ee-1995',3],['science-tokyo-ee-1996',4],['science-tokyo-ee-1997',4],['science-tokyo-ee-1998',3],['science-tokyo-ee-1999-kairo',1],['science-tokyo-ee-1999-denjiki',1],['science-tokyo-ee-2000-kairo',1],['science-tokyo-ee-2000-denjiki',1],['science-tokyo-ee-2001-am',3],['science-tokyo-ee-2001-pm',4],['science-tokyo-ee-2002-am',3],['science-tokyo-ee-2002-pm',4],['science-tokyo-ee-2003-am',5],['science-tokyo-ee-2003-pm',9],['science-tokyo-ee-2004-am',8],['science-tokyo-ee-2004-pm',9],['science-tokyo-ee-2005-kairo',2],['science-tokyo-ee-2005-denjiki',3],['science-tokyo-ee-2006-kairo',4],['science-tokyo-ee-2006-denjiki',2],['science-tokyo-ee-2007-kairo',3],['science-tokyo-ee-2007-denjiki',2],['science-tokyo-ee-2008-kairo',3],['science-tokyo-ee-2008-denjiki',2],['science-tokyo-ee-2009-kairo',2],['science-tokyo-ee-2009-denjiki',2],['science-tokyo-ee-2010-kairo',4],['science-tokyo-ee-2010-denjiki',3],['science-tokyo-ee-2011-kairo',2],['science-tokyo-ee-2011-denjiki',2],['science-tokyo-ee-2012-sugaku',3],['science-tokyo-ee-2012-kairo',4],['science-tokyo-ee-2012-denjiki',2],['science-tokyo-ee-2013-sugaku',4],['science-tokyo-ee-2013-kairo',4],['science-tokyo-ee-2013-denjiki',2],['science-tokyo-ee-2014-sugaku',3],['science-tokyo-ee-2014-kairo',3],['science-tokyo-ee-2014-denjiki',3],['science-tokyo-ee-2015-sugaku',3],['science-tokyo-ee-2015-kairo',3],['science-tokyo-ee-2015-denjiki',3],['science-tokyo-ee-2016',10],['science-tokyo-ee-2017',10],['science-tokyo-ee-2018',10],['science-tokyo-ee-2019',8],['science-tokyo-ee-2021',8],['science-tokyo-ee-2022',8],['science-tokyo-ee-2023',8],['science-tokyo-ee-2024',8],['science-tokyo-ee-2025',8]];
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
    if(id.startsWith('tus-electrical-')) {
     assert.match(await page.locator('#paper-source').innerText(),/工学研究科 \/ 電気工学専攻/);
     assert.match(await page.locator('#paper-source').innerText(),new RegExp(id.split('-')[2]+' 入学年度'));
     for(let n=0;n<count;n++) {
      await page.locator('#question-directory button').nth(n).click();
      await page.waitForFunction(()=>[...document.querySelectorAll('#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      const expected=JSON.parse(fs.readFileSync(path.join(root,`assets/question-bank/${id}/paper.json`),'utf8')).questions[n];
      assert.equal(new URL(page.url()).searchParams.get('q'),expected.id);
      const collection=JSON.parse(fs.readFileSync(path.join(root,`assets/question-bank/${id}/paper.json`),'utf8'));
      const file=collection.source.files.find(f=>f.id===expected.sourceFileId);
      assert.equal(await page.locator('#original-link').getAttribute('href'),file.pdf+'#page='+expected.parts[0].page);
      assert.match(await page.locator('#question-title').innerText(),/^(电子回路|电气回路|电磁回路|电气通信|英语)：/);
      const commonSrc=await page.locator('#common-content img').evaluateAll(es=>es.map(e=>e.getAttribute('src')));
      assert.ok(commonSrc.every(src=>src.includes('/'+file.id+'/')));
      if(expected.layout==='source-page') {
       assert.equal(await page.locator('#question-content .source-page-parts').count(),new Set(expected.parts.map(p=>p.page)).size);
       const geometry=await page.locator('#question-content .source-page-parts').evaluateAll(sheets=>sheets.map(sheet=>({rect:sheet.getBoundingClientRect().toJSON(),parts:[...sheet.querySelectorAll('.crop-button')].map(el=>el.getBoundingClientRect().toJSON())})));
       for(const sheet of geometry)for(const part of sheet.parts){assert.ok(part.width>0&&part.height>0);assert.ok(part.left>=sheet.rect.left-1&&part.right<=sheet.rect.right+1);assert.ok(part.top>=sheet.rect.top-1&&part.bottom<=sheet.rect.bottom+1);}
       await page.locator('#enlarge').click();assert.equal(await page.locator('#zoom-content .source-page-parts').count(),new Set(expected.parts.map(p=>p.page)).size);
       await page.keyboard.press('Escape');assert.equal(await page.locator('#image-dialog').isVisible(),false);
      }
     }
     if(process.env.STUDY_ROOM_SCREENSHOTS&&(id==='tus-electrical-2025-general'||id.startsWith('tus-electrical-2024-')||id==='tus-electrical-2023-general'||id==='tus-electrical-2021-general'||id==='tus-electrical-2016-general'||id==='tus-electrical-2015-general'||id==='tus-electrical-2014-general'||id==='tus-electrical-2012-general'||id==='tus-electrical-2011-general'||id==='tus-electrical-2010-general'||id==='tus-electrical-2009-general'||id==='tus-electrical-2013-general'||id==='tus-electrical-2008-general'||id==='tus-electrical-2007-general'||id==='tus-electrical-2005-general'||id==='tus-electrical-2004-general'||id==='tus-electrical-2002-general'||id==='tus-electrical-2001-general'||id==='tus-electrical-2000-general'||id==='tus-electrical-1999-general'||id==='tus-electrical-1998-general')) {
      fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});
      await page.locator('#question-content').scrollIntoViewIfNeeded();
      await page.locator('#common-content img,#question-content img').evaluateAll(async es=>Promise.all(es.map(e=>e.decode())));
      await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`${id}-${width}.png`),fullPage:true});
     }
    }
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
    if(process.env.STUDY_ROOM_SCREENSHOTS&&(id==='science-tokyo-ee-2023'||id==='science-tokyo-ee-2013-denjiki'||id==='science-tokyo-ee-2015-sugaku'||id==='science-tokyo-ee-2009-kairo'||id==='science-tokyo-ee-2011-denjiki'||id==='science-tokyo-ee-2001-am'||id==='science-tokyo-ee-2004-pm'||id==='science-tokyo-ee-1993'||id==='science-tokyo-ee-1999-denjiki')&&(width===1440||width===390)){
     fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});
     await page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,`${id}-${width}.png`),fullPage:true});
    }
    if(count>1){
     const firstTitle=await page.locator('#question-title').innerText();
     await page.locator('#next').click();
     assert.notEqual(await page.locator('#question-title').innerText(),firstTitle);
     assert.match(page.url(),new RegExp('paper='+id+'&q='));
     await page.waitForFunction(()=>[...document.querySelectorAll('#question-content img')].every(i=>i.complete&&i.naturalWidth>0));
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    }
    assert.deepEqual(errors,[]);
    await page.close();
   }
  }
  console.log('Question demo browser checks passed: 390/800/1440, real PNGs, no embedded PDF, zoom/focus, deep links/history, isolated records, export, and failure states.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
