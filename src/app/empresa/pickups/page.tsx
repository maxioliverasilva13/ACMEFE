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
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddPickupModal from "./components/AddPickupModa";
import {
  CrearPickupForm,
  CrearPickupFormValidationSchema,
} from "@/forms/CrearPickup";

const PickUpPage = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedPickups, setSelectedPickups] = useState<Categoria[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [selectedPickupId, setSlectedPickupId] = useState<any>();

  const pickups: Pickup[] = [
    {
      id: 1,
      nombre: "Pickup 1",
      telefono: "123-456-7890",
      foto: "https://i.pravatar.cc/150?img=1",
      lat: 40.7128,
      lng: -74.006,
      plazoDiasPreparacion: "2 días",
      calle: "Calle 1",
      nroPuerta: "123",
      calleEntre1: "Entre Calle A y Calle B",
      calleEntre2: "",
      ciudad: 1,
      departamento: 1,
    },
    {
      id: 2,
      nombre: "Pickup 2",
      telefono: "987-654-3210",
      foto: "https://i.pravatar.cc/150?img=17",
      lat: 34.0522,
      lng: -118.2437,
      plazoDiasPreparacion: "3 días",
      calle: "Calle 2",
      nroPuerta: "456",
      calleEntre1: "Entre Calle X y Calle Y",
      calleEntre2: "",
      ciudad: 2,
      departamento: 2,
    },
    {
      id: 3,
      nombre: "Pickup 3",
      telefono: "555-555-5555",
      lat: 51.5074,
      lng: -0.1278,
      plazoDiasPreparacion: "1 día",
      calle: "Calle 3",
      nroPuerta: "789",
      calleEntre1: "Entre Calle P y Calle Q",
      calleEntre2: "",
      ciudad: 3,
      departamento: 3,
    },
  ];

  const rows = formatPickupsToTable(pickups);
  const userRows = rows?.map((item) => {
    return {
      ...item,
      action: () => setSlectedPickupId(item?.id),
    };
  });

  const handleDeleteCategorias = () => {
    setOpenDeleteModal(false);
    setSelectedPickups([]);
    // delete users on backend
  };

  const handleNext = (data: CrearPickupForm) => {
    // add backend
    console.log("data is", data);
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
        textOk="Si, borrar pickup"
        textCancel="Cancelar"
        title="Estas seguro que deseas borrar los pickups eleccionados"
        description="Esta opcion no  tiene retorno, ya que los pickups se borraran del sistema y ya no tendran acceso al mismo"
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteCategorias()}
      />
      <AddPickupModal open={openAddModal} setOpen={setOpenAddModal} />
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
