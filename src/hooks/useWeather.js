import { useState } from "react";

export default function useWeather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      // 1️⃣ Buscar latitud y longitud
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Ciudad no encontrada");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2️⃣ Obtener clima actual
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      // 3️⃣ Guardar datos en state
      setData({
        city: name,
        country,
        ...weatherData.current_weather,
      });
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return { data, error, fetchWeather };
}
