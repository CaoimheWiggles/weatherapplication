import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import WeatherIcon from "../../assets/weather-svgrepo-com.svg";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onSelectCity }) => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-row w-full justify-between h-18 py-2 items-center px-4 sm:px-6 lg:px-8">
      <div className="flex gap-3 items-center w-[80%] justify-start">
        <div className="flex items-center flex-shrink-0 whitespace-nowrap text-xl font-bold text-blue-400">
          <img src={WeatherIcon} alt="Weather Icon" className="w-8 h-8 mr-2" />
          <span className="hidden md:inline">Weather App</span>{" "}
          {/* Hide text on small screens */}
        </div>
        <SearchInput className="flex-shrink-0" onSelectCity={onSelectCity} />
      </div>
      <div className="">
        <button
          className="hover:bg-red-400 p-2 rounded-md hover:text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
