

import React from "react";
import logoImg from "@/images/logo.svg";
import logoLightImg from "@/images/logo-light.svg";
import Link from "next/link";
import Image from "next/image";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";
import useEmpresa from "@/hooks/useEmpresa";
import NotFoundImage from "@/images/NotFoundImage.svg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "flex-shrink-0",
}) => {
  const { currentEmpresa } = useEmpresa();

  return (
    <Link
      href={appRoutes.userInicio() as Route}
      className={`ttnc-logo flex flex-row items-center justify-start gap-4 text-slate-600 ${className}`}
    >
      {currentEmpresa?.imagen && <div className="w-[45px] h-[45px] rounded-full overflow-hidden relative shadow-sm">
        <Image
          src={currentEmpresa?.imagen ?? NotFoundImage}
          alt="Empresa Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>}
      <span className="font-medium text-2xl">
        {currentEmpresa?.lookAndFeel.nombreSitio ?? "ACME"}
      </span>
    </Link>
  );
};

export default Logo;
