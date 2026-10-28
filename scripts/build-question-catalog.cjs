/* Compact per-question index. Regenerate after importing papers. No image duplication. */
const fs = require('node:fs'), path = require('node:path');
const bank = require('../question-bank.js');
const root = path.join(__dirname,'..');
function build() {
  const index = JSON.parse(fs.readFileSync(path.join(root,'question-bank-index.json')));
  return {version:1, questions:index.papers.flatMap(entry => {
    const paper = JSON.parse(fs.readFileSync(path.join(root,entry.data)));
    return paper.questions.filter(q => q.review?.status === 'verified').map(q => {
      const source = bank.sourceForQuestion(paper,q), s = paper.source;
      // Use explicit subject headings before descriptive titles: a capacitor
      // question mentioning Earth must not become a geography question.
      const classify = labels => {
        const text = labels.filter(Boolean).join(' ').normalize('NFKC')
          .replace(/电气磁気学/g,'電磁気学').replace(/电力/g,'電力')
          .replace(/电子器件/g,'電子デバイス').replace(/数字电路/g,'デジタル回路')
          .replace(/控制/g,'制御').replace(/微积分/g,'微積分').replace(/线性代数/g,'線形代数')
          .replace(/概率|统计/g,'確率').replace(/电路/g,'電気回路');
        const result = bank.subjectsOf([text]).filter(x => x !== '科目待细分');
        return /力学/.test(text) && !/量子|材料|流体|热|熱|統計|统计|機械|机械/.test(text)
          ? [...new Set(result.filter(x=>x!=='物理（综合）').concat('力学'))] : result;
      };
      const heading = q.title.includes('：') ? q.title.split('：')[0] : '';
      let subjects = classify([heading,q.number]);
      if (!subjects.length) subjects = classify(q.topics);
      if (!subjects.length) {
        const fallback = classify([source.displaySubject,source.originalSubject,source.subject]);
        subjects = fallback.length === 1 ? fallback : ['科目待细分'];
      }
      return {id:q.id,paper:paper.id,number:q.number,title:q.title,topics:q.topics,subjects,
        school:s.school,major:[s.graduate,s.major].filter(Boolean).join(' / '),majorKey:JSON.stringify([s.school,s.graduate,s.major]),
        year:s.year,yearLabel:bank.yearPhrase(s)};
    });
  })};
}
if (require.main === module) {
  const file = path.join(root,'question-catalog.json'), content = JSON.stringify(build())+'\n';
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(file) || fs.readFileSync(file,'utf8') !== content) { console.error('Run node scripts/build-question-catalog.cjs'); process.exitCode=1; }
  } else fs.writeFileSync(file,content);
}
module.exports = {build};
