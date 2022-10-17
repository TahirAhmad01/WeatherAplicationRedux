import fahrenheitToCelsius from "fahrenheit-to-celsius";
import moment from "moment";
import React from "react";

function WeekWeather({ data }) {
  const { days } = data || {};

  let content;

  if (days?.length > 0) {
    content = days.slice(0, 10).map((day, idx) => {
      const {
        tempmax,
        tempmin,
        icon,
        datetime,
        conditions,
        feelslike,
        humidity,
        pressure,
        uvindex,
        visibility,
      } = day || {};
      return (
        <div className="card border-none my-2 p-3" key={idx}>
          <div className="mb-2 font-medium ml-1">
            {datetime && idx === 0
              ? "Today"
              : idx === 1
              ? "Yesterday"
              : moment(datetime, "YYYY-MM-DD").format("dddd")}
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <img
                src={require(`../../assets/images/png/icons/${icon}.png`)}
                alt="weather_ico"
                className="w-full"
              />
            </div>

            <div className="ml-3 font-medium">
              <div >
                {tempmax && Math.round(fahrenheitToCelsius(tempmax))}&#176;C /{" "}
                {tempmin && Math.round(fahrenheitToCelsius(tempmin))}&#176;C
              </div>
              <div>{conditions}</div>
            </div>
          </div>

          <div className="ml-12">
            <div className="card-direction">
              <div className="flex center font-medium text-gray-500">
                <div className="mr-4 ml-3 my-3 text-center">
                  <div>Feels Like</div>
                  <div>
                    {feelslike && Math.round(fahrenheitToCelsius(feelslike))}
                    &#176;C
                  </div>
                </div>

                <div className="mx-4 my-3 text-center">
                  <div>Humidity</div>
                  <div>{Math.floor(humidity)}%</div>
                </div>

                <div className="mx-4 my-3 text-center">
                  <div>UV</div>
                  <div>{uvindex}</div>
                </div>

                <div className="mx-4 my-3 text-center">
                  <div>Visibility</div>
                  <div>{visibility}km</div>
                </div>

                <div className="mx-4 my-3 text-center">
                  <div>Air Pressure</div>
                  <div>{Math.round(pressure)}hPa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {/*  */}
      <div className="font-medium">10 DAY FORECAST</div>
      <div>{content}</div>
    </>
  );
}

export default React.memo(WeekWeather);
