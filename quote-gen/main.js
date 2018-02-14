
var forismaticAPI = "https://api.forismatic.com/api/1.0/";
var outputText = document.getElementById("output");
var waitingOnQuote = false;
var canvasContext = document.getElementById("canvas").getContext("2d");
var currentImgData;
var currentQuote;

// QUOTE GETTING --------------------------------------------
function getQuoteFromAPI(){
    $.ajax({
        jsonp: "jsonp",
        url: forismaticAPI,
        contentType: "application/jsonp",
        format:"jsonp",
        dataType: "jsonp",
        cache: false,
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
          },
        success: function(data){
            filterQuoteLength(data);   
        },
        error: function(){
            alert("Error, problem finding quote.");
        }
    })
}


$('.newBtn').on('click', function(){ // On Click "New Quote" Button
    if (!waitingOnQuote){
        waitingOnQuote = true;
        toggleLoader();
        console.log("Click!");
        getQuoteFromAPI();
        getImageFromJSON();
    }
});


function filterQuoteLength(data){
    var quoteText = data.quoteText;
     if(quoteText.length > 100){
        rejectQuote();
        return;
     }
     else{
        catifyQuote(data)
     }
}

function catifyQuote(data){
    var quoteText = data.quoteText;
    var quoteAuthor = stylizeAuthorName(data);

    // lowercase
    var catQuote = quoteText.replace( 
        (/\bperson\b|\bman\b|\bwoman\b|\bhuman\b/g), "cat").replace(
        (/\bpeople\b|\bmen\b|\bwomen\b|\bhumans\b|\bwe\b/g), "cats").replace(
        (/\byourself\b/g), "themselves").replace(
        (/\byour\b/g), "your cats").replace(
        (/\byou\b/g), "your cats").replace(
        (/\bus\b/g), "them").replace(
        (/\bourselves\b/g), "themselves").replace(
        (/\bchild\b/g), "kitten").replace(
        (/\bchildren\b/g), "kittens").replace(
        (/\bothers\b/g), "other cats").replace(
        (/\bour\b/g), "our cats").replace(
        (/\banyone\b/g), "any cat").replace(
        (/\beveryone\b/g), "every cat").replace(
        (/\bno\sone\b/g), "no cat");
    // uppercase
    var catQuote = catQuote.replace( 
        (/\bPerson\b|\bMan\b|\bWoman\b|\bHuman\b/g), "Cat").replace(
        (/\bPeople\b|\bMen\b|\bWomen\b|\bHumans\b|\bWe\b/g), "Cats").replace(
        (/\bYourself\b/g), "Themselves").replace(
        (/\bYour\b/g), "Your cats").replace(
        (/\bYou\b/g), "Your cats").replace(
        (/\bUs\b/g), "Them").replace(
        (/\bOurselves\b/g), "Themselves").replace(
        (/\bChild\b/g), "Kitten").replace(
        (/\bChildren\b/g), "Kittens").replace(
        (/\bOthers\b/g), "Other cats").replace(
        (/\bOur\b/g), "Our cats").replace(
        (/\bAnyone\b/g), "Any cat").replace(
        (/\bEveryone\b/g), "Every cat").replace(
        (/\bNo\sone\b/g), "No cat");

    if (catQuote.indexOf("cat") == -1 && catQuote.indexOf("kitten") == -1
        && catQuote.indexOf("Cat") == -1 && catQuote.indexOf("Kitten") == -1){
        rejectQuote();
        return;
    }
    currentQuote = catQuote;
    showQuote(catQuote, quoteAuthor);
}


function stylizeAuthorName(data){
    var quoteAuthor = data.quoteAuthor
    quoteAuthor += " (?)";
    if (quoteAuthor == ""){
        quoteAuthor = "Unknown"
    }
    return quoteAuthor;
}

function rejectQuote(){
    console.log("REJECTED A QUOTE");
    setTimeout(function(){
        getQuoteFromAPI();
    }, 100);
}

function showQuote(quoteText, quoteAuthor){
    waitingOnQuote = false;
    toggleLoader();
    //outputText.innerHTML = quoteText + " - " + quoteAuthor;
    showImage(currentImgData, quoteText);
}

function toggleLoader(){
    if (waitingOnQuote){
        document.getElementById("loader").style.display = "block";
        return;
    }
    document.getElementById("loader").style.display = "none";
}

// IMAGE ---------------------------------------------------

function getImageFromJSON(){
    $.ajax({
        json: "json",
        url: "backgrounds.json",
        format:"json",
        dataType: "json",
        cache: false,
        data: {
            method: "GET"
          },
        success: function(data){
            currentImgData = data[Math.floor(Math.random() * data.length)];
            //showImage(randomImgData);   
        },
        error: function(){
            alert("Error, problem finding image.");
        }
    })
}


function showImage(imgData){
    img = new Image();
    img.src = imgData.path;
    img.onload = function(){
        canvasContext.drawImage(img, 0, 0, img.width, img.height);
        drawQuoteOnImage(imgData, "HELLO");
    }
}

function drawQuoteOnImage(imgData){
    if (imgData.textColor == "light"){
        canvasContext.fillStyle = "white";
    }
    else{
        canvasContext.fillStyle = "black";
    }
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.font = "20px Arial";
    drawTextByLines(currentQuote, 300, 80, 20, 250);

    if (imgData.align == "up-center"){

    }

}

/// ---- TEXT WRAPPER ------------------------------------//////
///   Based on code from "Ash Blue" @ https://codepen.io/ashblue/pen/fGkma?editors=0010


function drawTextByLines(text, xPos, yPos, fontSize, maxWidth){
    lines = getTextLines(text, fontSize, maxWidth);
    for (var x = 0; x < lines.length; x++){
        var currentLine = lines[x];
        console.log("Writing line: " + currentLine.text);
        canvasContext.fillText(currentLine.text, xPos, yPos + currentLine.lineY);
    }
}

function getTextLines(text, fontSize, maxWidth){
    var words = text.split(" "),
        lines = [], // 2D array. [0] = text, [1] = lineY
        line = "",
        lineTest = "",
        currentLineY = 0;

    // Test length of the current line plus each word
    for(var x = 0; x < words.length; x++){
        var thisWord = words[x];
        lineTest = line + thisWord + " ";
        // If line is greater than max width, end current line &
        // add this word to a new line
        var lineWidth = canvasContext.measureText(lineTest).width;
        if (lineWidth > maxWidth){
            currentLineY = lines.length * fontSize + fontSize;   
            lines.push(
                {
                    text: line,
                    lineY: currentLineY
                });
            line = thisWord + " ";
        }
        // Else, this word
        // is added to current line
        else{
            line = lineTest;
        }
    }

    // Anything left over is added to final line
    if (line.length > 0 && line[0] != " "){
        currentLineY = lines.length * fontSize + fontSize;
        lines.push({ 
            text: line.trim(), 
            lineY: currentLineY 
        });
    }

    return lines;
}

