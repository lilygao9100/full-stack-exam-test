"use client";

import { useState } from "react";
import { WeatherProvider } from "../context/WeatherContext"; // Make sure WeatherProvider is imported
import WeatherCard from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";

const HomePage = () => {
  const [city, setCity] = useState<string>("Melbourne");

  // Custom hook to fetch weather data for the specified city
  useWeather(city);

  return (
    <WeatherProvider>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Weather App</h1>
        <div className="my-4">
          <input
            className="border p-2"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <WeatherCard />
      </div>
    </WeatherProvider>
  );
};

export default HomePage;



