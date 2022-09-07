"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const GameEvent_1 = require("./game/GameEvent");
const GameEventType_1 = require("./types/GameEventType");
const Position_1 = require("./game/Position");
const TileType_1 = require("./types/TileType");
class Warrior {
    constructor(level, x, y) {
        this.health = 100;
        this.hasSword = false;
        this.reachesLadder = false;
        this.damageMin = 5;
        this.damageMax = 10;
        this.abilitiesUsedPerTurn = 0;
        this.events = [];
        this.level = level;
        this.map = level.map;
        this.events = level.events;
        this.position = new Position_1.Position(x, y);
    }
    walk(direction) {
        this.abilitiesUsedPerTurn++;
        if (direction == null)
            direction = 'forward';
        let tile = this.getNextTile(direction);
        if (this.checkWalkValid(tile) == false) {
            this.events.push(new GameEvent_1.GameEvent('El jugador no puede ' + this.translateDirection(direction) + 'r.', GameEventType_1.GameEventType.DontMove));
            return;
        }
        this.map[this.position.y][this.position.x] = 0;
        if (direction == 'forward') {
            this.events.push(new GameEvent_1.GameEvent('El jugador avanza su posición.', GameEventType_1.GameEventType.Move));
            this.position.x++;
        }
        else {
            this.events.push(new GameEvent_1.GameEvent('El jugador retrocede su posición.', GameEventType_1.GameEventType.Move));
            this.position.x--;
        }
        if (tile.tile == 98) {
            this.map[this.position.y][this.position.x] = 0;
            this.hasSword = true;
            this.events.push(new GameEvent_1.GameEvent('El jugador coge la espada.', GameEventType_1.GameEventType.Info));
            this.damageMin = 8;
            this.damageMax = 24;
        }
        if (tile.type == TileType_1.TileType.Stairs) {
            this.reachesLadder = true;
            this.events.push(new GameEvent_1.GameEvent('El jugador llega a la escalera y sube al siguiente piso.', GameEventType_1.GameEventType.Finish));
        }
        this.map[this.position.y][this.position.x] = 11;
    }
    attack(direction) {
        this.abilitiesUsedPerTurn++;
        if (direction == null)
            direction = 'forward';
        let tile = this.getNextTile(direction);
        if (tile.type == TileType_1.TileType.Enemy) {
            let damage = this.getRandomInt(this.damageMin, this.damageMax);
            let enemy = this.level.getEnemyAtTile(tile);
            if (enemy != null) {
                this.events.push(new GameEvent_1.GameEvent('El jugador ataca al enemigo y le inflinge ' + damage + ' puntos de daño.', GameEventType_1.GameEventType.Attack_Player, damage));
                enemy.hurt(damage);
            }
        }
    }
    lookAt(direction) {
        if (direction == null)
            direction = 'forward';
        try {
            return this.getNextTile(direction);
        }
        catch (e) {
            return null;
        }
    }
    think(message) {
        this.events.push(new GameEvent_1.GameEvent(message, GameEventType_1.GameEventType.Think));
    }
    hurt(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
            this.events.push(new GameEvent_1.GameEvent('El jugador ha perdido todos los puntos de vida. La partida acaba aquí.', GameEventType_1.GameEventType.Die_Player));
        }
        else {
            this.events.push(new GameEvent_1.GameEvent('Al jugador le queda ' + this.health + ' puntos de vida.', GameEventType_1.GameEventType.Info, this.health));
        }
    }
    isReachedLadder() {
        return this.reachesLadder;
    }
    isDead() {
        return this.health <= 0;
    }
    newTurn() {
        this.abilitiesUsedPerTurn = 0;
    }
    isValidTurn() {
        return this.abilitiesUsedPerTurn <= 1;
    }
    translateDirection(direction) {
        if (direction == 'forward')
            return 'avanza';
        return 'retrocede';
    }
    getNextTile(direction) {
        let y = this.position.y;
        let x = this.position.x;
        if (direction == 'forward')
            x++;
        else
            x--;
        let nextTile = this.map[y][x];
        return {
            position: new Position_1.Position(x, y),
            tile: nextTile,
            type: this.getTileType(nextTile)
        };
    }
    getTileType(tile) {
        if (tile > 0 && tile < 10)
            return TileType_1.TileType.Wall;
        if (tile == 99)
            return TileType_1.TileType.Stairs;
        if (tile > 20 && tile < 30)
            return TileType_1.TileType.Enemy;
        return TileType_1.TileType.Empty;
    }
    checkWalkValid(tile) {
        if (tile.type == TileType_1.TileType.Enemy)
            return false;
        if (tile.type == TileType_1.TileType.Wall)
            return false;
        return true;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.Warrior = Warrior;
