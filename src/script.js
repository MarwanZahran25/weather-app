const apiKey = "69a77ece90e4469aa0e120700241804";

async function getWeather(city) {
  try {
    const request = `http://api.weatherapi.com/v1/current.json?key=69a77ece90e4469aa0e120700241804&q=${city}&aqi=no
`;
    const res = await fetch(request, { mode: "cors" });
    const info = await res.json();
    return {
      current_c: info.current.temp_c,
      current_f: info.current.temp_f,
      city: info.location.name,
      country: info.location.country,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
