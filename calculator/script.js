var equation;
var newEqu = true;
var equDiv = document.getElementById("equation");
var historyDiv = document.getElementById("history");
var buttons = Array.from(document.getElementsByClassName("button"));

function addToEquation(symb){
    if (newEqu && !(symb == " × " || symb == " ÷ " || symb == " − " || symb == " ÷ " || symb == " + ")){
        equation = "";
    }
    equation += symb;
    equDiv.innerHTML = equation;
    newEqu = false;
}

function clearEquation(){
    historyDiv.innerHTML = "";
    equation = "0";
    equDiv.innerHTML = equation;
    newEqu = true;
}

function endEquation(){
    historyDiv.innerHTML = equation + " =";
    equation = getAnswer(); 
    equDiv.innerHTML = equation;
    //newEqu = true;
}

function addExponent(){
    equation += "^";
    equDiv.innerHTML = equation;
}

function getAnswer(){
    answer = equation.replace("×", "*")
        .replace("÷", "/")
        .replace("−", "-");
    return math.eval(answer);
}


document.addEventListener("DOMContentLoaded", function(event) {
    var clear = document.getElementById("clear");
    clear.addEventListener('click', function() { clearEquation(); }, false);

    var equal = document.getElementById("equal");
    equal.addEventListener('click', function() { endEquation(); }, false);

    var expo = document.getElementById("exponent");
    expo.addEventListener('click', function() { addExponent(); }, false);

    for (let button of buttons){
        if (!(button.id == "clear" || button.id == "equal" || button.id == "exponent")){
            button.addEventListener('click', function() { addToEquation(button.innerHTML); }, false);
        }
    }
});


