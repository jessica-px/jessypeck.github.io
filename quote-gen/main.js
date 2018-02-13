
var forismaticAPI = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

//
function getQuoteFromAPI(){
    $.ajax({
        type: 'GET',
        url: forismaticAPI,
        success: function(quoteJson){
            return quoteJson;
    
        },
        error: function(){
            altert("Error, problem finding quote.");
        }
    })
}


// On Click "New Quote" Button
$('.newBtn').on('click', function(){
    console.log("Click!");
    var newQuote = getQuoteFromAPI();
    showQuote(newQuote);   
});

function showQuote(quoteJson){
    var quoteText = quoteJson.quoteText;
    var quoteAuthor = quoteJson.quoteAuthor;
    console.log(quoteText + "..." + quoteAuthor);
}