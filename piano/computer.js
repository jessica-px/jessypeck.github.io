
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var timers = [];

export var computer = {
    sequence : [],
    currentKey : musicKeys.C,
    build : buildSequence,
    play : playSequence,
    noteLength : 600,
    major : true
}

function buildSequence(seqLength){
    computer.sequence = [];
    computer.sequence.push(computer.currentKey.baseNote);
    for (let i = 1; i < seqLength; i++){
        let randomNote = getRandomNote();
        computer.sequence.push(randomNote);
    }
}

function playSequence(numOfNotes, delay = 0){
    piano.toggleFreeze(true);
    timers.map(clearTimeout);
    setTimeout(function timeoutHandler(){ // optional delay
        for (let i = 0; i < numOfNotes; i++){ // play each note up to given number
            let newTimer = setTimeout(function timeoutHandler(){ 
                playNoteInSequence(i);
                if (i == numOfNotes-1){
                    finishSequence();
                }
            }, computer.noteLength * i); // delay between notes
            timers.push(newTimer);
        }
    }, delay);
}

function playNoteInSequence(index){
    let note = computer.sequence[index];
    piano.playNote(note, computer.noteLength);
}

function finishSequence(){
    setTimeout(function timeoutHandler(){ 
        piano.toggleFreeze(false);
    }, 600);
}

function getRandomNote(){
    var validNotes = computer.currentKey.majorNotes;
    if (!computer.major){
        validNotes = computer.currentKey.minorNotes;
    }

    let randNum = Math.floor(Math.random()*validNotes.length);
    return validNotes[randNum];
}