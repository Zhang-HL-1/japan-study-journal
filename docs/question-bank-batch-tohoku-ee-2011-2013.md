# 批次：东北大学 · 工学研究科 · 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻 · 2011–2013 年实施

AI visual review，2026-11-02。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId `tohoku`；学校 東北大学；研究科 工学研究科；专攻 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻
- `yearBasis=exam`（目录实施年）。本批年份：2011 年 2 月与 8 月、2012 年 2 月与 8 月、2013 年 3 月与 8 月。未改写成入学年。
- 只做目录组 `tohoku-ee-2011-02`、`tohoku-ee-2011-08`、`tohoku-ee-2012-02`、`tohoku-ee-2012-08`、`tohoku-ee-2013-03`、`tohoku-ee-2013-08` 的 question PDF。未重做 2014–2026。未开始 2003–2010。
- 这 6 组目录没有单独的外国人入试 question PDF。页眉只印「YYYY年M月実施」，未印専攻名；专攻用目录，页眉原文写在 `source.note`。没有另一研究科的题页。2013 年页眉在和文题号之上另有英文 `Question No.`，与和文同页，不另立题。

卷面科目按册子与目录：「基礎科目」「専門科目」。大题分野只写在题目导航里。

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `tohoku-ee-2011-02-kiso` | `tohoku-ee-2011-02` | 2011 | exam | `c1ecf4b08076` | 11 | 6 |
| `tohoku-ee-2011-02-senmon` | `tohoku-ee-2011-02` | 2011 | exam | `7399619fecf0` | 15 | 7 |
| `tohoku-ee-2011-08-kiso` | `tohoku-ee-2011-08` | 2011 | exam | `5e85a05346e6` | 12 | 6 |
| `tohoku-ee-2011-08-senmon` | `tohoku-ee-2011-08` | 2011 | exam | `38aebf07add8` | 16 | 7 |
| `tohoku-ee-2012-02-kiso` | `tohoku-ee-2012-02` | 2012 | exam | `56c17a578149` | 11 | 6 |
| `tohoku-ee-2012-02-senmon` | `tohoku-ee-2012-02` | 2012 | exam | `927421571d8f` | 17 | 7 |
| `tohoku-ee-2012-08-kiso` | `tohoku-ee-2012-08` | 2012 | exam | `bc59cee7ebdb` | 10 | 6 |
| `tohoku-ee-2012-08-senmon` | `tohoku-ee-2012-08` | 2012 | exam | `2451bff85f83` | 14 | 7 |
| `tohoku-ee-2013-03-kiso` | `tohoku-ee-2013-03` | 2013 | exam | `7aa0c607d14b` | 10 | 6 |
| `tohoku-ee-2013-03-senmon` | `tohoku-ee-2013-03` | 2013 | exam | `45c9a114a907` | 15 | 7 |
| `tohoku-ee-2013-08-kiso` | `tohoku-ee-2013-08` | 2013 | exam | `e597f900ff54` | 13 | 6 |
| `tohoku-ee-2013-08-senmon` | `tohoku-ee-2013-08` | 2013 | exam | `24ffcacada3a` | 16 | 7 |

统计：唯一 question PDF 12；目录引用 12；verified 大题 78；blocked 0；生成物约 66 MB。PDF 页合计 160。本批没有单独封面，页眉在各大题裁图内，不计题。和文与英文印在同一页，续页并入同一大题，小问不拆。12 份 PDF 均无 `/Rotate`，未做派生规范化，原件字节未改。2012 年 2 月基础科目问题 6 的页眉在题号与「物理基礎2」之间印有「試験科目名」，仍按该大题收录。未改 `past-papers-data.js`。

基础科目每册 6 道大题（電磁気学、電気回路、情報基礎1、情報基礎2、物理基礎1、物理基礎2）。专门科目每册 7 道大题（電気工学、通信工学、電子工学、計算機1、計算機2、物理専門1、物理専門2）。

## 阻塞

无。

## 入口

- `question-practice.html?paper=tohoku-ee-2011-02-kiso`
- `question-practice.html?paper=tohoku-ee-2011-02-senmon`
- `question-practice.html?paper=tohoku-ee-2011-08-kiso`
- `question-practice.html?paper=tohoku-ee-2011-08-senmon`
- `question-practice.html?paper=tohoku-ee-2012-02-kiso`
- `question-practice.html?paper=tohoku-ee-2012-02-senmon`
- `question-practice.html?paper=tohoku-ee-2012-08-kiso`
- `question-practice.html?paper=tohoku-ee-2012-08-senmon`
- `question-practice.html?paper=tohoku-ee-2013-03-kiso`
- `question-practice.html?paper=tohoku-ee-2013-03-senmon`
- `question-practice.html?paper=tohoku-ee-2013-08-kiso`
- `question-practice.html?paper=tohoku-ee-2013-08-senmon`

页面按 `yearBasis=exam` 显示「年实施」。记录键是逐题练习，不写入整卷 `practice:v1`。

## 检查

- build --check：通过（12 份 manifest，PyMuPDF 1.26.5）
- node tests：通过（`node --test --test-reporter=tap tests/*.test.cjs`，349 项，失败 0）
- `build-paper-practice.cjs --check`、`build-school-index.cjs --check`、`build-question-collections.cjs --check`：通过
- 浏览器：12 卷在 390 / 800 / 1440 下无 PDF 内嵌、题图加载、无横溢、下一题 URL 为 `q2`、页面无答案入口。源信息显示「年实施」。
