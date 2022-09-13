"use strict";
/* npx tsc && node bin\Application.js */
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./game/Game");
const GameStatus_1 = require("./game/GameStatus");
const LevelData_1 = require("./input/LevelData");
let tiles = [];
tiles = [' ', '╚', '═', '╝', '║', '', '║', '╔', '═', '╗'];
tiles[11] = 'W';
tiles[98] = 'S';
tiles[99] = '░';
tiles[21] = 'B';
tiles[22] = 'B';
class TurnInfo {
    constructor() {
        this.map = [];
    }
}
class GameInfo {
    constructor() {
        this.turns = [];
    }
}
let originalMap = cloneMap(LevelData_1.LEVEL_MAP);
let game = new Game_1.Game(LevelData_1.LEVEL_MAP);
let gameInfo = simulate();
console.log(JSON.stringify(gameInfo));
//console.log(gameInfo);
//printGame(gameInfo);
function simulate() {
    let turn = 0;
    let gameInfo = new GameInfo();
    while (true) {
        let gameStatus = game.playTurn();
        if (gameStatus == GameStatus_1.GameStatus.ForbiddenAbilities) {
            gameInfo.turns = [];
            gameInfo.status = gameStatus;
            return gameInfo;
        }
        let turnInfo = new TurnInfo();
        turnInfo.events = [].concat(game.events);
        turnInfo.map = cloneMap(game.map);
        turnInfo.health = game.warrior.health;
        turn++;
        gameInfo.turns.push(turnInfo);
        if (turn > 20) {
            gameInfo.status = GameStatus_1.GameStatus.LimitTurn;
            return gameInfo;
        }
        if (gameStatus != GameStatus_1.GameStatus.Play) {
            gameInfo.status = gameStatus;
            return gameInfo;
        }
    }
}
function cloneMap(map) {
    let newMap = [].concat(map);
    for (let i = 0; i < newMap.length; i++)
        newMap[i] = [].concat(map[i]);
    return newMap;
}
function printGame(gameInfo) {
    console.log();
    console.log();
    console.log("===================== Related History =====================");
    printMap(originalMap);
    console.log("Status: " + gameInfo.status);
    console.log();
    for (let i = 0; i < gameInfo.turns.length; i++) {
        let turn = gameInfo.turns[i];
        console.log("Turn " + (i + 1) + " ->   " + turn.health + " hp");
        printMap(turn.map);
        console.log(turn.events);
        console.log();
        console.log();
    }
    console.log();
    console.log();
}
function printMap(map) {
    console.log();
    for (let j = 0; j < map.length; j++) {
        let row = '';
        for (let i = 0; i < map[j].length; i++) {
            row += tiles[map[j][i]];
        }
        console.log('\t\t' + row);
    }
    console.log();
}
