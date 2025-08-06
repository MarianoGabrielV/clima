import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const { data, error, fetchWeather } = useWeather();
  const [favorites, setFavorites] = useState([]);

  // 📌 Cargar favoritos desde localStorage al inicio
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // 📌 Agregar ciudad a favoritos
  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // 📌 Eliminar ciudad de favoritos
  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  // 📌 Buscar ciudad desde favoritos
  const selectFavorite = (city) => {
    fetchWeather(city);
  };
  
  const getAppBg = () => {
    return "white-bg";
  };


  return (
    <div className={`container ${getAppBg()}`}>

      <h1>🌦️ Mi Clima en Tiempo Real</h1>
      <SearchBar onSearch={fetchWeather} />
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {data && (
        <WeatherCard 
          weather={data} 
          onFavorite={addFavorite}
          isFavorite={favorites.includes(data.city)}
        />
      )}

      {/* 📌 Lista de favoritos */}
      {favorites.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>⭐ Favoritos</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {favorites.map((city, idx) => (
                  <li 
                    key={idx} 
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#ffffff22",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginBottom: "5px"
                    }}
                  >
                    <span 
                      onClick={() => selectFavorite(city)}
                      style={{
                        cursor: "pointer", 
                        textDecoration: "underline",
                        flex: 1
                      }}
                    >
                      {city}
                    </span>
                    <button 
                      onClick={() => removeFavorite(city)}
                      style={{
                        background: "red",
                        border: "none",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                        padding: "2px 6px"
                      }}
                    >
                      ❌
                    </button>
                  </li>
      ))}
    </ul>

        </div>
      )}
    </div>
  );
}

export default App;
