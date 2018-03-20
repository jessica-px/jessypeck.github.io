
import {getPlayerInput} from "./game.js";
export {piano};

var synth = new Tone.Synth().toMaster()
var noteDuration = "8n"; // an 8th note

var piano = {
    keys: [],
    init: function(){
        buildWhiteKeys();
        buildBlackKeys();
    },
    toggleFreeze : toggleFreeze,
    playNote : playNote
}

class PianoKey{
    constructor(noteName, div) {
        this.noteName = noteName;
        this.div = div;
        this.addListener();
    }

    addListener(){
        this.div.addEventListener("mousedown", this.startTone.bind(this));
        this.div.addEventListener("mouseup", this.endTone.bind(this));
        this.div.addEventListener("mouseout", this.mouseOut.bind(this));
    }

    startTone(){
        synth.triggerAttack(this.noteName);
        
    }

    playTone(){
        synth.triggerAttackRelease(this.noteName, noteDuration);
    }

    mouseOut(){
        synth.triggerRelease()
    }

    endTone(){
        synth.triggerRelease();   
        getPlayerInput(this.noteName);
    }

    keepDivPressedFor(duration){
        let div = this.div;
        div.classList.add("active");
        setTimeout(function timeoutHandler(){
            div.classList.remove("active");
        }, duration);
    }
}

function buildWhiteKeys(){
    var divs = document.getElementsByClassName("white-key");
    var notes = ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"];
    var colors = ["red", "green", "blue", "red", "green", "blue", "red", "green"];
    var highlightColor = [];
    for (let i = 0; i < divs.length; i++){
        let newKey = new PianoKey(notes[i], divs[i]);
        piano.keys.push(newKey);
    }
}

function buildBlackKeys(){
    var divs = document.getElementsByClassName("black-key");
    var notes = ["c#4", "d#4", "f#4", "g#4", "a#4"];
    for (let i = 0; i < divs.length; i++){
        let newKey = new PianoKey(notes[i], divs[i]);
        piano.keys.push(newKey);
    }
}

function playNote(note, duration){
    let key = getKey(note);
    key.playTone();
    key.keepDivPressedFor(duration-100);
}

function getKey(note){
    let thisKey = piano.keys.filter(key => key.noteName == note);
    return thisKey[0];
}

function toggleFreeze(){
    var freeze = document.getElementById("piano-freeze");
    freeze.classList.toggle("enabled");
}
