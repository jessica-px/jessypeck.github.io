import {game} from './script.js';

export var computer = {
    value: "o",
    isTurn: false,
    turnPending: false,
    toggleTurn: toggle,
    begin: beginTurn
}


function toggle(){
    this.isTurn = !this.isTurn;
    if (this.isTurn){
        this.begin();
    }
}

function beginTurn(){
    game.setMessage("Computer's Turn");
    this.isTurn = true;
    this.turnPending = true;
    setTimeout(function(){compTurn()}, 600)
    console.log("Comp turn: BEGIN");
}

function compTurn(){
    if (computer.isTurn){
        console.log("Choosing tile...");
        let chosenTile = chooseMove();
        chosenTile.setValue(computer.value);
        endTurn();
        return;
    }
    else{
        console.log("CANCELLING TURN");
    }
}

function endTurn(){
    game.endTurn();
    computer.turnPending = false;
    console.log("Comp ended its turn!");
}

function chooseMove(){
    if (findWinngMoveFor(computer.value) != null){
        let winningMove = findWinngMoveFor(computer.value);
        console.log("Choosing WINNING move");
        return winningMove;
    }
    let playerValue = (computer.value == "x")? "o" : "x";
    if(findWinngMoveFor(playerValue) != null){
        let blockMove = findWinngMoveFor(playerValue);
        console.log("Blocking Player Win");
        return blockMove;
    }
    else{
        console.log("Choosing random move");
        let randomMove = findRandomTile();
        return randomMove;
    }
}

function findWinngMoveFor(value){
    for (let axis of game.axes){
        for (let line of axis){
            let tileValues = game.getValues(line);
            if (countInArray(tileValues, value) == 2 
            && tileValues.includes("empty")){
                var nextMove = line[tileValues.indexOf("empty")];
                return nextMove;
            }
        }
    }
    return null;
}

function findRandomTile(){
    let emptyTiles = game.tiles.filter(tile => tile.value == "empty");
    return emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
}

function countInArray(array, value){
    return array.filter(item => item == value).length;
}