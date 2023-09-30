import OneLineError from "@/components/OneLineError/OneLineError";
import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  error?: any;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      type = "text",
      error,
      ...args
    },
    ref
  ) => {
    return (
      <div className="w-full h-auto flex flex-col gap-2">
        <input
          ref={ref}
          type={type}
          className={clsx(
            `block w-full border-2 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`,
            error ? "border-red-300" : " border-neutral-200 focus:border-gray-900 dark:border-neutral-700"
          )}
          {...args}
        />
        {error && <OneLineError message={error} />}
      </div>
    );
  }
);

export default Input;
