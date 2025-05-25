export const fetchWeather = async (city: string) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0c4ee4ed9240ca285d2519d90dd4bd1e`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }
  
  const data = await response.json();

  // Log the data to check if it’s being fetched correctly
  console.log("Weather data fetched: ", data);
  return data;
};