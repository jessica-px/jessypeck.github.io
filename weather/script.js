
var openWeatherKey = "9321f995cadcc4b029f7c6d532c4fe19";
var googleKey = "AIzaSyAUGZldvo3Cte1HPCc5qNZYtIgcvCImk94";

var currentWeatherData;
var currentCityDesc = "";
var currentWeatherDesc = "";
var currentLocalTime = "";
var currentTemp = "";
var celsiusActive = false;
var currentIcon = "";

  
//Display "London" as default
//getWeatherByCity("London");
getFromGeoLocation();



/////////////////       Geolocation           ////////////////

if ("geolocation" in navigator) {
} else {
  console.log("Geolocation not currently available.");
}

function getFromGeoLocation(){
  navigator.geolocation.getCurrentPosition(function(position) {
    getWeatherByCoords(position.coords.latitude, position.coords.longitude);
  });
  
}



/////////////////       Display Text           ////////////////

function collectInfo(weatherData){
  currentWeatherData = weatherData;
  getGoogleTimeZone(); // calls showCityInfo further down its chain
  getDescription();
  getTemp();
  getIcon();
}

function getDescription(){
  var description = currentWeatherData.weather[0].description;
  currentWeatherDesc = titlecase(description);
}

function getCityInfo(){
  currentCityDesc = currentWeatherData.name + ", " + currentWeatherData.sys.country + " " + currentLocalTime;
  showChanges();
}

function getTemp(){
  var temp = Math.round(currentWeatherData.main.temp);
  if (celsiusActive == true){
    var celsiusTemp = Math.round((temp - 32)*5/9);
    currentTemp = celsiusTemp + "&deg";
    return;
  }
  currentTemp = temp + "&deg";
}

function showChanges(){
  isDayOrNight(currentWeatherData);
  var cityText = document.getElementById("cityInfo");
  cityText.innerHTML = currentCityDesc;
  var weatherText = document.getElementById("weatherDescription");
  weatherText.innerHTML = currentWeatherDesc;
  var tempText = document.getElementById("tempInfo");
  tempText.innerHTML = currentTemp;

  var iconText = document.getElementById("iconText");
  iconText.classList = "";
  iconText.classList.add("fas");
  iconText.classList.add(currentIcon);
  iconText.classList.add("fa-9x");
  renderPage();
}

function renderPage(){
  if (document.body.style.display != "grid"){
    console.log("Showing body");
    document.body.style.display = "grid";
    var bg = document.documentElement.style.getPropertyValue("--lightblue");
    document.body.style.backgroundColor = bg;
  }
}


function titlecase(input){
  var capitalizedInput = [""];
  var words = input.split(" ").map(function(word){
    capitalizedInput.push(word[0].toUpperCase() + word.substring(1));
  })
  return capitalizedInput.join(" ");
}


/////////////////       Weather Info           ////////////////

function getWeatherByCity(inputCity){
    $.ajax({
      dataType: "json",
      url: "//api.openweathermap.org/data/2.5/weather",
      data: {
        q: inputCity,
        units: "imperial",
        appid: openWeatherKey
      },
        success: function(data){
          collectInfo(data);
      },
        error: function(){
          console.log("Error getting weather data for city " + inputCity);
      }
    });
  
}

function getWeatherByCoords(inputLat, inputLon){
  $.ajax({
      dataType: "json",
      url: "//api.openweathermap.org/data/2.5/weather",
      data: {
        lat: inputLat,
        lon: inputLon,
        units: "imperial",
        appid: openWeatherKey
      },
      success: function(data){
          collectInfo(data);
      },
      error: function(){
          console.log("Error getting weather data for coords " + inputLat +", " + inputLon);
      }
    });
  
}
  
function getIcon(){
  var condition = currentWeatherData.weather[0].main;
  console.log("Getting icon for weather " + condition);
  switch (condition){
    case "Thunderstorm":
      currentIcon = 'fa-bolt';
      console.log("thunderstorm");
      break;
    case "Drizzle":
      currentIcon = 'fa-tint';
      console.log("drizzle");
      break;
    case "Rain":
      currentIcon = 'fa-tint';
      console.log("rain");
      break;
    case "Snow":
      currentIcon = 'fa-snowflake';
      console.log("snow");
      break;
    case "Atmosphere":
      currentIcon = 'fa-cloud';
      console.log("atmosphere");
      break;
    case "Clear":
      currentIcon = 'fa-sun';
      console.log("Clear");
      break;
    case "Clouds":
      currentIcon = 'fa-cloud';
      console.log("clouds");
      break;
    case "Extreme":
      currentIcon = 'fa-exclamation-circle';
      console.log("extreme");
      break;

  }

}



  
  //////////////            Time Info           /////////////////////
  
  
  function getGoogleTimeZone(){
    var lat = currentWeatherData.coord.lat;
    var lng = currentWeatherData.coord.lon;
    var time = Date.now() / 1000;
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/timezone/json",
      data:{
        location: lat + "," + lng,
        timestamp: time,
        key: googleKey
      },
      success: function(data){
        var localTime = time + data.dstOffset + data.rawOffset;
        getTime(localTime);
      },
      error: function(){
        console.log("Error getting timezone data for city " + data);
      }
      
    });
}
  
  function getTime(localTime){
      var date = new Date(localTime*1000);
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();

      if (minutes < 10){minutes = "0" + minutes;}
      var ampm = "am";
      if (hours > 12){
              hours -= 12;
              ampm = "pm";
          }
      var formattedTime = hours + ":" + minutes + ampm;
      currentLocalTime = formattedTime;
      getCityInfo();
  }

  function isDayOrNight(){
    var time = new Date() / 1000;
    var sunrise = currentWeatherData.sys.sunrise;
    var sunset = currentWeatherData.sys.sunset;
    if (time >= sunrise && time < sunset ){
      showDayColors();
      return;
    }
    showNightColors();
    
  }

  /////////////////          Color Scheme                 ///////////////////////

  function showNightColors(){
    document.documentElement.style.setProperty("--lightblue", "#121C2B");
    document.documentElement.style.setProperty("--darkblue", "#4A7799");
  }

  function showDayColors(){
    document.documentElement.style.setProperty("--lightblue", "#4A7799");
    document.documentElement.style.setProperty("--darkblue", "#121C2B");
  }


$(document).ready(function(){

  
  /////////////////           UI / Button Stuff                //////////////////////

  // On "submit" city serach
  var searchWrapper = $("#searchWrapper");
  searchWrapper.on('submit', function () {
    var input = document.getElementById('searchBar').value;
    if (input.length > 0){
        getWeatherByCity(input);
    }
    return false;
  });

  document.getElementById("searchBtn").onclick = function(){ //search toggle button
    toggleHide("#goButton");
    toggleHide("#searchBar");
    toggleSearchButton();
  };

  document.getElementById("degreesBtn").onclick = function(){ //degrees button
    toggleDegreeButton();
  };

  document.getElementById("locateBtn").onclick = function(){ //geolocation button
    getFromGeoLocation();
  };

  function toggleHide(target){
    $(target).toggleClass("unhide hide");
  }

  function toggleSearchButton(){
    $(searchBtn).toggleClass("buttonDown");
    $("#searchBar").focus();
  }

  function toggleDegreeButton(){
    celsiusActive = !celsiusActive;
    getTemp();
    showChanges();
    if (celsiusActive){
      document.getElementById("degreesBtn").innerHTML = "<strong>&deg;F</strong>";
      return;
    }
    document.getElementById("degreesBtn").innerHTML = "<Strong>&deg;C</strong>";
  }
});


  
    
    
  