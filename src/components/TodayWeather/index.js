import React from "react";
import CurrentWeather from "./currentWeather";
import FullDayWeather from "./fullDayWeather";
import WeatherDetails from "./weatherDetails";

function TodayWeather({ data, city, country }) {
  const { days, currentConditions } = data || {};
  const {
    temp: currentTemp,
    conditions,
    icon,
    feelslike,
    humidity,
    pressure,
    uvindex,
    visibility,
  } = currentConditions || {};

  return (
    //bg-sky-300
    <div className=" pt-3 pb-4 px-5 my-3 rounded-xl">
      <div className="font-medium text-1xl">
        {city} , {country}{" "}
      </div>
      {/* temp */}
      <div className="w-full">
        {/* current Weather */}
        <CurrentWeather
          icon={icon}
          currentTemp={currentTemp}
          conditions={conditions}
          days={days}
        />

        {/* weather details */}
        <WeatherDetails
          feelslike={feelslike}
          humidity={humidity}
          uvindex={uvindex}
          visibility={visibility}
          pressure={pressure}
        />

        <FullDayWeather data={data} />
      </div>
    </div>
  );
}

export default React.memo(TodayWeather);
