import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  dateTime: new Date().toISOString(),
  duration: 60,
};

export const createEventSlide = createSlice({
  name: "createEvent",
  initialState,

  // business logic
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    updateDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { updateName, updateDateTime, updateDuration } = createEventSlide.actions;

export const selectName = (state) => state.createEvent.name;
export const selectDateTime = (state) => state.createEvent.dateTime;
export const selectDuration = (state) => state.createEvent.duration;

export default createEventSlide.reducer;
