const test=require('node:test'),assert=require('node:assert/strict');
const flow=require('../question-flow.js'),catalog=require('../question-catalog.json');
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
