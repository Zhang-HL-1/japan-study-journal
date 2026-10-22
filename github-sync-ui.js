(function(){
 'use strict';
 const get=id=>document.getElementById(id),sync=window.JournalSync;if(!sync){get('github-sync-status').textContent='同步模块暂未载入，请刷新页面；本地收藏仍可使用。';return;}
 function render(){const s=sync.status(),busy=s.phase==='syncing';get('github-sync-badge').textContent=busy?'同步中':s.connected?'已连接':'未连接';get('github-sync-status').textContent=s.error||(!s.connected?'未连接 GitHub，当前仅使用本地数据。':busy?'正在拉取、合并并核对数据…':s.lastSyncAt?'已连接 '+s.owner+' · 上次同步 '+new Date(s.lastSyncAt).toLocaleString('zh-CN'):'已连接 '+s.owner+'，等待完成首次同步。');get('github-sync-status').classList.toggle('sync-error',!!s.error);
  for(const id of ['github-sync-now','github-sync-pull'])get(id).disabled=!s.connected||busy;get('github-sync-disconnect').disabled=!s.connected;get('github-sync-connect').disabled=busy;
  get('github-sync-link').hidden=!s.connected;if(s.connected)get('github-sync-link').href=s.gistUrl;
 }
 get('github-sync-form').addEventListener('submit',async e=>{e.preventDefault();const token=get('github-sync-token').value,id=get('github-sync-id').value;get('github-sync-token').value='';const result=await sync.connect(token,id);if(result.ok)get('github-sync-settings').open=false;render();});
 get('github-sync-backup').addEventListener('click',()=>{try{const raw=localStorage.getItem(window.JournalGitHubSync.BACKUP);if(!raw){get('github-sync-status').textContent='首次连接前会自动保留本机数据备份。';return;}const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='留日手记-连接前备份.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch{get('github-sync-status').textContent='备份暂时无法导出，请检查浏览器存储设置。';}});
 get('github-sync-now').addEventListener('click',()=>void sync.syncNow());get('github-sync-pull').addEventListener('click',()=>void sync.pull());get('github-sync-disconnect').addEventListener('click',()=>{try{sync.disconnect();get('github-sync-settings').open=true;get('github-sync-token').value='';}catch{get('github-sync-status').textContent='本机同步设置暂未能移除，请检查浏览器存储设置后重试。';}});
 window.addEventListener('journal-sync-status',render);render();
})();
