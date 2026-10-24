const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..');
const hash=relative=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,relative))).digest('hex');
function build(config){
 const sources=[],questions=[],commonParts=[],coverage=[],ids=new Set();let first;
 if(!/^[a-z0-9-]+$/.test(config.id)||config.schemaVersion!==1)throw Error('Invalid collection');
 for(const component of config.components){
  if(!/^[a-z0-9-]+$/.test(component.paperId))throw Error('Invalid component');
  const paper=JSON.parse(fs.readFileSync(path.join(root,`assets/question-bank/${component.paperId}/paper.json`),'utf8'));
  const s=paper.source;
  if(paper.schemaVersion!==1||s.catalogId!==config.catalogId||!paper.questions.length)throw Error('Components must belong to the same catalog exam');
  if(first&&['schoolId','graduate','major','year','yearBasis'].some(k=>s[k]!==first[k]))throw Error('Different exams cannot share a collection');
  if(!/^assets\/past-papers\/documents\/[a-f0-9]{64}\.pdf$/.test(s.pdf)||hash(s.pdf)!==s.sha256)throw Error('Source hash mismatch');
  first ||= s;
  sources.push({...s,id:paper.id,displaySubject:component.subject});
  for(const q of paper.questions){
   if(ids.has(q.id)||q.review?.status!=='verified')throw Error('Duplicate or unreviewed question');ids.add(q.id);
   for(const part of q.parts)if(hash(part.src)!==part.sha256)throw Error('Question image hash mismatch');
   questions.push({...q,title:component.subject+'：'+q.title,subject:component.subject,sourceFileId:paper.id,parts:q.parts.map(p=>({...p,fileId:paper.id}))});
  }
  for(const p of paper.commonParts){if(hash(p.src)!==p.sha256)throw Error('Common image hash mismatch');commonParts.push({...p,fileId:paper.id});}
  coverage.push(...paper.coverage.map(c=>({...c,fileId:paper.id})));
 }
 if(!first)throw Error('Empty collection');
 const {pdf,sha256,pageCount,originalName,normalization,...metadata}=first;
 return {schemaVersion:2,id:config.id,title:config.title,source:{...metadata,subject:'专业科目合卷',subjects:config.components.map(c=>c.subject),originalSubject:sources.map(s=>s.originalSubject).join('・'),note:config.note,files:sources},components:config.components,commonParts,questions,coverage};
}
function serialize(data){return JSON.stringify(data,null,2)+'\n';}
function configs(){return fs.readdirSync(path.join(root,'data/question-collections')).filter(n=>n.endsWith('.json')).map(n=>JSON.parse(fs.readFileSync(path.join(root,'data/question-collections',n),'utf8')));}
if(require.main===module){for(const config of configs()){const data=build(config),target=path.join(root,`assets/question-bank/${config.id}/paper.json`),content=serialize(data);if(process.argv.includes('--check')){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==content)throw Error('Collection needs rebuild: '+config.id);}else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content);}console.log(`${config.id}: ${data.source.files.length} source PDFs, ${data.questions.length} questions`);}}
module.exports={build,serialize,configs};
