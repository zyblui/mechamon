let moves = [{
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
        let num = Math.random();
        if (num < 3 / 8) setUncontrollable("bind", 1);
        else if (num < 6 / 8) setUncontrollable("bind", 2);
        else if (num < 7 / 8) setUncontrollable("bind", 3);
        else setUncontrollable("bind", 4);
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
        let num = Math.random();
        if (num < 3 / 8) setUncontrollable("clamp", 1);
        else if (num < 6 / 8) setUncontrollable("clamp", 2);
        else if (num < 7 / 8) setUncontrollable("clamp", 3);
        else setUncontrollable("clamp", 4);
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
        let num = Math.random();
        if (num < 3 / 8) setUncontrollable("fire spin", 1);
        else if (num < 6 / 8) setUncontrollable("fire spin", 2);
        else if (num < 7 / 8) setUncontrollable("fire spin", 3);
        else setUncontrollable("fire spin", 4);
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
            if (moves[Math.floor(Math.random() * moves.length)].name != "metronome" && moves[Math.floor(Math.random() * moves.length)].name != "struggle") {
                attack(moves[Math.floor(Math.random() * moves.length)].name);
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
        dealDmg(false, 100);
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
            setUncontrollable("petal dance", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 2);
        } else {
            setUncontrollable("petal dance", 3);
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
        setUncontrollable("rage", Infinity);
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
            addSmallText(capitalize(getPkmn(true).name) + " had its HP restored.");
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
            addSmallText(capitalize(getPkmn(true).name) + " had its HP restored.");
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
        dealDmg(false, 100);
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
    "priority": 0
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
            addSmallText(capitalize(getPkmn(true).name) + " put in a substitute!");
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
            setUncontrollable("thrash", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1);
            }, 2);
        } else {
            setUncontrollable("thrash", 3);
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
            getPkmn(true).moves[i].pp = 5;
        }
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
        let num = Math.random();
        if (num < 3 / 8) setUncontrollable("wrap", 1);
        else if (num < 6 / 8) setUncontrollable("wrap", 2);
        else if (num < 7 / 8) setUncontrollable("wrap", 3);
        else setUncontrollable("wrap", 4);
    }
}];
let pokemon = [{
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
let translation = {
    "en": {
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
            "fastAsleep": "[pokemon0] is fast asleep.",
            "fastAsleep-enemy": "The opposing [pokemon0] is fast asleep."
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
        }
    },
    "zh": {
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
            "fastAsleep": "[pokemon0]正在呼呼大睡。",
            "fastAsleep-enemy": "对手的[pokemon0]正在呼呼大睡。"
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
let multiplier = {
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