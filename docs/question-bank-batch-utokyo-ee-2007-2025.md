# 批次：東京大学・工学系研究科・電気系工学専攻

AI visual review，2026-11-07。答案未做。草稿 PR，未合并、未部署；用户明确说「合并」后才可合并。

## 范围与结果

- 学校／研究科／专攻严格沿用目录：`utokyo` / `工学系研究科` / `電気系工学専攻`；不另建历史名称或语言筛选入口。
- 覆盖现有全部16个目录组：2007、2008、2011–2019、2021–2025。目录没有2009、2010、2020组，不补造年份。
- `yearBasis=exam`，保留封面、来源目录或用户确认的年度证据。2011、2025的用户确认口径照旧；不从平成24年度或后加的「2020年度以前」提示推算年度。
- 目录均为既有「大学院入試」等原选拔名，无另列外国人特别选拔组，不创造选拔类型。
- 47份唯一目录PDF中，选用33份；另14份为重复英文版本或两页参考和译，明确跳过，不计题、不称其已拆分。
- 33份选用原卷共411个物理页，全部有coverage；145道完整大题，256张216 DPI无损PNG（含13张公共说明），16个年度入口。
- 2007、2008及2021–2023按既有多PDF合卷机制组织年度入口；组件题号、ID、源PDF及物理页保留。其余单PDF直接接入；2011入口为`utokyo-ee-2011-math`。

## 语言、水印与完整性

- 2007数学使用日文；物理只有英文，保留8道英文题。2008及2011使用现有日文。
- 2012–2019合卷的日英题逐题对照，选用日文，英文重复页逐页记入coverage的excluded。2012为第1–10問；2013–2019为問題1–4及A–F，不把I/II或小问拆开。
- 2021六份英文是完整正本。两页`fy2021_s_ja.pdf`仅为部分句子与术语的参考和译，不是完整日文题面，故本次保留六道英文原题。
- 2022、2023各使用六份日文PDF，不收英文副本。2024只收物理页1–14；2025只收1–12。2025第21页只有Sample水印，其他13–25页为英文重复题；coverage分别记录。
- 所有水印原样保留，无去除、重绘、覆盖或修补；PDF原字节不改，题图不做有损压缩。
- 全部原页及全部256张最终preview实际看图核对后才verified。发现并修正2007物理第7题浅灰波导图、2008物理第4题页顶题号，以及扫描卷浅色图号/凡例边界遗漏；扩大裁框后重新预览复核。
- 独立复核覆盖上述特殊题、2011数学第3/6题跨页、2012–2014语言/题号映射、2024問題5独立图页、2025問題1图边及問題4程序页。

## 原卷与可复现生成

`source.pdf`保持papers-2的`utokyo/<sha256>.pdf`托管URL，`source.sha256`锁定原件。生成器支持URL下载至仓外缓存，下载和缓存命中均校验哈希：

```sh
QUESTION_PDF_CACHE=/tmp/utokyo-question-pdfs python3 skills/past-paper-to-questions/scripts/build_question_assets.py --repo . --manifest data/question-manifests/<id>.json --preview-dir /tmp/utokyo-preview
# 逐张审核后移除 --preview-dir 正式生成；加 --check 复现核对。
```

默认缓存为系统临时目录下`japan-study-journal-pdfs/<sha256>.pdf`；可用`QUESTION_PDF_CACHE`指定其他仓外目录。缓存不提交，拒绝仓内缓存、缓存文件符号链接、非现有papers-1/2托管URL、哈希不符及意外重定向。旧本地路径仍兼容。

2018英文重复页17和29带`/Rotate=180`，均明确excluded、不参与裁图；日文被引用页rotation均为0。生成器仅对实际被题目或公共材料引用的旋转页要求既有normalization，原件全文件哈希、页数及全页coverage仍校验。本批没有派生PDF或整卷PDF提交。

## 来源清单

