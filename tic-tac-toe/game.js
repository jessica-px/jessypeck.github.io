import Tile from './tile.js';
import {computer} from './computer.js';
import {player} from './player.js';
import {domElements as dom} from './script.js';

var winAudio = new Audio('audio/good-tune.wav');
var loseAudio = new Audio('audio/bad-tune.wav');
var timeBetweenRounds = 1400;

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
            stopAudio();
            player.audio.play();
            tile.setValue(player.value);
            game.endTurn();
        }
    },

    setMessage: function(message){
        dom.message.innerHTML = message;
    },

    endTurn: function(){
        if (checkWin() || checkDraw()){
            endRound();
            return;
        }
        else{
            player.toggleTurn();
            computer.toggleTurn();
        }
    }

}

function stopAudio(){
    player.audio.pause();
    player.audio.currentTime = 0;
    computer.audio.pause();
    computer.audio.currentTime = 0;
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
        game.setMessage("Your Turn");
    }
}

function checkWin(){
    for (let axis of game.axes){
        for (let line of axis){
            let tileValues = game.getValues(line);
            if (countInArray(tileValues, player.value) == 3){
                game.playerScore+= 1;
                stopAudio();
                winAudio.play();
                highlightLine(line);
                game.setMessage("You Win!");
                return true;
            }
            if (countInArray(tileValues, computer.value) == 3){
                game.compScore += 1;
                stopAudio();
                loseAudio.play();
                highlightLine(line);
                game.setMessage("You Lose");
                return true;
            }
        }
    }
}

function checkDraw(){
    let tileValues = game.getValues(game.tiles);
    //console.log(tileValues);
    if (tileValues.includes("empty") == false){
        stopAudio();
        loseAudio.play();
        game.drawScore+= 1;
        game.setMessage("Draw");
        return true;
    }
}

function endRound(){
    setScore();
    player.isTurn = false;
    computer.isTurn = false;
    setTimeout(function(){restart()}, timeBetweenRounds);
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