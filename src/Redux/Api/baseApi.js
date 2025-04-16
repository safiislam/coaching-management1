import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API base query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  // baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  prepareHeaders: (headers, { getState }) => {
    // Get the token from Redux state
    const { token } = getState()?.auth;
    if (token) {
      headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});

// Create API service
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [
    "course",
    "class",
    "user",
    "student",
    "event",
    "batch",
    "subject",
    "schedule",
    "payment",
    "enroll",
    "agreement",
    "quiz",
    "exam",
    "submission",
    "modification",
    "banner",
    "syllabus",
  ],
  endpoints: () => ({}), // Define endpoints in specific slices
});
