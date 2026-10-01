/*
 * 题库入口。按用户要求暂不预置题目，后续接入用户提供的题目。
 * 已发布题目的 id 请保持不变，字段约定见 README.md。
 */
(function (root) {
  root.QUESTION_SUBJECTS = ['微积分', '线性代数', '电路与模拟电子', '信号与系统', '电磁学', '数字电子'];
  root.QUESTION_BANK = [];
  if (typeof module !== 'undefined' && module.exports) module.exports = root.QUESTION_BANK;
})(typeof window !== 'undefined' ? window : globalThis);
