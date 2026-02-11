const POKEMON_OMIEGA = [{
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
}];
const MOVES_OMIEGA = [{
    "name": "raging tide",
    "type": "water",
    "category": "special",
    "power": 40,
    "acc": 90,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        for (let acc = 80; ; acc -= 10) {
            if (Math.random() < acc / 100) {
                dealDmg(false, e.totalDmg);
            } else break;
        }
    }
}, {
    "name": "pretend",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        if (getPkmn(false).defStage > -3) modifyStats(false, "def", -1, 1);
        else dealDmg(false, 40);
    }
}];
const TRANSLATION_OMIEGA = {
    "en": {
        "pokemon": {
            "semenshooter": "Semenshooter",
            "masterat": "Masterat"
        },
        "moves": {
            "raging tide": "Raging Tide",
            "pretend": "Pretend"
        },
        "moveDesc": {
            "raging tide": "",
            "pretend": ""
        }
    },
    "zh": {
        "pokemon": {
            "semenshooter": "",
            "masterat": "老鼠大师"
        },
        "moves": {
            "raging tide": "群鼠狂潮",
            "pretend": "假动作"
        },
        "moveDesc": {
            "raging tide": "发动一轮或多轮的攻势，每次的命中率依次递减。",
            "pretend": "向对手做假动作，降低对手的防御。时机成熟时再发动攻击。"
        }
    }
};
const ICONS_OMIEGA = {
    "masterat": { "row": 1, "cell": 1 },
    "semenshooter": { "row": 1, "cell": 1 }
};