| 制作卷ID | catalogId | 实施年 | 原卷SHA前12位 | 原卷物理页 | 大题 |
| --- | --- | ---: | --- | ---: | ---: |
| utokyo-ee-2007-math | utokyo-ee-2007-08-28 | 2007 | df990df45209 | 5 | 4 |
| utokyo-ee-2007-phys | utokyo-ee-2007-08-28 | 2007 | 1b513066744a | 10 | 8 |
| utokyo-ee-2008-math | utokyo-ee-2008 | 2008 | d02bacda8e91 | 8 | 5 |
| utokyo-ee-2008-phys-info | utokyo-ee-2008 | 2008 | f2680ead0593 | 18 | 12 |
| utokyo-ee-2011-math | utokyo-ee-2011 | 2011 | 8f19df0dc598 | 9 | 6 |
| utokyo-ee-2012 | utokyo-ee-fy2012 | 2012 | 6fe9ff8e5105 | 38 | 10 |
| utokyo-ee-2013 | utokyo-ee-fy2013 | 2013 | 82528975daea | 30 | 10 |
| utokyo-ee-2014 | utokyo-ee-fy2014 | 2014 | 268c87f286e2 | 28 | 10 |
| utokyo-ee-2015 | utokyo-ee-fy2015 | 2015 | 81678d478927 | 30 | 10 |
| utokyo-ee-2016 | utokyo-ee-fy2016 | 2016 | 01d992000f03 | 37 | 10 |
| utokyo-ee-2017 | utokyo-ee-fy2017 | 2017 | 8778ffce8a2b | 36 | 10 |
| utokyo-ee-2018 | utokyo-ee-fy2018 | 2018 | 9ad66b6ec17a | 36 | 10 |
| utokyo-ee-2019 | utokyo-ee-fy2019 | 2019 | 30a3addecd3b | 34 | 10 |
| utokyo-ee-2021-q1 | utokyo-ee-fy2021 | 2021 | 6236b840c4c3 | 3 | 1 |
| utokyo-ee-2021-q2 | utokyo-ee-fy2021 | 2021 | b057780323fd | 3 | 1 |
| utokyo-ee-2021-q3 | utokyo-ee-fy2021 | 2021 | f8738acb9146 | 2 | 1 |
| utokyo-ee-2021-q4 | utokyo-ee-fy2021 | 2021 | 8730d3c91fce | 2 | 1 |
| utokyo-ee-2021-q5 | utokyo-ee-fy2021 | 2021 | 5ba8b79a68e3 | 2 | 1 |
| utokyo-ee-2021-q6 | utokyo-ee-fy2021 | 2021 | bcd2862e37f4 | 2 | 1 |
| utokyo-ee-2022-q1 | utokyo-ee-fy2022 | 2022 | 715de229df55 | 2 | 1 |
| utokyo-ee-2022-q2 | utokyo-ee-fy2022 | 2022 | 2646ba325876 | 2 | 1 |
| utokyo-ee-2022-q3 | utokyo-ee-fy2022 | 2022 | 293b0a154749 | 2 | 1 |
| utokyo-ee-2022-q4 | utokyo-ee-fy2022 | 2022 | 8e0c0df9a304 | 2 | 1 |
| utokyo-ee-2022-q5 | utokyo-ee-fy2022 | 2022 | 3ac62a2a2280 | 3 | 1 |
| utokyo-ee-2022-q6 | utokyo-ee-fy2022 | 2022 | 040c757b4171 | 2 | 1 |
| utokyo-ee-2023-q1 | utokyo-ee-fy2023 | 2023 | 46820620588a | 2 | 1 |
| utokyo-ee-2023-q2 | utokyo-ee-fy2023 | 2023 | 6aa93a5084ba | 2 | 1 |
| utokyo-ee-2023-q3 | utokyo-ee-fy2023 | 2023 | c001a0013555 | 2 | 1 |
| utokyo-ee-2023-q4 | utokyo-ee-fy2023 | 2023 | 203a9224a90d | 2 | 1 |
| utokyo-ee-2023-q5 | utokyo-ee-fy2023 | 2023 | 3821091fe7f9 | 2 | 1 |
| utokyo-ee-2023-q6 | utokyo-ee-fy2023 | 2023 | e0fe417ac297 | 2 | 1 |
| utokyo-ee-2024 | utokyo-ee-fy2024 | 2024 | ad2858f21a9e | 28 | 6 |
| utokyo-ee-2025 | utokyo-ee-2025 | 2025 | 898046dba062 | 25 | 6 |

