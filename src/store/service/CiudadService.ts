import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Ciudad } from "@/types/ciudad";

export const CiudadService = createApi({
  reducerPath: "CiudadService",
  baseQuery: baseQuery,
  tagTypes: ["Ciudades", "CiudadInfo"],
  endpoints: (builder) => ({
    listarCiudades: builder.query({
      providesTags: ["Ciudades"],
      query: () => apiRoutes.listOrCreateCiudad(),
      transformResponse(value) {
        const response = value;
        return response as Ciudad[];
      },
    }),
    createCiudad: builder.mutation({
      query: (data) => ({
        url: apiRoutes.listOrCreateCiudad(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as Ciudad;
      },
      invalidatesTags: ["Ciudades"],
    }),
    updateCiudad: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "PUT",
          url: apiRoutes.ciudadById(data?.id),
        };
      },
      invalidatesTags: ["Ciudades", "CiudadInfo"],
      transformResponse(value) {
        const response = value;
        return response as Ciudad;
      },
    }),
    getCiudadById: builder.query({
      query: (dptoId: number) => apiRoutes.ciudadById(dptoId),
      transformResponse(value) {
        const response = value;
        return response as Ciudad;
      },
      providesTags: ["CiudadInfo"],
    }),
    deleteCiudad: builder.mutation({
      query: (cId: number) => ({
        url: apiRoutes.ciudadById(cId),
        method: "DELETE",
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
      invalidatesTags: ["Ciudades", "CiudadInfo"],
    }),
  }),
});

export const {
  useLazyListarCiudadesQuery,
  useCreateCiudadMutation,
  useGetCiudadByIdQuery,
  useDeleteCiudadMutation,
} = CiudadService;
