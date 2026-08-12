type RecordItemType = "main" | "small" | "turn";
interface RecordItem {
    "type": RecordItemType,
    "args": RecordItemArgs,
    refresh?: BattleInfo;
}
type RecordItemArgs = [
    type: string,
    str: string,
    additionalParam?: {
        [key: string]: any;
    }
];
type BattleInfo = {
    "name": string,
    "build": MonInstanceTemplate[],
    "currentPokemon": number;
    [key: string]: any;
}[];
interface Player {
    "name": string,
    "build": BuildMon[];
}
/*interface TempEffectValue {
    "turns": number,
    "layers": number;
}
class TempEffectValue {
    turns = 0;
    layers = 0;
}*/
interface Mon {
    "name": string,
    "type": string[],
    "hp": number,
    "atk": number,
    "def": number,
    "spe": number,
    "moves": string[];
    [key: string]: any;
}
interface MonMove {
    "name": string,
    "type": string,
    "cat": string,
    "power": number,
    [key: string]: any;
}
interface BuildMon {
    "name": string,
    "moves": string[],
    "lv": number,
    [key: string]: any;
}
interface MonInstanceTemplate {
    "name": string,
    "moves": {
        [move: string]: number;
    },
    "lv": number,
    [key: string]: any;
}
type Attack = {
    "user": number,
    "type": "move",
    "move": string,
    dirAttack?: boolean;
} | {
    "type": "switch",
    "pkmn": string;
};
class MonInstanceTemplate {
    modeName: string = "";
    playerNo: number;
    maxHp: number;
    hp: number;
    transformPkmn: string = "";
    mimicMove: string = "";
    atkStage: number = 0;
    defStage: number = 0;
    spStage: number = 0;
    speStage: number = 0;
    accStage: number = 0;
    evaStage: number = 0;
    critProbMultiplier: number = 1;
    status: string = "";
    charge: {
        move: string,
        turns: number;
    } = {
            move: "",
            turns: 0
        };
    uncontrollable: {
        move: string,
        turns: number,
        isCrit?: boolean;
    } = {
            move: "",
            turns: 0,
            isCrit: false
        };
    tempEffect: {
        "confused": number,
        "semiInvulnerable": number,
        "rage": number,
        "reflect": number,
        "light screen": number,
        "mist": number,
        "leech seed": number,
        [key: string]: number;
    } = {
            "confused": 0,
            "semiInvulnerable": 0,
            "rage": 0,
            "reflect": 0,
            "light screen": 0,
            "mist": 0,
            "leech seed": 0
        };
    delay: any[] = [];
    sleepTurns: number = 0;
    tempType: string[] = [];
    disable: {
        move: string,
        turns: number;
    } = {
            move: "",
            turns: 0
        };
    substituteHp: number = 0;
    toxicCounter: number = 0;
    dmgTaken: number[] = [];
    lastDmgTakenType: string = "";
    lastMoveUsed: string = "";
    moves: {
        [move: string]: number;
    } = {};
    moveStats: {
        [move: string]: any;
    } = {};
    revealed: boolean = false;
    revealedMoves: Set<string> = new Set([]);
    constructor(mon: BuildMon, maxHp: number, playerNo: number) {
        this.playerNo = playerNo;
        for (let i in mon) if (i != "moves") this[i] = mon[i];
        this.maxHp = maxHp;
        this.hp = maxHp;
        for (let k of mon.moves) for (let l of $("moves")) if (l.name == k) this.moves[k] = l.pp;
        for (let k in this.moves) {
            this.moveStats[k] = {};
        }
    }
    getTempMoveStats(move: string, stat: string) {
        if (this.moveStats[move][stat]) return this.moveStats[move][stat];
        else return (getMoveStats(move) as MonMove)[stat];
    }
    $(func: () => void) {
        if (settings.mode == this.modeName) func();
    }
    addTempEffect(effect: string, {
        turns = Infinity,
        prob = 1
    }: {
        turns?: number,
        prob?: number;
    } = {}) {
        if (Math.random() < prob) {
            this.tempEffect[effect] = turns;
            let isEnemy = ((viewpoint == -1) ? !(this.playerNo == playerToMove) : (this.playerNo != viewpoint));
            if (effect == "confused") addSmallText("others", "becomeConfused", {
                "pokemon": [getName(this, false, true)],
                "isEnemy": isEnemy
            });
            else if (effect == "reflect" || effect == "light screen") addSmallText("others", "gainArmor", {
                "pokemon": [getName(this, false, true)],
                "isEnemy": isEnemy
            });
        }
    }
}
class PkmnInstance extends MonInstanceTemplate {
    modeName: string = "pokemon";
    constructor(mon: BuildMon, playerNo: number) {
        let monStats = getStats(mon.name) as Mon;
        let maxHp = Math.floor(0.01 * (2 * (monStats.hp + mon.dv.hp) + Math.floor(0.25 * mon.ev.hp)) * mon.lv) + mon.lv + 10;
        super(mon, maxHp, playerNo);
        for (let property of $("properties")) {
            this[property] = calcActualValue((getStats(this.name) as Pkmn)[property], this.dv[property], this.ev[property], this.lv);
        }
    }
}
class RkPetInstance extends MonInstanceTemplate {
    modeName: string = "roco kingdom";
    energy: number = 10;
    valueMultiplier: {
        "hp": number,
        "atk": number,
        "def": number,
        "spa": number,
        "spd": number,
        "spe": number;
    } = {
            "hp": 1,
            "atk": 1,
            "def": 1,
            "spa": 1,
            "spd": 1,
            "spe": 1
        };
    dmgDeduction: number = 0;
    moveThisTurn: string = "";
    rkEffect: {
        "burned": number,
        "poisoned": number,
        "frozen": number,
        [key: string]: number;
    } = {
            "burned": 0,
            "poisoned": 0,
            "frozen": 0
        };
    constructor(mon: BuildMon, playerNo: number) {
        let monStats = getStats(mon.name) as Mon;
        let maxHp = Math.round(Math.round(monStats.hp * 1.7 + Number(mon.dvActive.has("hp")) * mon.dv.hp * 0.85 + 70) + 100);
        super(mon, maxHp, playerNo);
        for (let property of $("properties")) {
            if (property != "hp") {
                this[property] = calcActualValueRk((getStats(this.name) as RkPet)[property], Number(this.dvActive.has(property)) * this.dv[property]);
            }
        }
        if (this.nature) {
            this[this.nature.increase] *= 1.2;
            this[this.nature.decrease] *= 0.9;
        }
        //rk effect
    }
    addRkEffect(name: string, layers: number) {
        if (this.rkEffect[name]) this.rkEffect[name] += layers;
        else this.rkEffect[name] = layers;
    }
}
let MonInstance: (typeof PkmnInstance) | (typeof RkPetInstance) = PkmnInstance;
const TYPE_CLASSNAMES: string[] = ["type-bug", "type-dragon", "type-electric", "type-fighting", "type-fire", "type-flying", "type-ghost", "type-grass", "type-ground",
    "type-ice", "type-normal", "type-poison", "type-psychic", "type-rock", "type-water", "type-cute", "type-mecha", "type-light"];

//merge omiegamon
mergeTranslData(TRANSLATION_OMIEGA, TRANSLATION);
mergeIconData(ICONS_OMIEGA, ICONS);
mergeMovePkmnData(MOVES_OMIEGA, MOVES, "omiega");
mergeMovePkmnData(POKEMON_OMIEGA, POKEMON, "omiega");

