let players = [{
    "name": "Player 1",
    "build": [{
        "name": "pikachu"
    }]
}, {
    "name": "Player 2",
    "build": [{
        "name": "charizard"
    }]
}]
function render() {
    document.getElementById("p1Pokemon").style.backgroundImage = "url('back/" + players[0].build[0].name + ".png')"
    document.getElementById("p2Pokemon").style.backgroundImage = "url('front/" + players[1].build[0].name + ".png')"
}
render();
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