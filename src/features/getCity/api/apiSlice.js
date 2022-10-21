import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_CITY_NAME_API_URL,

  // prepareHeaders: async (headers) => {
  //   headers.set("content-Type", "application/json");
  //   return headers;
  // },
});

export const getCityApi = createApi({
  reducerPath: "getCity",
  baseQuery,
  tagType: [],
  endpoints: (builder) => ({}),
});
