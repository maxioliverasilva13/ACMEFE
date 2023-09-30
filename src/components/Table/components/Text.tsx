"use client";

interface Props {
  message: string;
}

const Text = ({ message }: Props) => {
  return (
    <span className="max-w-full overflow-hidden truncate text-base font-medium text-texto">
      {message}
    </span>
  );
};

export default Text;
