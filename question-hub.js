(async function() {
  'use strict';
  const $ = id => document.getElementById(id), flow = window.QuestionFlow;
  const keys = ['school','major','year','subject','scope','search'];
  let rows = [], matched = [], records = {}, shown = 60, storageReadable = true;
  const filters = () => Object.fromEntries(keys.map(key => [key,$(key).value]));
  function options(id, entries, label) {
    const old = $(id).value;
    $(id).replaceChildren(new Option(label,''), ...entries.map(([value,text]) => new Option(text,value)));
    if ([...$(id).options].some(o => o.value === old)) $(id).value = old;
  }
  function majors() {
    options('major',[...new Map(rows.filter(q => !$('school').value || q.school === $('school').value).map(q => [q.majorKey,q.school+' / '+q.major]))],'全部专攻');
  }
  function readRecords() {
    const state = window.QuestionBank.loadQuestionRecords(localStorage);
    records = state.records; storageReadable = state.writable;
  }
  function render() {
    matched = flow.filter(rows,filters(),records);
    $('result-count').textContent = `共 ${matched.length} 道大题 · 已练习 ${matched.filter(q => records[q.id]?.completed).length} 道`;
    $('start').disabled = !matched.length;
    $('hub-message').textContent = !storageReadable ? '浏览器记录无法完整读取，练习状态可能不完整。仍可按学校和科目选题。' : !matched.length ? '没有匹配的题目，试试放宽筛选条件。' : '点击开始按当前范围连续练习；也可点击下方任意一道题开始。年份沿用原卷索引，具体入学年度或实施年见各题出处。';
    $('question-results').replaceChildren(...matched.slice(0,shown).map(q => {
      const li = document.createElement('li'), a = document.createElement('a'), title = document.createElement('strong'), meta = document.createElement('span');
      a.href = flow.url(q,false); title.textContent = `${q.number} · ${q.title}`;
      meta.textContent = `${q.school} · ${q.major} · ${q.yearLabel} · ${q.subjects.join(' / ')} · ${records[q.id]?.completed ? '已练习' : '未练习'}${records[q.id]?.bookmarked ? ' · ★ 已收藏' : ''}`;
      a.append(title,meta); a.addEventListener('click',event => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); start(q); });
      li.append(a); return li;
    }));
    $('more').hidden = matched.length <= shown;
    const params = new URLSearchParams(); for (const [key,value] of Object.entries(filters())) if (value && value !== 'all') params.set(key,value);
    history.replaceState(null,'','question-hub.html'+(params.size ? '?'+params : ''));
  }
  function start(selected) {
    const queue = matched.slice();
    if ($('order').value === 'random') for (let i=queue.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [queue[i],queue[j]]=[queue[j],queue[i]]; }
    const first = selected || queue[0]; if (!first) return;
    try {
      sessionStorage.setItem(flow.QUEUE_KEY,JSON.stringify({version:1,items:queue.map(q => ({paper:q.paper,id:q.id}))}));
      sessionStorage.setItem('japan-study-journal:question-hub-return',location.search);
      location.href = flow.url(first);
    } catch { $('hub-message').textContent = '浏览器无法保存本次题单。请允许会话存储后重试，或在新标签页打开单题链接练习。'; }
  }
  try {
    const response = await fetch('question-catalog.json'); if (!response.ok) throw new Error();
    const catalog = await response.json(); if (catalog.version !== 1 || !Array.isArray(catalog.questions)) throw new Error();
    rows = catalog.questions.sort((a,b) => b.year-a.year || a.school.localeCompare(b.school));
    try { readRecords(); } catch { storageReadable = false; }
    options('school',[...new Set(rows.map(q => q.school))].map(s=>[s,s]),'全部学校 · 跨校练习');
    options('year',[...new Set(rows.map(q=>q.year))].sort((a,b)=>b-a).map(y=>[String(y),String(y)]),'全部年份');
    options('subject',[...new Set(rows.flatMap(q=>q.subjects))].sort().map(s=>[s,s]),'全部科目');
    const params = new URLSearchParams(location.search);
    for (const key of ['school','year','subject','scope']) if ([...$(key).options].some(o=>o.value===params.get(key))) $(key).value=params.get(key);
    majors(); if ([...$('major').options].some(o=>o.value===params.get('major'))) $('major').value=params.get('major');
    $('search').value=(params.get('search')||'').slice(0,100);
    for (const key of keys) $(key).addEventListener(key==='search'?'input':'change',()=>{if(key==='school') majors(); shown=60;render();});
    $('reset').addEventListener('click',()=>{keys.forEach(key=>$(key).value=key==='scope'?'all':'');majors();shown=60;render();});
    $('more').addEventListener('click',()=>{shown+=60;render();}); $('start').addEventListener('click',()=>start());
    window.addEventListener('pageshow',()=>{try {readRecords();} catch {storageReadable=false;} render();});
    render();
  } catch { $('result-count').textContent='题目加载失败'; $('hub-message').textContent='请刷新重试，或从整卷练习进入原卷。'; }
})();
