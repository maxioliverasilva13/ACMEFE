import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";

export const EmpresaService = createApi({
  reducerPath: "EmpresaService",
  baseQuery: baseQuery,
  tagTypes: ["EmpresaInfo"],
  endpoints: (builder) => ({

    listEmpresas : builder.query({
      query: () => {
        return apiRoutes.listEmpresas();
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),

    getById : builder.query({
      query: (id:number) => {
        return apiRoutes.obtenerEmpresa(id);
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),


    createEmpresa: builder.mutation({
      query: (data) => ({
        url: apiRoutes.createEmpresa(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
     
        return response as any;
      },
    }),

    deleteEmpresas: builder.mutation({
      query: (data) => ({
        url: apiRoutes.deleteEmpresas(),
        method: "POST",
        body: data,
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),

    
    listVentasByEmpresa : builder.query({
      query: () => {
        return apiRoutes.listVentasByEmpresa()
      },
      transformResponse(value) {
        const response = value; 
        return response;
      },
    }),

    


    
  }),
});

export const {
  useGetByIdQuery,
  useListEmpresasQuery,
  useListVentasByEmpresaQuery,
  useCreateEmpresaMutation,
  useDeleteEmpresasMutation,
 
} =  EmpresaService;
