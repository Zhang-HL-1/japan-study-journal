'use strict';
// 知识点自动归类：把题目的 topics 标签、题号和中文导航标题与 data/topics/taxonomy.json 的匹配词比对。
// 只读原题数据，不改写；人工修正写在 data/topics/overrides.json。

// 简体 → 日本新字体（只收题库标签里实际会用到的常见字），让「电磁感应」「電磁誘導」这类不同写法共用一套匹配词。
const CHAR_PAIRS = '电電 气気 场場 应応 变変 换換 传伝 论論 导導 动動 态態 积積 线線 网網 络絡 压圧 级級 联聯 结結 层層 测測 计計 机機 辑輯 时時 间間 迁遷 图図 统統 处処 设設 门門 发発 谐諧 荡蕩 调調 馈饋 环環 输輸 规規 则則 质質 运運 热熱 带帯 载載 扩拡 实実 复複 极極 标標 张張 转転 码碼 数数 类類 权権 关関 观観 讯訊 递逓 归帰 频頻 现現 象象 过過 渡渡 稳穏 获獲 驱駆 实実 验験 题題 简簡 单単 双双 对対 称称 质質 点点 广広 义義 广広 圆円 轴軸 绕繞 辐輻 射射 偏偏 振振 静静 静静 电電 灵霊 敏敏 读読 写写 讲講 书書 页頁 卷巻 册冊 绝絶 缘縁 继継 续続 断断 继継 闭閉 开開 关関 门門 组組 织織 构構 体体 势勢 尔爾 兹茲 达達 赫赫 欧欧 姆姆 库庫 仑侖 应応 变変 两両 个個 种種 节節 范範 围囲 泛汎 历歴 产産 业業 专専 门門 务務 层層 将将 热熱 导導 电電 灯灯 写写 无無 损損 耗耗 缩縮 减減 衰衰 叠畳 认認 识識 记記 忆憶 储儲 存存 储儲 盘盤 选選 择択 译訳 编編 码碼 码碼 补補 码碼 进進 制制 浮浮 点点 并並 发発 处処 理理 器器 库庫 软軟 硬硬 件件 链鎖 表表 树樹 队隊 列列 栈桟 堆堆 搜捜 索索 递逓 归帰 动動 态態 规規 划劃 贪貪 婪婪 罗羅 马馬 尔爾 夫夫 链鎖 测測 试試 验験 统統 计計 样様 际際 线線 变変 换換 与与 为為 从従 这這 们們 们們';

const CHAR_MAP = new Map();
for (const pair of CHAR_PAIRS.split(/\s+/)) {
  if (pair.length === 2 && pair[0] !== pair[1]) CHAR_MAP.set(pair[0], pair[1]);
}

function normalize(text) {
  let out = '';
  for (const ch of String(text).normalize('NFKC').toLowerCase()) out += CHAR_MAP.get(ch) || ch;
  // 空格、中点、连字符写法不一，统一去掉再比对。
  return out.replace(/[\s・·\-‐－—–_/／]+/g, '');
}

const SEP = /[\s・·\-‐－—–_/／]+/g;

// 每个匹配词编译成 { kind, test }：
//   sub  普通词，包含即命中；exact  = 开头，整条文本相同才命中；re  re: 开头的正则；
//   all  all: 开头的正则，对同一题所有文本连起来的整体比对（按上下文区分同一个词）。
function compileMatcher(word) {
  if (word.startsWith('all:')) {
    const re = new RegExp(normalize(word.slice(4).replace(SEP, '')), 'u');
    return { kind: 'all', test: text => re.test(text) };
  }
  if (word.startsWith('re:')) {
    const re = new RegExp(normalize(word.slice(3).replace(SEP, '')), 'u');
    return { kind: 're', test: text => re.test(text) };
  }
  if (word.startsWith('=')) {
    const exact = normalize(word.slice(1));
    return { kind: 'exact', test: text => text === exact };
  }
  const needle = normalize(word);
  if (!needle) throw new Error('empty match word');
  return { kind: 'sub', test: text => text.includes(needle) };
}

