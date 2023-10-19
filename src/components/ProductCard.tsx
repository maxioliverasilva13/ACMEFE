"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
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
  const {
    id,
    nombre,
    descripcion,
    documentoPdf,
    precio,
    tipoIva,
    categorias,
    imagenes,
  } = data;

  const { } = useGlobal();

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={imagenes[0]?.url || DEFAULT_USER_IMAGE}
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
                  <span>
                    Natural
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={precio} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const getBorderClass = (Bgclass = "") => {
  //   if (Bgclass.includes("red")) {
  //     return "border-red-500";
  //   }
  //   if (Bgclass.includes("violet")) {
  //     return "border-violet-500";
  //   }
  //   if (Bgclass.includes("orange")) {
  //     return "border-orange-500";
  //   }
  //   if (Bgclass.includes("green")) {
  //     return "border-green-500";
  //   }
  //   if (Bgclass.includes("blue")) {
  //     return "border-blue-500";
  //   }
  //   if (Bgclass.includes("sky")) {
  //     return "border-sky-500";
  //   }
  //   if (Bgclass.includes("yellow")) {
  //     return "border-yellow-500";
  //   }
  //   return "border-transparent";
  // };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent w-[300px] ${className}`}
      >
        <Link
          href={
            (isEmpresa
              ? appRoutes.empresaPorductDetailsWithId(data?.id ?? 0)
              : appRoutes.productDetail()) as any
          }
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link
            href={
              (isEmpresa
                ? appRoutes.empresaPorductDetailsWithId(data?.id ?? 0)
                : appRoutes.productDetail()) as any
            }
            className="block"
          >
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={imagenes[0]?.url || DEFAULT_USER_IMAGE}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductStatus status={"New in"} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
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
                {5 || ""} ({3 || 0} Calificaciones)
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
