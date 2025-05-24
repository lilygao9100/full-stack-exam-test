"use client";

import { useState } from "react";
import { WeatherProvider } from "../context/WeatherContext"; // Weather Context
import WeatherCard from "../components/WeatherCard"; // WeatherCard Component
import { useWeather } from "../hooks/useWeather"; // useWeather hook

const HomePage = () => {
  const [city, setCity] = useState<string>("Melbourne");

  // Fetch weather data for the specified city
  useWeather(city);

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Weather App
          </h1>

          <div className="mb-6">
            <label htmlFor="city" className="block text-lg text-gray-700 mb-2">
              Enter a city:
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Type city name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <WeatherCard />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default HomePage;




