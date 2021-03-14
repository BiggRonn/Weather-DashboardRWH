var api_key = "7e4dc32eeeff2ca5b970045a0cb819aa";

var cityName;

var pastDisplay = document.getElementById("pastsearch");

//variables to store current weather data returned from the oneCallUrl
var currentTemp;
var currentIcon;
var currentHumidity;
var currentWind;
var currentUVI;

//variables to store 5 day forcast weather. They will be objects that are assigned attributes by the getWeather function
var forecastTemp = [];
var forecastHumidity = [];
var forecastIcon;






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

                    //sets our global variables to data from API
                    currentTemp = oneCallData.current.temp
                    currentHumidity = oneCallData.current.humidity 
                    currentWind = oneCallData.current.wind_speed
                    currentUVI = oneCallData.current.uvi
                    displayCurrentInfo();

                    //stores data for our forecast display... each index in the array is a day
                    for(i=0; i< 5 ;i++){
                        forecastTemp.push(oneCallData.daily[i].temp.day)
                        forecastHumidity.push(oneCallData.daily[i].humidity)
                        
                    }
                    displayForeCast();

                    console.log(oneCallData.daily[0].temp);


                });
        });
        ;

}

function displayCurrentInfo() {
    var weatherDisplay = document.getElementById("currentweather");
    
    weatherDisplay.innerHTML = 

    `<div class= "card-body">
    <h2 class="card-title text-light">${cityName}</h2>
    <div class="card-text text-light">Temperature: ${currentTemp}&#176</div>
    <div class= "card-text text-light">Humidity: ${currentHumidity}%        
    <div class="card-text text-light">Wind-Speed: ${currentWind}</div>
    <div class="card-text text-light">UVI: ${currentUVI}</div></div>`

}

function displayForeCast(){
    var fiveDay = document.getElementById("fiveday");
    
    fiveDay.innerHTML = "";//resets innerHTML

    for( i = 0; i < 5; i++){
        fiveDay.innerHTML += `<div class="card fCard" ><h6 class="card-title">Temperature: ${forecastTemp[i]}</h6><div class="card-text">Humidity: ${forecastHumidity[i]}</div>` 
    }   
    
}


//initializes button functionality
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchCity = document.getElementById("userInput").value;
    getWeather(searchCity);
    

})


