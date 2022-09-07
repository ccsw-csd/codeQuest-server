"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const TileType_1 = require("../types/TileType");
class Player {
    play(warrior) {
        if (warrior.lookAt().type == TileType_1.TileType.Enemy) {
            warrior.attack();
        }
        else {
            warrior.walk();
        }
        warrior.think("Me queda: " + warrior.health);
    }
}
exports.Player = Player;