const POOLS: {
    [mode: string]: {
        [key: string]: any;
    };
} = {
    "pokemon": {
        "space": "",
        "mons": POKEMON,
        "moves": MOVES,
        "multiplier": MULTIPLIER,
        "multiplierMod": MULTIPLIER_MODIFIER,
        "icons": ICONS,
        "iconLocation": "pokemonicons-sheet.png",
        "initBuild": INIT_BUILD,
        "cryLocation": "cry",
        "transl": getMergedTransl(TRANSLATION_GLOBAL, TRANSLATION),
        "stab": 1.5,
        "properties": ["atk", "def", "sp", "spe"]
    },
    "coromon": {
        "space": "coromon/",
        "mons": [],
        "moves": [],
        "multiplier": [],
        "multiplierMod": {},
        "icons": {},
        "iconLocation": "roco kingdom/iconsheet.png",
        "initBuild": [],
        "cryLocation": "",
        "transl": [],
        "stab": 1,
        "properties": []
    },
    "roco kingdom": {
        "space": "roco kingdom/",
        "mons": RK_PETS,
        "moves": RK_SKILLS,
        "multiplier": RK_MULTIPLIER,
        "multiplierMod": RK_MULTIPLIER_MODIFIER,
        "icons": RK_ICONS,
        "iconLocation": "roco kingdom/iconsheet.png",
        "initBuild": RK_INIT_BUILD,
        "cryLocation": "roco kingdom/cry",
        "transl": getMergedTransl(TRANSLATION_GLOBAL, RK_TRANSLATION),
        "stab": 1.25,
        "properties": ["hp", "atk", "def", "spa", "spd", "spe"]
    }
};
const BGM_SETTINGS: {
    [key: string]: string;
} = {
    "pokemon": "backgroundMusic",
    "coromon": "coromonBgm",
    "roco kingdom": "rocoKingdomBgm"
};
const TOOLTIP_PLAYER: {
    [key: string]: any;
} = {
    ".decisionSwitch": undefined,
    "#p1Balls .ball": 0,
    "#p2Balls .ball": 1
};
const STAGE_MULTIPLIER: {
    [key: string | number]: number;
} = {
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
const ACC_STAGE_MULTIPLIER: {
    [key: string | number]: number;
} = {
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
    "spa": "Special Attack",
    "spd": "Special Defense",
    "spe": "Speed",
    "eva": "Evasion",
    "acc": "Accuracy"
};
const SMALL_TEXT_KEY: {
    [key: string]: string;
} = {
    "par": "paralyzed",
    "frz": "frozenSolid",
    "psn": "poisoned",
    "tox": "badlyPoisoned",
    "brn": "burn"
};
const THEME_CLASSNAMES: {
    [key: string]: string;
} = {
    "pokemon": "theme-pokemon",
    "coromon": "theme-coromon",
    "roco kingdom": "theme-roco-kingdom"
};

let settings: {
    [key: string]: any;
} = {
    "lang": "zh",
    "mode": "pokemon",
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
    "omiegamon": false,
    "backgroundImage": "none",
    "backgroundMusic": "none",
    "sfxVolume": 100,
    "bgmVolume": 100,
    "coromonBgm": "battle-grass",
    "rocoKingdomBgm": "none",
    "whatsNew": `
<ul>
    <li>SPE Range of each Pkmn can be calculated properly now.</li>
    <li>Bugfix: Mechamon can memorize your Volume settings now.</li>
</ul>
`
};
document.getElementById("whatsNewContent")!.innerHTML = settings.whatsNew;
if (!localStorage.getItem("mechamonSettings") || settings.whatsNew != JSON.parse(localStorage.getItem("mechamonSettings") as string).whatsNew) {
    document.getElementById("dialogOuter")!.classList.add("show");
}
let cries: {
    [monName: string]: HTMLAudioElement;
} = {};
const MOVE_BAN_LIST: {
    [key: string]: string[];
} = {
    "ohkoClause": ["fissure", "horn drill", "guillotine", "sheer cold"],
    "evasionClause": ["double team", "minimize"]
};
let players: Player[];
if (localStorage.getItem("mechamonSettings")) {
    let tempSettings = JSON.parse(localStorage.getItem("mechamonSettings") as string);
    tempSettings.whatsNew = settings.whatsNew;
    localStorage.setItem("mechamonSettings", JSON.stringify(tempSettings));
    for (let i in settings) if (!Object.keys(JSON.parse(localStorage.getItem("mechamonSettings") as string)).includes(i)) {
        localStorage.setItem("mechamonSettings", JSON.stringify(settings));
        break;
    }
    settings = JSON.parse(localStorage.getItem("mechamonSettings") as string);
} else {
    localStorage.setItem("mechamonSettings", JSON.stringify(settings));
}
document.querySelector("html")!.lang = settings.lang;
document.getElementById("turnNumber")!.innerText = getL10n("others", "turn", {
    "number": [0]
});
document.getElementById("playerToMove")!.innerText = getL10n("ui", "playerTurn", {
    "player": ["Player 1"]
});
document.getElementById("viewpoint")!.innerText = getL10n("ui", "viewpoint", {
    "player": ["Player 1"]
});
let record: RecordItem[] = [], recordPosition = 0, viewpoint = 0;
switchMode("pokemon");

addListenerToInput("pkmnName", "pokemonList");
addListenerToInput("nature", "natureList");
for (let i of document.getElementsByClassName("move")) {
    i.addEventListener("click", function () {
        document.querySelector(".move.selected")?.classList.remove("selected");
        i.classList.add("selected");
        document.querySelector(".list.show")!.classList.remove("show");
        for (let j of (document.getElementById("movesListInner")!.childNodes as NodeListOf<HTMLDivElement>)) {
            let selectedMove = document.querySelector(".move.selected") as HTMLDivElement;
            if (getStats(players[Number(selectedMove.dataset.player) - 1].build[Number(selectedMove.dataset.no) - 1].name)!.moves.includes(j.dataset.for as string)) {
                j.classList.remove("hide");
            } else j.classList.add("hide");
        }
        document.getElementById("movesList")!.classList.add("show");
    });
}
document.getElementById("clearMove")!.addEventListener("click", function () {
    let selectedMove = document.querySelector(".move.selected") as HTMLDivElement;
    players[Number(selectedMove.dataset.player) - 1].build[Number(selectedMove.dataset.no) - 1].moves[Number(selectedMove.dataset.moveNo) - 1] = "";
    renderTable();
    document.getElementById("movesList")!.classList.remove("show");
    document.getElementById("setupTable")!.classList.add("show");
});
document.getElementById("clearNature")!.addEventListener("click", function () {
    let selectedNature = document.querySelector(".nature.selected") as HTMLDivElement;
    players[Number(selectedNature.dataset.player) - 1].build[Number(selectedNature.dataset.no) - 1].nature = "";
    renderTable();
    document.getElementById("natureList")!.classList.remove("show");
    document.getElementById("setupTable")!.classList.add("show");
});
for (let i of document.querySelectorAll(".back")) i.addEventListener("click", function () {
    document.querySelector(".list.show")!.classList.remove("show");
    document.getElementById("setupTable")!.classList.add("show");
});
let turn: number = 0, playerToMove: number = 0, battleInfo: BattleInfo = [];
document.getElementById("startGame")!.addEventListener("click", function () {
    if (settings[BGM_SETTINGS[settings.mode]] == "none") {
        startGame();
    } else {
        let intro = new Audio(SOUNDS[settings.mode][settings[BGM_SETTINGS[settings.mode]]].intro);
        let loop = new Audio(SOUNDS[settings.mode][settings[BGM_SETTINGS[settings.mode]]].loop);
        loop.loop = true;
        let audioAvailable = 0;
        function prepareAudio() {
            audioAvailable++;
            if (audioAvailable == 2) {
                intro.play();
                setTimeout(function () {
                    loop.play();
                }, intro.duration * 1000);
                startGame();
            }
        }
        intro.addEventListener("canplaythrough", function () {
            prepareAudio();
        });
        loop.addEventListener("canplaythrough", function () {
            prepareAudio();
        });
    }
});
let sequence: RecordItem[] = [], refreshSequenceIsRunning = false;
document.getElementById("file")!.addEventListener("change", function () {
    READER.readAsText(((document.getElementById("file") as HTMLInputElement).files as FileList)[0]);
});
const READER = new FileReader();
READER.addEventListener("load", function () {
    console.log(JSON.parse(READER.result as string));
    /*record = */readSimplifiedRecordJSON(READER.result as string);
    for (let i = 0; i < record.length; i++) insertText(record[i], true, i);
    recordPosition = record.length - 1;
    navigationRefresh();
    battleInfo = (record[recordPosition].refresh) ? record[recordPosition].refresh as BattleInfo : getNearestRefresh(record, recordPosition);
});
for (let i = 0; i < 6; i++) {
    document.querySelectorAll(".decisionSwitch")[i].addEventListener("click", function () {
        switchPkmn(document.querySelectorAll<HTMLElement>(".decisionSwitch")[i].dataset.for as string);
    });
    for (let j in TOOLTIP_PLAYER) {
        document.querySelectorAll(j)[i].addEventListener("mouseover", function () {
            addTooltip(document.querySelectorAll(j), i, TOOLTIP_PLAYER[j]);
        });
        document.querySelectorAll(j)[i].addEventListener("mouseout", function () {
            document.querySelectorAll(j)[i].parentElement!.querySelector(".tooltip")?.classList.remove("show");
        });
    }
}
let isNewTurn = false;
let nextPlayerEffect: {
    "name": string,
    "condition": () => boolean,
    "effect": Function,
    exclude?: string;
}[] = [{
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
        if (Math.random() < 0.5) {
            dealDmg(true, calculateDmg(40, getAttack(true), getDefense(true, true), getPkmn(true).lv, "",
                getType(true), getType(true)), { opposingSubstitute: true });
            addMainText("others", "hurtConfusion");
            return { "continue": true };//!
        }
    }
}];
let lastSelfKoMoveUser = -1;
let attacks: ({
    "user": number,
    "type": "move",
    "move": string,
    dirAttack?: boolean;
} | {
    "user": number,
    "type": "switch",
    "pkmn": string;
})[] = [];
for (let i = 0; i < 4; i++) {
    let decisionMove = document.querySelectorAll<HTMLElement>(".decisionMove");
    decisionMove[i].addEventListener("click", function () {
        makeMove(decisionMove[i].dataset.for as string);
    });
    decisionMove[i].addEventListener("mouseover", function () {
        let decisionMoveFor: string = decisionMove[i].dataset.for as string;
        if (!getMoveStats(decisionMoveFor)) return;
        let tooltipMove: HTMLDivElement;
        if (!decisionMove[i].parentElement!.querySelector(".tooltip-move")) {
            tooltipMove = document.querySelector(".tooltip-move")!.cloneNode(true) as HTMLDivElement;
            decisionMove[i].parentElement!.insertBefore(tooltipMove, document.getElementsByClassName("decisionMove")[i]);
        }
        tooltipMove = decisionMove[i].parentElement!.querySelector(".tooltip-move") as HTMLDivElement;
        tooltipMove.querySelector<HTMLElement>(".tip-name")!.innerText = getL10n("moves", decisionMoveFor);

        let stats = (key: string) => battleInfo[playerToMove].build[battleInfo[playerToMove].currentPokemon].getTempMoveStats(decisionMoveFor, key);

        tooltipMove.querySelector<HTMLElement>(".tip-cat")!.innerText = getL10n("cat", stats("cat")).toUpperCase();
        tooltipMove.querySelector<HTMLElement>(".tip-cat")!.classList.remove("cat-physical", "cat-special", "cat-status", "cat-defense");
        tooltipMove.querySelector<HTMLElement>(".tip-cat")!.classList.add("cat-" + stats("cat"));
        tooltipMove.querySelector<HTMLElement>(".tip-desc")!.innerText = getL10n("moveDesc", decisionMoveFor);
        tooltipMove.querySelector<HTMLElement>(".type-text")!.innerText = getL10n("types", stats("type")).toUpperCase();
        tooltipMove.querySelector(".type-text")!.classList.remove(...TYPE_CLASSNAMES);
        tooltipMove.querySelector(".type-text")!.classList.add("type-" + stats("type"));
        tooltipMove.querySelector<HTMLElement>(".tip-pow")!.innerText = stats("power").toString();
        $("pokemon", () => {
            tooltipMove.querySelector<HTMLElement>(".tip-priority")!.innerText = stats("priority").toString();
            tooltipMove.querySelector<HTMLElement>(".tip-pp .main")!.innerText = decisionMove[i]
                .querySelector<HTMLElement>(".pp-remaining")!.innerText;
            tooltipMove.querySelector<HTMLElement>(".tip-pp .sub")!.innerText = "/" + stats("pp");
        });
        $("pokemon", "coromon", () => {
            tooltipMove.querySelector<HTMLElement>(".tip-acc")!.innerText = (stats("acc") == Infinity) ? "∞" : stats("acc") + "%";
        });
        $("roco kingdom", () => {
            tooltipMove.querySelector<HTMLElement>(".tip-cost")!.innerText = stats("cost").toString();
        });
        tooltipMove.querySelector<HTMLImageElement>(".type-img")!.src = `${$("space")}types/` + stats("type") + ".png";
        tooltipMove.classList.add("show");
    });
    decisionMove[i].addEventListener("mouseout", function () {
        decisionMove[i].parentElement!.querySelector(".tooltip-move")?.classList.remove("show");
    });
}
for (let i of document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLButtonElement>) {
    i.addEventListener("click", function () {
        document.querySelector(".tab.tab-selected")!.classList.remove("tab-selected");
        i.classList.add("tab-selected");
        document.querySelector(".tab-content.tab-show")!.classList.remove("tab-show");
        document.querySelector(".tab-content[data-for='" + i.dataset.for + "']")!.classList.add("tab-show");
    });
}
document.getElementById("forfeit")!.addEventListener("click", function () {
    addSmallText("others", "forfeit", {
        "player": [battleInfo[playerToMove].name]
    });
    addMainText("others", "winBattle", {
        "player": [battleInfo[Number(!playerToMove)].name]
    });
    refreshSequence();
});
document.getElementById("viewpoint")!.addEventListener("click", function () {
    viewpoint = Number(!viewpoint);
    renderFull((record[recordPosition].refresh) ? record[recordPosition].refresh : getNearestRefresh(record, recordPosition));
    for (let i of document.querySelectorAll<HTMLDivElement | HTMLHeadingElement>("[data-content]")) {
        let arr = JSON.parse(i.dataset.content as string);
        if (arr[2] && Object.keys(arr[2]).includes("isEnemy")) arr[2].isEnemy = !arr[2].isEnemy;
        i.dataset.content = JSON.stringify(arr);
        i.innerHTML = getSequenceL10n(arr);
    }
    document.getElementById("viewpoint")!.innerText = getL10n("ui", "viewpoint", {
        "player": [battleInfo[viewpoint].name]
    });
});
refreshLang();
for (let i of document.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-settings]")) {
    let datasetSettings = i.dataset.settings as string;
    if (i.tagName.toLowerCase() == "select") i.value = settings[datasetSettings];
    else if (i.tagName.toLowerCase() == "input" && i.type == "range") {
        i.value = settings[datasetSettings];
        refreshRange(i);
    }
    else (i as HTMLInputElement).checked = settings[datasetSettings];
    i.addEventListener("change", function () {
        if (i.tagName.toLowerCase() == "select") settings[datasetSettings] = i.value;
        else if (i.tagName.toLowerCase() == "input" && i.type == "range") settings[datasetSettings] = Math.floor(Number(i.value));
        else settings[datasetSettings] = (i as HTMLInputElement).checked;
        localStorage.setItem("mechamonSettings", JSON.stringify(settings));
        applySetting(datasetSettings);
    });
    applySetting(datasetSettings);
}
for (let i of document.querySelectorAll(".nick") as NodeListOf<HTMLDivElement>) i.addEventListener("blur", function () {
    players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].nick = i.innerText;
});
addUpdateValueListener("lv", () => 1, () => 100);
addUpdateValueListener("ev", () => 0, () => 252);
addUpdateValueListener("dv", () => 0, () => {
    let val = 0;
    $("pokemon", () => { val = 15; });
    $("roco kingdom", () => { val = 100; });
    return val;
});

