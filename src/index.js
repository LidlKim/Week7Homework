let now = new Date();
let time = document.querySelector("#date");
let hour = now.getHours();
let min = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
console.log(day);
let year = now.getFullYear();
console.log(year);
time.innerHTML = `${day} ${hour} : ${min}`;

// search function

function searchPlease(event) {
  event.preventDefault();
  let input = document.querySelector("#po").value;
  let tititle = document.querySelector("#tititle");
  tititle.innerHTML = input;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let tititle = document.querySelector("#search-form");
tititle.addEventListener("submit", searchPlease);


function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  let temp = Math.round(response.data.main.temp);

  let celly = document.querySelector("#temperature");
  celly.innerHTML = `${temp}`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML= response.data.weather[0].description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.current.wind_speed;

  let tititle = document.querySelector("#tititle");
  tititle.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}





function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature* 9/5) + 32 ;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  temperatureElement = Math.round(fahrenheitTemperature);


}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fan-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Current Location

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let current = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);
