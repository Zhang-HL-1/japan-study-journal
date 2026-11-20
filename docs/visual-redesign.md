# 2026-10-05 视觉更新与回滚

首页、考试科目与范围、修考练习室统一采用暖白底色、陶土色点缀、衬线标题与手绘插图。保留现有官方资料和练习数据结构。动画仅用于首屏入场和悬停，系统设置减少动态效果时关闭。考试结果列表限定高度，可用触摸、滚轮和键盘滚动，点选后在下方阅读完整原文。

## 修改前备份

- 完整备份分支：[backup/pre-claude-redesign-20261005](https://github.com/Zhang-HL-1/japan-study-journal/tree/backup/pre-claude-redesign-20261005)
- 备份提交：`92fd7959b4ea0f683f0125b60394d11c8b5731f6`
- 备份包括东京科学大学上线后的全部318条考试资料。
- GitHub备份分支不包含个人浏览器内的练习记录；练习页仍可导出和导入记录。

如需恢复旧外观，可以让助手“回滚2026-10-05的视觉改版”。优先撤销视觉提交，保留此后新增的考试资料。不要把main强制重置到旧提交，以免删除后续更新。

本次视觉提交标题：`Refresh study site with warm editorial design`。在本地git仓库可用下列命令查找对应提交，再使用`git revert`撤销该提交并正常推送：

```sh
git log --oneline --grep='Refresh study site with warm editorial design'
```

## 插图

- 网站资源：`assets/study-path.webp`（1536×1024）。
- 使用内置图片生成工具，依据用户指定的[anthropic-art skill](https://github.com/HalfAI1102/anthropic-art/blob/feef1e9f850d7b2206b4d5de1b65b05194c0d3e0/skill/SKILL.md)及其style-spec；三张参考图仅用于笔触、配色和构图层次参考。
- 原有考试页插图继续保留。
- 标题字体：本地托管的 Noto Serif CJK SC 字符子集（SIL Open Font License，见 assets/fonts/OFL.txt），覆盖当前静态文案和专攻标题；新增字符回退系统字体。正文使用系统无衬线字体。页面不依赖Google字体网络请求。

生成提示词：

```text
Use case: stylized-concept
Asset type: editorial website hero, landscape 3:2.
Primary request: Illustrate preparing for Japanese graduate study through the single metaphor of an open book becoming a quiet stairway, with one loose hand guiding a pencil along its steps. One dominant symbolic relationship, no literal desk still life.
Input images: the three attached images are STYLE REFERENCES ONLY; transfer stroke behavior and ivory carrier layering, not their subjects or compositions.
Scene/backdrop: full-bleed opaque oat #E3DACC background covering every corner, no white border and no transparency.
Subject: a large asymmetrical open ivory book whose few oversized pages form three simple ascending steps; one naive gestural hand and pencil interact with the page. Restrained, warm, thoughtful, curious.
Style/medium: Anthropic editorial illustration language, bold rounded slightly uneven black ink strokes, deliberate asymmetry, simplified hand, flat two-dimensional forms.
Composition/framing: landscape 3:2, one centered focal cluster occupying 70% of frame with generous breathing room. Readable as a small card.
Color palette: near-black #141413 linework; irregular ivory #FAF9F5 carrier shape; full-frame oat #E3DACC background only.
Materials/textures: clean flat color, slight analog wobble, no paper grain.
Text: none.
Constraints: three-layer system of opaque oat, irregular ivory book silhouette, black gestural marks; original composition.
Avoid: photorealism, fine technical line art, stock-vector polish, 3D, gradients, shadows, glossy lighting, dense detail, logos, watermark, decorative stars, copied reference composition.
```

## 验证

- 既有47项自动化测试通过，包含资料筛选、官方原文与PDF页、练习评分、错题和记录导入导出。
- 320、390、768、1440像素下检查三个页面：无横向溢出，图片加载正常，移动导航与Esc关闭、资料选择和键盘滚动可用。
- 减少动态效果模式下入场动画关闭。
- 318条官方记录、题库文件及练习逻辑与备份逐字节一致。

## 2026-11-20 统一主题（象牙白 + 陶土橙）

- 新增 `theme.css`，在各页面最后加载，只覆盖颜色、字体、圆角与状态；不改数据、练习记录或 Gist 同步格式。
- 色板：底色 `#faf9f5`，面板 `#f0eee6`／`#f3f1ea`，主文字 `#141413`，强调色陶土橙 `#d97757`（按钮 `#c96442`，小字链接 `#b0502f`）。原先散落的绿色、深绿按钮统一收回到墨色或陶土橙。
- 标题与统计数字统一用衬线体；过去问卡片改为「学校·年份」标签 + 衬线标题 + 右侧「阅读原卷」。
- 书桌页、大学院地图页与全站同宽对齐；手机端过去问筛选改为两栏。
- 考试范围页插图另存为 `assets/exam-guide-oat.webp`（薄荷绿底换成燕麦色），原图 `assets/exam-guide.webp` 保留。
- 回滚：删除各页面中 `theme.css` 的 `<link>`，并把 `exam-scope.html` 的插图改回原文件；改版前备份分支为 `backup/pre-claude-polish-20261120`。

## 2026-11-20 交互第一批

- **继续上次**：`resume.js` 在逐题练习换题时记住位置，存于独立键 `japan-study-journal:last-question:v1`（只含卷 ID、题 ID、标题与时间）。首页与练习室显示「继续上次」卡片；无记录时隐藏。不改逐题／整卷练习记录与 Gist 同步。
- **已选条件小标签**：过去问列表上方显示学校、研究科、专攻、年份与关键词，点 × 单独移除，两项以上显示「清除全部」。筛选本来就写入网址（`study-navigation.js`），可直接分享与后退。
- **结果过渡**：筛选变化后前 12 张卡片依次淡入（约 22ms 间隔），首屏加载不播放。
- **完成反馈**：标记本题已练习时，陶土橙圆圈内描线打勾，进度条轻微发光一次。
- 所有动画遵守系统「减少动态效果」设置。

## 2026-11-20 交互第二批

- **键盘快捷键**（逐题练习）：`←` `→` 换题，`Shift+←/→` 换相邻年份的卷，`D` 标记已练习，`F` 收藏，`N` 打开笔记，`Z` 放大题图，`?` 查看说明。在输入框内、按住 Ctrl/⌘/Alt 或有弹窗打开时不拦截。空格保留给浏览器滚动。
- **滑动换题**（触屏）：在题目卡片上快速左右滑动（水平 ≥70px、明显大于垂直位移、700ms 内）切换题目；换题时题图从对应方向轻轻滑入。
- **长列表**：过去问、考试范围与地图校区列表使用 `content-visibility: auto`，屏幕外卡片跳过排版与绘制，元素仍完整保留在页面中。手机 + CPU 降速 4× 下显示全部 929 份过去问约从 0.9s 降到 0.4s。
- **跨页面过渡**未上线：Chromium 在快速连续跳转时会抛出未捕获的 `InvalidStateError`，为避免线上报错暂不启用。
- 程序跳转聚焦的区域（`tabindex="-1"`）不再显示焦点框。
