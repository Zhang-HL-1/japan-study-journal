# 逐题交付验收

## 内容（逐题看图，不抽样替代）

- 与原 PDF 全页对照，第一行/最后一行完整，无其他题的内容混入。
- 全部小问、条件、脚注、公式编号、积分上下限、上下标、向量箭头、单位、图表、坐标轴和图号均在对应题内。
- 共用条件在题页可见；跨页内容顺序正确。cover/订正/选做规则不被误计成题。
- 题号与原卷一致；编辑标题/topic 和原题正文可区分。
- 科目/学校/专攻/年度来自证据。入学年度与考试日期不混淆。
- OCR 有疑义时以原图为准；不凭物理常识“修正”题面。
- 图片清楚、无截断，放大可读；若原始扫描仍不可辨则 blocked，不标 verified。

## 机械检查

从仓库根目录执行：

```sh
python3 skills/past-paper-to-questions/scripts/build_question_assets.py --manifest data/question-manifests/<id>.json --check
node --test tests/question-demo.test.cjs
node --test --test-reporter=dot tests/*.test.cjs
node scripts/build-paper-practice.cjs --check
node scripts/build-school-index.cjs --check
```

`--check` 使用与生成时一致的 `PyMuPDF==1.26.5`。Node 检查覆盖索引、清单、来源 SHA、题图 SHA/PNG 尺寸、唯一题 ID、coverage 和 catalog 关联；不能证明题图语义正确。

脚本变更时额外运行：`python3 skills/past-paper-to-questions/scripts/test_builder.py --repo .`，检查未审核清单不能发布、坏哈希/越界/不完整 coverage 被拒绝、预览不会污染正式产物。

## UI

CLI Playwright：`node tests/question-demo.browser.cjs`。需要安装 Playwright，`NODE_PATH` 指向其 node_modules；可选 `STUDY_ROOM_BROWSER` 指向 Chrome/Chromium，`STUDY_ROOM_SCREENSHOTS` 指向截图输出目录。

实际检查 390 / 800 / 1440：

- 无 iframe/object/embed PDF；题目直接出现，题图真实加载且尺寸正确，页面没有横向溢出。
- 小屏题图可放大和横向查看，缩放按钮可用；关闭/Esc 后焦点回到触发位置。
- 题目目录、上下题、URL 直达、浏览器后退前进保持正确题目。
- 收藏/完成/笔记刷新后保留，状态不串题，不覆盖旧整卷记录。
- 公共条件及三幅图（在本样例中）完整可见，链接打开正确原卷页。
- 无答案、解析、自动分数入口；“完成”不暗示答对。
- 无效 paper/资源加载失败给出明确提示；存储失败不谎称已保存。
- 控制台无异常，现有整卷/同步浏览器回归仍通过。

## 交付与规模控制

本样例 2 道大题用 7 个 PNG（含公共说明），约 668 KB；不按此简单乘法承诺全量大小。每批统计实际体积，发现异常大图或长合订本再调整裁切/压缩策略，保留原始来源。批量图片索引和加载必须按需，不能在首页预加载所有图片。

提交真实 manifest、生成图片/JSON、测试、批次报告。索引只登记已验收条目。线上发布完成后读取页面及其 JSON/图资源确认成功，不只根据 git push 宣称上线。
