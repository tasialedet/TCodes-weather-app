// date and time
let now = new Date();
const time = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${time}`;

// search

function searchCity(city) {
  let apiKey = "87ce0353859a253c71daf94d0f9ad34b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Houston");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let precipMeasure = Math.round(response.data.daily[0].rain);
  precipElement = document.querySelector("#weather-precip");
  precipElement.innerHTML = `${precipMeasure} %`;

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
							<div class = "forecast-date"> ${formatDay(forecastDay.dt)} </div> 
              <div class = "weather-forecast-icon"><img src = "http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" id = "forecast-pic"></div>
              <span class ="forecast-temp-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>|<span class = "forecast-temp-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
`;
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "87ce0353859a253c71daf94d0f9ad34b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherConditions(response) {
  let city = response.data.name;
  let descriptionElement = response.data.weather[0].description;
  let windElement = Math.round(response.data.wind.speed);
  let resultTemperature = response.data.main.temp;
  let humidityMeasure = response.data.main.humidity;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(resultTemperature);

  let weatherDesribe = document.querySelector("#description");
  weatherDesribe.innerHTML = `${descriptionElement}`;

  let weatherIcon = document.querySelector("#icon-pic");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let windSpeed = document.querySelector("#weather-wind");
  windSpeed.innerHTML = `${windElement} mph`;

  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = `${humidityMeasure}%`;

  getForecast(response.data.coord);
}
// current location

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "87ce0353859a253c71daf94d0f9ad34b";
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`;
  axios.get(`${apiUrlLoc}&appid=${apiKey}`).then(showWeatherConditions);
}
function currentPosition(position) {
  showPosition(position);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
resultTemperature = null;

let buttonCL = document.querySelector("#current-location");
buttonCL.addEventListener("click", getPosition);
