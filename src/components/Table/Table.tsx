"use client";

import NotFoundImage from "@/images/NotFoundImage.svg";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { ColumnItem } from "@/types/table";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface PropsTable {
  cols: ColumnItem[];
  title: string;
  data?: any[];
  others?: any;
  multiDisabled?: boolean;
  selectedItems?: any;
  setSelectedItems?: any;
}

const Table = ({
  cols,
  title,
  data = [],
  others,
  multiDisabled,
  setSelectedItems,
  selectedItems,
}: PropsTable) => {
  const { push } = useRouter();

  const handleAddItem = (val: any, selectedItem: any) => {
    if (val) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      const newItems = selectedItems?.filter(
        (itm: any) => itm?.id !== selectedItem?.id
      );
      setSelectedItems(newItems);
    }
  };

  return (
    <div className="w-full h-auto transition-all flex overflow-hidden pt-4 pb-4 flex-col gap-3 items-start justify-start bg-white shadow-md rounded-[20px]">
      <h2 className="text-texto transition-all px-4 text-2xl font-bold max-w-full truncate">
        {title}
      </h2>
      <div className="transition-all px-4 border-b-2 border-borders2 w-fit min-w-full h-auto py-2 flex flex-row items-center justify-center gap-x-2 bg-white">
        {multiDisabled && (
          <div
            className={clsx(
              "transition-all overflow-hidden",
              multiDisabled
                ? "min-w-[50px] w-[50px] opacity-[100]"
                : "w-[0px] opacity-0"
            )}
          ></div>
        )}
        {cols?.map((col) => {
          return (
            <div
              className={clsx(
                "w-full transition-all gap-2 flex flex-row items-center justify-start flex-grow max-h-[50px] h-[50px]",
                col?.customWidth ? `w-[${col?.customWidth}]!` : "!w-full"
              )}
              key={col?.key}
            >
              {col?.icon}
              <span className="text-textogris text-sm font-semibold transition-all">
                {col?.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full transition-all max-h-full overflow-auto px-4 h-auto flex flex-col items-center justify-start">
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <div
                onClick={() =>
                  item?.action && !multiDisabled
                    ? item.action()
                    : item?.href && !multiDisabled
                    ? push(item?.href || "#")
                    : null
                }
                className={clsx(
                  "w-full select-none transition-all px-1 rounded-md flex flex-row max-w-full items-center py-4",
                  (item?.href || item?.action) && "itemRowTable !cursor-pointer"
                )}
                key={`row-${index}`}
              >
                <div
                  className={clsx(
                    "transition-all overflow-hidden",
                    multiDisabled
                      ? "min-w-[50px] w-[50px] opacity-[100]"
                      : "w-[0px] opacity-0"
                  )}
                >
                  {
                    <Checkbox
                      name="selection"
                      defaultChecked={
                        selectedItems?.find(
                          (itm: any) => itm?.id === item?.id
                        ) !== undefined
                      }
                      onChange={(val: any) => handleAddItem(val, item)}
                    />
                  }
                </div>

                {cols?.map((col, indexCol) => {
                  return (
                    <div
                      className="w-full h-full transition-all flex flex-col max-w-full truncate overflow-hidden bg-transparent pl-2"
                      key={`cell-${index}-${indexCol}`}
                    >
                      {item[col?.key]}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="w-full  h-auto flex flex-col items-center py-10 justify-center gap-4">
            <img
              src={NotFoundImage?.src}
              className="object-cover h-[300px] w-auto"
            />
            <div className="!text-[20px] !leading-[24px] h-auto! text-gray-800 font-medium text-lg">
              {`Ooops..! , no se encontraron ${title}`}
            </div>
          </div>
        )}
      </div>
      {others}
    </div>
  );
};

export default Table;
