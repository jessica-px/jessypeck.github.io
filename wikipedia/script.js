searchWikipedia("monster");

function searchWikipedia(inputText){
    $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      format: "json",
      action: "opensearch",
      search: inputText,
      limit: "3",
      redirects: "resolve",
      origin: "*"
    },
    success: function(data){
      showSearchResults(data, inputText);
    },
    error: function(){
      console.log("error");
    }

  })

}

function showSearchResults(results, inputText){
  console.log("Showing results for " + inputText + "...");
  //console.log(results);
  parseResult(results);
}

function parseResult(results){
  for (x = 0; x < results[1].length; x++){
    console.log("Title: " + results[1][x]);
    console.log("Description: " + results[2][x]);
    console.log("Url: " + results[3][x]);
  }
}

