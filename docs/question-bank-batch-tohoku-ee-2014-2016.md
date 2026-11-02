# 批次：东北大学 · 工学研究科 · 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻 · 2014–2016 年实施

AI visual review，2026-11-02。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId `tohoku`；学校 東北大学；研究科 工学研究科；专攻 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻
- `yearBasis=exam`（目录实施年）。本批年份：2014、2015、2016 的 3 月与 8 月。未改写成入学年。
- 只做目录组 `tohoku-ee-2014-03`、`tohoku-ee-2014-08`、`tohoku-ee-2015-03`、`tohoku-ee-2015-08`、`tohoku-ee-2016-03`、`tohoku-ee-2016-08` 的 question PDF。未重做 2023–2026。未开始 2003–2013。
- 这 6 组目录没有单独的外国人入试 question PDF。页眉只印「YYYY年M月実施」，未印専攻名；专攻用目录，页眉原文写在 `source.note`。没有另一研究科的题页。

卷面科目按册子与目录：「基礎科目」「専門科目」。大题分野只写在题目导航里。

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `tohoku-ee-2014-03-kiso` | `tohoku-ee-2014-03` | 2014 | exam | `a5a9a6703216` | 10 | 6 |
| `tohoku-ee-2014-03-senmon` | `tohoku-ee-2014-03` | 2014 | exam | `fbeb723e8f8d` | 13 | 7 |
| `tohoku-ee-2014-08-kiso` | `tohoku-ee-2014-08` | 2014 | exam | `8286e34ea1f1` | 13 | 6 |
| `tohoku-ee-2014-08-senmon` | `tohoku-ee-2014-08` | 2014 | exam | `3c42ff1465d4` | 16 | 7 |
| `tohoku-ee-2015-03-kiso` | `tohoku-ee-2015-03` | 2015 | exam | `bc7590cbf885` | 12 | 6 |
| `tohoku-ee-2015-03-senmon` | `tohoku-ee-2015-03` | 2015 | exam | `ee57b408fea7` | 14 | 7 |
| `tohoku-ee-2015-08-kiso` | `tohoku-ee-2015-08` | 2015 | exam | `a8b9e6bafca7` | 11 | 6 |
| `tohoku-ee-2015-08-senmon` | `tohoku-ee-2015-08` | 2015 | exam | `997c9afd9cbe` | 16 | 7 |
| `tohoku-ee-2016-03-kiso` | `tohoku-ee-2016-03` | 2016 | exam | `b361ffd8723a` | 12 | 6 |
| `tohoku-ee-2016-03-senmon` | `tohoku-ee-2016-03` | 2016 | exam | `1b5aacce3807` | 14 | 7 |
| `tohoku-ee-2016-08-kiso` | `tohoku-ee-2016-08` | 2016 | exam | `ea92a0d172d1` | 12 | 6 |
| `tohoku-ee-2016-08-senmon` | `tohoku-ee-2016-08` | 2016 | exam | `57088127f7e6` | 19 | 7 |

统计：唯一 question PDF 12；目录引用 12；verified 大题 78；blocked 0；生成物约 52 MB。PDF 页合计 162。本批没有单独封面，页眉在各大题裁图内，不计题。和文页与英文页同属一道大题，小问不拆。2014 年四份 PDF 每页 `/Rotate` 为 270：原件未改，各卷另存 `normalized.pdf`，用 PyMuPDF `Page.remove_rotation()` 转成直立页，裁框用派生页坐标，生成器核对与原页旋转后外观逐像素一致。2015–2016 无 `/Rotate`。未改 PDF 字节与 `past-papers-data.js`。

基础科目每册 6 道大题（電磁気学、電気回路、情報基礎1、情報基礎2、物理基礎1、物理基礎2）。专门科目每册 7 道大题（電気工学、通信工学、電子工学、計算機1、計算機2、物理専門1、物理専門2）。

## 阻塞

无。

## 入口

- `question-practice.html?paper=tohoku-ee-2014-03-kiso`
- `question-practice.html?paper=tohoku-ee-2014-03-senmon`
- `question-practice.html?paper=tohoku-ee-2014-08-kiso`
- `question-practice.html?paper=tohoku-ee-2014-08-senmon`
- `question-practice.html?paper=tohoku-ee-2015-03-kiso`
- `question-practice.html?paper=tohoku-ee-2015-03-senmon`
- `question-practice.html?paper=tohoku-ee-2015-08-kiso`
- `question-practice.html?paper=tohoku-ee-2015-08-senmon`
- `question-practice.html?paper=tohoku-ee-2016-03-kiso`
- `question-practice.html?paper=tohoku-ee-2016-03-senmon`
- `question-practice.html?paper=tohoku-ee-2016-08-kiso`
- `question-practice.html?paper=tohoku-ee-2016-08-senmon`

页面按 `yearBasis=exam` 显示「年实施」。记录键是逐题练习，不写入整卷 `practice:v1`。

## 检查

- build --check：通过（12 份 manifest，PyMuPDF 1.26.5）
- node tests：通过（`node --test --test-reporter=tap tests/*.test.cjs`，349 项，失败 0）
- `build-paper-practice.cjs --check`、`build-school-index.cjs --check`、`build-question-collections.cjs --check`：通过
