import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Empresa } from "@/types/empresa";
import { EstadisticasSort } from "@/types/estadisticas";

export const EstadisticasService = createApi({
  reducerPath: "EstadisticasService",
  baseQuery: baseQuery,
  tagTypes: ["Estadisticas"],
  endpoints: (builder) => ({
    listarEstadsiticasSort : builder.query({
      providesTags: ["Estadisticas"],
      query: () => {
        return apiRoutes.listarEstadisticasSort();
      },
      transformResponse(value) {
        const response = value;
        return response as EstadisticasSort;
      },
    }),
  }),
});

export const {
  useListarEstadsiticasSortQuery,
} =  EstadisticasService;
