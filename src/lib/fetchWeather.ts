export const fetchWeather = async (city: string) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65cfb66da1df74e61041882ec01ea8ea`);
  const data = await response.json();
  return data;
};
