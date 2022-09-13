"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const TileType_1 = require("../types/TileType");
class Tile {
    constructor(init) {
        Object.assign(this, init);
    }
    isSword() {
        return this.tile == 81;
    }
    getTileType() {
        if (this.tile > 0 && this.tile < 10)
            return TileType_1.TileType.Wall;
        if (this.tile > 90)
            return TileType_1.TileType.Exit;
        if (this.tile > 20 && this.tile < 30)
            return TileType_1.TileType.Enemy;
        return TileType_1.TileType.Empty;
    }
    checkWalkValid() {
        let type = this.getTileType();
        if (type == TileType_1.TileType.Enemy)
            return false;
        if (type == TileType_1.TileType.Wall)
            return false;
        return true;
    }
}
exports.Tile = Tile;
