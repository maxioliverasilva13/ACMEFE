"use client";

import React, { useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  LoginForm,
  LoginFormFields,
  LoginFormValidationSchema,
} from "@/forms/LoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobal from "@/hooks/useGlobal";
import { useLoginMutation } from "@/store/service/UserService";
import toast from "react-hot-toast";import SocialMediasLogin from "@/components/SocialMediasLogin/SocialMediasLogin";
import Spinner from "@/components/Spinner/Spinner";

const PageLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: yupResolver(LoginFormValidationSchema()),
  });
  const [handleLogin] = useLoginMutation();
  const { handleSetLoading, handleSetToken, loading } = useGlobal();
  const [myLoading, setLoading] = useState(false);

  const handleNext = async (data: LoginForm) => {
    try {
      handleSetLoading(true);
      const dataToSend = {
        Email: data?.email,
        Password: data?.password,
      };
      const resp = (await handleLogin(dataToSend)) as any;
      if (!resp?.data?.token) {
        toast.error("Credenciales invalidas o cuenta inactiva");
      } else {
        const token = resp?.data?.token;
        handleSetToken(token);
      }
      setLoading(true)
      handleSetLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Credenciales invalidas o cuenta inactiva");
      handleSetLoading(false);
    }
  };

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      {
        myLoading && !loading && <Spinner />
      }
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <SocialMediasLogin />
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              o
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>

              <Input
                {...register(LoginFormFields.email)}
                error={errors[LoginFormFields.email]?.message}
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  Olvidaste la contraseña?
                </Link>
              </span>
              <Input
                {...register(LoginFormFields.password)}
                error={errors[LoginFormFields.password]?.message}
                type="password"
                className="mt-1"
              />
            </label>
            <ButtonPrimary onClick={handleSubmit(handleNext)} type="button">
              Login
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Nuevo usuario? {` `}
            <Link className="text-green-600" href="/signup">
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
