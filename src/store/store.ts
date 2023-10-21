import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import GlobalSlice from "@/store/slices/GlobalSlice";
import { UserService } from "./service/UserService";
import { CategoriaService } from "./service/CategoriaService";
import { TipoIvaService } from "./service/TipoIvaService";
import { ProductoService } from "./service/ProductoService";
import { DepartamentoService } from "./service/DepartamentoService";
import { CiudadService } from "./service/CiudadService";

const store = configureStore({
  reducer: {
    GlobalSlice,
    [UserService.reducerPath]: UserService.reducer,
    [CategoriaService.reducerPath]: CategoriaService.reducer,
    [TipoIvaService.reducerPath]: TipoIvaService.reducer,
    [ProductoService.reducerPath]: ProductoService.reducer,
    [DepartamentoService.reducerPath]: DepartamentoService.reducer,
    [CiudadService.reducerPath]: CiudadService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserService.middleware, CategoriaService.middleware, ProductoService.middleware, TipoIvaService.middleware, DepartamentoService.middleware, CiudadService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
