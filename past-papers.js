(function(){
  'use strict';
  const get=id=>document.getElementById(id),core=window.PastPapersCore,catalog=window.CAMPUS_MAP_DATA,data=window.PAST_PAPERS_DATA;
  function error(message){get('paper-error').textContent=message;get('paper-error').hidden=false;}
  if(!core||!Array.isArray(catalog?.universities)||!Array.isArray(data?.papers)){error('资料暂时无法载入，请刷新页面。');get('paper-school-total').textContent='学校索引暂时无法载入';return;}
  const universities=catalog.universities,seen=new Set();
  const papers=data.papers.filter(p=>{if(!core.validPaper(p,universities)||seen.has(p.id))return false;seen.add(p.id);return true;});
  if(papers.length!==data.papers.length)error('部分真题资料未能载入，其余资料仍可查阅。');
  const nav=window.StudyNavigation;
  const defaults={school:'all',graduate:'all',department:'all',year:'all',query:''};
  const fields={school:'school',graduate:'graduate',department:'department',year:'year',query:'q'};
  const state={...defaults};let selected=null,selectedFile=0;
  function currentURL(){return nav.url('past-papers.html',state,defaults,fields,{paper:selected,file:selected&&selectedFile?selectedFile:''});}
  function restore(){
    const previousSelected=selected;
    Object.assign(state,nav.read(window.location?.search,defaults,fields));
    if(!universities.some(u=>u.id===state.school))state.school='all';
    state.query=state.query.slice(0,100);
    const params=new URLSearchParams(window.location?.search||'');
    const paper=papers.find(p=>p.id===params.get('paper'));
    selected=paper?.id||null;selectedFile=Number(params.get('file'))||0;
    if(paper&&!params.has('school'))state.school=paper.universityId;
    const context=nav.resolveContext(papers,{school:state.school,graduate:state.graduate,department:state.department},'universityId','graduateSchool');
    get('paper-context-note').hidden=true;
    if(params.get('from')==='scope'){
      state.graduate=context.graduate;state.department=context.department;
      get('paper-context-note').hidden=false;
      get('paper-context-note').textContent=context.broadened?'历史原卷名称与当前专攻未完全对应，已放宽筛选。请核对下方研究科、专攻和原卷封面。':'已带入考试资料的学校与专攻；历年原卷不代表当前招生要求，请同时核对当年募集要项。';
    }
    get('paper-query').value=state.query;get('paper-school-query').value='';
    render();
    if(params.has('paper')&&!selected){get('paper-context-note').hidden=false;get('paper-context-note').textContent='这份真题已不在当前目录中，请重新检索；原书桌记录会保留。';}
    if(selected)openPaper(paper,false,selectedFile,true);
    else if(previousSelected){const row=[...get('paper-results').querySelectorAll('button')].find(b=>b.dataset.paper===previousSelected);row?.focus({preventScroll:true});row?.scrollIntoView({block:'nearest',behavior:'auto'});}
  }
  function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
  function button(text,fn,cls){const n=el('button',text,cls);n.type='button';n.addEventListener('click',fn);return n;}
  function option(v,t){const n=el('option',t);n.value=v;return n;}
  function link(text,url){const n=el('a',text);n.href=url;n.target='_blank';n.rel='noopener noreferrer';return n;}
  function schoolName(id){return universities.find(u=>u.id===id)?.name||'';}

  get('paper-total').textContent=String(papers.length);get('paper-school-total').textContent=`${universities.length} 所大学的学校索引`;
  function renderSchools(){
    const list=get('paper-schools'),matches=core.schools(universities,get('paper-school-query').value);
    function row(id,name){
      const count=papers.filter(p=>id==='all'||p.universityId===id).length;
      const n=button(name,()=>{setSchool(id);const current=[...get('paper-schools').querySelectorAll('button')].find(b=>b.dataset.school===id);current?.focus({preventScroll:true});},'paper-school');
      n.dataset.school=id;n.setAttribute('aria-pressed',String(state.school===id));n.title=count?`${count} 组过去问`:'过去问待收录';return n;
    }
    list.replaceChildren(row('all','全部学校'),...matches.map(u=>row(u.id,u.name)));
    const select=get('paper-school-select');
    select.replaceChildren(option('all','全部学校'),...universities.map(u=>option(u.id,u.name)));select.value=state.school;
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
  function openPaper(p,push=true,fileIndex=0,focus=true){
    selected=p.id;const detail=get('paper-detail');detail.hidden=false;
    detail.replaceChildren(el('p',`${schoolName(p.universityId)} · ${core.yearOf(p)}年`),el('h3',p.title),el('p',[p.graduateSchool,p.department,p.selectionName].filter(Boolean).join(' / ')));
    const shareActions=nav.share(document,window,nav.url('past-papers.html',state,defaults,fields,{paper:p.id,file:fileIndex||''}));
    const scope=el('a','查看此校考试范围 →');scope.href=nav.url('exam-scope.html',{}, {}, {}, {school:p.universityId,graduate:p.graduateSchool,department:p.department,from:'papers'});
    shareActions.append(scope);detail.append(shareActions);
    if(p.originalYear)detail.append(el('p',(p.yearEvidence==='source-directory'?'原目录年度：':'原卷入学年度：')+p.originalYear));
    if(p.examDates?.length)detail.append(el('p','实际考试日期：'+p.examDates.join('、')));
    if(p.subjects?.length)detail.append(el('p','考试科目：'+p.subjects.join('、')));
    const files=el('div',undefined,'paper-files'),reader=el('div',undefined,'paper-reader'),desk=el('div');detail.append(desk);
    function read(file,index,changeURL=true){
      selectedFile=index;
      if(window.StudyDeskControls)desk.replaceChildren(window.StudyDeskControls.attach({type:'paper',id:p.id,title:p.title,subtitle:[schoolName(p.universityId),p.graduateSchool,p.department].filter(Boolean).join(' · '),file:index,admission:'general'}));
      if(changeURL)nav.write(window,currentURL());
      // Recreate share controls so the copied URL always includes the current PDF tab.
      shareActions.replaceChildren(...nav.share(document,window,currentURL()).children,scope);
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
    detail.append(button('收起原卷',()=>{closeDetail();nav.write(window,currentURL(),true);render();const row=[...get('paper-results').querySelectorAll('button')].find(b=>b.dataset.paper===p.id);row?.focus({preventScroll:true});row?.scrollIntoView({block:'nearest',behavior:'auto'});},'paper-close'));
    get('paper-results').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.paper===selected)));
    const index=Number.isInteger(fileIndex)&&fileIndex>=0&&fileIndex<p.files.length?fileIndex:0;
    selectedFile=index;nav.write(window,currentURL(),push);
    read(p.files[index],index,false);
    if(focus){detail.focus({preventScroll:true});detail.scrollIntoView({block:'start',behavior:'auto'});}
  }
  function render(){
    if(get('paper-school-link'))get('paper-school-link').href='schools.html'+(state.school==='all'?'':'?'+new URLSearchParams({school:state.school}));
    updateOptions();renderSchools();const matches=core.filter(papers,universities,state);
    const note=get('paper-school-note'),schoolNote=data.schoolNotes?.[state.school];note.replaceChildren();note.hidden=!schoolNote;
    if(schoolNote){note.append(el('p',schoolNote.text));(schoolNote.supplements||[]).forEach(file=>{const url=core.fileURL(file);if(url)note.append(link(file.label+' ↗',url));});}
    const heading=state.school==='all'?'全部学校':schoolName(state.school);get('paper-results-title').textContent=heading;
    get('paper-results-count').textContent=`${matches.length} 份真题${papers.length===0?' · 尚未添加真题':''}`;
    const results=get('paper-results');results.replaceChildren(...matches.map(p=>{const n=button('',()=>openPaper(p),'paper-result');n.dataset.paper=p.id;n.setAttribute('aria-pressed',String(selected===p.id));n.append(el('small',`${schoolName(p.universityId)} · ${core.yearOf(p)}年`),el('strong',p.title),el('span',[p.graduateSchool,p.department,p.selectionName].filter(Boolean).join(' / ')),el('small','阅读原卷 →'));return n;}));
    if(!matches.some(p=>p.id===selected))closeDetail();
    get('paper-empty').hidden=matches.length>0;
    if(!papers.length){get('paper-empty-title').textContent=state.school==='all'?'为下一份真题，留一个位置。':`尚未添加${heading}的真题。`;get('paper-empty-copy').textContent='过去问题库已经准备好，真题稍后添加。你可以先选择学校，或去刷题练习与查阅考试范围。';}
    else {get('paper-empty-title').textContent='暂时没有匹配的真题。';get('paper-empty-copy').textContent='试试其他学校、研究科、年份或关键词，也可以重置筛选。';}
    get('paper-scope-link').href=nav.url('exam-scope.html',{}, {}, {}, {school:state.school==='all'?'':state.school,graduate:state.graduate==='all'?'':state.graduate,department:state.department==='all'?'':state.department,from:'papers'});
    nav.write(window,currentURL());
  }
  function setSchool(school){Object.assign(state,{school,graduate:'all',department:'all',year:'all'});closeDetail();render();}
  get('paper-school-select').addEventListener('change',e=>setSchool(e.target.value));
  get('paper-school-query').addEventListener('input',renderSchools);
  get('paper-filters').addEventListener('submit',e=>e.preventDefault());
  get('paper-graduate').addEventListener('change',e=>{state.graduate=e.target.value;closeDetail();render();});
  get('paper-department').addEventListener('change',e=>{state.department=e.target.value;closeDetail();render();});
  get('paper-year').addEventListener('change',e=>{state.year=e.target.value;closeDetail();render();});
  get('paper-query').addEventListener('input',e=>{state.query=e.target.value;closeDetail();render();});
  get('paper-reset').addEventListener('click',()=>{Object.assign(state,{school:'all',graduate:'all',department:'all',year:'all',query:''});get('paper-school-query').value='';get('paper-query').value='';closeDetail();render();});
  window.addEventListener?.('popstate',restore);
  restore();
})();

