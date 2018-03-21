
export {getPlayerInput};
import {computer} from "./computer.js";

var active = false;
var seqLength = 20;
var turnNum = 0;
var playerInput = [];

export var game = {
    begin : begin
}


function begin(){
    turnNum = 0;
    computer.build(seqLength);
    newTurn();
}

function newTurn(){
    turnNum += 1;
    playerInput = [];
    if (turnNum > seqLength){
        console.log("You win!");
    }
    else{
        computer.play(turnNum, 600);
    }
}

function replayTurn(){
    playerInput = [];
    computer.play(turnNum, 600);
}

function getPlayerInput(note){
    playerInput.push(note);
    for (let i = 0; i < playerInput.length; i++){
        if (playerInput[i] != computer.sequence[i]){
            playerFail();
            return;
        }
        if (i == turnNum-1){
            playerSuccess();
        }
    }
}

function playerFail(){
    console.log("Incorrect Input");
    replayTurn();
}

function playerSuccess(){
    console.log("Success!");
    newTurn();
}