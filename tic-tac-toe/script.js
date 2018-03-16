
import Tile from './tile.js';
import {computer} from './computer.js';
export {game,player};

var dom;
var gridSize = 3;

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    dom = domElements;
    bindListeners();
    buildTiles();
}

var domElements = {
    tiles: document.getElementsByClassName("game-cell"),
    xBtn: document.getElementById("x-btn"),
    oBtn: document.getElementById("o-btn"),
    message: document.getElementById("message-row"),
}

var game = {
    tiles: [],
    newGame: true,
    rows: [],
    cols: [],
    diags: [],
    axes:[],
    restart: function(){
        for (let tile of this.tiles){
            tile.setValue("empty");
            this.newGame = true;
        }
    },
    toggleTurns: function(){
        player.toggleTurn();
        computer.toggleTurn();
    },
    setMessage: function(message){
        dom.message.innerHTML = message;
    }

}

var player = {
    value: "x",
    isTurn: true,
    toggleTurn: function(){
        this.isTurn = !this.isTurn;
        game.setMessage("Your Turn");
    }
}

function bindListeners(){
    dom.xBtn.addEventListener("click", function() {
        playerValueBtn(dom.xBtn, dom.oBtn, "x");});
    dom.oBtn.addEventListener("click", function() {
        playerValueBtn(dom.oBtn, dom.xBtn, "o");});
}

function buildTiles(){
    for (let i = 0; i < dom.tiles.length; i++){
        let div = dom.tiles[i];
        let tile = new Tile(div);
        game.tiles.push(tile);
    }
    buildAxes();
}

function buildAxes(){
    for (let i = 0; i <= 6; i+=3){
        let row = [game.tiles[i], game.tiles[i+1], game.tiles[i+2]];
        game.rows.push(row);
    }
    for (let i = 0; i < 3; i++){
        let col = [game.tiles[i], game.tiles[i+3], game.tiles[i+6]];
        game.cols.push(col);
    }
    var diag1 = [game.tiles[0], game.tiles[4], game.tiles[8]];
    var diag2 = [game.tiles[2], game.tiles[4], game.tiles[6]];
    game.diags.push(diag1, diag2);
    game.axes.push(game.rows, game.cols, game.diags);
}




function playerValueBtn(btn, otherBtn, value){
    if (!game.newGame){
        // Potentially: a confirmation pop-up asking, "Begin new game?"
        game.restart();
    }
    otherBtn.classList.remove("b-down");
    otherBtn.classList.add("b-up");
    btn.classList.remove("b-up");
    btn.classList.add("b-down");
    player.value = value;
    computer.value = (value == "x")? "o" : "x";
}






