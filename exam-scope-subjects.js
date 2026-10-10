(function (root) {
  'use strict';
  // Search categories, not replacements for the official subject names.
  // Match only published subjects/scope; department names and eligibility notes are not evidence.
  const definitions = [
    ['math','数学（总类）','数学','数学|mathematics'],
    ['calculus','微积分／数学分析','数学','微分積分|微積分|微分学|積分学|解析学|calculus|mathematical analysis'],
    ['linear-algebra','线性代数','数学','線形代数|線型代数|linear algebra'],
    ['probability','概率与统计','数学','確率|統計(?!力学|物理)|数理統計|統計的|確率統計|probability|statistics'],
    ['differential-equations','微分方程','数学','微分方程式?|differential equations?'],
    ['complex-analysis','复变函数／复分析','数学','複素関数|複素解析|関数論|complex analysis'],
    ['fourier-laplace','傅里叶／拉普拉斯分析','数学','フーリエ|ラプラス|fourier|laplace'],
    ['discrete-math','离散数学','数学','離散数学|組合せ数学|discrete mathematics'],
    ['numerical','数值计算／数值分析','数学','数値計算|数値解析|numerical (?:analysis|computation)'],
    ['optimization','优化／运筹','数学','最適化|数理計画|オペレーションズ[・]?リサーチ|optimization|operations research'],
    ['physics','物理（总类）','物理','物理(?!化学)|基礎物理|一般物理|physics'],
    ['mechanics','力学／分析力学','物理','(?<![\\p{Script=Han}])力学|基礎力学|解析力学|古典力学|classical mechanics|analytical mechanics'],
    ['electromagnetism','电磁学／磁路','物理','電磁気学?|電磁氣学?|電気磁気|電磁学|電磁回路|磁気回路|磁路|電磁|electromagnetism|electromagnetics|magnetic circuits?'],
    ['quantum','量子力学','物理','量子力学|量子論|quantum mechanics'],
    ['thermal-statistical','热学／热力学／统计力学','物理','熱力学|統計力学|熱学|熱統計|thermodynamics|statistical mechanics'],
    ['waves-optics','波动／光学','物理','波動|光学|optics'],
    ['solid-state','固体物理／物性／半导体','物理','固体物理|物性物理|物性工学|半導体|solid state|solid-state|semiconductor'],
    ['circuits','电路（总类）','电气电子','電気回路|電気電子回路|直流回路|交流回路|回路を含む|電子回路|回路理論|回路論|回路解析|論理回路|論理設計|ディジタル回路|デジタル回路|アナログ回路|electric(?:al)? circuits?|electronic circuits?|circuit theory|circuit analysis|logic circuits?|digital circuits?|analog circuits?'],
    ['circuit-theory','电路理论／电气电路','电气电子','電気回路|電気電子回路|直流回路|交流回路|(?<!電子|論理)回路理論|(?<!電子|論理)回路論|回路解析|electric(?:al)? circuits?|circuit theory|circuit analysis'],
    ['electronic-circuits','电子电路／模拟电路','电气电子','電子回路|アナログ回路|electronic circuits?|analog circuits?'],
    ['logic-circuits','数字／逻辑电路','电气电子','論理回路|論理設計|ディジタル回路|デジタル回路|logic circuits?|logic design|digital circuits?'],
    ['control','控制理论／控制工程','电气电子','制御|control (?:theory|engineering|systems?)'],
    ['signals','信号处理','电气电子','信号処理|信号解析|signal processing'],
    ['communications','通信／通信网络','电气电子','通信工学|通信理論|情報通信|通信ネットワーク|communication (?:theory|engineering|networks?)'],
    ['power','电力／电机／电气能源','电气电子','電力|電気機器|電気エネルギー|electric(?:al)? (?:power|machines?|energy)'],
    ['information','信息／计算机（总类）','信息计算机','情報工学|情報科学|情報基礎|計算機科学|computer science|informatics'],
    ['programming','编程／算法／数据结构','信息计算机','プログラミング|アルゴリズム|データ構造|programming|algorithms?|data structures?'],
    ['architecture','计算机组成／体系结构','信息计算机','計算機アーキテクチャ|コンピュータアーキテクチャ|コンピュータ・アーキテクチャ|計算機構成|計算機システム|computer architecture'],
    ['os','操作系统','信息计算机','オペレーティング[・]?システム|operating systems?'],
    ['automata','自动机／形式语言／计算理论','信息计算机','オートマトン|形式言語|計算理論|automata|formal languages?|theory of computation'],
    ['information-theory','信息论／编码','信息计算机','情報理論|符号理論|information theory|coding theory'],
    ['ai','人工智能／机器学习','信息计算机','人工知能|機械学習|artificial intelligence|machine learning'],
    ['networks','计算机网络','信息计算机','計算機ネットワーク|コンピュータネットワーク|computer networks?'],
    ['material-mechanics','材料力学／弹性力学','机械土木','材料力学|弾性力学|mechanics of materials|strength of materials'],
    ['fluid-mechanics','流体力学／流体工学','机械土木','流体力学|流体工学|fluid mechanics|fluids? engineering'],
    ['mechanical-dynamics','机械力学／振动','机械土木','機械力学|振動工学|機械振動|mechanical dynamics|mechanical vibration|dynamics of machinery'],
    ['heat-transfer','传热／传热工学','机械土木','伝熱|heat transfer'],
    ['manufacturing','机械设计／制造加工','机械土木','機械設計|機械工作|加工学|生産加工|設計[・･]生産工学|manufacturing|mechanical design'],
    ['structural','结构力学／结构工程','机械土木','構造力学|構造工学|structural mechanics|structural engineering'],
    ['geotechnical','土质力学／岩土工程','机械土木','土質力学|地盤工学|soil mechanics|geotechnical'],
    ['hydraulics','水理学／水文学','机械土木','水理学|水文学|hydraulics|hydrology'],
    ['chemistry','化学（总类）','化学生物材料','化学|chemistry'],
    ['organic','有机化学','化学生物材料','有機化学|organic chemistry'],
    ['inorganic','无机化学','化学生物材料','無機化学|inorganic chemistry'],
    ['physical-chemistry','物理化学','化学生物材料','物理化学|physical chemistry'],
    ['analytical-chemistry','分析化学','化学生物材料','分析化学|analytical chemistry'],
    ['chemical-engineering','化学工程','化学生物材料','化学工学|chemical engineering'],
    ['biology','生物学／生命科学','化学生物材料','生物学|生命科学|biology|life sciences?'],
    ['biochemistry','生物化学／分子生物学','化学生物材料','生化学|生物化学|分子生物学|biochemistry|molecular biology'],
    ['materials','材料科学／材料工程','化学生物材料','材料科学|材料工学|材料組織|材料物性|materials? (?:science|engineering)'],
    ['architecture-building','建筑学／建筑设计','建筑环境及人文社科','建築学|建築計画|建築設計|建築史|architectural'],
    ['environment','环境科学／环境工程','建筑环境及人文社科','環境科学|環境工学|environmental (?:science|engineering)'],
    ['essay','小论文／论述','建筑环境及人文社科','小論文|論述試験|essay (?:test|exam)|essay writing'],
    ['economics','经济学','建筑环境及人文社科','経済学|経済理論|ミクロ経済|マクロ経済|economics|microeconomics|macroeconomics'],
    ['management','经营学／管理学','建筑环境及人文社科','経営学|経営管理|商学|management|business administration'],
    ['law','法学／法律','建筑环境及人文社科','法学|憲法|民法|刑法|行政法|国際法|商法|法律'],
    ['sociology','社会学','建筑环境及人文社科','社会学|sociology'],
    ['english','英语（含外部成绩）','语言及外部考试','英語|TOEFL|TOEIC|IELTS|English (?:exam(?:ination)?|test|proficiency|ability|qualifications)|(?:^|\\n)English(?:$|\\n)'],
    ['japanese','日语（含外部成绩）','语言及外部考试','日本語|JLPT'],
    ['gre','GRE（外部考试）','语言及外部考试','GRE']
  ];
  const categories = definitions.map(([id,label,group,aliases]) => ({id,label,group,aliases:aliases.split('|'), pattern:new RegExp(aliases,'iu')}));
  const byId = new Map(categories.map(category => [category.id,category]));
  const families = {
    math:['calculus','linear-algebra','probability','differential-equations','complex-analysis','fourier-laplace','discrete-math','numerical','optimization'],
    physics:['mechanics','electromagnetism','quantum','thermal-statistical','waves-optics','solid-state'],
    circuits:['circuit-theory','electronic-circuits','logic-circuits'],
    information:['programming','architecture','os','automata','information-theory','ai','networks'],
    chemistry:['organic','inorganic','physical-chemistry','analytical-chemistry','chemical-engineering','biochemistry']
  };
  const cache = new WeakMap();
  function classify(record) {
    if (!record || record.publicationStatus) return [];
    if (cache.has(record)) return cache.get(record);
    const hits = new Map();
    for (const field of ['subjectsOriginal','scopeOriginal']) {
      // Strip Japanese spacing without joining English words. No conditions/department inference.
      const text = String(record[field] || '').normalize('NFKC').toLowerCase().replace(/(?<=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])\s+(?=[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])/gu,'');
      for (const category of categories) {
        if (field === 'scopeOriginal' && category.id === 'english' && !/TOEFL|TOEIC|IELTS|科学英語|英語(?:試験|能力|筆答|筆記|科目)|English (?:exam|test|proficiency|ability|qualifications)/i.test(text)) continue;
        if (field === 'scopeOriginal' && category.id === 'japanese' && !/JLPT|日本語(?:試験|能力|筆答|筆記|科目)/i.test(text)) continue;
        const match = text.match(category.pattern);
        if (match && !hits.has(category.id)) hits.set(category.id,{id:category.id,field,term:match[0]});
      }
    }
    for (const sentence of String(record.conditionsOriginal || '').normalize('NFKC').split(/[\n。]/)) {
      if (/提出する必要はない|スコアシート不要|提出は不要|提出が不要|提出不要|not required|not necessary|受け付けない|認めない/i.test(sentence)) continue;
      for (const [id,pattern] of [['english',/TOEFL|TOEIC|IELTS|PTE/i],['gre',/\bGRE\b/i],['japanese',/JLPT/i]]) {
        const match = sentence.match(pattern);
        if (match && !hits.has(id)) hits.set(id,{id,field:'conditionsOriginal',term:match[0]});
      }
    }
    for (const [parent,children] of Object.entries(families)) {
      if (!hits.has(parent)) {
        const child = children.map(id=>hits.get(id)).find(Boolean);
        if (child) hits.set(parent,{...child,id:parent});
      }
    }
    const result = categories.filter(category=>hits.has(category.id)).map(category=>hits.get(category.id));
    cache.set(record,result); return result;
  }
  function matches(record, ids, mode = 'all') {
    if (!Array.isArray(ids) || !ids.length) return true;
    const chosen = [...new Set(ids)];
    if (chosen.some(id => !byId.has(id))) return false;
    const found = new Set(classify(record).map(hit=>hit.id));
    return mode === 'any' ? chosen.some(id=>found.has(id)) : chosen.every(id=>found.has(id));
  }
  function search(category, query) {
    const compact = value => String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g,'');
    const aliases = {circuits:'电路 电子回路 回路理论 回路理論', 'circuit-theory':'回路理论 回路理論 电气电路', 'electronic-circuits':'电子回路 电子电路 模拟电路', 'logic-circuits':'逻辑回路 数字电路',electromagnetism:'电磁气学 电磁氣学 电磁回路 电磁学 磁路',calculus:'微积分 微分積分', 'linear-algebra':'线性代数 線形代数'};
    return compact([category.label,...category.aliases,aliases[category.id] || ''].join(' ')).includes(compact(query));
  }
  const api = {categories, classify, matches, search};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ExamScopeSubjects = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
