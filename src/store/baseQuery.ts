import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { prepareHeaders } from "../utils/prepareHeaders";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders,
  });