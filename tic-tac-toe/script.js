
var gridSize = 3;

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    buildTiles();
}

var domElements = {
    tiles: document.getElementsByClassName("game-cell"),

}

function buildTiles(){
    for (let i = 0; i < domElements.tiles.length; i++){
        let tile = new Tile(i);
    }
}


var game = {
    tiles: domElements.tiles,
    rows: [],
    cols: [],
    diags: [],
    axes:[],
}


var player = {
    value: "x",
    isTurn: true,
}

class Tile {
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
                this.div.innerHTML = "";
                this.div.classList.add("cell-valid");
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

