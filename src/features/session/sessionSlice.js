import { createAction, createSlice } from "@reduxjs/toolkit";
// import { instance } from "../../axiosInstance/axiosInstance";
import { revertAll } from "../actions";

import Cookies from "js-cookie";

const initialState = {
  user: JSON.parse(Cookies.get("user") || "{}"),
  isLoggedIn: Cookies.get("isLoggedIn") === "true",
};

const clearedState = {
  user: {},
  isLoggedIn: false,
};
export const logOut = createAction("session/logout", () => {
  Cookies.remove("user");
  Cookies.remove("isLoggedIn");
});

// const fetchUserDetails = createAsyncThunk(
//   "session/fetchUserDetails",
//   async (email) => {
//     const response = await instance.get(`user?email=${email}`);
//     return response.data;
//   }
// );

// const addNewUser = createAsyncThunk("session/addUser", async (data) => {
//   const response = instance.post(`users/add`, data);
//   return response.data;
// });

// const useLogin = createAsyncThunk("session/userLogin", async (data) => {
//   const response = instance.post(`auth/login`, data);
//   return response.data;
// });

export const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    editUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => clearedState);
  },
});

export const selectCurrentUser = (state) => state.session.user;
export const selectIsLoggedIn = (state) => state.session.isLoggedIn;
export const { signIn, editUser } = sessionSlice.actions;
export default sessionSlice.reducer;
