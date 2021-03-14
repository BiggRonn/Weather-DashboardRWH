var api_key = "7e4dc32eeeff2ca5b970045a0cb819aa";

var cityName;

var pastDisplay = document.getElementById("pastsearch");

//variables to store current weather data returned from the oneCallUrl
var currentTemp;
var currentHumidity;
var currentWind;
var currentUVI;
//variables to store 5 day forcast weather





function getWeather(city) {

    cityName = city;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    fetch(currentWeatherUrl)
        .then((data) => data.json())
        .then(function (weather) {


            if (weather.code === 404) {
                alert("City not found");
                return;
            }

            var lat = weather.coord.lat;
            var lon = weather.coord.lon;

            const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;
            fetch(oneCallUrl)
                .then((data) => data.json())
                .then(function (oneCallData) {

                    currentTemp = oneCallData.current.temp
                    currentHumidity = oneCallData.current.humidity 
                    currentWind = oneCallData.current.wind_speed
                    currentUVI = oneCallData.current.uvi
                    displayCityInfo();

                });
        });
        ;

}

function displayCityInfo() {
    var weatherDisplay = document.getElementById("currentweather");
    
    weatherDisplay.innerHTML = 
    `<h2 class="text-light">${cityName} </h2>
    <div class="text-light">${currentTemp}&#176</div>
    <div class="text-light">Humidity: ${currentHumidity}        
    <div class="text-light">Wind-Speed: ${currentWind}</div>
    <div class="text-light">UVI: ${currentUVI}</div></div>`

}


//initializes button functionality
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchCity = document.getElementById("userInput").value;
    getWeather(searchCity);
    

})


