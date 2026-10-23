# 批次：東京科学大学 工学院 電気電子系 · 2019、2021、2022 年实施 · 笔答合卷

AI visual review，2026-10-23。答案和解析未做。草稿，未合并。2023–2025 已在 main，本批不重做。目录没有 2020 年实施卷。

## 范围

学校 `science-tokyo`，研究科工学院，专攻電気電子系，修士一般入试笔答。只处理目录 `yearBasis=exam` 且目录年为 2019、2021、2022 的三份专业科目合卷。封面印的是下一年「大修」，与目录 `originalYear` / `admissionYears` 一致，没有把入学年改写成实施年，也没有把实施年改写成入学年。

封面未印大学名。学校名沿用目录学校；「工学院」只来自目录。2019、2021 年封面科目栏为「専門科目」，2022 年封面为「筆答専門試験科目」；专攻「電気電子系」封面与目录一致。科目沿用目录「专业科目合卷」。封面科目为数学、电磁气学，以及二选一的电气回路或量子力学/物性基础。两门选择科目都保留为大题。

三份合卷都没有订正页。原 PDF 没有 `/Rotate`，未做派生规范化。

| 卷 id | 目录 year | yearBasis | catalogId | 封面 | 原 PDF | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `science-tokyo-ee-2019` | 2019 | exam | `science-tokyo-ee-2019` | 2020 大修 | `assets/past-papers/documents/77395e7d54da336c129e8617e3c91d5f39456502e4b4366a1e1c65e4e7a8c2c0.pdf` | 12 | 8 |
| `science-tokyo-ee-2021` | 2021 | exam | `science-tokyo-ee-2021` | 2022 大修 | `assets/past-papers/documents/0e352893691bfa2c2ef3e3e77ac2cf429bdbef1e9fea69f596de40cb7c813291.pdf` | 11 | 8 |
| `science-tokyo-ee-2022` | 2022 | exam | `science-tokyo-ee-2022` | 2023 大修 | `assets/past-papers/documents/91ca87178337c261e0e46befaf438d1b8455695cbed7961ab0192bcc5417a838.pdf` | 11 | 8 |

唯一 question PDF 3 份，目录引用 3 条，verified 大题 24 道。封面计入共用说明，不计题。各科目题号从 1 重新起算；跨页大题合并为一题，小问不拆题。

原文件名：2019 `82-ee-r1.pdf`，2021 `exam_ee_20218.pdf`，2022 `exam_ee_20228.pdf`。

### 2019 年实施 · `science-tokyo-ee-2019`

| 题 id | 原题号 | PDF 页 |
| --- | --- | --- |
| `science-tokyo-ee-2019-math-1` | 1． | 2 |
| `science-tokyo-ee-2019-math-2` | 2． | 3 |
| `science-tokyo-ee-2019-em-1` | １． | 4 |
| `science-tokyo-ee-2019-em-2` | 2. | 5–6 |
| `science-tokyo-ee-2019-circuit-1` | 1． | 7 |
| `science-tokyo-ee-2019-circuit-2` | 2． | 8 |
| `science-tokyo-ee-2019-qm-1` | 1． | 9–10 |
| `science-tokyo-ee-2019-qm-2` | 2． | 11–12 |

电磁气学第 2 题的第 6 页是 a)–e)，仍属题号「2.」。量子力学第 1 题跨第 9–10 页；第 10 页页眉虽有「次ページに続く」，下一页另起题号「2．」，不并入第 1 题。

### 2021 年实施 · `science-tokyo-ee-2021`

| 题 id | 原题号 | PDF 页 |
| --- | --- | --- |
| `science-tokyo-ee-2021-math-1` | 1． | 2 |
| `science-tokyo-ee-2021-math-2` | 2． | 3 |
| `science-tokyo-ee-2021-em-1` | 1． | 4–5 |
| `science-tokyo-ee-2021-em-2` | 2． | 6 |
| `science-tokyo-ee-2021-circuit-1` | 1． | 7 |
| `science-tokyo-ee-2021-circuit-2` | 2． | 8 |
| `science-tokyo-ee-2021-qm-1` | １． | 9 |
| `science-tokyo-ee-2021-qm-2` | 2． | 10–11 |

电磁气学第 1 题的第 5 页印有「2)」和小问 e)f)，字母从第 4 页的 a)–d) 续下来，仍属题号「1．」。第 6 页才是题号「2．」。

### 2022 年实施 · `science-tokyo-ee-2022`

| 题 id | 原题号 | PDF 页 |
| --- | --- | --- |
| `science-tokyo-ee-2022-math-1` | 1． | 2 |
| `science-tokyo-ee-2022-math-2` | 2． | 3 |
| `science-tokyo-ee-2022-em-1` | 1. | 4–5 |
| `science-tokyo-ee-2022-em-2` | 2． | 6–7 |
| `science-tokyo-ee-2022-circuit-1` | 1． | 8 |
| `science-tokyo-ee-2022-circuit-2` | 2． | 9 |
| `science-tokyo-ee-2022-qm-1` | 1． | 10 |
| `science-tokyo-ee-2022-qm-2` | 2． | 11 |

第 5 页、第 7 页印有「(前ページからの続き)」，分别属于电磁气学「1.」和「2．」。目次把电气回路放在第 8 页、量子力学/物性基础放在第 10 页，与拆题一致。

生成物合计约 8.3 MB（2019 约 2.8 MB，2021 约 3.0 MB，2022 约 2.5 MB）。

## 阻塞

没有 blocked 项。看不清或跨页归属不明的内容没有遇到，也没有猜测补题。文字层有字体映射乱码的页，以原页字形为准，裁图可读。

## 入口

- `question-practice.html?paper=science-tokyo-ee-2019`
- `question-practice.html?paper=science-tokyo-ee-2021`
- `question-practice.html?paper=science-tokyo-ee-2022`

页面按 `yearBasis=exam` 显示「年实施」。记录键仍是 `question-demo:v1`，不写入整卷 `practice:v1`，也不进入 Gist 同步。

## 校对

先用 `--preview-dir` 生成预览，再逐张对照原页。裁图外缘没有切到笔画。`review.method` 为 AI visual review，不冒充人工校对。

## 检查

- 三份 manifest 的 `build_question_assets.py --check` 通过，PyMuPDF 1.26.5。
- `node scripts/build-school-index.cjs --check`、`node scripts/build-paper-practice.cjs --check`、`node --test tests/*.test.cjs` 通过。
- `node tests/question-demo.browser.cjs` 在 390 / 800 / 1440 通过，含本批三卷：题图加载、无横向溢出、标题为东京科学大学、「年实施」、无「答案」。整卷、自习室、导航、学校页、书桌、同步和地图的浏览器回归也通过。
- 未合并。
