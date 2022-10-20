import { findCountriesApi } from "./../api/apiSlice";

export const countryApi = findCountriesApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: (prefix) =>
        `/cities?minPopulation=0&namePrefix=${prefix}&limit=10`,
    }),
  }),
});

export const { useGetCountryQuery } = countryApi;
