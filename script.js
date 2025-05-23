let weatherCont = document.querySelector(".weather");
let input = document.querySelector("#location");

if (weatherCont.innerHTML === "") {
  weatherCont.innerHTML = "No weather information";
  weatherCont.classList.add("weather-cont");
}

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
  weatherCont.innerHTML = "";
  weatherCont.classList.remove("weather-cont");

  let div = document.createElement("div");
  // div.classList.add("weather-card");
  div.classList.add("weather");

  let h3 = document.createElement("h3");
  h3.textContent = weather.resolvedAddress;

  let time = document.createElement("p");
  time.textContent = weather.currentConditions.datetime;

  let subDiv = document.createElement("div");
  subDiv.classList.add("location-time");
  subDiv.append(h3, time);

  let icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  //to get the correct icon
  icon.textContent = mapWeatherIcons(weather.currentConditions.icon);

  let condition = document.createElement("p");
  condition.textContent = weather.currentConditions.conditions;

  let subDiv2 = document.createElement("div");
  subDiv2.append(icon, condition);
  subDiv2.classList.add("subDiv2");

  let temp = document.createElement("p");
  temp.textContent = `${weather.currentConditions.temp}°F`;

  let desc = document.createElement("p");
  desc.textContent = `${weather.description}`;

  let week = document.createElement("div");
  week.classList.add("week");
  let h2 = document.createElement("h2");
  h2.textContent = "This Week's Forecast";
  week.append(h2);

  for (let i = 0; i < 7; i++) {
    let dayi = document.createElement("div");
    dayi.classList.add("days");

    let iconn = document.createElement("span");
    iconn.classList.add("material-symbols-outlined");
    iconn.textContent = mapWeatherIcons(weather.days[i].icon);
    console.log(mapWeatherIcons(weather.days[i].icon));

    let datee = document.createElement("p");
    datee.textContent = weather.days[i].datetime;

    let conditionn = document.createElement("p");
    conditionn.textContent = weather.days[i].conditions;

    let tempp = document.createElement("p");
    tempp.textContent = weather.days[i].temp;

    dayi.append(iconn, datee, conditionn, tempp);
    week.append(dayi);
  }

  div.append(subDiv, subDiv2, desc, week);
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
