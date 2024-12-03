import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiThermometer,
  WiStrongWind,
  WiCloud,
  WiHumidity,
} from "weather-icons-react";

import ReactAnimatedWeather from "react-animated-weather";

const Login = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch weather data for current user location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setWeather(data))
        .catch((error) => setError(error));
    });
  }, []);

  const getWeatherIcon = (condition) => {
    const defaults = {
      size: 120,
      animate: true,
    };

    switch (condition) {
      case "Clear":
        return (
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="#FFD700"
            {...defaults}
          />
        );
      case "Clouds":
        return (
          <ReactAnimatedWeather icon="CLOUDY" color="#B0C4DE" {...defaults} />
        );
      case "Rain":
        return (
          <ReactAnimatedWeather icon="RAIN" color="#00BFFF" {...defaults} />
        );
      case "Snow":
        return (
          <ReactAnimatedWeather icon="SNOW" color="#ADD8E6" {...defaults} />
        );
      case "Thunderstorm":
        return (
          <ReactAnimatedWeather icon="SLEET" color="#FF4500" {...defaults} />
        );
      case "Fog":
      case "Mist":
      case "Haze":
        return (
          <ReactAnimatedWeather icon="FOG" color="#778899" {...defaults} />
        );
      default:
        return (
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="#FFD700"
            {...defaults}
          />
        );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch(
      "https://weather-app-ez2a.onrender.com/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch(
      "https://weather-app-ez2a.onrender.com/api/signup/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate("/");
    } else {
      alert(data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col h-screen items-center p-5 md:flex-col justify-center bg-[#EBEAFF]">
      {error ? (
        <p className="text-red-500">
          Error fetching weather data: {error.message}
        </p>
      ) : weather ? (
        <div className="px-5 rounded-sm w-full max-w-md md:w-2/5 md:h-full py-4 shadow-lg bg-[#2e5b96] text-white">
          <div className="flex flex-col text-left mt-1">
            <div className="text-4xl font-bold text-white">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="text-sm text-white">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full py-4 text-white">
            <div className="text-6xl">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <div>
              <div className="text-6xl font-bold text-white">
                {weather.main.temp}
                <sup>°C</sup>
              </div>
              <div className="text-sm text-white">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between text-white">
            <div className="flex items-center">
              <WiThermometer size={24} color="#fff" className="mr-2" />
              Real Feel
            </div>
            <div>
              {weather.main.feels_like}
              <sup>°C</sup>
            </div>
          </div>
          <div className="flex w-full justify-between text-white">
            <div className="flex items-center">
              <WiStrongWind size={24} color="#fff" className="mr-2" />
              Wind
            </div>
            <div>{weather.wind.speed} m/s</div>
          </div>
          <div className="flex w-full justify-between text-white">
            <div className="flex items-center">
              <WiCloud size={24} color="#fff" className="mr-2" />
              Clouds
            </div>
            <div>{weather.clouds.all}%</div>
          </div>
          <div className="flex w-full justify-between text-white">
            <div className="flex items-center">
              <WiHumidity size={24} color="#fff" className="mr-2" />
              Humidity
            </div>
            <div>{weather.main.humidity}%</div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 shadow-lg">Loading weather data...</p>
      )}
      <div className="p-5 w-full max-w-md md:w-2/5 md:h-[100%] bg-white shadow-lg rounded-sm">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isLogin ? (
          <div className="text-left">
            <h2 className="text-lg font-bold mb-4 text-[#2e5b96]">
              Login{" "}
              <span className="text-md font-normal text-gray-600">
                for more detailed Information!
              </span>
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="text-left">
            <h2 className="text-lg font-bold mb-4">Signup</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Signup
              </button>
            </form>
          </div>
        )}
        <div className="flex justify-center items-center mt-4">
          {!isLogin ? (
            <>
              Have an account?{" "}
              <a
                className={"px-1 py-2 text-blue-500 cursor-pointer"}
                onClick={() => setIsLogin(true)}
              >
                Login
              </a>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <a
                className={"px-1 py-2 text-blue-500 cursor-pointer"}
                onClick={() => setIsLogin(false)}
              >
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
