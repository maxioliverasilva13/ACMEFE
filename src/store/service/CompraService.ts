import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const CompraService = createApi({
  reducerPath: "CompraService",
  baseQuery: baseQuery,
  tagTypes: ["CompraInfo"],
  endpoints: (builder) => ({
    getById : builder.query({
        query: (id:number) => {
            return apiRoutes.obtenerDetalleCompra(id);
        },
        transformResponse(value) {
            const response = value;
            return response as any;
        },
    }),
    getMisCompras:  builder.query({
        query: () => {
            return apiRoutes.getMisCompras()
        },
        transformResponse(value) {
            const response = value;
            return response;
        },
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
    }),
  })
});

export const {
  useGetByIdQuery,
  useGetMisComprasQuery,
  useActualizarCompraEstadoMutation

} =  CompraService;
