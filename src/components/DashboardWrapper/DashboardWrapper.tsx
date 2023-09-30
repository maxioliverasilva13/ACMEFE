"use client";
import { usePathname } from "next/navigation";
import Dashboard from "../Dashboard/Dashboard";

interface Props {
  children: any;
}

const DashboardWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  // todo: change this to a real validation
  const isAdminOrEmpresa =
    pathname?.includes("/admin") || pathname?.includes("/empresa");

  if (isAdminOrEmpresa) {
    return (
      <div className="w-screen h-screen flex flex-row items-start justify-start">
        <Dashboard />
        <div className="w-full p-4 flex-grow h-full max-h-full overflow-auto bg-gray-900/10">
          {children}
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export default DashboardWrapper;
