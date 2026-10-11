# 练习室与过去问题库

练习室入口 `practice.html` 以两张等大的卡片引导选择：过去问题库 `past-papers.html` 与刷题练习 `drill.html`。两者同级，均可返回入口或切换到另一模块。

旧刷题页面迁到 `drill.html`，继续使用原来的 `questions.js`、`practice.js`、`practice-core.js` 和浏览器记录键 `japan-study-journal:practice:v1`。收藏、错题、笔记和导入导出不变。此次不添加任何刷题题目或过去问真题。

## 过去问题库

- 大学名称和中文别名来自现有 `campus-map-data.js` 的大学目录，当前23所大学。
- 原卷目录独立存放在 `past-papers-data.js`，与逐题练习库分开；当前 `papers: []`。
- 研究科与考试年份筛选只从实际录入的原卷产生，未录入时禁用，避免虚构年份、原卷或答案。
- 学校索引支持中文别名和日文全称；真题可按大学、研究科、考试年份与AND关键词筛选，按年份从新到旧显示。
- 选择一份原卷后可阅读PDF、切换问题／答案文件、在新窗口打开；仓库中的PDF另提供下载。旧研究科名称按原卷保留，不改写为现行校区目录中的新名称。
- 学校筛选支持 `past-papers.html?school=utokyo` 等既有大学ID。空状态中的考试范围链接携带同一大学ID。

## 后续添加真题

把允许公开保存的PDF放在 `assets/past-papers/`，再向 `past-papers-data.js` 的 `papers` 数组添加元数据。也可使用学校官网HTTPS链接。下面是**格式示例，不能作为实际真题直接加入**：

```js
{
  id: 'school-program-exam-year', // 唯一且稳定
  universityId: 'utokyo', // 必须是既有学校ID
  title: '原卷上实际的试卷名称',
  graduateSchool: '原卷上实际的研究科名称',
  department: '原卷上实际的专攻名称', // 可选
  selectionName: '原卷上实际的选拔名称',
  examYear: 2025, // 实际举行考试的年份，不用入学年度替代
  subjects: ['原卷的实际考试科目'], // 可选
  files: [
    { label: '問題', kind: 'question', url: 'assets/past-papers/university/2025/questions.pdf' },
    { label: '解答', kind: 'answer', url: 'assets/past-papers/university/2025/answers.pdf' }
  ],
  sourceNote: '实际来源与适用范围的说明', // 可选
  sourceURL: 'https://学校官网/实际来源页面' // 可选
}
```

`files` 至少包含一个文件。`kind` 可为 `question`、`answer`、`other`。没有官方答案时不要填写答案文件；不要把其他年份、其他选拔或逐题练习答案当作原卷解答。多份文件可直接增加 `files`；若需要从指定PDF实际页开始阅读，可在文件对象添加正整数 `startPage`。

本地文件必须为 `assets/past-papers/` 内的PDF；外部文件与来源仅接受已收录大学官网HTTPS域名。页面采用文本节点展示目录内容，不把元数据作为HTML执行。测试用文件仅由浏览器测试服务器临时生成，不在正式目录或网站资源中。

## 视觉与动效

两幅原创SVG插画采用暖纸色、陶土色、鼠尾草绿与略不规则的手绘线条；未使用外部图片服务或品牌标识。入口有短暂的出现动效，悬停时卡片轻微抬升、插画倾斜、箭头移动。尊重 `prefers-reduced-motion`，键盘焦点可见，手机上两个入口纵向排列。学校索引在手机上使用可横向滚动的标签。

## 验证

```sh
node --test tests/*.test.cjs
NODE_PATH=/path/to/node_modules STUDY_ROOM_BROWSER=/path/to/chromium node tests/study-room.browser.cjs
```

浏览器脚本检查并列入口、正常及减少动效设置、学校别名、空题库、手机布局及菜单、原刷题入口、历史研究科筛选、原卷／答案切换、下载入口与文本内容。可设置 `STUDY_ROOM_SCREENSHOTS` 保存截图。
