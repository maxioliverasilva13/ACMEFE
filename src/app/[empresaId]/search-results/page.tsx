"use client";

import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import useEmpresa from "@/hooks/useEmpresa";
import useGlobal from "@/hooks/useGlobal";
import { useBuscarProductosQuery } from "@/store/service/ProductoService";
import { ProductoList } from "@/types/productoList";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

const SearchResultsPage = () => {
  const [hasFilters, setHasFilters] = useState(true);
  const [filtersProductos, setFiltersProductos] = useState<ProductoList[]>([]);
  const { query, handleSetLoading } = useGlobal();
  const { currentEmpresa } = useEmpresa();
  const { data, isLoading } = useBuscarProductosQuery(
    {
      query: query ?? "",
      empresaId: currentEmpresa?.id ?? 0,
    },
    {
      skip: query === "" || !query,
    }
  );

  useEffect(() => {
    handleSetLoading(isLoading);
  }, [isLoading]);

  const products = data as ProductoList[] ?? [];

  useEffect(() => {
    if (!hasFilters) {
      setFiltersProductos(products);
    }
  }, [hasFilters])

  
  return (
    <div className="w-full px-4 h-auto flex flex-col items-start justify-start gap-4">
      <h1 className="font-semibold text-gray-900 text-lg">
        Resultados de busqueda: {`'${query}'`}
      </h1>

      <Transition
        show={true}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
        <TabFilters
          setHasFilters={setHasFilters}
          filtersProducts={filtersProductos}
          setFiltersProductos={setFiltersProductos}
        />
      </Transition>
      {(hasFilters ? filtersProductos: products)?.length === 0 && (
        <span className="mt-4 font-medium text-sm">
          Ooops...! Al parecer no encontramos ningun producto
        </span>
      )}

      {products?.length > 0 && <div
        className={`flex flex-row items-start justify-start flex-wrap gap-4`}
      >
        {(hasFilters ? filtersProductos : products)?.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>}
    </div>
  );
};

export default SearchResultsPage;
