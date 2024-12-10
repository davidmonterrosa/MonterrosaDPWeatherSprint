import { APIKEY } from "./environment.js";


async function getWeatherData() {
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${37.9577}&lon=${-121.2908}&appid=${APIKEY}`);
    const data = await response.json();
    console.log(data);
}

async function getFiveDayForecast() {
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${37.9577}&lon=${-121.290}&appid=${APIKEY}`);
    const data = await response.json();
    console.log(data);
}
getFiveDayForecast();
getWeatherData();