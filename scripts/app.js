import { APIKEY } from "./environment.js";

// Ids Section
let nightModeToggle = document.getElementById("nightModeToggle");
let searchBar = document.getElementById("searchBar");
let searchIcon = document.getElementById("searchIcon");
let favoritesMenuBtn = document.getElementById("favoritesMenuBtn");

let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentTemperature = document.getElementById("currentTemperature");
let city = document.getElementById("city");
let date = document.getElementById("date");
let currentWeatherDescription = document.getElementById("currentWeatherDescription");
let currentMaxMinTemperature = document.getElementById("currentMaxMinTemperature");
let addFavoriteIcon = document.getElementById("addFavoriteIcon");

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

let apiSearchString = "";

let dayOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
const today = new Date();

console.log(today.toLocaleDateString());

function nightModePastSunset(data) {
    console.log(data.dt)
    console.log(data.sys.sunset);
    if(data.dt > data.sys.sunset) {
        document.body.style.backgroundImage = "url(../assets/images/nightbackgrond.jpg)";
    } else {
        document.body.style.backgroundImage = "url(../assets/images/weatherbackground.jpg)"
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

addFavoriteIcon.addEventListener("click", () => {
    console.log(addFavoriteIcon.src.includes("favoriteIcon.svg"));
    // addFavoriteIcon.
    if(addFavoriteIcon.src.includes("favoriteIcon.svg")) {
        addFavoriteIcon.src = "./assets/images/favoriteIconFilled.svg"
    } else {
        addFavoriteIcon.src = "./assets/images/favoriteIcon.svg";
    }
    console.log(`${city.innerText}`);
    // saveToLocalStorage(`${city.innerText}`)
});

searchBar.addEventListener("keydown", function(event) {
    if(event.key === 'Enter') {
        let tempString = "";
        let locationInput = searchBar.value.toLowerCase().trim();
        for(let i = 0; i < locationInput.length; i++) {
            if(locationInput.charAt(i) == " "){
                tempString += "+";
            } else if (locationInput.charAt(i) == ",") {
                apiSearchString += `${tempString},`
                tempString = "";
                i++;
            } else {
                tempString += locationInput.charAt(i);
            }
        }
        apiSearchString += tempString;
        console.log(apiSearchString);
    }
});

searchIcon.addEventListener("click", () => {
    let tempString = "";
    let locationInput = searchBar.value.toLowerCase().trim();
    for(let i = 0; i < locationInput.length; i++) {
        if(locationInput.charAt(i) == " "){
            tempString += "+";
        } else if (locationInput.charAt(i) == ",") {
            apiSearchString += `${tempString},`
            tempString = "";
            i++;
        } else {
            tempString += locationInput.charAt(i);
        }
    }
    apiSearchString += tempString;
    console.log(`This console log was done via the search icon: ${apiSearchString}`);
});

async function getWeatherData(apiSearchString) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiSearchString}&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${APIKEY}&units=imperial`)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${37.3387}&lon=${-121.8853}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log(data);
    
    nightModePastSunset(data);
    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    // console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    
    currentTemperature.innerText = `${Math.round(data.main.temp)}°`;
    console.log(data.main.temp);
    
    city.innerText = data.name;
    console.log(today.toLocaleDateString());
    date.innerText = today.toLocaleDateString();
    
    currentWeatherDescription.innerText = data.weather[0].description;
    console.log(data.weather[0].description);  

    currentMaxMinTemperature.innerText = `${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`;

    todayWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    todayMaxMinTemperature.innerText = `${data.main.temp_max}° / ${data.main.temp_min}°`;
}

async function getFiveDayForecast(apiSearchString) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${apiSearchString}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log("below is forcast data");
    console.log(data);

    // Today
    todayWeatherIcon.src = getForcastWeatherIcon(data, 0, 8);
    todayMaxMinTemperature.innerText = getMaxMinTemp(data, 0, 8);

    // Day 2
    day2.innerText = dayOfTheWeek[(today.getDay() + 1) % 7];
    day2WeatherIcon.src = getForcastWeatherIcon(data, 0, 8);
    day2MaxMinTemperature.innerText = getMaxMinTemp(data, 0, 8); 
    
    // Day 3
    day3.innerText = dayOfTheWeek[(today.getDay() + 2) % 7];
    day3WeatherIcon.src = getForcastWeatherIcon(data, 8, 16);
    day3MaxMinTemperature.innerText = getMaxMinTemp(data, 8, 16)
    
    // Day 4
    day4.innerText = dayOfTheWeek[(today.getDay() + 3) % 7];
    day4WeatherIcon.src = getForcastWeatherIcon(data, 16, 24);
    day4MaxMinTemperature.innerText = getMaxMinTemp(data, 16, 24)
    
    // Day 5
    day5.innerText = dayOfTheWeek[(today.getDay() + 4) % 7];
    day5WeatherIcon.src = getForcastWeatherIcon(data, 24, 32);
    day5MaxMinTemperature.innerText = getMaxMinTemp(data, 24, 32)

    // getMinTemp(`This is the 5 day forecast: ${data}`);
    // getMaxTemp(data);
    // currentMaxMinTemperature.innerText = `${data.main.temp_max}° / ${data.main.temp_min}°` 

}

testBtn.addEventListener("click", () => {
    getFiveDayForecast(apiSearchString);
    getWeatherData(apiSearchString);
});