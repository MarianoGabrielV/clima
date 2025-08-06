
import weatherCodes from "../hooks/useWeather";

export default function WeatherCard({ weather, onFavorite, isFavorite }) {
  const codeInfo = weatherCodes[weather.weathercode];


  const getBg = () => {
    if ([0, 1].includes(weather.weathercode)) return "linear-gradient(135deg, #fbc531, #f5d76e)"; // Soleado
        if ([2, 3, 45, 48].includes(weather.weathercode)) return "linear-gradient(135deg, #778ca3, #596275)"; // Nublado
            if ([51, 53, 55, 61, 63, 65].includes(weather.weathercode)) return "linear-gradient(135deg, #4a69bd, #1e3799)"; // Lluvia
                if ([71, 73, 75].includes(weather.weathercode)) return "linear-gradient(135deg, #dfe6e9, #b2bec3)"; // Nieve
                    if ([95, 96, 99].includes(weather.weathercode)) return "linear-gradient(135deg, #2f3640, #353b48)"; // Tormenta
    return "linear-gradient(135deg, #7f8c8d, #95a5a6)"; // Default
};


  return (
   <div style={{
      background: "white",
      color: "#333",
      padding: "15px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
      marginBottom: "15px"
    }}>

      <h2>{weather.city}, {weather.country}</h2>
      {codeInfo && (
  <>
    <p style={{ fontSize: "2rem" }}>{codeInfo.icon}</p>
    <p style={{ fontWeight: "600" }}>{codeInfo.desc}</p>
  </>
)}

      <p>🌡 <strong>{weather.temperature}°C</strong></p>
      <p>💨 {weather.windspeed} km/h</p>
      <p>🧭 {weather.winddirection}°</p>
      <button
        onClick={() => !isFavorite && onFavorite(weather.city)}
        disabled={isFavorite}
        style={{
            marginTop: "15px",
            background: isFavorite ? "#4caf50" : "#ff9800",
            color: "white",
            padding: "10px 15px",
            fontSize: "1rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "25px",
            cursor: isFavorite ? "default" : "pointer",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease"
        }}
        >
        {isFavorite ? "✅ En favoritos" : "⭐ Agregar a favoritos"}
</button>

{/* Pronóstico extendido */}
{weather.forecast && (
  <div style={{ marginTop: "20px" }}>
    <h3 style={{ textAlign: "center" }}>📅 Pronóstico extendido</h3>
    <div 
      style={{ 
        display: "flex", 
        gap: "10px", 
        overflowX: "auto", 
        padding: "10px",
        scrollbarWidth: "thin"
      }}
    >
      {weather.forecast.time.map((date, index) => (
        <div 
          key={date} 
          style={{
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            minWidth: "90px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            flexShrink: 0
          }}
        >
          <strong>{new Date(date).toLocaleDateString("es-ES", { weekday: "short" })}</strong>
          <p style={{ margin: "5px 0" }}>
            {weather.forecast.temperature_2m_min[index]}° / {weather.forecast.temperature_2m_max[index]}°
          </p>
          <span style={{ fontSize: "1.5rem" }}>
            {weatherCodes[weather.forecast.weathercode[index]]?.icon}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
    );
    
  
  
}


