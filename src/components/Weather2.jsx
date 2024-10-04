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

            if ((forecastDay === currentDay && forecastHour >= currentHour) || forecastDay > currentDay) {
              nextTemps.push({
                time: hourData.time,
                temperature: `${hourData.temp_c}°`,
                ico1: hourData.condition.icon,
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
          windSpeed: `${res.current.wind_kph}kph`,
          isDay: res.current.is_day,
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
    <div className="bg-gradient-to-r from-green-200 to-gray-400">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-16 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black overflow-hidden">
          <div className="flex bg-slate-900 shadow-md shadow-neutral-950 text-zinc-100 pl-2">
            <CityInput city={city} setCity={setCity} />
          </div>
          <div style={{ backgroundImage: data.isDay
                ? "url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=')"
                : "url('https://img.freepik.com/free-photo/digital-art-moon-wallpaper_23-2150918713.jpg')", }} className="bg-cover bg-center pb-2">
            <div className="pl-4">
              <h1
                className={`font-bold text-5xl font-serif ${data.isDay ? 'text-blue' : 'text-white'}`}
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(15deg)" }}
              >
                Weather
              </h1>
              <h2
                className={`font-bold text-2xl pl-7 font-serif ${data.isDay ? 'text-slate-900' : 'text-white'}`}
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)", transform: "perspective(500px) rotateX(15deg)" }}
              >
                {data.city}
              </h2>
              <CurrentWeather data={data} />
            </div>
          </div>
          <div className="bg-slate-900">
            <HourlyForecast hourlyTemps={hourlyTemps} />
            {error && <p className="text-red-500 pl-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
