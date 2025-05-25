// src/app/layout.tsx
import { WeatherProvider } from "../context/WeatherContext"; // Weather Context
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <WeatherProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </WeatherProvider>
  );
};

export default Layout;




