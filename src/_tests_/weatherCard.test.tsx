import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";
import { WeatherProvider } from "../context/weatherContext";

// Mock weather data
const mockWeatherData = {
  name: "Melbourne",
  weather: [{ description: "Clear Sky" }],
  main: { temp: 293.15 },
};

describe("WeatherCard", () => {
  test("displays weather information", () => {
    // Mock the weather context value
    const mockValue = { weatherData: mockWeatherData, setWeatherData: jest.fn() };

    render(
      <WeatherProvider value={mockValue}>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByText(/Melbourne/)).toBeInTheDocument();
    expect(screen.getByText(/Clear Sky/)).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
  });
});
