/* Whole-paper exercises plus future individually curated questions. Stable IDs preserve progress. */
(function (root) {
  root.QUESTION_SUBJECTS = ['微积分', '线性代数', '电路与模拟电子', '信号与系统', '电磁学', '数字电子'];
  const papers = typeof module !== 'undefined' && module.exports ? require('./paper-practice-data.js') : root.PAPER_PRACTICE_BANK;
  const individualQuestions = []; // Choice, numeric, and written questions stay here. Split past papers are listed from question-bank-index.json and are not inserted into this array.
  root.QUESTION_BANK = Array.isArray(papers) ? [...papers, ...individualQuestions] : null;
  if (typeof module !== 'undefined' && module.exports) module.exports = root.QUESTION_BANK;
})(typeof window !== 'undefined' ? window : globalThis);
