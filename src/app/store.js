import { configureStore } from "@reduxjs/toolkit";
import getCityNameReducer from "../features/getCity/getCityName/getCityNameSlice";
import { findCountriesApi } from "./../features/countries/api/apiSlice";
import findCountryReducer from "./../features/countries/findCountry/findCountrySlice";
import { getCityApi } from "./../features/getCity/api/apiSlice";
import { weatherApiBase } from "./../features/weather/api/apiSlice";
import weatherReducer from "./../features/weather/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    [findCountriesApi.reducerPath]: findCountriesApi.reducer,
    [weatherApiBase.reducerPath]: weatherApiBase.reducer,
    [getCityApi.reducerPath]: getCityApi.reducer,
    countries: findCountryReducer,
    getCityName: getCityNameReducer,
    weather: weatherReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(findCountriesApi.middleware)
      .concat(weatherApiBase.middleware)
      .concat(getCityApi.middleware)
});
