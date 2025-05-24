import { render, screen, act } from "@testing-library/react";
import { useWeather } from "../hooks/useWeather";
import { WeatherProvider } from "../context/WeatherContext";
import { fetchWeather } from "../lib/fetchWeather";

jest.mock("../lib/fetchWeather");

describe("useWeather hook", () => {
  test("fetches weather data", async () => {
    const mockData = {
      name: "Melbourne",
      weather: [{ description: "Clear Sky" }],
      main: { temp: 293.15 },
    };
    fetchWeather.mockResolvedValue(mockData);

    const TestComponent = () => {
      const { weatherData } = useWeather("Melbourne");
      return <div>{weatherData ? weatherData.name : "Loading..."}</div>;
    };

    render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await act(() => Promise.resolve()); // Wait for async data fetching
    expect(screen.getByText("Melbourne")).toBeInTheDocument();
  });
});
