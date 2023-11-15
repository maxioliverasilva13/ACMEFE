"use client"

import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useListVentasByEmpresaQuery } from "@/store/service/EmpresaService";
import dayjs from "dayjs";
import useGlobal from "@/hooks/useGlobal";
import { useEffect } from "react";
import { useRouter } from 'next/router'



export const EmpresaVentas = () => {
  const { push } = useRouter();

  const  viewVentaDetail = (id:number)=>{
    push("/empresa/venta-detalle/"+id)
  }
  const { handleSetLoading } = useGlobal();

  const formatDate = (dateStr:string)=>{
    return dayjs(dateStr).format("DD/MM/YYYY hh:mm a")
  }
  const { data, isLoading } = useListVentasByEmpresaQuery({}); 

  const ventas:any = data ?? [];

  useEffect(()=>{
    handleSetLoading(true);
  },[]);

  useEffect(()=>{
    if(!isLoading){
      handleSetLoading(false);
    }
  },[isLoading]);
  
 

  const renderOrder = () => {
    
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        {
          ventas.map((venta:any) =>{
            return (
              <div key={venta.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
              <div>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">  { formatDate(venta.fecha)}</p>
                    <span className="text-primary-500 ml-2">{venta.estado}</span>

                </div>
              
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                  Cliente: { venta.user.nombre} - { venta.user.email}
                </p>
    
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                 Metodo de Entrega: {venta.metodoEnvio}
              </p>
    
              
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Metodo de Pago: {venta.metodoPago}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Cantidad de Productos: {venta.cantidadDeProductos}
              </p>
              </div>
              <div className="mt-3 sm:mt-0">
                <ButtonSecondary
                  sizeClass="py-2.5 px-4 sm:px-6"
                  fontSize="text-sm font-medium"
                  onClick={()=>viewVentaDetail(venta.id)}
                >
                  Ver Detalle de la Venta
                </ButtonSecondary>
              </div>
              </div>
            );
            
  
          })
        }
        
    
        
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Historial de Ventas</h2>
      {renderOrder()}
    </div>
  );
};

export default EmpresaVentas;
