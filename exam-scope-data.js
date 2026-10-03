/* 学校仅为后续收录计划，不表示已经核验了招生或考试资料。
 * 使用官方全称；aliases 只用于关键词匹配。
 * 当前 records 为空：不发布示例科目、未经核验的范围或招生断言。
 * 添加资料的字段与核对要求见 docs/exam-scope-data.md。
 */
(function (root) {
  'use strict';
  const data = {
    universities: [
      { id: 'utokyo', name: '東京大学', aliases: ['东大', '東大', '东京大学'] },
      { id: 'kyoto', name: '京都大学', aliases: ['京大'] },
      { id: 'science-tokyo', name: '東京科学大学', aliases: ['东科', '東科', '东京科学大学', '东工大', '東京工業大学'] },
      { id: 'waseda', name: '早稲田大学', aliases: ['早大', '早稻田大学'] },
      { id: 'tus', name: '東京理科大学', aliases: ['东理', '東理', '东京理科大学'] }
    ],
    records: []
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.EXAM_SCOPE_DATA = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
