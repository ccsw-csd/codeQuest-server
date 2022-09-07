import { Enemy } from "./Enemy";
import { GameEvent } from "../game/GameEvent";
import { GameEventType } from "../types/GameEventType";
import { Game } from "../game/Game";
import { Position } from "../game/Position";
import { Warrior } from "../Warrior";

export class Bat implements Enemy {

	health: number = 10;
	position: Position;

	damageMin: number = 2;
	damageMax: number = 15;

	map : number[][];
	events: GameEvent[] = [];


	constructor(level : Game, x: number, y:number) {
		this.map = level.map;
		this.events = level.events;
		this.position = new Position(x, y);
	}

	public hurt(damage : number): void {
		this.health -= damage;
		if (this.health < 0) {
			this.health = 0;
			this.events.push(new GameEvent('El enemigo ha perdido todos los puntos de vida y muere.', GameEventType.Die_Enemy));

			this.map[this.position.y][this.position.x] = 0;
		}
		else {
			this.events.push(new GameEvent('Al enemigo le queda '+this.health+' puntos de vida.', GameEventType.Info, this.health));
		}
		
	}	

	public getPosition() : Position {
		return this.position;		
	}

	public newTurn() : void {
	};

	public isDead() : boolean {
		return this.health <= 0;
	}

	public play(warrior : Warrior) : void {
		if ((warrior.position.y == this.position.y && warrior.position.x+1 == this.position.x) 
			|| (warrior.position.y == this.position.y && warrior.position.x-1 == this.position.x)) {
			this.attack(warrior);
		}
		
	}
	
	private attack(warrior : Warrior): void {
		let damage = this.getRandomInt(this.damageMin, this.damageMax);
		
		this.events.push(new GameEvent('El Murcielago ataca al jugador y le inflinge '+damage+' puntos de daño.', GameEventType.Attack_Enemy, damage));			
		warrior.hurt(damage);
	}

	private getRandomInt(min: number, max: number) : number {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max - min) + min);
	}	
}