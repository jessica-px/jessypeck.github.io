
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var noteLength = 600;
var major = true;

export var computer = {
    currentKey : musicKeys.C,
    sequence : [],
    build : buildSequence,
    play : playSequence
}

function buildSequence(seqLength){
    computer.sequence = [];
    for (let i = 0; i < seqLength; i++){
        let randomNote = getRandomNote();
        computer.sequence.push(randomNote);
    }
    console.log(computer.sequence);
}

function playSequence(numOfNotes, delay = 0){
    setTimeout(function timeoutHandler(){ // optional delay
        piano.toggleFreeze();
        for (let i = 0; i < numOfNotes; i++){ // play each note up to given number
            setTimeout(function timeoutHandler(){ // delay between notes
                playNoteInSequence(i);
                if (i == numOfNotes-1){
                    finishSequence();
                }
            }, noteLength * i);
        }
    }, delay);
}

function playNoteInSequence(index){
    let note = computer.sequence[index];
    piano.playNote(note, noteLength);
}

function finishSequence(){
    piano.toggleFreeze();
}



function getRandomNote(){
    var validNotes = computer.currentKey.majorNotes;
    if (!major){
        validNotes = computer.currentKey.minorNotes;
    }

    let randNum = Math.floor(Math.random()*validNotes.length);
    return validNotes[randNum];
}