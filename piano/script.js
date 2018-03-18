
var synth = new Tone.Synth().toMaster()
var noteDuration = "8n"; // an 8th note

var whiteKeys = [];

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    buildPianoKeys();
}

var domElements = {
    whiteKey1: document.getElementById("whiteKey1"),
    whiteKey2: document.getElementById("whiteKey2"),
    whiteKey3: document.getElementById("whiteKey3"),
    whiteKey4: document.getElementById("whiteKey4"),
    whiteKey5: document.getElementById("whiteKey5"),
    whiteKey6: document.getElementById("whiteKey6"),
    whiteKey7: document.getElementById("whiteKey7"),

}

function buildPianoKeys(){
    var divs = document.getElementsByClassName("piano-key");
    var notes = ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"];
    for (let i = 0; i < divs.length; i++){
        let newKey = new PianoKey(notes[i], divs[i]);
        whiteKeys.push(newKey);
    }
    console.log(whiteKeys);
}


class PianoKey{
    constructor(noteName, div) {
        this.noteName = noteName;
        this.div = div;
        this.addListener();
    }

    addListener(){
        this.div.addEventListener("mousedown", this.playTone.bind(this));
        this.div.addEventListener("mouseup", this.endTone.bind(this));
        this.div.addEventListener("mouseout", this.endTone.bind(this));
    }

    playTone(){
        synth.triggerAttack(this.noteName);
    }

    endTone(){
        synth.triggerRelease();
    }

}

