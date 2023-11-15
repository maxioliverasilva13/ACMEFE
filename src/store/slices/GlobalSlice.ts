'use client'

import { ProductoList } from "@/types/productoList";
import { handleGetToken, handleStorageToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import { handleGetToken, handleStorageToken } from "utils/userUtils";

const initialState: {
  userInfo: any;
  token: string | undefined,
  loading: boolean,
  selectedProduct?: ProductoList,
} = {
  userInfo: null,
  token: handleGetToken() ?? "",
  loading: false,
  selectedProduct: undefined,
};

export const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    setToken(state, { payload }) {
      state.token = payload;
    },
    setLoading(state, {payload}) {
      state.loading = payload;
    },
    setProductoToEdit(state, {payload}) {
      state.selectedProduct = payload;
    },
  },
});

export const useGlobalActions = () => {
  const dispatch = useDispatch();

  const handleSetUserInfo = (userInfo: any) => {
    dispatch(GlobalSlice.actions.setUserInfo(userInfo));
  };

  const handleSetToken = (token: any) => {
    handleStorageToken(token);
    dispatch(GlobalSlice.actions.setToken(token));
  };

  const handleSetLoading = (loading: boolean) => {
    dispatch(GlobalSlice.actions.setLoading(loading));
  };

  const handleSetProductoToEdit = (prod: any) => {
    dispatch(GlobalSlice.actions.setProductoToEdit(prod));
  };

  return {
    handleSetUserInfo,
    handleSetToken,
    handleSetLoading,
    handleSetProductoToEdit
  };
};

export default GlobalSlice.reducer;
