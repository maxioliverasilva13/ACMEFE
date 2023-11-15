import { useCarritoActions } from "@/store/slices/CarritoSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useCarrito = () => {
  const {
    productos,
    shippingMethod,
    selectedSucursalId,
    selectedAddressId,
    paymentMethod,
    paymentInfo,
    errors,
  } = useSelector((state: RootState) => state.CarritoSlice);

  const {
    handleSetProductos,
    handleSetShippingMethod,
    handleSetSelectedSucursalId,
    handleSetSelectedAddressId,
    handleSetPaymentMethod,
    handleSetPaymentInfo,
    handleSetErrors,
  } = useCarritoActions();

  return {
    productos,
    handleSetProductos,
    shippingMethod,
    handleSetShippingMethod,
    handleSetSelectedSucursalId,
    selectedSucursalId,
    handleSetSelectedAddressId,
    selectedAddressId,
    paymentMethod,
    handleSetPaymentMethod,
    handleSetPaymentInfo,
    paymentInfo,
    handleSetErrors,
    errors,
  };
};

export default useCarrito;
