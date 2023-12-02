"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { StarIcon } from "@heroicons/react/24/solid";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { appRoutes } from "@/utils/appRoutes";
import { ProductoList } from "@/types/productoList";
import { DEFAULT_USER_IMAGE } from "@/utils/usuarios";
import useGlobal from "@/hooks/useGlobal";
import clsx from "clsx";
import useEmpresa from "@/hooks/useEmpresa";

export interface ProductCardProps {
  className?: string;
  data: ProductoList;
  isEmpresa?: boolean;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
  isEmpresa = false,
}) => {
  const { userInfo } = useGlobal();
  const isVendedor = userInfo?.roles?.includes("Usuario");
  const { currentEmpresa } = useEmpresa();

  const {
    id,
    nombre,
    descripcion,
    documentoPdf,
    precio,
    cantCalificaciones,
    rate,
    tipoIva,
    categorias,
    imagenes,
    activo,
  } = data;
  const {} = useGlobal();

  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={imagenes ? imagenes[0]?.url : DEFAULT_USER_IMAGE}
            alt={"Producto Imagen"}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{nombre}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>Natural</span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={precio} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            {/* <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                Ver carrito
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard border rounded-2xl shadow-sm border-gray-200 relative flex flex-col bg-transparent w-[300px] ${className}`}
      >
        <Link
          href={
            (isEmpresa
              ? appRoutes.empresaPorductDetailsWithId(data?.id ?? 0)
              : isVendedor
              ? appRoutes.productoDetailsFullPath(id, currentEmpresa?.id)
              : appRoutes.productDetail()) as any
          }
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link
            href={
              (isEmpresa
                ? appRoutes.empresaPorductDetailsWithId(data?.id ?? 0)
                : isVendedor
                ? appRoutes.productoDetailsFullPath(id, currentEmpresa?.id)
                : appRoutes.productDetail()) as any
            }
            className="block"
          >
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={imagenes ? imagenes[0]?.url : DEFAULT_USER_IMAGE}
              className={clsx(
                "object-cover w-full h-full drop-shadow-xl",
                !activo && "blur-sm"
              )}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
            {!activo && (
              <div className="w-full h-full top-0 absolute flex items-center justify-start ">
                <div className="absolute w-full h-full blur-xl bg-black/10 top-0 left-0 z-[1] " />
                <span className="w-full h-auto text-white text-base z-[2] font-semibold transition-all px-4 py-2 transform rotate-[42deg] bg-red-400 rounded-lg hover:scale-125 cursor-pointer">
                  Deshabilitado
                </span>
              </div>
            )}
          </Link>

          <ProductStatus status={"Nuevo"} />
          {!isEmpresa && (
            <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          )}
          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {nombre}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {descripcion}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={precio} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rate} ({cantCalificaciones || 0} Calificaciones)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
