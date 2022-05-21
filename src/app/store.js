import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../state/authSlice";
import createEventReducer from "../state/createEventSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    createEvent: createEventReducer,
  },
});
