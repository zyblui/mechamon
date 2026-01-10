/*let w
if (w?.terminate) w.terminate();
w = new Worker("w.js");

w.onmessage = function (e) {
    if (e.data.type == "result") {
        if (e.data.action == "switch") {
            switchPkmn(e.data.pkmn);
        } else if (e.data.action == "move") {
            makeMove(e.data.move);
        }
    } else if (e.data.type == "log") {
        console.log(e.data.content)
    }
}*/

document.getElementById("mechaButton").addEventListener("click", function () {
    w.postMessage({
        type: "computerPlay",
        battleInfo: battleInfo,
        playerToMove: playerToMove
    });
});

let settings = {
    "lang": "zh",
    "sleepClause": false,
    "speciesClause": false,
    "ohkoClause": false,
    "freezeClause": false,
    "evasionClause": false,
    "selfKoClause": false,
    "hardcoreMode": false,
    "keyboardControls": false,
    "effectivenessIndicator": false
};
const PROPERTIES = ["atk", "def", "sp", "spe"];
if (!localStorage.getItem("mechamonSettings")) {
    localStorage.setItem("mechamonSettings", JSON.stringify(settings));
} else {
    for (let i in settings) if (!Object.keys(JSON.parse(localStorage.getItem("mechamonSettings"))).includes(i)) {
        localStorage.setItem("mechamonSettings", JSON.stringify(settings));
        break;
    }
    settings = JSON.parse(localStorage.getItem("mechamonSettings"));
}
let players = [{
    "name": "Player 1",
    "build": [{
        "name": "geodude",
        "moves": ["earthquake", "rock slide", "body slam", "explosion"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "staryu",
        "moves": ["surf", "thunderbolt", "blizzard", "thunder wave"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "koffing",
        "moves": ["sludge", "fire blast", "thunderbolt", "explosion"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "tentacool",
        "moves": ["surf", "blizzard", "mega drain", "hydro pump"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "machop",
        "moves": ["submission", "earthquake", "rock slide", "body slam"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "eevee",
        "moves": ["substitute", "reflect", "body slam", "double-edge"],
        "lv": 5,
        "nick": ""
    }]
}, {
    "name": "Player 2",
    "build": [{
        "name": "eevee",
        "moves": ["rage", "body slam", "double-edge", "quick attack"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "vulpix",
        "moves": ["flamethrower", "body slam", "confuse ray", "substitute"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "ponyta",
        "moves": ["toxic", "agility", "fire blast", "body slam"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "growlithe",
        "moves": ["agility", "body slam", "fire blast", "double-edge"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "psyduck",
        "moves": ["surf", "mega kick", "blizzard", "rage"],
        "lv": 5,
        "nick": ""
    }, {
        "name": "poliwag",
        "moves": ["hypnosis", "amnesia", "surf", "psychic"],
        "lv": 5,
        "nick": ""
    }]
}];
document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[0].name + ".png')";
document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[0].name + ".png')";
document.getElementById("p1Name").innerText = getL10n("pokemon", players[0].build[0].name);
document.getElementById("p2Name").innerText = getL10n("pokemon", players[1].build[0].name);
document.getElementById("turnNumber").innerText = getL10n("others", "turn", {
    "number": [0]
});
document.getElementById("viewpoint").innerText = getL10n("ui", "viewpoint", {
    "player": ["Player 1"]
});
let record = [], viewpoint = 0;
function refreshRecord() {

}
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
function render() {
    if (battleInfo[Number(viewpoint != 0)].currentPokemon != -1) document.getElementById("p1Pokemon").style.backgroundImage =
        "url('back/" + players[Number(viewpoint != 0)].build[battleInfo[Number(viewpoint != 0)].currentPokemon].name + ".png')";
    if (battleInfo[Number(viewpoint != 1)].currentPokemon != -1) document.getElementById("p2Pokemon").style.backgroundImage =
        "url('front/" + players[Number(viewpoint != 1)].build[battleInfo[Number(viewpoint != 1)].currentPokemon].name + ".png')";
    if (battleInfo[Number(viewpoint != 0)].currentPokemon != -1) document.getElementById("p1Name").innerText =
        getName(players[Number(viewpoint != 0)].build[battleInfo[Number(viewpoint != 0)].currentPokemon], false);
    if (battleInfo[Number(viewpoint != 1)].currentPokemon != -1) document.getElementById("p2Name").innerText =
        getName(players[Number(viewpoint != 1)].build[battleInfo[Number(viewpoint != 1)].currentPokemon], false);
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
for (let i of POKEMON) {
    let div = document.createElement("div");
    div.classList.add("listButton");
    div.innerHTML = getL10n("pokemon", i.name);
    div.addEventListener("click", function () {
        players[Number(document.querySelector(".pkmnName.selected").dataset.player) - 1].build[Number(document.querySelector(
            ".pkmnName.selected").dataset.no) - 1].name = i.name;
        for (let j = 0; j < 4; j++) {
            if (!i.moves.includes(players[Number(document.querySelector(".pkmnName.selected").dataset.player) - 1].build[Number(
                document.querySelector(".pkmnName.selected").dataset.no) - 1].moves[j])) {
                players[Number(document.querySelector(".pkmnName.selected").dataset.player) - 1].build[Number(document
                    .querySelector(".pkmnName.selected").dataset.no) - 1].moves[j] = "";
            }
        }
        renderTable();
        document.getElementById("pokemonList").classList.remove("show");
        document.getElementById("setupTable").classList.add("show");
    });
    document.getElementById("pokemonList").appendChild(div);
}
for (let i of MOVES) {
    let div = document.createElement("div");
    div.classList.add("listButton");
    div.innerHTML = getL10n("moves", i.name);
    div.addEventListener("click", function () {
        players[Number(document.querySelector(".move.selected").dataset.player) - 1].build[Number(document.querySelector(
            ".move.selected").dataset.no) - 1].moves[Number(document.querySelector(".move.selected").dataset.moveNo) - 1] = i.name;
        renderTable();
        document.getElementById("movesList").classList.remove("show");
        document.getElementById("setupTable").classList.add("show");
    });
    div.dataset.for = i.name;
    document.getElementById("movesListInner").appendChild(div);
}
for (let i of document.getElementsByClassName("pkmnName")) {
    i.addEventListener("click", function () {
        document.querySelector(".pkmnName.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.querySelector(".list.show").classList.remove("show");
        document.getElementById("pokemonList").classList.add("show");
    });
}
for (let i of document.getElementsByClassName("move")) {
    i.addEventListener("click", function () {
        document.querySelector(".move.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.querySelector(".list.show").classList.remove("show");
        for (let j of document.getElementById("movesListInner").children) {
            if (getStats(players[Number(document.querySelector(".move.selected").dataset.player) - 1].build[Number(document
                .querySelector(".move.selected").dataset.no) - 1].name).moves.includes(j.dataset.for)) {
                j.classList.remove("hide");
            } else j.classList.add("hide");
        }
        document.getElementById("movesList").classList.add("show");
    });
}
document.getElementById("clearMove").addEventListener("click", function () {
    players[Number(document.querySelector(".move.selected").dataset.player) - 1].build[Number(document.querySelector(
        ".move.selected").dataset.no) - 1].moves[Number(document.querySelector(".move.selected").dataset.moveNo) - 1] = "";
    renderTable();
    document.getElementById("movesList").classList.remove("show");
    document.getElementById("setupTable").classList.add("show");
});
for (let i of document.querySelectorAll(".back")) i.addEventListener("click", function () {
    document.querySelector(".list.show").classList.remove("show");
    document.getElementById("setupTable").classList.add("show");
});
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
function refreshDecision() {
    if (battleInfo[playerToMove].currentPokemon != -1 && getPkmn(true).uncontrollable.turns == 0) {
        for (let i = 0; i < 4; i++) {
            let button = document.getElementsByClassName("decisionMove")[i];
            if (!Object.keys(getPkmn(true).moves)[i]) {
                button.querySelector(".move-text").innerText = "(Empty)";
                button.disabled = "disabled";
                displayEffectiveness(button, "");
                continue;
            }
            if (Object.values(getPkmn(true).moves)[i] <= 0 || (getPkmn(true).disable.move == Object.keys(getPkmn(true)
                .moves)[i])) button.disabled = "disabled";
            else button.disabled = "";
            let tempMove = "";
            if (Object.keys(getPkmn(true).moves)[i] == "mimic" && getPkmn(true).mimicMove) tempMove = getPkmn(true).mimicMove;
            else tempMove = Object.keys(getPkmn(true).moves)[i];
            button.querySelector(".move-text").innerText = getL10n("moves", tempMove);
            button.querySelector(".pp-remaining").innerText = Object.values(getPkmn(
                true).moves)[i];
            button.querySelector(".sub").innerText = "/" + getMoveStats(Object.keys(
                getPkmn(true).moves)[i]).pp;
            button.querySelector(".move-type").innerText = getL10n("types",
                getMoveStats(tempMove).type);
            button.dataset.for = tempMove;

            displayEffectiveness(button, tempMove);
        }
    } else if (battleInfo[playerToMove].currentPokemon != -1) {
        let moveButtonGroup = document.getElementsByClassName("decisionMove");
        moveButtonGroup[0].disabled = "";
        moveButtonGroup[0].querySelector(".move-text").innerText = "Pass";
        moveButtonGroup[0].querySelector(".pp-remaining").innerText = "-";
        moveButtonGroup[0].querySelector(".sub").innerText = "/-";
        moveButtonGroup[0].querySelector(".move-type").innerText = "-";
        displayEffectiveness(moveButtonGroup[0], getPkmn(true).uncontrollable.move);
        for (let i = 1; i < 4; i++) {
            moveButtonGroup[i].disabled = "disabled";
            moveButtonGroup[i].querySelector(".move-text").innerText = "-";
            moveButtonGroup[i].querySelector(".pp-remaining").innerText = "-";
            moveButtonGroup[i].querySelector(".sub").innerText = "/-";
            moveButtonGroup[i].querySelector(".move-type").innerText = "-";
            displayEffectiveness(moveButtonGroup[i], "");
        }
    } else {
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "disabled";
            displayEffectiveness(document.getElementsByClassName("decisionMove")[i], "");
        }
    }
    let switchButtons = document.querySelectorAll(".decisionSwitch");
    for (let i = 0; i < 6; i++) {
        document.querySelectorAll(".decisionSwitch .decision-content")[i].innerText = getName(players[playerToMove].build[i],
            false);
        switchButtons[i].classList.remove("selected");
        if (battleInfo[playerToMove].build[i].hp == 0) switchButtons[i].disabled = "disabled";
        else if (battleInfo[playerToMove].currentPokemon == i) {
            switchButtons[i].disabled = "disabled";
            switchButtons[i].classList.add("selected");
        } else switchButtons[i].disabled = "";
        switchButtons[i].dataset.for = players[playerToMove].build[i].name;
    }
}
function displayEffectiveness(button, move) {
    const EFFECTIVENESS_ABBR = {
        "0": "NE",
        "0.25": "DNVE",
        "0.5": "NVE",
        "1": "E",
        "2": "SE",
        "4": "DSE"
    };
    if (!move || getMoveStats(move).category == "status") button.querySelector(".effectiveness").innerText = "";
    else button.querySelector(".effectiveness").innerText = EFFECTIVENESS_ABBR[calculateEffectiveness(getMoveStats(move).type,
        getType(false))];
}
let turn = 0, playerToMove = 0, battleInfo = [];
document.getElementById("startGame").addEventListener("click", function () {
    document.getElementById("recordContent").innerHTML = "";
    turn = 0;
    battleInfo = structuredClone(players);
    battleInfo[0].currentPokemon = -1;
    battleInfo[1].currentPokemon = -1;
    for (let i of battleInfo) {
        for (let j of i.build) {
            for (let k of POKEMON) {
                if (k.name == j.name) {
                    j.hp = Math.floor(0.01 * (2 * k.hp + 30 + Math.floor(0.25 * 252)) * j.lv) + j.lv + 10;
                    j.maxHp = Math.floor(0.01 * (2 * k.hp + 30 + Math.floor(0.25 * 252)) * j.lv) + j.lv + 10;
                    break;
                }
            }
            for (let k of ["atk", "def", "sp", "spe"]) {
                j[k] = Math.floor(0.01 * (2 * getStats(j.name)[k] + 30 + Math.floor(0.25 * 252)) * j.lv) + 5;
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
            j.toxicCounter = 0;
            j.dmgTaken = [];
            j.lastDmgTakenType = "";
            j.lastMoveUsed = "";
            let json = {};
            for (let k of j.moves) for (let l of MOVES) if (l.name == k) json[k] = l.pp;
            j.moves = json;
            j.revealed = false;
        }
    }
    playerToMove = 0;
    sendOutPkmn(battleInfo[0].build[0].name);
    playerToMove = 1;
    sendOutPkmn(battleInfo[1].build[0].name);
    nextTurn();
    render();
});
let sequence = [], refreshSequenceIsRunning = false;
function refreshSequence() {
    if (refreshSequenceIsRunning || !sequence.length) return;
    refreshSequenceIsRunning = true;
    let element = sequence.shift();
    function insertElementWithClass(elementName, className, text, parentId) {
        let tempElement = document.createElement(elementName);
        tempElement.innerHTML = text;
        tempElement.classList.add(className);
        tempElement.dataset.content = JSON.stringify(element.args);
        document.getElementById(parentId).appendChild(tempElement);
    }
    let str = getL10n(...element.args);
    if (element.type == "main") {
        document.getElementById("text").innerHTML = "";
        insertElementWithClass("div", "main-text", str, "text");
        insertElementWithClass("div", "main-text", str, "recordContent");
    } else if (element.type == "small") {
        insertElementWithClass("div", "small-text", str, "text");
        insertElementWithClass("div", "small-text", str, "recordContent");
    } else if (element.type == "turn") {
        document.getElementById("turnNumber").innerText = str;
        insertElementWithClass("h2", "turn-number", str, "recordContent");
    }
    document.getElementById("record").scroll({
        top: document.getElementById("record").scrollHeight,
        left: 0,
        behavior: "smooth"
    });
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
        refreshDecision();
    }

    judgeHP();
    renderHP();
}
function addMainText(...args) {
    for (let i of document.querySelectorAll(".decisionMove,.decisionSwitch")) {
        i.disabled = "disabled";
    }
    sequence.push({
        "type": "main",
        "args": args
    });
}
function addSmallText(...args) {
    for (let i of document.querySelectorAll(".decisionMove,.decisionSwitch")) {
        i.disabled = "disabled";
    }
    sequence.push({
        "type": "small",
        "args": args
    });
}
function sendOutPkmn(pkmn) {
    addMainText("others", "go", {
        "pokemon": [getL10n("pokemon", pkmn)],
        "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))//viewpoint == -1?
    });
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
    render();
    renderHP();
}
function addTooltip(elementGroup, i) {
    if (!elementGroup[i].dataset.for || !getStats(elementGroup[i].dataset.for)) return;
    let tooltip;
    if (!elementGroup[i].parentElement.querySelector(".tooltip")) {
        tooltip = document.querySelector(".tooltip").cloneNode(true);
        if (elementGroup[i].parentElement.id == "p2Balls") tooltip.classList.add("under");
        else tooltip.classList.remove("under");
        elementGroup[i].parentElement.insertBefore(tooltip, elementGroup[i]);
    }
    tooltip = elementGroup[i].parentElement.querySelector(".tooltip");
    tooltip.querySelector(".tip-name").innerText = getL10n("pokemon", elementGroup[i]
        .dataset.for);
    let stats = getStats(elementGroup[i].dataset.for);
    tooltip.querySelector(".img-left").style.background = "url(pokemonicons-sheet.png) no-repeat scroll -" +
        (ICONS[elementGroup[i].dataset.for].cell - 1) * 40 + "px -" + (
            ICONS[elementGroup[i].dataset.for].row - 1) * 30 + "px";
    tooltip.querySelector(".tip-desc").innerText = getL10n("pkmnDesc", elementGroup[i]
        .dataset.for);
    for (let j of [0, 1]) {
        if (!stats.type[j]) {
            tooltip.querySelectorAll(".type")[j].classList.add("hide");
            break;
        }
        tooltip.querySelectorAll(".type")[j].classList.remove("hide");
        tooltip.querySelectorAll(".type-text")[j].innerText = getL10n("types", stats.type[j]).toUpperCase();
        tooltip.querySelectorAll(".type-text")[j].classList.remove(
            "type-bug",
            "type-dragon",
            "type-electric",
            "type-fighting",
            "type-fire",
            "type-flying",
            "type-ghost",
            "type-grass",
            "type-ground",
            "type-ice",
            "type-normal",
            "type-poison",
            "type-psychic",
            "type-rock",
            "type-water");
        tooltip.querySelectorAll(".type-text")[j].classList.add("type-" + stats.type[j]);
        tooltip.querySelectorAll(".type-img")[j].src = "types/" + stats.type[j] + ".png";
    }
    insertEffects(battleInfo[playerToMove].build[i], tooltip.querySelector(".tip-status"), true);

    for (let j = 0; j < 4; j++) {
        if (!Object.keys(battleInfo[playerToMove].build[i].moves)[j]) {
            tooltip.querySelectorAll(".move-name")[j].innerText = "(Empty)";
            tooltip.querySelectorAll(".pp-remaining")[j].innerText = 0;
            tooltip.querySelectorAll(".pp .sub")[j].innerText = "/0";
            tooltip.querySelectorAll(".move-name")[j].classList.add("unknown");
            continue;
        }
        tooltip.querySelectorAll(".move-name")[j].innerText = getL10n("moves", Object.keys(battleInfo[playerToMove]
            .build[i].moves)[j]);
        tooltip.querySelectorAll(".pp-remaining")[j].innerText = Object.values(battleInfo[playerToMove].build[i]
            .moves)[j];
        tooltip.querySelectorAll(".pp .sub")[j].innerText = "/" + getMoveStats(Object.keys(battleInfo[playerToMove]
            .build[i].moves)[j]).pp;
        if (Object.values(battleInfo[playerToMove].build[i].moves)[j] == getMoveStats(Object
            .keys(battleInfo[playerToMove].build[i].moves)[j]).pp) tooltip.querySelectorAll(".move-name")[j].classList
                .add("unknown");
        else tooltip.querySelectorAll(".move-name")[j].classList.remove("unknown");
    }
    tooltip.querySelector(".hp-remaining").innerText = (battleInfo[playerToMove].build[i].hp / battleInfo[playerToMove]
        .build[i].maxHp * 100).toFixed(0) + "%";
    tooltip.querySelector(".hp .sub").innerText = ", " + battleInfo[playerToMove].build[i].hp.toFixed(0) + "/" +
        battleInfo[playerToMove].build[i].maxHp;
    tooltip.classList.add("show");
}
for (let i = 0; i < 6; i++) {
    document.getElementsByClassName("decisionSwitch")[i].addEventListener("click", function () {
        switchPkmn(document.getElementsByClassName("decisionSwitch")[i].dataset.for);
    });

    for (let j of [".decisionSwitch", "#p1Balls .ball", "#p2Balls .ball"]) {
        document.querySelectorAll(j)[i].addEventListener("mouseover", function () {
            addTooltip(document.querySelectorAll(j), i);
        });
        document.querySelectorAll(j)[i].addEventListener("mouseout", function () {
            document.querySelectorAll(j)[i].parentElement.querySelector(".tooltip")?.classList.remove("show");
        });
    }

}
function insertEffects(pkmn, outputArea, showFull) {
    outputArea.innerHTML = "";
    if (pkmn.status) {
        outputArea.innerHTML = "";
        let statusSpan = document.createElement("span");
        statusSpan.classList.add(pkmn.status);
        statusSpan.innerText = "[" + ((showFull) ? getL10n("status", pkmn.status).toUpperCase() : pkmn.status.toUpperCase()) +
            "]";
        outputArea.appendChild(statusSpan);
    }
    for (let j of PROPERTIES) {
        if (pkmn[j + "Stage"] != 0) {
            let span = document.createElement("span");
            if (pkmn[j + "Stage"] > 0) {
                span.classList.add("buff");
            } else {
                span.classList.add("debuff");
            }
            span.innerText = "[" + ((showFull) ? getL10n("stats", j).toUpperCase() : capitalize(j)) + " x" +
                Number(STAGE_MULTIPLIER[pkmn[j + "Stage"]].toFixed(2)) + "]";
            outputArea.appendChild(span);
        }
    }
    for (let j in pkmn.tempEffect) {
        if (pkmn.tempEffect[j]) {
            let tempEffectSpan = document.createElement("span");
            tempEffectSpan.innerText = "[" + ((showFull) ? j.toUpperCase() : capitalize(j)) + "]";
            tempEffectSpan.classList.add("debuff");
            outputArea.appendChild(tempEffectSpan);
        }
    }
}
function switchPkmn(name) {
    if (battleInfo[playerToMove].currentPokemon != -1) {
        attacks.push({
            "user": playerToMove,
            "type": "switch",
            "pkmn": name
        });
        decisionNextPlayer();
    } else {
        sendOutPkmn(name);
        endTurn();
    }
}
let isNewTurn = false;
function dealDmg(isSelf, dmg) {
    if (arguments[2]?.opposingSubstitute && getPkmn(!isSelf).substituteHp > 0) {
        getPkmn(!isSelf).substituteHp -= Math.min(dmg, getPkmn(!isSelf).substituteHp);
        if (getPkmn(!isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(!isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (((!isSelf) == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(!isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (((!isSelf) == playerToMove) != viewpoint))
        });
    } else if (getPkmn(isSelf).substituteHp > 0 && !arguments[2]?.ignoreSubstitute) {
        getPkmn(isSelf).substituteHp -= Math.min(dmg, getPkmn(isSelf).substituteHp);
        if (getPkmn(isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
    } else {
        dmg = Math.min(dmg, getPkmn(isSelf).hp);
        getPkmn(isSelf).hp -= dmg;
        addSmallText("others", "loseHealth", {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "percentage": [(dmg / getPkmn(isSelf).maxHp * 100).toFixed(0)],
            "isEnemy": ((viewpoint == -1) ? false : ((isSelf == playerToMove) != viewpoint))
        });
    }
}
function nextPlayer(player) {
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
        addMainText("others", "unableToMove", {
            "pokemon": [getName(getPkmn(true), false)],
            "isEnemy": playerToMove != viewpoint
        });
        return { "continue": true };
    } else if (getPkmn(true)?.status == "frz") {
        addMainText("others", "frozenSolid", {
            "pokemon": [getName(getPkmn(true), false)],
            "isEnemy": playerToMove != viewpoint
        });
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
            addMainText("others", "fastAsleep", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": playerToMove != viewpoint
            });
        } else if (getPkmn(true).sleepTurns == 0) {
            addSmallText("others", "wakeUp", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": playerToMove != viewpoint
            });
            getPkmn(true).status = "";
        }
        return { "continue": true };
    } else if (getPkmn(true)?.tempEffect.confused > 0) {
        addSmallText("others", "confused", {
            "pokemon": [getName(getPkmn(true), false)],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
        });
        getPkmn(true).tempEffect.confused--;
        if (Math.random() < 0.5) {
            dealDmg(true, calculateDmg(40, getAttack(true), getDefense(true, true), getPkmn(true).lv, "",
                getType(true)), { opposingSubstitute: true });
            addMainText("others", "hurtConfusion");
            return { "continue": true };//!
        }
        //getPkmn(true).tempEffect.confused--;
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
            addMainText("others", "comeBack", {
                "pokemon": [getName(getPkmn(true), false)],
                "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
            });
            sendOutPkmn(i.pkmn);
            continue;
        }
        if (nextPlayerInfo?.continue) continue;
        addMainText("others", "use", {
            "pokemon": [getName(getPkmn(true), false)],
            "moves": [getL10n("moves", i.move)],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
        });

        if (i.dirAttack) {
            attack(i.move);
            judgeHP();
            renderHP();
            continue;
        }
        getPkmn(true).lastMoveUsed = i.move;

        for (let k of MOVES) if (k.name == i.move) {
            let effect;
            if (k.category != "status" && Math.random() > k.acc * ACC_STAGE_MULTIPLIER[getPkmn(true).accStage] *
                ACC_STAGE_MULTIPLIER[getPkmn(false).evaStage] / 100) {
                addSmallText("others", "attackMiss", {
                    "pokemon": [getName(getPkmn(true), false)],
                    "isEnemy": playerToMove != viewpoint
                });
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

            if (getPkmn(true)?.status == "psn") dealDmg(true, getPkmn(true).maxHp / 16, { ignoreSubstitute: true });
            else if (getPkmn(true)?.status == "tox") {
                dealDmg(true, getPkmn(true).maxHp * getPkmn(true).toxicCounter / 16, { ignoreSubstitute: true });
                getPkmn(true).toxicCounter++;
            }
            if (getPkmn(true)?.tempEffect["leech seed"] > 0) {
                if (getPkmn(true).status == "tox") {
                    dealDmg(true, getPkmn(true).maxHp * getPkmn(true).toxicCounter / 16, { ignoreSubstitute: true });
                    getPkmn(true).toxicCounter++;
                } else dealDmg(true, getPkmn(true).maxHp / 16, { ignoreSubstitute: true });
            }

            judgeHP();
            renderHP();
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
    for (let i of [true, false]) if (getPkmn(i)?.status == "brn") {
        addSmallText("others", "hurtByBurn", {
            "pokemon": [getName(getPkmn(i), false)],
            "isEnemy": (i == playerToMove) != viewpoint
        });
        dealDmg(i, getPkmn(i).maxHp / 16, { ignoreSubstitute: true });
    }
    judgeHP();
    endTurn();
}
function endTurn() {
    for (let i = 0; i <= 1; i++) {
        let allFaint = true;
        for (let j of battleInfo[i].build) if (j.hp > 0) allFaint = false;
        if (allFaint) {
            addMainText("others", "winBattle", {
                "player": [battleInfo[Number(!i)].name]
            });
            refreshSequence();
            return;
        }
    }
    if (battleInfo[0].currentPokemon == -1) {
        refreshPlayerToMove(0);
    } else if (battleInfo[1].currentPokemon == -1) {
        refreshPlayerToMove(1);
    } else {
        turn++;
        isNewTurn = true;
        sequence.push({
            "type": "turn",
            "args": ["others", "turn", {
                "number": [turn]
            }]
        });
        refreshPlayerToMove(0);
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
            switch (calculateEffectiveness(k.type, getType(false))) {
                case 4:
                case 2:
                    addSmallText("others", "superEffective");
                    break;
                case 0.5:
                case 0.25:
                    addSmallText("others", "notVeryEffective");
                    break;
                case 0:
                    addSmallText("others", "noEffect", {
                        "pokemon": [getName(getPkmn(false), false)],
                        "isEnemy": !playerToMove != viewpoint
                    });
            }
            totalDmg += Math.min(dmg, getPkmn(false).hp);
            if (isCrit) {
                totalDmg += Math.min(dmg, getPkmn(false).hp);
                addSmallText("others", "crit");
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
function refreshPlayerToMove(ptm) {
    playerToMove = ptm;
    document.getElementById("playerToMove").innerText = "Player " + (ptm + 1) + "'s turn";
}
function decisionNextPlayer() {
    if (playerToMove == 0) {
        refreshPlayerToMove(1);
        refreshDecision();
    } else {
        nextTurn();
    }
}
for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("decisionMove")[i].addEventListener("click", function () {
        makeMove(document.getElementsByClassName("decisionMove")[i].dataset.for);
    });
    document.getElementsByClassName("decisionMove")[i].addEventListener("mouseover", function () {
        if (!getMoveStats(document.getElementsByClassName("decisionMove")[i].dataset.for)) return;
        let tooltipMove;
        if (!document.getElementsByClassName("decisionMove")[i].parentElement.querySelector(".tooltip-move")) {
            tooltipMove = document.querySelector(".tooltip-move").cloneNode(true);
            document.getElementsByClassName("decisionMove")[i].parentElement.insertBefore(tooltipMove, document
                .getElementsByClassName("decisionMove")[i]);
        }
        tooltipMove = document.getElementsByClassName("decisionMove")[i].parentElement.querySelector(".tooltip-move");
        tooltipMove.querySelector(".tip-name").innerText = getL10n("moves", document.getElementsByClassName("decisionMove")[i]
            .dataset.for);
        let moveStats = getMoveStats(document.getElementsByClassName("decisionMove")[i].dataset.for);
        tooltipMove.querySelector(".tip-cat").innerText = getL10n("cat", moveStats.category).toUpperCase();
        tooltipMove.querySelector(".tip-cat").classList.remove("cat-physical", "cat-special", "cat-status");
        tooltipMove.querySelector(".tip-cat").classList.add("cat-" + moveStats.category);
        tooltipMove.querySelector(".tip-desc").innerText = getL10n("moveDesc", document.getElementsByClassName("decisionMove")[i]
            .dataset.for);
        tooltipMove.querySelector(".type-text").innerText = getL10n("types", moveStats.type).toUpperCase();
        tooltipMove.querySelector(".type-text").classList.remove(
            "type-bug",
            "type-dragon",
            "type-electric",
            "type-fighting",
            "type-fire",
            "type-flying",
            "type-ghost",
            "type-grass",
            "type-ground",
            "type-ice",
            "type-normal",
            "type-poison",
            "type-psychic",
            "type-rock",
            "type-water");
        tooltipMove.querySelector(".type-text").classList.add("type-" + moveStats.type);
        tooltipMove.querySelector(".tip-pow").innerText = moveStats.power;
        tooltipMove.querySelector(".tip-priority").innerText = moveStats.priority;
        tooltipMove.querySelector(".tip-pp .main").innerText = document.getElementsByClassName("decisionMove")[i]
            .querySelector(".pp-remaining").innerText;
        tooltipMove.querySelector(".tip-pp .sub").innerText = "/" + moveStats.pp;
        tooltipMove.querySelector(".tip-acc").innerText = (moveStats.acc == Infinity) ? "∞" : moveStats.acc + "%";
        tooltipMove.querySelector(".type-img").src = "types/" + moveStats.type + ".png";
        tooltipMove.classList.add("show");
    });
    document.getElementsByClassName("decisionMove")[i].addEventListener("mouseout", function () {
        document.getElementsByClassName("decisionMove")[i].parentElement.querySelector(".tooltip-move")?.classList.remove("show");
    });
}
function makeMove(name) {
    if (getPkmn(true).uncontrollable.turns > 0) {
        attacks.push({
            "user": playerToMove,
            "type": "move",
            "move": getPkmn(true).uncontrollable.move,
            "dirAttack": true
        });
        decisionNextPlayer();
        return;
    }
    attacks.push({
        "user": playerToMove,
        "type": "move",
        "move": name,
    });
    decisionNextPlayer();
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
    addSmallText("others", "hitTimes", {
        "number": [count + 1]
    });
}
function judgeHP() {
    if (getPkmn(false)?.hp <= 0) {
        getPkmn(false).hp = 0;
        if (playerToMove == 0) document.getElementById("p2Pokemon").style.backgroundImage = "none";
        else document.getElementById("p1Pokemon").style.backgroundImage = "none";
        addMainText("others", "faint", {
            "pokemon": [getName(getPkmn(false), false)],
            "isEnemy": ((viewpoint == -1) ? true : (!playerToMove != viewpoint))
        });
        battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
    }
    if (getPkmn(true)?.hp <= 0) {
        getPkmn(true).hp = 0;
        if (playerToMove == 1) document.getElementById("p2Pokemon").style.backgroundImage = "none";
        else document.getElementById("p1Pokemon").style.backgroundImage = "none";
        addMainText("others", "faint", {
            "pokemon": [getName(getPkmn(true), false)],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
        });
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
    for (let i of [0, 1]) {
        if (battleInfo[Number(i != viewpoint)].currentPokemon == -1) {
            document.getElementById(`p${i + 1}Gauge`).classList.add("hide");
        } else {
            document.getElementById(`p${i + 1}Gauge`).classList.remove("hide");
        }
    }
    for (let i of [0, 1]) {
        if (battleInfo[Number(i != viewpoint)].currentPokemon != -1) {
            let percentage = battleInfo[Number(i != viewpoint)].build[battleInfo[Number(i != viewpoint)].currentPokemon].hp /
                battleInfo[Number(i != viewpoint)].build[battleInfo[Number(i != viewpoint)].currentPokemon].maxHp * 100;
            document.getElementById(`p${i + 1}Bar`).style.width = percentage + "%";
            document.getElementById(`p${i + 1}Percentage`).innerText = percentage.toFixed(0) + "%";
            document.getElementById(`p${i + 1}Lv`).innerText = "Lv " + battleInfo[Number(i != viewpoint)].build[battleInfo[Number(
                i != viewpoint)].currentPokemon].lv;
            document.getElementById(`p${i + 1}Bar`).classList.remove("green", "yellow", "red");
            if (percentage >= 50) document.getElementById(`p${i + 1}Bar`).classList.add("green");
            else if (percentage >= 20) document.getElementById(`p${i + 1}Bar`).classList.add("yellow");
            else document.getElementById(`p${i + 1}Bar`).classList.add("red");
        }
    }
    document.getElementById("p1Status").innerHTML = "";
    document.getElementById("p2Status").innerHTML = "";
    for (let i of [0, 1]) if (battleInfo[Number(i != viewpoint)].currentPokemon != -1) {
        insertEffects(battleInfo[Number(i != viewpoint)].build[battleInfo[Number(i != viewpoint)].currentPokemon], document.getElementById(`p${i + 1}Status`), false);
    }
    for (let i of [0, 1]) {
        for (let j = 0; j < 6; j++) {
            let ballElement = document.getElementById("p" + (i + 1) + "Ball" + (j + 1));
            if (!battleInfo[Number(i != viewpoint)].build[j].revealed) {
                ballElement.style.backgroundImage = "url(pokemonicons-pokeball-sheet.png)";
                ballElement.style.backgroundPosition = "0 0";
                ballElement.dataset.for = "";
            } else {
                ballElement.style.backgroundImage = "url(pokemonicons-sheet.png)";
                ballElement.style.backgroundPosition = (-(ICONS[battleInfo[Number(i != viewpoint)].build[j]
                    .name].cell - 1) * 40) + "px " + (-(ICONS[battleInfo[Number(i != viewpoint)].build[j].name].row - 1) * 30) + "px";

                if (battleInfo[Number(i != viewpoint)].build[j].hp <= 0) {
                    ballElement.classList.add("faint");
                } else {
                    ballElement.classList.remove("faint");
                }
                ballElement.dataset.for = battleInfo[Number(i != viewpoint)].build[j].name;
            }
        }
    }
}
function renderTable() {
    for (let playerNo of [0, 1]) for (let i = 0; i < 6; i++) {
        document.querySelectorAll(".pkmnName[data-player='" + (playerNo + 1) + "']")[i].innerText = getL10n("pokemon", players[
            playerNo].build[i].name);
        for (let j = 0; j < 4; j++) {
            if (players[playerNo].build[i].moves[j]) {
                document.querySelectorAll(".pkmn[data-player='" + (playerNo + 1) + "']")[i].querySelectorAll(".move")[j].innerText
                    = getL10n("moves", players[playerNo].build[i].moves[j]);
            } else {
                document.querySelectorAll(".pkmn[data-player='" + (playerNo + 1) + "']")[i].querySelectorAll(".move")[j].innerText
                    = "(Empty)";
            }
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
        if (delta >= 2) word = "riseSharply";
        else if (delta == 1) word = "rise";
        else if (delta == -1) word = "fall";
        else word = "harshlyFall";
        addSmallText("others", word, {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "stats": [getL10n("stats", stat)],
            "isEnemy": (playerToMove == isSelf) != viewpoint
        });
    }
}
function modifyStatus(status, prob) {
    if ((getStats(getPkmn(false).name).type.includes("poison") && (status == "tox" || status == "psn"))
        || (getStats(getPkmn(false).name).type.includes("fire") && status == "brn")
        || (getStats(getPkmn(false).name).type.includes("ice") && status == "frz")) return;
    let rand = Math.random();
    if (rand >= prob) return;
    if (getPkmn(false).status == status) {
        if (status == "par") addSmallText("others", "alreadyParalyzed", {
            "pokemon": [getName(getPkmn(false), false)],
            "isEnemy": !playerToMove != viewpoint
        });
        return;
    }
    getPkmn(false).status = status;
    if (status == "tox") getPkmn(false).toxicCounter = 1;
    const SMALL_TEXT_KEY = {
        "par": "paralyzed",
        "frz": "frozenSolid",
        "psn": "poisoned",
        "tox": "badlyPoisoned",
        "brn": "burn"
    };
    for (let i of Object.keys(SMALL_TEXT_KEY)) if (status == i) {
        addSmallText("others", SMALL_TEXT_KEY[i], {
            "pokemon": [getName(getPkmn(false), false)],
            "isEnemy": !playerToMove != viewpoint
        });
        break;
    }
}
function putToSleep(isSelf, turns) {
    getPkmn(isSelf).status = "slp";
    getPkmn(isSelf).sleepTurns = turns;
    addSmallText("others", "fallAsleep", {
        "pokemon": [getName(getPkmn(isSelf), false)],
        "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
    });
}
function addTempEffect(isSelf, effect, turns, prob) {
    if (Math.random() < prob) {
        getPkmn(isSelf).tempEffect[effect] = turns;
        if (effect == "confused") addSmallText("others", "becomeConfused", {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
        else if (effect == "reflect" || effect == "light screen") addSmallText("others", "gainArmor", {
            "pokemon": [getName(getPkmn(isSelf), false)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
    }
}
document.getElementById("forfeit").addEventListener("click", function () {
    addSmallText("others", "forfeit", {
        "player": [battleInfo[playerToMove].name]
    });
    addMainText("others", "winBattle", {
        "player": [battleInfo[Number(!playerToMove)].name]
    });
    refreshSequence();
});
document.getElementById("viewpoint").addEventListener("click", function () {
    viewpoint = Number(!viewpoint);
    for (let i of document.querySelectorAll("[data-content]")) {
        let arr = JSON.parse(i.dataset.content);
        if (arr[2] && Object.keys(arr[2]).includes("isEnemy")) arr[2].isEnemy = !arr[2].isEnemy;
        i.dataset.content = JSON.stringify(arr);
        i.innerHTML = getL10n(...arr);
    }
    document.getElementById("viewpoint").innerText = getL10n("ui", "viewpoint", {
        "player": [battleInfo[viewpoint].name]
    });
    render();
    renderHP();
});
function refreshLang() {
    for (let i of document.querySelectorAll("[data-transl-cat]")) {
        i.innerText = TRANSLATION[settings.lang][i.dataset.translCat][i.dataset.translKey];
    }
}
refreshLang();
for (let i of document.querySelectorAll("[data-settings]")) {
    if (i.tagName.toLowerCase() == "select") i.value = settings[i.dataset.settings];
    else i.checked = settings[i.dataset.settings];
    i.addEventListener("change", function () {
        if (i.tagName.toLowerCase() == "select") settings[i.dataset.settings] = i.value;
        else settings[i.dataset.settings] = i.checked;
        localStorage.setItem("mechamonSettings", JSON.stringify(settings));
        applySetting(i.dataset.settings);
    });
    applySetting(i.dataset.settings);
}
function applySetting(key) {
    switch (key) {
        case "keyboardControls":
            if (settings.keyboardControls) {
                for (let j of document.querySelectorAll(".keyboard-shortcut")) j.classList.remove("hide");
            } else for (let j of document.querySelectorAll(".keyboard-shortcut")) j.classList.add("hide");
            break;
        case "effectivenessIndicator":
            if (settings.effectivenessIndicator) {
                for (let j of document.querySelectorAll(".effectiveness")) j.classList.remove("hide");
            } else for (let j of document.querySelectorAll(".effectiveness")) j.classList.add("hide");
            break;
        case "hardcoreMode":
            if (settings.hardcoreMode) {
                document.getElementById("recordContent").classList.add("hide");
                document.getElementById("turnNumber").classList.add("hide");
                document.getElementById("hardcoreTip").classList.remove("hide");
            } else {
                document.getElementById("recordContent").classList.remove("hide");
                document.getElementById("turnNumber").classList.remove("hide");
                document.getElementById("hardcoreTip").classList.add("hide");
            }
    }
}
for (let i of document.querySelectorAll(".lv")) i.addEventListener("blur", function () {
    if (Number.isNaN(Number(i.innerText))) {
        i.innerText = players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].lv;
    } else if (Number(i.innerText) > 100) {
        i.innerText = 100;
    } else if (Number(i.innerText) < 1) {
        i.innerText = 1;
    } else {
        i.innerText = Math.round(Number(i.innerText));
    }
    players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].lv = Number(i.innerText);
});
for (let i of document.querySelectorAll(".nick")) i.addEventListener("blur", function () {
    players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].nick = i.innerText;
});
document.addEventListener("keypress", function (e) {
    if (settings.keyboardControls) {
        if (e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4") document.querySelectorAll(".decisionMove")[Number(e
            .key) - 1].click();
        else {
            let keys = ["z", "x", "c", "v", "b", "n"];
            if (keys.includes(e.key.toLowerCase())) document.querySelectorAll(".decisionSwitch")[keys.indexOf(e.key
                .toLowerCase())].click();
        }
    }
});