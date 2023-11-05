"use client";

import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RegisterForm,
  RegisterFormFields,
  RegisterValidationSchema,
} from "@/forms/RegisterForm";
import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import { DEFAULT_USER_IMAGE } from "@/utils/usuarios";
import useUploadImage from "@/hooks/useUploadFile";
import { useRegisterMutation } from "@/store/service/UserService";
import toast from "react-hot-toast";import registerMail from "@/images/registerMail.svg";
import useGlobal from "@/hooks/useGlobal";
import SocialMediasLogin from "@/components/SocialMediasLogin/SocialMediasLogin";


const PageLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterForm>({
    resolver: yupResolver(RegisterValidationSchema()),
  });
  const [selectedFile, setFileSelected] = useState<File>();
  const { handleUpload } = useUploadImage();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [handleRegister] = useRegisterMutation();
  const { handleSetLoading } = useGlobal();

  const handleNext = async (data: RegisterForm) => {
    try {
      let imageToUse = DEFAULT_USER_IMAGE;
      handleSetLoading(true);
      if (selectedFile) {
        imageToUse = (await handleUpload(selectedFile)) ?? DEFAULT_USER_IMAGE;
      }
      const dataToSend = {
        Email: data?.email,
        Password: "DEFAULT_PASS",
        Nombre: data?.nombre,
        Celular: data?.celular,
        Imagen: imageToUse,
      };

      const resp = (await handleRegister(dataToSend)) as any;
      if (resp?.data?.user) {
        toast.success("Usuario registrado correctamente");
        setRegisterSuccess(true);
      } else {
        toast.error("Error al crear usuario", resp?.data);
      }
      handleSetLoading(false);
    } catch (error: any) {
      handleSetLoading(false);
      toast.error("Error al crear usuario", error?.message);
    }
  };

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {registerSuccess ? "Cuenta creada correctamente" : "Crear cuenta"}
        </h2>
        {!registerSuccess ? (
          <div className="max-w-md mx-auto space-y-6">
            <SocialMediasLogin />
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                o
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <div className="w-[130px] h-[130px] m-auto">
                <AvatarSelector
                  defaultImage={DEFAULT_USER_IMAGE}
                  setFile={setFileSelected}
                />
              </div>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Nombre
                </span>
                <Input
                  {...register(RegisterFormFields.nombre)}
                  error={errors[RegisterFormFields.nombre]?.message}
                  type="text"
                  className="mt-1"
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Nro. Celular
                </span>
                <Input
                  {...register(RegisterFormFields.celular)}
                  error={errors[RegisterFormFields.celular]?.message}
                  type="text"
                  className="mt-1"
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email
                </span>

                <Input
                  {...register(RegisterFormFields.email)}
                  error={errors[RegisterFormFields.email]?.message}
                  type="email"
                  placeholder="example@example.com"
                  className="mt-1"
                />
              </label>
              <ButtonPrimary onClick={handleSubmit(handleNext)} type="button">
                Crear cuenta
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Ya tienes usuario? {` `}
              <Link className="text-green-600" href="/login">
                Login
              </Link>
            </span>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-6 flex flex-col items-center justify-start">
            <div className="w-[200px] relative h-[120px]">
              <Image
                src={registerMail}
                layout="fill"
                alt="Register mail"
                objectFit="cover"
              />
            </div>
            <span className="text-blue-950 font-medium text-center text-2xl">
              Cuenta creada correctamente
            </span>
            <span className="text-center text-gray-800 font-medium text-base">
              Tu cuenta se creo correctamente, revista tu casilla de correo
              electronico para validar tu cuenta y ingresar a la plataforma.
            </span>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Ya tienes usuario? {` `}
              <Link className="text-green-600" href="/login">
                Login
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLogin;
