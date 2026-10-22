const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test'),path=require('node:path');
class Element {
  constructor(tag='div') { this.tag=tag; this.children=[]; this.attrs={}; this.events={}; this.hidden=false; this.value=''; this.className=''; this.checked=false; this.disabled=false; this.textContent='';
    this.classList={toggle:(name,on)=>{const set=new Set(this.className.split(' ').filter(Boolean)); if(on)set.add(name);else set.delete(name);this.className=[...set].join(' ');}};
  }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children=[...children]; }
  setAttribute(k,v) { this.attrs[k]=String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  addEventListener(k,f) { (this.events[k] ||= []).push(f); }
  async fire(k,event={}) { for(const f of this.events[k] || []) await f({preventDefault(){},target:this,...event}); }
  click() { return this.fire('click'); }
  focus() {} scrollIntoView() {}
  get options() { return this.children.filter(c=>c.tag==='option'); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  querySelectorAll(selector) {
    const elements=this.children.flatMap(c=>[c,...c.querySelectorAll('*')]);
    return elements.filter(el=>selector==='*' || selector===el.tag || (selector.startsWith('.') && el.className.split(' ').includes(selector.slice(1))));
  }
}

const root=path.join(__dirname,'..');
function boot(search='', options={}) {
  let scrollY=options.scrollY ?? 0, reduceMotion=!!options.reduceMotion, failInstant=!!options.failInstant;
  const ids={}, calls=[], events={}, html=fs.readFileSync(root+'/past-papers.html','utf8');
  for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)){const e=new Element(m[1]);e.id=m[3];e.dataset={};e.hidden=/\bhidden\b/.test(m[2]);ids[m[3]]=e;}
  const doc={getElementById:id=>ids[id],createElement:tag=>{const e=new Element(tag);e.dataset={};return e;}};
  const location=new URL('https://example.test/journal/past-papers.html'+search);
  function scrollTo(x,y){
    if(failInstant && x && typeof x==='object' && x.behavior==='instant') throw new TypeError('instant unsupported');
    calls.push(typeof x==='object'?x:[x,y]);
    const top=typeof x==='object'?x.top:y;
    if(typeof top==='number') scrollY=top;
    for(const fn of events.scroll || []) fn();
  }
  const win={location,scrollTo,matchMedia(query){return {matches:reduceMotion && String(query).includes('prefers-reduced-motion'),media:String(query)};},get scrollY(){return scrollY;},set scrollY(v){scrollY=v;},StudyNavigation:require('../study-navigation.js'),PastPapersCore:require('../past-papers-core.js'),CAMPUS_MAP_DATA:require('../campus-map-data.js'),PAST_PAPERS_DATA:require('../past-papers-data.js'),addEventListener(name,fn){(events[name] ||= []).push(fn);},history:{replaceState(){},pushState(){}}};
  vm.runInNewContext(fs.readFileSync(root+'/past-papers.js','utf8'),{window:win,document:doc,URL,URLSearchParams,Set,console,CSS:{escape:s=>s}});
  return {ids,calls,events,setScrollY(v){scrollY=v;},getScrollY(){return scrollY;},setReduceMotion(v){reduceMotion=v;},setFailInstant(v){failInstant=v;},flushScroll(){for(const fn of events.scroll || []) fn();}};
}
function tag(html,id){const found=html.match(new RegExp(`<(?:button|div)\\b[^>]*\\bid="${id}"[^>]*>`));assert.ok(found,id);return found[0];}
function scrollCall(call,top,behavior){assert.equal(call.top,top);assert.equal(call.left,0);assert.equal(call.behavior,behavior);}

test('past-paper scroll controls are labeled, circular, and fixed at the bottom-right',()=>{
  const html=fs.readFileSync(root+'/past-papers.html','utf8'),css=fs.readFileSync(root+'/study-navigation.css','utf8');
  assert.match(html,/study-navigation\.css/);
  const dock=tag(html,'paper-scroll-dock'),back=tag(html,'paper-scroll-back'),top=tag(html,'paper-scroll-top');
  assert.match(dock,/role="group"/);assert.match(dock,/aria-label="页面位置"/);assert.match(dock,/\bhidden\b/);
  for(const [button,label,icon] of [[back,'回到原位置','↩'],[top,'回到顶部','↑']]){
    assert.match(button,/type="button"/);assert.match(button,/class="paper-scroll-button"/);assert.match(button,/\bhidden\b/);
    assert.match(button,new RegExp(`aria-label="${label}"`));assert.match(button,new RegExp(`title="${label}"`));
    assert.match(html,new RegExp(`id="${button.match(/id="([^"]+)"/)[1]}"[^>]*>\\s*<span aria-hidden="true">${icon}<\\/span>`));
  }
  const dockRule=css.match(/\.paper-scroll-dock\s*\{([^}]+)\}/)[1],buttonRule=css.match(/\.paper-scroll-button\s*\{([^}]+)\}/)[1];
  assert.match(dockRule,/position:\s*fixed/);assert.match(dockRule,/z-index:\s*5/);assert.match(dockRule,/bottom:/);assert.match(dockRule,/right:/);assert.match(dockRule,/safe-area-inset-bottom/);assert.match(dockRule,/safe-area-inset-right/);
  assert.match(buttonRule,/border-radius:\s*50%/);assert.match(buttonRule,/min-width:\s*44px/);assert.match(buttonRule,/min-height:\s*44px/);
  assert.match(buttonRule,/var\(--paper\)/);assert.match(buttonRule,/var\(--accent\)/);assert.match(buttonRule,/var\(--line\)/);
  assert.match(css,/display:\s*none\s*!important/);
  assert.ok(css.lastIndexOf('@media (max-width: 760px)')>css.indexOf('position: fixed'));
  const reduced=css.slice(css.lastIndexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced,/paper-scroll-button[\s\S]*transition:\s*none/);
  assert.ok(Number(css.match(/z-index:\s*(\d+)/)[1])<Number(fs.readFileSync(root+'/styles.css','utf8').match(/\.skip-link\s*\{[^}]*z-index:\s*(\d+)/)[1]));
});

