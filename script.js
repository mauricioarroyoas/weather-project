const CITIES = [
  {
    id: 1,
    name: "Beni",
    latitude: -14.2737294,
    longitude: -65.4333995,
  },
  {
    id: 2,
    name: "Cochabamba",
    latitude: -17.3936114,
    longitude: -66.1568983,
  },
  {
    id: 3,
    name: "El Alto",
    latitude: -16.5048228,
    longitude: -68.1624337,
  },
  {
    id: 4,
    name: "La Paz",
    latitude: -16.4955455,
    longitude: -68.1336229,
  },
  {
    id: 5,
    name: "Oruro",
    latitude: -17.9698363,
    longitude: -67.1148341,
  },
  {
    id: 6,
    name: "Pando",
    latitude: -11.0267,
    longitude: -68.7692,
  },
  {
    id: 7,
    name: "Potosi",
    latitude: -19.5890895,
    longitude: -65.7537867,
  },
  {
    id: 8,
    name: "Santa Cruz",
    latitude: -17.7834936,
    longitude: -63.1820853,
  },
  {
    id: 9,
    name: "Sucre",
    latitude: -19.0333,
    longitude: -65.2627,
  },
  {
    id: 10,
    name: "Tarija",
    latitude: -21.5338794,
    longitude: -64.7343559,
  },
];
const UNITS = "metric";
const API_KEY = "101577224ac8d22081f12ebb7a0e3d7a";
const LANGUAGE = "es";
const selectEl = document.getElementsByClassName("select")[0];
let weatherData = null;

async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${API_KEY}&lang=${LANGUAGE}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function renderWeather() {
  const cardBodyDataEl = document.getElementsByClassName("card__body__data")[0];
  cardBodyDataEl.classList.add("card__body__data-shown");

  const weatheIconEl = document.getElementsByClassName("icon")[0];
  weatheIconEl.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const temperatureEl = document.getElementsByClassName("temperature-text")[0];
  temperatureEl.textContent = parseInt(weatherData.main.temp) + "°C";

  const cityNameEl = document.getElementsByClassName("city-name")[0];
  cityNameEl.textContent = weatherData.name;

  const dateEl = document.getElementsByClassName("date")[0];
  dateEl.textContent = new Date(weatherData.dt * 1000).toLocaleDateString(
    "es-ES",
    {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const weatherDescriptionEl = document.getElementsByClassName(
    "weather-description"
  )[0];
  weatherDescriptionEl.textContent = weatherData.weather[0].description;

  const humidityEl = document.getElementsByClassName("humidity")[0];
  humidityEl.textContent = `Humedad: ${weatherData.main.humidity}%`;

  const windEl = document.getElementsByClassName("wind")[0];
  windEl.textContent = `Viento: a ${parseInt(weatherData.wind.speed)} km/h`;
}

(function pupulateSelectElement() {
  CITIES.forEach((city) => {
    const optionEl = document.createElement("option");
    optionEl.classList.add("option");
    optionEl.value = city.id;
    optionEl.textContent = city.name;
    selectEl.appendChild(optionEl);
  });
})();

selectEl.addEventListener("change", async function (event) {
  const cardBodyDataEl = document.getElementsByClassName("card__body__data")[0];
  cardBodyDataEl.classList.remove("card__body__data-shown");
  const cardSpinnerEl = document.getElementsByClassName(
    "card__body__spinner"
  )[0];
  cardSpinnerEl.classList.add("card__body__spinner-shown");
  const selectedId = parseInt(event.target.value);
  const selectedCity = CITIES.find((city) => city.id === selectedId);
  await new Promise(res => setTimeout(res, 800));
  weatherData = await getWeather(selectedCity.latitude, selectedCity.longitude);
  renderWeather();
  cardSpinnerEl.classList.remove("card__body__spinner-shown");
});
