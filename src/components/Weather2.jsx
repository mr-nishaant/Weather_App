// src/components/Weather.js
import React, { useState, useEffect } from "react";
import CityInput from "./CityInput";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";

function Weather() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [debouncedCity, setDebouncedCity] = useState(city ? city : "Patna");
  const [hourlyTemps, setHourlyTemps] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
    }, 1000);
    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    if (!debouncedCity) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=1932dd6f07a047a3a15134504240110&q=${debouncedCity}&days=3&aqi=no&alerts=no`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const res = await response.json();

        const apiCurrentTime = new Date(res.location.localtime);
        const currentHour = apiCurrentTime.getHours();
        const currentDay = apiCurrentTime.getDate();

        let nextTemps = [];
        let count = 0;

        res.forecast.forecastday.forEach((day) => {
          day.hour.forEach((hourData) => {
            const forecastTime = new Date(hourData.time);
            const forecastHour = forecastTime.getHours();
            const forecastDay = forecastTime.getDate();

            if (
              (forecastDay === currentDay && forecastHour >= currentHour) ||
              forecastDay > currentDay
            ) {
              nextTemps.push({
                time: hourData.time,
                temperature: `${hourData.temp_c}°`,
                icon: hourData.condition.icon,
                condition: hourData.condition.text,
              });
              count++;
              if (count >= 12) return;
            }
          });
        });

        setHourlyTemps(nextTemps);
        setData({
          city: res.location.name,
          temperature: `${res.current.temp_c}°`,
          condition: res.current.condition.text,
          humidity: `${res.current.humidity}%`,
          windSpeed: `${res.current.wind_kph} kph`,
          isDay: res.current.is_day,
          icon: res.current.condition.icon,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setData({});
        setHourlyTemps([]);
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      {/* Starry Background */}
      <div className="absolute inset-0 bg-[url('https://your-star-background-image-url.com')] bg-cover bg-no-repeat"></div>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-neon p-6 max-w-4xl w-full relative z-10">
        {/* Header with City Input */}
        <div className="flex justify-center mb-6">
          <CityInput city={city} setCity={setCity} />
        </div>

        {/* Current Weather Section */}
        <div
          className={`bg-gradient-to-r ${data.isDay ? "from-blue-900 to-purple-600" : "from-gray-800 to-black"} bg-opacity-50 backdrop-filter backdrop-blur-md rounded-2xl p-6 mb-6 transition duration-500`}
          style={{
            backgroundImage: data.isDay
              ? "url('https://ednews.net/uploads/news/22997/72fc9b61-097b-3493-bb81-e5478bb5c310_850.jpeg')"
              : "url('https://fox17.com/resources/media2/16x9/full/1015/center/80/3af3a8f8-1c59-4b42-b0bb-f58ccadd0e1b-large16x9_85082514_481992939141415_3757870107942977536_n.jpg')",
          }}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-orbitron mb-4 animate-glow text-white">👽 Weather</h1>
            <h2 className="text-3xl font-audiowide text-white mb-2 animate-glow">{data.city}</h2>
            <CurrentWeather data={data} />
          </div>
        </div>

        {/* Hourly Forecast Section */}
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-md rounded-2xl">
          <HourlyForecast hourlyTemps={hourlyTemps} />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center mt-4 animate-pulse">{error}</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
