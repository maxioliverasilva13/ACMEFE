import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Dropdown from "@/components/Dropdown/Dropdown";
import Label from "@/components/Label/Label";
import ModalDelete from "@/components/Modal";
import OneLineError from "@/components/OneLineError/OneLineError";
import SelectLocationModal from "@/components/SelectLocationModal/SelectLocationModal";
import {
  CrearPickupForm,
  CrearPickupFormFields,
  CrearPickupFormValidationSchema,
} from "@/forms/CrearPickup";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLazyListarDepartamentosQuery } from "@/store/service/DepartamentoService";
import { Ciudad } from "@/types/ciudad";
import { ItemDropdown } from "@/types/dropdown";
import toast from "react-hot-toast";
import { DEFAULT_PICKUP_IMAGE } from "@/utils/pickup";

import useGlobal from "@/hooks/useGlobal";
import useUploadImage from "@/hooks/useUploadFile";
import { useCreatePickupMutation } from "@/store/service/PickupService";
import { Pickup } from "@/types/pickup";

interface Props {
  setOpen: any;
  open: any;
  handleNewPickup: any;
}

const AddPickupModal = ({ open, setOpen , handleNewPickup }: Props) => {
  const { handleSetLoading } = useGlobal();
  const { handleUpload } = useUploadImage();
  const [createPickup] = useCreatePickupMutation();

  const [openSelectLatLng, setOpenSelectLatLng] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedLatLng, setSelectedLatLng] = useState<any>();
  const [formSubmitted, setFormSubmitted] = useState<any>();
  const [ciudadesOptions, setCiudadesOptions] = useState<ItemDropdown[]>([]);

  const [
    getDepartamentos,
    { data: departamentos, isLoading: loadingDepartamentos },
  ] = useLazyListarDepartamentosQuery();

  const departamentosOptions = departamentos?.map((departamento) => {
    return {
      value: departamento.id,
      label: departamento.nombre,
    };
  });

  useEffect(() => {
    getDepartamentos({});
  }, []);

  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    setValue,
    getValues,
    reset
  } = useForm<CrearPickupForm>({
    resolver: yupResolver(CrearPickupFormValidationSchema()),
    defaultValues: {
      plazoDiasPreparacion: 0,
    },
  });

  const handleSelectLocation = (lat: number, lng: number) => {
    setValue("lat", lat);
    setValue("lng", lng);
    setSelectedLatLng({ lat, lng });
    setOpenSelectLatLng(false);
  };

  const clearForm = () => {
  
    setValue("nombre", "");
    setValue("telefono", "");
    setValue("plazoDiasPreparacion", 0);
    setValue("calle", "");
    setValue("nroPuerta", "");
    setValue("calleEntre1", "");
    setValue("calleEntre2", "");
    setValue("calleEntre1", "");
    setValue("ciudad", 0);
    setValue("departamento",0);
    setValue("lat", 0);
    setValue("lng", 0);
    setSelectedFile(undefined);
  };

  const handleNext = async (data: CrearPickupForm) => {
    handleSetLoading(true);
    let imageToUse = DEFAULT_PICKUP_IMAGE;
    if (selectedFile) {
      imageToUse = (await handleUpload(selectedFile)) ?? DEFAULT_PICKUP_IMAGE;
    }
    try {
      const body = {
        ...data,
        Calle: data.calle,
        CalleEntre1: data.calleEntre1,
        calleEntre2: data.calleEntre2,
        LocalidadId: data.ciudad,
        Foto: imageToUse,
      };
      const response: any = await createPickup(body);
      if (response.error) {
        const messageError = response.error.data;
        handleSetLoading(false);
        toast.error(messageError);
        return;
      }
      const pickupCreated: Pickup = response.data;
      handleSetLoading(false);
      handleNewPickup(pickupCreated);
      reset(data);
      clearForm();
    } catch (e) {
      console.log(e);
      handleSetLoading(false);
      toast.error("Ha ocurrido un error inesperado!");
    }
  };

  const renderContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
          <AvatarSelector
            setFile={setSelectedFile}
            defaultImage={DEFAULT_PICKUP_IMAGE}
          />
        </div>
        <div className="flex-grow w-full flex flex-col gap-4 items-start justify-start">
          <Label>Nombre</Label>
          <Input
            {...register(CrearPickupFormFields.nombre)}
            error={errors[CrearPickupFormFields.nombre]?.message}
            type="text"
            className="mt-1.5"
          />
          <div className="w-full h-auto flex flex-row items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Plazo de dias</Label>
              <Input
                {...register(CrearPickupFormFields.plazoDiasPreparacion)}
                error={
                  errors[CrearPickupFormFields.plazoDiasPreparacion]?.message
                }
                type="number"
                placeholder="Ingrese un plazo de dias para la preparacion del producto"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Telefono</Label>
              <Input
                {...register(CrearPickupFormFields.telefono)}
                error={errors[CrearPickupFormFields.telefono]?.message}
                type="number"
                placeholder="Ingrese un telefono"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="w-full h-auto flex flex-row items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Calle</Label>
              <Input
                {...register(CrearPickupFormFields.calle)}
                error={errors[CrearPickupFormFields.calle]?.message}
                type="text"
                placeholder="Ingrese una calle"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Nro Puerta</Label>
              <Input
                {...register(CrearPickupFormFields.nroPuerta)}
                error={errors[CrearPickupFormFields.nroPuerta]?.message}
                type="number"
                placeholder="Ingrese un numbero de puerta"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="w-full h-auto flex flex-row items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Calle entre 1</Label>
              <Input
                {...register(CrearPickupFormFields.calleEntre1)}
                error={errors[CrearPickupFormFields.calleEntre1]?.message}
                type="text"
                placeholder="Ingrese una calle entre 1"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Calle entre 2</Label>
              <Input
                {...register(CrearPickupFormFields.calleEntre2)}
                error={errors[CrearPickupFormFields.calleEntre2]?.message}
                type="text"
                placeholder="Ingrese una calle entre 2"
                className="mt-1.5"
              />
            </div>
          </div>
          <Dropdown
            placeholder="Seleccionar Departamento"
            items={departamentosOptions ? departamentosOptions : []}
            onChange={(val: any) => {
              const departamentoFind = departamentos?.find(
                (departamento) => departamento.id == val
              );
              if (!departamentoFind) {
                return;
              }
              if (!departamentoFind.ciudades) {
                return;
              }
              setCiudadesOptions(
                departamentoFind.ciudades.map((ciudad) => {
                  return {
                    value: ciudad.id,
                    label: ciudad.nombre,
                  };
                })
              );
              setValue(CrearPickupFormFields.departamento, Number(val ?? 0));
            }}
          />
          {!getValues(CrearPickupFormFields.departamento) &&
            submitCount > 0 && (
              <OneLineError message="Debes seleccionar un departamento" />
            )}

          <Dropdown
            placeholder="Seleccionar Localidad"
            items={ciudadesOptions}
            onChange={(val: any) => {
              setValue(CrearPickupFormFields.ciudad, Number(val ?? 0));
            }}
          />
          {!getValues(CrearPickupFormFields.ciudad) && submitCount > 0 && (
            <OneLineError message="Debes seleccionar una ciudad" />
          )}

          <ButtonPrimary
            className="w-full flex-grow"
            onClick={() => setOpenSelectLatLng(!openSelectLatLng)}
          >
            Seleccionar localizacion
          </ButtonPrimary>
          {selectedLatLng?.lng === undefined && submitCount >= 1 && (
            <OneLineError message="Debes seleccionar una ubicacion" />
          )}

          {openSelectLatLng && (
            <SelectLocationModal
              setLatLng={setSelectedLatLng}
              open={openSelectLatLng}
              setOpen={setOpenSelectLatLng}
              onSelectLocation={handleSelectLocation}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <ModalDelete
      textOk="Agregar"
      textCancel="Cancelar"
      title="Agregar nuevo pickup"
      description="Esta pickup sera unica para esta empresa y se podra usar en cualquier compra del usuario"
      onCloseModalDelete={() => setOpen(false)}
      show={open}
      content={renderContent()}
      onConfirm={handleSubmit(handleNext)}
    />
  );
};

export default AddPickupModal;
