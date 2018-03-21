
import {piano} from "./piano.js";
import {keys as musicKeys} from "./musicKeys.js";

var noteLength = 600;
var timers = [];

export var computer = {
    sequence : [],
    currentKey : musicKeys.C,
    build : buildSequence,
    play : playSequence,
    major : true
}

function buildSequence(seqLength){
    computer.sequence = [];
    computer.sequence.push(computer.currentKey.baseNote);
    for (let i = 1; i < seqLength; i++){
        let randomNote = getRandomNote();
        computer.sequence.push(randomNote);
    }
    console.log(computer.sequence);
}

function playSequence(numOfNotes, delay = 0){
    piano.toggleFreeze(true);
    timers.map(clearTimeout);
    setTimeout(function timeoutHandler(){ // optional delay
        for (let i = 0; i < numOfNotes; i++){ // play each note up to given number
            let newTimer = setTimeout(function timeoutHandler(){ // delay between notes
                playNoteInSequence(i);
                if (i == numOfNotes-1){
                    finishSequence();
                }
            }, noteLength * i);
            timers.push(newTimer);
        }
    }, delay);
}

function playNoteInSequence(index){
    let note = computer.sequence[index];
    piano.playNote(note, noteLength);
}

function finishSequence(){
    console.log("Finished");
    setTimeout(function timeoutHandler(){ 
        piano.toggleFreeze(false);
    }, noteLength );
}

function getRandomNote(){
    var validNotes = computer.currentKey.majorNotes;
    if (!computer.major){
        validNotes = computer.currentKey.minorNotes;
    }

    let randNum = Math.floor(Math.random()*validNotes.length);
    return validNotes[randNum];
}