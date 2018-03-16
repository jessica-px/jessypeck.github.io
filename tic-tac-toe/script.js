
import Tile from './tile.js';
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
    }
}

var player = {
    value: "x",
    isTurn: true,
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
        
    }
}

function playerValueBtn(btn, otherBtn, value){
    if (!game.newGame){
        console.log("POP-UP: Begin new game?");
        game.restart();
    }
    otherBtn.classList.remove("b-down");
    otherBtn.classList.add("b-up");
    btn.classList.remove("b-up");
    btn.classList.add("b-down");
    player.value = value;



}





