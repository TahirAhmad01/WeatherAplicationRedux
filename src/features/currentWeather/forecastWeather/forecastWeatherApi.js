import { weatherApi } from "../api/apiSlice";

const ApiKey = "";

export const forecastWeatherApi = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getForecast: builder.query({
      query: ({ lat, lon }) =>
        `/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`,
    }),
  }),
});

export const { useGetForecastQuery } = forecastWeatherApi;
