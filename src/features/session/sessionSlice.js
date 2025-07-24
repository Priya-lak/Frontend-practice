import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isLoggenIn: false,
    email: "",
  },
  reducers: {
    createSession: (state, action) => {
      state.isLoggenIn = true;
      state.email = action.payload.email;
    },
    endSession: (state) => {
      initialState;
    },
  },
});
