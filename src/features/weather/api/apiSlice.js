import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApiBase = createApi({
  reducerPath: "dailyWeatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_WEATHER_API_URL,
  }),
  tagType: [],
  endpoints: (builder) => ({}),
});
