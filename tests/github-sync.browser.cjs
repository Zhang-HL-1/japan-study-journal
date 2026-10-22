// Two isolated browser profiles use a simulated GitHub API; no real user Gist or token is used.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright'),model=require('../github-sync-model.js'),sync=require('../github-sync.js'),desk=require('../study-desk-core.js');
const root=path.join(__dirname,'..');
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.pdf')?'application/pdf':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({headless:true});const origin='http://127.0.0.1:'+server.address().port,errors=[],calls=[],id='b'.repeat(32);let exists=false,remote=model.serialize(model.empty());
  const gist=()=>({id,owner:{login:'sync-user'},public:false,files:{[sync.FILE]:{content:remote}}});
  async function profile(width=1440,bank=true){const context=await browser.newContext({viewport:{width,height:1000},acceptDownloads:true});let offline=false;
   await context.route('https://api.github.com/**',async route=>{
    const req=route.request(),url=new URL(req.url()),method=req.method();const cors={'access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,PATCH,OPTIONS','access-control-allow-headers':'authorization,content-type,x-github-api-version'};if(method==='OPTIONS'){await route.fulfill({status:204,headers:cors});return;}calls.push({method,path:url.pathname,body:req.postData()});assert.equal(req.headers().authorization,'Bearer browser-test-token');
    if(offline){await route.fulfill({status:503,headers:cors,contentType:'application/json',body:'{"message":"offline fixture"}'});return;}
    let body;if(url.pathname==='/user')body={login:'sync-user'};else if(url.pathname==='/gists'&&method==='GET')body=exists?[gist()]:[];
    else if(url.pathname==='/gists'&&method==='POST'){const value=req.postDataJSON();assert.equal(value.public,false);assert.deepEqual(Object.keys(value.files),[sync.FILE]);remote=value.files[sync.FILE].content;exists=true;body=gist();}
    else if(url.pathname==='/gists/'+id&&method==='PATCH'){remote=req.postDataJSON().files[sync.FILE].content;model.parse(remote);body=gist();}
    else if(url.pathname==='/gists/'+id)body=gist();else throw Error('Unexpected GitHub route');
    await route.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(body)});
   });
   if(bank)await context.route('**/questions.js*',route=>route.fulfill({contentType:'text/javascript',body:'window.QUESTION_SUBJECTS=["同步测试"];window.QUESTION_BANK='+JSON.stringify([{id:'sync-question',type:'choice',subject:'同步测试',chapter:'第一章',difficulty:'基础',title:'同步测试题',prompt:'1 + 1 = ?',options:['1','2'],answer:1,answerText:'2',explanation:['把两项相加。'],hint:'仅用于测试。'}])+';'}));
   const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));return {context,page,set offline(v){offline=v;}};
  }
  const a=await profile(),b=await profile(390);const first=require('../exam-scope-data.js').records[0],second=require('../exam-scope-data.js').records[1];
  const saved=r=>({type:'scope',id:r.id,title:r.department,subtitle:r.graduateSchool,admission:'general',file:0,favoriteAt:Date.now()});
  const connect=async page=>{await page.fill('#github-sync-token','browser-test-token');await page.locator('#github-sync-connect').click();await page.waitForFunction(()=>window.JournalSync.status().connected&&window.JournalSync.status().lastSyncAt>0&&window.JournalSync.status().phase==='idle'&&!window.JournalSync.status().error);assert.equal(await page.locator('#github-sync-token').inputValue(),'');};
  const manual=async page=>{const result=await page.evaluate(()=>window.JournalSync.syncNow());assert.equal(result.ok,true);};
  await a.page.goto(origin+'/desk.html');assert.equal(calls.length,0);await a.page.evaluate(({key,item})=>localStorage.setItem(key,JSON.stringify({version:1,items:[item]})),{key:desk.KEY,item:saved(first)});await a.page.reload();await connect(a.page);assert.equal(calls.filter(c=>c.method==='POST').length,1);
  await b.page.goto(origin+'/desk.html');await connect(b.page);assert.equal(await b.page.locator('.desk-item').count(),1);assert.equal(calls.filter(c=>c.method==='POST').length,1);
  await a.page.locator('.desk-item button').click();await manual(a.page);await manual(b.page);assert.equal(await b.page.locator('.desk-item').count(),0);
  await b.page.goto(origin+'/exam-scope.html?record='+encodeURIComponent(second.id));await b.page.locator('.desk-favorite').click();await manual(b.page);await manual(a.page);assert.equal(await a.page.locator('.desk-item').count(),1);assert.ok((await a.page.locator('.desk-item').textContent()).includes(second.department));
  await a.page.goto(origin+'/drill.html');await a.page.locator('input[name="answer"]').nth(1).check();await a.page.locator('#submit-answer').click();await a.page.locator('.note-details summary').click();await a.page.fill('#question-note','来自设备 A 的笔记');await a.page.locator('#bookmark').click();await manual(a.page);
  await b.page.goto(origin+'/drill.html');await manual(b.page);assert.equal(await b.page.locator('#question-note').inputValue(),'来自设备 A 的笔记');assert.equal(await b.page.locator('#bookmark').getAttribute('aria-pressed'),'true');assert.equal(await b.page.locator('#stat-attempted').textContent(),'1 / 1');
  await b.page.locator('.note-details summary').click();await b.page.fill('#question-note','设备 B 修改后的笔记');await manual(b.page);await manual(a.page);assert.equal(await a.page.locator('#question-note').inputValue(),'设备 B 修改后的笔记');
  a.offline=true;await a.page.fill('#question-note','离线保留的笔记');const failed=await a.page.evaluate(()=>window.JournalSync.syncNow());assert.equal(failed.ok,false);assert.equal(await a.page.locator('#question-note').inputValue(),'离线保留的笔记');assert.match(await a.page.locator('#storage-status').textContent(),/同步未完成/);
  a.offline=false;await manual(a.page);await manual(b.page);assert.equal(await b.page.locator('#question-note').inputValue(),'离线保留的笔记');
  const c=await profile(900,false);await c.page.goto(origin+'/desk.html');await connect(c.page);await c.page.goto(origin+'/drill.html');await manual(c.page);assert.equal(await c.page.evaluate(()=>JSON.parse(localStorage.getItem('japan-study-journal:practice:v1')).records['sync-question'].note),'离线保留的笔记');
  await b.page.goto(origin+'/desk.html');await b.page.locator('#github-sync').scrollIntoViewIfNeeded();await b.page.evaluate(()=>document.fonts.ready);assert.equal(await b.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(process.env.STUDY_ROOM_SCREENSHOTS){fs.mkdirSync(process.env.STUDY_ROOM_SCREENSHOTS,{recursive:true});await b.page.screenshot({path:path.join(process.env.STUDY_ROOM_SCREENSHOTS,'github-sync-mobile.png'),animations:'disabled'});}
  const download=b.page.waitForEvent('download');await b.page.locator('#desk-export').click();const file=await download,text=fs.readFileSync(await file.path(),'utf8');assert.equal(text.includes('browser-test-token'),false);assert.equal(remote.includes('browser-test-token'),false);assert.equal(remote.includes('lastOpenedAt'),false);
  await b.page.locator('#github-sync-disconnect').click();assert.equal(await b.page.evaluate(()=>localStorage.getItem('japan-study-journal:github-sync:v1')),null);assert.equal(await b.page.locator('.desk-item').count(),1);
  assert.deepEqual(errors,[]);console.log('GitHub sync checks passed: two-device favorites/deletions, scores, notes, offline recovery, old question banks, secret Gist isolation, token-free exports, disconnect and mobile layout.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
