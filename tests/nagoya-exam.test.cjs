const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='nagoya'),find=id=>rs.find(r=>r.id==='nagoya-'+id);
const state={universityId:'nagoya',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Nagoya retains 16 formal departments and distinguishes general, waiver, oral and unverified foreign routes',()=>{
 assert.equal(rs.length,41);assert.equal(rs.filter(r=>!r.publicationStatus).length,29);
 assert.equal(new Set(rs.map(r=>r.graduateSchool+'/'+r.department)).size,16);
 assert.equal(core.filter(data.records,data.universities,state).length,29);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,41);
 for(const q of ['名大','名古屋大学','Nagoya','Nagoya University'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query:q}).length,29);
 assert.ok(rs.every(r=>r.degreeProgram==='master'&&r.entryYear==='2027年4月'&&!/社会人|G30|SGU/.test(r.selectionName)));
 assert.ok(!rs.some(r=>/化学|土木|社会情報|心理/.test(r.department)));
 for(const r of rs.filter(r=>r.publicationStatus==='unverified')){assert.equal(r.admissionType,'international');assert.ok(!r.subjectsOriginal&&!r.scopeOriginal);assert.match(r.editorialNote,/不是.*未公布/);assert.equal(r.sources[0].pdfPage,1);}
});
test('Nagoya electrical choice constraints and mechanical foundation follow the 2027 papers',()=>{
 for(let i=1;i<=3;i++){
  const ee=find('electrical-'+i+'-general');assert.match(ee.scopeOriginal,/計5問から3問/);assert.match(ee.scopeOriginal,/計6問から3問/);assert.match(ee.scopeOriginal,/グループ1.*2問以下/);assert.ok(ee.sources.some(s=>s.url.endsWith('2027admission.pdf')&&s.pdfPage===4));
  const mech=find('mechanical-'+i+'-general');assert.match(mech.scopeOriginal,/数学.*全問解答/);assert.doesNotMatch(mech.scopeOriginal.split('専門部門：')[0],/電磁気学|基礎物理/);assert.match(mech.scopeOriginal,/5科目から3科目/);assert.match(mech.scopeOriginal,/状態空間表現/);assert.match(mech.scopeOriginal,/大学で学んだこと/);
 }
});
test('Nagoya materials and energy keep mandatory chemistry and specialist options intact',()=>{
 for(let i=1;i<=2;i++){
  assert.match(find('materials-'+i+'-general').scopeOriginal,/2科目全て.*物理化学/);assert.match(find('materials-'+i+'-general').scopeOriginal,/4問中2問/);
  const en=find('energy-'+i+'-general');assert.match(en.scopeOriginal,/化学1問，5問全て/);assert.match(en.scopeOriginal,/小論文を含む.*必答/);assert.match(en.scopeOriginal,/計4問から1問/);assert.match(en.editorialNote,/未列内容也可能出题/);
 }
});
test('Nagoya information papers and interview exemption differ from engineering',()=>{
 assert.match(find('information-systems-general').scopeOriginal,/8問.*6問/);
 const ai=find('intelligent-systems-general');assert.match(ai.scopeOriginal,/3科目.*Python 3/);assert.match(ai.scopeOriginal,/A4.*1枚.*片面.*手書き/);assert.match(ai.scopeOriginal,/筆記試験終了後に配布/);
 assert.match(find('complex-general').editorialNote,/全员均须参加/);
 const oral=find('math-information-oral');assert.match(oral.scopeOriginal,/30分.*オンライン/);assert.match(oral.scopeOriginal,/筆記試験と口頭試問.*必要はない/);assert.match(oral.editorialNote,/3\/4.*3\/8.*3.8/);
 const waiver=find('electrical-1-waiver');assert.match(waiver.scopeOriginal,/一般選抜者と同様に口頭試問/);assert.match(waiver.editorialNote,/出愿时不交英语/);
 assert.match(ai.editorialNote,/IELTS.*Duolingo.*2024年4月1日.*缺席/);
 assert.match(find('electrical-1-general').editorialNote,/2024|未交成绩仍可出愿/);assert.doesNotMatch(find('electrical-1-general').subjectsOriginal,/IELTS|Duolingo/);
});
test('Nagoya sources link actual pages within official source bounds and reject lookalike hosts',()=>{
 const bounds=[['/download/229',35],['7c87fb3ffa6e880b002fdf3d65f61582.pdf',47],['2027admission.pdf',21],['/594/164',5],['entrance-exam.pdf?ver=2026042674100',2],['20260721.pdf',1]];
 for(const r of rs){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.nagoya-u.ac.jp'));if(s.kind==='pdf'){const n=bounds.find(([end])=>s.url.endsWith(end))?.[1];assert.ok(n&&s.pdfPage>=1&&s.pdfPage<=n);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}}}
 for(const url of ['http://www.engg.nagoya-u.ac.jp/a','https://nagoya-u.ac.jp.evil.test/a','https://evil-nagoya-u.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
