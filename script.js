let weatherCont = document.querySelector(".weather");
let input = document.querySelector("#location");

let weatherCards = JSON.parse(localStorage.getItem("weather")) || [];

// if (weatherCont.innerHTML === "") {
//   weatherCont.innerHTML = "No weather information";
//   weatherCont.classList.add("weather-cont");
// }

async function getWeatherInfo() {
  let location = input.value.toLowerCase().trim();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=BZ6CSSEG9CHGUDYRAK2BDDPCZ&contentType=json`,
      { mode: "cors" }
    );

    const weather = await response.json();
    console.log(weather);
    createWeatherCard(weather);
  } catch (Error) {
    console.log("Error Fetching data", Error);
  }
}

function createWeatherCard(weather) {
  // weatherCont.innerHTML = "";
  weatherCont.classList.remove("weather-cont");

  let div = document.createElement("div");
  div.classList.add("weather-card");

  let h3 = document.createElement("h3");
  h3.textContent = weather.timezone;

  let time = document.createElement("p");
  time.textContent = weather.currentConditions.datetime;

  let subDiv = document.createElement("div");
  subDiv.classList.add("location-time");
  subDiv.append(h3, time);

  let icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  //to get the correct icon
  icon.textContent = mapWeatherIcons(weather.currentConditions.icon);

  let temp = document.createElement("p");
  temp.textContent = `${weather.currentConditions.temp}°F`;

  let desc = document.createElement("p");
  desc.textContent = `Description: ${weather.description}`;

  div.append(subDiv, icon, temp, desc);
  weatherCont.append(div);
}
// the icon name from the api doesn't match the ones defined in material-symbols-outlined class. so we need to make an object and match them
//Left - API icons && Right - material-symbols-outlined icons
function mapWeatherIcons(apiIcons) {
  let iconMap = {
    "clear-day": "wb_sunny",
    "clear-night": "nights_stay",
    "partly-cloudy-day": "partly_cloudy_day",
    "partly-cloudy-night": "partly_cloudy_night",
    cloudy: "cloud",
    rain: "rainy",
    snow: "ac_unit",
    wind: "air",
    fog: "foggy",
    // Additional mappings for Google Icons
    thunderstorm: "thunderstorm",
    drizzle: "drizzle",
    haze: "haze",
    tornado: "tornado",
  };

  return iconMap[apiIcons] || "help";
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherInfo();
    input.value = "";
  }
});
