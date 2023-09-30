import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonDelete: React.FC<ButtonSecondaryProps> = ({
  className = " border border-slate-300 dark:border-slate-700 ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary transition-all bg-red-500 text-white dark:bg-red-800 dark:text-slate-300 hover:bg-red-800 dark:hover:bg-red-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonDelete;
