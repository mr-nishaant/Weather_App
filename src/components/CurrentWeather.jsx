// src/components/CurrentWeather.js
import React from 'react';

const CurrentWeather = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-12 mt-4">
      {/* Temperature Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-orbitron text-neon-blue mb-2 font-semibold animate-glow">Temperature</h3>
        <div className="text-5xl font-audiowide text-white animate-glow">{data.temperature}</div>
      </div>

      {/* Humidity Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-orbitron text-black font-semibold mb-2 animate-glow">Humidity</h3>
        <div className="text-5xl font-audiowide text-white animate-glow">{data.humidity}</div>
      </div>

      {/* Wind Speed Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-orbitron mb-2 animate-glow text-blue-900 font-semibold">Wind Speed</h3>
        <div className="text-5xl font-audiowide text-white animate-glow">{data.windSpeed}</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
