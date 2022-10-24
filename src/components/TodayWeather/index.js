import React from "react";
import CurrentWeather from "./currentWeather";
import FullDayWeather from "./fullDayWeather";
import WeatherDetails from "./weatherDetails";

function TodayWeather({ data, cityData }) {
  const { address } = cityData || {};
  const { county, state_district, country, town } = address || {};
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
    datetime: currentTime,
  } = currentConditions || {};
  // console.log(data);

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? " AM" : " PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  return (
    //bg-sky-300
    <div className=" pt-3 pb-4 md:px-5 sm:px-0 my-3 rounded-xl">
      <div className="font-medium text-1xl">
        {cityData !== ("" || undefined) ? (
          <div>
            {town && town + " , "}
            {county && county + " , "}
            {state_district && state_district + " , "} {country}{" "}
          </div>
        ) : (
          <div>Unknown place</div>
        )}
      </div>
      {/* temp */}
      <div className="w-full">
        {/* current Weather */}
        <CurrentWeather
          icon={icon}
          currentTemp={currentTemp}
          conditions={conditions}
          days={days}
          currentTime={currentTime}
          tConvert={tConvert}
          currentDate={data?.days[0]?.datetime}
        />

        {/* weather details */}
        <div className="flex flex-col-reverse md:flex-col">
          <WeatherDetails
            feelslike={feelslike}
            humidity={humidity}
            uvindex={uvindex}
            visibility={visibility}
            pressure={pressure}
          />

          <FullDayWeather data={data} tConvert={tConvert} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(TodayWeather);
