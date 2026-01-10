const POKEMON_OMIEGA = [{
    "name": "masterat",
    "type": ["grass"],
    "hp": 50,
    "atk": 50,
    "def": 50,
    "sp": 50,
    "spe": 50,
    "moves": ["raging tide"]
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
}];
const TRANSLATION_OMIEGA = {
    "en": {
        "pokemon": {
            "semenshooter": "Semenshooter",
            "masterat": "Masterat"
        },
        "moves": {
            "raging tide": "Raging Tide"
        },
        "moveDesc":{
            "raging tide": ""
        }
    },
    "zh": {
        "pokemon": {
            "semenshooter": "",
            "masterat": "老鼠大师"
        },
        "moves": {
            "raging tide": "群鼠狂潮"
        }
    }
};