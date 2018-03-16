
import {game,player} from './script.js';

export default class Tile {
    constructor(div) {
        this.div = div;
        this.value = "empty";
        this.addListener();
        this.updateGraphic();
        game.tiles.push(this);
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
        game.newGame = false;
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