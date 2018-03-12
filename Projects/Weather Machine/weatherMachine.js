$(function() {
  var unit = "imperial";
  var unitLabel = "F";
  var lat;
  var lon;
  
  function getLocation() {
    $.ajax({
      url:"https://geoip.nekudo.com/api/",
      dataType:"json",
      async:false,
      success:function(n) {
        lat = n.location.latitude;
        lon = n.location.longitude;
      }
    });
  }
  function getWeather() {
    getLocation();
    if (unit === "imperial") {
      unitLabel = "F";
    } else {
      unitLabel = "C";
    }
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unit + "&APPID=59f49b1f9aaedbf843af51e6bc98f45e", function(n) {
      $("#loc").text("Location: " + n.name + "," + n.sys.country);
      $("#temp").text("Temp: " + Math.round(n.main.temp) + " " + unitLabel);
      $("#icon").attr("src", "https://openweathermap.org/img/w/" + n.weather[0].icon + ".png");
      $("#icon").attr("alt", n.weather[0].description);
      $("#weather").text("Weather: " + n.weather[0].main);
    });
  }
  
  $("#change-unit").on("click", function() {
    if (unit === "imperial") {
      unit = "metric";
      getWeather();
    } else {
      unit = "imperial";
      getWeather();
    }
  });
  
  getWeather();
});