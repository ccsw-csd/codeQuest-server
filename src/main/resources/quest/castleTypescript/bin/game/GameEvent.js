"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEvent = void 0;
class GameEvent {
    constructor(message, type, data) {
        this.message = message;
        this.type = type;
        if (data != undefined)
            this.data = data;
    }
}
exports.GameEvent = GameEvent;
