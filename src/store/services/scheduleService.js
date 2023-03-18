import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../hhtp";

// Define a service using a base URL and expected endpoints
export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getScheduleByName: builder.query({
      query: (name) => `/schedule/get`,
    }),
  }),
});

export const { useGetScheduleByNameQuery } = scheduleApi;
