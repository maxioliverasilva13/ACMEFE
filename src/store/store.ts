import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import GlobalSlice from "@/store/slices/GlobalSlice";
import EmpresaSlice from "@/store/slices/EmpresaSlice";
import CarritoSlice from "@/store/slices/CarritoSlice";
import { UserService } from "./service/UserService";
import { EmpresaService } from "./service/EmpresaService";
import { CategoriaService } from "./service/CategoriaService";
import { TipoIvaService } from "./service/TipoIvaService";
import { PikcupService } from "./service/PickupService";
import { ProductoService } from "./service/ProductoService";
import { DepartamentoService } from "./service/DepartamentoService";
import { CiudadService } from "./service/CiudadService";
import { ReclamoService } from "./service/ReclamoService";
import { CompraService } from "./service/CompraService";
import { EstadisticasService } from "./service/EstadisticasService";
import { CarritoService } from "./service/CarritoService";


const store = configureStore({
  reducer: {
    GlobalSlice,
    EmpresaSlice,
    CarritoSlice,
    [UserService.reducerPath]: UserService.reducer,
    [EmpresaService.reducerPath]: EmpresaService.reducer,
    [PikcupService.reducerPath] : PikcupService.reducer,
    [CategoriaService.reducerPath]: CategoriaService.reducer,
    [TipoIvaService.reducerPath]: TipoIvaService.reducer,
    [ProductoService.reducerPath]: ProductoService.reducer,
    [DepartamentoService.reducerPath]: DepartamentoService.reducer,
    [CiudadService.reducerPath]: CiudadService.reducer,
    [ReclamoService.reducerPath] : ReclamoService.reducer,
    [CompraService.reducerPath] : CompraService.reducer,
    [EstadisticasService.reducerPath] : EstadisticasService.reducer,
    [CarritoService.reducerPath] : CarritoService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserService.middleware, CategoriaService.middleware, ProductoService.middleware, TipoIvaService.middleware, DepartamentoService.middleware, CiudadService.middleware,PikcupService.middleware,ReclamoService.middleware,EmpresaService.middleware, EstadisticasService.middleware, CarritoService.middleware, CompraService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;  

export default store;
