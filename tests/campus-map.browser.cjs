// Run with CAMPUS_MAP_BROWSER=/absolute/path/to/chromium node tests/campus-map.browser.cjs.
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':file.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CAMPUS_MAP_BROWSER||undefined,headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1440,height:1080}}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(origin+'/campus-map.html');await page.waitForSelector('.map-marker');
  assert.match(await page.locator('#map-total').textContent(),/23.*55/);assert.equal(await page.locator('.campus-row').count(),55);
  assert.equal(await page.locator('#map-land path').count(),47);
  const sum=await page.locator('.map-marker').evaluateAll(nodes=>nodes.reduce((n,e)=>n+Number(e.dataset.count),0));assert.equal(sum,55);
  let transform=await page.locator('#map-land').getAttribute('transform');
  await page.locator('#map-plus').click();assert.notEqual(await page.locator('#map-land').getAttribute('transform'),transform);
  await page.locator('#map-minus').click();await page.locator('#map-fit').click();
  const cluster=page.locator('.map-marker.cluster').first(),before=await page.locator('#map-land').getAttribute('transform');await cluster.click();assert.notEqual(await page.locator('#map-land').getAttribute('transform'),before);
  await page.selectOption('#map-school','meiji');await page.selectOption('#map-graduate','先端数理科学研究科');assert.equal(await page.locator('.campus-row').count(),1);assert.match(await page.locator('.campus-row').textContent(),/中野/);
  await page.locator('.map-marker[data-campus="meiji-nakano"]').click();assert.match(await page.locator('#map-detail').textContent(),/先端数理科学研究科/);
  await page.locator('#map-detail .unit a').click();await page.waitForFunction(()=>document.getElementById('scope-school')?.value==='meiji');assert.equal(await page.locator('#scope-school').inputValue(),'meiji');assert.equal(await page.locator('#scope-graduate').inputValue(),'先端数理科学研究科');assert.ok(await page.locator('#scope-results>button').count()>0);
  await page.locator('#scope-map-link').click();await page.waitForFunction(()=>document.getElementById('map-school')?.value==='meiji');assert.equal(await page.locator('#map-school').inputValue(),'meiji');assert.equal(await page.locator('#map-graduate').inputValue(),'先端数理科学研究科');
  await page.goto(origin+'/exam-scope.html?school=utokyo&graduate='+encodeURIComponent('工学系研究科')+'&department='+encodeURIComponent('原子力国際専攻'));
  await page.waitForFunction(()=>document.getElementById('scope-department')?.value==='原子力国際専攻');
  assert.equal(await page.locator('#scope-department').inputValue(),'原子力国際専攻');
  await page.goto(origin+'/exam-scope.html?school=evil&graduate=made-up');assert.equal(await page.locator('#scope-school').inputValue(),'all');
  await page.goto(origin+'/campus-map.html');await page.fill('#map-query','早稻田 IPS');assert.equal(await page.locator('.campus-row').count(),1);assert.match(await page.locator('.campus-row').textContent(),/北九州/);
  await page.fill('#map-query','not-a-campus-xyz');assert.equal(await page.locator('#map-empty').isVisible(),true);assert.equal(await page.locator('.map-marker').count(),0);
  await page.locator('#map-reset').click();assert.equal(await page.locator('.campus-row').count(),55);
  await page.selectOption('#map-school','keio');await page.locator('[data-region="kyushu"]').click();assert.equal(await page.locator('.campus-row').count(),0);await page.locator('#map-reset').click();
  await page.locator('#map-viewport').focus();transform=await page.locator('#map-land').getAttribute('transform');await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('#map-land').getAttribute('transform'),transform);await page.keyboard.press('+');await page.keyboard.press('0');
  const box=await page.locator('#map-viewport').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);transform=await page.locator('#map-land').getAttribute('transform');await page.mouse.wheel(0,-200);await page.waitForTimeout(80);assert.notEqual(await page.locator('#map-land').getAttribute('transform'),transform);
  transform=await page.locator('#map-land').getAttribute('transform');await page.mouse.move(box.x+80,box.y+80);await page.mouse.down();await page.mouse.move(box.x+140,box.y+140,{steps:5});await page.mouse.up();await page.waitForTimeout(80);assert.notEqual(await page.locator('#map-land').getAttribute('transform'),transform);
  await page.locator('#map-reset').click();
  assert.equal(await page.locator('#map-viewport').evaluate(e=>e.scrollLeft),0);
  assert.equal(await page.locator('.map-marker').evaluateAll(nodes=>nodes.reduce((n,e)=>n+Number(e.dataset.count),0)),55);
  if(process.env.CAMPUS_MAP_SCREENSHOTS)await page.screenshot({path:path.join(process.env.CAMPUS_MAP_SCREENSHOTS,'map-desktop.png'),fullPage:true});
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(String(e)));
  await mobile.goto(origin+'/campus-map.html?school=keio');await mobile.waitForFunction(()=>document.querySelectorAll('.campus-row').length===3);assert.equal(await mobile.locator('.campus-row').count(),3);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await mobile.locator('.menu-button').click();assert.equal(await mobile.locator('#mobile-nav').isVisible(),true);await mobile.locator('.menu-button').click();
  const mbox=await mobile.locator('#map-viewport').boundingBox();await mobile.locator('#map-viewport').scrollIntoViewIfNeeded();const mb=await mobile.locator('#map-viewport').boundingBox();
  const session=await mobile.context().newCDPSession(mobile);const cx=mb.x+mb.width/2,cy=mb.y+mb.height/2;
  transform=await mobile.locator('#map-land').getAttribute('transform');
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx-30,y:cy,id:1},{x:cx+30,y:cy,id:2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx-65,y:cy,id:1},{x:cx+65,y:cy,id:2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(100);assert.notEqual(await mobile.locator('#map-land').getAttribute('transform'),transform);
  await mobile.selectOption('#map-school','meiji');await mobile.selectOption('#map-graduate','先端数理科学研究科');await mobile.locator('.campus-row').click();assert.equal(await mobile.locator('#map-detail').isVisible(),true);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.equal(await mobile.locator('#map-viewport').evaluate(e=>e.scrollLeft),0);
  await mobile.waitForTimeout(600);
  if(process.env.CAMPUS_MAP_SCREENSHOTS)await mobile.screenshot({path:path.join(process.env.CAMPUS_MAP_SCREENSHOTS,'map-mobile.png'),fullPage:true});
  await page.goto(origin+'/index.html');assert.equal(await page.locator('.desk-card').count(),3);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.waitForTimeout(800);
  if(process.env.CAMPUS_MAP_SCREENSHOTS)await page.screenshot({path:path.join(process.env.CAMPUS_MAP_SCREENSHOTS,'map-home.png'),fullPage:true});
  assert.deepEqual(errors,[]);console.log('Browser checks passed: map, filters, clusters, zoom, pan, keyboard, mobile pinch, navigation, exam links, empty states, responsive layouts.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
