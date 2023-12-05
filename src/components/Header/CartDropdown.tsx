"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { Fragment } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import useCarrito from "@/hooks/useCarrito";
import { SortProduct } from "@/types/producto";
import { CarritoList, ProductoList } from "@/types/productoList";
import { PRODUCT_NO_IMAGE } from "@/utils/usuarios";
import { appRoutes } from "@/utils/appRoutes";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";
import { useBorrarLineaMutation } from "@/store/service/CarritoService";
import useEmpresa from "@/hooks/useEmpresa";

export default function CartDropdown() {
  const { productos } = useCarrito();
  const { currentEmpresa } = useEmpresa();
  const { handleSetLoading } = useGlobal();
  const [handleDeleteLinea] = useBorrarLineaMutation();

  let subtotal = 0;

  productos?.forEach((prod) => {
    subtotal += Number(prod?.cantidad * prod?.producto?.precio);
  });

  const handleDeleteCarritoLine = async (lineaId: number) => {
    handleSetLoading(true);

    try {
      const resp = (await handleDeleteLinea(lineaId)) as any;
      if (resp?.data?.ok) {
        toast.success("¡Producto eliminado del carrito!");
      } else {
        throw new Error("Error al borrar linea");
      }
    } catch (error) {
      toast.error("Error al eliminar producto del carrito");
    } finally {
      handleSetLoading(false);
    }
  };

  const renderProduct = (
    item: CarritoList,
    index: number,
    close: () => void
  ) => {
    const { titulo, precio, fotos, id, descripcion } = item.producto;
    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={fotos && fotos?.length > 0 ? fotos[0]?.url : PRODUCT_NO_IMAGE}
            alt={titulo ?? "Imagen de producto"}
            className="h-full w-full border border-gray-300 overflow-hidden rounded-lg object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={appRoutes.productoDetailsFullPath(id, 0) as any}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} href={appRoutes.productoDetailsFullPath(id, currentEmpresa?.id) as any}>
                    {titulo}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {descripcion}
                </p>
              </div>
              <Prices price={precio} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Cantidad: ${
              item?.cantidad ?? 0
            }`}</p>

            <div className="flex">
              <button
                type="button"
                onClick={() => handleDeleteCarritoLine(item?.id ?? 0)}
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">{productos?.length ?? 0}</span>
            </div>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={appRoutes.carritoPath(currentEmpresa?.id) as any} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    <h3 className="text-xl font-semibold">Mi Carrito</h3>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                      {productos.map((item, index) =>
                        renderProduct(item, index, close)
                      )}
                    </div>
                    {productos?.length === 0 && <span className="text-sm">Aun no hay productos en el carrito...</span>}
                  </div>
                  <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                    <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          Los impuestos/iva y envio se calculan en checkout
                        </span>
                      </span>
                      <span className="">{subtotal}</span>
                    </p>
                    <div className="flex space-x-2 mt-5">
                      <ButtonSecondary
                        href={appRoutes.carritoPath(currentEmpresa?.id) as any}
                        className="flex-1 border border-slate-200 dark:border-slate-700"
                        onClick={close}
                      >
                        Ver carrito
                      </ButtonSecondary>
                      <ButtonPrimary
                        href={appRoutes.checkoutPath(currentEmpresa?.id) as any}
                        onClick={close}
                        className="flex-1"
                      >
                        Checkout
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
