import { configureStore } from "@reduxjs/toolkit";
import { findCountriesApi } from "./../features/countries/api/apiSlice";
import findCountryReducer from "./../features/countries/findCountry/findCountrySlice";
import { weatherApiBase } from "./../features/weather/api/apiSlice";
import weatherReducer from "./../features/weather/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    [findCountriesApi.reducerPath]: findCountriesApi.reducer,
    [weatherApiBase.reducerPath]: weatherApiBase.reducer,
    countries: findCountryReducer,
    weather: weatherReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(findCountriesApi.middleware)
      .concat(weatherApiBase.middleware),
});
