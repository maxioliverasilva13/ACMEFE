import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { baseQuery } from "../baseQuery";

export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQuery,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (data) => {
        return data;
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const { useGetUserQuery } = UserService;
