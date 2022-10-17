import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { countryApi } from "../features/countries/findCountry/findCountryApi";
import { setLanLon } from "../features/countries/findCountry/findCountrySlice";

export default function SearchCountry() {
  const [val, setVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [isError, setIsError] = useState("");
  const [value] = useDebounce(val, 500);

  // const { latitude } = cityList || {};
  // console.log(cityList);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await dispatch(countryApi.endpoints.getCountry.initiate(value))
        .then((data) => {
          setCityList(data?.data?.data);
          //console.log(data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
          setIsError(err);
        });

      setIsLoading(false);
    }
    getData();
  }, [dispatch, value]);

  const reqWeather = (lat, lon, city, country) => {
    dispatch(setLanLon({ lat, lon, city, country }));
  };

  let content;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && isError !== "") {
    content = <div>hi {isError}</div>;
  } else if (!isLoading && isError === "" && cityList?.length === 0) {
    content = <div>no data found</div>;
  } else if (!isLoading && isError === "" && cityList?.length !== 0) {
    content = cityList?.map((cityItem) => {
      const { id, city, latitude, longitude, country } = cityItem || {};

      return (
        <div
          key={id}
          onClick={() => reqWeather(latitude, longitude, city, country)}
          className="cursor-pointer"
        >
          {city}
        </div>
      );
    });
  } else {
    content = "something went wrong";
  }

  return (
    <>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      {content}
    </>
  );
}
