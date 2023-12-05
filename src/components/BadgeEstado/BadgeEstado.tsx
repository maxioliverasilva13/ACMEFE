import { EstadoCompraEnum } from "@/utils/EstadoCompraEnum";
import { useState } from "react";
import React, { ReactNode } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Modal from "@/components/Modal";
import useGlobal from "@/hooks/useGlobal";
import { useActualizarCompraEstadoMutation } from "@/store/service/CompraService";
import toast from "react-hot-toast";
import { separarMayusculas } from "@/utils/stirng";
import { useListVentasByEmpresaQuery } from "@/store/service/EmpresaService";

const BadgeEstado = ({ compraId = 0, estado = "", estadoId = 0, metodoEnvio = "" }) => {
  const [compraID, setCompraID] = useState(compraId);
  const [estadoNombre, setEstadoNombre] = useState(estado);
  const [estadoID, setEstadoID] = useState(estadoId);

  const [showModal, setShowModal] = useState(false);
  const [actualizarCompraEstado] = useActualizarCompraEstadoMutation();
  const { handleSetLoading } = useGlobal();
  const { refetch } = useListVentasByEmpresaQuery({});
  const nextState = () => {
    if (estadoID !== EstadoCompraEnum.ENTREGADO) {
      return true;
    }
    return false;
  };

  const nextStateName = () => {
    if (estadoID == EstadoCompraEnum.EN_PREPARACION) {
      return "PREPARADO";
    }
    if (estadoID == EstadoCompraEnum.PREPARADO) {
      return "ENVIADO";
    }
    if (estadoID == EstadoCompraEnum.ENVIADO && (metodoEnvio !== "DireccionPropia")) {
      return "LISTO PARA RETIRAR EN PICKUP";
    }
    if (estadoID == EstadoCompraEnum.ENVIADO && (metodoEnvio === "DireccionPropia")) {
      return "ENTREGADO";
    }
    if (estadoID == EstadoCompraEnum.LISTO_PARA_RETIRAR) {
      return "ENTREGADO";
    }
    return "";
  };

  const onConfirm = () => {
    setShowModal(false);
    handleSetLoading(true);
    actualizarCompraEstado(compraId).then((response: any) => {
      const { id, nombre } = response.data;
      setEstadoID(id);
      setEstadoNombre(nombre);
      toast.success("Se ha cambiado el estado de la compra correctamente");
      refetch();
      handleSetLoading(false);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Modal
        textOk="Sí, pasar al siguiente estado."
        textCancel="Cancelar"
        title="¿Estás seguro que deseas pasar la venta al siguiente estado?"
        description="Esta acción no tiene retorno, al pasar la venta al siguiente estado, ya no podrás volver atrás."
        onCloseModalDelete={() => setShowModal(false)}
        show={showModal}
        onConfirm={() => onConfirm()}
      />

      <span className="text-primary-500">{separarMayusculas(estado)}</span>
      {nextState() && (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          Pasar al siguiente estado {nextStateName()}
        </button>
      )}
    </div>
  );
};

export default BadgeEstado;
