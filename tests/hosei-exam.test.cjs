const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='hosei'),f=id=>rs.find(r=>r.id===`hosei-${id}-2027`);
const state={universityId:'hosei',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Hosei preserves formal directions and real rounds with a separate unpublished foreign route',()=>{
 assert.equal(rs.length,16);assert.equal(core.filter(data.records,data.universities,state).length,15);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,16);
 assert.equal(new Set(rs.map(r=>r.graduateSchool)).size,3);assert.equal(new Set(rs.map(r=>r.department)).size,6);
 const systems=rs.filter(r=>r.department==='システム理工学専攻');assert.deepEqual([...new Set(systems.map(r=>r.course))],['創生科学系','経営システム系']);
 assert.ok(rs.every(r=>r.degreeProgram==='master'&&r.entryYear==='2027年4月'));
 assert.ok(rs.every(r=>!/推薦|社会人|IIST/.test(r.selectionName)));
 for(const query of ['法政大学 半導体工学','Hosei 电气工程'])assert.equal(core.filter(data.records,data.universities,{...state,query}).length,2);
 const p=f('system-design-february-international-pending');assert.equal(p.publicationStatus,'pending');assert.ok(!p.scopeOriginal&&!p.subjectsOriginal&&!p.conditionsOriginal);assert.match(p.editorialNote,/2026年過年度参考|2026年过年度参考/);
 assert.ok(!rs.some(r=>/応用化学|生命機能|建築|都市環境/.test(r.department)));
});
test('Hosei engineering choices retain compulsory mathematics and all published electives',()=>{
 const m=f('mechanical-second-general'),e=f('electrical-second-general'),a=f('applied-information-second-general'),c=f('systems-creative-second-general'),s=f('systems-management-second-general');
 assert.match(m.scopeOriginal,/5分野.*3分野/);assert.match(m.scopeOriginal,/各分野数学を含む/);
 assert.match(e.scopeOriginal,/11科目.*3科目/);assert.match(e.scopeOriginal,/半導体工学/);
 assert.match(a.scopeOriginal,/10科目.*3科目/);assert.match(a.scopeOriginal,/ニューラルネットワーク/);
 assert.match(c.scopeOriginal,/必須科目：創生科学基礎（数学）/);assert.match(c.scopeOriginal,/9科目.*2科目/);assert.match(c.scopeOriginal,/量子科学.*行動科学/);
 assert.match(s.scopeOriginal,/必須科目：経営システム基礎（数学）/);assert.match(s.scopeOriginal,/3科目.*1科目/);assert.match(s.scopeOriginal,/データサイエンス（確率・統計）/);
 for(const r of [m,e,a,c,s]){assert.match(r.conditionsOriginal,/9:30～11:30/);assert.match(r.conditionsOriginal,/口述試験は日本語/);assert.match(r.conditionsOriginal,/専攻によっては/);assert.doesNotMatch(r.scopeOriginal,/小論文/);}
 assert.match(c.conditionsOriginal,/使用してもよい/);
});
test('Hosei information science uses masters oral timing and current N2 rather than the 2028 N1 notice',()=>{
 const a=f('information-science-first-general'),b=f('information-science-second-general');
 assert.match(b.scopeOriginal,/線形代数学、離散数学、微分積分学、形式言語、DB、データ構造とアルゴリズム、ディジタル信号処理/);
 assert.match(b.conditionsOriginal,/9:30～11:00/);assert.match(b.conditionsOriginal,/約15分間.*7分.*8分/);
 assert.match(b.conditionsOriginal,/卒業論文または卒業論文抄録提出/);assert.doesNotMatch(a.conditionsOriginal,/卒業論文または卒業論文抄録提出/);
 assert.match(b.conditionsOriginal,/N2レベル以上/);assert.match(b.conditionsOriginal,/研究室によって/);assert.match(b.conditionsOriginal,/上記要件を免除/);assert.doesNotMatch(b.conditionsOriginal,/N1/);assert.match(b.editorialNote,/2028年度/);
 assert.doesNotMatch(b.subjectsOriginal+b.scopeOriginal+b.conditionsOriginal,/30分間|小論文/);
});
test('Hosei system design requires both specialist and common questions and narrower IP eligibility',()=>{
 const r=f('system-design-october-general');assert.match(r.scopeOriginal,/①・②ともに解答/);assert.match(r.scopeOriginal,/出願時.*3分野/);assert.match(r.scopeOriginal,/1分野.*②共通問題/s);
 assert.match(r.conditionsOriginal,/9:30～11:30/);assert.match(r.conditionsOriginal,/12:30～/);assert.match(r.conditionsOriginal,/本学デザイン工学部が実施/);assert.doesNotMatch(r.conditionsOriginal,/Home Edition|N2|N1|2年/);
 assert.match(r.editorialNote,/核验当天实施/);assert.equal(r.course,undefined);
 for(const r of rs.filter(r=>!r.publicationStatus&&r.graduateSchool!=='デザイン工学研究科')){assert.match(r.conditionsOriginal,/大学入学後/);assert.match(r.conditionsOriginal,/Home Editionは受付不可/);assert.doesNotMatch(r.conditionsOriginal,/2年/);}
});
test('Hosei source links retain actual PDF pages and strict official-domain validation',()=>{
 for(const r of rs)for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.hosei.ac.jp'));assert.ok(core.sourceURL(s));if(s.kind==='pdf'){const total=s.url.includes('riko')?41:s.url.includes('cis')?33:88;assert.ok(s.pdfPage>=1&&s.pdfPage<=total);}}
 assert.ok(core.sourceURL(f('mechanical-second-general').sources[0]).endsWith('#page=8'));
 assert.ok(core.sourceURL(f('information-science-second-general').sources[0]).endsWith('#page=7'));
 assert.ok(core.sourceURL(f('system-design-february-general').sources[0]).endsWith('#page=70'));
 for(const url of ['http://www.hosei.ac.jp/a','https://hosei.ac.jp.evil.test/a','https://evil-hosei.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
