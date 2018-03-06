var equation = "0";
var newEqu = true;
var lastSymbol;
var equDiv = document.getElementById("equation");
var historyDiv = document.getElementById("history");
var buttons = Array.from(document.getElementsByClassName("button"));

function addToEquation(symb){
    if (isOperation(symb) && lastSymbol == symb){
        return;
    }

    if (newEqu && !isOperation(symb)){
        equation = "";
    }

    equation += symb;
    lastSymbol = symb;
    equDiv.innerHTML = equation;
    newEqu = false;
}

function isOperation(symb){
    return symb == " × " || symb == " ÷ " || symb == " − " || symb == " ÷ " || symb == " + " || symb == ".";
}

function clearEquation(){
    historyDiv.innerHTML = "";
    equation = "0";
    lastSymbol = "";
    equDiv.innerHTML = equation;
    newEqu = true;
}

function endEquation(){
    historyDiv.innerHTML = equation + " =";
    equation = getAnswer(); 
    equDiv.innerHTML = equation;
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


