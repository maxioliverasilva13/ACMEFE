import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Departamento } from "@/types/departamento";

export const DepartamentoService = createApi({
  reducerPath: "DepartamentoService",
  baseQuery: baseQuery,
  tagTypes: ["Departamentos", "DepartamentoInfo"],
  endpoints: (builder) => ({
    listarDepartamentos: builder.query({
      providesTags: ["Departamentos"],
      query: () => apiRoutes.listOrCreateDepartamento(),
      transformResponse(value) {
        const response = value;
        return response as Departamento[];
      },
    }),
    createDepartamento: builder.mutation({
      query: (data) => ({
        url: apiRoutes.listOrCreateDepartamento(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as Departamento;
      },
      invalidatesTags: ["Departamentos"],
    }),
    updateDepartamento: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "PUT",
          url: apiRoutes.departamentoById(data?.id),
        };
      },
      invalidatesTags: ["Departamentos", "DepartamentoInfo"],
      transformResponse(value) {
        const response = value;
        return response as Departamento;
      },
    }),
    getDepartamentoById: builder.query({
      query: (dptoId: number) => apiRoutes.departamentoById(dptoId),
      transformResponse(value) {
        const response = value;
        return response as Departamento;
      },
      providesTags: ["DepartamentoInfo"],
    }),
    deleteDepartamento: builder.mutation({
      query: (dptoId: number) => ({
        url: apiRoutes.departamentoById(dptoId),
        method: "DELETE",
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Departamentos", "DepartamentoInfo"],
    }),
  }),
});

export const {
  useLazyListarDepartamentosQuery,
  useCreateDepartamentoMutation,
  useGetDepartamentoByIdQuery,
  useDeleteDepartamentoMutation,
} = DepartamentoService;