test('scroll-to-top appears only after scrolling, and return stays disabled until a paper is opened',async()=>{
  const page=boot('?school=waseda');
  const top=page.ids['paper-scroll-top'],back=page.ids['paper-scroll-back'],dock=page.ids['paper-scroll-dock'];
  assert.equal(top.hidden,true);assert.equal(back.hidden,true);assert.equal(back.disabled,true);assert.equal(dock.hidden,true);
  await back.click();assert.equal(page.calls.length,0);
  page.setScrollY(239);page.flushScroll();
  assert.equal(top.hidden,true);assert.equal(dock.hidden,true);
  page.setScrollY(240);page.flushScroll();
  assert.equal(top.hidden,false);assert.equal(back.hidden,true);assert.equal(dock.hidden,false);
  await top.click();
  scrollCall(page.calls.at(-1),0,'smooth');
  assert.equal(page.getScrollY(),0);assert.equal(top.hidden,true);assert.equal(dock.hidden,true);
});

test('opening a paper records scrollY before the detail jump and can return there',async()=>{
  const page=boot('?school=waseda');
  const back=page.ids['paper-scroll-back'],top=page.ids['paper-scroll-top'];
  page.ids['paper-detail'].scrollIntoView=()=>{page.setScrollY(8800);};
  page.setScrollY(640);
  await page.ids['paper-results'].children[0].click();
  assert.equal(page.getScrollY(),8800);assert.equal(page.calls.length,0);
  assert.equal(back.hidden,false);assert.equal(back.disabled,false);assert.equal(page.ids['paper-scroll-dock'].hidden,false);
  const tabs=page.ids['paper-detail'].children.find(e=>e.className==='paper-files');
  await tabs.children[0].click();
  page.ids['paper-query'].value='zzzz-no-match';await page.ids['paper-query'].fire('input');
  assert.equal(back.hidden,false);
  await top.click();
  scrollCall(page.calls.at(-1),0,'smooth');
  assert.equal(top.hidden,true);assert.equal(back.hidden,false);
  await back.click();
  scrollCall(page.calls.at(-1),640,'smooth');
  assert.equal(page.getScrollY(),640);assert.equal(top.hidden,false);
  page.ids['paper-query'].value='';await page.ids['paper-query'].fire('input');
  page.setScrollY(1100);
  page.ids['paper-detail'].scrollIntoView=()=>{page.setScrollY(9000);};
  await page.ids['paper-results'].children[1].click();
  await back.click();
  assert.equal(page.calls.at(-1).top,1100);
});

test('a linked paper does not invent a return position, and reduced motion jumps instead of smoothing',async()=>{
  const paper=require('../past-papers-data.js').papers[0];
  const linked=boot('?paper='+encodeURIComponent(paper.id),{scrollY:900});
  assert.equal(linked.ids['paper-detail'].hidden,false);
  assert.equal(linked.ids['paper-scroll-top'].hidden,false);
  assert.equal(linked.ids['paper-scroll-back'].hidden,true);
  assert.equal(linked.ids['paper-scroll-back'].disabled,true);
  assert.equal(linked.calls.length,0);
  const page=boot('?school=waseda',{scrollY:480,reduceMotion:true});
  page.ids['paper-detail'].scrollIntoView=()=>{page.setScrollY(3000);};
  await page.ids['paper-results'].children[0].click();
  await page.ids['paper-scroll-back'].click();
  scrollCall(page.calls.at(-1),480,'instant');
  page.setFailInstant(true);page.setScrollY(700);page.flushScroll();
  await page.ids['paper-scroll-top'].click();
  assert.deepEqual(page.calls.at(-1),[0,0]);
  assert.equal(page.getScrollY(),0);
});
