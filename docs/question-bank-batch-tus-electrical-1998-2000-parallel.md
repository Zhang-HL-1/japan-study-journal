# 理科大电气：1998–2000 并行批次

按用户要求由三个子agent分年制作，主agent集中核对题界、来源与索引，完成统一浏览器验收后发布。三年共14个完整题目单元、31张PNG、3份唯一question PDF；所有新manifest均使用renderScale=4（288 DPI）无损PNG，接近原约300DPI扫描，不沿用此前180DPI导出。

| 入学年度 | 范围 | 可发布题数 | PNG | 不完整情况 |
| --- | --- | --- | --- | --- |
| 2000 | 电子2、电气2、电磁5个完整关联题单元 | 9 | 18 | 电磁原编号3和6明确共用条件，合为完整题，原编号均保留 |
| 1999 | 电子2、电气2 | 4 | 10 | 电磁只有answer材料，没有question原题 |
| 1998 | 电子第1题 | 1 | 3 | 电子第2题给定真值表缺损；电气、电磁缺question原题 |

年份沿用academic入学年度，题面实际实施日分别为1999-08-02、1998-08-03、1997-08-02，不改写年份。目录一般/外国人范围已核查，无另列外国人question。英语继续不处理，本批亦无英语question来源。所有独立手写解答页与answer文件排除，不由答案反推缺损题面。

完整渲染并查看所有原PDF（12+6+5页），各agent先draft预览、逐张核对后再verified正式生成。大段草稿裁去，少量不影响阅读的标注保留，不使用AI锐化、重绘或OCR替代正文。1998原件有一张已排除的解答页Rotate=90，保留原件，另存规范化派生副本及完整哈希/页映射，逐页检查外观像素一致；实际裁图题页无旋转。

六份manifest的--check、合卷/学校/整卷索引一致性、全套Node测试通过。年份专属测试覆盖来源哈希、原题号、关联题界、全页coverage、4倍像素尺寸、全部PNG哈希、缺损题blocked与旋转副本映射。统一CLI Playwright在390/800/1440遍历全部14题，验证图片加载、目录、URL、来源物理页链接、放大、无横溢与练习记录功能，生成42张逐题截图。各agent检查全部本年拼合图，主agent复核2000关联题、1998完整题与缺损原页及手机效果。

详细报告分别为docs/question-bank-batch-tus-electrical-1998.md、1999.md、2000.md；1998缺损记录见docs/question-bank-tus-electrical-1998-blocked.json。原PDF、过去问目录、旧练习记录、Gist同步协议与共享全专攻队列均不修改；有manifest不等于全PDF已完整收录。

用户已授权检查通过后自动合并上线。PR CI执行完整浏览器回归；合并后核验正式站三份合卷JSON及全部31张PNG哈希。入口分别为question-practice.html?paper=tus-electrical-2000-general、tus-electrical-1999-general、tus-electrical-1998-general。
