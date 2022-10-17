import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodayWeather from "./TodayWeather/todayWeather";
import { weatherApi } from "../features/weather/weather/weatherApi";
import SearchCountries from "./searchCountries";
import WeatherLoader from "./weatherLoader";
import WeekWeather from "./weekWeather/weekWeather";

export function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon, city } = cityUpdate || {};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await dispatch(weatherApi.endpoints.getWeather.initiate({ lat, lon }))
        .then((data) => {
          if (data.data !== undefined) {
            setWeatherData(data.data);
          } else {
            setWeatherData([]);
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

  return (
    <>
      <div className="bg-emerald-50 h-screen flex justify-center overflow-auto">
        <div className="customContainer py-2">
          {/* search country */}
          <SearchCountries />
          {isError && <div>{error.message}</div>}
          {isLoading ? (
            <WeatherLoader />
          ) : (
            <React.Fragment>
              <TodayWeather data={weatherData} city={city} />
              <WeekWeather data={weatherData} />
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}
