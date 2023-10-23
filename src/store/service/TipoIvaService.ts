import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { TipoIva } from "@/types/tipoIva";
import { TipoIvaLIst } from "@/types/productoList";

export const TipoIvaService = createApi({
  reducerPath: "TipoIvaService",
  baseQuery: baseQuery,
  tagTypes: ["TiposIva", "TipoIvaInfo"],
  endpoints: (builder) => ({
    listarTiposIva: builder.query({
      providesTags: ["TiposIva"],
      query: () => apiRoutes.listarTiposIva(),
      transformResponse(value) {
        const response = value;
        return response as TipoIva[];
      },
    }),
    createTipoIva: builder.mutation({
      query: (data) => ({
        url: apiRoutes.listarTiposIva(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as TipoIvaLIst;
      },
      invalidatesTags: ["TiposIva"],
    }),
    updateTipoIva: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "PUT",
          url: apiRoutes.tipoIVAById(data?.id),
        };
      },
      invalidatesTags: ["TiposIva", "TipoIvaInfo"],
      transformResponse(value) {
        const response = value;
        return response as TipoIvaLIst;
      },
    }),
    getTipoIvaById: builder.query({
      query: (tivaId: number) => apiRoutes.tipoIVAById(tivaId),
      transformResponse(value) {
        const response = value;
        return response as TipoIvaLIst;
      },
      providesTags: ["TipoIvaInfo"],
    }),
    deleteTipoIva: builder.mutation({
      query: (tivaId: number) => ({
        url: apiRoutes.tipoIVAById(tivaId),
        method: "DELETE",
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["TiposIva", "TipoIvaInfo"],
    }),
  }),
});

export const {
  useListarTiposIvaQuery,
  useLazyListarTiposIvaQuery,
  useCreateTipoIvaMutation,
  useGetTipoIvaByIdQuery,
  useDeleteTipoIvaMutation,
} = TipoIvaService;
