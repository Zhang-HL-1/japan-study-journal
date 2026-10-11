(function(){
  'use strict';
  const get=id=>document.getElementById(id),core=window.PastPapersCore,catalog=window.CAMPUS_MAP_DATA,data=window.PAST_PAPERS_DATA;
  function error(message){get('paper-error').textContent=message;get('paper-error').hidden=false;}
  if(!core||!Array.isArray(catalog?.universities)||!Array.isArray(data?.papers)){error('资料暂时无法载入，请刷新页面。');get('paper-school-total').textContent='学校索引暂时无法载入';return;}
  const universities=catalog.universities,seen=new Set();
  const papers=data.papers.filter(p=>{if(!core.validPaper(p,universities)||seen.has(p.id))return false;seen.add(p.id);return true;});
  if(papers.length!==data.papers.length)error('部分真题资料未能载入，其余资料仍可查阅。');
  const state={school:'all',graduate:'all',department:'all',year:'all',query:''};let selected=null;
  function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
  function button(text,fn,cls){const n=el('button',text,cls);n.type='button';n.addEventListener('click',fn);return n;}
  function option(v,t){const n=el('option',t);n.value=v;return n;}
  function link(text,url){const n=el('a',text);n.href=url;n.target='_blank';n.rel='noopener noreferrer';return n;}
  function schoolName(id){return universities.find(u=>u.id===id)?.name||'';}
  const params=new URLSearchParams(window.location.search);if(universities.some(u=>u.id===params.get('school')))state.school=params.get('school');
  get('paper-total').textContent=String(papers.length);get('paper-school-total').textContent=`${universities.length} 所大学的学校索引`;
  function renderSchools(){
    const list=get('paper-schools'),matches=core.schools(universities,get('paper-school-query').value);
    function row(id,name){const count=papers.filter(p=>id==='all'||p.universityId===id).length;const n=button('',()=>{state.school=id;state.graduate='all';state.department='all';state.year='all';selected=null;render();},'paper-school');n.dataset.school=id;n.setAttribute('aria-pressed',String(state.school===id));n.append(el('span',name),el('small',count?`${count} 份`:'待添加'));return n;}
    list.replaceChildren(row('all','全部学校'),...matches.map(u=>row(u.id,u.name)));
    if(!matches.length)list.append(el('p','没有找到学校。试试中文别名或日文全称。'));
  }
  function updateOptions(){
    const base=papers.filter(p=>state.school==='all'||p.universityId===state.school);
    const graduates=[...new Set(base.map(p=>p.graduateSchool))].sort((a,b)=>a.localeCompare(b,'ja'));
    if(!graduates.includes(state.graduate))state.graduate='all';
    const gs=get('paper-graduate');gs.replaceChildren(option('all',graduates.length?'全部研究科':'真题添加后可筛选'),...graduates.map(g=>option(g,g)));gs.disabled=!graduates.length;gs.value=state.graduate;
    const departments=[...new Set(base.filter(p=>state.graduate==='all'||p.graduateSchool===state.graduate).map(p=>p.department).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ja'));
    if(!departments.includes(state.department))state.department='all';
    const ds=get('paper-department');ds.replaceChildren(option('all','全部专攻'),...departments.map(d=>option(d,d)));ds.disabled=!departments.length;ds.value=state.department;
    const years=[...new Set(base.filter(p=>state.graduate==='all'||p.graduateSchool===state.graduate).filter(p=>state.department==='all'||p.department===state.department).map(p=>String(core.yearOf(p))))].sort((a,b)=>Number(b)-Number(a));
    if(!years.includes(state.year))state.year='all';
    const ys=get('paper-year');ys.replaceChildren(option('all',years.length?'全部年份':'待添加'),...years.map(y=>option(y,y+'年')));ys.disabled=!years.length;ys.value=state.year;
  }
  function closeDetail(){selected=null;get('paper-detail').hidden=true;get('paper-detail').replaceChildren();}
  function openPaper(p){
    selected=p.id;const detail=get('paper-detail');detail.hidden=false;
    detail.replaceChildren(el('p',`${schoolName(p.universityId)} · ${core.yearOf(p)}年`),el('h3',p.title),el('p',[p.graduateSchool,p.department,p.selectionName].filter(Boolean).join(' / ')));
    if(p.originalYear)detail.append(el('p','卷面入学年度：'+p.originalYear));
    if(p.subjects?.length)detail.append(el('p','考试科目：'+p.subjects.join('、')));
    const files=el('div',undefined,'paper-files'),reader=el('div',undefined,'paper-reader');
    function read(file,index){
      files.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      const url=core.fileURL(file),actions=el('div',undefined,'paper-reader-actions'),frame=el('iframe');frame.src=url;frame.title=`${p.title} · ${file.label}`;frame.referrerPolicy='no-referrer';
      actions.append(link('在新窗口打开原卷 ↗',url));
      if(url.startsWith('assets/past-papers/')){const download=link('下载PDF ↓',url);download.download=file.originalName||'';actions.append(download);}
      reader.replaceChildren(actions,frame,el('p','手机或浏览器未显示PDF时，可在新窗口打开原卷。'));
    }
    p.files.forEach((f,i)=>{const n=button(f.label,()=>read(f,i));n.setAttribute('aria-pressed','false');files.append(n);});
    detail.append(files,reader);
    if(p.sourceNote)detail.append(el('p',p.sourceNote));
    if(p.sourceURL){const url=core.fileURL({url:p.sourceURL});if(url)detail.append(link('查看官方来源 ↗',url));}
    detail.append(button('收起原卷',()=>{closeDetail();render();get('paper-results').querySelector(`[data-paper="${CSS.escape(p.id)}"]`)?.focus();},'paper-close'));
    get('paper-results').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.paper===selected)));
    read(p.files.find(f=>f.kind==='question')||p.files[0],Math.max(0,p.files.findIndex(f=>f.kind==='question')));detail.focus({preventScroll:true});detail.scrollIntoView({block:'start',behavior:'auto'});
  }
  function render(){
    updateOptions();renderSchools();const matches=core.filter(papers,universities,state);
    const heading=state.school==='all'?'全部学校':schoolName(state.school);get('paper-results-title').textContent=heading;
    get('paper-results-count').textContent=`${matches.length} 份真题${papers.length===0?' · 尚未添加真题':''}`;
    const results=get('paper-results');results.replaceChildren(...matches.map(p=>{const n=button('',()=>openPaper(p),'paper-result');n.dataset.paper=p.id;n.setAttribute('aria-pressed',String(selected===p.id));n.append(el('small',`${schoolName(p.universityId)} · ${core.yearOf(p)}年`),el('strong',p.title),el('span',[p.graduateSchool,p.department,p.selectionName].filter(Boolean).join(' / ')),el('small','阅读原卷 →'));return n;}));
    if(!matches.some(p=>p.id===selected))closeDetail();
    get('paper-empty').hidden=matches.length>0;
    if(!papers.length){get('paper-empty-title').textContent=state.school==='all'?'为下一份真题，留一个位置。':`尚未添加${heading}的真题。`;get('paper-empty-copy').textContent='过去问题库已经准备好，真题稍后添加。你可以先选择学校，或去刷题练习与查阅考试范围。';}
    else {get('paper-empty-title').textContent='暂时没有匹配的真题。';get('paper-empty-copy').textContent='试试其他学校、研究科、年份或关键词，也可以重置筛选。';}
    get('paper-scope-link').href='exam-scope.html'+(state.school==='all'?'':'?school='+encodeURIComponent(state.school));
  }
  get('paper-school-query').addEventListener('input',renderSchools);
  get('paper-filters').addEventListener('submit',e=>e.preventDefault());
  get('paper-graduate').addEventListener('change',e=>{state.graduate=e.target.value;render();});
  get('paper-department').addEventListener('change',e=>{state.department=e.target.value;render();});
  get('paper-year').addEventListener('change',e=>{state.year=e.target.value;render();});
  get('paper-query').addEventListener('input',e=>{state.query=e.target.value;render();});
  get('paper-reset').addEventListener('click',()=>{Object.assign(state,{school:'all',graduate:'all',department:'all',year:'all',query:''});get('paper-school-query').value='';get('paper-query').value='';closeDetail();render();});
  render();
})();

