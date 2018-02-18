
var forismaticAPI = "https://api.forismatic.com/api/1.0/";
var outputText = document.getElementById("output");
var waitingOnQuote = false;
var maxQuoteLength = 100;
var canvasContext = document.getElementById("canvas").getContext("2d");
var currentImgData;
var currentImgPath;
var currentQuote;
var requestUrl = 'http://localhost/quote-gen/index.html/'




/// Buttons ////////////////////////////////////////////////////////////////////////////

// "New Quote" Button
$('.newBtn').on('click', function(){
    if (!waitingOnQuote){
        waitingOnQuote = true;
        toggleLoader();
        console.log("Click!");
        getQuoteFromAPI();
        getImageFromJSON();
    }
});

function toggleLoader(){
    var button = document.getElementById("newBtn");
    var buttonText = document.getElementById("btnText");
    var loader = document.getElementById("loader");
    
    if (waitingOnQuote){
        buttonText.style.display = "none";
        loader.style.display = "block";

        return;
    }
    buttonText.style.display = "block";
    loader.style.display = "none";
}

// Twitter Button
$('.twitterShare').click(function(event){
    event.preventDefault()
    
    //imageUid = getImageUIDFromUrl(currentImgPath);     <-- If I actually saved the images to a server,
    //u = requestUrl + 'share?iuid=' + imageUid;             I could use something like this to include an image link!

    var shareMessage = " - a cat quote from ";
    window.open('https://twitter.com/share?url=&amp;name=CatQuotes&amp;hashtags=cats,quotes&amp;text=\"' + currentQuote + "\"" + shareMessage + ' &amp;')

})

//function getImageUIDFromUrl(url){
//	split = url.split("/")
//	imageUID = split[split.length - 2] + "/" + split[split.length - 1]
//	return imageUID
//}


// "Save" Button
function downloadImage(linkElement){
    console.log("Downloading image...");
    linkElement.href = currentImgPath;
};


// Dropdown Button
$('#dropdown').click(function(event){
    var submenu = document.getElementById("sub-menu");
    if (submenu.style.visibility == ""){          // I don't know WHY, but if I don't set the visibility
        submenu.style.visibility = "visible";     // via jScript, then it won't work. Even though I DID declare it in the CSS.
        return;
    }

    if (submenu.style.visibility == "hidden"){
        submenu.style.visibility = "visible";
        return;
    }
    submenu.style.visibility = "hidden";
})


///////////////////////////////////////////////////////////////////


function showErrorImage(){
    waitingOnQuote = false;
    toggleLoader();
    img = new Image();
    img.src = "imgs/error.png";
    img.onload = function(){
        canvasContext.drawImage(img, canvas.width / 2 - img.width / 2, 
            canvas.height / 2 - img.height / 2, img.width, img.height);
    }
}



// QUOTE GETTING & FORMATTING    --------------------------------------------
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
            filterQuotes(data);   
        },
        error: function(){
            showErrorImage();
        }
    })
}


function filterQuotes(data){
    if (filterQuoteLength(data) || filterMoodRuiningQuotes(data) || filterWierdSymbols(data)){
        rejectQuote();
    }
    else{
        catifyQuote(data);
    }
}

function filterQuoteLength(data){
    var quoteText = data.quoteText;
     if(quoteText.length > maxQuoteLength){
        return true;
     }
     return false;
}

function filterMoodRuiningQuotes(data){
    if (data.quoteAuthor.indexOf("Trump") != -1){
        return true;
    }
    return false;
}

function filterWierdSymbols(data){
    if (data.quoteText.indexOf("€") != -1){
        return true;
    }
    return false;
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
    if (quoteAuthor == ""){
        quoteAuthor = "- Unknown"
        return quoteAuthor;
    }
    quoteAuthor = "- " + quoteAuthor + " (?)";
    return quoteAuthor;
}

function rejectQuote(){
    console.log("REJECTED A QUOTE");
    setTimeout(function(){
        getQuoteFromAPI();
    }, 10);
}

