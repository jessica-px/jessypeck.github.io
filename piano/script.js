
import {piano} from "./piano.js";
import {computer} from "./computer.js";
import {game} from "./game.js";

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

function init() {
    console.log("INIT");
    piano.init();
    game.init();
}

