/* 東京理科大学 工学研究科 電気工学専攻 2025年度.
   一般入試: catalog tus-7bdce392c0bff5f6, exam scope tus-eng-electrical.
   外国人留学生入試: catalog tus-1f2310ffe00f0b2e, exam scope tus-eng-electrical-foreign.
   Booklet labels are 電磁気学・電気回路・電子回路, which are exactly the exam-scope subjects.
   Each card is one 250 dpi crop of one question (statement and figures together).
   Original PDF bytes are not modified.
   prompt is search text and the image alt text; it is not shown as the card body. */
(function (root) {
  const fig = name => 'assets/past-papers/cards/tus-2025-ee/' + name + '.png';
  const pdf = {
    general: {
      electronics: 'assets/past-papers/documents/080f7d3e63eb8715157958c2f039868396a23669ebb0ac4143a0e81d1c2f935c.pdf',
      circuit: 'assets/past-papers/documents/0dc5cfb835a0010f2664ea54437f53db7048564d8cd00ff35b15dd8fc8508d40.pdf',
      em: 'assets/past-papers/documents/ba0b7284655a8ca9d9a49cf8a483d911aa5a5b7360c123720c4e446cc2b1f83a.pdf'
    },
    foreign: {
      electronics: 'assets/past-papers/documents/ead3d9d637608650f6e512fabc26eb237ece2c3a0675be34cca2c658d6190138.pdf',
      circuit: 'assets/past-papers/documents/0b892929c3783e5aa4b3bfacf79a2591761602401c4c1734db0daf814b03afa1.pdf',
      em: 'assets/past-papers/documents/903922bdf8c9a194c99ce06402b284879f81cad4216ceea363e123b98557d6a0.pdf'
    }
  };
  function card(spec) {
    return {
      id: spec.id,
      type: 'card',
      subject: spec.subject,
      subjects: spec.subjects || [spec.subject],
      chapter: spec.chapter,
      difficulty: '未标注',
      title: spec.title,
      prompt: spec.prompt,
      image: fig(spec.image),
      answerText: '',
      explanation: [],
      hint: '',
      demo: 'tus-2025-ee',
      paper: { year: 2025 },
      sourcePdf: spec.sourcePdf,
      sourceCatalogId: spec.catalogId,
      provenance: {
        kind: 'exam',
        school: '東京理科大学',
        graduate: '工学研究科',
        major: '電気工学専攻',
        year: '2025年度',
        number: spec.number,
        page: String(spec.sourcePdf.page),
        label: spec.selection + ' · ' + spec.chapter
      },
      searchTerms: ['東京理科大学', '工学研究科', '電気工学専攻', '2025年度', spec.selection, spec.chapter, spec.number, spec.title].join(' ')
    };
  }
  const bank = [
    {
      id: 'card:tus-2025-ee:general:circuit:1',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[1]',
      title: '一般入試 · 電気回路 [1] 交流回路とベクトル軌跡',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.circuit, page: 2, label: '電気回路' },
      image: 'general-circuit-1',
      prompt: '[1] 図1の回路において、抵抗、インダクタンス、角周波数 ω の交流電圧源がある。解答は指定欄に記し、導出過程を示す。分数は既約分数とし、小数になおす必要はない。\n(1) 接地 G に対する端子 A の電位を求めなさい。\n(2) 接地 G に対する端子 B の電位を求めなさい。\n(3) 端子 AB 間の電圧を、実部と虚部に分けて表しなさい。\n(4) 角周波数を 0 から ∞ まで変化させたとき、(3) の電圧の軌跡を複素平面上に描きなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:circuit:2',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[2]',
      title: '一般入試 · 電気回路 [2] スイッチと過渡現象',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.circuit, page: 3, label: '電気回路' },
      image: 'general-circuit-2',
      prompt: '[2] 図2は直流電流源、抵抗、インダクタ、コンデンサ、およびスイッチ S からなる回路である。\n(1) スイッチ S を閉じた状態でじゅうぶんに時間が経過したときの各電流とコンデンサの電荷を求めなさい。\n(2) 時刻 t = 0 でスイッチ S を開いたとき、t ≥ 0 におけるコンデンサの電荷に関する微分方程式を立てなさい。\n(3) 初期値に注意して微分方程式を解き、t ≥ 0 における電荷を t の関数として表しなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:electronics:1',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[1]',
      title: '一般入試 · 電子回路 [1] オペアンプの伝達関数',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.electronics, page: 2, label: '電子回路' },
      image: 'general-electronics-1',
      prompt: '[1] オペアンプを用いた回路に答えなさい。オペアンプは開ループ利得が無限大、入力インピーダンスが無限大、出力インピーダンスが 0 である。角周波数 ω の交流電圧を入力したときの出力電圧を考える。\n(1) 図1-1 の伝達関数を求めよ。\n(2) 図1-2 の伝達関数を求めよ。\n(3) 図1-1 で、電圧利得の大きさ 20 dB、遮断周波数 10 kHz の特性を実現するときの抵抗を求めなさい。容量は原卷の指定に従う。'
    },
    {
      id: 'card:tus-2025-ee:general:electronics:2',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[2]',
      title: '一般入試 · 電子回路 [2] FET ソース接地増幅',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.electronics, page: 3, label: '電子回路' },
      image: 'general-electronics-2',
      prompt: '[2] 図2-1 と図2-2 は電界効果トランジスタ（FET）を用いたソース接地の増幅回路である。小信号等価回路で交流的な電圧利得を求める。図2-3 は FET の記号、図2-4 は交流成分の小信号等価回路である。\n(1) 図2-1 の交流的な電圧利得を表す式を示しなさい。\n(2) 図2-2 の交流的な電圧利得を表す式を示しなさい。\n答えだけでなく、途中の式や必要な回路図など導出過程も示しなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:electronics:3',
      subject: '电路与模拟电子',
      subjects: ['电路与模拟电子', '数字电子'],
      chapter: '電子回路',
      number: '[3]',
      title: '一般入試 · 電子回路 [3] ディジタル回路',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.electronics, page: 4, label: '電子回路' },
      image: 'general-electronics-3',
      prompt: '[3] ディジタル回路に関する次の設問に答えよ。導出過程も記すこと。\n(1) 原卷の論理式を最も簡単な式にしなさい。\n(2) 図3-1 の AND、OR、インバータからなる回路と等価な論理式と真理値表を示しなさい。\n(3) 図3-2 の回路と等価な論理式と真理値表を示しなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:em:1',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[1]',
      title: '一般入試 · 電磁気学 [1] 球状電荷の電界',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.em, page: 2, label: '電磁気学' },
      image: 'general-em-1',
      prompt: '[1] 真空中にて、点電荷が中心点 O から半径 a の球体内に一様に分布している。電荷密度と真空の誘電率を用いて次に答えよ。\n(1) r > a の位置における電界の強さと電位を求めなさい。\n(2) r < a の位置における電界の強さと電位を求めなさい。\n(3) r = a の電界の強さを求め、中心からの電界の分布を図示しなさい。グラフは解答用紙に描く。'
    },
    {
      id: 'card:tus-2025-ee:general:em:2',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[2]',
      title: '一般入試 · 電磁気学 [2] 共軸円筒導体',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.em, page: 2, label: '電磁気学' },
      image: 'general-em-2',
      prompt: '[2] 図1に示すように、内径、外径、長さをもつ共軸円筒導体の間に導電率をもつ物質を満たしたとき、次に答えよ。\n(1) 内筒から外筒へ放射状に電流を流したときの両筒間の電位差および抵抗を求めなさい。\n(2) 電気抵抗率をもつ物質を満たし、両筒間に電圧を加えたときの全電流を求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:em:3',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[3]',
      title: '一般入試 · 電磁気学 [3] 平行導線に働く力',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.em, page: 3, label: '電磁気学' },
      image: 'general-em-3',
      prompt: '[3] 図2に示すように、真空中に無限に細長い 3 本の直線導体 A、B、C が平面内で平行に置かれている。真空の透磁率を用いて次に答えよ。\n(1) 導体 A に上向き 2 A、導体 B に下向き 3 A を流し、導体 C には電流を流さないとき、導体 B に働く単位長さ当たりの力の大きさと向きを求めなさい。\n(2) (1) と同じ電流に加え、導体 C に電流を流して導体 B に働く力が零になった。その電流の大きさと向きを求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:general:em:4',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[4]',
      title: '一般入試 · 電磁気学 [4] 変位電流',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.em, page: 3, label: '電磁気学' },
      image: 'general-em-4',
      prompt: '[4] 図3に示すように、電極板間に誘電体を挿入した平行平板コンデンサに交流電圧を印加する。導線中の伝導電流とコンデンサ内の変位電流が等しくなることを示しなさい。静電容量と電束密度を用いる。'
    },
    {
      id: 'card:tus-2025-ee:general:em:5',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[5]',
      title: '一般入試 · 電磁気学 [5] ポインティングベクトル',
      catalogId: 'tus-7bdce392c0bff5f6',
      selection: '修士課程・一般入試',
      sourcePdf: { url: pdf.general.em, page: 4, label: '電磁気学' },
      image: 'general-em-5',
      prompt: '[5] 図4に示すように、半径の異なる導体で作られた無限に長い円筒が同軸に置かれている。両円筒間に電位差が印加され、内円筒と外円筒に互いに逆向きの電流が流れている。この導体によって運ばれる電力をポインティング・ベクトルを用いて求めなさい。円筒の電荷と両円筒間の誘電率を用いる。'
    },
    {
      id: 'card:tus-2025-ee:foreign:circuit:1',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[1]',
      title: '外国人留学生入試 · 電気回路 [1] 並列 RLC',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.circuit, page: 2, label: '電気回路' },
      image: 'foreign-circuit-1',
      prompt: '[1] 交流電流源から角周波数 100 rad/s、実効値 10 A の電流が、インダクタ、キャパシタ、抵抗の並列回路に供給され、定常状態にある。素子値は原卷の図に従う。\n(1) 端子間に接続された回路のインピーダンスを求めなさい。\n(2) 端子間電圧の大きさ（実効値）を求めなさい。\n(3) この回路の消費電力（有効電力）を求めなさい。\n(4) 電流実効値を 10 A に保ったまま角周波数を変えたとき、抵抗で消費される電力の最大値とその角周波数を求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:circuit:2',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[2]',
      title: '外国人留学生入試 · 電気回路 [2] 直流電源と重ね合わせ',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.circuit, page: 3, label: '電気回路' },
      image: 'foreign-circuit-2',
      prompt: '[2] 図の回路は直流電圧源、直流電流源、および抵抗からなる。抵抗値は原卷の指定に従う。\n(1) 直流電圧源を 0 V、直流電流源を与えたとき、指定された抵抗を流れる電流の大きさを求めなさい。\n(2) 直流電流源を 0 A とし、直流電圧源だけを考えたとき、指定された抵抗にかかる電圧の大きさを求めなさい。\n(3) 両方の電源があるとき、各抵抗にかかる電圧の大きさを求めなさい。\n(4) 直流電圧源を保ったまま直流電流源を変え、ある抵抗の電圧が 0 V になったときの電流を求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:electronics:1',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[1]',
      title: '外国人留学生入試 · 電子回路 [1] オペアンプ',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.electronics, page: 2, label: '電子回路' },
      image: 'foreign-electronics-1',
      prompt: '[1] オペアンプを用いた回路に答えなさい。開ループ利得は無限大、入力インピーダンスは無限大、出力インピーダンスは 0 とする。\n(1) 図1-1 において、出力電圧を入力電圧と必要な抵抗で示しなさい。\n(2) 図1-1 において、出力電圧の絶対値が二つの入力の差の絶対値に等しくなるために必要な抵抗の関係を求めなさい。\n(3) 図1-2 において、出力電圧を入力と必要な抵抗・容量で示しなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:electronics:2',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[2]',
      title: '外国人留学生入試 · 電子回路 [2] エミッタ接地と負帰還',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.electronics, page: 3, label: '電子回路' },
      image: 'foreign-electronics-2',
      prompt: '[2] 図2-1 はエミッタ接地増幅回路で、信号源は内部インピーダンスをもつ電圧源である。この回路は、図2-2 のように増幅器と減衰器による負帰還増幅回路とみなせる。図2-3 は npn バイポーラトランジスタの簡略化した小信号交流等価回路である。\n(1) 交流分について小信号等価回路を作成し、解答用紙に示しなさい。\n(2) その等価回路から、図2-2 の交流的な電圧利得を表す式を示しなさい。導出過程も示しなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:electronics:3',
      subject: '电路与模拟电子',
      subjects: ['电路与模拟电子', '数字电子'],
      chapter: '電子回路',
      number: '[3]',
      title: '外国人留学生入試 · 電子回路 [3] 論理回路',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.electronics, page: 4, label: '電子回路' },
      image: 'foreign-electronics-3',
      prompt: '[3] 論理回路に関する次の設問に答えよ。考え方と導出過程も示すこと。\n(1) 2 入力 NOR ゲートを CMOS で実現した回路を図示しなさい。\n(2) その回路の平面レイアウトを示しなさい。\n(3) 図3-1 は 2 入力 NOR とインバータからなる。これと等価な回路を 2 入力 NAND ゲート 3 個で構成し、入出力の論理式を最も簡単な式で示しなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:em:1',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[1]',
      title: '外国人留学生入試 · 電磁気学 [1] 直線上の点電荷',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.em, page: 2, label: '電磁気学' },
      image: 'foreign-em-1',
      prompt: '[1] 図1に示すように、真空中の直線上の点 P、A、B に三つの点電荷が配置されている。点の間隔と真空の誘電率は原卷の指定に従う。\n(1) 各電荷に働く力がすべて零になるときの電荷の比を求めなさい。\n(2) 点 A と点 B の間隔と電荷を与えたとき、点 P の電界が零であった。点 P と点 A の間隔を求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:em:2',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[2]',
      title: '外国人留学生入試 · 電磁気学 [2] 環状鉄心とエアギャップ',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.em, page: 3, label: '電磁気学' },
      image: 'foreign-em-2',
      prompt: '[2] 図2に示す、エアギャップのある環状鉄心にコイルを巻き、電流を流す。磁束の漏れとエアギャップでの磁束の広がりは無いものとする。真空の透磁率を用いる。\n(1) 磁気回路と等価な電気回路を作図し、物理量・記号・SI 単位を図中に記入しなさい。\n(2) エアギャップおよび鉄心部の磁界の強さを求めなさい。\n(3) 全磁束および全磁気抵抗を求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:em:3',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[3]',
      title: '外国人留学生入試 · 電磁気学 [3] 自己・相互インダクタンス',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.em, page: 4, label: '電磁気学' },
      image: 'foreign-em-3',
      prompt: '[3] コイル A および B がある。\n(1) コイル A の電流が変化したときの誘導起電力から、コイル A の自己インダクタンスと、コイル B の電流を変化させたときのコイル A の誘導起電力を求めなさい。数値は原卷の指定に従う。\n(2) 各コイルの巻数と、相手のコイルと鎖交する磁束の割合が与えられる。コイル A に電流を流したときに生じる磁束から、両コイル間の相互インダクタンスを求めなさい。'
    },
    {
      id: 'card:tus-2025-ee:foreign:em:4',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[4]',
      title: '外国人留学生入試 · 電磁気学 [4] マクスウェル方程式',
      catalogId: 'tus-1f2310ffe00f0b2e',
      selection: '修士課程・外国人留学生入試',
      sourcePdf: { url: pdf.foreign.em, page: 5, label: '電磁気学' },
      image: 'foreign-em-4',
      prompt: '[4] 誘電率、透磁率、導電率がいずれも零でない均質等方性媒質について答えなさい。\n(1) 微分形の四つのマクスウェルの方程式を書き、各式の法則名と物理的な意味を簡単に説明しなさい。\n(2) マクスウェルの方程式から導かれる、電界および磁界に関する二つの波動方程式を書きなさい。\n(3) 電荷保存の理（電流連続の式）の積分形にガウスの発散定理を適用し、微分形を導きなさい。導出過程も示すこと。'
    }
  ].map(card);
  const selectionOrder = { '修士課程・一般入試': 0, '修士課程・外国人留学生入試': 1 };
  const chapterOrder = { '電気回路': 0, '電子回路': 1, '電磁気学': 2 };
  bank.sort((a, b) => selectionOrder[a.provenance.label.split(' · ')[0]] - selectionOrder[b.provenance.label.split(' · ')[0]]
    || chapterOrder[a.chapter] - chapterOrder[b.chapter]
    || a.provenance.number.localeCompare(b.provenance.number, 'en'));
  if (typeof module !== 'undefined' && module.exports) module.exports = bank;
  else root.TUS_2025_ENG_EE_CARDS = bank;
})(typeof window !== 'undefined' ? window : globalThis);
