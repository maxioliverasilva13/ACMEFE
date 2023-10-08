import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQuery,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: apiRoutes.register(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: apiRoutes.login(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
    currentUser: builder.query({
      query: () => apiRoutes.currentUser(),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
    loginWithExternalService: builder.mutation({
      query: (data) => ({
        url: apiRoutes.loginUserWithExternalService(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyCurrentUserQuery,
  useLoginWithExternalServiceMutation,
} = UserService;