document.addEventListener("keypress", function (e) {
    if (settings.keyboardControls) {
        if (e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4") document.querySelectorAll<HTMLButtonElement>(".decisionMove")[Number(e
            .key) - 1].click();
        else {
            let keys = ["z", "x", "c", "v", "b", "n"];
            if (keys.includes(e.key.toLowerCase())) document.querySelectorAll<HTMLButtonElement>(".decisionSwitch")[keys.indexOf(e.key
                .toLowerCase())].click();
        }
    }
});
document.getElementById("navFirst")!.addEventListener("click", function () {
    recordPosition = 0;
    navigationRefresh();
});
document.getElementById("navPrev")!.addEventListener("click", function () {
    if (recordPosition != 0) recordPosition--;
    navigationRefresh();
});
document.getElementById("navNext")!.addEventListener("click", function () {
    if (recordPosition != record.length - 1) recordPosition++;
    navigationRefresh();
});
document.getElementById("navLast")!.addEventListener("click", function () {
    recordPosition = record.length - 1;
    navigationRefresh();
});
document.getElementById("close")!.addEventListener("click", closePage);
document.getElementById("dialogBg")!.addEventListener("click", closePage);
document.getElementById("whatsNewButton")!.addEventListener("click", function () {
    document.getElementById("dialogOuter")!.classList.add("show");
});
for (let i of document.getElementsByClassName("clause-checkbox")) i.addEventListener("change", function () {
    renderTable();
});
for (let i of (document.querySelectorAll<HTMLDivElement>(".mode-btn"))) {
    i.addEventListener("mouseover", function () {
        for (let j in THEME_CLASSNAMES) document.body.classList.remove(THEME_CLASSNAMES[j]);
        document.body.classList.add(THEME_CLASSNAMES[i.dataset.mode as string]);
        document.querySelector(".mode-btn.selected")!.classList.remove("selected");
        i.classList.add("selected");
    });
    i.addEventListener("click", function () {
        switchMode(i.dataset.mode as string);

        applySetting("omiegamon");

        document.getElementById("modeSelectBg")!.classList.remove("show");
    });
}
document.getElementById("energyButton")!.addEventListener("click", function () {
    makeMove("focus energy");
});
for (let i of document.querySelectorAll<HTMLInputElement>(".dv-checkbox")) i.addEventListener("change", function () {
    let set: Set<string> = players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1].dvActive;
    if (i.checked) set.add(i.dataset.activeFor as string);
    else set.delete(i.dataset.activeFor as string);
    let checkboxGroup = document.querySelectorAll<HTMLInputElement>(`.dv-checkbox[data-player="${i.dataset.player}"][data-no="${i.dataset.no}"]`);
    if (set.size == 3) {
        for (let j of checkboxGroup) if (!j.checked) j.disabled = true;
    } else for (let j of checkboxGroup) j.disabled = false;
});