function compile(taxonomy) {
  const subjects = taxonomy.subjects.map(subject => ({
    id: subject.id,
    match: (subject.match || []).map(word => ({ word, ...compileMatcher(word) })),
    topics: subject.topics.map(topic => ({
      id: topic.id,
      subject: subject.id,
      match: topic.match.map(word => ({ word, ...compileMatcher(word) })),
    })),
  }));
  const topicIds = new Set(subjects.flatMap(s => s.topics.map(t => t.id)));
  const subjectIds = new Set(subjects.map(s => s.id));
  return { subjects, topicIds, subjectIds };
}

// 题号里常带大题名（「力学（その1）(1)」「問題3 電気回路」），去掉序号部分再比对。
function numberText(number) {
  return String(number || '').replace(/[（(][^）)]*[）)]/g, ' ').replace(/(第?[0-9０-９一二三四五六七八九十]+[問题題]?|問題|问题|大問|设问|設問|その[0-9０-９])/g, ' ');
}

// 返回 { topics: [...], subjects: [...], hits: [{ field, text, id, word }] }
// field: tag = 完整标签；title = 中文导航标题；number = 题号里的大题名；paper = 卷子科目名（只做完全匹配）。
// 完全匹配（=）只对整条文本生效（标签、大题名、标题冒号前后的分段、卷子科目名）。
function classify(question, compiled, paperSubjects = []) {
  const sources = [];
  for (const tag of question.topics || []) sources.push({ field: 'tag', raw: tag, text: normalize(tag), whole: true });
  if (question.title) sources.push({ field: 'title', raw: question.title, text: normalize(question.title), whole: false });
  const num = normalize(numberText(question.number));
  // 题号里的大题名只做完全匹配：早稲田「力学」大题也收量子题，不能凭题号就标成力学。
  if (num) sources.push({ field: 'number', raw: question.number, text: num, whole: true, exactOnly: true });
  // 标题常写成「电气回路：无损耗分布参数线路」，冒号前后分开当作整体文本再比对一次。
  if (question.title && /[:：]/.test(question.title)) {
    for (const part of question.title.split(/[:：]/)) {
      const text = normalize(part);
      if (text) sources.push({ field: 'title', raw: part, text, whole: true, exactOnly: true });
    }
  }
  for (const name of paperSubjects) {
    const text = normalize(name);
    if (text) sources.push({ field: 'paper', raw: name, text, whole: true, exactOnly: true });
  }
  const joined = sources.filter(src => src.field !== 'paper').map(src => src.text).join('¦');
  const usable = (m, src) => m.kind === 'all' ? false
    : m.kind === 'exact' ? src.whole
    : !src.exactOnly;
  const find = matchers => {
    for (const src of sources) {
      const m = matchers.find(x => usable(x, src) && x.test(src.text));
      if (m) return { m, src };
    }
    const m = matchers.find(x => x.kind === 'all' && x.test(joined));
    return m ? { m, src: { field: 'all', raw: '（上下文）' } } : null;
  };
  const topics = new Set(), subjects = new Set(), hits = [];
  for (const subject of compiled.subjects) {
    for (const topic of subject.topics) {
      const found = find(topic.match);
      if (found) { topics.add(topic.id); hits.push({ field: found.src.field, text: found.src.raw, id: topic.id, word: found.m.word }); }
    }
    const found = find(subject.match);
    if (found) { subjects.add(subject.id); hits.push({ field: found.src.field, text: found.src.raw, id: subject.id, word: found.m.word }); }
  }
  return { topics: [...topics], subjects: [...subjects], hits };
}

// 人工修正：{ "questions": { "<题目id>": { "add": [...], "remove": [...], "note": "..." } } }
function applyOverride(result, override, compiled) {
  if (!override) return result;
  const topics = new Set(result.topics);
  for (const id of override.remove || []) topics.delete(id);
  for (const id of override.add || []) {
    if (!compiled.topicIds.has(id) && !compiled.subjectIds.has(id)) throw new Error('override uses unknown topic: ' + id);
    topics.add(id);
  }
  const subjects = new Set(result.subjects);
  for (const id of [...topics]) if (compiled.subjectIds.has(id)) { subjects.add(id); topics.delete(id); }
  for (const id of override.remove || []) subjects.delete(id);
  return { ...result, topics: [...topics], subjects: [...subjects] };
}

module.exports = { normalize, compile, classify, applyOverride, numberText };
