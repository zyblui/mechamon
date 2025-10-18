importScripts("data.js");

onmessage = function (e) {
    if (e.data.type == "computerPlay") {
        battleInfo = e.data.battleInfo;
        playerToMove = e.data.playerToMove;
        postMessage({
            "type": "log",
            "content": getPkmn(true)
        })
        if (getPkmn(true)) {
            for (let i in getPkmn(true).moves) {
                if (getPkmn(true).moves[i].pp > 0) {
                    postMessage({
                        "type": "result",
                        "action": "move",
                        "move": i
                    })
                    break;
                }
            }
        } else {
            for (let i of battleInfo[playerToMove].build) {
                if (i.hp > 0) {
                    postMessage({
                        "type": "result",
                        "action": "switch",
                        "pkmn": i.name
                    })
                    break;
                }
            }
        }
    }
}

let settings = {
    "lang": "zh",
    "sleepClause": false,
    "speciesClause": false,
    "ohkoClause": false,
    "freezeClause": false,
    "evasionClause": false,
    "selfKoClause": false
};
let record = [], viewpoint = 0;
function setUncontrollable(isSelf, move, turns) {
    getPkmn(isSelf).uncontrollable = {
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
function getL10n(type, str) {
    let returnValue = TRANSLATION[settings.lang][type][str + ((arguments[2]?.isEnemy) ? "-enemy" : "")];
    if (arguments[2]) for (let i in arguments[2]) {
        if (i == "isEnemy") continue;
        for (let j = 0; j < arguments[2][i].length; j++) {
            returnValue = returnValue.replace("[" + i + j + "]", arguments[2][i][j]);
        }
    }
    return returnValue;
}
function capitalize(str) {
    let temp = str.split(" ");
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].length) temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
    }
    temp = temp.join(" ");
    temp = temp.split("-");
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].length) temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
    }
    temp = temp.join("-");
    return temp;
}
function calculateDmg(power, atk, def, lv, attackType, defenseType) {
    let effectiveness = calculateEffectiveness(attackType, defenseType);
    return ((2 * lv + 10) / 250 * atk / def * power + 2) * effectiveness;
}
function calculateEffectiveness(attackType, defenseType) {
    let effectiveness = 1;
    if (!attackType) return effectiveness;
    for (let i of defenseType) {
        effectiveness *= MULTIPLIER[attackType][i];
    }
    return effectiveness;
}
let turn = 0, playerToMove = 0, battleInfo = [];
let sequence = [], refreshSequenceIsRunning = false;
function refreshSequence() {
    if (refreshSequenceIsRunning || !sequence.length) return;
    refreshSequenceIsRunning = true;
    sequence.shift();
    if (sequence.length) {
        if (sequence[0].type != "turn") {
            setTimeout(function () {
                refreshSequenceIsRunning = false;
                refreshSequence();
            }, 600);
        } else {
            refreshSequenceIsRunning = false;
            refreshSequence();
        }
    } else {
        refreshSequenceIsRunning = false;
    }
    judgeHP();
}
function sendOutPkmn(pkmn) {
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
    for (let i = 0; i < battleInfo[playerToMove].build.length; i++) if (battleInfo[playerToMove].build[i].name == pkmn) {
        battleInfo[playerToMove].currentPokemon = i;
        break;
    }
    getPkmn(true).revealed = true;
}
let isNewTurn = false;
function dealDmg(isSelf, dmg) {
    if (arguments[2]?.opposingSubstitute && getPkmn(!isSelf).substituteHp > 0) {
        getPkmn(!isSelf).substituteHp -= Math.min(dmg, getPkmn(!isSelf).substituteHp);
    } else if (getPkmn(isSelf).substituteHp > 0 && !arguments[2]?.ignoreSubstitute) {
        getPkmn(isSelf).substituteHp -= Math.min(dmg, getPkmn(isSelf).substituteHp);
    } else {
        dmg = Math.min(dmg, getPkmn(isSelf).hp);
        getPkmn(isSelf).hp -= dmg;
    }
}
function nextPlayer(player) {
    if (getPkmn(true)?.status == "psn") dealDmg(true, getPkmn(true).hp / 16, { ignoreSubstitute: true });
    else if (getPkmn(true)?.status == "tox") dealDmg(true, getPkmn(true).hp / 8, { ignoreSubstitute: true });
    if (getPkmn(true)?.tempEffect["leech seed"] > 0) {
        if (getPkmn(true).status == "tox") dealDmg(true, getPkmn(true).hp / 8, { ignoreSubstitute: true });
        else dealDmg(true, getPkmn(true).hp / 16, { ignoreSubstitute: true });
    }
    judgeHP();

    playerToMove = player;
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
        return { "continue": true };
    } else if (getPkmn(true)?.status == "frz") {
        return { "continue": true };
    } else if (getPkmn(true)?.charge.turns > 0) {
        getPkmn(true).charge.turns--;
        if (getPkmn(true).charge.move && getPkmn(true).charge.turns == 0 && getPkmn(true).charge.move) {
            attack(getPkmn(true).charge.move);
            getPkmn(true).charge.move = "";
        } else {
            return { "continue": true };
        }
    } else if (getPkmn(true)?.uncontrollable.turns > 0) {
        getPkmn(true).uncontrollable.turns--;
        if (getPkmn(true).uncontrollable.move && getPkmn(true).uncontrollable.turns == 0) {
            getPkmn(true).uncontrollable.move = "";
        }
    } else if (getPkmn(true)?.status == "slp") {
        getPkmn(true).sleepTurns--;
        if (getPkmn(true).sleepTurns > 0) {
        } else if (getPkmn(true).sleepTurns == 0) {
            getPkmn(true).status = "";
        }
        return { "continue": true };
    } else if (getPkmn(true)?.tempEffect.confused > 0) {
        if (Math.random() < 0.5) {
            dealDmg(true, calculateDmg(40, getAttack(true), getDefense(true, true), getPkmn(true).lv, "",
                getType(true)), { opposingSubstitute: true });
        }
        getPkmn(true).tempEffect.confused--;
    }
}
function getAttack(isSelf) {
    return getPkmn(isSelf).atk * STAGE_MULTIPLIER[getPkmn(isSelf).atkStage];
}
function getDefense(isSelf, isCrit) {
    if (isCrit) return getPkmn(isSelf).def * STAGE_MULTIPLIER[getPkmn(isSelf).defStage];
    else return getPkmn(isSelf).def * STAGE_MULTIPLIER[getPkmn(isSelf).defStage] * ((getPkmn(isSelf).tempEffect
        .reflect) ? 2 : 1);
}
function getSp(isSelf, isCrit) {
    if (isCrit) return getPkmn(isSelf).sp * STAGE_MULTIPLIER[getPkmn(isSelf).spStage];
    else return getPkmn(isSelf).sp * STAGE_MULTIPLIER[getPkmn(isSelf).spStage] * ((getPkmn(isSelf)
        .tempEffect["light screen"]) ? 2 : 1);
}
function nextTurn() {
    attacks.sort(function (a, b) {
        if (b.type == "switch" && a.type == "move") return 1;
        else if (a.type == "switch" && b.type == "move") return -1;
        else if (a.type == "move" && b.type == "move") {
            if (getMoveStats(a.move).priority > getMoveStats(b.move).priority) return -1;
            else if (getMoveStats(b.move).priority > getMoveStats(a.move).priority) return 1;
            let p1Spe = battleInfo[0].build[battleInfo[0].currentPokemon].spe * STAGE_MULTIPLIER[battleInfo[0].build[battleInfo[0]
                .currentPokemon].speStage] * ((battleInfo[0].build[battleInfo[0].currentPokemon].status == "par") ? 0.25 : 1);
            let p2Spe = battleInfo[1].build[battleInfo[1].currentPokemon].spe * STAGE_MULTIPLIER[battleInfo[1].build[battleInfo[1]
                .currentPokemon].speStage] * ((battleInfo[1].build[battleInfo[1].currentPokemon].status == "par") ? 0.25 : 1);
            let tempPlayerToMove = 0;
            if (p1Spe > p2Spe) {
                tempPlayerToMove = 0;
            } else if (p1Spe < p2Spe) {
                tempPlayerToMove = 1;
            } else {
                tempPlayerToMove = Math.round(Math.random());
            }
            if (a.user == tempPlayerToMove && b.user != tempPlayerToMove) return -1;
            else if (a.user != tempPlayerToMove && b.user == tempPlayerToMove) return 1;
            else return 0;
        } else return 0;
    });
    outer: for (let i of attacks) {
        let nextPlayerInfo = nextPlayer(i.user);
        if (!getPkmn(true) || !getPkmn(false)) continue;
        if (i.type == "switch") {
            sendOutPkmn(i.pkmn);
            continue;
        }
        if (nextPlayerInfo?.continue) continue;
        if (i.dirAttack) {
            attack(i.move);
            judgeHP();
            continue;
        }
        getPkmn(true).lastMoveUsed = i.move;
        for (let k of MOVES) if (k.name == i.move) {
            let effect;
            if (k.category != "status" && Math.random() > k.acc * ACC_STAGE_MULTIPLIER[getPkmn(true).accStage] *
                ACC_STAGE_MULTIPLIER[getPkmn(false).evaStage] / 100) {
                if (k.missEffect) k.missEffect();
            } else {
                let preDmgEffect = {};
                if (k.preDmgEffect) preDmgEffect = k.preDmgEffect();
                if (getPkmn(true).charge.turns > 0) {
                    continue outer;
                }
                if (getPkmn(false).tempEffect.semiInvulnerable > 0 && !preDmgEffect.nullifySemiInvulnerable) break;
                effect = attack(k.name);
                if (getPkmn(false)?.tempEffect.rage > 0) modifyStats(false, "atk", 1, 1);
            }
            judgeHP();
            if (getPkmn(true)) {
                getPkmn(true).moves[k.name]--;
                if (effect?.flinch) {
                    nextTurn();
                }
                else continue outer;
            } else refreshSequence();
            break;
        }
    }
    attacks = [];
    if (getPkmn(true)?.status == "brn") dealDmg(true, getPkmn(true).maxHp / 16, { ignoreSubstitute: true });
    if (getPkmn(false)?.status == "brn") dealDmg(false, getPkmn(false).maxHp / 16, { ignoreSubstitute: true });
    judgeHP();
    endTurn();
}
function endTurn() {
    for (let i = 0; i <= 1; i++) {
        let allFaint = true;
        for (let j of battleInfo[i].build) if (j.hp > 0) allFaint = false;
        if (allFaint) {
            refreshSequence();
            return;
        }
    }
    if (battleInfo[0].currentPokemon == -1) {
        playerToMove = 0;
    } else if (battleInfo[1].currentPokemon == -1) {
        playerToMove = 1;
    } else {
        turn++;
        isNewTurn = true;
        sequence.push({
            "type": "turn",
            "str": getL10n("others", "turn", {
                "number": [turn]
            })
        });
        playerToMove = 0;
    }

    refreshSequence();
}
function getStats(name) {
    for (let i of POKEMON) {
        if (i.name == name) return i;
    }
}
function getMoveStats(name) {
    for (let i of MOVES) {
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
function getName(pkmn, showSpeciesName) {
    if (pkmn.nick) {
        if (showSpeciesName) return pkmn.nick + "(" + getL10n("pokemon", pkmn.name) + ")";
        else return pkmn.nick;
    }
    else return getL10n("pokemon", pkmn.name);
}
function attack(move) {
    for (let k of MOVES) if (k.name == move) {
        let criticalHitRatioMultiplier = 1;
        let preCritEffect;
        if (k.preCritEffect) preCritEffect = k.preCritEffect();
        if (preCritEffect?.isHighCritRatio) criticalHitRatioMultiplier = 8;
        if (arguments[1]?.forceCrit) criticalHitRatioMultiplier = Infinity;
        let isCrit = (Math.random() < criticalHitRatioMultiplier * getPkmn(true).critProbMultiplier * getStats(getPkmn(true).name)
            .spe / 512);
        let dmg = 0, totalDmg = 0;
        if (k.category == "physical") dmg = calculateDmg(k.power, getAttack(true), getDefense(false, isCrit), getPkmn(true).lv,
            k.type, getType(false));
        else dmg = calculateDmg(k.power, getSp(true, isCrit), getSp(false, isCrit), getPkmn(true).lv, k.type, getType(false));
        if (k.category != "status") {
            totalDmg += Math.min(dmg, getPkmn(false).hp);
            if (isCrit) {
                totalDmg += Math.min(dmg, getPkmn(false).hp);
            }
            dealDmg(false, totalDmg);
            getPkmn(false).dmgTaken.push(totalDmg);
            getPkmn(false).lastDmgTakenType = k.type;
        }
        let effect;
        if (k.effect) effect = k.effect({ totalDmg: totalDmg });
        return effect;
    }
}
let attacks = [];
function decisionNextPlayer() {
    if (playerToMove == 0) {
        playerToMove = 1;
    } else {
        nextTurn();
    }
}
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
}
function judgeHP() {
    if (getPkmn(false)?.hp <= 0) {
        getPkmn(false).hp = 0;
        battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
    }
    if (getPkmn(true)?.hp <= 0) {
        getPkmn(true).hp = 0;
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
    }
}
function modifyStatus(status, prob) {
    let rand = Math.random();
    if (rand < prob) {
        if (getPkmn(false).status == status) {
            return;
        }
        getPkmn(false).status = status;
    }
}
function putToSleep(isSelf, turns) {
    getPkmn(isSelf).status = "slp";
    getPkmn(isSelf).sleepTurns = turns;
}
function addTempEffect(isSelf, effect, turns, prob) {
    if (Math.random() < prob) {
        getPkmn(isSelf).tempEffect[effect] = turns;
    }
}