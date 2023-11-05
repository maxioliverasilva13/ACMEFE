import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Pickup } from "@/types/pickup";

export const PikcupService = createApi({
  reducerPath: "PickupService",
  
  baseQuery: baseQuery,
  tagTypes: ["PickupInfo"],
  endpoints: (builder) => ({

    createPickup: builder.mutation({
      query: (data) => ({
        url: apiRoutes.crearPickup(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),

    listPickups : builder.query({
        query: () => {
          return apiRoutes.listarPickups()
        },
        transformResponse(value) {
          const response = value;
          return response as Pickup[];
        },
    }),

    listPickupsByEMpresa : builder.query({
      query: (empresaId: number) => {
        return apiRoutes.pickupsByEmpresa(empresaId)
      },
      transformResponse(value) {
        const response = value;
        return response as Pickup[];
      },
  }),

    deletePickups: builder.mutation({
      query: (data) => ({
        url: apiRoutes.deletePickups(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),

  }),
});

export const { useListPickupsQuery  , useCreatePickupMutation, useListPickupsByEMpresaQuery ,useDeletePickupsMutation } =  PikcupService;
