import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherApi } from "../features/weather/weather/weatherApi";
import Navbar from "./navbar";
import TodayWeather from "./TodayWeather";
import WeatherLoader from "./weatherLoader";
import WeekWeather from "./weekWeather/weekWeather";

export function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon, city, country } = cityUpdate || {};

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
      <div className="bg-emerald-50 h-screen  overflow-auto">
        <Navbar />
        <div className="flex justify-center">
          <div className="customContainer py-2">
            {/* search country */}
            {/* <SearchCountries /> */}
            {isError && <div>{error.message}</div>}
            {isLoading ? (
              <WeatherLoader />
            ) : (
              <React.Fragment>
                <TodayWeather
                  data={weatherData}
                  city={city}
                  country={country}
                />
                <WeekWeather data={weatherData} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
