import { Position } from "../game/Position";
import { Warrior } from "../Warrior";

export interface Enemy {
	newTurn() : void;
	isDead() : boolean;
	play(warrior: Warrior) : void;
	getPosition(): Position;
	hurt(damage : number): void;
}