import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Empresa } from "@/types/empresa";
import { EstadisticasAdmin, EstadisticasEmpresa, EstadisticasSort } from "@/types/estadisticas";

export const EstadisticasService = createApi({
  reducerPath: "EstadisticasService",
  baseQuery: baseQuery,
  tagTypes: ["Estadisticas", "EstadisticasAdmin", "EstadisticasEmpresa"],
  endpoints: (builder) => ({
    listarEstadsiticasSort: builder.query({
      providesTags: ["Estadisticas"],
      query: () => {
        return apiRoutes.listarEstadisticasSort();
      },
      transformResponse(value) {
        const response = value;
        return response as EstadisticasSort;
      },
    }),
    listarEstadisticasAdmin: builder.query({
      providesTags: ["EstadisticasAdmin"],
      query: () => {
        return apiRoutes.listarEstadisticasAdmin();
      },
      transformResponse(value) {
        const response = value;
        return response as EstadisticasAdmin;
      },
    }),
    listarEstadisticasEmpresa: builder.query({
      providesTags: ["EstadisticasEmpresa"],
      query: () => {
        return apiRoutes.listarEstadisticasEmpresa();
      },
      transformResponse(value) {
        const response = value;
        return response as EstadisticasEmpresa;
      },
    }),
  }),
});

export const {
  useListarEstadsiticasSortQuery,
  useListarEstadisticasAdminQuery,
  useListarEstadisticasEmpresaQuery,
} = EstadisticasService;
