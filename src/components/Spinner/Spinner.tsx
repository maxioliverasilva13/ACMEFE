"use client";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="w-screen h-screen z-[500000] fixed top-0 bg-black bg-opacity-50 flex items-center justify-center">
      <RingLoader color="#4318FF" size={150} />
    </div>
  );
};

export default Spinner;
