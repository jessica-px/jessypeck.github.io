
import {piano} from "./piano.js";
import {computer} from "./computer.js";

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    piano.init();
    computer.init();
}

