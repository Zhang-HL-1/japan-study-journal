const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const core = require('../answers-core.js');
const data = require('../answers-data.js');
const manifest = require('../assets/answers/manifest.json');
const root = path.join(__dirname, '..');

function book(id) {
  return data.books.find(item => item.id === id);
}

test('answer shelf is two workbook catalogs and not a past-paper archive', () => {
  assert.equal(data.version, 1);
  assert.deepEqual(data.books.map(item => item.id), ['denjiki', 'denki-kairo']);
  assert.equal(data.books.every(core.validBook), true);
  assert.equal(JSON.stringify(data).includes('universityId'), false);
  assert.equal(data.books.some(item => /过去问/.test(item.shortTitle + item.title)), false);
});

test('answer PDFs keep the supplied bytes, page counts and manifest paths', () => {
  assert.equal(manifest.files.length, 2);
  for (const file of manifest.files) {
    const item = book(file.id);
    const absolute = path.join(root, file.path);
    const bytes = fs.readFileSync(absolute);
    assert.equal(file.path, `assets/answers/documents/${file.sha256}.pdf`);
    assert.equal(item.file, file.path);
    assert.equal(item.sha256, file.sha256);
    assert.equal(item.pages, file.pages);
    assert.equal(item.answers.length, file.answers);
    assert.equal(bytes.length, file.bytes);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  }
  assert.equal(book('denjiki').sha256, 'c6446d1101f20a9a64350e7a243586cfd7d1d31b8c2b3ab0979b16a6968446be');
  assert.equal(book('denjiki').pages, 331);
  assert.equal(book('denjiki').answers.length, 308);
  assert.equal(book('denki-kairo').sha256, '76a976818362aef0a5cf68a48fab5304df1a33c48ae50b7af45f7b5de8ae3f42');
  assert.equal(book('denki-kairo').pages, 562);
  assert.equal(book('denki-kairo').answers.length, 497);
  assert.equal(book('denjiki').shortTitle, '電磁気学演習 第3版（答案）');
  assert.equal(book('denki-kairo').shortTitle, '詳解電気回路演習（上）（答案）');
});

test('indexes are complete, unique per chapter and inside the PDF', () => {
  for (const item of data.books) {
    const seen = new Set();
    for (const row of item.answers) {
      const key = `${row.chapter}:${row.label}`;
      assert.equal(seen.has(key), false);
      seen.add(key);
      assert.ok(row.page >= 2 && row.page <= item.pages);
      assert.ok(item.chapters.some(chapter => chapter.number === row.chapter && chapter.title));
    }
  }
});

test('loose problem numbers resolve, and missing numbers do not invent a page', () => {
  const denjiki = book('denjiki');
  const kairo = book('denki-kairo');
  for (const raw of ['1.1', '1.1.', '問題1.1', '問題 1.1', '１.１']) {
    const result = core.lookup(denjiki, raw);
    assert.equal(result.action, 'open');
    assert.equal(result.page, 2);
    assert.equal(result.opened.chapter, 1);
    assert.equal(result.opened.label, '1.1');
    assert.equal(result.matches.length, 9);
  }
  const chapterTwo = core.lookup(denjiki, '第2章 1.1');
  assert.equal(chapterTwo.action, 'open');
  assert.equal(chapterTwo.page, 32);
  assert.equal(chapterTwo.opened.chapter, 2);
  const absentChapter = core.lookup(denjiki, '第9章 1.3');
  assert.equal(absentChapter.action, 'stay');
  assert.equal(absentChapter.page, undefined);
  assert.match(absentChapter.message, /没有/);
  assert.equal(absentChapter.matches.some(item => item.chapter === 1 && item.label === '1.3'), true);
  for (const raw of ['99.1', '問題', '']) {
    const result = core.lookup(denjiki, raw);
    assert.equal(result.action, 'stay');
    assert.equal(result.page, undefined);
    assert.match(result.message, /没有|请输入|识别/);
  }
  for (const raw of ['1.1', '1.1.', '問題1.1', '第1章1', '第1章 問題1']) {
    const result = core.lookup(kairo, raw);
    assert.equal(result.action, 'open', raw);
    assert.equal(result.page, 2, raw);
    assert.equal(result.opened.chapter, 1);
    assert.equal(result.opened.label, '1');
  }
  const circuit = core.lookup(kairo, '3.14');
  assert.equal(circuit.action, 'open');
  assert.equal(circuit.page, 157);
  assert.equal(circuit.opened.label, '14');
  assert.equal(core.lookup(kairo, '第3章14').page, 157);
  for (const raw of ['9.1', '1.78', '1', '3.14.1']) {
    const result = core.lookup(kairo, raw);
    assert.equal(result.action, 'stay', raw);
    assert.equal(result.page, undefined, raw);
    assert.match(result.message, /没有找到|请连同章号|请按章/);
  }
});

test('answer file URLs stay inside the document directory', () => {
  const item = book('denjiki');
  assert.equal(core.fileURL(item), item.file);
  assert.equal(core.fileURL(item, 2), `${item.file}#page=2`);
  assert.equal(core.fileURL(item, 0), null);
  assert.equal(core.fileURL(item, item.pages + 1), null);
  assert.equal(core.fileURL(item, 1.5), null);
  for (const file of ['assets/answers/documents/../secret.pdf', 'assets/past-papers/a.pdf', 'javascript:alert(1)', `assets/answers/documents/${'a'.repeat(64)}.pdf`, 'https://example.com/a.pdf']) {
    assert.equal(core.fileURL({ ...item, file }), null, file);
  }
  assert.equal(core.validBook({ ...item, id: '../denjiki' }), false);
  assert.equal(core.validBook({ ...item, numbering: 'past-paper' }), false);
});
