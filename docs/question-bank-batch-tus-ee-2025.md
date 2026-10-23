# 批次：东京理科大学 2025 入学年度 · 電気電子情報工学専攻

AI visual review，2026-10-23。答案和解析未做。未合并。

## 范围

专攻：東京理科大学 創域理工学研究科 電気電子情報工学専攻。年度沿用目录 `yearBasis=academic` 的 2025 入学年度，不把考试日期改写成实施年。

一般入试笔试科目与本卷封面的交集是四科：電子回路、電気回路、電気数学、電磁気学。英语成绩不是原卷。外国人留学生入试的募集要项只写「希望専攻分野に関連する基礎及び専門科目」，本年卷面就是一份「専門科目」，整卷纳入，没有改判成上面四科。

| 卷 | 目录 | PDF | 页 | 大题 |
| --- | --- | --- | --- | --- |
| 电子电路 | `tus-92e97fbb48a52078` | 5（封面 + 问题纸 4 页） | 2–5 | 4 |
| 电路 | 同上 | 4（封面 + 问题纸 3 页） | 2–4 | 3 |
| 电气数学 | 同上 | 5（封面 + 问题纸 4 页） | 2–5 | 4 |
| 电磁学 | 同上 | 4（封面 + 问题纸 3 页） | 2–4 | 3 |
| 外国人入试专业科目 | `tus-3f65f89eae7c0525` | 2（封面 + 问题纸 1 页） | 2 | 1 |

唯一 question PDF 5 份，目录引用 2 条，verified 大题 15 道。封面不计题。每页问题纸是一道大题，小问和配图留在同一题里。外国人入试那一页的 (1)–(3) 共用题干，图号是图 1-1 到 1-3，仍算 1 道。

原卷没有「問題1」标题，用问题纸页码标识。稳定 ID 按该顺序写成 `q1`…，不随中文标题变化。

## 旋转

五份 PDF 每页都是 `/Rotate 270`。原件未改。每卷另存 `normalized.pdf`，由 PyMuPDF `remove_rotation()` 生成，并在 `source.normalization` 记录两边哈希和逐页坐标。裁框用直立页坐标。生成器会核对派生页和原件旋转后的外观是否逐像素一致。

## 阻塞

没有 blocked 项。看不清或跨页归属不明的内容没有遇到，也没有猜测补题。

## 入口

- `question-practice.html?paper=tus-ee-2025-denshi`
- `question-practice.html?paper=tus-ee-2025-kairo`
- `question-practice.html?paper=tus-ee-2025-sugaku`
- `question-practice.html?paper=tus-ee-2025-denjiki`
- `question-practice.html?paper=tus-ee-2025-intl`

记录键仍是 `question-demo:v1`，不写入整卷 `practice:v1`，也不进入 Gist 同步。五卷生成物合计约 7.5MB，含直立派生 PDF。
