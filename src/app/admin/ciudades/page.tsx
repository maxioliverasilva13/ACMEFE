"use client";

import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CrearCiudadForm,
  CrearCiudadFormFields,
  CrearCiudadValidationSchema,
  ciudadDefaultValues,
} from "@/forms/CrearCiudadForm";

import { Ciudad } from "@/types/ciudad";
import { columnsCiudades, formatCiudadesToTable } from "@/utils/ciudades";
import Dropdown from "@/components/Dropdown/Dropdown";

const AdminCiudades = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedCiudades, setSelectedCiudades] = useState<Ciudad[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<CrearCiudadForm>({
    defaultValues: ciudadDefaultValues,
    resolver: yupResolver(CrearCiudadValidationSchema()),
  });

  const ciudades: Ciudad[] = [
    {
      id: 1,
      nombre: "San José de Mayo",
      departamentoId: 1,
    },
    {
      id: 2,
      nombre: "Libertad",
      departamentoId: 1,
    },
  ];

  const rowsCiudad = formatCiudadesToTable(ciudades);

  const handleDeleteCiudades = () => {
    setOpenDeleteModal(false);
    setSelectedCiudades([]);
  };

  const handleNext = (data: any) => {
    console.log("data: ", data);
  };

  const addCiudadContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Nombre</Label>
          <Input
            {...register(CrearCiudadFormFields.nombre)}
            error={errors[CrearCiudadFormFields.nombre]?.message}
            type="text"
            className="mt-1.5"
            autoComplete="disabled"
          />
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Departamento</Label>
          <Dropdown
            placeholder="Seleccionar departamento"
            items={[
              {
                label: "Montevideo",
                value: 1,
              },
              {
                label: "San José",
                value: 2,
              },
              {
                label: "Punta del Este",
                value: 3,
              },
            ]}
            onChange={(val: any) =>
              setValue(CrearCiudadFormFields.departamentoId, val)
            }
            onlyOneSelectable
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
        title="¿Estás seguro que deseas borrar las ciudades seleccionadas?"
        description="Esta opción no tiene retorno, ya que las ciudades seleccionadas se borrarán del sistema."
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteCiudades()}
      />
      <Modal
        textOk="Agregar"
        textCancel="Cancelar"
        title="Agregar nueva ciudad"
        description="Esta ciudad estará relacionada a un departamento, y luego podrá ser utilizada para el registro de direcciones de usuarios."
        onCloseModalDelete={() => {setOpenAddModal(false); reset()}}
        show={openAddModal}
        content={addCiudadContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedCiudades?.length > 0 && (
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
          Agregar Ciudad
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Ciudades"
          data={rowsCiudad}
          cols={columnsCiudades}
          setSelectedItems={setSelectedCiudades}
          selectedItems={selectedCiudades}
        />
      </div>
    </div>
  );
};

export default AdminCiudades;
