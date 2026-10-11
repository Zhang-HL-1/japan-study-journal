(function(){
  'use strict';
  const get=id=>document.getElementById(id),core=window.CampusMapCore,data=window.CAMPUS_MAP_DATA,base=window.CAMPUS_MAP_BASE;
  if(!core||!data||!base){get('map-total').textContent='地图暂时无法加载，请刷新页面。';return;}
  const viewport=get('map-viewport'),schoolById=new Map(data.universities.map(s=>[s.id,s]));
  const state={school:'all',graduate:'all',region:'all',query:''};
  let visible=[],selected=null,view={scale:1,x:0,y:0},width=1,height=1,minScale=.1,frame=0;
  const cities=[['札幌',43.062,141.354],['仙台',38.268,140.869],['東京',35.681,139.767],['横浜',35.444,139.638],['名古屋',35.17,136.88],['京都',35.01,135.76],['大阪',34.69,135.50],['神戸',34.69,135.20],['福岡',33.59,130.40],['北九州',33.88,130.88]];
  function el(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
  function button(text,fn,className){const n=el('button',text,className);n.type='button';n.addEventListener('click',fn);return n;}
  function option(value,text){const n=el('option',text);n.value=value;return n;}
  function link(text,href,external=false){const n=el('a',text);n.href=href;if(external){n.target='_blank';n.rel='noopener noreferrer';}return n;}
  function schoolName(c){return schoolById.get(c.universityId).name;}
  data.universities.forEach(s=>get('map-school').append(option(s.id,s.name)));
  get('map-total').textContent=`${data.universities.length} 所大学 · ${data.campuses.length} 处校区／研究基地`;
  for(const r of [{id:'all',name:'全国'},...data.regions]){
    const b=button(r.name,()=>{state.region=r.id;update(true);});b.dataset.region=r.id;get('map-regions').append(b);
  }
  for(const path of base.paths){const n=document.createElementNS('http://www.w3.org/2000/svg','path');n.setAttribute('d',path.d);get('map-land').append(n);}
  function graduateOptions(){
    const names=[...new Set(data.campuses.filter(c=>c.universityId===state.school).flatMap(c=>c.units.map(u=>u.graduateSchool)))];
    const select=get('map-graduate');select.replaceChildren(option('all',state.school==='all'?'先选择大学':'全部研究科'),...names.map(n=>option(n,n)));select.disabled=state.school==='all';
    if(!names.includes(state.graduate))state.graduate='all';select.value=state.graduate;
  }
  function fitVisible(){view=core.fit(visible.map(c=>core.project(c.lat,c.lng)),width,height,65,visible.length===1?18:12);draw();}
  function queueDraw(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;draw();});}
  function draw(){
    get('map-land').setAttribute('transform',`translate(${view.x} ${view.y}) scale(${view.scale})`);
    const markers=[],campusLabels=[];
    const points=visible.map(c=>({...core.screen(core.project(c.lat,c.lng),view),campus:c}));
    for(const group of core.clusters(points)){
      if(group.x<-40||group.y<-40||group.x>width+40||group.y>height+40)continue;
      const count=group.items.length,c=group.items[0].campus;
      const b=button(count>1?String(count):'',()=>{
        if(count===1){selectCampus(c,false);return;}
        if(view.scale<79){view=core.zoom(view,{x:group.x,y:group.y},Math.min(3,80/view.scale),minScale);view.x+=width/2-group.x;view.y+=height/2-group.y;draw();}
        else {get('map-detail').hidden=false;get('map-detail').replaceChildren(el('h3','这里有多个校区'),...group.items.map(p=>button(`${schoolName(p.campus)} · ${p.campus.name}`,()=>selectCampus(p.campus,false))));get('map-detail').scrollIntoView({block:'nearest',behavior:'smooth'});}
      },`map-marker${count>1?' cluster':''}${count===1&&c.kind==='research'?' research':''}${count===1&&selected===c.id?' selected':''}`);
      b.style.left=group.x+'px';b.style.top=group.y+'px';b.dataset.campus=count===1?c.id:'';b.dataset.count=String(count);
      b.setAttribute('aria-label',count>1?`${count} 个校区，点击放大展开`:`${schoolName(c)}，${c.name}`);b.title=count>1?group.items.map(p=>`${schoolName(p.campus)} · ${p.campus.name}`).join('\n'):`${schoolName(c)} · ${c.name}`;markers.push(b);
      if(count===1&&(visible.length<=8||view.scale>8||selected===c.id)){
        const label=el('span',`${schoolName(c)} · ${c.name}`,'map-campus-label');label.style.left=group.x+'px';label.style.top=group.y+'px';campusLabels.push(label);
      }
    }
    get('map-markers').replaceChildren(...markers);
    get('map-labels').replaceChildren(...cities.flatMap(([name,lat,lng])=>{
      if(view.scale>20)return [];
      if(view.scale<1&&['横浜','神戸','北九州','京都'].includes(name))return [];
      const p=core.screen(core.project(lat,lng),view);if(p.x<0||p.y<0||p.x>width||p.y>height)return [];
      const n=el('span',name,'map-city'+(['東京','大阪','福岡','札幌'].includes(name)?' major':''));n.style.left=p.x+'px';n.style.top=p.y+'px';return [n];
    }),...campusLabels);
    // Approximate geographic distance across 100 screen pixels at the map centre.
    const worldY=(height/2-view.y)/view.scale;
    const lat=2*Math.atan(Math.exp((Math.log(Math.tan(Math.PI/4+46.2*Math.PI/360))-worldY*24.2/1000*Math.PI/180)))*180/Math.PI-90;
    const km=100/view.scale*24.2/1000*111.32*Math.cos(lat*Math.PI/180);
    get('map-scale').textContent=`屏幕 100 px ≈ ${km<1?km.toFixed(1):Math.round(km)} km`;
    get('map-plus').disabled=view.scale>=80;get('map-minus').disabled=view.scale<=minScale;
  }
  function list(){
    get('map-list').replaceChildren(...visible.map(c=>{
      const b=button('',()=>selectCampus(c,true),'campus-row');b.dataset.campus=c.id;b.setAttribute('aria-pressed',String(selected===c.id));
      b.append(el('strong',schoolName(c)),el('span',c.name),el('small',`${c.prefecture} · ${c.city}${c.kind==='research'?' · 部分研究基地':''}`));return b;
    }));
    if(!visible.length)get('map-list').append(el('p','没有符合条件的校区。'));
  }
  function selectCampus(c,focus,fromUser=true){
    selected=c.id;
    if(focus){view=core.fit([core.project(c.lat,c.lng)],width,height,65,18);}
    const detail=get('map-detail');detail.hidden=false;
    detail.replaceChildren(el('p',schoolName(c),'detail-school'),el('h3',c.name),el('p',`${c.prefecture} · ${c.city}`),el('p',c.address),el('h4','对应大学院'));
    for(const u of c.units){
      if(state.graduate!=='all'&&u.graduateSchool!==state.graduate)continue;
      const block=el('div',undefined,'unit');block.append(el('strong',u.graduateSchool));if(u.detail)block.append(el('p',u.detail));block.append(link('查看考试科目与范围 →',core.examLink(c,u)));detail.append(block);
    }
    if(c.note)detail.append(el('p',c.note));
    detail.append(el('h4','官方依据'));
    for(const s of c.sources){if(/^https:\/\//.test(s.url)){const n=link(s.label,s.url,true);n.className='detail-source';detail.append(n);}}
    detail.append(el('p',`${c.positionAccuracy} · 核对：${c.verifiedAt}`),button('收起资料',()=>{selected=null;detail.hidden=true;list();draw();}));
    list();draw();if(fromUser){detail.parentElement.scrollTop=0;detail.focus({preventScroll:true});detail.parentElement.scrollIntoView({block:'nearest',behavior:'auto'});}
  }
  function update(fit){
    visible=data.campuses.filter(c=>core.matches(c,state,data.universities));
    if(!visible.some(c=>c.id===selected)){selected=null;get('map-detail').hidden=true;}
    else selectCampus(visible.find(c=>c.id===selected),false,false);
    get('map-count').textContent=`${visible.length} 处`;
    get('map-empty').hidden=visible.length>0;
    get('map-regions').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.region===state.region)));
    list();if(fit)fitVisible();else draw();
  }
  get('map-filters').addEventListener('submit',e=>e.preventDefault());
  get('map-school').addEventListener('change',e=>{state.school=e.target.value;state.graduate='all';graduateOptions();update(true);});
  get('map-graduate').addEventListener('change',e=>{state.graduate=e.target.value;update(true);});
  get('map-query').addEventListener('input',e=>{state.query=e.target.value;update(true);});
  get('map-reset').addEventListener('click',()=>{Object.assign(state,{school:'all',graduate:'all',region:'all',query:''});get('map-school').value='all';get('map-query').value='';graduateOptions();selected=null;get('map-detail').hidden=true;update(true);});
  function centerZoom(factor){view=core.zoom(view,{x:width/2,y:height/2},factor,minScale);draw();}
  get('map-plus').addEventListener('click',()=>centerZoom(1.65));get('map-minus').addEventListener('click',()=>centerZoom(1/1.65));get('map-fit').addEventListener('click',fitVisible);
  function local(e){const r=viewport.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  viewport.addEventListener('wheel',e=>{e.preventDefault();view=core.zoom(view,local(e),Math.exp(-e.deltaY*.002),minScale);queueDraw();},{passive:false});
  viewport.addEventListener('dblclick',e=>{if(e.target.closest('button'))return;e.preventDefault();view=core.zoom(view,local(e),2,minScale);draw();});
  viewport.addEventListener('keydown',e=>{
    if(e.target!==viewport)return;
    if(['+','=','-','0','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault();else return;
    if(e.key==='+'||e.key==='=')centerZoom(1.65);else if(e.key==='-')centerZoom(1/1.65);else if(e.key==='0')fitVisible();else{view.x+=e.key==='ArrowLeft'?60:e.key==='ArrowRight'?-60:0;view.y+=e.key==='ArrowUp'?60:e.key==='ArrowDown'?-60:0;draw();}
  });
  const pointers=new Map();let gesture=null;
  function startGesture(){
    const pts=[...pointers.values()];if(!pts.length){gesture=null;return;}
    gesture={view:{...view},center:pts.length===1?pts[0]:{x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2},distance:pts.length>1?Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y):0};
  }
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button>0)return;viewport.setPointerCapture(e.pointerId);pointers.set(e.pointerId,local(e));startGesture();});
  viewport.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId)||!gesture)return;pointers.set(e.pointerId,local(e));const pts=[...pointers.values()];
    const center=pts.length===1?pts[0]:{x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2};
    const distance=pts.length>1?Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y):0;
    view=distance&&gesture.distance?core.zoom(gesture.view,gesture.center,distance/gesture.distance,minScale):{...gesture.view};
    view.x+=center.x-gesture.center.x;view.y+=center.y-gesture.center.y;queueDraw();
  });
  for(const event of ['pointerup','pointercancel','lostpointercapture'])viewport.addEventListener(event,e=>{pointers.delete(e.pointerId);startGesture();});
  const params=new URLSearchParams(window.location.search);
  if(schoolById.has(params.get('school')))state.school=params.get('school');get('map-school').value=state.school;state.graduate=params.get('graduate')||'all';graduateOptions();
  new ResizeObserver(()=>{
    const newWidth=viewport.clientWidth,newHeight=viewport.clientHeight;
    if(width>1){view.x+=(newWidth-width)/2;view.y+=(newHeight-height)/2;}
    width=newWidth;height=newHeight;minScale=core.fit([],width,height).scale*.65;
    if(visible.length===0)update(true);else draw();
  }).observe(viewport);
  width=viewport.clientWidth;height=viewport.clientHeight;minScale=core.fit([],width,height).scale*.65;update(true);
})();
