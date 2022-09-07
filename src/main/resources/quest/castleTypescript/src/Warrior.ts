import { GameEvent } from "./game/GameEvent";
import { GameEventType } from "./types/GameEventType";
import { Game } from "./game/Game";
import { Position } from "./game/Position";
import { Tile } from "./game/Tile";
import { TileType } from "./types/TileType";

export class Warrior {

	health: number = 100;
	position: Position;
	hasSword : boolean = false;
	reachesLadder: boolean = false;

	damageMin: number = 5;
	damageMax: number = 10;

	
	abilitiesUsedPerTurn: number = 0;
	
	level: Game;
	map : number[][];
	events: GameEvent[] = [];
	
	
	constructor(level : Game, x: number, y:number) {
		this.level = level;
		this.map = level.map;
		this.events = level.events;
		this.position = new Position(x, y);
	}

	public walk(direction?: string): void {	
		this.abilitiesUsedPerTurn++;
		if (direction == null) direction = 'forward';

		let tile : Tile = this.getNextTile(direction);

		if (this.checkWalkValid(tile) == false) {
			this.events.push(new GameEvent('El jugador no puede '+this.translateDirection(direction)+'r.', GameEventType.DontMove)); 
			return;
		}

		this.map[this.position.y][this.position.x] = 0;

		if (direction == 'forward') {
			this.events.push(new GameEvent('El jugador avanza su posición.', GameEventType.Move));
			this.position.x++;	
		}
		else  {
			this.events.push(new GameEvent('El jugador retrocede su posición.', GameEventType.Move));
			this.position.x--;
		}

		if (tile.tile == 98) {
			this.map[this.position.y][this.position.x] = 0;
			this.hasSword = true;
			this.events.push(new GameEvent('El jugador coge la espada.', GameEventType.Info));

			this.damageMin = 8;
			this.damageMax = 24;
		}
		
		if (tile.type == TileType.Stairs) {
			this.reachesLadder = true;
			this.events.push(new GameEvent('El jugador llega a la escalera y sube al siguiente piso.', GameEventType.Finish));
		}

		this.map[this.position.y][this.position.x] = 11;
	}

	public attack(direction?: string): void {
		this.abilitiesUsedPerTurn++;
		if (direction == null) direction = 'forward';

		let tile = this.getNextTile(direction);
		if (tile.type == TileType.Enemy) {

			let damage = this.getRandomInt(this.damageMin, this.damageMax);
			let enemy = this.level.getEnemyAtTile(tile);
			if (enemy != null) {

				this.events.push(new GameEvent('El jugador ataca al enemigo y le inflinge '+damage+' puntos de daño.', GameEventType.Attack_Player, damage));
				enemy.hurt(damage);
			}
		}

	}
	
	public lookAt(direction?: string): any {
		if (direction == null) direction = 'forward';

		try {
			return this.getNextTile(direction);
		} catch (e) {
			return null
		}
	
	}	
	
	public think(message: string): void {

		this.events.push(new GameEvent(message, GameEventType.Think));
	}




	public hurt(damage : number): void {
		this.health -= damage;
		if (this.health < 0) {
			this.health = 0;
			this.events.push(new GameEvent('El jugador ha perdido todos los puntos de vida. La partida acaba aquí.', GameEventType.Die_Player));
		}
		else {
			this.events.push(new GameEvent('Al jugador le queda '+this.health+' puntos de vida.', GameEventType.Info, this.health));
		}
		
	}
	
	public isReachedLadder() : boolean  {
		return this.reachesLadder;
	}

	public isDead() : boolean {
		return this.health <= 0;
	}

	public newTurn() : void {
		this.abilitiesUsedPerTurn = 0;
	}

	public isValidTurn() : boolean {
		return this.abilitiesUsedPerTurn <= 1;
	}
	
	private translateDirection(direction : string) : string {
		if (direction == 'forward') return 'avanza';
		return 'retrocede';
	}
	
	private getNextTile(direction: string): Tile {
		let y = this.position.y;
		let x = this.position.x;

		if (direction == 'forward') x++;
		else x--;

		let nextTile : number = this.map[y][x];

		return {
			position: new Position(x, y),
			tile: nextTile,
			type: this.getTileType(nextTile)
		};


	}

	private getTileType(tile: number): TileType {

		if (tile > 0 && tile < 10) return TileType.Wall;
		if (tile == 99) return TileType.Stairs;
		if (tile > 20 && tile < 30) return TileType.Enemy;
		return TileType.Empty;
	}


	private checkWalkValid(tile: Tile): boolean {

		if (tile.type == TileType.Enemy) return false;
		if (tile.type == TileType.Wall) return false;

		return true;
	}

	private getRandomInt(min: number, max: number) : number {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max - min) + min);
	}	

}