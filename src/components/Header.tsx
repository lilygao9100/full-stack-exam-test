import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-6 px-4 rounded-b-lg shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Optional: Add a weather icon */}
          <span className="text-3xl font-semibold mr-2">🌦</span>
          <h1 className="text-3xl font-bold">Weather App</h1>
        </div>
        <p className="text-sm text-blue-200">Get the latest weather updates</p>
      </div>
    </header>
  );
};

export default Header;
