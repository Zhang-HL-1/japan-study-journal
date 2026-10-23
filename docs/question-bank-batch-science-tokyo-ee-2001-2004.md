# 批次：東京科学大学 旧理工学研究科 · 2001–2004 年实施 · 電気電子・電子物理合卷

AI visual review，2026-10-23。答案和解析未做。草稿，未合并。main 已有 2005–2011 分科卷、2012–2015 分科卷，以及 2016–2019、2021–2025 合卷，本批没有重做。

## 范围

学校 `science-tokyo`。目录年 2001–2004，`yearBasis=exam`。研究科是旧理工学研究科，专攻是電気電子工学専攻・電子物理工学専攻。每年两份 question PDF：上午基础领域、下午专业领域。这一段不是 2005 年起的单科分卷。文件名里的 `am` / `pm` 与封面场次一致，不按文件名改科目，也不把合卷拆成后来的电气回路、电磁气学单科。

封面没有印出大学名，也没有印出「理工学研究科」。索引学校名仍用目录的東京科学大学，研究科用目录。封面印「電気電子工学」「電子物理工学」。专攻用目录写法。大修年对应目录里的下一年入学年度，没有把封面入学年改写成实施年，也没有把目录实施年改写成入学年。

| 目录年 | 封面 | 大修 | 入学年度（目录） | 上午 | 下午 |
| --- | --- | --- | --- | --- | --- |
| 2001 | 午前 9:30–11:00；午後 1:30–3:00 | 14 大修 | 2002 | 基础领域，3 题选 2 | 专业领域，4 题选 1 |
| 2002 | 午前 9:30–11:00；午後 13:30–15:00 | 15 大修 | 2003 | 基础领域，3 题选 2 | 专业领域，4 题选 1 |
| 2003 | 午前 9:30–11:00；午後 13:30–15:00 | 16 大修 | 2004 | 3 个问题分野选 2 | 4 个问题分野选 1 |
| 2004 | 午前 9:30–11:00；午後 13:30–15:00 | 17 大修 | 2005 | 3 个问题分野选 2 | 4 个问题分野选 1 |

2001、2002 上午是电气数学、电气回路、电气磁気学各一道大题。下午是电力・能源、波动・通信、电气物性、电子器件・电路系统各一道大题。2003、2004 改为问题分野，分野里面的大题号各自从 1 起算；同一页出现新的大题号时切开，下一页没有新的大题号才跨页合并。小问不拆题。

2002 下午原 PDF 第 7 页 `/Rotate` 为 90。原件未改，派生副本 `assets/question-bank/science-tokyo-ee-2002-pm/normalized.pdf` 用 `Page.remove_rotation()` 转成直立页，裁框用派生页坐标，并与旋转后的原页像素对照。其余 PDF 没有 `/Rotate`。

没有订正页。封面注意事项不是大题。2001 下午第 4 页、2002 下午第 11 页是题面指定的空白作图用纸，印有坐标，没有填写的解答，并入对应大题，不计成另一道题，也不当解答。2004 上午第 8 页是空白页，已在 coverage 里排除。

唯一 question PDF 8 份，目录组 4 个，目录文件引用 8 条，verified 大题 45 道。生成物合计约 26 MB。

## 本批没有做

1990 与 1993–2000 已另批完成，见 `docs/question-bank-batch-science-tokyo-ee-pre-2001.md`。2005–2011、2012–2015 和 2016–2019、2021–2025 已在 main，没有重做。目录没有 2020 年这一专攻的条目。

## 卷

| 卷 id | year | yearBasis | catalogId | 原文件名 | PDF | 页 | 大题 | blocked |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `science-tokyo-ee-2001-am` | 2001 | exam | `science-tokyo-ee-2001` | `H14-am.pdf` | `assets/past-papers/documents/751984e2ca47d4e821133fb4ee8c3ddf9d81ce2253afa70c68060dab32ec5ad3.pdf` | 7 | 3 | 0 |
| `science-tokyo-ee-2001-pm` | 2001 | exam | `science-tokyo-ee-2001` | `H14-pm.pdf` | `assets/past-papers/documents/356b40c2da4d19ca002a1176fe1cd031444e1098c5217bf688d8f6ed999a6304.pdf` | 10 | 4 | 0 |
| `science-tokyo-ee-2002-am` | 2002 | exam | `science-tokyo-ee-2002` | `H15-am.pdf` | `assets/past-papers/documents/d7d806590c3966cf74d7c97e4be22e95ca32ffea3899b51eb24d3e4401f6f805.pdf` | 6 | 3 | 0 |
| `science-tokyo-ee-2002-pm` | 2002 | exam | `science-tokyo-ee-2002` | `H15-pm.pdf` | `assets/past-papers/documents/7d131f301410d957e4f68d52de6128af7d4021e2b151e807fe0ee2b8065df906.pdf` | 11 | 4 | 0 |
| `science-tokyo-ee-2003-am` | 2003 | exam | `science-tokyo-ee-2003` | `H16-am.pdf` | `assets/past-papers/documents/0a2de6d034c9934d6bdf532600ca708fbb8919a98e109d9bce9c9cce8413c6df.pdf` | 7 | 5 | 0 |
| `science-tokyo-ee-2003-pm` | 2003 | exam | `science-tokyo-ee-2003` | `H16-pm.pdf` | `assets/past-papers/documents/612e2efdf52bb5204ec2d7d74e6089321d6d1549b1dbbdae6d899997fd856047.pdf` | 10 | 9 | 0 |
| `science-tokyo-ee-2004-am` | 2004 | exam | `science-tokyo-ee-2004` | `H17-am.pdf` | `assets/past-papers/documents/9a9e5a662df3a2937e32045adb5388a1389f431c08d598685a2b906babaf7f94.pdf` | 8 | 8 | 0 |
| `science-tokyo-ee-2004-pm` | 2004 | exam | `science-tokyo-ee-2004` | `H17-pm.pdf` | `assets/past-papers/documents/955b338886b37f3d09bf67c41227fe5c7799340978699012755093a4885cd9f0.pdf` | 10 | 9 | 0 |

