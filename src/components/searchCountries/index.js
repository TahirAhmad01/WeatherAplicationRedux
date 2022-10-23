import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { setLanLon } from "../../features/countries/findCountry/findCountrySlice";
import { findCityApi } from "./../../features/getCity/findCity/findCityApi";

function SearchCountries() {
  const [val, setVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [isError, setIsError] = useState("");
  const [visible, setVisible] = useState(false);
  const [value] = useDebounce(val, 1000);

  const dispatch = useDispatch();

  useEffect(() => {
    if (value !== "") {
      async function getData() {
        setIsLoading(true);
        await dispatch(findCityApi.endpoints.getCountry.initiate(value))
          .then((data) => {
            console.log(data?.data);
            setCityList(data?.data);
            //console.log(data?.data?.data);
          })
          .catch((err) => {
            console.log(err);
            setIsError(err.message);
          });

        setIsLoading(false);
      }
      getData();
    }
  }, [dispatch, value]);

  const reqWeather = (lat, lon) => {
    dispatch(setLanLon({ lat, lon }));
    setVisible(false);
  };

  let content = null;

  if (isLoading) {
    content = <div className="text-center">Loading....</div>;
  } else if (!isLoading && cityList === undefined) {
    content = (
      <div className="text-center text-red-500">
        <div>Something went wrong</div>
      </div>
    );
  } else if (
    !isLoading &&
    isError === "" &&
    cityList?.length === 0 &&
    cityList !== undefined
  ) {
    content = <div className="text-center">no data found</div>;
  } else if (!isLoading && isError?.message !== "" && cityList?.length > 0) {
    content = cityList?.map((cityItem, idx) => {
      const { display_place: city, lat, lon } = cityItem || {};

      return (
        <div
          key={idx}
          onClick={() => reqWeather(lat, lon)}
          className="cursor-pointer hover:bg-slate-50 hover:rounded-md py-2 px-3 "
        >
          {city}
        </div>
      );
    });
  }

  return (
    <div className="flex-grow-1 max-w-[450px] relative">
      <OutsideClickHandler
        onOutsideClick={() => {
          visible && setVisible(false);
          console.log("clicked");
        }}
      >
        <input
          type="text"
          placeholder="Search City Here"
          className="w-full  px-3 py-2 rounded-[29px] outline-0"
          onChange={(e) => {
            setVal(e.target.value);
            setVisible(true);
          }}
        />
      </OutsideClickHandler>

      <div
        className={`absolute z-50 w-full rounded-md min-h-2 max-h-[150px] overflow-y-auto bg-white mt-1 py-2 px-2  scrollbar-thumb-gray-100 scrollbar-track-gray-20 scrollbar-thin transition duration-300 ease-in-out 
      ${visible ? "visible" : "invisible"}
      `}
      >
        {content}
      </div>
    </div>
  );
}

export default React.memo(SearchCountries);
