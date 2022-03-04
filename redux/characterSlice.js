import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const limited = 10;
export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async page => {
    const responsive = await axios(
      `${
        process.env.REACT_APP_API_BASE_ENDPOINT
      }/characters?limit=${limited}&offset=${page * limited}`
    );
    return responsive.data;
  }
);
export const characterSlice = createSlice({
  name: "characters",
  initialState: {
    page: 0,

    items: [],
    error: null,

    status: "idle",
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [getCharacters.pending]: state => {
      state.status = "loading";
    },
    [getCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];

      state.status = "succeeded";

      state.page += 1;

      if (action.payload.length < 10) {
        state.hasNextPage = false;
      }
    },
    [getCharacters.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export default characterSlice.reducer;
