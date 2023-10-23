import React, { FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Button, { ButtonProps } from "@/shared/Button/Button";
import clsx from "clsx";

export interface ButtonDropdownProps extends ButtonProps {
  isOpen?: any,
  error?: any,
}

const ButtonDropdown: FC<ButtonDropdownProps> = ({
  translate,
  isOpen = false,
  error,
  children,
  ...args
}) => {
  return (
    <Button
      className={clsx("text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700", error ? "border-red-300 hover:border-red-400" : " border-neutral-200 focus:border-gray-900 dark:border-neutral-700")}
      sizeClass="px-4 py-2 sm:py-2.5"
      fontSize="text-sm"
      translate="hover:border-neutral-300 w-full justify-between"
      {...args}
      type="button"
    >
      {children}
      <ChevronDownIcon
        className={clsx("w-4 h-4 ml-2 -mr-1 opacity-70 transform transition-all", isOpen ? "rotate-180" : "rotate-0")}
        aria-hidden="true"
      />
    </Button>
  );
};

export default ButtonDropdown;
