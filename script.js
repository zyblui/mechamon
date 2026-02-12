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
    "effectivenessIndicator": false,
    "darkMode": false,
    "omiegamon": false
};
const PROPERTIES = ["atk", "def", "sp", "spe"];
if (localStorage.getItem("mechamonSettings")) {
    for (let i in settings) if (!Object.keys(JSON.parse(localStorage.getItem("mechamonSettings"))).includes(i)) {
        localStorage.setItem("mechamonSettings", JSON.stringify(settings));
        break;
    }
    settings = JSON.parse(localStorage.getItem("mechamonSettings"));
} else {
    localStorage.setItem("mechamonSettings", JSON.stringify(settings));
}
let players = [{
    "name": "Player 1",
    "build": [{
        "name": "geodude",
        "moves": ["earthquake", "rock slide", "body slam", "explosion"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "staryu",
        "moves": ["surf", "thunderbolt", "blizzard", "thunder wave"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "koffing",
        "moves": ["sludge", "fire blast", "thunderbolt", "explosion"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "tentacool",
        "moves": ["surf", "blizzard", "mega drain", "hydro pump"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "machop",
        "moves": ["submission", "earthquake", "rock slide", "body slam"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "eevee",
        "moves": ["substitute", "reflect", "body slam", "double-edge"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }]
}, {
    "name": "Player 2",
    "build": [{
        "name": "eevee",
        "moves": ["rage", "body slam", "double-edge", "quick attack"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "vulpix",
        "moves": ["flamethrower", "body slam", "confuse ray", "substitute"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "ponyta",
        "moves": ["toxic", "agility", "fire blast", "body slam"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "growlithe",
        "moves": ["agility", "body slam", "fire blast", "double-edge"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "psyduck",
        "moves": ["surf", "mega kick", "blizzard", "rage"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
        "nick": ""
    }, {
        "name": "poliwag",
        "moves": ["hypnosis", "amnesia", "surf", "psychic"],
        "lv": 5,
        "ev": 252,
        "dv": 15,
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
document.getElementById("playerToMove").innerText = getL10n("ui", "playerTurn", {
    "player": ["Player 1"]
});
document.getElementById("viewpoint").innerText = getL10n("ui", "viewpoint", {
    "player": ["Player 1"]
});
let record = [], recordPosition = 0, viewpoint = 0;
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
function render(info = battleInfo) {
    if (info[Number(viewpoint != 0)].currentPokemon != -1) document.getElementById("p1Pokemon").style.backgroundImage =
        "url('back/" + players[Number(viewpoint != 0)].build[info[Number(viewpoint != 0)].currentPokemon].name + ".png')";
    if (info[Number(viewpoint != 1)].currentPokemon != -1) document.getElementById("p2Pokemon").style.backgroundImage =
        "url('front/" + players[Number(viewpoint != 1)].build[info[Number(viewpoint != 1)].currentPokemon].name + ".png')";
    if (info[Number(viewpoint != 0)].currentPokemon != -1) document.getElementById("p1Name").innerText =
        getName(players[Number(viewpoint != 0)].build[info[Number(viewpoint != 0)].currentPokemon], false);
    if (info[Number(viewpoint != 1)].currentPokemon != -1) document.getElementById("p2Name").innerText =
        getName(players[Number(viewpoint != 1)].build[info[Number(viewpoint != 1)].currentPokemon], false);
}
function renderFull(info = battleInfo) {
    render(info);
    renderHP(info);
    if (info[0].currentPokemon == -1) document.getElementById("p1Pokemon").style.backgroundImage = "none";
    else if (info[1].currentPokemon == -1) document.getElementById("p2Pokemon").style.backgroundImage = "none";
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
function mergeTranslationData(from, to) {
    for (let i in from) for (let j in from[i]) for (let k in from[i][j]) {
        to[i][j][k] = from[i][j][k];
    }
}
function mergeIconData(from, to) {
    for (let i in from) to[i] = from[i];
}
function mergeMovePkmnData(from, to, tag) {
    for (let i of from) i.tag = tag;
    to.push(...from);
}
mergeTranslationData(TRANSLATION_OMIEGA, TRANSLATION);
mergeIconData(ICONS_OMIEGA, ICONS);
mergeMovePkmnData(MOVES_OMIEGA, MOVES, "omiega");
mergeMovePkmnData(POKEMON_OMIEGA, POKEMON, "omiega");
for (let i of POKEMON) {
    let div = document.createElement("div");
    div.classList.add("listButton");
    div.innerHTML = getL10n("pokemon", i.name);
    if (i.tag) div.dataset.tag = i.tag;
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
    } else if (battleInfo[playerToMove].currentPokemon == -1) for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("decisionMove")[i].disabled = "disabled";
        displayEffectiveness(document.getElementsByClassName("decisionMove")[i], "");
    } else {
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
    if (!getPkmn(false) || !move || getMoveStats(move).category == "status") button.querySelector(".effectiveness").innerText = "";
    else button.querySelector(".effectiveness").innerText = EFFECTIVENESS_ABBR[calculateEffectiveness(getMoveStats(move).type,
        getType(false))];
}
let turn = 0, playerToMove = 0, battleInfo = [];
function getDefaultProperties(playersInfo) {
    let arr = structuredClone(playersInfo);
    arr[0].currentPokemon = -1;
    arr[1].currentPokemon = -1;
    for (let i of arr) for (let j of i.build) {
        for (let k of POKEMON) {
            if (k.name == j.name) {
                j.maxHp = Math.floor(0.01 * (2 * (k.hp + j.dv) + Math.floor(0.25 * j.ev)) * j.lv) + j.lv + 10;
                j.hp = j.maxHp;
                break;
            }
        }
        for (let k of ["atk", "def", "sp", "spe"]) {
            j[k] = Math.floor(0.01 * (2 * (getStats(j.name)[k] + j.dv) + Math.floor(0.25 * j.ev)) * j.lv) + 5;
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
    return arr;
}
document.getElementById("startGame").addEventListener("click", function () {
    document.getElementById("recordContent").innerHTML = "";
    turn = 0;
    record = [];
    battleInfo = getDefaultProperties(players);
    playerToMove = 0;
    sendOutPkmn(battleInfo[0].build[0].name);
    playerToMove = 1;
    sendOutPkmn(battleInfo[1].build[0].name);
    nextTurn();
    render();
});
let sequence = [], refreshSequenceIsRunning = false;
function getSequenceL10n(args) {
    let tempArgs = structuredClone(args);
    if (tempArgs[2]) for (let i in tempArgs[2]) if (Array.isArray(tempArgs[2][i])) for (let j = 0; j < tempArgs[2][i].length;
        j++) if (Array.isArray(tempArgs[2][i][j])) tempArgs[2][i][j] = getSequenceL10n(tempArgs[2][i][j]);
    return getL10n(...tempArgs);
}
let bloURL = "";
function refreshSequence() {
    if (refreshSequenceIsRunning || !sequence.length) return;
    refreshSequenceIsRunning = true;
    let element = sequence.shift();
    record.push(element);
    recordPosition = record.length - 1;
    document.getElementById("currentStep").innerText = recordPosition + 1;
    document.getElementById("totalSteps").innerText = record.length;
    insertText(element, true);
    if (element.type == "main" || element.type == "small") renderFull(element.refresh);
    else if (element.type == "turn") document.getElementById("turnNumber").innerText = getSequenceL10n(element.args);
    let blo = new Blob([/*simplifyRecord(record)*/simplifyRecordJSON(record)], {
        type: "application/json"
    });
    URL.revokeObjectURL(bloURL);
    bloURL = URL.createObjectURL(blo);
    document.getElementById("saveReplay").setAttribute("href", bloURL);

    document.getElementById("recordContent").scroll({
        top: document.getElementById("recordContent").scrollHeight,
        left: 0,
        behavior: "smooth"
    });
    if (sequence.length) {
        if (sequence[0].type == "turn") {
            refreshSequenceIsRunning = false;
            refreshSequence();
        } else {
            setTimeout(function () {
                refreshSequenceIsRunning = false;
                refreshSequence();
            }, 600);
        }
    } else {
        refreshSequenceIsRunning = false;
        renderFull();
        refreshDecision();
    }

    judgeHP();
}
function simplifyRecordJSON(rec) {
    let tempRec = structuredClone(rec);
    for (let i = 0; i < tempRec.length; i++) {
        if (tempRec[i].refresh) {
            tempRec[i].delta = compare(getNearestRefresh(tempRec, i), tempRec[i].refresh);
            tempRec[i].refresh = undefined;
        }
    }
    return JSON.stringify(tempRec);
}
function readSimplifiedRecordJSON(lines) {
    let tempRec = JSON.parse(lines);
    for (let element of tempRec) {
        if (element.delta) {
            element.refresh = structuredClone(getNearestRefresh(record, record.length - 1));
            for (let j of element.delta) {
                modifyValue(element.refresh, j.property, j.value);
            }
        }
    }
    return tempRec;
}
document.getElementById("file").addEventListener("change", function () {
    READER.readAsText(document.getElementById("file").files[0]);
});
const READER = new FileReader();
READER.addEventListener("load", function () {
    record = readSimplifiedRecordJSON(READER.result);
    for (let i = 0; i < record.length; i++) insertText(record[i], true, i);
    recordPosition = record.length - 1;
    navigationRefresh();
    battleInfo = (record[recordPosition].refresh) ? record[recordPosition].refresh : getNearestRefresh(record, recordPosition);
});

function modifyValue(object, keys, value) {
    let tempObject = object;
    for (let i = 0; i < keys.length - 1; i++) {
        tempObject = tempObject[keys[i]];
    }
    tempObject[keys[keys.length - 1]] = value;
}
function simplifyRecord(rec) {
    let str = "";
    for (let i of [0, 1]) for (let j = 0; j < 6; j++) {
        str += (`[Setup ${i} ${j}`);
        for (let k of Object.keys(players[i].build[j])) str += `;${k}=${players[i].build[j][k]}`;
        str += "]\r\n";
    }
    for (let i = 0; i < rec.length; i++) {
        str += `[${capitalize(rec[i].type)} ${rec[i].args[1]}`;
        if (rec[i].args[2]) {
            for (let j of Object.keys(rec[i].args[2])) {
                str += `;${j}=${simplifyRecordValue(rec[i].args[2][j])}`;
            }
        }
        str += "]\r\n";
        if (rec[i].refresh) {
            let arr = compare(getNearestRefresh(rec, i), rec[i].refresh);
            for (let j of arr) str += `[Effect ${j.property} ${j.value}]\r\n`;
        }
    }
    return str;
}
function simplifyRecordValue(val, isInitial = true) {
    let tempVal = structuredClone(val);
    if (Array.isArray(tempVal)) {
        for (let i = 0; i < tempVal.length; i++) tempVal[i] = simplifyRecordValue(tempVal[i], false);
        if (isInitial) return tempVal;
        else return "(" + tempVal + ")";
    } else return tempVal;
}
function readSimplifiedRecord(lines) {
    record = [];
    for (let i of lines) {
        let params = sliceParams(i);
        switch (params[0].type) {
            case "setup":
                for (let j = 1; j < params.length; j++) {
                    players[params[0].args[0]].build[params[0].args[1]][params[j].param] = params[j].val;
                }
                battleInfo = getDefaultProperties(players);
                break;
            case "main":
            case "small": {
                let json = { "type": params[0].type };
                for (let j = 1; j < params.length; j++) {
                    json[j.param] = j.val;
                }
                record.push(json);
                break;
            }
            case "effect":
        }
    }
}
function sliceParams(line) {
    let arr = line.slice(1, -1).split(";");
    arr[0] = {
        "type": arr[0].split(" ")[0].toLowerCase(),
        "args": arr[0].split(" ").slice(1)
    };
    for (let i = 1; i < arr.length; i++) {
        arr[i] = {
            "param": arr[i].split("=")[0],
            "val": arr[i].split("=")[1]
        };
    }
    return arr;
}
function getNearestRefresh(rec, i) {
    for (let j = i - 1; j >= 0; j--) if (rec[j].refresh) return rec[j].refresh;
    return getDefaultProperties(players);
}
function compare(before, after) {
    let arr = [];
    for (let i of Object.keys(after)) if (typeof after[i] != "object" && before[i] != after[i]) arr.push({
        "property": [i],
        "value": after[i]
    }); else if (typeof after[i] == "object") for (let j of compare(before[i], after[i])) arr.push({
        "property": [i, ...j.property],
        "value": j.value
    });
    return arr;
}
function addMainText(...args) {
    for (let i of document.querySelectorAll(".decisionMove,.decisionSwitch")) {
        i.disabled = "disabled";
    }
    sequence.push({
        "type": "main",
        "args": args,
        "refresh": structuredClone(battleInfo)
    });
}
function addSmallText(...args) {
    for (let i of document.querySelectorAll(".decisionMove,.decisionSwitch")) {
        i.disabled = "disabled";
    }
    sequence.push({
        "type": "small",
        "args": args,
        "refresh": structuredClone(battleInfo)
    });
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
    addMainText("others", "go", {
        "pokemon": [["pokemon", pkmn]],
        "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
    });
}
function addTooltip(elementGroup, i, player = playerToMove) {
    if (!elementGroup[i].dataset.for || !getStats(elementGroup[i].dataset.for)) return;
    let tooltip;
    if (!elementGroup[i].parentElement.querySelector(".tooltip")) {
        tooltip = document.querySelector(".tooltip").cloneNode(true);
        if (elementGroup[i].parentElement.id == "p2Balls") tooltip.classList.add("under");
        else tooltip.classList.remove("under");
        elementGroup[i].parentElement.insertBefore(tooltip, elementGroup[i]);
    }
    tooltip = elementGroup[i].parentElement.querySelector(".tooltip");
    tooltip.querySelector(".tip-name").innerText = getL10n("pokemon", elementGroup[i].dataset.for);
    let stats = getStats(elementGroup[i].dataset.for);
    tooltip.querySelector(".img-left").style.background = "url(pokemonicons-sheet.png) no-repeat scroll -" +
        (ICONS[elementGroup[i].dataset.for].cell - 1) * 40 + "px -" + (
            ICONS[elementGroup[i].dataset.for].row - 1) * 30 + "px";
    tooltip.querySelector(".tip-desc").innerText = getL10n("pkmnDesc", elementGroup[i].dataset.for);
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
    insertEffects(battleInfo[player].build[i], tooltip.querySelector(".tip-status"), true);

    for (let j = 0; j < 4; j++) {
        let totalPp = getMoveStats(Object.keys(battleInfo[player].build[i].moves)[j])?.pp;
        let ppRemaining = Object.values(battleInfo[player].build[i].moves)[j];
        if (Object.keys(battleInfo[player].build[i].moves)[j] && ((player != playerToMove && ppRemaining < totalPp) ||
            (player == playerToMove))) {
            tooltip.querySelectorAll(".move-name")[j].innerText = getL10n("moves", Object.keys(battleInfo[player]
                .build[i].moves)[j]);
            tooltip.querySelectorAll(".pp-remaining")[j].innerText = ppRemaining;
            tooltip.querySelectorAll(".pp .sub")[j].innerText = "/" + totalPp;
            if (Object.values(battleInfo[player].build[i].moves)[j] == getMoveStats(Object
                .keys(battleInfo[player].build[i].moves)[j]).pp) tooltip.querySelectorAll(".move-name")[j].classList
                    .add("unknown");
            else tooltip.querySelectorAll(".move-name")[j].classList.remove("unknown");
        } else if (player == playerToMove) addGrayMove(tooltip, j, "empty", 0, "/0");
        else addGrayMove(tooltip, j, "unknownMove", "?", "/?");
    }
    tooltip.querySelector(".hp-remaining").innerText = (battleInfo[player].build[i].hp / battleInfo[player]
        .build[i].maxHp * 100).toFixed(0) + "%";
    if (player == playerToMove) tooltip.querySelector(".hp .sub").innerText = ", " + battleInfo[player].build[i].hp
        .toFixed(0) + "/" + battleInfo[player].build[i].maxHp;
    else tooltip.querySelector(".hp .sub").innerText = "";
    tooltip.classList.add("show");
}
function addGrayMove(tooltip, j, textKey, ppRemaining, subText) {
    tooltip.querySelectorAll(".move-name")[j].innerText = getL10n("ui", textKey);
    tooltip.querySelectorAll(".pp-remaining")[j].innerText = ppRemaining;
    tooltip.querySelectorAll(".pp .sub")[j].innerText = subText;
    tooltip.querySelectorAll(".move-name")[j].classList.add("unknown");
}
const TOOLTIP_PLAYER = {
    ".decisionSwitch": undefined,
    "#p1Balls .ball": 0,
    "#p2Balls .ball": 1
};
for (let i = 0; i < 6; i++) {
    document.getElementsByClassName("decisionSwitch")[i].addEventListener("click", function () {
        switchPkmn(document.getElementsByClassName("decisionSwitch")[i].dataset.for);
    });
    for (let j in TOOLTIP_PLAYER) {
        document.querySelectorAll(j)[i].addEventListener("mouseover", function () {
            addTooltip(document.querySelectorAll(j), i, TOOLTIP_PLAYER[j]);
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
    if (battleInfo[playerToMove].currentPokemon == -1) {
        sendOutPkmn(name);
        endTurn();
    } else {
        attacks.push({
            "user": playerToMove,
            "type": "switch",
            "pkmn": name
        });
        decisionNextPlayer();
    }
}
let isNewTurn = false;
function dealDmg(isSelf, dmg) {
    if (arguments[2]?.opposingSubstitute && getPkmn(!isSelf).substituteHp > 0) {
        getPkmn(!isSelf).substituteHp -= Math.min(dmg, getPkmn(!isSelf).substituteHp);
        if (getPkmn(!isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(!isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (((!isSelf) == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(!isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (((!isSelf) == playerToMove) != viewpoint))
        });
    } else if (getPkmn(isSelf).substituteHp > 0 && !arguments[2]?.ignoreSubstitute) {
        getPkmn(isSelf).substituteHp -= Math.min(dmg, getPkmn(isSelf).substituteHp);
        if (getPkmn(isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
    } else {
        dmg = Math.min(dmg, getPkmn(isSelf).hp);
        getPkmn(isSelf).hp -= dmg;
        addSmallText("others", "loseHealth", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "percentage": [(dmg / getPkmn(isSelf).maxHp * 100).toFixed(0)],
            "isEnemy": ((viewpoint == -1) ? false : ((isSelf == playerToMove) != viewpoint)),
            "hardcoreHide": true
        });
    }
}
let nextPlayerEffect = [{
    "name": "delay",
    "condition": function () { return true; },
    "effect": function () {
        for (let i = 0; i < getPkmn(true).delay.length; i++) {
            if (getPkmn(true).delay[i].turns > 0) getPkmn(true).delay[i].turns--;
            else {
                getPkmn(true).delay[i].effect();
                getPkmn(true).delay.splice(i, 1);
                i--;
            }
        }
    }
}, {
    "name": "disable",
    "condition": function () { return true; },
    "effect": function () {
        if (getPkmn(true).disable.turns > 0) getPkmn(true).disable.turns--;
        else getPkmn(true).disable.move = "";
    }
}, {
    "name": "par",
    "condition": function () { return getPkmn(true).status == "par" && Math.random() < 1 / 4; },
    "effect": function () {
        addMainText("others", "unableToMove", {
            "pokemon": [getName(getPkmn(true), false, true)],
            "isEnemy": playerToMove != viewpoint
        });
        return { "continue": true };
    }
}, {
    "name": "frz",
    "condition": function () { return getPkmn(true).status == "frz"; },
    "exclude": "par",
    "effect": function () {
        addMainText("others", "frozenSolid", {
            "pokemon": [getName(getPkmn(true), false, true)],
            "isEnemy": playerToMove != viewpoint
        });
        return { "continue": true };
    }
}, {
    "name": "charge",
    "condition": function () { return getPkmn(true).charge.turns > 0; },
    "exclude": "frz",
    "effect": function () {
        getPkmn(true).charge.turns--;
        if (getPkmn(true).charge.move && getPkmn(true).charge.turns == 0 && getPkmn(true).charge.move) {
            attack(getPkmn(true).charge.move);
            getPkmn(true).charge.move = "";
        } else {
            return { "continue": true };
        }
    }
}, {
    "name": "uncontrollable",
    "condition": function () { return getPkmn(true).uncontrollable.turns > 0; },
    "exclude": "charge",
    "effect": function () {
        getPkmn(true).uncontrollable.turns--;
        if (getPkmn(true).uncontrollable.move && getPkmn(true).uncontrollable.turns == 0) {
            getPkmn(true).uncontrollable.move = "";
        }
    }
}, {
    "name": "slp",
    "condition": function () { return getPkmn(true).status == "slp"; },
    "exclude": "uncontrollable",
    "effect": function () {
        getPkmn(true).sleepTurns--;
        if (getPkmn(true).sleepTurns > 0) {
            addMainText("others", "fastAsleep", {
                "pokemon": [getName(getPkmn(true), false, true)],
                "isEnemy": playerToMove != viewpoint
            });
        } else if (getPkmn(true).sleepTurns == 0) {
            addSmallText("others", "wakeUp", {
                "pokemon": [getName(getPkmn(true), false, true)],
                "isEnemy": playerToMove != viewpoint
            });
            getPkmn(true).status = "";
        }
        return { "continue": true };
    }
}, {
    "name": "confused",
    "condition": function () { return getPkmn(true).tempEffect.confused > 0; },
    "exclude": "slp",
    "effect": function () {
        addSmallText("others", "confused", {
            "pokemon": [getName(getPkmn(true), false, true)],
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
}];
function nextPlayer(player) {
    playerToMove = player;
    let matchedConditions = [];
    if (!getPkmn(true)) return;
    for (let i of nextPlayerEffect) if (i.condition()) {
        matchedConditions.push(i.name);
        if (!(i.exclude && matchedConditions.includes(i.exclude))) {
            let additionalInfo = i.effect();
            if (additionalInfo) return additionalInfo;
        }
    }
}
function insertCustomNextPlayerEffect(insertAfter, effectJSON) {
    if (!insertAfter) nextPlayerEffect.unshift(effectJSON);
    for (let i = 0; i < nextPlayerEffect.length; i++) if (nextPlayerEffect[i].name == insertAfter) nextPlayerEffect.splice(i +
        1, 0, effectJSON);
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
                "pokemon": [getName(getPkmn(true), false, true)],
                "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
            });
            sendOutPkmn(i.pkmn);
            continue;
        }
        if (nextPlayerInfo?.continue) continue;
        addMainText("others", "use", {
            "pokemon": [getName(getPkmn(true), false, true)],
            "moves": [["moves", i.move]],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint)),
            //"notation":i.move
        });

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
                addSmallText("others", "attackMiss", {
                    "pokemon": [getName(getPkmn(true), false, true)],
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
            "pokemon": [getName(getPkmn(i), false, true)],
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
function getName(pkmn, showSpeciesName, returnArr) {
    let arr = [];
    if (pkmn.nick) {
        if (showSpeciesName) arr = ["others", "nick", {
            "nick": [pkmn.nick],
            "pokemon": [getL10n("pokemon", pkmn.name)]
        }];
        else return pkmn.nick;
    }
    else arr = ["pokemon", pkmn.name];
    if (returnArr) return arr;
    else return getL10n(...arr);
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
                        "pokemon": [getName(getPkmn(false), false, true)],
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
    document.getElementById("playerToMove").innerText = getL10n("ui", "playerTurn", {
        "player": ["Player " + (ptm + 1)]
    });
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
        let faintedPkmn = getPkmn(false);
        battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
        addMainText("others", "faint", {
            "pokemon": [getName(faintedPkmn, false, true)],
            "isEnemy": ((viewpoint == -1) ? true : (!playerToMove != viewpoint))
        });
    }
    if (getPkmn(true)?.hp <= 0) {
        getPkmn(true).hp = 0;
        let faintedPkmn = getPkmn(true);
        battleInfo[playerToMove].currentPokemon = -1;
        addMainText("others", "faint", {
            "pokemon": [getName(faintedPkmn, false, true)],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
        });
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
function renderHP(info = battleInfo) {
    for (let i of [0, 1]) {
        if (info[Number(i != viewpoint)].currentPokemon == -1) {
            document.getElementById(`p${i + 1}Gauge`).classList.add("hide");
        } else {
            document.getElementById(`p${i + 1}Gauge`).classList.remove("hide");
        }
    }
    for (let i of [0, 1]) {
        if (info[Number(i != viewpoint)].currentPokemon != -1) {
            let percentage = info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon].hp /
                info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon].maxHp * 100;
            document.getElementById(`p${i + 1}Bar`).style.width = percentage + "%";
            document.getElementById(`p${i + 1}Percentage`).innerText = percentage.toFixed(0) + "%";
            document.getElementById(`p${i + 1}Lv`).innerText = "Lv " + info[Number(i != viewpoint)].build[info[Number(
                i != viewpoint)].currentPokemon].lv;
            document.getElementById(`p${i + 1}Bar`).classList.remove("green", "yellow", "red");
            if (percentage >= 50) document.getElementById(`p${i + 1}Bar`).classList.add("green");
            else if (percentage >= 20) document.getElementById(`p${i + 1}Bar`).classList.add("yellow");
            else document.getElementById(`p${i + 1}Bar`).classList.add("red");
        }
    }
    document.getElementById("p1Status").innerHTML = "";
    document.getElementById("p2Status").innerHTML = "";
    for (let i of [0, 1]) if (info[Number(i != viewpoint)].currentPokemon != -1) {
        insertEffects(info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon], document.getElementById(`p${i + 1}Status`), false);
    }
    for (let i of [0, 1]) {
        for (let j = 0; j < 6; j++) {
            let ballElement = document.getElementById("p" + (i + 1) + "Ball" + (j + 1));
            if (!info[Number(i != viewpoint)].build[j].revealed) {
                ballElement.style.backgroundImage = "url(pokemonicons-pokeball-sheet.png)";
                ballElement.style.backgroundPosition = "0 0";
                ballElement.dataset.for = "";
            } else {
                ballElement.style.backgroundImage = "url(pokemonicons-sheet.png)";
                ballElement.style.backgroundPosition = (-(ICONS[info[Number(i != viewpoint)].build[j]
                    .name].cell - 1) * 40) + "px " + (-(ICONS[info[Number(i != viewpoint)].build[j].name].row - 1) * 30) + "px";

                if (info[Number(i != viewpoint)].build[j].hp <= 0) {
                    ballElement.classList.add("faint");
                } else {
                    ballElement.classList.remove("faint");
                }
                ballElement.dataset.for = info[Number(i != viewpoint)].build[j].name;
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
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "stats": [["stats", stat]],
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
            "pokemon": [getName(getPkmn(false), false, true)],
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
            "pokemon": [getName(getPkmn(false), false, true)],
            "isEnemy": !playerToMove != viewpoint
        });
        break;
    }
}
function putToSleep(isSelf, turns) {
    getPkmn(isSelf).status = "slp";
    getPkmn(isSelf).sleepTurns = turns;
    addSmallText("others", "fallAsleep", {
        "pokemon": [getName(getPkmn(isSelf), false, true)],
        "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
    });
}
function addTempEffect(isSelf, effect, turns, prob) {
    if (Math.random() < prob) {
        getPkmn(isSelf).tempEffect[effect] = turns;
        if (effect == "confused") addSmallText("others", "becomeConfused", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : ((isSelf == playerToMove) != viewpoint))
        });
        else if (effect == "reflect" || effect == "light screen") addSmallText("others", "gainArmor", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
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
        i.innerHTML = getSequenceL10n(arr);
    }
    document.getElementById("viewpoint").innerText = getL10n("ui", "viewpoint", {
        "player": [battleInfo[viewpoint].name]
    });
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
                document.querySelector("body").classList.add("hardcore-hide-container");
            } else {
                document.getElementById("recordContent").classList.remove("hide");
                document.getElementById("turnNumber").classList.remove("hide");
                document.getElementById("hardcoreTip").classList.add("hide");
                document.querySelector("body").classList.remove("hardcore-hide-container");
            }
            break;
        case "darkMode":
            if (settings.darkMode) {
                document.getElementById("body").classList.add("dark");
                document.getElementById("body").classList.remove("light");
            } else {
                document.getElementById("body").classList.remove("dark");
                document.getElementById("body").classList.add("light");
            }
            break;
        case "omiegamon":
            if (settings.omiegamon) for (let i of document.querySelectorAll("[data-tag='omiega']")) i.classList.remove("hide");
            else for (let i of document.querySelectorAll("[data-tag='omiega']")) i.classList.add("hide");
    }
}
for (let i of document.querySelectorAll(".nick")) i.addEventListener("blur", function () {
    players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].nick = i.innerText;
});
function addUpdateValueListener(name, min, max) {
    for (let i of document.querySelectorAll("." + name)) i.addEventListener("blur", function () {
        if (Number.isNaN(Number(i.innerText))) {
            i.innerText = players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1][name];
        } else if (Number(i.innerText) > max) {
            i.innerText = max;
        } else if (Number(i.innerText) < min) {
            i.innerText = min;
        } else {
            i.innerText = Math.round(Number(i.innerText));
        }
        players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1][name] = Number(i.innerText);
    });
}
addUpdateValueListener("lv", 1, 100);
addUpdateValueListener("ev", 0, 252);
addUpdateValueListener("dv", 0, 15);
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
document.getElementById("navFirst").addEventListener("click", function () {
    recordPosition = 0;
    navigationRefresh();
});
document.getElementById("navPrev").addEventListener("click", function () {
    if (recordPosition != 0) recordPosition--;
    navigationRefresh();
});
document.getElementById("navNext").addEventListener("click", function () {
    if (recordPosition != record.length - 1) recordPosition++;
    navigationRefresh();
});
document.getElementById("navLast").addEventListener("click", function () {
    recordPosition = record.length - 1;
    navigationRefresh();
});
function navigationRefresh() {
    renderFull((record[recordPosition].refresh) ? record[recordPosition].refresh : getNearestRefresh(record, recordPosition));
    document.getElementById("currentStep").innerText = recordPosition + 1;
    document.getElementById("totalSteps").innerText = record.length;
    let tempTurnNumber = 0;
    for (let j = recordPosition; j >= 0; j--) if (record[j].type == "turn") {
        tempTurnNumber = record[j].args[2].number[0];
        break;
    }
    document.getElementById("turnNumber").innerText = getL10n("others", "turn", {
        "number": [tempTurnNumber]
    });
    let mainTextRangeLeft = 0, mainTextRangeRight = record.length - 1;
    for (let j = recordPosition; j >= 0; j--) if (record[j].type == "main") {
        mainTextRangeLeft = j;
        break;
    }
    for (let j = recordPosition + 1; j < record.length; j++) if (record[j].type == "main") {
        mainTextRangeRight = j - 1;
        break;
    }
    let stepOfMainTextInText = document.querySelector("#text [data-step].main-text").dataset.step;
    if (stepOfMainTextInText > mainTextRangeRight || stepOfMainTextInText < mainTextRangeLeft) {
        document.getElementById("text").innerHTML = "";
        for (let i = mainTextRangeLeft; i <= mainTextRangeRight; i++) {
            insertText(record[i], false, i);
        }
    }
    for (let i of document.querySelectorAll("[data-step]")) {
        if (i.dataset.step > recordPosition) i.classList.add("navigation-hide");
        else i.classList.remove("navigation-hide");
    }
}
function insertElementWithClass(elementName, item, parentId, classList, step = recordPosition) {
    let tempElement = document.createElement(elementName);
    tempElement.innerHTML = getSequenceL10n(item.args);
    tempElement.classList.add(...classList);
    tempElement.dataset.content = JSON.stringify(item.args);
    tempElement.dataset.step = step;
    document.getElementById(parentId).appendChild(tempElement);
}
function insertText(recordItem, insertRecordContent, step = recordPosition) {
    if (recordItem.type == "main") {
        document.getElementById("text").innerHTML = "";
        insertElementWithClass("div", recordItem, "text", ["main-text"], step);
        if (insertRecordContent) insertElementWithClass("div", recordItem, "recordContent", ["main-text"], step);
    } else if (recordItem.type == "small") {
        if (recordItem.args[2]?.hardcoreHide) insertElementWithClass("div", recordItem, "text", ["small-text",
            "hardcore-hide"], step);
        else insertElementWithClass("div", recordItem, "text", ["small-text"], step);
        if (insertRecordContent) insertElementWithClass("div", recordItem, "recordContent", ["small-text"], step);
    } else if (recordItem.type == "turn") {
        if (insertRecordContent) insertElementWithClass("h2", recordItem, "recordContent", ["turn-number"], step);
    }
}