"use client";

import clsx from "clsx";

interface Props {
  message: any;
  className?: string;
}

const Text = ({ message, className = "" }: Props) => {
  return (
    <span title={message} className={clsx("max-w-full overflow-hidden break-words text-base font-medium text-texto", className)}>
      {message}
    </span>
  );
};

export default Text;
