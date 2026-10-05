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
