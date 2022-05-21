import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const authSlices = createSlice({
  name: "auth",
  initialState,

  // business logic
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
    },
  },
});

export const { login, logout } = authSlices.actions;

export const selectUser = (state) => state.auth.user;

export default authSlices.reducer;
