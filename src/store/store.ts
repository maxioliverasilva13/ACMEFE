import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import GlobalSlice from "@/store/slices/GlobalSlice";
import { UserService } from "./service/UserService";

const store = configureStore({
  reducer: {
    GlobalSlice,
    [UserService.reducerPath]: UserService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