## 统计与部署容量

生成物（PNG及组件/年度paper.json）共 **281,773,914 bytes / 268.72 MiB**。main基线`46588da`已跟踪文件约988.8 MiB；合入本批后，跟踪文件总量约1,257.9 MiB（约1.23 GiB）。这不是PDF缓存大小。

GitHub公布的[Pages站点上限为1 GB](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)。因此本PR只交付可审阅数据，**合并部署前须解决主站容量**，不能据单元测试或浏览器通过宣称可以上线。遵守用户要求，本批未擅自压图、迁移题图、另开原卷仓或修改Pages部署架构。

## 检查

- Python/PyMuPDF `1.26.5`：33份manifest逐份正式生成及`--check`字节比对通过。
- `python3 skills/past-paper-to-questions/scripts/test_source_cache.py`：10项离线回归通过；既有`test_builder.py`门禁及神户样例复现通过。
- `node --test --test-reporter=spec tests/*.test.cjs`：361项通过，0失败；包括新增东大官方专攻、年度、日英取舍及完整题号类别回归。
- `build-paper-practice.cjs --check`、`build-school-index.cjs --check`、`build-question-collections.cjs --check`：通过。
- 全部145题 × 390/800/1440，435种浏览器组合：题图/公共图加载、无横溢、无PDF内嵌、无答案/语言选择入口、无pageerror、原卷URL及物理页逐题对应；2007/2008及2021–2023切题时切换真实源PDF。
- 既有浏览器回归：`question-demo.browser.cjs`、`question-year-nav.browser.cjs`、`paper-practice.browser.cjs`均通过。额外的完整`study-room.browser.cjs`未通过，见下方既有问题。
- `paper-practice.browser.cjs`仅修复绝对/相对PDF URL的解析，真实PDF的200及`%PDF-`断言保留，三宽度复测通过。
- GitHub Actions运行`42360958743`未启动任何测试步骤：注释为“The job was not started because your account is locked due to a billing issue.”。这是账户侧阻塞，远端CI不能标为通过；需账户侧解除后重新运行。
- `git diff --check`：通过。未修改过去问目录、旧整卷生成物、业务UI、学习记录或Gist同步；未提交PDF/缓存/预览/浏览器依赖。

## 阻塞

题目内容无blocked项。部署容量与GitHub账户账单锁定为明确未解决项，见上节；不表示网站已上线。

额外整站回归发现迁仓遗留的下载问题：`tests/study-room.browser.cjs`仍将本地origin拼在完整托管URL前；在临时兼容该URL解析以继续检查后，发现`past-papers.js`创建下载按钮仍只接受`assets/past-papers/`相对路径，托管URL没有下载按钮，原有下载事件断言因此无法通过。问题位于既有整卷模块；本批不改业务UI或削弱下载断言，临时整站测试改动已撤回，留待单独处理。

## 入口

- `question-practice.html?paper=utokyo-ee-2007`：12道大题。
- `question-practice.html?paper=utokyo-ee-2008`：17道大题。
- `question-practice.html?paper=utokyo-ee-2011-math`：6道大题。
- `question-practice.html?paper=utokyo-ee-2012`：10道大题。
- `question-practice.html?paper=utokyo-ee-2013`：10道大题。
- `question-practice.html?paper=utokyo-ee-2014`：10道大题。
- `question-practice.html?paper=utokyo-ee-2015`：10道大题。
- `question-practice.html?paper=utokyo-ee-2016`：10道大题。
- `question-practice.html?paper=utokyo-ee-2017`：10道大题。
- `question-practice.html?paper=utokyo-ee-2018`：10道大题。
- `question-practice.html?paper=utokyo-ee-2019`：10道大题。
- `question-practice.html?paper=utokyo-ee-2021`：6道大题。
- `question-practice.html?paper=utokyo-ee-2022`：6道大题。
- `question-practice.html?paper=utokyo-ee-2023`：6道大题。
- `question-practice.html?paper=utokyo-ee-2024`：6道大题。
- `question-practice.html?paper=utokyo-ee-2025`：6道大题。
