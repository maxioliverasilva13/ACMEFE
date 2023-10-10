"use client";

import { ItemDropdown } from "@/types/dropdown";
import { useEffect, useState } from "react";
import ButtonDropdown from "../ButtonDropdown";
import OneLineError from "../OneLineError/OneLineError";

interface Props {
  items: ItemDropdown[];
  onChange: any;
  placeholder: string;
  error?: any;
  onlyOneSelectable?: boolean;
}

const Dropdown = ({ items, onChange, placeholder, error, onlyOneSelectable = false }: Props) => {
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
      <ButtonDropdown isOpen={expanded} onClick={() => setExpanded(!expanded)} error={error}>
        {selectedValue ? selectedValue?.label : placeholder}
      </ButtonDropdown>
      {expanded && (
        <div className="w-full appears z-[1111111] max-h-[400px] overflow-auto bg-white flex flex-col items-center border border-gray-300 jsutify-start h-auto shadow-md p-4 rounded-lg top-full absolute right-0">
          { !onlyOneSelectable && <button
            onClick={() => setSelectedValue(undefined)}
            className="text-gray-800  px-4 cursor-pointer font-semibold text-left w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
          >
            Todos
          </button>}
          {items?.map((item, index) => {
            return (
              <button
              key={`dropdown-item-${index}`}
                onClick={() => setSelectedValue(item)}
                className="text-gray-800 px-4  text-left cursor-pointer font-medium w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
              >
                {item?.label}
              </button>
            );
          })}
        </div>
      )}
      {error && <OneLineError message={error} />}
    </div>
  );
};

export default Dropdown;
