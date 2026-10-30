const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const bank = require('../question-bank.js');
const index = require('../question-bank-index.json');
const root = path.join(__dirname, '..');

function rows() {
  return index.papers.map((entry, order) => bank.paperNeighborRow(JSON.parse(fs.readFileSync(path.join(root, entry.data), 'utf8')), order));
}

function neighbor(all, id) {
  const result = bank.adjacentPaperTargets(all, id);
  return { previous: result.previous && result.previous.id, next: result.next && result.next.id };
}

test('adjacent years skip gaps and stay on the same subject slot when it exists', () => {
  const sample = [
    { id: 'school-ee-2014-general', schoolId: 's', graduate: 'g', major: 'm', year: 2014, yearBasis: 'exam', order: 0 },
    { id: 'school-ee-2014-intl', schoolId: 's', graduate: 'g', major: 'm', year: 2014, yearBasis: 'exam', order: 1 },
    { id: 'school-ee-2015-kairo', schoolId: 's', graduate: 'g', major: 'm', year: 2015, yearBasis: 'exam', order: 2 },
    { id: 'school-ee-2015-denjiki', schoolId: 's', graduate: 'g', major: 'm', year: 2015, yearBasis: 'exam', order: 3 },
    { id: 'school-ee-2016-intl', schoolId: 's', graduate: 'g', major: 'm', year: 2016, yearBasis: 'exam', order: 4 },
    { id: 'school-ee-2019', schoolId: 's', graduate: 'later', major: 'later', year: 2019, yearBasis: 'exam', order: 5 },
    { id: 'school-ee-2021', schoolId: 's', graduate: 'later', major: 'later', year: 2021, yearBasis: 'exam', order: 6 },
    { id: 'other-2016-kairo', schoolId: 'other', graduate: 'g', major: 'm', year: 2016, yearBasis: 'exam', order: 7 }
  ];
  assert.deepEqual(neighbor(sample, 'school-ee-2015-kairo'), { previous: null, next: null });
  assert.deepEqual(neighbor(sample, 'school-ee-2015-denjiki'), { previous: null, next: null });
  assert.deepEqual(neighbor(sample, 'school-ee-2014-intl'), { previous: 'school-ee-2016-intl', next: null });
  assert.deepEqual(neighbor(sample, 'school-ee-2014-general'), { previous: null, next: null });
  assert.deepEqual(neighbor(sample, 'school-ee-2019'), { previous: 'school-ee-2021', next: null });
  assert.deepEqual(neighbor(sample, 'other-2016-kairo'), { previous: null, next: null });
  const gap = [
    { id: 'ee-2011-kairo', schoolId: 's', graduate: 'g', major: 'm', year: 2011, yearBasis: 'exam', order: 2 },
    { id: 'ee-2011-denjiki', schoolId: 's', graduate: 'g', major: 'm', year: 2011, yearBasis: 'exam', order: 3 },
    { id: 'ee-2012-sugaku', schoolId: 's', graduate: 'g', major: 'm', year: 2012, yearBasis: 'exam', order: 0 },
    { id: 'ee-2013-sugaku', schoolId: 's', graduate: 'g', major: 'm', year: 2013, yearBasis: 'exam', order: 1 }
  ];
  assert.deepEqual(neighbor(gap, 'ee-2012-sugaku'), { previous: 'ee-2013-sugaku', next: 'ee-2011-kairo' });
});

test('published papers switch years inside one program and do not cross schools', () => {
  const all = rows();
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2019'), { previous: 'science-tokyo-ee-2021', next: 'science-tokyo-ee-2018' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2021'), { previous: 'science-tokyo-ee-2022', next: 'science-tokyo-ee-2019' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2023'), { previous: 'science-tokyo-ee-2024', next: 'science-tokyo-ee-2022' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2015-kairo'), { previous: null, next: 'science-tokyo-ee-2014-kairo' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2015-denjiki'), { previous: null, next: 'science-tokyo-ee-2014-denjiki' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2015-sugaku'), { previous: null, next: 'science-tokyo-ee-2014-sugaku' });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2016'), { previous: 'science-tokyo-ee-2017', next: null });
  assert.deepEqual(neighbor(all, 'science-tokyo-ee-2012-sugaku'), { previous: 'science-tokyo-ee-2013-sugaku', next: 'science-tokyo-ee-2011-kairo' });
  assert.deepEqual(neighbor(all, 'waseda-eps-2019'), { previous: 'waseda-eps-2021', next: 'waseda-eps-2018' });
  assert.deepEqual(neighbor(all, 'waseda-eps-2014'), { previous: 'waseda-eps-2015', next: null });
  assert.deepEqual(neighbor(all, 'waseda-eps-2025'), { previous: null, next: 'waseda-eps-2024' });
  assert.deepEqual(neighbor(all, 'tus-electrical-2016-general'), { previous: 'tus-electrical-2021-general', next: 'tus-electrical-2015-general' });
  assert.deepEqual(neighbor(all, 'tus-electrical-2021-general'), { previous: 'tus-electrical-2023-general', next: 'tus-electrical-2016-general' });
  assert.deepEqual(neighbor(all, 'tus-electrical-2002-general'), { previous: 'tus-electrical-2004-general', next: 'tus-electrical-2001-general' });
  assert.deepEqual(neighbor(all, 'tus-electrical-2024-general'), { previous: 'tus-electrical-2025-general', next: 'tus-electrical-2023-general' });
  assert.deepEqual(neighbor(all, 'tus-electrical-2024-intl'), { previous: 'tus-electrical-2025-intl', next: null });
  assert.deepEqual(neighbor(all, 'tus-electrical-2025-intl'), { previous: null, next: 'tus-electrical-2024-intl' });
  assert.deepEqual(neighbor(all, 'tus-ee-2025-kairo'), { previous: null, next: null });
  assert.deepEqual(neighbor(all, 'kobe-ee-2026-denjiki'), { previous: null, next: null });
  const previous = bank.adjacentPaperTargets(all, 'science-tokyo-ee-2019').previous;
  const target = JSON.parse(fs.readFileSync(path.join(root, 'assets/question-bank/science-tokyo-ee-2021/paper.json'), 'utf8'));
  assert.equal(previous.firstQuestionId, target.questions[0].id);
  assert.equal(bank.RECORD_KEY, 'japan-study-journal:question-practice:v1');
});
