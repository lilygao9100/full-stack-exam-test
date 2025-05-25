// src/context/WeatherContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the WeatherContext and its data structure
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

// Custom hook to access the WeatherContext
export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }
  return context;
};





