import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { CategoriaList } from "@/types/categoria";

export const CategoriaService = createApi({
  reducerPath: "CategoriaService",
  baseQuery: baseQuery,
  tagTypes: ["Categorias"],
  endpoints: (builder) => ({
    listarCategorias: builder.query({
      query: () => apiRoutes.listarCategorias(),
      providesTags: ["Categorias"],
      transformResponse(value) {
        const response = value;
        return response as CategoriaList[];
      },
    }),
    listarCategoriasDeEmpresa: builder.query({
      query: (empresaId: number) => apiRoutes.listarCategoriasDeEmpresa(empresaId),
      transformResponse(value) {
        const response = value;
        return response as CategoriaList[];
      },
    }),
    crearCategoria: builder.mutation({
      query: (data) => ({
        url: apiRoutes.crearCategoria(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Categorias"],
    }),
    deleteCategorias: builder.mutation({
      query: (data) => ({
        url: apiRoutes.deleteCategorias(),
        method: "DELETE",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Categorias"],
    }),
  }),
});

export const {
  useListarCategoriasQuery,
  useListarCategoriasDeEmpresaQuery,
  useCrearCategoriaMutation,
  useDeleteCategoriasMutation
} = CategoriaService;
