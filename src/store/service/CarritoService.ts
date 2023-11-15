import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const CarritoService = createApi({
  reducerPath: "CarritoService",
  baseQuery: baseQuery,
  tagTypes: ["Carrito"],
  endpoints: (builder) => ({
    agregarProductoACarrito: builder.mutation({
      query: (data) => ({
        url: apiRoutes.agregarProductoCarrito(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Carrito"],
    }),
    obtenerCarrito: builder.query({
      query: (data) => apiRoutes.obtenerCarrito(data?.empresaId),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      providesTags: ["Carrito"],
    }),
    borrarLinea: builder.mutation({
      query: (lineaId: number) => ({
        url: `${apiRoutes.borrarLinea()}?LineaId=${lineaId}`,
        method: "DELETE",
        body: {},
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Carrito"],
    }),
  }),
});

export const {
  useAgregarProductoACarritoMutation,
  useLazyObtenerCarritoQuery,
  useBorrarLineaMutation,
  useObtenerCarritoQuery,
} = CarritoService;
