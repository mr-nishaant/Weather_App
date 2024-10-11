// src/components/HourlyForecast.js
import React, { useState } from 'react';

const HourlyForecast = ({ hourlyTemps }) => {
  const [selectedTime, setSelectedTime] = useState('All'); // State for selected time filter

  // Function to convert time to hh AM/PM format
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours} ${ampm}`;
  };

  // Filter based on selected time range
  const filterTemps = (temps) => {
    if (selectedTime === 'All') return temps; // No filtering if 'All' is selected
    if (selectedTime === 'Morning') {
      return temps.filter((temp) => {
        const hours = new Date(temp.time).getHours();
        return hours >= 6 && hours < 12;
      });
    }
    if (selectedTime === 'Afternoon') {
      return temps.filter((temp) => {
        const hours = new Date(temp.time).getHours();
        return hours >= 12 && hours < 18;
      });
    }
    if (selectedTime === 'Evening') {
      return temps.filter((temp) => {
        const hours = new Date(temp.time).getHours();
        return hours >= 18 && hours < 24;
      });
    }
    if (selectedTime === 'Night') {
      return temps.filter((temp) => {
        const hours = new Date(temp.time).getHours();
        return hours >= 0 && hours < 6;
      });
    }
  };

  // Apply filters
  const filteredTemps = filterTemps(hourlyTemps).filter((_, index) =>
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].includes(index)
  );

  return (
    <div className="alien-ui">
      {/* Filter Dropdown
      <div className="flex justify-center mb-4">
        <select
          className="p-2 border-2 border-neon-green bg-transparent text-neon-green rounded-lg shadow-neon"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="All">All Times</option>
          <option value="Morning">Morning (6 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 6 PM)</option>
          <option value="Evening">Evening (6 PM - 12 AM)</option>
          <option value="Night">Night (12 AM - 6 AM)</option>
        </select>
      </div> */}

      {/* Hourly Forecast Display */}
      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {filteredTemps.map((temp, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-opacity-30 bg-black border-2 border-neon-green rounded-3xl p-6 backdrop-filter backdrop-blur-lg shadow-neon transform hover:scale-110 transition-all duration-500"
            >
              <span className="text-lg font-orbitron text-neon-green">{formatTime(temp.time)}</span>
              <img
                src={temp.icon}
                alt={temp.condition}
                className="w-16 h-16 my-4"
              />
              <span className="text-3xl font-audiowide text-neon-pink">{Math.round(parseInt(temp.temperature))}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
