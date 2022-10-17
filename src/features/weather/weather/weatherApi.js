import { weatherApiBase } from "./../api/apiSlice";

const ApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const weatherApi = weatherApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ lat, lon }) =>
        `/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${ApiKey}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
