"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bat = void 0;
const GameEvent_1 = require("../game/GameEvent");
const GameEventType_1 = require("../types/GameEventType");
const Position_1 = require("../game/Position");
class Bat {
    constructor(level, x, y) {
        this.warriorNear = false;
        this.health = 10;
        this.damageMin = 2;
        this.damageMax = 15;
        this.events = [];
        this.map = level.map;
        this.events = level.events;
        this.position = new Position_1.Position(x, y);
    }
    hurt(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
            this.events.push(new GameEvent_1.GameEvent('El Murciélago ha perdido todos los puntos de vida y muere.', GameEventType_1.GameEventType.Die_Enemy));
            this.map[this.position.y][this.position.x] = 0;
        }
        else {
            this.events.push(new GameEvent_1.GameEvent('Al Murciélago le queda ' + this.health + ' puntos de vida.', GameEventType_1.GameEventType.Info, this.health));
        }
    }
    getPosition() {
        return this.position;
    }
    newTurn() {
    }
    ;
    isDead() {
        return this.health <= 0;
    }
    play(warrior) {
        if (this.isWarriorNear(warrior)) {
            if (this.warriorNear) {
                this.attack(warrior);
            }
            else {
                this.prepareAttack();
            }
        }
        else {
            this.warriorNear = false;
        }
    }
    prepareAttack() {
        this.events.push(new GameEvent_1.GameEvent('El Murcielago avista al jugador y se prepara para atacar.', GameEventType_1.GameEventType.Info));
        this.warriorNear = true;
    }
    isWarriorNear(warrior) {
        return (warrior.position.y == this.position.y && warrior.position.x + 1 == this.position.x)
            || (warrior.position.y == this.position.y && warrior.position.x - 1 == this.position.x);
    }
    attack(warrior) {
        let damage = this.getRandomInt(this.damageMin, this.damageMax);
        this.events.push(new GameEvent_1.GameEvent('El Murcielago ataca al jugador y le inflinge ' + damage + ' puntos de daño.', GameEventType_1.GameEventType.Attack_Enemy, damage));
        warrior.hurt(damage);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.Bat = Bat;
