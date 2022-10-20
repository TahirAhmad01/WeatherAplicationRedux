import { getCityApi } from "./../api/apiSlice";

export const getCityNameApi = getCityApi.injectEndpoints({
  endpoints: (builder) => ({
    getCity: builder.query({
      query: ({ lat, lon }) =>
        `/reverse?key=pk.783d8e32aa8e21d9db146d7da763ee61&lat=${lat}&lon=${lon}&format=json`,
    }),
  }),
});

export const { useGetCityQuery } = getCityNameApi;
