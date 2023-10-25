'use client'

import { Empresa } from "@/types/empresa";
import { ProductoList } from "@/types/productoList";
import { handleGetToken, handleStorageToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import { handleGetToken, handleStorageToken } from "utils/userUtils";

const initialState: {
  currentEmpresa: Empresa | undefined;
} = {
  currentEmpresa: undefined,
};

export const EmpresaSlice = createSlice({
  name: "emrpesa",
  initialState,
  reducers: {
    setEmpresa(state, { payload }) {
      state.currentEmpresa = payload;
    },
    clearEmpresa(state) {
      state.currentEmpresa = undefined;
    },
  },
  extraReducers: {},
});

export const useEmpresaActions = () => {
  const dispatch = useDispatch();

  const handleSetEmpresa = (empresa: Empresa) => {
    dispatch(EmpresaSlice.actions.setEmpresa(empresa));
  };

  const handleClearEmpresa = () => {
    dispatch(EmpresaSlice.actions.clearEmpresa());
  };

  return {
    handleSetEmpresa,
    handleClearEmpresa,
  };
};

export default EmpresaSlice.reducer;
