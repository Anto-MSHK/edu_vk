import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../hhtp";

// Define a service using a base URL and expected endpoints
export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getScheduleByName: builder.query({
      query: () => `/schedule/get`,
      transformResponse: (response) => {
        const sortedResponse = [...response]
        sortedResponse.forEach(item => {
          if (typeof item !== 'undefined') {
            item.days.sort((a, b) => a.count - b.count)
            item.days.forEach(day => {
              day.lessons.sort((a, b) => a.count - b.count)
            })
          }
        });
        console.log('sorted')
        console.log(sortedResponse)
        return sortedResponse
      },
    }),
  }),
});

export const { useGetScheduleByNameQuery } = scheduleApi;
