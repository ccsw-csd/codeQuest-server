"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(position) {
        return this.x == position.x && this.y == position.y;
    }
}
exports.Position = Position;
