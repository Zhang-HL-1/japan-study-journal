(function(root){
  'use strict';
  const merc = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * 180 / Math.PI;
  const project = (lat,lng) => ({x:(lng-122.4)*1000/24.2,y:(merc(46.2)-merc(lat))*1000/24.2});
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  function fit(points,width,height,padding=65,maxScale=12){
    if(!points.length) return fit([project(45.6,128.5),project(30.4,145.5)],width,height,padding,1);
    const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
    const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
    const scale=clamp(Math.min(Math.max(1,width-padding*2)/Math.max(8,x1-x0),Math.max(1,height-padding*2)/Math.max(8,y1-y0)),0.1,maxScale);
    return {scale,x:width/2-(x0+x1)*scale/2,y:height/2-(y0+y1)*scale/2};
  }
  function zoom(view,anchor,factor,min=0.1,max=80){
    const scale=clamp(view.scale*factor,min,max),ratio=scale/view.scale;
    return {scale,x:anchor.x-(anchor.x-view.x)*ratio,y:anchor.y-(anchor.y-view.y)*ratio};
  }
  function screen(point,view){return {x:point.x*view.scale+view.x,y:point.y*view.scale+view.y};}
  function matches(c,state,universities){
    if(state.school!=='all'&&c.universityId!==state.school)return false;
    if(state.region!=='all'&&c.region!==state.region)return false;
    if(state.graduate!=='all'&&!c.units.some(u=>u.graduateSchool===state.graduate))return false;
    const school=universities.find(u=>u.id===c.universityId);
    const text=JSON.stringify([c,school]).normalize('NFKC').toLowerCase();
    return state.query.normalize('NFKC').toLowerCase().trim().split(/\s+/).every(term=>text.includes(term));
  }
  function clusters(points,radius=30){
    const groups=[];
    for(const point of points){
      let group=groups.find(g=>Math.hypot(g.x-point.x,g.y-point.y)<radius);
      if(!group)groups.push(group={x:point.x,y:point.y,items:[]});
      group.items.push(point);group.x=group.items.reduce((s,p)=>s+p.x,0)/group.items.length;group.y=group.items.reduce((s,p)=>s+p.y,0)/group.items.length;
    }
    return groups;
  }
  function examLink(c,unit){
    const params=new URLSearchParams({school:c.universityId,graduate:unit.graduateSchool});
    if(unit.departments?.length===1)params.set('department',unit.departments[0]);
    return 'exam-scope.html?'+params;
  }
  const api={project,fit,zoom,screen,matches,clusters,examLink};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CampusMapCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
