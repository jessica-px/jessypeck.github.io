
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var seqLength = 6;
var sequence = [];
var noteLength = 600;

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
    playSequence(seqLength)
}

function playSequence(numOfNotes){
    for (let i = 0; i < numOfNotes; i++){
        setTimeout(function timeoutHandler(){
            playNoteInSequence(i);
        }, noteLength * i);

    }
}

function playNoteInSequence(index){
    let note = sequence[index];
    let key = piano.getKey(note);
    key.playTone();
    key.keepDivPressedFor(noteLength-100);
}



function getRandomNote(){
    let randNum = Math.floor(Math.random()*computer.currentKey.validNotes.length);
    return computer.currentKey.validNotes[randNum];
}