import React, { useEffect, useState } from "react";
import {
  WiThermometer,
  WiStrongWind,
  WiCloud,
  WiHumidity,
} from "weather-icons-react";
import ReactAnimatedWeather from "react-animated-weather";

const CurrentCard = ({ coords }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data using passed down coordinates
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${
        coords.lon
      }&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((error) => setError(error));
  }, [coords]);

  const getWeatherIcon = (condition) => {
    const defaults = {
      size: 60,
      animate: true,
    };

    switch (condition) {
      case "Clear":
        return (
          <ReactAnimatedWeather
            {...defaults}
            icon="CLEAR_DAY"
            color="#FFD700"
          />
        );
      case "Clouds":
        return (
          <ReactAnimatedWeather {...defaults} icon="CLOUDY" color="#B0C4DE" />
        );
      case "Rain":
        return (
          <ReactAnimatedWeather {...defaults} icon="RAIN" color="#1E90FF" />
        );
      case "Snow":
        return (
          <ReactAnimatedWeather {...defaults} icon="SNOW" color="#ADD8E6" />
        );
      case "Thunderstorm":
        return (
          <ReactAnimatedWeather {...defaults} icon="SLEET" color="#778899" />
        );
      case "Fog":
      case "Mist":
      case "Haze":
        return (
          <ReactAnimatedWeather {...defaults} icon="FOG" color="#696969" />
        );
      default:
        return (
          <ReactAnimatedWeather
            {...defaults}
            icon="CLEAR_DAY"
            color="#FFD700"
          />
        );
    }
  };

  return (
    <div
      className="flex flex-col px-6 py-4 border border-gray-300 rounded-lg shadow-md bg-white gap-4 items-start min-w-[250px]
    w-full sm:w-[100%] md:w-[100%] lg:w-[30%]"
    >
      {error ? (
        <p className="text-red-500">
          Error fetching weather data: {error.message}
        </p>
      ) : weather ? (
        <>
          <div className="flex flex-col text-left">
            <div className="text-2xl font-semibold text-gray-700">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full py-4">
            <div className="text-6xl">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-800">
                {weather.main.temp}
                <sup>°C</sup>
              </div>
              <div className="text-sm text-gray-500">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between text-gray-600">
            <div className="flex items-center">
              <WiThermometer size={24} color="#000" />
              <span className="ml-2">Real Feel</span>
            </div>
            <div>
              {weather.main.feels_like}
              <sup>°C</sup>
            </div>
          </div>
          <div className="flex w-full justify-between text-gray-600">
            <div className="flex items-center">
              <WiStrongWind size={24} color="#000" />
              <span className="ml-2">Wind</span>
            </div>
            <div>{weather.wind.speed} m/s</div>
          </div>
          <div className="flex w-full justify-between text-gray-600">
            <div className="flex items-center">
              <WiCloud size={24} color="#000" />
              <span className="ml-2">Clouds</span>
            </div>
            <div>{weather.clouds.all}%</div>
          </div>
          <div className="flex w-full justify-between text-gray-600">
            <div className="flex items-center">
              <WiHumidity size={24} color="#000" />
              <span className="ml-2">Humidity</span>
            </div>
            <div>{weather.main.humidity}%</div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading weather data...</p>
      )}
    </div>
  );
};

export default CurrentCard;
