// src/context/WeatherContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WeatherContextProps {
  weatherData: any;
  setWeatherData: (data: any) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  // Log to ensure data is being updated
  console.log("Weather data in context:", weatherData);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }
  return context;
};



