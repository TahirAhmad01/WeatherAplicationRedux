import { weatherApi } from "../api/apiSlice";

const ApiKey = "";

export const currentWeatherApi = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ lat, lon }) => `/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`,
    }),
  }),
});

export const { useGetWeatherQuery } = currentWeatherApi;
