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

const OPTIONS: Partial<Glide.Options> = {
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

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2) as any[],
}) => {
  const [slider, setSlider] = useState<any>(null)

  useEffect(() => {
    if (!slider){
      setTimeout(() => {
        setSlider(new Glide(`.sliderItem`, OPTIONS))
      }, 1000);
    }
    if (slider) {
      slider.mount();
    }
    return () => {
      if (slider) {
      slider.destroy();
      }
    };
  }, [slider]);

  return (
    <div className={`nc-SectionSliderProductCard sliderItem ${className}`}>
      <div className={`flow-root`}>
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
