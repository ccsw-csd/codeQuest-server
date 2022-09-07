"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEventType = void 0;
var GameEventType;
(function (GameEventType) {
    GameEventType[GameEventType["None"] = 1] = "None";
    GameEventType[GameEventType["Move"] = 2] = "Move";
    GameEventType[GameEventType["DontMove"] = 3] = "DontMove";
    GameEventType[GameEventType["Info"] = 4] = "Info";
    GameEventType[GameEventType["Think"] = 5] = "Think";
    GameEventType[GameEventType["Finish"] = 6] = "Finish";
    GameEventType[GameEventType["Die_Enemy"] = 7] = "Die_Enemy";
    GameEventType[GameEventType["Die_Player"] = 8] = "Die_Player";
    GameEventType[GameEventType["Attack_Player"] = 9] = "Attack_Player";
    GameEventType[GameEventType["Attack_Enemy"] = 10] = "Attack_Enemy";
    GameEventType[GameEventType["Hurt_Player"] = 11] = "Hurt_Player";
    GameEventType[GameEventType["Hurt_Enemy"] = 12] = "Hurt_Enemy";
})(GameEventType = exports.GameEventType || (exports.GameEventType = {}));
