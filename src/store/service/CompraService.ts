import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const CompraService = createApi({
  reducerPath: "CompraService",
  baseQuery: baseQuery,
  tagTypes: ["CompraInfo", "Compras"],
  endpoints: (builder) => ({
    getById: builder.query({
      query: (id: number) => {
        return apiRoutes.obtenerDetalleCompra(id);
      },
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      providesTags: ["CompraInfo"]
    }),
    getMisCompras: builder.query({
      query: () => {
        return apiRoutes.getMisCompras()
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
      providesTags: ["Compras"]
    }),

    actualizarCompraEstado: builder.mutation({
      query: (id) => ({
        url: apiRoutes.actualizarEstadoCompra(id),
        method: "POST",
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Compras"]
    }),
  })
});

export const {
  useGetByIdQuery,
  useGetMisComprasQuery,
  useActualizarCompraEstadoMutation

} = CompraService;
