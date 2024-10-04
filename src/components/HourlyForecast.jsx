import React from 'react';

const HourlyForecast = ({ hourlyTemps }) => {

  // Function to convert time to hh AM/PM format
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; //
    const formattedTime = `${hours} ${ampm}`;
    return formattedTime;
  };

  // Filter the hourlyTemps to include only the desired indices
  const filteredTemps = hourlyTemps.filter((_, index) =>
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].includes(index)
  );

  return (
    <div className="pl-4">
      <h2 className="font-bold text-2xl text-white font-serif"
      style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(20deg)"}}>Forecast</h2>
      <div className="mt-2 flex flex-wrap gap-2 ml-4 pb-5">
        {filteredTemps.length > 0 ? (
          filteredTemps.map((hour, index) => (
            <div key={index} className=" rounded-xl p-3 bg-slate-600 flex flex-col items-center mx-3 shadow-md shadow-white ml-2"
            >
              <span className="text-sm text-emerald-50 font-medium">{formatTime(hour.time)}</span>
              <img src={hour.ico1} alt={`Weather icon for ${hour.time}`} className="w-10 h-10" />
              <span className="text-lg font-extrabold ">{Math.round(parseFloat(hour.temperature))}°</span>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;
