import React from 'react';

const CityInput = ({ city, setCity }) => {
  return (
    <div className="inline-flex justify-center items-center w-full">
      <input
        type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 w-72 text-black placeholder:text-blue-900"
      />
    </div>
  );
};

export default CityInput;
