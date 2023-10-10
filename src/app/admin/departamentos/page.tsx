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
  CrearDepartamentoForm,
  CrearDepartamentoFormFields,
  CrearDepartamentoValidationSchema,
  departamentoDefaultValues,
} from "@/forms/CrearDepartamentoForm";
import { Departamento } from "@/types/departamento";
import {
  columnsDepartamentos,
  formatDepartamentosToTable,
} from "@/utils/departamento";

const AdminDepartamentos = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedDepartamentos, setSelectedDepartamentos] = useState<
    Departamento[]
  >([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CrearDepartamentoForm>({
    defaultValues: departamentoDefaultValues,
    resolver: yupResolver(CrearDepartamentoValidationSchema()),
  });

  const departamentos: Departamento[] = [
    {
      id: 1,
      nombre: "San José",
      ciudades: [{ nombre: "San José de Mayo" }, { nombre: "Libertad" }],
    },
    {
      id: 2,
      nombre: "Montevideo",
      ciudades: [{ nombre: "Montevideo" }],
    },
    {
      id: 3,
      nombre: "Flores",
      ciudades: [],
    },
  ];

  const rowsDepartamento = formatDepartamentosToTable(departamentos);

  const handleDeleteDepartamentos = () => {
    setOpenDeleteModal(false);
    setSelectedDepartamentos([]);
  };

  const handleNext = (data: any) => {
    console.log("data: ", data);
  };

  const addDepartamentoContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Nombre</Label>
          <Input
            {...register(CrearDepartamentoFormFields.nombre)}
            error={errors[CrearDepartamentoFormFields.nombre]?.message}
            type="text"
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
        title="¿Estás seguro que deseas borrar los departamentos seleccionados?"
        description="Esta opción no tiene retorno, ya que los departamentos selecciondos se borrarán del sistema."
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteDepartamentos()}
      />
      <Modal
        textOk="Agregar"
        textCancel="Cancelar"
        title="Agregar nuevo departamento"
        description="Este departamento podrá ser utilizado a futuro en registros de direcciones para usuarios."
        onCloseModalDelete={() => {setOpenAddModal(false); reset()}}
        show={openAddModal}
        content={addDepartamentoContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedDepartamentos?.length > 0 && (
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
          Agregar Departamento
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Departamentos"
          data={rowsDepartamento}
          cols={columnsDepartamentos}
          setSelectedItems={setSelectedDepartamentos}
          selectedItems={selectedDepartamentos}
        />
      </div>
    </div>
  );
};

export default AdminDepartamentos;
