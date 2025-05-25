"use client";

import { useState } from "react";
import { WeatherProvider } from "../context/WeatherContext"; // Weather Context
import WeatherCard from "../components/WeatherCard"; // WeatherCard Component
import { useWeather } from "../hooks/useWeather"; // useWeather hook
import Header from "../components/Header"; // Import the Header Component

const HomePage = () => {
  const [city, setCity] = useState<string>("Melbourne");

  // Trigger weather data fetching when city changes
  useWeather(city);

  const handleCitySubmit = () => {
    // You can add additional validation here if needed
    if (city.trim() !== "") {
      // When the button is clicked, it triggers the weather fetching logic
      console.log(`Fetching weather data for ${city}`);
    }
  };

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        {/* Header Component */}
        <Header />
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
          <div className="mb-6">
            <label htmlFor="city" className="block text-lg text-gray-700 mb-2">
              Enter a city:
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)} // Update city name on input change
              placeholder="Type city name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCitySubmit} // Trigger city submission
            className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700"
          >
            Get Weather
          </button>

          {/* WeatherCard to show fetched data */}
          <WeatherCard />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default HomePage;






