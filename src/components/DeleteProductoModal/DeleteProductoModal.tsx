"use client";

import toast from "react-hot-toast";import ModalDelete from "../Modal";
import useScroll from "@/hooks/useScroll";
import { useDisableProductoByIdMutation } from "@/store/service/ProductoService";
import useGlobal from "@/hooks/useGlobal";

interface Props {
  setOpen: any;
  open: any;
  productId: number;
}

const DeleteProductoModal = ({ setOpen, open, productId }: Props) => {
  const { scrollToTop } = useScroll();
  const [deleteProduct] = useDisableProductoByIdMutation();
  const { handleSetLoading } = useGlobal();

  const handleDeleteProduct = async () => {
    handleSetLoading(true);
    try {
      const resp = (await deleteProduct(productId)) as any;
      if (resp?.data?.ok) {
        setOpen(false);
        scrollToTop();
        toast.success("Producto deshabilitado correctamente");
      } else {
        throw new Error("Error al eliminar producto");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Error al eliminar producto");
    } finally {
      handleSetLoading(false);
    }
  };

  return (
    <ModalDelete
      textOk="Sí, borrar"
      textCancel="Cancelar"
      title="¿Estás seguro que deseas borrar el producto seleccionado?"
      description="Esta opción no tiene retorno, el producto prevalesera en el sistema en un estado 'desactivado', por lo tanto no podras interactuar con el mismo"
      onCloseModalDelete={() => setOpen(false)}
      show={open}
      primaryType="button"
      onConfirm={() => handleDeleteProduct()}
    />
  );
};

export default DeleteProductoModal;
