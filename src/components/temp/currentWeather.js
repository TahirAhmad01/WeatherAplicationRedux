import fahrenheitToCelsius from "fahrenheit-to-celsius";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherApi } from "../../features/weather/weather/weatherApi";

export default function CurrentWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [currentWeather, setWeather] = useState([{}]);
  const [todayData, setTodayData] = useState("");

  const dispatch = useDispatch();

  const cityUpdate = useSelector((state) => state.countries);
  const { lat, lon } = cityUpdate || {};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await dispatch(weatherApi.endpoints.getWeather.initiate({ lat, lon }))
        .then((data) => {
          if (data.data !== undefined) {
            setWeather([data.data.currentConditions]);
            setTodayData(data.data.days[0]);
            console.log(data.data);
          } else {
            setWeather([]);
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

  const { tempmin } = todayData || {};
  // console.log(  tempmin );

  let content;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error}</div>;
  } else if (!isLoading && !isError && currentWeather.length === 0) {
    content = <div>no data found </div>;
  } else if (!isLoading && !isError && currentWeather.length !== 0) {
    content = currentWeather.map((weather, idx) => {
      const { temp, feelslike, humidity, pressure } = weather || {};

      return (
        <div key={idx}>
          <div> {temp && Math.floor(fahrenheitToCelsius(temp))}</div>
          <div>{feelslike && Math.floor(fahrenheitToCelsius(feelslike))}</div>
          <div>{humidity}%</div>
          <div>{pressure}hPa</div>
        </div>
      );
    });
  } else {
    content = "something went wrong";
  }

  return (
    <>
      <h3 className="text-3xl font-bold underline">Weather</h3>
      <div>{content}</div>
      <div>
        {tempmin && Math.floor(fahrenheitToCelsius(todayData?.tempmax))}
      </div>
      <div>{tempmin && Math.floor(fahrenheitToCelsius(tempmin))}</div>
    </>
  );
}
