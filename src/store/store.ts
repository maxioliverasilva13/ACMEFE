import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import GlobalSlice from "@/store/slices/GlobalSlice";
import { UserService } from "./service/UserService";
import { EmpresaService } from "./service/EmpresaService";
import { CategoriaService } from "./service/CategoriaService";
import { TipoIvaService } from "./service/TipoIvaService";
import { PikcupService } from "./service/PickupService";

const store = configureStore({
  reducer: {
    GlobalSlice,
    [UserService.reducerPath]: UserService.reducer,
    [EmpresaService.reducerPath]: EmpresaService.reducer,
    [PikcupService.reducerPath] : PikcupService.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserService.middleware,EmpresaService.middleware, PikcupService.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;  

export default store;
