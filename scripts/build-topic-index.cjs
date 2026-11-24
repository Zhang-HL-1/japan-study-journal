#!/usr/bin/env node
'use strict';
// 生成「按知识点练」的索引与核对表：
//   data/topics/topic-index.json  前端读取（每题一行，方便看 diff）
//   docs/topic-review.md          人工核对用：各知识点题数、学校分布、匹配依据、未归类题目
// 用法：node scripts/build-topic-index.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');
const { compile, classify, applyOverride, normalize } = require('./topic-classify.cjs');

const root = path.resolve(__dirname, '..');
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const INDEX_OUT = 'data/topics/topic-index.json';
const REVIEW_OUT = 'docs/topic-review.md';

function build() {
  const taxonomy = read('data/topics/taxonomy.json');
  const overrides = read('data/topics/overrides.json').questions || {};
  const compiled = compile(taxonomy);
  const bank = read('question-bank-index.json');

  const papers = {}, questions = [], audit = [];
  const seen = new Set();
  for (const entry of bank.papers) {
    const paper = read(entry.data);
    const src = paper.source || {};
    papers[entry.id] = {
      school: src.school || '',
      schoolId: src.schoolId || entry.id.split('-')[0],
      year: Number.isInteger(src.year) ? src.year : null,
      subject: src.subject || '',
      title: entry.title,
    };
    for (const q of paper.questions) {
      if (seen.has(q.id)) throw new Error('duplicate question id: ' + q.id);
      seen.add(q.id);
      // 卷子的科目名（如「量子物理学」「電気回路」）只做完全匹配：「力学・回路理論・電磁気学」这种合卷名不会把整卷都标成力学。
      let result = classify(q, compiled, [src.subject, src.originalSubject].filter(Boolean));
      result = applyOverride(result, overrides[q.id], compiled);
      // 已有具体知识点的科目，不再重复放进该科目的「未细分」。
      const covered = new Set(result.topics.map(id => id.split('.')[0]));
      const subjects = result.subjects.filter(id => !covered.has(id));
      const row = { p: entry.id, q: q.id, n: q.number, t: q.title, k: result.topics.sort() };
      if (subjects.length) row.s = subjects.sort();
      questions.push(row);
      audit.push({ paper: entry.id, school: papers[entry.id].school || papers[entry.id].schoolId, q, row, hits: result.hits, tags: q.topics || [] });
    }
  }
  for (const id of Object.keys(overrides)) if (!seen.has(id)) throw new Error('override for unknown question: ' + id);

  const subjects = taxonomy.subjects.map(s => ({
    id: s.id, name: s.name, ja: s.ja,
    count: questions.filter(r => r.k.some(k => k.startsWith(s.id + '.')) || (r.s || []).includes(s.id)).length,
    unrefined: questions.filter(r => (r.s || []).includes(s.id)).length,
    topics: s.topics.map(t => ({ id: t.id, name: t.name, ja: t.ja, count: questions.filter(r => r.k.includes(t.id)).length })),
  }));

  const lines = [
    '{',
    '  "schemaVersion": 1,',
    '  "generatedBy": "scripts/build-topic-index.cjs",',
    `  "questionCount": ${questions.length},`,
    `  "subjects": ${JSON.stringify(subjects)},`,
    '  "papers": {',
    Object.entries(papers).map(([id, p]) => `    ${JSON.stringify(id)}: ${JSON.stringify(p)}`).join(',\n'),
    '  },',
    '  "questions": [',
    questions.map(r => '    ' + JSON.stringify(r)).join(',\n'),
    '  ]',
    '}',
    '',
  ];
  return { index: lines.join('\n'), review: review(taxonomy, subjects, audit), questions, subjects };
}

