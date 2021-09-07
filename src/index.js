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

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}:${minute}`;

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
  let city = response.data.name;
  celsiusTemperature = response.data.main.temp;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  let h3 = document.querySelector("h3");
  h3.innerHTML = Math.round(celsiusTemperature);
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
  let h3 = document.querySelector("h3");
  h3.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let h3 = document.querySelector("h3");
  h3.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let buttonCL = document.querySelector("#current-location");
buttonCL.addEventListener("click", getPosition);

let celsiusTemperature = document.querySelector(response.data.main.temp);
celsiusTemperature.addEventListener("click", displayCelsius);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
