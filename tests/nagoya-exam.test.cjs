const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const rs=data.records.filter(r=>r.universityId==='nagoya'),find=id=>rs.find(r=>r.id==='nagoya-'+id);
const state={universityId:'nagoya',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('Nagoya retains the original departments and adds the five past-paper gaps',()=>{
 assert.equal(rs.length,54);assert.equal(rs.filter(r=>!r.publicationStatus).length,40);
 assert.equal(new Set(rs.map(r=>r.graduateSchool+'/'+r.department)).size,21);
 assert.equal(core.filter(data.records,data.universities,state).length,39);
 assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,54);
 for(const q of ['名大','名古屋大学','Nagoya','Nagoya University'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query:q}).length,39);
 assert.ok(rs.every(r=>r.degreeProgram==='master'&&r.entryYear==='2027年4月'&&!/社会人|G30|SGU/.test(r.selectionName)));
 assert.ok(!rs.some(r=>/有機・高分子|応用物質化学|生命分子|社会情報|心理|建築学/.test(r.department+ (r.course||''))));
 assert.deepEqual(data.catalog.nagoya.graduateSchools,['工学研究科','情報学研究科','多元数理科学研究科','理学研究科','環境学研究科']);
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
 const bounds=[['/download/229',35],['7c87fb3ffa6e880b002fdf3d65f61582.pdf',47],['2027admission.pdf',21],['/594/164',5],['entrance-exam.pdf?ver=2026042674100',2],['20260721.pdf',1],['01_令和9年度大学院入試専攻案内.pdf',8],['info-mc-2027-1.pdf',1],['appl-mc-2027-1.pdf',14],['appl-mc-2027-d.pdf',14],['Application_Guidelines_MC_202704.pdf',41],['2027_suisen.pdf',24],['mc2027_00.pdf',31],['juken2026-oct-2027.pdf',21]];
 for(const r of rs){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){assert.ok(new URL(s.url).hostname.endsWith('.nagoya-u.ac.jp'));if(s.kind==='pdf'){const n=bounds.find(([end])=>s.url.endsWith(end))?.[1];assert.ok(n&&s.pdfPage>=1&&s.pdfPage<=n);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}}}
 for(const url of ['http://www.engg.nagoya-u.ac.jp/a','https://nagoya-u.ac.jp.evil.test/a','https://evil-nagoya-u.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
test('Nagoya chemical systems uses the materials-group paper and civil keeps A and B apart',()=>{
 const chem=find('chemsys-general');assert.equal(chem.department,'化学システム工学専攻');
 assert.match(chem.scopeOriginal,/2科目全て.*物理化学/);assert.match(chem.scopeOriginal,/4問中2問/);
 assert.equal(find('chemsys-international-unverified').publicationStatus,'unverified');
 const civil=find('civil-general');assert.match(civil.scopeOriginal,/5問を選択解答/);assert.match(civil.scopeOriginal,/2問まで/);
 assert.match(civil.scopeOriginal,/社会基盤開発・環境管理/);assert.match(civil.conditionsOriginal,/必ず「専門部門A」/);
 const waiver=find('civil-waiver');assert.match(waiver.scopeOriginal,/土木工学系の学科出身者に限る/);assert.match(waiver.conditionsOriginal,/提出することを必須とする/);
 assert.doesNotMatch(waiver.editorialNote,/未交仍可出愿/);
});
test('Nagoya mathematics, physics and urban sustainable development keep official subjects only',()=>{
 const math=find('math-mc1-general');assert.match(math.scopeOriginal,/全問を必須/);assert.match(math.scopeOriginal,/線型代数/);assert.match(math.scopeOriginal,/集合と位相/);
 assert.doesNotMatch(math.subjectsOriginal,/口述|英語/);assert.ok(!rs.some(r=>/第2次|第２次/.test(r.selectionName)));
 const day=find('math-daynight-general');assert.equal(day.course,'昼夜開講コース');assert.match(day.scopeOriginal,/昼夜開講コースも同じ試験/);
 const phys=find('physci-general');assert.equal(phys.department,'理学専攻（物理科学領域）');assert.match(phys.subjectsOriginal,/物理学筆記試験/);
 assert.ok(!phys.scopeOriginal);assert.doesNotMatch(phys.subjectsOriginal,/TOEFL|量子力学/);assert.match(phys.conditionsOriginal,/受験資格者を決める/);
 const rec=find('physci-recommendation');assert.match(rec.subjectsOriginal,/面接試験/);assert.doesNotMatch(rec.subjectsOriginal,/筆記試験/);
 const a=find('urban-sd-a-general');assert.equal(a.course,'持続発展学コース');assert.match(a.scopeOriginal,/合計5問を出題するので，3問選択/);assert.match(a.scopeOriginal,/環境化学/);
 const b=find('urban-sd-b-general');assert.match(b.scopeOriginal,/合計11問出題するので，5問選択/);assert.match(b.conditionsOriginal,/日本語で解答/);
 assert.doesNotMatch(b.scopeOriginal,/環境化学|グリーンサステイナブル/);
 const intl=find('urban-sd-international');assert.equal(intl.admissionType,'international');assert.match(intl.scopeOriginal,/環境化学/);assert.match(intl.conditionsOriginal,/内諾/);
 assert.ok(!rs.some(r=>r.course==='建築学コース'||/社会人特別/.test(r.selectionName)));
});
