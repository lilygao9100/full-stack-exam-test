import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherProvider } from '../context/WeatherContext';

// Mock weather data
const mockWeatherData = {
  name: 'Melbourne',
  sys: { country: 'AU' },
  weather: [{ description: 'clear sky' }],
  main: { temp: 296.76, humidity: 75, pressure: 1015 },
  wind: { speed: 1.5 },
  clouds: { all: 0 },
};

describe('WeatherCard', () => {
  it('should render the weather data correctly', () => {
    // Mock the context by providing the data to the WeatherProvider
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    // Set the weather data in the context (this could be done more efficiently in your code)
    screen.getByText(/loading/i); // Make sure it's loading initially
    screen.getByText(/clear sky/i); // Check if weather description is rendered
    screen.getByText(/Melbourne/i); // Check if the city name is rendered
    screen.getByText(/humidity/i); // Check if humidity is displayed
    screen.getByText(/wind/i); // Check if wind speed is displayed
  });

  it('should display loading state when data is not available', () => {
    // Mock empty weather data
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );
    screen.getByText(/loading/i); // Ensure that "Loading..." is displayed
  });
});

