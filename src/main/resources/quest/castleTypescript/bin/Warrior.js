"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const GameEvent_1 = require("./game/GameEvent");
const GameEventType_1 = require("./types/GameEventType");
const Position_1 = require("./game/Position");
const Tile_1 = require("./game/Tile");
const TileType_1 = require("./types/TileType");
const Direction_1 = require("./types/Direction");
class Warrior {
    constructor(level, x, y) {
        this.health = 100;
        this.hasSword = false;
        this.reachesLadder = false;
        this.damageMin = 10;
        this.damageMax = 15;
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
            direction = Direction_1.Direction.Right;
        let tile = this.getNextTile(direction);
        if (tile.checkWalkValid() == false) {
            this.events.push(new GameEvent_1.GameEvent('El jugador no puede ' + this.translateDirection(direction) + 'r.', GameEventType_1.GameEventType.DontMove));
            return;
        }
        this.map[this.position.y][this.position.x] = 0;
        if (direction == Direction_1.Direction.Right) {
            this.events.push(new GameEvent_1.GameEvent('El jugador avanza su posición.', GameEventType_1.GameEventType.Move));
            this.position.x++;
        }
        else {
            this.events.push(new GameEvent_1.GameEvent('El jugador retrocede su posición.', GameEventType_1.GameEventType.Move));
            this.position.x--;
        }
        if (tile.isSword()) {
            this.map[this.position.y][this.position.x] = 0;
            this.hasSword = true;
            this.events.push(new GameEvent_1.GameEvent('El jugador coge la espada.', GameEventType_1.GameEventType.Info));
            this.damageMin = 8;
            this.damageMax = 24;
        }
        if (tile.getTileType() == TileType_1.TileType.Exit) {
            this.reachesLadder = true;
            if (tile.tile == 99)
                this.events.push(new GameEvent_1.GameEvent('El jugador llega a la escalera y sube al siguiente piso.', GameEventType_1.GameEventType.Finish));
            if (tile.tile == 98)
                this.events.push(new GameEvent_1.GameEvent('El jugador atraviesa la puerta y accede a una nueva sala.', GameEventType_1.GameEventType.Finish));
        }
        this.map[this.position.y][this.position.x] = 11;
    }
    attack(direction) {
        this.abilitiesUsedPerTurn++;
        if (direction == null)
            direction = Direction_1.Direction.Right;
        let tile = this.getNextTile(direction);
        if (tile.getTileType() == TileType_1.TileType.Enemy) {
            let damage = this.getRandomInt(this.damageMin, this.damageMax);
            let enemy = this.level.getEnemyAtTile(tile);
            if (enemy != null) {
                this.events.push(new GameEvent_1.GameEvent('El jugador ataca al enemigo y le inflinge ' + damage + ' puntos de daño.', GameEventType_1.GameEventType.Attack_Player, damage));
                enemy.hurt(damage);
            }
        }
        else {
            this.events.push(new GameEvent_1.GameEvent('El jugador falla su ataque. En esa posición no hay nadie al que atacar.', GameEventType_1.GameEventType.Info));
        }
    }
    lookAt(direction) {
        if (direction == null)
            direction = Direction_1.Direction.Right;
        try {
            return this.getNextTile(direction).getTileType();
        }
        catch (e) {
            return TileType_1.TileType.Empty;
        }
    }
    think(message) {
        this.events.push(new GameEvent_1.GameEvent("El jugador piensa: " + message, GameEventType_1.GameEventType.Think));
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
        if (direction == Direction_1.Direction.Right)
            return 'avanza';
        return 'retrocede';
    }
    getNextTile(direction) {
        let y = this.position.y;
        let x = this.position.x;
        if (direction == Direction_1.Direction.Right)
            x++;
        else
            x--;
        let nextTile = this.map[y][x];
        return new Tile_1.Tile({
            position: new Position_1.Position(x, y),
            tile: nextTile
        });
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.Warrior = Warrior;
