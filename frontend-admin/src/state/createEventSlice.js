import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  dateTime: new Date().toISOString(),
  duration: 60,
  venues: {},
  price: 13,
};

export const createEventSlice = createSlice({
  name: "createEvent",
  initialState,

  // business logic
  reducers: {
    reset: (state) => {
      // when user wants to make another event
      state.name = "";
      state.dateTime = new Date().toISOString();
      state.duration = 60;
      state.venues = {};
      state.price = 13;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    updateDuration: (state, action) => {
      state.duration = action.payload;
    },
    addVenue: (state, action) => {
      // the payload requires 1) key string, 2) value object
      let _venues = Object.assign(state.venues);
      _venues[action.payload.key] = action.payload.value;
      state.venues = _venues;
    },
    deleteVenue: (state, action) => {
      // the payload needs to be the key only
      let _venues = Object.assign(state.venues);
      delete _venues[action.payload];
      state.venues = _venues;
    },
    updatePrice: (state, action) => {
      state.price = parseFloat(action.payload);
    },
  },
});

export const {
  reset,
  updateName,
  updateDateTime,
  updateDuration,
  addVenue,
  deleteVenue,
  updatePrice,
} = createEventSlice.actions;

export const selectAll = (state) => state.createEvent;
export const selectName = (state) => state.createEvent.name;
export const selectDateTime = (state) => {
  // removing seconds so it doesn't look dodgy 🤓
  var date = new Date(state.createEvent.dateTime);
  date.setSeconds(0, 0);
  return date.toISOString();
};
export const selectDuration = (state) => state.createEvent.duration;
export const selectVenues = (state) => state.createEvent.venues;
export const selectPrice = (state) => state.createEvent.price;

export default createEventSlice.reducer;
