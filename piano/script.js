
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
    game.init();
}

var domElements, dom = {
    musicKey : document.getElementById("key-letter"),
    musicKeyLeft : document.getElementById("left-arrow"),
    musicKeyRight : document.getElementById("right-arrow")
}

function bindDomElements(){
    dom.musicKeyLeft.addEventListener("click", function clickHandler(){
        cycleMusicKeys(-1);});
    dom.musicKeyRight.addEventListener("click", function clickHandler(){
        cycleMusicKeys(1);});
        console.log(dom.musicKeyLeft);
    }

function cycleMusicKeys(direction){
    console.log("Current key: " + computer.currentKey.name);
    let currIndex = keyList.indexOf(computer.currentKey.name);
    console.log("Current index: " + currIndex);
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
    console.log("Chaning key to: " + newKey);
}