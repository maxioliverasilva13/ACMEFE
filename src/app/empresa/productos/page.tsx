"use client";

import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";
import { useRouter } from "next/navigation";

const Productos = () => {
  const { push } = useRouter();

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <div className="w-full h-auto flex flex-row items-center justify-between">
        <h1 className="text-texto font-semibold text-[30px]">Productos</h1>
        <ButtonPrimary
          onClick={() => push(appRoutes.empresaAgregarProductos() as Route)}
        >
          Agregar nuevo producto
        </ButtonPrimary>
      </div>

      <div className="flex-grow w-full mt-10 h-auto flex flex-row gap-4 items-start flex-wrap justify-start">
        {PRODUCTS.map((prod) => {
          return (
            <ProductCard isEmpresa data={prod} isLiked={false} key={prod?.id} />
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
