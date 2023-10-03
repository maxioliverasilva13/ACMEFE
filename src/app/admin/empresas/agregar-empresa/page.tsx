"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import {
  CrearEmpresaForm,
  CrearEmpresaFormFields,
  CrearEmpresaValidationSchema,
} from "@/forms/CrearEmpresaForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const AgregarEmpresa = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const createEmpresaForm = useForm<CrearEmpresaForm>({
    resolver: yupResolver(CrearEmpresaValidationSchema()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createEmpresaForm;

  const handleNext = (data: CrearEmpresaForm) => {
    console.log("data", data);
  };

  return (
    <div className="w-full flex-grow p-5 h-auto flex flex-col gap-10 items-start justify-start">
      <h1 className="font-semibold text-texto text-[30px] ">
        Agregar nueva empresa
      </h1>

      <div className="w-full h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
            <AvatarSelector setFile={setSelectedFile} />
          </div>
          <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Nombre</Label>
              <Input
                {...register(CrearEmpresaFormFields.nombre)}
                error={errors[CrearEmpresaFormFields.nombre]?.message}
                type="text"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Dirección</Label>
              <Input
                {...register(CrearEmpresaFormFields.direccion)}
                error={errors[CrearEmpresaFormFields.direccion]?.message}
                type="text"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Telefono</Label>
            <Input
              {...register(CrearEmpresaFormFields.telefono)}
              error={errors[CrearEmpresaFormFields.telefono]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Correo electrónico</Label>
            <Input
              {...register(CrearEmpresaFormFields.correo)}
              error={errors[CrearEmpresaFormFields.correo]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Costo de Envío</Label>
          <Input
            {...register(CrearEmpresaFormFields.costoEnvio)}
            error={errors[CrearEmpresaFormFields.costoEnvio]?.message}
            type="text"
            className="mt-1.5"
          />
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Wallet de Ethereum</Label>
          <Input
            {...register(CrearEmpresaFormFields.wallet)}
            error={errors[CrearEmpresaFormFields.wallet]?.message}
            type="text"
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-between">
        <ButtonPrimary onClick={handleSubmit(handleNext)} className="">
          Agregar Empresa
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarEmpresa;
