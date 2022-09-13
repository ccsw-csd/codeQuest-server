"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const TileType_1 = require("../types/TileType");
/**
 *
 * Comportamiento del jugador
 *
 */
class Player {
    play(warrior) {
        //TODO: Implementar logica del jugador
        if (TileType_1.TileType.Enemy == warrior.lookAt())
            warrior.attack();
        else
            warrior.walk();
    }
}
exports.Player = Player;
