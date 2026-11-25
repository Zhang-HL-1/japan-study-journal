(function (root) {
  'use strict';
  // 文字归一化：繁简、日中字形与全半角统一，供知识点归类（Node 构建脚本）与全站搜索（浏览器）共用。
  // BASE 是知识点归类用的表，改动会影响归类结果，改后须运行 node scripts/build-topic-index.cjs 核对。
  // SEARCH_EXTRA 只给搜索用：补上校名、地名常见字（东→東、稻→稲、應→応 等）。
  const BASE = '电電 气気 场場 应応 变変 换換 传伝 论論 导導 动動 态態 积積 线線 网網 络絡 压圧 级級 联聯 结結 层層 测測 计計 机機 辑輯 时時 间間 迁遷 图図 统統 处処 设設 门門 发発 谐諧 荡蕩 调調 馈饋 环環 输輸 规規 则則 质質 运運 热熱 带帯 载載 扩拡 实実 复複 极極 标標 张張 转転 码碼 数数 类類 权権 关関 观観 讯訊 递逓 归帰 频頻 现現 象象 过過 渡渡 稳穏 获獲 驱駆 实実 验験 题題 简簡 单単 双双 对対 称称 质質 点点 广広 义義 广広 圆円 轴軸 绕繞 辐輻 射射 偏偏 振振 静静 静静 电電 灵霊 敏敏 读読 写写 讲講 书書 页頁 卷巻 册冊 绝絶 缘縁 继継 续続 断断 继継 闭閉 开開 关関 门門 组組 织織 构構 体体 势勢 尔爾 兹茲 达達 赫赫 欧欧 姆姆 库庫 仑侖 应応 变変 两両 个個 种種 节節 范範 围囲 泛汎 历歴 产産 业業 专専 门門 务務 层層 将将 热熱 导導 电電 灯灯 写写 无無 损損 耗耗 缩縮 减減 衰衰 叠畳 认認 识識 记記 忆憶 储儲 存存 储儲 盘盤 选選 择択 译訳 编編 码碼 码碼 补補 码碼 进進 制制 浮浮 点点 并並 发発 处処 理理 器器 库庫 软軟 硬硬 件件 链鎖 表表 树樹 队隊 列列 栈桟 堆堆 搜捜 索索 递逓 归帰 动動 态態 规規 划劃 贪貪 婪婪 罗羅 马馬 尔爾 夫夫 链鎖 测測 试試 验験 统統 计計 样様 际際 线線 变変 换換 与与 为為 从従 这這 们們 们們';
  const SEARCH_EXTRA = '效効 东東 稻稲 户戸 庆慶 應応 滨浜 叶葉 岛島 冈岡 爱愛 桥橋 览覧 馆館 读読 汉漢 语語 讯訊 纳納 维維 观観 际際 艺芸 术術 药薬 农農 环環 经経 济済 营営 际際 历歴 乐楽 图図 书書 记記 习習 题題 卷巻 问問 门門 专専 课課 试試 验験 选選 拔抜 册冊 页頁 长長 乡郷 县県 广広 东東';

  function buildMap(...sources) {
    const map = new Map();
    for (const source of sources) for (const pair of source.split(/\s+/)) {
      if (pair.length === 2 && pair[0] !== pair[1] && !map.has(pair[0])) map.set(pair[0], pair[1]);
    }
    return map;
  }
  const BASE_MAP = buildMap(BASE);
  const SEARCH_MAP = buildMap(BASE, SEARCH_EXTRA);
  const SEP = /[\s・·\-‐－—–_/／]+/g;

  function make(map) {
    return function normalize(text) {
      let out = '';
      for (const ch of String(text).normalize('NFKC').toLowerCase()) out += map.get(ch) || ch;
      return out.replace(SEP, '');
    };
  }

  const api = { normalize: make(BASE_MAP), normalizeSearch: make(SEARCH_MAP), SEP };
  root.TextNormalize = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
