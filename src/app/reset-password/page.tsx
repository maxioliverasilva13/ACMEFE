"use client";
import {
  ResetPasswordForm,
  ResetPasswordFormFields,
  ResetPasswordValidationForm,
} from "@/forms/ResetPasswordForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Page404 from "../not-found";
import useGlobal from "@/hooks/useGlobal";
import { useResetPasswordMutation } from "@/store/service/UserService";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import passwordSuccess from "@/images/passwordSuccess.svg";

const ResetPassword = () => {
  const { get } = useSearchParams();
  const token = get("token");
  const email = get("email");

  const { handleSetLoading } = useGlobal();
  const [success, setSuccess] = useState(false);
  const [handleResetPassword] = useResetPasswordMutation();

  const resetPasswordForm = useForm<ResetPasswordForm>({
    resolver: yupResolver(ResetPasswordValidationForm()),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = resetPasswordForm;

  const handleNext = async (data: ResetPasswordForm) => {
    handleSetLoading(true);
    const dataToSend = {
      Token: token?.replaceAll(" ", "+"),
      Password: data.password,
      Email: email?.replace(" ", "+"),
    };
    const resp = (await handleResetPassword(dataToSend)) as any;
    if (resp?.data?.ok === true) {
      toast.success("Contraseña restablecida correctamente");
      setSuccess(true);
    } else {
      toast.error("Error al cambiar contraseña");
    }

    handleSetLoading(false);
  };

  if (!token || !email) {
    return <Page404 />;
  }

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Cambiar contraseña
        </h2>
        {!success ? (
          <div className="max-w-md mx-auto space-y-6">
            <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Contraseña
                </span>

                <Input
                  {...register(ResetPasswordFormFields.password)}
                  error={errors[ResetPasswordFormFields.password]?.message}
                  type="password"
                  placeholder="Contraseña"
                  className="mt-1"
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Confirmar Contraseña
                </span>

                <Input
                  {...register(ResetPasswordFormFields.confirmPassword)}
                  error={
                    errors[ResetPasswordFormFields.confirmPassword]?.message
                  }
                  type="password"
                  placeholder="Confirmar Contraseña"
                  className="mt-1"
                />
              </label>
              <ButtonPrimary onClick={handleSubmit(handleNext)} type="button">
                Restablecer contraseña
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Ya tienes cuenta? {` `}
              <Link className="text-green-600" href="/login">
                Login
              </Link>
            </span>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-6 flex flex-col items-center justify-start">
            <div className="w-[160px] relative h-[200px]">
              <Image
                src={passwordSuccess}
                layout="fill"
                alt="Register mail"
                objectFit="cover"
              />
            </div>
            <span className="text-blue-950 font-medium text-center text-2xl">
              Contraseña actualizada correctamente
            </span>
            <span className="text-center text-gray-800 font-medium text-base">
              Tu contraseña se actualizo correctamente, inicia sesion para
              ingresar a la plataforma
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

export default ResetPassword;
