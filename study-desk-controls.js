(function(){
 'use strict';
 const core=window.StudyDeskCore;if(!core)return;
 const store=core.create(()=>window.localStorage,Date.now,()=>window.JournalSync?.changed());let active=null;
 function status(node,result){const syncError=window.JournalSync?.status().error;node.textContent=result.ok?(syncError?'收藏保存在本机，GitHub 同步未完成：'+syncError:''):'书桌记录未能保存或读取，原记录未改动。可到“我的书桌”导出备份后处理。';}
 function refresh(){if(!active||!active.button.isConnected)return;const result=store.read();status(active.status,result);if(!result.ok){active.button.disabled=true;return;}active.button.disabled=false;const saved=result.data.items.some(i=>core.key(i)===core.key(active.entry)&&i.favoriteAt);active.button.textContent=saved?'★ 已收藏':'☆ 收藏到书桌';active.button.setAttribute('aria-pressed',String(saved));}
 function attach(entry){
  const group=document.createElement('div');group.className='study-detail-actions desk-controls';
  const button=document.createElement('button');button.type='button';button.className='desk-favorite';
  const link=document.createElement('a');link.href='desk.html';link.textContent='我的书桌 →';
  const note=document.createElement('span');note.setAttribute('role','status');
  const result=store.read();
  const saved=result.ok&&result.data.items.some(i=>core.key(i)===core.key(entry)&&i.favoriteAt);
  button.textContent=saved?'★ 已收藏':'☆ 收藏到书桌';button.setAttribute('aria-pressed',String(!!saved));button.disabled=!result.ok;status(note,result);
  button.addEventListener('click',()=>{const result=store.favorite(entry,button.getAttribute('aria-pressed')!=='true');if(result.ok){const saved=result.data.items.some(i=>core.key(i)===core.key(entry)&&i.favoriteAt);button.textContent=saved?'★ 已收藏':'☆ 收藏到书桌';button.setAttribute('aria-pressed',String(saved));note.textContent=saved?(window.JournalSync?.status().connected?'已收藏，已加入同步队列。':'已收藏，保存在当前浏览器。'):'已取消收藏。';}else status(note,result);});
  group.append(button,link,note);active={button,status:note,entry};return group;
 }
 window.addEventListener('storage',event=>{if(event.key===core.KEY||event.key===null)refresh();});
 window.addEventListener('journal-sync-applied',refresh);
 window.addEventListener('journal-sync-status',refresh);
 window.StudyDeskControls={attach};
})();
