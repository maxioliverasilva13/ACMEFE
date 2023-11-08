"use client";
import useEmpresa from "@/hooks/useEmpresa";
import Button, { ButtonProps } from "@/shared/Button/Button";
import { adminRoutes, empresaRoutes } from "@/utils/routes";
import { usePathname } from "next/navigation";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  const pathname = usePathname();
  const isInAdminRoute = adminRoutes.includes(pathname);
  const isInEmpresaRoute = empresaRoutes.includes(pathname);
  const { currentEmpresa } = useEmpresa();
  const userRoute = currentEmpresa && !isInAdminRoute && !isInEmpresaRoute;

  let buttonStyles = {};
  if (userRoute) {
    buttonStyles = {
      backgroundColor: currentEmpresa.lookAndFeel.colorPrincipal,
      color: currentEmpresa.lookAndFeel.colorSecundario,
    };
  }

  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 hover:opacity-95 shadow-xl ${className}`}
      {...args}
      style={buttonStyles}
      type="button"
    />
  );
};

export default ButtonPrimary;
