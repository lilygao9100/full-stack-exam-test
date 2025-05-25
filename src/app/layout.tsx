import { FC, ReactNode } from 'react';
import { WeatherProvider } from '../context/WeatherContext';
import Sidebar from '../components/Sidebar'; // Import the Sidebar
import '../styles/globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    // Wrap the root layout with html and body tags
    <html lang="en">
      <body>
        <WeatherProvider>
          <div className="flex">
            {/* Sidebar - displayed on all pages */}
            <Sidebar />
            
            {/* Main content area */}
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </WeatherProvider>
      </body>
    </html>
  );
};

export default Layout;




