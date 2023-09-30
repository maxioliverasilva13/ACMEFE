"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import { CrearUsuarioForm, CrearUsuarioFormFields, CrearUsuarioValidationSchema } from "@/forms/CrearUsuarioForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AgregarUsuario = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const createUserForm = useForm<CrearUsuarioForm>({
    resolver: yupResolver(CrearUsuarioValidationSchema())
  })
  
  const { register, handleSubmit, formState: { errors } } = createUserForm;

  
  const handleNext = (data: CrearUsuarioForm) => {
    console.log("data", data)
  }

  return (
    <div className="w-full flex-grow p-5 h-auto flex flex-col gap-10 items-start justify-start">
      <h1 className="font-semibold text-texto text-[30px] ">
        Agregar nuevo usuario
      </h1>

      <div className="w-full h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
            <AvatarSelector setFile={setSelectedFile} />
          </div>
          <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Nombre</Label>
              <Input {...register(CrearUsuarioFormFields.name)}
              error={errors[CrearUsuarioFormFields.name]?.message}
              type="text" className="mt-1.5" />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Apellido</Label>
              <Input {...register(CrearUsuarioFormFields.lastname)}
                            error={errors[CrearUsuarioFormFields.lastname]?.message}

              type="text" className="mt-1.5" />
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Telefono</Label>
            <Input {...register(CrearUsuarioFormFields.tel)}
                          error={errors[CrearUsuarioFormFields.tel]?.message}

            type="text" className="mt-1.5" />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Direccion</Label>
            <Input {...register(CrearUsuarioFormFields.dir)}
                          error={errors[CrearUsuarioFormFields.dir]?.message}

            type="text" className="mt-1.5" />
          </div>
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Email</Label>
          <Input {...register(CrearUsuarioFormFields.email)}
                        error={errors[CrearUsuarioFormFields.email]?.message}

          type="email" className="mt-1.5" />
        </div>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-between">
        <ButtonPrimary onClick={handleSubmit(handleNext)} className="">
            Agregar usuario
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarUsuario;
