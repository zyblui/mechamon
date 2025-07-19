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
}]
document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[0].name + ".png')";
document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[0].name + ".png')";
document.getElementById("p1Name").innerText = capitalize(players[0].build[0].name);
document.getElementById("p2Name").innerText = capitalize(players[1].build[0].name);
function render() {
    document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[battleInfo[0].currentPokemon].name + ".png')";
    document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[battleInfo[1].currentPokemon].name + ".png')";
    document.getElementById("p1Name").innerText = capitalize(players[0].build[battleInfo[0].currentPokemon].name);
    document.getElementById("p2Name").innerText = capitalize(players[1].build[battleInfo[1].currentPokemon].name);
}
function capitalize(str) {
    let temp = str.split(" ");
    for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1)
    }
    temp = temp.join(" ");
    temp = temp.split("-");
    for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1)
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
    })
    document.getElementById("pokemonList").appendChild(div);
}
for (let i of document.getElementsByClassName("pokemon-select")) {
    i.addEventListener("click", function () {
        document.querySelector(".pokemon-select.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.getElementById("pokemonList").classList.add("show")
    })
}
function calculateDmg(power, atk, def, attackType, defenseType) {
    let effectiveness = calculateEffectiveness(attackType, defenseType);
    return Math.max(effectiveness * (power + atk - def), 0);
}
function calculateEffectiveness(attackType, defenseType) {
    let effectiveness = 1;
    for (let i of defenseType) {
        effectiveness *= multiplier[attackType][i]
    }
    return effectiveness;
}
function refreshDecision() {
    if (battleInfo[playerToMove].currentPokemon != -1) {
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "";
            document.getElementsByClassName("decisionMove")[i].innerText = capitalize(getPkmn(true).moves[i])
        }
    } else {
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "disabled";
        }
    }
    for (let i = 0; i < 6; i++) {
        document.getElementsByClassName("decisionSwitch")[i].innerText = capitalize(players[playerToMove].build[i].name)
        document.getElementsByClassName("decisionSwitch")[i].classList.remove("selected")
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
            j.atkStage = 0;
            j.defStage = 0;
            j.spStage = 0;
            j.speStage = 0;
            j.status = []
        }
    }
    nextTurn();
    refreshDecision();
})
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
        battleInfo[playerToMove].currentPokemon = i;
        render();
        renderHP();
        nextPlayer();
        refreshDecision();
    })
}
let isNewTurn = false;
function nextPlayer() {
    if (isNewTurn) {
        isNewTurn = false;
        playerToMove = (playerToMove == 0) ? 1 : 0;
        if (getPkmn(true).status.includes("par") && Math.random() < 1 / 4) {
            addSmallText(capitalize(getPkmn(true).name) + " is paralyzed! It cannot move!")
            nextPlayer();
        }
    } else {
        nextTurn();
    }
}
function nextTurn() {
    turn++;
    isNewTurn = true;
    document.getElementById("turnNumber").innerText = "Turn " + turn;
    let h2 = document.createElement("h2");
    h2.classList.add("turn-number");
    h2.innerText = "Turn " + turn;
    document.getElementById("record").appendChild(h2);
    if (battleInfo[1].currentPokemon == -1 && battleInfo[0].currentPokemon == -1) playerToMove = Math.round(Math.random())
    else if (battleInfo[1].currentPokemon == -1) playerToMove = 1;
    else if (battleInfo[0].currentPokemon == -1) playerToMove = 0;
    else {
        let p1Spe = getStats(battleInfo[0].build[battleInfo[0].currentPokemon].name).spe * STAGE_MULTIPLIER[battleInfo[0].build[battleInfo[0].currentPokemon].speStage] * ((battleInfo[0].build[battleInfo[0].currentPokemon].status.includes("par")) ? 0.25 : 1)
        let p2Spe = getStats(battleInfo[1].build[battleInfo[1].currentPokemon].name).spe * STAGE_MULTIPLIER[battleInfo[1].build[battleInfo[1].currentPokemon].speStage] * ((battleInfo[1].build[battleInfo[1].currentPokemon].status.includes("par")) ? 0.25 : 1)
        if (p1Spe > p2Spe) {
            playerToMove = 0;
        } else if (p1Spe < p2Spe) {
            playerToMove = 1;
        } else {
            playerToMove = Math.round(Math.random());
        }
    }
    if (getPkmn(true).status.includes("par") && Math.random() < 1 / 4) {
        addSmallText(capitalize(getPkmn(true).name) + " is paralyzed! It cannot move!");
        nextPlayer();
    }
}
function getStats(name) {
    for (let i of pokemon) {
        if (i.name == name) return i;
    }
}
function getPkmn(isSelf) {
    if (isSelf) return battleInfo[playerToMove].build[battleInfo[playerToMove].currentPokemon];
    else return battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon];
}
for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("decisionMove")[i].addEventListener("click", function () {
        addMainText(capitalize(players[playerToMove].build[battleInfo[playerToMove].currentPokemon].name) + " used <strong>" + document.getElementsByClassName("decisionMove")[i].innerText + "</strong>!")
        for (let k of moves) if (capitalize(k.name) == document.getElementsByClassName("decisionMove")[i].innerText) {
            let criticalHitRatioMultiplier = 1;
            if (k.category != "status" && Math.random() > k.acc / 100) {
                addSmallText(capitalize(getPkmn(true).name) + "'s attack missed!")
                break;
            }
            let dmg = 0;
            if (k.category == "physical") dmg = calculateDmg(k.power, getStats(getPkmn(true).name).atk, getStats(getPkmn(false).name).def, k.type, getStats(getPkmn(false).name).type);
            else dmg = calculateDmg(k.power, getStats(getPkmn(true).name).sp, getStats(getPkmn(false).name).sp, k.type, getStats(getPkmn(false).name).type);
            if (k.category != "status") {
                addSmallText("(" + capitalize(getPkmn(false).name) + " lost " + (Math.min(dmg, getPkmn(false).hp) / getPkmn(false).maxHp * 100).toFixed(0) + "% of its health!)");
                switch (calculateEffectiveness(k.type, getStats(getPkmn(false).name).type)) {
                    case 4:
                        addSmallText("It's super effective!");
                        break;
                    case 2:
                        addSmallText("It's super effective!");
                        break;
                    case 0.5:
                        addSmallText("It's not very effective...");
                        break;
                    case 0.25:
                        addSmallText("It's not very effective...");
                        break;
                    case 0:
                        addSmallText("It doesn't affect " + capitalize(getPkmn(false).name) + "...");
                }
                getPkmn(false).hp -= Math.min(dmg, getPkmn(false).hp);
            }
            if (k.effect) k.effect();
            if (k.category != "status") {
                if (Math.random() < criticalHitRatioMultiplier * getPkmn(true).spe * 100 / 512) {
                    getPkmn(false).hp -= Math.min(dmg, getPkmn(false).hp);
                    addSmallText("A critical hit!");
                }
            }
            if (getPkmn(false).hp <= 0) {
                getPkmn(false).hp = 0;
                if (playerToMove == 0) document.getElementById("p2Pokemon").style.backgroundImage = "none";
                else document.getElementById("p1Pokemon").style.backgroundImage = "none";
                addMainText(capitalize(getPkmn(false).name) + " fainted!");
                battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
            }
            if (getPkmn(true).hp <= 0) {
                getPkmn(true).hp = 0;
                if (playerToMove == 1) document.getElementById("p2Pokemon").style.backgroundImage = "none";
                else document.getElementById("p1Pokemon").style.backgroundImage = "none";
                addMainText(capitalize(getPkmn(true).name) + " fainted!");
                battleInfo[playerToMove].currentPokemon = -1;
            }
            break;
        }
        renderHP();
        nextPlayer()
        refreshDecision();
    })
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
}
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
    if (battleInfo[0].currentPokemon != -1) {
        document.getElementById("p1Bar").style.width = battleInfo[0].build[battleInfo[0].currentPokemon].hp / battleInfo[0].build[battleInfo[0].currentPokemon].maxHp * 100 + "%";
        document.getElementById("p1Percentage").innerText = (battleInfo[0].build[battleInfo[0].currentPokemon].hp / battleInfo[0].build[battleInfo[0].currentPokemon].maxHp * 100).toFixed(0) + "%";
    }
    if (battleInfo[1].currentPokemon != -1) {
        document.getElementById("p2Bar").style.width = battleInfo[1].build[battleInfo[1].currentPokemon].hp / battleInfo[1].build[battleInfo[1].currentPokemon].maxHp * 100 + "%"
        document.getElementById("p2Percentage").innerText = (battleInfo[1].build[battleInfo[1].currentPokemon].hp / battleInfo[1].build[battleInfo[1].currentPokemon].maxHp * 100).toFixed(0) + "%";
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
            span.innerText = "[" + capitalize(i) + " x" + Number(STAGE_MULTIPLIER[battleInfo[0].build[battleInfo[0].currentPokemon][i + "Stage"]].toFixed(2)) + "]"
            document.getElementById("p1Status").appendChild(span);
        }
        if (battleInfo[1].currentPokemon != -1 && battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"] != 0) {
            let span = document.createElement("span");
            if (battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"] > 0) {
                span.classList.add("buff");
            } else {
                span.classList.add("debuff");
            }
            span.innerText = "[" + capitalize(i) + " x" + Number(STAGE_MULTIPLIER[battleInfo[1].build[battleInfo[1].currentPokemon][i + "Stage"]].toFixed(2)) + "]"
            document.getElementById("p2Status").appendChild(span);
        }
    }
    let status = ["par", "tox", "psn", "slp", "frz", "brn"]
    if (battleInfo[0].currentPokemon != -1) for (let i of battleInfo[0].build[battleInfo[0].currentPokemon].status) {
        let span = document.createElement("span");
        span.innerText = "[" + i.toUpperCase() + "]";
        span.classList.add(i);
        document.getElementById("p1Status").appendChild(span);
    }
    if (battleInfo[1].currentPokemon != -1) for (let i of battleInfo[1].build[battleInfo[1].currentPokemon].status) {
        let span = document.createElement("span");
        span.innerText = "[" + i.toUpperCase() + "]";
        span.classList.add(i);
        document.getElementById("p2Status").appendChild(span);
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
    })
}
const STAT_NAMES = {
    "def": "Defense",
    "atk": "Attack",
    "sp": "Special",
    "spe": "Speed"
}
function modifyStats(isSelf, stat, delta, prob) {
    let rand = Math.random();
    if (rand < prob && getPkmn(isSelf)[stat + "Stage"] + delta >= -6 && getPkmn(isSelf)[stat + "Stage"] + delta <= 6) {
        getPkmn(isSelf)[stat + "Stage"] += delta;
        let word = ""
        if (delta >= 2) word = "rose sharply";
        else if (delta == 1) word = "rose";
        else if (delta == -1) word = "fell";
        else word = "fell sharply"
        addSmallText(capitalize(getPkmn(isSelf).name) + "'s " + STAT_NAMES[stat] + " " + word + "!")
    }
}
function modifyStatus(status, prob) {
    let rand = Math.random();
    if (rand < prob && !getPkmn(false).status.includes(status)) {
        getPkmn(false).status.push(status)
    }
}