import fahrenheitToCelsius from "fahrenheit-to-celsius";
import moment from "moment/moment";
import React from "react";

function CurrentWeather({
  icon,
  currentTemp,
  conditions,
  days,
  currentTime,
  tConvert,
  currentDate,
}) {
  console.log(currentDate);
  let tempMaxMin;

  if (days?.length > 0) {
    const { tempmax, tempmin } = days[0] || {};
    tempMaxMin = (
      <div className="ml-3">
        {tempmax && Math.round(fahrenheitToCelsius(tempmax))}&#176;C /{" "}
        {tempmin && Math.round(fahrenheitToCelsius(tempmin))}
        &#176;C
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center w-36">
        <img
          src={icon && require(`../../assets/images/png/icons/${icon}.png`)}
          alt={icon}
          className="w-full h-auto"
        ></img>
      </div>
      <div className=" ml-4">
        <div className=" flex items-center">
          <div className="text-8xl font-medium">
            {currentTemp && Math.round(fahrenheitToCelsius(currentTemp))}
          </div>
          <div className=" font-medium ml-2">
            <div className="text-3xl">&#176; C</div>
            <div className="text-[17px]">{conditions}</div>
          </div>
        </div>

        {/* time */}
        <div className="flex justify-center font-medium">
          <div>
            {moment(currentDate).format("ll")}{" "}
            {currentTime && tConvert(currentTime.slice(0, 5))}
          </div>
          {tempMaxMin}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
