import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherProvider } from '../context/WeatherContext';

// Mock the useWeather hook
jest.mock('../hooks/useWeather', () => ({
  useWeather: jest.fn(),
}));

describe('WeatherCard', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should show loading state', () => {
    // Mock loading state
    require('../hooks/useWeather').useWeather.mockReturnValue({
      loading: true,
      error: null,
    });

    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    // Mock error state
    require('../hooks/useWeather').useWeather.mockReturnValue({
      loading: false,
      error: 'Failed to fetch',
    });

    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('should show no data state', () => {
    // Mock no data state
    require('../hooks/useWeather').useWeather.mockReturnValue({
      loading: false,
      error: null,
    });

    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByText('No weather data available.')).toBeInTheDocument();
  });

  it('should display weather data when available', () => {
    // Mock successful data
    require('../hooks/useWeather').useWeather.mockReturnValue({
      loading: false,
      error: null,
    });

    // Mock context data
    const mockWeatherData = {
      name: 'Melbourne',
      sys: { country: 'AU' },
      weather: [{ description: 'clear sky' }],
      main: { temp: 296.76, humidity: 75, pressure: 1015 },
      wind: { speed: 1.5 },
      clouds: { all: 0 },
    };

    jest.spyOn(require('../context/WeatherContext'), 'useWeatherContext')
      .mockImplementation(() => ({ weatherData: mockWeatherData }));

    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByText('Melbourne, AU')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('24°C')).toBeInTheDocument(); // 296.76K → 23.61°C → rounded to 24
    expect(screen.getByText('Humidity: 75%')).toBeInTheDocument();
    expect(screen.getByText('Wind: 1.5 m/s')).toBeInTheDocument();
  });
});

