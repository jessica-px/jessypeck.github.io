
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var seqLength = 12;
var sequence = [];
var noteLength = 600;
var major = false;

export var computer = {
    currentKey : musicKeys.C,
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
    playSequence(seqLength);
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
    piano.playNote(note, noteLength);
}



function getRandomNote(){
    var validNotes = computer.currentKey.majorNotes;
    if (!major){
        validNotes = computer.currentKey.minorNotes;
    }

    let randNum = Math.floor(Math.random()*validNotes.length);
    return validNotes[randNum];
}