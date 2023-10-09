"use client";

import React, { useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import Image from "next/image";
import registerMail from "@/images/registerMail.svg";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordForm,
  ForgotPasswordFormFields,
  ForgotPasswordFormValidationForm,
} from "@/forms/ForgotPasswordForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "@/store/service/UserService";
import useGlobal from "@/hooks/useGlobal";

const PageForgotPass = ({}) => {
  const [success, setSuccess] = useState(false);
  const [handleForgotPassword] = useForgotPasswordMutation();
  const { handleSetLoading } = useGlobal();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordFormValidationForm()),
  });

  const handleNext = async (data: ForgotPasswordForm) => {
    handleSetLoading(true);
    const resp = (await handleForgotPassword({
      Email: data.email,
    })) as any;
    if (resp?.data?.ok) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    handleSetLoading(false);
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Olvide mi contraseña
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          Enviaremos un correo para restablecer tu contraseña
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        {!success ? (
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                {...register(ForgotPasswordFormFields.email)}
                error={errors[ForgotPasswordFormFields.email]?.message}
                type="email"
                placeholder="Contraseña"
                className="mt-1"
              />
            </label>
            <ButtonPrimary onClick={handleSubmit(handleNext)} type="submit">
              Restablecer
            </ButtonPrimary>
          </form>
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
              Revista tu correo
            </span>
            <span className="text-center text-gray-800 font-medium text-base">
              Te enviamos un correo a correo, revisa tu casilla de correo
              electronico para restablecer tucontraseña
            </span>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Ya tienes usuario? {` `}
              <Link className="text-green-600" href="/login">
                Login
              </Link>
            </span>
          </div>
        )}

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          O ve hacia {` `}
          <Link href="/login" className="text-green-600">
            Login
          </Link>
          {` / `}
          <Link href="/signup" className="text-green-600">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
