import { FC } from "react";
import { useWeatherContext } from "../context/WeatherContext"; // Weather Context

const WeatherCard: FC = () => {
  const { weatherData } = useWeatherContext(); // Access weather data from context

  if (!weatherData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  // Log the data to verify it's available
  console.log("Weather data in WeatherCard: ", weatherData);

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




