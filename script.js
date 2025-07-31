let players = [{
    "name": "Player 1",
    "build": [{
        "name": "zapdos",
        "moves": ["thunder wave", "drill peck", "thunderbolt", "agility"]
    }, {
        "name": "slowbro",
        "moves": ["amnesia", "surf", "thunder wave", "rest"]
    }, {
        "name": "rhydon",
        "moves": ["earthquake", "body slam", "rock slide", "substitute"]
    }, {
        "name": "mewtwo",
        "moves": ["blizzard", "thunder wave", "psychic", "self-destruct"]
    }, {
        "name": "exeggutor",
        "moves": ["sleep powder", "psychic", "explosion", "double-edge"]
    }, {
        "name": "mew",
        "moves": ["psychic", "explosion", "swords dance", "earthquake"]
    }]
}, {
    "name": "Player 2",
    "build": [{
        "name": "alakazam",
        "moves": ["psychic", "seismic toss", "thunder wave", "recover"]
    }, {
        "name": "mewtwo",
        "moves": ["recover", "thunderbolt", "amnesia", "psychic"]
    }, {
        "name": "rhydon",
        "moves": ["earthquake", "body slam", "rock slide", "substitute"]
    }, {
        "name": "exeggutor",
        "moves": ["sleep powder", "stun spore", "psychic", "explosion"]
    }, {
        "name": "mew",
        "moves": ["swords dance", "earthquake", "body slam", "soft-boiled"]
    }, {
        "name": "slowbro",
        "moves": ["thunder wave", "amnesia", "surf", "rest"]
    }]
}];
document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[0].name + ".png')";
document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[0].name + ".png')";
document.getElementById("p1Name").innerText = capitalize(players[0].build[0].name);
document.getElementById("p2Name").innerText = capitalize(players[1].build[0].name);
function setUncontrollable(move, turns) {
    getPkmn(true).uncontrollable = {
        move: move,
        turns: turns
    };
}
function setDelay(isSelf, func, turns) {
    getPkmn(isSelf).delay.push({
        "effect": func,
        "turns": turns
    });
}
function render() {
    if (battleInfo[0].currentPokemon != -1) document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[battleInfo[0].currentPokemon].name + ".png')";
    if (battleInfo[1].currentPokemon != -1) document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[battleInfo[1].currentPokemon].name + ".png')";
    if (battleInfo[0].currentPokemon != -1) document.getElementById("p1Name").innerText = capitalize(players[0].build[battleInfo[0].currentPokemon].name);
    if (battleInfo[1].currentPokemon != -1) document.getElementById("p2Name").innerText = capitalize(players[1].build[battleInfo[1].currentPokemon].name);
}
function capitalize(str) {
    let temp = str.split(" ");
    for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
    }
    temp = temp.join(" ");
    temp = temp.split("-");
    for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
    }
    temp = temp.join("-");
    return temp;
}
for (let i of pokemon) {
    let div = document.createElement("div");
    div.classList.add("listButton");
    div.innerHTML = capitalize(i.name);
    div.addEventListener("click", function () {
        document.querySelector(".pokemon-select.selected").innerText = capitalize(i.name);
        players[Number(document.querySelector(".pokemon-select.selected").dataset.player) - 1].build[Number(document.querySelector(".pokemon-select.selected").dataset.no) - 1].name = i.name;
    });
    document.getElementById("pokemonList").appendChild(div);
}
for (let i of moves) {
    let div = document.createElement("div");
    div.classList.add("listButton");
    div.innerHTML = capitalize(i.name);
    div.addEventListener("click", function () {
        document.querySelector(".move-select.selected").innerText = capitalize(i.name);
        players[Number(document.querySelector(".move-select.selected").dataset.player) - 1].build[Number(document.querySelector(
            ".move-select.selected").dataset.no) - 1].moves[Number(document.querySelector(".move-select.selected").dataset.moveNo) - 1] = i.name;
    });
    document.getElementById("movesList").appendChild(div);
}
for (let i of document.getElementsByClassName("pokemon-select")) {
    i.addEventListener("click", function () {
        document.querySelector(".select.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.querySelector(".list.show")?.classList.remove("show");
        document.getElementById("pokemonList").classList.add("show");
    });
}
for (let i of document.getElementsByClassName("move-select")) {
    i.addEventListener("click", function () {
        document.querySelector(".select.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.querySelector(".list.show")?.classList.remove("show");
        document.getElementById("movesList").classList.add("show");
    });
}
function calculateDmg(power, atk, def, attackType, defenseType) {
    let effectiveness = calculateEffectiveness(attackType, defenseType);
    return Math.max(effectiveness * (power + atk - def), 0);
}
function calculateEffectiveness(attackType, defenseType) {
    let effectiveness = 1;
    if (!attackType) return effectiveness;
    for (let i of defenseType) {
        effectiveness *= multiplier[attackType][i];
    }
    return effectiveness;
}
function refreshDecision() {
    if (battleInfo[playerToMove].currentPokemon != -1 && getPkmn(true).uncontrollable.turns == 0 && (!getPkmn(false) || getPkmn(false).uncontrollable.turns == 0)) {
        for (let i = 0; i < 4; i++) {
            if (Object.values(getPkmn(true).moves)[i] <= 0 || (getPkmn(true).uncontrollable.move && getPkmn(true).uncontrollable
                .move != Object.keys(getPkmn(true).moves)[i]) || (getPkmn(true).disable.move == Object.keys(getPkmn(true)
                    .moves)[i])) document.getElementsByClassName("decisionMove")[i].disabled = "disabled";//?
            else document.getElementsByClassName("decisionMove")[i].disabled = "";
            if (Object.keys(getPkmn(true).moves)[i] == "mimic" && getPkmn(true).mimicMove) document.getElementsByClassName("decisionMove")[i].innerHTML = capitalize(getPkmn(true).mimicMove);
            else document.getElementsByClassName("decisionMove")[i].innerHTML = capitalize(Object.keys(getPkmn(true).moves)[i]);
            let div = document.createElement("div");
            div.classList.add("pp");
            div.innerHTML = Object.values(getPkmn(true).moves)[i];
            let span = document.createElement("span");
            span.classList.add("sub");
            span.innerText = "/" + getMoveStats(Object.keys(getPkmn(true).moves)[i]).pp;
            div.appendChild(span);
            document.getElementsByClassName("decisionMove")[i].appendChild(div);
            if (Object.keys(getPkmn(true).moves)[i] == "mimic" && getPkmn(true).mimicMove) document.getElementsByClassName("decisionMove")[i].dataset.for = getPkmn(true).mimicMove;
            else document.getElementsByClassName("decisionMove")[i].dataset.for = Object.keys(getPkmn(true).moves)[i];
        }
    } else if (battleInfo[playerToMove].currentPokemon != -1) {
        document.getElementsByClassName("decisionMove")[0].disabled = "";
        document.getElementsByClassName("decisionMove")[0].innerText = "Pass";
        for (let i = 1; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "disabled";
            document.getElementsByClassName("decisionMove")[i].innerText = "-";
        }
    } else {
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "disabled";
        }
    }
    for (let i = 0; i < 6; i++) {
        document.getElementsByClassName("decisionSwitch")[i].innerText = capitalize(players[playerToMove].build[i].name);
        document.getElementsByClassName("decisionSwitch")[i].classList.remove("selected");
        if (battleInfo[playerToMove].build[i].hp == 0) document.getElementsByClassName("decisionSwitch")[i].disabled = "disabled";
        else if (battleInfo[playerToMove].currentPokemon == i) {
            document.getElementsByClassName("decisionSwitch")[i].disabled = "disabled";
            document.getElementsByClassName("decisionSwitch")[i].classList.add("selected");
        } else document.getElementsByClassName("decisionSwitch")[i].disabled = "";
    }
}
let turn = 0, playerToMove = 0, battleInfo = [];
document.getElementById("startGame").addEventListener("click", function () {
    battleInfo = JSON.parse(JSON.stringify(players));
    battleInfo[0].currentPokemon = 0;
    battleInfo[1].currentPokemon = 0;
    for (let i of battleInfo) {
        for (let j of i.build) {
            for (let k of pokemon) {
                if (k.name == j.name) {
                    j.hp = Math.floor(0.01 * (2 * k.hp + 30 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
                    j.maxHp = Math.floor(0.01 * (2 * k.hp + 30 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
                    break;
                }
            }
            j.transformPkmn = "";
            j.mimicMove = "";
            j.atkStage = 0;
            j.defStage = 0;
            j.spStage = 0;
            j.speStage = 0;
            j.accStage = 0;
            j.evaStage = 0;
            j.critProbMultiplier = 1;
            j.status = "";
            j.charge = {
                move: "",
                turns: 0
            };
            j.uncontrollable = {
                move: "",
                turns: 0,
                isCrit: false
            };
            j.tempEffect = {
                "confused": 0,
                "semiInvulnerable": 0,
                "rage": 0,
                "reflect": 0,
                "light screen": 0,
                "mist": 0
            };
            j.delay = [];
            j.sleepTurns = 0;
            j.tempType = [];
            j.disable = {
                move: "",
                turns: 0
            };
            j.substituteHp = 0;
            j.dmgTaken = [];
            j.lastDmgTakenType = "";
            j.lastMoveUsed = "";
            let json = {};
            for (let k of j.moves) for (let l of moves) if (l.name == k) json[k] = l.pp;
            j.moves = json;
        }
    }
    nextTurn();
    refreshDecision();
});
function addMainText(str) {
    document.getElementById("text").innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = str;
    div.classList.add("main-text");
    document.getElementById("text").appendChild(div);
    let div2 = document.createElement("div");
    div2.innerHTML = str;
    div2.classList.add("main-text");
    document.getElementById("record").appendChild(div2);
}
function addSmallText(str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    div.classList.add("small-text");
    document.getElementById("text").appendChild(div);
    let div2 = document.createElement("div");
    div2.innerHTML = str;
    div2.classList.add("small-text");
    document.getElementById("record").appendChild(div2);
}
for (let i = 0; i < 6; i++) {
    document.getElementsByClassName("decisionSwitch")[i].addEventListener("click", function () {
        if (battleInfo[playerToMove].currentPokemon != -1) addMainText(capitalize(getPkmn(true).name) + ", come back!");
        addMainText("Go! <strong>" + document.getElementsByClassName("decisionSwitch")[i].innerText + "</strong>!");
        if (getPkmn(true)) {
            for (let j in getPkmn(true).tempEffect) {
                getPkmn(true).tempEffect[j] = 0;
            }
            getPkmn(true).mimicMove = "";
            getPkmn(true).tempType = [];
            getPkmn(true).uncontrollable = {
                move: "",
                turns: 0,
                isCrit: false
            };
        }
        battleInfo[playerToMove].currentPokemon = i;
        render();
        renderHP();
        nextPlayer();
        refreshDecision();
    });
}
let isNewTurn = false;
function dealDmg(isSelf, dmg) {
    if (arguments[2]?.opposingSubstitute && getPkmn(!isSelf).substituteHp > 0) {
        getPkmn(!isSelf).substituteHp -= Math.min(dmg, getPkmn(!isSelf).substituteHp);
    } else if (getPkmn(isSelf).substituteHp > 0 && !arguments[2]?.ignoreSubstitute) getPkmn(isSelf).substituteHp -= Math.min(dmg, getPkmn(isSelf).substituteHp);
    else {
        dmg = Math.min(dmg, getPkmn(isSelf).hp);
        getPkmn(isSelf).hp -= dmg;
        addSmallText("(" + capitalize(getPkmn(isSelf).name) + " lost " + (dmg / getPkmn(isSelf).maxHp * 100).toFixed(0) + "% of its health!)");
    }
}
function nextPlayer() {
    if (getPkmn(true)?.status == "psn") dealDmg(true, getPkmn(true).hp / 16, { ignoreSubstitute: true });
    else if (getPkmn(true)?.status == "tox") dealDmg(true, getPkmn(true).hp / 8, { ignoreSubstitute: true });
    if (getPkmn(true)?.tempEffect["leech seed"] > 0) {
        if (getPkmn(true).status == "tox") dealDmg(true, getPkmn(true).hp / 8, { ignoreSubstitute: true });
        else dealDmg(true, getPkmn(true).hp / 16, { ignoreSubstitute: true });
    }
    judgeHP();
    if (isNewTurn) {
        isNewTurn = false;
        playerToMove = (playerToMove == 0) ? 1 : 0;
    } else {
        nextTurn();
    }
    if (getPkmn(true)) {
        for (let i = 0; i < getPkmn(true).delay.length; i++) {
            if (getPkmn(true).delay[i].turns > 0) getPkmn(true).delay[i].turns--;
            else {
                getPkmn(true).delay[i].effect();
                getPkmn(true).delay.splice(i, 1);
                i--;
            }
        }
        if (getPkmn(true).disable.turns > 0) getPkmn(true).delay[i].turns--;
        else {
            getPkmn(true).disable.move = "";
        }
    }
    if (getPkmn(true)?.status == "par" && Math.random() < 1 / 4) {
        addMainText(capitalize(getPkmn(true).name) + " is paralyzed! It can't move!");
        nextPlayer();
    } else if (getPkmn(true)?.charge.turns > 0) {
        getPkmn(true).charge.turns--;
        if (getPkmn(true).charge.move && getPkmn(true).charge.turns == 0 && getPkmn(true).charge.move) {
            attack(getPkmn(true).charge.move);
            getPkmn(true).charge.move = "";
        } else {
            nextPlayer();
        }
    } else if (getPkmn(true)?.uncontrollable.turns > 0) {
        getPkmn(true).uncontrollable.turns--;
        if (getPkmn(true).uncontrollable.move && getPkmn(true).uncontrollable.turns == 0) {
            getPkmn(true).uncontrollable.move = "";
        }
    } else if (getPkmn(true)?.status == "slp") {
        getPkmn(true).sleepTurns--;
        if (getPkmn(true).sleepTurns > 0) {
            addMainText(capitalize(getPkmn(true).name) + " is fast asleep.");
        } else if (getPkmn(true).sleepTurns == 0) {
            addSmallText(capitalize(getPkmn(true).name) + " woke up!");
            getPkmn(true).status = "";
        }
        nextPlayer();
    } else if (getPkmn(true)?.tempEffect.confused > 0) {
        addSmallText(capitalize(getPkmn(true).name) + " is confused!");
        if (Math.random() < 0.5) {
            dealDmg(true, calculateDmg(40, getStats(getPkmn(true).name).atk, getDefense(true, true), "",
                getType(true)), { opposingSubstitute: true });
            addMainText("It hurt itself in confusion!");
        }
        getPkmn(true).tempEffect.confused--;
    }
}
function getDefense(isSelf, isCrit) {
    if (isCrit) return getStats(getPkmn(isSelf).name).def;
    else return getStats(getPkmn(isSelf).name).def * ((getPkmn(isSelf).tempEffect.reflect) ? 2 : 1);
}
function getSp(isSelf, isCrit) {
    if (isCrit) return getStats(getPkmn(isSelf).name).sp;
    else return getStats(getPkmn(isSelf).name).sp * ((getPkmn(isSelf).tempEffect["light screen"]) ? 2 : 1);
}
function nextTurn() {
    if (getPkmn(true)?.status == "brn") dealDmg(true, getPkmn(true).maxHp / 16, { ignoreSubstitute: true });
    if (getPkmn(false)?.status == "brn") dealDmg(false, getPkmn(false).maxHp / 16, { ignoreSubstitute: true });
    judgeHP();
    turn++;
    isNewTurn = true;
    document.getElementById("turnNumber").innerText = "Turn " + turn;
    let h2 = document.createElement("h2");
    h2.classList.add("turn-number");
    h2.innerText = "Turn " + turn;
    document.getElementById("record").appendChild(h2);
    if (battleInfo[1].currentPokemon == -1 && battleInfo[0].currentPokemon == -1) playerToMove = Math.round(Math.random());
    else if (battleInfo[1].currentPokemon == -1) playerToMove = 1;
    else if (battleInfo[0].currentPokemon == -1) playerToMove = 0;
    else {
        let p1Spe = getStats(battleInfo[0].build[battleInfo[0].currentPokemon].name).spe * STAGE_MULTIPLIER[battleInfo[0].build[battleInfo[0].currentPokemon].speStage] * ((battleInfo[0].build[battleInfo[0].currentPokemon].status == "par") ? 0.25 : 1);
        let p2Spe = getStats(battleInfo[1].build[battleInfo[1].currentPokemon].name).spe * STAGE_MULTIPLIER[battleInfo[1].build[battleInfo[1].currentPokemon].speStage] * ((battleInfo[1].build[battleInfo[1].currentPokemon].status == "par") ? 0.25 : 1);
        if (p1Spe > p2Spe) {
            playerToMove = 0;
        } else if (p1Spe < p2Spe) {
            playerToMove = 1;
        } else {
            playerToMove = Math.round(Math.random());
        }
    }
}
function getStats(name) {
    for (let i of pokemon) {
        if (i.name == name) return i;
    }
}
function getMoveStats(name) {
    for (let i of moves) {
        if (i.name == name) return i;
    }
}
function getPkmn(isSelf) {
    if (isSelf) return battleInfo[playerToMove].build[battleInfo[playerToMove].currentPokemon];
    else return battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon];
}
function getType(isSelf) {
    if (getPkmn(isSelf).tempType.length) return getPkmn(isSelf).tempType;
    else return getStats(getPkmn(isSelf).name).type;
}
function attack(move) {
    for (let k of moves) if (k.name == move) {
        let criticalHitRatioMultiplier = 1;
        let preCritEffect;
        if (k.preCritEffect) preCritEffect = k.preCritEffect();
        if (preCritEffect?.isHighCritRatio) criticalHitRatioMultiplier = 8;
        if (arguments[1]?.forceCrit) criticalHitRatioMultiplier = Infinity;
        let isCrit = (Math.random() < criticalHitRatioMultiplier * getPkmn(true).critProbMultiplier * getStats(getPkmn(true).name)
            .spe / 512);
        let dmg = 0, totalDmg = 0;
        if (k.category == "physical") dmg = calculateDmg(k.power, getStats(getPkmn(true).name).atk, getDefense(false, isCrit),
            k.type, getType(false));
        else dmg = calculateDmg(k.power, getSp(true, isCrit), getSp(false, isCrit), k.type, getType(false));
        if (k.category != "status") {
            switch (calculateEffectiveness(k.type, getType(false))) {
                case 4:
                case 2:
                    addSmallText("It's super effective!");
                    break;
                case 0.5:
                case 0.25:
                    addSmallText("It's not very effective...");
                    break;
                case 0:
                    addSmallText("It doesn't affect " + capitalize(getPkmn(false).name) + "...");
            }
            totalDmg += Math.min(dmg, getPkmn(false).hp);
            if (isCrit) {
                totalDmg += Math.min(dmg, getPkmn(false).hp);
                addSmallText("A critical hit!");
            }
            dealDmg(false, totalDmg);
            getPkmn(false).dmgTaken.push(totalDmg);
            getPkmn(false).lastDmgTakenType = k.type;
        }
        let effect;
        if (k.effect) effect = k.effect({ totalDmg: totalDmg });
        judgeHP();
        renderHP();
        if (getPkmn(true)) {
            getPkmn(true).moves[move]--;
            if (effect?.flinch) {
                nextTurn();
            }
            else nextPlayer();
        }
        refreshDecision();
    }
}
for (let i = 0; i < 4; i++) document.getElementsByClassName("decisionMove")[i].addEventListener("click", function () {
    /*if (getPkmn(true).mustPass) {

        nextPlayer();
        return;
    }*/
    if (getPkmn(true).uncontrollable.turns > 0) {
        attack(getPkmn(true).uncontrollable.move);
        return;
    } else if (getPkmn(false).uncontrollable.turns > 0) {
        nextPlayer();
        return;
    }

    getPkmn(true).lastMoveUsed = document.getElementsByClassName("decisionMove")[i].dataset.for;

    addMainText(capitalize(players[playerToMove].build[battleInfo[playerToMove].currentPokemon].name) + " used <strong>" +
        capitalize(document.getElementsByClassName("decisionMove")[i].dataset.for) + "</strong>!");
    for (let k of moves) if (k.name == document.getElementsByClassName("decisionMove")[i].dataset.for) {
        if (k.category != "status" && Math.random() > k.acc * ACC_STAGE_MULTIPLIER[getPkmn(true).accStage] *
            ACC_STAGE_MULTIPLIER[getPkmn(false).evaStage] / 100) {
            addSmallText(capitalize(getPkmn(true).name) + "'s attack missed!");
            if (k.missEffect) k.missEffect();
            break;
        }
        let preDmgEffect = {};
        if (k.preDmgEffect) preDmgEffect = k.preDmgEffect();
        if (getPkmn(true).charge.turns > 0) {
            nextPlayer();
            refreshDecision();
            break;
        }
        if (getPkmn(false).tempEffect.semiInvulnerable > 0 && !preDmgEffect.nullifySemiInvulnerable) break;
        attack(k.name);
        if (getPkmn(false).tempEffect.rage > 0) modifyStats(false, "atk", 1, 1);
        break;
    }
});
function charge(move, turns) {
    getPkmn(true).charge = {
        move: move,
        turns: turns
    };
}
function repeatAttack(dmg, count) {
    for (let i = 0; i < count; i++) {
        dealDmg(false, dmg);
    }
    addSmallText("The Pokémon was hit " + (count + 1) + " times!");
}
function judgeHP() {
    if (getPkmn(false)?.hp <= 0) {
        getPkmn(false).hp = 0;
        if (playerToMove == 0) document.getElementById("p2Pokemon").style.backgroundImage = "none";
        else document.getElementById("p1Pokemon").style.backgroundImage = "none";
        addMainText(capitalize(getPkmn(false).name) + " fainted!");
        battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
    }
    if (getPkmn(true)?.hp <= 0) {
        getPkmn(true).hp = 0;
        if (playerToMove == 1) document.getElementById("p2Pokemon").style.backgroundImage = "none";
        else document.getElementById("p1Pokemon").style.backgroundImage = "none";
        addMainText(capitalize(getPkmn(true).name) + " fainted!");
        battleInfo[playerToMove].currentPokemon = -1;
    }
}
const STAGE_MULTIPLIER = {
    "-6": 2 / 8,
    "-5": 2 / 7,
    "-4": 2 / 6,
    "-3": 2 / 5,
    "-2": 2 / 4,
    "-1": 2 / 3,
    "0": 1,
    "1": 3 / 2,
    "2": 4 / 2,
    "3": 5 / 2,
    "4": 6 / 2,
    "5": 7 / 2,
    "6": 8 / 2
};
const ACC_STAGE_MULTIPLIER = {
    "-6": 9 / 3,
    "-5": 8 / 3,
    "-4": 7 / 3,
    "-3": 6 / 3,
    "-2": 5 / 3,
    "-1": 4 / 3,
    "0": 1,
    "1": 3 / 4,
    "2": 3 / 5,
    "3": 3 / 6,
    "4": 3 / 7,
    "5": 3 / 8,
    "6": 3 / 9
};
function renderHP() {
    if (battleInfo[0].currentPokemon == -1) {
        document.getElementById("p1Gauge").classList.add("hide");
    } else {
        document.getElementById("p1Gauge").classList.remove("hide");
    }
    if (battleInfo[1].currentPokemon == -1) {
        document.getElementById("p2Gauge").classList.add("hide");
    } else {
        document.getElementById("p2Gauge").classList.remove("hide");
    }
    for (let i of [0, 1]) {
        if (battleInfo[i].currentPokemon != -1) {
            let percentage = battleInfo[i].build[battleInfo[i].currentPokemon].hp / battleInfo[i].build[battleInfo[i].currentPokemon].maxHp * 100;
            document.getElementById(`p${i + 1}Bar`).style.width = percentage + "%";
            document.getElementById(`p${i + 1}Percentage`).innerText = percentage.toFixed(0) + "%";
            document.getElementById(`p${i + 1}Bar`).classList.remove("green", "yellow", "red");
            if (percentage >= 50) document.getElementById(`p${i + 1}Bar`).classList.add("green");
            else if (percentage >= 20) document.getElementById(`p${i + 1}Bar`).classList.add("yellow");
            else document.getElementById(`p${i + 1}Bar`).classList.add("red");
        }
    }
    document.getElementById("p1Status").innerHTML = "";
    document.getElementById("p2Status").innerHTML = "";
    let properties = ["atk", "def", "sp", "spe"];
    for (let i of properties) {
        if (battleInfo[0].currentPokemon != -1 && battleInfo[0].build[battleInfo[0].currentPokemon][i + "Stage"] != 0) {
            let span = document.createElement("span");
            if (battleInfo[0].build[battleInfo[0].currentPokemon][i + "Stage"] > 0) {
                span.classList.add("buff");
            } else {
                span.classList.add("debuff");
            }
            span.innerText = "[" + capitalize(i) + " x" + Number(STAGE_MULTIPLIER[battleInfo[0].build[battleInfo[0].currentPokemon][i + "Stage"]].toFixed(2)) + "]";
            document.getElementById("p1Status").appendChild(span);
        }
        if (battleInfo[1].currentPokemon != -1 && battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"] != 0) {
            let span = document.createElement("span");
            if (battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"] > 0) {
                span.classList.add("buff");
            } else {
                span.classList.add("debuff");
            }
            span.innerText = "[" + capitalize(i) + " x" + Number(STAGE_MULTIPLIER[battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"]].toFixed(2)) + "]";
            document.getElementById("p2Status").appendChild(span);
        }
    }
    for (let i of [0, 1]) if (battleInfo[i].currentPokemon != -1) {
        if (battleInfo[i].build[battleInfo[i].currentPokemon].status) {
            let span = document.createElement("span");
            span.innerText = "[" + battleInfo[i].build[battleInfo[i].currentPokemon].status.toUpperCase() + "]";
            span.classList.add(battleInfo[i].build[battleInfo[i].currentPokemon].status);
            document.getElementById(`p${i + 1}Status`).appendChild(span);
        }
        for (let j in battleInfo[i].build[battleInfo[i].currentPokemon].tempEffect) {
            if (battleInfo[i].build[battleInfo[i].currentPokemon].tempEffect[j]) {
                let span = document.createElement("span");
                span.innerText = "[" + capitalize(j) + "]";
                span.classList.add("debuff");
                document.getElementById(`p${i + 1}Status`).appendChild(span);
            }
        }
    }

}
function renderTable() {
    for (let i = 0; i < 6; i++) {
        document.querySelectorAll("#p1Table tr")[i + 1].children[1].innerText = capitalize(players[0].build[i].name);
        for (let j = 0; j < 4; j++) {
            document.querySelectorAll("#p1Table tr")[i + 1].children[j + 2].innerText = capitalize(players[0].build[i].moves[j]);
        }
    }
    for (let i = 0; i < 6; i++) {
        document.querySelectorAll("#p2Table tr")[i + 1].children[1].innerText = capitalize(players[1].build[i].name);
        for (let j = 0; j < 4; j++) {
            document.querySelectorAll("#p2Table tr")[i + 1].children[j + 2].innerText = capitalize(players[1].build[i].moves[j]);
        }
    }
}
renderTable();
for (let i of document.getElementsByClassName("tab")) {
    i.addEventListener("click", function () {
        document.querySelector(".tab.tab-selected").classList.remove("tab-selected");
        i.classList.add("tab-selected");
        document.querySelector(".tab-content.tab-show").classList.remove("tab-show");
        document.querySelector(".tab-content[data-for='" + i.dataset.for + "']").classList.add("tab-show");
    });
}
const STAT_NAMES = {
    "def": "Defense",
    "atk": "Attack",
    "sp": "Special",
    "spe": "Speed",
    "eva": "Evasion",
    "acc": "Accuracy"
};
function modifyStats(isSelf, stat, delta, prob) {
    if (getPkmn(isSelf).tempEffect.mist > 0 && delta < 0) return;
    let rand = Math.random();
    if (rand < prob && getPkmn(isSelf)[stat + "Stage"] + delta >= -6 && getPkmn(isSelf)[stat + "Stage"] + delta <= 6) {
        getPkmn(isSelf)[stat + "Stage"] += delta;
        let word = "";
        if (delta >= 2) word = "rose sharply";
        else if (delta == 1) word = "rose";
        else if (delta == -1) word = "fell";
        else word = "harshly fell";
        addSmallText(capitalize(getPkmn(isSelf).name) + "'s " + STAT_NAMES[stat] + " " + word + "!");
    }
}
function modifyStatus(status, prob) {
    let rand = Math.random();
    if (rand < prob) {
        if (getPkmn(false).status == status) {
            if (status == "par") addSmallText(capitalize(getPkmn(false).name) + " is already paralyzed!");
            return;
        }
        getPkmn(false).status = status;
        if (status == "par") {
            addSmallText(capitalize(getPkmn(false).name) + " is paralyzed! It may be unable to move!");
        } else if (status == "frz") {
            addSmallText(capitalize(getPkmn(false).name) + " is frozen solid!");
        }
    }
}
function putToSleep(isSelf, turns) {
    getPkmn(isSelf).status = "slp";
    getPkmn(isSelf).sleepTurns = turns;
    addSmallText(capitalize(getPkmn(isSelf).name) + " fell asleep!");
}
function addTempEffect(isSelf, effect, turns, prob) {
    if (Math.random() < prob) {
        getPkmn(isSelf).tempEffect[effect] = turns;
        if (effect == "confused") addSmallText(capitalize(getPkmn(false).name) + " became confused!");
        else if (effect == "reflect" || effect == "light screen") addSmallText(capitalize(getPkmn(false).name) + " gained armor!");
    }
}