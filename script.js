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