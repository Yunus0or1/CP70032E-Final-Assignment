import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../state/authSlice";
import createEventReducer from "../state/createEventSlice";
import bookClientReducer from "../state/bookClientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createEvent: createEventReducer,
    bookClient: bookClientReducer,
  },
});
