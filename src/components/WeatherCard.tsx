import { FC } from "react";
import { useWeatherContext } from "../context/WeatherContext"; // Weather Context
import { useWeather } from "../hooks/useWeather"; // useWeather hook

const WeatherCard: FC = () => {
  const { weatherData } = useWeatherContext(); // Access the weather data from context
  const { loading, error } = useWeather("Melbourne"); // Fetch weather for Melbourne and get loading and error state

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>; // Show loading text
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error text if there was an issue
  }

  if (!weatherData) {
    return <div className="text-center text-gray-500">No weather data available.</div>; // If no weather data
  }

  console.log("Weather data in WeatherCard: ", weatherData); // Log to verify data

  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg text-gray-700">{weatherData.weather[0].description}</p>
        <p className="text-4xl font-bold text-blue-600">
          {Math.round(weatherData.main.temp - 273.15)}°C
        </p>
      </div>
      <div className="flex justify-between text-gray-600">
        <div>
          <p className="text-sm">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-sm">Pressure: {weatherData.main.pressure} hPa</p>
        </div>
        <div>
          <p className="text-sm">Wind: {weatherData.wind.speed} m/s</p>
          <p className="text-sm">Clouds: {weatherData.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;





