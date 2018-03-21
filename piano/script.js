
import {piano} from "./piano.js";
import {computer} from "./computer.js";
import {game} from "./game.js";
import {keys as musicKeys, keyList} from "./musicKeys.js";

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    bindDomElements();
    piano.init();
}

var domElements, dom = {
    musicKey : document.getElementById("key-letter"),
    musicKeyLeft : document.getElementById("left-arrow"),
    musicKeyRight : document.getElementById("right-arrow"),
    startBtn : document.getElementById("start-btn"),
    majorBtn : document.getElementById("major"),
    minorBtn : document.getElementById("minor")
}

function bindDomElements(){
    dom.musicKeyLeft.addEventListener("click", function clickHandler(){
        cycleMusicKeys(-1);});
    dom.musicKeyRight.addEventListener("click", function clickHandler(){
        cycleMusicKeys(1);});
    dom.startBtn.addEventListener("click", function clickHandler(){
        clickStartRestart();});
    dom.majorBtn.addEventListener("click", function clickHandler(){
        toggleMajorMinor();});
    dom.minorBtn.addEventListener("click", function clickHandler(){
        toggleMajorMinor();});
}

function toggleMajorMinor(){
    computer.major = !computer.major;
    dom.majorBtn.classList.toggle("toggle-active");
    dom.minorBtn.classList.toggle("toggle-active");

}

function cycleMusicKeys(direction){
    let currIndex = keyList.indexOf(computer.currentKey.name);
    let newIndex = currIndex + direction;
    if (newIndex < 0){
        newIndex += keyList.length;
    }
    if (newIndex == keyList.length){
        newIndex = 0;
    }
    let newKey = keyList[newIndex];
    dom.musicKey.innerHTML = newKey;
    computer.currentKey = musicKeys[newKey];
    console.log("Changing key to: " + newKey);
}

function clickStartRestart(){
    game.begin();
    dom.startBtn.innerHTML = "Restart";
}