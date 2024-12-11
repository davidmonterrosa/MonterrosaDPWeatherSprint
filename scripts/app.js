import { APIKEY } from "./environment.js";

// Ids Section
let nightModeToggle = document.getElementById("nightModeToggle");
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

let dayOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
const today = new Date();

function nightModePastSunset(data) {
    console.log(data.dt)
    console.log(data.sys.sunset);
    if(data.dt > data.sys.sunset) {
        document.body.style.backgroundImage = "url(../assets/images/nightbackgrond.jpg)";
    }
}


function getMaxMinTemp(data, startIndex, endIndex) {
    let maxTemp = -150;
    let minTemp = 150;
    for(let i = startIndex; i < endIndex; i++) {
        if(data.list[i].main.temp_max > maxTemp) {
            maxTemp = Math.round(data.list[i].main.temp_max);
        }

        if(data.list[i].main.temp_min < minTemp) {
            minTemp = Math.round(data.list[i].main.temp_min);
        }
    }

    return `${maxTemp}° / ${minTemp}°`;
}

function getForcastWeatherIcon(data, startIndex, endIndex) {
    let topOfIconHierarchy = "00d";
    let iconArray = [];
    for(let i = startIndex; i < endIndex; i++) {
        if(data.list[i].weather[0].icon == "50d" || data.list[i].weather[0].icon == "50n") {
            iconArray.push("05d");
        } else {
            iconArray.push(data.list[i].weather[0].icon);
        }
    }
    console.log(iconArray.toString());
    for(let j = 0; j < iconArray.length; j++) {
        if(topOfIconHierarchy.localeCompare(iconArray[j]) == -1) {
            topOfIconHierarchy = iconArray[j];
        }
    }
    return `https://openweathermap.org/img/wn/${topOfIconHierarchy}@2x.png`
}


async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockton,us&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${37.9577}&lon=${-121.2908}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log(data.dt_txt);
    
    nightModePastSunset(data);
    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    // console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    
    currentTemperature.innerText = `${Math.round(data.main.temp)}°`;
    console.log(data.main.temp);
    
    city.innerText = data.name;
    let tmpDate = today.toLocaleString();
    console.log(tmpDate);
    date.innerText = tmpDate.slice(0, 10);
    
    currentWeatherDescription.innerText = data.weather[0].description;
    console.log(data.weather[0].description);
    
    
}

async function getFiveDayForecast() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${37.9577}&lon=${-121.290}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log("below is forcast data");
    console.log(data)

    // Today
    currentMaxMinTemperature.innerText = getMaxMinTemp(data, 0, 8);
    todayWeatherIcon.src = getForcastWeatherIcon(data, 0, 8);
    todayMaxMinTemperature.innerText = getMaxMinTemp(data, 0, 8);

    // Day 2
    day2.innerText = dayOfTheWeek[(today.getDay() + 1) % 7];
    day2WeatherIcon.src = getForcastWeatherIcon(data, 8, 16);
    day2MaxMinTemperature.innerText = getMaxMinTemp(data, 8, 16); 
    
    // Day 3
    day3.innerText = dayOfTheWeek[(today.getDay() + 2) % 7];
    day3WeatherIcon.src = getForcastWeatherIcon(data, 16, 24);
    day3MaxMinTemperature.innerText = getMaxMinTemp(data, 16, 24)
    
    // Day 4
    day4.innerText = dayOfTheWeek[(today.getDay() + 3) % 7];
    day4WeatherIcon.src = getForcastWeatherIcon(data, 24, 32);
    day4MaxMinTemperature.innerText = getMaxMinTemp(data, 24, 32)
    
    // Day 5
    day5.innerText = dayOfTheWeek[(today.getDay() + 4) % 7];
    day5WeatherIcon.src = getForcastWeatherIcon(data, 32, 40);
    day5MaxMinTemperature.innerText = getMaxMinTemp(data, 32, 40)

    // getMinTemp(`This is the 5 day forecast: ${data}`);
    // getMaxTemp(data);
    // currentMaxMinTemperature.innerText = `${data.main.temp_max}° / ${data.main.temp_min}°` 

}

testBtn.addEventListener("click", () => {
    getFiveDayForecast();
    getWeatherData();
});