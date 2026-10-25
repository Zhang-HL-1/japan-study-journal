# 批次：早稻田大学 · 電子物理システム学専攻 · 2014–2017 + 2021 + 2024

AI visual review，2026-10-24。答案未做。草稿 PR，待用户说合并。

## 范围

- schoolId：`waseda` / 基幹理工学研究科 / 電子物理システム学専攻
- yearBasis：全部 `academic`（目录标注「9月・次年4月入学」，不是实施年）
- 年份：2014、2015、2016、2017、2021、2024（该专攻目录共 11 份，本轮 6 份）
- 入试区分：均为一般入试「専門科目」；2019 卷内含外国人留学生入试（物理）页，不在本轮
- 三科合卷（力学・電磁気学・回路理論），封面要求三科中选两科作答

| 卷 id | catalogId | year | yearBasis | PDF sha 前 12 位 | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- |
| `waseda-eps-2014` | `waseda-246df2585267648e` | 2014 | academic | `dc3ed93aab6d` | 7 | 6 |
| `waseda-eps-2015` | `waseda-1bc1b104efacc5e6` | 2015 | academic | `a34cc0715619` | 7 | 6 |
| `waseda-eps-2016` | `waseda-65f491014ecf954f` | 2016 | academic | `253c4186e5ca` | 7 | 6 |
| `waseda-eps-2017` | `waseda-3a6caa92d4660b03` | 2017 | academic | `aedb4bd36f17` | 7 | 6 |
| `waseda-eps-2021` | `waseda-39b945434e9803a2` | 2021 | academic | `b645e97909d5` | 7 | 6 |
| `waseda-eps-2022` | `waseda-08a0e7fe5328f802` | 2022 | academic | `a24f6a584725` | 13 | 6 |
| `waseda-eps-2024` | `waseda-63166f6106ece642` | 2024 | academic | `34501f43f1cb` | 13 | 6 |

统计：唯一 question PDF 7；目录引用 7；verified 大题 42；blocked 2；生成物约 22 MB。

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

```text
pdf: assets/past-papers/documents/684989cdcbb7b157d561dcfc1e0f826342afc0cba48c8c8f380c3db6705e3188.pdf
catalogIds: [waseda-6efa445cc5d92ae2]（2018年9月・2019年4月入学）
page: 2 / 4 / 6
issue: 旋转页（/Rotate 270）——脚本拒绝裁切，坐标须先规范化
neededEvidence: 做规范化派生副本，记录原/派生两份哈希与坐标映射，再扩展脚本
status: blocked
```

2018 卷其余页正常，但 p2/p4/p6 为旋转页，按 skill 规定不静默替换原 PDF，暂缓。

```text
pdf: assets/past-papers/documents/44fe69ef083325326da7c97d0532a72f1c07a59d207f247347d177ca27d28b99.pdf
catalogIds: [waseda-ed65972f17a0dce6]（2019年9月・2020年4月入学，含「訂正ページ付き」与外国人留学生入试页）
page: 3 / 5 / 7
issue: 旋转页（/Rotate 270）
neededEvidence: 同 2018，需规范化派生副本 + 坐标映射
status: blocked
```

2019 除旋转页外，末页为外国人留学生入試「問題用紙（物理）」，含 問題1–4，需单独定归属（本科目 6 大题以外另计）。

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

- 2018、2019（均为旋转页，blocked；2019 另含外国人入试页）
- 2023、2025（长卷，13–14 页）
- 2022、2023、2025 长卷（13–14 页）
