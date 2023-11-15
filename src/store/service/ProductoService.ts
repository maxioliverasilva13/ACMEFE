import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { apiRoutes } from "@/utils/apiRoutes";
import { CategoriaList } from "@/types/categoria";
import { appRoutes } from "@/utils/appRoutes";
import { ProductoList } from "@/types/productoList";

export const ProductoService = createApi({
  reducerPath: "ProductoService",
  baseQuery: baseQuery,
  tagTypes: ["Productos", "ProductoInfo", "ProductosRel"],
  endpoints: (builder) => ({
    crearProducto: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "POST",
          url: apiRoutes.crearProducto(),
        };
      },
      invalidatesTags: ["Productos"],
      transformResponse(value) {
        const response = value;
        return response as CategoriaList[];
      },
    }),
    listarMisProductosEmpresa: builder.query({
      providesTags: ["Productos"],
      query: () => apiRoutes.listarMisProductosEmpresa(),
      transformResponse(value) {
        const response = value;
        return response as ProductoList[];
      },
    }),
    listarProductosByEmpresa: builder.query({
      providesTags: ["Productos"],
      query: (empresaId: number) => apiRoutes.listarProductosByEmpresa(empresaId),
      transformResponse(value) {
        const response = value;
        return response as ProductoList[];
      },
    }),
    obtenerProductoById: builder.query({
      providesTags: ["ProductoInfo"],
      query: (prodId: number) => apiRoutes.productoById(prodId),
      transformResponse(value) {
        const response = value;
        return response as ProductoList;
      },
    }),
    obtenerProductosRelacionados: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "POST",
          url: apiRoutes.productosRelacionados(),
        };
      },
      invalidatesTags: ["ProductosRel"],
      transformResponse(value) {
        const response = value;
        return response as ProductoList[];
      },
    }),
    disableProductoById: builder.mutation({
      invalidatesTags: ["ProductoInfo", "Productos"],
      query: (prodId: number) => ({
        url: apiRoutes.deleteProductoById(prodId),
        method: "DELETE",
        data: {},
      }),
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
    editProducto: builder.mutation({
      query: (data) => {
        return {
          body: data,
          method: "POST",
          url: apiRoutes.updateProducto(),
        };
      },
      invalidatesTags: ["Productos", "ProductoInfo"],
      transformResponse(value) {
        const response = value;
        return response as any;
      },
    }),
  }),
});

export const {
  useCrearProductoMutation,
  useListarMisProductosEmpresaQuery,
  useObtenerProductoByIdQuery,
  useDisableProductoByIdMutation,
  useEditProductoMutation,
  useListarProductosByEmpresaQuery,
  useObtenerProductosRelacionadosMutation,
} = ProductoService;
