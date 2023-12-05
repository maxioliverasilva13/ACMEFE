"use client";

import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/aboutUs.png";
import detail2JPG from "@/images/aboutUs.png";
import detail3JPG from "@/images/aboutUs.png";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { ProductoList } from "@/types/productoList";
import { DEFAULT_USER_IMAGE } from "@/utils/usuarios";
import useGlobal from "@/hooks/useGlobal";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import DeleteProductoModal from "@/components/DeleteProductoModal/DeleteProductoModal";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";
import ProductCard from "@/components/ProductCard";
import { useAgregarProductoACarritoMutation } from "@/store/service/CarritoService";
import { toast as toastify } from "react-toastify";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

interface Props {
  product: ProductoList;
  isEmpresa: boolean;
}

const ProductDetailPage = ({ product, isEmpresa = false }: Props) => {
  const imagenes = product?.imagenes ?? [];
  const { userInfo, handleSetProductoToEdit, handleSetLoading } = useGlobal();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const isVendedor = userInfo?.roles?.includes("Vendedor") ?? false;
  const isUsuario = userInfo?.roles?.includes("Usuario") ?? false;

  const [handleAddProductToCart] = useAgregarProductoACarritoMutation();

  const { push } = useRouter();

  const [variantActive, setVariantActive] = useState(0);
  const [qualitySelected, setQualitySelected] = useState(1);
  /* const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false); */

  //
  const notifyAddTocart = async () => {
    try {
      handleSetLoading(true);
      const dataToSend = {
        ProductoId: product?.id,
        Cantidad: qualitySelected,
      };
      const resp = (await handleAddProductToCart(dataToSend)) as any;
      if (resp?.data?.ok) {
        toast.custom(
          (t) => (
            <NotifyAddTocart
              productImage={imagenes ? imagenes[0]?.url : DEFAULT_USER_IMAGE}
              qualitySelected={qualitySelected}
              show={t.visible}
              price={product?.precio}
              name={product?.nombre}
              descripcion={product?.descripcion}
              variantActive={variantActive}
            />
          ),
          { position: "top-right", id: "nc-product-notify", duration: 3000 }
        );
      } else {
        throw new Error("Error al agregar producto al carrito");
      }
    } catch (error) {
      toastify.error("Error al agregar producto al carrito");
    } finally {
      handleSetLoading(false);
    }
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {product?.nombre}
          </h2>
          {!product?.activo && (
            <p className="h-auto px-4 py-2 my-4 w-fit rounded-lg shadow-sm text-white bg-red-400">
              Producto deshabilitado
            </p>
          )}

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={product?.precio}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>{product.rate}</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    {product.cantCalificaciones} reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        {isUsuario && (
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                defaultValue={qualitySelected}
                onChange={setQualitySelected}
              />
            </div>
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={notifyAddTocart}
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">Agregar al carrito</span>
            </ButtonPrimary>
          </div>
        )}

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Descripción del producto</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>{product?.descripcion}</p>
        </div>

        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <span>Tipo de iva:</span>
          <span className="font-bold ml-2 text-gray-900">
            {product?.tipoIva?.nombre} - %{product?.tipoIva?.porcentaje}
          </span>
        </div>

        <h2 className="text-2xl font-semibold mt-7">Categorías</h2>
        <div className="flex mt-4 flex-row items-center jsutify-start flex-wrap gap-4">
          {product?.categorias?.map((cat) => {
            return (
              <div
                className="px-4 py-2 rounded-2xl shadow-sm bg-gray-300"
                key={cat?.id}
              >
                {cat?.nombre}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5 text-yellow-500" />
          <span className="ml-1.5">
            {" "}
            {product.rate} · {product.cantCalificaciones} Calificaciones
          </span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div
            id="reviews"
            className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28"
          >
            {product?.calificaciones?.length === 0 && (
              <span className="font-medium text-base text-gray-900">
                Este producto aún no tiene ninguna calificación.
              </span>
            )}
            {product.calificaciones?.map((item) => {
              return (
                <ReviewItem
                  key={item?.calificacionId}
                  data={{
                    comment: item?.descripcion,
                    name: item?.usuarioNombre,
                    starPoint: item?.rate ?? 0,
                    avatar: item?.usuarioImagen,
                  }}
                />
              );
            })}
          </div>

          {/* <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary> */}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                <img
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src={imagenes ? imagenes[0]?.url : DEFAULT_USER_IMAGE}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {renderStatus()}
              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {imagenes.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <Image
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      src={item?.url}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          <h2 className="font-bold text-2xl text-gray-900">
            Productos relacionados
          </h2>
          <div className="w-full h-auto flex flex-row items-center justify-start gap-4 flex-wrap">
            {product?.productosRelacionados?.map((prod) => {
              return (
                <ProductCard
                  isEmpresa
                  data={prod}
                  isLiked={false}
                  key={prod?.id}
                />
              );
            })}
            {product?.productosRelacionados?.length === 0 && (
              <span className="font-medium text-base text-gray-900">
                Este producto aún no tiene productos relacionados
              </span>
            )}
          </div>
          {/* SECTION */}
          <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div>
        </div>

        <div className="w-full h-auto flex flex-row items-center justify-start gap-4 flex-wrap">
          {isVendedor && product.activo && (
            <ButtonPrimary
              icon={<PencilIcon width={20} color="white" />}
              onClick={() => {
                handleSetProductoToEdit(product);
                push(appRoutes.empresaEditarProducto() as Route);
              }}
            >
              Editar Producto
            </ButtonPrimary>
          )}
          {isVendedor && product.activo && (
            <ButtonDelete
              icon={<TrashIcon width={20} color="white" />}
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            >
              Borrar Producto
            </ButtonDelete>
          )}
        </div>
      </main>

      <DeleteProductoModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        productId={product.id}
      />

      {/* MODAL VIEW ALL REVIEW */}
      {/* <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      /> */}
    </div>
  );
};

export default ProductDetailPage;
