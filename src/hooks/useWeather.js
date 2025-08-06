import { useState } from "react";

export default function useWeather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
  try {
    // 1. Obtener coordenadas de la ciudad
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      setError("Ciudad no encontrada");
      return;
    }

    const { latitude, longitude, country, name } = geoData.results[0];

    // 2. Obtener clima actual y pronóstico diario
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    // 3. Guardar datos
    setData({
      city: name,
      country,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      winddirection: weatherData.current_weather.winddirection,
      weathercode: weatherData.current_weather.weathercode,
      forecast: weatherData.daily // 👈 Guardamos pronóstico
    });
    setError(null);
  } catch (err) {
    setError("Error al obtener datos");
  }
};


  return { data, error, fetchWeather };
}
