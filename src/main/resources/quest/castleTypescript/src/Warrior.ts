import { GameEvent } from "./game/GameEvent";
import { GameEventType } from "./types/GameEventType";
import { Game } from "./game/Game";
import { Position } from "./game/Position";
import { Tile } from "./game/Tile";
import { TileType } from "./types/TileType";
import { Direction } from "./types/Direction";

export class Warrior {

	health: number = 100;
	position: Position;
	hasSword : boolean = false;
	reachesLadder: boolean = false;

	damageMin: number = 10;
	damageMax: number = 15;

	
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

	public walk(direction?: Direction): void {	
		this.abilitiesUsedPerTurn++;
		if (direction == null) direction = Direction.Right;

		let tile : Tile = this.getNextTile(direction);

		if (tile.checkWalkValid() == false) {
			this.events.push(new GameEvent('El jugador no puede '+this.translateDirection(direction)+'r.', GameEventType.DontMove)); 
			return;
		}

		this.map[this.position.y][this.position.x] = 0;

		if (direction == Direction.Right) {
			this.events.push(new GameEvent('El jugador avanza su posición.', GameEventType.Move));
			this.position.x++;	
		}
		else  {
			this.events.push(new GameEvent('El jugador retrocede su posición.', GameEventType.Move));
			this.position.x--;
		}

		if (tile.isSword()) {
			this.map[this.position.y][this.position.x] = 0;
			this.hasSword = true;
			this.events.push(new GameEvent('El jugador coge la espada.', GameEventType.Info));

			this.damageMin = 8;
			this.damageMax = 24;
		}
		
		if (tile.getTileType() == TileType.Exit) {
			this.reachesLadder = true;

			if (tile.tile == 99) this.events.push(new GameEvent('El jugador llega a la escalera y sube al siguiente piso.', GameEventType.Finish));
			if (tile.tile == 98) this.events.push(new GameEvent('El jugador atraviesa la puerta y accede a una nueva sala.', GameEventType.Finish));
		}

		this.map[this.position.y][this.position.x] = 11;
	}

	public attack(direction?: Direction): void {
		this.abilitiesUsedPerTurn++;
		if (direction == null) direction = Direction.Right;

		let tile = this.getNextTile(direction);
		if (tile.getTileType() == TileType.Enemy) {

			let damage = this.getRandomInt(this.damageMin, this.damageMax);
			let enemy = this.level.getEnemyAtTile(tile);
			if (enemy != null) {

				this.events.push(new GameEvent('El jugador ataca al enemigo y le inflinge '+damage+' puntos de daño.', GameEventType.Attack_Player, damage));
				enemy.hurt(damage);
			}
		}
		else {
			this.events.push(new GameEvent('El jugador falla su ataque. En esa posición no hay nadie al que atacar.', GameEventType.Info));
		}

	}
	
	public lookAt(direction?: Direction): TileType {
		if (direction == null) direction = Direction.Right;

		try {
			return this.getNextTile(direction).getTileType();
		} catch (e) {
			return TileType.Empty
		}
	
	}	
	
	public think(message: string): void {

		this.events.push(new GameEvent("El jugador piensa: "+message, GameEventType.Think));
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
	
	private translateDirection(direction : Direction) : string {
		if (direction == Direction.Right) return 'avanza';
		return 'retrocede';
	}
	
	private getNextTile(direction: Direction): Tile {
		let y = this.position.y;
		let x = this.position.x;

		if (direction == Direction.Right) x++;
		else x--;

		let nextTile : number = this.map[y][x];

		return new Tile({
			position: new Position(x, y),
			tile: nextTile
		});


	}

	

	private getRandomInt(min: number, max: number) : number {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max - min) + min);
	}	

}