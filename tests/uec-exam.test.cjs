const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js'),rs=data.records.filter(r=>r.universityId==='uec');
const find=(stem,month='april')=>rs.find(r=>r.id==='uec-'+stem+'-1-'+month+'-general');
const state={universityId:'uec',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('UEC keeps four departments, thirteen official programs and two actual general-entry months',()=>{
 assert.equal(rs.length,26);assert.equal(new Set(rs.map(r=>r.department)).size,4);assert.equal(new Set(rs.map(r=>r.department+'/'+r.course)).size,13);
 assert.ok(rs.every(r=>r.graduateSchool==='情報理工学研究科'&&r.degreeProgram==='master'&&!r.publicationStatus&&r.admissionType==='general'&&r.internationalGeneral));
 assert.equal(core.filter(data.records,data.universities,state).length,26);assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,26);
 for(const q of ['电通大','電通大','电气通信大学','UEC Tokyo'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query:q}).length,26);
 assert.equal(rs.filter(r=>r.entryYear==='2027年4月').length,13);assert.equal(rs.filter(r=>r.entryYear==='2026年10月').length,13);
 assert.ok(!rs.some(r=>/化学生命|経営・社会|共同サステイナビリティ/.test(r.course+r.department)));
 assert.ok(rs.every(r=>!/社会人|SGU|G30/.test(r.selectionName)&&!/面接|小論文|口頭/.test(r.subjectsOriginal)));
});
test('UEC informatics and networks preserve different mandatory maths and elective groups',()=>{
 const info=find('informatics'),net=find('networks');assert.match(info.scopeOriginal,/1科目計100点/);assert.match(info.scopeOriginal,/4科目から3科目/);assert.match(info.scopeOriginal,/文字列処理/);
 assert.match(net.scopeOriginal,/線形代数80点，微分積分80点，計160点/);assert.match(net.scopeOriginal,/8科目から3科目/);assert.match(net.scopeOriginal,/z変換/);assert.match(net.scopeOriginal,/2ポート回路網/);assert.equal(net.sources[0].pdfPage,15);
 assert.match(info.editorialNote,/50分钟.*130分钟/);assert.match(net.editorialNote,/90分钟.*120分钟/);
});
test('UEC mechanical uses only compulsory foundations and engineering science retains its group restriction',()=>{
 const mech=find('mechanical');assert.match(mech.scopeOriginal,/200点.*2科目/);assert.match(mech.scopeOriginal,/常微分方程式/);assert.match(mech.scopeOriginal,/剛体のつり合い/);assert.doesNotMatch(mech.subjectsOriginal,/熱工学|流体|制御工学|選択/);
 const base=find('engineering-science');assert.match(base.scopeOriginal,/全11科目.*選択群Iから1科目以上.*4科目/);assert.match(base.subjectsOriginal,/無機・有機化学.*細胞・神経生物学/);assert.match(base.scopeOriginal,/pn接合/);assert.equal(base.sources[0].pdfPage,16);
});
test('UEC October is an explicitly foreign-only general route that adopts the April exam',()=>{
 for(const r of rs.filter(r=>r.entryYear==='2026年10月')){
  assert.equal(r.selectionName,'一般入試（外国人留学生のみ対象）');assert.match(r.conditionsOriginal,/日本国以外.*日本の大学.*4月入学のみ/);
  assert.ok(r.sources.some(s=>s.pdfPage===21));assert.ok(r.sources.some(s=>s.pdfPage===22));
  const april=rs.find(a=>a.course===r.course&&a.department===r.department&&a.entryYear==='2027年4月');assert.equal(r.scopeOriginal,april.scopeOriginal);assert.equal(r.subjectsOriginal,april.subjectsOriginal);assert.match(r.editorialNote,/学校明确10月选拔方法及日程准用4月/);
 }
});
test('UEC English follows the current guideline rather than undergraduate limits or stale printing rules',()=>{
 for(const r of rs){assert.match(r.conditionsOriginal,/2024年8月/);assert.match(r.conditionsOriginal,/TOEFL-ITP（本学実施に限る）/);assert.match(r.editorialNote,/2026年1月以后.*0–120.*PDF.*2025年12月以前.*无效/);assert.match(r.editorialNote,/IELTS仅博士后期/);assert.doesNotMatch(r.conditionsOriginal,/450|46点|IELTS/);assert.ok(r.sources.some(s=>s.pdfPage===10));}
});
test('UEC official references use the downloaded 41-page document and safe host validation',()=>{
 for(const r of rs){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.uec.ac.jp'));if(s.kind==='pdf'){assert.ok(s.url.endsWith('ie-p-gene-itn_2027.pdf'));assert.ok(s.pdfPage>=1&&s.pdfPage<=41);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}}}
 for(const url of ['http://www.uec.ac.jp/a','https://uec.ac.jp.evil.test/a','https://evil-uec.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
