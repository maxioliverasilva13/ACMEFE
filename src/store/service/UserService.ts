import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { DireccionDetail } from "@/types/direccion";

export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQuery,
  tagTypes: ["UserInfo", "ListUsers", "UserDirecciones"],
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
    updateUser: builder.mutation({
      query: (data) => ({
        url: apiRoutes.listOrCreateUsers(),
        method: "PUT",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["ListUsers", "UserInfo"],
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
    listarDirecciones: builder.query({
      query: () => apiRoutes.listarDirecciones(),
      transformResponse(value) {
        const response = value;
        return response as DireccionDetail[];
      },
      providesTags: ["UserDirecciones"],
    },
    ),
    agregarDireccion: builder.mutation({
      query: (data) => ({
        url: apiRoutes.agregarDireccion(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["UserDirecciones", "UserInfo"],
    }),
    modificarDireccion: builder.mutation({
      query: (data) => ({
        url: apiRoutes.modificarDireccion(),
        method: "PUT",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["UserDirecciones", "UserInfo"],
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
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyListUsersQuery,
  useLazyListarDireccionesQuery,
  useAgregarDireccionMutation,
  useModificarDireccionMutation,
} = UserService;
