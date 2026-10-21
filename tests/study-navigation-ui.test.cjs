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
function boot(search='') {
 const ids={};const html=fs.readFileSync(root+'/past-papers.html','utf8');
 for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)){const e=new Element(m[1]);e.id=m[3];e.dataset={};e.hidden=/\bhidden\b/.test(m[2]);ids[m[3]]=e;}
 const doc={getElementById:id=>ids[id],createElement:tag=>{const e=new Element(tag);e.dataset={};return e;}};
 const events={},location=new URL('https://example.test/journal/past-papers.html'+search),stack=[location.href];let cursor=0;
 const win={location,StudyNavigation:require('../study-navigation.js'),PastPapersCore:require('../past-papers-core.js'),CAMPUS_MAP_DATA:require('../campus-map-data.js'),PAST_PAPERS_DATA:require('../past-papers-data.js'),addEventListener(name,fn){events[name]=fn;},history:{replaceState(_s,_t,url){location.href=url;stack[cursor]=url;},pushState(_s,_t,url){location.href=url;stack.splice(++cursor);stack[cursor]=url;}}};
 vm.runInNewContext(fs.readFileSync(root+'/past-papers.js','utf8'),{window:win,document:doc,URL,URLSearchParams,Set,console,CSS:{escape:s=>s}});
 return {ids,win,events,back(){if(cursor>0){location.href=stack[--cursor];events.popstate();}}};
}
test('past-paper deep links preserve school, department, year, selected paper and PDF tab',async()=>{
 const a=boot('?school=waseda');
 a.ids['paper-department'].value='電気・情報生命専攻';await a.ids['paper-department'].fire('change');
 a.ids['paper-year'].value='2024';await a.ids['paper-year'].fire('change');
 assert.equal(a.ids['paper-results'].children.length,1);
 await a.ids['paper-results'].children[0].click();
 const tabs=a.ids['paper-detail'].children.find(e=>e.className==='paper-files');await tabs.children[1].click();
 assert.equal(a.win.location.searchParams.get('file'),'1');
 const b=boot(a.win.location.search);
 assert.equal(b.ids['paper-year'].value,'2024');assert.equal(b.ids['paper-detail'].hidden,false);
 assert.ok(b.ids['paper-detail'].querySelectorAll('iframe')[0].src.endsWith('#page=1'));
 const links=b.ids['paper-detail'].querySelectorAll('a');assert.ok(links.some(e=>e.href?.includes('exam-scope.html?school=waseda')));
 assert.ok(links.some(e=>e.textContent==='资料直达链接'&&e.href.includes('file=1')));
 a.back();assert.equal(a.ids['paper-detail'].hidden,true);assert.equal(a.ids['paper-year'].value,'2024');
});
test('matching scope context selects exact department; historical mismatch broadens explicitly',()=>{
 const a=boot('?school=waseda&graduate='+encodeURIComponent('先進理工学研究科')+'&department='+encodeURIComponent('電気・情報生命専攻')+'&from=scope');
 assert.equal(a.ids['paper-department'].value,'電気・情報生命専攻');assert.ok(a.ids['paper-results'].children.length>0);
 const b=boot('?school=keio&graduate='+encodeURIComponent('理工学研究科')+'&department='+encodeURIComponent('総合デザイン工学専攻')+'&from=scope');
 assert.equal(b.ids['paper-department'].value,'all');assert.match(b.ids['paper-context-note'].textContent,/未完全对应/);assert.equal(b.ids['paper-results'].children.length,46);
});
test('invalid selected records/files do not crash and unavailable schools keep their empty state',()=>{
 const a=boot('?school=missing&paper=unknown&year=bad');assert.equal(a.ids['paper-detail'].hidden,true);assert.equal(a.win.location.search,'');
 const paper=require('../past-papers-data.js').papers[0];
 const b=boot('?paper='+encodeURIComponent(paper.id)+'&file=999');assert.equal(b.ids['paper-detail'].hidden,false);assert.equal(b.win.location.searchParams.has('file'),false);
 const c=boot('?school=utokyo&department=none&from=scope');assert.equal(c.ids['paper-empty'].hidden,false);assert.equal(c.ids['paper-results'].children.length,0);
});
test('mobile school selection accepts aliases through the search and clears dependent filters',async()=>{
 const a=boot('?school=keio');a.ids['paper-school-query'].value='早稻田';await a.ids['paper-school-query'].fire('input');
 assert.ok(a.ids['paper-school-select'].options.some(e=>e.value==='waseda'));
 a.ids['paper-school-select'].value='waseda';await a.ids['paper-school-select'].fire('change');
 assert.equal(a.ids['paper-results'].children.length,41);assert.equal(a.win.location.searchParams.get('school'),'waseda');
});
