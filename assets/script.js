var api_key = "7e4dc32eeeff2ca5b970045a0cb819aa";

var cityName;

//and array to store all search history data under one key, should make accessing data easier
var searchHistory = [];

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

    searchHistory.push(cityName);

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    fetch(currentWeatherUrl)
        .then((data) => data.json())
        .then(function (weather) {


            if (weather.cod === "404") {
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
                    storeSearch();

                    console.log(searchHistory);


                });
        });
        ;

}


function displayCurrentInfo() {
    var date = new Date();
    var weatherDisplay = document.getElementById("currentweather");
    console.log(date.toLocaleString('en-US'));
    weatherDisplay.innerHTML = 

    `<div class= "card-body">
    <h2 class="card-title text-light">${cityName} ${date.toLocaleString('en-US',{month: "numeric", day: "numeric", year: "numeric"})}</h2>
    <div class="card-text text-light">Temperature: ${currentTemp}&#176</div>
    <div class= "card-text text-light">Humidity: ${currentHumidity}%        
    <div class="card-text text-light">Wind-Speed: ${currentWind}</div>
    <div class="card-text text-light">UVI: ${currentUVI}</div></div>`

}


function displayForeCast(){
    var date = new Date();
    
    
    var fiveDay = document.getElementById("fiveday");
    
    fiveDay.innerHTML = "";//resets innerHTML
    
    
    for( i = 0; i < 5; i++){
        //argument-getDate() will return the numerical day of the month with functionality for end and start of month ( (1 - 1) will be last day of previous month instead of 0).
        date.setDate(date.getDate()+1);
        fiveDay.innerHTML += `<div class="card fCard" ><h6 class="card-title">${date.toLocaleString('en-US',{month: "numeric", day: "numeric", year: "numeric"})}</h6><div class="card-text">Temperature: ${forecastTemp[i]}</div><div class="card-text">Humidity: ${forecastHumidity[i]}</div></div>` 
    }   
    
}

function storeSearch(){
    localStorage.setItem('history', JSON.stringify(searchHistory));
}


//initializes button functionality
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchCity = document.getElementById("userInput").value;
    getWeather(searchCity);
    

})


