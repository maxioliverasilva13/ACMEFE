"use client";
import useEmpresa from "@/hooks/useEmpresa";
import Button, { ButtonProps } from "@/shared/Button/Button";
import { adminRoutes, empresaRoutes } from "@/utils/routes";
import { usePathname } from "next/navigation";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " border border-slate-300 dark:border-slate-700 ",
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
      backgroundColor: currentEmpresa.lookAndFeel.colorSecundario,
      color: currentEmpresa.lookAndFeel.colorPrincipal,
    };
  }
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:opacity-95 ${className}`}
      style={buttonStyles}
      {...args}
    />
  );
};

export default ButtonSecondary;
