import { WeatherProvider } from '../context/WeatherContext'; // Ensure correct import
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // Explicitly type children
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <WeatherProvider>
      {children}
    </WeatherProvider>
  );
};

export default Layout;