封面计入共用说明，不计题。中文标题是导航，不是原题译文。

### 2001 上午 · 3 题选 2

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2001-am-q1` | 1. | 2–3 | 电气数学：亥姆霍兹方程的有界解 |
| `science-tokyo-ee-2001-am-q2` | 2. | 4–5 | 电气回路：有能电力与谐振电路 |
| `science-tokyo-ee-2001-am-q3` | 3. | 6–7 | 电气磁気学：电荷电场与电流磁场 |

第 3 页从 4) 续起。第 5 页是图 2.4、图 2.5 和后续小问。第 7 页从 3) 续起。

### 2001 下午 · 4 题选 1

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2001-pm-q1` | 1. | 2–4 | 电力：单相配电线与感应电动机 |
| `science-tokyo-ee-2001-pm-q2` | 2. | 5–6 | 波动通信：平面波与调制 |
| `science-tokyo-ee-2001-pm-q3` | 3. | 7–8 | 电气物性：漂移扩散与电介质 |
| `science-tokyo-ee-2001-pm-q4` | 4. | 9–10 | 电子器件：双极晶体管放大电路 |

第 4 页是问题 1 设问 1）和 2）a）的空白作图用纸。第 6 页从 2) 续起。第 8 页从 2) 续起。第 10 页从 2) 续起。

### 2002 上午 · 3 题选 2

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2002-am-q1` | 1． | 2 | 电气数学：三维函数与傅里叶变换 |
| `science-tokyo-ee-2002-am-q2` | 2. | 3–4 | 电气回路：四端网络与最大有能电力 |
| `science-tokyo-ee-2002-am-q3` | ３． | 5–6 | 电气磁気学：导体电像与往复电流 |

第 4 页从 2）续起。第 6 页从 2) 续起。第 3、6 页是扫描页。

### 2002 下午 · 4 题选 1

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2002-pm-q1` | １． | 2–3 | 电力：标幺值与同步机 |
| `science-tokyo-ee-2002-pm-q2` | ２． | 4–6 | 波动通信：加速电荷辐射与最优接收 |
| `science-tokyo-ee-2002-pm-q3` | ３． | 7–8 | 电气物性：半导体电导与分子极化 |
| `science-tokyo-ee-2002-pm-q4` | ４． | 9–11 | 电子器件：计数器与MOS电容 |

第 5 页是图 2.1 和表 2.1。第 6 页从设问 2) 续起，页面尺寸是 612×792。第 7 页是旋转扫描页，转正后题号为 ３．。第 8 页从 2) 续起。第 11 页是设问 2）的空白作图用纸。

### 2003 上午 · 分野内大题

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2003-am-math-1` | 1. | 2–3 | 电气数学：拉普拉斯变换 |
| `science-tokyo-ee-2003-am-circuit-1` | 1. | 4 | 电气回路：电阻网络 |
| `science-tokyo-ee-2003-am-circuit-2` | 2. | 5 | 电气回路：分布参数线路 |
| `science-tokyo-ee-2003-am-em-1` | 1. | 6 上半 | 电气磁気学：无限长导线的磁场 |
| `science-tokyo-ee-2003-am-em-2` | 2. | 6 下半–7 | 电气磁気学：MEMS电容器 |

电气数学只有一道大题，第 3 页从 3) 续到 5)。电气磁気学第 6 页下半另起大题 2，第 7 页续该题。

### 2003 下午 · 分野内大题

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2003-pm-power-1` | 1. | 2 | 电力：送电、同步机与变压器 |
| `science-tokyo-ee-2003-pm-power-2` | 2. | 3 上半 | 电力：反馈控制 |
| `science-tokyo-ee-2003-pm-power-3` | 3. | 3 下半 | 电力：三相二极管整流 |
| `science-tokyo-ee-2003-pm-wave-1` | 1. | 4 | 波动通信：平面波与界面反射 |
| `science-tokyo-ee-2003-pm-wave-2` | 2. | 5–6 | 波动通信：多天线传输 |
| `science-tokyo-ee-2003-pm-phys-1` | 1. | 7 | 电气物性：晶面指数与半导体 |
| `science-tokyo-ee-2003-pm-phys-2` | 2. | 8 | 电气物性：量子力学 |
| `science-tokyo-ee-2003-pm-dev-1` | 1. | 9 | 电子器件：二极管与晶体管 |
| `science-tokyo-ee-2003-pm-dev-2` | 2. | 10 | 电子器件：数字电路 |

