"use client";

import clsx from "clsx";

interface Props {
  message: any;
  className?: string;
}

const Text = ({ message, className = "" }: Props) => {
  return (
    <span className={clsx("max-w-full overflow-hidden truncate text-base font-medium text-texto", className)}>
      {message}
    </span>
  );
};

export default Text;
