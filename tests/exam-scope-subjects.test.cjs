const test=require('node:test'),assert=require('node:assert/strict');
const subjects=require('../exam-scope-subjects.js'),core=require('../exam-scope-core.js'),data=require('../exam-scope-data.js');
const record=text=>({subjectsOriginal:text,scopeOriginal:''});
const ids=r=>subjects.classify(r).map(hit=>hit.id);
test('equivalent circuit spellings share a family but retain theoretical, electronic and logic distinctions',()=>{
 for(const name of ['電気回路','回路理論','電子回路','論理回路','electronic circuits','circuit theory']) assert.ok(ids(record(name)).includes('circuits'),name);
 assert.ok(ids(record('回路理論')).includes('circuit-theory'));
 for(const name of ['電子回路論','論理回路','digital circuits']) {assert.ok(!ids(record(name)).includes('circuit-theory'),name);}
 assert.ok(!ids(record('論理回路')).includes('electronic-circuits'));
 assert.ok(!ids(record('電子回路')).includes('logic-circuits'));
});
test('electromagnetism and magnetic circuit aliases are discoverable in one related family',()=>{
 for(const name of ['電 磁 気 学','電磁氣学','電気磁気','電磁回路','磁気回路','electromagnetism']) assert.ok(ids(record(name)).includes('electromagnetism'),name);
 const c=subjects.categories.find(c=>c.id==='electromagnetism');for(const query of ['电磁气学','电磁回路','磁路']) assert.ok(subjects.search(c,query));
 assert.ok(subjects.search(subjects.categories.find(c=>c.id==='circuits'),'电子回路'));
});
test('mechanics and mathematical statistics do not absorb material/fluid/quantum/statistical mechanics',()=>{
 for(const name of ['材料力学','流体力学','量子力学','統計力学','構造力学']) assert.ok(!ids(record(name)).includes('mechanics'),name);
 assert.ok(!ids(record('統計力学')).includes('probability'));
 assert.ok(ids(record('確率・統計')).includes('probability'));
 assert.ok(ids(record('線 形 代 数')).includes('linear-algebra'));
});
test('professional categories require official subject/scope evidence, never department names or eligibility notes',()=>{
 assert.deepEqual(ids({department:'電気電子情報工学',course:'量子力学',conditionsOriginal:'大学で微分積分を履修',subjectsOriginal:'口述試験',scopeOriginal:'研究計画'}),[]);
 assert.deepEqual(ids({...record('電磁気学'),publicationStatus:'unverified'}),[]);
 assert.deepEqual(ids({...record('電磁気学'),publicationStatus:'notice'}),[]);
 const r={subjectsOriginal:'専門科目',scopeOriginal:'線形代数、電磁気学'}; assert.equal(subjects.classify(r).find(h=>h.id==='electromagnetism').field,'scopeOriginal');
});
test('external language scores are recognized without turning interview language or explicit waivers into subjects',()=>{
 assert.ok(ids({conditionsOriginal:'TOEFL or IELTS score'}).includes('english'));
 assert.ok(!ids({conditionsOriginal:'口述試験は英語で行う'}).includes('english'));
 for(const id of ['utokyo-frontier-cmp','nagoya-electrical-1-waiver']) assert.ok(!ids(data.records.find(r=>r.id===id)).includes('english'),id);
 assert.ok(ids(data.records.find(r=>r.id==='waseda-electronic-physical')).includes('english'));
 assert.ok(ids(data.records.find(r=>r.id==='utokyo-frontier-he-int')).includes('english'));
});
test('AND/OR match distinct subjects within one record and compose with existing school/type/keyword filters',()=>{
 const universities=[{id:'a',name:'A'},{id:'b',name:'B'}];
 const records=[{id:'1',universityId:'a',admissionType:'general',graduateSchool:'G',department:'D',entryYear:'2027',subjectsOriginal:'線形代数 電磁気学'},{id:'2',universityId:'b',admissionType:'general',graduateSchool:'G',department:'D',entryYear:'2027',subjectsOriginal:'電子回路'},{id:'3',universityId:'b',admissionType:'general',graduateSchool:'G',department:'D',entryYear:'2027',subjectsOriginal:'線形代数'}];
 const state={universityId:'all',admissionType:'general',graduateSchool:'all',department:'all',entryYear:'all',query:'',subjectIds:['linear-algebra','electromagnetism']};
 assert.deepEqual(core.filter(records,universities,state).map(r=>r.id),['1']);
 assert.deepEqual(core.filter(records,universities,{...state,subjectMode:'any'}).map(r=>r.id),['1','3']);
 assert.deepEqual(core.filter(records,universities,{...state,subjectIds:['circuits','linear-algebra']}).map(r=>r.id),[]);
 assert.deepEqual(core.filter(records,universities,{...state,subjectIds:[]}),records);
 assert.deepEqual(core.filter(records,universities,{...state,query:'B'}),[]);
 assert.equal(subjects.matches(records[0],['linear-algebra','linear-algebra']),true);
 assert.equal(subjects.matches(records[0],['bogus']),false);
});
test('classification is deterministic, preserves all source records, and uses only declared category IDs',()=>{
 const before=JSON.stringify(data),allowed=new Set(subjects.categories.map(c=>c.id));
 for(const r of data.records) { for(const h of subjects.classify(r)) {assert.ok(allowed.has(h.id)); assert.ok(['subjectsOriginal','scopeOriginal','conditionsOriginal'].includes(h.field)); assert.ok(h.term);} }
 assert.equal(JSON.stringify(data),before);
});
test('answer language is not a language subject, while scientific English and abbreviated professional scopes are classified',()=>{
 assert.ok(!ids({scopeOriginal:'日本語または英語で解答してください。'}).includes('english'));
 assert.ok(!ids({scopeOriginal:'日本語または英語で解答してください。'}).includes('japanese'));
 assert.ok(ids({scopeOriginal:'科学英語'}).includes('english'));
 assert.ok(ids(record('電磁、制御、直流回路')).includes('electromagnetism'));
 assert.ok(ids(record('電磁、制御、直流回路')).includes('control'));
 assert.ok(ids(record('電磁、制御、直流回路')).includes('circuit-theory'));
});
test('standalone English and English ability are subjects while interviews in English are not',()=>{
 for(const name of ['English','Mathematics\nEnglish\nOral examination','English ability','their English qualifications']) assert.ok(ids(record(name)).includes('english'),name);
 for(const name of ['Interviews and/or examinations in English take place','Interview (English Speaking)']) assert.ok(!ids(record(name)).includes('english'),name);
});
