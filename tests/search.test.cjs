'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const S = require('../site-search.js');
const N = require('../text-normalize.js');
const { build } = require('../scripts/build-search-index.cjs');
const index = require('../data/search-index.json');
const prepared = S.prepare(index);
const top = (q, n = 3) => S.search(prepared, q, n).map(r => `${r.type}:${r.title}`);

test('committed search index matches a fresh build and every link is a site page', () => {
  assert.equal(fs.readFileSync(path.join(__dirname, '../data/search-index.json'), 'utf8'), build().text, 'run node scripts/build-search-index.cjs');
  for (const [type, title, , url] of index.entries) {
    assert.ok(S.TYPES[type], type);
    assert.ok(title, url);
    assert.match(url, /^[a-z-]+\.html(\?|$)/, url);
    assert.ok(fs.existsSync(path.join(__dirname, '..', url.split('?')[0])), url);
  }
});

test('simplified Chinese, Japanese and aliases find the same things', () => {
  assert.equal(N.normalizeSearch('东北 电气'), N.normalizeSearch('東北電気'));
  assert.equal(N.normalizeSearch('庆应'), N.normalizeSearch('慶應'));
  assert.equal(N.normalizeSearch('早稻田'), N.normalizeSearch('早稲田'));
  assert.equal(top('东大', 1)[0], 'school:東京大学');
  assert.equal(top('庆应', 1)[0], 'school:慶應義塾大学');
  assert.equal(top('运放', 1)[0], 'topic:运算放大器');
  assert.equal(top('オペアンプ', 1)[0], 'topic:运算放大器');
  assert.equal(top('书桌', 1)[0], 'page:我的书桌');
  assert.match(top('东北 电气', 1)[0], /^scope:東北大学 .*電気/);
});

test('every word must match, and results are capped', () => {
  assert.deepEqual(S.search(prepared, '   '), []);
  assert.deepEqual(S.search(prepared, '东北 完全不存在的词'), []);
  const many = S.search(prepared, '大学', 30);
  assert.equal(many.length, 30);
  const both = S.search(prepared, '早稻田 2024', 10);
  assert.ok(both.length > 0 && both.every(r => /早稲田/.test(r.title + r.sub) && /2024/.test(r.title + r.sub)));
});

test('search-only characters never change topic classification', () => {
  assert.equal(N.normalize('东北'), '东北', 'base table keeps 东 unchanged');
  assert.equal(N.normalizeSearch('东北'), '東北');
});
