import { EstadoCompraEnum } from "@/utils/EstadoCompraEnum";
import { useState } from "react";
import React, { ReactNode } from 'react';
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Modal from "@/components/Modal";
import useGlobal from "@/hooks/useGlobal";
import { useActualizarCompraEstadoMutation } from "@/store/service/CompraService";
import { toast } from "react-toastify";


  
  

const BadgeEstado = ({
  compraId = 0,
  estado= "",
  estadoId = 0
}) => {

  const [compraID, setCompraID] = useState(compraId);
  const [estadoNombre, setEstadoNombre ] = useState(estado);
  const [estadoID, setEstadoID] = useState(estadoId);


  const [showModal,setShowModal] = useState(false);
  const [actualizarCompraEstado  ] = useActualizarCompraEstadoMutation();
  const { handleSetLoading} = useGlobal();
  const nextState = ()=>{
    if(estadoID == EstadoCompraEnum.EN_CAMINO){
        return true;
    }
    if(estadoID ==  EstadoCompraEnum.EN_PREPARACION){
        return true;
    }
    if(estadoID == EstadoCompraEnum.LISTO_PARA_ENTREGAR){
        return true;
    }
    return false;
  }

  const nextStateName = ()=>{
    if(estadoID == EstadoCompraEnum.EN_PREPARACION){
        return "EN CAMINO";
    }
    if(estadoID ==  EstadoCompraEnum.EN_CAMINO){
        return "LISTO PARA ENTREGAR";
    }
    if(estadoID == EstadoCompraEnum.LISTO_PARA_ENTREGAR){
        return "ENTREGADO";
    }
    return "";
  }


  const onConfirm = ()=>{
    setShowModal(false);
    handleSetLoading(true);
    actualizarCompraEstado(compraId).then((response:any) =>{
        const { id , nombre} = response.data;
        setEstadoID(id);
        setEstadoNombre(nombre);
        toast.success("Se ha cambiado el estado de la compra correctamente");
        handleSetLoading(false);
    });

  }

  return (
    <div>
     
        <Modal
            textOk="Si, pasar al siguiente Estado"
            textCancel="Cancelar"
            title="Estas seguro que deseas pasar la venta al siguiente estado?"
            description="Esta opcion no  tiene retorno, al pasar la venta al siguiente estado ,ya no podras volver atras"
            onCloseModalDelete={() => setShowModal(false)}
            show={showModal}
            onConfirm={() => onConfirm()}
        />
    
        <span className="text-primary-500 ml-2">{ estadoNombre  } </span>
        {nextState() && (
            <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={()=>setShowModal(true)}> Pasar al siguiente estado {nextStateName()}</button>
        )}

    </div>
    
  );
};

export default BadgeEstado;
