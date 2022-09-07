"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Bat_1 = require("../enemies/Bat");
const Player_1 = require("../input/Player");
const Warrior_1 = require("../Warrior");
const GameStatus_1 = require("./GameStatus");
class Game {
    constructor(map) {
        this.map = [];
        this.enemies = [];
        this.events = [];
        this.map = map;
        for (let j = 0; j < this.map.length; j++) {
            for (let i = 0; i < this.map[j].length; i++) {
                let tile = this.map[j][i];
                if (tile == 11) {
                    this.warrior = new Warrior_1.Warrior(this, i, j);
                }
                else if (tile == 21) {
                    this.enemies.push(new Bat_1.Bat(this, i, j));
                }
            }
        }
        this.player = new Player_1.Player();
    }
    getEnemyAtTile(tile) {
        return this.enemies.find(enemy => enemy.getPosition().equals(tile.position));
    }
    playTurn() {
        this.events.length = 0;
        this.newTurn();
        this.playPlayer();
        this.playEnemies();
        if (this.warrior.abilitiesUsedPerTurn > 1)
            return GameStatus_1.GameStatus.ForbiddenAbilities;
        if (this.warrior.isDead())
            return GameStatus_1.GameStatus.Dead;
        if (this.warrior.isReachedLadder())
            return GameStatus_1.GameStatus.ReachedLadder;
        return GameStatus_1.GameStatus.Play;
    }
    newTurn() {
        this.warrior.newTurn();
        this.enemies.forEach(enemy => {
            enemy.newTurn();
        });
    }
    playPlayer() {
        this.player.play(this.warrior);
    }
    playEnemies() {
        this.enemies.forEach(enemy => {
            if (enemy.isDead())
                return;
            enemy.play(this.warrior);
        });
    }
}
exports.Game = Game;