function $(...args: [...modes: string[], func: () => void] | [key: string]): void | any {
    if (args.length > 1) {
        for (let i = 0; i < args.length - 1; i++) if (args[i] == settings.mode) (args.at(-1) as Function)();
    } else {
        return POOLS[settings.mode][args[0] as string];
    }
}
function addListenerToInput(className: string, listId: string) {
    for (let i of document.getElementsByClassName(className)) {
        i.addEventListener("click", function () {
            document.querySelector(`.${className}.selected`)?.classList.remove("selected");
            i.classList.add("selected");
            document.querySelector(".list.show")!.classList.remove("show");
            document.getElementById(listId)!.classList.add("show");
        });
    }
}
function setUncontrollable(isSelf: boolean, move: string, turns: number): void {
    getPkmn(isSelf).uncontrollable = {
        move: move,
        turns: turns
    };
}
function setDelay(isSelf: boolean, func: Function, turns: number): void {
    getPkmn(isSelf).delay.push({
        "effect": func,
        "turns": turns
    });
}
function render(info = battleInfo): void {
    if (info[Number(viewpoint != 0)].currentPokemon == -1) document.getElementById("p1Pokemon")!.style.backgroundImage = "none";
    else document.getElementById("p1Pokemon")!.style.backgroundImage =
        `url('${$("space")}back/` + players[Number(viewpoint != 0)].build[info[Number(viewpoint != 0)].currentPokemon].name + ".png')";
    if (info[Number(viewpoint != 1)].currentPokemon == -1) document.getElementById("p2Pokemon")!.style.backgroundImage = "none";
    else document.getElementById("p2Pokemon")!.style.backgroundImage =
        `url('${$("space")}front/` + players[Number(viewpoint != 1)].build[info[Number(viewpoint != 1)].currentPokemon].name + ".png')";
    if (info[Number(viewpoint != 0)].currentPokemon != -1) document.getElementById("p1Name")!.innerText =
        getName(players[Number(viewpoint != 0)].build[info[Number(viewpoint != 0)].currentPokemon], false);
    if (info[Number(viewpoint != 1)].currentPokemon != -1) document.getElementById("p2Name")!.innerText =
        getName(players[Number(viewpoint != 1)].build[info[Number(viewpoint != 1)].currentPokemon], false);
}
function renderFull(info = battleInfo): void {
    render(info);
    renderHP(info);
}
function getL10n(type: string, str: string, additionalParam?: { [key: string]: any; }): string {
    let returnValue: string = $("transl")[settings.lang][type][str + ((additionalParam?.isEnemy) ? "-enemy" : "")];
    if (additionalParam) for (let i in additionalParam) {
        if (i == "isEnemy") continue;
        for (let j: number = 0; j < additionalParam[i].length; j++) {
            returnValue = returnValue.replace("[" + i + j + "]", additionalParam[i][j]);
        }
    }
    return returnValue;
}
function capitalize(str: string) {
    let tempArr: string[] = str.split(" ");
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].length) tempArr[i] = tempArr[i][0].toUpperCase() + tempArr[i].slice(1);
    }
    let tempStr: string = tempArr.join(" ");
    tempArr = tempStr.split("-");
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].length) tempArr[i] = tempArr[i][0].toUpperCase() + tempArr[i].slice(1);
    }
    tempStr = tempArr.join("-");
    return tempStr;
}
function mergeTranslData(from: Translation, to: Translation) {
    for (let i in from) for (let j in from[i]) for (let k in from[i][j]) {
        to[i][j][k] = from[i][j][k];
    }
}
function getMergedTransl(from: Translation, to: Translation): Translation {
    let toClone = structuredClone(to);
    mergeTranslData(from, toClone);
    return toClone;
}
function mergeIconData(from: Icons, to: Icons) {
    for (let i in from) to[i] = from[i];
}
function mergeMovePkmnData(from: any[], to: any[], tag: string) {
    for (let i of from) i.tag = tag;
    to.push(...from);
}
function switchMode(mode: string) {
    settings.mode = mode;

    $("pokemon", () => {
        MonInstance = PkmnInstance;
    });
    $("roco kingdom", () => {
        MonInstance = RkPetInstance;
    });
    players = structuredClone($("initBuild"));
    document.getElementById("p1Pokemon")!.style.backgroundImage = `url('${$("space")}back/` + players[0].build[0].name + ".png')";
    document.getElementById("p2Pokemon")!.style.backgroundImage = `url('${$("space")}front/` + players[1].build[0].name + ".png')";
    document.getElementById("p1Name")!.innerText = getL10n("pokemon", players[0].build[0].name);
    document.getElementById("p2Name")!.innerText = getL10n("pokemon", players[1].build[0].name);

    renderTable();
    document.getElementById("pokemonListInner")!.innerHTML = "";
    for (let i of $("mons")) {
        cries[i.name] = new Audio(`${$("cryLocation")}/${i.name}.mp3`);

        let div = document.createElement("div");
        div.classList.add("listButton");
        div.innerHTML = getL10n("pokemon", i.name);
        if (i.tag) div.dataset.tag = i.tag;
        div.addEventListener("click", function () {
            players[Number((document.querySelector(".pkmnName.selected") as HTMLDivElement).dataset.player) - 1].build[Number((document.querySelector(
                ".pkmnName.selected") as HTMLDivElement).dataset.no) - 1].name = i.name;
            for (let j = 0; j < 4; j++) {
                if (!i.moves.includes(players[Number((document.querySelector(".pkmnName.selected") as HTMLDivElement).dataset.player) - 1].build[Number(
                    (document.querySelector(".pkmnName.selected") as HTMLDivElement).dataset.no) - 1].moves[j])) {
                    players[Number((document.querySelector(".pkmnName.selected") as HTMLDivElement).dataset.player) - 1].build[Number((document
                        .querySelector(".pkmnName.selected") as HTMLDivElement).dataset.no) - 1].moves[j] = "";
                }
            }
            renderTable();
            document.getElementById("pokemonList")!.classList.remove("show");
            document.getElementById("setupTable")!.classList.add("show");
        });
        document.getElementById("pokemonListInner")!.appendChild(div);
    }

    $("roco kingdom", () => {
        for (let i in RK_NATURES) {
            let div = document.createElement("div");
            div.classList.add("listButton");
            div.innerHTML = getL10n("natures", i);
            div.addEventListener("click", function () {
                players[Number((document.querySelector(".nature.selected") as HTMLDivElement).dataset.player) - 1].build[Number((document.querySelector(
                    ".nature.selected") as HTMLDivElement).dataset.no) - 1].nature = i;
                renderTable();
                document.getElementById("natureList")!.classList.remove("show");
                document.getElementById("setupTable")!.classList.add("show");
            });
            div.dataset.for = i;
            document.getElementById("natureListInner")!.appendChild(div);
        }
    });

    for (let i of document.querySelectorAll<HTMLInputElement>("input[type='range']")) {
        for (let j in cries) cries[j].volume = settings.sfxVolume / 100;
        i.addEventListener("input", function () {
            refreshRange(i);
            for (let j in cries) cries[j].volume = settings.sfxVolume / 100;
        });
    }

    for (let i of $("moves")) {
        let div = document.createElement("div");
        div.classList.add("listButton");
        div.innerHTML = getL10n("moves", i.name);
        div.addEventListener("click", function () {
            players[Number((document.querySelector(".move.selected") as HTMLDivElement).dataset.player) - 1].build[Number((document.querySelector(
                ".move.selected") as HTMLDivElement).dataset.no) - 1].moves[Number((document.querySelector(".move.selected") as HTMLDivElement).dataset.moveNo) - 1] = i.name;
            renderTable();
            document.getElementById("movesList")!.classList.remove("show");
            document.getElementById("setupTable")!.classList.add("show");
        });
        div.dataset.for = i.name;
        document.getElementById("movesListInner")!.appendChild(div);
    }
}
function calculateDmg(power: number, atk: number, def: number, lv: number, attackType: string, defenseType: string[], userType: string[]) {
    let effectiveness = calculateEffectiveness(attackType, defenseType);
    let stab = 1;
    if (userType.includes(attackType)) stab = 1.5;
    let random = (Math.floor(Math.random() * (256 - 217)) + 217) / 255;
    return ((2 * lv + 10) / 250 * atk / def * power + 2) * effectiveness * stab * random;
}
function calculateDmgRk(power: number, atk: number, def: number, attackType: string, defenseType: string[], userType: string[]) {
    let effectiveness = calculateEffectiveness(attackType, defenseType);
    let stab = 1;
    if (userType.includes(attackType)) stab = 1.25;
    return Math.floor(Math.round(atk * power * effectiveness * stab * 0.9024) / def);
}
function calculateEffectiveness(attackType: string, defenseType: string[]) {
    let effectiveness = 1;
    if (!attackType) return effectiveness;
    for (let i of defenseType) {
        effectiveness *= $("multiplierMod")[$("multiplier")[attackType][i]];
    }
    return effectiveness;
}
function refreshDecision() {
    if (battleInfo[playerToMove].currentPokemon != -1 && getPkmn(true).uncontrollable.turns == 0) {
        for (let i = 0; i < 4; i++) {
            let button = document.querySelectorAll(".decisionMove")[i] as HTMLButtonElement;
            if (!Object.keys(getPkmn(true).moves)[i]) {
                (button.querySelector(".move-text") as HTMLSpanElement).innerText = "(Empty)";
                button.disabled = true;
                displayEffectiveness(button, "");
                continue;
            } else if (Object.values<number>(getPkmn(true).moves)[i] <= 0 || (getPkmn(true).disable.move == Object.keys(getPkmn(true)
                .moves)[i])) button.disabled = true;
            else button.disabled = false;
            $("roco kingdom", () => {
                if (getPkmn(true).energy < getPkmn(true).getTempMoveStats(Object.keys(getPkmn(true).moves)[i], "cost")) button.disabled = true;
            });
            let tempMove = "";
            if (Object.keys(getPkmn(true).moves)[i] == "mimic" && getPkmn(true).mimicMove) tempMove = getPkmn(true).mimicMove;
            else tempMove = Object.keys(getPkmn(true).moves)[i];
            button.dataset.for = tempMove;
            $("pokemon", () => {
                modifyDecisionMoveBtn(button, getL10n("moves", tempMove), Object.values<number>(getPkmn(true).moves)[i].toString(), getPkmn(true).getTempMoveStats(Object
                    .keys(getPkmn(true).moves)[i], "pp"), getL10n("types", getPkmn(true).getTempMoveStats(tempMove, "type")), tempMove);
            });
            $("roco kingdom", () => {
                button.querySelector<HTMLElement>(".move-text")!.innerText = getL10n("moves", tempMove);
                button.querySelector<HTMLElement>(".move-type")!.innerText = getL10n("types", getPkmn(true).getTempMoveStats(tempMove, "type"));
                button.querySelector<HTMLElement>(".cost")!.innerText = getPkmn(true).getTempMoveStats(tempMove, "cost");
                displayEffectiveness(button, tempMove);
            });
        }
    } else if (battleInfo[playerToMove].currentPokemon == -1) for (let i = 0; i < 4; i++) {
        document.querySelectorAll<HTMLButtonElement>(".decisionMove")[i].disabled = true;
        displayEffectiveness(document.querySelectorAll<HTMLButtonElement>(".decisionMove")[i], "");
    } else {
        let moveButtonGroup = document.querySelectorAll<HTMLButtonElement>(".decisionMove");
        moveButtonGroup[0].disabled = false;
        modifyDecisionMoveBtn(moveButtonGroup[0], "Pass", "-", "-", "-", getPkmn(true).uncontrollable.move);
        for (let i = 1; i < 4; i++) {
            moveButtonGroup[i].disabled = true;
            modifyDecisionMoveBtn(moveButtonGroup[i], "-", "-", "-", "-", "");
        }
    }
    let switchButtons = document.querySelectorAll<HTMLButtonElement>(".decisionSwitch");
    for (let i = 0; i < 6; i++) {
        document.querySelectorAll<HTMLElement>(".decisionSwitch .decision-content")[i].innerText = getName(players[playerToMove].build[i],
            false);
        switchButtons[i].classList.remove("selected");
        if (battleInfo[playerToMove].build[i].hp == 0) switchButtons[i].disabled = true;
        else if (battleInfo[playerToMove].currentPokemon == i) {
            switchButtons[i].disabled = true;
            switchButtons[i].classList.add("selected");
        } else switchButtons[i].disabled = false;
        switchButtons[i].dataset.for = players[playerToMove].build[i].name;
    }
}
function modifyDecisionMoveBtn(element: HTMLButtonElement, displayName: string, ppRemaining: string | number, ppTotal: string | number, type: string, moveName: string) {
    element.querySelector<HTMLElement>(".move-text")!.innerText = displayName;
    element.querySelector<HTMLElement>(".pp-remaining")!.innerText = ppRemaining.toString();
    element.querySelector<HTMLElement>(".sub")!.innerText = `/${ppTotal}`;
    element.querySelector<HTMLElement>(".move-type")!.innerText = type;
    displayEffectiveness(element, moveName);
}
function displayEffectiveness(button: HTMLButtonElement, move: string) {
    const EFFECTIVENESS_ABBR: {
        [key: number]: string;
    } = {
        0: "NE",
        0.25: "DNVE",
        0.5: "NVE",
        1: "E",
        2: "SE",
        3: "DSE",
        4: "DSE"
    };
    if (!getPkmn(false) || !move || getPkmn(true).getTempMoveStats(move, "cat") == "status") button.querySelector<HTMLElement>(".effectiveness")!.innerText = "";
    else button.querySelector<HTMLElement>(".effectiveness")!.innerText = EFFECTIVENESS_ABBR[calculateEffectiveness(getPkmn(true).getTempMoveStats(move, "type"),
        getType(false))];
}
function getDefaultProperties(playersInfo: Player[]): BattleInfo {
    let arr: any = structuredClone(playersInfo);
    arr[0].currentPokemon = -1;
    arr[1].currentPokemon = -1;
    for (let i of [0, 1]) {
        for (let j = 0; j < arr[i].build.length; j++) arr[i].build[j] = new MonInstance(arr[i].build[j], i);
        $("roco kingdom", () => {
            arr[i].marks = {
                "positive": {
                    "name": "",
                    "layers": 0
                },
                "negative": {
                    "name": "",
                    "layers": 0
                }
            };
        });
    }
    return arr;
}
function startGame() {
    if (settings.backgroundImage == "none") {
        document.getElementById("battlePanel")!.style.backgroundImage = "none";
        document.getElementById("battlePanel")!.classList.remove("text-stroke");
    } else {
        document.getElementById("battlePanel")!.style.backgroundImage = `url("bg/bg-${settings.backgroundImage}.png")`;
        document.getElementById("battlePanel")!.classList.add("text-stroke");
    }
    document.getElementById("recordContent")!.innerHTML = "";
    turn = 0;
    record = [];
    battleInfo = getDefaultProperties(players);
    playerToMove = 0;
    sendOutPkmn(battleInfo[0].build[0].name);
    playerToMove = 1;
    sendOutPkmn(battleInfo[1].build[0].name);
    nextTurn();
    render();
}
function getSequenceL10n(args: RecordItemArgs) {
    let tempArgs = structuredClone(args);
    if (tempArgs[2]) for (let i in tempArgs[2]) if (Array.isArray(tempArgs[2][i])) for (let j = 0; j < tempArgs[2][i].length;
        j++) if (Array.isArray(tempArgs[2][i][j])) tempArgs[2][i][j] = getSequenceL10n(tempArgs[2][i][j]);
    return getL10n(...tempArgs);
}
let bloURL = "";
function refreshSequence() {
    if (refreshSequenceIsRunning || !sequence.length) return;
    refreshSequenceIsRunning = true;
    let element = sequence.shift() as RecordItem;
    record.push(element);
    recordPosition = record.length - 1;
    document.getElementById("currentStep")!.innerText = (recordPosition + 1).toString();
    document.getElementById("totalSteps")!.innerText = record.length.toString();
    insertText(element, true);
    if (element.type == "main" || element.type == "small") renderFull(element.refresh);
    else if (element.type == "turn") document.getElementById("turnNumber")!.innerText = getSequenceL10n(element.args);
    if (element.args[2]?.cry) cries[element.args[2].cry].play();
    let blo = new Blob([simplifyRecordJSON(record)], {
        type: "application/json"
    });
    URL.revokeObjectURL(bloURL);
    bloURL = URL.createObjectURL(blo);
    document.getElementById("saveReplay")!.setAttribute("href", bloURL);
    document.getElementById("recordContent")!.scroll({
        top: document.getElementById("recordContent")!.scrollHeight,
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
function simplifyRecordJSON(rec: RecordItem[]): string {
    let tempRec: any = structuredClone(rec);
    for (let i: number = 0; i < tempRec.length; i++) {
        if (tempRec[i].refresh) {
            tempRec[i].delta = compare(getNearestRefresh(tempRec, i), tempRec[i].refresh);
        }
    }
    for (const recordItem of tempRec) delete recordItem.refresh;
    return JSON.stringify(tempRec);
}
function readSimplifiedRecordJSON(lines: string): void {
    record = [];
    let recordJSON = JSON.parse(lines);
    for (let element of recordJSON) {
        if (element.delta) {
            element.refresh = structuredClone(getNearestRefresh(record, record.length));
            for (let j of element.delta) {
                modifyValue(element.refresh, j.property, j.value);
            }
            delete element.delta;
        }
        record.push(element);
    }
}
function modifyValue(object: { [index: string | number]: any; }, keys: any[], value: any) {
    let tempObject = object;
    for (let i = 0; i < keys.length - 1; i++) {
        tempObject = tempObject[keys[i]];
    }
    tempObject[keys.at(-1)] = value;
}
function getNearestRefresh(rec: RecordItem[], i: number): BattleInfo {
    for (let j = i - 1; j >= 0; j--) if (rec[j].refresh) return rec[j].refresh as BattleInfo;
    return getDefaultProperties(players);
}
function compare(before: any, after: any) {
    let arr: {
        "property": (number | string)[],
        "value": any;
    }[] = [];
    for (let i of Object.keys(after)) {
        if (typeof after[i] != "object" && before[i] != after[i]) arr.push({
            "property": [i],
            "value": after[i]
        });
        else if (typeof after[i] == "object") for (let j of compare(before[i], after[i])) arr.push({
            "property": [i, ...j.property],
            "value": j.value
        });
    }
    return arr;
}
function addMainText(...args: RecordItemArgs): void {
    for (let i of document.querySelectorAll<HTMLButtonElement>(".decisionMove,.decisionSwitch")) {
        i.disabled = true;
    }
    sequence.push({
        "type": "main",
        "args": args,
        "refresh": structuredClone(battleInfo)
    });
}
function addSmallText(...args: RecordItemArgs): void {
    for (let i of document.querySelectorAll<HTMLButtonElement>(".decisionMove,.decisionSwitch")) {
        i.disabled = true;
    }
    sequence.push({
        "type": "small",
        "args": args,
        "refresh": structuredClone(battleInfo)
    });
}
function sendOutPkmn(pkmn: string) {
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
        "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint)),
        "cry": pkmn
    });
}
function addTooltip(elementGroup: NodeListOf<HTMLElement>, i: number, player = playerToMove) {
    if (!elementGroup[i].dataset.for || !getStats(elementGroup[i].dataset.for)) return;
    let tooltip: HTMLDivElement;
    if (!elementGroup[i].parentElement!.querySelector(".tooltip")) {
        tooltip = document.querySelector(".tooltip")!.cloneNode(true) as HTMLDivElement;
        if (elementGroup[i].parentElement!.id == "p2Balls") tooltip.classList.add("under");
        else tooltip.classList.remove("under");
        elementGroup[i].parentElement!.insertBefore(tooltip, elementGroup[i]);
    }
    tooltip = elementGroup[i].parentElement!.querySelector(".tooltip") as HTMLDivElement;
    tooltip.querySelector<HTMLElement>(".tip-name")!.innerText = getL10n("pokemon", elementGroup[i].dataset.for);
    let stats = getStats(elementGroup[i].dataset.for) as Pkmn;
    tooltip.querySelector<HTMLElement>(".img-left")!.style.background = `url(${$("iconLocation")}) no-repeat scroll -` +
        ($("icons")[elementGroup[i].dataset.for].cell - 1) * 40 + "px -" + (
            $("icons")[elementGroup[i].dataset.for].row - 1) * 30 + "px";
    tooltip.querySelector<HTMLElement>(".tip-desc")!.innerText = getL10n("pkmnDesc", elementGroup[i].dataset.for);
    for (let j of [0, 1]) {
        if (!stats.type[j]) {
            tooltip.querySelectorAll(".type")[j].classList.add("hide");
            break;
        }
        tooltip.querySelectorAll(".type")[j].classList.remove("hide");
        tooltip.querySelectorAll<HTMLElement>(".type-text")[j].innerText = getL10n("types", stats.type[j]).toUpperCase();
        tooltip.querySelectorAll(".type-text")[j].classList.remove(...TYPE_CLASSNAMES);
        tooltip.querySelectorAll(".type-text")[j].classList.add("type-" + stats.type[j]);
        (tooltip.querySelectorAll(".type-img")[j] as HTMLImageElement).src = `${$("space")}types/` + stats.type[j] + ".png";
    }
    let actualPlayer = Number(viewpoint != player);
    addEffectBadges(battleInfo[actualPlayer].build[i], tooltip.querySelector(".tip-status") as HTMLDivElement, true);
    for (let j = 0; j < 4; j++) {
        $("pokemon", () => {
            let totalPp = battleInfo[actualPlayer].build[i].getTempMoveStats(Object.keys(battleInfo[actualPlayer].build[i].moves)[j], "pp");

            let ppRemaining = Object.values(battleInfo[actualPlayer].build[i].moves)[j];
            addMoveToTooltip(tooltip, actualPlayer, i, j, {
                "additionalInfoFn": () => {
                    tooltip.querySelectorAll<HTMLElement>(".pp-remaining")[j].innerText = ppRemaining.toString();
                    tooltip.querySelectorAll<HTMLElement>(".pp .sub")[j].innerText = "/" + totalPp;
                },
                "emptyMoveFn": () => addGrayMove(tooltip, j, "empty", 0, "/0"),
                "unknownMoveFn": () => addGrayMove(tooltip, j, "unknownMove", "?", "/?")
            });
        });
        $("roco kingdom", () => {
            addMoveToTooltip(tooltip, actualPlayer, i, j, {
                "additionalInfoFn": () => {
                    tooltip.querySelectorAll<HTMLElement>(".cost")[j].innerText = battleInfo[actualPlayer].build[i].getTempMoveStats(Object.keys(battleInfo[actualPlayer]
                        .build[i].moves)[j], "cost");
                },
                "emptyMoveFn": () => addGrayMoveRk(tooltip, j, "empty", 0),
                "unknownMoveFn": () => addGrayMoveRk(tooltip, j, "unknownMove", "?")
            });
        });
    }
    tooltip.querySelector<HTMLElement>(".hp-remaining")!.innerText = (battleInfo[actualPlayer].build[i].hp / battleInfo[actualPlayer]
        .build[i].maxHp * 100).toFixed(0) + "%";
    let stats2: Pkmn = getStats(battleInfo[actualPlayer].build[i].name) as Pkmn;
    $("pokemon", () => {
        tooltip.querySelector<HTMLElement>(".spe-range")!.innerText = `${calcActualValue(stats2.spe, 0, 0, battleInfo[actualPlayer].build[i].lv)}~${calcActualValue(stats2
            .spe, 15, 252, battleInfo[actualPlayer].build[i].lv)}`;
    });
    $("roco kingdom", () => {
        tooltip.querySelector<HTMLElement>(".spe-range")!.innerText = `${calcActualValueRk(stats2.spe, 0)}~${calcActualValueRk(stats2.spe, 100)}`;
    });
    if (actualPlayer == playerToMove) tooltip.querySelector<HTMLElement>(".hp .sub")!.innerText = ", " + battleInfo[actualPlayer].build[i].hp
        .toFixed(0) + "/" + battleInfo[actualPlayer].build[i].maxHp;
    else tooltip.querySelector<HTMLElement>(".hp .sub")!.innerText = "";
    tooltip.classList.add("show");
}
function calcActualValue(base: number, dv: number, ev: number, lv: number) {
    return Math.floor(0.01 * (2 * (base + dv) + Math.floor(0.25 * ev)) * lv) + 5;
}
function calcActualValueRk(base: number, ev: number) {
    return Math.round(Math.round(base * 1.1 + ev * 0.55 + 10) + 50);
}
function addMoveToTooltip(tooltip: HTMLDivElement, actualPlayer: number, i: number, j: number, { additionalInfoFn, emptyMoveFn, unknownMoveFn }: {
    additionalInfoFn: () => void,
    emptyMoveFn: () => void,
    unknownMoveFn: () => void;
}) {
    let isRevealed = battleInfo[actualPlayer].build[i].revealedMoves.has(Object.keys(battleInfo[actualPlayer].build[i].moves)[j]);
    if (Object.keys(battleInfo[actualPlayer].build[i].moves)[j] && ((actualPlayer != playerToMove && isRevealed) || (actualPlayer == playerToMove))) {
        tooltip.querySelectorAll<HTMLElement>(".move-name")[j].innerText = getL10n("moves", Object.keys(battleInfo[actualPlayer]
            .build[i].moves)[j]);
        additionalInfoFn();
        if (!isRevealed) tooltip.querySelectorAll(".move-name")[j].classList
            .add("unknown");
        else tooltip.querySelectorAll(".move-name")[j].classList.remove("unknown");
    } else if (actualPlayer == playerToMove) emptyMoveFn();
    else unknownMoveFn();
}
function addGrayMove(tooltip: HTMLDivElement, j: number, textKey: string, ppRemaining: number | string, subText: string) {
    tooltip.querySelectorAll<HTMLElement>(".move-name")[j].innerText = getL10n("ui", textKey);
    tooltip.querySelectorAll<HTMLElement>(".pp-remaining")[j].innerText = ppRemaining.toString();
    tooltip.querySelectorAll<HTMLElement>(".pp .sub")[j].innerText = subText;
    tooltip.querySelectorAll(".move-name")[j].classList.add("unknown");
}
function addGrayMoveRk(tooltip: HTMLDivElement, j: number, textKey: string, cost: number | string) {
    tooltip.querySelectorAll<HTMLElement>(".move-name")[j].innerText = getL10n("ui", textKey);
    tooltip.querySelectorAll<HTMLElement>(".cost")[j].innerText = cost.toString();
    tooltip.querySelectorAll(".move-name")[j].classList.add("unknown");
}
function addEffectBadges(pkmn: MonInstanceTemplate, outputArea: HTMLDivElement, showFull: boolean) {
    outputArea.innerHTML = "";
    if (pkmn.status) {
        outputArea.innerHTML = "";
        let statusSpan = document.createElement("span");
        statusSpan.classList.add(pkmn.status);
        statusSpan.innerText = "[" + ((showFull) ? getL10n("status", pkmn.status).toUpperCase() : pkmn.status.toUpperCase()) +
            "]";
        outputArea.appendChild(statusSpan);
    }
    for (let j of $("properties")) {
        $("pokemon", () => insertPropertyMod(pkmn[j + "Stage"], 0, Number(STAGE_MULTIPLIER[pkmn[j + "Stage"]].toFixed(2)), outputArea, showFull, j));
        $("roco kingdom", () => insertPropertyMod(Number(pkmn.valueMultiplier[j].toFixed(2)), 1, Number(pkmn.valueMultiplier[j].toFixed(2)), outputArea, showFull, j));
    }
    for (let j in pkmn.tempEffect) {
        if (pkmn.tempEffect[j]) {
            let tempEffectSpan = document.createElement("span");
            tempEffectSpan.innerText = "[" + ((showFull) ? getL10n("tempEffects", j).toUpperCase() : getL10n("tempEffects", j)) + "]";
            tempEffectSpan.classList.add("debuff");
            outputArea.appendChild(tempEffectSpan);
        }
    }
}
function insertPropertyMod(value: number, criticalValue: number, displayValue: number, outputArea: HTMLElement, showFull: boolean, j: string) {
    if (value != criticalValue) {
        let span = document.createElement("span");
        if (value > criticalValue) span.classList.add("buff");
        else span.classList.add("debuff");
        span.innerText = "[" + ((showFull) ? getL10n("stats", j).toUpperCase() : capitalize(j)) + " x" + displayValue + "]";
        outputArea.appendChild(span);
    }
}
function switchPkmn(name: string) {
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
function dealDmg(isSelf: boolean, dmg: number, additionalParam?: { [key: string]: any; }) {
    let roundedDmg = Math.max(1, Math.floor(dmg));
    if (additionalParam?.opposingSubstitute && getPkmn(!isSelf).substituteHp > 0) {
        getPkmn(!isSelf).substituteHp -= Math.min(roundedDmg, getPkmn(!isSelf).substituteHp);
        if (getPkmn(!isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(!isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (Number(Number(!isSelf) == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(!isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? isSelf : (Number(Number(!isSelf) == playerToMove) != viewpoint))
        });
    } else if (getPkmn(isSelf).substituteHp > 0 && !additionalParam?.ignoreSubstitute) {
        getPkmn(isSelf).substituteHp -= Math.min(roundedDmg, getPkmn(isSelf).substituteHp);
        if (getPkmn(isSelf).substituteHp == 0) addSmallText("others", "substituteFade", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : (Number(Number(isSelf) == playerToMove) != viewpoint))
        });
        else addSmallText("others", "substituteTakeDamage", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "isEnemy": ((viewpoint == -1) ? !isSelf : (Number(Number(isSelf) == playerToMove) != viewpoint))
        });
    } else {
        roundedDmg = Math.min(roundedDmg, getPkmn(isSelf).hp);
        getPkmn(isSelf).hp -= roundedDmg;
        addSmallText("others", "loseHealth", {
            "pokemon": [getName(getPkmn(isSelf), false, true)],
            "percentage": [(roundedDmg / getPkmn(isSelf).maxHp * 100).toFixed(0)],
            "isEnemy": ((viewpoint == -1) ? false : (Number(Number(isSelf) == playerToMove) != viewpoint)),
            "hardcoreHide": true
        });
    }
}
function nextPlayer(player: number) {
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
/*function insertCustomNextPlayerEffect(insertAfter, effectJSON) {
    if (!insertAfter) nextPlayerEffect.unshift(effectJSON);
    for (let i = 0; i < nextPlayerEffect.length; i++) if (nextPlayerEffect[i].name == insertAfter) nextPlayerEffect.splice(i +
        1, 0, effectJSON);
}*/
function getAttack(isSelf: boolean): number {
    return getPkmn(isSelf).atk * STAGE_MULTIPLIER[getPkmn(isSelf).atkStage];
}
function getDefense(isSelf: boolean, isCrit: boolean) {
    if (isCrit) return getPkmn(isSelf).def * STAGE_MULTIPLIER[getPkmn(isSelf).defStage];
    else return getPkmn(isSelf).def * STAGE_MULTIPLIER[getPkmn(isSelf).defStage] * ((getPkmn(isSelf).tempEffect.reflect) ? 2 : 1);
}
function getSp(isSelf: boolean, isCrit: boolean) {
    if (isCrit) return getPkmn(isSelf).sp * STAGE_MULTIPLIER[getPkmn(isSelf).spStage];
    else return getPkmn(isSelf).sp * STAGE_MULTIPLIER[getPkmn(isSelf).spStage] * ((getPkmn(isSelf)
        .tempEffect["light screen"]) ? 2 : 1);
}
function sortAttackFn(a: Attack, b: Attack) {
    if (b.type == "switch" && a.type == "move") return 1;
    else if (a.type == "switch" && b.type == "move") return -1;
    else if (a.type == "move" && b.type == "move") {
        let stats = (attack: typeof a, stat: string) => battleInfo[attack.user].build[battleInfo[attack.user].currentPokemon].getTempMoveStats(attack.move, stat);

        if (stats(a, "cat") == "defense" && stats(b, "cat") != "defense") return -1;
        else if (stats(b, "cat") == "defense" && stats(a, "cat") != "defense") return 1;

        if (stats(a, "priority") > stats(b, "priority")) return -1;
        else if (stats(b, "priority") > stats(a, "priority")) return 1;

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
}
function nextTurn() {
    attacks.sort(sortAttackFn);

    for (let i of [true, false]) {
        for (let index in getPkmn(i).tempEffect) {
            if (getPkmn(i).tempEffect[index] > 0) getPkmn(i).tempEffect[index]--;
        }
    }

    $("roco kingdom", () => {
        for (let i of attacks) {
            if (i.type == "move") {
                battleInfo[i.user][battleInfo[i.user].currentPokemon].moveThisTurn = i.move;
            }
        }
    });
    let attackOrder = 0;
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
        attackOrder++;
        addMainText("others", "use", {
            "pokemon": [getName(getPkmn(true), false, true)],
            "moves": [["moves", i.move]],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint))
        });
        $("roco kingdom", () => {
            getPkmn(true).energy -= getPkmn(true).getTempMoveStats(i.move, "cost");
        });
        if (i.dirAttack) {
            attack(i.move);
            judgeHP();
            continue;
        }
        getPkmn(true).lastMoveUsed = i.move;

        let k = getMoveStats(i.move) as MonMove;

        if (k.dmgDeduction) getPkmn(true).dmgDeduction = k.dmgDeduction;
        let effect;
        if (k.cat != "status" && Math.random() > k.acc * ACC_STAGE_MULTIPLIER[getPkmn(true).accStage] *
            ACC_STAGE_MULTIPLIER[getPkmn(false).evaStage] / 100) {
            addSmallText("others", "attackMiss", {
                "pokemon": [getName(getPkmn(true), false, true)],
                "isEnemy": playerToMove != viewpoint
            });
            if (k.missEffect) k.missEffect();
        } else {
            let preDmgEffect: {
                [key: string]: string;
            } = {};
            if (k.preDmgEffect) preDmgEffect = k.preDmgEffect();
            if (getPkmn(true).charge.turns > 0) {
                continue outer;
            }
            if (getPkmn(false).tempEffect.semiInvulnerable > 0 && !preDmgEffect.nullifySemiInvulnerable) break;
            effect = attack(k.name);
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

        getPkmn(true).revealedMoves.add(k.name);

        judgeHP();
        if (getPkmn(true)) {
            $("pokemon", () => {
                getPkmn(true).moves[k.name]--;
                let outOfMoves = true;
                for (let m in getPkmn(true).moves) {
                    if (getPkmn(true).moves[m]) outOfMoves = false;
                }
                if (outOfMoves) setUncontrollable(true, "struggle", Infinity);
            });
            if (effect?.flinch) {
                nextTurn();
            }
            else continue outer;
        } else refreshSequence();
    }
    attacks = [];
    for (let i of [true, false]) if (getPkmn(i)) {
        $("roco kingdom", () => {
            getPkmn(i).dmgDeduction = 0;
            getPkmn(i).moveThisTurn = "";
        });
        if (getPkmn(i)?.status == "brn") {
            addSmallText("others", "hurtByBurn", {
                "pokemon": [getName(getPkmn(i), false, true)],
                "isEnemy": Number(Number(i) == playerToMove) != viewpoint
            });
            dealDmg(i, getPkmn(i).maxHp / 16, { ignoreSubstitute: true });
        }
    }
    judgeHP();
    endTurn();
}
function setLastSelfKoMoveUser(user: number) {
    lastSelfKoMoveUser = user;
}
function endTurn() {
    let allFaint = [true, true], winner = -1;
    for (let i of [0, 1]) for (let j of battleInfo[i].build) if (j.hp > 0) allFaint[i] = false;
    for (let i of [0, 1]) if (allFaint[i] && !allFaint[Number(!i)]) winner = Number(!i);
    if (allFaint[0] && allFaint[1]) {
        if (settings.selfKoClause && lastSelfKoMoveUser != -1) winner = Number(!lastSelfKoMoveUser);
        else winner = 0;
    }
    if (winner != -1) {
        addMainText("others", "winBattle", {
            "player": [battleInfo[winner].name]
        });
        refreshSequence();
        return;
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
function getStats(name: string): Mon | void {
    for (let i of $("mons")) {
        if (i.name == name) return i;
    }
}
function getMoveStats(name: string): MonMove | void {
    for (let i of $("moves")) {
        if (i.name == name) return i;
    }
}
function getPkmn(isSelf: boolean) {
    if (isSelf) return battleInfo[playerToMove].build[battleInfo[playerToMove].currentPokemon];
    else return battleInfo[(playerToMove == 0) ? 1 : 0].build[battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon];
}
function getType(isSelf: boolean) {
    if (getPkmn(isSelf).tempType.length) return getPkmn(isSelf).tempType;
    else return getStats(getPkmn(isSelf).name)!.type;
}
function getName(pkmn: BuildMon | MonInstanceTemplate, showSpeciesName: boolean, returnArr?: boolean) {
    let arr: [
        type: string,
        str: string,
        additionalParam?: {
            [key: string]: any;
        }
    ];
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
function attack(move: string) {

    let k = getMoveStats(move) as MonMove;

    let criticalHitRatioMultiplier = 1;
    let preCritEffect;
    let substitutePreDmg = (getPkmn(false).substituteHp > 0);
    if (k.preCritEffect) {
        preCritEffect = k.preCritEffect();

        $("roco kingdom", () => {
            if (RK_TACKLE_CAT[getPkmn(false).getTempMoveStats(getPkmn(false).moveThisTurn, "cat")] == getMoveStats(move)!.tackle.cat) {
                getMoveStats(move)!.tackle.preCritEffect();
            }
        });
    }
    if (preCritEffect?.isHighCritRatio) criticalHitRatioMultiplier = 8;
    if (arguments[1]?.forceCrit) criticalHitRatioMultiplier = Infinity;
    let isCrit = (Math.random() < criticalHitRatioMultiplier * getPkmn(true).critProbMultiplier * getStats(getPkmn(true).name)!.spe / 512);
    let dmg = 0, totalDmg = 0;
    $("pokemon", () => {
        if (k.cat == "physical") dmg = calculateDmg(k.power, getAttack(true), getDefense(false, isCrit), getPkmn(true).lv,
            k.type, getType(false), getType(true));
        else dmg = calculateDmg(k.power, getSp(true, isCrit), getSp(false, isCrit), getPkmn(true).lv, k.type, getType(false), getType(true));
    });
    $("roco kingdom", () => {
        if (k.cat == "physical") dmg = calculateDmgRk(k.power, getAttack(true), getDefense(false, isCrit), k.type, getType(false), getType(true));
        else dmg = calculateDmgRk(k.power, getPkmn(true).spa, getPkmn(false).spd, k.type, getType(false), getType(true));
    });

    if (k.cat == "physical" || k.cat == "special") {
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
                    "isEnemy": Number(!playerToMove) != viewpoint
                });
        }
        totalDmg += Math.min(dmg, getPkmn(false).hp);
        if (isCrit) {
            totalDmg += Math.min(dmg, getPkmn(false).hp);
            addSmallText("others", "crit");
        }

        $("roco kingdom", () => {
            totalDmg *= (1 - getPkmn(false).dmgDeduction);
        });

        dealDmg(false, totalDmg);
        getPkmn(false).dmgTaken.push(totalDmg);
        getPkmn(false).lastDmgTakenType = k.type;
    }
    let effect: {
        [key: string]: any;
    } | undefined;
    if (k.effect) effect = k.effect({
        "totalDmg": totalDmg,
        "substitutePreDmg": substitutePreDmg,
        "preCritReturn": preCritEffect
    });

    $("roco kingdom", () => {
        if (RK_TACKLE_CAT[getPkmn(false).getTempMoveStats(getPkmn(false).moveThisTurn, "cat")] == getMoveStats(move)!.tackle.cat) {
            getMoveStats(move)!.tackle.effect({
                "effectReturn": effect
            });
        }
    });

    for (let i in getPkmn(true).moves) {
        if (getMoveStats(i)!.passiveEffect) getMoveStats(i)!.passiveEffect();
    }

    if (getPkmn(false)?.tempEffect.rage > 0) {
        addSmallText("others", "rageBuilding", {
            "pokemon": [getName(getPkmn(false), false, true)],
            "isEnemy": Number(!playerToMove) != viewpoint
        });
        modifyStats(false, "atk", 1, 1);
    }
    return effect;
}
function refreshPlayerToMove(ptm: number) {
    playerToMove = ptm;
    document.getElementById("playerToMove")!.innerText = getL10n("ui", "playerTurn", {
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
function makeMove(name: string) {
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
function charge(move: string, turns: number) {
    getPkmn(true).charge = {
        move: move,
        turns: turns
    };
}
function repeatAttack(dmg: number, count: number) {
    let hasSubstitutePreDmg = (getPkmn(false).substituteHp > 0);
    let i = 0;
    for (; i < count; i++) {
        if (hasSubstitutePreDmg && getPkmn(false).substituteHp <= 0) break;
        dealDmg(false, dmg);
    }
    addSmallText("others", "hitTimes", {
        "number": [i + 1]
    });
}
function judgeHP() {
    if (getPkmn(false)?.hp <= 0) {
        getPkmn(false).hp = 0;
        let faintedPkmn = getPkmn(false);
        battleInfo[(playerToMove == 0) ? 1 : 0].currentPokemon = -1;
        addMainText("others", "faint", {
            "pokemon": [getName(faintedPkmn, false, true)],
            "isEnemy": ((viewpoint == -1) ? true : (Number(!playerToMove) != viewpoint)),
            "cry": faintedPkmn.name
        });
    }
    if (getPkmn(true)?.hp <= 0) {
        getPkmn(true).hp = 0;
        let faintedPkmn = getPkmn(true);
        battleInfo[playerToMove].currentPokemon = -1;
        addMainText("others", "faint", {
            "pokemon": [getName(faintedPkmn, false, true)],
            "isEnemy": ((viewpoint == -1) ? false : (playerToMove != viewpoint)),
            "cry": faintedPkmn.name
        });
    }
}
function renderHP(info = battleInfo) {
    for (let i of [0, 1]) {
        if (info[Number(i != viewpoint)].currentPokemon == -1) {
            document.getElementById(`p${i + 1}Gauge`)!.classList.add("hide");
        } else {
            document.getElementById(`p${i + 1}Gauge`)!.classList.remove("hide");
        }
    }
    for (let i of [0, 1]) {
        if (info[Number(i != viewpoint)].currentPokemon != -1) {
            let percentage = info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon].hp /
                info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon].maxHp * 100;
            document.getElementById(`p${i + 1}Bar`)!.style.width = percentage + "%";
            document.getElementById(`p${i + 1}Percentage`)!.innerText = percentage.toFixed(0) + "%";
            document.getElementById(`p${i + 1}Lv`)!.innerText = "Lv " + info[Number(i != viewpoint)].build[info[Number(
                i != viewpoint)].currentPokemon].lv;
            document.getElementById(`p${i + 1}Bar`)!.classList.remove("green", "yellow", "red");
            if (percentage >= 50) document.getElementById(`p${i + 1}Bar`)!.classList.add("green");
            else if (percentage >= 20) document.getElementById(`p${i + 1}Bar`)!.classList.add("yellow");
            else document.getElementById(`p${i + 1}Bar`)!.classList.add("red");
        }
    }
    document.getElementById("p1Status")!.innerHTML = "";
    document.getElementById("p2Status")!.innerHTML = "";
    for (let i of [0, 1]) if (info[Number(i != viewpoint)].currentPokemon != -1) {
        addEffectBadges(info[Number(i != viewpoint)].build[info[Number(i != viewpoint)].currentPokemon], document.getElementById(`p${i + 1}Status`) as HTMLDivElement, false);
    }
    refreshBalls(info);
}
function refreshBalls(info: BattleInfo) {
    for (let i of [0, 1]) for (let j = 0; j < 6; j++) {
        let ballElement: HTMLDivElement = document.getElementById("p" + (i + 1) + "Ball" + (j + 1)) as HTMLDivElement;
        if (info[Number(i != viewpoint)].build[j].revealed && !settings.hardcoreMode) {
            ballElement.style.backgroundImage = `url(${$("iconLocation")})`;
            ballElement.style.backgroundPosition = (-($("icons")[info[Number(i != viewpoint)].build[j]
                .name].cell - 1) * 40) + "px " + (-($("icons")[info[Number(i != viewpoint)].build[j].name].row - 1) * 30) + "px";
            ballElement.dataset.for = info[Number(i != viewpoint)].build[j].name;
        } else {
            ballElement.style.backgroundImage = "url(pokemonicons-pokeball-sheet.png)";
            ballElement.style.backgroundPosition = "0 0";
            ballElement.dataset.for = "";
        }
        if (info[Number(i != viewpoint)].build[j].hp <= 0) ballElement.classList.add("faint");
        else ballElement.classList.remove("faint");
    }
}
function renderTable() {
    for (let playerNo of [0, 1]) for (let i = 0; i < 6; i++) {
        document.querySelectorAll<HTMLElement>(".pkmnName[data-player='" + (playerNo + 1) + "']")[i].innerText = getL10n("pokemon", players[
            playerNo].build[i].name);
        document.querySelectorAll<HTMLElement>(".lv[data-player='" + (playerNo + 1) + "']")[i].innerText = players[playerNo].build[i].lv.toString();
        for (let property of $("properties")) {
            document.querySelector(`.pkmn-outer[data-player="${playerNo + 1}"][data-no="${i + 1}"]`)!.querySelector<HTMLElement>(`.dv[data-value-for="${property}"]`)!.innerText = players[playerNo].build[i].dv[property].toString();
        }
        $("roco kingdom", () => {
            if (players[playerNo].build[i].nature) {
                document.querySelectorAll<HTMLElement>(".nature[data-player='" + (playerNo + 1) + "']")[i].innerText = getL10n("natures", players[playerNo].build[i].nature);
            } else {
                document.querySelectorAll<HTMLElement>(".nature[data-player='" + (playerNo + 1) + "']")[i].innerText = "(Empty)";
            }

        });
        for (let j = 0; j < 4; j++) {
            if (players[playerNo].build[i].moves[j]) {
                document.querySelectorAll(".pkmn[data-player='" + (playerNo + 1) + "']")[i].querySelectorAll<HTMLElement>(".move")[j].innerText
                    = getL10n("moves", players[playerNo].build[i].moves[j]);
            } else {
                document.querySelectorAll(".pkmn[data-player='" + (playerNo + 1) + "']")[i].querySelectorAll<HTMLElement>(".move")[j].innerText
                    = "(Empty)";
            }
        }
    }
    if (checkBuildValidity()) (document.getElementById("startGame") as HTMLButtonElement).disabled = false;
    else (document.getElementById("startGame") as HTMLButtonElement).disabled = true;
}
function modifyStats(isSelf: boolean, stat: string, delta: number, prob: number) {
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
            "isEnemy": Number(playerToMove == Number(isSelf)) != viewpoint
        });
    }
}
function modifyStatus(status: string, prob: number) {
    if ((getStats(getPkmn(false).name)!.type.includes("poison") && (status == "tox" || status == "psn"))
        || (getStats(getPkmn(false).name)!.type.includes("fire") && status == "brn")
        || (getStats(getPkmn(false).name)!.type.includes("ice") && status == "frz")) return;
    if (status == "frz" && settings.freezeClause) {
        for (let i = 0; i < 6; i++) {
            if (battleInfo[Number(!playerToMove)].build[i].status == "frz") return;
        }
    } else if (status == "slp" && settings.sleepClause) {
        for (let i = 0; i < 6; i++) {
            if (battleInfo[Number(!playerToMove)].build[i].status == "slp") return;
        }
    }
    let rand = Math.random();
    if (rand >= prob) return;
    if (getPkmn(false).status == status) {
        if (status == "par") addSmallText("others", "alreadyParalyzed", {
            "pokemon": [getName(getPkmn(false), false, true)],
            "isEnemy": !(playerToMove != viewpoint)
        });
        return;
    }
    getPkmn(false).status = status;
    if (status == "tox") getPkmn(false).toxicCounter = 1;
    for (let i of Object.keys(SMALL_TEXT_KEY)) if (status == i) {
        addSmallText("others", SMALL_TEXT_KEY[i], {
            "pokemon": [getName(getPkmn(false), false, true)],
            "isEnemy": !(playerToMove != viewpoint)
        });
        break;
    }
}
function putToSleep(isSelf: boolean, turns: number) {
    getPkmn(isSelf).status = "slp";
    getPkmn(isSelf).sleepTurns = turns;
    addSmallText("others", "fallAsleep", {
        "pokemon": [getName(getPkmn(isSelf), false, true)],
        "isEnemy": ((viewpoint == -1) ? !isSelf : (Number(Number(isSelf) == playerToMove) != viewpoint))
    });
}
function refreshLang() {
    for (let i of document.querySelectorAll<HTMLElement>("[data-transl-cat]")) {
        i.innerHTML = $("transl")[settings.lang][i.dataset.translCat as string][i.dataset.translKey as string];
    }
}
function applySetting(key: string) {
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
                document.getElementById("recordContent")!.classList.add("hide");
                document.getElementById("turnNumber")!.classList.add("hide");
                document.getElementById("hardcoreTip")!.classList.remove("hide");
                document.body.classList.add("hardcore-hide-container");
            } else {
                document.getElementById("recordContent")!.classList.remove("hide");
                document.getElementById("turnNumber")!.classList.remove("hide");
                document.getElementById("hardcoreTip")!.classList.add("hide");
                document.body.classList.remove("hardcore-hide-container");
            }
            if (battleInfo.length) refreshBalls(battleInfo);
            break;
        case "darkMode":
            if (settings.darkMode) {
                document.body.classList.add("dark");
                document.body.classList.remove("light");
            } else {
                document.body.classList.remove("dark");
                document.body.classList.add("light");
            }
            break;
        case "omiegamon":
            if (settings.omiegamon) for (let i of document.querySelectorAll("[data-tag='omiega']")) i.classList.remove("hide");
            else for (let i of document.querySelectorAll("[data-tag='omiega']")) i.classList.add("hide");
    }
}
function addUpdateValueListener(name: string, min: () => number, max: () => number) {
    for (let i of document.querySelectorAll("." + name) as NodeListOf<HTMLElement>) i.addEventListener("blur", function () {
        if (Number.isNaN(Number(i.innerText))) {
            i.innerText = players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1][name];
        } else if (Number(i.innerText) > max()) {
            i.innerText = max().toString();
        } else if (Number(i.innerText) < min()) {
            i.innerText = min().toString();
        } else {
            i.innerText = Math.round(Number(i.innerText)).toString();
        }
        if (i.dataset.valueFor) players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1][name][i.dataset.valueFor] = Number(i.innerText);
        else players[Number(i.dataset.player) - 1].build[Number(i.dataset.no) - 1][name] = Number(i.innerText);
    });
}
function navigationRefresh() {
    renderFull((record[recordPosition].refresh) ? record[recordPosition].refresh : getNearestRefresh(record, recordPosition));
    document.getElementById("currentStep")!.innerText = (recordPosition + 1).toString();
    document.getElementById("totalSteps")!.innerText = record.length.toString();
    let tempTurnNumber = 0;
    for (let j = recordPosition; j >= 0; j--) if (record[j].type == "turn") {
        tempTurnNumber = record[j].args[2]!.number[0];
        break;
    }
    document.getElementById("turnNumber")!.innerText = getL10n("others", "turn", {
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
    let stepOfMainTextInText = Number(document.querySelector<HTMLElement>("#text [data-step].main-text")!.dataset.step);
    if (stepOfMainTextInText > mainTextRangeRight || stepOfMainTextInText < mainTextRangeLeft) {
        document.getElementById("text")!.innerHTML = "";
        for (let i = mainTextRangeLeft; i <= mainTextRangeRight; i++) {
            insertText(record[i], false, i);
        }
    }
    for (let i of document.querySelectorAll("[data-step]") as NodeListOf<HTMLDivElement | HTMLHeadingElement>) {
        if (Number(i.dataset.step) > recordPosition) i.classList.add("navigation-hide");
        else i.classList.remove("navigation-hide");
    }
}
function insertElementWithClass(elementName: string, item: RecordItem, parentId: string, classList: string[], step = recordPosition) {
    let tempElement = document.createElement(elementName);
    tempElement.innerHTML = getSequenceL10n(item.args);
    tempElement.classList.add(...classList);
    tempElement.dataset.content = JSON.stringify(item.args);
    tempElement.dataset.step = step.toString();
    tempElement.addEventListener("click", function () {
        recordPosition = step;
        navigationRefresh();
    });
    document.getElementById(parentId)!.appendChild(tempElement);
}
function insertText(recordItem: RecordItem, insertRecordContent: boolean, step = recordPosition) {
    if (recordItem.type == "main") {
        document.getElementById("text")!.innerHTML = "";
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
function closePage() {
    document.getElementById("dialogOuter")!.classList.remove("show");
}
function refreshRange(element: HTMLInputElement) {
    element.style.backgroundImage =
        "linear-gradient(90deg, var(--theme) 0%, var(--theme) " + element.value + "%, lightgray " + element.value + "%)";
    element.parentNode!.querySelector(".range-value")!.innerHTML = Math.floor(Number(element.value)).toString();
    localStorage.setItem("mechamonSettings", JSON.stringify(settings));
}
function checkBuildValidity() {
    if (settings.speciesClause) {
        if (players[0].build.length != new Set(players[0].build.map((x) => x.name)).size || players[1].build.length != new Set(players[1].build
            .map((x) => x.name)).size) return false;
    }
    for (let l of Object.keys(MOVE_BAN_LIST)) if (settings[l]) for (let i of [0, 1]) for (let j = 0; j < 6; j++) for (let k of MOVE_BAN_LIST[l])
        if (players[i].build[j].moves.includes(k)) return false;
    return true;
}
function addMark(playerIndex: number, name: string, layers: number) {
    let mark;
    for (mark of RK_MARKS) if (mark.name == name) break;
    if (battleInfo[playerIndex].marks[mark!.cat].name == name) battleInfo[playerIndex].marks[mark!.cat].layers += layers;
    else {
        battleInfo[playerIndex].marks[mark!.cat].name = name;
        battleInfo[playerIndex].marks[mark!.cat].layers = layers;
    }
}