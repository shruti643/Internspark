const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const result = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  result.innerHTML = "Loading...";

  try {
    // Step 1: get coordinates from city name
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      result.innerHTML = "City not found.";
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Step 2: get current weather + 5-day forecast
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
    const weatherData = await weatherRes.json();
    const w = weatherData.current_weather;
    const daily = weatherData.daily;

    let forecastHTML = '<div class="forecast">';
    for (let i = 0; i < 5; i++) {
      const date = new Date(daily.time[i]);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      forecastHTML += `
        <div class="day">
          <p>${day}</p>
          <p>⬆️${Math.round(daily.temperature_2m_max[i])}°</p>
          <p>⬇️${Math.round(daily.temperature_2m_min[i])}°</p>
        </div>`;
    }
    forecastHTML += '</div>';

    result.innerHTML = `
      <h2>${name}</h2>
      <p>🌡️ ${w.temperature}°C</p>
      <p>💨 Wind: ${w.windspeed} km/h</p>
      ${forecastHTML}
    `;
  } catch (err) {
    result.innerHTML = "Error fetching data.";
  }
});