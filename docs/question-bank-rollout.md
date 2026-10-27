# 从原卷到逐题题库：实施与交接计划

## 本次已经做好的 Demo

入口：`question-practice.html`（整卷刷题页也有入口）。

- 范围：神户大学工学研究科電気電子工学専攻，2026 **入学年度**，`denjiki-2026.pdf`，2 页、2 道大题。它是目录组 `kobe-ee-2026` 的 9 个科目文件中的 1 个，不代表该目录组全部拆完。
- 大题 1：Maxwell 方程与静电边界条件；大题 2：电流磁场与互感，保留 1a–1c、2、3 及三幅图。
- 呈现：7 个高清 PNG 区域（含 1 个公共说明），直接出现在网页；无 PDF 内嵌阅读器。每题多个图片块仍只计 1 道题。
- 功能：题目目录、上下题、来源/原卷页链接、图像放大、专注阅读、收藏、本地笔记、逐题完成标记、记录导出、URL 直达。
- 不包含：答案、解析、评分、题干 OCR 重排、全量检索、逐题 Gist 同步、Demo 记录导入。Demo 与旧整卷记录分开，不自动把两题完成写为旧整卷完成。
- 局限：裁图正文不能像网页文字自动换行/复制。手机可放大阅读；以后对校对好的题逐步提供文字＋公式正文。配图继续保留原图，不为追求文字化牺牲准确性。
- 原卷/题图均已由 AI 看图对照，`review.method` 明确记录这一点，不冒充人工审题。

2025 入学年度东京理科大学創域理工学研究科電気電子情報工学専攻的逐题 demo 另见 `docs/question-bank-batch-tus-ee-2025.md`。入口示例：`question-practice.html?paper=tus-ee-2025-denshi`。它不取代上面的神户大学样例。

東京科学大学工学院電気電子系 2023、2024、2025 年实施的笔答合卷见 `docs/question-bank-batch-science-tokyo-ee-2023-2025.md`。目录 `yearBasis=exam`，入口示例：`question-practice.html?paper=science-tokyo-ee-2023`。

2016、2017、2018、2019、2021、2022 年实施的同一系笔答合卷见 `docs/question-bank-batch-science-tokyo-ee-2016-2022.md`。没有 2020 年目录条目。入口示例：`question-practice.html?paper=science-tokyo-ee-2016`。

2012–2015 年实施的旧理工学研究科電気電子工学専攻・電子物理工学専攻分科卷见 `docs/question-bank-batch-science-tokyo-ee-2012-2015.md`。目录 `yearBasis=exam`。每年三份独立 PDF：午前电气数学（2015 年封面印「数学」）、午后电气回路、午后电磁气学。入口示例：`question-practice.html?paper=science-tokyo-ee-2012-sugaku`。

2005–2011 年实施的同一旧研究科两科分卷见 `docs/question-bank-batch-science-tokyo-ee-2005-2011.md`。每年只有午前电气回路和午后电磁气学，没有单独的电气数学。入口示例：`question-practice.html?paper=science-tokyo-ee-2005-kairo`。1990 年代碎片合册和 1999–2000 摘录不在该批。

2001–2004 年实施的上午基础领域／下午专业领域合卷见 `docs/question-bank-batch-science-tokyo-ee-2001-2004.md`。每年两份 question PDF，不按后来的单科分卷拆开。入口示例：`question-practice.html?paper=science-tokyo-ee-2001-am`。

1990 与 1993–2000 年实施的旧理工学研究科电气电子、电子物理相关卷见 `docs/question-bank-batch-science-tokyo-ee-pre-2001.md`。1990 与 1993–1998 共用一份 37 页合订扫描，按目录页段分卷；1999–2000 是单页摘录。合订本第 4–5 页没有明示年度，保持 blocked。入口示例：`question-practice.html?paper=science-tokyo-ee-1993`。

## 可移交的实现

| 内容 | 文件 |
| --- | --- |
| 主技能 | `skills/past-paper-to-questions/SKILL.md` |
| 拆题源清单 | `data/question-manifests/kobe-ee-2026-denjiki.json` |
| 可复现裁图脚本 | `skills/past-paper-to-questions/scripts/build_question_assets.py` |
| 目录清点/恢复队列 | `skills/past-paper-to-questions/scripts/inventory.cjs` |
| 数据/审核规则 | `skills/past-paper-to-questions/references/schema.md` |
| 制作与批次交接 | `skills/past-paper-to-questions/references/workflow.md` |
| 内容/程序/UI 验收 | `skills/past-paper-to-questions/references/acceptance.md` |
| 当前已接入卷索引 | `question-bank-index.json` |
| 前端 | `question-practice.html`、同名 CSS/JS |
| 验收测试 | `tests/question-demo.test.cjs`、`tests/question-demo.browser.cjs` |

skill 可直接从仓库给任何 AI 阅读。支持 Codex skill 的环境也可把整个文件夹复制到 `~/.codex/skills/past-paper-to-questions/`，通过 `$past-paper-to-questions` 调用。普通 AI 则读取 SKILL.md 及其引用文档，工具脚本仍从仓库执行。安装路径不是仓库路径；脚本显式传 `--repo` 即可。

## 全量流程

