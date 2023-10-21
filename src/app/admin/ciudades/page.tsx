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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CrearCiudadForm,
  CrearCiudadFormFields,
  CrearCiudadValidationSchema,
  ciudadDefaultValues,
} from "@/forms/CrearCiudadForm";

import { Ciudad } from "@/types/ciudad";
import {
  columnsCiudades,
  formatCiudadesToTable,
  formatDepartamentosToDropdown,
} from "@/utils/ciudades";
import Dropdown from "@/components/Dropdown/Dropdown";

import { useLazyListarDepartamentosQuery } from "@/store/service/DepartamentoService";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";
import {
  useCreateCiudadMutation,
  useDeleteCiudadMutation,
  useLazyListarCiudadesQuery,
} from "@/store/service/CiudadService";

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

  const [getCiudades, { data: dataCiudades }] = useLazyListarCiudadesQuery();
  const [
    getDepartamentos,
    { data: dataDepartamentos },
  ] = useLazyListarDepartamentosQuery();
  const [createCiudad] = useCreateCiudadMutation();
  const [deleteCiudad] = useDeleteCiudadMutation();
  const { handleSetLoading } = useGlobal();

  const handleLoadData = async () => {
    handleSetLoading(true);
    await getCiudades({});
    await getDepartamentos({});
    handleSetLoading(false);
  };

  const departamentos = dataDepartamentos ?? [];
  const ciudades = dataCiudades ?? [];

  useEffect(() => {
    handleLoadData();
  }, []);

  const rowsCiudad = formatCiudadesToTable(ciudades);

  const handleDeleteCiudades = () => {
    setOpenDeleteModal(false);
    setSelectedCiudades([]);
  };

  const handleNext = async (data: CrearCiudadForm) => {
    try {
      handleSetLoading(true);
      const dataToSend: Ciudad = {
        nombre: data.nombre,
        departamentoId: data.departamentoId,
      };

      const resp = (await createCiudad(dataToSend)) as any;
      if (resp?.data?.id) {
        toast.success("Ciudad creada correctamente.");
        setOpenAddModal(false);
        reset();
      } else {
        toast.error("Error al crear ciudad.", resp?.data);
      }
      handleSetLoading(false);
    } catch (error: any) {
      handleSetLoading(false);
      toast.error("Error al crear ciudad.", error?.message);
    }
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
            items={formatDepartamentosToDropdown(departamentos)}
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
        onCloseModalDelete={() => {
          setOpenAddModal(false);
          reset();
        }}
        show={openAddModal}
        content={addCiudadContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedCiudades?.length > 0 && (
          <ButtonDelete
            icon={<TrashIcon width={20} color="white" />}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
            type="button"
          >
            Borrar Seleccionados
          </ButtonDelete>
        )}
        <ButtonSecondary
          onClick={() => setDisabledActivate(!disabledActivate)}
          type="button"
        >
          {disabledActivate ? "Deshabilitar seleccion" : "Habilitar seleccion"}
        </ButtonSecondary>
        <ButtonPrimary onClick={() => setOpenAddModal(true)} type="button">
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
