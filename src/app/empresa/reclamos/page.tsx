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

import { useListarReclamosQuery } from "@/store/service/ReclamoService";

const Reclamo = () => {
  const [selectedFilterActivo, setSelectedFilterActivo] = useState(null);
  const [reclamosToMap, setReclamosToMap] = useState<any>();
  const [fechas, setFechas] = useState<string[]>([]);

  const { data , isLoading} = useListarReclamosQuery("ReclamoInfo");

  const [reclamos, setReclamos] = useState<Reclamo[]>(data ? [...data] : []);

  const { handleSetLoading } = useGlobal();

  useEffect(()=>{
    if(data){
      setReclamos(data)
    }
  },[data])

  useEffect(()=>{
      if(!isLoading){
         handleSetLoading(false)
         return;
      }
      handleSetLoading(true);
  }, [isLoading])

  
  useEffect(() => {
    if (reclamos) {
      const reclamosToUse = selectedFilterActivo
        ? reclamos?.filter((itm: any) => itm?.estado === selectedFilterActivo)
        : reclamos;
      const divididosPorFecha = dividirReclamosPorFecha(reclamosToUse) ?? [];
      setReclamosToMap(divididosPorFecha ?? []);
      setFechas(Object.keys(divididosPorFecha));
    }
  }, [selectedFilterActivo,reclamos]);

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
                    className="w-[550px] relative bg-white h-[350px] flex flex-col items-start justify-start gap-4 shadow-md px-5 py-4 rounded-2xl"
                    key={`reclamo-${index}`}
                  >
                    <span
                      className={clsx(
                        "w-auto absolute right-4 top-4 h-auto px-4 py-2 text-white font-medium rounded-lg",
                        item?.estado !== EstadReclamo.cerrado
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      )}
                    >
                      {item?.estado}
                    </span>
                    <div className="w-auto h-auto flex flex-row items-center justify-center gap-2">
                      
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
                          {item?.usuario.tel}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-auto flex flex-col items-center justify-start gap-2">
                    
                      <span className="w-full text-center text-gray-400">
                        {item?.description}
                      </span>
                    </div>
                   
                    {item?.estado !== EstadReclamo.cerrado && (
                      
                      <div className="w-full h-full gap-3 flex-grow flex items-center justify-end">

                        <button className="relative flex items-center text-white font-semibold gap-2 bg-green-700 cursor-pointer justify-center py-2 px-4 rounded-full shadow-sm">
                          <CheckIcon width={20} color="white" strokeWidth={2} />
                          Cerrar
                        </button>

                        <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                          <Image
                            src={whatsapp}
                            alt="Whatsapp Icon"
                            layout="fill"
                            objectFit="cover"
                          />
                        </button>

                        <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                          <Image
                            src={phone}
                            alt="Whatsapp Icon"
                            layout="fill"
                            objectFit="cover"
                          />
                        </button>

                        <button className="w-[36px] min-w-[36px] h-[36px] relative  cursor-pointer flex items-center justify-center p-2 rounded-full shadow-sm">
                          <Image
                            src={gmail}
                            alt="Whatsapp Icon"
                            layout="fill"
                            objectFit="cover"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reclamo;
