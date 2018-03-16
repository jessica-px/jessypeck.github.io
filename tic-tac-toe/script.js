
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
    playerScore: document.getElementById("score-player"),
    compScore: document.getElementById("score-comp"),
    drawScore: document.getElementById("score-draw"),
}

var game = {
    tiles: [],
    newGame: true,
    rows: [],
    cols: [],
    diags: [],
    axes:[],
    getValues: getTileValues,
    playerScore: 0,
    compScore: 0,
    drawScore: 0,
    toggleTurns: function(){
        player.toggleTurn();
        computer.toggleTurn();
    },
    setMessage: function(message){
        dom.message.innerHTML = message;
    },
    setScore: function(){
        dom.playerScore.innerHTML = "Player: " + this.playerScore;
        dom.drawScore.innerHTML = "Draws: " + this.drawScore;
        dom.compScore.innerHTML = "Computer: " + this.compScore;
    },
    endTurn: function(){
        let win = checkWin();
        if (win != false){
            processWin(win);
            return;
        }
        else{
            player.toggleTurn();
            computer.toggleTurn();
        }
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
    otherBtn.classList.remove("b-down");
    otherBtn.classList.add("b-up");
    btn.classList.remove("b-up");
    btn.classList.add("b-down");
    player.value = value;
    computer.value = (value == "x")? "o" : "x";
    restart();
}

function restart(){
    game.newGame = true;
    readyPlayerOne();
    for (let tile of game.tiles){
        tile.setValue("empty");
    }
}

function readyPlayerOne(){
    if (computer.value == "x"){
        player.isTurn = false;
        computer.begin();
    }
    else{
        computer.isTurn = false;
        player.isTurn = true;
    }
}



function checkWin(){
    for (let axis of game.axes){
        for (let line of axis){
            let tileValues = game.getValues(line);
            if (countInArray(tileValues, player.value) == 3){
                game.playerScore+= 1;
                console.log("PLAYER WINS");
                return line;
            }
            if (countInArray(tileValues, computer.value) == 3){
                game.compScore += 1;
                console.log("COMPUTER WINS");
                return line;
            }
        }
    }
    return false;
}

function processWin(winningLine){
    game.setScore();
    player.isTurn = false;
    computer.isTurn = false;
    highlightLine(winningLine);
    setTimeout(function(){restart()}, 1000);
}

function highlightLine(line){
    for(let tile of line){
        tile.div.style.color = "yellow";
    }
}


function getTileValues(tiles){
    let values = [];
    for (let i = 0; i < tiles.length; i++){
        //console.log(tile);
        values.push(tiles[i].value);
    }
    return values;
}

function countInArray(array, value){
    return array.filter(item => item == value).length;
}



