// src/components/CityInput.js
import React from 'react';

const CityInput = ({ city, setCity }) => {
  return (
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name..."
      className="w-full max-w-md px-6 py-3 bg-transparent border border-neon-blue rounded-full text-white font-audiowide placeholder-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-pink transition duration-300 animate-glow"
    />
  );
};

export default CityInput;
