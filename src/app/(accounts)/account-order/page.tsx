"use client"

import Prices from "@/components/Prices";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";

import { useGetMisComprasQuery } from "@/store/service/CompraService";
import dayjs from "dayjs"; 
import { useRouter } from 'next/navigation'

export const AccountOrder = () => {
  const { push } = useRouter();


  const { data , isLoading } = useGetMisComprasQuery({});
  const compras:any = data; 


  const  viewOrderDetail = (id:number)=>{
     push("/ordenes/"+id  as any)
  }

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

  

  const formatDate = (dateStr:string)=>{
    return dayjs(dateStr).format("DD/MM/YYYY hh:mm a")
}

  const renderOrder = (compra:any, index:number) => {
    const { lineas } = compra;
    

    return (
      <div  key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">{formatDate(compra.fecha)}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
             
              <span className="text-primary-500">{compra.estado}</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
              onClick={() => viewOrderDetail(compra.id)}
            >
              Ver Detalles
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
             {
                    lineas.map((linea:any,index:number)=>{
                        return (
                             renderProductItem(linea,index)
                        )
                    })
                }
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Historial de Compras</h2>
      {
        compras ?
          compras.map((compra:any,index:number) =>{
            return (
                renderOrder(compra,index)
            )
          }) : null
      }
    </div>
  );
};

export default AccountOrder;
