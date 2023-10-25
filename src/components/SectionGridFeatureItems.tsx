import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "@/data/data";
import { ProductoList } from "@/types/productoList";

//
export interface SectionGridFeatureItemsProps {
  data?: ProductoList[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = [],
}) => {
  const [filtersProducts, setFiltersProductos] = useState<ProductoList[]>(data);
  const [hasFIlters, setHasFilters] = useState(false);

  useEffect(() => {
    if (!hasFIlters) {
      setFiltersProductos(data);
    }
  }, [hasFIlters])

  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection
        setHasFilters={setHasFilters}
        filtersProducts={filtersProducts}
        setFiltersProductos={setFiltersProductos}
      />
      <div
        className={`flex flex-row items-start justify-start flex-wrap gap-4`}
      >
        {(hasFIlters ? filtersProducts : data).map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;
