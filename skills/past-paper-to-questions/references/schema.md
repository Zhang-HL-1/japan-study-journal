# 数据契约 v1

以仓库 `data/question-manifests/kobe-ee-2026-denjiki.json` 为可运行样例，不把其“每题一页”的版式当作规则。

## 三层数据

1. `data/question-manifests/<paper-id>.json`：人工/AI 看图核对后的制作源文件。
2. `assets/question-bank/<paper-id>/paper.json` 和 PNG：生成文件，不手改；每张图记录源页、裁框、尺寸、SHA-256。
3. `question-bank-index.json`：已验收的单卷入口；`papers[]` 包含 `id,title,catalogId,questionCount,data`。`data` 必须是 `assets/question-bank/<id>/paper.json`。加入索引不自动意味着合并或线上发布。

## 清单字段

- `schemaVersion: 1`。
- `id`：单卷/单科单位，稳定小写英文数字连字符。样例 `kobe-ee-2026-denjiki`；不能只用易重复的 `2026`。
- `title`：展示标题。
- `source`：`kind=exam`、目录 `catalogId`、`schoolId`、学校/研究科/专攻、目录年度 `year` 与 `yearBasis`、规范科目 `subject`、原文 `originalSubject`、`originalName`、原 PDF 仓库相对路径 `pdf`、内容 `sha256`、真实 `pageCount`、来源及年度说明 `note`。
- `source.normalization`：仅当原 PDF 带 `/Rotate` 时必填。保留原件不改，另存 `derivedPdf` 与 `derivedSha256`。`pages[]` 逐页记录 `page`、`sourceRotation`、`sourceMediaBox`、`derivedRotation`（必须为 0）、`derivedRect`。裁框用派生页的直立 `page.rect`。生成器逐页比对原件旋转后的外观与派生页像素；无旋转的卷不得带此字段。Kobe 样例没有旋转，不使用该字段。
- `renderScale`：默认 2.5（PDF point 到像素的倍率，约 180 DPI），按原件清晰度选 1–4；放大不能修复模糊原件。
- `commonRegions[]`：公共说明、单位约定等。每块 `{page,box,label}`。
- `questions[]`：见下文。
- `coverage[]`：**每个 PDF 页码恰好一项**，`{page,questionIds,common,excluded,reviewed}`。正文覆盖、共用内容、未采用部分分别交代；`excluded` 必须说清为何排除，不能用“空白”掩盖未处理题目。部分年度合订本可声明未纳入本卷的页，但不能据此把整个 PDF 标为全部完成。

## 每道大题

- `id`：一旦发布不变，例如 `kobe-ee-2026-denjiki-q2`。排序变化不重编号。合订本若题号重复，把年度/科目放入稳定 ID。
- `number`：原卷题号，例如 `問題 2`，不混成 PDF 页号。
- `title`、`titleKind: editorial`：短中文导航标题，不是原题翻译。
- `topics[]`：已能从题面确认的知识点；允许粗分类，禁止编造难度。
- `summary`：导航摘要/说明，不能替代原题。
- `regions[]`：按阅读顺序排列的所有题干、公式、图表区域，可跨多个页；一块图不增加题数。
- `review`：`status=draft|verified`、`method`、`date`、`notes`。写明实际做的检查；AI 看图审过应明确是 AI visual review，不冒充人工校对。

## 裁框坐标

`page` 是 **1-based 物理 PDF 页序号**，与印刷页码区分。`box=[x0,y0,x1,y1]` 使用 PyMuPDF 未旋转页面 `page.rect` 的 point 坐标，左上为原点。先打印页面尺寸/rotation；不能把屏幕截图像素直接填成 point。

例如以 1.6 倍渲染截图定位后，截图坐标除以 1.6 才是 point。边缘保留约 4–8 point 的余量，尤其积分号上下限、上标、向量箭头和下方图号。按自然段拆块只用于减少留白/按需加载，不改变原题结构。

带 `/Rotate` 的页不能直接裁。保留原 PDF，用 `Page.remove_rotation()` 生成派生副本，把两者哈希和逐页坐标写入 `source.normalization`，并由生成器做像素级溯源。不要无记录地替换原件。中文/日文纵排、复杂跨栏也先做小样验证。

## 生成输出

`regions` 转为 `parts`，新增 `src,width,height,sha256`。公共块转为 `commonParts`。原始来源、review 和 coverage 都保留，方便逆查。

生成器不扫描整个资料库、不自动写总索引、不决定题目边界、不做答案。当前页面只支持 exam PDF 路径；练习册来源是后续扩展，不能仅修改 kind 后声称已接入。

## 批量检索层（后续阶段）

多卷页面可先使用 `?paper=<id>&q=<id>`。全量选题需要另建轻量 `question-index.json`，仅含题目 ID、卷 ID、学校/专攻/科目/年度、来源类型、标题、topics、详情路径，不内嵌题图或整卷正文。按筛选结果加载某卷 JSON，再读对应题。不要每次筛选下载 1,118 份 JSON 或 8,989 页图片。
