"use client";

import Header from "@/components/Header/Header"; 

export const LayoutEmpresaId = ({ children }: any) => {
  return (
    <div className="md:px-20">
      <Header />
      {children}
    </div>
  );
};

export default LayoutEmpresaId;
