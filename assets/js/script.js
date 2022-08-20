// Variable declarations

var searchInput = $("#citySearch");
var searchButton = $("#searchBtn");
var currentWeatherData = $(".weatherData");
var forecastData = $(".cardData");
var displayCity = $("#city");
var uvIndex = $("#uvIndex");

function currentWeather(searchCity) {
  var apiKey = "f6f54b5d54014d398a42af9b0e078322";
  var city = searchCity;
  var currentWeatherUrl =
    "https://api.weatherbit.io/v2.0/current?city=" +
    city +
    "&key=" +
    apiKey +
    "&units=I";
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentArray = [
        `Temperature: ${data.data[0].temp.toFixed(0)}`,
        `Wind: ${data.data[0].wind_spd}mph`,
        `Humidity: ${data.data[0].rh.toFixed(0)}%`,
        `UV Index: ${data.data[0].uv.toFixed(2)}`,
      ];
      console.log(currentArray);
      for (i = 0; i < currentArray.length; i++) {
        currentWeatherData.eq(i).text(currentArray[i]);
      }
      //   color code UV index
      var uvValue = data.data[0].uv.toFixed(2);
      console.log(uvValue);
      if (uvValue < 3) {
        uvIndex.addClass("lowUv");
      } else if (uvValue >= 3 && uvValue < 6) {
        uvIndex.addClass("modUv");
      } else if (uvValue >= 6 && uvValue < 8) {
        uvIndex.addClass("highUv");
      } else if (uvValue >= 8 && uvValue < 11) {
        uvIndex.addClass("veryHighUv");
      } else if (uvValue >= 11) {
        uvIndex.addClass("extremeUv");
      }
    });

  displayCity.append(" " + city);
}

function fiveDay(searchCity) {
  var apiKey = "af731df2485a550480409e3645b1aaf0";
  var city = searchCity;
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// searchWeather();

searchButton.on("click", () => {
  var searchCity = searchInput.val().trim();
  currentWeather(searchCity);
  fiveDay(searchCity);
});
