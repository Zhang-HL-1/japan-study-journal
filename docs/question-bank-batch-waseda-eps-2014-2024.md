# 批次：早稻田大学 · 電子物理システム学専攻 · 2014–2016 + 2024

AI visual review，2026-10-24。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId：`waseda` / 基幹理工学研究科 / 電子物理システム学専攻
- yearBasis：全部 `academic`（目录标注「9月・次年4月入学」，不是实施年）
- 年份：2014、2015、2016、2024（该专攻目录共 11 份，本轮 4 份）
- 入试区分：均为一般入试「専門科目」；2019 卷内含外国人留学生入试（物理）页，不在本轮
- 三科合卷（力学・電磁気学・回路理論），封面要求三科中选两科作答

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `waseda-eps-2014` | `waseda-246df2585267648e` | 2014 | academic | `dc3ed93aab6d` | 7 | 6 |
| `waseda-eps-2015` | `waseda-1bc1b104efacc5e6` | 2015 | academic | `a34cc0715619` | 7 | 6 |
| `waseda-eps-2016` | `waseda-65f491014ecf954f` | 2016 | academic | `253c4186e5ca` | 7 | 6 |
| `waseda-eps-2024` | `waseda-63166f6106ece642` | 2024 | academic | `34501f43f1cb` | 13 | 6 |

统计：唯一 question PDF 4；目录引用 4；verified 大题 24；blocked 0；生成物约 11.8 MB。

## 题界口径（本批确立）

**`問題番号 1 / 2` 才是大题号**——每科两张答题纸＝两个大题；页内的 `問1/問2/問3/問4` 或 `(1)(2)(3)` 一律是大题下的小问，不拆。

依据：

1. 封面原文「各科目には問題番号 1、2 があり、問題番号 1、2 が記載された解答用紙に、それぞれ解答を記入しなさい」
2. 与仓库既有东科合卷「1./2. 为大题」的约定一致

因此：

- 2014、2015、2016 每页一大题，各 6 大题（各科 問題番号 1・2）
- 2024 初版按 `問n` 拆成 10 大题是错的，已在本批内修正为 6 大题（`a159e35`）

## 各卷要点

- **2014**：每科只有「問題番号 1、2」两道大题，一页一题；无解答用纸。
- **2015**：小问编号在同一科目内连续（力学 (1) 在問題番号 1、(2)(3)(4) 在 2；回路 (1)(2) 在 1、(3) 在 2；電磁 (1)(2) 在 1、(3)(4) 在 2），与問題番号并不同步。
- **2016**：同一试卷内编号体系混用——p2/p3 用 `(1)(2)(3)`，p4/p5 用 `問1/問2`，p6/p7 又用 `(1)(2)(3)`。
- **2024**：13 页 = 問題表紙 1 + 問題用紙 6 + 解答用紙 6（已排除）；三科各两页，`問` 编号在科内重起（力学 問1・問2 两页各一套）。
- 2014–2016 为纯扫描（无文字层），题界靠逐页目视 + 像素行剖面；2024 的文字层是 Acrobat Paper Capture OCR，仅作辅助，未作正文。

## 阻塞

无。

## 入口

- `question-practice.html?paper=waseda-eps-2014`
- `question-practice.html?paper=waseda-eps-2015`
- `question-practice.html?paper=waseda-eps-2016`
- `question-practice.html?paper=waseda-eps-2024`

## 检查

- `build_question_assets.py --check`（PyMuPDF 1.26.5）：4 卷全部 verified
- `node --test tests/question-demo.test.cjs`：2 pass / 0 fail
- `node --test tests/*.test.cjs`：无失败
- `node scripts/build-paper-practice.cjs --check`：通过
- `node scripts/build-school-index.cjs --check`：通过

## 未做

- 2017、2018、2021、2019（2019 含外国人留学生入试页，需单独判断归属）
- 2022、2023、2025 长卷（13–14 页）
