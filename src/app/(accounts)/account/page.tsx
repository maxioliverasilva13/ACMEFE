"use client";
import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useUpdateUserMutation } from "@/store/service/UserService";
import useGlobal from "@/hooks/useGlobal";
import {
  UpdateUserForm,
  UpdateUserFormFields,
  UpdateUserValidationSchema,
} from "@/forms/UpdateUserForm";
import { UsuarioUpdate } from "@/types/usuario";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import useUploadImage from "@/hooks/useUploadFile";

const AccountPage = () => {
  const { handleUpload } = useUploadImage();
  const { userInfo, handleSetLoading } = useGlobal();
  const [editUser, { error: editUserError }] = useUpdateUserMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateUserForm = useForm<UpdateUserForm>({
    resolver: yupResolver(UpdateUserValidationSchema()),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = updateUserForm;

  const handleUpdateUser = async (data: UpdateUserForm) => {
    try {
      handleSetLoading(true);
      let userImage: string = "";
      handleSetLoading(true);
      if (selectedFile) {
        userImage = (await handleUpload(selectedFile)) ?? "";
      }
      const dataToSend: UsuarioUpdate = {
        nombre: data?.nombre,
        celular: data?.telefono,
        imagen: userImage,
      };
      await editUser(dataToSend);
      if (!editUserError) {
        toast.success("Información actualizada correctamente.");
      } else {
        toast.error("Error al actualizar información.");
      }
      handleSetLoading(false);
    } catch (error: any) {
      handleSetLoading(false);
      toast.error("Error al actualizar la info ", error?.message);
    }
  };

  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Información de la cuenta
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            {/* AVATAR */}
            <div className="relative rounded-full overflow-hidden flex">
              <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
                <AvatarSelector
                  defaultImage={userInfo?.imagen}
                  setFile={setSelectedFile}
                />
              </div>
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>Nombre Completo</Label>
              <Input
                className="mt-1.5"
                {...register(UpdateUserFormFields.nombre)}
                error={errors[UpdateUserFormFields.nombre]?.message}
                defaultValue={userInfo?.nombre}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Correo electrónico</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder={userInfo?.email}
                  disabled
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Número de Teléfono</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  {...register(UpdateUserFormFields.telefono)}
                  error={errors[UpdateUserFormFields.telefono]?.message}
                  defaultValue={userInfo?.celular}
                />
              </div>
            </div>
            {/* ---- */}
            <div className="pt-2">
              <ButtonPrimary onClick={handleSubmit(handleUpdateUser)}>
                Actualizar Información
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
