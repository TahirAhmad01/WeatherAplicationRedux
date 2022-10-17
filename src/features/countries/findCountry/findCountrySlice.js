import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 24.414166666,
  lon: 88.985833333,
  city: "Natore",
  country: "Bangladesh",
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
      state.country = country;
    },
  },
});

export default findCountrySlice.reducer;
export const { setLanLon } = findCountrySlice.actions;
