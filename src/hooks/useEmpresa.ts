import { useEmpresaActions } from "@/store/slices/EmpresaSlice";
import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useEmpresa = () => {
  const { currentEmpresa } = useSelector(
    (state: RootState) => state.EmpresaSlice
  );

  const { handleSetEmpresa, handleClearEmpresa } =
    useEmpresaActions();

  return {
    currentEmpresa,
    handleSetEmpresa,
    handleClearEmpresa
  };
};

export default useEmpresa;
