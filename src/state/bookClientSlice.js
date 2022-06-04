import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  event: {},
  seatList: [],
  snacksList: {
    pepsi: {
      url: "https://www.seekpng.com/png/detail/75-757278_soda-cans-png-image-royalty-free-download-cold.png",
      label: "Soft Drink",
      price: 3.0,
      quantity: 0,
    },
    popcorn: {
      url: "https://banner2.cleanpng.com/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
      label: "Popcorn",
      price: 3.5,
      quantity: 0,
    },
    snickers: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRBd-IAK3cI1yeVTpHBBa87FjEz__x0zGg&usqp=CAU",
      label: "Chocolate",
      price: 2.0,
      quantity: 0,
    },
  },
};

export const bookClientSlice = createSlice({
  name: "bookClient",
  initialState,

  reducers: {
    clear: (state) => {
      state.name = "";
      state.event = {};
      state.seatList = [];
      // set the quantity of each snack to 0
      for (const [snack, _] of Object.entries(state.snacksList)) {
        state.snacksList[snack].quantity = 0;
      }
    },
    clearAndSetEvent: (state, action) => {
      state.name = "";
      state.event = action.payload;
      state.seatList = [];
      // set the quantity of each snack to 0
      for (const [snack, _] of Object.entries(state.snacksList)) {
        state.snacksList[snack].quantity = 0;
      }
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    addSeat: (state, action) => {
      const { rowKey, index } = action.payload;

      const newSeats = Object.assign(state.seatList);
      newSeats.push({ rowKey, index });
      state.seatList = newSeats;
    },
    removeSeat: (state, action) => {
      const { rowKey, index } = action.payload;

      const newSeats = state.seatList.filter(
        (e) => !(e.rowKey === rowKey && e.index === index)
      );

      state.seatList = newSeats;
    },
    addSnack: (state, action) => {
      const { snack } = action.payload;

      const current = state.snacksList[snack].quantity;

      if (current <= 100) {
        state.snacksList[snack].quantity += 1;
      }
    },
    removeSnack: (state, action) => {
      const { snack } = action.payload;

      const current = state.snacksList[snack].quantity;

      if (current > 0) {
        state.snacksList[snack].quantity -= 1;
      }
    },
    setSnacksList: (state, action) => {
      state.snacksList = action.payload;
    },
  },
});

export const {
  clear,
  clearAndSetEvent,
  setName,
  setEvent,
  addSeat,
  removeSeat,
  addSnack,
  removeSnack,
  setSnacksList,
} = bookClientSlice.actions;

export const selectName = (state) => state.bookClient.name;
export const selectEvent = (state) => state.bookClient.event;
export const selectSeatList = (state) => state.bookClient.seatList;
export const selectSnacksList = (state) => state.bookClient.snacksList;
export const selectSnacksSubtotal = (state) => {
  let subtotal = 0;

  for (const [_, value] of Object.entries(selectSnacksList(state)))
    subtotal += value.price * value.quantity;

  return subtotal;
};
export const selectAll = (state) => state;

export default bookClientSlice.reducer;
