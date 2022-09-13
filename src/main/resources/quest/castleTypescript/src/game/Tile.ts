import { TileType } from "../types/TileType";
import { Position } from "./Position";

export class Tile {
	position: Position;
	tile: number;
	
	public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
    }
	
	public isSword() : boolean {
		return this.tile == 81;
	}
	
	public getTileType(): TileType {

		if (this.tile > 0 && this.tile < 10) return TileType.Wall;
		if (this.tile > 90) return TileType.Exit;
		if (this.tile > 20 && this.tile < 30) return TileType.Enemy;
		return TileType.Empty;
	}


	public  checkWalkValid(): boolean {
		let type = this.getTileType();

		if (type == TileType.Enemy) return false;
		if (type == TileType.Wall) return false;

		return true;
	}

}

