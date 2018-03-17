import {game} from './game.js';

export var player = {
    value: "x",
    isTurn: true,
    toggleTurn: function(){
        this.isTurn = !this.isTurn;
        game.setMessage("Your Turn");
    }
}
