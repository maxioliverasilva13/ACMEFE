"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
  withHover?: boolean;
  setPuntuacion?: Function;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
  withHover = true,
  setPuntuacion = () => null,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  const handleChangePuntuacion = (rate: number) => {
    setPoint(rate);
    if (setPuntuacion) {
      setPuntuacion(rate);
    }
  };

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${
              point >= item || currentHover >= item ? "text-yellow-500" : ""
            } ${iconClass}`}
            onMouseEnter={() => withHover && setCurrentHover(() => item)}
            onMouseLeave={() => withHover && setCurrentHover(() => 0)}
            onClick={() => withHover && handleChangePuntuacion(item)}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
