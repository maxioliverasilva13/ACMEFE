import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { TipoIva } from "@/types/tipoIva";

export const TipoIvaService = createApi({
  reducerPath: "TipoIvaService",
  baseQuery: baseQuery,
  tagTypes: ["TiposIva"],
  endpoints: (builder) => ({
    listarTiposIva: builder.query({
      providesTags: ["TiposIva"],
      query: () => apiRoutes.listarTiposIva(),
      transformResponse(value) {
        const response = value;
        return response as TipoIva[];
      },
    }),
  }),
});

export const {
  useListarTiposIvaQuery,
} = TipoIvaService;
