let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let mins = now.getMinutes();

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${mins}`;

function getCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city.value}`;
  let units = `metric`;
  let apiKey = `68bf029e8355926f228cd5965fe12dec`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
}

let city = document.querySelector("#city-form");
city.addEventListener("submit", getCity);

function showDetails(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${temp}`;
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchLocation(position) {
  let apiKey = `68bf029e8355926f228cd5965fe12dec`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(
  "#current-geolocation-button"
);
currentLocationButton.addEventListener("click", getCurrentLocation);
