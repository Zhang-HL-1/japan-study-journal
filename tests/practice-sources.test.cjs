const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../practice-core.js');
const make = (id, subject, provenance) => ({id, subject, provenance, title: id, prompt: '', chapter:'基础', type:'written'});
const bank = [
  make('a-em','电磁学',{kind:'exam',school:'A校',graduate:'工学',major:'电气',year:'2025',number:'2'}),
  make('a-math','数学',{kind:'exam',school:'A校',graduate:'工学',major:'电气'}),
  make('a-other','电磁学',{kind:'exam',school:'A校',graduate:'理学',major:'电气'}),
  make('b-em','电磁学',{kind:'exam',school:'B校',graduate:'工学',major:'电气'}),
  make('book-em','电磁学',{kind:'workbook',book:'电磁练习',edition:'2',chapter:'3',number:'3.2',page:'58'}),
  make('book-other','电磁学',{kind:'workbook',book:'另一本'}),
  make('original','电磁学',{kind:'original',label:'原创'})
];
const ids = (f,r={})=>core.filterQuestions(bank,f,r).map(q=>q.id);
const major=JSON.stringify(['A校','工学','电气']);
test('school major all subjects and specific subject; same-name major stays scoped',()=>{
 assert.deepEqual(ids({sourceKind:'exam',school:'A校',major}),['a-em','a-math']);
 assert.deepEqual(ids({sourceKind:'exam',school:'A校',major,subject:'电磁学'}),['a-em']);
});
test('cross-school subject and workbook-only selection',()=>{
 assert.deepEqual(ids({sourceKind:'exam',subject:'电磁学'}),['a-em','a-other','b-em']);
 assert.deepEqual(ids({sourceKind:'workbook',book:'电磁练习'}),['book-em']);
});
test('mixed selection combines scoped exams and selected workbook',()=>{
 assert.deepEqual(ids({sourceKind:'all',school:'A校',major,book:'电磁练习',subject:'电磁学'}),['a-em','book-em']);
 assert.equal(ids({sourceKind:'all'}).length,7);
 assert.deepEqual(ids({sourceKind:'exam',school:'missing'}),[]);
});
test('source filters compose with notebook, bookmarks and source search',()=>{
 assert.deepEqual(ids({sourceKind:'all',subject:'电磁学',scope:'wrong'},{'b-em':{correct:false},'book-em':{correct:false}}),['b-em','book-em']);
 assert.deepEqual(ids({sourceKind:'workbook',scope:'bookmarked'},{'book-em':{bookmarked:true}}),['book-em']);
 assert.deepEqual(ids({search:'3.2'}),['book-em']);
});
test('source labels preserve provenance and legacy text without inventing origin',()=>{
 assert.match(core.sourceLabel(bank[0]),/历年真题.*A校.*工学.*电气.*2025.*题号 2/);
 assert.match(core.sourceLabel(bank[4]),/练习册.*电磁练习.*3.2.*58/);
 assert.match(core.sourceLabel({source:'旧出处'}),/旧出处/);
 assert.notEqual(core.provenance({source:'旧出处'}).kind,'original');
});
test('new filters survive backup alongside old records',()=>{
 const s=core.blank();s.filters={sourceKind:'exam',school:'A校',major,book:'all'};
 s.records['a-em']={attempts:1,correct:true,note:'保留笔记'};
 const restored=core.cleanState(JSON.parse(JSON.stringify(s)),bank);
 assert.deepEqual(restored.filters,s.filters);assert.equal(restored.records['a-em'].note,'保留笔记');
});
