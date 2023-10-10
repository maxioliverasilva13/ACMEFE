import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQuery,
  tagTypes: ["UserInfo", "ListUsers"],
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
    resetPassword: builder.mutation({
      query: (data) => ({
        url: apiRoutes.resetPassword(),
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: apiRoutes.forgotPassword(),
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: apiRoutes.listOrCreateUsers(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["ListUsers"],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: apiRoutes.userById(data?.userId),
        method: "DELETE",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["ListUsers"],
    }),
    listUsers: builder.query({
      query: () => apiRoutes.listOrCreateUsers(),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      providesTags: ["ListUsers"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyCurrentUserQuery,
  useLoginWithExternalServiceMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useLazyListUsersQuery,
} = UserService;
