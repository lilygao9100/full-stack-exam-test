// src/hooks/useWeather.ts
import { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../lib/fetchWeather";

export const useWeather = (city: string) => {
  const { setWeatherData } = useWeatherContext(); // Access context to set weather data

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city); // Fetch data using fetchWeather
        console.log("Setting weather data in context: ", data); // Log to verify data being passed
        setWeatherData(data); // Set the fetched data in context
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setWeatherData(null); // Set to null if an error occurs
      }
    };

    if (city) {
      getWeather(); // Fetch weather when city is set
    }
  }, [city, setWeatherData]); // Re-fetch when city changes
};


