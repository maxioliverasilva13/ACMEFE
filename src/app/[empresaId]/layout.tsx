"use client";

import Header from "@/components/Header/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Page404 from "../not-found";
import Spinner from "@/components/Spinner/Spinner";
import { useLazyGetEmpresaByIdQuery } from "@/store/service/EmpresaService";
import { Empresa } from "@/types/empresa";
import useEmpresa from "@/hooks/useEmpresa";
import CarritoWrapper from "@/components/CarritoWrapper/CarritoWrapper";
import useGlobal from "@/hooks/useGlobal";

export const LayoutEmpresaId = ({ children }: any) => {
  const params = useParams();
  const [loadingEmpresa, setLoadingEmpresa] = useState(true);
  const [isValidEmpresa, setIsValidEmpresa] = useState(true);
  const empresaId = params?.empresaId;
  const { handleSetEmpresa } = useEmpresa();
  const [getEmpresa] = useLazyGetEmpresaByIdQuery();
  const { handleSetLoading } = useGlobal();

  useEffect(() => {
    handleSetLoading(loadingEmpresa)
  }, [loadingEmpresa])

  const handleLoadEmpresa = async () => {
    try {
      const resp = await getEmpresa(Number(empresaId ?? 0));
      const empresa = resp?.data as Empresa;
      if (!empresa) {
        setIsValidEmpresa(false);
        return;
      }
      handleSetEmpresa(empresa);
      setIsValidEmpresa(true);
    } catch (error) {
      setIsValidEmpresa(false);
    } finally {
      setLoadingEmpresa(false);
    }
  };

  useEffect(() => {
    if (empresaId) {
      handleLoadEmpresa();
    } else {
      setIsValidEmpresa(false);
    }
  }, [empresaId]);

  if (!isValidEmpresa) {
    return <Page404 />;
  }

  return (
    <div className="md:px-20">
      <Header />
      <CarritoWrapper>{children}</CarritoWrapper>
    </div>
  );
};

export default LayoutEmpresaId;
