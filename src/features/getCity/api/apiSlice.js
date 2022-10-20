import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_CITY_NAME_API_URL,
});

export const getCityApi = createApi({
  reducerPath: "getCity",
  baseQuery,
  tagType: [],
  endpoints: (builder) => ({}),
});
