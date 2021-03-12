var api_key = "7e4dc32eeeff2ca5b970045a0cb819aa";

var cityName;
var currentTemperature;
var currentHumidity;
var currentWind;
var currentUVI;




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

                    currentTemperature = oneCallData.current.temp
                    currentHumidity = oneCallData.current.humidity 
                    currentWind = oneCallData.current.wind_speed
                    currentUVI = oneCallData.current.uvi

                    console.log(oneCallData.current.temp);
                });
        });

}

function displayCityInfo() {
    var displayCurrent = document.getElementById("displayCity");

    displayCurrent.innerHTML = `${cityName}: ${currentTemperature}&#176`

    console.log(currentTemperature);


}


//initializes button functionality
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchCity = document.getElementById("userInput").value;
    getWeather(searchCity);
    displayCityInfo();

})