function review(taxonomy, subjects, audit) {
  const out = [];
  const total = audit.length;
  const none = audit.filter(a => !a.row.k.length && !a.row.s);
  const onlySubject = audit.filter(a => !a.row.k.length && a.row.s);
  out.push('# 知识点归类核对表', '');
  out.push('> 本文件由 `node scripts/build-topic-index.cjs` 生成，请勿手改。分类规则见 `data/topics/taxonomy.json`，逐题修正见 `data/topics/overrides.json`。', '');
  out.push(`共 ${total} 题：已归入具体知识点 ${total - none.length - onlySubject.length} 题，只归到科目「未细分」${onlySubject.length} 题，完全未归类 ${none.length} 题。一题可以同时属于多个知识点。`, '');
  out.push('## 各知识点题数', '', '| 科目 | 知识点 | 题数 | 学校分布 |', '|---|---|---:|---|');
  for (const s of subjects) {
    for (const t of s.topics) {
      const bySchool = {};
      for (const a of audit) if (a.row.k.includes(t.id)) bySchool[a.school] = (bySchool[a.school] || 0) + 1;
      out.push(`| ${s.name} | ${t.name} | ${t.count} | ${Object.entries(bySchool).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join('、')} |`);
    }
    out.push(`| ${s.name} | （未细分） | ${s.unrefined} | |`);
  }
  out.push('', '## 各知识点的匹配依据', '', '每个知识点列出命中次数最多的匹配词与被命中的原标签，用来检查有没有归错。', '');
  for (const s of taxonomy.subjects) {
    for (const t of s.topics) {
      const words = {};
      for (const a of audit) for (const h of a.hits) if (h.id === t.id) {
        const key = h.word;
        words[key] = words[key] || { n: 0, texts: new Set() };
        words[key].n++; if (words[key].texts.size < 4) words[key].texts.add(h.text);
      }
      const top = Object.entries(words).sort((a, b) => b[1].n - a[1].n).slice(0, 12);
      out.push(`- **${s.name} › ${t.name}**：` + (top.length ? top.map(([w, v]) => `\`${w}\`×${v.n}（${[...v.texts].join('／')}）`).join('；') : '（暂无题目）'));
    }
  }
  out.push('', `## 只归到科目、未细分的题（${onlySubject.length}）`, '');
  for (const a of onlySubject) out.push(`- \`${a.q.id}\` ${a.q.number}｜${a.q.title}｜科目：${a.row.s.join('、')}｜标签：${a.tags.join('、') || '无'}`);
  out.push('', `## 完全未归类的题（${none.length}）`, '');
  for (const a of none) out.push(`- \`${a.q.id}\` ${a.q.number}｜${a.q.title}｜标签：${a.tags.join('、') || '无'}`);
  const unmatched = {};
  for (const a of audit) for (const tag of a.tags) {
    const norm = normalize(tag);
    if (!a.hits.some(h => h.field === 'tag' && normalize(h.text) === norm)) unmatched[tag] = (unmatched[tag] || 0) + 1;
  }
  const top = Object.entries(unmatched).sort((a, b) => b[1] - a[1]);
  out.push('', `## 没有命中任何规则的原标签（共 ${top.length} 种，列出出现 2 次以上的）`, '');
  out.push(top.filter(([, n]) => n >= 2).map(([k, n]) => `${k}×${n}`).join('、') || '（无）', '');
  return out.join('\n');
}

function main() {
  const check = process.argv.includes('--check');
  const { index, review: md, questions, subjects } = build();
  const files = [[INDEX_OUT, index], [REVIEW_OUT, md]];
  if (check) {
    const stale = files.filter(([rel, text]) => !fs.existsSync(path.join(root, rel)) || fs.readFileSync(path.join(root, rel), 'utf8') !== text);
    if (stale.length) {
      console.error('知识点索引已过期，请运行 node scripts/build-topic-index.cjs：' + stale.map(([rel]) => rel).join('、'));
      process.exit(1);
    }
    console.log(`topic index up to date: ${questions.length} questions`);
    return;
  }
  for (const [rel, text] of files) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), text);
  }
  const placed = questions.filter(r => r.k.length).length;
  console.log(`wrote ${INDEX_OUT}: ${questions.length} questions, ${placed} with topics, ${questions.filter(r => !r.k.length && r.s).length} subject-only, ${questions.filter(r => !r.k.length && !r.s).length} unclassified`);
  for (const s of subjects) console.log(`  ${s.name} ${s.count}（未细分 ${s.unrefined}）: ` + s.topics.map(t => `${t.name} ${t.count}`).join(' / '));
}

if (require.main === module) main();
module.exports = { build };
