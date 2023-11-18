import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useGlobal = () => {
  const { userInfo, loading, token, query, selectedProduct } = useSelector(
    (state: RootState) => state.GlobalSlice
  );

  const {
    handleSetLoading,
    handleSetToken,
    handleSetUserInfo,
    handleSetProductoToEdit,
    handleSetQuery,
  } = useGlobalActions();

  return {
    userInfo,
    loading,
    token,
    handleSetLoading,
    handleSetToken,
    handleSetUserInfo,
    handleSetProductoToEdit,
    selectedProduct,
    handleSetQuery,
    query,
  };
};

export default useGlobal;
