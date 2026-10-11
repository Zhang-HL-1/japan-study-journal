const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const core=require('../campus-map-core.js'),data=require('../campus-map-data.js'),exams=require('../exam-scope-data.js');
const all={school:'all',graduate:'all',region:'all',query:''};
test('campus catalog covers the exact existing universities and every existing graduate school',()=>{
 assert.deepEqual(data.universities,exams.universities);assert.equal(data.universities.length,23);assert.equal(data.campuses.length,55);
 assert.equal(new Set(data.campuses.map(c=>c.id)).size,data.campuses.length);
 for(const u of exams.universities){
  const expected=[...new Set(exams.records.filter(r=>r.universityId===u.id).map(r=>r.graduateSchool))].sort();
  const actual=[...new Set(data.campuses.filter(c=>c.universityId===u.id).flatMap(c=>c.units.map(u=>u.graduateSchool)))].sort();
  assert.deepEqual(actual,expected,u.id);
 }
});
test('every marker has plausible Japan coordinates, dated official sources and real catalog associations',()=>{
 const allowed=exams.universities.flatMap(u=>u.officialDomains||[]);
 for(const c of data.campuses){
  assert.ok(c.lat>30&&c.lat<46&&c.lng>129&&c.lng<143,c.id);assert.ok(c.address&&c.prefecture&&c.city&&c.verifiedAt&&c.sources.length);
  assert.ok(['campus','research'].includes(c.kind));assert.ok(data.regions.some(r=>r.id===c.region));
  for(const s of c.sources){const u=new URL(s.url);assert.equal(u.protocol,'https:');assert.ok(/\.ac\.jp$/.test(u.hostname)||u.hostname.endsWith('.chiba-u.jp')||u.hostname.endsWith('.waseda.jp'),u.hostname);}
  for(const unit of c.units){
   assert.ok(exams.records.some(r=>r.universityId===c.universityId&&r.graduateSchool===unit.graduateSchool),c.id);
   for(const dep of unit.departments||[])assert.ok(exams.records.some(r=>r.universityId===c.universityId&&r.graduateSchool===unit.graduateSchool&&r.department===dep),dep);
  }
 }
});
test('major split campuses select actual graduate locations, independently of headquarters',()=>{
 const filter=(school,graduate)=>data.campuses.filter(c=>core.matches(c,{...all,school,graduate},data.universities)).map(c=>c.id);
 assert.deepEqual(filter('aoyama','理工学研究科'),['aoyama-sagamihara']);
 assert.deepEqual(filter('meiji','理工学研究科'),['meiji-ikuta']);assert.deepEqual(filter('meiji','先端数理科学研究科'),['meiji-nakano']);
 assert.deepEqual(filter('keio','理工学研究科'),['keio-yagami']);assert.deepEqual(filter('keio','メディアデザイン研究科'),['keio-hiyoshi']);
 assert.deepEqual(filter('waseda','情報生産システム研究科'),['waseda-kitakyushu']);assert.deepEqual(filter('utokyo','新領域創成科学研究科'),['utokyo-kashiwa']);
 assert.deepEqual(filter('hosei','理工学研究科'),['hosei-koganei']);assert.deepEqual(filter('hosei','デザイン工学研究科'),['hosei-tamachi']);
 assert.deepEqual(filter('chuo','国際情報研究科'),['chuo-ichigaya']);assert.deepEqual(filter('kyushu','総合理工学府'),['kyushu-chikushi']);
 assert.deepEqual(filter('tus','工学研究科'),['tus-katsushika']);assert.deepEqual(filter('osaka','情報科学研究科'),['osaka-suita']);
});
test('campus aliases, regions and AND searches compose without broadening the selected graduate school',()=>{
 const match=state=>data.campuses.filter(c=>core.matches(c,{...all,...state},data.universities));
 assert.deepEqual(match({query:'早稻田 IPS'}).map(c=>c.id),['waseda-kitakyushu']);
 assert.equal(match({school:'waseda',region:'kyushu'}).length,1);assert.equal(match({school:'keio',region:'kyushu'}).length,0);
 assert.ok(match({query:'すずかけ台'}).some(c=>c.id==='science-tokyo-yokohama'));
 assert.equal(match({query:'zzzz-no-campus'}).length,0);
});
test('mercator projection agrees with reference map geometry and north points upwards',()=>{
 assert.equal(core.project(46.2,122.4).x,0);assert.equal(core.project(46.2,122.4).y,0);
 assert.ok(Math.abs(core.project(23.8,146.6).x-1000)<.001);assert.ok(Math.abs(core.project(23.8,146.6).y-1144.6)<.1);
 assert.ok(core.project(43,140).y<core.project(35,140).y);
});
test('zoom maintains the world point beneath the cursor and enforces limits',()=>{
 const v={scale:2,x:45,y:-60},p={x:215,y:125};const z=core.zoom(v,p,3,.2,80);
 assert.equal((p.x-v.x)/v.scale,(p.x-z.x)/z.scale);assert.equal((p.y-v.y)/v.scale,(p.y-z.y)/z.scale);
 assert.equal(core.zoom(v,p,100,.2,80).scale,80);assert.equal(core.zoom(v,p,.0001,.2,80).scale,.2);
});
test('fit keeps every filtered marker inside desktop and portrait map padding',()=>{
 for(const [w,h] of [[980,610],[358,430]]){
  const points=data.campuses.map(c=>core.project(c.lat,c.lng)),v=core.fit(points,w,h);
  for(const p of points){const s=core.screen(p,v);assert.ok(s.x>=64.9&&s.x<=w-64.9);assert.ok(s.y>=64.9&&s.y<=h-64.9);}
  const one=core.fit([points[0]],w,h);assert.ok(Number.isFinite(one.scale));const empty=core.fit([],w,h);assert.ok(empty.scale>0);
 }
});
test('cluster membership preserves every campus and naturally separates with zoom',()=>{
 const p=[{x:1,y:1,id:1},{x:8,y:8,id:2},{x:90,y:90,id:3}];const c=core.clusters(p);assert.equal(c.length,2);assert.deepEqual(c.flatMap(g=>g.items.map(p=>p.id)),[1,2,3]);
 assert.equal(core.clusters(p.map(p=>({...p,x:p.x*10,y:p.y*10}))).length,3);
});
test('exam links use exact graduate and department fields with properly encoded Japanese names',()=>{
 for(const c of data.campuses)for(const u of c.units){const url=new URL(core.examLink(c,u),'https://local.invalid/');assert.equal(url.pathname,'/exam-scope.html');assert.equal(url.searchParams.get('school'),c.universityId);assert.equal(url.searchParams.get('graduate'),u.graduateSchool);if(u.departments?.length===1)assert.equal(url.searchParams.get('department'),u.departments[0]);}
});
test('new page has unique IDs, existing assets, accessible map controls and attribution',()=>{
 const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'campus-map.html'),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){if(/^(?:https?:|data:|#)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])),m[1]);}
 assert.match(html,/国土地理院/);assert.match(html,/tabindex="0" role="region"/);assert.match(html,/双指缩放/);assert.match(html,/map-plus/);assert.match(html,/map-minus/);
});
