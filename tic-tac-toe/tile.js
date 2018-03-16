
import {game,player} from './script.js';

export default class Tile {
    constructor(index) {
        this.div = game.tiles[index];
        this.index = index;
        this.value = "empty";
        this.addListener();
        this.updateGraphic();
    }

    addListener() {
        this.div.addEventListener("click", this.playerClick.bind(this));
    }

    playerClick(){
        if (this.value == "empty"){
            this.setValue(player.value);
        }
    }

    setValue(newValue){
        this.value = newValue;
        this.updateGraphic();
    }

    updateGraphic(){
        switch(this.value){
            case "empty": 
                this.div.classList.add("cell-valid");
                this.div.innerHTML = "";
                break;
            case "x":
                this.div.classList.remove("cell-valid");
                this.div.innerHTML = '<div class = "cell-inner"><i class="fas fa-times"></i></div>';
                break;
            case "o":
                this.div.classList.remove("cell-valid");
                this.div.innerHTML = '<div class = "cell-inner"><i class="far fa-circle"></i></div>';
 
        }
    }


  }