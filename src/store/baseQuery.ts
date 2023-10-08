import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { prepareHeaders } from "../utils/prepareHeaders";

export const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:5000/",
    prepareHeaders,
  });