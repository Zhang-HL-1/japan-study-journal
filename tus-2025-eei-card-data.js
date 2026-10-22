/* Demo only: 東京理科大学 創域理工学研究科 電気電子情報工学専攻 2025年度 一般入試.
   Cards are transcribed from the scanned question PDFs. Original PDF bytes are not modified.
   Formula crops are separate image assets, not a cropped PDF reader. */
(function (root) {
  const pdf = {
    math: 'assets/past-papers/documents/425e306640f6cadd4d65cbd7433ca0f8a681f863e5a9ebb5d51e208a12d96e51.pdf',
    em: 'assets/past-papers/documents/1bd65d362ec98805ba3b90f089f0d33147a0d8be0805fef16a4de44b0c6feb5b.pdf',
    circuit: 'assets/past-papers/documents/7b9d5e442a5bb57f22207710b0204870a09e5002a9701b570c73c85bd94eba1c.pdf',
    electronics: 'assets/past-papers/documents/5a4416bfcc24d95c5c8fab820617b8dc94ced228d799cac47a92904f08ebf4a5.pdf'
  };
  const fig = name => 'assets/past-papers/cards/tus-2025-eei/' + name + '.png';
  const base = {
    school: '東京理科大学',
    graduate: '創域理工学研究科',
    major: '電気電子情報工学専攻',
    year: '2025年度',
    catalogId: 'tus-92e97fbb48a52078',
    selection: '修士課程・一般入試'
  };
  function card(spec) {
    const prompt = spec.blocks.filter(block => block.type === 'text').map(block => block.text).join('\n\n');
    return {
      id: spec.id,
      type: 'card',
      subject: spec.subject,
      subjects: spec.subjects || [spec.subject],
      chapter: spec.chapter,
      difficulty: '未标注',
      title: spec.title,
      prompt,
      blocks: spec.blocks,
      answerText: '',
      explanation: [],
      hint: '',
      demo: 'tus-2025-eei',
      paper: { year: 2025 },
      sourcePdf: spec.sourcePdf,
      sourceCatalogId: base.catalogId,
      provenance: {
        kind: 'exam',
        school: base.school,
        graduate: base.graduate,
        major: base.major,
        year: base.year,
        number: spec.number,
        page: String(spec.sourcePdf.page),
        label: base.selection + ' · ' + spec.chapter
      },
      searchTerms: [base.school, base.graduate, base.major, base.year, spec.chapter, spec.number, spec.title].join(' ')
    };
  }
  const bank = [
    card({
      id: 'card:tus-2025-eei:math:1',
      subject: '数学（综合）',
      chapter: '電気数学',
      number: '[1]',
      title: '電気数学 [1] 定積分・接平面・容器',
      sourcePdf: { url: pdf.math, page: 2, label: '電気数学' },
      blocks: [
        { type: 'text', text: '[1] 以下の問いに答えなさい。計算の過程を簡潔に示すこと。\n\n(1) 定積分を求めなさい。ただし、計算の過程で、下に示す関係を用いてもよい。ここで log は自然対数である。' },
        { type: 'figure', src: fig('sugaku-1-integral'), alt: '定積分と、用いてもよい関係式の原卷印字', caption: '原卷数式 · (1)' },
        { type: 'text', text: '(2) 次の楕円体上の点における接平面を表す式を求めなさい。' },
        { type: 'figure', src: fig('sugaku-1-ellipsoid'), alt: '楕円体の方程式と接点の原卷印字', caption: '原卷数式 · (2)' },
        { type: 'text', text: '(3) 2辺の長さが x、y の長方形を底辺とする、高さ z の蓋のない直方体の容器を作ることを考えます。この容器の表面積 S を一定としたときに、容器の体積を最大にするには、x、y、z をそれぞれいくつにしたらよいか示しなさい。ただし、x、y、z は正の値をとるものとします。' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:math:2',
      subject: '数学（综合）',
      subjects: ['数学（综合）', '线性代数'],
      chapter: '電気数学',
      number: '[2]',
      title: '電気数学 [2] 行列式とランク',
      sourcePdf: { url: pdf.math, page: 3, label: '電気数学' },
      blocks: [
        { type: 'text', text: '[2] a, b, c を実数として以下の問いに答えなさい。\n\n(1) 次の行列式を求めなさい。結果は因数分解して示すこと。' },
        { type: 'figure', src: fig('sugaku-2-det'), alt: 'a と b からなる4次行列式の原卷印字', caption: '原卷数式 · (1)' },
        { type: 'text', text: '(2) 行列 A を次のとおりとするとき、行列式 |A^2| を求めなさい。' },
        { type: 'figure', src: fig('sugaku-2-matrix'), alt: '行列 A と |A^2| の原卷印字', caption: '原卷数式 · (2)' },
        { type: 'text', text: '(3) 以下の問いに答えなさい。\n(ア) 行列のランク（階数）とは何か。説明しなさい。\n(イ) 次の行列のランク（階数）を求めなさい。' },
        { type: 'figure', src: fig('sugaku-2-rank'), alt: 'ランクを求める行列の原卷印字', caption: '原卷数式 · (3)(イ)' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:math:3',
      subject: '数学（综合）',
      chapter: '電気数学',
      number: '[3]',
      title: '電気数学 [3] ベクトル解析とフーリエ変換',
      sourcePdf: { url: pdf.math, page: 4, label: '電気数学' },
      blocks: [
        { type: 'text', text: '[3] (1) i, j, k をそれぞれ x 軸方向、y 軸方向、z 軸方向の正の向きの単位ベクトルとして、以下の問いに答えなさい。' },
        { type: 'note', text: '（ア）（イ）のベクトル場・積分領域・法線の向きは、下の原卷截图のとおり。ここでは題意を言い換えない。' },
        { type: 'figure', src: fig('sugaku-3-a'), alt: '電気数学 [3](1)(ア) の原卷印字', caption: '原卷数式 · (1)(ア)' },
        { type: 'text', text: '(イ)' },
        { type: 'figure', src: fig('sugaku-3-b'), alt: '電気数学 [3](1)(イ) の原卷印字', caption: '原卷数式 · (1)(イ)' },
        { type: 'text', text: '(2) フーリエ変換が可能な関数 f(t) の変換と逆変換を下図のとおり定義する。d²f(t)/dt² を、逆変換の記号と関数 F(ω)、変数 ω を用いて表しなさい。' },
        { type: 'figure', src: fig('sugaku-3-fourier'), alt: 'フーリエ変換と逆変換の原卷印字', caption: '原卷数式 · (2)' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:math:4',
      subject: '数学（综合）',
      chapter: '電気数学',
      number: '[4]',
      title: '電気数学 [4] 複素積分と一次分数変換',
      sourcePdf: { url: pdf.math, page: 5, label: '電気数学' },
      blocks: [
        { type: 'text', text: '[4] j を虚数単位、p, q, r を複素数として以下の問いに答えなさい。結果だけでなく導出過程も記すこと。\n\n(1) 実数 x に関する次の広義積分の値を求めなさい。' },
        { type: 'figure', src: fig('sugaku-4-integral'), alt: '広義積分の原卷印字', caption: '原卷数式 · (1)' },
        { type: 'text', text: '(2) 一次分数変換による複素平面上の写像（無限遠点を含む）について、以下の問いに答えなさい。\n(イ) 複素平面内の直線 Re z = 2 の w(z) による像を求めなさい。' },
        { type: 'note', text: '（ア）の条件と（ウ）の写像の定義は、下の原卷截图のとおり。' },
        { type: 'figure', src: fig('sugaku-4-map'), alt: '一次分数変換と写像の問いの原卷印字', caption: '原卷数式 · (2)' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:em:1',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[1]',
      title: '電磁気学 [1] 無限長円柱の電荷',
      sourcePdf: { url: pdf.em, page: 2, label: '電磁気学' },
      blocks: [
        { type: 'text', text: '[1] 半径 a [m] の上下に無限に伸びた直円柱に正電荷が次の (1), (2) のように分布している。それがつくる電界 E(r) [V/m] を距離 r [m] で場合分けして求め、直円柱の中心軸から距離 r [m] の位置における電界 E(r) の大きさと電位 V(r) [V] のグラフを示しなさい。電位の基準点は半径 a [m] の直円柱面上とする。\n事象は、真空中で生じているものとし、真空中の誘電率 ε_0 [F/m] とする。解答用紙には解答の導出過程および単位も記しなさい。\n\n(1) 正電荷が直円柱の内部も含めた全体に密度 ρ [C/m³] で一様に分布している場合。\n(2) 正電荷が直円柱の表面に面密度 σ [C/m²] で一様に分布している場合。' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:em:2',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[2]',
      title: '電磁気学 [2] 同心導体球殻',
      sourcePdf: { url: pdf.em, page: 3, label: '電磁気学' },
      blocks: [
        { type: 'text', text: '[2] 右図のような同心導体球殻 A、B、C がある。球殻 A の外半径を a [m]、球殻 C の内半径を c [m] とし、球殻 B は十分に薄いため内半径と外半径を共に b [m] と近似できるとする（a < b < c）。球殻 A と B の間は誘電率 ε_a [F/m] の誘電体、球殻 B と C の間は誘電率 ε_b [F/m] の誘電体で、それぞれ満たされている。このとき、以下の問いに答えなさい。\n\n(1) 球殻 A と B の間の静電容量 C_AB と、球殻 B と C の間の静電容量 C_BC を、それぞれ求めなさい。\n(2) 球殻 A と C を接地して、球殻 B の電位を V_0 [V] にしたときに、この系に蓄えられる静電エネルギーを求めなさい。\n(3) (2) のときに、球殻 B に作用する力が釣り合った。このときの ε_a / ε_b を、a と b と c を用いて表しなさい。' },
        { type: 'figure', src: fig('denji-2-spheres'), alt: '同心導体球殻 A、B、C の断面', caption: '原卷の図 · 球殻 A、B、C' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:em:3',
      subject: '电磁学',
      chapter: '電磁気学',
      number: '[3]',
      title: '電磁気学 [3] 円柱領域の電磁誘導',
      sourcePdf: { url: pdf.em, page: 4, label: '電磁気学' },
      blocks: [
        { type: 'text', text: '[3] 図1のように、中心を z 軸とし半径 a とする無限長の円柱形の領域に、z 方向の磁束密度が一様に存在する。この磁束密度は単位時間あたり α の割合で単調に増加している。以下の問に答えなさい。\n\n(1) ファラデーの電磁誘導の法則について、微分形と積分形をそれぞれ示しなさい。なお、磁束密度は B、電界は E とする。\n(2) 原点における電界の大きさを求めなさい。\n(3) 点 P(r, 0, 0) における電界の大きさを求めなさい。ただし 0 < r < a とする。\n(4) 点 P に電気量 q の点電荷が静止しているとき、点電荷が受ける力を求め、ベクトルで答えなさい。' },
        { type: 'figure', src: fig('denji-3-cylinder'), alt: '図1 z軸を中心とする無限長円柱と点P', caption: '図1' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:circuit:1',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[1]',
      title: '電気回路 [1] 交流回路のインピーダンス',
      sourcePdf: { url: pdf.circuit, page: 2, label: '電気回路' },
      blocks: [
        { type: 'text', text: '[1] 図1の交流回路において、正弦波交流電圧源 E の角周波数は ω で、閉路電流を図の矢印のとおり i_1、i_2 とする。\n(1) E を基準ベクトルとするとき、以下の問いに答えなさい。\n(a) 回路の合成インピーダンス Z を ω、R、L、C を用いて表しなさい。なお、解答では分母の有理化をせずに連分数で表記しても構わない。\n(b) ω が 0 と ∞ のときの Z をそれぞれ求めなさい。\n(c) |Z| が最小となる ω と、そのときの Z を求めなさい。\n(d) 横軸を実部、縦軸を虚部とした複素平面上において、ω を 0 から ∞ まで変化させたときの Z のベクトル軌跡は円を描く。このとき、解答用紙の複素平面上に Z のベクトル軌跡を表しなさい。なお、円の中心座標や半径を示すとともに、(b), (c) で求めた各 ω における Z の位置を示しなさい。さらに、ω が増加したときに Z が変化する方向を示しなさい。\n(e) ω を 0 から ∞ まで変化させたときの電流 i_1 の大きさ |i_1| の変化の概形を、横軸を ω としたグラフ中に表しなさい。なお、|i_1| の概形を表すための特徴量を示すこと。\n(f) i_2 の位相が i_1 の位相より 30° 遅れたとき、i_2 を i_1 と E を用いて表しなさい。\n\n(2) E = 10∠36.9° V、ω = 100 rad/s、R = 2 Ω、C = 0.01 F、L = 0.02 H のとき、以下の問いに答えなさい。なお、tan^{-1}(3/4) = 36.9° とする。\n(a) i_1、i_2 を未知数とする閉路方程式を立て、行列形式で表すとき、解答欄の空欄を埋めよ。なお、解答は数値で表すこと。\n(b) i_1、i_2 を求め、直角座標表示で示しなさい。\n(c) i_1 を瞬時値表示で表しなさい。' },
        { type: 'figure', src: fig('kairo-1-circuit'), alt: '図1 R、L、C、2R と電源 E、閉路電流 i1、i2', caption: '図1' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:circuit:2',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[2]',
      title: '電気回路 [2] テブナンとブリッジ',
      sourcePdf: { url: pdf.circuit, page: 3, label: '電気回路' },
      blocks: [
        { type: 'text', text: '[2] (1) 図2-1に示すように、電源電圧 E_0 [V] および内部インピーダンス Z_0 [Ω] のテブナンの等価電圧源が表されているとき、ノートンの等価回路を J_0 [A] および内部アドミタンス Y_0 [S] を用いて図示しなさい。また、ノートンの等価電流源の電源電流 J_0 および内部アドミタンス Y_0 を、E_0 と Z_0 を用いて求めなさい。\n\n(2) 図2-2のブリッジ回路において、端子 a、b に対し Z_1 [Ω]、Z_2 [Ω]、Z_3 [Ω]、Z_4 [Ω]、E [V] 側の回路をテブナンの等価電圧源で表すとき、電源電圧 E_0 および内部インピーダンス Z_0 を、Z_1, Z_2, Z_3, Z_4, E の中から用いて求めなさい。\n\n(3) Z_L [Ω] に流れる電流 I_L [A] を Z_0, Z_L, E_0 の中から用いて求めなさい。\n\n(4) Z_L が最大電力となる条件を求めなさい。また、そのときの最大電力 P_L [W] を E_0 を用いて求めなさい。共に分数は約分し、また、分母は虚数が含まれない実数で表すこと。\n\n(5) 次に、(4) の状態から Z_L の値のみ調整したところブリッジ回路が平衡状態になった。このときの抵抗と C を求めなさい。' },
        { type: 'note', text: '（4）の素子値と（5）で求める抵抗の記号は、下の原卷截图のとおり。' },
        { type: 'figure', src: fig('kairo-2-values'), alt: 'ブリッジ回路の素子値と (4)(5) の原卷印字', caption: '原卷の素子指定' },
        { type: 'figure', src: fig('kairo-2-circuits'), alt: '図2-1 テブナン等価電圧源と図2-2 ブリッジ回路', caption: '図2-1 · 図2-2' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:circuit:3',
      subject: '电路与模拟电子',
      chapter: '電気回路',
      number: '[3]',
      title: '電気回路 [3] 交流電源と有効電力',
      sourcePdf: { url: pdf.circuit, page: 4, label: '電気回路' },
      blocks: [
        { type: 'text', text: '[3] 図3に示すように、交流電流源 i_0 と交流電圧源 e_0、抵抗 R、コイル L、キャパシタ C からなる回路がある。この回路について、以下の問いに答えなさい。なお、図中の矢印の向きが電圧および電流の正方向である。また、π などの無理数は、無理数のままで良い。ただし、規約分数で表すなどして、できる限り平易な解となるように答えなさい。また、解答には単位を明示しなさい。\n\n(1) i_0 = 0 として、e_0 のみを考慮した場合の点線で囲まれた部分のアドミタンスを求めなさい。\n(2) e_0 = 0 として、i_0 のみを考慮した場合の点線で囲まれた部分のアドミタンスを求めなさい。\n(3) 電圧 v を、正弦関数を用いて電源との位相を考慮した式で表しなさい。なお、位相角は逆正接関数を用いて表して良い。\n(4) 電圧 v の実効値を求めなさい。\n(5) 抵抗に流れる電流 i を、正弦関数を用いて電源との位相を考慮した式で表しなさい。なお、位相角は逆正接関数を用いて表して良い。\n(6) この回路で消費される有効電力を求めなさい。' },
        { type: 'figure', src: fig('kairo-3-elements'), alt: '図3 交流電流源、交流電圧源、R、L、C', caption: '図3' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:electronics:1',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[1]',
      title: '電子回路 [1] トランジスタ増幅回路',
      sourcePdf: { url: pdf.electronics, page: 2, label: '電子回路' },
      blocks: [
        { type: 'text', text: '[1] 図1aの回路について以下の問いに答えなさい。ただし、トランジスタ Q の直流モデルは図1bで、交流小信号モデルは図1cで、それぞれ表されるものとする。ここで、\nr_π [Ω] = β / g_m 、 r_o [Ω] = V_A / I_C 、 g_m [S] = I_C / (26×10^{-3} V)\nとする。なお、v_i [V] は交流の小信号入力電圧であり、I_1 と I_2 はそれぞれ電流値 I_1 [A] と I_2 [A] を持つ理想直流電流源である。また、交流における容量 C_1、C_2、C_E のインピーダンスは、それぞれ十分小さいものとする。さらに、電圧や電流に関して、小文字の変数は交流小信号成分を、大文字の変数は直流成分を表すものとする。最終的な解答においては、並列記号 // は用いてはならない。\n\n(1) v_i = 0 V として、Q のコレクタ電位 (V_C) のバイアス（直流）値を、単位を付して数値で求めなさい。（分数は不可とする。）\n(2) 電圧利得 A_{v1} [倍] = v_{o1} / v_i は、A_{v1} = α [倍] となる。α を抵抗等の数値を代入せず文字式として表しなさい。\n(3) 入力インピーダンス Z_in [Ω] = v_i / i_i は (2) の α を用いると、Z_in = β [Ω] となる。β を抵抗等の数値を代入せず文字式として表しなさい。\n(4) 電圧利得 A_v [倍] = v_o / v_s は (2) の α を用いると、A_v = γ [倍] となる。γ を抵抗等の数値を代入せず文字式として表しなさい。\n(5) 電圧利得 A_v [倍] の値を数値で求めなさい。（分数は不可とする。）\n回路定数は図1aに示す。' },
        { type: 'figure', src: fig('denshi-1-circuit'), alt: '図1a 増幅回路、図1b 直流モデル、図1c 交流小信号モデル', caption: '図1a · 図1b · 図1c' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:electronics:2',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[2]',
      title: '電子回路 [2] 演算増幅器と入力インピーダンス',
      sourcePdf: { url: pdf.electronics, page: 3, label: '電子回路' },
      blocks: [
        { type: 'text', text: '[2] 図2に示す回路について以下の問いに答えなさい。ただし、図中の演算増幅器は理想的な特性を持ち、最終的な解答の式の最右辺に用いることができる記号は A、R、v_i と v_o のみとする。\n\n(1) 図中の電流 i_1 および i_2、電圧 v_1 および v_2 を表す式（文字式）をそれぞれ求めなさい。\n(2) この回路の入力インピーダンス Z_in = v_i / i_i を表す式（文字式）を求めなさい。' },
        { type: 'figure', src: fig('denshi-2-circuit'), alt: '図2 演算増幅器、抵抗 R と 2R', caption: '図2' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:electronics:3',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[3]',
      title: '電子回路 [3] スイッチと伝達関数',
      sourcePdf: { url: pdf.electronics, page: 4, label: '電子回路' },
      blocks: [
        { type: 'text', text: '[3] 理想演算増幅器からなる、以下の図3の回路について、(1) から (3) の問いに答えなさい。\nただし、R_1 = 100 kΩ、R_2 = 100 kΩ、R_3 = 100 kΩ、R_4 = 100 kΩ、R_5 = 20 kΩ、R_6 = 20 kΩ、R_7 = 100 kΩ、C_1 = 10 μF、C_2 = 10 μF とする。\nなお、解答に回路定数が含まれる場合には、上記の数値を代入し整理して答えなさい。\nまた、スイッチ SW_1、SW_2 および SW_3 は理想的な特性を持つものとする。' },
        { type: 'note', text: '（1）〜（3）のスイッチ接続と入出力の指定は、回路図の下の原卷設問のとおり。' },
        { type: 'figure', src: fig('denshi-3-circuit'), alt: '図3 スイッチ SW1、SW2、SW3 と演算増幅器', caption: '図3' },
        { type: 'figure', src: fig('denshi-3-asks'), alt: '図3についての (1) から (3) の原卷設問', caption: '原卷設問 · (1)〜(3)' }
      ]
    }),
    card({
      id: 'card:tus-2025-eei:electronics:4',
      subject: '电路与模拟电子',
      chapter: '電子回路',
      number: '[4]',
      title: '電子回路 [4] クワドラチャ発振回路',
      sourcePdf: { url: pdf.electronics, page: 5, label: '電子回路' },
      blocks: [
        { type: 'text', text: '[4] 図4に示すクワドラチャ発振回路について、以下の問いに答えなさい。ただし、演算増幅器は理想的な特性を持つものとする。図中の抵抗の単位は Ω、容量の単位は F、電圧の単位は V とする。また、角周波数は ω [rad/s] とし、虚数単位は j とせよ。' },
        { type: 'note', text: '（1）〜（4）の電圧比・発振周波数・位相差は、下の原卷設問のとおり。' },
        { type: 'figure', src: fig('denshi-4-asks'), alt: 'クワドラチャ発振回路の (1) から (4) の原卷設問', caption: '原卷設問 · (1)〜(4)' },
        { type: 'figure', src: fig('denshi-4-circuit'), alt: '図4 クワドラチャ発振回路', caption: '図4' }
      ]
    })
  ];
  const chapterOrder = { '電気回路': 0, '電子回路': 1, '電磁気学': 2, '電気数学': 3 };
  bank.sort((a, b) => chapterOrder[a.chapter] - chapterOrder[b.chapter] || a.provenance.number.localeCompare(b.provenance.number, 'en'));
  if (typeof module !== 'undefined' && module.exports) module.exports = bank;
  else root.TUS_2025_EEI_CARDS = bank;
})(typeof window !== 'undefined' ? window : globalThis);
