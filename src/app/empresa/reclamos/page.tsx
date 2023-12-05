"use client";

import { EstadReclamo } from "@/types/reclamo";
import {
  dividirReclamosPorFecha,
  generateRandomReclamos,
} from "@/utils/reclamo";
import {
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { AtSymbolIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import whatsapp from "@/images/whatsapp.svg";
import gmail from "@/images/gmail.svg";
import phone from "@/images/phone.svg";

import Image from "next/image";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import { Reclamo } from "@/types/reclamo";
import useGlobal from "@/hooks/useGlobal";

import {
  useCerrarReclamoMutation,
  useListarReclamosQuery,
} from "@/store/service/ReclamoService";
import { DEFAULT_USER_IMAGE } from "@/utils/usuarios";
import toast from "react-hot-toast";
import { appRoutes } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";

const Reclamo = () => {
  const [selectedFilterActivo, setSelectedFilterActivo] = useState(null);
  const [reclamosToMap, setReclamosToMap] = useState<any>();
  const [fechas, setFechas] = useState<string[]>([]);
  const { push } = useRouter();

  const { data, isLoading } = useListarReclamosQuery("ReclamoInfo");

  const [reclamos, setReclamos] = useState<Reclamo[]>(data ? [...data] : []);

  const { handleSetLoading } = useGlobal();
  const [cerrarReclamo] = useCerrarReclamoMutation();

  useEffect(() => {
    if (data) {
      setReclamos(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      handleSetLoading(false);
      return;
    }
    handleSetLoading(true);
  }, [isLoading]);

  useEffect(() => {
    if (reclamos) {
      const reclamosToUse = selectedFilterActivo
        ? reclamos?.filter((itm: any) => itm?.estado === selectedFilterActivo)
        : reclamos;
      const divididosPorFecha = dividirReclamosPorFecha(reclamosToUse) ?? [];
      setReclamosToMap(divididosPorFecha ?? []);
      setFechas(Object.keys(divididosPorFecha));
    }
  }, [selectedFilterActivo, reclamos]);

  const handleCerrarReclamo = async (reclamoId: number) => {
    try {
      handleSetLoading(true);
      const resp = (await cerrarReclamo({
        reclamoId: reclamoId,
      })) as any;
      if (resp?.data?.ok) {
        toast.success("Reclamo cerrado correctamente");
      } else {
        toast.error("Error al cerrar reclamo");
      }
    } catch (error: any) {
      handleSetLoading(false);
      toast.error(error?.message ?? "Error al cerrar reclamo");
    } finally {
      handleSetLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow p-5 h-auto flex flex-col gap-10 items-start justify-start">
      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="font-semibold text-texto text-[30px] ">Reclamos</h1>
        <div className="w-[200px]">
          <Dropdown
            placeholder="Seleccionar Estado"
            items={[
              {
                label: "Activo",
                value: EstadReclamo.activo,
              },
              {
                label: "Cerrado",
                value: EstadReclamo.cerrado,
              },
            ]}
            onChange={(val: any) => setSelectedFilterActivo(val)}
          />
        </div>
      </div>

      <div className="flex w-full flex-row items-start justify-start flex-wrap gap-4">
        {fechas?.map((fecha, indexFecha) => {
          const reclamosOfFecha = reclamosToMap[fecha];
          return (
            <div
              key={`fecha-${indexFecha}`}
              className="flex flex-col w-full h-auto items-start justify-start"
            >
              <div className="w-full h-auto py-4 flex items-center justify-center">
                <div className="w-full rounded-full flex-grow h-[2px] bg-gray-300" />
                <span className="px-5 flex gap-2 items-center min-w-fit py-4 font-normal text-gray-400">
                  <ClockIcon
                    width={20}
                    color="rgb(156 163 175 / var(--tw-text-opacity))"
                  />
                  {fecha}
                </span>
                <div className="w-full rounded-full flex-grow h-[2px] bg-gray-300" />
              </div>
              {reclamosOfFecha?.map((item: any, index: any) => {
                return (
                  <div
                    className="w-full relative bg-white h-auto flex flex-col items-center justify-start gap-4 shadow-md px-5 py-4 rounded-2xl"
                    key={`reclamo-${index}`}
                  >
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="w-auto h-auto flex flex-row items-center justify-center gap-2">
                        <div className="w-[90px] min-w-[90px] rounded-full overflow-hidden h-[90px] relative">
                          <Image
                            src={item?.usuario?.imagen ?? DEFAULT_USER_IMAGE}
                            alt="User image"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="w-full h-auto flex flex-col items-start justify-start">
                          <span className="flex gap-2 items-center font-semibold text-left text-texto text-lg">
                            <UserCircleIcon width={20} color="#A3AED0" />
                            {item?.usuario.nombre}
                          </span>
                          <span className="flex gap-2 items-center text-base font-medium text-textogris">
                            <AtSymbolIcon width={20} color="#A3AED0" />{" "}
                            {item?.usuario.email}
                          </span>
                          <span className="flex gap-2 items-center text-base font-medium text-textogris">
                            <PhoneIcon width={20} color="#A3AED0" />{" "}
                            {item?.usuario.tel === ""
                              ? "No tiene"
                              : item?.usuario.tel}
                          </span>
                        </div>
                      </div>{" "}
                      {
                        <div className="w-full h-full gap-3 flex-grow flex items-center justify-end">
                          {item?.estado !== EstadReclamo.cerrado && (
                            <button
                              onClick={() => handleCerrarReclamo(item?.id)}
                              className="relative flex items-center text-white font-semibold gap-2 bg-green-700 cursor-pointer justify-center py-2 px-4 rounded-full shadow-sm"
                            >
                              <CheckIcon
                                width={20}
                                color="white"
                                strokeWidth={2}
                              />
                              Cerrar
                            </button>
                          )}

                          <span
                            onClick={() =>
                              push(
                                appRoutes.empresaVentaDetalleWithId(
                                  item?.compra?.id ?? 0
                                ) as never
                              )
                            }
                            className="text-indigo-600 cursor-pointer text-sm font-medium underline"
                          >
                            Ver detalles
                          </span>

                          {item?.usuario?.tel && item?.usuario?.tel !== "" && (
                            <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                              <a
                                href={`https://wa.me/${item?.usuario?.tel}`}
                                target="_blank"
                              >
                                <Image
                                  src={whatsapp}
                                  alt="Whatsapp Icon"
                                  layout="fill"
                                  objectFit="cover"
                                />{" "}
                              </a>
                            </button>
                          )}
                          {item?.usuario?.tel && item?.usuario?.tel !== "" && (
                            <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                              <a href={`tel:${item?.usuario?.tel}`}>
                                <Image
                                  src={phone}
                                  alt="Whatsapp Icon"
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </a>
                            </button>
                          )}

                          <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                            <a href={`mailTo:${item?.usuario?.email}`}>
                              <Image
                                src={gmail}
                                alt="Whatsapp Icon"
                                layout="fill"
                                objectFit="cover"
                              />
                            </a>
                          </button>
                          <span
                            className={clsx(
                              "ml-4 px-4 py-2 text-white font-medium rounded-lg",
                              item?.estado !== EstadReclamo.cerrado
                                ? "bg-green-600"
                                : "bg-yellow-600"
                            )}
                          >
                            {item?.estado}
                          </span>
                        </div>
                      }
                    </div>

                    <span className="w-full flex-grow h-auto text-left text-gray-400">
                      <b>Descripcion del reclamo</b>: {item?.description}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {reclamosToMap && Object.keys(reclamosToMap)?.length == 0 && (
        <span>No se encontraron resultados</span>
      )}
    </div>
  );
};

export default Reclamo;
