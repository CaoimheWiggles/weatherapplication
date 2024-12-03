import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { WiStrongWind, WiCloud, WiHumidity } from "weather-icons-react";

const WeeklyForecast = ({ daily }) => {
  const getWeatherIcon = (condition) => {
    const iconProps = {
      size: 40,
      animate: true,
    };

    switch (condition) {
      case "Clear":
        return (
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="#FFD700"
            {...iconProps}
          />
        );
      case "Clouds":
        return (
          <ReactAnimatedWeather icon="CLOUDY" color="#B0C4DE" {...iconProps} />
        );
      case "Rain":
        return (
          <ReactAnimatedWeather icon="RAIN" color="#1E90FF" {...iconProps} />
        );
      case "Snow":
        return (
          <ReactAnimatedWeather icon="SNOW" color="#FFFFFF" {...iconProps} />
        );
      case "Thunderstorm":
        return (
          <ReactAnimatedWeather icon="SLEET" color="#708090" {...iconProps} />
        );
      case "Fog":
      case "Mist":
      case "Haze":
        return (
          <ReactAnimatedWeather icon="FOG" color="#696969" {...iconProps} />
        );
      default:
        return (
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="#FFD700"
            {...iconProps}
          />
        );
    }
  };

  return (
    <div className="overflow-hidden drop-shadow-sm w-full sm:w-[100%] md:w-[100%] lg:w-[75%]">
      <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="flex flex-row gap-4">
          {daily.slice(0, 6).map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-start min-w-[200px] p-4 border border-gray-300 rounded-lg shadow-md bg-white min-h-[260px] flex-shrink-0"
            >
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-gray-700">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {day.weather[0].description}
                </div>
              </div>
              <div className="flex items-center mt-2">
                {getWeatherIcon(day.weather[0].main)}
                <div className="text-lg font-bold text-gray-800 ml-2">
                  {day.temp.day}
                  <sup>°C</sup>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 mt-2">
                <div className="flex items-center">
                  <WiStrongWind size={24} color="#000" />
                  <span className="ml-2">Wind: {day.wind_speed} m/s</span>
                </div>
                <div className="flex items-center">
                  <WiCloud size={24} color="#000" />
                  <span className="ml-2">Clouds: {day.clouds}%</span>
                </div>
                <div className="flex items-center">
                  <WiHumidity size={24} color="#000" />
                  <span className="ml-2">Humidity: {day.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
