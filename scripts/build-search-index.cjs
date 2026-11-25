#!/usr/bin/env node
'use strict';
// 生成全站搜索索引 data/search-index.json：页面、学校、考试范围（学校/研究科/专攻）、过去问、逐题卷、知识点。
// 每条只存 [类型, 标题, 副标题, 链接, 额外关键词]，搜索时在浏览器里再做繁简归一化。
// 用法：node scripts/build-search-index.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const OUT = 'data/search-index.json';
const q = obj => new URLSearchParams(Object.entries(obj).filter(([, v]) => v)).toString();

function build() {
  const hub = require('../school-hub-data.js');
  const scopes = require('../exam-scope-data.js').records;
  const papers = require('../past-papers-data.js').papers;
  const bank = JSON.parse(fs.readFileSync(path.join(root, 'question-bank-index.json'), 'utf8')).papers;
  const topics = JSON.parse(fs.readFileSync(path.join(root, 'data/topics/topic-index.json'), 'utf8'));
  const schoolName = new Map(hub.schools.map(s => [s.id, s.name]));
  const entries = [];

  const pages = [
    ['index.html', '首页', '留日手记', 'home 主页'],
    ['practice.html', '练习室', '过去问、答案、刷题的入口', 'practice 练习'],
    ['topics.html', '按知识点练', '各校同类题放在一起练', 'topic 知识点 分类'],
    ['drill.html', '刷题练习', '按学校、年份和科目刷题', 'drill 刷题 错题'],
    ['past-papers.html', '过去问题库', '历年真题原卷', 'past paper 过去问 真题 原卷'],
    ['answers.html', '答案书架', '练习册答案', 'answer 答案 解答'],
    ['exam-scope.html', '考试科目与范围', '募集要项、科目与出题范围', 'scope 范围 要项 出願'],
    ['schools.html', '院校资料', '按地区和学校浏览', 'school 院校 大学'],
    ['campus-map.html', '大学院地图', '校区位置地图', 'map 地图 校区'],
    ['desk.html', '我的书桌', '收藏、目标学校与同步', 'desk 书桌 收藏 目标 倒计时'],
  ];
  for (const [url, title, sub, extra] of pages) entries.push(['page', title, sub, url, extra]);

  for (const s of hub.schools) {
    entries.push(['school', s.name, `院校资料 · 考试范围 ${s.records} 条 · 过去问 ${s.papers} 份`, 'schools.html?' + q({ school: s.id }), [s.id, ...(s.aliases || [])].join(' ')]);
  }

  const seen = new Map();
  for (const r of scopes) {
    const key = [r.universityId, r.graduateSchool, r.department].join('|');
    const item = seen.get(key) || { r, aliases: new Set(), count: 0 };
    item.count++;
    for (const a of r.searchAliases || []) item.aliases.add(a);
    if (r.course) item.aliases.add(r.course);
    seen.set(key, item);
  }
  for (const { r, aliases, count } of seen.values()) {
    const name = schoolName.get(r.universityId) || r.universityId;
    entries.push(['scope', `${name} ${r.graduateSchool} ${r.department}`, `考试科目与范围 · ${count} 条资料`,
      'exam-scope.html?' + q({ school: r.universityId, graduate: r.graduateSchool, department: r.department }), [...aliases].join(' ')]);
  }

  for (const p of papers) {
    const name = schoolName.get(p.universityId) || p.universityId;
    entries.push(['paper', `${name} ${p.department || p.graduateSchool} ${p.paperYear || ''}`.trim(),
      `过去问 · ${p.title}${p.subjects && p.subjects.length ? ' · ' + p.subjects.join('、') : ''}`,
      'past-papers.html?' + q({ paper: p.id }), [p.graduateSchool, p.selectionName].filter(Boolean).join(' ')]);
  }

  for (const b of bank) {
    entries.push(['practice', b.title.replace(/ · /g, ' '), `逐题练习 · ${b.questionCount} 道大题`, 'question-practice.html?' + q({ paper: b.id }), '逐题']);
  }

  // 知识点的别名直接取分类表里的普通匹配词（运放、オペアンプ、演算増幅器……），正则规则不收。
  const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'data/topics/taxonomy.json'), 'utf8'));
  const words = new Map(taxonomy.subjects.flatMap(s => s.topics.map(t => [t.id, t.match.filter(w => !/^(re|all):/.test(w)).map(w => w.replace(/^=/, ''))])));
  for (const s of topics.subjects) {
    entries.push(['topic', s.name, `按知识点练 · 科目 · ${s.count} 题`, 'topics.html?' + q({ topic: s.id }), s.ja]);
    for (const t of s.topics) entries.push(['topic', t.name, `按知识点练 · ${s.name} · ${t.count} 题`, 'topics.html?' + q({ topic: t.id }), [t.ja, ...(words.get(t.id) || [])].join(' ')]);
  }

  const lines = ['{', '  "version": 1,', '  "generatedBy": "scripts/build-search-index.cjs",', '  "entries": [', entries.map(e => '    ' + JSON.stringify(e)).join(',\n'), '  ]', '}', ''];
  return { text: lines.join('\n'), count: entries.length };
}

if (require.main === module) {
  const { text, count } = build();
  const target = path.join(root, OUT);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== text) {
      console.error('搜索索引已过期，请运行 node scripts/build-search-index.cjs');
      process.exit(1);
    }
    console.log(`search index up to date: ${count} entries`);
  } else {
    fs.writeFileSync(target, text);
    console.log(`wrote ${OUT}: ${count} entries`);
  }
}
module.exports = { build };
