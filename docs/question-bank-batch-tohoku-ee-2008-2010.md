# 批次：东北大学 · 工学研究科 · 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻 · 2008–2010 年实施

AI visual review，2026-11-02。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId `tohoku`；学校 東北大学；研究科 工学研究科；专攻 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻
- `yearBasis=exam`（目录实施年）。本批年份：2008 年 2 月与 8 月、2009 年 3 月与 8 月、2010 年 3 月与 8 月。未改写成入学年。
- 只做目录组 `tohoku-ee-2008-02`、`tohoku-ee-2008-08`、`tohoku-ee-2009-03`、`tohoku-ee-2009-08`、`tohoku-ee-2010-03`、`tohoku-ee-2010-08` 的 question PDF。未重做 2011–2026。未开始 2003–2007。
- 这 6 组目录没有单独的外国人入试 question PDF。2008 年封面同时列情報科学研究科与医工学研究科，不另建入口。2009–2010 年页眉只印「YYYY年M月実施」，未印専攻名。

站点专攻用目录。封面或页眉上的専攻原文写在 `source.originalMajor` 与 `source.note`。

卷面科目按册子与目录：「基礎科目」「専門科目」。大题分野只写在题目导航里。

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `tohoku-ee-2008-02-kiso` | `tohoku-ee-2008-02` | 2008 | exam | `4cb954f572b7` | 12 | 6 |
| `tohoku-ee-2008-02-senmon` | `tohoku-ee-2008-02` | 2008 | exam | `4e634d5ee2d5` | 13 | 7 |
| `tohoku-ee-2008-08-kiso` | `tohoku-ee-2008-08` | 2008 | exam | `8659354f4d72` | 12 | 6 |
| `tohoku-ee-2008-08-senmon` | `tohoku-ee-2008-08` | 2008 | exam | `6a2a4f8ea2c2` | 17 | 7 |
| `tohoku-ee-2009-03-kiso` | `tohoku-ee-2009-03` | 2009 | exam | `103ac33f9c9b` | 11 | 6 |
| `tohoku-ee-2009-03-senmon` | `tohoku-ee-2009-03` | 2009 | exam | `39d3e536fbfb` | 14 | 7 |
| `tohoku-ee-2009-08-kiso` | `tohoku-ee-2009-08` | 2009 | exam | `a514fb075d90` | 10 | 6 |
| `tohoku-ee-2009-08-senmon` | `tohoku-ee-2009-08` | 2009 | exam | `999e7eb88178` | 14 | 7 |
| `tohoku-ee-2010-03-kiso` | `tohoku-ee-2010-03` | 2010 | exam | `92665029cfe7` | 9 | 6 |
| `tohoku-ee-2010-03-senmon` | `tohoku-ee-2010-03` | 2010 | exam | `9faf41ae91f9` | 16 | 7 |
| `tohoku-ee-2010-08-kiso` | `tohoku-ee-2010-08` | 2010 | exam | `a32efdf7fdd5` | 10 | 6 |
| `tohoku-ee-2010-08-senmon` | `tohoku-ee-2010-08` | 2010 | exam | `83913478ddc0` | 16 | 7 |

统计：唯一 question PDF 12；目录引用 12；verified 大题 78；blocked 0；生成物约 39 MB。PDF 页合计 154。

2008 年四册各有 1 页表紙（实施日、封面専攻、科目名、6 或 7 设问中选 2 题）。表紙放在 `commonRegions`，不计大题。2008 年 2 月封面印「2008年2月27日／28日」和医工学研究科工学系コース電気工学系。2008 年 8 月封面印「平成20年8月25日／26日」和医工学研究科工学系コース電気・情報系。题页页眉只印「2008年M月実施」与問題号。

2009–2010 年没有单独表紙。大题按页眉「問題」号与「N頁目／M頁中」合并，小问不拆。和文与英文属于同一大题，有的印在同一页，有的分成续页。基础科目每册 6 道大题（電磁気学、電気回路、情報基礎1、情報基礎2、物理基礎1、物理基礎2）。专门科目每册 7 道大题（電気工学、通信工学、電子工学、計算機1、計算機2、物理専門1、物理専門2）。各册页数不同，不以页数猜题数。

12 份 PDF 均无 `/Rotate`，未做派生规范化，原件字节未改。未改 `past-papers-data.js`。

## 阻塞

无。

## 入口

- `question-practice.html?paper=tohoku-ee-2008-02-kiso`
- `question-practice.html?paper=tohoku-ee-2008-02-senmon`
- `question-practice.html?paper=tohoku-ee-2008-08-kiso`
- `question-practice.html?paper=tohoku-ee-2008-08-senmon`
- `question-practice.html?paper=tohoku-ee-2009-03-kiso`
- `question-practice.html?paper=tohoku-ee-2009-03-senmon`
- `question-practice.html?paper=tohoku-ee-2009-08-kiso`
- `question-practice.html?paper=tohoku-ee-2009-08-senmon`
- `question-practice.html?paper=tohoku-ee-2010-03-kiso`
- `question-practice.html?paper=tohoku-ee-2010-03-senmon`
- `question-practice.html?paper=tohoku-ee-2010-08-kiso`
- `question-practice.html?paper=tohoku-ee-2010-08-senmon`

页面按 `yearBasis=exam` 显示「年实施」。记录键是逐题练习，不写入整卷 `practice:v1`。

## 检查

- build --check：通过（12 份 manifest，PyMuPDF 1.26.5）
- node tests：通过（`node --test --test-reporter=tap tests/*.test.cjs`，349 项，失败 0）
- `build-paper-practice.cjs --check`、`build-school-index.cjs --check`、`build-question-collections.cjs --check`：通过
- 浏览器：12 卷在 390 / 800 / 1440 下无 PDF 内嵌、题图加载、无横溢、下一题 URL 为该卷 `q2`、页面无答案入口。源信息显示「年实施」。2008 年四卷显示表紙共用条件。
