const container = document.getElementById("container");
const cityFeild = document.getElementById("city-field");
let unit = "C";
let city = "cairo";
const cards = container.childNodes;

const converter = document.getElementById("converter");

async function getWeather(city) {
  try {
    const request = `https://api.weatherapi.com/v1/forecast.json?key=69a77ece90e4469aa0e120700241804&q=${city}&days=3&aqi=no&alerts=no
`;
    const res = await fetch(request, { mode: "cors" });
    const info = await res.json();
    info.forecast.forecastday.forEach((day) => {
      delete day.hour;
      delete day.astro;
    });

    const a = {
      forecast: info.forecast.forecastday,
      city: `${info.location.name} , ${info.location.country}`,
    };
    console.log(a);

    return a;
  } catch (error) {
    return null;
  }
}

function makeWeatherCard(temp, date) {
  const card = document.createElement("div");
  const dateFeild = document.createElement("div");
  const tempFeild = document.createElement("div");
  card.className =
    "flex h-72 w-60 flex-col items-center justify-center gap-3 rounded-xl bg-white font-serif font-bold shadow-xl";
  dateFeild.className = "font-serif text-3xl";
  tempFeild.className = "text-4xl";
  dateFeild.textContent = date;
  tempFeild.textContent = temp;
  card.appendChild(dateFeild);
  card.appendChild(tempFeild);
  return card;
}
async function makeForecast(city) {
  let temp;
  const data = await getWeather(city);

  data.forecast.forEach((day) => {
    if (unit === "C") {
      temp = `${day.day.avgtemp_c} °C`;
    } else {
      temp = `${day.day.avgtemp_f} °F`;
    }

    container.appendChild(makeWeatherCard(temp, day.date));
    cityFeild.textContent = data.city;
  });
}
makeForecast("cairo");
function removeAllCards() {
  const allCards = container.childNodes;
  const cardsToRemove = [...allCards];

  cardsToRemove.forEach((card) => {
    container.removeChild(card);
  });
}
document.querySelector("form").addEventListener("submit", (e) => {
  try {
    e.preventDefault();
    removeAllCards();
    city = document.querySelector("input").value;
    makeForecast(city);
  } catch (error) {
    return null;
  }
});
converter.addEventListener("click", (e) => {
  e.preventDefault();
  removeAllCards();
  if (unit === "C") {
    unit = "F ";
    converter.textContent = "Celcius";
  } else {
    unit = "C";
    converter.textContent = "Fehranahite";
  }
  makeForecast(city);
});
