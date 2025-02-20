import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "1c147929d001b3a3017af7e568585f28";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found! Please enter a valid city.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Weather App</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {weather && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="text-lg">🌡️ {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <p className="capitalize">⛅ {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
