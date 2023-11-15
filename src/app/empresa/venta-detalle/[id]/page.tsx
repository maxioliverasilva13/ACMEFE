"use client"

import { SortCompra } from "@/types/compra";
import Image from "next/image";
import Prices from "@/components/Prices";
import { useGetByIdQuery } from "@/store/service/CompraService";
import { ProductoList } from "@/types/productoList";
import dayjs from "dayjs";
import { useEffect } from "react";
import useGlobal from "@/hooks/useGlobal";


const renderProductItem = (linea: any, index: number) => {
    const { cantidad , precioUnitario ,subTotal} = linea;
    const producto = linea.productoLista;
    const { nombre, imagenes,  descripcion} = producto;

    const imagen = imagenes ? imagenes[0].url : "";
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
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
                  Precio unitario <span className="text-green-500">{precioUnitario}$</span>
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

const renderClienteItem = (comprador: any) => {
    const { nombre, celular, imagen ,email} = comprador;
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div className="flex gap-2 items-center">
            <Image
              src={imagen}
              alt={`Imagen de ${nombre}`}
              className="rounded-full h-10 w-10 object-cover"
              width={400}
              height={400}
            />
            <div className="flex flex-col">
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Cliente: {nombre} - {email}
                </p>
    
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Celular: {celular}
                </p>
            </div>
            
          </div>
          <div className="mt-3 sm:mt-0">
            {/* Assuming you have an image URL for the customer */}
            
          </div>
        </div>
      </div>
    );
  };

const renderOrderInfo = (orderInfo:any)=>{

    const formatDate = (dateStr:string)=>{
        return dayjs(dateStr).format("DD/MM/YYYY hh:mm a")
    }

    const  { id, fecha, comprador,costoTotal, cantidadDeProductos, metodoPago, metodoEnvio,lineas,estado} = orderInfo;
    return(
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
              <div className="flex justify-between flex-col sm:flex-row gap-4 sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">

              <div>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">  { formatDate(fecha) }</p>
                    <span className="text-primary-500 ml-2">{ estado }</span>

                </div>
                        
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                 Metodo de Entrega: { metodoEnvio }
              </p>
    
              
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Metodo de Pago:  {metodoPago}
              </p> 
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Cantidad de Productos: {cantidadDeProductos}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                Costo Total:  <span className="text-green-500 ml-2">{costoTotal}$</span>
              </p>

              </div>
              
              {renderClienteItem(comprador)}

              </div>

              <div className="flex flex-col bg-slate-50 p-5 shadow-lg">
                <h2 className="text-xl sm:text-xl font-semibold">Productos</h2> 

                {
                    lineas.map((linea:ProductoList,index:number)=>{
                        return (
                             renderProductItem(linea,index)
                        )
                    })
                }
              </div>
        
        </div>
        
    )
    
}

const VentaDetalle = () => {
        const { data, isLoading} = useGetByIdQuery(1);
        const orderInfo:any = data;
        const { handleSetLoading} = useGlobal();

        useEffect(()=>{
            handleSetLoading(true);
        },[])

        useEffect(()=>{
            if(!isLoading){
                handleSetLoading(false);
            }
        },[isLoading])
        return  (
            <div className="w-full">
                <h2 className="text-2xl sm:text-3xl font-semibold">Informacion de la venta</h2> 
                 { orderInfo ? renderOrderInfo(orderInfo) : null}
            </div>
            

        )
}



export default VentaDetalle;



