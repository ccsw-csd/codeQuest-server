/* rm -rf ./bin && npx tsc && node bin\Application.js */

import { GameEvent } from './game/GameEvent';
import { Game } from './game/Game';
import { GameStatus } from './game/GameStatus';
import { LEVEL_MAP } from './input/LevelData';

let tiles : string[] = [];
tiles = [' ', '╚', '═', '╝', '║', '', '║', '╔', '═', '╗'];
tiles[11] = 'W';
tiles[98] = 'S';
tiles[99] = '░';
tiles[21] = 'B';
tiles[22] = 'B';

class TurnInfo {
	map : number[][] = [];
	events: GameEvent[];
	health: number;
}

class GameInfo {
	turns : TurnInfo[] = [];
	status : GameStatus;
}




let originalMap : number[][] = cloneMap(LEVEL_MAP);
let game : Game = new Game(LEVEL_MAP);
let gameInfo : GameInfo = simulate();

console.log(JSON.stringify(gameInfo));
//console.log(gameInfo);
//printGame(gameInfo);



function simulate() : GameInfo {

	
	let turn = 0;
	let gameInfo : GameInfo = new GameInfo();

	while (true) {
		
		let gameStatus = game.playTurn();
		
		if (gameStatus == GameStatus.ForbiddenAbilities) {
			gameInfo.turns = [];
			gameInfo.status = gameStatus;
			return gameInfo;
		}
		
		let turnInfo : TurnInfo = new TurnInfo();
		turnInfo.events = [].concat(game.events);
		turnInfo.map = cloneMap(game.map);
		turnInfo.health = game.warrior.health;
		
		turn++;
		gameInfo.turns.push(turnInfo);

		if (turn > 20) gameStatus = GameStatus.LimitTurn;

		if (gameStatus != GameStatus.Play) {
			gameInfo.status = gameStatus;
			return gameInfo;
		}
	}

}







function cloneMap(map : number[][]) : number[][] {
	let newMap : number[][] = [].concat(map);
	for (let i = 0; i < newMap.length; i++) newMap[i] = [].concat(map[i]);

	return newMap;
}

function printGame(gameInfo : GameInfo) {	

	console.log();
	console.log();
	console.log("===================== Related History =====================");

	printMap(originalMap);

	console.log("Status: "+gameInfo.status);
	console.log();

	for (let i = 0; i < gameInfo.turns.length; i++) {
		
		let turn = gameInfo.turns[i];
		console.log("Turn "+(i+1)+" ->   "+turn.health+" hp");

		printMap(turn.map);
		console.log(turn.events);

		console.log();
		console.log();
	}


	console.log();
	console.log();
}


function printMap(map : number[][]) : void {

	console.log();

	for (let j = 0; j < map.length; j++) {
		let row = '';
		for (let i = 0; i < map[j].length; i++) {
			row += tiles[map[j][i]];
		}
		console.log('\t\t'+row);
	}

	console.log();

}