
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

function bindListeners(){
    dom.xBtn.addEventListener("click", function() {
        playerValueBtn(dom.xBtn, dom.oBtn, "x");});
    dom.oBtn.addEventListener("click", function() {
        playerValueBtn(dom.oBtn, dom.xBtn, "o");});
}

function buildTiles(){
    for (let i = 0; i < dom.tiles.length; i++){
        let tile = new Tile(i);
    }
}

function playerValueBtn(btn, otherBtn, value){
    // Add condition: if any moves have been made, show
    // a pop-up requestin, "Restart game?"
    otherBtn.classList.remove("b-down");
    otherBtn.classList.add("b-up");
    btn.classList.remove("b-up");
    btn.classList.add("b-down");
    player.value = value;
}





