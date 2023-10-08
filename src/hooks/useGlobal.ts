import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useGlobal = () => {
  const { userInfo, loading, token } = useSelector(
    (state: RootState) => state.GlobalSlice
  );

  const { handleSetLoading, handleSetToken, handleSetUserInfo } =
    useGlobalActions();

  return {
    userInfo,
    loading,
    token,
    handleSetLoading,
    handleSetToken,
    handleSetUserInfo,
  };
};

export default useGlobal;
