let now = new Date();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentDay = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let todaysDate = document.querySelector("h4");
todaysDate.innerHTML = `${days[currentDay]} ${currentHour}:${currentMinutes}`;

//function changeToCelsius() {
//  let currentTemperature = document.querySelector("h2");
//  currentTemperature.innerHTML = "21ºC";
//}
//
//let celsiusDegrees = document.querySelector("#celsius-symbol");
//celsiusDegrees.addEventListener("click", changeToCelsius);
//
//function changeToFahrenheit() {
//  let currentTemperature = document.querySelector("h2");
//  currentTemperature.innerHTML = "70ºF";
//}
//
//let fahrenheitDegrees = document.querySelector("#fahrenheit-symbol");
//fahrenheitDegrees.addEventListener("click", changeToFahrenheit);

function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-bar").value;
  searchCity(newCity);
}

function searchCity(newCity) {
  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityForecast);
}

function showCityForecast(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#display-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#display-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#display-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#display-humidity").innerHTML =
    response.data.main.humidity;
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityForecast);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", showCurrentLocation);