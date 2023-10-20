import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useGlobal = () => {
  const { userInfo, loading, token, selectedProduct } = useSelector(
    (state: RootState) => state.GlobalSlice
  );

  const { handleSetLoading, handleSetToken, handleSetUserInfo, handleSetProductoToEdit } =
    useGlobalActions();

  return {
    userInfo,
    loading,
    token,
    handleSetLoading,
    handleSetToken,
    handleSetUserInfo,
    handleSetProductoToEdit,
    selectedProduct
  };
};

export default useGlobal;
