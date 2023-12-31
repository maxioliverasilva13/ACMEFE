"use client";
import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/promo2.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";
import useEmpresa from "@/hooks/useEmpresa";
import { DEFAULT_CATEGORIA_DESTACADA_IMAGE } from "@/utils/categoria";
import Link from "next/link";
import { appRoutes } from "@/utils/appRoutes";

export interface SectionPromo2Props {
  className?: string;
}

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10" }) => {
  const { currentEmpresa } = useEmpresa();
  const categoriaDestacada = currentEmpresa?.lookAndFeel.categoriaDestacada;

  if (!categoriaDestacada) {
    return null;
  }

  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Logo className="w-28" />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
            {categoriaDestacada?.nombre}
          </h2>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <Link href={appRoutes.searchResults(currentEmpresa?.id) as never}>
              <ButtonPrimary
                // TODO: Filtrar productos por esta categoria al clickear
                // href="/search"
                className="dark:bg-slate-200 dark:text-slate-900"
              >
                Filtrar por esta categoría
              </ButtonPrimary>
            </Link>
          </div>
        </div>

        <NcImage
          alt=""
          containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
          src={
            categoriaDestacada?.imagenUrl || DEFAULT_CATEGORIA_DESTACADA_IMAGE
          }
          sizes="(max-width: 768px) 100vw, 50vw"
          width={768}
          height={100}
        />
      </div>
    </div>
  );
};

export default SectionPromo2;
