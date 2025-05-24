import { FC, ReactNode } from 'react';
import { WeatherProvider } from '../context/WeatherContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    // Wrap the root layout with html and body tags
    <html lang="en">
      <body>
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
};

export default Layout;



