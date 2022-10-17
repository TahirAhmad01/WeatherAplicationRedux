import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_COUNTRY_API_URL,
  prepareHeaders: async (headers) => {
    headers.set("X-RapidAPI-Key", process.env.REACT_APP_COUNTRY_API_KEY);
    headers.set("X-RapidAPI-Host", "wft-geo-db.p.rapidapi.com");

    return headers;
  },
});

export const findCountriesApi = createApi({
  reducerPath: "CountriesApi",
  baseQuery,
  tagType: [],
  endpoints: (builder) => ({}),
});
