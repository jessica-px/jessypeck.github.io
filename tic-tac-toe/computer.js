import {game} from './script.js';

export default {
    value: "o",
    isTurn: false,
    toggleTurn: toggle,
}

function toggle(){
    this.isTurn = !this.isTurn;
    if (this.isTurn){
        game.setMessage("Computer's Turn");
        setTimeout(function(){compTurn()}, 600)
    }
}

function compTurn(){
    console.log("Comp took its turn!");

    game.toggleTurns();
}