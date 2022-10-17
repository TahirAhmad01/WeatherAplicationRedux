import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 24.414166666,
  lon: 88.985833333,
  city: "",
  County: "",
};

export const findCountrySlice = createSlice({
  name: "findCountry",
  initialState,
  reducers: {
    setLanLon: (state, action) => {
      const { lat, lon, city, country } = action.payload || {};
      state.lat = lat;
      state.lon = lon;
      state.city = city;
      state.County = country;
    },
  },
});

export default findCountrySlice.reducer;
export const { setLanLon } = findCountrySlice.actions;
