import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Reclamo } from "@/types/reclamo";

export const ReclamoService = createApi({
  reducerPath: "ReclamoService",
  baseQuery: baseQuery,
  tagTypes: ["ReclamoInfo"],
  endpoints: (builder) => ({
    listarReclamos: builder.query({
      providesTags: ["ReclamoInfo"],
      query: () => apiRoutes.listarReclamos(),
      transformResponse(value) {
        const response = value;
        return response as Reclamo[]
      },
    })
  }),
});

export const {
  useListarReclamosQuery
} = ReclamoService
