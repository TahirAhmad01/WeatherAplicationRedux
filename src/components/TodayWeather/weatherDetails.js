import fahrenheitToCelsius from "fahrenheit-to-celsius";
import React from "react";

function WeatherDetails({
  feelslike,
  humidity,
  uvindex,
  visibility,
  pressure,
}) {
  return (
    <div className="flex justify-center text-gray-600 flex-wrap">
      <div className="mx-4 my-3 text-center font-medium">
        <div>Feels Like</div>
        <div>
          {feelslike && Math.round(fahrenheitToCelsius(feelslike))}&#176;C
        </div>
      </div>

      <div className="mx-4 my-3 text-center font-medium">
        <div>Humidity</div>
        <div>{Math.floor(humidity)}%</div>
      </div>

      <div className="mx-4 my-3 text-center font-medium">
        <div>UV</div>
        <div>{uvindex}</div>
      </div>

      <div className="mx-4 my-3 text-center font-medium">
        <div>Visibility</div>
        <div>{visibility}km</div>
      </div>

      <div className="mx-4 my-3 text-center font-medium">
        <div>Air Pressure</div>
        <div>{pressure}hPa</div>
      </div>
    </div>
  );
}

export default WeatherDetails;
