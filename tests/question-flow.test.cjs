const test=require('node:test'),assert=require('node:assert/strict');
const flow=require('../question-flow.js'),catalog=require('../question-catalog.json');
test('year switches preserve subject, major, search and practice scope, skipping missing years',()=>{
 const rows=catalog.questions, q=rows.find(q=>q.paper==='waseda-eps-2019'&&q.subjects.includes('力学'));
 const filters={school:q.school,major:q.majorKey,subject:'力学',year:'2019',scope:'unanswered',search:'力学'};
 const current=flow.filter(rows,filters), items=current.map(q=>({paper:q.paper,id:q.id}));
 const result=flow.adjacentYears(rows,items,filters);
 assert.equal(result.previous.year,2018);assert.equal(result.next.year,2021);
 for(const target of [result.previous,result.next]) assert.deepEqual(target.items,flow.filter(rows,{...filters,year:String(target.year)}).map(q=>({paper:q.paper,id:q.id})));
 const records=Object.fromEntries(result.next.items.map(q=>[q.id,{completed:true}]));
 assert.equal(flow.adjacentYears(rows,items,filters,records).next.year,2022);
 assert.equal(flow.adjacentYears(rows,[items[0],result.next.items[0]],filters),null);
 assert.equal(flow.adjacentYears(rows,[{id:'missing',paper:'missing'}],filters),null);
});
test('direct-paper year switches retain exam track and have explicit year boundaries',()=>{
 const rows=catalog.questions,items=rows.filter(q=>q.paper==='tus-electrical-2024-intl');
 const result=flow.adjacentYears(rows,items,{}, {},'tus-electrical-2024-intl');
 assert.equal(result.previous,null);assert.equal(result.next.year,2025);
 assert.ok(result.next.items.every(q=>q.paper==='tus-electrical-2025-intl'));
 assert.equal(flow.adjacentYears(rows,result.next.items,{}, {},'tus-electrical-2024-intl').next,null);
 const one=rows.filter(q=>q.paper==='kobe-ee-2026-denjiki');
 const isolated=flow.adjacentYears(rows,one,{}, {},'kobe-ee-2026-denjiki');
 assert.equal(isolated.previous,null);assert.equal(isolated.next,null);
 const bookmarked={[items[0].id]:{bookmarked:true},[result.next.items[0].id]:{bookmarked:true}};
 assert.deepEqual(flow.adjacentYears(rows,items,{scope:'bookmarked'},bookmarked,'tus-electrical-2024-intl').next.items,[result.next.items[0]]);
});
test('single-question index is current, unique and retains all verified question IDs',()=>{
 assert.deepEqual(catalog,require('../scripts/build-question-catalog.cjs').build());
 assert.equal(new Set(catalog.questions.map(q=>q.id)).size,catalog.questions.length);
 const earth=catalog.questions.find(q=>q.id==='tus-electrical-2002-general-denjiki-q5');
 assert.deepEqual(earth.subjects,['电磁学']);
 const power=catalog.questions.find(q=>q.id==='science-tokyo-ee-2003-pm-power-1');assert.ok(power.subjects.includes('电力工程'));
});
test('bookmarked and unanswered select individual questions across papers',()=>{
 const rows=catalog.questions, a=rows[0],b=rows.find(q=>q.paper!==a.paper);
 const records={[a.id]:{completed:true,bookmarked:true},[b.id]:{bookmarked:true}};
 assert.deepEqual(flow.filter(rows,{scope:'bookmarked'},records).map(q=>q.id),[a.id,b.id]);
 assert.ok(!flow.filter(rows,{scope:'unanswered'},records).some(q=>q.id===a.id));
 assert.ok(flow.filter(rows,{school:b.school,year:String(b.year),scope:'unanswered'},records).some(q=>q.id===b.id));
});
test('queue rejects corrupt, duplicate and unsafe IDs without touching question records',()=>{
 assert.equal(flow.cleanQueue({version:1,items:[{paper:'../x',id:'q1'}]}),null);
 assert.equal(flow.cleanQueue({version:1,items:[{paper:'p',id:'q1'},{paper:'p',id:'q1'}]}),null);
 assert.equal(flow.readQueue({getItem:()=>'{broken'}),null);
 const q=flow.cleanQueue({version:1,items:[{paper:'a',id:'q1'},{paper:'b',id:'q2'}]});
 assert.equal(flow.url(q.items[1]),'question-practice.html?paper=b&q=q2&queue=1');
});
