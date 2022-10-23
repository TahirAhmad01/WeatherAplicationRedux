import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: "",
  lon: "",
};

export const findCitySlice = createSlice({
  name: "findCity",
  initialState,
  reducers: {
    setLanLon: (state, action) => {
      const { lat, lon } = action.payload || {};
      state.lat = lat;
      state.lon = lon;
    },
  },
});

export default findCitySlice.reducer;
export const { setLanLon } = findCitySlice.actions;
