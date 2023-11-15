"use client";

import { appRoutes } from "@/utils/appRoutes";
import { AdminDashboardItems, EmpresaDashboardItems } from "@/utils/dashboard";
import {
  BuildingStorefrontIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AvatarDropdown from "../Header/AvatarDropdown";
import useGlobal from "@/hooks/useGlobal";

const Dashboard = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandedUserAccount, setExpandedUserAccount] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.includes("/admin");
  const { userInfo } = useGlobal();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const itemsToUse = isAdmin ? AdminDashboardItems : EmpresaDashboardItems;

  const handleGetRoleString = () => {
    if (userInfo?.roles?.includes("Admin")) {
      return "Administrador";
    } else if (userInfo?.roles?.includes("Vendedor")) {
      return "Vendedor";
    } else {
      return "Usuario";
    }
  };

  return (
    <div className="w-auto h-full relative overflow-visible">
      <button
        className={clsx(
          "w-auto flex items-center justify-center transition-all z-[10] transform h-auto p-2 rounded-full bg-gray-700 absolute top-10 -right-5",
          expanded ? "rotate-180" : "rotate-0"
        )}
        onClick={() => toggleExpanded()}
      >
        <ChevronRightIcon
          className="font-bold fit-cover"
          color="white"
          fontWeight="700"
          width={25}
        />
      </button>
      <div
        className={clsx(
          "h-full transition-all z-[5] overflow-visible relative max-h-full overflow-auto bg-gray-900 flex flex-col items-center justify-start md:px-4 md:py-10",
          expanded
            ? "md:w-[320px] md:min-w-[320px]"
            : "md:w-[100px] md:min-w-[100px]"
        )}
      >
        <span className="font-semibold text-[30px] text-white transition-all flex flex-row gap-2 items-center justify-start">
          <BuildingStorefrontIcon color="white" width={40} />
          {expanded && <span>ACME</span>}
        </span>

        <div className="w-full mt-10 h-auto flex flex-col items-start jsutify-start gap-4">
          {itemsToUse?.map((item) => {
            const isActive = item?.validPath?.includes(pathname);

            return (
              <Link
                key={item?.title}
                href={{
                  pathname: item?.href || "#",
                }}
                className={clsx(
                  "w-full h-auto gap-4 rounded-lg text-white shadow-md flex flex-row transition-all",
                  expanded
                    ? "items-center justify-start px-6 py-4"
                    : "items-center justify-center px-2 py-4",
                  isActive
                    ? "bg-purple-200/30"
                    : "bg-transparent hover:bg-white/10"
                )}
              >
                {item?.icon}
                {expanded && (
                  <span className="text-lg text-white font-semibold">
                    {item?.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Badge */}
        <div
          className={clsx(
            "w-full cursor-pointer flex flex-row items-center gap-2 absolute bottom-0 left-0 h-auto px-4 py-4 bg-black/80",
            expanded ? "justify-start" : "justify-center"
          )}
        >
          <div
            className={clsx(
              "min-w-[50px] overflow-hidden w-[50px] bg-white h-[50px] rounded-full shadow-md relative"
            )}
          >
            <img
              src={
                userInfo?.imagen ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfeBJTW2dVeUP1sq_zTYKDMrPmlvLdtTxb6A&usqp=CAU"
              }
              alt="User Image Icon"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {expanded && (
            <Link
              href={{
                pathname: isAdmin
                  ? appRoutes.adminProfile()
                  : appRoutes.empresaProfile(),
              }}
              className={clsx(
                "flex-grow flex w-full flex-col justify-center items-center gap-0"
              )}
            >
              <span className="max-w-full w-full truncate overflow-hidden text-white font-semibold text-base">
                {userInfo?.nombre}
              </span>
              <span className="max-w-full w-full truncate overflow-hidden text-gray-200 font-semibold text-sm">
                {handleGetRoleString()}
              </span>
            </Link>
          )}
          <div className="relative overflow-visible">
            {expanded && (
              <AvatarDropdown className="absolute bottom-full -right-full w-[260px] px-4 mt-3.5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
