import OneLineError from "@/components/OneLineError/OneLineError";
import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, children, rows = 4, ...args }, ref) => {
    return (
      <div className="w-full h-auto flex flex-col gap-2">
        <textarea
          ref={ref}
          className={`block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
          rows={rows}
          {...args}
        >
          {children}
        </textarea>
        {error && <OneLineError message={error} />}
      </div>
    );
  }
);

export default Textarea;
