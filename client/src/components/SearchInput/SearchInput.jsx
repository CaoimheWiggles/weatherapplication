import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const SearchInput = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = debounce(async () => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
              import.meta.env.VITE_OPENWEATHER_API_KEY
            }`
          );
          const data = await response.json();
          if (data.length > 0) {
            const cities = data.map((city) => ({
              id: city.name,
              name: city.name,
              coordinates: {
                lat: city.lat,
                lon: city.lon,
              },
            }));
            setSuggestions(cities);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    fetchSuggestions();

    return () => {
      fetchSuggestions.cancel();
    };
  }, [query]);

  const handleSelectCity = (city) => {
    setQuery("");
    setSuggestions([]);
    onSelectCity(city.coordinates);
  };

  return (
    <div className="relative flex items-center w-full max-w-xs">
      <svg
        className="absolute left-3 w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m1.75-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        type="text"
        className="pl-10 pr-4 py-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="text-left absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectCity(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
