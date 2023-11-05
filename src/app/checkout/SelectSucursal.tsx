import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import useCarrito from "@/hooks/useCarrito";
import useGlobal from "@/hooks/useGlobal";
import useEmpresa from "@/hooks/useEmpresa";
import { useListPickupsByEMpresaQuery } from "@/store/service/PickupService";
import ViewSucursalDetails from "@/components/ViewSucursalDetails/ViewSucursalDetails";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const SelectSucursal: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
}) => {
  const { selectedSucursalId, handleSetSelectedSucursalId } = useCarrito();

  const { handleSetLoading } = useGlobal();
  const { currentEmpresa } = useEmpresa();
  const { data: pickups, isLoading } = useListPickupsByEMpresaQuery(
    currentEmpresa?.id
  );
  const [selectedSucursalToSee, setSelectedSucursalToSee] = useState<any>();

  const selectedSucursalInfo = pickups?.find((item: any) => item?.id === selectedSucursalId)

  useEffect(() => {
    handleSetLoading(isLoading);
  }, [isLoading]);

  const renderSelectSucursal = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">
                Selecciona una sucursal
              </span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <span className="text-xs text-gray-900 font-semibold">
              {
                selectedSucursalId ? `
                ${selectedSucursalInfo?.calle} ${selectedSucursalInfo?.nroPuerta} - entre ${selectedSucursalInfo?.calleEntre1} y ${selectedSucursalInfo?.calleEntre1}
                ` : `Selecciona la sucursal en la cual deseas retirar la compra`
              }
            </span>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={() => onOpenActive()}
          >
            Cambiar
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          {pickups?.length === 0 && (
            <span>Oops!... al parecer no hay ningun pickup</span>
          )}

          <div className="flex flex-row items-center flex-wrap justify-start gap-4 flex-grow w-full">
            {pickups?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="p-4 border border-gray-300 shadow-md pt-0 rounded-2xl flex flex-col items-start justify-start gap-2"
                >
                  <Radio
                    key={item?.id}
                    className="pt-3.5"
                    label={`<div class='w-full flex-grow flex flex-col items-start justify-start gap-1'>
                <span class="text-sm font-medium">${item?.nombre}</span>
                <span class="text-xs max-w-[120px] overflow-hidden truncate font-medium">${item?.ciudadNombre} - ${item?.departamentoNombre}</span>
                <span class="text-[10px] -mt-1 ">${item?.calle} ${item?.nroPuerta} - entre ${item?.calleEntre1} y ${item?.calleEntre1}                </span>
                </div>`}
                    name="sucursal-selected"
                    id={item?.id?.toString()}
                    defaultChecked={selectedSucursalId === item?.id}
                    onChange={() => handleSetSelectedSucursalId(item?.id)}
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedSucursalToSee(item)}
                    className="font-medium text-sm text-primary-6000 dark:text-primary-500 "
                  >
                    Ver detalles
                  </button>
                </div>
              );
            })}
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={() => onCloseActive()}
            >
              Guardar y contiunar al envio
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSelectSucursal()}
      {typeof selectedSucursalToSee !== "undefined" && (
        <ViewSucursalDetails
          open={true}
          pickup={selectedSucursalToSee}
          setOpen={() => {
            setSelectedSucursalToSee(undefined);
          }}
        />
      )}
    </>
  );
};

export default SelectSucursal;
