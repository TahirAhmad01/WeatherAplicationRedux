import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import { setLanLon } from "../features/countries/findCountry/findCountrySlice";
import { getCityNameApi } from "../features/getCity/getCityName/getCityName";
import { weatherApi } from "../features/weather/weather/weatherApi";
import Navbar from "./navbar";
import TodayWeather from "./TodayWeather";
import WeatherLoader from "./weatherLoader";
import WeekWeather from "./weekWeather/weekWeather";

export function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [cityData, setCityData] = useState("");

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon } = cityUpdate || {};

  const { coords, isGeolocationEnabled, isGeolocationAvailable } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 10000000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && coords !== undefined) {
      if (
        isGeolocationAvailable &&
        coords?.longitude &&
        coords.latitude &&
        lat === (undefined || "") &&
        lon === (undefined || "")
      ) {
        dispatch(
          setLanLon({
            lat: coords?.latitude,
            lon: coords?.longitude,
          })
        );
      }
    } else if (!isGeolocationEnabled || !isGeolocationAvailable) {
      dispatch(
        setLanLon({
          lat: 24.3667,
          lon: 89.25,
        })
      );
    }
  }, [
    isGeolocationEnabled,
    dispatch,
    isGeolocationAvailable,
    coords,
    lat,
    lon,
  ]);

  //console.log(isGeolocationEnabled);
  useEffect(() => {
    if (lon !== (undefined || "") && lat !== (undefined || "")) {
      // console.log("hello");
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

        await dispatch(getCityNameApi.endpoints.getCity.initiate({ lat, lon }))
          .then((data) => {
            setCityData(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false);
      }
      getData();
    }
  }, [dispatch, lat, lon]);

  let content;

  if (isLoading) {
    content = <WeatherLoader />;
  } else if (!isLoading && isError) {
    content = <div classN>{error.message}</div>;
  } else if (
    !isLoading &&
    !isError &&
    (weatherData === (undefined || "") || weatherData?.length === 0)
  ) {
    content = (
      <div className="center">
        <div>No weather data found !</div>
        <div>Please select your location......</div>
      </div>
    );
  } else if (
    !isLoading &&
    !isError &&
    (weatherData !== (undefined || "") || weatherData?.length > 0)
  ) {
    content = (
      <React.Fragment>
        <TodayWeather data={weatherData} cityData={cityData} />
        <WeekWeather data={weatherData} />
      </React.Fragment>
    );
  } else {
    content = "something went wrong";
  }

  return (
    <>
      <div className="bg-emerald-50 h-screen  overflow-auto">
        <Navbar />
        <div className="flex justify-center">
          <div className="customContainer py-2">{content}</div>
        </div>
      </div>
    </>
  );
}
