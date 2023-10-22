import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { CategoriaList } from "@/types/categoria";

export const ProductoService = createApi({
  reducerPath: "ProductoService",
  baseQuery: baseQuery,
  tagTypes: ["Productos"],
  endpoints: (builder) => ({
    crearProducto: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "POST",
          url: apiRoutes.crearProducto(),
        };
      },
      invalidatesTags: ["Productos"],
      transformResponse(value) {
        const response = value;
        return response as CategoriaList[];
      },
    }),
  }),
});

export const { useCrearProductoMutation } = ProductoService;
