import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [],
  snacks: {
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

export const bookSlice = createSlice({
  name: "book",
  initialState,

  // business logic
  reducers: {
    addSeat: (state, action) => {
      const { rowKey, index } = action.payload;

      const newSeats = Object.assign(state.seats);
      newSeats.push({ rowKey, index });
      state.seats = newSeats;
    },
    removeSeat: (state, action) => {
      const { rowKey, index } = action.payload;

      const newSeats = state.seats.filter(
        (e) => !(e.rowKey === rowKey && e.index === index)
      );

      state.seats = newSeats;
    },
    addSnack: (state, action) => {
      const { snack } = action.payload;

      const current = state.snacks[snack].quantity;

      if (current <= 100) {
        state.snacks[snack].quantity += 1;
      }
    },
    removeSnack: (state, action) => {
      const { snack } = action.payload;

      const current = state.snacks[snack].quantity;

      if (current > 0) {
        state.snacks[snack].quantity -= 1;
      }
    },
    clear: (state) => {
      state.seats = [];

      // set the quantity of each snack to 0
      for (const [snack, _] of Object.entries(state.snacks)) {
        state.snacks[snack].quantity = 0
      }
    },
  },
});

export const { addSeat, removeSeat, addSnack, removeSnack, clear } =
  bookSlice.actions;

export const selectSeats = (state) => state.book.seats;
export const selectSnacks = (state) => state.book.snacks;
export const selectSnacksSubtotal = (state) => {
  let subtotal = 0;

  for (const [_, value] of Object.entries(selectSnacks(state)))
    subtotal += value.price * value.quantity;

  return subtotal;
}

export default bookSlice.reducer;
