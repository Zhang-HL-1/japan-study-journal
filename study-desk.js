(function(){
 'use strict';
 const get=id=>document.getElementById(id),core=window.StudyDeskCore;
 if(!core){get('desk-status').textContent='书桌暂时无法加载，请刷新页面。';return;}
 const store=core.create(()=>window.localStorage);
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const date=time=>new Date(time).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
 function report(result,message){get('desk-status').textContent=result.ok?message:'操作未完成，原记录未改动。'+result.error+'。可先导出备份；读取异常时，备份保留原始内容。';}
 function render(){
  const result=store.read(),list=get('desk-list');list.replaceChildren();
  if(!result.ok){report(result);get('desk-empty').hidden=true;return;}
  const favorites=result.data.items;get('desk-favorites-count').textContent=String(favorites.length);
  const query=get('desk-query').value.normalize('NFKC').toLowerCase().trim(),type=get('desk-type').value;
  const items=favorites.sort((a,b)=>b.favoriteAt-a.favoriteAt).filter(i=>(!type||i.type===type)&&(!query||[i.title,i.subtitle].join(' ').normalize('NFKC').toLowerCase().includes(query)));
  get('desk-result-count').textContent='收藏 · '+items.length+' 条';
  get('desk-empty').hidden=items.length>0;
  get('desk-empty-copy').textContent=query||type?'没有匹配记录，试试其他关键词或资料类型。':'打开考试范围或过去问，点击“收藏到书桌”，就能在这里找回。';
  for(const i of items){
   const card=el('article',undefined,'desk-item'),heading=el('h3'),a=el('a',i.title);a.href=core.href(i);heading.append(a);
   card.append(el('p',i.type==='scope'?'考试范围':'历年真题','eyebrow'),heading,el('p',i.subtitle,'desk-muted'));
   const meta=el('p','收藏于 '+date(i.favoriteAt)+(i.type==='paper'?' · 原卷文件 '+(i.file+1):''),'desk-muted');card.append(meta);
   const action=el('button',i.favoriteAt?'取消收藏':'收藏到书桌');action.type='button';action.setAttribute('aria-pressed',String(!!i.favoriteAt));action.setAttribute('aria-label',(i.favoriteAt?'取消收藏：':'收藏：')+i.title);
   action.addEventListener('click',()=>{const result=store.favorite(i,!i.favoriteAt);if(result.ok){render();get('desk-result-count').focus({preventScroll:true});}report(result,i.favoriteAt?'已取消收藏。':'已加入收藏。');});card.append(action);list.append(card);
  }
 }
 get('desk-query').addEventListener('input',render);get('desk-type').addEventListener('change',render);
 get('desk-export').addEventListener('click',()=>{
  const result=store.exportText();if(!result.ok){report(result);return;}
  const url=URL.createObjectURL(new Blob([result.text],{type:'application/json'})),a=el('a');a.href=url;a.download='留日手记-我的书桌-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);report(result,'已导出书桌备份。备份包含收藏记录，请自行保管。');
 });
 get('desk-import').addEventListener('click',()=>get('desk-file').click());
 get('desk-file').addEventListener('change',async()=>{
  const file=get('desk-file').files[0];if(!file)return;
  try{if(file.size>core.MAX_BYTES)throw Error('文件超过 1 MB');const result=store.importText(await file.text());if(result.ok)render();report(result,'备份已合并，相同资料只保留一条；现有收藏不会被删除。');}catch(error){report({ok:false,error:error.message});}finally{get('desk-file').value='';}
 });
 get('desk-clear-all').addEventListener('click',()=>{if(!window.confirm('清空本浏览器的全部书桌收藏？建议先导出备份。刷题记录不受影响。'))return;const result=store.clear();if(result.ok)render();report(result,'书桌已清空，刷题记录未改动。');});
 window.addEventListener('storage',event=>{if(event.key===core.KEY||event.key===null){render();const r=store.read();if(r.ok)report(r,'书桌已与其他标签页同步。');}});
 render();
})();
