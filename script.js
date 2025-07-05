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
        document.querySelector(".pokemon-select.selected").innerText = capitalize(i.name)
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
function refreshDecision() {
    if (battleInfo[playerToMove].currentPokemon != -1) {
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName("decisionMove")[i].disabled = "";
            document.getElementsByClassName("decisionMove")[i].innerText = capitalize(battleInfo[playerToMove].build[battleInfo[playerToMove].currentPokemon].moves[i])
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
        else if(battleInfo[playerToMove].currentPokemon==i){
            document.getElementsByClassName("decisionSwitch")[i].disabled = "disabled";
            document.getElementsByClassName("decisionSwitch")[i].classList.add("selected");
        }else  document.getElementsByClassName("decisionSwitch")[i].disabled = "";
    }
}
let turn = 0, playerToMove = 0, battleInfo = [];
document.getElementById("startGame").addEventListener("click", function () {
    turn = 1;
    battleInfo = JSON.parse(JSON.stringify(players));
    battleInfo[0].currentPokemon = 0;
    battleInfo[1].currentPokemon = 0;
    for (let i of battleInfo) {
        for (let j of i.build) {
            for (let k of pokemon) {
                if (k.name == j.name) {
                    j.hp = k.hp;
                    break;
                }
            }
        }
    }
    refreshDecision();
})
function addMainText(str) {
    document.getElementById("text").innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = str;
    div.classList.add("main-text");
    document.getElementById("text").appendChild(div);
}
function addSmallText() {

}
for (let i = 0; i < 6; i++) {
    document.getElementsByClassName("decisionSwitch")[i].addEventListener("click", function () {
        addMainText(capitalize(players[playerToMove].build[0].name) + ", come back!");
        addMainText("Go! <strong>" + document.getElementsByClassName("decisionSwitch")[i].innerText + "</strong>!");
        battleInfo[playerToMove].currentPokemon = i;
        render();
        renderHP();
        playerToMove = (playerToMove == 0) ? 1 : 0;
        refreshDecision();
    })
}
for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("decisionMove")[i].addEventListener("click", function () {
        addMainText(capitalize(players[playerToMove].build[battleInfo[playerToMove].currentPokemon].name) + " used <strong>" + document.getElementsByClassName("decisionMove")[i].innerText + "</strong>!")
        for (let k of moves) {
            if (capitalize(k.name) == document.getElementsByClassName("decisionMove")[i].innerText) {
                battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon].hp -= k.power;
                if (battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon].hp <= 0) {
                    battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon].hp = 0;
                    if (playerToMove == 0) document.getElementById("p2Pokemon").style.backgroundImage = "none"
                    else document.getElementById("p1Pokemon").style.backgroundImage = "none"
                    addMainText(capitalize(battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon].name) + " fainted!")
                    battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
                }
                break;
            }
        }
        renderHP();
        playerToMove = (playerToMove == 0) ? 1 : 0;
        refreshDecision();
    })
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
    for (let i of pokemon) {
        if (i.name == battleInfo[0].build[battleInfo[0].currentPokemon]?.name) {
            document.getElementById("p1Bar").style.width = battleInfo[0].build[battleInfo[0].currentPokemon].hp / i.hp * 100 + "%";
            document.getElementById("p1Percentage").innerText = (battleInfo[0].build[battleInfo[0].currentPokemon].hp / i.hp * 100).toFixed(0) + "%";
        }
        if (i.name == battleInfo[1].build[battleInfo[1].currentPokemon]?.name) {
            document.getElementById("p2Bar").style.width = battleInfo[1].build[battleInfo[1].currentPokemon].hp / i.hp * 100 + "%"
            document.getElementById("p2Percentage").innerText = (battleInfo[1].build[battleInfo[1].currentPokemon].hp / i.hp * 100).toFixed(0) + "%";
        }
    }
}
function renderTable(){
    for(let i=0;i<6;i++){
        document.querySelectorAll("#p1Table tr")[i+1].children[1].innerText=capitalize(players[0].build[i].name);
        for(let j=0;j<4;j++){
            document.querySelectorAll("#p1Table tr")[i+1].children[j+2].innerText=capitalize(players[0].build[i].moves[j]);
        }
    }
    for(let i=0;i<6;i++){
        document.querySelectorAll("#p2Table tr")[i+1].children[1].innerText=capitalize(players[1].build[i].name);
        for(let j=0;j<4;j++){
            document.querySelectorAll("#p2Table tr")[i+1].children[j+2].innerText=capitalize(players[1].build[i].moves[j]);
        }
    }
}
renderTable();