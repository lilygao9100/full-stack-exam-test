"use client";

import { useState, useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext"; // Weather Context
import { fetchWeather } from "../lib/fetchWeather"; // Import fetchWeather function

export const useWeather = (city: string) => {
  const { setWeatherData } = useWeatherContext(); // Access context to set weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!city) return; // Prevent fetch if no city is provided

    const getWeather = async () => {
      setLoading(true); // Start loading

      try {
        const data = await fetchWeather(city); // Fetch data using fetchWeather
        console.log("Setting weather data in context:", data); // Log fetched data
        setWeatherData(data); // Set the fetched data in context
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setWeatherData(null); // Set to null in case of error
        setError("Failed to fetch weather data. Please try again."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getWeather(); // Trigger fetch when city changes
  }, [city, setWeatherData]); // Only re-fetch when city changes

  return { loading, error }; // Return loading and error states
};



