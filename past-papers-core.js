(function(root){
  'use strict';
  const domains=['u-tokyo.ac.jp','kyoto-u.ac.jp','isct.ac.jp','titech.ac.jp','waseda.jp','tus.ac.jp','osaka-u.ac.jp','tohoku.ac.jp','kyushu-u.ac.jp','hokudai.ac.jp','keio.ac.jp','sophia.ac.jp','kobe-u.ac.jp','nagoya-u.ac.jp','uec.ac.jp','tsukuba.ac.jp','hit-u.ac.jp','ynu.ac.jp','meiji.ac.jp','aoyama.ac.jp','rikkyo.ac.jp','chuo-u.ac.jp','hosei.ac.jp','chiba-u.jp','chiba-u.ac.jp'];
  const normalize=v=>String(v||'').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim();
  function fileURL(file){
    if(!file||typeof file.url!=='string'||!file.url.trim())return null;
    const raw=file.url.trim();
    if(/[\u0000-\u001f\\]/.test(raw))return null;
    try{
      const url=new URL(raw,'https://study-journal.invalid/');
      if(url.username||url.password)return null;
      if(raw.startsWith('https://')){
        if(url.protocol!=='https:'||!domains.some(d=>url.hostname===d||url.hostname.endsWith('.'+d)))return null;
      }else{
        const decoded=decodeURIComponent(raw.split(/[?#]/)[0]);
        if(!decoded.startsWith('assets/past-papers/')||decoded.split('/').some(p=>p==='.'||p==='..'||!p)||/[\\\u0000-\u001f]/.test(decoded)||!decoded.toLowerCase().endsWith('.pdf')||url.origin!=='https://study-journal.invalid')return null;
        if(/%(?:2e|2f|5c|25)/i.test(raw))return null;
      }
      if(Number.isInteger(file.startPage)&&file.startPage>0&&file.startPage<=10000)url.hash='page='+file.startPage;
      return raw.startsWith('https://')?url.href:url.pathname.slice(1)+url.search+url.hash;
    }catch{return null;}
  }
  function validPaper(p,universities){
    return !!(p&&typeof p.id==='string'&&p.id.trim()&&universities.some(u=>u.id===p.universityId)&&['title','graduateSchool','selectionName'].every(k=>typeof p[k]==='string'&&p[k].trim())&&Number.isInteger(p.examYear)&&p.examYear>=1900&&p.examYear<=2200&&Array.isArray(p.files)&&p.files.length&&p.files.every(f=>f&&typeof f.label==='string'&&f.label.trim()&&['question','answer','other'].includes(f.kind)&&fileURL(f))&&(p.subjects===undefined||Array.isArray(p.subjects)&&p.subjects.every(s=>typeof s==='string')));
  }
  function schools(universities,query){const terms=normalize(query).split(' ').filter(Boolean);return universities.filter(u=>{const text=normalize([u.name,...(u.aliases||[])].join(' '));return terms.every(t=>text.includes(t));});}
  function filter(papers,universities,state){
    const terms=normalize(state.query).split(' ').filter(Boolean);
    return papers.filter(p=>{
      if(state.school!=='all'&&p.universityId!==state.school||state.graduate!=='all'&&p.graduateSchool!==state.graduate||state.year!=='all'&&String(p.examYear)!==state.year)return false;
      const school=universities.find(u=>u.id===p.universityId);
      const text=normalize([school?.name,...(school?.aliases||[]),p.title,p.graduateSchool,p.department,p.selectionName,p.examYear,...(p.subjects||[])].join(' '));return terms.every(t=>text.includes(t));
    }).sort((a,b)=>b.examYear-a.examYear||a.title.localeCompare(b.title,'ja'));
  }
  const api={normalize,fileURL,validPaper,schools,filter};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PastPapersCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
