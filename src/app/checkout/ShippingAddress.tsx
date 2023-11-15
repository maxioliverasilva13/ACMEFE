"use client";

import Label from "@/components/Label/Label";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Radio from "@/shared/Radio/Radio";
import useGlobal from "@/hooks/useGlobal";
import useCarrito from "@/hooks/useCarrito";
import Link from "next/link";
import { appRoutes } from "@/utils/appRoutes";

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
}) => {
  const { userInfo } = useGlobal();
  const myDirecciones = userInfo?.direcciones ?? [];
  const { selectedAddressId, handleSetSelectedAddressId } = useCarrito();

  const selectedDireccionInfo = myDirecciones?.find(
    (item: any) => item?.id === selectedAddressId
  );

  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">Direccion de envio</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">
                {selectedAddressId
                  ? `${selectedDireccionInfo?.calle} ${selectedDireccionInfo?.nroPuerta} - entre ${selectedDireccionInfo?.calleEntre1} y ${selectedDireccionInfo?.calleEntre1}`
                  : "Selecciune una direccion para el envio del paquete"}
              </span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={onOpenActive}
          >
            Cambiar
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div>
            <Label className="text-sm">Selecciona una direccion</Label>
            <div className="mt-1.5 flex flex-row items-center justify-start flex-wrap gap-2">
              {myDirecciones?.map((item: any) => {
                return (
                  <div
                    key={item?.id}
                    className="p-4 border border-gray-300 shadow-md pt-0 rounded-2xl flex flex-col items-start justify-start gap-2"
                  >
                    <Radio
                      key={item?.id}
                      className="pt-3.5"
                      label={`<div class='w-full flex-grow max-w-[200px] flex flex-col items-start justify-start gap-1'>
                <span class="text-sm font-medium" title="${item?.nombre}">${item?.nombre}</span>
                <span class="text-xs max-w-full overflow-hidden truncate font-medium">${item?.ciudadNombre} - ${item?.ciudadDepartamentoNombre}</span>
                <span title="${item?.calle} ${item?.nroPuerta} - entre ${item?.calleEntre1} y ${item?.calleEntre2}" class="text-[10px] max-w-full overflow-hidden truncate  -mt-1 ">${item?.calle} ${item?.nroPuerta} - entre ${item?.calleEntre1} y ${item?.calleEntre1}</span>
                </div>`}
                      name="sucursal-selected"
                      id={item?.id?.toString()}
                      defaultChecked={selectedAddressId === item?.id}
                      onChange={() => handleSetSelectedAddressId(item?.id)}
                    />
                  </div>
                );
              })}
              {myDirecciones?.length === 0 && (
                <span className="text-sm">
                  Al parecer este usuario no tiene niguna dirección,{" "}
                  <Link href={appRoutes.userAccount() as any} className="text-primary-500 font-medium">
                    agrega una nueva en tu perfil
                  </Link>
                  .
                </span>
              )}
            </div>
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={onCloseActive}
            >
              Guardar y continuar al pago
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={onCloseActive}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
