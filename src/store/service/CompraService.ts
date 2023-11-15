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
            return response;
        },
    })
  })
});

export const {
  useGetByIdQuery,
  
 
} =  CompraService;
