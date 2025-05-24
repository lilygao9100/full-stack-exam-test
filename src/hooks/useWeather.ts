import { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../lib/fetchWeather";

export const useWeather = (city: string) => {
  const { setWeatherData } = useWeatherContext();

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(city);
      setWeatherData(data);
    };

    getWeather();
  }, [city, setWeatherData]);
};
