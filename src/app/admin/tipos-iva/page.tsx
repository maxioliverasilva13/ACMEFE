"use client";

import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import { TipoIva } from "@/types/tipoIva";
import { appRoutes } from "@/utils/appRoutes";
import { columnsTiposIva, formatTiposIvaToTable } from "@/utils/tiposIva";
import {
  CrearTipoIvaForm,
  CrearTipoIvaFormFields,
  CrearTipoIvaValidationSchema,
  tipoIvaDefaultValues,
} from "@/forms/CrearTipoIvaForm";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AdminTiposIva = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedTipoIva, setSelectedTipoIva] = useState<TipoIva[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CrearTipoIvaForm>({
    defaultValues: tipoIvaDefaultValues,
    resolver: yupResolver(CrearTipoIvaValidationSchema()),
  });

  const tiposIVA: TipoIva[] = [
    {
      id: 1,
      nombre: "IVA Tasa Básica",
      porcentaje: 22,
    },
    {
      id: 2,
      nombre: "IVA Tasa Mínima",
      porcentaje: 10,
    },
  ];

  const rowTiposIva = formatTiposIvaToTable(tiposIVA);

  const handleDeleteTiposIVA = () => {
    setOpenDeleteModal(false);
    setSelectedTipoIva([]);
  };

  const handleNext = (data: any) => {
    console.log("data: ", data);
  };

  const addCategoriaContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Nombre</Label>
          <Input
            {...register(CrearTipoIvaFormFields.nombre)}
            error={errors[CrearTipoIvaFormFields.nombre]?.message}
            type="text"
            className="mt-1.5"
          />
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Porcentaje</Label>
          <Input
            {...register(CrearTipoIvaFormFields.porcentaje)}
            error={errors[CrearTipoIvaFormFields.porcentaje]?.message}
            type="number"
            step=".01"
            className="mt-1.5"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
        textOk="Sí, borrar"
        textCancel="Cancelar"
        title="¿Estás seguro que deseas borrar los tipos de IVA seleccionados?"
        description="Esta opción no tiene retorno, ya que los tipos de IVA selecciondos se borrarán del sistema."
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteTiposIVA()}
      />
      <Modal
        textOk="Agregar"
        textCancel="Cancelar"
        title="Agregar nuevo tipo de IVA"
        description="Este tipo IVA podrá ser aplicado en el checkout de cualquier producto."
        onCloseModalDelete={() => setOpenAddModal(false)}
        show={openAddModal}
        content={addCategoriaContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedTipoIva?.length > 0 && (
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
          Agregar Tipo IVA
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Listado de empresas"
          data={rowTiposIva}
          cols={columnsTiposIva}
          setSelectedItems={setSelectedTipoIva}
          selectedItems={selectedTipoIva}
        />
      </div>
    </div>
  );
};

export default AdminTiposIva;
