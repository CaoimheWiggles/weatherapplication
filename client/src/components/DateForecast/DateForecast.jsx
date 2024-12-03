import React from "react";

const DateForecast = ({ hourly }) => {
  if (!hourly) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col px-6 py-4 border border-gray-300 rounded-lg shadow-md bg-white gap-4 items-start min-w-[250px] w-full sm:w-[100%] md:w-[100%] lg:w-[30%]">
      <div className="text-md font-semibold text-gray-700">Hourly Forecast</div>
      {hourly.slice(0, 6).map((hour, index) => (
        <div key={index} className="flex w-full justify-between text-gray-600">
          <div>
            {new Date(hour.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            {hour.temp}°C | {hour.weather[0].main}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateForecast;
