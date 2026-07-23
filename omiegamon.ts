const POKEMON_OMIEGA: Pkmn[] = [{
    "name": "masterat",
    "type": ["grass"],
    "hp": 50,
    "atk": 50,
    "def": 50,
    "sp": 50,
    "spe": 50,
    "moves": ["raging tide", "pretend"]
}, {
    "name": "semenshooter",
    "type": ["grass"],
    "hp": 1,
    "atk": 1,
    "def": 1,
    "sp": 1,
    "spe": 480,
    "moves": []
}, {
    "name": "squash",
    "type": ["grass"],
    "hp": 45,
    "atk": 90,
    "def": 45,
    "sp": 45,
    "spe": 45,
    "moves": ["squashy stomp"]
}, {
    "name": "florr",
    "type": ["grass"],
    "hp": 45,
    "atk": 90,
    "def": 45,
    "sp": 45,
    "spe": 45,
    "moves": ["stinger", "poker chip"]
}];
const MOVES_OMIEGA: PkmnMove[] = [{
    "name": "raging tide",
    "type": "water",
    "cat": "special",
    "power": 40,
    "acc": 90,
    "pp": 10,
    "priority": 0,
    "effect": function (e: effectParam) {
        for (let acc = 80; ; acc -= 10) {
            if (Math.random() < acc / 100) {
                dealDmg(false, e.totalDmg);
            } else break;
        }
    }
}, {
    "name": "pretend",
    "type": "normal",
    "cat": "physical",
    "power": 0,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (getPkmn(false).defStage > -3) modifyStats(false, "def", -1, 1);
        else dealDmg(false, 40);
    }
}, {
    "name": "squashy stomp",
    "type": "fighting",
    "cat": "physical",
    "power": 0,
    "acc": 90,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        if (getPkmn(false).name == "pikachu" || getPkmn(false).name == "raichu" || getPkmn(false).name == "masterat") dealDmg(false, 65536);
    }
}, {
    "name": "ashley's ritual",
    "type": "ghost",
    "cat": "status",
    "power": 0,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("frz", 1);
        modifyStats(true, "sp", -1, 1);
    }
}, {
    "name": "stinger",
    "type": "fighting",
    "cat": "physical",
    "power": 90,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        putToSleep(true, 3);
    }
}, {
    "name": "poker chip",
    "type": "normal",
    "cat": "physical",
    "power": 20,
    "acc": 100,
    "pp": 25,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "eva", -1, 1);
    }
}];
const TRANSLATION_OMIEGA: Translation = {
    "en": {
        "pokemon": {
            "semenshooter": "Semenshooter",
            "masterat": "Masterat"
        },
        "moves": {
            "raging tide": "Raging Tide",
            "pretend": "Pretend",
            "squashy stomp": "Squashy Stomp",
            "ashley's ritual": "Ashley's Ritual",
            "stinger": "Stinger",
            "poker chip": "Poker Chip"
        },
        "moveDesc": {
            "raging tide": "",
            "pretend": "",
            "stinger": "It really hurts, but it's very fragile. Puts the user to sleep for 5 turns after being used."
        }
    },
    "zh": {
        "pokemon": {
            "semenshooter": "",
            "masterat": "老鼠大师"
        },
        "moves": {
            "raging tide": "群鼠狂潮",
            "pretend": "假动作",
            "stinger": "刺"
        },
        "moveDesc": {
            "raging tide": "发动一轮或多轮的攻势，每次的命中率依次递减。",
            "pretend": "向对手做假动作，降低对手的防御。时机成熟时再发动攻击。",
            "ashley's ritual": "",
            "stinger": "攻击很强，却十分脆弱。使用后将使用者置于睡眠状态5回合。"
        }
    }
};
const ICONS_OMIEGA: Icons = {
    "masterat": { "row": 1, "cell": 1 },
    "semenshooter": { "row": 1, "cell": 1 }
};