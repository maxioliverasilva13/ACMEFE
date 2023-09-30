"use client";

import {
  BuildingStorefrontIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    console.log("aca")
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("entro")
  }, [])

  return (
    <div className="w-auto h-full relative overflow-visible">
      <button
        className={clsx(
          "w-auto transition-all z-[10] transform h-auto p-2 rounded-full bg-gray-700 absolute top-10 -right-5",
          expanded ? "rotate-180" : "rotate-0"
        )}
        onClick={() => console.log("xd")}
      >
        <ChevronRightIcon
          onClick={() => console.log("xd")}
          className="font-bold"
          color="white"
          fontWeight="700"
          width={25}
        />
      </button>
      <div
        className={clsx(
          "h-full transition-all z-[5] relative max-h-full overflow-auto bg-gray-900 flex flex-col items-center justify-start md:px-10 md:py-10",
          expanded
            ? "md:w-[450px] md:min-w-[450px]"
            : "md:w-[200px] md:min-w-[200px]"
        )}
      >
        <span className="font-semibold text-[30px] text-white transition-all flex flex-row gap-2 items-center justify-start">
          <BuildingStorefrontIcon color="white" width={40} />
          {expanded && <span>ACME</span>}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
