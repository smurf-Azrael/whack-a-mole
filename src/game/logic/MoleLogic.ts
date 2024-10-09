// src/game/logic/Mole.ts  
export class MoleLogic {  
    isVisible: boolean;  
  
    constructor() {  
      this.isVisible = false;  
    }  
  
    show() {  
      this.isVisible = true;  
    }  
  
    hide() {  
      this.isVisible = false;  
    }  
  }