import useCarrito from "@/hooks/useCarrito";
import useEmpresa from "@/hooks/useEmpresa";
import useGlobal from "@/hooks/useGlobal";
import {
  useLazyObtenerCarritoQuery,
  useObtenerCarritoQuery,
} from "@/store/service/CarritoService";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  children: any;
}

const CarritoWrapper = ({ children }: Props) => {
  const { handleSetLoading } = useGlobal();
  const { currentEmpresa } = useEmpresa();
  const { handleSetProductos } = useCarrito();

  const { data: productosLineas, isLoading: isLoadingLineas } =
    useObtenerCarritoQuery(
      {
        empresaId: currentEmpresa?.id,
      },
      {
        skip: !currentEmpresa?.id,
      }
    );

  useEffect(() => {
    handleSetLoading(isLoadingLineas);
  }, [isLoadingLineas]);

  useEffect(() => {
    if (productosLineas) {
      handleSetProductos(productosLineas);
    }
  }, [productosLineas]);

  return children;
};

export default CarritoWrapper;
