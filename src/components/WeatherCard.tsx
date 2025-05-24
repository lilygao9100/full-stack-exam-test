import { FC } from "react";
import { useWeatherContext } from "../context/WeatherContext";

const WeatherCard: FC = () => {
  const { weatherData } = useWeatherContext();

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold">{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
    </div>
  );
};

export default WeatherCard;
