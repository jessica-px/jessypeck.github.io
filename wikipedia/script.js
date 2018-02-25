
var results = [];
var entries = [];



$(document).ready(function(){
    var resultsGrid = document.getElementById('resultsGrid');

    // On "submit" serach
    var searchWrapper = $("#searchWrapper");
    searchWrapper.on('submit', function () {
        console.log("Submitted");
        var input = document.getElementById('searchBar').value;
        if (input.length > 0){
            searchWikipedia(input);
        }
    });

});


function searchWikipedia(inputText){
    $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      format: "json",
      action: "opensearch",
      search: inputText,
      limit: "12",
      redirects: "resolve",
      origin: "*"
    },
    success: function(data){
      //showSearchResults(data, inputText);
      results = data;
      showResults();
    },
    error: function(){
      console.log("error");
    }
  })
}

function showResults(){
    clearPrevious();
    getEntries();
    showEntries();

}

function clearPrevious(){
    resultsGrid.innerHTML = "";
    entries = [];
}

function getEntries(){
    for(x = 0; x < results[1].length; x++){
        var newEntry = {
            title: results[1][x],
            description: results[2][x],
            url: results[3][x]
        }
        entries.push(newEntry);
    }
}

function showEntries(){
    for(x = 0; x < entries.length; x++){
        console.log(entries[x].title);
    
        var newGridCell = '<div class = "resultCell"><a href = "' + entries[x].url + '" target = "_blank"><div class = "resultTitle">' + entries[x].title + '</div><div class="resultDescription">' + entries[x].description + '</a></div>';
        resultsGrid.innerHTML += newGridCell;
    }

}




/////

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

