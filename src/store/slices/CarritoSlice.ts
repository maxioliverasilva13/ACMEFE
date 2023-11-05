"use client";

import { CarritoList } from "@/types/productoList";
import { handleStorageToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import { handleGetToken, handleStorageToken } from "utils/userUtils";

const initialState: {
  shippingMethod?: "DOMICILIO" | "ENVIO";
  productos: CarritoList[];
  selectedSucursalId?: number;
  selectedAddressId?: number;
  paymentMethod?: "CARD" | "WALLET";
  paymentInfo?: any;
} = {
  shippingMethod: undefined,
  productos: [],
  selectedSucursalId: undefined,
  selectedAddressId: undefined,
  paymentMethod: undefined,
  paymentInfo: {},
};

export const CarritoSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setProductos(state, { payload }) {
      state.productos = payload;
    },
    setShippingMethod(state, { payload }) {
      state.shippingMethod = payload;
    },
    setPaymentMethod(state, { payload }) {
      state.paymentMethod = payload;
    },
    setSelectedSucursalId(state, { payload }) {
      state.selectedSucursalId = payload;
    },
    setSelectedDireccionId(state, { payload }) {
      state.selectedAddressId = payload;
    },
    setPaymentInfo(state, { payload }) {
      state.paymentInfo = payload;
    },
  },
  extraReducers: {},
});

export const useCarritoActions = () => {
  const dispatch = useDispatch();

  const handleSetProductos = (productos: any) => {
    dispatch(CarritoSlice.actions.setProductos(productos));
  };

  const handleSetShippingMethod = (method: "DOMICILIO" | "ENVIO") => {
    dispatch(CarritoSlice.actions.setShippingMethod(method));
  };

  const handleSetSelectedSucursalId = (sucursalId: number) => {
    dispatch(CarritoSlice.actions.setSelectedSucursalId(sucursalId));
  };

  const handleSetSelectedAddressId = (addressId: number) => {
    dispatch(CarritoSlice.actions.setSelectedDireccionId(addressId));
  };

  const handleSetPaymentMethod = (method: "CARD" | "WALLET") => {
    dispatch(CarritoSlice.actions.setPaymentMethod(method));
  };

  const handleSetPaymentInfo = (info: any) => {
    dispatch(CarritoSlice.actions.setPaymentInfo(info));
  };

  return {
    handleSetProductos,
    handleSetShippingMethod,
    handleSetSelectedSucursalId,
    handleSetSelectedAddressId,
    handleSetPaymentMethod,
    handleSetPaymentInfo,
  };
};

export default CarritoSlice.reducer;
