---
name: past-paper-to-questions
description: 将留日手记的日本大学院过去问 PDF 整理为有出处、可复现裁图、逐题校对的练习数据，并接入网站。用于批量拆题、补录和质检；当前不处理答案、解析或自动评分。
---

# 过去问逐题整理

把资料库中的原卷整理成真正的题目单元。使用用户仓库已有 PDF 和目录元数据；参考网站只用于交互参考，不能搬运它们的题库。使用 GitHub 插件或 CLI，不使用 computer use。可用 CLI 无头浏览器做页面验证。

## 先读什么

- 新接手全量任务：读 [references/workflow.md](references/workflow.md)，再读仓库 `docs/question-bank-rollout.md`，确认本批范围和剩余队列。
- 准备拆题：读 [references/schema.md](references/schema.md)，对照仓库真实样例 `data/question-manifests/kobe-ee-2026-denjiki.json`。
- 准备交付：执行 [references/acceptance.md](references/acceptance.md)。不能用“脚本成功”代替视觉验收。

仓库默认是 `Zhang-HL-1/japan-study-journal`，但通过当前 checkout 的 remote 确认，不依赖某台机器的绝对路径。运行脚本时，`<skill>` 指本 SKILL.md 所在目录；`--repo` 指仓库根目录。

## 必须保持的语义

- **一题 = 原卷一道完整大题**，保留共用题干、关联小问及配图。PDF、目录组、页面、裁图块都不是题数；每题可有多页、多块图片。
- 原日文题干、公式、图表为依据。初期优先忠实裁图。中文标题、知识点是编辑导航信息，显式标记；不要把摘要当作题干，未经校对的 OCR 不作为正文发布。
- 跨页题按原题顺序合并；图若在另一页也必须纳入。共用说明在 `commonRegions`。封面、说明、订正页单独识别；订正影响题干时保留订正材料并标明关系，不自行静默改题。
- 只处理 `files.kind === 'question'` 的原卷。答案、解析、评分、AI 生成练习均不在本阶段范围。
- 年份沿用目录 `yearBasis`、入学年度和原始证据，不把入学年推成实施年。科目以题面/目录证据判定；无法判断则留待复核。
- 不改变原 PDF、过去问目录、旧整卷练习记录或 Gist 同步协议。逐题记录使用 `question-practice:v1`，并兼容旧的 `question-demo:v1`；接入 Gist 同步仍要单独的迁移设计。
- 稳定题目 ID 不随排序、标题翻译、裁图微调而变化。重复共享 PDF 先按文件哈希/页码/题号核对，保留多个目录引用，避免重复计题。

## 一批的执行方式

1. 运行 `node <skill>/scripts/inventory.cjs --repo <repo> --output <queue.json>`。队列是派生清单；`manifest-present` 不是“全部拆完/已上线”。结合 coverage、阻塞记录与页面验收决定完成状态。
2. 选定明确的 PDF/学校/科目批次，渲染**完整相关原卷**，检查题号、小问、续页、图表、公共约定和订正。可用文本/OCR 定位候选边界，最终必须看图。
3. 编写清单，记录来源哈希、原题号、1-based PDF 页码、裁切坐标、全页 coverage 和核对证据。遇到看不清、缺页、跨页归属不明，只记录阻塞项，继续独立可做部分，不猜测补齐。
4. 先用 draft 清单预览：`python3 <skill>/scripts/build_question_assets.py --repo <repo> --manifest data/question-manifests/<id>.json --preview-dir <temporary-directory>`。依赖 `PyMuPDF==1.26.5`。预览保留 draft 状态，输出到生产 assets/data 之外的临时目录，不加入索引。
5. 逐张查看生成图片，对照整页核对，实际通过后填写 `review.status=verified` 与方法、日期、检查记录，并将 coverage 的 `reviewed` 设为 true。再不带 `--preview-dir` 运行生成器，生成正式 `assets/question-bank/<id>/paper.json` 和 PNG。未审核清单不能正式生成。
6. 通过验收后登记 `question-bank-index.json`。刷题页会列出索引中的全部卷。`question-practice.html?paper=<id>&q=<questionId>` 加载单卷 JSON；只按需加载当前题，不把全部题图一次塞入页面，也不要把逐题卷塞回整卷 PDF 题库。
7. 运行数据/浏览器测试，检查实际截图。交付批次报告：PDF 数、大题数、未完成项、校对方法、来源与代码变更、验证结果。发布/合并遵从本次用户授权，skill 本身不扩大授权。

## 工具的能力边界

`build_question_assets.py` 校验来源哈希、页面范围、坐标、ID、coverage 对应和审核标记；它**不能**判断裁掉了几个字、漏了哪张图或科目是否正确。`--check` 重建并逐字节比对，需相同 PyMuPDF 版本；新机器渲染差异应先核对依赖，不能为通过测试随意更新图。

默认沿用已验证的单卷渲染器。需要改数据结构或 UI 时先升级 schema、迁移/兼容旧资料并补验收，不让某一卷的特殊布局变成所有试卷的假设。
