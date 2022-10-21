import fahrenheitToCelsius from "fahrenheit-to-celsius";
import React from "react";
import Details from "./details";

function WeatherDetails({
  feelslike,
  humidity,
  uvindex,
  visibility,
  pressure,
}) {
  return (
    <div className="flex justify-center text-gray-600 flex-wrap">
      <Details title="Feels Like">
        {feelslike && Math.round(fahrenheitToCelsius(feelslike))}&#176;C
      </Details>
      <Details title="Humidity">{Math.floor(humidity)}%</Details>
      <Details title="UV Index">{uvindex}</Details>
      <Details title="Visibility">{Math.floor(visibility)}km</Details>
      <Details title="Air Pressure">{Math.floor(pressure)}hPa</Details>
    </div>
  );
}

export default WeatherDetails;
