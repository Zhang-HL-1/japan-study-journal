# 批次：東京科学大学 工学院 電気電子系 · 2023–2025 年实施 · 笔答合卷

AI visual review，2026-10-23。答案和解析未做。未合并。

## 范围

学校 `science-tokyo`，研究科工学院，专攻電気電子系，修士一般入试笔答。只处理目录 `yearBasis=exam` 且目录年为 2023、2024、2025 的三份专业科目合卷。封面印的是下一年「大修」，与目录 `originalYear` / `admissionYears` 一致，没有把入学年改写成实施年，也没有把实施年改写成入学年。

封面未印大学名。学校名沿用目录学校；「工学院」只来自目录；「電気電子系」「筆答専門試験科目」封面与目录一致。科目沿用目录「专业科目合卷」。封面科目为数学、电磁气学，以及二选一的电气回路或量子力学/物性基础。两门选择科目都保留为大题。

2025 年目录另有「出题意图」PDF，`kind` 不是 `question`，未纳入。三份合卷都没有订正页。

| 卷 id | 目录 year | yearBasis | catalogId | 封面 | 原 PDF | 页 | 大题 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `science-tokyo-ee-2023` | 2023 | exam | `science-tokyo-ee-2023` | 2024 大修 | `assets/past-papers/documents/1657f2c46e336697d407606542f9fd4822d6f3040259fcfc9b59dad3f951ea0e.pdf` | 13 | 8 |
| `science-tokyo-ee-2024` | 2024 | exam | `science-tokyo-ee-2024` | 2025 大修 | `assets/past-papers/documents/655d886a6ab8a146f8dce78aa4b9290e3a5ab344f1744d0aa05c967720e6fae9.pdf` | 13 | 8 |
| `science-tokyo-ee-2025` | 2025 | exam | `science-tokyo-ee-2025` | 2026 大修 | `assets/past-papers/documents/f87484a3abc7423c64c609566774d93f4d74d4c6b4c14fae938319922619b272.pdf` | 12 | 8 |

唯一 question PDF 3 份，目录引用 3 条，verified 大题 24 道。封面计入共用说明，不计题。各科目题号从 1 重新起算；跨页大题合并为一题，小问不拆题。部分题号是矢量字，已与同形文字题号及封面目次对照。

原 PDF 没有 `/Rotate`，未做派生规范化。

生成物合计约 9.1 MB（2023 约 3.0 MB，2024 约 3.3 MB，2025 约 2.8 MB）。

## 阻塞

没有 blocked 项。看不清或跨页归属不明的内容没有遇到，也没有猜测补题。

## 入口

- `question-practice.html?paper=science-tokyo-ee-2023`
- `question-practice.html?paper=science-tokyo-ee-2024`
- `question-practice.html?paper=science-tokyo-ee-2025`

页面按 `yearBasis=exam` 显示「年实施」。`yearBasis=academic` 的既有卷仍显示「入学年度」。记录键仍是 `question-demo:v1`，不写入整卷 `practice:v1`，也不进入 Gist 同步。

## 校对

先用 `--preview-dir` 生成预览，再逐张对照原页。`review.method` 为 AI visual review，不冒充人工校对。
