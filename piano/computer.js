
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var seqLength = 5;
var sequence = [];

export var computer = {
    currentKey : musicKeys.d,
    init : init
}

function init(){
    buildSequence();
}


function buildSequence(){
    for (let i = 0; i < seqLength; i++){
        let randomNote = getRandomNote();
        sequence.push(randomNote);
    }
    console.log(sequence);
}

function getRandomNote(){
    let randNum = Math.floor(Math.random()*computer.currentKey.validNotes.length);
    return computer.currentKey.validNotes[randNum];
}