function showQuote(quoteText, quoteAuthor){
    waitingOnQuote = false;
    makeImage(currentImgData, quoteText, quoteAuthor);
    setTimeout(function(){
        document.getElementById("quoteImg").src = currentImgPath;
        toggleLoader();
    }, 500);
    
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
        },
        error: function(){
            showErrorImage();
        }
    })
}


function makeImage(imgData, quoteText, quoteAuthor){
    img = new Image();
    img.src = imgData.path;
    img.onload = function(){
        canvasContext.drawImage(img, canvas.width / 2 - img.width / 2, 
            canvas.height / 2 - img.height / 2, img.width, img.height);
        drawQuoteOnImage(imgData, quoteText, quoteAuthor);  
        currentImgPath = document.getElementById("canvas").toDataURL();
    }
}

function drawQuoteOnImage(imgData, quoteText, quoteAuthor){
    if (imgData.textColor == "light"){
        canvasContext.fillStyle = "white";
    }
    else{
        canvasContext.fillStyle = "black";
    }
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";


    canvasContext.font = "24px " + randomFont();
    

    if (imgData.align == "up-center"){
        canvasContext.textAlign = "center";
        canvasContext.font = "26px " + randomFont();
        drawTextByLines(quoteText, quoteAuthor, 300, 40, 28, 350);
    }
    else if (imgData.align == "up-right"){
        canvasContext.textAlign = "right";
        drawTextByLines(quoteText, quoteAuthor, 540, 40, 26, 250);
    }
    else if (imgData.align == "up-left"){
        canvasContext.textAlign = "left";
        drawTextByLines(quoteText, quoteAuthor, 40, 40, 26, 250);
    }

}
function randomFont(){
    var fonts = ["Arial", "Calibri", "Ubuntu", "Century Gothic",
                "Signika", "Courgette", "Courier", "Handlee"]
    var randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    return randomFont;
}
                                                                // An interesting conundrum! External fonts are only loaded when they're needed.
document.onload = fontLoader();                                 // But these functions move too fast to load fonts on the fly. Ideally all of this
function fontLoader(){                                          // would be done server-side, so the client doesn't have to download the fonts.
    var fontLoader = document.getElementById("fontLoader");     // But in the meantime, I needed a way to pre-load fonts.
    fontLoader.style.visibility = "hidden";                     // So the HTML contains some dummy text, and the CSS assigns it some Google fonts.
}                                                               // But as soon as the JS loads, that text is hidden.
                                                                // Effectively, this pre-loads the fonts so the image-making goes without a hitch.
                                                                // But it's a bit hacky! 

/// ---- TEXT WRAPPER ------------------------------------//////
///   Based on code from "Ash Blue" @ https://codepen.io/ashblue/pen/fGkma?editors=0010


function drawTextByLines(text, quoteAuthor, xPos, yPos, fontSize, maxWidth){
    lines = getTextLines(text, quoteAuthor, fontSize, maxWidth);
    for (var x = 0; x < lines.length; x++){
        var currentLine = lines[x];
        //On final line, print author name in slightly smaller font
        if (x == lines.length -1){
            //canvasContext.fillStyle = "grey";
            canvasContext.globalAlpha = 0.5;
            canvasContext.font = "16px Calibri";
            canvasContext.fillText(currentLine.text, xPos, yPos + currentLine.lineY +10);
            canvasContext.globalAlpha = 1;
            break;
        }
        // Otherwise print like normal
        canvasContext.fillText(currentLine.text, xPos, yPos + currentLine.lineY);

    }

}

function getTextLines(text, quoteAuthor, fontSize, maxWidth){
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

    // Anything left over is added to a final line
    if (line.length > 0 && line[0] != " "){
        currentLineY = lines.length * fontSize + fontSize;
        lines.push({ 
            text: line.trim(), 
            lineY: currentLineY 
        });
    }

    // The very last line is for the quote author
    currentLineY = lines.length * fontSize + fontSize;
    lines.push({ 
        text: quoteAuthor, 
        lineY: currentLineY 
    });


    return lines;
}

