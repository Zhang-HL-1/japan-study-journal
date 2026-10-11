(function(root){'use strict';
const data = {
  "verifiedAt": "2026-10-11",
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
    },
    {
      "id": "osaka",
      "name": "大阪大学",
      "aliases": [
        "阪大",
        "大阪大",
        "Osaka University",
        "The University of Osaka"
      ]
    },
    {
      "id": "tohoku",
      "name": "東北大学",
      "aliases": [
        "东北大学",
        "東北大",
        "东北大",
        "Tohoku University"
      ]
    },
    {
      "id": "kyushu",
      "name": "九州大学",
      "aliases": [
        "九大",
        "九州大",
        "Kyushu University"
      ]
    },
    {
      "id": "hokkaido",
      "name": "北海道大学",
      "aliases": [
        "北大",
        "北海道大",
        "Hokkaido University"
      ]
    },
    {
      "id": "keio",
      "name": "慶應義塾大学",
      "aliases": [
        "庆应",
        "慶應",
        "庆应义塾大学",
        "慶応",
        "慶応義塾大学",
        "慶大",
        "Keio",
        "Keio University"
      ]
    },
    {
      "id": "sophia",
      "name": "上智大学",
      "aliases": [
        "上智",
        "上智大",
        "Sophia",
        "Sophia University"
      ]
    },
    {
      "id": "kobe",
      "name": "神戸大学",
      "aliases": [
        "神户大学",
        "神大",
        "神戸大",
        "Kobe University"
      ]
    },
    {
      "id": "nagoya",
      "name": "名古屋大学",
      "aliases": [
        "名大",
        "Nagoya University",
        "Nagoya"
      ]
    },
    {
      "id": "uec",
      "name": "電気通信大学",
      "aliases": [
        "電通大",
        "电通大",
        "电气通信大学",
        "UEC",
        "UEC Tokyo",
        "The University of Electro-Communications"
      ]
    },
    {
      "id": "tsukuba",
      "name": "筑波大学",
      "aliases": [
        "筑波",
        "筑波大",
        "つくば大学",
        "University of Tsukuba",
        "Tsukuba"
      ]
    },
    {
      "id": "hitotsubashi",
      "name": "一橋大学",
      "aliases": [
        "一桥大学",
        "一橋",
        "一桥",
        "一橋大",
        "Hitotsubashi",
        "Hitotsubashi University"
      ]
    },
    {
      "id": "ynu",
      "name": "横浜国立大学",
      "aliases": [
        "横滨国立大学",
        "横国",
        "横浜国立",
        "横滨国立",
        "YNU",
        "Yokohama National University"
      ]
    },
    {
      "id": "meiji",
      "name": "明治大学",
      "aliases": [
        "明治",
        "明大",
        "Meiji",
        "Meiji University"
      ]
    },
    {
      "id": "aoyama",
      "name": "青山学院大学",
      "aliases": [
        "青山大学",
        "青学",
        "青山",
        "青山學院大學",
        "Aoyama Gakuin University"
      ]
    },
    {
      "id": "rikkyo",
      "name": "立教大学",
      "aliases": [
        "立教大",
        "立教",
        "Rikkyo University",
        "Rikkyo",
        "立教大學"
      ]
    },
    {
      "id": "chuo",
      "name": "中央大学",
      "aliases": [
        "中大",
        "Chuo University"
      ]
    },
    {
      "id": "hosei",
      "name": "法政大学",
      "aliases": [
        "法政",
        "法政大",
        "Hosei University",
        "Hosei",
        "法政大學"
      ]
    },
    {
      "id": "chiba",
      "name": "千葉大学",
      "aliases": [
        "千叶大学",
        "千叶",
        "千葉",
        "千葉大",
        "Chiba",
        "Chiba University"
      ]
    }
  ],
  "regions": [
    {
      "id": "hokkaido",
      "name": "北海道"
    },
    {
      "id": "tohoku",
      "name": "东北"
    },
    {
      "id": "kanto",
      "name": "关东"
    },
    {
      "id": "chubu",
      "name": "中部"
    },
    {
      "id": "kansai",
      "name": "关西"
    },
    {
      "id": "kyushu",
      "name": "九州"
    }
  ],
  "campuses": [
    {
      "id": "utokyo-hongo",
      "universityId": "utokyo",
      "name": "本郷キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "文京区",
      "lat": 35.7128,
      "lng": 139.7621,
      "address": "東京都文京区本郷7-3-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学系研究科",
          "detail": "多数专攻的主要教学研究校区；部分研究室在其他基地。"
        },
        {
          "graduateSchool": "理学系研究科",
          "detail": "理学主要校区；物性、宇宙等部分研究在柏及校外机构。"
        },
        {
          "graduateSchool": "情報理工学系研究科",
          "detail": "主要校区；部分导师研究室在生研等机构。"
        }
      ],
      "sources": [
        {
          "url": "https://www.u-tokyo.ac.jp/ja/about/campus-guide/list.html",
          "label": "官网：施設等所在地 | 東京大学"
        },
        {
          "url": "https://www.s.u-tokyo.ac.jp/ja/access.html",
          "label": "官网：アクセス - 東京大学 大学院理学系研究科・理学部"
        },
        {
          "url": "https://www.i.u-tokyo.ac.jp/map/",
          "label": "官网：交通アクセス・学内地図 | 概要 | 東京大学 大学院 情報理工学系研究科"
        }
      ],
      "note": "不能把东大所有修士项目都标在本乡。",
      "aliases": [
        "本乡",
        "Hongo"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "utokyo-komaba1",
      "universityId": "utokyo",
      "name": "駒場Iキャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "目黒区",
      "lat": 35.6592,
      "lng": 139.6848,
      "address": "東京都目黒区駒場3-8-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "数理科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.u-tokyo.ac.jp/campusmap/cam02_01_27_j.html",
          "label": "官网：東京大学 [駒場地区キャンパスマップ(数理科学研究科棟)]"
        }
      ],
      "note": "数理科学研究科在駒場I，不在本乡。",
      "aliases": [
        "驹场",
        "Komaba"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "utokyo-komaba2",
      "universityId": "utokyo",
      "name": "駒場II・生産技術研究所",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "目黒区",
      "lat": 35.661,
      "lng": 139.6773,
      "address": "東京都目黒区駒場4-6-1",
      "kind": "research",
      "units": [
        {
          "graduateSchool": "工学系研究科",
          "detail": "生产技术研究所所属导师的研究基地。"
        },
        {
          "graduateSchool": "情報理工学系研究科",
          "detail": "电子信息等专攻中，生研所属导师的研究室。"
        }
      ],
      "sources": [
        {
          "url": "https://www.iis.u-tokyo.ac.jp/ja/access/",
          "label": "官网：アクセス - 東京大学生産技術研究所"
        },
        {
          "url": "https://www.i.u-tokyo.ac.jp/edu/course/ice/admission.shtml",
          "label": "官网：入試案内 | 東京大学 大学院 情報理工学系研究科"
        }
      ],
      "note": "这里只表示生研所属导师研究室，不代表整个工学或信息理工研究科都在此。",
      "aliases": [
        "驹场研究",
        "生研",
        "Komaba Research"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "utokyo-kashiwa",
      "universityId": "utokyo",
      "name": "柏キャンパス",
      "region": "kanto",
      "prefecture": "千葉県",
      "city": "柏市",
      "lat": 35.9027,
      "lng": 139.9361,
      "address": "千葉県柏市柏の葉5-1-5",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "新領域創成科学研究科",
          "detail": "新领域主要教学研究校区。"
        },
        {
          "graduateSchool": "理学系研究科",
          "detail": "物性研究所、宇宙线研究所等相关研究室；依导师确定。"
        }
      ],
      "sources": [
        {
          "url": "https://www.u-tokyo.ac.jp/ja/about/campus-guide/list.html",
          "label": "官网：施設等所在地 | 東京大学"
        },
        {
          "url": "https://www.k.u-tokyo.ac.jp/gsfs/access/",
          "label": "官网：新領域創成科学研究科 访问方式"
        }
      ],
      "note": "新领域主要在千叶县柏市，不能用本乡替代。",
      "aliases": [
        "柏之叶",
        "Kashiwa"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "utokyo-tokai",
      "universityId": "utokyo",
      "name": "東海・原子力研究施設",
      "region": "kanto",
      "prefecture": "茨城県",
      "city": "東海村",
      "lat": 36.461,
      "lng": 140.6064,
      "address": "茨城県那珂郡東海村白方白根2-22",
      "kind": "research",
      "units": [
        {
          "graduateSchool": "工学系研究科",
          "detail": "原子力国际专攻的部分导师研究基地；专攻主要联系地址仍在本乡。",
          "departments": [
            "原子力国際専攻"
          ]
        }
      ],
      "sources": [
        {
          "url": "https://www.tokai.t.u-tokyo.ac.jp/lab-j.html",
          "label": "官网：UTNS Home"
        },
        {
          "url": "https://www.tokai.t.u-tokyo.ac.jp/access.html",
          "label": "官网：UTNS Home"
        }
      ],
      "note": "区分原子力国际专攻的修士研究室与同基地的专业职原子力专攻。",
      "aliases": [
        "东海",
        "Tokai"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyoto-yoshida",
      "universityId": "kyoto",
      "name": "吉田キャンパス",
      "region": "kansai",
      "prefecture": "京都府",
      "city": "京都市",
      "lat": 35.0262,
      "lng": 135.7808,
      "address": "京都府京都市左京区吉田本町",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学研究科",
          "detail": "主要教学研究校区；部分生物研究室在犬山等基地。"
        },
        {
          "graduateSchool": "情報学研究科",
          "detail": "主要校区；官方也列宇治设施。"
        },
        {
          "graduateSchool": "エネルギー科学研究科",
          "detail": "部分教学研究设施；另有宇治、熊取基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.kyoto-u.ac.jp/ja/access/campus/yoshida",
          "label": "官网：吉田キャンパス マップ一覧 | 京都大学"
        },
        {
          "url": "https://www.i.kyoto-u.ac.jp/access/",
          "label": "官网：アクセス | 京都大学大学院情報学研究科"
        },
        {
          "url": "https://www.energy.kyoto-u.ac.jp/jp/outline/facilitymap/",
          "label": "官网：施設マップ | 研究科の概要 | 京都大学大学院エネルギー科学研究科"
        }
      ],
      "note": "理学、信息学与能源研究科不应一律用工学的桂校区表示。",
      "aliases": [
        "Yoshida"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyoto-katsura",
      "universityId": "kyoto",
      "name": "桂キャンパス",
      "region": "kansai",
      "prefecture": "京都府",
      "city": "京都市",
      "lat": 34.9794,
      "lng": 135.6789,
      "address": "京都府京都市西京区京都大学桂",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": "主要研究校区；部分实验与合作研究设施在宇治等地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.t.kyoto-u.ac.jp/ja/access",
          "label": "官网：アクセス — 京都大学 工学部・大学院工学研究科"
        }
      ],
      "note": "工学研究科的主要基地是桂，不是大学本部吉田。",
      "aliases": [
        "Katsura"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyoto-uji",
      "universityId": "kyoto",
      "name": "宇治キャンパス",
      "region": "kansai",
      "prefecture": "京都府",
      "city": "宇治市",
      "lat": 34.9108,
      "lng": 135.8002,
      "address": "京都府宇治市五ケ庄",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": "官方工学访问页列出的宇治研究基地；具体研究室依导师。"
        },
        {
          "graduateSchool": "情報学研究科",
          "detail": "研究所本馆及综合研究实验栋等部分研究室。"
        },
        {
          "graduateSchool": "エネルギー科学研究科",
          "detail": "能源理工学研究所等教学研究基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.t.kyoto-u.ac.jp/ja/access",
          "label": "官网：アクセス — 京都大学 工学部・大学院工学研究科"
        },
        {
          "url": "https://www.i.kyoto-u.ac.jp/access/",
          "label": "官网：アクセス | 京都大学大学院情報学研究科"
        },
        {
          "url": "https://www.energy.kyoto-u.ac.jp/jp/outline/facilitymap/",
          "label": "官网：施設マップ | 研究科の概要 | 京都大学大学院エネルギー科学研究科"
        }
      ],
      "note": "宇治为部分研究室的真实所在地，并非上述研究科全部迁至宇治。",
      "aliases": [
        "Uji"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyoto-kumatori",
      "universityId": "kyoto",
      "name": "熊取・複合原子力科学研究所",
      "region": "kansai",
      "prefecture": "大阪府",
      "city": "熊取町",
      "lat": 34.385,
      "lng": 135.3512,
      "address": "大阪府泉南郡熊取町朝代西2-1010",
      "kind": "research",
      "units": [
        {
          "graduateSchool": "エネルギー科学研究科",
          "detail": "官方设施表列出的部分教学研究基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.energy.kyoto-u.ac.jp/jp/access/",
          "label": "官网：アクセス | 京都大学大学院エネルギー科学研究科"
        },
        {
          "url": "https://www.rri.kyoto-u.ac.jp/access",
          "label": "官网：交通アクセス | 京都大学複合原子力科学研究所"
        }
      ],
      "note": "属于特定导师研究基地；不能把研究科事務室地址当作所有学生的研究地点。",
      "aliases": [
        "Kumatori"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyoto-inuyama",
      "universityId": "kyoto",
      "name": "犬山キャンパス",
      "region": "chubu",
      "prefecture": "愛知県",
      "city": "犬山市",
      "lat": 35.3857,
      "lng": 136.9556,
      "address": "愛知県犬山市官林41-2",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学研究科",
          "detail": "生物科学专攻的霊長類学・野生動物系部分研究室。",
          "departments": [
            "生物科学専攻"
          ]
        }
      ],
      "sources": [
        {
          "url": "https://www.biol.sci.kyoto-u.ac.jp/prws/",
          "label": "官网：霊長類学・野生動物系 ｜ 京都大学大学院 理学研究科 生物科学専攻"
        },
        {
          "url": "https://www.kyoto-u.ac.jp/ja/event/2025-06-17",
          "label": "官网：2025年 京都大学犬山キャンパスオープンキャンパス | 京都大学"
        }
      ],
      "note": "京都大学的这一修士研究基地在爱知县犬山；吉田仍有同系研究室。",
      "aliases": [
        "Inuyama"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "science-tokyo-ookayama",
      "universityId": "science-tokyo",
      "name": "大岡山キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "目黒区",
      "lat": 35.6051,
      "lng": 139.6839,
      "address": "東京都目黒区大岡山2-12-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        },
        {
          "graduateSchool": "工学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        },
        {
          "graduateSchool": "物質理工学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        },
        {
          "graduateSchool": "情報理工学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        },
        {
          "graduateSchool": "生命理工学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        },
        {
          "graduateSchool": "環境・社会理工学院",
          "detail": "学院内研究室按导师分布；部分研究室在横浜校区。"
        }
      ],
      "sources": [
        {
          "url": "https://www.isct.ac.jp/ja/001/access",
          "label": "官网：アクセス | Science Tokyo - 東京科学大学"
        },
        {
          "url": "https://comp.life.isct.ac.jp/contact/",
          "label": "官网：Contact | Laboratory of Genome Informatics"
        }
      ],
      "note": "不能从本科所在校区推定修士研究室；连生命理工也有大冈山的研究室。",
      "aliases": [
        "大冈山",
        "Ookayama"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "science-tokyo-yokohama",
      "universityId": "science-tokyo",
      "name": "横浜キャンパス（旧すずかけ台）",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "横浜市",
      "lat": 35.513,
      "lng": 139.4849,
      "address": "神奈川県横浜市緑区長津田町4259",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        },
        {
          "graduateSchool": "工学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        },
        {
          "graduateSchool": "物質理工学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        },
        {
          "graduateSchool": "情報理工学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        },
        {
          "graduateSchool": "生命理工学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        },
        {
          "graduateSchool": "環境・社会理工学院",
          "detail": "大学院研究室依导师分布；并非学院所有专攻都固定在此。"
        }
      ],
      "sources": [
        {
          "url": "https://www.isct.ac.jp/ja/001/access",
          "label": "官网：アクセス | Science Tokyo - 東京科学大学"
        },
        {
          "url": "https://admissions.isct.ac.jp/ja/001/student-life-and-careers/campus-intro/yokohama",
          "label": "官网：横浜キャンパス紹介 | Science Tokyo 受験生"
        },
        {
          "url": "https://www.isct.ac.jp/plugins/cms/component_download_file.php?contentsDataId=2811&contentsId=1&fileName=environmental_repo2025&key=f90c97d2463b60986ff81e89bacf9bde.pdf&pageId=&prevId=&type=2",
          "label": "官网：2025环境报告书（PDF实际第4页：两校区的六学院）"
        }
      ],
      "note": "2026年4月1日从すずかけ台改名为横浜。大冈山与横浜均有理工学系大学院研究室，须查希望导师所在校区。",
      "aliases": [
        "铃悬台",
        "すずかけ台",
        "Suzukakedai",
        "横滨"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "waseda-nishiwaseda",
      "universityId": "waseda",
      "name": "西早稲田キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.7076,
      "lng": 139.7087,
      "address": "東京都新宿区大久保3-4-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "基幹理工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "創造理工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "先進理工学研究科",
          "detail": "多数专攻主要校区；生命医科学部分研究室在TWIns。"
        },
        {
          "graduateSchool": "環境・エネルギー研究科",
          "detail": "研究科官方案内列西早稻田与本庄基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.waseda.jp/fsci/access/",
          "label": "官网：アクセス — 早稲田大学 理工学術院"
        },
        {
          "url": "https://www.waseda.jp/fsci/gweee/access/",
          "label": "官网：環境・エネルギー研究科 访问方式"
        }
      ],
      "note": "三理工在西早稻田，不是早稻田本部校区；环境能源另有本庄基地。",
      "aliases": [
        "西早稻田",
        "Nishi-Waseda"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "waseda-honjo",
      "universityId": "waseda",
      "name": "本庄キャンパス",
      "region": "kanto",
      "prefecture": "埼玉県",
      "city": "本庄市",
      "lat": 36.2186,
      "lng": 139.1831,
      "address": "埼玉県本庄市西富田1011",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "環境・エネルギー研究科",
          "detail": "部分教学与研究在本庄；具体研究室依导师。"
        }
      ],
      "sources": [
        {
          "url": "https://www.waseda.jp/top/access/honjo-campus",
          "label": "官网：本庄キャンパス — 早稲田大学"
        },
        {
          "url": "https://onoda.w.waseda.jp/access.html",
          "label": "官网：早稲田大学大学院 環境・エネルギー研究科 小野田弘士研究室"
        }
      ],
      "note": "位于埼玉县本庄，不能只标东京。",
      "aliases": [
        "Honjo"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "waseda-kitakyushu",
      "universityId": "waseda",
      "name": "北九州キャンパス",
      "region": "kyushu",
      "prefecture": "福岡県",
      "city": "北九州市",
      "lat": 33.8885,
      "lng": 130.7135,
      "address": "福岡県北九州市若松区ひびきの2-7",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "情報生産システム研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.waseda.jp/top/access/kitakyushu-campus",
          "label": "官网：北九州キャンパス — 早稲田大学"
        },
        {
          "url": "https://www.waseda.jp/fsci/gips/access/",
          "label": "官网：アクセス — 早稲田大学 大学院情報生産システム研究科"
        }
      ],
      "note": "信息生产系统研究科IPS在北九州，距离东京很远。",
      "aliases": [
        "信息生产系统",
        "北九州",
        "Kitakyushu",
        "IPS"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "waseda-twins",
      "universityId": "waseda",
      "name": "先端生命医科学センター TWIns",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.6996,
      "lng": 139.7183,
      "address": "東京都新宿区若松町2-2",
      "kind": "research",
      "units": [
        {
          "graduateSchool": "先進理工学研究科",
          "detail": "生命医科学相关的部分导师研究室。",
          "departments": [
            "生命医科学専攻"
          ]
        }
      ],
      "sources": [
        {
          "url": "https://www.waseda.jp/inst/twins/access/",
          "label": "官网：先端生命医科学センター TWIns — 早稲田大学"
        }
      ],
      "note": "仅表示先進理工相关研究室，不表示整个先進理工研究科。",
      "aliases": [
        "TWIns"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tus-kagurazaka",
      "universityId": "tus",
      "name": "神楽坂キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.6994,
      "lng": 139.7417,
      "address": "東京都新宿区神楽坂1-3",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "創域理工学研究科",
          "detail": "国际火灾科学专攻同时列神乐坂及野田。",
          "departments": [
            "国際火災科学専攻"
          ]
        }
      ],
      "sources": [
        {
          "url": "https://www.tus.ac.jp/access/kagurazaka_campus/",
          "label": "官网：神楽坂キャンパス｜交通アクセス｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/science/science_education/index.html",
          "label": "官网：科学教育専攻｜理学研究科｜教育／学部・大学院｜東京理科大｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/sciencetechnology/global_fire/",
          "label": "官网：国際火災科学専攻｜創域理工学研究科｜教育／学部・大学院｜東京理科大｜東京理科大学"
        }
      ],
      "note": "工学研究科当前在葛饰，不依据旧版校区信息标到神乐坂。",
      "aliases": [
        "神乐坂",
        "Kagurazaka"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tus-katsushika",
      "universityId": "tus",
      "name": "葛飾キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "葛飾区",
      "lat": 35.7695,
      "lng": 139.8605,
      "address": "東京都葛飾区新宿6-3-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "先進工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.tus.ac.jp/access/katsushika_campus/",
          "label": "官网：葛飾キャンパス｜交通アクセス｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/engineering/electrical_engineering/index.html",
          "label": "官网：電気工学専攻｜工学研究科｜教育／学部・大学院｜東京理科大｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/industrialscience_technology/",
          "label": "官网：先進工学研究科"
        }
      ],
      "note": "当前工学及先進工学研究科的教学研究校区。",
      "aliases": [
        "葛饰",
        "Katsushika"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tus-noda",
      "universityId": "tus",
      "name": "野田キャンパス",
      "region": "kanto",
      "prefecture": "千葉県",
      "city": "野田市",
      "lat": 35.9177,
      "lng": 139.9061,
      "address": "千葉県野田市山崎2641",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "創域理工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "生命科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.tus.ac.jp/access/noda_campus/",
          "label": "官网：野田キャンパス｜交通アクセス｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/sciencetechnology/",
          "label": "官网：創域理工学研究科｜東京理科大学"
        },
        {
          "url": "https://www.tus.ac.jp/academics/graduate_school/biologicalsciences/biologicalsciences/index.html",
          "label": "官网：生命科学専攻｜生命科学研究科｜教育／学部・大学院｜東京理科大｜東京理科大学"
        }
      ],
      "note": "创域理工与生命科学在野田，不在东京市中心。",
      "aliases": [
        "Noda"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "osaka-suita",
      "universityId": "osaka",
      "name": "吹田キャンパス",
      "region": "kansai",
      "prefecture": "大阪府",
      "city": "吹田市",
      "lat": 34.821,
      "lng": 135.5237,
      "address": "大阪府吹田市山田丘",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "情報科学研究科",
          "detail": "主要教学研究基地，信息基础数学专攻地址也在吹田。"
        }
      ],
      "sources": [
        {
          "url": "https://www.eng.osaka-u.ac.jp/ja/access/",
          "label": "官网：アクセスマップ・キャンパスマップ - 大阪大学工学部/大学院工学研究科"
        },
        {
          "url": "https://www.ist.osaka-u.ac.jp/japanese/access/",
          "label": "官网：アクセス｜大阪大学大学院情報科学研究科"
        }
      ],
      "note": "工学在吹田，基础工学在丰中；两者不是同一校区。",
      "aliases": [
        "Suita"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "osaka-toyonaka",
      "universityId": "osaka",
      "name": "豊中キャンパス",
      "region": "kansai",
      "prefecture": "大阪府",
      "city": "豊中市",
      "lat": 34.8045,
      "lng": 135.454,
      "address": "大阪府豊中市待兼山町",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "基礎工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "理学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.es.osaka-u.ac.jp/ja/accessmap/",
          "label": "官网：アクセス | 大阪大学 基礎工学部 / 大学院基礎工学研究科 - School / Graduate School of Engineering Science"
        },
        {
          "url": "https://www.osaka-u.ac.jp/ja/contact/organization-1",
          "label": "官网：大学の組織（所在地等） － 大阪大学"
        }
      ],
      "note": "基础工学与理学的教学研究校区；信息科学研究科主体已在吹田。",
      "aliases": [
        "丰中",
        "Toyonaka"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-aobayama-east",
      "universityId": "tohoku",
      "name": "青葉山東キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.2534,
      "lng": 140.8396,
      "address": "宮城県仙台市青葉区荒巻字青葉6-6",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "情報科学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "医工学研究科",
          "detail": "工程类部分研究室。"
        },
        {
          "graduateSchool": "環境科学研究科",
          "detail": "部分研究室在东区研究栋；本馆在新青叶山。"
        }
      ],
      "sources": [
        {
          "url": "https://www.tohoku.ac.jp/japanese/profile/campus/01/aobayama/",
          "label": "官网：青葉山キャンパス | キャンパス | 大学概要 | 東北大学 -TOHOKU UNIVERSITY-"
        },
        {
          "url": "https://www.bme.tohoku.ac.jp/access/index.html",
          "label": "官网：アクセス（仙台駅から）｜東北大学 大学院 医工学研究科"
        },
        {
          "url": "https://www.kankyo.tohoku.ac.jp/access.html",
          "label": "官网：アクセス | 東北大学大学院 環境科学研究科"
        }
      ],
      "note": "青叶山东区工学、北区理学和新校区环境本馆分别标记。",
      "aliases": [
        "青叶山",
        "Aobayama"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-aobayama-north",
      "universityId": "tohoku",
      "name": "青葉山北キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.259,
      "lng": 140.8352,
      "address": "宮城県仙台市青葉区荒巻字青葉6-3",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "生命科学研究科",
          "detail": "理学相关部分研究室。"
        }
      ],
      "sources": [
        {
          "url": "https://www.tohoku.ac.jp/japanese/profile/campus/01/aobayama/",
          "label": "官网：青葉山キャンパス | キャンパス | 大学概要 | 東北大学 -TOHOKU UNIVERSITY-"
        },
        {
          "url": "https://www.lifesci.tohoku.ac.jp/access/",
          "label": "官网：アクセス｜東北大学 大学院 生命科学研究科"
        }
      ],
      "note": "理学主要基地在青叶山北区。",
      "aliases": [
        "青叶山北"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-aobayama-new",
      "universityId": "tohoku",
      "name": "青葉山新キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.252,
      "lng": 140.8274,
      "address": "宮城県仙台市青葉区荒巻字青葉468-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "環境科学研究科",
          "detail": "环境科学研究科本馆。"
        }
      ],
      "sources": [
        {
          "url": "https://www.kankyo.tohoku.ac.jp/facility.html",
          "label": "官网：施設のご紹介 | 東北大学大学院 環境科学研究科"
        },
        {
          "url": "https://www.lifesci.tohoku.ac.jp/access/",
          "label": "官网：アクセス｜東北大学 大学院 生命科学研究科"
        }
      ],
      "note": "新青叶山与东区环境研究栋分别展示；研究室位置依导师。",
      "aliases": [
        "青叶山新"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-katahira",
      "universityId": "tohoku",
      "name": "片平キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.2494,
      "lng": 140.8749,
      "address": "宮城県仙台市青葉区片平2-1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "生命科学研究科",
          "detail": "生命科学本馆与部分研究室。"
        },
        {
          "graduateSchool": "医工学研究科",
          "detail": "官方列出的部分研究教育基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.lifesci.tohoku.ac.jp/access/",
          "label": "官网：アクセス｜東北大学 大学院 生命科学研究科"
        },
        {
          "url": "https://www.bme.tohoku.ac.jp/access/index.html",
          "label": "官网：アクセス（仙台駅から）｜東北大学 大学院 医工学研究科"
        }
      ],
      "note": "不能把生命科学或医工学全部放到青叶山。",
      "aliases": [
        "Katahira"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-seiryo",
      "universityId": "tohoku",
      "name": "星陵キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.2719,
      "lng": 140.8638,
      "address": "宮城県仙台市青葉区星陵町2-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "医工学研究科",
          "detail": "医学类相关的部分研究室。"
        },
        {
          "graduateSchool": "生命科学研究科",
          "detail": "加龄医学研究所等相关研究室。"
        }
      ],
      "sources": [
        {
          "url": "https://www.bme.tohoku.ac.jp/access/index.html",
          "label": "官网：アクセス（仙台駅から）｜東北大学 大学院 医工学研究科"
        },
        {
          "url": "https://www.lifesci.tohoku.ac.jp/access/",
          "label": "官网：アクセス｜東北大学 大学院 生命科学研究科"
        }
      ],
      "note": "仅表示已收录交叉研究科的部分研究基地，不新增医学招生资料。",
      "aliases": [
        "Seiryo"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tohoku-kawauchi",
      "universityId": "tohoku",
      "name": "川内キャンパス",
      "region": "tohoku",
      "prefecture": "宮城県",
      "city": "仙台市",
      "lat": 38.2601,
      "lng": 140.8504,
      "address": "宮城県仙台市青葉区川内",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "生命科学研究科",
          "detail": "官方访问页列出的部分研究室基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.lifesci.tohoku.ac.jp/access/",
          "label": "官网：アクセス｜東北大学 大学院 生命科学研究科"
        }
      ],
      "note": "生命科学官方访问页另列川内；应按具体导师确认。",
      "aliases": [
        "Kawauchi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyushu-ito",
      "universityId": "kyushu",
      "name": "伊都キャンパス",
      "region": "kyushu",
      "prefecture": "福岡県",
      "city": "福岡市",
      "lat": 33.5957,
      "lng": 130.2205,
      "address": "福岡県福岡市西区元岡744",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学府",
          "detail": ""
        },
        {
          "graduateSchool": "システム情報科学府",
          "detail": ""
        },
        {
          "graduateSchool": "理学府",
          "detail": ""
        },
        {
          "graduateSchool": "数理学府",
          "detail": ""
        },
        {
          "graduateSchool": "システム生命科学府",
          "detail": "主要基地；官方列病院校区8个研究室例外。"
        }
      ],
      "sources": [
        {
          "url": "https://www.kyushu-u.ac.jp/ja/campus/ito/",
          "label": "官网：伊都キャンパス | アクセス・キャンパスマップ | 九州大学（KYUSHU UNIVERSITY）"
        },
        {
          "url": "https://www.isee.kyushu-u.ac.jp/access.html",
          "label": "官网：アクセス — 九州大学 大学院システム情報科学府 大学院システム情報科学研究院"
        },
        {
          "url": "https://www.sls.kyushu-u.ac.jp/about/access/",
          "label": "官网：アクセス｜学府について｜九州大学大学院 システム生命科学府"
        }
      ],
      "note": "九大这些理工大学院不再使用旧箱崎校区位置。",
      "aliases": [
        "Ito"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyushu-chikushi",
      "universityId": "kyushu",
      "name": "筑紫キャンパス",
      "region": "kyushu",
      "prefecture": "福岡県",
      "city": "春日市・大野城市",
      "lat": 33.5245,
      "lng": 130.473,
      "address": "福岡県春日市春日公園6-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "総合理工学府",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.tj.kyushu-u.ac.jp/aboutus/access.php",
          "label": "官网：アクセス / キャンパスマップ｜九州大学大学院総合理工学府 | IGSES ｜"
        }
      ],
      "note": "総合理工在筑紫，不在伊都。",
      "aliases": [
        "Chikushi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyushu-ohashi",
      "universityId": "kyushu",
      "name": "大橋キャンパス",
      "region": "kyushu",
      "prefecture": "福岡県",
      "city": "福岡市",
      "lat": 33.5601,
      "lng": 130.43,
      "address": "福岡県福岡市南区塩原4-9-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "芸術工学府",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.design.kyushu-u.ac.jp/access/",
          "label": "官网：アクセス・キャンパスMAP — 九州大学｜芸術工学部・大学院芸術工学府・大学院芸術工学研究院"
        }
      ],
      "note": "艺术工学在大桥，不在伊都。",
      "aliases": [
        "大桥",
        "Ohashi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kyushu-hospital",
      "universityId": "kyushu",
      "name": "病院キャンパス",
      "region": "kyushu",
      "prefecture": "福岡県",
      "city": "福岡市",
      "lat": 33.6103,
      "lng": 130.4182,
      "address": "福岡県福岡市東区馬出3-1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "システム生命科学府",
          "detail": "官方列出的8个研究室；其他研究室在伊都。"
        }
      ],
      "sources": [
        {
          "url": "https://www.sls.kyushu-u.ac.jp/about/access/",
          "label": "官网：アクセス｜学府について｜九州大学大学院 システム生命科学府"
        }
      ],
      "note": "仅系统生命科学府的部分研究室，不是该学府全部，也不新增医学学府。",
      "aliases": [
        "马出",
        "Hospital"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "hokkaido-sapporo",
      "universityId": "hokkaido",
      "name": "札幌キャンパス",
      "region": "hokkaido",
      "prefecture": "北海道",
      "city": "札幌市",
      "lat": 43.075,
      "lng": 141.3386,
      "address": "北海道札幌市北区北13条西8丁目・北14条西9丁目",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学院",
          "detail": ""
        },
        {
          "graduateSchool": "情報科学院",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://pr.eng.hokudai.ac.jp/top/access/",
          "label": "官网：アクセス — 北海道大学工学部ポータルサイト"
        },
        {
          "url": "https://www.ist.hokudai.ac.jp/access/",
          "label": "官网：交通アクセス ｜ 北海道大学 大学院情報科学院 / 大学院情報科学研究院"
        }
      ],
      "note": "本批工学、信息方向在札幌；不把函馆水产校区列入。",
      "aliases": [
        "札幌",
        "Sapporo"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "keio-yagami",
      "universityId": "keio",
      "name": "矢上キャンパス",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "横浜市",
      "lat": 35.5565,
      "lng": 139.6538,
      "address": "神奈川県横浜市港北区日吉3-14-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.keio.ac.jp/ja/about/campus/yagami/",
          "label": "官网：矢上キャンパス | 慶應義塾"
        }
      ],
      "note": "理工修士在矢上；日吉的理工本科低年级地点不能代替矢上。",
      "aliases": [
        "Yagami"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "keio-hiyoshi",
      "universityId": "keio",
      "name": "日吉キャンパス・協生館",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "横浜市",
      "lat": 35.553,
      "lng": 139.6472,
      "address": "神奈川県横浜市港北区日吉4-1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "システムデザイン・マネジメント研究科",
          "detail": ""
        },
        {
          "graduateSchool": "メディアデザイン研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.sdm.keio.ac.jp/access/",
          "label": "官网：アクセス | SDM｜慶應義塾大学大学院 システムデザイン・マネジメント研究科"
        },
        {
          "url": "https://www.kmd.keio.ac.jp/ja/access/",
          "label": "官网：アクセス | KMD : Keio University Graduate School of Media Design"
        }
      ],
      "note": "SDM、KMD在日吉协生馆，与邻近矢上的理工研究科分别标记。",
      "aliases": [
        "日吉",
        "Hiyoshi",
        "SDM",
        "KMD"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "keio-sfc",
      "universityId": "keio",
      "name": "湘南藤沢キャンパス（SFC）",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "藤沢市",
      "lat": 35.388,
      "lng": 139.4274,
      "address": "神奈川県藤沢市遠藤5322",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "政策・メディア研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.keio.ac.jp/ja/contact-us/department/sfc/",
          "label": "官网：部署別お問い合わせ（湘南藤沢） | 慶應義塾"
        },
        {
          "url": "https://www.keio.ac.jp/ja/about/campus/sfc/",
          "label": "官网：湘南藤沢キャンパス | 慶應義塾"
        }
      ],
      "note": "政策・媒体研究科在湘南藤泽，不在三田或日吉。",
      "aliases": [
        "湘南藤泽",
        "SFC"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "sophia-yotsuya",
      "universityId": "sophia",
      "name": "四谷キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "千代田区",
      "lat": 35.6839,
      "lng": 139.7327,
      "address": "東京都千代田区紀尾井町7-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "応用データサイエンス学位プログラム",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.sophia.ac.jp/jpn/aboutsophia/access/",
          "label": "官网：キャンパス案内｜上智大学"
        },
        {
          "url": "https://www.sophia.ac.jp/jpn/contact/",
          "label": "官网：お問い合わせ｜上智大学"
        }
      ],
      "note": "本批理工与应用数据科学的教学校区为四谷。",
      "aliases": [
        "Yotsuya"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kobe-rokko",
      "universityId": "kobe",
      "name": "六甲台第2キャンパス",
      "region": "kansai",
      "prefecture": "兵庫県",
      "city": "神戸市",
      "lat": 34.7252,
      "lng": 135.2347,
      "address": "兵庫県神戸市灘区六甲台町1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "システム情報学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "科学技術イノベーション研究科",
          "detail": "部分领域；其他领域在楠、港岛。"
        }
      ],
      "sources": [
        {
          "url": "https://www.kobe-u.ac.jp/ja/site/access/",
          "label": "官网：アクセス | 国立大学法人 神戸大学 (Kobe University)"
        },
        {
          "url": "https://www.csi.kobe-u.ac.jp/access/",
          "label": "官网：アクセス | 神戸大学大学院システム情報学研究科／神戸大学システム情報学部"
        },
        {
          "url": "https://www.stin.kobe-u.ac.jp/access/",
          "label": "官网：アクセス | 神戸大学大学院 科学技術イノベーション研究科"
        }
      ],
      "note": "STIN官方列多个教学研究基地，不能全塞到六甲台。",
      "aliases": [
        "六甲台",
        "Rokkodai"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kobe-fukae",
      "universityId": "kobe",
      "name": "深江キャンパス",
      "region": "kansai",
      "prefecture": "兵庫県",
      "city": "神戸市",
      "lat": 34.7152,
      "lng": 135.2915,
      "address": "兵庫県神戸市東灘区深江本町4-2-24",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "海事科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.kobe-u.ac.jp/ja/campus-life/general/access/fukae/",
          "label": "官网：深江地区 | 国立大学法人 神戸大学 (Kobe University)"
        }
      ],
      "note": "已收录的海事研究科在深江；其招生状态仍以考试资料页标注为准。",
      "aliases": [
        "Fukae"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kobe-kusunoki",
      "universityId": "kobe",
      "name": "楠キャンパス",
      "region": "kansai",
      "prefecture": "兵庫県",
      "city": "神戸市",
      "lat": 34.6876,
      "lng": 135.1737,
      "address": "兵庫県神戸市中央区楠町7-5-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "科学技術イノベーション研究科",
          "detail": "生命医科学相关领域的部分教学研究基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.stin.kobe-u.ac.jp/access/",
          "label": "官网：アクセス | 神戸大学大学院 科学技術イノベーション研究科"
        }
      ],
      "note": "仅STIN部分领域，不表示工学或系统信息全部在楠。",
      "aliases": [
        "Kusunoki"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "kobe-port",
      "universityId": "kobe",
      "name": "ポートアイランドキャンパス",
      "region": "kansai",
      "prefecture": "兵庫県",
      "city": "神戸市",
      "lat": 34.6549,
      "lng": 135.2178,
      "address": "兵庫県神戸市中央区港島南町7-1-48",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "科学技術イノベーション研究科",
          "detail": "计算科学等部分研究领域基地。"
        }
      ],
      "sources": [
        {
          "url": "https://www.stin.kobe-u.ac.jp/access/",
          "label": "官网：アクセス | 神戸大学大学院 科学技術イノベーション研究科"
        }
      ],
      "note": "港岛研究基地，与六甲台不同。",
      "aliases": [
        "港岛",
        "Port Island"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "nagoya-higashiyama",
      "universityId": "nagoya",
      "name": "東山キャンパス",
      "region": "chubu",
      "prefecture": "愛知県",
      "city": "名古屋市",
      "lat": 35.1545,
      "lng": 136.965,
      "address": "愛知県名古屋市千種区不老町",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "情報学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.nagoya-u.ac.jp/contact/directions.html",
          "label": "官网：交通アクセス | 名古屋大学"
        },
        {
          "url": "https://www.i.nagoya-u.ac.jp/access/",
          "label": "官网：お問い合わせ・アクセス | 名古屋大学情報学部／大学院情報学研究科"
        }
      ],
      "note": "工学与信息学在东山，不使用医学鹤舞校区。",
      "aliases": [
        "东山",
        "Higashiyama"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "uec-chofu",
      "universityId": "uec",
      "name": "調布キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "調布市",
      "lat": 35.6573,
      "lng": 139.5441,
      "address": "東京都調布市調布ケ丘1-5-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "情報理工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.uec.ac.jp/about/profile/access/",
          "label": "官网：交通・学内マップ | 国立大学法人 電気通信大学"
        }
      ],
      "note": "信息理工大学院主要教学研究校区。",
      "aliases": [
        "调布",
        "Chofu"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "tsukuba-tsukuba",
      "universityId": "tsukuba",
      "name": "筑波キャンパス・第3エリア",
      "region": "kanto",
      "prefecture": "茨城県",
      "city": "つくば市",
      "lat": 36.1101,
      "lng": 140.0994,
      "address": "茨城県つくば市天王台1-1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工情報生命学術院／システム情報工学研究群",
          "detail": ""
        },
        {
          "graduateSchool": "理工情報生命学術院／数理物質科学研究群",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://cs.tsukuba.ac.jp/information.html",
          "label": "学校官网：研究科与校区位置"
        },
        {
          "url": "https://www.tsukuba.ac.jp/access/tsukuba-access/",
          "label": "官网：筑波キャンパス交通アクセス - 筑波大学"
        }
      ],
      "note": "本批信息、智能、应用理工在筑波校区，不使用东京文京的社会人大学院校区。",
      "aliases": [
        "筑波",
        "Tsukuba"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "hitotsubashi-kunitachi",
      "universityId": "hitotsubashi",
      "name": "国立キャンパス・東地区",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "国立市",
      "lat": 35.693,
      "lng": 139.445,
      "address": "東京都国立市中2-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "ソーシャル・データサイエンス研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.hit-u.ac.jp/guide/campus/campus/",
          "label": "官网：国立キャンパス 建物配置図 | キャンパス案内（大学ナビ） | 大学案内 | 一橋大学"
        },
        {
          "url": "https://www.sds.hit-u.ac.jp/",
          "label": "官网：一橋大学 ソーシャル・データサイエンス学部・研究科"
        }
      ],
      "note": "SDS教学研究基地在国立校区，不使用千代田商务大学院校区。",
      "aliases": [
        "一桥国立",
        "Kunitachi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "ynu-tokiwadai",
      "universityId": "ynu",
      "name": "常盤台キャンパス",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "横浜市",
      "lat": 35.4734,
      "lng": 139.5907,
      "address": "神奈川県横浜市保土ケ谷区常盤台79",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学府",
          "detail": ""
        },
        {
          "graduateSchool": "環境情報学府",
          "detail": ""
        },
        {
          "graduateSchool": "先進実践学環",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.ynu.ac.jp/access/",
          "label": "官网：アクセス案内 - 横浜国立大学"
        },
        {
          "url": "https://www.ynu.ac.jp/access/map_campus.html",
          "label": "官网：キャンパスマップ - 横浜国立大学"
        }
      ],
      "note": "本批理工、环境信息及先進实践同在常盘台，研究室楼栋仍不同。",
      "aliases": [
        "常盘台",
        "Tokiwadai"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "meiji-ikuta",
      "universityId": "meiji",
      "name": "生田キャンパス",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "川崎市",
      "lat": 35.6137,
      "lng": 139.5491,
      "address": "神奈川県川崎市多摩区東三田1-1-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.meiji.ac.jp/sst/grad/",
          "label": "官网：理工学研究科（生田）"
        },
        {
          "url": "https://www.meiji.ac.jp/koho/campus_guide/ikuta/access.html",
          "label": "官网：生田キャンパス アクセスマップ | 明治大学"
        }
      ],
      "note": "理工研究科在生田，不在明治本部骏河台。",
      "aliases": [
        "Ikuta"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "meiji-nakano",
      "universityId": "meiji",
      "name": "中野キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "中野区",
      "lat": 35.7076,
      "lng": 139.6597,
      "address": "東京都中野区中野4-21-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "先端数理科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.meiji.ac.jp/ams/outline/index.html",
          "label": "官网：研究科概要 | 明治大学"
        },
        {
          "url": "https://www.meiji.ac.jp/nakano/faculty/index.html",
          "label": "官网：学部・大学院・研究機関（中野キャンパス） | 明治大学"
        }
      ],
      "note": "先端数理科学目前在中野；不沿用过去生田的位置。",
      "aliases": [
        "Nakano"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "aoyama-sagamihara",
      "universityId": "aoyama",
      "name": "相模原キャンパス",
      "region": "kanto",
      "prefecture": "神奈川県",
      "city": "相模原市",
      "lat": 35.5664,
      "lng": 139.4024,
      "address": "神奈川県相模原市中央区淵野辺5-10-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.aoyama.ac.jp/outline/campus/sagamihara.html",
          "label": "官网：キャンパスマップ（相模原） | 青山学院大学"
        },
        {
          "url": "https://www.aoyama.ac.jp/outline/campus/access.html",
          "label": "官网：アクセスマップ(青山キャンパス・相模原キャンパス) | 青山学院大学"
        }
      ],
      "note": "理工大学院在相模原，不在青山校区。",
      "aliases": [
        "淵野辺",
        "渊野边",
        "Sagamihara"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "rikkyo-ikebukuro",
      "universityId": "rikkyo",
      "name": "池袋キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "豊島区",
      "lat": 35.7305,
      "lng": 139.704,
      "address": "東京都豊島区西池袋3-34-1",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "人工知能科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.rikkyo.ac.jp/graduate/ai/major_1.html",
          "label": "官网：人工知能科学研究科人工知能科学専攻 | 立教大学"
        }
      ],
      "note": "本批人工智能研究科在池袋，不在新座。",
      "aliases": [
        "池袋",
        "Ikebukuro"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "chuo-korakuen",
      "universityId": "chuo",
      "name": "後楽園キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "文京区",
      "lat": 35.7084,
      "lng": 139.7494,
      "address": "東京都文京区春日1-13-27",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.chuo-u.ac.jp/academics/graduateschool/science/",
          "label": "官网：理工学研究科 | 中央大学"
        },
        {
          "url": "https://www.chuo-u.ac.jp/access/kourakuen/",
          "label": "官网：後楽園キャンパス"
        }
      ],
      "note": "理工大学院在后乐园，不在多摩。",
      "aliases": [
        "后乐园",
        "Korakuen"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "chuo-ichigaya",
      "universityId": "chuo",
      "name": "市ヶ谷田町キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.692,
      "lng": 139.7361,
      "address": "東京都新宿区市谷田町1-18",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "国際情報研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.chuo-u.ac.jp/academics/graduateschool/itl/campus/",
          "label": "官网：キャンパス | 中央大学"
        }
      ],
      "note": "中央国际信息与理工在不同校区；不要与法政的田町校舍合并。",
      "aliases": [
        "国际信息",
        "Ichigaya Tamachi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "hosei-koganei",
      "universityId": "hosei",
      "name": "小金井キャンパス",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "小金井市",
      "lat": 35.7093,
      "lng": 139.5222,
      "address": "東京都小金井市梶野町3-7-2",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "理工学研究科",
          "detail": ""
        },
        {
          "graduateSchool": "情報科学研究科",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.hosei.ac.jp/gs/kenkyuka/",
          "label": "官网：研究科・専攻 :: 法政大学 大学院"
        },
        {
          "url": "https://cis.hosei.ac.jp/gs/access/",
          "label": "官网：アクセス — 大学院 — 法政大学 情報科学部"
        }
      ],
      "note": "理工、信息科学在小金井；设计工学不在这里。",
      "aliases": [
        "Koganei"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "hosei-tamachi",
      "universityId": "hosei",
      "name": "市ケ谷キャンパス・田町校舎",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.6926,
      "lng": 139.7381,
      "address": "東京都新宿区市谷田町2-33",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "デザイン工学研究科",
          "detail": "本批系统设计专攻。",
          "departments": [
            "システムデザイン専攻"
          ]
        }
      ],
      "sources": [
        {
          "url": "https://www.hosei.ac.jp/gs/kenkyuka/",
          "label": "官网：研究科・専攻 :: 法政大学 大学院"
        },
        {
          "url": "https://www.hosei.ac.jp/ichigaya/access/",
          "label": "官网：交通アクセス :: 法政大学 市ケ谷キャンパス"
        }
      ],
      "note": "设计工学的田町校舍与法政富士见本校区、中央市谷田町校区分别区分。",
      "aliases": [
        "系统设计",
        "Tamachi"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "chiba-nishichiba",
      "universityId": "chiba",
      "name": "西千葉キャンパス",
      "region": "kanto",
      "prefecture": "千葉県",
      "city": "千葉市",
      "lat": 35.6277,
      "lng": 140.1032,
      "address": "千葉県千葉市稲毛区弥生町1-33",
      "kind": "campus",
      "units": [
        {
          "graduateSchool": "融合理工学府",
          "detail": ""
        }
      ],
      "sources": [
        {
          "url": "https://www.se.chiba-u.jp/outline/index.html",
          "label": "官网：概要 | 国立大学法人 千葉大学 融合理工学府"
        },
        {
          "url": "https://www.chiba-u.ac.jp/campus/index.html",
          "label": "官网：千葉大学 交通与校区图"
        }
      ],
      "note": "本批6个理工课程在西千叶，不使用松户园艺或亥鼻医学校区。",
      "aliases": [
        "西千叶",
        "Nishi-Chiba"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    },
    {
      "id": "waseda-tsurumaki",
      "universityId": "waseda",
      "name": "早稲田・121号館（環境エネルギー研究室）",
      "region": "kanto",
      "prefecture": "東京都",
      "city": "新宿区",
      "lat": 35.7074,
      "lng": 139.7234,
      "address": "東京都新宿区早稲田鶴巻町513",
      "kind": "research",
      "units": [
        {
          "graduateSchool": "環境・エネルギー研究科",
          "detail": "官方设施表列早稻田校区；小野田研究室列121号馆与本庄研究室。"
        }
      ],
      "sources": [
        {
          "url": "https://www.waseda.jp/fsci/gweee/about/facility/",
          "label": "官网：環境・エネルギー研究科 利用设施"
        },
        {
          "url": "https://onoda.w.waseda.jp/access.html",
          "label": "官网：早稲田大学大学院 環境・エネルギー研究科 小野田弘士研究室"
        }
      ],
      "note": "这里为环境能源的部分研究室，不是西早稻田三理工校区。",
      "aliases": [
        "早稻田",
        "121号馆",
        "Tsurumaki"
      ],
      "verifiedAt": "2026-10-11",
      "positionAccuracy": "校区／研究基地代表点，约略位置"
    }
  ]
};
if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.CAMPUS_MAP_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this);
