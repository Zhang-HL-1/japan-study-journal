// User-authorized incomplete screenshot source. Preserve the original PNG bytes.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),id='tus-electrical-1997-general-denshi';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p))),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=read(`data/question-screenshot-manifests/${id}.json`),s=m.source.screenshot,b=fs.readFileSync(path.join(root,s.src));
if(hash(b)!==s.sha256||b.readUInt32BE(16)!==s.width||b.readUInt32BE(20)!==s.height||!s.userAuthorizedIncomplete)throw Error('Screenshot source changed');
if(hash(fs.readFileSync(path.join(root,m.source.pdf)))!==m.source.sha256)throw Error('Original PDF changed');
const part={src:s.src,page:s.relatedPdfPage,box:[0,0,s.width,s.height],width:s.width,height:s.height,sha256:s.sha256,label:'用户提供的完整原截图（题面残缺，不补写）',coordinateSystem:'screenshot-pixels'};
if(m.questions.some(q=>q.review.status!=='verified'||q.answer||q.explanation)||m.coverage.some(c=>!c.reviewed))throw Error('Unreviewed screenshot');
const paper={schemaVersion:1,id:m.id,title:m.title,source:m.source,commonParts:[],questions:m.questions.map(q=>({...q,parts:[part]})),coverage:m.coverage};
const builder=require('./build-question-collections.cjs');
function output(p,data){const full=path.join(root,p),bytes=JSON.stringify(data,null,2)+'\n';if(process.argv.includes('--check')){if(fs.readFileSync(full,'utf8')!==bytes)throw Error('Screenshot assets need rebuild');}else{fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,bytes);}}
output(`assets/question-bank/${id}/paper.json`,paper);
const config=read('data/question-collections/tus-electrical-1997-general.json');output(`assets/question-bank/${config.id}/paper.json`,builder.build(config));
console.log('1997 screenshot: two incomplete fragments, one unchanged original PNG');
