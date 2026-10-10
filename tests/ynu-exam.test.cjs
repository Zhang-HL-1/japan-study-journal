const test=require('node:test'),assert=require('node:assert/strict');
const data=require('../exam-scope-data.js'),core=require('../exam-scope-core.js');
const records=data.records.filter(r=>r.universityId==='ynu'),active=records.filter(r=>!r.publicationStatus);
const state={universityId:'ynu',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:''};
test('YNU retains formal masters fields and three independently labelled admissions schools',()=>{
 assert.equal(records.length,41);assert.equal(active.length,38);assert.ok(records.every(r=>r.degreeProgram==='master'));
 assert.deepEqual([...new Set(records.map(r=>r.graduateSchool))],['理工学府','環境情報学府','先進実践学環']);
 assert.equal(core.filter(data.records,data.universities,state).length,28);assert.equal(core.filter(data.records,data.universities,{...state,admissionType:'international'}).length,38);
 for(const query of ['横滨国立','横浜国立','横国','YNU','Yokohama National University'])assert.equal(core.filter(data.records,data.universities,{...state,universityId:'all',query}).length,28);
 assert.equal(core.filter(data.records,data.universities,{...state,entryYear:'2028年4月'}).length,0);
 for(const r of active)assert.doesNotMatch(r.selectionName,/社会人|SGU|女子|推薦/);
 assert.ok(!records.some(r=>/^(数学教育分野|物理工学教育分野|海洋空間教育分野|応用物理教育分野|数理科学プログラム)$/.test(r.course||'')));
});
test('YNU electronics is mandatory four subjects and aerospace retains its actual five-choose-three paper',()=>{
 const e=active.filter(r=>r.graduateSchool==='理工学府'&&r.selectionName.includes('電子情報システム'));assert.equal(e.length,6);
 for(const r of e){for(const w of ['線形代数学','微分積分学','電磁気学','回路理論','論理回路','アルゴリズム'])assert.ok(r.scopeOriginal.includes(w));assert.match(r.editorialNote,/没有2选1或4选2/);}
 const a=active.filter(r=>r.graduateSchool==='理工学府'&&r.selectionName.includes('海洋空間'));assert.equal(a.length,2);
 for(const r of a){assert.equal(r.course,'航空宇宙工学教育分野');assert.match(r.scopeOriginal,/船舶海洋工学.*航空宇宙工学/);assert.match(r.editorialNote,/5题中选3题.*150分换算200分/);}
 const m=active.filter(r=>r.graduateSchool==='理工学府'&&r.course==='材料工学教育分野');for(const r of m){assert.match(r.scopeOriginal,/物理化学.*統計物理学/);assert.match(r.editorialNote,/不是|没有把5题误写成任选/);}
});
test('YNU national-funded foreigners differ across schools without deleting FSE written examinations',()=>{
 const foreign=active.filter(r=>r.admissionType==='international');assert.equal(foreign.length,13);assert.ok(foreign.every(r=>r.selectionName.includes('国費')&&!r.internationalGeneral));
 const fse=foreign.filter(r=>r.graduateSchool==='理工学府');assert.equal(fse.length,11);for(const r of fse){assert.equal(r.entryYear,'2026年10月');assert.match(r.subjectsOriginal,/学科試験Ⅰ.*学科試験Ⅱ/);assert.match(r.conditionsOriginal,/奨学金.*受給/);assert.match(r.editorialNote,/签署受入内诺书.*专业笔试两卷/);}
 const eis=foreign.filter(r=>r.graduateSchool==='環境情報学府');assert.equal(eis.length,2);for(const r of eis){assert.equal(r.entryYear,'2027年4月');assert.equal(r.subjectsOriginal,'口述試験；出願書類審査。');assert.match(r.scopeOriginal,/専攻科目.*研究業績.*研究/);assert.match(r.editorialNote,/没有专业笔试或统一外部英语成绩要求/);assert.doesNotMatch(r.editorialNote,/ETS直送|IELTS Online/);}
 for(const r of active.filter(r=>r.admissionType==='general'))assert.equal(r.internationalGeneral,true);
});
test('YNU preserves current English documents and does not replace a new selection with stale instructions',()=>{
 for(const r of active.filter(r=>r.graduateSchool==='環境情報学府'&&r.admissionType==='general')){assert.match(r.editorialNote,/TOEIC.*TOEFL.*IELTS/);assert.match(r.editorialNote,/2026年1月.*PDF打印/);assert.match(r.editorialNote,/IELTS Online.*TRF打印/);assert.match(r.editorialNote,/旧英语单页未列IELTS/);assert.match(r.editorialNote,/未公开必须答几题/);assert.ok(r.sources.some(s=>s.url.includes('R8_M_2.pdf')&&s.pdfPage===9));}
 for(const r of active.filter(r=>r.graduateSchool==='理工学府')){assert.match(r.editorialNote,/0410/);assert.match(r.editorialNote,/提交日两年以内/);assert.match(r.editorialNote,/仅用于未收录的数理科学/);}
});
test('YNU IFGS research themes retain adviser-specific exams and close only the second round',()=>{
 const ifgs=records.filter(r=>r.graduateSchool==='先進実践学環');assert.equal(ifgs.length,15);
 for(const r of ifgs.filter(r=>!r.publicationStatus)){assert.match(r.department,/（研究テーマ）$/);assert.equal(r.course,undefined);assert.match(r.selectionName,/試験区分/);assert.match(r.editorialNote,/不能在学府或单元之间自行任选/);assert.match(r.editorialNote,/2026年6月1–5日/);assert.ok(r.sources.some(s=>s.url.includes('2027_IFGSippan_yoko.pdf')&&s.pdfPage===15||s.pdfPage===17));}
 const closed=ifgs.filter(r=>r.publicationStatus==='closed');assert.equal(closed.length,3);for(const r of closed){assert.match(r.selectionName,/第二次/);assert.equal(r.subjectsOriginal,undefined);assert.equal(r.scopeOriginal,undefined);assert.equal(r.internationalGeneral,undefined);assert.match(r.editorialNote,/仅该期次关闭/);}
 const q=ifgs.find(r=>r.id==='ynu-ifgs-ai-quantum-algorithm');assert.match(q.editorialNote,/瀨川悦生.*量子探索算法/);
});
test('YNU sources use only safe official URLs and actual PDF boundaries',()=>{
 const limits={'application_guidelines.pdf':63,'R8_M_2.pdf':28,'R8_M_kokuhi_2.pdf':9,'2027_IFGSippan_yoko.pdf':34};
 for(const r of records){assert.ok(core.validRecord(r,data.universities));for(const s of r.sources){assert.match(new URL(s.url).hostname,/(^|\.)ynu\.ac\.jp$/);if(s.kind==='page'){assert.equal(s.pdfPage,undefined);continue;}const limit=limits[s.url.split('/').at(-1)];assert.ok(limit&&s.pdfPage>=1&&s.pdfPage<=limit);assert.ok(core.sourceURL(s).endsWith('#page='+s.pdfPage));}}
 for(const url of ['http://ynu.ac.jp/a','https://ynu.ac.jp.evil.test/a','https://evil-ynu.ac.jp/a'])assert.equal(core.sourceURL({url,kind:'page'}),null);
});
