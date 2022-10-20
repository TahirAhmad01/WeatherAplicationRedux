import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: "",
  lon: "",
};

export const findCountrySlice = createSlice({
  name: "findCountry",
  initialState,
  reducers: {
    setLanLon: (state, action) => {
      const { lat, lon } = action.payload || {};
      state.lat = lat;
      state.lon = lon;
    },
  },
});

export default findCountrySlice.reducer;
export const { setLanLon } = findCountrySlice.actions;
