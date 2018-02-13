
var forismaticAPI = "https://api.forismatic.com/api/1.0/";
var outputText = document.getElementById("output");
var waitingOnQuote = false;

//
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


// On Click "New Quote" Button
$('.newBtn').on('click', function(){
    if (!waitingOnQuote){
        waitingOnQuote = true;
        console.log("Click!");
        getQuoteFromAPI();
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

    var catQuote = quoteText.replace( 
        (/\bperson\b|\bman\b|\bwoman\b|\bhuman\b/gi), "cat").replace(
        (/\bpeople\b|\bmen\b|\bwomen\b|\bhumans\b|\bwe\b/gi), "cats").replace(
        (/\byourself\b/gi), "themselves").replace(
        (/\byour\b/gi), "your cats").replace(
        (/\byou\b/gi), "your cats").replace(
        (/\bourselves\b/gi), "themselves").replace(
        (/\bchild\b/gi), "kitten").replace(
        (/\bchildren\b/gi), "kittens").replace(
        (/\bothers\b/gi), "other cats").replace(
        (/\bour\b/gi), "our cats").replace(
        (/\banyone\b/gi), "any cat").replace(
        (/\beveryone\b/gi), "every cat").replace(
        (/\bno\sone\b/gi), "no cat");

    if (catQuote.indexOf("cat") == -1){
        rejectQuote();
        return;
    }

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
    console.log(quoteText + "..." + quoteAuthor);
    outputText.innerHTML = quoteText + " - " + quoteAuthor;
}