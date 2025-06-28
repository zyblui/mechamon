let moves = [{
    "name": "absorb",
    "type": "grass",
    "category": "special",
    "power": 20,
    "acc": 100,
    "pp": 20
}, {
    "name": "acid",
    "type": "poison",
    "category": "physical",
    "power": 40,
    "acc": 100,
    "pp": 30
}, {
    "name": "acid armor",
    "type": "poison",
    "category": "status",
    "power": 0,
    "acc": -1,
    "pp": 40
}, {
    "name": "agility",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": -1,
    "pp": 30
}, {
    "name": "amnesia",
    "type": "psychic",
    "category": "status",
    "power": 0,
    "acc": -1,
    "pp": 20
}, {
    "name": "aurora beam",
    "type": "ice",
    "category": "special",
    "power": 65,
    "acc": 100,
    "pp": 20
},{
    "name":"barrage"
},{
    "name":"barrier"
},{
    "name":"bide"
},{
    "name":"bind"
},{
    "name":"bite"
},{
    "name":"blizzard"
},{
    "name":"body slam"
},{
    "name":"bone club"
},{
    "name":"bonemerang"
},{
    "name":"bubble"
},{
    "name":"bubble beam"
},{
    "name":"clamp"
},{
    "name":"comet punch"
},{
    "name":"confuse ray"
},{
    "name":"confusion"
},{
    "name":"constrict"
},{
    "name":"conversion"
},{
    "name":"counter"
},{
    "name":"crabhammer"
},{
    "name":"cut"
},{
    "name":"defense curl"
},{
    "name":"dig"
},{
    "name":"disable"
},{
    "name":"dizzy punch"
},{
    "name":"double kick"
},{
    "name":"double slap"
},{
    "name":"double team"
},{
    "name":"double-edge"
},{
    "name":"dragon rage"
},{
    "name":"dream eater"
},{
    "name":"drill peck"
},{
    "name":"earthquake"
},{
    "name":"egg bomb"
},{
    "name":"ember"
},{
    "name":"explosion"
},{
    "name":"fire blast"
},{
    "name":"fire punch"
},{
    "name":"fire spin"
},{
    "name":"fissure"
},{
    "name":"flamethrower"
},{
    "name":"flash"
},{
    "name":"fly"
},{
    "name":"focus energy"
},{
    "name":"fury attack"
},{
    "name":"fury swipes"
},{
    "name":"glare"
},{
    "name":"growl"
},{
    "name":"growth"
},{
    "name":"guillotine"
},{
    "name":"gust"
},{
    "name":"harden"
},{
    "name":"haze"
},{
    "name":"headbutt"
},{
    "name":"high jump kick"
},{
    "name":"horn attack"
},{
    "name":"horn drill"
},{
    "name":"hydro pump"
},{
    "name":"hyper beam"
},{
    "name":"hyper fang"
},{
    "name":"hypnosis"
},{
    "name":"ice beam"
},{
    "name":"ice punch"
},{
    "name":"jump kick"
},{
    "name":"karate chop"
},{
    "name":"kinesis"
},{
    "name":"leech life"
},{
    "name":"leech seed"
},{
    "name":"leer"
},{
    "name":"lick"
},{
    "name":"light screen"
},{
    "name":"lovely kiss"
},{
    "name":"low kick"
},{
    "name":"meditate"
},{
    "name":"mega drain"
},{
    "name":"mega kick"
},{
    "name":"mega punch"
},{
    "name":"metronome"
},{
    "name":"mimic"
},{
    "name":"minimize"
},{
    "name":"mirror move"
},{
    "name":"mist"
},{
    "name":"night shade"
},{
    "name":"pay day"
},{
    "name":"peck"
},{
    "name":"petal dance"
},{
    "name":"pin missile"
},{
    "name":"poison gas"
},{
    "name":"poison powder"
},{
    "name":"poison sting"
},{
    "name":"pound"
},{
    "name":"psybeam"
},{
    "name":"psychic"
},{
    "name":"psywave"
},{
    "name":"quick attack"
},{
    "name":"rage"
},{
    "name":"razor leaf"
},{
    "name":"razor wind"
},{
    "name":"recover"
},{
    "name":"reflect"
},{
    "name":"rest"
},{
    "name":"roar"
},{
    "name":"rock slide"
},{
    "name":"rock throw"
},{
    "name":"rolling kick"
},{
    "name":"sand attack"
},{
    "name":"scratch"
},{
    "name":"screech"
},{
    "name":"seismic toss"
},{
    "name":"self-destruct"
},{
    "name":"sharpen"
},{
    "name":"sing"
},{
    "name":"skull bash"
},{
    "name":"sky attack"
},{
    "name":"slam"
},{
    "name":"slash"
},{
    "name":"sleep powder"
},{
    "name":"sludge"
},{
    "name":"smog"
},{
    "name":"smokescreen"
},{
    "name":"soft-boiled"
},{
    "name":"solar beam"
},{
    "name":"sonic boom"
},{
    "name":"spike cannon"
},{
    "name":"splash"
},{
    "name":"spore"
},{
    "name":"stomp"
},{
    "name":"strength"
},{
    "name":"string shot"
},{
    "name":"struggle"
},{
    "name":"stun spore"
},{
    "name":"submission"
},{
    "name":"substitute"
},{
    "name":"super fang"
},{
    "name":"supersonic"
},{
    "name":"surf"
},{
    "name":"swift"
},{
    "name":"swords dance"
},{
    "name":"tackle"
},{
    "name":"tail whip"
},{
    "name":"take down"
},{
    "name":"teleport"
},{
    "name":"thrash"
},{
    "name":"thunder"
},{
    "name":"thunder punch"
},{
    "name":"thunder shock"
},{
    "name":"thunder wave"
},{
    "name":"thunderbolt"
},{
    "name":"toxic"
},{
    "name":"transform"
},{
    "name":"tri attack"
},{
    "name":"twineedle"
},{
    "name":"vice grip"
},{
    "name":"vine whip"
},{
    "name":"water gun"
},{
    "name":"waterfall"
},{
    "name":"whirlwind"
},{
    "name":"wing attack"
},{
    "name":"withdraw"
},{
    "name":"wrap"
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
},{
    "name":"beedrill"
},{
    "name":"bellsprout"
},{
    "name":"blastoise"
},{
    "name":"bulbasaur"
},{
    "name":"butterfree"
},{
    "name":"caterpie"
},{
    "name":"chansey"
},{
    "name":"charizard"
},{
    "name":"charmander"
},{
    "name":"charmeleon"
},{
    "name":"clefable"
},{
    "name":"clefairy"
},{
    "name":"cloyster"
},{
    "name":"cubone"
},{
    "name":"dewgong"
},{
    "name":"diglett"
},{
    "name":"ditto"
},{
    "name":"dodrio"
},{
    "name":"doduo"
},{
    "name":"dragonair"
},{
    "name":"dragonite"
},{
    "name":"dratini"
},{
    "name":"drowzee"
},{
    "name":"dugtrio"
},{
    "name":"eevee"
},{
    "name":"ekans"
},{
    "name":"electabuzz"
},{
    "name":"electrode"
},{
    "name":"exeggcute"
},{
    "name":"exeggutor"
},{
    "name":"farfetch'd"
},{
    "name":"fearow"
},{
    "name":"flareon"
},{
    "name":"gastly"
},{
    "name":"gengar"
},{
    "name":"geodude"
},{
    "name":"gloom"
},{
    "name":"golbat"
},{
    "name":"goldeen"
},{
    "name":"golduck"
},{
    "name":"golem"
},{
    "name":"graveler"
},{
    "name":"grimer"
},{
    "name":"growlithe"
},{
    "name":"gyarados"
},{
    "name":"haunter"
},{
    "name":"hitmonchan"
},{
    "name":"hitmonlee"
},{
    "name":"horsea"
},{
    "name":"hypno"
},{
    "name":"ivysaur"
},{
    "name":"jigglypuff"
},{
    "name":"jolteon"
},{
    "name":"jynx"
},{
    "name":"kabuto"
},{
    "name":"kabutops"
},{
    "name":"kakuna"
},{
    "name":"kangaskhan"
},{
    "name":"kingler"
},{
    "name":"koffing"
},{
    "name":"krabby"
},{
    "name":"lapras"
},{
    "name":"lickitung"
},{
    "name":"machamp"
},{
    "name":"machoke"
},{
    "name":"machop"
},{
    "name":"magikarp"
},{
    "name":"magmar"
},{
    "name":"magnemite"
},{
    "name":"magneton"
},{
    "name":"mankey"
},{
    "name":"marowak"
},{
    "name":"meowth"
},{
    "name":"metapod"
},{
    "name":"mew"
},{
    "name":"mewtwo"
},{
    "name":"moltres"
},{
    "name":"mr. mime"
},{
    "name":"muk"
},{
    "name":"nidoking"
},{
    "name":"nidoqueen"
},{
    "name":"nidoran-f"
},{
    "name":"nidoran-m"
},{
    "name":"nidorina"
},{
    "name":"nidorino"
},{
    "name":"ninetales"
},{
    "name":"oddish"
},{
    "name":"omanyte"
},{
    "name":"omastar"
},{
    "name":"omastar"
},{
    "name":"onix"
},{
    "name":"paras"
},{
    "name":"parasect"
},{
    "name":"persian"
},{
    "name":"pidgeot"
},{
    "name":"pidgeotto"
},{
    "name":"pidgey"
},{
    "name":"pikachu"
},{
    "name":"pinsir"
},{
    "name":"poliwag"
},{
    "name":"poliwhirl"
},{
    "name":"poliwrath"
},{
    "name":"ponyta"
},{
    "name":"porygon"
},{
    "name":"primeape"
},{
    "name":"psyduck"
},{
    "name":"raichu"
},{
    "name":"rapidash"
},{
    "name":"raticate"
},{
    "name":"rattata"
},{
    "name":"rhydon"
},{
    "name":"rhyhorn"
},{
    "name":"sandshrew"
},{
    "name":"sandslash"
},{
    "name":"scyther"
},{
    "name":"seadra"
},{
    "name":"seaking"
},{
    "name":"seel"
},{
    "name":"shellder"
},{
    "name":"slowbro"
},{
    "name":"slowpoke"
},{
    "name":"snorlax"
},{
    "name":"spearow"
},{
    "name":"squirtle"
},{
    "name":"starmie"
},{
    "name":"staryu"
},{
    "name":"tangela"
},{
    "name":"tauros"
},{
    "name":"tentacool"
},{
    "name":"tentacruel"
},{
    "name":"vaporeon"
},{
    "name":"venomoth"
},{
    "name":"venonat"
},{
    "name":"venusaur"
},{
    "name":"victreebel"
},{
    "name":"vileplume"
},{
    "name":"voltorb"
},{
    "name":"vulpix"
},{
    "name":"wartortle"
},{
    "name":"weedle"
},{
    "name":"weepinbell"
},{
    "name":"weezing"
},{
    "name":"wigglytuff"
},{
    "name":"zapdos"
},{
    "name":"zubat"
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