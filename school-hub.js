(function(){
 'use strict';
 const get=id=>document.getElementById(id),data=window.SCHOOL_HUB_DATA;
 if(!data||!Array.isArray(data.schools)){get('hub-status').textContent='院校目录暂时无法加载，请刷新重试。考试范围和过去问仍可从顶部导航进入。';return;}
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const link=(text,href)=>{const n=el('a',text);n.href=href;return n;};
 const normalize=text=>text.normalize('NFKC').toLowerCase().trim();
 const state={school:'',q:'',region:''};
 function href(page,values){const params=new URLSearchParams(Object.entries(values).filter(([,v])=>v));return page+(params.size?'?'+params:'');}
 function hub(school){return href('schools.html',{...state,school});}
 function target(page,school,graduate='',admission=''){return href(page,{school,graduate,admission});}
 function actions(school,group){
  const box=el('div',undefined,'hub-actions'),name=group.name||'';
  if(group.general)box.append(link('一般入试 · '+group.general+' 条',target('exam-scope.html',school,name)));
  if(group.international)box.append(link('留学生相关 · '+group.international+' 条',target('exam-scope.html',school,name,'international')));
  if(!group.records)box.append(el('span','考试范围待收录','hub-pending'));
  if(group.papers)box.append(link('过去问 · '+group.papers+' 组',target('past-papers.html',school,name)));
  else box.append(el('span','过去问待收录','hub-pending'));
  const count=Array.isArray(group.campuses)?group.campuses.length:group.campuses;
  if(count)box.append(link('校区地图 · '+count+' 处',target('campus-map.html',school,name)));
  else box.append(el('span','校区对应待补充','hub-pending'));
  return box;
 }
 function renderDetail(school){
  const detail=get('hub-detail');detail.replaceChildren();
  const back=link('← 返回院校目录',hub(''));back.className='hub-back';detail.append(back);
  const heading=el('div',undefined,'hub-school-heading');heading.append(el('h2','资料概览'));
  if(school.aliases?.length)heading.append(el('p',school.aliases.join(' · '),'hub-muted'));
  heading.append(el('p',`${school.records} 条考试范围 · ${school.papers} 组过去问 / ${school.pdfs} 个唯一 PDF · ${school.campuses.length} 处校区／研究基地`));detail.append(heading);
  // School.name is a label, not a graduate filter.
  detail.append(actions(school.id,{...school,name:''}));
  if(school.verifiedFrom)detail.append(el('p',`考试资料核对日期：${school.verifiedFrom}${school.verifiedTo!==school.verifiedFrom?' 至 '+school.verifiedTo:''}。各条资料的招生年度与核对日期请在详情中确认。`,'hub-muted'));
  detail.append(el('p','以下数量仅代表本站收录，不代表学校全部招生项目。留学生相关可能包含一般入试，两类数量不可直接相加；历史原卷名称不自动对应当前招生要求。','hub-notice'));
  detail.append(el('h3','按研究科继续查阅'));
  const groups=el('div',undefined,'hub-graduates');
  for(const g of school.graduates){
   const card=el('article',undefined,'hub-graduate');card.append(el('h4',g.name));
   if(!g.records&&g.papers)card.append(el('p','仅有历史原卷记录，尚未收录同名研究科的考试范围。','hub-muted'));
   card.append(actions(school.id,g));groups.append(card);
  }
  detail.append(groups);
  const campus=el('section',undefined,'hub-campus');campus.append(el('h3','已收录校区'));
  const list=el('ul');
  for(const c of school.campuses){const li=el('li');li.append(el('strong',c.name),el('span',`${c.prefecture} · ${c.city}`));list.append(li);}
  campus.append(list,el('p','校区是目录中的教学／研究地点，具体研究室位置请以校方说明为准。','hub-muted'),link('打开本校地图 →',target('campus-map.html',school.id)));detail.append(campus);
 }
 function render(){
  const school=data.schools.find(s=>s.id===state.school);
  get('hub-picker').value=state.school;
  get('hub-directory').hidden=!!school;get('hub-detail').hidden=!school;get('hub-search-panel').hidden=!!school;
  get('hub-title').textContent=school?school.name:'先选一所学校，\n把资料放在一起。';
  document.title=school?school.name+'｜院校资料 · 留日手记':'院校资料｜留日手记';
  if(school){renderDetail(school);get('hub-status').textContent='已打开 '+school.name+' 的资料汇总。';return;}
  get('hub-detail').replaceChildren();
  const terms=normalize(state.q).split(/\s+/).filter(Boolean);
  const matches=data.schools.filter(s=>(!state.region||s.regions.includes(state.region))&&terms.every(t=>normalize([s.name,...(s.aliases||[])].join(' ')).includes(t)));
  get('hub-status').textContent=`找到 ${matches.length} 所大学 / 共 ${data.schools.length} 所。`;
  const list=get('hub-cards');list.replaceChildren();
  for(const s of matches){const a=link('',hub(s.id));a.className='hub-card';a.append(el('span',s.regions.map(id=>data.regions.find(r=>r.id===id)?.name||id).join(' · '),'hub-muted'),el('h2',s.name),el('p',`${s.records} 条考试范围 · ${s.papers? s.papers+' 组过去问':'过去问待收录'}`),el('span','查看院校资料 →','hub-card-action'));list.append(a);}
  get('hub-empty').hidden=matches.length>0;
 }
 function restore(){
  const p=new URLSearchParams(location.search);state.school=data.schools.some(s=>s.id===p.get('school'))?p.get('school'):'';state.q=(p.get('q')||'').slice(0,100);state.region=data.regions.some(r=>r.id===p.get('region'))?p.get('region'):'';
  get('hub-query').value=state.q;get('hub-region').value=state.region;render();history.replaceState(null,'',hub(state.school));
 }
 function option(value,text){const o=el('option',text);o.value=value;return o;}
 get('hub-picker').append(...data.schools.map(s=>option(s.id,s.name)));get('hub-region').append(...data.regions.map(r=>option(r.id,r.name)));
 get('hub-picker').addEventListener('change',()=>{state.school=get('hub-picker').value;history.pushState(null,'',hub(state.school));render();get('hub-content').focus({preventScroll:true});});
 get('hub-query').addEventListener('input',()=>{state.q=get('hub-query').value;render();history.replaceState(null,'',hub(''));});
 get('hub-region').addEventListener('change',()=>{state.region=get('hub-region').value;render();history.replaceState(null,'',hub(''));});
 get('hub-reset').addEventListener('click',()=>{state.q='';state.region='';get('hub-query').value='';get('hub-region').value='';render();history.replaceState(null,'',hub(''));get('hub-query').focus();});
 window.addEventListener('popstate',restore);restore();
})();
