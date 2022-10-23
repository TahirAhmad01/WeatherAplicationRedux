import { getCityApi } from "./../api/apiSlice";

export const findCityApi = getCityApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: (prefix) =>
        `/autocomplete?key=pk.783d8e32aa8e21d9db146d7da763ee61&q=${prefix}`,
    }),
  }),
});

export const { useGetCountryQuery } = findCityApi;
