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
  defaultValue?: any;
}

const Dropdown = ({ items, onChange, placeholder, error, onlyOneSelectable = false, defaultValue }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ItemDropdown>();
  let isSetted = false;

  useEffect(() => {
    if (onChange) {
      onChange(selectedValue?.value);
      setExpanded(false);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (!selectedValue && defaultValue && items?.length > 0) {
      isSetted = true;
      setSelectedValue(items?.find((itm) => itm.value === defaultValue))
    }

  }, [defaultValue, items])

  useEffect(() => {
    return () => {
      isSetted = false;
    }
  }, [])

  return (
    <div className="w-full h-auto relative">
      <ButtonDropdown isOpen={expanded} onClick={() => setExpanded(!expanded)} error={error} type="button">
        {selectedValue ? selectedValue?.label : placeholder}
      </ButtonDropdown>
      {expanded && (
        <div className="w-full appears z-[1111111] max-h-[400px] overflow-auto bg-white flex flex-col items-center border border-gray-300 jsutify-start h-auto shadow-md p-4 rounded-lg top-full absolute right-0">
          { !onlyOneSelectable && <button
            onClick={() => setSelectedValue(undefined)}
            type="button"
            className="text-gray-800  px-4 cursor-pointer font-semibold text-left w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
          >
            Todos
          </button>}
          {onlyOneSelectable && <button
              type="button"
              onClick={() => setSelectedValue(undefined)}
              className="text-gray-800  px-4 cursor-pointer font-semibold text-left w-full h-auto py-2 rounded-lg bg-transparent hover:bg-gray-200"
            >
              Ninguno
            </button>}
          {items?.map((item, index) => {
            return (
              <button
              key={`dropdown-item-${index}`}
                type="button"
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
