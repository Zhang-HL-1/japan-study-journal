const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const catalog = require('../past-papers-data.js').papers.filter(p => p.universityId === 'utokyo');
const index = require('../question-bank-index.json').papers.filter(p => p.id.startsWith('utokyo-ee-'));
const read = entry => JSON.parse(fs.readFileSync(path.join(root, entry.data), 'utf8'));
const files = paper => paper.schemaVersion === 2 ? paper.source.files : [paper.source];
const byYear = year => read(index.find(p => read(p).source.year === year));

test('Tokyo electrical catalog has one annual question entry with the official program and exam-year basis', () => {
  assert.equal(index.length, catalog.length);
  assert.deepEqual(index.map(e => read(e).source.year).sort((a,b) => a-b), catalog.map(p => p.paperYear).sort((a,b) => a-b));
  assert.equal(index.reduce((n,e) => n + e.questionCount, 0), 145);
  for (const entry of index) {
    const paper = read(entry);
    assert.equal(paper.source.school, '東京大学');
    assert.equal(paper.source.graduate, '工学系研究科');
    assert.equal(paper.source.major, '電気系工学専攻');
    assert.equal(paper.source.yearBasis, 'exam');
    for (const source of files(paper)) {
      assert.match(source.pdf, new RegExp('^https://zhang-hl-1\\.github\\.io/japan-study-journal-papers-2/utokyo/' + source.sha256 + '\\.pdf$'));
      assert.equal(source.yearBasis, 'exam');
      assert.equal(source.major, '電気系工学専攻');
    }
    for (const q of paper.questions) {
      assert.equal(q.review.status, 'verified');
      assert.equal(q.titleKind, 'editorial');
      for (const key of ['answer', 'answerText', 'explanation', 'score']) assert.equal(q[key], undefined);
    }
  }
});

test('Japanese counterparts win while complete English-only originals remain available', () => {
  const old = files(byYear(2007));
  assert.deepEqual(old.map(s => s.originalName).sort(), ['math200709j.pdf', 'phys200709e.pdf']);
  assert.deepEqual(files(byYear(2021)).map(s => s.originalName).sort(), Array.from({length:6}, (_,i) => `fy2021_s_en_${i+1}.pdf`));
  for (const year of [2022,2023]) assert.deepEqual(files(byYear(year)).map(s => s.originalName).sort(), Array.from({length:6}, (_,i) => `fy${year}_s_ja_${i+1}.pdf`));
  for (const [year,lastJapanesePage] of [[2024,14],[2025,12]]) {
    const paper = byYear(year);
    assert.equal(paper.questions.length,6);
    assert.ok(paper.questions.every(q => q.parts.every(p => p.page <= lastJapanesePage)));
    assert.ok(paper.coverage.filter(c => c.page > lastJapanesePage).every(c => !c.questionIds.length && c.excluded));
  }
  const watermarkOnly = byYear(2025).coverage.find(c => c.page === 21);
  assert.deepEqual(watermarkOnly.questionIds, []);
  assert.match(watermarkOnly.excluded, /水印/);
});

test('mixed numeric and alphabetic original problems stay whole and distinct', () => {
  for (const year of [2012,2013,2014,2015,2016,2017,2018,2019]) {
    const paper = byYear(year);
    assert.equal(paper.questions.length,10);
    assert.equal(new Set(paper.questions.map(q => q.id)).size,10);
    assert.equal(paper.questions.filter(q => /[A-F]/.test(q.number)).length, year === 2012 ? 0 : 6);
  }
});
