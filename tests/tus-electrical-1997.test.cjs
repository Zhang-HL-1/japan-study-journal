const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
test('1997 uses one exact user screenshot with explicit incomplete fragments and no invented question numbers',()=>{
 const p=JSON.parse(fs.readFileSync('assets/question-bank/tus-electrical-1997-general/paper.json')),s=p.source.files[0].screenshot,b=fs.readFileSync(s.src);
 assert.equal(p.source.year,1997);assert.match(p.title,/用户截图，题面残缺/);assert.equal(p.questions.length,2);assert.equal(s.userAuthorizedIncomplete,true);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),s.sha256);
 assert.deepEqual(p.questions.map(q=>q.number),['上半部分','下半部分']);assert.equal(new Set(p.questions.flatMap(q=>q.parts.map(p=>p.src))).size,1);
 for(const q of p.questions){assert.match(q.title,/残缺/);assert.equal(q.parts[0].width,b.readUInt32BE(16));assert.equal(q.parts[0].height,b.readUInt32BE(20));assert.equal(q.parts[0].sha256,s.sha256);assert.equal(q.parts[0].coordinateSystem,'screenshot-pixels');assert.ok(!q.answer&&!q.explanation);}
});
