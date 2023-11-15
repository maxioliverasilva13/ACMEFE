"use client";

import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import useCarrito from "@/hooks/useCarrito";
import { CarritoList } from "@/types/productoList";
import { PRODUCT_NO_IMAGE } from "@/utils/usuarios";
import { getProductFinalPrice } from "@/utils/producto";
import useEmpresa from "@/hooks/useEmpresa";
import { appRoutes } from "@/utils/appRoutes";
import useGlobal from "@/hooks/useGlobal";
import { useBorrarLineaMutation } from "@/store/service/CarritoService";
import toast from "react-hot-toast";

const CartPage = () => {
  const { productos } = useCarrito();
  const { currentEmpresa } = useEmpresa();

  const { handleSetLoading } = useGlobal();
  const [handleDeleteLinea] = useBorrarLineaMutation();

  const handleDeleteCarritoLine = async (lineaId: number) => {
    handleSetLoading(true);

    try {
      const resp = (await handleDeleteLinea(lineaId)) as any;
      if (resp?.data?.ok) {
        toast.success("Error al eliminar producto del carrito");
      } else {
        throw new Error("Error al borrar linea");
      }
    } catch (error) {
      toast.error("Error al eliminar producto del carrito");
    } finally {
      handleSetLoading(false);
    }
  };

  let subtotal = 0;

  productos?.forEach((prod) => {
    const finalPrice = getProductFinalPrice(
      prod?.producto?.precio,
      prod?.producto?.tipoIva?.porcentaje ?? 0
    );
    subtotal += prod?.cantidad * finalPrice;
  });

  const orderTotal = Number(
    subtotal + (currentEmpresa?.costoEnvio ?? 0)
  ).toFixed(2);

  const renderProduct = (item: CarritoList, index: number) => {
    const { producto, cantidad, id } = item;
    const precioFinal = getProductFinalPrice(
      producto?.precio,
      producto?.tipoIva?.porcentaje ?? 0
    );

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={producto?.fotos ? producto?.fotos[0]?.url : PRODUCT_NO_IMAGE}
            alt={producto?.titulo ?? "Product Image"}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link
            href={
              appRoutes.productoDetailsFullPath(
                producto?.id,
                currentEmpresa?.id
              ) as any
            }
            className="absolute inset-0"
          ></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] flex-col ">
                <h3 className="text-base font-semibold">
                  <Link
                    href={
                      appRoutes.productoDetailsFullPath(
                        producto?.id,
                        currentEmpresa?.id
                      ) as any
                    }
                  >
                    {producto?.titulo}
                  </Link>
                </h3>
                <span>
                  Descripcion: {producto?.descripcion ?? "No descripcion"}
                </span>

                <p>
                  Tipo Iva:{" "}
                  <span className="font-semibold">
                    {producto?.tipoIva?.nombre} - %
                    {producto?.tipoIva?.porcentaje}
                  </span>
                </p>
              </div>

              <div className="hidden gap-2 flex-1 sm:flex justify-end">
                <Prices price={precioFinal ?? 0} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <span>Cantidad: {cantidad}</span>
            <span
              onClick={() => handleDeleteCarritoLine(id)}
              className="relative cursor-pointer z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span>Eliminar</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Mi Carrito
          </h2>
          {/* <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/" as any} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={"/collection"} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div> */}
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {productos.map(renderProduct)}
            {productos?.length === 0 && (
            <span>Al parecer aun no has agregado ningun producto</span>
          )}
          </div>
          
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          {productos?.length > 0 && <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">Resumen de la orden</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Envio estimado</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${currentEmpresa?.costoEnvio}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Total de la orden</span>
                  <span>{orderTotal}</span>
                </div>
              </div>
              <ButtonPrimary
                href={appRoutes.checkoutPath(currentEmpresa?.id) as any}
                className="mt-8 w-full"
              >
                Checkout
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center"></div>
            </div>
          </div>}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
