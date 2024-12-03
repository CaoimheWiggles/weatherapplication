import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CurrentCard from "../../components/CurrentCard/CurrentCard";
import MapCard from "../../components/MapCard/MapCard";
import DateForecast from "../../components/DateForecast/DateForecast";
import WeeklyForecast from "../../components/WeeklyForecast/WeeklyForecast";
// import PopularCities from "../../components/PopularCities/PopularCities";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 74.006, lon: 40.7128 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback coordinates if location access is denied
          setCoordinates({ lat: 53.7798, lon: 7.3055 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback coordinates if geolocation is not supported
      setCoordinates({ lat: 53.7798, lon: 7.3055 });
    }
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${
              coordinates.lat
            }&lon=${coordinates.lon}&appid=${
              import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
          );
          const data = await response.json();
          console.log("Weather data:", data);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeatherData();
    }
  }, [coordinates]);

  const handleSelectCity = (coords) => {
    setCoordinates(coords);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen px-2 sm:px-2 md:px-4 lg:px-10 mt-2">
      <Header onSelectCity={handleSelectCity} />
      <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col w-full items-center justify-between my-6 px-4 sm:px-6 lg:px-8 pt-2 gap-4">
        <CurrentCard coords={coordinates} />
        <MapCard coords={coordinates} />
      </div>
      <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col w-full items-center justify-between px-4 py-2 sm:px-6 lg:px-8 gap-4">
        <DateForecast hourly={weatherData.hourly} />
        <WeeklyForecast daily={weatherData.daily} />
        {/* <PopularCities /> */}
      </div>
      <footer className="text-center py-2 mt-10 border-t border-gray-300 text-gray-600 text-sm">
        © {new Date().getFullYear()} Weather App. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
