import { useState } from "react";



export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none"
        }}
      />
      <button 
        type="submit" 
        style={{
          background: "#ff9800",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          color: "white",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Buscar
      </button>
    </form>
  );
}
