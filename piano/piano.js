
export {piano};

var synth = new Tone.Synth().toMaster()
var noteDuration = "8n"; // an 8th note

var piano = {
    keys: [],
    init: function(){
        buildWhiteKeys();
        buildBlackKeys();
    },
    getKey : getKey

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
        this.div.addEventListener("mouseout", this.endTone.bind(this));
    }

    startTone(){
        synth.triggerAttack(this.noteName);
    }

    playTone(){
        synth.triggerAttackRelease(this.noteName, noteDuration);
    }

    endTone(){
        synth.triggerRelease();
    }
}

function buildWhiteKeys(){
    var divs = document.getElementsByClassName("white-key");
    var notes = ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"];
    for (let i = 0; i < divs.length; i++){
        let newKey = new PianoKey(notes[i], divs[i]);
        piano.keys.push(newKey);
    }
}

function buildBlackKeys(){
    var divs = document.getElementsByClassName("black-key");
    var notes = ["c#4", "d#4", "f#4", "g#4", "Bb4"];
    for (let i = 0; i < divs.length; i++){
        let newKey = new PianoKey(notes[i], divs[i]);
        piano.keys.push(newKey);
    }
}

function getKey(note){
    let thisKey = piano.keys.filter(key => key.noteName == note);
    return thisKey[0];
}
