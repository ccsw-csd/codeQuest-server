import { GameEventType } from "../types/GameEventType";

export class GameEvent {
	message: string;
	type: GameEventType;
	data: any;

	constructor(message: string, type: GameEventType, data?: any) {
		this.message = message;
		this.type = type;
		if (data != undefined) this.data = data;
	}
}