"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import {
  CrearCategoriaForm,
  CrearCategoriaFormFields,
  CrearCategoriaValidationSchema,
} from "@/forms/CrearCategoria";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import { Categoria } from "@/types/categoria";
import { Pickup } from "@/types/pickup";
import { columnsCategorias, formatCategoriasToTable } from "@/utils/categoria";
import { columnsPickups, formatPickupsToTable } from "@/utils/pickup";
import { TrashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import AddPickupModal from "./components/AddPickupModa";
import useGlobal from "@/hooks/useGlobal";

import { PikcupService, useListPickupsQuery } from "@/store/service/PickupService";
import { useDeletePickupsMutation } from "@/store/service/PickupService";


import {
  CrearPickupForm,
  CrearPickupFormValidationSchema,
} from "@/forms/CrearPickup";

import toast from "react-hot-toast";

const PickUpPage = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedPickups, setSelectedPickups] = useState<Categoria[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [selectedPickupId, setSlectedPickupId] = useState<any>();
  
  const [deletePickups] = useDeletePickupsMutation();


  const { handleSetLoading } = useGlobal();
  

  const { data, isLoading } = useListPickupsQuery("PickupInfo");


  const [pickups, setPickups] = useState<Pickup[]>(data ? [...data] : []); 

  useEffect(()=>{
    if(data){
      setPickups(data)
    }
  },[data])

  useEffect(()=>{
    if(!isLoading){
       handleSetLoading(false)
       return;
    }
    handleSetLoading(true);
}, [isLoading])

  const rows = formatPickupsToTable(pickups);
  const userRows = rows?.map((item) => {
    return {
      ...item,
      action: () => setSlectedPickupId(item?.id),
    };
  });
  

  const handleDeletePickups = async() => {
    setOpenDeleteModal(false);
    handleSetLoading(true);
    
    const pickupsIds =  selectedPickups.map(pickup => pickup.id);
    try{
      await deletePickups({  pickupsIds});

      const updatedPickups = pickups.filter(
        (pickup) => !pickupsIds.includes(pickup.id)
      );
      setPickups(updatedPickups);
  
      toast.success("Pickups eliminadas correctamente");
      setSelectedPickups([]);
      handleSetLoading(false);
      setDisabledActivate(false);

    }catch(e){
      handleSetLoading(false);
      toast.error("Ha ocurrido un error");

    }
  };



  const handleNext = (data: CrearPickupForm) => {
    // add backend
    console.log("data is", data);
  };

  const handleNewPickup = (newPickup:Pickup)=>{
      setOpenAddModal(false);
      setPickups([...pickups,newPickup]);
      toast.success(`Pickup creado correctamente`);

  }

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
        textOk="Si, borrar pickup"
        textCancel="Cancelar"
        title="Estas seguro que deseas borrar los pickups eleccionados"
        description="Esta opcion no  tiene retorno, ya que los pickups se borraran del sistema y ya no tendran acceso al mismo"
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeletePickups()}
      />
      <AddPickupModal open={openAddModal} setOpen={setOpenAddModal} handleNewPickup={handleNewPickup} />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedPickups?.length > 0 && (
          <ButtonDelete
            icon={<TrashIcon width={20} color="white" />}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Borrar Seleccionados
          </ButtonDelete>
        )}
        <ButtonSecondary onClick={() => setDisabledActivate(!disabledActivate)}>
          {disabledActivate ? "Deshabilitar seleccion" : "Habilitar seleccion"}
        </ButtonSecondary>
        <ButtonPrimary onClick={() => setOpenAddModal(true)}>
          Agregar Pickup
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Listado de pickups"
          data={userRows}
          cols={columnsPickups}
          setSelectedItems={setSelectedPickups}
          selectedItems={selectedPickups}
        />
      </div>
    </div>
  );
};

export default PickUpPage;
