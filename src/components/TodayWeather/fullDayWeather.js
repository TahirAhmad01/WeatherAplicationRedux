import fahrenheitToCelsius from "fahrenheit-to-celsius";
import React, { useEffect, useState } from "react";
import {
  HorizontalScrollContainer,
  HorizontalScrollItem,
} from "react-simple-horizontal-scroller";

function FullDayWeather({ data }) {
  const [margeTwoDays, setMargeTwoDays] = useState([]);

  // console.log(data);
  const { days, currentConditions } = data || {};
  const { datetime: currentTime } = currentConditions || {};

  useEffect(() => {
    days?.length > 0 && setMargeTwoDays(days[0]?.hours.concat(days[0]?.hours));
  }, [days]);

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

  let content;

  if (days?.length > 0) {
    const indexOf = days[0]?.hours.findIndex((obj) => {
      return obj.datetime.slice(0, 2) === currentTime.slice(0, 2);
    });
    // console.log(days[1].hours.concat(days[1].hours));

    if (margeTwoDays.length > 0) {
      const SliceHors = margeTwoDays?.slice(indexOf, indexOf + 24);

      content = SliceHors.map((weather, idx) => {
        const { datetime, temp, icon: hoursIcon } = weather || {};
        return (
          <HorizontalScrollItem id={idx} key={idx}>
            <div className="bg-white py-3 px-4 rounded-xl h-full w-auto min-w-[170px] max-w-[200px] mx-2">
              <div className="mb-2 font-medium">
                {idx === 0 ? "Now" : tConvert(datetime?.slice(0, 5))}
              </div>
              <div className="flex items-center">
                <div className="w-max-29">
                  <img
                    src={require(`../../assets/images/png/icons/${hoursIcon}.png`)}
                    alt="weather_ico"
                    className="w-full"
                  />
                </div>
                <div className="px-3 flex-1">
                  <div className="font-medium">
                    <div>
                      {temp && Math.round(fahrenheitToCelsius(temp))}
                      &#176;C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HorizontalScrollItem>
        );
      });
    }
  }

  return (
    <>
      <div className="mt-4">
        <HorizontalScrollContainer>{content}</HorizontalScrollContainer>
      </div>
    </>
  );
}

export default FullDayWeather;
