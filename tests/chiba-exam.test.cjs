const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='chiba'),f=s=>rs.find(r=>r.id===`chiba-${s}-2027-apr-general`);
const state={universityId:'chiba',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Chiba has six formal master courses and authentic general and MEXT cohorts',()=>{
 assert.equal(rs.length,36);assert.equal(new Set(rs.map(r=>r.course)).size,6);assert.equal(new Set(rs.map(r=>r.department)).size,4);
 assert.ok(rs.every(r=>r.graduateSchool==='融合理工学府'&&r.degreeProgram==='master'&&!r.publicationStatus));
 assert.equal(core.filter(data.records,data.universities,state).length,12);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,36);
 assert.equal(core.filter(data.records,data.universities,{...state,entryYear:'2027年10月'}).length,0);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international',entryYear:'2027年10月'}).length,6);
 for(const query of ['千叶大学 电气工程','Chiba Electrical'])assert.equal(core.filter(data.records,data.universities,{...state,query}).length,2);
 assert.ok(!rs.some(r=>/私費|社会人|推薦|博士後期/.test(r.selectionName)));
});
test('Chiba information keeps the current three subject groups and mandatory oral rather than future mathematics-only exams',()=>{
 const r=f('information');for(const s of ['離散数学','確率・統計','代数構造','フーリエ解析','組合せ論理回路','順序回路','ネットワーク','アルゴリズム設計','データ構造','修了後の予定'])assert.ok(r.scopeOriginal.includes(s));
 assert.match(r.conditionsOriginal,/120分/);assert.match(r.conditionsOriginal,/全員が対象/);assert.match(r.editorialNote,/2028年4月/);
 assert.doesNotMatch(r.subjectsOriginal+r.scopeOriginal+r.conditionsOriginal,/13:00|線形代数学及び微積分学/);
 assert.equal(r.sources[0].pdfPage,18);
});
test('Chiba materials requires all three fundamentals including chemistry, one advanced answer and limited calculator use',()=>{
 const r=f('materials');assert.match(r.scopeOriginal,/3題すべて/);assert.match(r.scopeOriginal,/基礎有機化学/);assert.match(r.scopeOriginal,/1題だけ選択/);assert.match(r.scopeOriginal,/量子力学、固体物性/);
 assert.match(r.conditionsOriginal,/一人当たり10分.*5分間/);assert.match(r.conditionsOriginal,/A4用紙1枚を5部/);assert.match(r.conditionsOriginal,/関数電卓は使用できません/);
 assert.ok(r.sources.some(s=>s.url.endsWith('/material.pdf')&&s.pdfPage===1));
});
test('Chiba imaging is an oral-only professional exam and preserves the August English submission exception',()=>{
 const r=f('imaging');assert.match(r.scopeOriginal,/筆記試験はありません/);assert.match(r.scopeOriginal,/スライド又はビデオ/);assert.match(r.scopeOriginal,/基礎知識/);
 assert.match(r.conditionsOriginal,/2024年6月以降/);assert.match(r.conditionsOriginal,/8月6日の口頭試問時/);assert.doesNotMatch(r.conditionsOriginal,/2026年5月末|出願時に提出/);
 assert.match(r.editorialNote,/未公布统一发表／口试时长/);
 const normal=f('electrical');assert.match(normal.conditionsOriginal,/2024年6月から2026年5月末/);assert.match(normal.conditionsOriginal,/Institution Code 9154/);assert.match(normal.conditionsOriginal,/両方の手続/);
 for(const r of rs.filter(r=>r.admissionType==='general')){assert.match(r.conditionsOriginal,/MyBestは利用しません/);assert.match(r.conditionsOriginal,/オンライン形式.*認めません/);assert.match(r.conditionsOriginal,/L&R-IP/);}
});
test('Chiba design retains advisor-designated subjects plus two electives and actual oral timing',()=>{
 const r=f('design');assert.match(r.scopeOriginal,/指定科目.*その他の2科目/);assert.match(r.scopeOriginal,/①プロダクト.*⑧行動心理/s);assert.match(r.conditionsOriginal,/約9分（交代時間を含めて10分）/);assert.match(r.conditionsOriginal,/冒頭3分/);assert.match(r.conditionsOriginal,/A4縦1ページ・横書き.*5部/);
 assert.ok(r.sources.some(s=>s.url.endsWith('/design.pdf')&&s.pdfPage===1));
});
test('Chiba mechanical and electrical oral applies only to waiver applicants and preserves different published details',()=>{
 const m=f('mechanical'),e=f('electrical');assert.match(m.scopeOriginal,/4科目.*全問/);for(const s of ['制御工学','座屈','エントロピー','ポワズイユ流れ'])assert.ok(m.scopeOriginal.includes(s));
 for(const r of [m,e]){assert.match(r.subjectsOriginal,/免除希望者のみ/);assert.match(r.conditionsOriginal,/180分/);assert.doesNotMatch(r.conditionsOriginal,/全員が対象|13:00/);}
 assert.match(m.conditionsOriginal,/プログラム機能は使用できません/);assert.doesNotMatch(e.conditionsOriginal,/電卓|志望理由書/);
 for(const s of ['固有ベクトル','極値問題','ラプラス変換','三相回路','分布定数回路'])assert.ok(e.scopeOriginal.includes(s));
});
test('Chiba MEXT keeps its own oral scope, narrow eligibility and four real entry rounds',()=>{
 const ns=rs.filter(r=>r.admissionType==='international');assert.equal(ns.length,24);
 for(const r of ns){assert.equal(r.scopeOriginal,'口頭試問：基礎学力の確認及び研究計画等について行います。');assert.match(r.conditionsOriginal,/大使館推薦/);assert.match(r.conditionsOriginal,/日本の大学を卒業.*出願できません/);assert.doesNotMatch(r.subjectsOriginal+r.scopeOriginal+r.conditionsOriginal,/TOEFL|TOEIC|JLPT|電磁気|10分|オンライン/);}
 assert.equal(ns.filter(r=>r.entryYear==='2027年4月').length,12);assert.equal(ns.filter(r=>r.conditionsOriginal.includes('2027年2月1日')).length,12);
 for(const r of rs)for(const s of r.sources){assert.ok(core.sourceURL(s));if(s.kind==='pdf'){const total=s.url.includes('doctoralApplication')?60:s.url.includes('mext_app')?8:s.url.includes('20260827')?7:1;assert.ok(s.pdfPage>=1&&s.pdfPage<=total);}}
 for(const url of ['http://www.se.chiba-u.jp/a','https://chiba-u.jp.evil.test/a','https://evil-chiba-u.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
