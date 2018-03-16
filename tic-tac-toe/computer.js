import {game} from './script.js';

export var computer = {
    value: "o",
    isTurn: false,
    toggleTurn: toggle,
}

function toggle(){
    this.isTurn = !this.isTurn;
    if (this.isTurn){
        game.setMessage("Computer's Turn");
        setTimeout(function(){compTurn()}, 600)
        console.log("Comp turn: BEGIN");
    }
}

function compTurn(){
    let chosenTile = chooseMove();
    chosenTile.setValue(computer.value);
    game.toggleTurns();
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
            let tileValues = getValues(line);
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
    var tile = null;
    while (!tile){
        let randTile = game.tiles[Math.floor(Math.random()*game.tiles.length)];
        if (randTile.value == "empty"){
            tile = randTile;
            return tile;
        }
    }
}

function getValues(tiles){
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