/* 东京大学：核验日期 2026-10-03。科目及范围保留官方日文/英文；完整表格和条件见官方对应页。 */
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
    }
  ]
};
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.EXAM_SCOPE_DATA = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
