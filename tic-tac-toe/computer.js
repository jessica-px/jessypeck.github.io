import {game} from './script.js';

export default {
    value: "o",
    isTurn: false,
    toggleTurn: toggle,
}

function toggle(){
    console.log("Toggling comp turn!");
    this.isTurn = !this.isTurn;
    if (this.isTurn){
        setTimeout(function(){compTurn()}, 300)
    }
}

function compTurn(){
    console.log("Comp took its turn!");
    game.toggleTurns();
}