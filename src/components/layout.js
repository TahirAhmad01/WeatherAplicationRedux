import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import { setLanLon } from "../features/countries/findCountry/findCountrySlice";
import { weatherApi } from "../features/weather/weather/weatherApi";
import { getCityNameApi } from "./../features/countries/getCityName/getCityNameApi";
import Navbar from "./navbar";
import TodayWeather from "./TodayWeather";
import WeatherLoader from "./weatherLoader";
import WeekWeather from "./weekWeather/weekWeather";

export function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [currentLatLan, setCurrentLatLon] = useState("");

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon, city, country } = cityUpdate || {};
  console.log("latLon", { lat, lon, city, country });
  console.log(weatherData);

  // isGeolocationAvailable, isGeolocationEnabled
  const { coords, isGeolocationEnabled, isGeolocationAvailable } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (!isGeolocationEnabled || !isGeolocationAvailable) {
      dispatch(
        setLanLon({
          lat: 24.3667,
          lon: 89.25,
          city: "Gurudaspur Upazila",
          country: "Bangladesh",
        })
      );
    }
  }, [isGeolocationEnabled, dispatch, isGeolocationAvailable]);

  // console.log(coords);
  useEffect(() => {
    if (
      lon === (undefined || "") &&
      lat === (undefined || "") &&
      coords?.longitude &&
      coords.latitude
    ) {
      console.log("hello");
      async function getDataA() {
        setIsLoading(true);
        await dispatch(
          getCityNameApi.endpoints.getCityName.initiate({
            lat: coords?.latitude,
            lon: coords?.longitude,
          })
        )
          .then((data) => {
            console.log(data);
            if (data?.data?.data !== "") {
              // setCurrentLatLon(data?.data?.data[0]);
              const { latitude, longitude, city, country } =
                data?.data?.data[0] || {};

              dispatch(
                setLanLon({
                  lat: latitude,
                  lon: longitude,
                  city: city,
                  country: country,
                })
              );
            }
          })
          .catch((err) => {
            setIsError(err.message);
          });
        setIsLoading(true);
      }

      getDataA();
    } else if (lon !== (undefined || "") && lat !== (undefined || "")) {
      console.log("hello");
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
    }
  }, [coords, dispatch, lat, lon]);

  let content;

  if (isLoading) {
    content = <WeatherLoader />;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (
    !isLoading &&
    !isError &&
    (weatherData === (undefined || "") || weatherData?.length === 0)
  ) {
    content = <div>no data found ! Please select your location......</div>;
  } else if (
    !isLoading &&
    !isError &&
    (weatherData !== (undefined || "") || weatherData?.length > 0)
  ) {
    content = (
      <React.Fragment>
        <TodayWeather data={weatherData} city={city} country={country} />
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
