"use client";

import { ItemDropdown } from "@/types/dropdown";
import { useEffect, useState } from "react";
import ButtonDropdown from "../ButtonDropdown";

interface Props {
  items: ItemDropdown[];
  onChange: any;
  placeholder: string;
}

const Dropdown = ({ items, onChange, placeholder }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ItemDropdown>();

  useEffect(() => {
    if (onChange) {
      onChange(selectedValue?.value);
      setExpanded(false);
    }
  }, [selectedValue]);

  return (
    <div className="w-full h-auto relative">
      <ButtonDropdown isOpen={expanded} onClick={() => setExpanded(!expanded)}>
        {selectedValue ? selectedValue?.label : placeholder}
      </ButtonDropdown>
      {expanded && (
        <div className="w-full appears z-[1111111] max-h-[400px] overflow-auto bg-white flex flex-col items-center border border-gray-300 jsutify-start h-auto shadow-md p-4 rounded-lg top-full absolute right-0">
          <button
            onClick={() => setSelectedValue(undefined)}
            className="text-gray-800  px-4 cursor-pointer font-semibold text-left w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
          >
            Todos
          </button>
          {items?.map((item) => {
            return (
              <button
                key={item?.value}
                onClick={() => setSelectedValue(item)}
                className="text-gray-800 px-4  text-left cursor-pointer font-semibold w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
              >
                {item?.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
