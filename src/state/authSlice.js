import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: JSON.parse(localStorage.getItem("id")) || null,
};

// const defaultState = JSON.parse(
//   localStorage.getItem('id')
// ) || {id:};

export const authSlices = createSlice({
  name: "auth",
  initialState,

  // business logic
  reducers: {
    login: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.id = null;
      localStorage.setItem("id", JSON.stringify(null));
    },
  },
});

export const { login, logout } = authSlices.actions;

export const selectId = (state) => state.auth.id;

export default authSlices.reducer;
