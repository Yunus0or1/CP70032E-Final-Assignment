import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../state/authSlice";
import createEventReducer from "../state/createEventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createEvent: createEventReducer,
  },
});
