const MOVES = [{
    "name": "absorb",
    "type": "grass",
    "category": "special",
    "power": 20,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "acid",
    "type": "poison",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "def", -1, 1 / 3);
    }
}, {
    "name": "acid armor",
    "type": "poison",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "def", 2, 1);
    }
}, {
    "name": "agility",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "spe", 2, 1);
    }
}, {
    "name": "amnesia",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "sp", 2, 1);
    }
}, {
    "name": "aurora beam",
    "type": "ice",
    "category": "special",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "atk", -1, 1 / 3);
    }
}, {
    "name": "barrage",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "barrier",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "def", 2, 1);
    }
}, {
    "name": "bide",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "preDmgEffect": function () {
        getPkmn(true).dmgTaken = [];
        if (Math.random() < 0.5) charge("bide", 2);
        else charge("bide", 3);
    },
    "effect": function () {
        let sum = 0;
        for (let i of getPkmn(true).dmgTaken) {
            sum += i;
        }
        dealDmg(false, sum * 2);
    }
}, {
    "name": "bind",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 75,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random(), turns = 0;
        if (num < 3 / 8) turns = 1;
        else if (num < 6 / 8) turns = 2;
        else if (num < 7 / 8) turns = 3;
        else turns = 4;
        setUncontrollable(true, "bind", turns);
        setUncontrollable(false, "", turns);
    }
}, {
    "name": "bite",
    "type": "normal",
    "category": "physical",
    "power": 60,
    "acc": 100,
    "pp": 25,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true };
    }
}, {
    "name": "blizzard",
    "type": "ice",
    "category": "special",
    "power": 120,
    "acc": 90,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        modifyStatus("frz", 0.1);
    }
}, {
    "name": "body slam",
    "type": "normal",
    "category": "physical",
    "power": 85,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        if (!getType(false).includes("normal")) modifyStatus("par", 0.3);
    }
}, {
    "name": "bone club",
    "type": "ground",
    "category": "physical",
    "power": 65,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true };
    }
}, {
    "name": "bonemerang",
    "type": "ground",
    "category": "physical",
    "power": 50,
    "acc": 90,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        repeatAttack(e.totalDmg, 1);
    }
}, {
    "name": "bubble",
    "type": "water",
    "category": "special",
    "power": 20,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "spe", -1, 1 / 3);
    }
}, {
    "name": "bubble beam",
    "type": "water",
    "category": "special",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "spe", -1, 1 / 3);
    }
}, {
    "name": "clamp",
    "type": "water",
    "category": "special",
    "power": 35,
    "acc": 75,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random(), turns = 0;
        if (num < 3 / 8) turns = 1;
        else if (num < 6 / 8) turns = 2;
        else if (num < 7 / 8) turns = 3;
        else turns = 4;
        setUncontrollable(true, "clamp", turns);
        setUncontrollable(false, "", turns);
    }
}, {
    "name": "comet punch",
    "type": "normal",
    "category": "physical",
    "power": 18,
    "acc": 85,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "confuse ray",
    "type": "ghost",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        addTempEffect(false, "confused", 1 + Math.ceil(Math.random() * 4), 1);
    }
}, {
    "name": "confusion",
    "type": "psychic",
    "category": "special",
    "power": 50,
    "acc": 100,
    "pp": 25,
    "priority": 0,
    "effect": function () {
        addTempEffect(false, "confused", 1 + Math.ceil(Math.random() * 4), 0.1);
    }
}, {
    "name": "constrict",
    "type": "normal",
    "category": "physical",
    "power": 10,
    "acc": 100,
    "pp": 35,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "spe", -1, 1 / 3);
    }
}, {
    "name": "conversion",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        getPkmn(true).tempType = getStats(getPkmn(false).name).type;
    }
}, {
    "name": "counter",
    "type": "fighting",
    "category": "physical",
    "power": 1,
    "acc": 100,
    "pp": 20,
    "priority": -1,
    "effect": function () {
        if (getPkmn(true).lastDmgTakenType == "normal" || getPkmn(true).lastDmgTakenType == "fighting") {
            dealDmg(false, getPkmn(true).dmgTaken[getPkmn(true).dmgTaken.length - 1]);
        }
    }
}, {
    "name": "crabhammer",
    "type": "water",
    "category": "special",
    "power": 90,
    "acc": 85,
    "pp": 10,
    "priority": 0,
    "preCritEffect": function () {
        return { isHighCritRatio: true };
    }
}, {
    "name": "cut",
    "type": "normal",
    "category": "physical",
    "power": 50,
    "acc": 95,
    "pp": 30,
    "priority": 0
    //No additional effect.
}, {
    "name": "defense curl",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "def", 1, 1);
    }
}, {
    "name": "dig",
    "type": "ground",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "preDmgEffect": function () {
        charge("dig", 1);
        addTempEffect(true, "semiInvulnerable", 1, 1);
    }
}, {
    "name": "disable",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 55,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        let arr = [];
        for (let i in getPkmn(false).moves) {
            if (getPkmn(false).moves[i] > 0) arr.push(i);
        }
        getPkmn(false).disable = {
            move: arr[Math.floor(Math.random() * arr.length)],
            turns: Math.floor(Math.random() * 7)
        };
    }
}, {
    "name": "dizzy punch",
    "type": "normal",
    "category": "physical",
    "power": 70,
    "acc": 100,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "double kick",
    "type": "fighting",
    "category": "physical",
    "power": 30,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function (e) {
        repeatAttack(e.totalDmg, 1);
    }
}, {
    "name": "double slap",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 85,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "double team",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "eva", 1, 1);
    }
}, {
    "name": "double-edge",
    "type": "normal",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        dealDmg(true, e.totalDmg / 4);
    }
}, {
    "name": "dragon rage",
    "type": "dragon",
    "category": "special",
    "power": 1,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        dealDmg(false, 40);
    }
}, {
    "name": "dream eater",
    "type": "psychic",
    "category": "special",
    "power": 100,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        if (getPkmn(false).status == "slp") getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "drill peck",
    "type": "flying",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 20,
    "priority": 0
    //No additional effect.
}, {
    "name": "earthquake",
    "type": "ground",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "egg bomb",
    "type": "normal",
    "category": "physical",
    "power": 100,
    "acc": 75,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "ember",
    "type": "fire",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 25,
    "priority": 0,
    "effect": function () {
        modifyStatus("brn", 0.1);
    }
}, {
    "name": "explosion",
    "type": "normal",
    "category": "physical",
    "power": 170,
    "acc": 100,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        getPkmn(true).hp = 0;
    }
}, {
    "name": "fire blast",
    "type": "fire",
    "category": "special",
    "power": 120,
    "acc": 85,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        modifyStatus("brn", 0.3);
    }
}, {
    "name": "fire punch",
    "type": "fire",
    "category": "special",
    "power": 75,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("brn", 0.1);
    }
}, {
    "name": "fire spin",
    "type": "fire",
    "category": "special",
    "power": 15,
    "acc": 70,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random(), turns = 0;
        if (num < 3 / 8) turns = 1;
        else if (num < 6 / 8) turns = 2;
        else if (num < 7 / 8) turns = 3;
        else turns = 4;
        setUncontrollable(true, "fire spin", turns);
        setUncontrollable(false, "", turns);
    }
}, {
    "name": "fissure",
    "type": "ground",
    "category": "physical",
    "power": 0,
    "acc": 30,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        if (getStats(getPkmn(false).name).spe <= getStats(getPkmn(true).name).spe) {
            getPkmn(false).hp = 0;
        }
    }
}, {
    "name": "flamethrower",
    "type": "fire",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("brn", 0.1);
    }
}, {
    "name": "flash",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 70,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "acc", 1, 1);
        //An increase in Accuracy decreases the stages.
    }
}, {
    "name": "fly",
    "type": "flying",
    "category": "physical",
    "power": 70,
    "acc": 95,
    "pp": 15,
    "priority": 0,
    "preDmgEffect": function () {
        charge("fly", 1);
        addTempEffect(true, "semiInvulnerable", 1, 1);
    }
}, {
    "name": "focus energy",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        getPkmn(true).critProbMultiplier = 1 / 4;
    }
}, {
    "name": "fury attack",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "fury swipes",
    "type": "normal",
    "category": "physical",
    "power": 18,
    "acc": 80,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "glare",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 1);
    }
}, {
    "name": "growl",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "def", -1, 1);
    }
}, {
    "name": "growth",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "sp", 1, 1);
    }
}, {
    "name": "guillotine",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": 30,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        if (getStats(getPkmn(false).name).spe <= getStats(getPkmn(true).name).spe) {
            getPkmn(false).hp = 0;
        }
    }
}, {
    "name": "gust",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "harden",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "def", 1, 1);
    }
}, {
    "name": "haze",
    "type": "ice",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        for (let i of [true, false]) for (let j of ["atkStage", "defStage", "spStage", "speStage", "accStage", "evaStage"]) getPkmn(i)[j] = 0;
        getPkmn(false).status = "";
        if (getPkmn(true).status == "tox") getPkmn(true).status = "psn";
    }
}, {
    "name": "headbutt",
    "type": "normal",
    "category": "physical",
    "power": 70,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true };
    }
}, {
    "name": "high jump kick",
    "type": "fighting",
    "category": "physical",
    "power": 85,
    "acc": 90,
    "pp": 20,
    "priority": 0,
    "missEffect": function () {
        dealDmg(true, 1, { opposingSubstitute: true });
    }
}, {
    "name": "horn attack",
    "type": "normal",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 25,
    "priority": 0
    //No additional effect.
}, {
    "name": "horn drill",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": 30,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        if (getStats(getPkmn(false).name).spe <= getStats(getPkmn(true).name).spe) {
            getPkmn(false).hp = 0;
        }
    }
}, {
    "name": "hydro pump",
    "type": "water",
    "category": "special",
    "power": 120,
    "acc": 80,
    "pp": 5,
    "priority": 0
    //No additional effect.
}, {
    "name": "hyper beam",
    "type": "normal",
    "category": "physical",
    "power": 150,
    "acc": 90,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        charge("", 1);
    }
}, {
    "name": "hyper fang",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 90,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true };
    }
}, {
    "name": "hypnosis",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": 60,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7));
    }
}, {
    "name": "ice beam",
    "type": "ice",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        modifyStatus("frz", 0.1);
    }
}, {
    "name": "ice punch",
    "type": "ice",
    "category": "special",
    "power": 75,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("frz", 0.1);
    }
}, {
    "name": "jump kick",
    "type": "fighting",
    "category": "physical",
    "power": 70,
    "acc": 95,
    "pp": 25,
    "priority": 0,
    "missEffect": function () {
        dealDmg(true, 1, { opposingSubstitute: true });
    }
}, {
    "name": "karate chop",
    "type": "normal",
    "category": "physical",
    "power": 50,
    "acc": 100,
    "pp": 25,
    "priority": 0,
    "preCritEffect": function () {
        return { isHighCritRatio: true };
    }
}, {
    "name": "kinesis",
    "type": "psychic",
    "category": "",
    "power": 0,
    "acc": 80,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "acc", 1, 1);
        //An increase in Accuracy decreases the stages.
    }
}, {
    "name": "leech life",
    "type": "bug",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "leech seed",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 90,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        if (!getType(false).includes("grass")) addTempEffect(false, "leech seed", Infinity, 1);
    }
}, {
    "name": "leer",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "def", -1, 1);
    }
}, {
    "name": "lick",
    "type": "ghost",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 0.3);
    }
}, {
    "name": "light screen",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        addTempEffect(true, "light screen", Infinity, 1);
    }
}, {
    "name": "lovely kiss",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7));
    }
}, {
    "name": "low kick",
    "type": "fighting",
    "category": "physical",
    "power": 50,
    "acc": 90,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true };
    }
}, {
    "name": "meditate",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "atk", 1, 1);
    }
}, {
    "name": "mega drain",
    "type": "grass",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "mega kick",
    "type": "normal",
    "category": "physical",
    "power": 120,
    "acc": 75,
    "pp": 5,
    "priority": 0
    //No additional effect.
}, {
    "name": "mega punch",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 85,
    "pp": 20,
    "priority": 0
    //No additional effect.
}, {
    "name": "metronome",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        while (true) {
            if (MOVES[Math.floor(Math.random() * MOVES.length)].name != "metronome" && MOVES[Math.floor(Math.random() * MOVES.length)].name != "struggle") {
                attack(MOVES[Math.floor(Math.random() * MOVES.length)].name);
                break;
            }
        }
    }
}, {
    "name": "mimic",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        getPkmn(true).mimicMove = Object.keys(getPkmn(false).moves)[Math.floor(Object.keys(getPkmn(false).moves).length * Math
            .random())].name;
    }
}, {
    "name": "minimize",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "eva", 1, 1);
    }
}, {
    "name": "mirror move",
    "type": "flying",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        attack(getPkmn(false).lastMoveUsed);
    }
}, {
    "name": "mist",
    "type": "ice",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        addTempEffect(true, "mist", Infinity, 1);
    }
}, {
    "name": "night shade",
    "type": "ghost",
    "category": "physical",
    "power": 1,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        dealDmg(false, getPkmn(true).lv);
    }
}, {
    "name": "pay day",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 20,
    "priority": 0
    //No additional effect.
}, {
    "name": "peck",
    "type": "flying",
    "category": "physical",
    "power": 35,
    "acc": 100,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "petal dance",
    "type": "grass",
    "category": "special",
    "power": 70,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.5) {
            setUncontrollable(true, "petal dance", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 2);
        } else {
            setUncontrollable(true, "petal dance", 3);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 3);
        }
    }
}, {
    "name": "pin missile",
    "type": "bug",
    "category": "physical",
    "power": 14,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "poison gas",
    "type": "poison",
    "category": "status",
    "power": 0,
    "acc": 55,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStatus("psn", 1);
    }
}, {
    "name": "poison powder",
    "type": "poison",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 35,
    "priority": 0,
    "effect": function () {
        modifyStatus("psn", 1);
    }
}, {
    "name": "poison sting",
    "type": "poison",
    "category": "physical",
    "power": 15,
    "acc": 100,
    "pp": 35,
    "priority": 0,
    "effect": function () {
        modifyStatus("psn", 0.2);
    }
}, {
    "name": "pound",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "psybeam",
    "type": "psychic",
    "category": "special",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        addTempEffect(false, "confused", 1 + Math.ceil(Math.random() * 4), 0.1);
    }
}, {
    "name": "psychic",
    "type": "psychic",
    "category": "special",
    "power": 90,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "sp", -1, 1 / 3);
    }
}, {
    "name": "psywave",
    "type": "psychic",
    "category": "special",
    "power": 1,
    "acc": 80,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        dealDmg(false, Math.ceil(Math.random() * 149));
    }
}, {
    "name": "quick attack",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 30,
    "priority": 1
}, {
    "name": "rage",
    "type": "normal",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        addTempEffect(true, "rage", Infinity, 1);
        setUncontrollable(true, "rage", Infinity);
    }
}, {
    "name": "razor leaf",
    "type": "grass",
    "category": "special",
    "power": 55,
    "acc": 95,
    "pp": 25,
    "priority": 0,
    "preCritEffect": function () {
        return { isHighCritRatio: true };
    }
}, {
    "name": "razor wind",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 75,
    "pp": 10,
    "priority": 0,
    "preDmgEffect": function () {
        charge("razor wind", 1);
    }
}, {
    "name": "recover",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        let hpLost = getPkmn(true).maxHp - getPkmn(true).hp;
        if (hpLost != 255 && hpLost != 511) {
            getPkmn(true).hp += Math.min(getPkmn(true).maxHp / 2, hpLost);
            addSmallText("others", "hpRestored", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": playerToMove != viewpoint
            });
        }
    }
}, {
    "name": "reflect",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        addTempEffect(true, "reflect", Infinity, 1);
    }
}, {
    "name": "rest",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        let hpLost = getPkmn(true).maxHp - getPkmn(true).hp;
        if (hpLost != 255 && hpLost != 511) {
            getPkmn(true).hp = getPkmn(true).maxHp;
            addSmallText("others", "sleepHealthy", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": playerToMove != viewpoint
            });
            putToSleep(true, 2);
        }
    }
}, {
    "name": "roar",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 20,
    "priority": 0
    //No competitive use.
}, {
    "name": "rock slide",
    "type": "rock",
    "category": "physical",
    "power": 75,
    "acc": 90,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "rock throw",
    "type": "rock",
    "category": "physical",
    "power": 50,
    "acc": 65,
    "pp": 15,
    "priority": 0
    //No additional effect.
}, {
    "name": "rolling kick",
    "type": "fighting",
    "category": "physical",
    "power": 60,
    "acc": 85,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true };
    }
}, {
    "name": "sand attack",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "acc", 1, 1);
        //An increase in Accuracy decreases the stages.
    }
}, {
    "name": "scratch",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "screech",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 85,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "def", -2, 1);
    }
}, {
    "name": "seismic toss",
    "type": "fighting",
    "category": "physical",
    "power": 1,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        dealDmg(false, getPkmn(true).lv);
    }
}, {
    "name": "self-destruct",
    "type": "normal",
    "category": "",
    "power": 130,
    "acc": 100,
    "pp": 5,
    "priority": 0,
    "effect": function () {
        getPkmn(true).hp = 0;
    }
}, {
    "name": "sharpen",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "atk", 1, 1);
    }
}, {
    "name": "sing",
    "type": "normal",
    "category": "",
    "power": 0,
    "acc": 55,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7));
    }
}, {
    "name": "skull bash",
    "type": "normal",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "preDmgEffect": function () {
        charge("skull bash", 1);
    }
}, {
    "name": "sky attack",
    "type": "flying",
    "category": "physical",
    "power": 140,
    "acc": 90,
    "pp": 5,
    "priority": 0,
    "preDmgEffect": function () {
        charge("sky attack", 1);
    }
}, {
    "name": "slam",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 75,
    "pp": 20,
    "priority": 0
    //No additional effect.
}, {
    "name": "slash",
    "type": "normal",
    "category": "physical",
    "power": 70,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "preCritEffect": function () {
        return { isHighCritRatio: true };
    }
}, {
    "name": "sleep powder",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7));
    }
}, {
    "name": "sludge",
    "type": "poison",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStatus("psn", 0.4);
    }
}, {
    "name": "smog",
    "type": "poison",
    "category": "physical",
    "power": 20,
    "acc": 70,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStatus("psn", 0.3);
    }
}, {
    "name": "smokescreen",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "acc", 1, 1);
        //An increase in Accuracy decreases the stages.
    }
}, {
    "name": "soft-boiled",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        let hpLost = getPkmn(true).maxHp - getPkmn(true).hp;
        if (hpLost != 255 && hpLost != 511) getPkmn(true).hp += Math.min(getPkmn(true).maxHp / 2, hpLost);
    }
}, {
    "name": "solar beam",
    "type": "grass",
    "category": "special",
    "power": 120,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "preDmgEffect": function () {
        charge("solar beam", 1);
    }
}, {
    "name": "sonic boom",
    "type": "normal",
    "category": "physical",
    "power": 1,
    "acc": 90,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        dealDmg(false, 40);
    }
}, {
    "name": "spike cannon",
    "type": "normal",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) repeatAttack(e.totalDmg, 1);
        else if (num < 6 / 8) repeatAttack(e.totalDmg, 2);
        else if (num < 7 / 8) repeatAttack(e.totalDmg, 3);
        else repeatAttack(e.totalDmg, 4);
    }
}, {
    "name": "splash",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        addSmallText("others", "nothingHappen");
    }
    //No competitive use.
}, {
    "name": "spore",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7));
    }
}, {
    "name": "stomp",
    "type": "normal",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true };
    }
}, {
    "name": "strength",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 15,
    "priority": 0
    //No additional effect.
}, {
    "name": "string shot",
    "type": "bug",
    "category": "status",
    "power": 0,
    "acc": 95,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "spe", -1, 1);
    }
}, {
    "name": "struggle",
    "type": "normal",
    "category": "physical",
    "power": 50,
    "acc": 100,
    "pp": 10,
    "priority": 0,
    "effect": function (e) {
        dealDmg(true, e.totalDmg / 4);
    }
}, {
    "name": "stun spore",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 1);
    }
}, {
    "name": "submission",
    "type": "fighting",
    "category": "physical",
    "power": 80,
    "acc": 80,
    "pp": 25,
    "priority": 0,
    "effect": function (e) {
        dealDmg(true, e.totalDmg / 4);
    }
}, {
    "name": "substitute",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        if (getPkmn(true).hp >= getPkmn(true).maxHp / 4) {
            addSmallText("others", "putInSubstitute", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": playerToMove != viewpoint
            });
            dealDmg(true, getPkmn(true).maxHp / 4);
            getPkmn(true).substituteHp = getPkmn(true).maxHp / 4;
        }
    }
}, {
    "name": "super fang",
    "type": "normal",
    "category": "physical",
    "power": 1,
    "acc": 90,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        getPkmn(false).hp /= 2;
    }
}, {
    "name": "supersonic",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 55,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        addTempEffect(false, "confused", 1 + Math.ceil(Math.random() * 4), 1);
    }
}, {
    "name": "surf",
    "type": "water",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 15,
    "priority": 0
    //No additional effect.
}, {
    "name": "swift",
    "type": "normal",
    "category": "physical",
    "power": 60,
    "acc": Infinity,
    "pp": 20,
    "priority": 0,
    "preDmgEffect": function () {
        return { nullifySemiInvulnerable: true };
    }
}, {
    "name": "swords dance",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "atk", 2, 1);
    }
}, {
    "name": "tackle",
    "type": "normal",
    "category": "physical",
    "power": 35,
    "acc": 95,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "tail whip",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStats(false, "def", -1, 1);
    }
}, {
    "name": "take down",
    "type": "normal",
    "category": "physical",
    "power": 90,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        dealDmg(true, e.totalDmg / 4);
    }
}, {
    "name": "teleport",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "priority": 0
    //No competitive use.
}, {
    "name": "thrash",
    "type": "normal",
    "category": "physical",
    "power": 90,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        if (Math.random() < 0.5) {
            setUncontrollable(true, "thrash", 2);
            setUncontrollable(false, "", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 2);
        } else {
            setUncontrollable(true, "thrash", 3);
            setUncontrollable(false, "", 3);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 3);
        }
    }
}, {
    "name": "thunder",
    "type": "electric",
    "category": "special",
    "power": 120,
    "acc": 70,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 0.1);
    }
}, {
    "name": "thunder punch",
    "type": "electric",
    "category": "special",
    "power": 75,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 0.1);
    }
}, {
    "name": "thunder shock",
    "type": "electric",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 30,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 0.1);
    }
}, {
    "name": "thunder wave",
    "type": "electric",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 1);
    }
}, {
    "name": "thunderbolt",
    "type": "electric",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 15,
    "priority": 0,
    "effect": function () {
        modifyStatus("par", 0.1);
    }
}, {
    "name": "toxic",
    "type": "poison",
    "category": "status",
    "power": 0,
    "acc": 85,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        modifyStatus("tox", 1);
    }
}, {
    "name": "transform",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "priority": 0,
    "effect": function () {
        getPkmn(true).transformPkmn = getPkmn(false).name;
        for (let i of ["atkStage", "defStage", "spStage ", "speStage", "accStage", "evaStage"]) {
            getPkmn(true)[i] = getPkmn(false)[i];
        }
        getPkmn(true).moves = JSON.parse(JSON.stringify(getPkmn(false).moves));
        for (let i in getPkmn(true).moves) {
            getPkmn(true).moves[i] = 5;
        }
        addSmallText("others", "transform", {
            "pokemon": [getName(getPkmn(true), false), getName(getPkmn(false), false)],
            "isEnemy": playerToMove != viewpoint
        });
    }
}, {
    "name": "tri attack",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "twineedle",
    "type": "bug",
    "category": "physical",
    "power": 25,
    "acc": 100,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        repeatAttack(e.totalDmg, 1);
        modifyStatus("psn", 0.2);
    }
}, {
    "name": "vice grip",
    "type": "normal",
    "category": "physical",
    "power": 55,
    "acc": 100,
    "pp": 30,
    "priority": 0
    //No additional effect.
}, {
    "name": "vine whip",
    "type": "grass",
    "category": "special",
    "power": 35,
    "acc": 100,
    "pp": 10,
    "priority": 0
    //No additional effect.
}, {
    "name": "water gun",
    "type": "water",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 25,
    "priority": 0
    //No additional effect.
}, {
    "name": "waterfall",
    "type": "water",
    "category": "special",
    "power": 80,
    "acc": 100,
    "pp": 15,
    "priority": 0
    //No additional effect.
}, {
    "name": "whirlwind",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 85,
    "pp": 20,
    "priority": 0
    //No competitive use.
}, {
    "name": "wing attack",
    "type": "flying",
    "category": "physical",
    "power": 35,
    "acc": 100,
    "pp": 35,
    "priority": 0
    //No additional effect.
}, {
    "name": "withdraw",
    "type": "water",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
    "priority": 0,
    "effect": function () {
        modifyStats(true, "def", 1, 1);
    }
}, {
    "name": "wrap",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 85,
    "pp": 20,
    "priority": 0,
    "effect": function (e) {
        let num = Math.random(), turns = 0;
        if (num < 3 / 8) turns = 1;
        else if (num < 6 / 8) turns = 2;
        else if (num < 7 / 8) turns = 3;
        else turns = 4;
        setUncontrollable(true, "wrap", turns);
        setUncontrollable(false, "", turns);
    }
}];
const POKEMON = [{
    "name": "abra",
    "type": ["psychic"],
    "hp": 25,
    "atk": 20,
    "def": 15,
    "sp": 105,
    "spe": 90,
    "moves": ["bide", "body slam", "counter", "double-edge", "double team", "flash", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "aerodactyl",
    "type": ["rock", "flying"],
    "hp": 80,
    "atk": 105,
    "def": 65,
    "sp": 60,
    "spe": 130,
    "moves": ["agility", "bide", "bite", "double-edge", "double team", "dragon rage", "fire blast", "fly", "hyper beam", "mimic", "rage", "razor wind", "reflect", "rest", "sky attack", "substitute", "supersonic", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}, {
    "name": "alakazam",
    "type": ["psychic"],
    "hp": 55,
    "atk": 50,
    "def": 45,
    "sp": 135,
    "spe": 120,
    "moves": ["bide", "body slam", "confusion", "counter", "dig", "disable", "double-edge", "double team", "flash", "hyper beam", "kinesis", "mega kick", "mega punch", "metronome", "mimic", "psybeam", "psychic", "psywave", "rage", "recover", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "arbok",
    "type": ["poison"],
    "hp": 60,
    "atk": 85,
    "def": 69,
    "sp": 65,
    "spe": 80,
    "moves": ["acid", "bide", "bite", "body slam", "dig", "double-edge", "double team", "earthquake", "fissure", "glare", "hyper beam", "leer", "mega drain", "mimic", "poison sting", "rage", "rest", "rock slide", "screech", "skull bash", "strength", "substitute", "take down", "toxic", "wrap"]
}, {
    "name": "arcanine",
    "type": ["fire"],
    "hp": 90,
    "atk": 110,
    "def": 80,
    "sp": 80,
    "spe": 95,
    "moves": ["agility", "bide", "bite", "body slam", "dig", "double-edge", "double team", "dragon rage", "ember", "fire blast", "flamethrower", "hyper beam", "leer", "mimic", "rage", "reflect", "rest", "roar", "skull bash", "substitute", "swift", "take down", "teleport", "toxic"]
}, {
    "name": "articuno",
    "type": ["ice", "flying"],
    "hp": 90,
    "atk": 85,
    "def": 100,
    "sp": 125,
    "spe": 85,
    "moves": ["agility", "bide", "blizzard", "bubble beam", "double-edge", "double team", "fly", "hyper beam", "ice beam", "mimic", "mist", "peck", "rage", "razor wind", "reflect", "rest", "sky attack", "substitute", "swift", "take down", "toxic", "water gun", "whirlwind"]
}, {
    "name": "beedrill",
    "type": ["bug", "poison"],
    "hp": 65,
    "atk": 80,
    "def": 40,
    "sp": 45,
    "spe": 75,
    "moves": ["agility", "bide", "cut", "double-edge", "double team", "focus energy", "fury attack", "harden", "hyper beam", "mega drain", "mimic", "pin missile", "poison sting", "rage", "reflect", "rest", "skull bash", "string shot", "substitute", "swift", "swords dance", "take down", "toxic", "twineedle"]
}, {
    "name": "bellsprout",
    "type": ["grass", "poison"],
    "hp": 50,
    "atk": 75,
    "def": 35,
    "sp": 70,
    "spe": 40,
    "moves": ["acid", "bide", "cut", "double-edge", "double team", "growth", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "slam", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic", "vine whip", "wrap"]
}, {
    "name": "blastoise",
    "type": ["water"],
    "hp": 79,
    "atk": 83,
    "def": 100,
    "sp": 85,
    "spe": 78,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble", "bubble beam", "counter", "dig", "double-edge", "double team", "earthquake", "fissure", "hydro pump", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tackle", "tail whip", "take down", "toxic", "water gun", "withdraw"]
}, {
    "name": "bulbasaur",
    "type": ["grass", "poison"],
    "hp": 45,
    "atk": 49,
    "def": 49,
    "sp": 65,
    "spe": 45,
    "moves": ["bide", "body slam", "cut", "double-edge", "double team", "growl", "growth", "leech seed", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "sleep powder", "solar beam", "substitute", "swords dance", "tackle", "take down", "toxic", "vine whip"]
}, {
    "name": "butterfree",
    "type": ["bug", "flying"],
    "hp": 60,
    "atk": 45,
    "def": 50,
    "sp": 80,
    "spe": 70,
    "moves": ["bide", "confusion", "double-edge", "double team", "flash", "gust", "harden", "hyper beam", "mega drain", "mimic", "poison powder", "psybeam", "psychic", "psywave", "rage", "razor wind", "reflect", "rest", "sleep powder", "solar beam", "string shot", "stun spore", "substitute", "supersonic", "swift", "tackle", "take down", "teleport", "toxic", "whirlwind"]
}, {
    "name": "caterpie",
    "type": ["bug"],
    "hp": 45,
    "atk": 30,
    "def": 35,
    "sp": 20,
    "spe": 45,
    "moves": ["string shot", "tackle"]
}, {
    "name": "chansey",
    "type": ["normal"],
    "hp": 250,
    "atk": 5,
    "def": 5,
    "sp": 105,
    "spe": 50,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "defense curl", "double-edge", "double slap", "double team", "egg bomb", "fire blast", "flash", "growl", "hyper beam", "ice beam", "light screen", "mega kick", "mega punch", "metronome", "mimic", "minimize", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "sing", "skull bash", "soft-boiled", "solar beam", "strength", "submission", "substitute", "tail whip", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "charizard",
    "type": ["fire", "flying"],
    "hp": 78,
    "atk": 84,
    "def": 78,
    "sp": 85,
    "spe": 100,
    "moves": ["bide", "body slam", "counter", "cut", "dig", "double-edge", "double team", "dragon rage", "earthquake", "ember", "fire blast", "fire spin", "fissure", "flamethrower", "fly", "growl", "hyper beam", "leer", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "scratch", "seismic toss", "skull bash", "slash", "strength", "submission", "substitute", "swift", "swords dance", "take down", "toxic"]
}, {
    "name": "charmander",
    "type": ["fire"],
    "hp": 39,
    "atk": 52,
    "def": 43,
    "sp": 50,
    "spe": 65,
    "moves": ["bide", "body slam", "counter", "cut", "dig", "double-edge", "double team", "dragon rage", "ember", "fire blast", "fire spin", "flamethrower", "growl", "leer", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "scratch", "seismic toss", "skull bash", "slash", "strength", "submission", "substitute", "swift", "swords dance", "take down", "toxic"]
}, {
    "name": "charmeleon",
    "type": ["fire"],
    "hp": 58,
    "atk": 64,
    "def": 58,
    "sp": 65,
    "spe": 80,
    "moves": ["bide", "body slam", "counter", "cut", "dig", "double-edge", "double team", "dragon rage", "ember", "fire blast", "fire spin", "flamethrower", "growl", "leer", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "scratch", "seismic toss", "skull bash", "slash", "strength", "submission", "substitute", "swift", "swords dance", "take down", "toxic"]
}, {
    "name": "clefable",
    "type": ["normal"],
    "hp": 95,
    "atk": 70,
    "def": 73,
    "sp": 85,
    "spe": 60,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "defense curl", "double-edge", "double slap", "double team", "fire blast", "flash", "growl", "hyper beam", "ice beam", "light screen", "mega kick", "mega punch", "metronome", "mimic", "minimize", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "sing", "skull bash", "solar beam", "strength", "submission", "substitute", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "clefairy",
    "type": ["normal"],
    "hp": 70,
    "atk": 45,
    "def": 48,
    "sp": 60,
    "spe": 35,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "defense curl", "double-edge", "double slap", "double team", "fire blast", "flash", "growl", "ice beam", "light screen", "mega kick", "mega punch", "metronome", "mimic", "minimize", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "sing", "skull bash", "solar beam", "strength", "submission", "substitute", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "cloyster",
    "type": ["water", "ice"],
    "hp": 50,
    "atk": 95,
    "def": 180,
    "sp": 85,
    "spe": 70,
    "moves": ["aurora beam", "bide", "blizzard", "bubble beam", "clamp", "double-edge", "double team", "explosion", "hyper beam", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "self-destruct", "spike cannon", "substitute", "supersonic", "surf", "swift", "tackle", "take down", "teleport", "toxic", "tri attack", "water gun", "withdraw"]
}, {
    "name": "cubone",
    "type": ["ground"],
    "hp": 50,
    "atk": 50,
    "def": 95,
    "sp": 40,
    "spe": 35,
    "moves": ["bide", "blizzard", "body slam", "bone club", "bonemerang", "bubble beam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "focus energy", "growl", "headbutt", "ice beam", "leer", "mega kick", "mega punch", "mimic", "rage", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "tail whip", "take down", "thrash", "toxic", "water gun"]
}, {
    "name": "dewgong",
    "type": ["water", "ice"],
    "hp": 90,
    "atk": 70,
    "def": 80,
    "sp": 95,
    "spe": 70,
    "moves": ["aurora beam", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "growl", "headbutt", "horn drill", "hyper beam", "ice beam", "mimic", "pay day", "rage", "rest", "skull bash", "strength", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "diglett",
    "type": ["ground"],
    "hp": 10,
    "atk": 55,
    "def": 25,
    "sp": 45,
    "spe": 95,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "earthquake", "fissure", "growl", "mimic", "rage", "rest", "rock slide", "sand attack", "scratch", "slash", "substitute", "take down", "toxic"]
}, {
    "name": "ditto",
    "type": ["normal"],
    "hp": 48,
    "atk": 48,
    "def": 48,
    "sp": 48,
    "spe": 48,
    "moves": ["transform"]
}, {
    "name": "dodrio",
    "type": ["normal", "flying"],
    "hp": 60,
    "atk": 110,
    "def": 70,
    "sp": 60,
    "spe": 100,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "drill peck", "fly", "fury attack", "growl", "hyper beam", "mimic", "peck", "rage", "reflect", "rest", "skull bash", "sky attack", "substitute", "take down", "toxic", "tri attack", "whirlwind"]
}, {
    "name": "doduo",
    "type": ["normal", "flying"],
    "hp": 35,
    "atk": 85,
    "def": 45,
    "sp": 35,
    "spe": 75,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "drill peck", "fly", "fury attack", "growl", "mimic", "peck", "rage", "reflect", "rest", "skull bash", "sky attack", "substitute", "take down", "toxic", "tri attack", "whirlwind"]
}, {
    "name": "dragonair",
    "type": ["dragon"],
    "hp": 61,
    "atk": 84,
    "def": 65,
    "sp": 70,
    "spe": 70,
    "moves": ["agility", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "dragon rage", "fire blast", "horn drill", "hyper beam", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "skull bash", "slam", "substitute", "surf", "swift", "take down", "thunder", "thunderbolt", "thunder wave", "toxic", "water gun", "wrap"]
}, {
    "name": "dragonite",
    "type": ["dragon", "flying"],
    "hp": 91,
    "atk": 134,
    "def": 95,
    "sp": 100,
    "spe": 80,
    "moves": ["agility", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "dragon rage", "fire blast", "horn drill", "hyper beam", "ice beam", "leer", "mimic", "rage", "razor wind", "reflect", "rest", "skull bash", "slam", "strength", "substitute", "surf", "swift", "take down", "thunder", "thunderbolt", "thunder wave", "toxic", "water gun", "wrap"]
}, {
    "name": "dratini",
    "type": ["dragon"],
    "hp": 41,
    "atk": 64,
    "def": 45,
    "sp": 50,
    "spe": 50,
    "moves": ["agility", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "dragon rage", "fire blast", "hyper beam", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "skull bash", "slam", "substitute", "surf", "swift", "take down", "thunder", "thunderbolt", "thunder wave", "toxic", "water gun", "wrap"]
}, {
    "name": "drowzee",
    "type": ["psychic"],
    "hp": 60,
    "atk": 48,
    "def": 45,
    "sp": 90,
    "spe": 42,
    "moves": ["bide", "body slam", "confusion", "counter", "disable", "double-edge", "double team", "dream eater", "flash", "headbutt", "hypnosis", "meditate", "mega kick", "mega punch", "metronome", "mimic", "poison gas", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "dugtrio",
    "type": ["ground"],
    "hp": 35,
    "atk": 80,
    "def": 50,
    "sp": 70,
    "spe": 120,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "earthquake", "fissure", "growl", "hyper beam", "mimic", "rage", "rest", "rock slide", "sand attack", "scratch", "slash", "substitute", "take down", "toxic"]
}, {
    "name": "eevee",
    "type": ["normal"],
    "hp": 55,
    "atk": 55,
    "def": 50,
    "sp": 65,
    "spe": 55,
    "moves": ["bide", "bite", "body slam", "double-edge", "double team", "focus energy", "growl", "mimic", "quick attack", "rage", "reflect", "rest", "sand attack", "skull bash", "substitute", "swift", "tackle", "tail whip", "take down", "toxic"]
}, {
    "name": "ekans",
    "type": ["poison"],
    "hp": 35,
    "atk": 60,
    "def": 44,
    "sp": 40,
    "spe": 55,
    "moves": ["acid", "bide", "bite", "body slam", "dig", "double-edge", "double team", "earthquake", "fissure", "glare", "leer", "mega drain", "mimic", "poison sting", "rage", "rest", "rock slide", "screech", "skull bash", "strength", "substitute", "take down", "toxic", "wrap"]
}, {
    "name": "electabuzz",
    "type": ["electric"],
    "hp": 65,
    "atk": 83,
    "def": 57,
    "sp": 85,
    "spe": 105,
    "moves": ["bide", "body slam", "counter", "double-edge", "double team", "flash", "hyper beam", "leer", "light screen", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "quick attack", "rage", "reflect", "rest", "screech", "seismic toss", "skull bash", "strength", "submission", "substitute", "swift", "take down", "teleport", "thunder", "thunderbolt", "thunder punch", "thunder shock", "thunder wave", "toxic"]
}, {
    "name": "electrode",
    "type": ["electric"],
    "hp": 60,
    "atk": 50,
    "def": 70,
    "sp": 80,
    "spe": 140,
    "moves": ["bide", "double team", "explosion", "flash", "hyper beam", "light screen", "mimic", "rage", "reflect", "rest", "screech", "self-destruct", "skull bash", "sonic boom", "substitute", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic"]
}, {
    "name": "exeggcute",
    "type": ["grass", "psychic"],
    "hp": 60,
    "atk": 40,
    "def": 80,
    "sp": 60,
    "spe": 40,
    "moves": ["barrage", "bide", "double-edge", "double team", "egg bomb", "explosion", "hypnosis", "leech seed", "mimic", "poison powder", "psychic", "psywave", "rage", "reflect", "rest", "self-destruct", "sleep powder", "solar beam", "stun spore", "substitute", "take down", "teleport", "toxic"]
}, {
    "name": "exeggutor",
    "type": ["grass", "psychic"],
    "hp": 95,
    "atk": 95,
    "def": 85,
    "sp": 125,
    "spe": 55,
    "moves": ["barrage", "bide", "double-edge", "double team", "egg bomb", "explosion", "hyper beam", "hypnosis", "leech seed", "mega drain", "mimic", "poison powder", "psychic", "psywave", "rage", "reflect", "rest", "self-destruct", "sleep powder", "solar beam", "stomp", "strength", "stun spore", "substitute", "take down", "teleport", "toxic"]
}, {
    "name": "farfetch'd",
    "type": ["normal", "flying"],
    "hp": 52,
    "atk": 65,
    "def": 55,
    "sp": 58,
    "spe": 60,
    "moves": ["agility", "bide", "body slam", "cut", "double-edge", "double team", "fly", "fury attack", "leer", "mimic", "peck", "rage", "razor wind", "reflect", "rest", "sand attack", "skull bash", "slash", "substitute", "swift", "swords dance", "take down", "toxic", "whirlwind"]
}, {
    "name": "fearow",
    "type": ["normal", "flying"],
    "hp": 65,
    "atk": 90,
    "def": 65,
    "sp": 61,
    "spe": 100,
    "moves": ["agility", "bide", "double-edge", "double team", "drill peck", "fly", "fury attack", "growl", "hyper beam", "leer", "mimic", "mirror move", "pay day", "peck", "rage", "razor wind", "rest", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind"]
}, {
    "name": "flareon",
    "type": ["fire"],
    "hp": 65,
    "atk": 130,
    "def": 60,
    "sp": 110,
    "spe": 65,
    "moves": ["bide", "bite", "body slam", "double-edge", "double team", "ember", "fire blast", "fire spin", "flamethrower", "focus energy", "growl", "hyper beam", "leer", "mimic", "quick attack", "rage", "reflect", "rest", "sand attack", "skull bash", "smog", "substitute", "swift", "tackle", "tail whip", "take down", "toxic"]
}, {
    "name": "gastly",
    "type": ["ghost", "poison"],
    "hp": 30,
    "atk": 35,
    "def": 30,
    "sp": 100,
    "spe": 80,
    "moves": ["bide", "confuse ray", "double team", "dream eater", "explosion", "hypnosis", "lick", "mega drain", "mimic", "night shade", "psychic", "psywave", "rage", "rest", "self-destruct", "substitute", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "gengar",
    "type": ["ghost", "poison"],
    "hp": 60,
    "atk": 65,
    "def": 60,
    "sp": 130,
    "spe": 110,
    "moves": ["bide", "body slam", "confuse ray", "counter", "double-edge", "double team", "dream eater", "explosion", "hyper beam", "hypnosis", "lick", "mega drain", "mega kick", "mega punch", "metronome", "mimic", "night shade", "psychic", "psywave", "rage", "rest", "seismic toss", "self-destruct", "skull bash", "strength", "submission", "substitute", "take down", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "geodude",
    "type": ["rock", "ground"],
    "hp": 40,
    "atk": 80,
    "def": 100,
    "sp": 30,
    "spe": 20,
    "moves": ["bide", "body slam", "counter", "defense curl", "dig", "double-edge", "double team", "earthquake", "explosion", "fire blast", "fissure", "harden", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "rock throw", "seismic toss", "self-destruct", "strength", "submission", "substitute", "tackle", "take down", "toxic"]
}, {
    "name": "gloom",
    "type": ["grass", "poison"],
    "hp": 60,
    "atk": 65,
    "def": 70,
    "sp": 85,
    "spe": 40,
    "moves": ["absorb", "acid", "bide", "cut", "double-edge", "double team", "mega drain", "mimic", "petal dance", "poison powder", "rage", "reflect", "rest", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic"]
}, {
    "name": "golbat",
    "type": ["poison", "flying"],
    "hp": 75,
    "atk": 80,
    "def": 70,
    "sp": 75,
    "spe": 90,
    "moves": ["bide", "bite", "confuse ray", "double-edge", "double team", "haze", "hyper beam", "leech life", "mega drain", "mimic", "rage", "razor wind", "rest", "screech", "substitute", "supersonic", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}, {
    "name": "goldeen",
    "type": ["water"],
    "hp": 45,
    "atk": 67,
    "def": 60,
    "sp": 50,
    "spe": 63,
    "moves": ["agility", "bide", "blizzard", "bubble beam", "double-edge", "double team", "fury attack", "horn attack", "horn drill", "ice beam", "mimic", "peck", "rage", "rest", "skull bash", "substitute", "supersonic", "surf", "swift", "tail whip", "take down", "toxic", "waterfall", "water gun"]
}, {
    "name": "golduck",
    "type": ["water"],
    "hp": 80,
    "atk": 82,
    "def": 78,
    "sp": 80,
    "spe": 85,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble beam", "confusion", "counter", "dig", "disable", "double-edge", "double team", "fury swipes", "hydro pump", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "pay day", "rage", "rest", "scratch", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "swift", "tail whip", "take down", "toxic", "water gun"]
}, {
    "name": "golem",
    "type": ["rock", "ground"],
    "hp": 80,
    "atk": 110,
    "def": 130,
    "sp": 55,
    "spe": 45,
    "moves": ["bide", "body slam", "counter", "defense curl", "dig", "double-edge", "double team", "earthquake", "explosion", "fire blast", "fissure", "harden", "hyper beam", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "rock throw", "seismic toss", "self-destruct", "strength", "submission", "substitute", "tackle", "take down", "toxic"]
}, {
    "name": "graveler",
    "type": ["rock", "ground"],
    "hp": 55,
    "atk": 95,
    "def": 115,
    "sp": 45,
    "spe": 35,
    "moves": ["bide", "body slam", "counter", "defense curl", "dig", "double-edge", "double team", "earthquake", "explosion", "fire blast", "fissure", "harden", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "rock throw", "seismic toss", "self-destruct", "strength", "submission", "substitute", "tackle", "take down", "toxic"]
}, {
    "name": "grimer",
    "type": ["poison"],
    "hp": 80,
    "atk": 80,
    "def": 50,
    "sp": 40,
    "spe": 25,
    "moves": ["acid armor", "bide", "body slam", "disable", "double team", "explosion", "fire blast", "harden", "mega drain", "mimic", "minimize", "poison gas", "pound", "rage", "rest", "screech", "self-destruct", "sludge", "substitute", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "growlithe",
    "type": ["fire"],
    "hp": 55,
    "atk": 70,
    "def": 45,
    "sp": 50,
    "spe": 60,
    "moves": ["agility", "bide", "bite", "body slam", "dig", "double-edge", "double team", "dragon rage", "ember", "fire blast", "flamethrower", "leer", "mimic", "rage", "reflect", "rest", "roar", "skull bash", "substitute", "swift", "take down", "toxic"]
}, {
    "name": "gyarados",
    "type": ["water", "flying"],
    "hp": 95,
    "atk": 125,
    "def": 79,
    "sp": 100,
    "spe": 81,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "dragon rage", "fire blast", "hydro pump", "hyper beam", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "skull bash", "splash", "strength", "substitute", "surf", "tackle", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "haunter",
    "type": ["ghost", "poison"],
    "hp": 45,
    "atk": 50,
    "def": 45,
    "sp": 115,
    "spe": 95,
    "moves": ["bide", "confuse ray", "double team", "dream eater", "explosion", "hypnosis", "lick", "mega drain", "mimic", "night shade", "psychic", "psywave", "rage", "rest", "self-destruct", "substitute", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "hitmonchan",
    "type": ["fighting"],
    "hp": 50,
    "atk": 105,
    "def": 79,
    "sp": 35,
    "spe": 76,
    "moves": ["agility", "bide", "body slam", "comet punch", "counter", "double-edge", "double team", "fire punch", "ice punch", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "swift", "take down", "thunder punch", "toxic"]
}, {
    "name": "hitmonlee",
    "type": ["fighting"],
    "hp": 50,
    "atk": 120,
    "def": 53,
    "sp": 35,
    "spe": 87,
    "moves": ["bide", "body slam", "counter", "double-edge", "double kick", "double team", "focus energy", "high jump kick", "jump kick", "meditate", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "rolling kick", "seismic toss", "skull bash", "strength", "submission", "substitute", "swift", "take down", "toxic"]
}, {
    "name": "horsea",
    "type": ["water"],
    "hp": 30,
    "atk": 40,
    "def": 70,
    "sp": 70,
    "spe": 60,
    "moves": ["agility", "bide", "blizzard", "bubble", "bubble beam", "double-edge", "double team", "hydro pump", "ice beam", "leer", "mimic", "rage", "rest", "skull bash", "smokescreen", "substitute", "surf", "swift", "take down", "toxic", "water gun"]
}, {
    "name": "hypno",
    "type": ["psychic"],
    "hp": 85,
    "atk": 73,
    "def": 70,
    "sp": 115,
    "spe": 67,
    "moves": ["bide", "body slam", "confusion", "counter", "disable", "double-edge", "double team", "dream eater", "flash", "headbutt", "hyper beam", "hypnosis", "meditate", "mega kick", "mega punch", "metronome", "mimic", "poison gas", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "ivysaur",
    "type": ["grass", "poison"],
    "hp": 60,
    "atk": 62,
    "def": 63,
    "sp": 80,
    "spe": 60,
    "moves": ["bide", "body slam", "cut", "double-edge", "double team", "growl", "growth", "leech seed", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "sleep powder", "solar beam", "substitute", "swords dance", "tackle", "take down", "toxic", "vine whip"]
}, {
    "name": "jigglypuff",
    "type": ["normal"],
    "hp": 115,
    "atk": 45,
    "def": 20,
    "sp": 25,
    "spe": 20,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "defense curl", "disable", "double-edge", "double slap", "double team", "fire blast", "flash", "ice beam", "mega kick", "mega punch", "mimic", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "sing", "skull bash", "solar beam", "strength", "submission", "substitute", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "jolteon",
    "type": ["electric"],
    "hp": 65,
    "atk": 65,
    "def": 60,
    "sp": 110,
    "spe": 130,
    "moves": ["agility", "bide", "bite", "body slam", "double-edge", "double kick", "double team", "flash", "focus energy", "growl", "hyper beam", "mimic", "pin missile", "quick attack", "rage", "reflect", "rest", "sand attack", "skull bash", "substitute", "swift", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "thunder shock", "thunder wave", "toxic"]
}, {
    "name": "jynx",
    "type": ["ice", "psychic"],
    "hp": 65,
    "atk": 50,
    "def": 35,
    "sp": 95,
    "spe": 95,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "double-edge", "double slap", "double team", "hyper beam", "ice beam", "ice punch", "lick", "lovely kiss", "mega kick", "mega punch", "metronome", "mimic", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thrash", "toxic", "water gun"]
}, {
    "name": "kabuto",
    "type": ["rock", "water"],
    "hp": 30,
    "atk": 80,
    "def": 90,
    "sp": 45,
    "spe": 55,
    "moves": ["absorb", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "harden", "hydro pump", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "scratch", "slash", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "kabutops",
    "type": ["rock", "water"],
    "hp": 60,
    "atk": 115,
    "def": 105,
    "sp": 70,
    "spe": 80,
    "moves": ["absorb", "bide", "blizzard", "body slam", "bubble beam", "cut", "double-edge", "double team", "harden", "hydro pump", "hyper beam", "ice beam", "leer", "mega kick", "mimic", "rage", "razor wind", "reflect", "rest", "scratch", "seismic toss", "skull bash", "slash", "submission", "substitute", "surf", "swords dance", "take down", "toxic", "water gun"]
}, {
    "name": "kadabra",
    "type": ["psychic"],
    "hp": 40,
    "atk": 35,
    "def": 30,
    "sp": 120,
    "spe": 105,
    "moves": ["bide", "body slam", "confusion", "counter", "dig", "disable", "double-edge", "double team", "flash", "kinesis", "mega kick", "mega punch", "metronome", "mimic", "psybeam", "psychic", "psywave", "rage", "recover", "reflect", "rest", "seismic toss", "skull bash", "submission", "substitute", "take down", "teleport", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "kakuna",
    "type": ["bug", "poison"],
    "hp": 45,
    "atk": 25,
    "def": 50,
    "sp": 25,
    "spe": 35,
    "moves": ["harden", "poison sting", "string shot"]
}, {
    "name": "kangaskhan",
    "type": ["normal"],
    "hp": 105,
    "atk": 95,
    "def": 80,
    "sp": 40,
    "spe": 90,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble beam", "comet punch", "counter", "dizzy punch", "double-edge", "double team", "earthquake", "fire blast", "fissure", "hyper beam", "ice beam", "leer", "mega kick", "mega punch", "mimic", "rage", "rest", "rock slide", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "kingler",
    "type": ["water"],
    "hp": 55,
    "atk": 130,
    "def": 115,
    "sp": 50,
    "spe": 75,
    "moves": ["bide", "blizzard", "body slam", "bubble", "bubble beam", "crabhammer", "cut", "double-edge", "double team", "guillotine", "harden", "hyper beam", "ice beam", "leer", "mimic", "rage", "rest", "stomp", "strength", "substitute", "surf", "swords dance", "take down", "toxic", "vice grip", "water gun"]
}, {
    "name": "koffing",
    "type": ["poison"],
    "hp": 40,
    "atk": 65,
    "def": 95,
    "sp": 60,
    "spe": 35,
    "moves": ["bide", "double team", "explosion", "fire blast", "haze", "mimic", "rage", "rest", "self-destruct", "sludge", "smog", "smokescreen", "substitute", "tackle", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "krabby",
    "type": ["water"],
    "hp": 30,
    "atk": 105,
    "def": 90,
    "sp": 25,
    "spe": 50,
    "moves": ["bide", "blizzard", "body slam", "bubble", "bubble beam", "crabhammer", "cut", "double-edge", "double team", "guillotine", "harden", "ice beam", "leer", "mimic", "rage", "rest", "stomp", "strength", "substitute", "surf", "swords dance", "take down", "toxic", "vice grip", "water gun"]
}, {
    "name": "lapras",
    "type": ["water", "ice"],
    "hp": 130,
    "atk": 85,
    "def": 80,
    "sp": 95,
    "spe": 60,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "confuse ray", "double-edge", "double team", "dragon rage", "growl", "horn drill", "hydro pump", "hyper beam", "ice beam", "mimic", "mist", "psychic", "psywave", "rage", "reflect", "rest", "sing", "skull bash", "solar beam", "strength", "substitute", "surf", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "lickitung",
    "type": ["normal"],
    "hp": 90,
    "atk": 55,
    "def": 75,
    "sp": 60,
    "spe": 30,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "cut", "defense curl", "disable", "double-edge", "double team", "earthquake", "fire blast", "fissure", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "rage", "rest", "screech", "seismic toss", "skull bash", "slam", "stomp", "strength", "submission", "substitute", "supersonic", "surf", "swords dance", "take down", "thunder", "thunderbolt", "toxic", "water gun", "wrap"]
}, {
    "name": "machamp",
    "type": ["fighting"],
    "hp": 90,
    "atk": 130,
    "def": 80,
    "sp": 65,
    "spe": 55,
    "moves": ["bide", "body slam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "focus energy", "hyper beam", "karate chop", "leer", "low kick", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "seismic toss", "skull bash", "strength", "submission", "substitute", "take down", "toxic"]
}, {
    "name": "machoke",
    "type": ["fighting"],
    "hp": 80,
    "atk": 100,
    "def": 70,
    "sp": 50,
    "spe": 45,
    "moves": ["bide", "body slam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "focus energy", "karate chop", "leer", "low kick", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "seismic toss", "skull bash", "strength", "submission", "substitute", "take down", "toxic"]
}, {
    "name": "machop",
    "type": ["fighting"],
    "hp": 70,
    "atk": 80,
    "def": 50,
    "sp": 35,
    "spe": 35,
    "moves": ["bide", "body slam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "focus energy", "karate chop", "leer", "low kick", "mega kick", "mega punch", "metronome", "mimic", "rage", "rest", "rock slide", "seismic toss", "skull bash", "strength", "submission", "substitute", "take down", "toxic"]
}, {
    "name": "magikarp",
    "type": ["water"],
    "hp": 20,
    "atk": 10,
    "def": 55,
    "sp": 20,
    "spe": 80,
    "moves": ["dragon rage", "splash", "tackle"]
}, {
    "name": "magmar",
    "type": ["fire"],
    "hp": 65,
    "atk": 95,
    "def": 57,
    "sp": 85,
    "spe": 93,
    "moves": ["bide", "body slam", "confuse ray", "counter", "double-edge", "double team", "ember", "fire blast", "fire punch", "flamethrower", "hyper beam", "leer", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "rage", "rest", "seismic toss", "skull bash", "smog", "smokescreen", "strength", "submission", "substitute", "take down", "teleport", "toxic"]
}, {
    "name": "magnemite",
    "type": ["electric"],
    "hp": 25,
    "atk": 35,
    "def": 70,
    "sp": 95,
    "spe": 45,
    "moves": ["bide", "double-edge", "double team", "flash", "mimic", "rage", "reflect", "rest", "screech", "sonic boom", "substitute", "supersonic", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder shock", "thunder wave", "toxic"]
}, {
    "name": "magneton",
    "type": ["electric"],
    "hp": 50,
    "atk": 60,
    "def": 95,
    "sp": 120,
    "spe": 70,
    "moves": ["bide", "double-edge", "double team", "flash", "hyper beam", "mimic", "rage", "reflect", "rest", "screech", "sonic boom", "substitute", "supersonic", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder shock", "thunder wave", "toxic"]
}, {
    "name": "mankey",
    "type": ["fighting"],
    "hp": 40,
    "atk": 80,
    "def": 35,
    "sp": 35,
    "spe": 70,
    "moves": ["bide", "body slam", "counter", "dig", "double-edge", "double team", "focus energy", "fury swipes", "karate chop", "leer", "low kick", "mega kick", "mega punch", "metronome", "mimic", "pay day", "rage", "rest", "rock slide", "scratch", "screech", "seismic toss", "skull bash", "strength", "submission", "substitute", "swift", "take down", "thrash", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "marowak",
    "type": ["ground"],
    "hp": 60,
    "atk": 80,
    "def": 110,
    "sp": 50,
    "spe": 45,
    "moves": ["bide", "blizzard", "body slam", "bone club", "bonemerang", "bubble beam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "focus energy", "growl", "headbutt", "hyper beam", "ice beam", "leer", "mega kick", "mega punch", "mimic", "rage", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "tail whip", "take down", "thrash", "toxic", "water gun"]
}, {
    "name": "meowth",
    "type": ["normal"],
    "hp": 40,
    "atk": 45,
    "def": 35,
    "sp": 40,
    "spe": 90,
    "moves": ["bide", "bite", "body slam", "bubble beam", "double-edge", "double team", "fury swipes", "growl", "mimic", "pay day", "rage", "rest", "scratch", "screech", "skull bash", "slash", "substitute", "swift", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "metapod",
    "type": ["bug"],
    "hp": 50,
    "atk": 20,
    "def": 55,
    "sp": 25,
    "spe": 30,
    "moves": ["harden", "string shot", "tackle"]
}, {
    "name": "mew",
    "type": ["psychic"],
    "hp": 100,
    "atk": 100,
    "def": 100,
    "sp": 100,
    "spe": 100,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "cut", "dig", "double-edge", "double team", "dragon rage", "dream eater", "earthquake", "egg bomb", "explosion", "fire blast", "fissure", "flash", "fly", "horn drill", "hyper beam", "ice beam", "mega drain", "mega kick", "mega punch", "metronome", "mimic", "pay day", "pound", "psychic", "psywave", "rage", "razor wind", "reflect", "rest", "rock slide", "seismic toss", "self-destruct", "skull bash", "sky attack", "soft-boiled", "solar beam", "strength", "submission", "substitute", "surf", "swift", "swords dance", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "transform", "tri attack", "water gun", "whirlwind"]
}, {
    "name": "mewtwo",
    "type": ["psychic"],
    "hp": 106,
    "atk": 110,
    "def": 90,
    "sp": 154,
    "spe": 130,
    "moves": ["amnesia", "barrier", "bide", "blizzard", "body slam", "bubble beam", "counter", "double-edge", "double team", "fire blast", "flash", "hyper beam", "ice beam", "mega kick", "mega punch", "metronome", "mimic", "mist", "pay day", "psychic", "psywave", "rage", "recover", "reflect", "rest", "seismic toss", "self-destruct", "skull bash", "solar beam", "strength", "submission", "substitute", "swift", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "moltres",
    "type": ["fire", "flying"],
    "hp": 90,
    "atk": 100,
    "def": 90,
    "sp": 125,
    "spe": 90,
    "moves": ["agility", "bide", "double-edge", "double team", "fire blast", "fire spin", "fly", "hyper beam", "leer", "mimic", "peck", "rage", "razor wind", "reflect", "rest", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind"]
}, {
    "name": "mr. mime",
    "type": ["psychic"],
    "hp": 40,
    "atk": 45,
    "def": 65,
    "sp": 100,
    "spe": 90,
    "moves": ["barrier", "bide", "body slam", "confusion", "counter", "double-edge", "double slap", "double team", "flash", "hyper beam", "light screen", "meditate", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "solar beam", "submission", "substitute", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic"]
}, {
    "name": "muk",
    "type": ["poison"],
    "hp": 105,
    "atk": 105,
    "def": 75,
    "sp": 65,
    "spe": 50,
    "moves": ["acid armor", "bide", "body slam", "disable", "double team", "explosion", "fire blast", "harden", "hyper beam", "mega drain", "mimic", "minimize", "poison gas", "pound", "rage", "rest", "screech", "self-destruct", "sludge", "substitute", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "nidoking",
    "type": ["poison", "ground"],
    "hp": 81,
    "atk": 92,
    "def": 77,
    "sp": 75,
    "spe": 85,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "double-edge", "double kick", "double team", "earthquake", "fire blast", "fissure", "focus energy", "fury attack", "horn attack", "horn drill", "hyper beam", "ice beam", "leer", "mega kick", "mega punch", "mimic", "pay day", "poison sting", "rage", "reflect", "rest", "rock slide", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tackle", "take down", "thrash", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "nidoqueen",
    "type": ["poison", "ground"],
    "hp": 90,
    "atk": 82,
    "def": 87,
    "sp": 75,
    "spe": 76,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble beam", "counter", "double-edge", "double kick", "double team", "earthquake", "fire blast", "fissure", "fury swipes", "growl", "horn drill", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "pay day", "poison sting", "rage", "reflect", "rest", "rock slide", "scratch", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "nidoran-f",
    "type": ["poison"],
    "hp": 55,
    "atk": 47,
    "def": 52,
    "sp": 40,
    "spe": 41,
    "moves": ["bide", "bite", "blizzard", "body slam", "double-edge", "double kick", "double team", "fury swipes", "growl", "mimic", "poison sting", "rage", "reflect", "rest", "scratch", "skull bash", "substitute", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "nidoran-m",
    "type": ["poison"],
    "hp": 46,
    "atk": 57,
    "def": 40,
    "sp": 40,
    "spe": 50,
    "moves": ["bide", "blizzard", "body slam", "double-edge", "double kick", "double team", "focus energy", "fury attack", "horn attack", "horn drill", "leer", "mimic", "poison sting", "rage", "reflect", "rest", "skull bash", "substitute", "tackle", "take down", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "nidorina",
    "type": ["poison"],
    "hp": 70,
    "atk": 62,
    "def": 67,
    "sp": 55,
    "spe": 56,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble beam", "double-edge", "double kick", "double team", "fury swipes", "growl", "horn drill", "ice beam", "mimic", "poison sting", "rage", "reflect", "rest", "scratch", "skull bash", "substitute", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "nidorino",
    "type": ["poison"],
    "hp": 61,
    "atk": 72,
    "def": 57,
    "sp": 55,
    "spe": 65,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "double-edge", "double kick", "double team", "focus energy", "fury attack", "horn attack", "horn drill", "ice beam", "leer", "mimic", "poison sting", "rage", "reflect", "rest", "skull bash", "substitute", "tackle", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "ninetales",
    "type": ["fire"],
    "hp": 73,
    "atk": 76,
    "def": 75,
    "sp": 100,
    "spe": 100,
    "moves": ["bide", "body slam", "confuse ray", "dig", "double-edge", "double team", "ember", "fire blast", "fire spin", "flamethrower", "hyper beam", "mimic", "quick attack", "rage", "reflect", "rest", "roar", "skull bash", "substitute", "swift", "tail whip", "take down", "toxic"]
}, {
    "name": "oddish",
    "type": ["grass", "poison"],
    "hp": 45,
    "atk": 50,
    "def": 55,
    "sp": 75,
    "spe": 30,
    "moves": ["absorb", "acid", "bide", "cut", "double-edge", "double team", "mega drain", "mimic", "petal dance", "poison powder", "rage", "reflect", "rest", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic"]
}, {
    "name": "omanyte",
    "type": ["rock", "water"],
    "hp": 35,
    "atk": 40,
    "def": 100,
    "sp": 90,
    "spe": 35,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "horn attack", "hydro pump", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "spike cannon", "substitute", "surf", "take down", "toxic", "water gun", "withdraw"]
}, {
    "name": "omastar",
    "type": ["rock", "water"],
    "hp": 70,
    "atk": 60,
    "def": 125,
    "sp": 115,
    "spe": 55,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "horn attack", "horn drill", "hydro pump", "hyper beam", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "seismic toss", "skull bash", "spike cannon", "submission", "substitute", "surf", "take down", "toxic", "water gun", "withdraw"]
}, {
    "name": "onix",
    "type": ["rock", "ground"],
    "hp": 35,
    "atk": 45,
    "def": 160,
    "sp": 30,
    "spe": 70,
    "moves": ["bide", "bind", "body slam", "dig", "double-edge", "double team", "earthquake", "explosion", "fissure", "harden", "mimic", "rage", "rest", "rock slide", "rock throw", "screech", "self-destruct", "skull bash", "slam", "strength", "substitute", "tackle", "take down", "toxic"]
}, {
    "name": "paras",
    "type": ["bug", "grass"],
    "hp": 35,
    "atk": 70,
    "def": 55,
    "sp": 55,
    "spe": 25,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "growth", "leech life", "mega drain", "mimic", "rage", "reflect", "rest", "scratch", "skull bash", "slash", "solar beam", "spore", "stun spore", "substitute", "swords dance", "take down", "toxic"]
}, {
    "name": "parasect",
    "type": ["bug", "grass"],
    "hp": 60,
    "atk": 95,
    "def": 80,
    "sp": 80,
    "spe": 30,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "growth", "hyper beam", "leech life", "mega drain", "mimic", "rage", "reflect", "rest", "scratch", "skull bash", "slash", "solar beam", "spore", "stun spore", "substitute", "swords dance", "take down", "toxic"]
}, {
    "name": "persian",
    "type": ["normal"],
    "hp": 65,
    "atk": 70,
    "def": 60,
    "sp": 65,
    "spe": 115,
    "moves": ["bide", "bite", "body slam", "bubble beam", "double-edge", "double team", "fury swipes", "growl", "hyper beam", "mimic", "pay day", "rage", "rest", "scratch", "screech", "skull bash", "slash", "substitute", "swift", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "pidgeot",
    "type": ["normal", "flying"],
    "hp": 83,
    "atk": 80,
    "def": 75,
    "sp": 70,
    "spe": 91,
    "moves": ["agility", "bide", "double-edge", "double team", "fly", "gust", "hyper beam", "mimic", "mirror move", "quick attack", "rage", "razor wind", "reflect", "rest", "sand attack", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}, {
    "name": "pidgeotto",
    "type": ["normal", "flying"],
    "hp": 63,
    "atk": 60,
    "def": 55,
    "sp": 50,
    "spe": 71,
    "moves": ["agility", "bide", "double-edge", "double team", "fly", "gust", "mimic", "mirror move", "quick attack", "rage", "razor wind", "reflect", "rest", "sand attack", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}, {
    "name": "pidgey",
    "type": ["normal", "flying"],
    "hp": 40,
    "atk": 45,
    "def": 40,
    "sp": 35,
    "spe": 56,
    "moves": ["agility", "bide", "double-edge", "double team", "fly", "gust", "mimic", "mirror move", "quick attack", "rage", "razor wind", "reflect", "rest", "sand attack", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}, {
    "name": "pikachu",
    "type": ["electric"],
    "hp": 35,
    "atk": 55,
    "def": 30,
    "sp": 50,
    "spe": 90,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "flash", "fly", "growl", "light screen", "mega kick",
        "mega punch", "mimic", "pay day", "quick attack", "rage", "reflect", "rest", "seismic toss", "skull bash", "slam",
        "submission", "substitute", "surf", "swift", "tail whip", "take down", "thunder", "thunderbolt", "thunder shock",
        "thunder wave", "toxic"]
}, {
    "name": "pinsir",
    "type": ["bug"],
    "hp": 65,
    "atk": 125,
    "def": 100,
    "sp": 55,
    "spe": 85,
    "moves": ["bide", "bind", "body slam", "cut", "double-edge", "double team", "focus energy", "guillotine", "harden", "hyper beam", "mimic", "rage", "rest", "seismic toss", "slash", "strength", "submission", "substitute", "swords dance", "take down", "toxic", "vice grip"]
}, {
    "name": "poliwag",
    "type": ["water"],
    "hp": 40,
    "atk": 50,
    "def": 40,
    "sp": 40,
    "spe": 90,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble", "bubble beam", "double-edge", "double slap", "double team", "hydro pump", "hypnosis", "ice beam", "mimic", "psychic", "psywave", "rage", "rest", "skull bash", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "poliwhirl",
    "type": ["water"],
    "hp": 65,
    "atk": 65,
    "def": 65,
    "sp": 50,
    "spe": 90,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble", "bubble beam", "counter", "double-edge", "double slap", "double team", "earthquake", "fissure", "hydro pump", "hypnosis", "ice beam", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "rage", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "poliwrath",
    "type": ["water", "fighting"],
    "hp": 90,
    "atk": 85,
    "def": 95,
    "sp": 70,
    "spe": 70,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble", "bubble beam", "counter", "double-edge", "double slap", "double team", "earthquake", "fissure", "hydro pump", "hyper beam", "hypnosis", "ice beam", "mega kick", "mega punch", "metronome", "mimic", "psychic", "psywave", "rage", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "ponyta",
    "type": ["fire"],
    "hp": 50,
    "atk": 85,
    "def": 55,
    "sp": 65,
    "spe": 90,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "ember", "fire blast", "fire spin", "growl", "horn drill", "mimic", "rage", "reflect", "rest", "skull bash", "stomp", "substitute", "swift", "tail whip", "take down", "toxic"]
}, {
    "name": "porygon",
    "type": ["normal"],
    "hp": 65,
    "atk": 60,
    "def": 70,
    "sp": 75,
    "spe": 40,
    "moves": ["agility", "bide", "blizzard", "conversion", "double-edge", "double team", "flash", "hyper beam", "ice beam", "mimic", "psybeam", "psychic", "psywave", "rage", "recover", "reflect", "rest", "sharpen", "skull bash", "substitute", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack"]
}, {
    "name": "primeape",
    "type": ["fighting"],
    "hp": 65,
    "atk": 105,
    "def": 60,
    "sp": 60,
    "spe": 95,
    "moves": ["bide", "body slam", "counter", "dig", "double-edge", "double team", "focus energy", "fury swipes", "hyper beam", "karate chop", "leer", "low kick", "mega kick", "mega punch", "metronome", "mimic", "pay day", "rage", "rest", "rock slide", "scratch", "screech", "seismic toss", "skull bash", "strength", "submission", "substitute", "swift", "take down", "thrash", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "psyduck",
    "type": ["water"],
    "hp": 50,
    "atk": 52,
    "def": 48,
    "sp": 50,
    "spe": 55,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble beam", "confusion", "counter", "dig", "disable", "double-edge", "double team", "fury swipes", "hydro pump", "ice beam", "mega kick", "mega punch", "mimic", "pay day", "rage", "rest", "scratch", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "swift", "tail whip", "take down", "toxic", "water gun"]
}, {
    "name": "raichu",
    "type": ["electric"],
    "hp": 60,
    "atk": 90,
    "def": 55,
    "sp": 90,
    "spe": 100,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "flash", "fly", "growl", "hyper beam", "light screen", "mega kick", "mega punch", "mimic", "pay day", "quick attack", "rage", "reflect", "rest", "seismic toss", "skull bash", "slam", "submission", "substitute", "surf", "swift", "tail whip", "take down", "thunder", "thunderbolt", "thunder shock", "thunder wave", "toxic"]
}, {
    "name": "rapidash",
    "type": ["fire"],
    "hp": 65,
    "atk": 100,
    "def": 70,
    "sp": 80,
    "spe": 105,
    "moves": ["agility", "bide", "body slam", "double-edge", "double team", "ember", "fire blast", "fire spin", "growl", "horn drill", "hyper beam", "mimic", "pay day", "rage", "reflect", "rest", "skull bash", "stomp", "substitute", "swift", "tail whip", "take down", "toxic"]
}, {
    "name": "raticate",
    "type": ["normal"],
    "hp": 55,
    "atk": 81,
    "def": 60,
    "sp": 50,
    "spe": 97,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "dig", "double-edge", "double team", "focus energy", "hyper beam", "hyper fang", "ice beam", "mimic", "quick attack", "rage", "rest", "skull bash", "substitute", "super fang", "swift", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "rattata",
    "type": ["normal"],
    "hp": 30,
    "atk": 56,
    "def": 35,
    "sp": 25,
    "spe": 72,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "dig", "double-edge", "double team", "focus energy", "hyper fang", "mimic", "quick attack", "rage", "rest", "skull bash", "substitute", "super fang", "swift", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "rhydon",
    "type": ["ground", "rock"],
    "hp": 105,
    "atk": 130,
    "def": 120,
    "sp": 45,
    "spe": 40,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "fury attack", "horn attack", "horn drill", "hyper beam", "ice beam", "leer", "mega kick", "mega punch", "mimic", "pay day", "rage", "rest", "rock slide", "seismic toss", "skull bash", "stomp", "strength", "submission", "substitute", "surf", "tail whip", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "rhyhorn",
    "type": ["ground", "rock"],
    "hp": 80,
    "atk": 85,
    "def": 95,
    "sp": 30,
    "spe": 25,
    "moves": ["bide", "body slam", "dig", "double-edge", "double team", "earthquake", "fire blast", "fissure", "fury attack", "horn attack", "horn drill", "leer", "mimic", "rage", "rest", "rock slide", "skull bash", "stomp", "strength", "substitute", "tail whip", "take down", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "sandshrew",
    "type": ["ground"],
    "hp": 50,
    "atk": 75,
    "def": 85,
    "sp": 30,
    "spe": 40,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "earthquake", "fissure", "fury swipes", "mimic", "poison sting", "rage", "rest", "rock slide", "sand attack", "scratch", "seismic toss", "skull bash", "slash", "strength", "submission", "substitute", "swift", "swords dance", "take down", "toxic"]
}, {
    "name": "sandslash",
    "type": ["ground"],
    "hp": 75,
    "atk": 100,
    "def": 110,
    "sp": 55,
    "spe": 65,
    "moves": ["bide", "body slam", "cut", "dig", "double-edge", "double team", "earthquake", "fissure", "fury swipes", "hyper beam", "mimic", "poison sting", "rage", "rest", "rock slide", "sand attack", "scratch", "seismic toss", "skull bash", "slash", "strength", "submission", "substitute", "swift", "swords dance", "take down", "toxic"]
}, {
    "name": "scyther",
    "type": ["bug", "flying"],
    "hp": 70,
    "atk": 110,
    "def": 80,
    "sp": 55,
    "spe": 105,
    "moves": ["agility", "bide", "cut", "double-edge", "double team", "focus energy", "hyper beam", "leer", "mimic", "quick attack", "rage", "rest", "skull bash", "slash", "substitute", "swift", "swords dance", "take down", "toxic", "wing attack"]
}, {
    "name": "seadra",
    "type": ["water"],
    "hp": 55,
    "atk": 65,
    "def": 95,
    "sp": 95,
    "spe": 85,
    "moves": ["agility", "bide", "blizzard", "bubble", "bubble beam", "double-edge", "double team", "hydro pump", "hyper beam", "ice beam", "leer", "mimic", "rage", "rest", "skull bash", "smokescreen", "substitute", "surf", "swift", "take down", "toxic", "water gun"]
}, {
    "name": "seaking",
    "type": ["water"],
    "hp": 80,
    "atk": 92,
    "def": 65,
    "sp": 80,
    "spe": 68,
    "moves": ["agility", "bide", "blizzard", "bubble beam", "double-edge", "double team", "fury attack", "horn attack", "horn drill", "hyper beam", "ice beam", "mimic", "peck", "rage", "rest", "skull bash", "substitute", "supersonic", "surf", "swift", "tail whip", "take down", "toxic", "waterfall", "water gun"]
}, {
    "name": "seel",
    "type": ["water"],
    "hp": 65,
    "atk": 45,
    "def": 55,
    "sp": 70,
    "spe": 45,
    "moves": ["aurora beam", "bide", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "growl", "headbutt", "horn drill", "ice beam", "mimic", "pay day", "rage", "rest", "skull bash", "strength", "substitute", "surf", "take down", "toxic", "water gun"]
}, {
    "name": "shellder",
    "type": ["water"],
    "hp": 30,
    "atk": 65,
    "def": 100,
    "sp": 45,
    "spe": 40,
    "moves": ["aurora beam", "bide", "blizzard", "bubble beam", "clamp", "double-edge", "double team", "explosion", "ice beam", "leer", "mimic", "rage", "reflect", "rest", "self-destruct", "substitute", "supersonic", "surf", "swift", "tackle", "take down", "teleport", "toxic", "tri attack", "water gun", "withdraw"]
}, {
    "name": "slowbro",
    "type": ["water", "psychic"],
    "hp": 95,
    "atk": 75,
    "def": 110,
    "sp": 80,
    "spe": 30,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble beam", "confusion", "counter", "dig", "disable", "double-edge", "double team", "earthquake", "fire blast", "fissure", "flash", "growl", "headbutt", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "pay day", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "swift", "take down", "teleport", "thunder wave", "toxic", "tri attack", "water gun", "withdraw"]
}, {
    "name": "slowpoke",
    "type": ["water", "psychic"],
    "hp": 90,
    "atk": 65,
    "def": 65,
    "sp": 40,
    "spe": 15,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble beam", "confusion", "dig", "disable", "double-edge", "double team", "earthquake", "fire blast", "fissure", "flash", "growl", "headbutt", "ice beam", "mimic", "pay day", "psychic", "psywave", "rage", "reflect", "rest", "skull bash", "strength", "substitute", "surf", "swift", "take down", "teleport", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "snorlax",
    "type": ["normal"],
    "hp": 160,
    "atk": 110,
    "def": 65,
    "sp": 65,
    "spe": 30,
    "moves": ["amnesia", "bide", "blizzard", "body slam", "bubble beam", "counter", "double-edge", "double team", "earthquake", "fire blast", "fissure", "harden", "headbutt", "hyper beam", "ice beam", "mega kick", "mega punch", "metronome", "mimic", "pay day", "psychic", "psywave", "rage", "reflect", "rest", "rock slide", "seismic toss", "self-destruct", "skull bash", "solar beam", "strength", "submission", "substitute", "surf", "take down", "thunder", "thunderbolt", "toxic", "water gun"]
}, {
    "name": "spearow",
    "type": ["normal", "flying"],
    "hp": 40,
    "atk": 60,
    "def": 30,
    "sp": 31,
    "spe": 70,
    "moves": ["agility", "bide", "double-edge", "double team", "drill peck", "fly", "fury attack", "growl", "leer", "mimic", "mirror move", "peck", "rage", "razor wind", "rest", "sky attack", "substitute", "swift", "take down", "toxic", "whirlwind"]
}, {
    "name": "squirtle",
    "type": ["water"],
    "hp": 44,
    "atk": 48,
    "def": 65,
    "sp": 50,
    "spe": 43,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble", "bubble beam", "counter", "dig", "double-edge", "double team", "hydro pump", "ice beam", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tackle", "tail whip", "take down", "toxic", "water gun", "withdraw"]
}, {
    "name": "starmie",
    "type": ["water", "psychic"],
    "hp": 60,
    "atk": 75,
    "def": 85,
    "sp": 100,
    "spe": 115,
    "moves": ["bide", "blizzard", "bubble beam", "double-edge", "double team", "flash", "harden", "hydro pump", "hyper beam", "ice beam", "light screen", "mimic", "minimize", "psychic", "psywave", "rage", "recover", "reflect", "rest", "skull bash", "substitute", "surf", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "staryu",
    "type": ["water"],
    "hp": 30,
    "atk": 45,
    "def": 55,
    "sp": 70,
    "spe": 85,
    "moves": ["bide", "blizzard", "bubble beam", "double-edge", "double team", "flash", "harden", "hydro pump", "ice beam", "light screen", "mimic", "minimize", "psychic", "psywave", "rage", "recover", "reflect", "rest", "skull bash", "substitute", "surf", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "tangela",
    "type": ["grass"],
    "hp": 65,
    "atk": 55,
    "def": 115,
    "sp": 100,
    "spe": 60,
    "moves": ["absorb", "bide", "bind", "body slam", "constrict", "cut", "double-edge", "double team", "growth", "hyper beam", "mega drain", "mimic", "poison powder", "rage", "rest", "skull bash", "slam", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic", "vine whip"]
}, {
    "name": "tauros",
    "type": ["normal"],
    "hp": 75,
    "atk": 100,
    "def": 95,
    "sp": 70,
    "spe": 110,
    "moves": ["bide", "blizzard", "body slam", "double-edge", "double team", "earthquake", "fire blast", "fissure", "horn drill", "hyper beam", "ice beam", "leer", "mimic", "rage", "rest", "skull bash", "stomp", "strength", "substitute", "tackle", "tail whip", "take down", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "tentacool",
    "type": ["water", "poison"],
    "hp": 40,
    "atk": 40,
    "def": 35,
    "sp": 100,
    "spe": 70,
    "moves": ["acid", "barrier", "bide", "blizzard", "bubble beam", "constrict", "cut", "double-edge", "double team", "hydro pump", "ice beam", "mega drain", "mimic", "poison sting", "rage", "reflect", "rest", "screech", "skull bash", "substitute", "supersonic", "surf", "swords dance", "take down", "toxic", "water gun", "wrap"]
}, {
    "name": "tentacruel",
    "type": ["water", "poison"],
    "hp": 80,
    "atk": 70,
    "def": 65,
    "sp": 120,
    "spe": 100,
    "moves": ["acid", "barrier", "bide", "blizzard", "bubble beam", "constrict", "cut", "double-edge", "double team", "hydro pump", "hyper beam", "ice beam", "mega drain", "mimic", "poison sting", "rage", "reflect", "rest", "screech", "skull bash", "substitute", "supersonic", "surf", "swords dance", "take down", "toxic", "water gun", "wrap"]
}, {
    "name": "vaporeon",
    "type": ["water"],
    "hp": 130,
    "atk": 65,
    "def": 60,
    "sp": 110,
    "spe": 65,
    "moves": ["acid armor", "aurora beam", "bide", "bite", "blizzard", "body slam", "bubble beam", "double-edge", "double team", "focus energy", "growl", "haze", "hydro pump", "hyper beam", "ice beam", "mimic", "mist", "quick attack", "rage", "reflect", "rest", "sand attack", "skull bash", "substitute", "surf", "swift", "tackle", "tail whip", "take down", "toxic", "water gun"]
}, {
    "name": "venomoth",
    "type": ["bug", "poison"],
    "hp": 70,
    "atk": 65,
    "def": 60,
    "sp": 90,
    "spe": 90,
    "moves": ["bide", "confusion", "disable", "double-edge", "double team", "flash", "hyper beam", "leech life", "mega drain", "mimic", "poison powder", "psybeam", "psychic", "psywave", "rage", "razor wind", "reflect", "rest", "sleep powder", "solar beam", "stun spore", "substitute", "supersonic", "swift", "tackle", "take down", "teleport", "toxic", "whirlwind"]
}, {
    "name": "venonat",
    "type": ["bug", "poison"],
    "hp": 60,
    "atk": 55,
    "def": 50,
    "sp": 40,
    "spe": 45,
    "moves": ["bide", "confusion", "disable", "double-edge", "double team", "flash", "leech life", "mega drain", "mimic", "poison powder", "psybeam", "psychic", "psywave", "rage", "reflect", "rest", "sleep powder", "solar beam", "stun spore", "substitute", "supersonic", "tackle", "take down", "toxic"]
}, {
    "name": "venusaur",
    "type": ["grass", "poison"],
    "hp": 80,
    "atk": 82,
    "def": 83,
    "sp": 100,
    "spe": 80,
    "moves": ["bide", "body slam", "cut", "double-edge", "double team", "growl", "growth", "hyper beam", "leech seed", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "sleep powder", "solar beam", "substitute", "swords dance", "tackle", "take down", "toxic", "vine whip"]
}, {
    "name": "victreebel",
    "type": ["grass", "poison"],
    "hp": 80,
    "atk": 105,
    "def": 65,
    "sp": 100,
    "spe": 70,
    "moves": ["acid", "bide", "body slam", "cut", "double-edge", "double team", "growth", "hyper beam", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "slam", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic", "vine whip", "wrap"]
}, {
    "name": "vileplume",
    "type": ["grass", "poison"],
    "hp": 75,
    "atk": 80,
    "def": 85,
    "sp": 100,
    "spe": 50,
    "moves": ["absorb", "acid", "bide", "body slam", "cut", "double-edge", "double team", "hyper beam", "mega drain", "mimic", "petal dance", "poison powder", "rage", "reflect", "rest", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic"]
}, {
    "name": "voltorb",
    "type": ["electric"],
    "hp": 40,
    "atk": 30,
    "def": 50,
    "sp": 55,
    "spe": 100,
    "moves": ["bide", "double team", "explosion", "flash", "light screen", "mimic", "rage", "reflect", "rest", "screech", "self-destruct", "sonic boom", "substitute", "swift", "tackle", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic"]
}, {
    "name": "vulpix",
    "type": ["fire"],
    "hp": 38,
    "atk": 41,
    "def": 40,
    "sp": 65,
    "spe": 65,
    "moves": ["bide", "body slam", "confuse ray", "dig", "double-edge", "double team", "ember", "fire blast", "fire spin", "flamethrower", "mimic", "quick attack", "rage", "reflect", "rest", "roar", "skull bash", "substitute", "swift", "tail whip", "take down", "toxic"]
}, {
    "name": "wartortle",
    "type": ["water"],
    "hp": 59,
    "atk": 63,
    "def": 80,
    "sp": 65,
    "spe": 58,
    "moves": ["bide", "bite", "blizzard", "body slam", "bubble", "bubble beam", "counter", "dig", "double-edge", "double team", "hydro pump", "ice beam", "mega kick", "mega punch", "mimic", "rage", "reflect", "rest", "seismic toss", "skull bash", "strength", "submission", "substitute", "surf", "tackle", "tail whip", "take down", "toxic", "water gun", "withdraw"]
}, {
    "name": "weedle",
    "type": ["bug", "poison"],
    "hp": 40,
    "atk": 35,
    "def": 30,
    "sp": 20,
    "spe": 50,
    "moves": ["poison sting", "string shot"]
}, {
    "name": "weepinbell",
    "type": ["grass", "poison"],
    "hp": 65,
    "atk": 90,
    "def": 50,
    "sp": 85,
    "spe": 55,
    "moves": ["acid", "bide", "cut", "double-edge", "double team", "growth", "mega drain", "mimic", "poison powder", "rage", "razor leaf", "reflect", "rest", "slam", "sleep powder", "solar beam", "stun spore", "substitute", "swords dance", "take down", "toxic", "vine whip", "wrap"]
}, {
    "name": "weezing",
    "type": ["poison"],
    "hp": 65,
    "atk": 90,
    "def": 120,
    "sp": 85,
    "spe": 60,
    "moves": ["bide", "double team", "explosion", "fire blast", "haze", "hyper beam", "mimic", "rage", "rest", "self-destruct", "sludge", "smog", "smokescreen", "substitute", "tackle", "thunder", "thunderbolt", "toxic"]
}, {
    "name": "wigglytuff",
    "type": ["normal"],
    "hp": 140,
    "atk": 70,
    "def": 45,
    "sp": 50,
    "spe": 45,
    "moves": ["bide", "blizzard", "body slam", "bubble beam", "counter", "defense curl", "disable", "double-edge", "double slap", "double team", "fire blast", "flash", "hyper beam", "ice beam", "mega kick", "mega punch", "mimic", "pound", "psychic", "psywave", "rage", "reflect", "rest", "seismic toss", "sing", "skull bash", "solar beam", "strength", "submission", "substitute", "take down", "teleport", "thunder", "thunderbolt", "thunder wave", "toxic", "tri attack", "water gun"]
}, {
    "name": "zapdos",
    "type": ["electric", "flying"],
    "hp": 90,
    "atk": 90,
    "def": 85,
    "sp": 125,
    "spe": 100,
    "moves": ["agility", "bide", "double-edge", "double team", "drill peck", "flash", "fly", "hyper beam", "light screen", "mimic", "rage", "razor wind", "reflect", "rest", "sky attack", "substitute", "swift", "take down", "thunder", "thunderbolt", "thunder shock", "thunder wave", "toxic", "whirlwind"]
}, {
    "name": "zubat",
    "type": ["poison", "flying"],
    "hp": 40,
    "atk": 45,
    "def": 35,
    "sp": 40,
    "spe": 55,
    "moves": ["bide", "bite", "confuse ray", "double-edge", "double team", "haze", "leech life", "mega drain", "mimic", "rage", "razor wind", "rest", "substitute", "supersonic", "swift", "take down", "toxic", "whirlwind", "wing attack"]
}];
const TRANSLATION = {
    "en": {
        "types": {
            "bug": "Bug",
            "dragon": "Dragon",
            "electric": "Electric",
            "fighting": "Fighting",
            "fire": "Fire",
            "flying": "Flying",
            "ghost": "Ghost",
            "grass": "Grass",
            "ground": "Ground",
            "ice": "Ice",
            "normal": "Normal",
            "poison": "Poison",
            "psychic": "Psychic",
            "rock": "Rock",
            "water": "Water"
        },
        "stats": {
            "atk": "Attack",
            "def": "Defense",
            "sp": "Special",
            "spe": "Speed",
            "acc": "Accuracy",
            "eva": "Evasion"
        },
        "cat": {
            "physical": "Physical",
            "special": "Special",
            "status": "Status"
        },
        "status": {
            "tox": "Toxic",
            "psn": "Poisoned",
            "brn": "Burned",
            "frz": "Frozen",
            "par": "Paralysed",
            "slp": "Asleep"
        },
        "ui": {
            "moves": "Moves: ",
            "switch": "Switch to: ",
            "setup": "Setup",
            "record": "Record",
            "settings": "Settings",
            "sleepClause": "Sleep Clause",
            "speciesClause": "Species Clause",
            "ohkoClause": "OHKO clause",
            "freezeClause": "Freeze Clause",
            "evasionClause": "Evasion Clause",
            "selfKoClause": "Self-KO Clause",
            "power": "Power",
            "accuracy": "Accuracy",
            "priority": "Priority",
            "pp": "PP"
        },
        "others": {
            "turn": "Turn [number0]",
            "crit": "A critical hit!",
            "use": "[pokemon0] used <strong>[moves0]</strong>!",
            "use-enemy": "The opposing [pokemon0] used <strong>[moves0]</strong>!",
            "faint": "[pokemon0] fainted!",
            "faint-enemy": "The opposing [pokemon0] fainted!",
            "go": "Go! <strong>[pokemon0]</strong>!",
            "go-enemy": "The enemy sent out <strong>[pokemon0]</strong>!",
            "superEffective": "It's super effective!",
            "notVeryEffective": "It's not very effective...",
            "loseHealth": "([pokemon0] lost [percentage0]% of its health!)",
            "loseHealth-enemy": "(The opposing [pokemon0] lost [percentage0]% of its health!)",
            "putInSubstitute": "[pokemon0] put in a substitute!",
            "putInSubstitute-enemy": "The opposing [pokemon0] put in a substitute!",
            "substituteFade": "[pokemon0]'s substitute faded!",
            "substituteFade-enemy": "The opposing [pokemon0]'s substitute faded!",
            "substituteTakeDamage": "The substitute took damage for [pokemon0]!",
            "substituteTakeDamage-enemy": "The substitute took damage for the opposing [pokemon0]!",
            "comeBack": "[pokemon0], come back!",
            "comeBack-enemy": "The enemy withdrew [pokemon0]!",
            "nothingHappen": "But nothing happened!",
            "attackMiss": "[pokemon0]'s attack missed!",
            "attackMiss-enemy": "The opposing [pokemon0]'s attack missed!",
            "noEffect": "It doesn't affect [pokemon0]...",
            "noEffect-enemy": "It doesn't affect the opposing [pokemon0]...",
            "fallAsleep": "[pokemon0] fell asleep!",
            "fallAsleep-enemy": "The opposing [pokemon0] fell asleep!",
            "fastAsleep": "[pokemon0] is fast asleep.",
            "fastAsleep-enemy": "The opposing [pokemon0] is fast asleep.",
            "wakeUp": "[pokemon0] woke up!",
            "wakeUp-enemy": "The opposing [pokemon0] woke up!",
            "hurtConfusion": "It hurt itself in its confusion!",
            "paralyzed": "[pokemon0] is paralyzed! It may be unable to move!",
            "paralyzed-enemy": "The opposing [pokemon0] is paralyzed! It may be unable to move!",
            "alreadyParalyzed": "[pokemon0] is already paralyzed!",
            "alreadyParalyzed-enemy": "The opposing [pokemon0] is already paralyzed!",
            "hitTimes": "The Pokémon was hit [number0] times!",
            "frozenSolid": "[pokemon0] is frozen solid!",
            "frozenSolid-enemy": "The opposing [pokemon0] is frozen solid!",
            "dreamEaten": "[pokemon0]'s dream was eaten!",
            "dreamEaten-enemy": "The opposing [pokemon0]'s dream was eaten!",
            "transform": "[pokemon0] transformed into [pokemon1]!",
            "transform-enemy": "The opposing [pokemon0] transformed into [pokemon1]!",
            "unableToMove": "[pokemon0] is paralyzed! It can't move!",
            "unableToMove-enemy": "The opposing [pokemon0] is paralyzed! It can't move!",
            "sleepHealthy": "[pokemon0] slept and became healthy!",
            "sleepHealthy-enemy": "The opposing [pokemon0] slept and became healthy!",
            "rise": "[pokemon0]'s [stats0] rose!",
            "rise-enemy": "The opposing [pokemon0]'s [stats0] rose!",
            "riseSharply": "[pokemon0]'s [stats0] rose sharply!",
            "riseSharply-enemy": "The opposing [pokemon0]'s [stats0] rose sharply!",
            "fall": "[pokemon0]'s [stats0] fell!",
            "fall-enemy": "The opposing [pokemon0]'s [stats0] fell!",
            "harshlyFall": "[pokemon0]'s [stats0] harshly fell!",
            "harshlyFall-enemy": "The opposing [pokemon0]'s [stats0] harshly fell!",
            "poisoned": "[pokemon0] was poisoned!",
            "badlyPoisoned": "[pokemon0] was badly poisoned!",
            "poisoned-enemy": "The opposing [pokemon0] was poisoned!",
            "badlyPoisoned-enemy": "The opposing [pokemon0] was badly poisoned!",
            "confused": "[pokemon0] is confused!",
            "confused-enemy": "The opposing [pokemon0] is confused!",
            "becomeConfused": "[pokemon0] became confused!",
            "becomeConfused-enemy": "The opposing [pokemon0] became confused!",
            "winBattle": "[player0] won the battle!",
            "forfeit": "[player0] forfeited.",
            "gainArmor": "[pokemon0] gained armor!",
            "gainArmor-enemy": "The opposing [pokemon0] gained armor!",
            "hpRestored": "[pokemon0] had its HP restored.",
            "hpRestored-enemy": "The opposing [pokemon0] had its HP restored."
        },
        "pokemon": {
            "abra": "Abra",
            "aerodactyl": "Aerodactyl",
            "alakazam": "Alakazam",
            "arbok": "Arbok",
            "arcanine": "Arcanine",
            "articuno": "Articuno",
            "beedrill": "Beedrill",
            "bellsprout": "Bellsprout",
            "blastoise": "Blastoise",
            "bulbasaur": "Bulbasaur",
            "butterfree": "Butterfree",
            "caterpie": "Caterpie",
            "chansey": "Chansey",
            "charizard": "Charizard",
            "charmander": "Charmander",
            "charmeleon": "Charmeleon",
            "clefable": "Clefable",
            "clefairy": "Clefairy",
            "cloyster": "Cloyster",
            "cubone": "Cubone",
            "dewgong": "Dewgong",
            "diglett": "Diglett",
            "ditto": "Ditto",
            "dodrio": "Dodrio",
            "doduo": "Doduo",
            "dragonair": "Dragonair",
            "dragonite": "Dragonite",
            "dratini": "Dratini",
            "drowzee": "Drowzee",
            "dugtrio": "Dugtrio",
            "eevee": "Eevee",
            "ekans": "Ekans",
            "electabuzz": "Electabuzz",
            "electrode": "Electrode",
            "exeggcute": "Exeggcute",
            "exeggutor": "Exeggutor",
            "farfetch'd": "Farfetch'd",
            "fearow": "Fearow",
            "flareon": "Flareon",
            "gastly": "Gastly",
            "gengar": "Gengar",
            "geodude": "Geodude",
            "gloom": "Gloom",
            "golbat": "Golbat",
            "goldeen": "Goldeen",
            "golduck": "Golduck",
            "golem": "Golem",
            "graveler": "Graveler",
            "grimer": "Grimer",
            "growlithe": "Growlithe",
            "gyarados": "Gyarados",
            "haunter": "Haunter",
            "hitmonchan": "Hitmonchan",
            "hitmonlee": "Hitmonlee",
            "horsea": "Horsea",
            "hypno": "Hypno",
            "ivysaur": "Ivysaur",
            "jigglypuff": "Jigglypuff",
            "jolteon": "Jolteon",
            "jynx": "Jynx",
            "kabuto": "Kabuto",
            "kabutops": "Kabutops",
            "kadabra": "Kadabra",
            "kakuna": "Kakuna",
            "kangaskhan": "Kangaskhan",
            "kingler": "Kingler",
            "koffing": "Koffing",
            "krabby": "Krabby",
            "lapras": "Lapras",
            "lickitung": "Lickitung",
            "machamp": "Machamp",
            "machoke": "Machoke",
            "machop": "Machop",
            "magikarp": "Magikarp",
            "magmar": "Magmar",
            "magnemite": "Magnemite",
            "magneton": "Magneton",
            "mankey": "Mankey",
            "marowak": "Marowak",
            "meowth": "Meowth",
            "metapod": "Metapod",
            "mew": "Mew",
            "mewtwo": "Mewtwo",
            "moltres": "Moltres",
            "mr. mime": "Mr. Mime",
            "muk": "Muk",
            "nidoking": "Nidoking",
            "nidoqueen": "Nidoqueen",
            "nidoran-f": "Nidoran-F",
            "nidoran-m": "Nidoran-M",
            "nidorina": "Nidorina",
            "nidorino": "Nidorino",
            "ninetales": "Ninetales",
            "oddish": "Oddish",
            "omanyte": "Omanyte",
            "omastar": "Omastar",
            "onix": "Onix",
            "paras": "Paras",
            "parasect": "Parasect",
            "persian": "Persian",
            "pidgeot": "Pidgeot",
            "pidgeotto": "Pidgeotto",
            "pidgey": "Pidgey",
            "pikachu": "Pikachu",
            "pinsir": "Pinsir",
            "poliwag": "Poliwag",
            "poliwhirl": "Poliwhirl",
            "poliwrath": "Poliwrath",
            "ponyta": "Ponyta",
            "porygon": "Porygon",
            "primeape": "Primeape",
            "psyduck": "Psyduck",
            "raichu": "Raichu",
            "rapidash": "Rapidash",
            "raticate": "Raticate",
            "rattata": "Rattata",
            "rhydon": "Rhydon",
            "rhyhorn": "Rhyhorn",
            "sandshrew": "Sandshrew",
            "sandslash": "Sandslash",
            "scyther": "Scyther",
            "seadra": "Seadra",
            "seaking": "Seaking",
            "seel": "Seel",
            "shellder": "Shellder",
            "slowbro": "Slowbro",
            "slowpoke": "Slowpoke",
            "snorlax": "Snorlax",
            "spearow": "Spearow",
            "squirtle": "Squirtle",
            "starmie": "Starmie",
            "staryu": "Staryu",
            "tangela": "Tangela",
            "tauros": "Tauros",
            "tentacool": "Tentacool",
            "tentacruel": "Tentacruel",
            "vaporeon": "Vaporeon",
            "venomoth": "Venomoth",
            "venonat": "Venonat",
            "venusaur": "Venusaur",
            "victreebel": "Victreebel",
            "vileplume": "Vileplume",
            "voltorb": "Voltorb",
            "vulpix": "Vulpix",
            "wartortle": "Wartortle",
            "weedle": "Weedle",
            "weepinbell": "Weepinbell",
            "weezing": "Weezing",
            "wigglytuff": "Wigglytuff",
            "zapdos": "Zapdos",
            "zubat": "Zubat"
        },
        "pkmnDesc": {
            "abra": "Sleeps 18 hours a day. If it senses danger, it will teleport itself to safety even as it sleeps.",
            "aerodactyl": "A savage Pokémon that died out in ancient times. It was resurrected using DNA taken from amber.",
            "alakazam": "A Pokémon that can memorize anything. It never forgets what it learns - that's why this Pokémon is smart.",
            "arbok": "The frightening patterns on its belly have been studied. Six variations have been confirmed.",
            "arcanine": "A legendary Pokémon in China. Many people are charmed by its grace and beauty while running.",
            "articuno": "A legendary bird Pokémon. It freezes water that is contained in winter air and makes it snow.",
            "beedrill": "It has 3 poisonous stingers on its forelegs and its tail. They are used to jab its enemy repeatedly.",
            "bellsprout": "Prefers hot and humid places. It ensnares tiny insects with its vines and devours them.",
            "blastoise": "Once it takes aim at its enemy, it blasts out water with even more force than a fire hose.",
            "bulbasaur": "It can go for days without eating a single morsel. In the bulb on its back, it stores energy.",
            "butterfree": "Its wings, covered with poisonous powders, repel water. This allows it to fly in the rain.",
            "caterpie": "If you touch the feeler on top of its head, it will release a horrible stink to protect itself.",
            "chansey": "A gentle and kind-hearted Pokémon that shares its nutritious eggs if it sees an injured Pokémon.",
            "charizard": "When expelling a blast of super hot fire, the red flame on the tip of its tail burns more intensely.",
            "charmander": "The flame at the tip of its tail makes a sound as it burns. You can only hear it in quiet places.",
            "charmeleon": "Tough fights could excite this Pokémon. When excited, it many blow out bluish-white flames.",
            "clefable": "They appear to be very protective of their own world. It is a kind of fairy, rarely seen by people.",
            "clefairy": "Adored for their cute looks and playfulness. They are thought to be rare, as they do not appear often.",
            "cloyster": "For protection, it uses its harder-than-diamonds shell. It also shoots spikes from the shell.",
            "cubone": "Wears the skull of its deceased mother. Its cries echo inside the skull and come out as a sad melody.",
            "dewgong": "Its entire body is a snowy-white. Unharmed by even intense cold, it swims powerfully in icy waters.",
            "diglett": "It prefers dark places. It spends most of its time underground, though it may pop up in caves.",
            "ditto": "When it spots an enemy, its body transforms into an almost perfect copy of its opponent.",
            "dodrio": "One of Doduo's 2 heads splits to form a unique species. It runs close to 40 MPH in prairies.",
            "doduo": "Its short wings make flying difficult. Instead, this Pokémon runs at high speed on developed legs.",
            "dragonair": "According to a witness, its body was surrounded by a strange aura that gave it a mystical look.",
            "dragonite": "It is said that this Pokémon lives somewhere in the sea and that it flies. However, it is only a rumor.",
            "dratini": "The existence of this mythical Pokémon was only recently confirmed by a fisherman who caught one.",
            "drowzee": "If you sleep by it all the time, it will sometimes show you dreams it has eaten in the past.",
            "dugtrio": "A team of triplets that can burrow over 60 MPH. Due to this, some people think it's an earthquake.",
            "eevee": "Its genetic code is unstable, so it could evolve in a variety of ways. There are only a few alive.",
            "ekans": "The older it gets, the longer it grows. At night, it wraps its long body around tree branches to rest.",
            "electabuzz": "If a major power outage occurs, it is certain that this Pokémon has eaten electricity at a power plant.",
            "electrode": "Stores electrical energy inside its body. Even the slightest shock could trigger a huge explosion.",
            "exeggcute": "The heads attract each other and spin around. There must be 6 heads for it to maintain balance.",
            "exeggutor": "Its cries are very noisy. This is because each of the 3 heads thinks about whatever it likes.",
            "farfetch'd": "Lives where reedy plants grow. They are rarely seen, so it's thought their numbers are decreasing.",
            "fearow": "A Pokémon that dates back many years. If it senses danger, it flies high and away, instantly.",
            "flareon": "It has a flame chamber inside its body. It inhales, then blows out fire that is over 3,000F degrees.",
            "gastly": "Said to appear in decrepit, deserted buildings. It has no real shape as it appears to be made of a gas.",
            "gengar": "A Gengar is close by if you feel a sudden chill. It may be trying to lay a curse on you.",
            "geodude": "Commonly found near mountain trails, etc. If you step on one by accident, it gets angry.",
            "gloom": "Smells incredibly foul! However, around 1 out of 1,000 people enjoy sniffing its nose-bending stink.",
            "golbat": "It attacks in a stealthy manner, without warning. Its sharp fangs are used to bite and suck blood.",
            "goldeen": "When it is time for them to lay eggs, they can be seen swimming up rivers and falls in large groups.",
            "golduck": "Its slim and long limbs end in broad flippers. They are used for swimming gracefully in lakes.",
            "golem": "Once it sheds its skin, its body turns tender and whitish. Its hide hardens when it's exposed to air.",
            "graveler": "Often seen rolling down mountain trails. Obstacles are just things to roll straight over, not avoid.",
            "grimer": "Made of hardened sludge. It smells too putrid to touch. Even weeds won't grow in its path.",
            "growlithe": "A Pokémon with a friendly nature. However, it will bark fiercely at anything invading its territory.",
            "gyarados": "Brutally vicious and enormously destructive. Known for totally destroying cities in ancient times.",
            "haunter": "By licking, it saps the victim's life. It causes shaking that won't stop until the victim's demise.",
            "hitmonchan": "Punches in corkscrew fashion. It can punch its way through a concrete wall in the same way as a drill.",
            "hitmonlee": "When kicking, the sole of its foot turns as hard as a diamond on impact and destroys its enemy.",
            "horsea": "If it senses danger, it will vigorously spray water or a special type of ink from its mouth.",
            "hypno": "Avoid eye contact if you come across one. It will try to put you to sleep by using its pendulum.",
            "ivysaur": "The bulb on its back grows by drawing energy. It gives off an aroma when it is ready to bloom.",
            "jigglypuff": "Uses its alluring eyes to enrapture its foe. It then sings a pleasing melody that lulls the foe to sleep.",
            "jolteon": "A sensitive Pokémon that easily becomes sad or angry. Every time its mood changes, it charges power.",
            "jynx": "Appears to move to a rhythm of its own, as if it were dancing. It wiggles its hips as it walks.",
            "kabuto": "A Pokémon that was recovered from a fossil. It uses the eyes on its back while hiding on the sea floor.",
            "kabutops": "A slim and fast swimmer. It slices its prey with its sharp sickles and drinks the body fluids.",
            "kadabra": "Many odd things happen if this Pokémon is close by. For example, it makes clocks run backwards.",
            "kakuna": "Able to move only slightly. When endangered, it may stick out its stinger and poison its enemy.",
            "kangaskhan": "Raises its young in its belly pouch. Won't run from any fight to keep its young protected.",
            "kingler": "One claw grew massively and as hard as steel. It has 10,000-HP strength. However, it is too heavy.",
            "koffing": "In hot places, its internal gases could expand and explode without any warning. Be very careful!",
            "krabby": "Its pincers are superb weapons. They sometimes break off during battle, but they grow back fast.",
            "lapras": "A gentle soul that can read the minds of people. It can ferry people across the sea on its back.",
            "lickitung": "Its tongue spans almost 7 feet and moves more freely than its forelegs. Its licks can cause paralysis.",
            "machamp": "One arm alone can move mountains. Using all four arms, this Pokémon fires off awesome punches.",
            "machoke": "The belt around its waist holds back its energy. Without it, this Pokémon would be unstoppable.",
            "machop": "Very powerful in spite of its small size. Its mastery of many types of martial arts makes it very tough.",
            "magikarp": "Famous for being very unreliable. It can be found swimming in seas, lakes, rivers, and shallow puddles.",
            "magmar": "Born in an active volcano. Its body is always cloaked in flames, so it looks like a big ball of fire.",
            "magnemite": "It is born with the ability to defy gravity. It floats in air on powerful electromagnetic waves.",
            "magneton": "Generates strange radio signals. It raises the temperature by 3.6F degrees within 3,300 feet.",
            "mankey": "An agile Pokémon that lives in trees. It angers easily and will not hesitate to attack anything.",
            "marowak": "Small and weak, this Pokémon is adept with its bone club. It has grown more vicious over the ages.",
            "meowth": "Appears to be more active at night. It loves round and shiny things. It can't stop from picking them up.",
            "metapod": "Hardens its shell to protect itself. However, a large impact may cause it to pop out of its shell.",
            "mew": "When viewed through a microscope, this Pokémon's short fine, delicate hair can be seen.",
            "mewtwo": "Its DNA is almost the same as Mew's. However, its size and disposition are vastly different.",
            "moltres": "A legendary bird Pokémon. As it flaps its flaming wings, even the night sky will turn red.",
            "mr. mime": "Always practices its pantomime act. It makes enemies believe something exists that really doesn't.",
            "muk": "Smells so awful, it can cause fainting. Through degeneration, it lost its sense of smell.",
            "nidoking": "Its steel-like hide adds to its powerful tackle. Its horns are so hard, they can pierce a diamond.",
            "nidoqueen": "Tough scales cover the sturdy body of this Pokémon. It appears that the scales grow in cycles.",
            "nidoran-f": "A mild-mannered Pokémon that does not like to fight. Beware, its small horns secrete venom.",
            "nidoran-m": "Its large ears are always kept upright. If it senses danger, it will attack with a poisonous sting.",
            "nidorina": "When resting deep in its burrow, its thorns always retract. This is proof that it is relaxed.",
            "nidorino": "Its horns contain venom. If they are stabbed into an enemy, the impact makes the poison leak out.",
            "ninetales": "According to an enduring legend, 9 noble saints were united and reincarnated as this Pokémon.",
            "oddish": "It may be mistaken for a clump of weeds. If you try to yank it out of the ground, it shrieks horribly.",
            "omanyte": "An ancient Pokémon that was recovered from a fossil. It swims by cleverly twisting its 10 tentacles about.",
            "omastar": "Sharp beaks ring its mouth. Its shell was too big for it to move freely, so it became extinct.",
            "onix": "Burrows at high speed in search of food. The tunnels it leaves are used as homes by Digletts.",
            "paras": "Burrows under the ground to gnaw on tree roots. The mushrooms on its back absorb most of the nutrition.",
            "parasect": "The bug host is drained of energy by the mushrooms on its back. They appear to do all the thinking.",
            "persian": "The gem on its forehead glows on its own! It walks with all the grace and elegance of a proud queen.",
            "pidgeot": "This Pokémon flies at Mach 2 speed, seeking prey. Its large talons are feared as wicked weapons.",
            "pidgeotto": "This Pokémon is full of vitality. It constantly flies around its large territory in search of prey.",
            "pidgey": "Very docile. If attacked, it will often kick up sand to protect itself rather than fight back.",
            "pikachu": "It keeps its tail raised to monitor its surroundings. If you yank its tail, it will try to bite you.",
            "pinsir": "Grips its prey in its pincers and squeezes hard! It can't move if it's cold, so it lives in warm places.",
            "poliwag": "The direction of the spiral on the belly differs by area. It is more adept at swimming than walking.",
            "poliwhirl": "Under attack, it uses its belly spiral to put the foe to sleep. It then makes its escape.",
            "poliwrath": "Swims powerfully using all the muscles in its body. It can even overtake champion swimmers.",
            "ponyta": "Capable of jumping incredibly high. Its hooves and sturdy legs absorb the impact of a hard landing.",
            "porygon": "The only Pokémon people anticipate can fly into space. None has managed the feat yet, however.",
            "primeape": "It stops being angry only when nobody else is around. To view this moment is very difficult.",
            "psyduck": "Always tormented by headaches. It uses psychic powers, but it is not known if it intends to do so.",
            "raichu": "When electricity builds up inside its body, it becomes feisty. It also glows in the dark.",
            "rapidash": "Just loves to run. If it sees something faster than itself, it will give chase at top speed.",
            "raticate": "Its hind feet are webbed. They act as flippers, so it can swim in rivers and hunt for prey.",
            "rattata": "Will chew on anything with its fangs. If you see one, it is certain that 40 more live in the area.",
            "rhydon": "Walks on its hind legs. Shows signs of intelligence. Its armor-like hide even repels molten lava.",
            "rhyhorn": "A Pokémon with a one-track mind. Once it charges, it won't stop running until it falls asleep.",
            "sandshrew": "Its body is dry. When it gets cold at night, its hide is said to become coated with a fine dew.",
            "sandslash": "It is skilled at slashing enemies with its claws. If broken, they start to grow back in a day.",
            "scyther": "Leaps out of tall grass and slices prey with its scythes. The movement looks like that of a ninja.",
            "seadra": "Touching the back fin causes numbness. It hooks its tail to coral to stay in place while sleeping.",
            "seaking": "It is the male's job to make a nest by carving out boulders in a stream using the horn on its head.",
            "seel": "Loves freezing cold conditions. Relishes swimming in a frigid climate of around 14F degrees.",
            "shellder": "The shell can withstand any attack. However, when it is open, the tender body is exposed.",
            "slowbro": "Lives lazily by the sea. If the Shellder on its tail comes off, it becomes a Slowpoke again.",
            "slowpoke": "Incredibly slow and sluggish. It is quite content to loll about without worrying about the time.",
            "snorlax": "Will eat anything, even if the food happens to be a little moldy. It never gets an upset stomach.",
            "spearow": "Inept at flying high. However, it can fly around very fast to protect its territory.",
            "squirtle": "Shoots water at prey while in the water. Withdraws into its shell when in danger.",
            "starmie": "The center section is named the core. People think it is communicating when it glows in 7 colors.",
            "staryu": "As long as the center section is unharmed, it can grow back fully even if it is chopped to bits.",
            "tangela": "Its identity is obscured by masses of thick, blue vines. The vines are said to stop growing.",
            "tauros": "A rowdy Pokémon with a lot of stamina. Once running, it won't stop until it hits something.",
            "tentacool": "It can sometimes be found all dry and shriveled up on a beach. Toss it back into the sea to revive it.",
            "tentacruel": "Its 80 tentacles can stretch and contract freely. They wrap around prey and weaken it with poison.",
            "vaporeon": "Its cell structure is similar to water molecules. It will melt away and become invisible in water.",
            "venomoth": "The powdery scales on its wings are hard to remove. They also contain poison that leaks out on contact.",
            "venonat": "Its large eyes act as radars. In a bright place, you can see that they are clusters of many tiny eyes.",
            "venusaur": "The flower on its back catches the sun's rays. The sunlight is then absorbed and used for energy.",
            "victreebel": "Lures prey with the sweet aroma of honey. Swallowed whole, the prey is melted in a day, bones and all.",
            "vileplume": "Flaps its broad flower petals to scatter its poisonous pollen. The flapping sound is very loud.",
            "voltorb": "It is said to camouflage itself as a PokéBall. It will self-destruct with very little stimulus.",
            "vulpix": "Both its fur and its tails are beautiful. As it grows, the tails split and form more tails.",
            "wartortle": "When tapped, this Pokémon will pull in its head, but its tail will still stick out a little bit.",
            "weedle": "Beware of the sharp stinger on its head. It hides in grass and bushes where it eats leaves.",
            "weepinbell": "When hungry, it swallows anything that moves. Its hapless prey is melted inside by strong acids.",
            "weezing": "It lives and grows by absorbing dust, germs and poison gases that are contained in toxic waste and garbage.",
            "wigglytuff": "Its body is full of elasticity. By inhaling deeply, it can continue to inflate itself without limit.",
            "zapdos": "This legendary bird Pokémon is said to appear when the sky turns dark and lightning showers down.",
            "zubat": "Emits ultrasonic cries while it flies. They act as a sonar used to check for objects in the way."
        },
        "moves": {
            "absorb": "Absorb",
            "acid": "Acid",
            "acid armor": "Acid Armor",
            "agility": "Agility",
            "amnesia": "Amnesia",
            "aurora beam": "Aurora Beam",
            "barrage": "Barrage",
            "barrier": "Barrier",
            "bide": "Bide",
            "bind": "Bind",
            "bite": "Bite",
            "blizzard": "Blizzard",
            "body slam": "Body Slam",
            "bone club": "Bone Club",
            "bonemerang": "Bonemerang",
            "bubble": "Bubble",
            "bubble beam": "Bubble Beam",
            "clamp": "Clamp",
            "comet punch": "Comet Punch",
            "confuse ray": "Confuse Ray",
            "confusion": "Confusion",
            "constrict": "Constrict",
            "conversion": "Conversion",
            "counter": "Counter",
            "crabhammer": "Crabhammer",
            "cut": "Cut",
            "defense curl": "Defense Curl",
            "dig": "Dig",
            "disable": "Disable",
            "dizzy punch": "Dizzy Punch",
            "double kick": "Double Kick",
            "double slap": "Double Slap",
            "double team": "Double Team",
            "double-edge": "Double-Edge",
            "dragon rage": "Dragon Rage",
            "dream eater": "Dream Eater",
            "drill peck": "Drill Peck",
            "earthquake": "Earthquake",
            "egg bomb": "Egg Bomb",
            "ember": "Ember",
            "explosion": "Explosion",
            "fire blast": "Fire Blast",
            "fire punch": "Fire Punch",
            "fire spin": "Fire Spin",
            "fissure": "Fissure",
            "flamethrower": "Flamethrower",
            "flash": "Flash",
            "fly": "Fly",
            "focus energy": "Focus Energy",
            "fury attack": "Fury Attack",
            "fury swipes": "Fury Swipes",
            "glare": "Glare",
            "growl": "Growl",
            "growth": "Growth",
            "guillotine": "Guillotine",
            "gust": "Gust",
            "harden": "Harden",
            "haze": "Haze",
            "headbutt": "Headbutt",
            "high jump kick": "High Jump Kick",
            "horn attack": "Horn Attack",
            "horn drill": "Horn Drill",
            "hydro pump": "Hydro Pump",
            "hyper beam": "Hyper Beam",
            "hyper fang": "Hyper Fang",
            "hypnosis": "Hypnosis",
            "ice beam": "Ice Beam",
            "ice punch": "Ice Punch",
            "jump kick": "Jump Kick",
            "karate chop": "Karate Chop",
            "kinesis": "Kinesis",
            "leech life": "Leech Life",
            "leech seed": "Leech Seed",
            "leer": "Leer",
            "lick": "Lick",
            "light screen": "Light Screen",
            "lovely kiss": "Lovely Kiss",
            "low kick": "Low Kick",
            "meditate": "Meditate",
            "mega drain": "Mega Drain",
            "mega kick": "Mega Kick",
            "mega punch": "Mega Punch",
            "metronome": "Metronome",
            "mimic": "Mimic",
            "minimize": "Minimize",
            "mirror move": "Mirror Move",
            "mist": "Mist",
            "night shade": "Night Shade",
            "pay day": "Pay Day",
            "peck": "Peck",
            "petal dance": "Petal Dance",
            "pin missile": "Pin Missile",
            "poison gas": "Poison Gas",
            "poison powder": "Poison Powder",
            "poison sting": "Poison Sting",
            "pound": "Pound",
            "psybeam": "Psybeam",
            "psychic": "Psychic",
            "psywave": "Psywave",
            "quick attack": "Quick Attack",
            "rage": "Rage",
            "razor leaf": "Razor Leaf",
            "razor wind": "Razor Wind",
            "recover": "Recover",
            "reflect": "Reflect",
            "rest": "Rest",
            "roar": "Roar",
            "rock slide": "Rock Slide",
            "rock throw": "Rock Throw",
            "rolling kick": "Rolling Kick",
            "sand attack": "Sand Attack",
            "scratch": "Scratch",
            "screech": "Screech",
            "seismic toss": "Seismic Toss",
            "self-destruct": "Self-Destruct",
            "sharpen": "Sharpen",
            "sing": "Sing",
            "skull bash": "Skull Bash",
            "sky attack": "Sky Attack",
            "slam": "Slam",
            "slash": "Slash",
            "sleep powder": "Sleep Powder",
            "sludge": "Sludge",
            "smog": "Smog",
            "smokescreen": "Smokescreen",
            "soft-boiled": "Soft-Boiled",
            "solar beam": "Solar Beam",
            "sonic boom": "Sonic Boom",
            "spike cannon": "Spike Cannon",
            "splash": "Splash",
            "spore": "Spore",
            "stomp": "Stomp",
            "strength": "Strength",
            "string shot": "String Shot",
            "struggle": "Struggle",
            "stun spore": "Stun Spore",
            "submission": "Submission",
            "substitute": "Substitute",
            "super fang": "Super Fang",
            "supersonic": "Supersonic",
            "surf": "Surf",
            "swift": "Swift",
            "swords dance": "Swords Dance",
            "tackle": "Tackle",
            "tail whip": "Tail Whip",
            "take down": "Take Down",
            "teleport": "Teleport",
            "thrash": "Thrash",
            "thunder": "Thunder",
            "thunder punch": "Thunder Punch",
            "thunder shock": "Thunder Shock",
            "thunder wave": "Thunder Wave",
            "thunderbolt": "Thunderbolt",
            "toxic": "Toxic",
            "transform": "Transform",
            "tri attack": "Tri Attack",
            "twineedle": "Twineedle",
            "vice grip": "Vice Grip",
            "vine whip": "Vine Whip",
            "water gun": "Water Gun",
            "waterfall": "Waterfall",
            "whirlwind": "Whirlwind",
            "wing attack": "Wing Attack",
            "withdraw": "Withdraw",
            "wrap": "Wrap"
        },
        "moveDesc": {
            "absorb": "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
            "acid": "The opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Defense stat.",
            "acid armor": "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat.",
            "agility": "The user relaxes and lightens its body to move faster. This sharply raises the Speed stat.",
            "amnesia": "The user temporarily empties its mind to forget its concerns. This sharply raises the user's Sp. Def stat.",
            "aurora beam": "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
            "barrage": "Round objects are hurled at the target to strike two to five times in a row.",
            "barrier": "The user throws up a sturdy wall that sharply raises its Defense stat.",
            "bide": "The user endures attacks for two turns, then strikes back to cause double the damage taken.",
            "bind": "Things such as long bodies or tentacles are used to bind and squeeze the target for four to five turns.",
            "bite": "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
            "blizzard": "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen.",
            "body slam": "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
            "bone club": "The user clubs the target with a bone. This may also make the target flinch.",
            "bonemerang": "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
            "bubble": "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
            "bubble beam": "A spray of bubbles is forcefully ejected at the target. This may also lower its Speed stat.",
            "clamp": "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
            "comet punch": "The target is hit with a flurry of punches that strike two to five times in a row.",
            "confuse ray": "The target is exposed to a sinister ray that triggers confusion.",
            "confusion": "The target is hit by a weak telekinetic force. This may also confuse the target.",
            "constrict": "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
            "conversion": "The user changes its type to become the same type as the move at the top of the list of moves it knows.",
            "counter": "A retaliation move that counters any physical attack, inflicting double the damage taken.",
            "crabhammer": "The target is hammered with a large pincer. Critical hits land more easily.",
            "cut": "The target is cut with a scythe or claw.",
            "defense curl": "The user curls up to conceal weak spots and raise its Defense stat.",
            "dig": "The user burrows, then attacks on the next turn.",
            "disable": "For four turns, this move prevents the target from using the move it last used.",
            "dizzy punch": "The target is hit with rhythmically launched punches. This may also leave the target confused.",
            "double kick": "The target is quickly kicked twice in succession using both feet.",
            "double slap": "The target is slapped repeatedly, back and forth, two to five times in a row.",
            "double team": "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
            "double-edge": "A reckless, life-risking tackle. This also damages the user quite a lot.",
            "dragon rage": "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage.",
            "dream eater": "The user eats the dreams of a sleeping target. It absorbs half the damage caused to heal its own HP.",
            "drill peck": "A corkscrewing attack with a sharp beak acting as a drill.",
            "earthquake": "The user sets off an earthquake that strikes every Pokémon around it.",
            "egg bomb": "A large egg is hurled at the target with maximum force to inflict damage.",
            "ember": "The target is attacked with small flames. This may also leave the target with a burn.",
            "explosion": "The user attacks everything around it by causing a tremendous explosion. The user faints upon using this move.",
            "fire blast": "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn.",
            "fire punch": "The target is punched with a fiery fist. This may also leave the target with a burn.",
            "fire spin": "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
            "fissure": "The user opens up a fissure in the ground and drops the target in. The target faints instantly if this attack hits.",
            "flamethrower": "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
            "flash": "The user flashes a bright light that cuts the target's accuracy.",
            "fly": "The user soars and then strikes its target on the next turn.",
            "focus energy": "The user takes a deep breath and focuses so that critical hits land... less easily?",
            "fury attack": "The target is jabbed repeatedly with a horn or beak two to five times in a row.",
            "fury swipes": "The target is raked with sharp claws or scythes quickly two to five times in a row.",
            "glare": "The user intimidates the target with the pattern on its belly to cause paralysis.",
            "growl": "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stat.",
            "growth": "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
            "guillotine": "A vicious, tearing attack with big pincers. The target faints instantly if this attack hits.",
            "gust": "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
            "harden": "The user stiffens all the muscles in its body to raise its Defense stat.",
            "haze": "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
            "headbutt": "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
            "high jump kick": "The target is attacked with a knee kick from a jump. If it misses, the user is hurt instead.",
            "horn attack": "The target is jabbed with a sharply pointed horn to inflict damage.",
            "horn drill": "The user stabs the target with a horn that rotates like a drill. The target faints instantly if this attack hits.",
            "hydro pump": "The target is blasted by a huge volume of water launched under great pressure.",
            "hyper beam": "The target is attacked with a powerful beam. The user can't move on the next turn.",
            "hyper fang": "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
            "hypnosis": "The user employs hypnotic suggestion to make the target fall into a deep sleep.",
            "ice beam": "The target is struck with an icy-cold beam of energy. This may also leave the target frozen.",
            "ice punch": "The opponent is punched with an icy fist. This may also leave the target frozen.",
            "jump kick": "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
            "karate chop": "The target is attacked with a sharp chop. Critical hits land more easily.",
            "kinesis": "The user distracts the target by bending a spoon. This lowers the target's accuracy.",
            "leech life": "The user drains the target's blood. The user's HP is restored by half the damage taken by the target.",
            "leech seed": "A seed is planted on the target. It steals some HP from the target every turn.",
            "leer": "The user gives opposing Pokémon an intimidating leer that lowers the Defense stat.",
            "lick": "The target is licked with a long tongue, causing damage. This may also leave the target with paralysis.",
            "light screen": "A wondrous wall of light is put up to reduce damage from special attacks for five turns.",
            "lovely kiss": "With a scary face, the user tries to force a kiss on the target. If it succeeds, the target falls asleep.",
            "low kick": "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
            "meditate": "The user meditates to awaken the power deep within its body and raise its Attack stat.",
            "mega drain": "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
            "mega kick": "The target is attacked by a kick launched with muscle-packed power.",
            "mega punch": "The target is slugged by a punch thrown with muscle-packed power.",
            "metronome": "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
            "mimic": "The user copies the target's last move. The move can be used during battle until the Pokémon is switched out.",
            "minimize": "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
            "mirror move": "The user counters the target by mimicking the target's last move.",
            "mist": "The user cloaks itself and its allies in a white mist that prevents any of their stats from being lowered for five turns.",
            "night shade": "The user makes the target see a frightening mirage. It inflicts damage equal to the user's level.",
            "pay day": "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
            "peck": "The target is jabbed with a sharply pointed beak or horn.",
            "petal dance": "The user attacks the target by scattering petals for two to three turns. The user then becomes confused.",
            "pin missile": "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
            "poison gas": "A cloud of poison gas is sprayed in the face of opposing Pokémon, poisoning those hit.",
            "poison powder": "The user scatters a cloud of poisonous dust that poisons the target.",
            "poison sting": "The user stabs the target with a poisonous stinger. This may also poison the target.",
            "pound": "The target is physically pounded with a long tail, a foreleg, or the like.",
            "psybeam": "The target is attacked with a peculiar ray. This may also leave the target confused.",
            "psychic": "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
            "psywave": "The target is attacked with an odd psychic wave. The attack varies in intensity.",
            "quick attack": "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
            "rage": "As long as this move is in use, the power of rage raises the Attack stat each time the user is hit in battle.",
            "razor leaf": "Sharp-edged leaves are launched to slash at the opposing Pokémon. Critical hits land more easily.",
            "razor wind": "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
            "recover": "Restoring its own cells, the user restores its own HP by half of its max HP.",
            "reflect": "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
            "rest": "The user goes to sleep for two turns. This fully restores the user's HP and heals any status conditions.",
            "roar": "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
            "rock slide": "Large boulders are hurled at the opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch.",
            "rock throw": "The user picks up and throws a small rock at the target to attack.",
            "rolling kick": "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
            "sand attack": "Sand is hurled in the target's face, reducing the target's accuracy.",
            "scratch": "Hard, pointed, sharp claws rake the target to inflict damage.",
            "screech": "An earsplitting screech harshly lowers the target's Defense stat.",
            "seismic toss": "The target is thrown using the power of gravity. It inflicts damage equal to the user's level.",
            "self-destruct": "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
            "sharpen": "The user makes its edges more jagged, which raises its Attack stat.",
            "sing": "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber.",
            "skull bash": "The user tucks in its head to raise its Defense stat on the first turn, then rams the target on the next turn.",
            "sky attack": "A second-turn attack move where critical hits land more easily. This may also make the target flinch.",
            "slam": "The target is slammed with a long tail, vines, or the like to inflict damage.",
            "slash": "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
            "sleep powder": "The user scatters a big cloud of sleep-inducing dust around the target.",
            "sludge": "Unsanitary sludge is hurled at the target. This may also poison the target.",
            "smog": "The target is attacked with a discharge of filthy gases. This may also poison the target.",
            "smokescreen": "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
            "soft-boiled": "The user restores its own HP by up to half of its max HP.",
            "solar beam": "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
            "sonic boom": "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
            "spike cannon": "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
            "splash": "The user just flops and splashes around to no effect at all...",
            "spore": "The user scatters bursts of spores that induce sleep.",
            "stomp": "The target is stomped with a big foot. This may also make the target flinch.",
            "strength": "The target is slugged with a punch thrown at maximum power.",
            "string shot": "The opposing Pokémon are bound with silk blown from the user's mouth that harshly lowers the Speed stat.",
            "struggle": "This attack is used in desperation only if the user has no PP. It also damages the user a little.",
            "stun spore": "The user scatters a cloud of numbing powder that paralyzes the target.",
            "submission": "The user grabs the target and recklessly dives for the ground. This also damages the user a little.",
            "substitute": "The user makes a copy of itself using some of its HP. The copy serves as the user's decoy.",
            "super fang": "The user chomps hard on the target with its sharp front fangs. This cuts the target's HP in half.",
            "supersonic": "The user generates odd sound waves from its body that confuse the target.",
            "surf": "The user attacks everything around it by swamping its surroundings with a giant wave.",
            "swift": "Star-shaped rays are shot at the opposing Pokémon. This attack never misses.",
            "swords dance": "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
            "tackle": "A physical attack in which the user charges and slams into the target with its whole body.",
            "tail whip": "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stat.",
            "take down": "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
            "teleport": "Use it to flee from any wild Pokémon.",
            "thrash": "The user rampages and attacks for two to three turns. The user then becomes confused.",
            "thunder": "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
            "thunder punch": "The target is punched with an electrified fist. This may also leave the target with paralysis.",
            "thunder shock": "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
            "thunder wave": "The user launches a weak jolt of electricity that paralyzes the target.",
            "thunderbolt": "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
            "toxic": "A move that leaves the target badly poisoned. Its poison damage worsens every turn.",
            "transform": "The user transforms into a copy of the target right down to having the same move set.",
            "tri attack": "	The user strikes with a simultaneous three-beam attack. May also burn, freeze, or paralyze the target.",
            "twineedle": "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
            "vice grip": "The target is gripped and squeezed from both sides to inflict damage.",
            "vine whip": "The target is struck with slender, whiplike vines to inflict damage.",
            "water gun": "The target is blasted with a forceful shot of water.",
            "waterfall": "The user charges at the target and may make it flinch.",
            "whirlwind": "The target is blown away, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
            "wing attack": "The target is struck with large, imposing wings spread wide to inflict damage.",
            "withdraw": "The user withdraws its body into its hard shell, raising its Defense stat.",
            "wrap": "A long body, vines, or the like are used to wrap and squeeze the target for four to five turns."
        }
    },
    "zh": {
        "types": {
            "bug": "虫",
            "dragon": "龙",
            "electric": "电",
            "fighting": "格斗",
            "fire": "火",
            "flying": "飞行",
            "ghost": "幽灵",
            "grass": "草",
            "ground": "地面",
            "ice": "冰",
            "normal": "一般",
            "poison": "毒",
            "psychic": "超能力",
            "rock": "岩石",
            "water": "水"
        },
        "stats": {
            "atk": "攻击",
            "def": "防御",
            "sp": "特殊",
            "spe": "速度",
            "acc": "命中率",
            "eva": "闪避率"
        },
        "cat": {
            "physical": "物理",
            "special": "特殊",
            "status": "变化"
        },
        "status": {
            "tox": "剧毒",
            "psn": "中毒",
            "brn": "灼伤",
            "frz": "冰冻",
            "par": "麻痹",
            "slp": "睡眠"
        },
        "ui": {
            "moves": "招式：",
            "switch": "替换：",
            "setup": "摆局",
            "record": "记录",
            "settings": "设置",
            "sleepClause": "催眠条款",
            "speciesClause": "种族条款",
            "ohkoClause": "一击必杀条款",
            "freezeClause": "冰冻条款",
            "evasionClause": "闪避条款",
            "selfKoClause": "自杀条款",
            "power": "威力",
            "accuracy": "命中",
            "priority": "优先度",
            "pp": "PP"
        },
        "others": {
            "turn": "第 [number0] 回合",
            "crit": "击中了要害！",
            "use": "[pokemon0]使出了<strong>[moves0]</strong>！",
            "use-enemy": "对手的[pokemon0]使出了<strong>[moves0]</strong>！",
            "faint": "[pokemon0]倒下了！",
            "faint-enemy": "对手的[pokemon0]倒下了！",
            "go": "上吧！<strong>[pokemon0]</strong>！",
            "go-enemy": "对手派出了<strong>[pokemon0]</strong>!",
            "superEffective": "效果绝佳！",
            "notVeryEffective": "好像效果不好……",
            "loseHealth": "（[pokemon0]失去了[percentage0]%的生命值！）",
            "loseHealth-enemy": "（对手的[pokemon0]失去了[percentage0]%的生命值！）",
            "putInSubstitute": "[pokemon0]的替身出现了！",
            "putInSubstitute-enemy": "对手的[pokemon0]的替身出现了！",
            "substituteFade": "[pokemon0]的替身消失了！",
            "substituteFade-enemy": "对手的[pokemon0]的替身消失了！",
            "substituteTakeDamage": "替身代替[pokemon0]承受了攻击！",
            "substituteTakeDamage-enemy": "替身代替对手的[pokemon0]承受了攻击！",
            "comeBack": "[pokemon0]，回来！",
            "comeBack-enemy": "对手收回了[pokemon0]！",
            "nothingHappen": "但是，什么也没有发生！",
            "attackMiss": "[pokemon0]的招式没有命中！",
            "attackMiss-enemy": "对手的[pokemon0]的招式没有命中！",
            "noEffect": "对于[pokemon0]，好像没有效果……",
            "noEffect-enemy": "对于对手的[pokemon0]，好像没有效果……",
            "fallAsleep": "[pokemon0]睡着了！",
            "fallAsleep-enemy": "对手的[pokemon0]睡着了！",
            "fastAsleep": "[pokemon0]正在呼呼大睡。",
            "fastAsleep-enemy": "对手的[pokemon0]正在呼呼大睡。",
            "wakeUp": "[pokemon0]醒过来了！",
            "wakeUp-enemy": "对手的[pokemon0]醒过来了！",
            "hurtConfusion": "不知所以地攻击了自己！",
            "paralyzed": "[pokemon0]麻痹了，很难使出招式！",
            "paralyzed-enemy": "对手的[pokemon0]麻痹了，很难使出招式！",
            "alreadyParalyzed": "[pokemon0]已经麻痹了！",
            "alreadyParalyzed-enemy": "对手的[pokemon0]已经麻痹了！",
            "hitTimes": "击中了[number0]次！",
            "frozenSolid": "[pokemon0]冻住了！",
            "frozenSolid-enemy": "对手的[pokemon0]冻住了！",
            "dreamEaten": "[pokemon0]的梦被吃掉了！",
            "dreamEaten-enemy": "对手的[pokemon0]的梦被吃掉了！",
            "transform": "[pokemon0]变身成了[pokemon1]！",
            "transform-enemy": "对手的[pokemon0]变身成了[pokemon1]！",
            "unableToMove": "[pokemon0]因身体麻痹而无法行动！",
            "unableToMove-enemy": "对手的[pokemon0]因身体麻痹而无法行动！",
            "sleepHealthy": "[pokemon0]睡着了，并且变得精力充沛！",
            "sleepHealthy-enemy": "对手的[pokemon0]睡着了，并且变得精力充沛！",
            "rise": "[pokemon0]的[stats0]提高了！",
            "rise-enemy": "对手的[pokemon0]的[stats0]提高了！",
            "riseSharply": "[pokemon0]的[stats0]大幅提高了！",
            "riseSharply-enemy": "对手的[pokemon0]的[stats0]大幅提高了！",
            "fall": "[pokemon0]的[stats0]降低了！",
            "fall-enemy": "对手的[pokemon0]的[stats0]降低了！",
            "harshlyFall": "[pokemon0]的[stats0]大幅降低了！",
            "harshlyFall-enemy": "对手的[pokemon0]的[stats0]大幅降低了！",
            "poisoned": "[pokemon0]中毒了！",
            "badlyPoisoned": "[pokemon0]中剧毒了！",
            "poisoned-enemy": "对手的[pokemon0]中毒了！",
            "badlyPoisoned-enemy": "对手的[pokemon0]中剧毒了！",
            "confused": "[pokemon0]正在混乱中！",
            "confused-enemy": "对手的[pokemon0]正在混乱中！",
            "becomeConfused": "[pokemon0]混乱了！",
            "becomeConfused-enemy": "对手的[pokemon0]混乱了！",
            "winBattle": "<strong>[player0]</strong>赢下了对战！",
            "forfeit": "[player0]认负。",
            "gainArmor": "[pokemon0]获得了护甲！",
            "gainArmor-enemy": "对手的[pokemon0]获得了护甲！",
            "hpRestored": "[pokemon0]的体力回复了。",
            "hpRestored-enemy": "对手的[pokemon0]的体力回复了。"
        },
        "pokemon": {
            "abra": "凯西",
            "aerodactyl": "化石翼龙",
            "alakazam": "胡地",
            "arbok": "阿柏怪",
            "arcanine": "风速狗",
            "articuno": "急冻鸟",
            "beedrill": "大针蜂",
            "bellsprout": "喇叭芽",
            "blastoise": "水箭龟",
            "bulbasaur": "妙蛙种子",
            "butterfree": "巴大蝶",
            "caterpie": "绿毛虫",
            "chansey": "吉利蛋",
            "charizard": "喷火龙",
            "charmander": "小火龙",
            "charmeleon": "火恐龙",
            "clefable": "皮可西",
            "clefairy": "皮皮",
            "cloyster": "刺甲贝",
            "cubone": "卡拉卡拉",
            "dewgong": "白海狮",
            "diglett": "地鼠",
            "ditto": "百变怪",
            "dodrio": "嘟嘟利",
            "doduo": "嘟嘟",
            "dragonair": "哈克龙",
            "dragonite": "快龙",
            "dratini": "迷你龙",
            "drowzee": "催眠貘",
            "dugtrio": "三地鼠",
            "eevee": "伊布",
            "ekans": "阿柏蛇",
            "electabuzz": "电击兽",
            "electrode": "顽皮雷弹",
            "exeggcute": "蛋蛋",
            "exeggutor": "椰蛋树",
            "farfetch'd": "大葱鸭",
            "fearow": "大嘴雀",
            "flareon": "火伊布",
            "gastly": "鬼斯",
            "gengar": "耿鬼",
            "geodude": "小拳石",
            "gloom": "臭臭花",
            "golbat": "大嘴蝠",
            "goldeen": "角金鱼",
            "golduck": "哥达鸭",
            "golem": "隆隆岩",
            "graveler": "隆隆石",
            "grimer": "臭泥",
            "growlithe": "卡蒂狗",
            "gyarados": "暴鲤龙",
            "haunter": "鬼斯通",
            "hitmonchan": "快拳郎",
            "hitmonlee": "飞腿郎",
            "horsea": "墨海马",
            "hypno": "引梦貘人",
            "ivysaur": "妙蛙草",
            "jigglypuff": "胖丁",
            "jolteon": "雷伊布",
            "jynx": "迷唇姐",
            "kabuto": "化石盔",
            "kabutops": "镰刀盔",
            "kadabra": "勇基拉",
            "kakuna": "铁壳蛹",
            "kangaskhan": "袋兽",
            "kingler": "巨钳蟹",
            "koffing": "瓦斯弹",
            "krabby": "大钳蟹",
            "lapras": "拉普拉斯",
            "lickitung": "大舌头",
            "machamp": "怪力",
            "machoke": "豪力",
            "machop": "腕力",
            "magikarp": "鲤鱼王",
            "magmar": "鸭嘴火兽",
            "magnemite": "小磁怪",
            "magneton": "三合一磁怪",
            "mankey": "猴怪",
            "marowak": "嘎啦嘎啦",
            "meowth": "喵喵",
            "metapod": "铁甲蛹",
            "mew": "梦幻",
            "mewtwo": "超梦",
            "moltres": "火焰鸟",
            "mr. mime": "魔墙人偶",
            "muk": "臭臭泥",
            "nidoking": "尼多王",
            "nidoqueen": "尼多后",
            "nidoran-f": "尼多兰",
            "nidoran-m": "尼多朗",
            "nidorina": "尼多娜",
            "nidorino": "尼多力诺",
            "ninetales": "九尾",
            "oddish": "走路草",
            "omanyte": "菊石兽",
            "omastar": "多刺菊石兽",
            "onix": "大岩蛇",
            "paras": "派拉斯",
            "parasect": "派拉斯特",
            "persian": "猫老大",
            "pidgeot": "大比鸟",
            "pidgeotto": "比比鸟",
            "pidgey": "波波",
            "pikachu": "皮卡丘",
            "pinsir": "凯罗斯",
            "poliwag": "蚊香蝌蚪",
            "poliwhirl": "蚊香君",
            "poliwrath": "蚊香泳士",
            "ponyta": "小火马",
            "porygon": "多边兽",
            "primeape": "火暴猴",
            "psyduck": "可达鸭",
            "raichu": "雷丘",
            "rapidash": "烈焰马",
            "raticate": "拉达",
            "rattata": "小拉达",
            "rhydon": "钻角犀兽",
            "rhyhorn": "独角犀牛",
            "sandshrew": "穿山鼠",
            "sandslash": "穿山王",
            "scyther": "飞天螳螂",
            "seadra": "海刺龙",
            "seaking": "金鱼王",
            "seel": "小海狮",
            "shellder": "大舌贝",
            "slowbro": "呆壳兽",
            "slowpoke": "呆呆兽",
            "snorlax": "卡比兽",
            "spearow": "烈雀",
            "squirtle": "杰尼龟",
            "starmie": "宝石海星",
            "staryu": "海星星",
            "tangela": "蔓藤怪",
            "tauros": "肯泰罗",
            "tentacool": "玛瑙水母",
            "tentacruel": "毒刺水母",
            "vaporeon": "水伊布",
            "venomoth": "摩鲁蛾",
            "venonat": "毛球",
            "venusaur": "妙蛙花",
            "victreebel": "大食花",
            "vileplume": "霸王花",
            "voltorb": "霹雳电球",
            "vulpix": "六尾",
            "wartortle": "卡咪龟",
            "weedle": "独角虫",
            "weepinbell": "口呆花",
            "weezing": "双弹瓦斯",
            "wigglytuff": "胖可丁",
            "zapdos": "闪电鸟",
            "zubat": "超音蝠"
        },
        "moves": {
            "absorb": "吸取",
            "acid": "溶解液",
            "acid armor": "溶化",
            "agility": "高速移动",
            "amnesia": "瞬间失忆",
            "aurora beam": "极光束",
            "barrage": "投球",
            "barrier": "屏障",
            "bide": "忍耐",
            "bind": "绑紧",
            "bite": "咬住",
            "blizzard": "暴风雪",
            "body slam": "泰山压顶",
            "bone club": "骨棒",
            "bonemerang": "骨头回力镖",
            "bubble": "泡沫",
            "bubble beam": "泡沫光线",
            "clamp": "贝壳夹击",
            "comet punch": "连续拳",
            "confuse ray": "奇异之光",
            "confusion": "念力",
            "constrict": "缠绕",
            "conversion": "纹理",
            "counter": "双倍奉还",
            "crabhammer": "蟹钳锤",
            "cut": "居合斩",
            "defense curl": "变圆",
            "dig": "挖洞",
            "disable": "定身法",
            "dizzy punch": "迷昏拳",
            "double kick": "二连踢",
            "double slap": "连环巴掌",
            "double team": "影子分身",
            "double-edge": "舍身冲撞",
            "dragon rage": "龙之怒",
            "dream eater": "食梦",
            "drill peck": "啄钻",
            "earthquake": "地震",
            "egg bomb": "炸蛋",
            "ember": "火花",
            "explosion": "大爆炸",
            "fire blast": "大字爆炎",
            "fire punch": "火焰拳",
            "fire spin": "火焰旋涡",
            "fissure": "地裂",
            "flamethrower": "喷射火焰",
            "flash": "闪光",
            "fly": "飞翔",
            "focus energy": "聚气",
            "fury attack": "乱击",
            "fury swipes": "乱抓",
            "glare": "大蛇瞪眼",
            "growl": "叫声",
            "growth": "生长",
            "guillotine": "断头钳",
            "gust": "起风",
            "harden": "变硬",
            "haze": "黑雾",
            "headbutt": "头锤",
            "high jump kick": "飞膝踢",
            "horn attack": "角撞",
            "horn drill": "角钻",
            "hydro pump": "水炮",
            "hyper beam": "破坏光线",
            "hyper fang": "必杀门牙",
            "hypnosis": "催眠术",
            "ice beam": "冰冻光束",
            "ice punch": "冰冻拳",
            "jump kick": "飞踢",
            "karate chop": "空手劈",
            "kinesis": "折弯汤匙",
            "leech life": "吸血",
            "leech seed": "寄生种子",
            "leer": "瞪眼",
            "lick": "舌舔",
            "light screen": "光墙",
            "lovely kiss": "恶魔之吻",
            "low kick": "踢倒",
            "meditate": "瑜伽姿势",
            "mega drain": "超级吸取",
            "mega kick": "百万吨重踢",
            "mega punch": "百万吨重拳",
            "metronome": "挥指",
            "mimic": "模仿",
            "minimize": "变小",
            "mirror move": "鹦鹉学舌",
            "mist": "白雾",
            "night shade": "黑夜魔影",
            "pay day": "聚宝功",
            "peck": "啄",
            "petal dance": "花瓣舞",
            "pin missile": "飞弹针",
            "poison gas": "毒瓦斯",
            "poison powder": "毒粉",
            "poison sting": "毒针",
            "pound": "拍击",
            "psybeam": "幻象光线",
            "psychic": "精神强念",
            "psywave": "精神波",
            "quick attack": "电光一闪",
            "rage": "愤怒",
            "razor leaf": "飞叶快刀",
            "razor wind": "旋风刀",
            "recover": "自我再生",
            "reflect": "反射壁",
            "rest": "睡觉",
            "roar": "吼叫",
            "rock slide": "岩崩",
            "rock throw": "落石",
            "rolling kick": "回旋踢",
            "sand attack": "泼沙",
            "scratch": "抓",
            "screech": "刺耳声",
            "seismic toss": "地球上投",
            "self-destruct": "自爆",
            "sharpen": "棱角化",
            "sing": "唱歌",
            "skull bash": "火箭头锤",
            "sky attack": "神鸟猛击",
            "slam": "摔打",
            "slash": "劈开",
            "sleep powder": "催眠粉",
            "sludge": "污泥攻击",
            "smog": "浊雾",
            "smokescreen": "烟幕",
            "soft-boiled": "生蛋",
            "solar beam": "日光束",
            "sonic boom": "音爆",
            "spike cannon": "尖刺加农炮",
            "splash": "跃起",
            "spore": "蘑菇孢子",
            "stomp": "踩踏",
            "strength": "怪力",
            "string shot": "吐丝",
            "struggle": "挣扎",
            "stun spore": "麻痹粉",
            "submission": "地狱翻滚",
            "substitute": "替身",
            "super fang": "愤怒门牙",
            "supersonic": "超音波",
            "surf": "冲浪",
            "swift": "高速星星",
            "swords dance": "剑舞",
            "tackle": "撞击",
            "tail whip": "摇尾巴",
            "take down": "猛撞",
            "teleport": "瞬间移动",
            "thrash": "大闹一番",
            "thunder": "打雷",
            "thunder punch": "雷电拳",
            "thunder shock": "电击",
            "thunder wave": "电磁波",
            "thunderbolt": "十万伏特",
            "toxic": "剧毒",
            "transform": "变身",
            "tri attack": "三重攻击",
            "twineedle": "双针",
            "vice grip": "夹住",
            "vine whip": "藤鞭",
            "water gun": "水枪",
            "waterfall": "攀瀑",
            "whirlwind": "吹飞",
            "wing attack": "翅膀攻击",
            "withdraw": "缩入壳中",
            "wrap": "紧束"
        },
        "moveDesc": {
            "absorb": "吸取对手的养分进行攻击。可以回复给予对手伤害的一半HP。",
            "acid": "将强酸泼向对手进行攻击。有时会降低对手的防御。",
            "acid armor": "通过细胞的变化进行液化，从而大幅提高自己的防御。",
            "agility": "让身体放松变得轻盈，以便高速移动。大幅提高自己的速度。",
            "amnesia": "将头脑清空，瞬间忘记某事，从而大幅提高自己的特殊。",
            "aurora beam": "向对手发射虹色光束进行攻击。有时会降低对手的攻击。",
            "barrage": "向对手投掷圆形物体进行攻击。连续攻击2~5次。",
            "barrier": "制造坚固的壁障，从而大幅提高自己的防御。",
            "bide": "在2回合内忍受攻击，受到的伤害会2倍返还给对手。",
            "bind": "使用长长的身体或藤蔓等，在4~5回合内绑紧对手进行攻击。",
            "bite": "用尖锐的牙咬住对手进行攻击。有时会使对手畏缩。",
            "blizzard": "将猛烈的暴风雪刮向对手进行攻击。有时会让对手陷入冰冻状态。",
            "body slam": "用整个身体压住对手进行攻击。有时会让对手陷入麻痹状态。",
            "bone club": "用手中的骨头殴打对手进行攻击。有时会使对手畏缩。",
            "bonemerang": "用手中的骨头投掷对手，来回连续2次给予伤害。",
            "bubble": "向对手用力吹起无数泡泡进行攻击。有时会降低对手的速度。",
            "bubble beam": "向对手猛烈地喷射泡沫进行攻击。有时会降低对手的速度。",
            "clamp": "用非常坚固且厚实的贝壳，在4~5回合内夹住对手进行攻击。",
            "comet punch": "用拳头怒涛般的殴打对手进行攻击。连续攻击2~5次。",
            "confuse ray": "显示奇怪的光，扰乱对手。使对手混乱。",
            "confusion": "向对手发送微弱的念力进行攻击。有时会使对手混乱。",
            "constrict": "用触手或青藤等缠绕进行攻击。有时会降低对手的速度。",
            "conversion": "将自己的属性转换成和对方宝可梦相同的属性。",
            "counter": "从对手那里受到物理攻击的伤害将以2倍返还给同一个对手。",
            "crabhammer": "用大钳子敲打对手进行攻击。容易击中要害。",
            "cut": "用镰刀或爪子等切斩对手进行攻击。",
            "defense curl": "将身体蜷曲变圆，从而提高自己的防御。",
            "dig": "第1回合钻入，第2回合攻击对手。",
            "disable": "阻碍对手行动，之前使出的招式将在4回合内无法使用。",
            "dizzy punch": "有节奏地出拳攻击对手。有时会使对手混乱。",
            "double kick": "用2只脚踢飞对手进行攻击。连续2次给予伤害。",
            "double slap": "用连环巴掌拍打对手进行攻击。连续攻击2~5次。",
            "double team": "通过快速移动来制造分身，扰乱对手，从而提高闪避率。",
            "double-edge": "拼命地猛撞向对手进行攻击。自己也会受到不小的伤害。",
            "dragon rage": "将愤怒的冲击波撞向对手进行攻击。必定会给予40的伤害。",
            "dream eater": "吃掉正在睡觉的对手的梦进行攻击。回复对手所受到伤害的一半HP。",
            "drill peck": "一边旋转，一边将尖喙刺入对手进行攻击。",
            "earthquake": "利用地震的冲击，攻击自己周围所有的宝可梦。",
            "egg bomb": "向对手用力投掷大大的蛋进行攻击。",
            "ember": "向对手发射小型火焰进行攻击。有时会让对手陷入灼伤状态。",
            "explosion": "引发大爆炸，攻击自己周围所有的宝可梦。使用后自己会陷入濒死。",
            "fire blast": "用大字形状的火焰烧尽对手。有时会让对手陷入灼伤状态。",
            "fire punch": "用充满火焰的拳头攻击对手。有时会让对手陷入灼伤状态。",
            "fire spin": "将对手困在激烈的火焰旋涡中，在4~5回合内进行攻击。",
            "fissure": "让对手掉落于地裂的裂缝中进行攻击。只要命中就会一击濒死。",
            "flamethrower": "向对手发射烈焰进行攻击。有时会让对手陷入灼伤状态。",
            "flash": "使出耀眼光芒，从而降低对手的命中率。",
            "fly": "第1回合飞上天空，第2回合攻击对手。",
            "focus energy": "深深地吸口气，集中精神。自己的攻击会变得容易击中要害。",
            "fury attack": "用角或喙刺向对手进行攻击。连续攻击2~5次。",
            "fury swipes": "用爪子或镰刀等抓对手进行攻击。连续攻击2~5次。",
            "glare": "用腹部的花纹使对手害怕，从而让其陷入麻痹状态。",
            "growl": "让对手听可爱的叫声，引开注意力使其疏忽，从而降低对手的攻击。",
            "growth": "让身体一下子长大，从而提高攻击和特攻。",
            "guillotine": "用大钳子或剪刀等夹断对手进行攻击。只要命中就会一击濒死。",
            "gust": "用翅膀将刮起的狂风袭向对手进行攻击。",
            "harden": "全身使劲，让身体变硬，从而提高自己的防御。",
            "haze": "升起黑雾，将正在场上战斗的全体宝可梦的能力变回原点。",
            "headbutt": "将头伸出，笔直地扑向对手进行攻击。有时会使对手畏缩。",
            "high jump kick": "跳起后用膝盖撞对手进行攻击。如果撞偏则自己会受到伤害。",
            "horn attack": "用尖锐的角攻击对手。",
            "horn drill": "用旋转的角刺入对手进行攻击。只要命中就会一击濒死。",
            "hydro pump": "向对手猛烈地喷射大量水流进行攻击。",
            "hyper beam": "向对手发射强烈的光线进行攻击。下一回合自己将无法动弹。",
            "hyper fang": "用锋利的门牙牢牢地咬住对手进行攻击。有时会使对手畏缩。",
            "hypnosis": "施以诱导睡意的暗示，让对手陷入睡眠状态。",
            "ice beam": "向对手发射冰冻光束进行攻击。有时会让对手陷入冰冻状态。",
            "ice punch": "用充满寒气的拳头攻击对手。有时会让对手陷入冰冻状态。",
            "jump kick": "使出高高的腾空踢攻击对手。如果踢偏则自己会受到伤害。",
            "karate chop": "用锋利的手刀劈向对手进行攻击。容易击中要害。",
            "kinesis": "折弯汤匙引开注意，从而降低对手的命中率。",
            "leech life": "吸取血液攻击对手。可以回复给予对手伤害的一半HP。",
            "leech seed": "植入寄生种子后，将在每回合一点一点吸取对手的HP，从而用来回复自己的HP。",
            "leer": "用犀利的眼神使其害怕，从而降低对手的防御。",
            "lick": "用长长的舌头，舔遍对手进行攻击。有时会让对手陷入麻痹状态。",
            "light screen": "在5回合内使用神奇的墙，减弱从对手那受到的特殊攻击的伤害。",
            "lovely kiss": "用恐怖的脸强吻对手。让对手陷入睡眠状态。",
            "low kick": "用力踢对手的脚，使其摔倒进行攻击。对手越重，威力越大。",
            "meditate": "唤醒身体深处沉睡的力量，从而提高自己的攻击。",
            "mega drain": "吸取对手的养分进行攻击。可以回复给予对手伤害的一半HP。",
            "mega kick": "使出力大无穷的重踢踢飞对手进行攻击。",
            "mega punch": "用充满力量的拳头攻击对手。",
            "metronome": "挥动手指刺激自己的大脑，从所有的招式中任意使出1个。",
            "mimic": "可以将对手最后使用的招式，在战斗内变成自己的招式。",
            "minimize": "蜷缩身体显得很小，从而大幅提高自己的闪避率。",
            "mirror move": "模仿对手使用的招式，自己也使用相同招式。",
            "mist": "用白雾覆盖身体。在5回合内不会让对手降低自己的能力。",
            "night shade": "显示恐怖幻影，只给予对手和自己等级相同的伤害。",
            "pay day": "向对手的身体投掷小金币进行攻击。战斗后可以拿到钱。",
            "peck": "用尖锐的喙或角刺向对手进行攻击。",
            "petal dance": "在2~3回合内，散落花瓣攻击对手。之后自己会陷入混乱。",
            "pin missile": "向对手发射锐针进行攻击。连续攻击2~5次。",
            "poison gas": "将毒瓦斯吹到对手的脸上，从而让对手陷入中毒状态。",
            "poison powder": "撒出毒粉，从而让对手陷入中毒状态。",
            "poison sting": "将有毒的针刺入对手进行攻击。有时会让对手陷入中毒状态。",
            "pound": "使用长长的尾巴或手等拍打对手进行攻击。",
            "psybeam": "向对手发射神奇的光线进行攻击。有时会使对手混乱。",
            "psychic": "向对手发送强大的念力进行攻击。有时会降低对手的特防。",
            "psywave": "向对手发射神奇的念波进行攻击。每次使用，伤害都会改变。",
            "quick attack": "以迅雷不及掩耳之势扑向对手。必定能够先制攻击。",
            "rage": "如果在使出招式后受到攻击的话，会因愤怒的力量而提高攻击。",
            "razor leaf": "飞出叶片，切斩对手进行攻击。容易击中要害。",
            "razor wind": "制造风之刃，于第2回合攻击对手。容易击中要害。",
            "recover": "让细胞再生，从而回复自己最大HP的一半。",
            "reflect": "在5回合内使用神奇的墙，减弱从对手那受到的物理攻击的伤害。",
            "rest": "连续睡上2回合。回复自己的全部HP以及治愈所有异常状态。",
            "roar": "放走对手，强制拉后备宝可梦上场。如果对手为野生宝可梦，战斗将直接结束。",
            "rock slide": "将大岩石猛烈地撞向对手进行攻击。有时会使对手畏缩。",
            "rock throw": "拿起小岩石，投掷对手进行攻击。",
            "rolling kick": "一边使身体快速旋转，一边踢飞对手进行攻击。有时会使对手畏缩。",
            "sand attack": "向对手脸上泼沙子，从而降低命中率。",
            "scratch": "用坚硬且无比锋利的爪子抓对手进行攻击。",
            "screech": "发出不由自主想要捂起耳朵的刺耳声，从而大幅降低对手的防御。",
            "seismic toss": "利用引力将对手甩飞出去。给予对手和自己等级相同的伤害。",
            "self-destruct": "引发爆炸，攻击自己周围所有的宝可梦。使用后陷入濒死。",
            "sharpen": "增加身体的角，变得棱棱角角，从而提高自己的攻击。",
            "sing": "让对手听舒适、美妙的歌声，从而陷入睡眠状态。",
            "skull bash": "第1回合把头缩进去，从而提高防御。第2回合攻击对手。",
            "sky attack": "第2回合攻击对手。偶尔使对手畏缩。也容易击中要害。",
            "slam": "使用长长的尾巴或藤蔓等摔打对手进行攻击。",
            "slash": "用爪子或镰刀等劈开对手进行攻击。容易击中要害。",
            "sleep powder": "撒出催眠粉，从而让对手陷入睡眠状态。",
            "sludge": "用污泥投掷对手进行攻击。有时会让对手陷入中毒状态。",
            "smog": "将肮脏的浓雾吹向对手进行攻击。有时会让对手陷入中毒状态。",
            "smokescreen": "向对手喷出烟或墨汁等，从而降低对手的命中率。",
            "soft-boiled": "回复自己最大HP的一半。",
            "solar beam": "第1回合收集满满的日光，第2回合发射光束进行攻击。",
            "sonic boom": "将冲击波撞向对手进行攻击。必定会给予20的伤害。",
            "spike cannon": "向对手发射锐针进行攻击。连续攻击2~5次。",
            "splash": "也不攻击只是一蹦一蹦地跳，什么都不会发生……",
            "spore": "沙沙沙地撒满具有催眠效果的孢子，从而让对手陷入睡眠状态。",
            "stomp": "用大脚踩踏对手进行攻击。有时会使对手畏缩。",
            "strength": "使出浑身力气殴打对手进行攻击。",
            "string shot": "用口中吐出的丝缠绕对手，从而大幅降低对手的速度。",
            "struggle": "当自己的PP耗尽时，努力挣扎攻击对手。自己也会受到少许伤害。",
            "stun spore": "撒出麻痹粉，从而让对手陷入麻痹状态。",
            "submission": "将对手连同自己一起摔向地面进行攻击。自己也会受到少许伤害。",
            "substitute": "削减少许自己的HP，制造分身。分身将成为自己的替身。",
            "super fang": "用锋利的门牙猛烈地咬住对手进行攻击。对手的HP减半。",
            "supersonic": "从身体发出特殊的音波，从而使对手混乱。",
            "surf": "利用大浪攻击自己周围所有的宝可梦。",
            "swift": "发射星形的光攻击对手。攻击必定会命中。",
            "swords dance": "激烈地跳起战舞提高气势。大幅提高自己的攻击。",
            "tackle": "用整个身体撞向对手进行攻击。",
            "tail whip": "可爱地左右摇晃尾巴，诱使对手疏忽大意。会降低对手的防御。",
            "take down": "以惊人的气势撞向对手进行攻击。自己也会受到少许伤害。",
            "teleport": "停止和野生宝可梦战斗并逃走。",
            "thrash": "在2~3回合内，乱打一气地攻击对手。大闹一番后自己会陷入混乱。",
            "thunder": "向对手劈下暴雷进行攻击。有时会让对手陷入麻痹状态。",
            "thunder punch": "用充满电流的拳头攻击对手。有时会让对手陷入麻痹状态。",
            "thunder shock": "发出电流刺激对手进行攻击。有时会让对手陷入麻痹状态。",
            "thunder wave": "向对手发出微弱的电击，从而让对手陷入麻痹状态。",
            "thunderbolt": "向对手发出强力电击进行攻击。有时会让对手陷入麻痹状态。",
            "toxic": "让对手陷入剧毒状态。随着回合的推进，中毒伤害会增加。",
            "transform": "变身成对手宝可梦的样子，能够使用和对手完全相同的招式。",
            "tri attack": "用3种光线进行攻击。",
            "twineedle": "将2根针刺入对手，连续2次给予伤害。有时会让对手陷入中毒状态。",
            "vice grip": "将对手从两侧夹住，给予伤害。",
            "vine whip": "用如同鞭子般弯曲而细长的藤蔓摔打对手进行攻击。",
            "water gun": "向对手猛烈地喷射水流进行攻击。",
            "waterfall": "以惊人的气势扑向对手。有时会使对手畏缩。",
            "whirlwind": "吹飞对手，强制拉后备宝可梦上场。如果对手为野生宝可梦，战斗将直接结束。",
            "wing attack": "大大地展开美丽的翅膀，将其撞向对手进行攻击。",
            "withdraw": "缩入壳里保护身体，从而提高自己的防御。",
            "wrap": "使用长长的身体或藤蔓等，在4~5回合内紧束对手进行攻击。"
        },
        "pkmnDesc": {
            "abra": "它每天要睡18个小时。遇到危险时，即使在睡梦中也可以用瞬间移动来逃脱。",
            "aerodactyl": "通过研究从琥珀中提取出来的基因复活而成，是远古时期的凶恶宝可梦。",
            "alakazam": "什么事情都能记住。只要是曾经体验过的事情就绝对不会忘记，头脑非常聪明。",
            "arbok": "根据研究证实，它腹部那可怕的纹路大约有6个种类已经得到确认。",
            "arcanine": "中国古老传说中的宝可梦。曾有不计其数的人为它轻巧跑动的身姿而倾倒。",
            "articuno": "传说的鸟宝可梦。它能将冬日空中的空气中含有的水分冻结，降下雪花。",
            "beedrill": "它会用双手和尾部的3根毒针反复刺伤敌人。",
            "bellsprout": "喜欢温度高，有一定湿度的地方。它会用身上的藤蔓抓小虫来吃。",
            "blastoise": "一旦锁定了目标，它会以超越了消防水枪的力道来喷水。",
            "bulbasaur": "背上的种子里储存着营养，所以即使好几天不吃东西也可以活得好好的！",
            "butterfree": "它翅膀上的剧毒鳞粉能够防水，因此即使是雨天也可以飞来飞去。",
            "caterpie": "如果你碰到了它头上的触角，它就会分泌出难闻的气味来保护自己。",
            "chansey": "性格温柔的宝可梦，当它看到受伤的宝可梦时，会把营养丰富的蛋分给对方。",
            "charizard": "从口中喷出灼热的火焰时，尾巴尖端的红色火焰会燃烧得更加猛烈。",
            "charmander": "要是把它带到安静的地方，就能听到它的尾巴燃烧时发出的微小的声音。",
            "charmeleon": "在与强敌战斗的过程中，如果情绪变得兴奋起来，有时会喷出青白色的烈火。",
            "clefable": "妖精的一种。似乎非常珍惜自己的世界，很少在人类面前现身。",
            "clefairy": "因外形和动作可爱而深受大家的喜爱。但或许是由于数量稀少，它们很难被发现。",
            "cloyster": "不但有比钻石还要坚硬的外壳保护着，还能发射壳上的刺，不太好对付。",
            "cubone": "它头上戴着死去母亲的头骨。它的哭声会在头骨里回响出悲伤的旋律。",
            "dewgong": "全身像雪一样白。十分耐寒，即使是在有浮冰的大海里也能很精神地游来游去。",
            "diglett": "喜欢阴暗的地方。大部分时间都待在地下，只有在洞窟里会经常探头出来。",
            "ditto": "看到敌人的一瞬间身体便如同要融化一般开始转变，几乎能变身成和对方完全相同的样子。",
            "dodrio": "由嘟嘟的某个头分裂出的变种。以60千米的时速在草原上奔跑。",
            "doduo": "羽毛较短所以不擅长飞行，但是拥有发达的双脚，能够以很快的速度奔跑。",
            "dragonair": "根据目击者的描述，哈克龙的身上散发着一种神秘的气场。",
            "dragonite": "据说它生活在无垠大海的某个地方，靠飞行来移动。但这也只是一个传言罢了。",
            "dratini": "原本被认为只存在于幻想之中，直到最近有人将它钓起，它的存在才得到了证实。",
            "drowzee": "如果你每晚与它一起睡觉，它偶尔会让你梦见它以前吃过的梦。",
            "dugtrio": "三合一的力量能让它们挖地深至100公里，甚至有报告说它们会引发地震。",
            "eevee": "由于基因不稳定，进化的可能多种多样。只是生存数量很少。",
            "ekans": "身体会随着年龄增长不断变长。每到夜里，它会一圈圈地将身体缠绕在树枝上休息。",
            "electabuzz": "要是发生了大片的停电，那一定是电击兽偷偷吃掉了发电站的电能。",
            "electrode": "只要受到一点撞击，就会由于体内的电能溢出导致爆炸。",
            "exeggcute": "每一个蛋都相互吸引着旋转。6个蛋凑不齐时它就无法保持平衡。",
            "exeggutor": "由于三个头各自都在思考自己喜欢的事情，所以它的叫声非常吵闹。",
            "farfetch'd": "居住在茎状植物生长的地方。由于这种植物极为稀少而罕见，大葱鸭的数量似乎也在减少。",
            "fearow": "很久以前就存在的宝可梦。哪怕只察觉到一丝危险，都会立即飞向高空。",
            "flareon": "体内的火袋能让它将吸入的气体转化为1700度的火焰，接着从口中喷出。",
            "gastly": "它似乎会在没人居住的旧屋子里出现。形状不清，仿佛就像是气体一样。",
            "gengar": "如果你突然感到寒气逼近，就说明耿鬼在你身边，或许它已经在你身上下了诅咒。",
            "geodude": "大多栖息于山路。由于不留神踩到它会使它大发雷霆，得多加小心。",
            "gloom": "奇臭无比！即使如此，一千个人里总会出现一个人喜欢闻这种味道。",
            "golbat": "难以察觉它会从哪里悄悄接近。它会用尖锐的牙咬住对手，同时使劲地吸血。",
            "goldeen": "到了产卵期你就可以看到成群的角金鱼逆流而行或是攀登瀑布。",
            "golduck": "它靠修长的四肢和发达的大脚蹼在湖里优雅地游泳。",
            "golem": "刚蜕皮时浑身都白白的非常柔软，但是接触到空气之后会迅速变坚硬。",
            "graveler": "常在山路上滚来滚去。滚动时从来不关心前面的路上都有什么。",
            "grimer": "它由囤积的淤泥而形成。臭到让人无法碰触，凡是它走过的地方都寸草不生。",
            "growlithe": "性格很容易和人亲近，但是会对进入自己领地的敌人狂吠。",
            "gyarados": "性格蛮横喜欢破坏。在古代，这个恐怖的宝可梦曾经有过把整座城市烧成焦土的记录。",
            "haunter": "被它舔到时生命力会被吸走，身体会不受控制地不停颤抖，最后一命呜呼。",
            "hitmonchan": "它的拳击好似钻头一般！在它的攻击之下，哪怕是水泥墙也会被钻出洞来。",
            "hitmonlee": "在踢中敌人的瞬间，脚底会变得像钻石般坚硬，将对手踢成碎片。",
            "horsea": "在感到危险时会从嘴里用力地喷出水或者特殊的墨汁。",
            "hypno": "无意中遇到它的时候，如果不小心和它对上视线会很危险。它手里拿着的钟摆会让人睡着。",
            "ivysaur": "它的花苞会在吸收养分后长大。当花苞发出香味时，就预示着它快要开花了。",
            "jigglypuff": "它会用圆溜溜的大眼睛盯着对手唱起不可思议的歌曲，这令人舒服的歌曲会让对手睡着。",
            "jolteon": "稍微受点刺激就会大叫或生气，每当心情变化时都会蓄电。",
            "jynx": "以独特的节奏悠然移动，仿佛是在跳舞。走路的姿势如同在扭腰一样。",
            "kabuto": "由化石复活而成的宝可梦。在藏匿于海底时似乎会用背上的眼睛观察周围的情况。",
            "kabutops": "用纤细的身体快速游动。似乎会用镰刀撕裂猎物吸取体液。",
            "kadabra": "当勇基拉在附近时，似乎会发生像是时钟倒转这样的怪事。",
            "kakuna": "虽然几乎动也动不了，但是如果遇到了危险，有时似乎会竖起毒刺来反抗。",
            "kangaskhan": "在腹部的袋子里养育自己的宝宝。为了保护宝宝，遇到什么样的敌人都不会退缩。",
            "kingler": "一边的钳子很是巨大，虽说硬如钢铁还拥有1万马力，但还是太重了。",
            "koffing": "在炎热的地方，它体内的气体会由于膨胀而产生爆炸的危险，需要注意。",
            "krabby": "钳子是它强悍的武器，但在攻击时钳子偶尔会脱落。脱落后很快会长出新的来。",
            "lapras": "它拥有可以理解人类语言的温柔之心。会把人载在背上渡过大海。",
            "lickitung": "它2米长的舌头比前肢更能灵活地移动。不知为何，被它舔到之后会觉得发麻。",
            "machamp": "仅靠1只手臂的力量便可推动一座山。4只手一起可以打出极为强力的拳击。",
            "machoke": "只要解开系在腰上的限制它力量的腰带，豪力就会变得势不可挡。",
            "machop": "它体格虽小却力大无比。不但如此，它还精通各种格斗技能，实力十分惊人。",
            "magikarp": "因靠不住而出名的宝可梦。海里、河里、池子里、还有水洼里……它们会在各种地方游来游去。",
            "magmar": "出生在火山口。因为它的全身都在燃烧，所以人们难以分辨它和火球的区别。",
            "magnemite": "天生就拥有遮断重力的能力，可以一边发出电磁波一边在空中移动。",
            "magneton": "一直在发射神秘的电波，半径1公里内的气温会升高2度。",
            "mankey": "身体轻盈，在树上生活。常因鸡毛蒜皮的小事发火而飞扑到周围的东西上。",
            "marowak": "身体曾经又小又弱，在习惯了使用骨头战斗后才变成了粗暴的性格。",
            "meowth": "貌似一到晚上就精力充沛。喜欢又圆又亮的东西，发现了就一定要捡走。",
            "metapod": "它会让外壳变硬来保护自己。然而在遇到强烈的冲击力时，它的身体还是会被撞出来。",
            "mew": "用显微镜可以看到它身上极短极细且密集的体毛。",
            "mewtwo": "超梦的基因几乎和梦幻完全一样，但是大小和性格却迥异得让人吃惊。",
            "moltres": "传说的鸟宝可梦。当它挥舞起剧烈燃烧着的双翅，哪怕是夜空也会被点亮。",
            "mr. mime": "擅长表演哑剧，一直都在练习。即使空无一物，也能让人觉得那里真的有东西存在。",
            "muk": "非常难闻！气味臭到让人窒息，但由于鼻子的退化，它自己完全闻不到味道。",
            "nidoking": "通过活用自己钢一般坚硬的皮肤来使出强力的撞击。它的犄角坚硬得能够刺穿钻石。",
            "nidoqueen": "坚硬的鳞片覆盖着强壮的身体。据说它的鳞片会自己长出新的。",
            "nidoran-f": "虽然它性格温顺不喜欢战斗，但由于小犄角中含有毒液，请一定要小心提防。",
            "nidoran-m": "一直竖起它的大耳朵感知周围的情形。当它察觉到危险便会使用毒针。",
            "nidorina": "待在巢穴深处的时候，它一定会把身上的刺收起来。这表明它正处于放松状态。",
            "nidorino": "头上的犄角里含有毒素，当犄角撞穿了什么东西时，毒素就会随着冲击而流出。",
            "ninetales": "传说这种宝可梦是由9位圣者合体之后而诞生的。",
            "oddish": "要是以为它是普通的草而将它拔起，就会听到它的叫声。这让人感到莫名的恐怖。",
            "omanyte": "用化石复原出的宝可梦，靠巧妙地弯曲它的10条腿在古代的大海里飘荡。",
            "omastar": "它拥有锋利的牙齿，但据说它由于外壳过大，不易移动而导致灭绝。",
            "onix": "以惊人之势钻地觅食。在它通过之后形成的洞穴会被地鼠们当作自己的住处。",
            "paras": "它会通过挖洞来从树根里吸取营养，但大部分营养都会被背上的蘑菇抢走。",
            "parasect": "由于虫子的精华不断被吸走，在思考的似乎已经不是虫子，而是背上的蘑菇了。",
            "persian": "额头上的宝石闪闪发亮！走路的姿态也十分优美，就像女王一样华丽高贵。",
            "pidgeot": "以2马赫的飞行速度来觅食。它巨大的爪子是非常令人惧怕的武器。",
            "pidgeotto": "拥有超群的体力，而且飞翔范围广，经常飞到很远的地方寻找食物。",
            "pidgey": "性格沉着冷静，即使受到攻击也很少反击，只会朝对手扬起沙子保护自己。",
            "pikachu": "会将尾巴竖起来，去感觉周围是否安全。所以，如果随便去拉它的尾巴，会被咬喔。",
            "pinsir": "用犄角全力夹击！由于低温会使它无法动弹，所以它会选择在温暖的地方生活。",
            "poliwag": "漩涡的旋转方向好像会因出生地区而不同。比起走路，它更擅长游泳。",
            "poliwhirl": "据说它会在要被对手攻击时用腹部的漩涡让对方睡着，趁机逃跑。",
            "poliwrath": "他会用全身的肌肉奋力游泳，连奥林匹克选手都甘拜下风。",
            "ponyta": "在用力跳跃之后，会用蹄子和脚上的肌肉来缓解着地时的撞击。",
            "porygon": "人们期待它能成为唯一能够飞到宇宙的宝可梦，然而至今也努力未果。",
            "primeape": "只有在谁都不在身边的时候才不生气，但几乎没有人目击过这种情况。",
            "psyduck": "一直被头痛困扰。能使用念力，但不知道那是否是出于它自己的意识。",
            "raichu": "体内的电力累积到一定程度时，性格会变得带有攻击性。在昏暗处看起来就像是在发亮。",
            "rapidash": "总之就是喜欢跑步。如果发现有谁跑得比自己更快，就会用尽全力去追赶。",
            "raticate": "它的后脚上长着小蹼，以便它在水中游泳寻找食物。",
            "rattata": "有两颗大门牙，见什么咬什么。只要看到1只小拉达出没，附近肯定还住着40只以上。",
            "rhydon": "可以只用后腿行走，智力也发达了许多。像盔甲一样的皮肤可以抵挡住岩浆。",
            "rhyhorn": "单细胞的脑子只能思考一件事情。一旦它开始猛撞，直到睡着前都不会停止。",
            "sandshrew": "身体很干燥。但据说在夜里降温时，它的表皮上会有露水凝结。",
            "sandslash": "它很擅长用爪子抓伤敌人。虽然在战斗中偶尔会折断爪子，但到第二天就会长出新的来。",
            "scyther": "突然从草丛里窜出来，用锋利的镰刀斩砍的样子仿佛就像是忍者。",
            "seadra": "摸它的背鳍会导致麻痹。为了避免在睡觉时被水冲走，它会用尾巴缠住珊瑚。",
            "seaking": "雄性的职责是用头上的角打穿河里的石头筑巢。",
            "seel": "喜欢天寒地冻的地方，就算零下10度也能愉快地游泳。",
            "shellder": "它的硬壳可以承受任何攻击，但是一旦硬壳打开，它柔软的内部就会完全暴露。",
            "slowbro": "在海边悠闲地生活。如果尾巴上的大舌贝脱落了，它就会变回呆呆兽。",
            "slowpoke": "非常呆，动作也很缓慢。从不在意时间的流逝，过着悠闲的生活。",
            "snorlax": "就算是有些发霉的食物也能毫不在意地吃完，并且完全不会吃坏肚子。",
            "spearow": "不擅长高空飞行。会以超高速在地盘里四处盘旋，以保护自己的地盘不被侵犯。",
            "squirtle": "通过从水面喷水来捕食。在危急时刻会将四肢缩入龟壳里保护自己。",
            "starmie": "据说当被称为其核心的中心部分闪烁着七色光芒时，就代表着它正在传达信息。",
            "staryu": "据说只要它身体的中心部分还存活着，即使被切成小块也能再生。",
            "tangela": "全身被蓝色的蔓藤覆盖，真面目不为人知。据说，它的蔓藤会持续不断地生长。",
            "tauros": "精力充沛且个性火暴。一旦开始奔跑，在撞到东西之前都不会停下脚步。",
            "tentacool": "有时能在沙滩上发现它干巴巴的身体，但是它只要沾到水就能复活。",
            "tentacruel": "它能让80条触手自由伸缩，靠缠住猎物后注入毒素来让其变弱。",
            "vaporeon": "它的细胞与水分子相似，在它溶入于水后，你就完全看不见它了。",
            "venomoth": "如果不小心把它翅膀上的鳞粉沾到了身上，那不但会很难去除，更糟的是毒素也会从那里渗入。",
            "venonat": "在明亮的地方你便能发现它具有雷达功能的大眼其实是由许多个小眼睛聚集而成的。",
            "venusaur": "它背上开出的大花能够吸收太阳光并将其转换为能量。",
            "victreebel": "用花蜜的香味引诱猎物。据说被它吞入嘴里的东西，只要1天就会溶解到连骨头都不剩。",
            "vileplume": "为了散布有毒的花粉而摇动其巨大的花瓣，同时发出震耳的响声。",
            "voltorb": "据说它与精灵球相似的外形其实是它的保护色，但它很容易自爆这一点也出人意料。",
            "vulpix": "皮毛和尾巴都非常美丽。随着自身的成长，尾巴的末端会渐渐分开，数量也会增加。",
            "wartortle": "如果拍打它的头部，它会把头缩进壳里，但尾巴还是会露出来一点点。",
            "weedle": "头上长有尖锐的针。它喜欢藏在森林或草丛里大量吞食树叶。",
            "weepinbell": "它在肚子饿的时候会吞掉周围会动的东西，分泌溶解液让其致命。",
            "weezing": "它要靠吸收垃圾里的毒气、细菌和灰尘来维持生命。",
            "wigglytuff": "身体非常有弹性，当它用力吸气时，身体可以无限制地膨胀。",
            "zapdos": "当天空黑暗，落雷不断时，这只传说的宝可梦就会出现。",
            "zubat": "由于需要调查前方的状况，它会一边从嘴里发出超音波一边飞行。"
        }
    },
    "ja": {
        "others": {
            "crit": "",
            "use": "",
            "faint": "",
            "go": "",
            "superEffective": "",
            "notVeryEffective": ""
        },
        "pokemon": {
            "abra": "ケーシィ",
            "aerodactyl": "",
            "alakazam": "",
            "arbok": "",
            "arcanine": "",
            "articuno": "",
            "beedrill": "",
            "bellsprout": "",
            "blastoise": "",
            "bulbasaur": "",
            "butterfree": "",
            "caterpie": "",
            "chansey": "",
            "charizard": "",
            "charmander": "",
            "charmeleon": "",
            "clefable": "",
            "clefairy": "",
            "cloyster": "",
            "cubone": "",
            "dewgong": "",
            "diglett": "",
            "ditto": "",
            "dodrio": "",
            "doduo": "",
            "dragonair": "",
            "dragonite": "",
            "dratini": "",
            "drowzee": "",
            "dugtrio": "",
            "eevee": "",
            "ekans": "",
            "electabuzz": "",
            "electrode": "",
            "exeggcute": "",
            "exeggutor": "",
            "farfetch'd": "",
            "fearow": "",
            "flareon": "",
            "gastly": "",
            "gengar": "",
            "geodude": "",
            "gloom": "",
            "golbat": "",
            "goldeen": "",
            "golduck": "",
            "golem": "",
            "graveler": "",
            "grimer": "",
            "growlithe": "",
            "gyarados": "",
            "haunter": "",
            "hitmonchan": "",
            "hitmonlee": "",
            "horsea": "",
            "hypno": "",
            "ivysaur": "",
            "jigglypuff": "",
            "jolteon": "",
            "jynx": "",
            "kabuto": "",
            "kabutops": "",
            "kadabra": "",
            "kakuna": "",
            "kangaskhan": "",
            "kingler": "",
            "koffing": "",
            "krabby": "",
            "lapras": "",
            "lickitung": "",
            "machamp": "",
            "machoke": "",
            "machop": "",
            "magikarp": "",
            "magmar": "",
            "magnemite": "",
            "magneton": "",
            "mankey": "",
            "marowak": "",
            "meowth": "",
            "metapod": "",
            "mew": "",
            "mewtwo": "",
            "moltres": "",
            "mr. mime": "",
            "muk": "",
            "nidoking": "",
            "nidoqueen": "",
            "nidoran-f": "",
            "nidoran-m": "",
            "nidorina": "",
            "nidorino": "",
            "ninetales": "",
            "oddish": "",
            "omanyte": "",
            "omastar": "",
            "onix": "",
            "paras": "",
            "parasect": "",
            "persian": "",
            "pidgeot": "",
            "pidgeotto": "",
            "pidgey": "",
            "pikachu": "",
            "pinsir": "",
            "poliwag": "",
            "poliwhirl": "",
            "poliwrath": "",
            "ponyta": "",
            "porygon": "",
            "primeape": "",
            "psyduck": "",
            "raichu": "",
            "rapidash": "",
            "raticate": "",
            "rattata": "",
            "rhydon": "",
            "rhyhorn": "",
            "sandshrew": "",
            "sandslash": "",
            "scyther": "",
            "seadra": "",
            "seaking": "",
            "seel": "",
            "shellder": "",
            "slowbro": "",
            "slowpoke": "",
            "snorlax": "",
            "spearow": "",
            "squirtle": "",
            "starmie": "",
            "staryu": "",
            "tangela": "",
            "tauros": "",
            "tentacool": "",
            "tentacruel": "",
            "vaporeon": "",
            "venomoth": "",
            "venonat": "",
            "venusaur": "",
            "victreebel": "",
            "vileplume": "",
            "voltorb": "",
            "vulpix": "",
            "wartortle": "",
            "weedle": "",
            "weepinbell": "",
            "weezing": "",
            "wigglytuff": "",
            "zapdos": "",
            "zubat": ""
        },
        "moves": {
            "absorb": "",
            "acid": "",
            "acid armor": "",
            "agility": "",
            "amnesia": "",
            "aurora beam": "",
            "barrage": "",
            "barrier": "",
            "bide": "",
            "bind": "",
            "bite": "",
            "blizzard": "",
            "body slam": "",
            "bone club": "",
            "bonemerang": "",
            "bubble": "",
            "bubble beam": "",
            "clamp": "",
            "comet punch": "",
            "confuse ray": "",
            "confusion": "",
            "constrict": "",
            "conversion": "",
            "counter": "",
            "crabhammer": "",
            "cut": "",
            "defense curl": "",
            "dig": "",
            "disable": "",
            "dizzy punch": "",
            "double kick": "",
            "double slap": "",
            "double team": "",
            "double-edge": "",
            "dragon rage": "",
            "dream eater": "",
            "drill peck": "",
            "earthquake": "",
            "egg bomb": "",
            "ember": "",
            "explosion": "",
            "fire blast": "",
            "fire punch": "",
            "fire spin": "",
            "fissure": "",
            "flamethrower": "",
            "flash": "",
            "fly": "",
            "focus energy": "",
            "fury attack": "",
            "fury swipes": "",
            "glare": "",
            "growl": "",
            "growth": "",
            "guillotine": "",
            "gust": "",
            "harden": "",
            "haze": "",
            "headbutt": "",
            "high jump kick": "",
            "horn attack": "",
            "horn drill": "",
            "hydro pump": "",
            "hyper beam": "",
            "hyper fang": "",
            "hypnosis": "",
            "ice beam": "",
            "ice punch": "",
            "jump kick": "",
            "karate chop": "",
            "kinesis": "",
            "leech life": "",
            "leech seed": "",
            "leer": "",
            "lick": "",
            "light screen": "",
            "lovely kiss": "",
            "low kick": "",
            "meditate": "",
            "mega drain": "",
            "mega kick": "",
            "mega punch": "",
            "metronome": "",
            "mimic": "",
            "minimize": "",
            "mirror move": "",
            "mist": "",
            "night shade": "",
            "pay day": "",
            "peck": "",
            "petal dance": "",
            "pin missile": "",
            "poison gas": "",
            "poison powder": "",
            "poison sting": "",
            "pound": "",
            "psybeam": "",
            "psychic": "",
            "psywave": "",
            "quick attack": "",
            "rage": "",
            "razor leaf": "",
            "razor wind": "",
            "recover": "",
            "reflect": "",
            "rest": "",
            "roar": "",
            "rock slide": "",
            "rock throw": "",
            "rolling kick": "",
            "sand attack": "",
            "scratch": "",
            "screech": "",
            "seismic toss": "",
            "self-destruct": "",
            "sharpen": "",
            "sing": "",
            "skull bash": "",
            "sky attack": "",
            "slam": "",
            "slash": "",
            "sleep powder": "",
            "sludge": "",
            "smog": "",
            "smokescreen": "",
            "soft-boiled": "",
            "solar beam": "",
            "sonic boom": "",
            "spike cannon": "",
            "splash": "",
            "spore": "",
            "stomp": "",
            "strength": "",
            "string shot": "",
            "struggle": "",
            "stun spore": "",
            "submission": "",
            "substitute": "",
            "super fang": "",
            "supersonic": "",
            "surf": "",
            "swift": "",
            "swords dance": "",
            "tackle": "",
            "tail whip": "",
            "take down": "",
            "teleport": "",
            "thrash": "",
            "thunder": "",
            "thunder punch": "",
            "thunder shock": "",
            "thunder wave": "",
            "thunderbolt": "",
            "toxic": "",
            "transform": "",
            "tri attack": "",
            "twineedle": "",
            "vice grip": "",
            "vine whip": "",
            "water gun": "",
            "waterfall": "",
            "whirlwind": "",
            "wing attack": "",
            "withdraw": "",
            "wrap": ""
        }
    }
};
const MULTIPLIER = {
    "bug": {
        "bug": 1,
        "dragon": 1,
        "electric": 1,
        "fighting": 1 / 2,
        "fire": 1 / 2,
        "flying": 1 / 2,
        "ghost": 1 / 2,
        "grass": 2,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 2,
        "psychic": 2,
        "rock": 1,
        "water": 1
    }, "dragon": {
        "bug": 1,
        "dragon": 2,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 1,
        "ghost": 1,
        "grass": 1,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1,
        "water": 1
    }, "electric": {
        "bug": 1,
        "dragon": 1 / 2,
        "electric": 1 / 2,
        "fighting": 1,
        "fire": 1,
        "flying": 2,
        "ghost": 1,
        "grass": 1 / 2,
        "ground": 0,
        "ice": 1,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1,
        "water": 2
    }, "fighting": {
        "bug": 1 / 2,
        "dragon": 1,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 1 / 2,
        "ghost": 0,
        "grass": 1,
        "ground": 1,
        "ice": 2,
        "normal": 2,
        "poison": 1 / 2,
        "psychic": 1 / 2,
        "rock": 2,
        "water": 1
    }, "fire": {
        "bug": 2,
        "dragon": 1 / 2,
        "electric": 1,
        "fighting": 1,
        "fire": 1 / 2,
        "flying": 1,
        "ghost": 1,
        "grass": 2,
        "ground": 1,
        "ice": 2,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1 / 2,
        "water": 1 / 2
    }, "flying": {
        "bug": 2,
        "dragon": 1,
        "electric": 1 / 2,
        "fighting": 2,
        "fire": 1,
        "flying": 1,
        "ghost": 1,
        "grass": 2,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1 / 2,
        "water": 1
    }, "ghost": {
        "bug": 1,
        "dragon": 1,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 1,
        "ghost": 2,
        "grass": 1,
        "ground": 1,
        "ice": 1,
        "normal": 0,
        "poison": 1,
        "psychic": 0,
        "rock": 1,
        "water": 1
    }, "grass": {
        "bug": 1 / 2,
        "dragon": 1 / 2,
        "electric": 1,
        "fighting": 1,
        "fire": 1 / 2,
        "flying": 1 / 2,
        "ghost": 1,
        "grass": 1 / 2,
        "ground": 2,
        "ice": 1,
        "normal": 1,
        "poison": 1 / 2,
        "psychic": 1,
        "rock": 2,
        "water": 2
    }, "ground": {
        "bug": 1 / 2,
        "dragon": 1,
        "electric": 2,
        "fighting": 1,
        "fire": 2,
        "flying": 0,
        "ghost": 1,
        "grass": 1 / 2,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 2,
        "psychic": 1,
        "rock": 2,
        "water": 1
    }, "ice": {
        "bug": 1,
        "dragon": 2,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 2,
        "ghost": 1,
        "grass": 2,
        "ground": 2,
        "ice": 1 / 2,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1,
        "water": 1 / 2
    }, "normal": {
        "bug": 1,
        "dragon": 1,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 1,
        "ghost": 0,
        "grass": 1,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1 / 2,
        "water": 1
    }, "poison": {
        "bug": 2,
        "dragon": 1,
        "electric": 1,
        "fighting": 1,
        "fire": 1,
        "flying": 1,
        "ghost": 1 / 2,
        "grass": 2,
        "ground": 1 / 2,
        "ice": 1,
        "normal": 1,
        "poison": 1 / 2,
        "psychic": 1,
        "rock": 1 / 2,
        "water": 1
    }, "psychic": {
        "bug": 1,
        "dragon": 1,
        "electric": 1,
        "fighting": 2,
        "fire": 1,
        "flying": 1,
        "ghost": 1,
        "grass": 1,
        "ground": 1,
        "ice": 1,
        "normal": 1,
        "poison": 2,
        "psychic": 1 / 2,
        "rock": 1,
        "water": 1
    }, "rock": {
        "bug": 2,
        "dragon": 1,
        "electric": 1,
        "fighting": 1 / 2,
        "fire": 2,
        "flying": 2,
        "ghost": 1,
        "grass": 1,
        "ground": 1 / 2,
        "ice": 2,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 1,
        "water": 1
    }, "water": {
        "bug": 1,
        "dragon": 1 / 2,
        "electric": 1,
        "fighting": 1,
        "fire": 2,
        "flying": 1,
        "ghost": 1,
        "grass": 1 / 2,
        "ground": 2,
        "ice": 1,
        "normal": 1,
        "poison": 1,
        "psychic": 1,
        "rock": 2,
        "water": 1 / 2
    }
};
const ICONS = {
    "bulbasaur": { "row": 1, "cell": 2 },
    "ivysaur": { "row": 1, "cell": 3 },
    "venusaur": { "row": 1, "cell": 4 },
    "charmander": { "row": 1, "cell": 5 },
    "charmeleon": { "row": 1, "cell": 6 },
    "charizard": { "row": 1, "cell": 7 },
    "squirtle": { "row": 1, "cell": 8 },
    "wartortle": { "row": 1, "cell": 9 },
    "blastoise": { "row": 1, "cell": 10 },
    "caterpie": { "row": 1, "cell": 11 },
    "metapod": { "row": 1, "cell": 12 },
    "butterfree": { "row": 2, "cell": 1 },
    "weedle": { "row": 2, "cell": 2 },
    "kakuna": { "row": 2, "cell": 3 },
    "beedrill": { "row": 2, "cell": 4 },
    "pidgey": { "row": 2, "cell": 5 },
    "pidgeotto": { "row": 2, "cell": 6 },
    "pidgeot": { "row": 2, "cell": 7 },
    "rattata": { "row": 2, "cell": 8 },
    "raticate": { "row": 2, "cell": 9 },
    "spearow": { "row": 2, "cell": 10 },
    "fearow": { "row": 2, "cell": 11 },
    "ekans": { "row": 2, "cell": 12 },
    "arbok": { "row": 3, "cell": 1 },
    "pikachu": { "row": 3, "cell": 2 },
    "raichu": { "row": 3, "cell": 3 },
    "sandshrew": { "row": 3, "cell": 4 },
    "sandslash": { "row": 3, "cell": 5 },
    "nidoran-f": { "row": 3, "cell": 6 },
    "nidorina": { "row": 3, "cell": 7 },
    "nidoqueen": { "row": 3, "cell": 8 },
    "nidoran-m": { "row": 3, "cell": 9 },
    "nidorino": { "row": 3, "cell": 10 },
    "nidoking": { "row": 3, "cell": 11 },
    "clefairy": { "row": 3, "cell": 12 },
    "clefable": { "row": 4, "cell": 1 },
    "vulpix": { "row": 4, "cell": 2 },
    "ninetales": { "row": 4, "cell": 3 },
    "jigglypuff": { "row": 4, "cell": 4 },
    "wigglytuff": { "row": 4, "cell": 5 },
    "zubat": { "row": 4, "cell": 6 },
    "golbat": { "row": 4, "cell": 7 },
    "oddish": { "row": 4, "cell": 8 },
    "gloom": { "row": 4, "cell": 9 },
    "vileplume": { "row": 4, "cell": 10 },
    "paras": { "row": 4, "cell": 11 },
    "parasect": { "row": 4, "cell": 12 },
    "venonat": { "row": 5, "cell": 1 },
    "venomoth": { "row": 5, "cell": 2 },
    "diglett": { "row": 5, "cell": 3 },
    "dugtrio": { "row": 5, "cell": 4 },
    "meowth": { "row": 5, "cell": 5 },
    "persian": { "row": 5, "cell": 6 },
    "psyduck": { "row": 5, "cell": 7 },
    "golduck": { "row": 5, "cell": 8 },
    "mankey": { "row": 5, "cell": 9 },
    "primeape": { "row": 5, "cell": 10 },
    "growlithe": { "row": 5, "cell": 11 },
    "arcanine": { "row": 5, "cell": 12 },
    "poliwag": { "row": 6, "cell": 1 },
    "poliwhirl": { "row": 6, "cell": 2 },
    "poliwrath": { "row": 6, "cell": 3 },
    "abra": { "row": 6, "cell": 4 },
    "kadabra": { "row": 6, "cell": 5 },
    "alakazam": { "row": 6, "cell": 6 },
    "machop": { "row": 6, "cell": 7 },
    "machoke": { "row": 6, "cell": 8 },
    "machamp": { "row": 6, "cell": 9 },
    "bellsprout": { "row": 6, "cell": 10 },
    "weepinbell": { "row": 6, "cell": 11 },
    "victreebel": { "row": 6, "cell": 12 },
    "tentacool": { "row": 7, "cell": 1 },
    "tentacruel": { "row": 7, "cell": 2 },
    "geodude": { "row": 7, "cell": 3 },
    "graveler": { "row": 7, "cell": 4 },
    "golem": { "row": 7, "cell": 5 },
    "ponyta": { "row": 7, "cell": 6 },
    "rapidash": { "row": 7, "cell": 7 },
    "slowpoke": { "row": 7, "cell": 8 },
    "slowbro": { "row": 7, "cell": 9 },
    "magnemite": { "row": 7, "cell": 10 },
    "magneton": { "row": 7, "cell": 11 },
    "farfetch'd": { "row": 7, "cell": 12 },
    "doduo": { "row": 8, "cell": 1 },
    "dodrio": { "row": 8, "cell": 2 },
    "seel": { "row": 8, "cell": 3 },
    "dewgong": { "row": 8, "cell": 4 },
    "grimer": { "row": 8, "cell": 5 },
    "muk": { "row": 8, "cell": 6 },
    "shellder": { "row": 8, "cell": 7 },
    "cloyster": { "row": 8, "cell": 8 },
    "gastly": { "row": 8, "cell": 9 },
    "haunter": { "row": 8, "cell": 10 },
    "gengar": { "row": 8, "cell": 11 },
    "onix": { "row": 8, "cell": 12 },
    "drowzee": { "row": 9, "cell": 1 },
    "hypno": { "row": 9, "cell": 2 },
    "krabby": { "row": 9, "cell": 3 },
    "kingler": { "row": 9, "cell": 4 },
    "voltorb": { "row": 9, "cell": 5 },
    "electrode": { "row": 9, "cell": 6 },
    "exeggcute": { "row": 9, "cell": 7 },
    "exeggutor": { "row": 9, "cell": 8 },
    "cubone": { "row": 9, "cell": 9 },
    "marowak": { "row": 9, "cell": 10 },
    "hitmonlee": { "row": 9, "cell": 11 },
    "hitmonchan": { "row": 9, "cell": 12 },
    "lickitung": { "row": 10, "cell": 1 },
    "koffing": { "row": 10, "cell": 2 },
    "weezing": { "row": 10, "cell": 3 },
    "rhyhorn": { "row": 10, "cell": 4 },
    "rhydon": { "row": 10, "cell": 5 },
    "chansey": { "row": 10, "cell": 6 },
    "tangela": { "row": 10, "cell": 7 },
    "kangaskhan": { "row": 10, "cell": 8 },
    "horsea": { "row": 10, "cell": 9 },
    "seadra": { "row": 10, "cell": 10 },
    "goldeen": { "row": 10, "cell": 11 },
    "seaking": { "row": 10, "cell": 12 },
    "staryu": { "row": 11, "cell": 1 },
    "starmie": { "row": 11, "cell": 2 },
    "mr. mime": { "row": 11, "cell": 3 },
    "scyther": { "row": 11, "cell": 4 },
    "jynx": { "row": 11, "cell": 5 },
    "electabuzz": { "row": 11, "cell": 6 },
    "magmar": { "row": 11, "cell": 7 },
    "pinsir": { "row": 11, "cell": 8 },
    "tauros": { "row": 11, "cell": 9 },
    "magikarp": { "row": 11, "cell": 10 },
    "gyarados": { "row": 11, "cell": 11 },
    "lapras": { "row": 11, "cell": 12 },
    "ditto": { "row": 12, "cell": 1 },
    "eevee": { "row": 12, "cell": 2 },
    "vaporeon": { "row": 12, "cell": 3 },
    "jolteon": { "row": 12, "cell": 4 },
    "flareon": { "row": 12, "cell": 5 },
    "porygon": { "row": 12, "cell": 6 },
    "omanyte": { "row": 12, "cell": 7 },
    "omastar": { "row": 12, "cell": 8 },
    "kabuto": { "row": 12, "cell": 9 },
    "kabutops": { "row": 12, "cell": 10 },
    "aerodactyl": { "row": 12, "cell": 11 },
    "snorlax": { "row": 12, "cell": 12 },
    "articuno": { "row": 13, "cell": 1 },
    "zapdos": { "row": 13, "cell": 2 },
    "moltres": { "row": 13, "cell": 3 },
    "dratini": { "row": 13, "cell": 4 },
    "dragonair": { "row": 13, "cell": 5 },
    "dragonite": { "row": 13, "cell": 6 },
    "mewtwo": { "row": 13, "cell": 7 },
    "mew": { "row": 13, "cell": 8 }
};