波动大题 2 的第 6 页从后续小问续起。电气物性大题 2、电子器件大题 2 都从新页的大题号开始，上一页的大题不跨过去。

### 2004 上午 · 分野内大题

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2004-am-math-1` | １． | 2–3 上半 | 电气数学：格林函数 |
| `science-tokyo-ee-2004-am-math-2` | ２． | 3 下半 | 电气数学：复变函数 |
| `science-tokyo-ee-2004-am-circuit-1` | １． | 4 上半 | 电气回路：诺顿等效 |
| `science-tokyo-ee-2004-am-circuit-2` | ２． | 4 下半 | 电气回路：理想变压器 |
| `science-tokyo-ee-2004-am-circuit-3` | ３． | 5 上半 | 电气回路：传递函数与极零点 |
| `science-tokyo-ee-2004-am-circuit-4` | ４． | 5 下半 | 电气回路：受控源与输入阻抗 |
| `science-tokyo-ee-2004-am-em-1` | １． | 6 | 电气磁気学：插入介质的平行板电容器 |
| `science-tokyo-ee-2004-am-em-2` | ２． | 7 | 电气磁気学：圆电流与转动电荷 |

第 8 页空白，不计题。

### 2004 下午 · 分野内大题

| 题 id | 题号 | PDF 页 | 导航标题 |
| --- | --- | --- | --- |
| `science-tokyo-ee-2004-pm-power-1` | １． | 2 | 电力：对称分量与同步机 |
| `science-tokyo-ee-2004-pm-power-2` | ２． | 3 上半 | 电力：感应电动机的开关驱动 |
| `science-tokyo-ee-2004-pm-power-3` | ３． | 3 下半 | 电力：一阶滞后的反馈控制 |
| `science-tokyo-ee-2004-pm-wave-1` | １． | 4 | 波动通信：趋肤效应 |
| `science-tokyo-ee-2004-pm-wave-2` | ２． | 5 | 波动通信：抽样定理 |
| `science-tokyo-ee-2004-pm-phys-1` | １． | 6 上半 | 电气物性：半导体输运 |
| `science-tokyo-ee-2004-pm-phys-2` | ２． | 6 下半–7 | 电气物性：势垒隧穿 |
| `science-tokyo-ee-2004-pm-dev-1` | １． | 8 | 电子器件：双极晶体管 |
| `science-tokyo-ee-2004-pm-dev-2` | ２． | 9–10 | 电子器件：存储器与模数转换 |

电力大题 2 含图 I.2.1 和图 I.2.2，在大题 3 之前结束。电气物性大题 2 的第 7 页从波动函数续起。电子器件大题 2 的第 10 页从地址分配续起。

## 阻塞

本批 8 份 PDF 没有 blocked 项。看不清到无法归属的符号、缺页、跨页归属不明没有遇到，也没有猜测补题。

| pdf | catalogIds | page | issue | neededEvidence | status |
| --- | --- | --- | --- | --- | --- |
| `H17-am.pdf` | `science-tokyo-ee-2004` | 8 | 空白页 | 页内只有一个空格，没有题干 | integrated |
| `H14-pm.pdf` | `science-tokyo-ee-2001` | 4 | 空白作图用纸 | 题面指定，已并入大题 1 | integrated |
| `H15-pm.pdf` | `science-tokyo-ee-2002` | 11 | 空白作图用纸 | 题面指定，已并入大题 4 | integrated |
| `H15-pm.pdf` | `science-tokyo-ee-2002` | 7 | `/Rotate` 90 | 派生直立页与原页外观一致 | integrated |

## 入口

- `question-practice.html?paper=science-tokyo-ee-2001-am`
- `question-practice.html?paper=science-tokyo-ee-2001-pm`
- `question-practice.html?paper=science-tokyo-ee-2002-am`
- `question-practice.html?paper=science-tokyo-ee-2002-pm`
- `question-practice.html?paper=science-tokyo-ee-2003-am`
- `question-practice.html?paper=science-tokyo-ee-2003-pm`
- `question-practice.html?paper=science-tokyo-ee-2004-am`
- `question-practice.html?paper=science-tokyo-ee-2004-pm`

页面按 `yearBasis=exam` 显示「年实施」。

## 校对

先用 `--preview-dir` 生成预览，再对照原页看题号、首行、末行、小问、图号和跨页。裁图外没有题面墨迹。同一页两道大题的切开处是题号之间的空白。`review.method` 为 AI visual review，不冒充人工校对。
