"use client";
import Dropdown from "@/components/Dropdown/Dropdown";
import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import {
  CrearDireccionForm,
  CrearDireccionFormFields,
  CrearDireccionValidationSchema,
} from "@/forms/CrearDireccionForm";
import useGlobal from "@/hooks/useGlobal";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { DireccionDetail } from "@/types/direccion";
import {
  formatCiudadesToDropdown,
  formatDepartamentosToDropdown,
} from "@/utils/ciudades";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLazyListarDepartamentosQuery } from "@/store/service/DepartamentoService";
import { useLazyListarCiudadesQuery } from "@/store/service/CiudadService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Departamento } from "@/types/departamento";
import {
  useAgregarDireccionMutation,
  useLazyListarDireccionesQuery,
  useModificarDireccionMutation,
} from "@/store/service/UserService";
import Checkbox from "@/shared/Checkbox/Checkbox";

const AccountDirecciones = () => {
  const { push } = useRouter();
  const { handleSetLoading } = useGlobal();
  const [getDirecciones, { data, isLoading }] = useLazyListarDireccionesQuery();
  const [
    getDepartamentos,
    { data: dataDepartamentos },
  ] = useLazyListarDepartamentosQuery();
  const [getCiudades, { data: dataCiudades }] = useLazyListarCiudadesQuery();

  const [selectedDireccion, setSelectedDireccion] = useState<DireccionDetail>();
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    Departamento
  >();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const handleLoadData = async () => {
    handleSetLoading(true);
    await getDirecciones({});
    await getCiudades({});
    await getDepartamentos({});
    handleSetLoading(false);
  };

  const departamentos = dataDepartamentos ?? [];
  const ciudades = dataCiudades ?? [];
  useEffect(() => {
    handleLoadData();
  }, []);

  useEffect(() => {
    if (!selectedDireccion) {
      setValue(CrearDireccionFormFields.ciudadId, 0);
    }
  }, [selectedDepartamento]);

  const createDireccionForm = useForm<CrearDireccionForm>({
    resolver: yupResolver(CrearDireccionValidationSchema()),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = createDireccionForm;

  const direcciones = data ?? [];

  const [
    createDireccion,
    { error: createDireccionError },
  ] = useAgregarDireccionMutation();
  const [
    editDireccion,
    { error: editDireccionError },
  ] = useModificarDireccionMutation();

  const handleNext = async (data: CrearDireccionForm) => {
    try {
      handleSetLoading(true);
      const dataToSend: DireccionDetail = {
        id: selectedDireccion?.id || 0,
        calle: data?.calle,
        nroPuerta: data?.nroPuerta,
        calleEntre1: data?.calleEntre1,
        calleEntre2: data?.calleEntre2,
        ciudadId: data?.ciudadId,
        activo: data?.activo,
      };
      if (!selectedDireccion) {
        await createDireccion(dataToSend);
        if (!createDireccionError) {
          toast.success("Dirección agregada correctamente.");
          // push(appRoutes.userAccount() as any);
          setOpenAddModal(false);
          reset();
          setSelectedDepartamento(undefined);
          setValue(CrearDireccionFormFields.ciudadId, 0);
        } else {
          toast.error("Error al agregar dirección.");
        }
      } else {
        await editDireccion(dataToSend);
        if (!editDireccionError) {
          toast.success("Dirección modificada correctamente.");
          // push(appRoutes.userAccount() as any);
          setOpenAddModal(false);
          reset();
          setSelectedDepartamento(undefined);
          setValue(CrearDireccionFormFields.ciudadId, 0);
        } else {
          toast.error("Error al modificar dirección");
        }
      }
      handleSetLoading(false);
    } catch (error: any) {
      handleSetLoading(false);
      toast.error("Error al crear usuario ", error?.message);
    }
  };

  const addAddressContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle</Label>
            <Input
              {...register(CrearDireccionFormFields.calle)}
              error={errors[CrearDireccionFormFields.calle]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Número de Puerta</Label>
            <Input
              {...register(CrearDireccionFormFields.nroPuerta)}
              error={errors[CrearDireccionFormFields.nroPuerta]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle entre 1</Label>
            <Input
              {...register(CrearDireccionFormFields.calleEntre1)}
              error={errors[CrearDireccionFormFields.calleEntre1]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle entre 2</Label>
            <Input
              {...register(CrearDireccionFormFields.calleEntre2)}
              error={errors[CrearDireccionFormFields.calleEntre2]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Departamento</Label>
            <Dropdown
              placeholder="Seleccionar departamento"
              items={formatDepartamentosToDropdown(departamentos)}
              onChange={(val: any) => {
                setSelectedDepartamento(val);
              }}
              defaultValue={
                selectedDireccion && selectedDireccion?.ciudadDepartamentoId
              }
              onlyOneSelectable
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Ciudad</Label>
            <Dropdown
              placeholder={
                selectedDepartamento
                  ? "Seleccione una ciudad"
                  : "Antes elija un departamento."
              }
              items={formatCiudadesToDropdown(
                ciudades?.filter(
                  (ciudad) => ciudad?.departamentoId === selectedDepartamento
                )
              )}
              onChange={(value: any) =>
                setValue(CrearDireccionFormFields.ciudadId, value)
              }
              error={errors[CrearDireccionFormFields.ciudadId]?.message}
              defaultValue={selectedDireccion && selectedDireccion?.ciudadId}
              onlyOneSelectable
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center pl-1 py-1">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Checkbox
              name="activo"
              label="Dirección activa"
              defaultChecked={selectedDireccion ? selectedDireccion?.activo : true}
              onChange={(value: boolean) =>
                setValue(CrearDireccionFormFields.activo, value)
              }
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <Modal
        textOk={selectedDireccion ? "Guardar" : "Agregar"}
        textCancel="Cancelar"
        title={
          selectedDireccion ? "Editar dirección" : "Agregar nueva dirección"
        }
        description={
          selectedDireccion
            ? "Estás a punto de editar una de tus direcciones guardadas."
            : "Esta dirección podrá ser utilizada más tarde al momento de elegir un destino de envío para una compra dada."
        }
        onCloseModalDelete={() => {
          setOpenAddModal(false);
          setSelectedDepartamento(undefined);
          setValue(CrearDireccionFormFields.ciudadId, 0);
          setSelectedDireccion(undefined);
          reset();
        }}
        show={openAddModal}
        content={addAddressContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      {direcciones?.map((item) => {
        return (
          <div
            key={item?.id}
            className="py-4 px-6 border border-gray-300 shadow-md rounded-2xl flex flex-col items-start justify-start gap-2 overflow-hidden"
          >
            <div className="w-full flex-grow flex flex-wrap items-center justify-between gap-1">
              <div className="flex flex-col">
                <span className="text-lg max-w-full overflow-hidden break-words font-medium">
                  {`${item?.ciudadNombre} - ${item?.ciudadDepartamentoNombre} `}
                  {!item.activo && (
                    <span className="text-red-500">(Deshabilitada)</span>
                  )}
                </span>
                <span className="text-sm max-w-full overflow-hidden break-words">
                  {`${item?.calle} ${item?.nroPuerta} - entre ${item?.calleEntre1} y
                ${item?.calleEntre2}`}
                </span>
              </div>
              <div className="flex items-center">
                <ButtonPrimary
                  className="!p-3"
                  onClick={() => {
                    setSelectedDireccion(item);
                    setValue(CrearDireccionFormFields.calle, item.calle);
                    setValue(
                      CrearDireccionFormFields.calleEntre1,
                      item.calleEntre1
                    );
                    setValue(
                      CrearDireccionFormFields.calleEntre2,
                      item.calleEntre2
                    );
                    setValue(
                      CrearDireccionFormFields.nroPuerta,
                      item.nroPuerta
                    );
                    setValue(CrearDireccionFormFields.ciudadId, item.ciudadId);
                    setValue(CrearDireccionFormFields.activo, item.activo);
                    setOpenAddModal(true);
                  }}
                >
                  <PencilSquareIcon
                    className="text-white"
                    width={20}
                    height={20}
                  />
                </ButtonPrimary>
              </div>
            </div>
          </div>
        );
      })}
      {direcciones?.length === 0 && (
        <span className="text-sm">
          Al parecer este usuario no tiene niguna dirección, agrega una nueva.
        </span>
      )}
      <div className="flex items-center justify-center w-full mt-5">
        <ButtonPrimary onClick={() => setOpenAddModal(!openAddModal)}>
          Agregar dirección
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AccountDirecciones;
