import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dailyWeatherApi } from "./../features/dailyWeather/dailyWeather/dailyWeatherApi";

export default function DailyWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [weeklyForecast, setForecast] = useState([{}]);

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon } = cityUpdate || {};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await dispatch(
        dailyWeatherApi.endpoints.getDailyWeather.initiate({ lat, lon })
      )
        .then((data) => {
          if (data !== undefined) {
            // setForecast(data?.data?.data?.timelines[0]?.intervals);
            console.log(data);
          } else {
            setForecast([]);
          }
        })
        .catch((err) => {
          setIsError(true);
          setError(err);
        });
      setIsLoading(false);
    }

    getData();
  }, [dispatch, lat, lon]);
  //   console.log(weeklyForecast);

  let content;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error}</div>;
  } else if (!isLoading && !isError && weeklyForecast.length === 0) {
    content = <div>no data found </div>;
  } else if (!isLoading && !isError && weeklyForecast?.length !== 0) {
    content = <div>success</div>;
    // content = weeklyForecast.map((data) => {
    //   const { values } = data || {};
    //   const { temperatureMax, temperatureMin } = values || {};
    //   //   const timeSlice = startTime.slice(0, 10);

    //   return (
    //     <>
    //       {/* <div>
    //         {moment(data.startTime.slice(0, 10), "YYYY-MM-DD").format("dddd")}
    //       </div> */}
    //       <div>max: {temperatureMax}</div>
    //       <div>min: {temperatureMin}</div>
    //     </>
    //   );
    // });
  } else {
    content = "something went wrong";
  }

  return (
    <>
      <h3>Forecast</h3>
      <div>{content}</div>
    </>
  );
}
