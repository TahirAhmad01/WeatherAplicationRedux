import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forecastWeatherApi } from "../features/weather/forecastWeather/forecastWeatherApi";

export default function ForecastWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [currentForecast, setForecast] = useState([{}]);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon } = cityUpdate || {};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await dispatch(
        forecastWeatherApi.endpoints.getForecast.initiate({ lat, lon })
      )
        .then((data) => {
          if (data.data !== undefined) {
            setForecast([data.data]);
            setList(data.data.list);
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
  // console.log(currentForecast);

  const weakDay = list.reduce((unique, o) => {
    if (
      !unique.some((obj) => obj.dt_txt.slice(0, 10) === o.dt_txt.slice(0, 10))
    ) {
      unique.push(o);
    }
    return unique;
  }, []);

  let content;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error}</div>;
  } else if (!isLoading && !isError && currentForecast.length === 0) {
    content = <div>no data found </div>;
  } else if (!isLoading && !isError && currentForecast?.length !== 0) {
    content = weakDay.map((c, idx) => {
      // console.log(c);
      return (
        <>
          <div key={idx}>{c.dt_txt}</div>
          <div>
            {moment(c.dt_txt, "YYYY-MM-DD h:mm:ss").format("dddd").slice(0, 3)}
          </div>
        </>
      );
    });
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
