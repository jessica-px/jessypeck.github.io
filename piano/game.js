
export {getPlayerInput};
import {computer} from "./computer.js";

var gameFinished = false;
var seqLength = 1;
var turnNum = 0;
var playerInput = [];
var synth = new Tone.Synth().toMaster();

export var game = {
    begin : begin,
    strict: false,
    turnDiv: null,
    messageDiv : null
}


function begin(){
    gameFinished = false;
    game.messageDiv.innerHTML = "";
    turnNum = 0;
    computer.build(seqLength);
    newTurn();
}

function newTurn(){
    turnNum += 1;
    game.turnDiv.innerHTML = turnNum;
    computer.noteLength = 600 - (turnNum * 10); //speeds up computer each turn
    playerInput = [];
    if (turnNum > seqLength){
        turnNum = seqLength;
        game.turnDiv.innerHTML = turnNum;
        win();
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
    if (!gameFinished){
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

}

function playerFail(){
    if (game.strict){
        console.log("Incorrect Input - GAME OVER");
        lose();
    }
    else{
        console.log("Incorrect Input - try again");
        replayTurn();
    }
}

function playerSuccess(){
    newTurn();
}

function win(){
    gameFinished = true;
    game.messageDiv.innerHTML = "You win! Press <i class='fas fa-redo-alt fa-xs'></i> to play again.";
    playTune([["c5", "c5", "c5"], ["a4", "b4"], "c5"]);
}

function lose(){
    gameFinished = true;
    game.messageDiv.innerHTML = "You lost. Press <i class='fas fa-redo-alt fa-xs'></i> to try again.";
    playTune([["a3", "a3", "a3"], ["g3", "d3"], "c#3"]);
}

function playTune(notes){
    Tone.Transport.stop();
    var thisTune = new Tone.Sequence(function(time,note){
        synth.triggerAttackRelease(note, "16n", time);
    }, notes).start(0);
    thisTune.loop = false;
    Tone.Transport.bpm.value = 150;
    Tone.Transport.start("+0.1");
}