```text
现有过去问目录 + 原 PDF（保留不变）
  → 唯一 PDF 清单 + 目录引用 + 每批状态
  → 看完整原卷、识别大题/小问/共用条件/图/续页
  → draft 拆题清单（页码、裁框、来源、coverage）
  → 临时题图预览
  → 对照原卷逐题核对；疑点进入 blocked 清单
  → verified 清单 + 正式题图/JSON
  → 单卷页面验收 + 总索引登记
  → 跨卷轻量索引与筛选
  → 批次审阅、发布、线上验证
```

### 阶段 1：固定整理规则与试点

本次 Demo 提供了可运行基线。接手 AI 先用一份**存在跨页题**的原卷测试同一 schema，另选一份有封面或订正的卷验证 coverage；不要据两页样例假定“一页一道题”。若 schema 不足，先做小范围兼容扩展再批量执行。

### 阶段 2：按 PDF 分批拆题

先清点，后分批，不要求一次读完所有扫描页。当前口径：828 个含题目录组、1,118 份唯一 question PDF、目录标注共 8,989 页；Demo 覆盖其中 1 份 PDF / 2 道题，剩余 1,117 份 PDF 尚未制作清单。**尚不知道全量大题数。** 最初 1,148 PDF / 9,182 页包含答案/补充材料，不是本阶段拆题口径。

优先电磁学，然后其他已知科目，再处理科目混合/未细分的卷。这个优先级只用于执行顺序，不改变原卷题号。建议先做 5–10 份，记录用时、平均图像体积、疑点率后调整批大小；不根据 Demo 推算并承诺全量耗时。

每个 PDF 有完整 coverage。合订本中只整理一个年度的，要记录未处理年度；有 manifest 不等于整册完成。共享 PDF 根据内容哈希去重，保留所有学校/专攻目录关联。阻塞项记录页码与需要补充的证据，不能为了数量自动通过。

### 阶段 3：跨学校、科目与专攻刷题

刷题页 `drill.html` 已经读取 `question-bank-index.json`，把已接入的卷和整卷放在同一套学校、研究科／专攻、年份、科目筛选里，并用「练习形式」区分。点进后仍是 `question-practice.html?paper=<id>`，可带 `q`。单卷渲染器不嵌入 PDF。下面这些仍然适用：

- 筛选：学校 → 研究科/专攻；科目可独立选择，支持跨校；年度和来源可组合。
- 题目详情按需加载，不一次加载所有扫描题图。
- 每题有自己的稳定 ID、原卷题号、学校/专攻/科目/年度、原卷页码和完整来源链接。
- 一个专攻全题、专攻单科、跨校单科使用同一索引，不复制三份题库。
- 未来练习册使用 `kind=workbook`、书名、版本/章节/题号/页码；真题与练习册可混合或单选。**当前生成器/页面仅实现 exam，练习册要扩展 schema 和路径验收后接入。**

### 阶段 4：逐题学习记录与同步

先确定 `completed`（做过）与收藏/笔记的字段和迁移规则。完成不是答对，不需要答案或正确率。将 demo 本地记录迁移进正式逐题记录时保留稳定 ID；与 Gist 同步合并应复用既有按字段时间戳策略，增加冲突/旧版/导入导出测试后再上线，不直接把新键塞入白名单。

### 阶段 5：逐步文字化（可后做）

对 OCR/人工转录能可靠校对的题，增加网页正文＋公式排版，图表保留图像；原图始终可查看。检查日文、上下标、向量、分式、积分区间与单位逐一对应。未校对的 OCR 只用于检索候选，不展示为已确认题干。扫描件先保持可用，不阻塞其他已完成题目。

## 每批交付标准

1. 清单、源文件哈希、题号、全页 coverage、题图和源页都可互相追溯。
2. 新题逐张视觉核对；无法看清/判断的项目明确 blocked。
3. 程序校验、390/800/1440 浏览器检查和已有整卷/同步回归通过。
4. 报告“处理 PDF 数 / 目录引用数 / verified 大题数 / 尚未完成项”，不混用“页、卷、题”。
5. 代码通过审阅后按用户授权合并/发布，读取线上页面和资源确认生效。保留旧功能和数据。

## 直接交给另一位 AI

> 请从此仓库最新 main 开始，读取 `skills/past-paper-to-questions/SKILL.md` 和本计划，用神户大学单卷 Demo 作为数据与验收范例，分批完成剩余过去问的逐题整理。先重建清单并确定本批范围。日文题干、公式、图表、小问、跨页和公共说明必须完整，出处可追溯；答案、解析和评分不做。不要把 PDF 页/图片块当题数，不猜年度与科目，不用未经核对 OCR 替代题面。遇到疑点记录 blocked 并继续可独立处理的卷。实现跨卷筛选和同步时按阶段推进并保留旧数据。仅使用 GitHub 插件或 CLI，不用 computer use。每批给出检查证据、已完成与剩余清单；合并和发布遵守我这次给你的授权。

## 早稻田电子物理系统近年组（2026-10-26）

范围为基幹理工学研究科・電子物理システム学専攻。按用户最新要求先交付2024、2023、2022三个9月入学目录批次，共29题；保留各自次年4月入学信息。36张题图及公共材料采用renderScale=4的288DPI无损PNG，2023官方订正保留在公共材料。见 `docs/question-bank-batch-waseda-eps-2022-2024.md` 及逐年报告。2025及较早年份按后续分组继续整理。

后续第一组（2026-10-27）：2025、2021、2019共31道大题，36张288DPI无损PNG，详见 `docs/question-bank-batch-waseda-eps-2025-2021-2019.md`。目录没有2020批次；2025同时覆盖2026年4月入学。下一组2018、2017、2016，末组2015、2014。
