import { findCountriesApi } from "../api/apiSlice";

export const getCityNameApi = findCountriesApi.injectEndpoints({
  endpoints: (builder) => ({
    getCityName: builder.query({
      query: ({ lat, lon }) =>
        `/cities?location=${lat}%2B${lon}&limit=1&radius=100`,
    }),
  }),
});

export const { useGetCityNameQuery } = getCityNameApi;
