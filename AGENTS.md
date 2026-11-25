# 协作规则（给所有在本仓库工作的 AI）

这个仓库由多个 AI 共同维护（ChatGPT、grokbot、DeepSeek、Cursor、Claude 等），主人是 **Zhang-HL-1**。动手前先读完本文件。规则与主人在对话里的明确指示冲突时，以主人的指示为准。

网站是「留日手记」：日本大学院修考备考站。纯静态 GitHub Pages，没有构建步骤，HTML/CSS/JS 直接上线。

## 绝对不做

- **不直接推送到 `main`**。所有改动走分支 + PR。
- **不自己合并 PR**。只有主人明确说「合并」才合并；CI 没有通过、或被取消时不合并。
- **不 force-push、不删除分支、不改写别人的提交历史**。旧 PR 不再需要时：核对内容、在 PR 上留言说明，然后只关闭 PR，分支保留。
- **不改用户存储格式**。以下 localStorage 键名和结构只能向后兼容地扩展（加可选字段），不能改名、删字段或改含义：
  - `japan-study-journal:practice:v1`（整卷练习记录）
  - `japan-study-journal:question-practice:v1`（逐题记录）、`japan-study-journal:question-demo:v1`（旧逐题记录，须继续兼容读取）
  - `japan-study-journal:desk:v1`（书桌收藏）
  - `japan-study-journal:last-question:v1`（继续上次）
  - Gist 同步的数据格式（见 `docs/cross-device-sync.md`）
- **不改原题数据**：`assets/question-bank/**`（paper.json 与裁图）、过去问目录数据、PDF 哈希。拆题流程见 `skills/past-paper-to-questions/SKILL.md`。
- **数据仓库只读**：整卷 PDF 存放在 `Zhang-HL-1/japan-study-journal-papers-1`、`-papers-2`，按 `<学校>/<sha256>.pdf` 存放，由 `data/full-paper-pdf-hosts.json` 登记。不在里面删除或改名文件（改名即断链）。
- **不写密钥**：令牌、密码不进仓库，也不进 PR 描述。

## 工作方式

- 分支名用 `<你的名字>/<主题>`，例如 `claude/topic-links`、`grok/topic-tohoku-2010-2012`，从最新的 `main` 拉出。
- 大改动（全站样式、数据迁移）之前，先推一个备份分支 `backup/pre-<主题>-<YYYYMMDD>`。
- PR 描述用中文，写清：做了什么、没动什么（尤其是存储格式和原题数据）、怎么验证的、截图（界面改动时）。多个相互依赖的 PR 要写明合并顺序。
- 改了 CSS/JS 后，同步更新 HTML 里引用处的 `?v=` 版本号，避免浏览器用旧缓存。

## 提交前必须通过

```bash
node scripts/build-school-index.cjs --check
node scripts/build-paper-practice.cjs --check
node scripts/build-question-collections.cjs --check
node scripts/build-topic-index.cjs --check
node --test tests/*.test.cjs
```

浏览器测试（Playwright）：`node tests/<名称>.browser.cjs`，完整列表见 `.github/workflows/study-room-check.yml`。本地若无法访问 `zhang-hl-1.github.io`，`paper-practice`、`study-room` 等依赖线上 PDF 的测试会失败，属于环境问题；以 CI 结果为准，并在 PR 里说明。

**不跳过、不删除、不弱化测试**来让 CI 变绿。测试失败先找根因。

## 生成文件（不要手改）

| 文件 | 生成方式 |
|---|---|
| `data/topics/topic-index.json`、`docs/topic-review.md` | `node scripts/build-topic-index.cjs` |
| 学校索引、整卷练习数据、题目合集 | 对应的 `scripts/build-*.cjs` |

## 知识点分类

- 知识点表：`data/topics/taxonomy.json`（10 个科目、50 个知识点）。新增或改名知识点要在 PR 里单独说明理由。
- 自动归类规则在 `scripts/topic-classify.cjs`；逐题人工修正写在 `data/topics/overrides.json`，每条必须有 `note` 说明题目考什么。看图判断，不凭大题名推测。
- 改完运行 `node scripts/build-topic-index.cjs`，一起提交生成的索引和核对表。

## 视觉与交互

- 主题是象牙白 + 陶土橙（类 Claude 风格），颜色、字体等统一用 `theme.css` 里的变量（`--paper`、`--clay`、`--ink` 等）。**不做深色模式**。
- 所有动效都要尊重 `prefers-reduced-motion`。
- 手机宽度（390px）不能出现横向滚动。
- 长列表的测试会统计 DOM 元素个数，不要改成懒加载；需要提速时用 `content-visibility`。
