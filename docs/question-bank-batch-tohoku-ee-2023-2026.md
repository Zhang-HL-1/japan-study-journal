# 批次：东北大学 · 工学研究科 · 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻 · 2023–2026 年实施

AI visual review，2026-11-02。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId `tohoku`；学校 東北大学；研究科 工学研究科；专攻 電気エネルギーシステム専攻／通信工学専攻／電子工学専攻
- `yearBasis=exam`（目录实施年）。本批年份：2023、2024、2025、2026。未改写成入学年。2024 年 2 月分册题页眉印「2024年2・3月実施」，仍用目录实施年 2024。
- 只做目录组 `tohoku-ee-2023-08`、`tohoku-ee-2024-02`、`tohoku-ee-2024-08`、`tohoku-ee-2025-03`、`tohoku-ee-2025-08`、`tohoku-ee-2026-03` 的 question PDF。未开始 2003–2016。
- 这 6 组目录没有单独的外国人入试 question PDF。一般选拔与封面并列的研究科说明见下，不另建卷。

卷面科目只按册子与目录：2023-08、2024-02 分册为「基礎科目」「専門科目」；2024-08 起合册为「基礎専門科目」。大题分野（電磁気学、電気回路等）只写在题目导航里，不另造科目。

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `tohoku-ee-2023-08-kiso` | `tohoku-ee-2023-08` | 2023 | exam | `a51d81c5d431` | 12 | 6 |
| `tohoku-ee-2023-08-senmon` | `tohoku-ee-2023-08` | 2023 | exam | `4775def7406b` | 17 | 6 |
| `tohoku-ee-2024-02-kiso` | `tohoku-ee-2024-02` | 2024 | exam | `f48382d50986` | 12 | 6 |
| `tohoku-ee-2024-02-senmon` | `tohoku-ee-2024-02` | 2024 | exam | `cbf339da693e` | 21 | 6 |
| `tohoku-ee-2024-08` | `tohoku-ee-2024-08` | 2024 | exam | `9136b1a5988d` | 17 | 6 |
| `tohoku-ee-2025-03` | `tohoku-ee-2025-03` | 2025 | exam | `fa736b254a51` | 19 | 6 |
| `tohoku-ee-2025-08` | `tohoku-ee-2025-08` | 2025 | exam | `d2982164cee0` | 19 | 6 |
| `tohoku-ee-2026-03` | `tohoku-ee-2026-03` | 2026 | exam | `78e2fc204c0a` | 20 | 6 |

统计：唯一 question PDF 8；目录引用 8；verified 大题 48；blocked 0；生成物约 40 MB。PDF 页合计 137。封面计入共用说明，不计题。和文页与英文页同属一道大题，小问不拆。原 PDF 无 `/Rotate`，未做派生规范化，未改 PDF 字节与 `past-papers-data.js`。

2024-08、2025-03、2025-08、2026-03 的 PDF 第 2 页是大学院情報科学研究科情報・生命系群封面（时刻与「6 题中选 2」和工学研究科三专攻封面不同），写入 `coverage.excluded`，不计题。其后問題 1–6 为同一册共用试题，已收录。2023-08 与 2024-02 的情報科学研究科、医工学研究科印在同一封面，封面整页作共用说明。

## 阻塞

无。

## 入口

- `question-practice.html?paper=tohoku-ee-2023-08-kiso`
- `question-practice.html?paper=tohoku-ee-2023-08-senmon`
- `question-practice.html?paper=tohoku-ee-2024-02-kiso`
- `question-practice.html?paper=tohoku-ee-2024-02-senmon`
- `question-practice.html?paper=tohoku-ee-2024-08`
- `question-practice.html?paper=tohoku-ee-2025-03`
- `question-practice.html?paper=tohoku-ee-2025-08`
- `question-practice.html?paper=tohoku-ee-2026-03`

页面按 `yearBasis=exam` 显示「年实施」。记录键是逐题练习，不写入整卷 `practice:v1`。

## 检查

- build --check：通过（8 份 manifest，PyMuPDF 1.26.5）
- node tests：通过（`node --test --test-reporter=dot tests/*.test.cjs`，349 项，退出码 0）
- `build-paper-practice.cjs --check`、`build-school-index.cjs --check`、`build-question-collections.cjs --check`：通过
