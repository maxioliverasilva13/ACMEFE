"use client";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import I404Png from "@/images/404.png";
import NcImage from "@/shared/NcImage/NcImage";
import useGlobal from "@/hooks/useGlobal";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";

export const Page404 = () => {
  const { userInfo } = useGlobal();
  const { push } = useRouter();

  const handleRedirect = () => {
    if (userInfo?.roles?.includes("Admin")) {
      push(appRoutes.adminInicio() as Route);
    } else if (userInfo?.roles?.includes("Vendedor")) {
      push(appRoutes.empresaInico() as Route);
    } else if (userInfo?.roles?.includes("Usuario")) {
      push(appRoutes.userInicio() as Route);
    } else {
      push(appRoutes.login() as Route);
    }
  };

  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-2">
          <NcImage src={I404Png} alt="not-found" />
          <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
            {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}{" "}
          </span>
          <div className="pt-8">
            <ButtonPrimary onClick={() => handleRedirect()}>Volver al inicio</ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Page404;
