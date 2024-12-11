import { APIKEY } from "./environment.js";

// Ids Section
let searchBar = document.getElementById("searchBar");
let searchIcon = document.getElementById("searchIcon");
let favoritesBtn = document.getElementById("favoritesBtn");

let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentTemperature = document.getElementById("currentTemperature");
let city = document.getElementById("city");
let date = document.getElementById("date");
let currentWeatherDescription = document.getElementById("currentWeatherDescription");
let currentMaxMinTemperature = document.getElementById("currentMaxMinTemperature");
let favoriteIcon = document.getElementById("favoriteIcon");

let todayWeatherIcon = document.getElementById("todayWeatherIcon");
let todayMaxMinTemperature = document.getElementById("todayMaxMinTemperature");

let day2 = document.getElementById("day2");
let day2WeatherIcon = document.getElementById("day2WeatherIcon");
let day2MaxMinTemperature = document.getElementById("day2MaxMinTemperature");

let day3 = document.getElementById("day3");
let day3WeatherIcon = document.getElementById("day3WeatherIcon");
let day3MaxMinTemperature = document.getElementById("day3MaxMinTemperature");

let day4 = document.getElementById("day4");
let day4WeatherIcon = document.getElementById("day4WeatherIcon");
let day4MaxMinTemperature = document.getElementById("day4MaxMinTemperature");

let day5 = document.getElementById("day5");
let day5WeatherIcon = document.getElementById("day5WeatherIcon");
let day5MaxMinTemperature = document.getElementById("day5MaxMinTemperature");

let testBtn = document.getElementById("testBtn");

function getMaxTemp(data) {
    let maxTemp = -150;
    let maxIndex = 0;
    for(let i = 0; i < 8; i++) {
        if(data.list[i].temp_max > maxTemp) {
            maxTemp = data.list[i].temp_max;
            maxIndex = i;
        }
    }
    return maxIndex;
}

function getMinTemp(data) {
    let minTemp = 150;
    let minIndex = 0;
    for(let i = 0; i < 8; i++) {
        if(data.list[i].temp_min < minTemp) {
            minTemp = data.list[i].temp_min;
            minIndex = i;
        }
    }
    return minIndex;
}



async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockton,us&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${37.9577}&lon=${-121.2908}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log(data);

    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    // console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    
    currentTemperature.innerText = `${data.main.temp}°`;
    console.log(data.main.temp);
    
    city.innerText = data.name;
    console.log(data.name);

    currentWeatherDescription.innerText = data.weather[0].description;
    console.log(data.weather[0].description);


}

async function getFiveDayForecast() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${37.9577}&lon=${-121.290}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log("below is forcast data");
    console.log(data);
    
    // getMinTemp(`This is the 5 day forecast: ${data}`);
    // getMaxTemp(data);
    // currentMaxMinTemperature.innerText = `${data.main.temp_max}° / ${data.main.temp_min}°` 

}

testBtn.addEventListener("click", () => {
    getFiveDayForecast();
    getWeatherData();
});