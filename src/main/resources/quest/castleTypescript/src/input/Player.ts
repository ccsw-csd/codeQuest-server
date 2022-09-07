import { Play } from "../game/Play";
import { TileType } from "../types/TileType";
import { Warrior } from "../Warrior";

import { Play } from '../game/Play';
/** comentario 
 de varias 
 linea **/

export class Player implements Play {public play(warrior : Warrior) : void {if (warrior.lookAt().type == TileType.Enemy) {warrior.attack();}else {warrior.walk();}warrior.think('Me queda: '+warrior.health);}}