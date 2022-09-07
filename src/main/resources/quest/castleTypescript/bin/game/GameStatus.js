"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = void 0;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["ForbiddenAbilities"] = -1] = "ForbiddenAbilities";
    GameStatus[GameStatus["Play"] = 0] = "Play";
    GameStatus[GameStatus["Dead"] = 1] = "Dead";
    GameStatus[GameStatus["ReachedLadder"] = 2] = "ReachedLadder";
    GameStatus[GameStatus["LimitTurn"] = 3] = "LimitTurn";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
