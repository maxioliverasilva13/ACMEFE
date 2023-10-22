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
      transformResponse(value) {
        const response = value;
        return response as CategoriaList[];
      },
    }),
  }),
});

export const {
  useListarCategoriasQuery,
} = CategoriaService;
