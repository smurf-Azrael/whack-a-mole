// src/game/engine/GameEngine.ts  
import { MoleLogic  } from "../logic/MoleLogic";  // Adjust path according to your structure  

export class GameEngine {  
  mole: MoleLogic ;  

  constructor() {  
    this.mole = new MoleLogic();  
  }  

  generateRandomCircle(max: number): number {  
    return Math.floor(Math.random() * max);  
  }  

  generateRandomDuration(min: number, max: number): number {  
    return Math.floor(Math.random() * (max - min) + min);  
  }  
}