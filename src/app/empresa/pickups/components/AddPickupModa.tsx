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
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  setOpen: any;
  open: any;
}

const AddPickupModal = ({ open, setOpen }: Props) => {
  const [openSelectLatLng, setOpenSelectLatLng] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedLatLng, setSelectedLatLng] = useState<any>();
  const [formSubmitted, setFormSubmitted] = useState<any>();
  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    setValue,
    getValues
  } = useForm<CrearPickupForm>({
    resolver: yupResolver(CrearPickupFormValidationSchema()),
    defaultValues: {
      plazoDiasPreparacion: 0,
    },
  });

  const handleNext = (data: CrearPickupForm) => {
    console.log("data is", data);
  };

  const renderContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
          <AvatarSelector setFile={setSelectedFile} />
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
            placeholder="Seleccionar Localidad"
            items={[
              {
                label: "San Jose de mayo",
                value: 1,
              },
              {
                label: "Libertad",
                value: 2,
              },
            ]}
            onChange={(val: any) =>
              setValue(CrearPickupFormFields.ciudad, Number(val ?? 0))
            }
          />
          {!getValues(CrearPickupFormFields.ciudad) && submitCount > 0 && (
            <OneLineError message="Debes seleccionar una ciudad" />
          )}
          <Dropdown
            placeholder="Seleccionar Departamento"
            items={[
              {
                label: "San Jose",
                value: 1,
              },
              {
                label: "Montevideo",
                value: 2,
              },
            ]}
            onChange={(val: any) =>
              setValue(CrearPickupFormFields.departamento, Number(val ?? 0))
            }
          />
          {!getValues(CrearPickupFormFields.departamento) && submitCount > 0 && (
            <OneLineError message="Debes seleccionar un departamento" />
          )}
          <ButtonPrimary
            className="w-full flex-grow"
            onClick={() => setOpenSelectLatLng(!openSelectLatLng)}
          >
            Seleccionar localizacion
          </ButtonPrimary>
          {selectedLatLng?.Lng === undefined && submitCount >= 1 && (
            <OneLineError message="Debes seleccionar una ubicacion" />
          )}

          {openSelectLatLng && (
            <SelectLocationModal
              setLatLng={setSelectedLatLng}
              open={openSelectLatLng}
              setOpen={setOpenSelectLatLng}
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
