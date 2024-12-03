import React, { useEffect } from "react";

const MapCard = ({ coords }) => {
  useEffect(() => {
    const windyOptions = {
      key: import.meta.env.VITE_WINDY_API_KEY, // Use environment variable
      lat: coords.lat,
      lon: coords.lon,
      zoom: 5,
    };

    const initializeWindy = () => {
      try {
        if (typeof window.windyInit === "function") {
          window.windyInit(windyOptions, (windyAPI) => {
            if (windyAPI && windyAPI.map) {
              const { map } = windyAPI;
              console.log("Windy map initialized successfully.", map);
            } else {
              console.error("Failed to initialize Windy map.");
            }
          });
        } else {
          console.error("Windy API is not available.");
        }
      } catch (error) {
        console.error("Error during Windy API initialization:", error);
      }
    };

    if (window.windyInit) {
      initializeWindy();
    } else {
      const script = document.createElement("script");
      script.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
      script.onload = () => {
        const windyDiv = document.getElementById("windy");
        if (windyDiv) {
          initializeWindy();
        } else {
          console.error("Windy div is not available.");
        }
      };
      script.onerror = () => {
        console.error("Failed to load Windy API script.");
      };
      script.async = true;
      document.body.appendChild(script);
    }
  }, [coords]);

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg shadow-md bg-white gap-4 items-start w-full sm:w-[100%] md:w-[100%] lg:w-[75%] min-h-[353.6px] overflow-hidden">
      <div id="windy" className="w-full h-[100%] min-h-[353px]"></div>
    </div>
  );
};

export default MapCard;
