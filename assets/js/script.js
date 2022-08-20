// Variable declarations

var searchInput = $("#citySearch");
var searchButton = $("#searchBtn");
var currentWeatherData = $(".weatherData");
var forecastCard = $(".weatherCard");
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

      // display weather icon for current weather
      var icon = data.data[0].weather.icon;
      var iconUrl =
        "https://www.weatherbit.io/static/img/icons/" + icon + ".png";

      $("#weatherIcon").attr("src", iconUrl);

      //   color code UV index based on value
      var uvValue = data.data[0].uv.toFixed(2);
      console.log(uvValue);
      if (uvValue < 3) {
        uvIndex
          .removeClass("modUv highUv veryHighUv extremeUv")
          .addClass("lowUv");
      } else if (uvValue >= 3 && uvValue < 6) {
        uvIndex
          .removeClass("lowUv highUv veryHighUv extremeUv")
          .addClass("modUv");
      } else if (uvValue >= 6 && uvValue < 8) {
        uvIndex
          .removeClass("lowUv modUv veryHighUv extremeUv")
          .addClass("highUv");
      } else if (uvValue >= 8 && uvValue < 11) {
        uvIndex
          .removeClass("lowUv modUv highUv extremeUv")
          .addClass("veryHighUv");
      } else if (uvValue >= 11) {
        uvIndex
          .removeClass("lowUv modUv highUv veryHighUv")
          .addClass("extremeUv");
      }
    });

  // Display which city the user searched

  displayCity.text("Current Weather: " + city);
}

function fiveDay(searchCity) {
  var apiKey = "f6f54b5d54014d398a42af9b0e078322";
  var city = searchCity;
  var weatherUrl =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    city +
    "&key=" +
    apiKey +
    "&units=I";
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Display icon on all cards

      for (j = 0; j <= 5; j++) {
        var cardIcon = data.data[j].weather.icon;
        var cardIconUrl =
          "https://www.weatherbit.io/static/img/icons/" + cardIcon + ".png";

        $(".cardIcon").eq(j).attr("src", cardIconUrl);
      }

      // Display Date on all cards
      for (j = 0; j <= 5; j++) {
        var cardDate = data.data[j].datetime;
        $(".cardDate").eq(j).text(cardDate);
      }

      // Display Temp on all cards
      for (j = 0; j <= 5; j++) {
        var cardTemp = data.data[j].high_temp;
        $(".cardTemp")
          .eq(j)
          .text("Temperature: " + cardTemp.toFixed(0));
      }

      // Display Wind on all cards
      for (j = 0; j <= 5; j++) {
        var cardWind = data.data[j].wind_spd;
        $(".cardWind")
          .eq(j)
          .text("Wind: " + cardWind);
      }

      // Display Humidity on all cards
      for (j = 0; j <= 5; j++) {
        var cardHum = data.data[j].rh;
        $(".cardHum")
          .eq(j)
          .text("Humidity: " + cardHum);
      }
    });
}

// searchWeather();

searchButton.on("click", () => {
  var searchCity = searchInput.val().trim();
  currentWeather(searchCity);
  fiveDay(searchCity);
  searchInput.val("");
});
