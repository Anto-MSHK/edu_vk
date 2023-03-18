import { configureStore } from "@reduxjs/toolkit";
import { scheduleApi } from "./services/scheduleService";

const store = configureStore({
  reducer: {
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scheduleApi.middleware),
});

export default store;
