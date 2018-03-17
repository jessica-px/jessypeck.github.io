import Tile from './tile.js';
import {computer} from './computer.js';
import {player} from './player.js';
import {domElements as dom} from './script.js';

export var game = {
    tiles: [],
    rows: [],
    cols: [],
    diags: [],
    axes:[],
    getValues: getTileValues,
    playerScore: 0,
    compScore: 0,
    drawScore: 0,

    setPlayerValue: function(value){
        player.value = value;
        computer.value = (value == "x")? "o" : "x";
        restart();
    },

    playerPlaceTile: function(tile){
        if (tile.value == "empty" && player.isTurn){
            tile.setValue(player.value);
            game.endTurn();
        }
    },

    setMessage: function(message){
        dom.message.innerHTML = message;
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


function restart(){
    for (let tile of game.tiles){
        tile.setValue("empty");
    }
    readyPlayerOne();
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
    setScore();
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

function setScore(){
    dom.playerScore.innerHTML = "Player: " + game.playerScore;
    dom.drawScore.innerHTML = "Draws: " + game.drawScore;
    dom.compScore.innerHTML = "Computer: " + game.compScore;
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