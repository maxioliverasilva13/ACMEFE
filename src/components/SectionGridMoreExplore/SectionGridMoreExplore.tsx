"use client";

import React, { FC, useState } from "react";
import CardCategory1 from "@/components/CardCategories/CardCategory1";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import CardCategory6 from "@/components/CardCategories/CardCategory6";
import { DEMO_MORE_EXPLORE_DATA, ExploreType } from "./data";
import { CategoriaList } from "@/types/categoria";
import { TagIcon } from "@heroicons/react/24/solid";
import { ProductoList } from "@/types/productoList";
import ProductCard from "../ProductCard";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
  categorias?: CategoriaList[];
  productos?: ProductoList[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
  categorias = [],
  productos = [],
}) => {
  const [tabActive, setTabActive] = useState<number>(0);

  const productoWithThisCategory = productos?.filter((prod) => {
    const categorias = prod?.categorias;
    const existsThisCategory = categorias?.find((itm) => itm.id === tabActive);
    return existsThisCategory !== undefined;
  });

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Empieza a explorar
        </Heading>
        <div className="w-full m-auto flex items-center justify-center my-4">
          <span className="w-full h-auto text-center m-auto">
            Estas son las 5 categorias con mas productos
          </span>
        </div>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
          containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {categorias.map((item, index) => (
            <NavItem2
              key={index}
              isActive={tabActive === item?.categoriaId}
              onClick={() => setTabActive(item.categoriaId)}
            >
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
              <TagIcon color={tabActive !== item?.categoriaId ? "black": "white"} strokeWidth={2} width={16} />
                <span>{item.categoriaNombre}</span>
              </div>
            </NavItem2>
          ))}
        </Nav>
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      <div className="flex w-full flex-row items-center justify-start gap-4 flex-wrap">
        {productoWithThisCategory.map((item, index) => (
          <ProductCard key={`productoCard-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
