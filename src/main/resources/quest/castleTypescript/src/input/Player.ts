import { Play } from "../game/Play";
import { TileType } from "../types/TileType";
import { Warrior } from "../Warrior";

/**
 *
 * Comportamiento del jugador
 * 
 */
export class Player implements Play {
    
    
  public play(warrior : Warrior) : void {

    //TODO: Implementar logica del jugador
    if (TileType.Enemy == warrior.lookAt()) warrior.attack();
    else warrior.walk();

  }
    
}