import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Pickup } from "@/types/pickup";

export const PikcupService = createApi({
  reducerPath: "PickupService",
  baseQuery: baseQuery,
  tagTypes: ["PickupInfo"],
  endpoints: (builder) => ({
    listPickups : builder.query({
        query: () => {
          return apiRoutes.listarPickups()
        },
        transformResponse(value) {
          const response = value;
          return response as Pickup[];
        },
      }),
  }),
});

export const { useListPickupsQuery } =  PikcupService;
