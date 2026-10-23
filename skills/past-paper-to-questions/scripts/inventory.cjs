#!/usr/bin/env node
// Produce a resumable source queue; never interpret a PDF/page as a question.
const fs=require('node:fs'),path=require('node:path');
function inventory(root){
 const catalog=require(path.join(root,'past-papers-data.js'));
 const dir=path.join(root,'data/question-manifests');
 const manifests=fs.existsSync(dir)?fs.readdirSync(dir).filter(n=>n.endsWith('.json')).map(n=>({file:'data/question-manifests/'+n,data:JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'))})):[];
 const files=new Map();let groups=0;
 for(const paper of catalog.papers){const questions=paper.files.filter(f=>f.kind==='question');if(questions.length)groups++;
  for(const f of questions){
   if(!files.has(f.url))files.set(f.url,{pdf:f.url,pages:f.pages,references:[],manifests:[]});
   files.get(f.url).references.push({catalogId:paper.id,schoolId:paper.universityId,title:paper.title,department:paper.department,yearBasis:paper.yearBasis,label:f.label,originalName:f.originalName,startPage:f.startPage||1,endPage:f.endPage||null});
  }
 }
 for(const m of manifests){const entry=files.get(m.data.source.pdf);if(entry)entry.manifests.push({id:m.data.id,path:m.file,questions:m.data.questions.length,reviewed:m.data.questions.every(q=>q.review?.status==='verified')&&m.data.coverage.every(c=>c.reviewed===true)});}
 const sources=[...files.values()].sort((a,b)=>a.pdf.localeCompare(b.pdf));
 for(const s of sources)s.status=s.manifests.length?'manifest-present':'pending';
 return {schemaVersion:1,summary:{catalogGroups:groups,uniqueQuestionPdfs:sources.length,uniqueQuestionPdfPages:sources.reduce((n,s)=>n+s.pages,0),pdfsWithManifests:sources.filter(s=>s.manifests.length).length,pendingPdfs:sources.filter(s=>!s.manifests.length).length,reviewedQuestions:manifests.reduce((n,m)=>n+m.data.questions.filter(q=>q.review?.status==='verified').length,0)},sources};
}
if(require.main===module){const args=process.argv.slice(2);const value=k=>{const i=args.indexOf(k);return i<0?null:args[i+1];};const root=path.resolve(value('--repo')||'.');const result=inventory(root),output=value('--output');if(output){fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');}console.log(JSON.stringify(result.summary,null,2));}
module.exports={inventory};
