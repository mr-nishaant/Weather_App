// src/components/CurrentWeather.js
import React from 'react';

const CurrentWeather = ({ data }) => {
  return (
    <div className="md:inline-flex flex-col md:flex-row justify-center items-center md:items-start text-center md:text-left">
      {/* Temperature Section */}
      <div className="w-full md:w-auto px-2 py-2">
        <h1
          className={`font-bold text-xl md:text-xl ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          Temperature
        </h1>
        <h2
          className={`font-bold text-4xl md:text-5xl justify-center items-center ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          {data.temperature}
        </h2>
      </div>

      {/* Humidity Section */}
      <div className="w-full md:w-auto px-2 py-2">
        <h1
          className={`font-bold text-xl md:text-xl ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          Humidity
        </h1>
        <h2
          className={`font-bold text-4xl md:text-5xl ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          {data.humidity}
        </h2>
      </div>

      {/* Wind Speed Section */}
      <div className="w-full md:w-auto px-2 py-2">
        <h1
          className={`font-bold text-xl md:text-xl ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          Wind Speed
        </h1>
        <h2
          className={`font-bold text-4xl md:text-5xl ${data.isDay ? 'text-black' : 'text-white'}`}
          style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(15deg)" }}
        >
          {data.windSpeed}
        </h2>
      </div>
    </div>
  );
};

export default CurrentWeather;
