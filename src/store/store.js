import { configureStore } from "@reduxjs/toolkit";
import { scheduleApi } from "./services/scheduleService";
import noteReducer from './Slices/notesSlice'
const store = configureStore({
  reducer: {
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    notes: noteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scheduleApi.middleware),
});

export default store;
