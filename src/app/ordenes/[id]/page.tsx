"use client";

import Image from "next/image";
import Prices from "@/components/Prices";
import { useGetByIdQuery } from "@/store/service/CompraService";
import { ProductoList } from "@/types/productoList";
import dayjs from "dayjs";
import { useEffect } from "react";
import useGlobal from "@/hooks/useGlobal";
import { separarMayusculas } from "@/utils/stirng";
import { useParams, usePathname } from "next/navigation";

const renderProductItem = (linea: any, index: number) => {
  const { cantidad, precioUnitario, subTotal } = linea;
  const producto = linea.productoLista;
  const { nombre, imagenes, descripcion } = producto;

  const imagen = imagenes ? imagenes[0].url : "";
  return (
    <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0 ">
      <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          fill
          sizes="100px"
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="text-base font-medium line-clamp-1">{nombre}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {descripcion}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Precio unitario{" "}
                <span className="text-green-500">{precioUnitario}$</span>
              </p>
            </div>
            <Prices className="mt-0.5 ml-2" price={subTotal} />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 dark:text-slate-400 flex items-center">
            <span className="hidden sm:inline-block">Cantidad</span>
            <span className="inline-block sm:hidden">{cantidad}</span>
            <span className="ml-2">{cantidad}</span>
          </p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 dark:text-primary-500 "
            >
              Ver Calificaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBtnImprimirFactura = () => {
  return (
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>Descargar Factura</span>
    </button>
  );
};

const renderOrderInfo = (orderInfo: any) => {
  const formatDate = (dateStr: string) => {
    return dayjs(dateStr).format("DD/MM/YYYY hh:mm a");
  };

  const {
    id,
    fecha,
    comprador,
    costoTotal,
    cantidadDeProductos,
    metodoPago,
    metodoEnvio,
    lineas,
    estado,
  } = orderInfo;
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 p-5">
      <div className="flex justify-between flex-col sm:flex-row gap-4 sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold"> {formatDate(fecha)}</p>
            <span className="text-primary-500 ml-2">
              {separarMayusculas(estado)}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Metodo de Entrega: {separarMayusculas(metodoEnvio)}
          </p>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Metodo de Pago: {metodoPago}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Cantidad de Productos: {cantidadDeProductos}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Costo Total:{" "}
            <span className="text-green-500 ml-2">{costoTotal}$</span>
          </p>
        </div>

        {renderBtnImprimirFactura()}
      </div>

      <div className="flex flex-col bg-slate-50 p-5 shadow-lg">
        <h2 className="text-xl sm:text-xl font-semibold">Productos</h2>

        {lineas.map((linea: any, index: number) => {
          return renderProductItem(linea, index);
        })}
      </div>
    </div>
  );
};

const ClienteOrdenDetalle = () => {
  const params = useParams();
  const ordenId = params?.id;
  const { data, isLoading } = useGetByIdQuery(Number(ordenId) ?? 0);
  const orderInfo: any = data;
  const { handleSetLoading } = useGlobal();

  useEffect(() => {
    handleSetLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleSetLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="w-full p-5">
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Informacion de la venta
      </h2>
      {orderInfo ? renderOrderInfo(orderInfo) : null}
    </div>
  );
};

export default ClienteOrdenDetalle;
