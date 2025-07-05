let players = [{
    "name": "Player 1",
    "build": [{
        "name": "zapdos",
        "moves": ["thunder wave", "drill peck", "thunderbolt", "agility"]
    }, {
        "name": "slowbro",
        "moves": ["amnesia", "surf", "", ""]
    }, {
        "name": "rhydon",
        "moves": ["earthquake", "body slam", "", ""]
    }, {
        "name": "mewtwo",
        "moves": ["blizzard", "thunder wave", "psychic", "self-destruct"]
    }, {
        "name": "exeggutor",
        "moves": ["sleep powder", "", "", ""]
    }, {
        "name": "mew",
        "moves": ["psychic", "explosion", "", ""]
    }]
}, {
    "name": "Player 2",
    "build": [{
        "name": "alakazam",
        "moves": ["psychic", "seismic toss", "thunder wave", "recover"]
    }, {
        "name": "mewtwo",
        "moves": ["recover", "thunderbolt", "", ""]
    }, {
        "name": "rhydon",
        "moves": ["", "", "", ""]
    }, {
        "name": "exeggutor",
        "moves": ["sleep powder", "stun spore", "psychic", ""]
    }, {
        "name": "mew",
        "moves": ["", "", "", ""]
    }, {
        "name": "slowbro",
        "moves": ["thunder wave", "amnesia", "", ""]
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
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("decisionMove")[i].innerText = capitalize(players[playerToMove].build[0].moves[i])
    }
    for (let i = 0; i < 6; i++) {
        document.getElementsByClassName("decisionSwitch")[i].innerText = capitalize(players[playerToMove].build[i].name)
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
        playerToMove = (playerToMove == 0) ? 1 : 0;
        refreshDecision();
    })
}
for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("decisionMove")[i].addEventListener("click", function () {
        addMainText(capitalize(players[playerToMove].build[battleInfo[playerToMove].currentPokemon].name) + " used <strong>" + document.getElementsByClassName("decisionMove")[i].innerText + "</strong>!")
        playerToMove = (playerToMove == 0) ? 1 : 0;
        refreshDecision();
    })
}