
var forismaticAPI = "https://api.forismatic.com/api/1.0/";
var outputText = document.getElementById("output");

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
            console.log(data);
            showQuote(data);   
        },
        error: function(){
            altert("Error, problem finding quote.");
            return "";
        }
    })
}


// On Click "New Quote" Button
$('.newBtn').on('click', function(){
    console.log("Click!");
    getQuoteFromAPI();
    
});

function showQuote(data){
    var quoteText = data.quoteText;
    var quoteAuthor = data.quoteAuthor;
    console.log(quoteText + "..." + quoteAuthor);
    outputText.innerHTML = quoteText + " - " + quoteAuthor;
}