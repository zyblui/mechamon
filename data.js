let moves = [{
    "name": "absorb",
    "type": "grass",
    "category": "special",
    "power": 20,
    "acc": 100,
    "pp": 20,
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
    "effect": function () {
        modifyStats(true, "def", 2, 1);
    }
}, {
    "name": "bide",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": Infinity,
    "pp": 10
}, {
    "name": "bind",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 75,
    "pp": 20,
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
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true }
    }
}, {
    "name": "blizzard",
    "type": "ice",
    "category": "special",
    "power": 120,
    "acc": 90,
    "pp": 5,
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
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true }
    }
}, {
    "name": "bonemerang",
    "type": "ground",
    "category": "physical",
    "power": 50,
    "acc": 90,
    "pp": 10,
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
    "effect": function () {
        modifyStats(false, "spe", -1, 1 / 3)
    }
}, {
    "name": "clamp",
    "type": "water",
    "category": "special",
    "power": 35,
    "acc": 75,
    "pp": 10,
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
    "effect": function () {
        getPkmn(true).tempType = getStats(getPkmn(false).name).type;
    }
}, {
    "name": "counter",
    "type": "fighting",
    "category": "",
    "power": 1,
    "acc": 100,
    "pp": 20
}, {
    "name": "crabhammer",
    "type": "water",
    "category": "special",
    "power": 90,
    "acc": 85,
    "pp": 10,
    "preCritEffect": function () {
        return { isHighCritRatio: true }
    }
}, {
    "name": "cut",
    "type": "normal",
    "category": "physical",
    "power": 50,
    "acc": 95,
    "pp": 30
    //No additional effect.
}, {
    "name": "defense curl",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
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
    "effect": function () {
        let arr = [];
        for (let i in getPkmn(false).moves) {
            if (getPkmn(false).moves[i] > 0) arr.push(i);
        }
        getPkmn(false).disable = {
            move: arr[Math.floor(Math.random() * arr.length)],
            turns: Math.floor(Math.random() * 7)
        }
    }
}, {
    "name": "dizzy punch",
    "type": "normal",
    "category": "physical",
    "power": 70,
    "acc": 100,
    "pp": 10
    //No additional effect.
}, {
    "name": "double kick",
    "type": "fighting",
    "category": "physical",
    "power": 30,
    "acc": 100,
    "pp": 30,
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
    "effect": function () {
        modifyStats(true, "eva", 1, 1)
    }
}, {
    "name": "double-edge",
    "type": "normal",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 15,
    "effect": function (e) {
        getPkmn(true).hp -= Math.min(e.totalDmg / 4, getPkmn(true).hp);
    }
}, {
    "name": "dragon rage",
    "type": "dragon",
    "category": "special",
    "power": 1,
    "acc": 100,
    "pp": 10,
    "effect": function () {
        getPkmn(false).hp -= Math.min(40, getPkmn(false).hp);
        addSmallText("(" + capitalize(getPkmn(false).name) + " lost " + (Math.min(40, getPkmn(false).hp) / getPkmn(false).maxHp * 100).toFixed(0) + "% of its health!)")
    }
}, {
    "name": "dream eater",
    "type": "psychic",
    "category": "special",
    "power": 100,
    "acc": 100,
    "pp": 15,
    "effect": function (e) {
        if (getPkmn(false).status == "slp") getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "drill peck",
    "type": "flying",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 20
    //No additional effect.
}, {
    "name": "earthquake",
    "type": "ground",
    "category": "physical",
    "power": 100,
    "acc": 100,
    "pp": 10
    //No additional effect.
}, {
    "name": "egg bomb",
    "type": "normal",
    "category": "physical",
    "power": 100,
    "acc": 75,
    "pp": 10
    //No additional effect.
}, {
    "name": "ember",
    "type": "fire",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 25,
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
    "pp": 30
}, {
    "name": "fury attack",
    "type": "normal",
    "category": "physical",
    "power": 15,
    "acc": 85,
    "pp": 20,
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
    "pp": 35
    //No additional effect.
}, {
    "name": "harden",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30,
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
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true }
    }
}, {
    "name": "high jump kick",
    "type": "fighting",
    "category": "physical",
    "power": 85,
    "acc": 90,
    "pp": 20,
    "missEffect": function () {
        getPkmn(true).hp -= 1;
    }
}, {
    "name": "horn attack",
    "type": "normal",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 25
    //No additional effect.
}, {
    "name": "horn drill",
    "type": "normal",
    "category": "physical",
    "power": 0,
    "acc": 30,
    "pp": 5,
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
    "pp": 5
    //No additional effect.
}, {
    "name": "hyper beam",
    "type": "normal",
    "category": "physical",
    "power": 150,
    "acc": 90,
    "pp": 5,
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
    "effect": function () {
        if (Math.random() < 0.1) return { flinch: true }
    }
}, {
    "name": "hypnosis",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": 60,
    "pp": 20,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7))
    }
}, {
    "name": "ice beam",
    "type": "ice",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 10,
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
    "missEffect": function () {
        getPkmn(true).hp -= 1;
    }
}, {
    "name": "karate chop",
    "type": "normal",
    "category": "physical",
    "power": 50,
    "acc": 100,
    "pp": 25,
    "preCritEffect": function () {
        return { isHighCritRatio: true }
    }
}, {
    "name": "kinesis",
    "type": "psychic",
    "category": "",
    "power": 0,
    "acc": 80,
    "pp": 15,
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
    "effect": function () {
        modifyStatus("par", 0.3);
    }
}, {
    "name": "light screen",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 30
}, {
    "name": "lovely kiss",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 10,
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
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true }
    }
}, {
    "name": "meditate",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
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
    "effect": function (e) {
        getPkmn(true).hp += Math.min(e.totalDmg / 2, getPkmn(true).maxHp - getPkmn(true).hp);
    }
}, {
    "name": "mega kick",
    "type": "normal",
    "category": "physical",
    "power": 120,
    "acc": 75,
    "pp": 5
    //No additional effect.
}, {
    "name": "mega punch",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 85,
    "pp": 20
    //No additional effect.
}, {
    "name": "metronome",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "effect": function () {
        while (true) {
            if (moves[Math.floor(Math.random() * moves.length)].name != "metronome" && moves[Math.floor(Math.random() * moves.length)].name != "struggle") {
                attack(moves[Math.floor(Math.random() * moves.length)].name)
                break;
            }
        }
    }
}, {
    "name": "mimic",
    "type": "normal",
    "category": "",
    "power": 0,
    "acc": 100,
    "pp": 10
}, {
    "name": "minimize",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
    "effect": function () {
        modifyStats(true, "eva", 1, 1);
    }
}, {
    "name": "mirror move",
    "type": "flying",
    "category": "",
    "power": 0,
    "acc": Infinity,
    "pp": 20
}, {
    "name": "mist",
    "type": "ice",
    "category": "",
    "power": 0,
    "acc": Infinity,
    "pp": 30
}, {
    "name": "night shade",
    "type": "ghost",
    "category": "physical",
    "power": 1,
    "acc": 100,
    "pp": 15,
    "effect": function () {
        getPkmn(false).hp -= Math.min(100, getPkmn(false).hp);
    }
}, {
    "name": "pay day",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 20
    //No additional effect.
}, {
    "name": "peck",
    "type": "flying",
    "category": "physical",
    "power": 35,
    "acc": 100,
    "pp": 35
    //No additional effect.
}, {
    "name": "petal dance",
    "type": "grass",
    "category": "special",
    "power": 70,
    "acc": 100,
    "pp": 20,
    "effect": function () {
        if (Math.random() < 0.5) {
            setUncontrollable("petal dance", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1)
            }, 2)
        } else {
            setUncontrollable("petal dance", 3)
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1)
            }, 3)
        }
    }
}, {
    "name": "pin missile",
    "type": "bug",
    "category": "physical",
    "power": 14,
    "acc": 85,
    "pp": 20,
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
    "effect": function () {
        modifyStatus("psn", 0.2);
    }
}, {
    "name": "pound",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 35
    //No additional effect.
}, {
    "name": "psybeam",
    "type": "psychic",
    "category": "special",
    "power": 65,
    "acc": 100,
    "pp": 20,
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
    "effect": function () {
        getPkmn(false).hp -= Math.min(Math.ceil(Math.random() * 149), getPkmn(false).maxHp)
    }
}, {
    "name": "quick attack",
    "type": "normal",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 30
}, {
    "name": "rage",
    "type": "normal",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 20,
    "effect": function () {
        addTempEffect(true, "rage", Infinity, 1)
        setUncontrollable("rage", Infinity);
    }
}, {
    "name": "razor leaf",
    "type": "grass",
    "category": "special",
    "power": 55,
    "acc": 95,
    "pp": 25,
    "preCritEffect": function () {
        return { isHighCritRatio: true }
    }
}, {
    "name": "razor wind",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 75,
    "pp": 10,
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
    "effect": function () {
        let hpLost = getPkmn(true).maxHp - getPkmn(true).hp;
        if (hpLost != 255 && hpLost != 511) {
            getPkmn(true).hp += Math.min(getPkmn(true).maxHp / 2, hpLost);
            addSmallText(capitalize(getPkmn(true).name) + " had its HP restored.")
        }
    }
}, {
    "name": "reflect",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20,
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
    "effect": function () {
        let hpLost = getPkmn(true).maxHp - getPkmn(true).hp;
        if (hpLost != 255 && hpLost != 511) {
            getPkmn(true).hp = getPkmn(true).maxHp;
            addSmallText(capitalize(getPkmn(true).name) + " had its HP restored.")
            putToSleep(true, 2);
        }
    }
}, {
    "name": "roar",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 20
    //No competitive use.
}, {
    "name": "rock slide",
    "type": "rock",
    "category": "physical",
    "power": 75,
    "acc": 90,
    "pp": 10
    //No additional effect.
}, {
    "name": "rock throw",
    "type": "rock",
    "category": "physical",
    "power": 50,
    "acc": 65,
    "pp": 15
    //No additional effect.
}, {
    "name": "rolling kick",
    "type": "fighting",
    "category": "physical",
    "power": 60,
    "acc": 85,
    "pp": 15,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true }
    }
}, {
    "name": "sand attack",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 15,
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
    "pp": 35
    //No additional effect.
}, {
    "name": "screech",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 85,
    "pp": 40,
    "effect": function () {
        modifyStats(false, "def", -2, 1)
    }
}, {
    "name": "seismic toss",
    "type": "fighting",
    "category": "physical",
    "power": 1,
    "acc": 100,
    "pp": 20,
    "effect": function () {
        addSmallText("(" + capitalize(getPkmn(false).name) + " lost " + (Math.min(100, getPkmn(false).hp) / getPkmn(false).maxHp * 100).toFixed(0) + "% of its health!)")
        getPkmn(false).hp -= Math.min(100, getPkmn(false).hp);
    }
}, {
    "name": "self-destruct",
    "type": "normal",
    "category": "",
    "power": 130,
    "acc": 100,
    "pp": 5,
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
    "preDmgEffect": function () {
        charge("sky attack", 1);
    }
}, {
    "name": "slam",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 75,
    "pp": 20
    //No additional effect.
}, {
    "name": "slash",
    "type": "normal",
    "category": "physical",
    "power": 70,
    "acc": 100,
    "pp": 20,
    "preCritEffect": function () {
        return { isHighCritRatio: true }
    }
}, {
    "name": "sleep powder",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 15,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7))
    }
}, {
    "name": "sludge",
    "type": "poison",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 20,
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
    "effect": function () {
        getPkmn(false).hp -= Math.min(40, getPkmn(false).hp);
        addSmallText("(" + capitalize(getPkmn(false).name) + " lost " + (Math.min(40, getPkmn(false).hp) / getPkmn(false).maxHp * 100).toFixed(0) + "% of its health!)")
    }
}, {
    "name": "spike cannon",
    "type": "normal",
    "category": "physical",
    "power": 20,
    "acc": 100,
    "pp": 15,
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
    "pp": 40
    //No competitive use.
}, {
    "name": "spore",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 15,
    "effect": function () {
        putToSleep(false, Math.ceil(Math.random() * 7))
    }
}, {
    "name": "stomp",
    "type": "normal",
    "category": "physical",
    "power": 65,
    "acc": 100,
    "pp": 20,
    "effect": function () {
        if (Math.random() < 0.3) return { flinch: true }
    }
}, {
    "name": "strength",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 15
    //No additional effect.
}, {
    "name": "string shot",
    "type": "bug",
    "category": "status",
    "power": 0,
    "acc": 95,
    "pp": 40,
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
    "effect": function (e) {
        getPkmn(true).hp -= Math.min(e.totalDmg / 4, getPkmn(true).hp);
    }
}, {
    "name": "stun spore",
    "type": "grass",
    "category": "status",
    "power": 0,
    "acc": 75,
    "pp": 30,
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
    "effect": function (e) {
        getPkmn(true).hp -= Math.min(e.totalDmg / 4, getPkmn(true).hp);
    }
}, {
    "name": "substitute",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 10,
    "effect": function () {
        if (getPkmn(true).hp >= getPkmn(true).maxHp / 4) {
            addSmallText(capitalize(getPkmn(true).name) + " put in a substitute!")
            getPkmn(true).hp -= getPkmn(true).maxHp / 4;
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
    "effect": function () {
        addTempEffect(false, "confused", 1 + Math.ceil(Math.random() * 4), 1);
    }
}, {
    "name": "surf",
    "type": "water",
    "category": "special",
    "power": 95,
    "acc": 100,
    "pp": 15
    //No additional effect.
}, {
    "name": "swift",
    "type": "normal",
    "category": "physical",
    "power": 60,
    "acc": Infinity,
    "pp": 20,
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
    "effect": function () {
        modifyStats(true, "atk", 2, 1)
    }
}, {
    "name": "tackle",
    "type": "normal",
    "category": "physical",
    "power": 35,
    "acc": 95,
    "pp": 35
    //No additional effect.
}, {
    "name": "tail whip",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 100,
    "pp": 30,
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
    "effect": function (e) {
        getPkmn(true).hp -= Math.min(e.totalDmg / 4, getPkmn(true).hp);
    }
}, {
    "name": "teleport",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 20
    //No competitive use.
}, {
    "name": "thrash",
    "type": "normal",
    "category": "physical",
    "power": 90,
    "acc": 100,
    "pp": 20,
    "effect": function () {
        if (Math.random() < 0.5) {
            setUncontrollable("thrash", 2);
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1)
            }, 2)
        } else {
            setUncontrollable("thrash", 3)
            setDelay(true, function () {
                addTempEffect(true, "confused", Infinity, 1)
            }, 3)
        }
    }
}, {
    "name": "thunder",
    "type": "electric",
    "category": "special",
    "power": 120,
    "acc": 70,
    "pp": 10,
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
    "effect": function () {
        modifyStatus("tox", 1);
    }
}, {
    "name": "transform",
    "type": "normal",
    "category": "",
    "power": 0,
    "acc": Infinity,
    "pp": 10
}, {
    "name": "tri attack",
    "type": "normal",
    "category": "physical",
    "power": 80,
    "acc": 100,
    "pp": 10
    //No additional effect.
}, {
    "name": "twineedle",
    "type": "bug",
    "category": "physical",
    "power": 25,
    "acc": 100,
    "pp": 20,
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
    "pp": 30
    //No additional effect.
}, {
    "name": "vine whip",
    "type": "grass",
    "category": "special",
    "power": 35,
    "acc": 100,
    "pp": 10
    //No additional effect.
}, {
    "name": "water gun",
    "type": "water",
    "category": "special",
    "power": 40,
    "acc": 100,
    "pp": 25
    //No additional effect.
}, {
    "name": "waterfall",
    "type": "water",
    "category": "special",
    "power": 80,
    "acc": 100,
    "pp": 15
    //No additional effect.
}, {
    "name": "whirlwind",
    "type": "normal",
    "category": "status",
    "power": 0,
    "acc": 85,
    "pp": 20
    //No competitive use.
}, {
    "name": "wing attack",
    "type": "flying",
    "category": "physical",
    "power": 35,
    "acc": 100,
    "pp": 35
    //No additional effect.
}, {
    "name": "withdraw",
    "type": "water",
    "category": "status",
    "power": 0,
    "acc": Infinity,
    "pp": 40,
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
    "effect": function (e) {
        let num = Math.random();
        if (num < 3 / 8) setUncontrollable("wrap", 1);
        else if (num < 6 / 8) setUncontrollable("wrap", 2);
        else if (num < 7 / 8) setUncontrollable("wrap", 3);
        else setUncontrollable("wrap", 4);
    }
}]
let pokemon = [{
    "name": "abra",
    "type": ["psychic"],
    "hp": 25,
    "atk": 20,
    "def": 15,
    "sp": 105,
    "spe": 90
}, {
    "name": "aerodactyl",
    "type": ["rock", "flying"],
    "hp": 80,
    "atk": 105,
    "def": 65,
    "sp": 60,
    "spe": 130
}, {
    "name": "alakazam",
    "type": ["psychic"],
    "hp": 55,
    "atk": 50,
    "def": 45,
    "sp": 135,
    "spe": 120
}, {
    "name": "arbok",
    "type": ["poison"],
    "hp": 60,
    "atk": 85,
    "def": 69,
    "sp": 65,
    "spe": 80
}, {
    "name": "arcanine",
    "type": ["fire"],
    "hp": 90,
    "atk": 110,
    "def": 80,
    "sp": 80,
    "spe": 95
}, {
    "name": "articuno",
    "type": ["ice", "flying"],
    "hp": 90,
    "atk": 85,
    "def": 100,
    "sp": 125,
    "spe": 85
}, {
    "name": "beedrill",
    "type": ["bug", "poison"],
    "hp": 65,
    "atk": 80,
    "def": 40,
    "sp": 45,
    "spe": 75
}, {
    "name": "bellsprout",
    "type": ["grass", "poison"],
    "hp": 50,
    "atk": 75,
    "def": 35,
    "sp": 70,
    "spe": 40
}, {
    "name": "blastoise",
    "type": ["water"],
    "hp": 79,
    "atk": 83,
    "def": 100,
    "sp": 85,
    "spe": 78
}, {
    "name": "bulbasaur",
    "type": ["grass", "poison"],
    "hp": 45,
    "atk": 49,
    "def": 49,
    "sp": 65,
    "spe": 45
}, {
    "name": "butterfree",
    "type": ["bug", "flying"],
    "hp": 60,
    "atk": 45,
    "def": 50,
    "sp": 80,
    "spe": 70
}, {
    "name": "caterpie",
    "type": ["bug"],
    "hp": 45,
    "atk": 30,
    "def": 35,
    "sp": 20,
    "spe": 45
}, {
    "name": "chansey",
    "type": ["normal"],
    "hp": 250,
    "atk": 5,
    "def": 5,
    "sp": 105,
    "spe": 50
}, {
    "name": "charizard",
    "type": ["fire", "flying"],
    "hp": 78,
    "atk": 84,
    "def": 78,
    "sp": 85,
    "spe": 100
}, {
    "name": "charmander",
    "type": ["fire"],
    "hp": 39,
    "atk": 52,
    "def": 43,
    "sp": 50,
    "spe": 65
}, {
    "name": "charmeleon",
    "type": ["fire"],
    "hp": 58,
    "atk": 64,
    "def": 58,
    "sp": 65,
    "spe": 80
}, {
    "name": "clefable",
    "type": ["normal"],
    "hp": 95,
    "atk": 70,
    "def": 73,
    "sp": 85,
    "spe": 60
}, {
    "name": "clefairy",
    "type": ["normal"],
    "hp": 70,
    "atk": 45,
    "def": 48,
    "sp": 60,
    "spe": 35
}, {
    "name": "cloyster",
    "type": ["water", "ice"],
    "hp": 50,
    "atk": 95,
    "def": 180,
    "sp": 85,
    "spe": 70
}, {
    "name": "cubone",
    "type": ["ground"],
    "hp": 50,
    "atk": 50,
    "def": 95,
    "sp": 40,
    "spe": 35
}, {
    "name": "dewgong",
    "type": ["water", "ice"],
    "hp": 90,
    "atk": 70,
    "def": 80,
    "sp": 95,
    "spe": 70
}, {
    "name": "diglett",
    "type": ["ground"],
    "hp": 10,
    "atk": 55,
    "def": 25,
    "sp": 45,
    "spe": 95
}, {
    "name": "ditto",
    "type": ["normal"],
    "hp": 48,
    "atk": 48,
    "def": 48,
    "sp": 48,
    "spe": 48
}, {
    "name": "dodrio",
    "type": ["normal", "flying"],
    "hp": 60,
    "atk": 110,
    "def": 70,
    "sp": 60,
    "spe": 100
}, {
    "name": "doduo",
    "type": ["normal", "flying"],
    "hp": 35,
    "atk": 85,
    "def": 45,
    "sp": 35,
    "spe": 75
}, {
    "name": "dragonair",
    "type": ["dragon"],
    "hp": 61,
    "atk": 84,
    "def": 65,
    "sp": 70,
    "spe": 70
}, {
    "name": "dragonite",
    "type": ["dragon", "flying"],
    "hp": 91,
    "atk": 134,
    "def": 95,
    "sp": 100,
    "spe": 80
}, {
    "name": "dratini",
    "type": ["dragon"],
    "hp": 41,
    "atk": 64,
    "def": 45,
    "sp": 50,
    "spe": 50
}, {
    "name": "drowzee",
    "type": ["psychic"],
    "hp": 60,
    "atk": 48,
    "def": 45,
    "sp": 90,
    "spe": 42
}, {
    "name": "dugtrio",
    "type": ["ground"],
    "hp": 35,
    "atk": 80,
    "def": 50,
    "sp": 70,
    "spe": 120
}, {
    "name": "eevee",
    "type": ["normal"],
    "hp": 55,
    "atk": 55,
    "def": 50,
    "sp": 65,
    "spe": 55
}, {
    "name": "ekans",
    "type": ["poison"],
    "hp": 35,
    "atk": 60,
    "def": 44,
    "sp": 40,
    "spe": 55
}, {
    "name": "electabuzz",
    "type": ["electric"],
    "hp": 65,
    "atk": 83,
    "def": 57,
    "sp": 85,
    "spe": 105
}, {
    "name": "electrode",
    "type": ["electric"],
    "hp": 60,
    "atk": 50,
    "def": 70,
    "sp": 80,
    "spe": 140
}, {
    "name": "exeggcute",
    "type": ["grass", "psychic"],
    "hp": 60,
    "atk": 40,
    "def": 80,
    "sp": 60,
    "spe": 40
}, {
    "name": "exeggutor",
    "type": ["grass", "psychic"],
    "hp": 95,
    "atk": 95,
    "def": 85,
    "sp": 125,
    "spe": 55
}, {
    "name": "farfetch'd",
    "type": ["normal", "flying"],
    "hp": 52,
    "atk": 65,
    "def": 55,
    "sp": 58,
    "spe": 60
}, {
    "name": "fearow",
    "type": ["normal", "flying"],
    "hp": 65,
    "atk": 90,
    "def": 65,
    "sp": 61,
    "spe": 100
}, {
    "name": "flareon",
    "type": ["fire"],
    "hp": 65,
    "atk": 130,
    "def": 60,
    "sp": 110,
    "spe": 65
}, {
    "name": "gastly",
    "type": ["ghost", "poison"],
    "hp": 30,
    "atk": 35,
    "def": 30,
    "sp": 100,
    "spe": 80
}, {
    "name": "gengar",
    "type": ["ghost", "poison"],
    "hp": 60,
    "atk": 65,
    "def": 60,
    "sp": 130,
    "spe": 110
}, {
    "name": "geodude",
    "type": ["rock", "ground"],
    "hp": 40,
    "atk": 80,
    "def": 100,
    "sp": 30,
    "spe": 20
}, {
    "name": "gloom",
    "type": ["grass", "poison"],
    "hp": 60,
    "atk": 65,
    "def": 70,
    "sp": 85,
    "spe": 40
}, {
    "name": "golbat",
    "type": ["poison", "flying"],
    "hp": 75,
    "atk": 80,
    "def": 70,
    "sp": 75,
    "spe": 90
}, {
    "name": "goldeen",
    "type": ["water"],
    "hp": 45,
    "atk": 67,
    "def": 60,
    "sp": 50,
    "spe": 63
}, {
    "name": "golduck",
    "type": ["water"],
    "hp": 80,
    "atk": 82,
    "def": 78,
    "sp": 80,
    "spe": 85
}, {
    "name": "golem",
    "type": ["rock", "ground"],
    "hp": 80,
    "atk": 110,
    "def": 130,
    "sp": 55,
    "spe": 45
}, {
    "name": "graveler",
    "type": ["rock", "ground"],
    "hp": 55,
    "atk": 95,
    "def": 115,
    "sp": 45,
    "spe": 35
}, {
    "name": "grimer",
    "type": ["poison"],
    "hp": 80,
    "atk": 80,
    "def": 50,
    "sp": 40,
    "spe": 25
}, {
    "name": "growlithe",
    "type": ["fire"],
    "hp": 55,
    "atk": 70,
    "def": 45,
    "sp": 50,
    "spe": 60
}, {
    "name": "gyarados",
    "type": ["water", "flying"],
    "hp": 95,
    "atk": 125,
    "def": 79,
    "sp": 100,
    "spe": 81
}, {
    "name": "haunter",
    "type": ["ghost", "poison"],
    "hp": 45,
    "atk": 50,
    "def": 45,
    "sp": 115,
    "spe": 95
}, {
    "name": "hitmonchan",
    "type": ["fighting"],
    "hp": 50,
    "atk": 105,
    "def": 79,
    "sp": 35,
    "spe": 76
}, {
    "name": "hitmonlee",
    "type": ["fighting"],
    "hp": 50,
    "atk": 120,
    "def": 53,
    "sp": 35,
    "spe": 87
}, {
    "name": "horsea",
    "type": ["water"],
    "hp": 30,
    "atk": 40,
    "def": 70,
    "sp": 70,
    "spe": 60
}, {
    "name": "hypno",
    "type": ["psychic"],
    "hp": 85,
    "atk": 73,
    "def": 70,
    "sp": 115,
    "spe": 67
}, {
    "name": "ivysaur",
    "type": ["grass", "poison"],
    "hp": 60,
    "atk": 62,
    "def": 63,
    "sp": 80,
    "spe": 60
}, {
    "name": "jigglypuff",
    "type": ["normal"],
    "hp": 115,
    "atk": 45,
    "def": 20,
    "sp": 25,
    "spe": 20
}, {
    "name": "jolteon",
    "type": ["electric"],
    "hp": 65,
    "atk": 65,
    "def": 60,
    "sp": 110,
    "spe": 130
}, {
    "name": "jynx",
    "type": ["ice", "psychic"],
    "hp": 65,
    "atk": 50,
    "def": 35,
    "sp": 95,
    "spe": 95
}, {
    "name": "kabuto",
    "type": ["rock", "water"],
    "hp": 30,
    "atk": 80,
    "def": 90,
    "sp": 45,
    "spe": 55
}, {
    "name": "kabutops",
    "type": ["rock", "water"],
    "hp": 60,
    "atk": 115,
    "def": 105,
    "sp": 70,
    "spe": 80
}, {
    "name": "kadabra",
    "type": ["psychic"],
    "hp": 40,
    "atk": 35,
    "def": 30,
    "sp": 120,
    "spe": 105
}, {
    "name": "kakuna",
    "type": ["bug", "poison"],
    "hp": 45,
    "atk": 25,
    "def": 50,
    "sp": 25,
    "spe": 35
}, {
    "name": "kangaskhan",
    "type": ["normal"],
    "hp": 105,
    "atk": 95,
    "def": 80,
    "sp": 40,
    "spe": 90
}, {
    "name": "kingler",
    "type": ["water"],
    "hp": 55,
    "atk": 130,
    "def": 115,
    "sp": 50,
    "spe": 75
}, {
    "name": "koffing",
    "type": ["poison"],
    "hp": 40,
    "atk": 65,
    "def": 95,
    "sp": 60,
    "spe": 35
}, {
    "name": "krabby",
    "type": ["water"],
    "hp": 30,
    "atk": 105,
    "def": 90,
    "sp": 25,
    "spe": 50
}, {
    "name": "lapras",
    "type": ["water", "ice"],
    "hp": 130,
    "atk": 85,
    "def": 80,
    "sp": 95,
    "spe": 60
}, {
    "name": "lickitung",
    "type": ["normal"],
    "hp": 90,
    "atk": 55,
    "def": 75,
    "sp": 60,
    "spe": 30
}, {
    "name": "machamp",
    "type": ["fighting"],
    "hp": 90,
    "atk": 130,
    "def": 80,
    "sp": 65,
    "spe": 55
}, {
    "name": "machoke",
    "type": ["fighting"],
    "hp": 80,
    "atk": 100,
    "def": 70,
    "sp": 50,
    "spe": 45
}, {
    "name": "machop",
    "type": ["fighting"],
    "hp": 70,
    "atk": 80,
    "def": 50,
    "sp": 35,
    "spe": 35
}, {
    "name": "magikarp",
    "type": ["water"],
    "hp": 20,
    "atk": 10,
    "def": 55,
    "sp": 20,
    "spe": 80
}, {
    "name": "magmar",
    "type": ["fire"],
    "hp": 65,
    "atk": 95,
    "def": 57,
    "sp": 85,
    "spe": 93
}, {
    "name": "magnemite",
    "type": ["electric"],
    "hp": 25,
    "atk": 35,
    "def": 70,
    "sp": 95,
    "spe": 45
}, {
    "name": "magneton",
    "type": ["electric"],
    "hp": 50,
    "atk": 60,
    "def": 95,
    "sp": 120,
    "spe": 70
}, {
    "name": "mankey",
    "type": ["fighting"],
    "hp": 40,
    "atk": 80,
    "def": 35,
    "sp": 35,
    "spe": 70
}, {
    "name": "marowak",
    "type": ["ground"],
    "hp": 60,
    "atk": 80,
    "def": 110,
    "sp": 50,
    "spe": 45
}, {
    "name": "meowth",
    "type": ["normal"],
    "hp": 40,
    "atk": 45,
    "def": 35,
    "sp": 40,
    "spe": 90
}, {
    "name": "metapod",
    "type": ["bug"],
    "hp": 50,
    "atk": 20,
    "def": 55,
    "sp": 25,
    "spe": 30
}, {
    "name": "mew",
    "type": ["psychic"],
    "hp": 100,
    "atk": 100,
    "def": 100,
    "sp": 100,
    "spe": 100
}, {
    "name": "mewtwo",
    "type": ["psychic"],
    "hp": 106,
    "atk": 110,
    "def": 90,
    "sp": 154,
    "spe": 130
}, {
    "name": "moltres",
    "type": ["fire", "flying"],
    "hp": 90,
    "atk": 100,
    "def": 90,
    "sp": 125,
    "spe": 90
}, {
    "name": "mr. mime",
    "type": ["psychic"],
    "hp": 40,
    "atk": 45,
    "def": 65,
    "sp": 100,
    "spe": 90
}, {
    "name": "muk",
    "type": ["poison"],
    "hp": 105,
    "atk": 105,
    "def": 75,
    "sp": 65,
    "spe": 50
}, {
    "name": "nidoking",
    "type": ["poison", "ground"],
    "hp": 81,
    "atk": 92,
    "def": 77,
    "sp": 75,
    "spe": 85
}, {
    "name": "nidoqueen",
    "type": ["poison", "ground"],
    "hp": 90,
    "atk": 82,
    "def": 87,
    "sp": 75,
    "spe": 76
}, {
    "name": "nidoran-f",
    "type": ["poison"],
    "hp": 55,
    "atk": 47,
    "def": 52,
    "sp": 40,
    "spe": 41
}, {
    "name": "nidoran-m",
    "type": ["poison"],
    "hp": 46,
    "atk": 57,
    "def": 40,
    "sp": 40,
    "spe": 50
}, {
    "name": "nidorina",
    "type": ["poison"],
    "hp": 70,
    "atk": 62,
    "def": 67,
    "sp": 55,
    "spe": 56
}, {
    "name": "nidorino",
    "type": ["poison"],
    "hp": 61,
    "atk": 72,
    "def": 57,
    "sp": 55,
    "spe": 65
}, {
    "name": "ninetales",
    "type": ["fire"],
    "hp": 73,
    "atk": 76,
    "def": 75,
    "sp": 100,
    "spe": 100
}, {
    "name": "oddish",
    "type": ["grass", "poison"],
    "hp": 45,
    "atk": 50,
    "def": 55,
    "sp": 75,
    "spe": 30
}, {
    "name": "omanyte",
    "type": ["rock", "water"],
    "hp": 35,
    "atk": 40,
    "def": 100,
    "sp": 90,
    "spe": 35
}, {
    "name": "omastar",
    "type": ["rock", "water"],
    "hp": 70,
    "atk": 60,
    "def": 125,
    "sp": 115,
    "spe": 55
}, {
    "name": "onix",
    "type": ["rock", "ground"],
    "hp": 35,
    "atk": 45,
    "def": 160,
    "sp": 30,
    "spe": 70
}, {
    "name": "paras",
    "type": ["bug", "grass"],
    "hp": 35,
    "atk": 70,
    "def": 55,
    "sp": 55,
    "spe": 25
}, {
    "name": "parasect",
    "type": ["bug", "grass"],
    "hp": 60,
    "atk": 95,
    "def": 80,
    "sp": 80,
    "spe": 30
}, {
    "name": "persian",
    "type": ["normal"],
    "hp": 65,
    "atk": 70,
    "def": 60,
    "sp": 65,
    "spe": 115
}, {
    "name": "pidgeot",
    "type": ["normal", "flying"],
    "hp": 83,
    "atk": 80,
    "def": 75,
    "sp": 70,
    "spe": 91
}, {
    "name": "pidgeotto",
    "type": ["normal", "flying"],
    "hp": 63,
    "atk": 60,
    "def": 55,
    "sp": 50,
    "spe": 71
}, {
    "name": "pidgey",
    "type": ["normal", "flying"],
    "hp": 40,
    "atk": 45,
    "def": 40,
    "sp": 35,
    "spe": 56
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
    "spe": 85
}, {
    "name": "poliwag",
    "type": ["water"],
    "hp": 40,
    "atk": 50,
    "def": 40,
    "sp": 40,
    "spe": 90
}, {
    "name": "poliwhirl",
    "type": ["water"],
    "hp": 65,
    "atk": 65,
    "def": 65,
    "sp": 50,
    "spe": 90
}, {
    "name": "poliwrath",
    "type": ["water", "fighting"],
    "hp": 90,
    "atk": 85,
    "def": 95,
    "sp": 70,
    "spe": 70
}, {
    "name": "ponyta",
    "type": ["fire"],
    "hp": 50,
    "atk": 85,
    "def": 55,
    "sp": 65,
    "spe": 90
}, {
    "name": "porygon",
    "type": ["normal"],
    "hp": 65,
    "atk": 60,
    "def": 70,
    "sp": 75,
    "spe": 40
}, {
    "name": "primeape",
    "type": ["fighting"],
    "hp": 65,
    "atk": 105,
    "def": 60,
    "sp": 60,
    "spe": 95
}, {
    "name": "psyduck",
    "type": ["water"],
    "hp": 50,
    "atk": 52,
    "def": 48,
    "sp": 50,
    "spe": 55
}, {
    "name": "raichu",
    "type": ["electric"],
    "hp": 60,
    "atk": 90,
    "def": 55,
    "sp": 90,
    "spe": 100
}, {
    "name": "rapidash",
    "type": ["fire"],
    "hp": 65,
    "atk": 100,
    "def": 70,
    "sp": 80,
    "spe": 105
}, {
    "name": "raticate",
    "type": ["normal"],
    "hp": 55,
    "atk": 81,
    "def": 60,
    "sp": 50,
    "spe": 97
}, {
    "name": "rattata",
    "type": ["normal"],
    "hp": 30,
    "atk": 56,
    "def": 35,
    "sp": 25,
    "spe": 72
}, {
    "name": "rhydon",
    "type": ["ground", "rock"],
    "hp": 105,
    "atk": 130,
    "def": 120,
    "sp": 45,
    "spe": 40
}, {
    "name": "rhyhorn",
    "type": ["ground", "rock"],
    "hp": 80,
    "atk": 85,
    "def": 95,
    "sp": 30,
    "spe": 25
}, {
    "name": "sandshrew",
    "type": ["ground"],
    "hp": 50,
    "atk": 75,
    "def": 85,
    "sp": 30,
    "spe": 40
}, {
    "name": "sandslash",
    "type": ["ground"],
    "hp": 75,
    "atk": 100,
    "def": 110,
    "sp": 55,
    "spe": 65
}, {
    "name": "scyther",
    "type": ["bug", "flying"],
    "hp": 70,
    "atk": 110,
    "def": 80,
    "sp": 55,
    "spe": 105
}, {
    "name": "seadra",
    "type": ["water"],
    "hp": 55,
    "atk": 65,
    "def": 95,
    "sp": 95,
    "spe": 85
}, {
    "name": "seaking",
    "type": ["water"],
    "hp": 80,
    "atk": 92,
    "def": 65,
    "sp": 80,
    "spe": 68
}, {
    "name": "seel",
    "type": ["water"],
    "hp": 65,
    "atk": 45,
    "def": 55,
    "sp": 70,
    "spe": 45
}, {
    "name": "shellder",
    "type": ["water"],
    "hp": 30,
    "atk": 65,
    "def": 100,
    "sp": 45,
    "spe": 40
}, {
    "name": "slowbro",
    "type": ["water", "psychic"],
    "hp": 95,
    "atk": 75,
    "def": 110,
    "sp": 80,
    "spe": 30
}, {
    "name": "slowpoke",
    "type": ["water", "psychic"],
    "hp": 90,
    "atk": 65,
    "def": 65,
    "sp": 40,
    "spe": 15
}, {
    "name": "snorlax",
    "type": ["normal"],
    "hp": 160,
    "atk": 110,
    "def": 65,
    "sp": 65,
    "spe": 30
}, {
    "name": "spearow",
    "type": ["normal", "flying"],
    "hp": 40,
    "atk": 60,
    "def": 30,
    "sp": 31,
    "spe": 70
}, {
    "name": "squirtle",
    "type": ["water"],
    "hp": 44,
    "atk": 48,
    "def": 65,
    "sp": 50,
    "spe": 43
}, {
    "name": "starmie",
    "type": ["water", "psychic"],
    "hp": 60,
    "atk": 75,
    "def": 85,
    "sp": 100,
    "spe": 115
}, {
    "name": "staryu",
    "type": ["water"],
    "hp": 30,
    "atk": 45,
    "def": 55,
    "sp": 70,
    "spe": 85
}, {
    "name": "tangela",
    "type": ["grass"],
    "hp": 65,
    "atk": 55,
    "def": 115,
    "sp": 100,
    "spe": 60
}, {
    "name": "tauros",
    "type": ["normal"],
    "hp": 75,
    "atk": 100,
    "def": 95,
    "sp": 70,
    "spe": 110
}, {
    "name": "tentacool",
    "type": ["water", "poison"],
    "hp": 40,
    "atk": 40,
    "def": 35,
    "sp": 100,
    "spe": 70
}, {
    "name": "tentacruel",
    "type": ["water", "poison"],
    "hp": 80,
    "atk": 70,
    "def": 65,
    "sp": 120,
    "spe": 100
}, {
    "name": "vaporeon",
    "type": ["water"],
    "hp": 130,
    "atk": 65,
    "def": 60,
    "sp": 110,
    "spe": 65
}, {
    "name": "venomoth",
    "type": ["bug", "poison"],
    "hp": 70,
    "atk": 65,
    "def": 60,
    "sp": 90,
    "spe": 90
}, {
    "name": "venonat",
    "type": ["bug", "poison"],
    "hp": 60,
    "atk": 55,
    "def": 50,
    "sp": 40,
    "spe": 45
}, {
    "name": "venusaur",
    "type": ["grass", "poison"],
    "hp": 80,
    "atk": 82,
    "def": 83,
    "sp": 100,
    "spe": 80
}, {
    "name": "victreebel",
    "type": ["grass", "poison"],
    "hp": 80,
    "atk": 105,
    "def": 65,
    "sp": 100,
    "spe": 70
}, {
    "name": "vileplume",
    "type": ["grass", "poison"],
    "hp": 75,
    "atk": 80,
    "def": 85,
    "sp": 100,
    "spe": 50
}, {
    "name": "voltorb",
    "type": ["electric"],
    "hp": 40,
    "atk": 30,
    "def": 50,
    "sp": 55,
    "spe": 100
}, {
    "name": "vulpix",
    "type": ["fire"],
    "hp": 38,
    "atk": 41,
    "def": 40,
    "sp": 65,
    "spe": 65
}, {
    "name": "wartortle",
    "type": ["water"],
    "hp": 59,
    "atk": 63,
    "def": 80,
    "sp": 65,
    "spe": 58
}, {
    "name": "weedle",
    "type": ["bug", "poison"],
    "hp": 40,
    "atk": 35,
    "def": 30,
    "sp": 20,
    "spe": 50
}, {
    "name": "weepinbell",
    "type": ["grass", "poison"],
    "hp": 65,
    "atk": 90,
    "def": 50,
    "sp": 85,
    "spe": 55
}, {
    "name": "weezing",
    "type": ["poison"],
    "hp": 65,
    "atk": 90,
    "def": 120,
    "sp": 85,
    "spe": 60
}, {
    "name": "wigglytuff",
    "type": ["normal"],
    "hp": 140,
    "atk": 70,
    "def": 45,
    "sp": 50,
    "spe": 45
}, {
    "name": "zapdos",
    "type": ["electric", "flying"],
    "hp": 90,
    "atk": 90,
    "def": 85,
    "sp": 125,
    "spe": 100
}, {
    "name": "zubat",
    "type": ["poison", "flying"],
    "hp": 40,
    "atk": 45,
    "def": 35,
    "sp": 40,
    "spe": 55
}]
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
}