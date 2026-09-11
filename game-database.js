/* 亂世殘卷資料庫 v4：保留怪物 artRole，新增武器造型與 NPC 圖片映射。 */
window.GameDatabase={
 schemaVersion:4,
 schemas:{
  "regions": {
    "id": null,
    "key": "unknown",
    "n": "未命名區域",
    "tribe": "未知族群",
    "element": "土",
    "d": "",
    "enemies": [],
    "boss": null,
    "set": null
  },
  "monsters": {
    "id": null,
    "n": "未命名怪物",
    "icon": "M",
    "hp": 1,
    "atk": 1,
    "def": 0,
    "agi": 1,
    "tier": 1,
    "intents": [
      "quick"
    ],
    "gold": 0,
    "exp": 0,
    "boss": false,
    "artRole": "creature"
  },
  "materials": {
    "id": null,
    "n": "未命名素材",
    "rarity": "common",
    "d": ""
  },
  "consumables": {
    "id": null,
    "n": "未命名道具",
    "d": "",
    "hp": 0,
    "mp": 0,
    "full": null,
    "price": null,
    "shop": false
  },
  "lootDrops": {
    "monsterId": null,
    "itemId": null,
    "chance": 0
  },
  "regionalDrops": {
    "itemId": null,
    "chance": 0
  },
  "equipment": {
    "id": null,
    "n": "未命名裝備",
    "slot": "armor",
    "element": null,
    "lv": 1,
    "atk": 0,
    "def": 0,
    "price": null,
    "shop": false,
    "weaponStyle": null
  },
  "affixes": {
    "id": null,
    "n": "未命名詞綴",
    "d": "",
    "atk": 0,
    "def": 0,
    "skill": 0,
    "reflect": 0,
    "burn": 0,
    "mp": 0,
    "maxHp": 0,
    "maxMp": 0,
    "crit": 0,
    "dodge": 0,
    "reduction": 0,
    "damage": 0,
    "autoSalve": false
  },
  "sets": {
    "id": null,
    "n": "未命名套裝",
    "source": "",
    "bonuses": {}
  },
  "quests": {
    "id": null,
    "floor": 0,
    "name": "未命名委託",
    "d": "",
    "item": "任務品",
    "need": 1,
    "chance": 0,
    "reward": {
      "gold": 0,
      "exp": 0
    }
  },
  "artProfiles": {
    "id": null,
    "src": "assets/actors.png",
    "row": 0,
    "columns": 4,
    "rows": 4
  },
  "npcPortraits": {
    "id": null,
    "src": ""
  }
},
 tables:{
  "regions": [
    {
      "id": "1",
      "key": "beast",
      "n": "狼嚎荒徑",
      "tribe": "獸族棲息地",
      "element": "木",
      "d": "碎石荒徑間遍布獸足痕跡，敵人敏捷且常以連續攻擊試探。",
      "enemies": [
        "wolf",
        "boar",
        "beastkin"
      ],
      "boss": "fangLord",
      "set": "wolfwalker"
    },
    {
      "id": "2",
      "key": "human",
      "n": "斷旗營寨",
      "tribe": "人族棲息地",
      "element": "金",
      "d": "廢棄軍寨仍有流民與符徒盤據，攻守能力較為均衡。",
      "enemies": [
        "raider",
        "adept",
        "soldier"
      ],
      "boss": "guardian",
      "set": "ironwarden"
    },
    {
      "id": "3",
      "key": "insect",
      "n": "腐絲蟲窟",
      "tribe": "蟲族棲息地",
      "element": "土",
      "d": "濕冷洞窟充滿蛛絲與甲殼聲，毒素與持續傷害是主要威脅。",
      "enemies": [
        "spider",
        "mantis",
        "beetle"
      ],
      "boss": "broodQueen",
      "set": "ember"
    },
    {
      "id": "4",
      "key": "flying",
      "n": "墜羽天崖",
      "tribe": "飛行族棲息地",
      "element": "火",
      "d": "強風穿過斷崖與石柱，飛行敵人擅長迅擊與閃避。",
      "enemies": [
        "hawk",
        "caveBat",
        "windRaptor"
      ],
      "boss": "stormRoc",
      "set": "skyfeather"
    },
    {
      "id": "5",
      "key": "lizard",
      "n": "沉鱗古沼",
      "tribe": "蜥蜴人族棲息地",
      "element": "水",
      "d": "古沼遺跡由鱗族守衛與祭司巡守，兼具護甲與法術。",
      "enemies": [
        "lizardScout",
        "lizardShaman",
        "lizardGuard"
      ],
      "boss": "scaleWarlord",
      "set": "spiritvein"
    }
  ],
  "monsters": [
    {
      "id": "wolf",
      "n": "太行灰狼",
      "icon": "🐺",
      "hp": 68,
      "atk": 19,
      "def": 5,
      "agi": 22,
      "tier": 1,
      "intents": [
        "quick",
        "quick",
        "howl"
      ],
      "gold": 18,
      "exp": 30,
      "artRole": "wolf"
    },
    {
      "id": "boar",
      "n": "裂牙山豬",
      "icon": "◆",
      "hp": 88,
      "atk": 21,
      "def": 9,
      "agi": 12,
      "tier": 1,
      "intents": [
        "quick",
        "heavy"
      ],
      "gold": 22,
      "exp": 32,
      "artRole": "boar"
    },
    {
      "id": "beastkin",
      "n": "荒徑獸兵",
      "icon": "♞",
      "hp": 80,
      "atk": 20,
      "def": 8,
      "agi": 17,
      "tier": 2,
      "intents": [
        "howl",
        "quick",
        "heavy"
      ],
      "gold": 26,
      "exp": 36,
      "artRole": "claws"
    },
    {
      "id": "fangLord",
      "n": "裂牙獸王",
      "icon": "王",
      "hp": 240,
      "atk": 23,
      "def": 12,
      "agi": 19,
      "tier": 3,
      "intents": [
        "howl",
        "quick",
        "heavy"
      ],
      "gold": 105,
      "exp": 145,
      "boss": true,
      "artRole": "clawsBoss"
    },
    {
      "id": "raider",
      "n": "飢民劫掠者",
      "icon": "♟",
      "hp": 82,
      "atk": 18,
      "def": 8,
      "agi": 15,
      "tier": 1,
      "intents": [
        "quick",
        "quick",
        "heavy"
      ],
      "gold": 20,
      "exp": 28,
      "artRole": "cleaver"
    },
    {
      "id": "adept",
      "n": "黃巾符徒",
      "icon": "☷",
      "hp": 72,
      "atk": 21,
      "def": 6,
      "agi": 12,
      "tier": 2,
      "intents": [
        "mark",
        "spell"
      ],
      "gold": 24,
      "exp": 32,
      "artRole": "talisman"
    },
    {
      "id": "soldier",
      "n": "斷甲逃兵",
      "icon": "♜",
      "hp": 98,
      "atk": 20,
      "def": 13,
      "agi": 10,
      "tier": 2,
      "intents": [
        "break",
        "heavy"
      ],
      "gold": 28,
      "exp": 36,
      "artRole": "spear"
    },
    {
      "id": "guardian",
      "n": "地公祭將",
      "icon": "⚑",
      "hp": 315,
      "atk": 24,
      "def": 16,
      "agi": 14,
      "tier": 3,
      "intents": [
        "mark",
        "heavy",
        "summon",
        "spell"
      ],
      "gold": 145,
      "exp": 205,
      "boss": true,
      "artRole": "glaiveBoss"
    },
    {
      "id": "spider",
      "n": "穴居毒蛛",
      "icon": "🕷",
      "hp": 76,
      "atk": 16,
      "def": 7,
      "agi": 18,
      "tier": 1,
      "intents": [
        "poison",
        "quick"
      ],
      "gold": 22,
      "exp": 34,
      "artRole": "spider"
    },
    {
      "id": "mantis",
      "n": "鐮足螳獸",
      "icon": "⌁",
      "hp": 88,
      "atk": 24,
      "def": 7,
      "agi": 21,
      "tier": 2,
      "intents": [
        "quick",
        "poison",
        "heavy"
      ],
      "gold": 31,
      "exp": 42,
      "artRole": "mantis"
    },
    {
      "id": "beetle",
      "n": "鐵背甲蟲",
      "icon": "⬢",
      "hp": 112,
      "atk": 20,
      "def": 17,
      "agi": 9,
      "tier": 2,
      "intents": [
        "break",
        "heavy"
      ],
      "gold": 34,
      "exp": 45,
      "artRole": "beetle"
    },
    {
      "id": "broodQueen",
      "n": "腐絲蟲后",
      "icon": "王",
      "hp": 380,
      "atk": 27,
      "def": 18,
      "agi": 15,
      "tier": 3,
      "intents": [
        "poison",
        "summon",
        "heavy",
        "quick"
      ],
      "gold": 190,
      "exp": 260,
      "boss": true,
      "artRole": "spiderBoss"
    },
    {
      "id": "hawk",
      "n": "斷崖風鷹",
      "icon": "⌃",
      "hp": 86,
      "atk": 25,
      "def": 8,
      "agi": 26,
      "tier": 1,
      "intents": [
        "quick",
        "quick",
        "howl"
      ],
      "gold": 34,
      "exp": 48,
      "artRole": "hawk"
    },
    {
      "id": "caveBat",
      "n": "暮影翼蝠",
      "icon": "⌄",
      "hp": 82,
      "atk": 23,
      "def": 7,
      "agi": 28,
      "tier": 1,
      "intents": [
        "quick",
        "poison"
      ],
      "gold": 35,
      "exp": 49,
      "artRole": "bat"
    },
    {
      "id": "windRaptor",
      "n": "裂風翼衛",
      "icon": "♢",
      "hp": 105,
      "atk": 27,
      "def": 11,
      "agi": 23,
      "tier": 2,
      "intents": [
        "howl",
        "quick",
        "heavy"
      ],
      "gold": 42,
      "exp": 58,
      "artRole": "raptor"
    },
    {
      "id": "stormRoc",
      "n": "天嵐鵬王",
      "icon": "王",
      "hp": 445,
      "atk": 30,
      "def": 18,
      "agi": 24,
      "tier": 3,
      "intents": [
        "howl",
        "quick",
        "spell",
        "heavy"
      ],
      "gold": 235,
      "exp": 325,
      "boss": true,
      "artRole": "rocBoss"
    },
    {
      "id": "lizardScout",
      "n": "沼地鱗斥候",
      "icon": "♙",
      "hp": 110,
      "atk": 28,
      "def": 14,
      "agi": 21,
      "tier": 1,
      "intents": [
        "quick",
        "poison",
        "break"
      ],
      "gold": 43,
      "exp": 62,
      "artRole": "daggersLizard"
    },
    {
      "id": "lizardShaman",
      "n": "古沼鱗祭司",
      "icon": "☷",
      "hp": 98,
      "atk": 30,
      "def": 11,
      "agi": 16,
      "tier": 2,
      "intents": [
        "mark",
        "spell",
        "summon"
      ],
      "gold": 48,
      "exp": 68,
      "artRole": "staffLizard"
    },
    {
      "id": "lizardGuard",
      "n": "沉鱗重衛",
      "icon": "♜",
      "hp": 140,
      "atk": 29,
      "def": 21,
      "agi": 12,
      "tier": 2,
      "intents": [
        "break",
        "heavy",
        "quick"
      ],
      "gold": 52,
      "exp": 74,
      "artRole": "shieldLizard"
    },
    {
      "id": "scaleWarlord",
      "n": "玄鱗戰主",
      "icon": "王",
      "hp": 540,
      "atk": 34,
      "def": 24,
      "agi": 19,
      "tier": 3,
      "intents": [
        "mark",
        "break",
        "heavy",
        "spell"
      ],
      "gold": 310,
      "exp": 420,
      "boss": true,
      "artRole": "glaiveLizardBoss"
    }
  ],
  "materials": [
    {
      "id": "cloth",
      "n": "粗麻布",
      "rarity": "common",
      "d": "常見製作素材。"
    },
    {
      "id": "fang",
      "n": "獸牙",
      "rarity": "common",
      "d": "獸族棲息地的常見素材。"
    },
    {
      "id": "venom",
      "n": "毒腺",
      "rarity": "uncommon",
      "d": "蟲族與毒性生物留下的素材。"
    },
    {
      "id": "sealPaper",
      "n": "殘符紙",
      "rarity": "common",
      "d": "帶有微弱靈力。"
    },
    {
      "id": "ironPlate",
      "n": "斷甲片",
      "rarity": "uncommon",
      "d": "可供鍛造與修補。"
    },
    {
      "id": "feather",
      "n": "嵐羽",
      "rarity": "uncommon",
      "d": "飛行族遺落的輕盈羽材。"
    },
    {
      "id": "scale",
      "n": "古沼鱗片",
      "rarity": "uncommon",
      "d": "鱗族裝備與儀式使用的素材。"
    },
    {
      "id": "carapace",
      "n": "堅硬甲殼",
      "rarity": "common",
      "d": "蟲族的硬質外殼。"
    },
    {
      "id": "purpleJade",
      "n": "幽紫古玉",
      "rarity": "rare",
      "d": "亂域中極少見的珍寶。"
    },
    {
      "id": "spiritCore",
      "n": "領主靈核",
      "rarity": "epic",
      "d": "區域首領力量凝結而成。"
    },
    {
      "id": "refinedOre",
      "n": "精煉玄鐵",
      "rarity": "uncommon",
      "d": "高級鍛造素材。"
    },
    {
      "id": "forgeStone",
      "n": "高級鍛造石",
      "rarity": "rare",
      "d": "後續鍛造系統的高階材料。"
    },
    {
      "id": "starDust",
      "n": "黯星砂",
      "rarity": "rare",
      "d": "稀有靈媒素材。"
    }
  ],
  "consumables": [
    {
      "id": "confusionCharm",
      "n": "迷心符",
      "d": "指定一名敵人混亂 2 次行動，首領 1 次；沒有其他敵人可打時略過行動",
      "price": 65,
      "shop": true
    },
    {
      "id": "salve",
      "n": "止血草膏",
      "d": "自己或存活傭兵恢復 45 HP",
      "hp": 45,
      "price": 30,
      "shop": true
    },
    {
      "id": "greaterSalve",
      "n": "金創藥膏",
      "d": "自己或存活傭兵恢復 100 HP",
      "hp": 100,
      "price": 75,
      "shop": true
    },
    {
      "id": "supremeSalve",
      "n": "九轉續命散",
      "d": "自己或存活傭兵恢復 220 HP",
      "hp": 220,
      "price": 165,
      "shop": true
    },
    {
      "id": "tonic",
      "n": "清靈草液",
      "d": "自己或存活傭兵恢復 35 MP",
      "mp": 35,
      "price": 40,
      "shop": true
    },
    {
      "id": "greaterTonic",
      "n": "凝神露",
      "d": "自己或存活傭兵恢復 80 MP",
      "mp": 80,
      "price": 90,
      "shop": true
    },
    {
      "id": "supremeTonic",
      "n": "玉髓靈液",
      "d": "自己或存活傭兵恢復 160 MP",
      "mp": 160,
      "price": 180,
      "shop": true
    },
    {
      "id": "scroll",
      "n": "復歸卷",
      "d": "倒下時可原地恢復",
      "price": 180,
      "shop": true
    },
    {
      "id": "expPage",
      "n": "悟道殘頁",
      "d": "使用後立即增加 50 歷練",
      "price": null,
      "shop": false
    },
    {
      "id": "manaIncense",
      "n": "聚靈香",
      "d": "指定自己或存活傭兵，本場每回合恢復 5 MP",
      "price": null,
      "shop": false
    },
    {
      "id": "statFruit",
      "n": "淬體靈果",
      "d": "永久獲得 1 點可分配屬性",
      "price": null,
      "shop": false
    },
    {
      "id": "skillPage",
      "n": "武學殘章",
      "d": "永久獲得 1 點技能點",
      "price": null,
      "shop": false
    },
    {
      "id": "vitalElixir",
      "n": "還魂玉露",
      "d": "自己或存活傭兵恢復 100% 生命",
      "full": "hp",
      "price": null,
      "shop": false
    },
    {
      "id": "spiritElixir",
      "n": "太虛靈露",
      "d": "自己或存活傭兵恢復 100% 法力",
      "full": "mp",
      "price": null,
      "shop": false
    }
  ],
  "lootDrops": [
    {
      "monsterId": "wolf",
      "itemId": "fang",
      "chance": 0.5
    },
    {
      "monsterId": "wolf",
      "itemId": "cloth",
      "chance": 0.14
    },
    {
      "monsterId": "wolf",
      "itemId": "purpleJade",
      "chance": 0.01
    },
    {
      "monsterId": "boar",
      "itemId": "fang",
      "chance": 0.44
    },
    {
      "monsterId": "boar",
      "itemId": "cloth",
      "chance": 0.2
    },
    {
      "monsterId": "beastkin",
      "itemId": "fang",
      "chance": 0.38
    },
    {
      "monsterId": "beastkin",
      "itemId": "ironPlate",
      "chance": 0.14
    },
    {
      "monsterId": "fangLord",
      "itemId": "spiritCore",
      "chance": 1
    },
    {
      "monsterId": "fangLord",
      "itemId": "fang",
      "chance": 0.55
    },
    {
      "monsterId": "fangLord",
      "itemId": "forgeStone",
      "chance": 0.1
    },
    {
      "monsterId": "raider",
      "itemId": "cloth",
      "chance": 0.46
    },
    {
      "monsterId": "raider",
      "itemId": "ironPlate",
      "chance": 0.13
    },
    {
      "monsterId": "raider",
      "itemId": "purpleJade",
      "chance": 0.01
    },
    {
      "monsterId": "adept",
      "itemId": "sealPaper",
      "chance": 0.48
    },
    {
      "monsterId": "adept",
      "itemId": "starDust",
      "chance": 0.01
    },
    {
      "monsterId": "adept",
      "itemId": "purpleJade",
      "chance": 0.01
    },
    {
      "monsterId": "soldier",
      "itemId": "ironPlate",
      "chance": 0.44
    },
    {
      "monsterId": "soldier",
      "itemId": "refinedOre",
      "chance": 0.09
    },
    {
      "monsterId": "soldier",
      "itemId": "forgeStone",
      "chance": 0.02
    },
    {
      "monsterId": "guardian",
      "itemId": "spiritCore",
      "chance": 1
    },
    {
      "monsterId": "guardian",
      "itemId": "forgeStone",
      "chance": 0.18
    },
    {
      "monsterId": "guardian",
      "itemId": "purpleJade",
      "chance": 0.01
    },
    {
      "monsterId": "spider",
      "itemId": "venom",
      "chance": 0.38
    },
    {
      "monsterId": "spider",
      "itemId": "cloth",
      "chance": 0.17
    },
    {
      "monsterId": "spider",
      "itemId": "starDust",
      "chance": 0.01
    },
    {
      "monsterId": "mantis",
      "itemId": "venom",
      "chance": 0.4
    },
    {
      "monsterId": "mantis",
      "itemId": "carapace",
      "chance": 0.25
    },
    {
      "monsterId": "beetle",
      "itemId": "carapace",
      "chance": 0.5
    },
    {
      "monsterId": "beetle",
      "itemId": "ironPlate",
      "chance": 0.14
    },
    {
      "monsterId": "broodQueen",
      "itemId": "spiritCore",
      "chance": 1
    },
    {
      "monsterId": "broodQueen",
      "itemId": "venom",
      "chance": 0.58
    },
    {
      "monsterId": "broodQueen",
      "itemId": "forgeStone",
      "chance": 0.14
    },
    {
      "monsterId": "hawk",
      "itemId": "feather",
      "chance": 0.48
    },
    {
      "monsterId": "hawk",
      "itemId": "cloth",
      "chance": 0.14
    },
    {
      "monsterId": "caveBat",
      "itemId": "feather",
      "chance": 0.34
    },
    {
      "monsterId": "caveBat",
      "itemId": "venom",
      "chance": 0.17
    },
    {
      "monsterId": "windRaptor",
      "itemId": "feather",
      "chance": 0.52
    },
    {
      "monsterId": "windRaptor",
      "itemId": "starDust",
      "chance": 0.01
    },
    {
      "monsterId": "stormRoc",
      "itemId": "spiritCore",
      "chance": 1
    },
    {
      "monsterId": "stormRoc",
      "itemId": "feather",
      "chance": 0.64
    },
    {
      "monsterId": "stormRoc",
      "itemId": "forgeStone",
      "chance": 0.16
    },
    {
      "monsterId": "lizardScout",
      "itemId": "scale",
      "chance": 0.44
    },
    {
      "monsterId": "lizardScout",
      "itemId": "ironPlate",
      "chance": 0.16
    },
    {
      "monsterId": "lizardShaman",
      "itemId": "scale",
      "chance": 0.38
    },
    {
      "monsterId": "lizardShaman",
      "itemId": "sealPaper",
      "chance": 0.28
    },
    {
      "monsterId": "lizardShaman",
      "itemId": "starDust",
      "chance": 0.01
    },
    {
      "monsterId": "lizardGuard",
      "itemId": "scale",
      "chance": 0.5
    },
    {
      "monsterId": "lizardGuard",
      "itemId": "refinedOre",
      "chance": 0.12
    },
    {
      "monsterId": "scaleWarlord",
      "itemId": "spiritCore",
      "chance": 1
    },
    {
      "monsterId": "scaleWarlord",
      "itemId": "scale",
      "chance": 0.68
    },
    {
      "monsterId": "scaleWarlord",
      "itemId": "forgeStone",
      "chance": 0.2
    }
  ],
  "regionalDrops": [
    {
      "itemId": "salve",
      "chance": 0.08
    },
    {
      "itemId": "expPage",
      "chance": 0.01
    },
    {
      "itemId": "manaIncense",
      "chance": 0.02
    },
    {
      "itemId": "statFruit",
      "chance": 0.002
    },
    {
      "itemId": "skillPage",
      "chance": 0.002
    }
  ],
  "equipment": [
    {
      "id": "metalSword1",
      "n": "白鐵長劍",
      "slot": "weapon",
      "element": "金",
      "lv": 1,
      "atk": 3,
      "def": 0,
      "price": 85,
      "shop": true,
      "weaponStyle": "sword"
    },
    {
      "id": "metalSword2",
      "n": "玄鋼長劍",
      "slot": "weapon",
      "element": "金",
      "lv": 2,
      "atk": 6,
      "def": 0,
      "price": 180,
      "shop": true,
      "weaponStyle": "sword"
    },
    {
      "id": "metalSword3",
      "n": "破軍金刃",
      "slot": "weapon",
      "element": "金",
      "lv": 3,
      "atk": 9,
      "def": 0,
      "shop": false,
      "weaponStyle": "sword"
    },
    {
      "id": "metalSword4",
      "n": "天衡金鋒",
      "slot": "weapon",
      "element": "金",
      "lv": 4,
      "atk": 12,
      "def": 0,
      "shop": false,
      "weaponStyle": "sword"
    },
    {
      "id": "woodBow1",
      "n": "青木短弓",
      "slot": "weapon",
      "element": "木",
      "lv": 1,
      "atk": 3,
      "def": 0,
      "price": 85,
      "shop": true,
      "weaponStyle": "bow"
    },
    {
      "id": "woodBow2",
      "n": "古藤靈弓",
      "slot": "weapon",
      "element": "木",
      "lv": 2,
      "atk": 6,
      "def": 0,
      "price": 180,
      "shop": true,
      "weaponStyle": "bow"
    },
    {
      "id": "woodBow3",
      "n": "蒼林戰弓",
      "slot": "weapon",
      "element": "木",
      "lv": 3,
      "atk": 9,
      "def": 0,
      "shop": false,
      "weaponStyle": "bow"
    },
    {
      "id": "woodBow4",
      "n": "萬枝神弦",
      "slot": "weapon",
      "element": "木",
      "lv": 4,
      "atk": 12,
      "def": 0,
      "shop": false,
      "weaponStyle": "bow"
    },
    {
      "id": "waterStaff1",
      "n": "清泉法杖",
      "slot": "weapon",
      "element": "水",
      "lv": 1,
      "atk": 3,
      "def": 0,
      "price": 85,
      "shop": true,
      "weaponStyle": "staff"
    },
    {
      "id": "waterStaff2",
      "n": "寒潭法杖",
      "slot": "weapon",
      "element": "水",
      "lv": 2,
      "atk": 6,
      "def": 0,
      "price": 180,
      "shop": true,
      "weaponStyle": "staff"
    },
    {
      "id": "waterStaff3",
      "n": "滄浪玄杖",
      "slot": "weapon",
      "element": "水",
      "lv": 3,
      "atk": 9,
      "def": 0,
      "shop": false,
      "weaponStyle": "staff"
    },
    {
      "id": "waterStaff4",
      "n": "玄海靈杖",
      "slot": "weapon",
      "element": "水",
      "lv": 4,
      "atk": 12,
      "def": 0,
      "shop": false,
      "weaponStyle": "staff"
    },
    {
      "id": "fireBlade1",
      "n": "赤火短刃",
      "slot": "weapon",
      "element": "火",
      "lv": 1,
      "atk": 3,
      "def": 0,
      "price": 85,
      "shop": true,
      "weaponStyle": "blade"
    },
    {
      "id": "fireBlade2",
      "n": "燎原雙刃",
      "slot": "weapon",
      "element": "火",
      "lv": 2,
      "atk": 6,
      "def": 0,
      "price": 180,
      "shop": true,
      "weaponStyle": "blade"
    },
    {
      "id": "fireBlade3",
      "n": "炎獄戰刃",
      "slot": "weapon",
      "element": "火",
      "lv": 3,
      "atk": 9,
      "def": 0,
      "shop": false,
      "weaponStyle": "blade"
    },
    {
      "id": "fireBlade4",
      "n": "朱焰神鋒",
      "slot": "weapon",
      "element": "火",
      "lv": 4,
      "atk": 12,
      "def": 0,
      "shop": false,
      "weaponStyle": "blade"
    },
    {
      "id": "earthHammer1",
      "n": "黃土戰錘",
      "slot": "weapon",
      "element": "土",
      "lv": 1,
      "atk": 3,
      "def": 0,
      "price": 85,
      "shop": true,
      "weaponStyle": "hammer"
    },
    {
      "id": "earthHammer2",
      "n": "磐石重錘",
      "slot": "weapon",
      "element": "土",
      "lv": 2,
      "atk": 6,
      "def": 0,
      "price": 180,
      "shop": true,
      "weaponStyle": "hammer"
    },
    {
      "id": "earthHammer3",
      "n": "鎮岳巨槌",
      "slot": "weapon",
      "element": "土",
      "lv": 3,
      "atk": 9,
      "def": 0,
      "shop": false,
      "weaponStyle": "hammer"
    },
    {
      "id": "earthHammer4",
      "n": "后土神槌",
      "slot": "weapon",
      "element": "土",
      "lv": 4,
      "atk": 12,
      "def": 0,
      "shop": false,
      "weaponStyle": "hammer"
    },
    {
      "id": "clothHelm",
      "n": "粗布額巾",
      "slot": "helmet",
      "lv": 1,
      "atk": 0,
      "def": 1,
      "price": 55,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ironHelm",
      "n": "鑲鐵盔",
      "slot": "helmet",
      "lv": 2,
      "atk": 0,
      "def": 2,
      "price": 120,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ringHelm",
      "n": "鎖環戰盔",
      "slot": "helmet",
      "lv": 3,
      "atk": 0,
      "def": 3,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "generalHelm",
      "n": "將軍兜鍪",
      "slot": "helmet",
      "lv": 4,
      "atk": 0,
      "def": 4,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "clothArmor",
      "n": "麻布護衣",
      "slot": "armor",
      "lv": 1,
      "atk": 0,
      "def": 2,
      "price": 70,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ironArmor",
      "n": "鑲鐵戰甲",
      "slot": "armor",
      "lv": 2,
      "atk": 0,
      "def": 4,
      "price": 160,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ringArmor",
      "n": "鎖環重衣",
      "slot": "armor",
      "lv": 3,
      "atk": 0,
      "def": 6,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "darkArmor",
      "n": "玄紋戰鎧",
      "slot": "armor",
      "lv": 4,
      "atk": 0,
      "def": 8,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "clothGloves",
      "n": "皮革護手",
      "slot": "gloves",
      "lv": 1,
      "atk": 1,
      "def": 1,
      "price": 60,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ironGloves",
      "n": "精鐵護手",
      "slot": "gloves",
      "lv": 2,
      "atk": 2,
      "def": 2,
      "price": 135,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "warGloves",
      "n": "破軍臂甲",
      "slot": "gloves",
      "lv": 3,
      "atk": 3,
      "def": 3,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "obsidianGloves",
      "n": "黑曜戰臂",
      "slot": "gloves",
      "lv": 4,
      "atk": 4,
      "def": 4,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "leatherBelt",
      "n": "素革腰帶",
      "slot": "belt",
      "lv": 1,
      "atk": 0,
      "def": 1,
      "price": 50,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "bronzeBelt",
      "n": "青銅束腰",
      "slot": "belt",
      "lv": 2,
      "atk": 0,
      "def": 2,
      "price": 110,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "warBelt",
      "n": "鎮軍腰封",
      "slot": "belt",
      "lv": 3,
      "atk": 1,
      "def": 3,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "jadeBelt",
      "n": "玄玉戰帶",
      "slot": "belt",
      "lv": 4,
      "atk": 2,
      "def": 4,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "clothPants",
      "n": "粗麻褲裝",
      "slot": "pants",
      "lv": 1,
      "atk": 0,
      "def": 1,
      "price": 60,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ironPants",
      "n": "鑲片腿甲",
      "slot": "pants",
      "lv": 2,
      "atk": 0,
      "def": 3,
      "price": 140,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "ringPants",
      "n": "鎖環腿甲",
      "slot": "pants",
      "lv": 3,
      "atk": 0,
      "def": 5,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "obsidianPants",
      "n": "黑曜腿鎧",
      "slot": "pants",
      "lv": 4,
      "atk": 0,
      "def": 7,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "lightBoots",
      "n": "輕行靴",
      "slot": "boots",
      "lv": 1,
      "atk": 1,
      "def": 0,
      "price": 55,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "battleBoots",
      "n": "硬皮戰靴",
      "slot": "boots",
      "lv": 2,
      "atk": 1,
      "def": 2,
      "price": 125,
      "shop": true,
      "weaponStyle": null
    },
    {
      "id": "windBoots",
      "n": "疾風戰履",
      "slot": "boots",
      "lv": 3,
      "atk": 2,
      "def": 3,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "starBoots",
      "n": "踏星玄靴",
      "slot": "boots",
      "lv": 4,
      "atk": 3,
      "def": 4,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "autoNecklace1",
      "n": "應急骨鍊",
      "slot": "necklace",
      "lv": 1,
      "atk": 0,
      "def": 1,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "autoNecklace2",
      "n": "回生玉鍊",
      "slot": "necklace",
      "lv": 2,
      "atk": 0,
      "def": 2,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "autoNecklace3",
      "n": "續命玄鍊",
      "slot": "necklace",
      "lv": 3,
      "atk": 1,
      "def": 2,
      "shop": false,
      "weaponStyle": null
    },
    {
      "id": "autoNecklace4",
      "n": "不息靈鍊",
      "slot": "necklace",
      "lv": 4,
      "atk": 1,
      "def": 3,
      "shop": false,
      "weaponStyle": null
    }
  ],
  "affixes": [
    {
      "id": "blessed",
      "n": "祝福的",
      "d": "攻擊 +1、防禦 +1",
      "atk": 1,
      "def": 1
    },
    {
      "id": "fierce",
      "n": "猛烈的",
      "d": "攻擊 +2",
      "atk": 2
    },
    {
      "id": "guarding",
      "n": "守護的",
      "d": "防禦 +2",
      "def": 2
    },
    {
      "id": "growing",
      "n": "增長的",
      "d": "所有已學技能有效階級 +1",
      "skill": 1
    },
    {
      "id": "thorny",
      "n": "刺刺的",
      "d": "受到傷害時反彈實際傷害的 15%",
      "reflect": 0.15
    },
    {
      "id": "heated",
      "n": "熱熱的",
      "d": "每回合使敵人承受最大生命 5% 的灼熱傷害",
      "burn": 0.05
    },
    {
      "id": "energetic",
      "n": "精力的",
      "d": "每回合恢復 3 點法力",
      "mp": 3
    },
    {
      "id": "automatic",
      "n": "自動的",
      "d": "生命低於 30% 時自動服用一份止血草膏",
      "autoSalve": true
    }
  ],
  "sets": [
    {
      "id": "wolfwalker",
      "n": "蒼狼行者",
      "source": "獸族棲息地",
      "bonuses": {
        "2": {
          "label": "攻擊 +2",
          "atk": 2
        },
        "4": {
          "label": "閃避 +5%",
          "dodge": 0.05
        },
        "6": {
          "label": "暴擊 +8%",
          "crit": 0.08
        }
      }
    },
    {
      "id": "ironwarden",
      "n": "玄鐵衛",
      "source": "人族棲息地",
      "bonuses": {
        "2": {
          "label": "防禦 +3",
          "def": 3
        },
        "4": {
          "label": "生命上限 +24",
          "maxHp": 24
        },
        "6": {
          "label": "受到傷害 -12%",
          "reduction": 0.12
        }
      }
    },
    {
      "id": "ember",
      "n": "蟲王赤燼",
      "source": "蟲族棲息地",
      "bonuses": {
        "2": {
          "label": "攻擊 +2",
          "atk": 2
        },
        "4": {
          "label": "每回合灼熱 3%",
          "burn": 0.03
        },
        "6": {
          "label": "造成傷害 +12%",
          "damage": 0.12
        }
      }
    },
    {
      "id": "skyfeather",
      "n": "凌風羽衣",
      "source": "飛行族棲息地",
      "bonuses": {
        "2": {
          "label": "閃避 +3%",
          "dodge": 0.03
        },
        "4": {
          "label": "暴擊 +6%",
          "crit": 0.06
        },
        "6": {
          "label": "造成傷害 +10%",
          "damage": 0.1
        }
      }
    },
    {
      "id": "spiritvein",
      "n": "靈鱗祭裝",
      "source": "蜥蜴人族棲息地",
      "bonuses": {
        "2": {
          "label": "法力上限 +12",
          "maxMp": 12
        },
        "4": {
          "label": "每回合法力 +2",
          "mp": 2
        },
        "6": {
          "label": "全技能有效階級 +1",
          "skill": 1
        }
      }
    }
  ],
  "quests": [
    {
      "id": "herb_bundle",
      "floor": 1,
      "name": "石縫裡的藥草",
      "d": "一名採藥人需要暗窟獸群活動處附近的青紋藥草。",
      "item": "青紋藥草",
      "need": 2,
      "chance": 0.5,
      "reward": {
        "gold": 110,
        "exp": 60,
        "skill": 1
      }
    },
    {
      "id": "lost_seals",
      "floor": 2,
      "name": "散落的鎮符",
      "d": "遊方術士請你從本層敵人附近尋回被風吹散的鎮符。",
      "item": "鎮符殘頁",
      "need": 3,
      "chance": 0.45,
      "reward": {
        "gold": 180,
        "exp": 95,
        "skill": 1
      }
    },
    {
      "id": "silk_samples",
      "floor": 3,
      "name": "腐絲標本",
      "d": "巡查者需要蟲群留下的腐絲標本，以確認蟲巢擴張方向。",
      "item": "腐絲標本",
      "need": 3,
      "chance": 0.44,
      "reward": {
        "gold": 260,
        "exp": 140,
        "material": "forgeStone"
      }
    },
    {
      "id": "lost_feathers",
      "floor": 4,
      "name": "失落的嵐羽",
      "d": "崖邊旅人請你尋回被飛行族捲走的嵐羽束。",
      "item": "嵐羽束",
      "need": 3,
      "chance": 0.42,
      "reward": {
        "gold": 330,
        "exp": 175,
        "skill": 1
      }
    },
    {
      "id": "ancient_scales",
      "floor": 5,
      "name": "古沼鱗紋",
      "d": "遺跡學者需要鱗族身上的紋片，解讀沼地石碑。",
      "item": "鱗紋片",
      "need": 4,
      "chance": 0.4,
      "reward": {
        "gold": 420,
        "exp": 220,
        "material": "forgeStone"
      }
    }
  ],
  "artProfiles": [
    {
      "id": "sword",
      "src": "assets/actors.png",
      "row": 0,
      "columns": 4,
      "rows": 4
    },
    {
      "id": "staff",
      "src": "assets/actors.png",
      "row": 1,
      "columns": 4,
      "rows": 4
    },
    {
      "id": "bow",
      "src": "assets/actors.png",
      "row": 2,
      "columns": 4,
      "rows": 4
    },
    {
      "id": "daggers",
      "src": "assets/actors.png",
      "row": 3,
      "columns": 4,
      "rows": 4
    },
    {
      "id": "blade",
      "src": "assets/heavy-actors.png",
      "row": 0,
      "columns": 4,
      "rows": 2
    },
    {
      "id": "hammer",
      "src": "assets/heavy-actors.png",
      "row": 1,
      "columns": 4,
      "rows": 2
    }
  ],
  "npcPortraits": [
    {
      "id": "herbalist",
      "src": "assets/npc-herbalist.png"
    },
    {
      "id": "smith",
      "src": "assets/npc-smith.png"
    },
    {
      "id": "elder",
      "src": "assets/npc-elder.png"
    },
    {
      "id": "trainer",
      "src": "assets/npc-trainer.png"
    },
    {
      "id": "sage",
      "src": "assets/npc-sage.png"
    },
    {
      "id": "guide",
      "src": "assets/npc-guide.png"
    },
    {
      "id": "merchant",
      "src": "assets/npc-merchant.png"
    },
    {
      "id": "inn",
      "src": "assets/npc-inn.png"
    },
    {
      "id": "quest1",
      "src": "assets/npc-quest1.png"
    },
    {
      "id": "quest2",
      "src": "assets/npc-quest2.png"
    },
    {
      "id": "quest3",
      "src": "assets/npc-quest3.png"
    },
    {
      "id": "quest4",
      "src": "assets/npc-quest4.png"
    },
    {
      "id": "quest5",
      "src": "assets/npc-quest5.png"
    }
  ]
},
 migrate(){for(const [name,schema] of Object.entries(this.schemas)){const table=this.tables[name]||(this.tables[name]=[]);for(const row of table)for(const [field,value] of Object.entries(schema))if(row[field]===undefined)row[field]=structuredClone(value)}for(const row of this.tables.equipment)if(row.slot==='weapon'&&!row.weaponStyle){const id=row.id||'';row.weaponStyle=id.startsWith('metalSword')?'sword':id.startsWith('woodBow')?'bow':id.startsWith('waterStaff')?'staff':id.startsWith('fireBlade')?'blade':id.startsWith('earthHammer')?'hammer':null}return this},
 validate(){const errors=[],ids={};for(const [name,rows] of Object.entries(this.tables)){ids[name]=new Set;for(const row of rows){if('id'in row){if(!row.id)errors.push(name+' 有空白 id');else if(ids[name].has(row.id))errors.push(name+' 重複 id: '+row.id);else ids[name].add(row.id)}}}for(const r of this.tables.lootDrops){if(!ids.monsters.has(r.monsterId))errors.push('掉落表找不到怪物: '+r.monsterId);if(!ids.materials.has(r.itemId))errors.push('掉落表找不到素材: '+r.itemId);if(r.chance<0||r.chance>1)errors.push('掉落率超出範圍: '+r.monsterId+'/'+r.itemId)}for(const r of this.tables.regionalDrops){if(!ids.consumables.has(r.itemId))errors.push('區域掉落找不到道具: '+r.itemId)}const questFloors=new Set;for(const q of this.tables.quests){const floor=String(q.floor);if(!ids.regions.has(floor))errors.push('任務表找不到樓層區域: '+q.id+'/'+q.floor);else if(questFloors.has(floor))errors.push('任務表樓層重複: '+q.floor);else questFloors.add(floor)}for(const row of this.tables.equipment)if(row.weaponStyle&&!ids.artProfiles.has(row.weaponStyle))errors.push('武器造型不存在: '+row.id);for(const row of this.tables.artProfiles)if(!Number.isInteger(row.row)||row.row<0||row.row>=row.rows||row.columns!==4||!/^assets\/[a-zA-Z0-9_-]+\.png$/.test(row.src))errors.push('圖集座標或路徑錯誤: '+row.id);for(const row of this.tables.npcPortraits)if(!/^assets\/[a-zA-Z0-9_-]+\.png$/.test(row.src))errors.push('頭像路徑錯誤: '+row.id);if(errors.length)throw new Error('GameDatabase 驗證失敗\n'+errors.join('\n'));return true},
 apply(content){this.migrate().validate();const map=(name)=>Object.fromEntries(this.tables[name].map(({id,...row})=>[id,row]));content.regions=map('regions');content.monsters=this.tables.monsters.map(x=>({...x}));content.items=map('materials');content.consumables=map('consumables');content.shop=Object.fromEntries(this.tables.consumables.filter(x=>x.shop&&x.price!=null).map(({id,n,d,price})=>[id,{n,d,price}]));content.drops={};for(const r of this.tables.lootDrops)(content.drops[r.monsterId]??=[]).push({k:r.itemId,p:r.chance});content.regionalConsumables=this.tables.regionalDrops.map(r=>({k:r.itemId,p:r.chance}));content.equipmentBases=map('equipment');content.equipmentShop=this.tables.equipment.filter(x=>x.shop).map(x=>x.id);content.affixes=map('affixes');content.sets=map('sets');content.quests=Object.fromEntries(this.tables.quests.map(({floor,...row})=>[floor,row]));content.floorEnemies=Object.fromEntries(this.tables.regions.map(r=>[r.id,r.enemies]));content.bossByFloor=Object.fromEntries(this.tables.regions.map(r=>[r.id,r.boss]));return content}
};

