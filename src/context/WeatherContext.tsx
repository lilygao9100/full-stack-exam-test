"use client"; // Add this line at the top

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WeatherContextProps {
  weatherData: any;
  setWeatherData: (data: any) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

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


