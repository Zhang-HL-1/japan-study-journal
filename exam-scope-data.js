/* 東京大学核验日期 2026-10-03；京都大学、早稲田大学、東京理科大学核验日期 2026-10-04。官方原文与对应PDF页保留；预告及募集停止单独标识。 */
(function (root) {
  'use strict';
  const data = {
  "universities": [
    {
      "id": "utokyo",
      "name": "東京大学",
      "aliases": [
        "东大",
        "東大",
        "东京大学"
      ]
    },
    {
      "id": "kyoto",
      "name": "京都大学",
      "aliases": [
        "京大"
      ]
    },
    {
      "id": "science-tokyo",
      "name": "東京科学大学",
      "aliases": [
        "东科",
        "東科",
        "东京科学大学",
        "东工大",
        "東京工業大学"
      ]
    },
    {
      "id": "waseda",
      "name": "早稲田大学",
      "aliases": [
        "早大",
        "早稻田大学"
      ]
    },
    {
      "id": "tus",
      "name": "東京理科大学",
      "aliases": [
        "东理",
        "東理",
        "东京理科大学"
      ]
    }
  ],
  "catalog": {
    "utokyo": {
      "verifiedAt": "2026-10-03",
      "degree": "修士課程",
      "graduateSchools": [
        "工学系研究科",
        "理学系研究科",
        "情報理工学系研究科",
        "数理科学研究科",
        "新領域創成科学研究科"
      ],
      "note": "已收录东京大学五个研究科的修士资料。一般选拔、外国人特别选考和英语项目保留各自官方名称；留学生栏目也显示官网允许海外学历者申请的一般选拔。自然環境学専攻的2027年度专攻资料仍待核验，原子力国際専攻的日程B案内待公布。"
    },
    "kyoto": {
      "verifiedAt": "2026-10-04",
      "degree": "修士課程",
      "graduateSchools": [
        "工学研究科",
        "理学研究科",
        "情報学研究科",
        "エネルギー科学研究科"
      ],
      "note": "京都大学：已添加工学研究科、理学研究科、情報学研究科、エネルギー科学研究科的2027年度修士资料，覆盖21个专攻及信息学七个课程，含国際霊長類学・野生動物コース。冬季外国人留学生入试目前只录入化学理工学／原子核工学已公布的变更预告，完整要项待公布；其他冬季特别选拔尚未收录。2028年度变更不混入2027年度范围。"
    },
    "note": "已添加東京大学、京都大学、早稲田大学与東京理科大学的修士资料。按官方选拔名称和适用入学年度查阅；一般选拔、留学生相关项目、变更预告、待公布案内与募集停止分别标注。東京科学大学之后核验添加。",
    "waseda": {
      "verifiedAt": "2026-10-04",
      "degree": "修士課程",
      "graduateSchools": [
        "基幹理工学研究科",
        "創造理工学研究科",
        "先進理工学研究科",
        "環境・エネルギー研究科",
        "情報生産システム研究科"
      ],
      "note": "早稲田大学：已收录五个研究科的修士资料，共42条科目／选考要求和1条修士募集停止通知。三个理工学研究科一般入试19专攻、英语AO修士15专攻分别核验；環境・エネルギー研究科的一般／AO／海外協定校外国人特別選考、情報生産システム研究科2027年4月／9月一般入试分别保存。ナノ理工学専攻自2027年4月入学起停止修士招生。长表格及完整条件通过官方PDF对应页原文阅读；年度不表示仍在报名。"
    },
    "tus": {
      "verifiedAt": "2026-10-04",
      "degree": "修士課程",
      "graduateSchools": [
        "理学研究科",
        "工学研究科",
        "創域理工学研究科",
        "先進工学研究科",
        "生命科学研究科"
      ],
      "note": "東京理科大学：已收录理学、工学、創域理工学、先進工学、生命科学五个研究科，26个现行专攻，共54条科目／选考要求和2条旧专攻募集停止通知。一般入试与外国人留学生试验分别核验；国際火災科学使用独立修士留学生募集要项，夏期／冬期分别保存。2027年4月新设情報理工学専攻，不沿用停止招生的旧专攻名称。外语受付按选拔核对，2028年度预告不套用到2027年度；适用年度不表示仍在报名。"
    }
  },
  "records": [
    {
      "id": "utokyo-eng-ce",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "社会基盤学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ce_guide_JE.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "社会基盤学（専門）の試験分野と出題範囲",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ce_guide_JE.pdf",
          "kind": "pdf",
          "pdfPage": 14
        }
      ],
      "subjectsOriginal": "外国語（英語）\n口述試験：社会基盤学（専門・一般）",
      "scopeOriginal": "交通工学\n空間情報\n計算科学\n水理学\n水文学\n地盤工学\n構造工学\nコンクリート工学\nマネジメント・国際プロジェクト\n景観学・土木デザイン・都市計画\n防災工学",
      "conditionsOriginal": "受験者は、提示される試験分野ごとの論文等および設問の中からいずれか1つを選択する。"
    },
    {
      "id": "utokyo-eng-ar",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "建築学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ar_guide_m_J.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ar_guide_m_J.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門課題Ⅰ\n専門課題Ⅱ\n口述試験",
      "scopeOriginal": "第1群 建築設計課題（4時間）\n第2群 建築計画・建築史・構法系課題（3時間）\n第3群 建築環境系課題（3時間）\n第4群 建築構造・建築材料系課題（3時間）",
      "conditionsOriginal": "専門課題Ⅱについては次の4群の中からいずれか1群を選択して解答する。\n選択する群を、出願時に「WEB出願システム」に記入すること。\nTOEFL iBT、またはTOEFL iBT Home Edition\nただし、次の条件を満たす場合には、TOEIC L&Rの公式スコアで英語能力の評価を代替することができる。"
    },
    {
      "id": "utokyo-eng-ue",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "都市工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ue_guide.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "外国語（英語）\n都市工学専門（B）\n計画・設計・論文（C）\n口述試験",
      "scopeOriginal": "①上水道学・下水道学\n②水理学\n③水環境学\n④環境微生物工学\n⑤環境化学・反応論\n⑥地球環境工学\n⑦廃棄物管理・資源循環\n⑧都市計画\n⑨都市デザイン\n⑩住宅・都市解析\n⑪都市防災\n⑫都市交通計画\n⑬地域計画\n⑭緑地計画・環境デザイン",
      "conditionsOriginal": "次の分野から出題される14科目のうち5科目を選び，解答すること。ただし，専攻分野として都市環境工学を志望する者は①～⑦のうちから3科目以上を，都市計画を志望する者は⑧～⑭のうちから3科目以上を選択しなければならない。\n専攻分野として都市環境工学を志望する者はC-1を，都市計画を志望する者はC-2，C-3のうち1科目を選択すること。\nC-1 計画・設計・論文\nC-2 計画・設計\nC-3 論文\nTOEFL iBT 又は TOEFL iBT Home Edition の Test Date Scores（My Best Scores は使用しない）"
    },
    {
      "id": "utokyo-eng-me",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "機械工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/me_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学）\n専門科目（機械工学）\n面接",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n第1部：主に熱工学、流体工学\n第2部：主に材料力学、機械力学・制御、機械設計・生産工学",
      "conditionsOriginal": "一般教育科目（数学）では、日本語・英語の試験問題を配布し、6問中3問選択して解答することとする。\n英語 TOEFL のスコア提出\n特別口述選考で選抜され、筆記試験を免除された者も、面接試験に欠席すると最終的に不合格となるので、注意すること。"
    },
    {
      "id": "utokyo-eng-pr",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "精密工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/pr_guide_2.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学・物理学）\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n物理学\n力学\n電磁気学",
      "conditionsOriginal": "数学は各分野から出題される6問の中から3問を選んで解答する。物理学は全問を解答する。\nTOEFL（TOEFL iBT，TOEFL iBT Special Home Edition），またはIELTS，TOEICのスコアの提出\n数学，物理学の2科目をすべて受験すること。"
    },
    {
      "id": "utokyo-eng-si",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "システム創成学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/si_guide_j_2.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "書類選考\n外国語試験（英語）\n口述試験（一般試験・専門試験）",
      "scopeOriginal": "卒業論文\n修士研究構想\n専門課題解答書"
    },
    {
      "id": "utokyo-eng-aa",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "航空宇宙工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/aa_guide_j_2.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学）\n専門科目\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n流体力学（流体力学、高速空気力学）\n固体力学（材料力学、構造力学）\n航空宇宙システム学（飛行力学、制御学）\n推進工学（機械力学、熱力学、電磁気学）",
      "conditionsOriginal": "流体力学（流体力学、高速空気力学）・固体力学（材料力学、構造力学）・航空宇宙システム学（飛行力学、制御学）・推進工学（機械力学、熱力学、電磁気学）の合計4科目より3科目を随意選択して解答するものとする。\n一般教育科目「数学」は、出題される6問から3問を随意選択して解答するものとする。"
    },
    {
      "id": "utokyo-eng-ee",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "電気系工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ee_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目（電気電子工学・情報工学）\n口述試験",
      "scopeOriginal": "電磁気学、電気回路、情報工学Ⅰ、情報工学Ⅱ、固体物性、制御・電気エネルギー工学",
      "conditionsOriginal": "以下の専門科目の出題範囲から2問を選択解答します。解答時間は2問合わせて150分です。\n当試験において選抜された者は、一般入試の英語試験と専門科目の筆記試験が免除されます。ただし通常の口述試験は免除されません。"
    },
    {
      "id": "utokyo-eng-ap",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "物理工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ap_guide.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学）\n専門科目（物理）\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n力学，電磁気学，統計熱力学，量子力学を基本とし，光学，固体物理学を含む物理学の分野",
      "conditionsOriginal": "数学：6問出題・3問解答\n物理学：4問出題・4問解答\nTOEFL スコアの提出"
    },
    {
      "id": "utokyo-eng-ma",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "マテリアル工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ma_guide.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ma_guide.pdf",
          "kind": "pdf",
          "pdfPage": 5
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学・物理学・化学）\n専門科目（マテリアル工学基礎）\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n物理学\n力学\n電磁気学\n\n化学\n物理化学\n無機化学\n有機化学\n\n熱力学・速度論（材料プロセス）\n組織学（化学・構造）\n材料物性学（固体物理学・量子力学）\n材料力学（弾性学・強度学）",
      "conditionsOriginal": "数学，物理学，化学のうち1科目を出願時に選択する。数学は出題された6問のうち3問を選択し解答する。物理学は出題された2問全てに解答する。化学は出題された3問全てに解答する。\n4つの分野から各1問，計4問を出題する。うち2問を選択し解答する。\nTOEFL または TOEIC L&R の公式スコアを提出すること。"
    },
    {
      "id": "utokyo-eng-ac",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "応用化学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ac_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ac_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（化学）\n口述試験",
      "scopeOriginal": "物理化学\n無機化学\n有機化学\n分析化学，高分子化学，生化学",
      "conditionsOriginal": "物理化学，無機化学，有機化学の3問のうち2問を解答する。分析化学，高分子化学，生化学に関連した問題が含まれることがある。\nTOEFL iBT もしくは TOEFL-iBT Home Edition の公式スコアの提出"
    },
    {
      "id": "utokyo-eng-cs",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学システム工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/cs_guide_j_3.pdf",
          "kind": "pdf",
          "pdfPage": 5
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "物理化学（熱力学，化学反応論，量子化学など）\n無機化学\n化学工学（移動速度論，反応工学，単位操作，プロセスシステム工学など）",
      "conditionsOriginal": "物理化学（2問），無機化学（1問），化学工学（2問）\n左記5問より3問を選択して解答する。\nTOEFL iBT / TOEFL iBT Home Edition あるいは TOEIC Listening & Reading"
    },
    {
      "id": "utokyo-eng-ne",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "原子力国際専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ne_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学）\n専門科目（小論文）\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他",
      "conditionsOriginal": "6問の中から、3問を選んで解答してください。\nTOEFL（TOEFL iBT または TOEFL iBT Home Edition）の公式スコアを提出してください。"
    },
    {
      "id": "utokyo-eng-bi",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "バイオエンジニアリング専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/bi_guide_m_2.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "2027年度 一般教育科目の出題分野",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/Guidelines_gse_m_2027.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/bi_guide_m_2.pdf",
          "kind": "pdf",
          "pdfPage": 14
        }
      ],
      "subjectsOriginal": "外国語（英語）\n一般教育科目（数学・物理学・化学）\n口述試験",
      "scopeOriginal": "数学\n微分積分および微分方程式\n級数・フーリエ解析および積分変換\nベクトル・行列・固有値（線形代数）\n曲線・曲面\n関数論・複素数\n確率・統計，情報数学，その他\n\n物理学\n力学\n電磁気学\n\n化学\n物理化学\n無機化学\n有機化学",
      "conditionsOriginal": "「数学」、「物理学」、「化学」のうちから1つを出願時に選択して受験すること。\n数学：以上の分野から出題される6問のうちから3問を選んで解答すること。\n物理学：以上の分野から出題される2問すべてについて解答すること。\n化学：以上の分野から出題される3問のうちから2問を選んで解答すること。\nただし特別口述試験で選抜された者は筆記試験を免除する。"
    },
    {
      "id": "utokyo-eng-tm",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "技術経営戦略学専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/tm_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "書類選考\n外国語（英語）\n筆記試験\n口述試験",
      "scopeOriginal": "数理的及び論理的思考能力を見るための問題"
    },
    {
      "id": "utokyo-eng-ne-b",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "原子力国際専攻",
      "admissionType": "general",
      "selectionName": "一般入試（出願日程B）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "冬入試に関するお知らせ（2026年10月1日）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/1001/Schdedule_B.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "conditionsOriginal": "原子力国際専攻 の【出願日程Ｂ】に関する専攻入試案内は、10月下旬に公開予定です。",
      "publicationStatus": "pending",
      "editorialNote": "日程B的专攻入试案内尚待公布，未沿用日程A的考试科目。"
    },
    {
      "id": "utokyo-eng-cb-integrated",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学生命工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 一般入試（修士課程）",
          "url": "https://www.chembio.t.u-tokyo.ac.jp/graduate/",
          "kind": "page"
        }
      ],
      "course": "一貫研究プログラム（博士後期課程進学希望者）",
      "subjectsOriginal": "化学生命工学基礎問題Ⅲ\n口述試験",
      "scopeOriginal": "化学及び生命工学分野"
    },
    {
      "id": "utokyo-eng-cb-terminal",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学生命工学専攻",
      "admissionType": "general",
      "selectionName": "一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 一般入試（修士課程）",
          "url": "https://www.chembio.t.u-tokyo.ac.jp/graduate/",
          "kind": "page"
        }
      ],
      "course": "修士修了プログラム",
      "subjectsOriginal": "化学生命工学基礎問題Ⅰ\n化学生命工学基礎問題Ⅱ\n口述試験",
      "scopeOriginal": "化学生命工学基礎問題Ⅰ：科学英語\n化学生命工学基礎問題Ⅱ：無機・分析・物理化学，有機化学，高分子化学，生命化学，バイオテクノロジー",
      "conditionsOriginal": "化学生命工学基礎問題Ⅰ：科学英語（必須）\n化学生命工学基礎問題Ⅱ：5分野のうち2分野を選択"
    },
    {
      "id": "utokyo-eng-me-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "機械工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-pr-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "精密工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-aa-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "航空宇宙工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-ee-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "電気系工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-ma-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "マテリアル工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-cs-ime",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学システム工学専攻",
      "admissionType": "international",
      "selectionName": "The International Multidisciplinary Engineering (IME) Graduate Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IME Graduate Program — Application and Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90IME%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "evaluation of documents\nInternet interviews and examinations",
      "conditionsOriginal": "if necessary"
    },
    {
      "id": "utokyo-eng-ce-int-0",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "社会基盤学専攻",
      "admissionType": "international",
      "selectionName": "Special Graduate Program for International Students in Civil Engineering — University Recommendation",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines — Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/III%E3%80%90%E7%A4%BE%E5%9F%BA%E3%80%91%E5%A4%A7%E5%AD%A6%E6%8E%A8%E8%96%A6_%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "academic performance\nresearch plan\nTOEFL or IELTS\nletters of recommendation"
    },
    {
      "id": "utokyo-eng-ce-int-1",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "社会基盤学専攻",
      "admissionType": "international",
      "selectionName": "Special Graduate Program for International Students in Civil Engineering — External Scholarships",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines — Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/2_%E7%A4%BE%E5%9F%BA_(4%E6%9C%88%E3%83%BB10%E6%9C%88%E5%85%A5%E5%AD%A6_%E5%A4%96%E9%83%A8%E5%A5%A8%E5%AD%A6%E9%87%91)2027%E5%B9%B4%E5%BA%A6%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85_%E4%BF%AE%E5%A3%AB_%E5%8D%9A%E5%A3%AB.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "academic performance\nresearch plan\nTOEFL or IELTS\nletters of recommendation"
    },
    {
      "id": "utokyo-eng-ce-int-2",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "社会基盤学専攻",
      "admissionType": "international",
      "selectionName": "Special Graduate Program for International Students in Civil Engineering — Embassy Recommendation",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines — Selection",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E7%A4%BE%E5%9F%BA%E3%80%91%E5%A4%A7%E4%BD%BF%E9%A4%A8%E6%8E%A8%E8%96%A6(%E4%B8%AD%E5%9B%BD%E5%BA%9C%E6%9C%AA%E5%AE%9A)%20%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "academic performance\nresearch plan\nTOEFL or IELTS\nletters of recommendation"
    },
    {
      "id": "utokyo-eng-ue-int",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "都市工学専攻",
      "admissionType": "international",
      "selectionName": "Graduate Program for International Students in Urban and Environmental Studies (UBE-UPN/ENV)",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Master’s Program — Initial screening and Second screening",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/II%E3%80%90%E9%83%BD%E5%B8%82%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "English Language Proficiency",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/II%E3%80%90%E9%83%BD%E5%B8%82%E3%80%91%E4%BF%AE%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "first screening based on the application documents\nsecond screening based on an online interview with faculty members"
    },
    {
      "id": "utokyo-eng-ar-g30",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "建築学専攻",
      "admissionType": "international",
      "selectionName": "Global 30 International Admission Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Global 30 — Selection Method",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/III%E3%80%90G30%E3%80%91%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "course": "国際都市建築デザインコース",
      "subjectsOriginal": "Preliminary selections\ninterview via the Internet",
      "conditionsOriginal": "TOEFL or IELTS score\nGRE General Test score\narchitectural designs portfolio (within 10MB)"
    },
    {
      "id": "utokyo-eng-bi-g30",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "バイオエンジニアリング専攻",
      "admissionType": "international",
      "selectionName": "Global 30 International Admission Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Global 30 — Selection Method",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/III%E3%80%90G30%E3%80%91%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "course": "国際バイオエンジニアリングコース",
      "subjectsOriginal": "Preliminary selections\nfinal internet-based interview",
      "conditionsOriginal": "TOEFL or IELTS score\nGRE General Test score"
    },
    {
      "id": "utokyo-eng-tm-g30",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "技術経営戦略学専攻",
      "admissionType": "international",
      "selectionName": "Global 30 International Admission Program",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Global 30 — Selection Method",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/III%E3%80%90G30%E3%80%91%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "course": "国際技術経営学コース",
      "subjectsOriginal": "Preliminary selections\ninternet-based interview",
      "conditionsOriginal": "TOEFL score\nGRE scores (General Test scores required and Mathematics Test score strongly recommended)"
    },
    {
      "id": "utokyo-eng-si-resilience",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "システム創成学専攻",
      "admissionType": "international",
      "selectionName": "International Admission Program in Resilience Engineering",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Resilience Engineering — Selection Method",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/V%E3%80%90%E3%83%AC%E3%82%B8%E3%80%91%E3%82%B7%E3%82%B9%E5%89%B5_%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "Preliminary selection\nInternet interview"
    },
    {
      "id": "utokyo-eng-ne-resilience",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "原子力国際専攻",
      "admissionType": "international",
      "selectionName": "International Admission Program in Resilience Engineering",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Resilience Engineering — Selection Method",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/VI%E3%80%90%E3%83%AC%E3%82%B8%E3%80%91%E5%8E%9F%E5%9B%BD_%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "Preliminary selection\nInternet interview"
    },
    {
      "id": "utokyo-eng-cb-int",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学生命工学専攻",
      "admissionType": "international",
      "selectionName": "International Graduate Program in Chemistry and Biotechnology",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines — Admission",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/VII%E3%80%90%E5%8C%96%E7%94%9F%E3%80%91%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "English Proficiency",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/VII%E3%80%90%E5%8C%96%E7%94%9F%E3%80%91%E4%BF%AE%E5%A3%AB%E3%83%BB%E5%8D%9A%E5%A3%AB%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "General Application Guidelines 2027 (Master’s Degree)",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/international-admission/I%E3%80%90%E5%85%B1%E9%80%9A%E3%80%91General%20Application%20Guidelines%202027_Masters%20Degree.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "course": "Integrated MS/PhD Program",
      "subjectsOriginal": "interview and the application documents"
    },
    {
      "id": "utokyo-eng-cs-foreign",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "化学システム工学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/cs_guide_j_3.pdf",
          "kind": "pdf",
          "pdfPage": 5
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "物理化学（熱力学，化学反応論，量子化学など）\n無機化学\n化学工学（移動速度論，反応工学，単位操作，プロセスシステム工学など）",
      "conditionsOriginal": "物理化学（2問），無機化学（1問），化学工学（2問）\n左記5問より3問を選択して解答する。\nTOEFL iBT / TOEFL iBT Home Edition あるいは TOEIC Listening & Reading\n外国人特別選考の試験科目は一般選考と同じである。\n志望教員と予め連絡をとり，特別選考受験の許可を得ておくこと。"
    },
    {
      "id": "utokyo-eng-ac-foreign",
      "universityId": "utokyo",
      "graduateSchool": "工学系研究科",
      "department": "応用化学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ac_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度 専攻入試案内（修士課程）",
          "url": "https://www.t.u-tokyo.ac.jp/hubfs/admission/2026/0403/ac_guide_j.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "editorialNote": "外国人留学生特别选考须先联系志望教员并接受指导意见。请阅读专攻案内中的适用资格与选考方式；未把一般入试科目直接套用到此选考。",
      "conditionsOriginal": "外国人特別選考受験希望者は，志望する研究室の教員に令和8年5月12日までに連絡し，出願前にガイダンスおよび面接を受けておくこと。\n本学および日本の他大学を卒業または卒業見込みの者は，一般選考を受験すること。"
    },
    {
      "id": "utokyo-science-physics",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "物理学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 理学系研究科 修士課程学生募集要項",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目（数学，物理学）\n口述試験",
      "scopeOriginal": "量子力学，統計力学，古典力学及び電磁気学",
      "conditionsOriginal": "数学1問，物理学3問\nTOEFL iBT 又は TOEFL iBT Home Edition 又は TOEIC Listening & Reading 公開テスト\nTOEIC Listening & Reading 公開テストは日本国内で受験した場合に限る。"
    },
    {
      "id": "utokyo-science-physics-foreign",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "物理学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "東京大学大学院理学系研究科外国人特別選考",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/graduate.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "GRE\nTOEFL",
      "conditionsOriginal": "Subject Test：要：Physics\nGeneral Test：不要\n専攻によっては、面接試験やオンラインでの筆記試験を行うこともある。（必ず9.各専攻の情報を読むこと）",
      "editorialNote": " 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。"
    },
    {
      "id": "utokyo-science-physics-gsgc",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "物理学専攻",
      "admissionType": "international",
      "selectionName": "グローバルサイエンス国際卓越大学院コース（GSGC）",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 グローバルサイエンス国際卓越大学院コース募集要項（選抜方法）",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC 各専攻が要求する GRE test の科目",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        }
      ],
      "course": "グローバルサイエンス国際卓越大学院コース",
      "subjectsOriginal": "GRE\nTOEFL",
      "editorialNote": "GSGC为修士至博士的一贯教育项目。专攻额外考试请阅读对应的官方要求。 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。",
      "conditionsOriginal": "Subject Test：要：Physics\nGeneral Test：不要\n"
    },
    {
      "id": "utokyo-science-astronomy",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "天文学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 理学系研究科 修士課程学生募集要項",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 4
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目（数学，物理学，天文学）\n口述試験",
      "scopeOriginal": "数学\n物理学\n天文学",
      "conditionsOriginal": "数学1問，物理学2問，天文学1問\nTOEFL iBT 又は TOEFL iBT Home Edition 又は TOEIC Listening & Reading 公開テスト\nTOEIC Listening & Reading 公開テストは日本国内で受験した場合に限る。"
    },
    {
      "id": "utokyo-science-astronomy-foreign",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "天文学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "東京大学大学院理学系研究科外国人特別選考",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/graduate.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "GRE\nTOEFL",
      "conditionsOriginal": "Subject Test：要：Physics\nGeneral Test：不要\n専攻によっては、面接試験やオンラインでの筆記試験を行うこともある。（必ず9.各専攻の情報を読むこと）",
      "editorialNote": " 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。"
    },
    {
      "id": "utokyo-science-astronomy-gsgc",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "天文学専攻",
      "admissionType": "international",
      "selectionName": "グローバルサイエンス国際卓越大学院コース（GSGC）",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 グローバルサイエンス国際卓越大学院コース募集要項（選抜方法）",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC 各専攻が要求する GRE test の科目",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        }
      ],
      "course": "グローバルサイエンス国際卓越大学院コース",
      "subjectsOriginal": "GRE\nTOEFL",
      "editorialNote": "GSGC为修士至博士的一贯教育项目。专攻额外考试请阅读对应的官方要求。 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。",
      "conditionsOriginal": "Subject Test：要：Physics\nGeneral Test：不要\n"
    },
    {
      "id": "utokyo-science-eps",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "地球惑星科学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 理学系研究科 修士課程学生募集要項",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程学生募集要項（続き）",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "修士・博士入学【筆記試験】出題予定範囲",
          "url": "https://www.eps.s.u-tokyo.ac.jp/graduateadmission/examination/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "数学\n数理科学基礎、微分積分、線型代数、常微分方程式、ベクトル解析、統計データ解析、物理数学の基礎的な内容を中心に出題する。\n物理学\n力学、電磁気学、熱力学の基礎的な内容を中心に出題する。本学であれば前期課程の「力学Ａ」「電磁気学Ａ」「熱力学」「振動・波動論」と同程度。\n化学\n物理化学、無機化学・分析化学、有機化学の基礎的な内容を中心に出題する。\n生物学\n遺伝、膜構造、代謝、増殖、形態形成、恒常性と環境応答、生態系、生物多様性などの基礎的な内容を中心に出題する。\n（参照）東京大学生命科学教科書編集委員会（編）「理系総合のための生命科学」羊土社\n地球科学\nI) 堆積学・表層環境・自然地理・第四紀環境変化、II) 地質図作成法・地域地質・地球史、III) 地球内部構造・鉱物学、IV) 変成作用・変成帯、V) 火成作用・火山プロセス、VI) 構造地質学・テクトニクスの基礎的な内容を中心に出題する。",
      "conditionsOriginal": "数学，物理学，化学，生物学，地球科学の5科目のうち2科目を選択\nTOEFL iBT または日本国内で受験した TOEIC Listening & Reading"
    },
    {
      "id": "utokyo-science-eps-foreign",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "地球惑星科学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "東京大学大学院理学系研究科外国人特別選考",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/graduate.html",
          "kind": "page"
        },
        {
          "label": "地球惑星科学専攻 外国人特別選考について",
          "url": "https://www.eps.s.u-tokyo.ac.jp/graduateadmission/international_applicants/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "GRE\nTOEFL\nオンライン口述試験",
      "conditionsOriginal": "General Test：要\nGRE General Testに代えて、Mathematics、Physicsのいずれか一科目を提出してもよい。指導を希望する教員に前もって確認すること。\n専攻によっては、面接試験やオンラインでの筆記試験を行うこともある。（必ず9.各専攻の情報を読むこと）",
      "editorialNote": " 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。",
      "scopeOriginal": "口述試験：20分\n東京大学での研究経歴と研究計画について10分間で発表してください。その後、試験官による10分間の質疑応答があります。"
    },
    {
      "id": "utokyo-science-eps-gsgc",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "地球惑星科学専攻",
      "admissionType": "international",
      "selectionName": "グローバルサイエンス国際卓越大学院コース（GSGC）",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 グローバルサイエンス国際卓越大学院コース募集要項（選抜方法）",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC 各専攻が要求する GRE test の科目",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC オンライン学力試験について",
          "url": "https://www.eps.s.u-tokyo.ac.jp/graduateadmission/international_applicants/",
          "kind": "page"
        }
      ],
      "course": "グローバルサイエンス国際卓越大学院コース",
      "subjectsOriginal": "GRE\nTOEFL\nオンライン口述試験\nオンライン学力試験",
      "editorialNote": "GSGC为修士至博士的一贯教育项目。专攻额外考试请阅读对应的官方要求。 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。",
      "conditionsOriginal": "General Test：要\nGRE General Testに代えて、Mathematics、Physicsのいずれか一科目を提出してもよい。指導を希望する教員に前もって確認すること。\n\n別途オンライン学力試験（20分）を実施します。\n指導を希望する教員との事前面談の際、数学・物理・地学のうち、1つ科目を選択してください。",
      "scopeOriginal": "数学・物理・地学"
    },
    {
      "id": "utokyo-science-chem",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "化学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 理学系研究科 修士課程学生募集要項",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "修士課程学生募集要項（続き）",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目\n作文\n口述試験",
      "scopeOriginal": "化学\n数理科学\n地球科学\n生物化学",
      "conditionsOriginal": "化学6題、数理科学1題、地球科学1題、生物化学1題の9題のうち5題を受験者が任意で選択する。\n日本語400字程度又は英語200語いずれかで解答\nTOEFL ITP テストを本専攻試験会場で行う。\nTOEFL iBT テストはテストセンターで受験した場合に限り、TOEIC Listening & Reading 公開テストは日本国内で受験した場合に限る。\nTOEFL iBT Home Edition のスコアは利用不可。My Best スコアは適用されない。"
    },
    {
      "id": "utokyo-science-chem-foreign",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "化学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "東京大学大学院理学系研究科外国人特別選考",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/graduate.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "GRE\nTOEFL",
      "conditionsOriginal": "General Test：要\nSubject Test：不要\n専攻によっては、面接試験やオンラインでの筆記試験を行うこともある。（必ず9.各専攻の情報を読むこと）",
      "editorialNote": " 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。"
    },
    {
      "id": "utokyo-science-chem-gsgc",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "化学専攻",
      "admissionType": "international",
      "selectionName": "グローバルサイエンス国際卓越大学院コース（GSGC）",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 グローバルサイエンス国際卓越大学院コース募集要項（選抜方法）",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC 各専攻が要求する GRE test の科目",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        }
      ],
      "course": "グローバルサイエンス国際卓越大学院コース",
      "subjectsOriginal": "GRE\nTOEFL",
      "editorialNote": "GSGC为修士至博士的一贯教育项目。专攻额外考试请阅读对应的官方要求。 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。",
      "conditionsOriginal": "General Test：要\nSubject Test：不要\n"
    },
    {
      "id": "utokyo-science-bio",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "生物科学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 理学系研究科 修士課程学生募集要項",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/master/files/R9/R9_master_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "生物科学専攻 大学院入試情報",
          "url": "https://www.bs.s.u-tokyo.ac.jp/admission/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "分子生物学・生化学（2問），細胞生物学，遺伝学\n生物化学・生物情報科学，動物学，植物学，人類学，進化・自然誌学",
      "conditionsOriginal": "第1問～第4問から2問を選択\n第5問：5問程度の小問から1問を選択\nTOEFL iBT 又は TOEFL iBT Home Edition 又は TOEIC Listening & Reading 公開テスト\nTOEIC Listening & Reading 公開テストは日本国内で受験した場合に限る。"
    },
    {
      "id": "utokyo-science-bio-foreign",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "生物科学専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考",
      "entryYear": "2027年4月・10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "東京大学大学院理学系研究科外国人特別選考",
          "url": "https://www.s.u-tokyo.ac.jp/ja/admission/graduate.html",
          "kind": "page"
        },
        {
          "label": "Biological Sciences — Special Selection for International Applicants",
          "url": "https://www.bs.s.u-tokyo.ac.jp/admission/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "GRE\nTOEFL\nonline interview",
      "conditionsOriginal": "General Test：要\nGRE General Test に代えて、Mathematics、Physics、Chemistryのいずれか一科目を提出してもよい。\n専攻によっては、面接試験やオンラインでの筆記試験を行うこともある。（必ず9.各専攻の情報を読むこと）",
      "editorialNote": " 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。 专攻公告指出，部分申请者会被要求参加在线面试。"
    },
    {
      "id": "utokyo-science-bio-gsgc",
      "universityId": "utokyo",
      "graduateSchool": "理学系研究科",
      "department": "生物科学専攻",
      "admissionType": "international",
      "selectionName": "グローバルサイエンス国際卓越大学院コース（GSGC）",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 グローバルサイエンス国際卓越大学院コース募集要項（選抜方法）",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "GSGC 各専攻が要求する GRE test の科目",
          "url": "https://www.s.u-tokyo.ac.jp/GSGC/pdf/Guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "Biological Sciences — GSGC",
          "url": "https://www.bs.s.u-tokyo.ac.jp/admission/",
          "kind": "page"
        }
      ],
      "course": "グローバルサイエンス国際卓越大学院コース",
      "subjectsOriginal": "GRE\nTOEFL\nonline interview",
      "editorialNote": "GSGC为修士至博士的一贯教育项目。专攻额外考试请阅读对应的官方要求。 材料审查及专攻追加面试／在线考试，以研究科选拔方法和专攻对应页为准。 专攻公告指出，部分申请者会被要求参加在线面试。",
      "conditionsOriginal": "General Test：要\nGRE General Test に代えて、Mathematics、Physics、Chemistryのいずれか一科目を提出してもよい。\n"
    },
    {
      "id": "utokyo-info-cs",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "コンピュータ科学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/cs/cs_admission_guide2027_ja.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "一般教育科目（数学）\n外国語（英語）\n専門科目（コンピュータ科学）\n口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\n情報数学，数値計算，離散数学，アルゴリズムと計算量，形式言語，論理学，プログラミング言語論，コンピュータアーキテクチャ，オペレーティングシステム，デジタル回路，機械学習",
      "internationalGeneral": true,
      "conditionsOriginal": "以下の科目から4問程度出題する。全問に解答すること。\n出題にはCまたはJava言語を使用する場合がある。"
    },
    {
      "id": "utokyo-info-mi",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "数理情報学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/mi/upload/mi-2027.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/mi/upload/mi-2027.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "専門科目システム情報学の出題範囲",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ipc/pdf/system2027j.pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "一般教育科目（数学）\n外国語（英語）\n専門科目（数理情報学またはシステム情報学）\n口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\n問題解決の数理的方法としての代数的手法，解析的手法，幾何的手法，離散的手法，確率的手法，統計的手法，アルゴリズム等",
      "internationalGeneral": true,
      "conditionsOriginal": "「数理情報学」，「システム情報学」から1科目を選んで受験すること。\n5問のうち，3問を解答する。\n修士課程については冬入試を実施しない。",
      "editorialNote": " 选择其他专攻提供的专业科目时，请按官方案内阅读该专攻的出题范围及选答条件。"
    },
    {
      "id": "utokyo-info-ipc",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "システム情報学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ipc/pdf/system2027j.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "選択可能な専門科目 — コンピュータ科学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/cs/cs_admission_guide2027_ja.pdf",
          "pdfPage": 4
        },
        {
          "label": "選択可能な専門科目 — 数理情報学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/mi/upload/mi-2027.pdf",
          "pdfPage": 3
        },
        {
          "label": "選択可能な専門科目 — 電子情報学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ice/pdf/ice2027-guide-j.pdf",
          "pdfPage": 5
        }
      ],
      "subjectsOriginal": "一般教育科目（数学）\n外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\nシステム情報学：信号処理，電子回路，制御\n数理情報学\nコンピュータ科学\n電子情報学",
      "internationalGeneral": true,
      "conditionsOriginal": "システム情報学：3問のうち，2問を解答する。試験の解答時間は全体で100分である。\n専門科目「数理情報学」，「コンピュータ科学」，「電子情報学」の試験に関する情報は，当該専攻の入試案内書を参照すること。",
      "editorialNote": " 选择其他专攻提供的专业科目时，请按官方案内阅读该专攻的出题范围及选答条件。"
    },
    {
      "id": "utokyo-info-ice",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "電子情報学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ice/pdf/ice2027-guide-j.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "一般教育科目（数学）\n外国語（英語）\n専門科目（電子情報学）\n口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\n電気電子回路，計算機アーキテクチャ，論理回路，アルゴリズムとデータ構造，最適化・機械学習，情報通信，信号処理，情報理論",
      "internationalGeneral": true,
      "conditionsOriginal": "電気電子回路，計算機アーキテクチャ，論理回路，アルゴリズムとデータ構造，最適化・機械学習，情報通信，信号処理，情報理論の分野から5題出題する。2時間30分でそのうち3問に解答する。"
    },
    {
      "id": "utokyo-info-m-i",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "知能機械情報学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/m-i/pdf/MI-application2027.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "筆記試験（一般教養科目）\n外国語（英語）\n専門科目・口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\n機械系関連分野（機械力学、制御、メカトロニクス、ロボティクスなど）\n情報系関連分野（情報基礎、デジタル回路、計算機、ソフトウェアなど）",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-info-ci",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "創造情報学専攻",
      "admissionType": "general",
      "selectionName": "夏入試",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（修士課程・夏入試）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ci/2026/2027admin-guide-jp.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度 情報理工学系研究科 修士課程募集要項（選抜方法）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ci/2026/2027admin-guide-jp.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "選択可能な専門科目 — コンピュータ科学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/cs/cs_admission_guide2027_ja.pdf",
          "pdfPage": 4
        },
        {
          "label": "選択可能な専門科目 — 数理情報学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/mi/upload/mi-2027.pdf",
          "pdfPage": 3
        },
        {
          "label": "選択可能な専門科目 — システム情報学",
          "kind": "pdf",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ipc/pdf/system2027j.pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "一般教育科目（数学またはプログラミング）\n外国語（英語）\n専門科目\n口述試験",
      "scopeOriginal": "①線形代数、②解析（微分積分、常微分方程式など）、③確率・統計\n\n創造情報学：ソフトウェア・アルゴリズム，コンピュータハードウェア，情報システムなど\nコンピュータ科学\n数理情報学\nシステム情報学",
      "internationalGeneral": true,
      "conditionsOriginal": "数学，または，プログラミングを出願時に選択する。\n以下の4つの専門科目のうちの1つを出願時に選択する。\n創造情報学：問題が3問出題される。解答時間は150分。",
      "editorialNote": "一般教育科目在出愿时选择数学或编程；下列研究科共同数学范围仅适用于选择数学的申请者。其他专攻的专业科目见对应专攻案内。 选择其他专攻提供的专业科目时，请按官方案内阅读该专攻的出题范围及选答条件。"
    },
    {
      "id": "utokyo-info-ipc-winter",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "システム情報学専攻",
      "admissionType": "general",
      "selectionName": "冬入試",
      "entryYear": "2027年10月（2027年4月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程 冬入試",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ipc/pdf/system2027j.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "修士課程募集要項（入学時期・募集人員）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "書類選考\n外国語（英語）\n口述試験",
      "scopeOriginal": "微分積分，線形代数の基礎，志望する研究分野，および，システム情報学の基礎",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-info-ci-winter",
      "universityId": "utokyo",
      "graduateSchool": "情報理工学系研究科",
      "department": "創造情報学専攻",
      "admissionType": "general",
      "selectionName": "冬入試",
      "entryYear": "2027年10月（2027年4月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程 冬入試",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ci/2026/2027admin-guide-jp.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "専攻入試案内（続き）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ci/2026/2027admin-guide-jp.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "修士課程募集要項（出願資格）",
          "url": "https://www.i.u-tokyo.ac.jp/edu/entra/2027_ag_m_j.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "一般教育科目（プログラミング）\n外国語（英語）\n専門科目（創造情報学）\n口述試験",
      "scopeOriginal": "ソフトウェア・アルゴリズム，コンピュータハードウェア，情報システムなど",
      "internationalGeneral": true,
      "conditionsOriginal": "夏入試と異なり，プログラミングのみとなる。\n専門科目（創造情報学）"
    },
    {
      "id": "utokyo-math-general",
      "universityId": "utokyo",
      "graduateSchool": "数理科学研究科",
      "department": "数理科学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 数理科学研究科 修士課程学生募集要項",
          "url": "https://www.ms.u-tokyo.ac.jp/kyoumu/cd52295aade4feca2f7995bbec75c056d370bf6b.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "修士課程学生募集要項（試験科目・口述試験）",
          "url": "https://www.ms.u-tokyo.ac.jp/kyoumu/cd52295aade4feca2f7995bbec75c056d370bf6b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "外国人留学生のための入学案内",
          "url": "https://www.ms.u-tokyo.ac.jp/kyoumu/liaison/guide.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目（A），専門科目（B），外国語（英語）\n口述試験",
      "scopeOriginal": "専門科目（A）：線形代数、微分積分、複素解析、常微分方程式、集合・位相など\n専門科目（B）：専門的な問題\n外国語（英語）：数学に関する英文の読解及び作文の能力をみる問題",
      "internationalGeneral": true,
      "conditionsOriginal": "専門科目（B）：10数題の問題から3題選んで解答\n口述試験：筆記試験合格者に対して行う。専門科目についての一般的質問"
    },
    {
      "id": "utokyo-math-foreign",
      "universityId": "utokyo",
      "graduateSchool": "数理科学研究科",
      "department": "数理科学専攻",
      "admissionType": "international",
      "selectionName": "特別選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "外国人留学生のための入学案内",
          "url": "https://www.ms.u-tokyo.ac.jp/kyoumu/liaison/guide.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "遠隔試験等",
      "scopeOriginal": "大学等の成績・研究計画書・既発表の著作や論文",
      "editorialNote": "该选拔面向国外居住者。日本国内居住者的入试方式，以及远隔考试等要求，请阅读官方入学案内。"
    },
    {
      "id": "utokyo-frontier-ma-general",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "物質系専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.k.u-tokyo.ac.jp/materials/wp-content/uploads/2026/03/2026_nyushi-j.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "英語\n専門科目（物理学，化学，材料学）\n口述試験",
      "scopeOriginal": "物理学：力学、電磁気学・光学、量子力学、熱学・統計力学、物性物理学、実験物理学など\n化学：物理化学、無機化学、分析化学、有機化学など\n材料学：熱力学・状態図、材料組織学、輸送現象論・反応論、材料物理、材料化学、材料プロセス学、材料各論、材料設計学など",
      "conditionsOriginal": "3分野からそれぞれ3題を出題し、そのうち3題を選択して解答する。（2つ以上の分野から選択してもよい。）\nTOEFL または TOEIC の公式スコアを提出する。"
    },
    {
      "id": "utokyo-frontier-ae-general",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "先端エネルギー工学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（公式ページ掲載のPDF：修士課程）",
          "url": "https://www.ae.k.u-tokyo.ac.jp/admission/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n学部成績\n専門科目（小論文）\n口述試験\n面接",
      "scopeOriginal": "数学：線形代数、微積分\n物理：力学、電磁気学、熱力学",
      "editorialNote": "官方PDF由专攻页面链接至Google Drive，请在官网打开「2027年度専攻入試案内」，修士课程序列见PDF第11—12页。"
    },
    {
      "id": "utokyo-frontier-ma-international",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "物質系専攻",
      "admissionType": "international",
      "selectionName": "外国人等特別選考（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.k.u-tokyo.ac.jp/materials/wp-content/uploads/2026/03/2026_nyushi-j.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "英語\n専門科目（物理学，化学，材料学）\n口述試験",
      "scopeOriginal": "物理学：力学、電磁気学・光学、量子力学、熱学・統計力学、物性物理学、実験物理学など\n化学：物理化学、無機化学、分析化学、有機化学など\n材料学：熱力学・状態図、材料組織学、輸送現象論・反応論、材料物理、材料化学、材料プロセス学、材料各論、材料設計学など",
      "conditionsOriginal": "3分野からそれぞれ3題を出題し、そのうち3題を選択して解答する。（2つ以上の分野から選択してもよい。）\nTOEFL または TOEIC の公式スコアを提出する。"
    },
    {
      "id": "utokyo-frontier-ae-international",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "先端エネルギー工学専攻",
      "admissionType": "international",
      "selectionName": "外国人等特別選考（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 専攻入試案内（公式ページ掲載のPDF：修士課程）",
          "url": "https://www.ae.k.u-tokyo.ac.jp/admission/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n学部成績\n専門科目（小論文）\n口述試験\n面接",
      "scopeOriginal": "数学：線形代数、微積分\n物理：力学、電磁気学、熱力学",
      "editorialNote": "官方PDF由专攻页面链接至Google Drive，请在官网打开「2027年度専攻入試案内」，修士课程序列见PDF第11—12页。"
    },
    {
      "id": "utokyo-frontier-cmp",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "複雑理工学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.k.u-tokyo.ac.jp/complex/html/examinee/2027guidebook_rev.pdf",
          "kind": "pdf",
          "pdfPage": 28
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "書類選考\n対面筆記試験\nオンライン口述試験",
      "scopeOriginal": "必須科目：微分積分（配点100）\n選択科目（2科目選択）：線形代数、確率・統計、力学、電磁気学（配点200）",
      "conditionsOriginal": "修士課程一般選抜試験では、TOEFL iBTやTOEIC L&Rなどの英語のスコアシートを提出する必要はない。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-ib-general",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "先端生命科学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.ib.k.u-tokyo.ac.jp/media/files/2027A_Info_IB_Master_Jp(20260526).pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.ib.k.u-tokyo.ac.jp/media/files/2027A_Info_IB_Master_Jp(20260526).pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "専門科目\n英語\n口述試験",
      "scopeOriginal": "基礎生命科学及び小論文",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-ib-int",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "先端生命科学専攻",
      "admissionType": "international",
      "selectionName": "外国人等特別選考（入試日程A）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.ib.k.u-tokyo.ac.jp/media/files/2027A_Info_IB_Master_Jp(20260526).pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.ib.k.u-tokyo.ac.jp/media/files/2027A_Info_IB_Master_Jp(20260526).pdf",
          "kind": "pdf",
          "pdfPage": 4
        }
      ],
      "subjectsOriginal": "英語\n口述試験",
      "scopeOriginal": "基礎生命科学"
    },
    {
      "id": "utokyo-frontier-cbms-medical",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "メディカル情報生命専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A・B）",
      "entryYear": "2027年4月・10月（入試日程・在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度入試の変更点及び筆記試験の内容",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/admission/exam/",
          "kind": "page"
        }
      ],
      "course": "メディカルサイエンス群",
      "subjectsOriginal": "書類選考\n英語\n筆記試験\n口述試験",
      "scopeOriginal": "1問 — 生命科学の基礎および情報科学の基礎\n5問 — 生命科学およびその関連分野\n5問 — 情報科学およびその関連分野\n\n生化学、遺伝学、分子生物学、発生学および免疫学、腫瘍学\n計算量理論、線形代数、グラフ理論、動的計画法、確率／統計、ソートアルゴリズム",
      "conditionsOriginal": "本専攻では外国人等特別選考は実施しない。\n以下の11問から3問を選択して解答します。必修問題はありません。\nTOEFL iBT，TOEIC Listening & Reading または IELTS\nTOEICは日本国内で受験した場合に限ります。\nTOEFL iBT Home Edition および IELTS Online は、対象外となります。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-cbms-info",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "メディカル情報生命専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A・B）",
      "entryYear": "2027年4月・10月（入試日程・在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度入試の変更点及び筆記試験の内容",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/admission/exam/",
          "kind": "page"
        }
      ],
      "course": "情報生命科学群",
      "subjectsOriginal": "書類選考\n英語\n筆記試験\n口述試験",
      "scopeOriginal": "1問 — 生命科学の基礎および情報科学の基礎\n5問 — 生命科学およびその関連分野\n5問 — 情報科学およびその関連分野\n\n生化学、遺伝学、分子生物学、発生学および免疫学、腫瘍学\n計算量理論、線形代数、グラフ理論、動的計画法、確率／統計、ソートアルゴリズム",
      "conditionsOriginal": "本専攻では外国人等特別選考は実施しない。\n以下の11問から3問を選択して解答します。必修問題はありません。\nTOEFL iBT，TOEIC Listening & Reading または IELTS\nTOEICは日本国内で受験した場合に限ります。\nTOEFL iBT Home Edition および IELTS Online は、対象外となります。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-cbms-innovation",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "メディカル情報生命専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A・B）",
      "entryYear": "2027年4月・10月（入試日程・在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/media/files/admission/2027_CBMS_Guidelines_J.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度入試の変更点及び筆記試験の内容",
          "url": "https://www.cbms.k.u-tokyo.ac.jp/admission/exam/",
          "kind": "page"
        }
      ],
      "course": "医療イノベーションコース",
      "subjectsOriginal": "書類選考\n英語\n筆記試験\n口述試験",
      "scopeOriginal": "知的財産、生命倫理、医療統計、公衆衛生及びその関連分野\n社会科学に関する共通問題",
      "conditionsOriginal": "本専攻では外国人等特別選考は実施しない。\n計8問の中から2問を志望分野毎に選択するとともに社会科学に関する共通問題1問と合わせて合計3問に解答することになります。\nTOEFL iBT，TOEIC Listening & Reading または IELTS\nTOEICは日本国内で受験した場合に限ります。\nTOEFL iBT Home Edition および IELTS Online は、対象外となります。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-nature",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "自然環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜・外国人等特別選考",
      "entryYear": "2027年度",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "自然環境学専攻 入試情報",
          "url": "https://nenv.k.u-tokyo.ac.jp/admission",
          "kind": "page"
        },
        {
          "label": "2027年度 修士課程学生募集要項",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "publicationStatus": "unverified",
      "editorialNote": "专攻官网的入试页面使用动态内容，当前尚未完整取得2027年度专攻案内。本条仅提供官方入口，科目与范围待核验，不展示往年科目。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-ocean-a",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "海洋技術環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.otpe.k.u-tokyo.ac.jp/wp-content/uploads/2026/03/otpe_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.otpe.k.u-tokyo.ac.jp/wp-content/uploads/2026/03/otpe_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語\n専門科目\n口述試験",
      "scopeOriginal": "専門基礎科目（論理的思考能力や数理的能力を問う問題）\n出題されたテーマに関する英語の小論文。設問は英語で出題されるが、回答は英語あるいは日本語を選択できる。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-ocean-b",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "海洋技術環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.otpe.k.u-tokyo.ac.jp/wp-content/uploads/2026/03/otpe_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.otpe.k.u-tokyo.ac.jp/wp-content/uploads/2026/03/otpe_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "書類審査\n口述試験（オンライン、英語）",
      "scopeOriginal": "数学などの基礎学力\n卒業論文の研究（あるいはそれに相当する研究）\n修士課程における研究計画",
      "internationalGeneral": true,
      "conditionsOriginal": "TOEFL iBT 4.5～5.0以上（旧スコア形式では86～95以上）あるいはTOEIC 800～830点以上を有することを選抜条件のひとつとする。"
    },
    {
      "id": "utokyo-frontier-env-a",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "環境システム学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://envsys.k.u-tokyo.ac.jp/files/2027envsys_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://envsys.k.u-tokyo.ac.jp/files/2027envsys_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語\n専門科目（筆記試験）\n口述試験",
      "scopeOriginal": "A：環境システムに関する知識、理解力、洞察力を見る問題（小論文形式）。\nB：環境システムを理解する上で必要な環境科学Ⅰ／Ⅱ、数学、物理、化学から成る問題。",
      "internationalGeneral": true,
      "conditionsOriginal": "AとBの計2題を解答する。\n環境科学Ⅰに解答する。また、環境科学Ⅱ、数学、物理、化学の4問の中から1問を選択して解答する。\nTOEFLのスコアをもって英語の試験とする。TOEFLスコアを提出し、TOEFL-ITPも受験した場合は、高い方のスコアを採用する（TOEFL-ITPは入試日程Aの一般選抜のみ実施）。\n環境システム学専攻では、外国人等特別選考を行わない。"
    },
    {
      "id": "utokyo-frontier-he-a",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "人間環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.h.k.u-tokyo.ac.jp/entrance/upload/2027hees_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語\n専門科目（数学）\n口述試験\n面接",
      "scopeOriginal": "線形代数、微積分、微分方程式、フーリエ解析、確率統計、変分法、ベクトル解析、複素関数論など",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-env-b",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "環境システム学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://envsys.k.u-tokyo.ac.jp/files/2027envsys_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://envsys.k.u-tokyo.ac.jp/files/2027envsys_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語\n専門科目（筆記試験）\n口述試験",
      "scopeOriginal": "A：環境システムに関する知識、理解力、洞察力を見る問題（小論文形式）。\nB：環境システムを理解する上で必要な基礎知識に関する問題。",
      "internationalGeneral": true,
      "conditionsOriginal": "AとBの計2題を解答する。\nTOEFLのスコア提出をもって英語の試験とする。\n環境システム学専攻では、外国人等特別選考を行わない。"
    },
    {
      "id": "utokyo-frontier-he-b",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "人間環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.h.k.u-tokyo.ac.jp/entrance/upload/2026_scheduleB/2027hees_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語\n小論文\n口述試験\n面接",
      "scopeOriginal": "小論文\n卒業研究\n修士課程における研究計画",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-he-int",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "人間環境学専攻",
      "admissionType": "international",
      "selectionName": "外国人等特別選考（入試日程A・B）",
      "entryYear": "2027年4月・10月（入試日程・在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.h.k.u-tokyo.ac.jp/entrance/upload/2026_scheduleB/2027hees_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 4
        }
      ],
      "subjectsOriginal": "書類選考\nTOEFL-iBT",
      "scopeOriginal": "",
      "conditionsOriginal": "書類選考のみによって行われ、筆記試験および口述試験は課されない。\n一般選抜（特別口述試験を含む）と併願できない。\nTOEFL-iBT（Home Edition を含む）のみ受け付ける。"
    },
    {
      "id": "utokyo-frontier-sce-a",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "社会文化環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://sbk.k.u-tokyo.ac.jp/sbk2026/2027sces_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語（TOEFL-ITP）\n専門基礎科目\n分野別科目\n口述試験",
      "scopeOriginal": "地域社会学／都市社会学\n環境倫理／環境社会学\n建築構法\n建築構造\n建築光・視環境\n建築環境デザイン\n水質化学／環境微生物工学／水環境衛生\n沿岸環境論\n基礎流体力学\n空間情報解析\n情報通信工学\n都市解析",
      "conditionsOriginal": "対面でTOEFL-ITP試験を実施する。各種スコア提出は認めない。\n下記の各キーワードに関する専門問題の中から1問解答する。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-sce-b",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "社会文化環境学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://sbk.k.u-tokyo.ac.jp/sbk2026/2027sces_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://sbk.k.u-tokyo.ac.jp/sbk2026/2027sces_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "書類選考\n口述試験",
      "scopeOriginal": "基礎学力、志望分野、研究意欲、卒業研究や、修士課程における研究計画書",
      "conditionsOriginal": "TOEFL または IELTS のスコアシートを提出すること。",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-inter-a",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "国際協力学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程A）",
      "entryYear": "2027年4月（2026年10月入学の条件あり）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://inter.k.u-tokyo.ac.jp/wp-web/wp-content/uploads/2026/04/inter_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://inter.k.u-tokyo.ac.jp/wp-web/wp-content/uploads/2026/04/inter_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語（TOEFL-ITP）\n専門科目\n口述試験",
      "scopeOriginal": "エネルギー作物、金融包摂、厚生経済学の基本定理、社会関係資本、証拠に基づく政策立案、ソーラーシェアリング、対外援助政策と外交、二国間及び多国間援助、貧困の罠、CSR/CSV/ESG投資、気候変動適応策とレジリエンス、自然保護区、順応的管理",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-inter-b",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "国際協力学専攻",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://inter.k.u-tokyo.ac.jp/wp-web/wp-content/uploads/2026/04/inter_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://inter.k.u-tokyo.ac.jp/wp-web/wp-content/uploads/2026/04/inter_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "新領域創成科学研究科 修士課程学生募集要項（出願資格）",
          "url": "https://www.k.u-tokyo.ac.jp/assets/files/2027guidelines_for_applicants_to_mc.pdf",
          "kind": "pdf",
          "pdfPage": 2
        }
      ],
      "subjectsOriginal": "英語（TOEFL-ITP）\n専門科目\n口述試験",
      "scopeOriginal": "国際協力に関する論述問題",
      "internationalGeneral": true
    },
    {
      "id": "utokyo-frontier-inter-int",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "国際協力学専攻",
      "admissionType": "international",
      "selectionName": "外国人等特別選考（入試日程A・B）",
      "entryYear": "2027年4月・10月（入試日程・在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://inter.k.u-tokyo.ac.jp/wp-web/wp-content/uploads/2026/04/inter_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "書類審査\n口述試験",
      "scopeOriginal": "卒業論文（ない場合は、ゼミナール論文などそれにかわる成果物）の内容、志望動機、意欲、基礎知識等",
      "conditionsOriginal": "口述試験は原則英語で行うが、希望すれば日本語で応答することができる。"
    },
    {
      "id": "utokyo-frontier-gpss",
      "universityId": "utokyo",
      "graduateSchool": "新領域創成科学研究科",
      "department": "サステイナビリティ学大学院プログラム",
      "admissionType": "general",
      "selectionName": "一般選抜（入試日程B）",
      "entryYear": "2027年4月・10月（在留資格により異なる）",
      "verifiedAt": "2026-10-03",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.sustainability.k.u-tokyo.ac.jp/docs/gpss_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度 入試情報：修士課程",
          "url": "https://www.sustainability.k.u-tokyo.ac.jp/docs/gpss_master_nyushijoho.pdf",
          "kind": "pdf",
          "pdfPage": 3
        }
      ],
      "subjectsOriginal": "書類選考\n口述試験",
      "scopeOriginal": "卒業研究\n研究計画書",
      "conditionsOriginal": "サステイナビリティ学大学院プログラムは、入試日程Bで一般選抜のみ実施する。この一般選抜は英語のみで実施されるので、日本語を解さない受験生も受験が可能である。\nTOEFL または IELTS のスコアシートを提出すること。\nTOEFL iBT Home Edition も有効とする。",
      "internationalGeneral": true
    },
    {
      "id": "kyoto-eng-civil",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "general",
      "selectionName": "一般学力選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学・物理（力学）\n専門",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n③専門（600 点/1000 点）：以下の(1)～(5)から   3 科目   を選択すること。\n       ただし、13・14・15・31・37 を第一志望区分とする場合には、3 科目の 1 科目として、必\n      ず(5)資源工学を選択しなければならない。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。"
    },
    {
      "id": "kyoto-eng-civil-type1",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "general",
      "selectionName": "学科外別途選考 I 型",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学・物理（力学）\n専門",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "(2) 学科外別途選考 I 型\n    ①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n    ②数学・物理（力学）（300 点/1000 点）：出題範囲・言語は一般学力選考と同じである。\n    ③専門（500 点/1000 点）\n                    ：一般学力選考と同じ(1)～(5)から       2 科目   を選択すること。出題範\n       囲・言語は一般学力選考と同じである。\n       ただし、13・14・15・31・37 を第一志望区分とする場合には、2 科目の 1 科目として、必\n      ず(5)資源工学を選択しなければならない。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。 本选拔另有学科外出愿资格，须阅读官方资格页。"
    },
    {
      "id": "kyoto-eng-civil-type2",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "general",
      "selectionName": "学科外別途選考 II 型",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n学力試験\n口頭試問",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "(3) 学科外別途選考 II 型・社会人別途選考\n    ①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n    ②学力試験（400 点/1000 点）：以下の(1)～(7)から 1 科目 を選択すること。出題範囲・言語は\n                       一般学力選考と同じである。ただし、13・14・15・31・37 を第一\n                       志望区分とする場合には、(3)～(6)を選ぶことはできない。\n\n      (1)数学、(2)物理（力学）、(3)構造力学、(4)水理学、(5)土質力学、(6)計画理論、(7)資源工学\n\n       出願時に、選考方法及び英語成績証明書の提出に関する申請書（様式－ M1）により、希望\n       する科目を 1 つ選択すること。出願後、受験希望の科目を変更することはできない。\n       (1)数学、(2)物理（力学）のいずれかを選択する場合は、8 月 4 日（火）10:00～11:00 の「数\n       学・物理（力学）\n              （選択者のみ）」の時間に受験すること 。(3)構造力学、(4)水理学、(5)土質\n       力学、(6)計画理論、(7)資源工学のいずれかを選択する場合は、8 月 4 日（火）13:00～14:00\nの「専門（選択者のみ）」の時間に受験すること 。\n    ③口頭試問（400 点/1000 点）：専門学識、志望理由等に関する口頭試問。\n      口頭試問が受験可能な受験生は、英語および 学力試験の成績を評価して選抜される。選抜\n      された受験生と口頭試問の時刻は、8 月 5 日（水）8:00 までに社会基盤工学・都市社会工\n      学専攻のウェブサイトに掲示する。選抜されなかった場合は成績の如何にかかわらず不合\n      格となる。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。 本条为学科外别途选考II型；社会人选拔另有实务经验资格。"
    },
    {
      "id": "kyoto-eng-urban",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市社会工学専攻",
      "admissionType": "general",
      "selectionName": "一般学力選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学・物理（力学）\n専門",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n③専門（600 点/1000 点）：以下の(1)～(5)から   3 科目   を選択すること。\n       ただし、13・14・15・31・37 を第一志望区分とする場合には、3 科目の 1 科目として、必\n      ず(5)資源工学を選択しなければならない。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。"
    },
    {
      "id": "kyoto-eng-urban-type1",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市社会工学専攻",
      "admissionType": "general",
      "selectionName": "学科外別途選考 I 型",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学・物理（力学）\n専門",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "(2) 学科外別途選考 I 型\n    ①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n    ②数学・物理（力学）（300 点/1000 点）：出題範囲・言語は一般学力選考と同じである。\n    ③専門（500 点/1000 点）\n                    ：一般学力選考と同じ(1)～(5)から       2 科目   を選択すること。出題範\n       囲・言語は一般学力選考と同じである。\n       ただし、13・14・15・31・37 を第一志望区分とする場合には、2 科目の 1 科目として、必\n      ず(5)資源工学を選択しなければならない。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。 本选拔另有学科外出愿资格，须阅读官方资格页。"
    },
    {
      "id": "kyoto-eng-urban-type2",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市社会工学専攻",
      "admissionType": "general",
      "selectionName": "学科外別途選考 II 型",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "社会基盤・都市社会系：科目・出題範囲・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "社会基盤・都市社会系：口頭試問・選考方法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "社会基盤・都市社会系：選考別出願資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/936wl9.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n学力試験\n口頭試問",
      "scopeOriginal": "(1)数学        微積分学、線形代数、ベクトル解析、複素関数、フーリエ変換、ラプ\n                   ラス変換、微分方程式、確率・統計\n      (2)物理（力学）    運動の法則、慣性系、回転座標系、振動、ポテンシャル、剛体の力学、\n                   ラグランジュの運動方程式\n       ※注 科目(1)と(2)は日本語および英語で出題される。\n\n(1)構造力学      力のつりあい、断面力、影響線、応力とひずみ、材料の力学的性質、\n                   断面の性質、構造物の安定性および静定・不静定、静定構造、構造物\n                   の変形、柱の弾性座屈、不静定構造、弾性方程式法、仕事・エネルギ\n                   ーと仮想仕事、エネルギー原理\n      (2)水理学       流体運動の基礎、静水力学、完全流体の力学、水の波、粘性と乱れ、\n                   次元解析と相似律、管路の定常流、開水路の定常流\n      (3)土質力学      土の分類と物理的性質、土中の水理、圧密、土のせん断強さ、土の締\n                   固め、土圧、支持力、地盤内応力、斜面の安定、地盤改良、地盤の液\n                   状化、地盤の振動特性\n      (4)計画理論      線形計画法、非線形計画法、動的計画法、ゲーム理論、ネットワーク\n                   手法、費用便益分析、重回帰モデル\n      (5)資源工学      岩石・岩盤の力学・水理、地質調査法と鉱床学、弾性波・電気・電磁\n                   探査の原理・データ解析と解釈\n    ※注 科目(1)～(4)は日本語および英語で出題される。科目(5)は日本語で出題される。 英語の問\n       題冊子には科目(5)は含まれない。",
      "conditionsOriginal": "(3) 学科外別途選考 II 型・社会人別途選考\n    ①英語（200 点/1000 点）：TOEFL、TOEIC または IELTS の成績により評価する。\n    ②学力試験（400 点/1000 点）：以下の(1)～(7)から 1 科目 を選択すること。出題範囲・言語は\n                       一般学力選考と同じである。ただし、13・14・15・31・37 を第一\n                       志望区分とする場合には、(3)～(6)を選ぶことはできない。\n\n      (1)数学、(2)物理（力学）、(3)構造力学、(4)水理学、(5)土質力学、(6)計画理論、(7)資源工学\n\n       出願時に、選考方法及び英語成績証明書の提出に関する申請書（様式－ M1）により、希望\n       する科目を 1 つ選択すること。出願後、受験希望の科目を変更することはできない。\n       (1)数学、(2)物理（力学）のいずれかを選択する場合は、8 月 4 日（火）10:00～11:00 の「数\n       学・物理（力学）\n              （選択者のみ）」の時間に受験すること 。(3)構造力学、(4)水理学、(5)土質\n       力学、(6)計画理論、(7)資源工学のいずれかを選択する場合は、8 月 4 日（火）13:00～14:00\nの「専門（選択者のみ）」の時間に受験すること 。\n    ③口頭試問（400 点/1000 点）：専門学識、志望理由等に関する口頭試問。\n      口頭試問が受験可能な受験生は、英語および 学力試験の成績を評価して選抜される。選抜\n      された受験生と口頭試問の時刻は、8 月 5 日（水）8:00 までに社会基盤工学・都市社会工\n      学専攻のウェブサイトに掲示する。選抜されなかった場合は成績の如何にかかわらず不合\n      格となる。",
      "internationalGeneral": true,
      "editorialNote": "社会基盤・都市社会系统一招生、合格后分属两个专攻。此条按专攻全称提供同一官方案内。2028年度地球工学専攻的改组预告不用于本条2027年度要求。 本条为学科外别途选考II型；社会人选拔另有实务经验资格。"
    },
    {
      "id": "kyoto-eng-environment",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市環境工学専攻",
      "admissionType": "general",
      "selectionName": "一般学力選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "都市環境工学専攻：一般学力選考／特別選考の科目・範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/7nw74f.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "都市環境工学専攻：小論文・口頭試問／筆記試験免除条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/7nw74f.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学\n専門",
      "scopeOriginal": "(1)数学          線形代数、ベクトル解析、微分方程式、確率・統計\n               ・専門（400 点/1000 点）：\n                必須問題：環境物理学,環境化学,及び環境生物学に関する語句説明、6 題すべて\n                         に解答すること。\n                選択問題：以下の(1)～(3)より出題される計 6 題のうち、3 題を選択し解答する\n                        こと。\n                科目名                     出題範囲\n            (1)環境物理学       熱や物質などの移動現象と環境装置設計、放射線の基礎と管理、\n                           騒音・振動の管理技術、大気汚染と地球温暖化\n            (2)環境化学        物理化学の基礎、無機・有機化学の基礎、化学的環境指標、\n                           界面化学\n            (3)環境生物学       微生物の代謝様式と増殖、生物学的水質指標、環境生態学の基礎\n             【注】数学及び専門の受験にあたっては関数電卓（プログラム機能を有さないもの）\n                  を各自が用意すること。",
      "conditionsOriginal": "（1）一般学力選考\n           ①英語(200 点/1000 点)：TOEFL、TOEIC または IELTS のスコアにより評価する。\n           ②専門科目（800 点/1000 点）\n               ・学部成績(200 点/1000 点)\n               ・数学(200 点/1000 点)\n（3）地球工学科卒業見込み者の筆記試験免除について\n 京都大学工学部地球工学科環境工学コースを 2027 年 3 月に卒業見込みの者のうち、3 年後期まで\nの成績が学科の上位 10 位以内、または環境工学コースの上位 5 位以内かつ学科上位 30 位以内で、出\n願時に「2027 年度   都市環境工学専攻修士課程    一般学力選考      筆記試験免除願」\n                                                 （以下、\n                                                    「筆記試験\n免除願」と略す）を「京都大学大学院工学研究科 C クラスター事務区教務掛（都市環境工学専攻                       入\n試担当）」に提出した者は、筆記試験（数学と専門）が免除される。ただし、筆記試験免除者には、筆\n記試験当日に面接が課せられるので注意すること。なお、「筆記試験免除願」は、該当者に交付され\nる「2027 年度   都市環境工学専攻修士課程    一般学力選考     筆記試験免除       通知書」から切り離し\nて用いること。免除者の専門科目の配点は、800 点満点とし、学部成績を 600 点、面接点を 200 点と\nする。",
      "internationalGeneral": true,
      "editorialNote": "专业科目评价包含学部成绩。京大指定课程符合条件者的笔试免除与面试条件保留在原文中。"
    },
    {
      "id": "kyoto-eng-environment-special",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市環境工学専攻",
      "admissionType": "general",
      "selectionName": "特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "都市環境工学専攻：一般学力選考／特別選考の科目・範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/7nw74f.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "都市環境工学専攻：小論文・口頭試問／筆記試験免除条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/7nw74f.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学または専門\n小論文及び口頭試問",
      "scopeOriginal": "(1)数学          線形代数、ベクトル解析、微分方程式、確率・統計\n               ・専門（400 点/1000 点）：\n                必須問題：環境物理学,環境化学,及び環境生物学に関する語句説明、6 題すべて\n                         に解答すること。\n                選択問題：以下の(1)～(3)より出題される計 6 題のうち、3 題を選択し解答する\n                        こと。\n                科目名                     出題範囲\n            (1)環境物理学       熱や物質などの移動現象と環境装置設計、放射線の基礎と管理、\n                           騒音・振動の管理技術、大気汚染と地球温暖化\n            (2)環境化学        物理化学の基礎、無機・有機化学の基礎、化学的環境指標、\n                           界面化学\n            (3)環境生物学       微生物の代謝様式と増殖、生物学的水質指標、環境生態学の基礎\n             【注】数学及び専門の受験にあたっては関数電卓（プログラム機能を有さないもの）\n                  を各自が用意すること。",
      "conditionsOriginal": "（2）特別選考\n           ①英語(200 点/1000 点)：TOEFL、TOEIC または IELTS のスコアにより評価する。\n           ②専門科目（800 点/1000 点）\n            ・学部成績(200 点/1000 点)\n            ・数学または専門(200 点/1000 点)：出題範囲は、一般学力選考と同じである。\n             数学、専門のうち一方、あるいは両方を選択できる。両方を選択した場合、点数の高\n             い方を「数学または専門」の得点とする。専門を選択する場合は、一般学力選考と同\n             じ要領で解答すること。\n【注】数学及び専門の受験にあたっては関数電卓（プログラム機能を有さないもの）\n               を各自が用意すること。\n         ・小論文及び口頭試問（400 点/1000 点）：   都 市 環 境 工学 に 関 連 し た 問 題 に つ いて 小\n                                     論文をまとめる。口頭試問については、小\n                                     論 文 の 内 容及 び 基 礎 学 力 等 に 関 し て質 疑\n                                     応答を行う。\n試験問題は日本語で出題する。口頭試問も日本語での質疑とする。",
      "internationalGeneral": true
    },
    {
      "id": "kyoto-eng-architecture",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "建築学専攻",
      "admissionType": "general",
      "selectionName": "修士課程入学試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "建築学専攻：試験科目・範囲・配点",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/p7ysxg.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "建築学専攻：TOEFLの有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/p7ysxg.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n設計製図\n計画系、構造系、環境系科目",
      "scopeOriginal": "計画系科目\n建築計画、都市および地域計画、建築史・都市史、建築論、建築生産、建築設計論、建築意匠\n\n設計製図\n小規模建築の設計：指定された用紙に一般図の製図を行う。\n\n構造系科目\n建築構造力学、鉄筋コンクリート構造、鉄骨構造、建築振動、木構造、構造材料、基礎工学\n\n環境系科目\n建築環境工学、建築設備システム、建築光・音環境学、建築温熱環境設計、都市環境工学、建築安全設計、建築設備計画法",
      "conditionsOriginal": "（2）英語\n TOEFL 試験の成績を 100 点満点に換算する。（2026 年 1 月 21 日以降に実施された TOEFL テストに\nついては、0-120 のスコアスケールの素点を使用する）\n 成績の提出方法その 他に ついては、下記の項 目 (a) を参照のこと。なお 、（ ⅱ）を提出しなかっ た\n場合は、英語の得点は 0 点となる。\n（ⅰ）2024 年 8 月 1 日以降に実施された TOEFL スコアを有効とする。Test Date scores のみ\n      を利用し、MyBest T M scores は利用しない。TOEFL-iBT(Internet-Based Test)のみ受け\n      付ける。自宅受験 TOEFL iBT Home Edition や団体特別受験 TOEFL-ITP などの成績は無\n      効とする。",
      "internationalGeneral": true,
      "editorialNote": "科目范围逐项取自官方试验日程表，完整表格可打开PDF第2页。"
    },
    {
      "id": "kyoto-eng-mechanical",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "機械理工学専攻",
      "admissionType": "general",
      "selectionName": "一般選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学\n機械力学\n専門科目",
      "scopeOriginal": "(ⅰ) 機械力学\n   工業力学、振動工学から出題する。\n  (ⅱ) 専門科目\n   流体力学、熱力学（統計熱力学を含む）、材料力学、制御工学から出題する。",
      "conditionsOriginal": "(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "機械工学群三个专攻统一招生、合格后分属专攻。官方该段仅列出「数学」，未给出更细的数学范围；不据研究内容推测。"
    },
    {
      "id": "kyoto-eng-mechanical-special",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "機械理工学専攻",
      "admissionType": "general",
      "selectionName": "特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n口頭試問",
      "scopeOriginal": "(ⅳ) 口頭試問\n   受験者 によ る研 究計 画に ついて のプ レゼ ンテ ーシ ョンの 後、 研究 計画 およ び専門 知識 に関 し\n   て試問を行う。\n   受験者 が口 頭試 問の 発表 指導を 指導 予定 教員 から 受ける こと を妨 げな い。 発表指 導に おい て\n   は、口 頭試 問に おい て受 験者 が 説明 しよ うと して いる研 究計 画が 、事 前コ ンタク トで 確認 し\n   た内容と一致するように指導する。",
      "conditionsOriginal": "(b) 特別選考\n              科目                           配点\n              英語                          １２０点\n             口頭試問                         ７３０点\n              合計                          ８５０点\n\n 英語に関する TOEFL テストの成績および口頭試問により決定する。事前の予備選考を行うため、\n 一部提 出書 類の 締切日 が 早い （Ⅵ. （2 ）参照）の で注意すること。予備選 考に不合格であった\n 受験者は希望すれば一般選考を受験することができる。\n\n(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "须先取得指導予定教員的受入承諾書并通过予備選考面接；资格与日程见官方PDF第3页。"
    },
    {
      "id": "kyoto-eng-micro",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "マイクロエンジニアリング専攻",
      "admissionType": "general",
      "selectionName": "一般選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学\n機械力学\n専門科目",
      "scopeOriginal": "(ⅰ) 機械力学\n   工業力学、振動工学から出題する。\n  (ⅱ) 専門科目\n   流体力学、熱力学（統計熱力学を含む）、材料力学、制御工学から出題する。",
      "conditionsOriginal": "(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "機械工学群三个专攻统一招生、合格后分属专攻。官方该段仅列出「数学」，未给出更细的数学范围；不据研究内容推测。"
    },
    {
      "id": "kyoto-eng-micro-special",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "マイクロエンジニアリング専攻",
      "admissionType": "general",
      "selectionName": "特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n口頭試問",
      "scopeOriginal": "(ⅳ) 口頭試問\n   受験者 によ る研 究計 画に ついて のプ レゼ ンテ ーシ ョンの 後、 研究 計画 およ び専門 知識 に関 し\n   て試問を行う。\n   受験者 が口 頭試 問の 発表 指導を 指導 予定 教員 から 受ける こと を妨 げな い。 発表指 導に おい て\n   は、口 頭試 問に おい て受 験者 が 説明 しよ うと して いる研 究計 画が 、事 前コ ンタク トで 確認 し\n   た内容と一致するように指導する。",
      "conditionsOriginal": "(b) 特別選考\n              科目                           配点\n              英語                          １２０点\n             口頭試問                         ７３０点\n              合計                          ８５０点\n\n 英語に関する TOEFL テストの成績および口頭試問により決定する。事前の予備選考を行うため、\n 一部提 出書 類の 締切日 が 早い （Ⅵ. （2 ）参照）の で注意すること。予備選 考に不合格であった\n 受験者は希望すれば一般選考を受験することができる。\n\n(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "须先取得指導予定教員的受入承諾書并通过予備選考面接；资格与日程见官方PDF第3页。"
    },
    {
      "id": "kyoto-eng-aero",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "航空宇宙工学専攻",
      "admissionType": "general",
      "selectionName": "一般選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n数学\n機械力学\n専門科目",
      "scopeOriginal": "(ⅰ) 機械力学\n   工業力学、振動工学から出題する。\n  (ⅱ) 専門科目\n   流体力学、熱力学（統計熱力学を含む）、材料力学、制御工学から出題する。",
      "conditionsOriginal": "(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "機械工学群三个专攻统一招生、合格后分属专攻。官方该段仅列出「数学」，未给出更细的数学范围；不据研究内容推测。"
    },
    {
      "id": "kyoto-eng-aero-special",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "航空宇宙工学専攻",
      "admissionType": "general",
      "selectionName": "特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "機械工学群：一般選考科目・配点／特別選考資格",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "機械工学群：出題範囲・特別選考・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "機械工学群：TOEFL成績の有効条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/ewv5v7.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n口頭試問",
      "scopeOriginal": "(ⅳ) 口頭試問\n   受験者 によ る研 究計 画に ついて のプ レゼ ンテ ーシ ョンの 後、 研究 計画 およ び専門 知識 に関 し\n   て試問を行う。\n   受験者 が口 頭試 問の 発表 指導を 指導 予定 教員 から 受ける こと を妨 げな い。 発表指 導に おい て\n   は、口 頭試 問に おい て受 験者 が 説明 しよ うと して いる研 究計 画が 、事 前コ ンタク トで 確認 し\n   た内容と一致するように指導する。",
      "conditionsOriginal": "(b) 特別選考\n              科目                           配点\n              英語                          １２０点\n             口頭試問                         ７３０点\n              合計                          ８５０点\n\n 英語に関する TOEFL テストの成績および口頭試問により決定する。事前の予備選考を行うため、\n 一部提 出書 類の 締切日 が 早い （Ⅵ. （2 ）参照）の で注意すること。予備選 考に不合格であった\n 受験者は希望すれば一般選考を受験することができる。\n\n(ⅲ) 英語\n   筆記試験は行わず、TOEFL テストの成績（120 点満点）で代用する。成績の提出方法その他に\n   ついては、下記の項目(e)およびⅥ. （1 ）、Ⅵ. （2 ）を参照のこと。提出がない場合は英語の\n   得点が 0 点となる。\n   受験資格により TOEFL を受験することが困難な場合は、下記Ⅵ.（3）まで連絡すること。\n\n(c) 留学生（卒業見込みを含む）への注意事項\n   本機械工学群では、日本の大学を卒業した留学生（卒業見込みを含む）は本試験を受験するこ\n  とを強く推奨する。その他の留学生は、本試験ではなく 2 月実施予定の試験を受験することを強\n  く推奨する。ただし、いずれの留学生も出願に先立って、下記の VI.(3)まで必ず詳細を問い合\n  わせること。",
      "internationalGeneral": true,
      "editorialNote": "须先取得指導予定教員的受入承諾書并通过予備選考面接；资格与日程见官方PDF第3页。"
    },
    {
      "id": "kyoto-eng-nuclear",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "原子核工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程入学試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "原子核工学専攻：修士課程教育プログラムの科目・数学範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/fe963x.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "原子核工学専攻：専門基礎範囲・留学生への注意",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/fe963x.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "修士課程教育プログラム",
      "subjectsOriginal": "英語\n数学\n専門基礎",
      "scopeOriginal": "数学（配点 150 点）\n    出題範囲は微積分、常微分方程式、線形代数、フーリエ解析、複素解析および特殊関数。\n\n  専門基礎（配点 200 点）\n    以下の科目からの出題（計 3 問）より、2 問を選択して解答すること。\n科 目         出題範囲\n  ・力学         運動と保存則、質点の運動、剛体の運動、振動、中心力のもとでの運動\n  ・量子力学       1 次元運動、調和振動子、スピン運動、中心力ポテンシャル、摂動論、変分法\n  ・電磁気学       静電磁界、電流と磁界、電磁誘導、マクスウェル方程式と電磁波",
      "conditionsOriginal": "英語（配点 100 点）\n     筆記試験は行なわず、TOEIC あるいは TOEFL テストの成績の提出で代用する。ただし、後日\n   に書類の改ざんや不正が認められた場合には合格を取り消す。100 点満点への換算方法および\n   成績の提出方法は以下に記す。\n   (a) TOEIC の場合\n   ・TOEIC の点数×0.12 を得点とする。ただし、100 点を上限とする。\n   ・試験実施日より過去 2 年以内に受験した TOEIC L&R 公開テストを有効とする。IP など団体向\n     けテスト、SW、Bridge は認めない。\n   ・デジタル公式認定証を印刷したものを 7/27(月)17 時までに提出すること。提出先および提出\n     方法は項目Ⅵ-(2)を参照すること。\n   (b) TOEFL の場合\n   ・TOEFL の点数×1.2 を得点とする。ただし、100 点を上限とする。TOEFL の点数は 0～120 のス\n      コアスケールのものを使用する。\n   ・試験実施日より過去 2 年以内に受験した TOEFL iBT テスト(Home Edition を含む)を有効とす\n      る。ITP など団体向けテストおよび MyBest スコアの利用は認めない。\n   ・試験実施日の前日までに Institutional Score Report が当専攻に届くように、Designated\n      Institution Code｢C323｣を指定して TOEFL 実施機関に送付依頼の手続きを取ること。\n   ・さらに、Test Taker Score Report の PDF 版を印刷したものを試験当日に提出すること（項目\n      Ⅵ-(4)を参照）。\n(5)外国人留学生への注意事項\n   (a)日本の大学を卒業見込み（あるいは卒業）の留学生は本試験を受験することを強く推奨する。\n     その他の留学生は、2 月期実施予定の試験を受験することを強く推奨する。\n   (b)京都大学工学部物理工学科以外の他大学・他学科を卒業見込み（あるいは卒業）の留学生は、\n      出願に先立ち、希望する指導予定教員に事前連絡をとり、指導教員調書（様式 原 M-01）に署\n      名を得ること。本調書の提出については、項目 Ⅵ -(3)を参照のこと。",
      "internationalGeneral": true,
      "editorialNote": "本条为修士課程教育プログラム。博士課程前後期連携教育プログラム追加的口頭試問不混入本条。"
    },
    {
      "id": "kyoto-eng-materials",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "材料工学専攻",
      "admissionType": "general",
      "selectionName": "一般選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "材料工学専攻：一般選考・特別選考の科目、出題範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/77wktw.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n工業数学\n材料基礎学Ａ\n材料基礎学Ｂ\n面接",
      "scopeOriginal": "［工業数学］配点 100 点\n  線形代数、微分積分、複素関数論、フーリエ解析、ラプラス変換、偏微分方程式 、ベクトル解析\n  など。\n\n\n ［材料基礎学Ａ］配点 120 点\n ［材料基礎学Ｂ］配点 180 点\n  両科目とも、次の出題範囲から出題し、全問解答 を要する。\n  ・固体の原子および電子構造（化学結合、電子構造、結晶構造、Ｘ線解析など）\n  ・熱力学・統計熱力学（相平衡、化学平衡、状態図など）\n  ・材料組織（材料の微細構造、格子欠陥、拡散、相変態など）\n  ・構造材料基礎（固体の機械的性質、弾性、塑性など）\n  ・機能材料基礎（固体の電気的性質、磁気的性質など）\n  ・材料プロセス基礎（金属材料、半導体材料、複合材料など）",
      "conditionsOriginal": "［英語］配点 100 点\n  筆記試験は行わず、TOEIC(TOEIC Listening & Reading Tests ; 以下 TOEIC L&R)の成績で代用する\n  (100 点満点に換算する)。学力検査日から過去 2 年以内に受験した TOEIC「公開テスト」の成績\n  表を提出すること。提出方法については下記 項目Ⅵ－(１)を参照。 TOEIC の「IP（Institutional\n  Program）テスト」ならびに「iBT Special Home Edition」の成績は受け付けない。提出がない場合\n  は英語の得点が 0 点となる。本専攻では、所属する大学院学生が TOEIC 730 点以上（レベルＢ）\n  の英語力を有するべきと考えている。提出された TOEIC テストの点数は、このことを考慮して\n  100 点満点に換算する。\n［面接］   面接控室において、進路希望調査票を提出のうえ、指示に従うこと。\n     面接に欠席した場合、受験者の不利益になることがある。",
      "internationalGeneral": true
    },
    {
      "id": "kyoto-eng-materials-special",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "材料工学専攻",
      "admissionType": "general",
      "selectionName": "特別選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "材料工学専攻：一般選考・特別選考の科目、出題範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/77wktw.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n口頭試問",
      "scopeOriginal": "［口頭試問］配点 400 点\n  受験者が、材料科学に関連するプレゼンテーションを行い、引続いてその内容および関連事項に\n  関する質疑応答を行う。",
      "conditionsOriginal": "［英語］配点 100 点\n「一般選考」に同じ\n\n［英語］配点 100 点\n  筆記試験は行わず、TOEIC(TOEIC Listening & Reading Tests ; 以下 TOEIC L&R)の成績で代用する\n  (100 点満点に換算する)。学力検査日から過去 2 年以内に受験した TOEIC「公開テスト」の成績\n  表を提出すること。提出方法については下記 項目Ⅵ－(１)を参照。 TOEIC の「IP（Institutional\n  Program）テスト」ならびに「iBT Special Home Edition」の成績は受け付けない。提出がない場合\n  は英語の得点が 0 点となる。本専攻では、所属する大学院学生が TOEIC 730 点以上（レベルＢ）\n  の英語力を有するべきと考えている。提出された TOEIC テストの点数は、このことを考慮して\n  100 点満点に換算する。",
      "internationalGeneral": true,
      "editorialNote": "特別選考的出愿资格须阅读官方案内PDF第1页，不能仅凭口头考试形式判定资格。"
    },
    {
      "id": "kyoto-eng-ee",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "電気電子デジタル理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程教育プログラム（一般）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "電気電子デジタル理工学専攻：一般・留学生区分／専門基礎a",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "電気電子デジタル理工学専攻：専門基礎b・合格者決定法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "電気電子デジタル理工学専攻：英語成績証明書の区分別条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門基礎 a\n専門基礎 b",
      "scopeOriginal": "専門基礎 a：配点 400 点\n  以下の 5 題から 4 題選択して解答する。\n   数学 1、数学 2\n    微積分（一変数関数の微積分、多変数関数の微積分）、常微分方程式、線形代数（行列と連立一次\n    方程式、ベクトル空間、行列の固有値と対角化）、複素関数論、フーリエ解析から 2 題。\n   電磁気学 1（静電界、静磁界、電磁誘導）\n   電気回路（交流回路、分布定数回路、過渡現象）\n物性基礎（量子力学の基礎、統計力学の基礎、固体物理の基礎）\n\n 専門基礎 b：配点 300 点\n  以下の 4 題から 3 題選択して解答する。\n   電磁気学 2（荷電粒子の運動、マクスウェルの方程式と電磁波）\n   電子回路（アナログ電子回路の基礎）\n   自動制御（連続時間システムの古典制御理論）\n   半導体・固体電子工学（半導体、固体電子物性・デバイス）",
      "conditionsOriginal": "英語：配点 120 点\n    筆記試験は行わず、TOEIC 等の成績で代用する。\n    提出方法については「Ⅵ.(1)(b) 英語成績証明書」を参照のこと。\n    提出がない場合は 0 点となる。\n(b) 英語成績証明書\n ・7 月 17 日（金）16 時必着（厳守）\n ・英語成績証明書として以下のいずれかを提出すること。ただし、本入学試験受験日当日（2026 年 8 月 1\n    日）から過去 2 年以内に受験した証明書に限る。英語を母国語とする受験者も提出が必要である。提出\n    後の変更は認めない。提出された成績証明書は試験日に返却する。なお、受験資格等の問題で TOEIC\n    等を受験することが困難な場合は、予め問い合わせること。\n\n  TOEIC の成績証明書 (Test Report Form)\n  TOEIC Listening ＆ Reading 公開テストのみ有効とする。団体試験である TOEIC-IP は不可。公式認定証\n  (Official Score Certificate) の原本のほか、デジタル公式認定証 (Digital Official Score Certificate) を印刷し\n  たものも受け付ける。いずれの場合も、紙媒体で提出すること。\n\n  TOEFL の成績証明書 (Test Taker Score Report) （留学生のみ提出可）\n  TOEFL-iBT のみを有効とする。TOEFL iBT Home Edition および団体試験である TOEFL-ITP は不可。な\n  お、Test Score を利用し、MyBest™ Scores は利用しない。成績証明書は、My TOEFL Home を通じて提\n  出すること。提出先の DI コードは「G147」である。\n\n  IELTS の成績証明書 (Test Report Form) の原本（留学生のみ提出可）\n  Academic Module のみを有効とする。",
      "editorialNote": "2027年4月入学、2026年8月实施的要求。2027年8月实施（2028年4月入学）的科目变更预告不用于本条。TOEFL和IELTS的提交条件在官方原文中限定为留学生。"
    },
    {
      "id": "kyoto-eng-ee-international",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "電気電子デジタル理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程教育プログラム（留学生）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "電気電子デジタル理工学専攻：一般・留学生区分／専門基礎a",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "電気電子デジタル理工学専攻：専門基礎b・合格者決定法",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "電気電子デジタル理工学専攻：英語成績証明書の区分別条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/c0c4kw.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門基礎 a\n専門基礎 b",
      "scopeOriginal": "専門基礎 a：配点 400 点\n  以下の 5 題から 4 題選択して解答する。\n   数学 1、数学 2\n    微積分（一変数関数の微積分、多変数関数の微積分）、常微分方程式、線形代数（行列と連立一次\n    方程式、ベクトル空間、行列の固有値と対角化）、複素関数論、フーリエ解析から 2 題。\n   電磁気学 1（静電界、静磁界、電磁誘導）\n   電気回路（交流回路、分布定数回路、過渡現象）\n物性基礎（量子力学の基礎、統計力学の基礎、固体物理の基礎）\n\n 専門基礎 b：配点 300 点\n  以下の 4 題から 3 題選択して解答する。\n   電磁気学 2（荷電粒子の運動、マクスウェルの方程式と電磁波）\n   電子回路（アナログ電子回路の基礎）\n   自動制御（連続時間システムの古典制御理論）\n   半導体・固体電子工学（半導体、固体電子物性・デバイス）",
      "conditionsOriginal": "Ⅲ. 出願資格\n   募集要項「Part A: II-i 出願資格」に記載の条件を満たす者。さらに、修士課程教育プログラム（留学生）\n への出願は、外国の国籍を持ち、在留資格「留学」を有する、又は入学時に「留学」を取得できる見込み\n であることも条件とする。\n   博士課程前後期連携教育プログラム志願者は、以上に加えて、「Ⅴ.(2) 試験詳細」に記載の出願資格審\n 査に合格する必要がある。志願者は、所定の書類を「Ⅵ. 出願要領」に記載の通り、桂キャンパス A クラ\n スター事務区教務掛（電気電子デジタル理工学専攻）に提出すること。\n   留学生のうち、京都大学工学部電気電子工学科出身者（卒業見込者を含む）以外は、志望研究室申告票\n で第一志望の研究室に事前連絡のうえ、指導希望教員に出願許可を得ることを必須とする。\n英語：配点 120 点\n    筆記試験は行わず、TOEIC 等の成績で代用する。\n    提出方法については「Ⅵ.(1)(b) 英語成績証明書」を参照のこと。\n    提出がない場合は 0 点となる。\n(b) 英語成績証明書\n ・7 月 17 日（金）16 時必着（厳守）\n ・英語成績証明書として以下のいずれかを提出すること。ただし、本入学試験受験日当日（2026 年 8 月 1\n    日）から過去 2 年以内に受験した証明書に限る。英語を母国語とする受験者も提出が必要である。提出\n    後の変更は認めない。提出された成績証明書は試験日に返却する。なお、受験資格等の問題で TOEIC\n    等を受験することが困難な場合は、予め問い合わせること。\n\n  TOEIC の成績証明書 (Test Report Form)\n  TOEIC Listening ＆ Reading 公開テストのみ有効とする。団体試験である TOEIC-IP は不可。公式認定証\n  (Official Score Certificate) の原本のほか、デジタル公式認定証 (Digital Official Score Certificate) を印刷し\n  たものも受け付ける。いずれの場合も、紙媒体で提出すること。\n\n  TOEFL の成績証明書 (Test Taker Score Report) （留学生のみ提出可）\n  TOEFL-iBT のみを有効とする。TOEFL iBT Home Edition および団体試験である TOEFL-ITP は不可。な\n  お、Test Score を利用し、MyBest™ Scores は利用しない。成績証明書は、My TOEFL Home を通じて提\n  出すること。提出先の DI コードは「G147」である。\n\n  IELTS の成績証明書 (Test Report Form) の原本（留学生のみ提出可）\n  Academic Module のみを有効とする。",
      "editorialNote": "本条为2026年8月实施的夏季留学生区分；与2027年2月冬季外国人留学生入试区别显示。"
    },
    {
      "id": "kyoto-eng-chem-creation",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程入学試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "化学理工学専攻：全群共通英語・創成化学群／先端化学群",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "化学理工学専攻：先端化学群／化学プロセス工学群・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "化学理工学専攻：正式専攻名・志望区分",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "創成化学群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２\n口頭試問",
      "scopeOriginal": "創成化学群\n［専門科目１］配点 500 点\n  有機化学（250 点）   物理化学（250 点）\n                          、いずれも必須問題。\n［専門科目２］配点 300 点\n  高分子化学（必須）および無機化学・分析化学・生化学から２科目選択（合計３科目・各 100\n  点）",
      "conditionsOriginal": "（１） 英語の学力評価と成績証明書について\n    TOEIC テストの成績を 150 点満点に換算する。このため、学力検査日（８月５日）から\n    過去２年以内に受験した TOEIC Listening & Reading Test 公開テストの「公式認定書」\n    (Official Score Certificate)の原本、または「デジタル公式認定書」(Digital Official Score\n    Certificate)を印刷したものを提出すること。TOEIC の IP テストの成績は受け付けない。\n    提出方法については下記を参照。\n    提出方法\n    １）７月２８日（火）の午前９時から午後５時の間に、A クラスター事務区教務課へ直\n       接提出。\n    ２）７月２８日（火）に配達されるよう配達日指定のうえ、下記宛先に書留郵便で郵送。\n    いずれの方法でも提出がない場合には、理由にかかわらず英語の得点は０点となる。\n（３） 口頭試問\n    受験生全員に対して口頭試問を行う。８月５日・\n                         （水）午後４時１５分までに受験票交付\n    時に指示する控室に集合すること。各試験室で「連絡届」用紙を配布するので、連絡先\n    （携帯電話が望ましい）を明記して担当試験監督に提出すること。同届を提出しなかっ\n    た場合、受験者の不利益になることがある。",
      "internationalGeneral": true,
      "editorialNote": "2026年4月改组后正式专攻名为化学理工学専攻。本条为2026年8月夏入试，保留该入试的群名与科目；冬季六个トラック群另列。"
    },
    {
      "id": "kyoto-eng-chem-advanced",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程入学試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "化学理工学専攻：全群共通英語・創成化学群／先端化学群",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "化学理工学専攻：先端化学群／化学プロセス工学群・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "化学理工学専攻：正式専攻名・志望区分",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "先端化学群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２\n口頭試問",
      "scopeOriginal": "先端化学群\n［専門科目１］配点 500 点\n  有機化学（250 点）   物理化学（250 点）\n                          、いずれも必須問題。\n［専門科目２］配点 300 点\n無機化学（必須）および融合化学・分析化学・生化学・化学工学から２科目選択（合計３科\n  目・各 100 点）",
      "conditionsOriginal": "（１） 英語の学力評価と成績証明書について\n    TOEIC テストの成績を 150 点満点に換算する。このため、学力検査日（８月５日）から\n    過去２年以内に受験した TOEIC Listening & Reading Test 公開テストの「公式認定書」\n    (Official Score Certificate)の原本、または「デジタル公式認定書」(Digital Official Score\n    Certificate)を印刷したものを提出すること。TOEIC の IP テストの成績は受け付けない。\n    提出方法については下記を参照。\n    提出方法\n    １）７月２８日（火）の午前９時から午後５時の間に、A クラスター事務区教務課へ直\n       接提出。\n    ２）７月２８日（火）に配達されるよう配達日指定のうえ、下記宛先に書留郵便で郵送。\n    いずれの方法でも提出がない場合には、理由にかかわらず英語の得点は０点となる。\n（３） 口頭試問\n    受験生全員に対して口頭試問を行う。８月５日・\n                         （水）午後４時１５分までに受験票交付\n    時に指示する控室に集合すること。各試験室で「連絡届」用紙を配布するので、連絡先\n    （携帯電話が望ましい）を明記して担当試験監督に提出すること。同届を提出しなかっ\n    た場合、受験者の不利益になることがある。",
      "internationalGeneral": true,
      "editorialNote": "2026年4月改组后正式专攻名为化学理工学専攻。本条为2026年8月夏入试，保留该入试的群名与科目；冬季六个トラック群另列。"
    },
    {
      "id": "kyoto-eng-chem-process",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程入学試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "化学理工学専攻：全群共通英語・創成化学群／先端化学群",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "化学理工学専攻：先端化学群／化学プロセス工学群・選答条件",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "化学理工学専攻：正式専攻名・志望区分",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/y21ulk.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "2027年度修士課程学生募集要項・共通部分：出願資格／専攻一覧",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "共通部分：海外大学卒業者の出願資格確認・AAO",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/master2027/xv4h16.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "化学プロセス工学群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２\n口頭試問",
      "scopeOriginal": "化学プロセス工学群\n［専門科目１］配点 500 点\n  基礎物理化学、移動現象（２題）\n                、分離工学（２題）\n                        、粒子工学、プロセス制御、基礎有機化\n  学の８題から５題選択\n［専門科目２］配点 300 点\n  化学工学量論（熱力学含む）\n              、化学工学数学、反応工学（２題）\n                             、プロセスシステム工学の５\n  題から３題選択。ただし、化学工学数学の出題範囲は、微分積分学、線形代数学、常微分方\n  程式、ベクトル解析、複素解析、偏微分方程式とする。",
      "conditionsOriginal": "（１） 英語の学力評価と成績証明書について\n    TOEIC テストの成績を 150 点満点に換算する。このため、学力検査日（８月５日）から\n    過去２年以内に受験した TOEIC Listening & Reading Test 公開テストの「公式認定書」\n    (Official Score Certificate)の原本、または「デジタル公式認定書」(Digital Official Score\n    Certificate)を印刷したものを提出すること。TOEIC の IP テストの成績は受け付けない。\n    提出方法については下記を参照。\n    提出方法\n    １）７月２８日（火）の午前９時から午後５時の間に、A クラスター事務区教務課へ直\n       接提出。\n    ２）７月２８日（火）に配達されるよう配達日指定のうえ、下記宛先に書留郵便で郵送。\n    いずれの方法でも提出がない場合には、理由にかかわらず英語の得点は０点となる。\n（３） 口頭試問\n    受験生全員に対して口頭試問を行う。８月５日・\n                         （水）午後４時１５分までに受験票交付\n    時に指示する控室に集合すること。各試験室で「連絡届」用紙を配布するので、連絡先\n    （携帯電話が望ましい）を明記して担当試験監督に提出すること。同届を提出しなかっ\n    た場合、受験者の不利益になることがある。",
      "internationalGeneral": true,
      "editorialNote": "2026年4月改组后正式专攻名为化学理工学専攻。本条为2026年8月夏入试，保留该入试的群名与科目；冬季六个トラック群另列。"
    },
    {
      "id": "kyoto-eng-chem-winter-physical",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "物理・量子化学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［物理・量子化学トラック群、有機化学トラック群、無機・分析化学トラック群、生\n物化学トラック群］高分子化学・無機化学・分析化学・生物化学から２科目選択",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-chem-winter-organic",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "有機化学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［物理・量子化学トラック群、有機化学トラック群、無機・分析化学トラック群、生\n物化学トラック群］高分子化学・無機化学・分析化学・生物化学から２科目選択",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-chem-winter-inorganic",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "無機・分析化学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［物理・量子化学トラック群、有機化学トラック群、無機・分析化学トラック群、生\n物化学トラック群］高分子化学・無機化学・分析化学・生物化学から２科目選択",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-chem-winter-polymer",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "高分子化学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［高分子化学トラック群］高分子合成・高分子物性・無機化学・分析化学・生物化学\nから２科目選択",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-chem-winter-bio",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "生物化学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［物理・量子化学トラック群、有機化学トラック群、無機・分析化学トラック群、生\n物化学トラック群］高分子化学・無機化学・分析化学・生物化学から２科目選択",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-chem-winter-engineering",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "化学理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年2月外国人留学生入試：試験方法変更予告・専門科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "変更予告：化学工学トラック群・数学／化学工学基礎の範囲",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/1kmwfo",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "化学工学トラック群",
      "subjectsOriginal": "英語\n専門科目１\n専門科目２",
      "scopeOriginal": "・専門科目１\n\n［全群共通］有機化学・物理化学（いずれも必須科目）\n・専門科目２\n［化学工学トラック群］数学・化学工学基礎・反応工学・移動現象・単位操作基礎・\nプロセス制御から 2 科目選択。ただし、数学の出題範囲は、微分積分学、線形代数\n学、常微分方程式、ベクトル解析、偏微分方程式とする。また、化学工学基礎の出題\n範囲は、基礎物理化学、化学工学量論とする。",
      "conditionsOriginal": "○英語科目（全群共通）\n\nTOEFL-iBT テストの成績の換算により英語科目の成績とします（変更なし）。",
      "editorialNote": "学校目前仅公布2027年2月入试变更预告；完整募集要项预定2026年11月下旬公布。这里只摘录预告中的已公布要求，不据夏入试或2026年冬入试补写科目、范围、口头考试或资格。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-nuclear-winter",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "原子核工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程外国人留学生入学試験",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "原子核工学専攻：2027年2月外国人留学生入試の変更後科目",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/3qffzg.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "原子核工学専攻：完整募集要項の公開予定",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/news/3qffzg.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "数学\n専門基礎\n口頭試問",
      "scopeOriginal": "専門基礎（力学、電磁気学、量子力学から 2 問選択）",
      "conditionsOriginal": "詳細については、2027 年度 4 月期入学修士課程外国人留学生学生募集要項（2027 年度 10 月期入学含む）（2026 年 11 月公開予定）で公表しますので、必ずご確認ください。",
      "editorialNote": "本条为冬季试验科目变更预告，只摘录「変更後」一栏。数学的细范围、口头试问内容等须等完整2027年度募集要项，不沿用2026年度旧科目。",
      "publicationStatus": "notice"
    },
    {
      "id": "kyoto-eng-civil-international",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "international",
      "selectionName": "外国人別途選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Guidelines for International Applicants to the 2027 Master’s Program: Subjects",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/en/news-events/news/01guidelines-for-international-master-course-2027.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "Oral Exam I/II: Range of Questions and subject selection",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/en/news-events/news/01guidelines-for-international-master-course-2027.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "環境基盤マネジメント国際コース：正式日本語名称",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/ja",
          "kind": "page"
        },
        {
          "label": "都市地域開発国際コース：正式日本語名称",
          "url": "https://www.um.t.kyoto-u.ac.jp/urd/ja",
          "kind": "page"
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "環境基盤マネジメント国際コース",
      "subjectsOriginal": "English ability\nOral Exam I/II",
      "scopeOriginal": "The Oral Exam I will last approximately 20 minutes and will mainly focus on the applicants’ basic\n       knowledge on the specialized subjects listed below (Structural Mechanics, Hydraulics, Soil Mechanics,\n       Planning and Management, and Earth Resources Engineering) or Mathematical knowledge. The table\n       below shows the ranges of questions for each subject.\n\n\n                       Subject                                      Range of Questions\n                         Structural           Force equilibrium, Sectional forces, Influence lines, Stress and\n                         Mechanics            strain, Mechanical properties of materials, Sectional properties,\n                                              Stability of structures and static determinate/indeterminate,\n                                              Statically determinate structures, Deformation of structures,\n                                              Elastic buckling of columns, Statically indeterminate\n                                              structures, Equations of elasticity, Work and energy, Virtual\n                                              work, Energy principle\n                            Hydraulics        Fundamentals of fluid motion, Hydrostatics, Dynamics of\n                                              perfect fluids, Water waves, Viscous flows and turbulence,\n                                              Dimensional analysis and similarity law, Steady pipe flows,\n                                              Steady open-channel flows\n        Specialized\n        subjects            Soil Mechanics    Physical properties and classification of soils, Permeability and\n                                              seepage, Consolidation, Shear strength, Compaction, Earth\n                                              pressure, Bearing capacity, Stress distribution, Slope stability,\n                                              Ground improvement, Liquefaction, Seismic behavior\n                            Planning and      Linear Programming, Nonlinear programming, Dynamic\n                            Management        Programming, Game theory, Network analysis, Cost-benefit\n                                              analysis, Regression analysis, Urban and Regional Planning,\n                                              Transportation Planning\n                            Earth Resources   Mechanics and hydraulics in rock; Geological survey methods\n                            Engineering       and        resource        geology;       Principles,     data\n                                              processing/interpretation in geophysical exploration using\n                                              seismic, electrical, and electromagnetic methods\n        Mathematics                           Calculus, Linear algebra, Vector analysis, Complex functions,\n                                              Fourier transform, Laplace transform, Differential equations,\n                                              Probability and statistics",
      "conditionsOriginal": "At Oral Exam I, applicants take one of the five specialized subjects or mathematics.",
      "editorialNote": "两个大学院国际课程联合选拔。范围取自修士募集要项的口头试问表，不使用地球工学科本科国际课程的考试。Oral Exam II的展示、问答及申报科目限制请阅读官方PDF第15页；英语评价见第14页。"
    },
    {
      "id": "kyoto-eng-urban-international",
      "universityId": "kyoto",
      "graduateSchool": "工学研究科",
      "department": "都市社会工学専攻",
      "admissionType": "international",
      "selectionName": "外国人別途選考",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Guidelines for International Applicants to the 2027 Master’s Program: Subjects",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/en/news-events/news/01guidelines-for-international-master-course-2027.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "Oral Exam I/II: Range of Questions and subject selection",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/en/news-events/news/01guidelines-for-international-master-course-2027.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "環境基盤マネジメント国際コース：正式日本語名称",
          "url": "https://www.ce.t.kyoto-u.ac.jp/mci/ja",
          "kind": "page"
        },
        {
          "label": "都市地域開発国際コース：正式日本語名称",
          "url": "https://www.um.t.kyoto-u.ac.jp/urd/ja",
          "kind": "page"
        },
        {
          "label": "工学研究科 公式入試情報",
          "url": "https://www.t.kyoto-u.ac.jp/ja/admissions/graduate/exam1/01master2027",
          "kind": "page"
        }
      ],
      "course": "都市地域開発国際コース",
      "subjectsOriginal": "English ability\nOral Exam I/II",
      "scopeOriginal": "The Oral Exam I will last approximately 20 minutes and will mainly focus on the applicants’ basic\n       knowledge on the specialized subjects listed below (Structural Mechanics, Hydraulics, Soil Mechanics,\n       Planning and Management, and Earth Resources Engineering) or Mathematical knowledge. The table\n       below shows the ranges of questions for each subject.\n\n\n                       Subject                                      Range of Questions\n                         Structural           Force equilibrium, Sectional forces, Influence lines, Stress and\n                         Mechanics            strain, Mechanical properties of materials, Sectional properties,\n                                              Stability of structures and static determinate/indeterminate,\n                                              Statically determinate structures, Deformation of structures,\n                                              Elastic buckling of columns, Statically indeterminate\n                                              structures, Equations of elasticity, Work and energy, Virtual\n                                              work, Energy principle\n                            Hydraulics        Fundamentals of fluid motion, Hydrostatics, Dynamics of\n                                              perfect fluids, Water waves, Viscous flows and turbulence,\n                                              Dimensional analysis and similarity law, Steady pipe flows,\n                                              Steady open-channel flows\n        Specialized\n        subjects            Soil Mechanics    Physical properties and classification of soils, Permeability and\n                                              seepage, Consolidation, Shear strength, Compaction, Earth\n                                              pressure, Bearing capacity, Stress distribution, Slope stability,\n                                              Ground improvement, Liquefaction, Seismic behavior\n                            Planning and      Linear Programming, Nonlinear programming, Dynamic\n                            Management        Programming, Game theory, Network analysis, Cost-benefit\n                                              analysis, Regression analysis, Urban and Regional Planning,\n                                              Transportation Planning\n                            Earth Resources   Mechanics and hydraulics in rock; Geological survey methods\n                            Engineering       and        resource        geology;       Principles,     data\n                                              processing/interpretation in geophysical exploration using\n                                              seismic, electrical, and electromagnetic methods\n        Mathematics                           Calculus, Linear algebra, Vector analysis, Complex functions,\n                                              Fourier transform, Laplace transform, Differential equations,\n                                              Probability and statistics",
      "conditionsOriginal": "At Oral Exam I, applicants take one of the five specialized subjects or mathematics.",
      "editorialNote": "两个大学院国际课程联合选拔。范围取自修士募集要项的口头试问表，不使用地球工学科本科国际课程的考试。Oral Exam II的展示、问答及申报科目限制请阅读官方PDF第15页；英语评价见第14页。"
    },
    {
      "id": "kyoto-sci-math",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "数学・数理解析専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅰ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅰ：数学・数理解析専攻",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "数学系",
      "subjectsOriginal": "基礎科目\n専門科目\n英語\n口頭試問",
      "scopeOriginal": "計算問題を主とした初歩的な内容と、数学の各分野の基礎的な問題を出題します。数学系を志望しない者は、微分積分学、線型代数学、初歩の複素解析の範囲内から問題を選ぶことができます。\n問題には英訳が併記されます。\n\n代数学、幾何学、解析学、物理学、応用数学、情報科学の分野の問題の中から、志望に応じて選択します。\n問題には英訳が併記されます。",
      "conditionsOriginal": "口頭試問は１次合格者だけを対象とします。\n数学系と数理解析系は併願する事ができます。口頭試問はそれぞれの系で別々に行います。特に数学系と数理解析系を重複志望する者は、口頭試問を２回受ける可能性があるので注意してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-rims",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "数学・数理解析専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅰ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅰ：数学・数理解析専攻",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "数理解析系",
      "subjectsOriginal": "基礎科目\n専門科目\n英語\n口頭試問",
      "scopeOriginal": "計算問題を主とした初歩的な内容と、数学の各分野の基礎的な問題を出題します。数学系を志望しない者は、微分積分学、線型代数学、初歩の複素解析の範囲内から問題を選ぶことができます。\n問題には英訳が併記されます。\n\n代数学、幾何学、解析学、物理学、応用数学、情報科学の分野の問題の中から、志望に応じて選択します。\n問題には英訳が併記されます。",
      "conditionsOriginal": "口頭試問は１次合格者だけを対象とします。\n数学系と数理解析系は併願する事ができます。口頭試問はそれぞれの系で別々に行います。特に数学系と数理解析系を重複志望する者は、口頭試問を２回受ける可能性があるので注意してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-physics1",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "物理学・宇宙物理学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅱ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅱ：物理学・宇宙物理学専攻",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "物理学第一分野",
      "subjectsOriginal": "物理学\n口頭試問",
      "scopeOriginal": "物理数学を含みます。\n\n口頭試問では、レポートの内容について、そして物理学あるいは宇宙物理学に関する知識（実験・観測を含む）についての試問を行います。",
      "conditionsOriginal": "英語能力の評価は英語外部検定試験の公式スコアを用います。対象となる英語外部検定試験は、TOEIC® Listening & Reading Test（公開テスト）です。\n口頭試問は第一次合格者を対象とします。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。 英语用外部成绩评价；本条不据过去问题或研究领域扩写官方未明确列出的物理学细分范围。"
    },
    {
      "id": "kyoto-sci-physics2",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "物理学・宇宙物理学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅱ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅱ：物理学・宇宙物理学専攻",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "物理学第二分野",
      "subjectsOriginal": "物理学\n口頭試問",
      "scopeOriginal": "物理数学を含みます。\n\n口頭試問では、レポートの内容について、そして物理学あるいは宇宙物理学に関する知識（実験・観測を含む）についての試問を行います。",
      "conditionsOriginal": "英語能力の評価は英語外部検定試験の公式スコアを用います。対象となる英語外部検定試験は、TOEIC® Listening & Reading Test（公開テスト）です。\n口頭試問は第一次合格者を対象とします。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。 英语用外部成绩评价；本条不据过去问题或研究领域扩写官方未明确列出的物理学细分范围。"
    },
    {
      "id": "kyoto-sci-astro",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "物理学・宇宙物理学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅱ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅱ：物理学・宇宙物理学専攻",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "宇宙物理学分野",
      "subjectsOriginal": "物理学\n口頭試問",
      "scopeOriginal": "物理数学を含みます。\n\n口頭試問では、レポートの内容について、そして物理学あるいは宇宙物理学に関する知識（実験・観測を含む）についての試問を行います。",
      "conditionsOriginal": "英語能力の評価は英語外部検定試験の公式スコアを用います。対象となる英語外部検定試験は、TOEIC® Listening & Reading Test（公開テスト）です。\n口頭試問は第一次合格者を対象とします。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。 英语用外部成绩评价；本条不据过去问题或研究领域扩写官方未明确列出的物理学细分范围。"
    },
    {
      "id": "kyoto-sci-geophysics",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "地球惑星科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅲ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅲ：基礎科目の出題範囲・選答条件",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "地球物理学分野",
      "subjectsOriginal": "英語\n基礎科目\n口頭試問",
      "scopeOriginal": "※ 数学は、主に微積分、線形代数、微分方程式、ベクトル解析、フーリエ解析の範囲から出題します。物理学は、\n   主に力学、振動・波動論、電磁気学の範囲から出題します。化学は、主に気体分子運動論、化学平衡論、反応速\n   度論、熱化学、原子の構造の範囲から出題します。地質学鉱物学は、主に岩石学、鉱物学の範囲から１問、古生\n   物学、堆積学、古環境学、構造地質学の範囲から１問出題します。プレートテクトニクスは、主にプレートテク\n   トニクスに関連する基礎知識と理解を問います。",
      "conditionsOriginal": "地球惑星科学に関係する基礎科目からの設問※（数学１問、物理学２問、化学１問、地質学鉱物学２問、プレートテクトニクス関連１問）より、２問を選択して解答してください。\n英語：TOEFL-ITP 試験の解答時間は約２時間（リスニングを含む）で、解答はマークシート方式です。\nTOEFL-iBT 等のスコアをもって代えることはできません。\nただし、志望分科が両分野にまたがる場合には、両分野の口頭試問を受ける必要があります。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-geology",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "地球惑星科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅲ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅲ：基礎科目の出題範囲・選答条件",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "地質学鉱物学分野",
      "subjectsOriginal": "英語\n基礎科目\n口頭試問",
      "scopeOriginal": "※ 数学は、主に微積分、線形代数、微分方程式、ベクトル解析、フーリエ解析の範囲から出題します。物理学は、\n   主に力学、振動・波動論、電磁気学の範囲から出題します。化学は、主に気体分子運動論、化学平衡論、反応速\n   度論、熱化学、原子の構造の範囲から出題します。地質学鉱物学は、主に岩石学、鉱物学の範囲から１問、古生\n   物学、堆積学、古環境学、構造地質学の範囲から１問出題します。プレートテクトニクスは、主にプレートテク\n   トニクスに関連する基礎知識と理解を問います。",
      "conditionsOriginal": "地球惑星科学に関係する基礎科目からの設問※（数学１問、物理学２問、化学１問、地質学鉱物学２問、プレートテクトニクス関連１問）より、２問を選択して解答してください。\n英語：TOEFL-ITP 試験の解答時間は約２時間（リスニングを含む）で、解答はマークシート方式です。\nTOEFL-iBT 等のスコアをもって代えることはできません。\nただし、志望分科が両分野にまたがる場合には、両分野の口頭試問を受ける必要があります。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-chemistry",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "化学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅳ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅳ：化学専攻・選答条件・英語",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "基礎科目\n専門科目\n口頭試問",
      "scopeOriginal": "基礎科目\n下記６科目から、３科目を選択し解答します。\n｢物理学｣ ｢物理化学｣ ｢無機化学｣ ｢有機化学｣ ｢生化学｣ ｢分析化学」\n\n専門科目\n下記５科目から、２科目を選択し解答します。\n｢物理学｣ ｢物理化学｣ ｢無機化学｣ ｢有機化学｣ ｢生化学｣\n\n「物理学」は、物理学科など物理学を専門とする学科の標準的学部履修範囲から出題します。",
      "conditionsOriginal": "英語能力の評価のため、英語外部検定試験の公式スコアを提出してください。対象となる英語外部検定試験は、\n      TOEFL iBT®（Test Date スコアを提出；Home Edition も可）、IELTSTM（アカデミック・トレーニングとジェネラル・\n      トレーニングのいずれも可）          、英検（英検 S-CBT も可）    、TOEIC®（L & R）です。どの外部検定試験についても、\n      本大学院入学試験からさかのぼって 2 年以内（2024 年 9 月以降）に実施された外部検定試験の公式スコアを有効\n      としますのでご注意ください。提出方法は募集要項「１０．出願書類（7）                      」を参照してください。出願時にスコ\n      ア提出が出来ない場合には、8 月 6 日（木）までに化学事務室へスコアを提出することで受験可能とします。                   （郵\n      便・窓口に関わらず 17:00 必着。〒606-8502 京都市左京区北白川追分町 京都大学大学院理学研究科６号館北棟\n      １７１号室 化学専攻事務室教務担当 宛）                。どの外部検定試験においても、様々な障がい等がある方への合理的配\n      慮に基づいた試験実施とスコア算出の対応が講じられており、各試験のホームページにて情報が公開されていま\n      す。化学専攻では、そうした配慮に基づいて実施された試験の公式スコアを有効としますので、受験生それぞれ\n      に合った外部検定試験を選択して受験してください。\n第一次合格者のみについてオンライン（Zoom）で行います。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-biology-animal",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅴ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅴ：生物科学専攻・選答条件・英語",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "動物学系",
      "subjectsOriginal": "一般基礎科目\n口頭試問",
      "scopeOriginal": "生物学１６問、物理学２問、化学２問、数学２問の計２２問より、６問を選択してください。ただし、６問中少なくとも２問は生物学の問題を選択してください。日本語または英語で解答してください。\n\n提出された小論文をもとに、志望する分科ごとに試問（各分科につき３０分）を行います。各分科の専門分野に関する理解度を評価するための試問を含みます。",
      "conditionsOriginal": "英語能力の評価のため、英語外部検定試験を受験してください。対象となる英語外部検定試験は、TOEFL iBT®\n                    、IELTSTM（アカデミック・トレーニングとジェネラル・トレーニングのいずれも可）\n    （Home Edition も可）                                               （本\n    研究科宛に直接送付される成績証明書の送付を依頼してください。          ）              、TOEIC®（L & R\n                                            、英検（英検 S-CBT も可）\n    と S & W の両方が必要）です。英検については、公式スコアに代えて個人成績表を提出しても構いません。ど\n    の外部検定試験についても、本大学院入学試験からさかのぼって 2 年以内（2024 年 9 月以降）に実施された外\n    部検定試験の公式スコアを有効としますのでご注意ください。提出方法は募集要項「１０．出願書類（7）                」を\n    参照してください。出願時にスコア提出が出来ない場合には、7 月 28 日（火）までに生物科学専攻事務室へ（郵\n    便・窓口に関わらず 17:00 必着）スコアを提出することで受験可能とします。      （郵便・窓口に関わらず 17:00 必\n    着。〒606-8502 京都市左京区北白川追分町 京都大学大学院理学研究科２号館１１０号室 生物科学専攻事務室\n    教務担当 宛）     。どの外部検定試験においても、様々な障がい等がある方への合理的配慮に基づいた試験実施と\n    スコア算出の対応が講じられており、各試験のホームページにて情報が公開されています。生物科学専攻では、\n    そうした配慮に基づいて実施された試験の公式スコアを有効としますので、受験生それぞれに合った外部検定\n    試験を選択して受験してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-biology-plant",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅴ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅴ：生物科学専攻・選答条件・英語",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "植物学系",
      "subjectsOriginal": "一般基礎科目\n口頭試問",
      "scopeOriginal": "生物学１６問、物理学２問、化学２問、数学２問の計２２問より、６問を選択してください。ただし、６問中少なくとも２問は生物学の問題を選択してください。日本語または英語で解答してください。\n\n提出された小論文をもとに、志望する分科ごとに試問（各分科につき３０分）を行います。各分科の専門分野に関する理解度を評価するための試問を含みます。",
      "conditionsOriginal": "英語能力の評価のため、英語外部検定試験を受験してください。対象となる英語外部検定試験は、TOEFL iBT®\n                    、IELTSTM（アカデミック・トレーニングとジェネラル・トレーニングのいずれも可）\n    （Home Edition も可）                                               （本\n    研究科宛に直接送付される成績証明書の送付を依頼してください。          ）              、TOEIC®（L & R\n                                            、英検（英検 S-CBT も可）\n    と S & W の両方が必要）です。英検については、公式スコアに代えて個人成績表を提出しても構いません。ど\n    の外部検定試験についても、本大学院入学試験からさかのぼって 2 年以内（2024 年 9 月以降）に実施された外\n    部検定試験の公式スコアを有効としますのでご注意ください。提出方法は募集要項「１０．出願書類（7）                」を\n    参照してください。出願時にスコア提出が出来ない場合には、7 月 28 日（火）までに生物科学専攻事務室へ（郵\n    便・窓口に関わらず 17:00 必着）スコアを提出することで受験可能とします。      （郵便・窓口に関わらず 17:00 必\n    着。〒606-8502 京都市左京区北白川追分町 京都大学大学院理学研究科２号館１１０号室 生物科学専攻事務室\n    教務担当 宛）     。どの外部検定試験においても、様々な障がい等がある方への合理的配慮に基づいた試験実施と\n    スコア算出の対応が講じられており、各試験のホームページにて情報が公開されています。生物科学専攻では、\n    そうした配慮に基づいて実施された試験の公式スコアを有効としますので、受験生それぞれに合った外部検定\n    試験を選択して受験してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-biology-biophysics",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅴ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅴ：生物科学専攻・選答条件・英語",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "生物物理学系",
      "subjectsOriginal": "一般基礎科目\n口頭試問",
      "scopeOriginal": "生物学１６問、物理学２問、化学２問、数学２問の計２２問より、６問を選択してください。ただし、６問中少なくとも２問は生物学の問題を選択してください。日本語または英語で解答してください。\n\n提出された小論文をもとに、志望する分科ごとに試問（各分科につき３０分）を行います。各分科の専門分野に関する理解度を評価するための試問を含みます。",
      "conditionsOriginal": "英語能力の評価のため、英語外部検定試験を受験してください。対象となる英語外部検定試験は、TOEFL iBT®\n                    、IELTSTM（アカデミック・トレーニングとジェネラル・トレーニングのいずれも可）\n    （Home Edition も可）                                               （本\n    研究科宛に直接送付される成績証明書の送付を依頼してください。          ）              、TOEIC®（L & R\n                                            、英検（英検 S-CBT も可）\n    と S & W の両方が必要）です。英検については、公式スコアに代えて個人成績表を提出しても構いません。ど\n    の外部検定試験についても、本大学院入学試験からさかのぼって 2 年以内（2024 年 9 月以降）に実施された外\n    部検定試験の公式スコアを有効としますのでご注意ください。提出方法は募集要項「１０．出願書類（7）                」を\n    参照してください。出願時にスコア提出が出来ない場合には、7 月 28 日（火）までに生物科学専攻事務室へ（郵\n    便・窓口に関わらず 17:00 必着）スコアを提出することで受験可能とします。      （郵便・窓口に関わらず 17:00 必\n    着。〒606-8502 京都市左京区北白川追分町 京都大学大学院理学研究科２号館１１０号室 生物科学専攻事務室\n    教務担当 宛）     。どの外部検定試験においても、様々な障がい等がある方への合理的配慮に基づいた試験実施と\n    スコア算出の対応が講じられており、各試験のホームページにて情報が公開されています。生物科学専攻では、\n    そうした配慮に基づいて実施された試験の公式スコアを有効としますので、受験生それぞれに合った外部検定\n    試験を選択して受験してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-biology-wildlife",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "general",
      "selectionName": "試験区分Ⅴ",
      "entryYear": "2027年4月（2026年10月入学は要項の条件による）",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "学力考査一覧・試験区分Ⅴ：生物科学専攻・選答条件・英語",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "2027年度修士課程募集要項：出願資格・海外大学卒業者AAO",
          "url": "https://sci.kyoto-u.ac.jp/sites/default/files/2026-05/01_application%20guidelines_y2BLLzuz_20260514.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "霊長類学・野生動物系",
      "subjectsOriginal": "一般基礎科目\n口頭試問",
      "scopeOriginal": "生物学１６問、物理学２問、化学２問、数学２問の計２２問より、６問を選択してください。ただし、６問中少なくとも２問は生物学の問題を選択してください。日本語または英語で解答してください。\n\n提出された小論文をもとに、志望する分科ごとに試問（各分科につき３０分）を行います。各分科の専門分野に関する理解度を評価するための試問を含みます。",
      "conditionsOriginal": "英語能力の評価のため、英語外部検定試験を受験してください。対象となる英語外部検定試験は、TOEFL iBT®\n                    、IELTSTM（アカデミック・トレーニングとジェネラル・トレーニングのいずれも可）\n    （Home Edition も可）                                               （本\n    研究科宛に直接送付される成績証明書の送付を依頼してください。          ）              、TOEIC®（L & R\n                                            、英検（英検 S-CBT も可）\n    と S & W の両方が必要）です。英検については、公式スコアに代えて個人成績表を提出しても構いません。ど\n    の外部検定試験についても、本大学院入学試験からさかのぼって 2 年以内（2024 年 9 月以降）に実施された外\n    部検定試験の公式スコアを有効としますのでご注意ください。提出方法は募集要項「１０．出願書類（7）                」を\n    参照してください。出願時にスコア提出が出来ない場合には、7 月 28 日（火）までに生物科学専攻事務室へ（郵\n    便・窓口に関わらず 17:00 必着）スコアを提出することで受験可能とします。      （郵便・窓口に関わらず 17:00 必\n    着。〒606-8502 京都市左京区北白川追分町 京都大学大学院理学研究科２号館１１０号室 生物科学専攻事務室\n    教務担当 宛）     。どの外部検定試験においても、様々な障がい等がある方への合理的配慮に基づいた試験実施と\n    スコア算出の対応が講じられており、各試験のホームページにて情報が公開されています。生物科学専攻では、\n    そうした配慮に基づいて実施された試験の公式スコアを有効としますので、受験生それぞれに合った外部検定\n    試験を選択して受験してください。",
      "internationalGeneral": true,
      "editorialNote": "此条是通常的修士选拔，符合出愿资格的留学生也通过该选拔申请。理学研究科官方Q&A说明：国際霊長類学・野生動物コース以外不另设外国人留学生入试或海外在住留学生入试。"
    },
    {
      "id": "kyoto-sci-primate-1",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "international",
      "selectionName": "International examination – Period 1",
      "entryYear": "2027年4月・2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "ICPWR 2027: MSc Selection Procedures / Examination Periods / Restrictions",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "ICPWR 2027: Certification of English Proficiency",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "ICPWR 2027: Eligibility and AAO requirements",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "ICPWR 2027: application and enrollment periods",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "国際霊長類学・野生動物コース",
      "subjectsOriginal": "the submitted documents\ntheir English qualifications\nan online examination in general biological sciences\nan interview",
      "scopeOriginal": "oral examinations for the general biology",
      "editorialNote": "本条仅录入MSc修士段落。一般生物学考查为远程口头考试，具体考试内容由学校在处理申请后通知考生；不套用通常生物科学専攻的22题选6题规则。Period 1可选2027年4月或10月入学，Period 2只对应2027年10月入学。英语成绩及免除条件见PDF第5页，考试程序和重复报考限制见第8页。"
    },
    {
      "id": "kyoto-sci-primate-2",
      "universityId": "kyoto",
      "graduateSchool": "理学研究科",
      "department": "生物科学専攻",
      "admissionType": "international",
      "selectionName": "International examination – Period 2",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "ICPWR 2027: MSc Selection Procedures / Examination Periods / Restrictions",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "ICPWR 2027: Certification of English Proficiency",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "ICPWR 2027: Eligibility and AAO requirements",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "ICPWR 2027: application and enrollment periods",
          "url": "https://cicasp.ehub.kyoto-u.ac.jp/sites/default/files/FY2027enrollment_cicasp_application_guidelines.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "留学生の出願／独立留学生入試の有無：公式Q&A",
          "url": "https://www.sci.kyoto-u.ac.jp/ja/admissions/intfaq",
          "kind": "page"
        },
        {
          "label": "理学研究科 公式入試情報",
          "url": "https://sci.kyoto-u.ac.jp/ja/admissions/ms",
          "kind": "page"
        }
      ],
      "course": "国際霊長類学・野生動物コース",
      "subjectsOriginal": "the submitted documents\ntheir English qualifications\nan online examination in general biological sciences\nan interview",
      "scopeOriginal": "oral examinations for the general biology",
      "editorialNote": "本条仅录入MSc修士段落。一般生物学考查为远程口头考试，具体考试内容由学校在处理申请后通知考生；不套用通常生物科学専攻的22题选6题规则。Period 1可选2027年4月或10月入学，Period 2只对应2027年10月入学。英语成绩及免除条件见PDF第5页，考试程序和重复报考限制见第8页。"
    },
    {
      "id": "kyoto-info-intelligence",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：知能情報学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "知能情報学：認知神経科学・知覚／認知心理学の範囲参考図書",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "知能情報学コース",
      "subjectsOriginal": "情報学基礎\n専門科目\n口頭試問\n英語",
      "scopeOriginal": "(ア)情報学基礎についての補足\n      下記２分野に関する基礎的な問題をそれぞれ２題出題する。４題とも解答すること。\n      線形代数、微分積分\n      アルゴリズムとデータ構造\n\n(イ)専門科目についての補足\n   下記６分野からそれぞれ１題出題する。２題選択し解答すること。\n   統計学\n   パターン認識と機械学習\n   情報理論\n   信号処理\n   形式言語理論\n   認知神経科学、知覚・認知心理学（注１）",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。\n\n(エ)口頭試問についての補足\n   志望区分に関連する学識と希望する研究に関しての口頭試問を日本語あるいは英語で行う。\n  ただし、口頭試問の対象者は、筆記試験の結果と英語スコアを用いて決定する。\n注 1）専門科目の認知神経科学、知覚・認知心理学の範囲として以下の図書を参考にすること．\n   「The Student's Guide to Cognitive Neuroscience, Fourth Edition」, Jamie Ward 著，Psychology Press,\n   ISBN-10 : 1138490547, ISBN-13 : 978-1138490543",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。"
    },
    {
      "id": "kyoto-info-social",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：社会情報学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "社会情報学コース",
      "subjectsOriginal": "情報学基礎\n専門科目\n口頭試問\n英語",
      "scopeOriginal": "(ア) 専門科目についての補足\n    以下の４つの出題分野（計算機科学、生物・環境、防災システム、医療情報）からそれぞれ\n  複数の問題が出題される。第一位の志望区分が指定する出題分野の問題から 3 題を解答するこ\n  と。志望区分、出題分野とその出題範囲の対応は以下のとおりである。指定以外の出題分野の\n  問題を解答した場合、その問題の得点は 0 点とする。\n\n    志望区分        出題分野                    出題範囲\n\n  社－1、社－2、     計算機科学     人工知能、データベース、情報システム、計算機ソフ\n  社－3、社－5、               トウェア、情報ネットワーク、データ構造、アルゴリ\n  社－6、社－14、              ズム、パターン認識、情報教育、ヒューマンインタフ\n  社－15、社－16              ェース\n\n  社－8、社－9      生物・環境     生物学、生態学、環境評価、環境問題、データ収集法、\n                         生物統計学\n\n  社－10、社－11、   防災システム    計画学、空間情報学、防災工学、防災心理学、リスク・\n  社－12                   コミュニケーション論、危機管理論\n\n  社－13         医療情報      医療情報学、生体医工学、病院管理学\n\n(イ) 情報学基礎についての補足\n   情報学基礎に関する筆記試験は以下に指定した教科書の内容から３題出題する。\n\n   「入門 コンピュータ科学 IT を支える技術と理論の基礎知識」\n   （J. Glenn Brookshear 著、神林靖・長尾高弘 翻訳、\n     KADOKAWA/アスキー・メディアワークス 出版、\n     ISBN-10: 4048869574、ISBN-13: 978-4048869577（第 10 版）、もしくは\n     ISBN-10: 4048930540、ISBN-13: 978-4048930543（第 11 版））\n   ※第 10 版と第 11 版の共通部分から出題する（第 11 版を使用する際は、第 5 ページの「第\n   11 版で加えたもの」を参照）。ただし、第 10 章「コンピュータグラフィックス」は出題\n   範囲から除く。",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。\n\n(エ)口頭試問についての補足\n   口頭試問は８月２日午前１０時から予定されているが、口頭試問対象者は８月１日の筆記試\n  験の結果により決定する。\n\n   社会情報学コースではコミュニケーション力を重視している。口頭試問では、まず、日本語\n  あるいは英語で提出された「志望説明書」に従って、これまでの学修・研究の経過、志望動機、\n  入学後の研究の抱負などを口頭で簡潔に５分以内で説明を行うこと（PC、液晶プロジェクタ、\n  OHP 等は使用しない。次に、研究経過、研究計画等についての試問を行う。\n   試験官には出願者が提出した「志望説明書」のコピーを配布する（出願者がコピーを用意す\n  る必要はない）。\n   口頭試問会場への受験票以外の所持品の持ち込みを禁じる。\n   なお、志望説明書の書式は（オ）を参照すること。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。"
    },
    {
      "id": "kyoto-info-advanced-math",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：先端数理科学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "先端数理科学コース",
      "subjectsOriginal": "基礎科目\n専門科目\n口頭試問",
      "scopeOriginal": "(ア)「基礎科目」についての補足\n ２題の必須問題と３題の選択問題の計５題が出題され、受験者は３題の選択問題の中から１題\nを解答時に選択して合計で３題を解答する（配点１５０点）。必須問題は理系学部の１、２年生\nで学修する程度の線型代数および微積分（留数等を利用する定積分の計算を含む）から出題され\nる。選択問題は、線型代数、微積分に関する事項、および、常微分方程式、１変数の複素解析に\n関する初歩的事項、質点・質点系の力学および剛体の力学に関する事項から出題される。\n\n(イ)「専門科目」についての補足\n 「解析学」「応用数学」「工業数学・計算力学」「統計力学」「流体力学」の合計５題が出題\nされ、各受験者は解答時にこの中から１題を選択して解答する（配点１５０点）。\n なお、上記の「応用数学」、「工業数学・計算力学」の指す具体的な内容は、以下の通りであ\nる。\n\n    応用数学：     より進んだ内容の線型代数および微積分（ベクトル解析を含む）、１\n              変数の複素関数論、常微分方程式、偏微分方程式（初歩的な内容）、\n              フーリエ解析、および数値解析・数値計算に関する事項など。\n    工業数学・計算力学：工学系学部で学習する程度の数学（ベクトル解析、複素解析、フーリ\n              エ解析等）に関する計算問題と数値計算に関する事項など。留数を利\n              用する単純な定積分の計算は、原則として出題しない。\n     なお、試験準備の参考となる問題が（オ）のコースホームページには掲載されている。",
      "conditionsOriginal": "(ウ)口頭試問についての補足\n    基礎科目、専門科目の点数および出願書類の内容を総合して口頭試問対象者を決定し、口\n   頭試問対象者に対して志望区分まで含めて可否により合格者を決定する２段階の選抜を行う。\n    口頭試問においては、志望動機、出身（在学する）大学での学習内容（特に卒業研究に関す\n   る内容）、志望区分及び希望する研究分野、筆記試験の内容などについての試問を行う。口頭\n   試問は日本語で行う。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。本选拔官方科目表未列英语评价。"
    },
    {
      "id": "kyoto-info-applied-math",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：数理工学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "数理工学コース",
      "subjectsOriginal": "基礎科目\n専門科目\n口頭試問\n英語",
      "scopeOriginal": "(ア)基礎科目および専門科目についての補足\n     基礎科目及び専門科目の出題範囲ならびに配点は以下の通りである。\n 基礎科目\n  １. 微積分\n  ２. 線形代数\n 専門科目\n  １． 複素関数／フーリエ解析 ： 複素関数の微積分、留数定理とその応用、フーリエ級数、\n                   フーリエ変換など\n  ２． グラフ理論       ： グラフ探索、最短路問題、最小木問題など\n  ３． 凸最適化        ： 凸集合と凸関数、線形計画(シンプレックス法は除く)、\n                   Karush-Kuhn-Tucker 条件、双対定理など\n  ４． 制御理論        ： 古典制御（伝達関数、周波数応答、安定判別、フィードバック\n                   補償など）及び現代制御（可制御、可観測、安定性、\n                   オブザーバ、最適レギュレータなど）\n  ５． 統計力学        ： 統計力学の基礎(統計的独立性、エルゴード性、\n                   分配関数、ギブス分布、マクスウェル分布、\n                   ボルツマン分布、ゆらぎの時間相関など)\n  ６． 常微分方程式      ： 初等解法、基礎定理、高階方程式、連立方程式など\n\n   基礎科目は２題すべてを、専門科目は６題の中から２題を試験中に選択し解答のこと。\n   筆記試験は日本語で出題され、日本語あるいは英語で解答すること。\n   基礎科目は１題あたり 50 点、計 100 点の配点である。\n   専門科目は１題あたり 100 点、計 200 点の配点である。",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。\n\n(イ)口頭試問についての補足\n     口頭試問においては、志望動機、出身（在学する）大学での学習内容、希望する専門分\n    野、修了後の進路などについて試問を行う（日本語あるいは英語を使用）。筆記試験、口頭\n    試問の可否、各志望区分の受入れ可能な学生数により合否を判定する。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。"
    },
    {
      "id": "kyoto-info-systems",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：システム科学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "システム科学コース",
      "subjectsOriginal": "数学\n専門科目\n口頭試問\n英語",
      "scopeOriginal": "(ア)数学についての補足\n  「微積分」および「線形代数」から出題する。配点は２００点である。\n\n(イ)専門科目についての補足\n    「複素関数論」、「確率統計」、「制御工学」、「信号処理」が出題され、各受験者はこ\n   の中から２分野を解答時に選択して解答する。配点は１分野１００点で、合計２００点であ\n   る。出題分野の具体的な内容は下記の通りである。\n   複素関数論   ：複素平面、正則関数とその性質、複素積分、留数と実定積分、関数（級\n            数）展開、等角写像など\n   確率統計    ：確率・推測統計の基礎的事項\n   制御工学    ：伝達関数、ボード線図、安定判別、根軌跡、位相進み遅れ補償など古典\n            制御理論全般（非線形制御、サンプル値制御は除く）\n   信号処理    ：フーリエ解析、Z 変換、線形フィルタなど",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。\n\n(エ)口頭試問についての補足\n   志望区分に関連する学識と希望する研究に関しての口頭試問を日本語で行う。解答は日本語\n  もしくは英語によるものとする。ただし、口頭試問の対象者は、筆記試験および英語の点数、\n  および出願書類の内容を用いて決定する。口頭試問の対象者については、その配点は８０点で\n  ある。\n\n(オ)合格者決定についての補足\n   筆記試験の点数、英語の点数、（口頭試問の対象者について）口頭試問の点数、出願書類の\n  内容、および各志望区分の受け入れ可能な学生数を総合して合格者を決定する。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。"
    },
    {
      "id": "kyoto-info-communication",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：通信情報システムコースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "通信情報システムコース",
      "subjectsOriginal": "専門基礎Ａ\n専門基礎Ｂ\n英語",
      "scopeOriginal": "(ア) 専門基礎Ａについての補足\n   「微分積分」、「線形代数」、 「論理回路」、「情報理論」 の分野から各１題ずつ、計４\n  題が必須問題として出題される。\n\n  (イ)専門基礎Ｂについての補足\n   以下に掲げる５つの出題分野（各出題分野の詳細は以下のとおり）の中から出題される。そ\n  れぞれの出題分野から各 1 題ずつ、合計５題が選択問題として出題され、受験者は解答時に２\n  題を選択して解答する。\n\n   出題分野及び出題範囲：\n\n   計算機科学基礎：アルゴリズムとデータ構造、グラフ理論、言語・オートマトン、アルゴリ\n   ズム論\n\n   ソフトウェアとコンピュータネットワーク：プログラミング言語、プログラミング言語処理\n   系、オペレーティングシステム、コンピュータネットワーク\n\n   通信システム工学：通信基礎論、通信ネットワーク、情報伝送工学\n\n   計算機システム工学：計算機アーキテクチャ、計算機システム\n\n   地球電波工学：電波工学(電磁波、アンテナ、伝搬)、ディジタル信号処理（離散フーリエ変\n   換、離散時間システム、ディジタルフィルタ）",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。本课程该次募集不列口頭試問，不从其他课程复制面试。"
    },
    {
      "id": "kyoto-info-data",
      "universityId": "kyoto",
      "graduateSchool": "情報学研究科",
      "department": "情報学専攻",
      "admissionType": "general",
      "selectionName": "修士課程学生募集（2026年8月実施）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年4月期募集要項：データ科学コースの出題範囲・選答条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 22
        },
        {
          "label": "2026年8月実施：コース別試験科目・口頭試問の有無",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度4月期修士募集要項：各コース・出願資格",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "情報学専攻：七つのコースの正式名称",
          "url": "https://www.i.kyoto-u.ac.jp/course/",
          "kind": "page"
        },
        {
          "label": "英語能力評価：TOEFL／TOEICの提出・有効条件",
          "url": "https://www.i.kyoto-u.ac.jp/assets/pdf/admission/application/master-2027-4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "情報学研究科 公式入試情報",
          "url": "https://www.i.kyoto-u.ac.jp/admission/application/",
          "kind": "page"
        }
      ],
      "course": "データ科学コース",
      "subjectsOriginal": "情報学基礎\n専門科目\n英語",
      "scopeOriginal": "（ア） 情報学基礎についての補足\n   下記２分野に関する基礎的な問題をそれぞれ２題出題する。４題とも解答すること。配点は\n   100 点である。\n    線形代数、微分積分\n    アルゴリズムとデータ構造\n\n（イ） 専門科目についての補足\n   下記４分野からそれぞれ１題出題する。２題を選択し解答すること。配点は 100 点である。\n    統計学\n    パターン認識と機械学習\n    情報理論\n    信号処理",
      "conditionsOriginal": "Ⅴ．TOEFL／TOEIC テスト受験に関する注意事項\n１．各自で TOEFL テストまたは TOEIC Listening & Reading テストの申込手続きを行い、受験す\n ること。TOEFL、TOEIC テストの受験に必要な費用は各自で負担すること。\n２． TOEFL（TOEFL iBT）の受験者用控えスコア票（Test Taker Score Report）の写し、または TOEIC\n Listening &Reading Test の個人用公式認定書（Official Score Certificate）の写しを出願時に提出す\n ること。\n３．出願締切日の２年前以降に受験した TOEFL/TOEIC テストのスコア票に限り提出が可能であ\n る。自宅受験「TOEFL iBT® Home Edition」（「 TOEFL iBT® Special Home Edition」を含む）の\n スコア票は受け付けるが、TOEFL Essentials テスト、団体試験用の TOEFL ITP のスコア票やカ\n レッジ TOEIC 等の団体特別受験制度（IP テスト）は受け付けない。\n４．出願時に上記２で指定するスコア票等の提出が間に合わない場合、「提出なし」（すなわち、\n 英語能力の評価を０点）として扱う。英語テストのスコア票の当日提出は受付けない。\n５．TOEFL､TOEIC を合わせて複数回受験している場合、そのうちいずれか１つのスコア票を提出\n すること。",
      "internationalGeneral": true,
      "editorialNote": "信息学研究科现为情報学専攻下设七个课程；本条保留对应课程的官方原文。英语用外部成绩评价。本课程该次募集不列口頭試問，不从其他课程复制面试。"
    },
    {
      "id": "kyoto-energy-social-1",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー社会・環境科学専攻",
      "admissionType": "general",
      "selectionName": "第１回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー社会・環境科学専攻：第1回／第2回試験科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n論述\n口頭試問",
      "scopeOriginal": "・ エネルギー社会・環境科学専攻\n\n  英  語：辞書などの持ち込み不可。\n  論  述：エネルギー社会・環境科学に関連して与えられたテーマについて論述。\n  口頭試問：当専攻において学修・研究を進めるために必要な適性について評価する。\n\n  ※ 電卓などの持ち込みは不可。\n  ※ 英語、論述、口頭試問の各科目で、予め定められた有資格基準に達しなかった場合、不合格と\n    なることがある。",
      "internationalGeneral": true
    },
    {
      "id": "kyoto-energy-foundation-1",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー基礎科学専攻",
      "admissionType": "general",
      "selectionName": "第１回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー基礎科学専攻：第１回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "エネルギー基礎科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門科目",
      "scopeOriginal": "専門科目：配点 300 点\n     数学（微積分、微分方程式、線形代数、ベクトル解析、複素解析）、量子力学、電磁気学（電\n     磁気学基礎、電磁誘導を含む）、電気電子工学（電気回路、電気電子計測） 、熱・統計力学（伝\n     熱工学、流体熱工学を含む）、物理化学、分析化学、無機化学、有機化学、以上 9 科目から 2\n     科目を選択する。ただし、熱・統計力学と物理化学はどちらか 1 科目のみしか選択できない。\n\n ※ 電卓などの持ち込みは不可。\n なお、英語および専門科目のうち、１科目でも受験しなかった場合は、不合格となるので注意\n すること。",
      "conditionsOriginal": "英  語：配点 100 点\n     下記の TOEFL または TOEIC の成績により評価する。両方提出する場合は、それぞれの成績に\n     基づく評価のうち良い方を英語の得点とする。受験生は全員、試験当日の指定時刻（午前 11\n     時）に試験場に集合し、受験票を提示し成績証明書（TOEFL の受験者用控えスコアレポート、\n     もしくは TOEIC のデジタル公式認定証（TOEIC 申込サイトでダウンロード可能な PDF）を入手\n     し、印刷したもの）を提出して成績登録を行うこと。成績登録が無い場合は英語不受験とな\n     り、不合格となるので注意すること。成績登録に際し、成績証明書の提出がない場合は、英\n     語の得点を 0 点とするが、英語の成績登録はなされたものとする。\n     【TOEFL の場合】\n      ・ 令和６年８月１日以降に実施された TOEFL iBT (Internet Based Testing（Home Edition\n         含む))の公開テストの成績により英語の学力を評価する。\n      ・ 受験者用控えスコアレポート（Test Taker Score Report）と、公式スコアレポート\n         （Official Score Report）の両方の提出が必要である。\n      ・ 受験者用控えスコアレポート（Test Taker Score Report）(ホームページからダウンロ\n         ードした PDF 形式のスコアレポートを印刷したものも可)は試験当日提出すること。\n      ・ 公式スコアレポート（Official Score Report）については、TOEFL 事務局から以下の送\n         付先に公式スコアレポートの送付を請求すること。京都大学への到着期限は令和８年７\n         月３１日（金）とする。\n         ☆公式スコアレポートの送付先\n         DI(Designated Institution)コード：\"9501\"（Kyoto U., Kyoto）\n         Department コード：\"69\"( Engineering, other)\n      ・ TOEFL iBT (Internet Based Testing（Home Edition 含む)) のスコアレポートのみを受\n         理する。\n      ・ TOEFL-ITP (Institution Testing Program)などの団体試験のスコアレポートは無効と\n         するので注意すること。\n      ・ TOEFL は受験から公式スコアレポートの到着に非常に日数がかかる場合があるので、十\n         分な時間的余裕を持って受験すること。\n      ・ Test Date Scores のみを採用し、My BestTM Scores は採用しない。\n\n       【TOEIC の場合】\n       ・ 令和６年８月１日以降に実施された TOEIC Listening & Reading Test (TOEIC L&R)の公\n           開テストのデジタル公式認定証(Official Score Certificate)の成績により英語の学力\n           を評価する。\n       ・ 日本で実施された TOEIC Listening & Reading Test 公開テストの成績証明書のみを受\n           理する。これ以外の成績については受け付けないので注意すること。\n       ・ TOEIC 申込サイトからダウンロードした PDF 形式のデジタル公式認定証(Official Score\n           Certificate) を印刷したものを試験当日に持参すること。\n       ・ 当専攻は公開テスト「スコア確認サービス」を利用して、試験当日に提出されたデジタ\n           ル公式認定証の確認を行う。試験当日に「スコア確認サービス」によりデジタル公式認\n           定証の確認が行えるように、あらかじめ十分な時間の余裕を持って、TOEIC 申込サイト\n           にて当専攻が TOEIC スコアの提出先となるように下記申請コードを入力して手続きして\n           おくこと。\n           ☆TOEIC スコアの提出先\n           申請コード：00013702\n           団体名称：京都大学大学院エネルギー科学研究科エネルギー基礎科学専攻\n       ・ TOEIC は受験からデジタル公式認定証の発行まで時間を要するため下記サイトを確認し\n           て、十分な時間的余裕を持って受験すること。\n           https://www.iibc-global.org/toeic/test/lr/guide04.html\n       ・ TOEIC Bridge、TOEIC Speaking & Writing Tests などの団体試験の成績証明書は無効と\n           するので注意すること。",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-conversion-1",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー変換科学専攻",
      "admissionType": "general",
      "selectionName": "第１回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー変換科学専攻：第１回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "エネルギー変換科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門科目Ⅰ\n専門科目Ⅱ\n小論文",
      "scopeOriginal": "専門科目Ⅰ：配点 200 点\n        下記の数学、熱力学、材料力学、材料物性学、電磁気学の計 5 科目から 2 科目\n        を選択し、その選択科目についてそれぞれ解答する。\n         数      学：線形代数、微分方程式、ベクトル解析、複素関数、フーリエ解析、\n                  ラプラス変換、などから出題する。\n         熱 力 学：熱力学の基礎と応用から出題する。\n         材 料 力 学：材料力学、および弾性論の初歩から出題する。\n         材料物性学：材料物性の基礎から出題する。\n         電 磁 気 学：電磁気学の基礎と応用から出題する。\n\n  小 論 文：配点 100 点\n         エネルギー変換科学に関して出題する。\n\n  専門科目Ⅱ：配点 200 点\n         以下の各専門分野から 1 専門分野を選択して、選択分野について解答する。\n         専門分野１：機械力学、流体力学・伝熱学、システム工学、機械設計など。\n         専門分野２：電気回路、電子回路、電気電子計測、電気機器など。\n         専門分野３：材料物性、材料組織、材料強度、材料熱力学など。\n         専門分野４：応用物理（真空、原子力、放射線、核融合など（関連する材料を含む）\n                                              ）、\n                 応用化学（移動現象、反応プロセスなど）\n                                   。\n\n   ※ いずれの科目においても、電卓などの持ち込みは不可。",
      "conditionsOriginal": "英語および専門科目のうち、１科目でも受験しなかった場合は、不合格となるので注意する\n こと。\n\n・エネルギー変換科学専攻\n\n 【第１回選抜】\n  英  語：配点 100 点\n      TOEFL の公式スコアレポート(Official Score Report)あるいは TOEIC のデジタル公式認定証\n      (Official Score Certificate)の成績に基づいて、100 点満点に換算し、評価する。\n            （後述の「英語の学力評価について」を熟読すること。             ）",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-application-1",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー応用科学専攻",
      "admissionType": "general",
      "selectionName": "第１回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー応用科学専攻：第１回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "エネルギー応用科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門科目\n口頭試問",
      "scopeOriginal": "専門科目：配点 500 点\n      以下の７科目から２科目を選択\n      数学；微積分、ベクトル解析、線形代数、複素関数論、フーリエ級数、フーリエ変換とそ\n       の応用、常微分方程式、偏微分方程式の解法、ラプラス変換。\n      流体力学；流体力学の基礎事項全般。非粘性流体の基礎理論、ポテンシャル流れ、渦運動、\n       揚力論。粘性流体の基礎方程式、剥離現象と抗力理論、層流と乱流境界層の解析および\n       乱流理論の初歩的事項。気体力学の初歩的事項。\n      材料強度学；材料強度学の基礎事項全般。格子欠陥、転位の弾性論、増殖・切り合い・堆\n       積等の転位挙動、強化機構、疲労強度、高温強度および塑性力学基礎。\n      エネルギー熱化学；化学熱力学の基礎事項全般（熱力学第１・２・３法則、相変態、理想\n       気体、ガス平衡（エリンガム図を含む）、不均一系の平衡（ギブズの相律を含む）、電\n       池の起電力など）および溶体の熱力学（２元系状態図、３元系状態図、理想溶体、正則\n       溶体、希薄溶体、活量（ギブズ-デュエムの式を含む）など）について出題する。［定規\n       持参のこと］。\n      物理化学(注)；地球環境学、資源エネルギー科学技術および材料プロセッシング等の基礎と\n       なる物理化学の基礎 （熱力学の第 1、第 2 法則、相図、化学平衡、電気化学平衡(電位-pH\n       図を含む)、物質移動、イオンの輸送と拡散、化学反応速度、動的電気化学など）および\n       材料基礎学（2 成分系状態図と材料組織、固体中の原子の拡散など）について出題する。\n       ［定規持参のこと］。\n      電磁気学；静電界と静磁界、定常電流、電流磁界、電磁力、電磁誘導、電磁界（マックス\n       ウェルの電磁方程式）。\n      電気電子回路；直流回格、交流回格（多相回路を含む）、ラプラス変換による過渡現象解\n       析、能動素子と増幅・発振回路、演算増幅器とその応用回路。\n\n      （注）物理化学：令和 7 年度までは「材料物理化学基礎」として実施していた科目であるが、\n         出題範囲に変更はない。\n\n\n口頭試問：配点 200 点\n     本専攻志望理由、配属希望などのほか、研究履歴や勉学の内容、およびその理解の程度、\n     将来への展望等について試問する。",
      "conditionsOriginal": "英   語：配点 200 点\n\n      TOEFL の公式スコアレポート(Official Score Report)あるいは TOEIC のデジタル公式認定証\n      (Official Score Certificate)の成績に基づいて、200 点満点に換算し、評価する。\n              （後述の「英語の学力評価について」を熟読すること。）",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-social-2",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー社会・環境科学専攻",
      "admissionType": "general",
      "selectionName": "第２回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー社会・環境科学専攻：第1回／第2回試験科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n論述\n口頭試問",
      "scopeOriginal": "・ エネルギー社会・環境科学専攻\n\n  英  語：辞書などの持ち込み不可。\n  論  述：エネルギー社会・環境科学に関連して与えられたテーマについて論述。\n  口頭試問：当専攻において学修・研究を進めるために必要な適性について評価する。\n\n  ※ 電卓などの持ち込みは不可。\n  ※ 英語、論述、口頭試問の各科目で、予め定められた有資格基準に達しなかった場合、不合格と\n    なることがある。",
      "internationalGeneral": true
    },
    {
      "id": "kyoto-energy-foundation-2",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー基礎科学専攻",
      "admissionType": "general",
      "selectionName": "第２回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー基礎科学専攻：第２回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "エネルギー基礎科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n基礎科目",
      "scopeOriginal": "基礎科目：配点 300 点\n     物理系、化学系の 2 科目から、いずれか 1 科目を選択する。\n\n ※ 電卓などの持ち込みは不可。\n なお、英語および専門科目のうち、１科目でも受験しなかった場合は、不合格となるので注意する\n こと。",
      "conditionsOriginal": "\n英  語：配点 100 点\n    下記の TOEFL または TOEIC の成績により評価する。両方提出する場合は、それぞれの成績に\n    基づく評価のうち良い方を英語の得点とする。受験生は全員、試験当日の指定時刻（午後 1\n    時）に試験場に集合し、受験票を提示し成績証明書（TOEFL の受験者用控えスコアレポート、\n    もしくは TOEIC のデジタル公式認定証（TOEIC 申込サイトでダウンロード可能な PDF）を入手\n    し、印刷したもの）を提出して成績登録を行うこと。成績登録が無い場合は英語不受験とな\n    り、不合格となるので注意すること。成績登録に際し、成績証明書の提出がない場合は、英\n    語の得点を 0 点とするが、英語の成績登録はなされたものとする。\n\n     【TOEFL の場合】\n      ・ 令和６年８月１日以降に実施された TOEFL iBT (Internet Based Testing（Home Edition\n         含む))の公開テストの成績により英語の学力を評価する。\n      ・ 受験者用控えスコアレポート（Test Taker Score Report）と、公式スコアレポート\n         （Official Score Report）の両方の提出が必要である。\n      ・ 受験者用控えスコアレポート（Test Taker Score Report）(ホームページからダウンロ\n         ードした PDF 形式のスコアレポートを印刷したものも可)は試験当日提出すること。\n      ・ 公式スコアレポート（Official Score Report）については、TOEFL 事務局から以下の送\n         付先に公式スコアレポートの送付を請求すること。京都大学への到着期限は令和８年９\n         月１８日（金）とする。\n         ☆公式スコアレポートの送付先\n         DI(Designated Institution)コード：\"9501\"（Kyoto U., Kyoto）\n         Department コード：\"69\"( Engineering, other)\n      ・ TOEFL iBT (Internet Based Testing（Home Edition 含む)) のスコアレポートのみを受\n         理する。\n      ・ TOEFL-ITP (Institution Testing Program)などの団体試験のスコアレポートは無効と\n         するので注意すること。\n      ・ TOEFL は受験から公式スコアレポートの到着に非常に日数がかかる場合があるので、十\n         分な時間的余裕を持って受験すること。\n      ・ Test Date Scores のみを採用し、My BestTM Scores は採用しない。\n\n     【TOEIC の場合】\n      ・ 令和６年８月１日以降に実施された TOEIC Listening & Reading Test (TOEIC L&R)の公\n         開テストのデジタル公式認定証(Official Score Certificate)の成績により英語の学力\n         を評価する。\n      ・ 日本で実施された TOEIC Listening & Reading Test 公開テストの成績証明書のみを受\n         理する。これ以外の成績については受け付けないので注意すること。\n      ・ TOEIC 申込サイトからダウンロードした PDF 形式のデジタル公式認定証(Official Score\n         Certificate) を印刷したものを試験当日に持参すること。\n      ・ 当専攻は公開テスト「スコア確認サービス」を利用して、試験当日に提出されたデジタ\n         ル公式認定証の確認を行う。試験当日に「スコア確認サービス」によりデジタル公式認\n         定証の確認が行えるように、あらかじめ十分な時間の余裕を持って、TOEIC 申込サイト",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-conversion-2",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー変換科学専攻",
      "admissionType": "general",
      "selectionName": "第２回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー変換科学専攻：第２回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "エネルギー変換科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門科目\n小論文",
      "scopeOriginal": "専門科目：配点 200 点\n       下記の専門分野 A、専門分野 B、専門分野 C、専門分野 D の計 4 分野から 1 分野\n       を選択し、その選択分野についてそれぞれ解答する。\n        専門分野 A：熱力学及び材料力学。\n        専門分野 B：電磁気学、電気回路、電子回路、電気電子計測、電気機器など。\n        専門分野 C：材料物性、材料組織、材料強度、材料熱力学など。\n        専門分野 D：応用物理（真空、原子力、放射線、核融合など（関連する材料を含む））、\n応用化学（移動現象、反応プロセスなど）。\n  小 論 文：配点 50 点\n         エネルギー変換科学に関して出題する。\n\n   ※ いずれの科目においても、電卓などの持ち込みは不可。",
      "conditionsOriginal": "【第２回選抜】\n 英  語：配点 100 点\n     TOEFL の公式スコアレポート（Official Score Report）あるいは TOEIC のデジタル公式認定\n     証(Official Score Certificate)の成績に基づいて、100 点満点に換算し、評価する。\n           （後述の「英語の学力評価について」を熟読すること。             ）",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-application-2",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー応用科学専攻",
      "admissionType": "general",
      "selectionName": "第２回選抜",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "エネルギー応用科学専攻：第２回選抜の英語・専門科目",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "エネルギー応用科学専攻：受験要領の続き・選答条件",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "令和9年度修士課程学生募集要項：専攻・出願資格",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "海外大学卒業者AAO・エネルギー社会／環境科学専攻受験要領",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/wp-content/uploads/2026/03/b9952df1a701b721b3e138f3310800ae.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "英語\n専門科目\n口頭試問",
      "scopeOriginal": "専門科目：配点 250 点\n       以下の４科目から１科目を選択\n       数学；微積分、ベクトル解析、線形代数、複素関数論、フーリエ級数、フーリエ変換とそ\n        の応用、常微分方程式、偏微分方程式の解法、ラプラス変換。\n       電磁気学；静電界と静磁界、定常電流、電流磁界、電磁力、電磁誘導、電磁界（マックス\n        ウェルの電磁方程式）。\n       材料基礎学；熱力学の基礎、2 元系状態図（活量、材料組織など）、電気化学平衡（電位\n        -pH 図を含む）、物質移動（拡散）の基礎。\n       熱流体工学；熱伝導、熱伝達、熱放射を含む伝熱工学の基礎事項全般。流体工学の基礎事\n        項全般。気体力学の初歩的事項。\n 口頭試問：配点 100 点\n本専攻志望理由、配属希望などのほか、研究履歴や勉学の内容、およびその理解の程度、\n        将来への展望等について試問する。",
      "conditionsOriginal": "【第２回選抜】\n 英  語：配点 100 点\n\n        TOEFL の公式スコアレポート（Official Score Report）あるいは TOEIC のデジタル公式認定\n        証(Official Score Certificate)の成績に基づいて、100 点満点に換算し、評価する。\n              （後述の「英語の学力評価について」を熟読すること。             ）",
      "internationalGeneral": true,
      "editorialNote": "第1回与第2回选拔分别保存；数学范围与专业课选答关系仅取自该次选拔的受験要領。完整英语成绩提交条件及例外请继续阅读官方对应页。"
    },
    {
      "id": "kyoto-energy-social-international",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー社会・環境科学専攻",
      "admissionType": "international",
      "selectionName": "International Energy Science Course – Admission Cycle II",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IESC 2027 Admission Cycle II: Master’s Program selection and eligibility",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "IESC Master’s Program: English score requirements and AAO",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "IESC 2027 official application guide",
          "url": "https://www.energy.kyoto-u.ac.jp/en/admission/admission-documentation/",
          "kind": "page"
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "course": "国際エネルギー科学コース",
      "subjectsOriginal": "First Screening Stage (Document Screening)\nSecond Screening Stage (Online Interview)",
      "editorialNote": "本条只录入文件MASTER’S PROGRAM段落。2027年度IESC修士只由这三个专攻提供；エネルギー応用科学専攻的博士招生不作为修士项目添加。学校该段没有公布专业笔试的细分范围。完整两阶段选考及资格条件可读官方PDF第5页，英语成绩的有效期、送达和免除条件请阅读第5—6页。"
    },
    {
      "id": "kyoto-energy-foundation-international",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー基礎科学専攻",
      "admissionType": "international",
      "selectionName": "International Energy Science Course – Admission Cycle II",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IESC 2027 Admission Cycle II: Master’s Program selection and eligibility",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "IESC Master’s Program: English score requirements and AAO",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "IESC 2027 official application guide",
          "url": "https://www.energy.kyoto-u.ac.jp/en/admission/admission-documentation/",
          "kind": "page"
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "course": "国際エネルギー科学コース",
      "subjectsOriginal": "First Screening Stage (Document Screening)\nSecond Screening Stage (Online Interview)",
      "editorialNote": "本条只录入文件MASTER’S PROGRAM段落。2027年度IESC修士只由这三个专攻提供；エネルギー応用科学専攻的博士招生不作为修士项目添加。学校该段没有公布专业笔试的细分范围。完整两阶段选考及资格条件可读官方PDF第5页，英语成绩的有效期、送达和免除条件请阅读第5—6页。"
    },
    {
      "id": "kyoto-energy-conversion-international",
      "universityId": "kyoto",
      "graduateSchool": "エネルギー科学研究科",
      "department": "エネルギー変換科学専攻",
      "admissionType": "international",
      "selectionName": "International Energy Science Course – Admission Cycle II",
      "entryYear": "2027年10月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "IESC 2027 Admission Cycle II: Master’s Program selection and eligibility",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "IESC Master’s Program: English score requirements and AAO",
          "url": "https://www.energy.kyoto-u.ac.jp/en/wp-content/uploads/2026/04/%E2%98%85-%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85IESC-CYII2027.10.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "IESC 2027 official application guide",
          "url": "https://www.energy.kyoto-u.ac.jp/en/admission/admission-documentation/",
          "kind": "page"
        },
        {
          "label": "エネルギー科学研究科 公式入試情報",
          "url": "https://www.energy.kyoto-u.ac.jp/jp/admission/admissionmasters/",
          "kind": "page"
        }
      ],
      "course": "国際エネルギー科学コース",
      "subjectsOriginal": "First Screening Stage (Document Screening)\nSecond Screening Stage (Online Interview)",
      "editorialNote": "本条只录入文件MASTER’S PROGRAM段落。2027年度IESC修士只由这三个专攻提供；エネルギー応用科学専攻的博士招生不作为修士项目添加。学校该段没有公布专业笔试的细分范围。完整两阶段选考及资格条件可读官方PDF第5页，英语成绩的有效期、送达和免除条件请阅读第5—6页。"
    },
    {
      "id": "waseda-math",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "数学応用数理専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：数学応用数理専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 1
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)微分積分\n(2)線形代数\n(3)基礎数理\n(4)専門科目\n面接選考（口述試験を含む）",
      "conditionsOriginal": "(1)微分積分、(2)線形代数および(3)基礎数理の 3 題を必須とし、(4)専門科目から 1 題を選択してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-mechanics",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "機械科学・航空宇宙専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：機械科学・航空宇宙専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 2
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "共通科目：(1)数学、(2)力学\n選択科目：(1)熱力学、(2)流体力学、(3)材料力学、(4)制御工学\n面接選考（口述試験を含む）",
      "scopeOriginal": "数学（微分積分、線形代数、複素関数、ベクトル解析、微分方程式、及び、これらを基礎とした応用数学）\n力学（静力学、質点及び質点系の力学、剛体の運動と力学、ダランベールの原理、エネルギーと変分原理、振動と安定性）\n熱力学（熱力学の第 1 法則と第 2 法則、熱力学サイクル、熱力学関数と平衡系のエネルギー保存則、伝熱の基礎）\n流体力学（静止流体の力学、ポテンシャル流れ、粘性流れ、圧縮性流れ、流体機械と管内流れ）\n材料力学（応力、ひずみ、材料の力学的性質、断面力、引張り、圧縮、ねじり、曲げ、組合せ応力、エネルギー原理、座屈）\n制御工学（制御理論、回路論、工学系のダイナミクス、モデリング、アナロジー、安定判別、補償、状態方程式などの基礎）",
      "conditionsOriginal": "「共通科目」は 2 題全てを解答してください。\n「選択科目」は、各科目 1 題ずつ出題されます。合計 2 科目 2 題を選択して解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-electronic-physical",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "電子物理システム学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：電子物理システム学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)力学\n(2)電磁気学\n(3)回路理論\n面接選考（口述試験を含む）",
      "scopeOriginal": "力学［解析力学：ラグランジュ形式（ラグランジアン、オイラー－ラグランジュ方程式）、ハミルトン形式（ハミルトニアン、正準方程式、ポアソン括弧）、極座標、球座標、量子力学：1 次元系に限定し、スピン自由度は含まない］\n電磁気学［電荷、静電界、導体系、誘電体、電流、磁界、電磁誘導、電磁界］\n回路理論［交流回路、回路に関する諸定理、二端子対網、分布定数回路、回路の過渡現象］",
      "conditionsOriginal": "出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-intermedia",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "表現工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：表現工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "共通科目（60 分）：小論文（表現工学に関すること）\n選択科目（90 分）\n【インターメディア芸術部門】デジタル映像表現、音楽表現、生命表現、環境アート表現、映像・映画表現\n【インターメディア工学部門】音響学、先端メディアと人間工学、知能システム、認知科学、メディア・コンテンツテクノロジー\n面接選考（口述試験を含む）",
      "conditionsOriginal": "・「インターメディア工学部門」2 問と「インターメディア芸術部門」1 問解答\n・「インターメディア芸術部門」2 問と「インターメディア工学部門」1 問解答\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "完整科目范围及跨部門选答条件保留在官方PDF第4页原表；必须跨芸術与工学两个部門，不能仅答一个部門。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-computer-communications",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "情報理工・情報通信専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：情報理工・情報通信専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)情報基礎\n(2)計算機システム\n(3)回路\n(4)情報通信ネットワーク\n面接選考（口述試験を含む）",
      "scopeOriginal": "情報基礎：プログラミング、情報数学、離散数学\n計算機システム：オペレーティングシステム、コンピュータアーキテクチャ\n回路：回路理論、電子回路、論理回路\n情報通信ネットワーク：情報通信ネットワーク",
      "conditionsOriginal": "試験時間は 150 分\n全 4 題を全問解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-materials",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "材料科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：材料科学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)数学\n(2)物理\n(3)化学\n(4)物質の構造\n(5)材料熱力学\n(6)材料電子論\n(7)機械材料学\n(8)材料力学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "(1)から(8)の中から 3 題選択して解答すること。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "8科目的完整范围保留在官方PDF第6页原表；不将英语AO博士募集误作本专攻的英语AO修士募集。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-architecture",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "建築学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：建築学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "問題一覧：建築学専攻（続き）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)建築歴史学\n(2)建築計画学\n(3)都市計画学\n(4)環境工学\n(5)建築構造学\n(6)建築生産学\n(7)設計製図\n面接選考（口述試験を含む）",
      "conditionsOriginal": "前記 7 科目の中から 5 科目を選択してください。ただし、以下の通り志望研究指導ごとに必ず受験する科目、及び選択する科目が定められています。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "必须按志望研究指導核对PDF第7页的必考／选考对应表；設計製図的作品提交条件在第8页，不能理解为任意七选五。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-modern-mechanical",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "総合機械工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：総合機械工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "共通科目（60 分）：小論文（機械工学に関すること）\n選択科目（90 分）：(1)熱と流れの工学、(2)材料の力学、(3)メカトロニクスとコントロール、(4)材料工学の基礎\n面接選考（口述試験を含む）",
      "conditionsOriginal": "解答する 2 題は同一科目でも可ですし、異なる科目から 1 題ずつでも可ですが、3 題以上解答した場合は採点の対象外とします。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "各选考科目的完整范围保留在官方PDF第9页原表。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-industrial-systems",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "経営システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：経営システム工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "問題一覧：経営システム工学専攻（続き）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "数理基礎：(1)微積分、(2)線形代数、(3)統計\n経営システム工学：情報数理応用、統計数理工学、システム論、経営数理工学、計画数理学、生産システム工学、ソフトウェア工学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "数理基礎全问作答；経営システム工学选答两题且一题须对应第一志望研究指導。完整原文范围、配点与选答关系请阅读PDF第10—11页原表。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-civil",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "建設工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：建設工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)構造力学\n(2)コンクリート構造学（コンクリート工学を含む）\n(3)水理学\n(4)水工学\n(5)水環境工学（環境工学を含む）\n(6)土質力学\n(7)都市・地域計画\n(8)交通計画\n(9)景観・デザイン\n面接選考（口述試験を含む）",
      "conditionsOriginal": "前記のうち 3 科目（6 題）を解答するものとします。ただし、以下の通り各自が志望する部門に該当する科目のうち 1 科目（2 題）は必ず選択してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "社会基盤部門、環境・防災部門、計画・マネジメント部門的必选科目对应关系请阅读PDF第12页原表。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-earth-resources",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "地球・環境資源理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：地球・環境資源理工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "資源地球科学、資源素材物質科学、鉱物学、火山学、地球化学、変成岩岩石学、構造地質学、堆積学、進化古生物学、物理探査工学、岩盤・石油生産工学、貯留層工学、環境資源修復工学、環境資源処理工学、素材プロセス工学、大気水圏環境化学、地圏環境科学、ライフサイクル環境評価学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "前記のうち 4 題を解答するものとしますが、各自が志望する研究指導科目は必ず選択してください。（願書に第 2, 3 志望を記入した場合は第 2, 3 志望の科目も選択すること）\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "「試験科目に包含される教科」「出題の対象となる各教科の単元」完整对应表保留在PDF第13页。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-business-design",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "経営デザイン専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：経営デザイン専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)統計学\n(2)オペレーションズリサーチ\n(3)生産マネジメント\n(4)品質・信頼性マネジメント\n(5)経済性マネジメント\n面接選考（口述試験を含む）",
      "conditionsOriginal": "全 5 題を全問解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "各科目的「出題内容」完整原表保留在PDF第14页。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-physics",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "物理学及応用物理学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：物理学及応用物理学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)数学一般（線形代数、複素解析、フーリエ解析、微分方程式など）\n(2)力学および電磁気学（回路を含む）\n(3)量子力学および熱・統計力学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "各科目 2 題ずつ、合計 6 題が出題されます。\n前記の 6 題より 4 題を選択し解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-chemistry-biochemistry",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "化学・生命化学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：化学・生命化学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)物理化学\n(2)有機化学\n(3)無機・分析化学\n(4)生命化学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "4 科目のうち 2 科目を選択し、解答してください。ただし、研究指導を希望する担当教員が所属する部門の試験科目は必ず選択してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "各科目范围及教材说明保留在官方PDF第16页完整原表，不摘写或补充教材范围。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-applied-chemistry",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "応用化学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：応用化学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)無機化学\n(2)有機化学\n(3)物理化学\n(4)化学工学\n(5)生物化学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "前記の 5 科目より 3 科目を選択して解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "完整「出題範囲」保留在PDF第17页；生物化学的范围栏原文为「－」，不补写范围。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-medical-bioscience",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "生命医科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：生命医科学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "(1)基礎工学\n(2)生命科学\n面接選考（口述試験を含む）",
      "scopeOriginal": "基礎工学：物理化学、分析化学（2 題出題）\n生命科学：分子生物学、細胞生物学（2 題出題）",
      "conditionsOriginal": "前記の 4 題より 2 題を選択して解答してください。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "口述试验的研究发表与质疑安排请阅读PDF第18页。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-electrical-bioscience",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "電気・情報生命専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：電気・情報生命専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "問題一覧：電気・情報生命専攻（続き）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "電磁気学、回路理論、情報工学、細胞生物学、分子生物学\n面接選考（口述試験を含む）",
      "scopeOriginal": "電磁気学：真空中の静電界、電流と電力、真空中の静磁界（定常磁界）、誘電体中の静電界、磁性体中の静磁界（定常磁界）、電磁誘導の法則とインダクタンス、Maxwell 方程式と電磁波\n回路理論：交流回路、回路に関する諸定理、二端子対網、分布定数回路、回路の過渡現象、フーリエ解析\n情報工学：情報量とエントロピー、情報源符号化と通信路符号化、フーリエ解析、統計的信号処理、動的システムの表現、安定性と応答特性、フィードバック制御系\n細胞生物学：細胞と細胞内器官、細胞を構成する分子、細胞内の反応、生体膜、細胞情報伝達、細胞分裂と細胞周期、細胞骨格と細胞運動\n分子生物学：生体分子（DNA、RNA、タンパク質）、染色体、DNA 複製、DNA 損傷と修復、DNA 組換え、転写と翻訳\n・キーワードは試験科目のおおよその内容を表します。",
      "conditionsOriginal": "前記の 5 科目より 2 科目を選択して解答してください。解答する科目を事前に届け出る必要はありません。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-integrative-bioscience",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "生命理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：生命理工学専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "問題一覧：生命理工学専攻（続き）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 22
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "①生命理工学専攻以外の専攻の試験問題で生命理工学専攻を受験\n②生命理工学専攻の試験問題で受験\n(1)細胞生物学、(2)分子生物学、(3)動物生理学、(4)発生生物学、(5)生態学、(6)進化生物学、(7)植物生理学、(8)生物物理学・生化学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "②生命理工学専攻の試験問題で受験\n試験時間は 90 分\n8 科目の試験問題から 2 科目を選択して受験\n出願後の変更は認めません。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "①的可选其他专攻及排除专攻请阅读PDF第21页原表；②的八科目规则不能套用到①。第2次口述与研究发表要求在第22页。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-nuclear",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "共同原子力専攻",
      "admissionType": "general",
      "selectionName": "修士課程一般入試（日本語学位プログラム）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士課程一般・飛び級／一貫制博士課程一般入試 問題一覧：共同原子力専攻",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 24
        },
        {
          "label": "問題一覧：共同原子力専攻（続き）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/02/9a2bb6110cacc859ff936b3240f82ee8.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "修士課程一般・飛び級入試要項：募集専攻・一般入試出願資格",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "一般入試：英語外部試験の出願条件・スコア提出方法",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "一般入試：筆記選考・面接選考（口述試験を含む）",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/12/826800a47141627813e63bbc65b8189b.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "subjectsOriginal": "①共同原子力専攻以外の専攻の試験問題で受験\n②共同原子力専攻の試験問題で受験\n(1)数学一般（微積分、微分方程式、変分法）\n(2)力学\n(3)電磁気学\n面接選考（口述試験を含む）",
      "conditionsOriginal": "②共同原子力専攻の試験問題で受験\n各科目 2 題ずつ、合計 6 題が出題されます。この 6 題より 4 題を選択し解答してください。\n出願後の変更は認めません。\n\n出願開始日の 2 年前以降\nTOEIC L&R：550 以上\nTOEFL iBT：57 以上 または スコアバンド 3.5 以上\nIELTS Academic：5.5 以上",
      "internationalGeneral": true,
      "editorialNote": "①的可选其他专攻名单保留在PDF第24页原表；不能把②的科目套用到①。口述课题请继续阅读第25页。 共通の面接選考（口述試験を含む）と、英語外部試験の出愿条件は募集要项对应页参照。英语成绩是出愿条件，未列为校内英语笔试。此版一般入试已于2026年7月实施；资料年度不表示仍在报名。"
    },
    {
      "id": "waseda-math-ao",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "数学応用数理専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Pure and Applied Mathematics。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-mechanics-ao",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "機械科学・航空宇宙専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Applied Mechanics and Aerospace Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-electronic-physical-ao",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "電子物理システム学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Electronic and Physical Systems。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-intermedia-ao",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "表現工学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Intermedia Studies。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-computer-communications-ao",
      "universityId": "waseda",
      "graduateSchool": "基幹理工学研究科",
      "department": "情報理工・情報通信専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Computer Science and Communications Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-architecture-ao",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "建築学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Architecture。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-modern-mechanical-ao",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "総合機械工学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Modern Mechanical Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-civil-ao",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "建設工学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Civil and Environmental Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-earth-resources-ao",
      "universityId": "waseda",
      "graduateSchool": "創造理工学研究科",
      "department": "地球・環境資源理工学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Earth Sciences, Resources and Environmental Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-physics-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "物理学及応用物理学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Pure and Applied Physics。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-chemistry-biochemistry-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "化学・生命化学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Chemistry and Biochemistry。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-applied-chemistry-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "応用化学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Applied Chemistry。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-medical-bioscience-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "生命医科学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Life Science and Medical Bioscience。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-electrical-bioscience-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "電気・情報生命専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Electrical Engineering and Bioscience。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-integrative-bioscience-ao",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "生命理工学専攻",
      "admissionType": "international",
      "selectionName": "AO Admission to English-based Graduate Program (Master’s Degree Program)",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "en",
      "sources": [
        {
          "label": "Application Guidelines：Screening Method",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "Number of Students to be Admitted：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "Applicant Qualifications：Master’s Degree Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "English Language Test Score accepted for AO Admissions to English-based Program",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2026/08/ApplicationGuidelines_20260818-1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        }
      ],
      "subjectsOriginal": "document review\nInterviews may be conducted as supplementary.",
      "conditionsOriginal": "TOEIC Listening &Reading (Above 800 recommended)\nTOEFL iBT (Above 79 or score band 4.5 recommended)\nIELTS Academic (Above 6.5 recommended)",
      "editorialNote": "英语学位修士项目，并非仅限外国籍的特别入试。官方英文专攻全称：Department of Integrative Bioscience and Biomedical Engineering。原则上文件审查，面试是否实施取决于志望教员／专攻；此处英语分数为推荐值，不是一般入试的最低出愿分数。出愿资格、英语证明的豁免和提交方法须阅读原文件；不收录博士或非学位研究生募集。"
    },
    {
      "id": "waseda-environment",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入学試験",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士一般入学試験要項：選考方法・選答条件",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/bccfd0f33f14bc832e01eb5afde6a1f1.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "修士一般入学試験要項：出題範囲・内容",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/bccfd0f33f14bc832e01eb5afde6a1f1.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入学試験：出願資格",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/bccfd0f33f14bc832e01eb5afde6a1f1.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/bccfd0f33f14bc832e01eb5afde6a1f1.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "英語・日本語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/bccfd0f33f14bc832e01eb5afde6a1f1.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "第１次試験（筆記）\n（１）工業熱学（主に理系出身者用）\n（２）環境・エネルギー政策等（主に文系出身者用）\n第２次試験（面接）",
      "scopeOriginal": "（１）工業熱学：熱力学の第一法則と第二法則、各種熱力学サイクル、定常流れ系のエネルギー・エクセルギーバランス、蒸気・伝熱の基礎\n（２）環境・エネルギー政策等：環境・エネルギー政策及びそれに関連する法制度、持続可能な発展のための企業・NPO・市民等の環境取組及びその普及に係る規格や認証システム 等",
      "conditionsOriginal": "２科目４題を出題します。４題の中から自由に２題を選択してください。\n\n英語能力証明書（全員）\nTOEIC L&R、TOEFL-iBT、IELTS Academic\n日本語能力証明書（外国籍者のみ）\n日本語能力試験（JLPT）N2 合格以上\n日本留学試験（EJU）の「日本留学試験成績通知書」",
      "internationalGeneral": true,
      "editorialNote": "一般入试允许符合条件的海外学历者申请。外国籍申请者的日语证明可使用JLPT或EJU；无法参加这两项考试时的替代证明与完整提交要求保留在PDF第12—13页。英语证明没有套用三理工研究科的最低分数。"
    },
    {
      "id": "waseda-environment-ao-7",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "general",
      "selectionName": "修士課程 ＡＯ入学試験（7月入試）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士ＡＯ入学試験：選考方法・プレゼンテーション",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "修士ＡＯ入学試験：入学時期・国内／国外出願の条件",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士ＡＯ入学試験：出願資格",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "英語能力証明書（続き）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "日本語能力証明書（外国籍者のみ）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "第１次試験（書類審査）\n第２次試験（口述試験）\nプレゼンテーション",
      "scopeOriginal": "「活動実績概要書」、「志望理由および自己アピール」、「入学後の研究計画」",
      "conditionsOriginal": "発表時間は10分以内\n英語能力証明書（全員）\nTOEIC L&R、TOEFL-iBT、IELTS Academic\n日本語能力証明書（外国籍者のみ）\n日本語能力試験（JLPT）N2 合格以上\n日本留学試験（EJU）の「日本留学試験成績通知書」",
      "internationalGeneral": true,
      "editorialNote": "此为日语AO选拔，与三个理工学研究科的英语AO项目不同。7月、11月、2月只可选一次出愿；2月不接受日本国外居住者。外国籍申请者的JLPT／EJU与替代证明须阅读原文件。"
    },
    {
      "id": "waseda-environment-ao-11",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "general",
      "selectionName": "修士課程 ＡＯ入学試験（11月入試）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士ＡＯ入学試験：選考方法・プレゼンテーション",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "修士ＡＯ入学試験：入学時期・国内／国外出願の条件",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士ＡＯ入学試験：出願資格",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "英語能力証明書（続き）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "日本語能力証明書（外国籍者のみ）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "第１次試験（書類審査）\n第２次試験（口述試験）\nプレゼンテーション",
      "scopeOriginal": "「活動実績概要書」、「志望理由および自己アピール」、「入学後の研究計画」",
      "conditionsOriginal": "発表時間は10分以内\n英語能力証明書（全員）\nTOEIC L&R、TOEFL-iBT、IELTS Academic\n日本語能力証明書（外国籍者のみ）\n日本語能力試験（JLPT）N2 合格以上\n日本留学試験（EJU）の「日本留学試験成績通知書」",
      "internationalGeneral": true,
      "editorialNote": "此为日语AO选拔，与三个理工学研究科的英语AO项目不同。7月、11月、2月只可选一次出愿；2月不接受日本国外居住者。外国籍申请者的JLPT／EJU与替代证明须阅读原文件。"
    },
    {
      "id": "waseda-environment-ao-2",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "general",
      "selectionName": "修士課程 ＡＯ入学試験（2月入試）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "修士ＡＯ入学試験：選考方法・プレゼンテーション",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "修士ＡＯ入学試験：入学時期・国内／国外出願の条件",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士ＡＯ入学試験：出願資格",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "英語能力証明書（続き）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "日本語能力証明書（外国籍者のみ）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/03/f4a87a430f2215cfde2d2c92afbd3bd8.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "第１次試験（書類審査）\n第２次試験（口述試験）\nプレゼンテーション",
      "scopeOriginal": "「活動実績概要書」、「志望理由および自己アピール」、「入学後の研究計画」",
      "conditionsOriginal": "発表時間は10分以内\n日本国外在住者は、2月入試には出願できません。\n英語能力証明書（全員）\nTOEIC L&R、TOEFL-iBT、IELTS Academic\n日本語能力証明書（外国籍者のみ）\n日本語能力試験（JLPT）N2 合格以上\n日本留学試験（EJU）の「日本留学試験成績通知書」",
      "internationalGeneral": true,
      "editorialNote": "此为日语AO选拔，与三个理工学研究科的英语AO项目不同。7月、11月、2月只可选一次出愿；2月不接受日本国外居住者。外国籍申请者的JLPT／EJU与替代证明须阅读原文件。"
    },
    {
      "id": "waseda-environment-foreign-5",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考入学試験（5月入試）",
      "entryYear": "2026年9月・2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "外国人特別選考：選考方法・入学時期",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "外国人特別選考：修士課程の出願資格（海外協定校）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "外国人特別選考：5月／11月入試の期間",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "外国人特別選考：英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "外国人特別選考：英語・日本語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "提出された出願書類を基に合否判定を行います。",
      "conditionsOriginal": "出願時に日本国外に在住の外国人\n出願時に早稲田大学の海外協定校に在学\n日本語能力試験 N1 以上の語学能力",
      "editorialNote": "使用2026年5月27日更新第二版，仅收录修士段落。海外协定校条件与N1要求不能沿用通常一般／AO入试的N2条件；两次试验只能申请一次。英语证明和完整资格条件请阅读原文件。"
    },
    {
      "id": "waseda-environment-foreign-11",
      "universityId": "waseda",
      "graduateSchool": "環境・エネルギー研究科",
      "department": "環境・エネルギー専攻",
      "admissionType": "international",
      "selectionName": "外国人特別選考入学試験（11月入試）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "外国人特別選考：選考方法・入学時期",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "外国人特別選考：修士課程の出願資格（海外協定校）",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "外国人特別選考：5月／11月入試の期間",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "外国人特別選考：英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "外国人特別選考：英語・日本語能力証明書",
          "url": "https://www.waseda.jp/fsci/gweee/assets/uploads/2026/05/dcaa7c5fd7e3d47afb4438ea8da113f4.pdf",
          "kind": "pdf",
          "pdfPage": 7
        },
        {
          "label": "環境・エネルギー研究科要項2026：専攻正式名称",
          "url": "https://fsci-wu.w.waseda.jp/handbooks/2026/WEEE/pageindices/index47.html",
          "kind": "page"
        }
      ],
      "subjectsOriginal": "提出された出願書類を基に合否判定を行います。",
      "conditionsOriginal": "出願時に日本国外に在住の外国人\n出願時に早稲田大学の海外協定校に在学\n日本語能力試験 N1 以上の語学能力",
      "editorialNote": "使用2026年5月27日更新第二版，仅收录修士段落。海外协定校条件与N1要求不能沿用通常一般／AO入试的N2条件；两次试验只能申请一次。英语证明和完整资格条件请阅读原文件。"
    },
    {
      "id": "waseda-ips-apr",
      "universityId": "waseda",
      "graduateSchool": "情報生産システム研究科",
      "department": "情報生産システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（国内出願・国外出願）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "入学試験要項：国内／国外出願・選考方法",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "入学試験要項：修士課程出願資格・一般入試",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "入学試験要項：募集専攻・入学日程",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "英語外部試験の受付・提出条件",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "第2次選考（面接試問）実施方法",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/03/d55c85c4d265fbcad8c91e7e3425ab6e.pdf",
          "kind": "pdf",
          "pdfPage": 14
        }
      ],
      "subjectsOriginal": "第 1 次選考：書類審査\n第 2 次選考：面接試問",
      "conditionsOriginal": "第 2 次選考（面接試問）は、第 1 次選考において面接が必要と判断された者を対象に実施します。\n面接試問は、原則としてオンラインにて実施します。\n使用する言語は日本語または英語とします。",
      "internationalGeneral": true,
      "editorialNote": "国内／国外出愿按居住地划分，均没有国籍限制；同为一般入试，不另造外国人入试。文件审查可直接最终合格，面试仅针对被要求面试者。英语外部成绩、豁免与提交方式请阅读PDF第12—13页；TOEIC只接受日本国内受验成绩。研究分野没有误写为三个独立专攻。"
    },
    {
      "id": "waseda-ips-sep",
      "universityId": "waseda",
      "graduateSchool": "情報生産システム研究科",
      "department": "情報生産システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（国内出願・国外出願）",
      "entryYear": "2027年9月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "入学試験要項：国内／国外出願・選考方法",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "入学試験要項：修士課程出願資格・一般入試",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "入学試験要項：募集専攻・入学日程",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 3
        },
        {
          "label": "英語能力証明書",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "英語外部試験の受付・提出条件",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "第2次選考（面接試問）実施方法",
          "url": "https://www.waseda.jp/fsci/gips/assets/uploads/2026/02/a7cf39913e02c53c022cd2ae9bda6c2e.pdf",
          "kind": "pdf",
          "pdfPage": 14
        }
      ],
      "subjectsOriginal": "第 1 次選考：書類審査\n第 2 次選考：面接試問",
      "conditionsOriginal": "第 2 次選考（面接試問）は、第 1 次選考において面接が必要と判断された者を対象に実施します。\n面接試問は、原則としてオンラインにて実施します。\n使用する言語は日本語または英語とします。",
      "internationalGeneral": true,
      "editorialNote": "国内／国外出愿按居住地划分，均没有国籍限制；同为一般入试，不另造外国人入试。文件审查可直接最终合格，面试仅针对被要求面试者。英语外部成绩、豁免与提交方式请阅读PDF第12—13页；TOEIC只接受日本国内受验成绩。研究分野没有误写为三个独立专攻。"
    },
    {
      "id": "waseda-nano-closed",
      "universityId": "waseda",
      "graduateSchool": "先進理工学研究科",
      "department": "ナノ理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 募集停止",
      "entryYear": "2027年4月入学以降",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "大学院先進理工学研究科ナノ理工学専攻 修士課程の募集停止について",
          "url": "https://www.waseda.jp/fsci/assets/uploads/2025/10/65c76a4b3f4ece578aeaf5d1ceaf3ff4.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "conditionsOriginal": "2027 年 4 月入学の入学試験以降の募集を停止します。",
      "publicationStatus": "closed",
      "editorialNote": "修士招生停止通知，不能作为可报考的考试要求。2026年9月旧题目不套用到2027年4月；博士后期继续招生也不能当作修士招生。"
    },
    {
      "id": "tus-sci-math",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "数学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：数学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "一般入試：数学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門基礎科目、専門科目\n口頭試問\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "専門基礎科目：微分積分、線形代数、集合と位相\n専門科目：\n代数系：群、環、体、加群、ガロア理論\n幾何系：曲線・曲面論、微分幾何、位相幾何\n解析系（確率解析を含む）：無限級数、関数論、微分方程式、関数解析など\n口頭試問：筆記試験の出題範囲全体、志望研究室の研究分野",
      "conditionsOriginal": "専門基礎科目：全ての問題を解答\n専門科目：希望する指導教員が属する系の問題を２題選択して解答\nTOEIC：TOEIC IPも可、TOEIC Bridgeは不可\nTOEFL：TOEFL iBT、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "口頭試問及び面接対象者は笔试当天公布，详见PDF第8页。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-sci-physics",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "物理学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：物理学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "一般入試：物理学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：物理数学、力学、電磁気学、熱・統計力学、量子力学\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "物理数学、力学、電磁気学：線形代数、微分・積分の計算、微分方程式、ベクトル解析、フーリエ級数、複素関数、特殊関数、質点の運動、剛体の運動、解析力学、マクスウェル方程式、電場・磁場の計算、電場・磁場中での電荷の運動、定常電流、電磁誘導、電磁波など\n熱・統計力学、量子力学：熱力学の法則、カルノーサイクル、気体分子運動論、カノニカル・グランドカノニカル分布、量子統計、シュレーディンガー方程式、波動関数、演算子の性質、角運動量、スピン、摂動論など",
      "conditionsOriginal": "TOEIC：TOEIC IPも可、TOEIC Bridgeは不可\nTOEFL：TOEFL iBT、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "面接対象者は笔试当天公布，详见PDF第8页。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-sci-chemistry",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "化学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：化学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 12
        },
        {
          "label": "一般入試：化学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "物理化学、無機及び分析化学、有機化学",
      "conditionsOriginal": "TOEIC：TOEIC IPも可、TOEIC Bridgeは不可\nTOEFL：TOEFL iBT、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-sci-applied-math",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "応用数学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：応用数学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "一般入試：応用数学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門基礎科目、専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "専門基礎科目：微積分、線形代数\n専門科目：数理統計学、計算数学、微分方程式、最適化理論、代数学など",
      "conditionsOriginal": "専門基礎科目：全ての問題を解答\n専門科目：計４題以上の中から２題選択\nTOEIC：TOEIC IPも可、TOEIC Bridgeは不可\nTOEFL：TOEFL iBT、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "面接対象者は笔试当天公布，详见PDF第8页。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-sci-education",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "科学教育専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試［卒業見込者（含既卒者）対象］",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：科学教育専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 13
        },
        {
          "label": "一般入試：科学教育専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 8
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "口頭試問\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "事前に課した小論文についての面接",
      "conditionsOriginal": "TOEIC：TOEIC IPも可、TOEIC Bridgeは不可\nTOEFL：TOEFL iBT、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "此条收录卒業見込者（含既卒者）対象选拔；现职教员选拔另有条件，不能套用此条。小论文课题须向志望指導教员／专攻主任获取，不虚构统一范围。科学教育专攻追加资格条件见PDF第6页；外国人留学生试验募集名单未列此专攻。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-eng-architecture",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "建築学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：建築学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入試：建築学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "「建築計画、建築環境、建築構造、即日設計」の４科目（４科目のうち３科目を出願時に選択）",
      "conditionsOriginal": "専門科目Aは４科目の中から「建築計画」、「建築環境」、「建築構造」の３科目を選択\n専門科目Bは「即日設計」と即日設計以外の３科目から２科目を選択\nTOEICはListening & Reading Testに限る",
      "internationalGeneral": true,
      "editorialNote": "一般入试A／B与外国人留学生试验的志望研究分野一科目选拔不同。试验科目选择须在出愿时申报。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-eng-chemistry",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "工業化学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：工業化学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入試：工業化学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "物理化学、無機及び分析化学、有機化学、化学工学",
      "conditionsOriginal": "物理化学２問、無機及び分析化学２問、有機化学２問、化学工学２問の計８問のうちから６問を選択\nTOEICはListening & Reading Testに限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-eng-electrical",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "電気工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：電気工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入試：電気工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：電磁気学、電気回路、電子回路\n面接\nTOEICのスコア",
      "scopeOriginal": "電磁気学：静電界、静磁界、静電容量、インダクタンス、電磁誘導、電磁波\n電気回路：直流回路全般、交流回路全般、過渡現象全般、分布定数回路全般\n電子回路：アナログ回路、ディジタル回路",
      "conditionsOriginal": "TOEICはListening & Reading Test、Listening & Reading Test IPテストに限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-eng-information",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "情報工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：情報工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入試：情報工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：数学、専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "数学：微積分、線形代数、離散数学\n専門科目：（1）確率統計、（2）論理回路・情報ネットワーク、（3）データ構造とアルゴリズム・プログラミング",
      "conditionsOriginal": "左記（1）～（3）からそれぞれ１問（計３問）を出題する\nTOEICはListening & Reading Test、Listening & Reading Test IPテストに限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-eng-mechanical",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "機械工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：機械工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 14
        },
        {
          "label": "一般入試：機械工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "材料力学、熱力学\n機械力学、流体力学",
      "conditionsOriginal": "TOEICはListening & Reading Test、Listening & Reading Test IPテストに限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-math",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "数理科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：数理科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "一般入試：数理科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：数学Ⅰ、数学Ⅱ\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "数学Ⅰ：線形代数、微積分、集合と位相\n数学Ⅱ：代数学、幾何学、解析学",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-physics",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "先端物理学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：先端物理学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "一般入試：先端物理学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：物理学Ⅰ、物理学Ⅱ\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "物理学Ⅰ：力学、電磁気学\n物理学Ⅱ：量子力学、熱・統計力学",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-biology",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "生命生物科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：生命生物科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "一般入試：生命生物科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "細胞生物学、分子生物学、生化学を中心とした生物科学分野",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-architecture",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "建築学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：建築学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 15
        },
        {
          "label": "一般入試：建築学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "建築計画学、建築設計学、建築史学、都市計画学、建築構造学、建築構造力学、建築材料学、建築防災安全工学、建築環境工学",
      "conditionsOriginal": "1. ９科目の中から専攻する研究分野の１科目を必須問題とする\n2. ９科目の中から２科目を選択問題とする\n｢建築設計学｣以外は上記第１項と第２項での重複受験を認める\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "建築設計学的作品、携带用品及时间安排请同时阅读原表。不得套用工学研究科建築学専攻的A／B规则。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-chemistry",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "先端化学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：先端化学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "一般入試：先端化学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "無機化学、分析化学、有機化学、物理化学",
      "conditionsOriginal": "左記のうち、専攻部門の科目（第一志望）を含む３科目を選択\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-electrical",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "電気電子情報工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：電気電子情報工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "一般入試：電気電子情報工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：電気数学、電磁気学、電気回路、電子回路\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "電気数学：線形代数、ベクトル解析、微分積分、微分方程式、複素関数、フーリエ級数、フーリエ／ラプラス変換\n電磁気学：電界・磁界、静電容量、インダクタンス、電磁誘導、マクスウェルの方程式、電磁波\n電気回路：直流回路、交流回路、回路に関する諸定理、回路の過渡現象、交流電力、二端子対回路、三相交流回路、ひずみ波交流回路、ラプラス変換を用いた回路解析（伝達関数、極と応答、周波数応答）\n電子回路：能動素子・等価回路、線形回路・非線形回路、増幅回路・演算増幅器、負帰還回路・正帰還回路、周波数特性・伝達関数・過渡応答特性",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-mechanical",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "機械航空宇宙工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：機械航空宇宙工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "一般入試：機械航空宇宙工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目Ⅰ、専門科目Ⅱ、専門科目Ⅲ、専門科目Ⅳ\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "専門科目Ⅰ：材料力学\n専門科目Ⅱ：機械力学\n専門科目Ⅲ：熱力学\n専門科目Ⅳ：流体力学",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "四个专业科目按一般入试日程实施，不能沿用留学生选拔的四科选二规则。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-civil",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：社会基盤工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "一般入試：社会基盤工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：数学、専門科目、小論文\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "数学：微分積分学、代数学",
      "conditionsOriginal": "数学、専門科目の出題範囲に記載している科目は全て必須\n土木技術検定試験の結果が分かる「スコアレポート」の画面のコピーを出願時に提出することにより、数学および専門科目の受験に代えることができる。\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "专业范围的測量学、コンクリート工学、環境工学、土木計画学、材料力学、土質力学、水理学完整单元表保留在PDF第17页原表。土木技術検定的替代仅对应数学与专业科目，不扩大为全部试验免除。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-information",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "情報理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：情報理工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 17
        },
        {
          "label": "一般入試：情報理工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 10
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "線形代数、微分積分、確率統計、分子生物学、分子細胞生物学、情報数学（測度、代数）、統計数学（統計学、確率論）、計算機システム（データベースシステム、情報通信ネットワーク）、基礎理論（アルゴリズムとデータ構造、論理数学）、社会システム工学、情報システム工学、生産システム工学、管理システム工学",
      "conditionsOriginal": "13科目の中から４科目を選択\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "2027年4月新设专攻；不沿用已停止招生的情報計算科学／経営システム工学旧名称。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-fire-summer",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "国際火災科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（夏期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：国際火災科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "一般入試：国際火災科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：数学、小論文\n面接\nTOEIC、TOEFL又はIELTSのスコア",
      "scopeOriginal": "数学：１．式と証明・高次方程式、２．集合と論理、３．図形と方程式・不等式、４．いろいろな関数、５．微分と積分（多項式関数に限る）、６．場合の数と確率、７．数列、８．ベクトル・行列\n小論文：火災科学に関する課題に対して論理的な思考能力・表現力を問う",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可\nIELTS：IELTSアカデミック・モジュールに限る",
      "internationalGeneral": true,
      "editorialNote": "2027年度的微分积分范围限定多项式函数；2028年度预告不应用于此年度。冬期一般入试2027年2月20日实施，与冬期留学生试验2027年1月7日不同。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-creative-fire-winter",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "国際火災科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（冬期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：国際火災科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "一般入試：国際火災科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "2026年8月3日通知：冬期一般入試のTOEFL iBTスコア証明書提出方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/TOEFLiBT_GraduateAdmission_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "筆記試験：数学、小論文\n面接\nTOEIC、TOEFL又はIELTSのスコア",
      "scopeOriginal": "数学：１．式と証明・高次方程式、２．集合と論理、３．図形と方程式・不等式、４．いろいろな関数、５．微分と積分（多項式関数に限る）、６．場合の数と確率、７．数列、８．ベクトル・行列\n小論文：火災科学に関する課題に対して論理的な思考能力・表現力を問う",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る。ただし、TOEIC IPオンラインは不可\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可\nIELTS：IELTSアカデミック・モジュールに限る",
      "internationalGeneral": true,
      "editorialNote": "2027年度的微分积分范围限定多项式函数；2028年度预告不应用于此年度。冬期一般入试2027年2月20日实施，与冬期留学生试验2027年1月7日不同。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-advanced-electronic",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "電子システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：電子システム工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "一般入試：電子システム工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：電気回路・電磁気学、応用数学\n面接\nTOEICのスコア",
      "scopeOriginal": "電気回路・電磁気学（直流回路、交流回路、回路に関する諸定理、回路の過渡現象、二端子対回路、静電場、定常電流、静磁場、電磁誘導、マクスウェルの方程式）\n応用数学（積分、微分、線形代数、微分方程式、ベクトル解析、複素関数、フーリエ解析（フーリエ級数・積分・変換、ラプラス変換））",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-advanced-materials",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "マテリアル創成工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：マテリアル創成工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "一般入試：マテリアル創成工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "物理（力学、電磁気学、熱・統計力学、量子力学）、化学（有機化学、無機化学、物理化学、高分子化学）",
      "conditionsOriginal": "物理より３題、化学より３題の計６題から４題選択\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-advanced-life",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "生命システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：生命システム工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "一般入試：生命システム工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEICのスコア",
      "scopeOriginal": "有機化学、物理化学、分子生物学・生化学",
      "conditionsOriginal": "有機化学、物理化学、分子生物学・生化学からの計７題中３題選択\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-advanced-physics",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "物理工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：物理工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "一般入試：物理工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "口頭試問：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "力学・解析力学、電磁気学、量子力学、熱・統計力学",
      "conditionsOriginal": "力学・解析力学から１題、電磁気学から１題、量子力学、熱・統計力学から１題を試問する\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る\nTOEFL：TOEFL iBT（Home Editionは不可）、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "专业评价为口头试问，不虚构专业笔试，也不套用2026年度的实验题选项。 英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-advanced-design",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "機能デザイン工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：機能デザイン工学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "一般入試：機能デザイン工学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "物理（質点力学、電磁気学）、化学（物質化学、有機・無機化学）、生物（基礎生物学、生化学）",
      "conditionsOriginal": "物理より２題、化学より２題、生物より２題の計６題から４題選択\nTOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る\nTOEFL：TOEFL iBT（Home Editionは不可）、ITPのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-life-summer",
      "universityId": "tus",
      "graduateSchool": "生命科学研究科",
      "department": "生命科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（夏期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：生命科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "一般入試：生命科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "生命科学（分子細胞生物学、免疫学、遺伝学、生化学）の基礎知識および考察力",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-life-winter",
      "universityId": "tus",
      "graduateSchool": "生命科学研究科",
      "department": "生命科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 一般入試（冬期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試（8月3日更新版）：生命科学専攻 試験科目・出題範囲等",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "一般入試：生命科学専攻 選考日程・方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 11
        },
        {
          "label": "修士課程一般入試：出願資格・事前連絡",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "2026年8月3日通知：冬期一般入試のTOEFL iBTスコア証明書提出方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/TOEFLiBT_GraduateAdmission_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "筆記試験：専門科目\n面接\nTOEIC、TOEFLのスコア",
      "scopeOriginal": "生命科学（分子細胞生物学、免疫学、遺伝学、生化学）の基礎知識および考察力",
      "conditionsOriginal": "TOEIC：Listening & Reading Test（公開テストまたはIPテスト）に限る\nTOEFL：iBTテスト（Home Editionは不可）、ITPテストのいずれも可",
      "internationalGeneral": true,
      "editorialNote": "英语评价使用外部成绩，受付与提交条件按本专攻原表核对；不补写未公布的最低分数。一般入试资格包含符合条件的海外学历者；事前联系志望教员要求见PDF第6页。资料适用2027年4月入学，不表示该日程仍在报名。"
    },
    {
      "id": "tus-sci-math-foreign",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "数学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 数学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：理学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 23
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：数学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "未用一般入试的两题选答规则补写本试验要求。 第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-sci-physics-foreign",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "物理学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 物理学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：理学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 23
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：物理数学、力学、熱・統計力学、電磁気学、量子力学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-sci-chemistry-foreign",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "化学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 化学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：理学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 23
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：物理化学、無機及び分析化学、有機化学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "conditionsOriginal": "筆記試験は免除することがある。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-sci-applied-math-foreign",
      "universityId": "tus",
      "graduateSchool": "理学研究科",
      "department": "応用数学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 応用数学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：理学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 23
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：数学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-eng-architecture-foreign",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "建築学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 建築学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目\n英語（筆記）\n面接",
      "scopeOriginal": "建築計画・設計製図、建築環境、建築構造のうち、希望する指導教員の研究分野に関する１科目",
      "conditionsOriginal": "選択科目はあらかじめ出願時に届け出る。\n試験場において選択科目の変更はできない。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。此专攻采用校内英语笔试，未改写为外部成绩评价。"
    },
    {
      "id": "tus-eng-chemistry-foreign",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "工業化学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 工業化学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 24
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：一般化学及び希望専攻分野に関連する専門科目\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-eng-electrical-foreign",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "電気工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 電気工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 24
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：電磁気学、電気回路、電子回路（ディジタル回路を含む）\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-eng-information-foreign",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "情報工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 情報工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 24
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n数学、専門科目\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "１．数学：微積分、線形代数、離散数学\n２．専門科目：⑴確率統計、⑵論理回路・情報ネットワーク、⑶データ構造とアルゴリズム・プログラミング",
      "conditionsOriginal": "⑴～⑶からそれぞれ１問（計３問）を出題する。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-eng-mechanical-foreign",
      "universityId": "tus",
      "graduateSchool": "工学研究科",
      "department": "機械工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 機械工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 19
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 24
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n小論文、専門科目\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "材料力学、流体力学、熱力学、機械力学のうち希望する指導教員の研究分野に関する１科目",
      "conditionsOriginal": "選択科目はあらかじめ出願時に届け出る。\n試験場において選択科目の変更はできない。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-math-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "数理科学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 数理科学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：数学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-physics-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "先端物理学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 先端物理学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目：物理学\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-biology-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "生命生物科学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 生命生物科学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関連する基礎及び専攻科目の筆記試験と口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-architecture-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "建築学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 建築学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n１．筆記試験\n２．口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "筆記試験：希望専攻分野の科目及び小論文\n口頭試問：希望専攻分野に関連する事項",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-chemistry-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "先端化学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 先端化学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "無機化学、分析化学、有機化学、物理化学のうち第一志望の専攻部門の科目を含む３科目選択",
      "conditionsOriginal": "選択科目はあらかじめ出願時に届け出る。\n試験場において選択科目の変更はできない。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-electrical-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "電気電子情報工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 電気電子情報工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関連する基礎及び専門科目の筆記試験と口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-mechanical-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "機械航空宇宙工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 機械航空宇宙工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n専門科目\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "材料力学、流体力学、熱力学、機械力学のうちから２科目選択",
      "conditionsOriginal": "選択科目はあらかじめ出願時に届け出る。試験場において選択科目の変更はできない。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-civil-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "社会基盤工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 社会基盤工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関連する基礎及び専門科目の筆記試験と口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-information-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "情報理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 情報理工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 20
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：創域理工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関する口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "专业评价为口头试问；一般入试的13科目选4不能套用到本选拔。 第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-advanced-electronic-foreign",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "電子システム工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 電子システム工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：先進工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関する口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "专业与面试使用日本语；日本语沟通能力的评价见原表。 第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-advanced-materials-foreign",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "マテリアル創成工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 マテリアル創成工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：先進工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関する口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-advanced-life-foreign",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "生命システム工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 生命システム工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：先進工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n希望専攻分野に関する口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "专业与面试使用日本语；日本语沟通能力的评价见原表。 第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-advanced-physics-foreign",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "物理工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 物理工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：先進工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "力学・解析力学から１題、電磁気学から１題、量子力学、熱・統計力学から１題を口頭試問する。",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-advanced-design-foreign",
      "universityId": "tus",
      "graduateSchool": "先進工学研究科",
      "department": "機能デザイン工学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 機能デザイン工学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 21
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：先進工学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 25
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "scopeOriginal": "物理（質点力学、電磁気学）、化学（物質化学、有機・無機化学）、生物（基礎生物学、生化学）",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-life-foreign",
      "universityId": "tus",
      "graduateSchool": "生命科学研究科",
      "department": "生命科学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度外国人留学生入学試験：修士課程 生命科学専攻 第二次選考科目",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 22
        },
        {
          "label": "外国人留学生試験：第一次選考方法・第二次選考出願条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 16
        },
        {
          "label": "外国人留学生試験：修士課程出願資格",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "外国人留学生試験：修士課程第二次選考日程",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 18
        },
        {
          "label": "外国人留学生試験：生命科学研究科 修士課程 外部英語試験の受付・提出条件",
          "url": "https://www.tus.ac.jp/admissions/uploads/2026/2027_foreign_student_grad.pdf",
          "kind": "pdf",
          "pdfPage": 27
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "第一次選考：出願書類により審査\n第二次選考：\n生命科学分野に関する口頭試問\n面接\nTOEICまたはTOEFLのスコアによる英語能力の評価",
      "editorialNote": "第一次文件审查通过后方可申请第二次。一般入试的题数、范围和外语受付条件不套用于此选拔；完整资格及专业／面试使用语言保留在官方对应页。2027年度留学生试验不接受TOEIC IP／TOEFL ITP；不设未经官方公布的分数门槛。"
    },
    {
      "id": "tus-creative-fire-summer-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "国際火災科学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験（夏期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "国際火災科学専攻修士外国人留学生入試：夏期／冬期日程・出題範囲",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：語学スコアの受付",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：出願資格",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：TOEFLスコア提出方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "数学、小論文、面接\n提出書類の審査\nTOEIC、TOEFL又はIELTSのスコアによる英語能力の評価",
      "scopeOriginal": "数学出題範囲：１．式と証明・高次方程式、２．集合と論理、３．図形と方程式・不等式、４．いろいろな関数、５．微分・積分（多項式関数に限る）、６．場合の数と確率、７．数列、８．ベクトル・行列\n小論文出題範囲：火災科学に関する課題に対して論理的な思考能力・表現力を問う。",
      "conditionsOriginal": "TOEIC：Listening & Reading Testは公開テストに限る。IPテストは不可\nTOEFL：iBTテストに限る。ただしiBT Home Editionは不可。また、ITPテストは不可\nIELTS：IELTSアカデミック・モジュールに限る",
      "editorialNote": "本专攻修士留学生选拔使用独立募集要项，不能读取共通外国人要项中的国際火災科学博士条目。冬期留学生试验2027年1月7日实施，与一般入试冬期2027年2月20日不同。2027年度数学微分积分仍限定多项式函数；2028年度预告不应用于此年度。"
    },
    {
      "id": "tus-creative-fire-winter-foreign",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "国際火災科学専攻",
      "admissionType": "international",
      "selectionName": "修士課程 外国人留学生試験（冬期日程）",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "国際火災科学専攻修士外国人留学生入試：夏期／冬期日程・出題範囲",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 5
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：語学スコアの受付",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 6
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：出願資格",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 4
        },
        {
          "label": "国際火災科学専攻修士外国人留学生入試：TOEFLスコア提出方法",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_foreign_student_shushi_globalfire.pdf",
          "kind": "pdf",
          "pdfPage": 9
        },
        {
          "label": "2027年度修士外国人留学生試験：TOEFL ITP・TOEIC IPのスコアは不可",
          "url": "https://www.tus.ac.jp/admissions/file/2026/20260403_0103.pdf",
          "kind": "pdf",
          "pdfPage": 1
        }
      ],
      "subjectsOriginal": "数学、小論文、面接\n提出書類の審査\nTOEIC、TOEFL又はIELTSのスコアによる英語能力の評価",
      "scopeOriginal": "数学出題範囲：１．式と証明・高次方程式、２．集合と論理、３．図形と方程式・不等式、４．いろいろな関数、５．微分・積分（多項式関数に限る）、６．場合の数と確率、７．数列、８．ベクトル・行列\n小論文出題範囲：火災科学に関する課題に対して論理的な思考能力・表現力を問う。",
      "conditionsOriginal": "TOEIC：Listening & Reading Testは公開テストに限る。IPテストは不可\nTOEFL：iBTテストに限る。ただしiBT Home Editionは不可。また、ITPテストは不可\nIELTS：IELTSアカデミック・モジュールに限る",
      "editorialNote": "本专攻修士留学生选拔使用独立募集要项，不能读取共通外国人要项中的国際火災科学博士条目。冬期留学生试验2027年1月7日实施，与一般入试冬期2027年2月20日不同。2027年度数学微分积分仍限定多项式函数；2028年度预告不应用于此年度。"
    },
    {
      "id": "tus-creative-computing-closed",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "情報計算科学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 募集停止",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試：旧2専攻の募集停止・現行専攻名",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "conditionsOriginal": "創域理工学研究科情報計算科学専攻および経営システム工学専攻は、2026 年度入学者を最後に募集を停止します。",
      "publicationStatus": "closed",
      "editorialNote": "2027年度不列为可报考专攻。新設「情報理工学専攻」使用独立条目和2027年度要项；不沿用旧专攻的科目。"
    },
    {
      "id": "tus-creative-management-closed",
      "universityId": "tus",
      "graduateSchool": "創域理工学研究科",
      "department": "経営システム工学専攻",
      "admissionType": "general",
      "selectionName": "修士課程 募集停止",
      "entryYear": "2027年4月",
      "verifiedAt": "2026-10-04",
      "originalLanguage": "ja",
      "sources": [
        {
          "label": "2027年度修士課程一般入試：旧2専攻の募集停止・現行専攻名",
          "url": "https://www.tus.ac.jp/today/archive/2026/00_2027_shushi_ippan_20260803.pdf",
          "kind": "pdf",
          "pdfPage": 7
        }
      ],
      "conditionsOriginal": "創域理工学研究科情報計算科学専攻および経営システム工学専攻は、2026 年度入学者を最後に募集を停止します。",
      "publicationStatus": "closed",
      "editorialNote": "2027年度不列为可报考专攻。新設「情報理工学専攻」使用独立条目和2027年度要项；不沿用旧专攻的科目。"
    }
  ]
};
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.EXAM_SCOPE_DATA = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
