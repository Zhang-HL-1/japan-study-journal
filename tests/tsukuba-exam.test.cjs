const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='tsukuba');
const get=id=>rs.find(r=>r.id==='tsukuba-'+id);
const state={universityId:'tsukuba',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Tsukuba keeps three master directions, one year-one integrated program and actual entry months',()=>{
 assert.equal(rs.length,13);assert.equal(new Set(rs.map(r=>r.department)).size,4);assert.equal(core.filter(data.records,data.universities,state).length,11);assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,13);
 assert.equal(rs.filter(r=>r.degreeProgram==='master').length,10);assert.equal(rs.filter(r=>r.degreeProgram==='integrated').length,3);
 for(const r of rs.filter(r=>r.id.includes('-emp-'))){assert.match(r.selectionName,/1年次入学/);assert.match(r.subjectsOriginal,/書類審査（100点）/);assert.doesNotMatch(r.subjectsOriginal,/外国語|英語（100点）/);assert.match(r.scopeOriginal,/研究計画5分、キャリアプラン5分、質疑応答10分/);assert.match(r.scopeOriginal,/オンライン/);}
 assert.equal(rs.filter(r=>r.entryYear==='2027年4月').length,9);assert.equal(rs.filter(r=>r.entryYear==='2027年10月').length,4);
 assert.ok(rs.filter(r=>r.id.includes('applied-electronic')).every(r=>r.entryYear==='2027年4月'&&r.course==='電子・物理工学サブプログラム'));
 for(const alias of ['筑波','筑波大','Tsukuba'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query:alias}).length,11);
 assert.ok(rs.every(r=>!r.publicationStatus&&!/社会人|SGU|MEXT|推薦/.test(r.selectionName)));
});
test('Tsukuba computer science uses all four oral fields rather than old written choices',()=>{
 for(const r of rs.filter(r=>r.admissionType==='general'&&r.department==='情報理工学位プログラム')){
  assert.match(r.subjectsOriginal,/外国語（100点）.*口述試験（400点）/s);assert.doesNotMatch(r.subjectsOriginal,/筆記/);
  assert.match(r.scopeOriginal,/4つの分野.*全てに解答/);for(const term of ['解析学','線形代数','離散構造と論理','プログラミング基礎','同値類','カルノー図','Python'])assert.ok(r.scopeOriginal.includes(term));
  assert.match(r.editorialNote,/15分钟.*2分钟/);assert.ok(r.sources.some(s=>s.url==='https://www.cs.tsukuba.ac.jp/admission.html#1'&&s.kind==='page'));
 }
 const imis=get('imis-winter-april-general');assert.match(imis.scopeOriginal,/微分方程式，複素解析/);assert.match(imis.editorialNote,/现场口述/);assert.ok(imis.sources.some(s=>s.url.endsWith('/admission/admission-m/oral')));
});
test('Tsukuba applied electronics preserves mandatory maths and cross-elective mechanics condition',()=>{
 for(const period of ['august','winter']){
  const r=get('applied-electronic-'+period+'-april-general');assert.match(r.scopeOriginal,/数学は必ず解答/);assert.match(r.scopeOriginal,/半導体工学から3問/);assert.match(r.scopeOriginal,/力学または電磁気学のどちらかは必ず選択/);assert.match(r.scopeOriginal,/英語表記（専門用語には日本語を併記）/);assert.match(r.subjectsOriginal,/500点.*200点.*300点/s);
  assert.match(r.editorialNote,/860／98／7.0.*不是申请最低分/);assert.match(r.conditionsOriginal,period==='august'?/2024年7月/:/2025年1月/);assert.match(r.editorialNote,period==='august'?/2026年8月20日.*21日/:/2027年1月27日.*28日/);
 }
 const general=rs.filter(r=>r.admissionType==='general');assert.ok(general.every(r=>r.internationalGeneral));assert.ok(general.filter(r=>r.graduateSchool.endsWith('システム情報工学研究群')).every(r=>r.conditionsOriginal.includes('2024年7月')));
 assert.ok(general.every(r=>r.sources.some(s=>s.url.endsWith('testscore_jp.pdf')&&s.pdfPage===2)));
 assert.ok(general.every(r=>r.editorialNote.includes('ETS直送')&&r.editorialNote.includes('One Skill Retake')));
 assert.ok(!get('cs-winter-april-general').conditionsOriginal.includes('免除されます'));
});
test('Tsukuba overseas residents remain a separate online selection without borrowing general exam or English scores',()=>{
 const foreign=rs.filter(r=>r.admissionType==='international');assert.equal(foreign.length,2);
 for(const r of foreign){assert.equal(r.originalLanguage,'en');assert.match(r.selectionName,/Overseas Residents/);assert.match(r.subjectsOriginal,/documents and oral examination/);assert.match(r.scopeOriginal,/1000 words in English/);assert.match(r.scopeOriginal,/research plan, related knowledge and skills/);assert.doesNotMatch(r.subjectsOriginal+r.scopeOriginal,/TOEFL|TOEIC|解析学|400点/);assert.match(r.editorialNote,/按国籍推定资格/);assert.ok(r.sources.some(s=>s.pdfPage===6&&s.url.endsWith('Overseas-Residents.pdf')));assert.ok(r.conditionsOriginal.includes('reference number'));}
});
test('Tsukuba source kinds preserve online guidelines and actual downloaded PDF bounds',()=>{
 for(const r of rs){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){const url=new URL(s.url);assert.ok(url.hostname==='tsukuba.ac.jp'||url.hostname.endsWith('.tsukuba.ac.jp'));if(s.kind==='pdf'){const limit=s.url.endsWith('testscore_jp.pdf')?2:7;assert.ok(s.pdfPage>=1&&s.pdfPage<=limit);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}else assert.equal(s.pdfPage,undefined);}}
 for(const url of ['http://tsukuba.ac.jp/a','https://tsukuba.ac.jp.evil.test/a','https://evil-tsukuba.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
