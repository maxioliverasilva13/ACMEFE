"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import { ProductoList } from "@/types/productoList";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: ProductoList[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2) as any[],
}) => {
  let sliderItem: any = null;
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    sliderItem = slider;
    setIsShow(true);
    // return () => {
    //   slider.destroy();
    // };
  }, [sliderRef.current, sliderRef]);

  useEffect(() => {
    return () => {
      if (sliderItem) {
        sliderItem.destroy();
      }
    };
  }, []);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
