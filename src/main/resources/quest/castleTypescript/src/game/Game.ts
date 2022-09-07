import { Bat } from "../enemies/Bat";
import { Enemy } from "../enemies/Enemy";
import { GameEvent } from "./GameEvent";
import { Player } from "../input/Player";
import { Tile } from "./Tile";
import { Warrior } from "../Warrior";
import { GameStatus } from "./GameStatus";

export class Game {
	
	map : number[][] = [];
	
	warrior: Warrior;
	player: Player;
	
	enemies: Enemy[] = [];

	events: GameEvent[] = [];
	
	constructor(map : number[][]) {
		
		this.map  = map;

		for (let j = 0; j < this.map.length; j++) {
			for (let i = 0; i < this.map[j].length; i++) {
				let tile = this.map[j][i];

				if (tile == 11) {
					this.warrior = new Warrior(this, i, j);
				}
				else if (tile == 21) {
					this.enemies.push(new Bat(this, i, j));
				}

			}
			
		}

		
		this.player = new Player();
		
	}

	

	public getEnemyAtTile(tile: Tile) : Enemy | undefined {
		return this.enemies.find(enemy => enemy.getPosition().equals(tile.position));

	}


	public playTurn() : GameStatus {

		this.events.length = 0;
		this.newTurn();

		this.playPlayer()
		this.playEnemies();		
		
		if (this.warrior.abilitiesUsedPerTurn > 1) return GameStatus.ForbiddenAbilities;
		if (this.warrior.isDead()) return GameStatus.Dead;
		if (this.warrior.isReachedLadder()) return GameStatus.ReachedLadder;
		return GameStatus.Play;
	}
	
	private newTurn(): void {
		this.warrior.newTurn();
		this.enemies.forEach(enemy => { 
			enemy.newTurn();
		});
	}


	private playPlayer() : void {
		this.player.play(this.warrior);
	}

	private playEnemies() : void {
		this.enemies.forEach(enemy => { 
			if (enemy.isDead()) return;

			enemy.play(this.warrior);
		});
	}
}
