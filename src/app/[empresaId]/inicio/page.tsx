"use client";

import React, { useEffect } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import { DEMO_MORE_EXPLORE_DATA_2 } from "@/components/SectionGridMoreExplore/data";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionHero3 from "@/components/SectionHero/SectionHero3";
import SectionPromo1 from "@/components/SectionPromo1";
import { SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import { useListarProductosByEmpresaQuery } from "@/store/service/ProductoService";
import useEmpresa from "@/hooks/useEmpresa";
import useGlobal from "@/hooks/useGlobal";
import {
  useListarCategoriasDeEmpresaQuery,
  useListarCategoriasQuery,
} from "@/store/service/CategoriaService";

function EmpresaHome() {
  const { currentEmpresa } = useEmpresa();
  const { handleSetLoading } = useGlobal();
  const {
    data: productos = [],
    isLoading: isLoadingProductos,
  } = useListarProductosByEmpresaQuery(currentEmpresa?.id);

  const {
    data: categorias = [],
    isLoading: isLoadingCategorias,
  } = useListarCategoriasDeEmpresaQuery(currentEmpresa?.id);

  const categoriasWithMaxCantProductos = [...categorias]?.sort((catA, catB) => {
    if (catA?.cantidadProductos >= catB?.cantidadProductos) {
      return -1;
    } else {
      return 1;
    }
  });
  const firstFiveCategories = categoriasWithMaxCantProductos?.slice(0, 5);

  useEffect(() => {
    handleSetLoading(isLoadingProductos || isLoadingCategorias);
  }, [isLoadingProductos, isLoadingCategorias]);

  const firstNewTwentyProductos = productos?.slice(0, 20);

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container px-4">
        <SectionHero3 />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionHowItWork />

        {/* SECTION */}
        {firstFiveCategories?.length > 0 && (
          <SectionSliderProductCard
            heading="Lo mas nuevo!"
            data={firstNewTwentyProductos ?? []}
            subHeading=""
          />
        )}
        {firstFiveCategories?.length === 0 && (
          <span className="text-gray-800 font-medium text-lg m-auto w-full">
            No se encontraron productos
          </span>
        )}
        {/* SECTION */}
        {currentEmpresa?.lookAndFeel.categoriaDestacada && <SectionPromo2 />}

        {/* SECTION */}
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          {firstFiveCategories?.length > 0 && (
            <SectionGridMoreExplore
              categorias={firstFiveCategories}
              data={[]}
              productos={productos}
            />
          )}
        </div>

        {/* SECTION */}
        {productos?.length > 0 && <SectionGridFeatureItems data={productos} />}

        {/* SECTION */}
        <SectionPromo1 />
      </div>
    </div>
  );
}

export default EmpresaHome;
