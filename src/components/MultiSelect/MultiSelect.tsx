"use client";

import { ItemDropdown } from "@/types/dropdown";
import { useEffect, useState } from "react";
import ButtonDropdown from "../ButtonDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  items: ItemDropdown[];
  onChange: any;
  placeholder: string;
}

const MultiSelect = ({ items, onChange, placeholder }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedValue);
      setExpanded(false);
    }
  }, [selectedValue]);

  const handleAddValue = (item: any) => {
    const exists = selectedValue?.find((itm) => itm?.value === item?.value);
    if (exists) {
      setSelectedValue(
        selectedValue?.filter((itm) => itm?.value !== item?.value)
      );
    } else {
      setSelectedValue([...selectedValue, item]);
    }
  };

  return (
    <div className="w-full h-auto relative flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto relative">
        <ButtonDropdown
          isOpen={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {placeholder}
        </ButtonDropdown>
        {expanded && (
          <div className="w-full appears z-[1111111] max-h-[400px] overflow-auto bg-white flex flex-col items-center border border-gray-300 jsutify-start h-auto shadow-md p-4 rounded-lg top-full absolute right-0">
            <button
              onClick={() => setSelectedValue([])}
              className="text-gray-800  px-4 cursor-pointer font-semibold text-left w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
            >
              Ninguno
            </button>
            {items?.map((item) => {
              return (
                <button
                  key={item?.value}
                  onClick={() => handleAddValue(item)}
                  className="text-gray-800 px-4  text-left cursor-pointer font-medium w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
                >
                  {item?.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-start gap-2 flex-wrap">
        {selectedValue?.map((itm, index) => {
          return (
            <div
              className="px-4 py-2 cursor-pointer flex flex-row gap-1 items-center rounded-full font-medium text-gray-800 shadow-sm bg-gray-200"
              key={`item-${index}`}
            >
              {itm?.label}
              <XMarkIcon onClick={() => handleAddValue(itm)} width={20} color="rgb(31 41 55 / var(--tw-text-opacity))" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
