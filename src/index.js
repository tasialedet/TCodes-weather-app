let now = new Date();
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
dateElement.innerHTML = `${day} ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;

  let apiKey = "87ce0353859a253c71daf94d0f9ad34b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showWeatherConditions(response) {
  console.log(response);
  let city = response.data.name;
  let descriptionElement = response.data.weather[0].description;
  let iconElement = response.data.weather[0].icon;
  let windElement = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let weatherDesribe = document.querySelector("#description");
  weatherDesribe.innerHTML = `${descriptionElement}`;

  let weatherIcon = document.querySelector("#icon-pic");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let windSpeed = document.querySelector("#weather-wind");
  windSpeed.innerHTML = `${windElement} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "87ce0353859a253c71daf94d0f9ad34b";
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrlLoc}&appid=${apiKey}`).then(showWeatherConditions);
}
function currentPosition(position) {
  showPosition(position);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheit(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let buttonCL = document.querySelector("#current-location");
buttonCL.addEventListener("click", getPosition);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class= "row">`;
  let days = ["Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class = "weather-forecast" id = "weather-forecast">
						<div class="col-2">
							<span class = "sunday"> Sun </span> 
              <div class = "weather-forecast-icon"> <img src = ""id = "forecast-pic"> </div>
              <span class ="forecast-temp-max"> 92° </span> | <span class = "forecast-temp-min"> 85°F</span></div>
				</div>
</div>`;
    
  });
forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
