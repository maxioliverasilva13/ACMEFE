import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { Empresa } from "@/types/empresa";

export const EmpresaService = createApi({
  reducerPath: "EmpresaService",
  baseQuery: baseQuery,
  tagTypes: ["EmpresaInfo", "Empresas"],
  endpoints: (builder) => ({
    listEmpresas: builder.query({
      providesTags: ["Empresas"],
      query: () => {
        return apiRoutes.listEmpresas();
      },
      transformResponse(value) {
        const response = value;
        return response as Empresa[];
      },
    }),
    GetEmpresaById: builder.query({
      query: (id: number) => {
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
      invalidatesTags: ["Empresas"],
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
      invalidatesTags: ["EmpresaInfo", "Empresas"],
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
    editLookAndFeel: builder.mutation({
      query: (data) => ({
        url: apiRoutes.editLookAndFeel(),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Empresas", "EmpresaInfo"],
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
  useLazyGetEmpresaByIdQuery,
  useListEmpresasQuery,
  useListVentasByEmpresaQuery,
  useCreateEmpresaMutation,
  useDeleteEmpresasMutation,
  useEditLookAndFeelMutation
 
} =  EmpresaService;
