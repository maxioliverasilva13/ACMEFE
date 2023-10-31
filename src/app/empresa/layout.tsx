"use client";

import Spinner from "@/components/Spinner/Spinner";
import useEmpresa from "@/hooks/useEmpresa";
import useGlobal from "@/hooks/useGlobal";
import { useLazyGetEmpresaByIdQuery } from "@/store/service/EmpresaService";
import { Empresa } from "@/types/empresa";
import { useEffect, useState } from "react";
import Page404 from "../not-found";

export default function EmpresaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
    const { userInfo } = useGlobal()
  const [isValidEmpresa, setIsValidEmpresa] = useState(true);
  const [loadingEmpresa, setLoadingEmpresa] = useState(true);
  const [getEmpresa] = useLazyGetEmpresaByIdQuery();
  const empresaId = userInfo?.empresaId;
  const { handleSetEmpresa } = useEmpresa();

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

  if (loadingEmpresa) {
    return <Spinner />;
  }

  if (!isValidEmpresa) {
    return <Page404 />;
  }
  return children;
}
