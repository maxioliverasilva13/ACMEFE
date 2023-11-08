"use client";

import useGlobal from "@/hooks/useGlobal";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useLazyCurrentUserQuery } from "@/store/service/UserService";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";
import {
  adminRoutes,
  empresaRoutes,
  public_routes,
  userRoutes,
} from "@/utils/routes";
import Page404 from "@/app/not-found";
import { handleClearToken } from "@/utils/token";
import useEmpresa from "@/hooks/useEmpresa";

interface Props {
  children: any;
  params?: any;
}

const SessionWrapper = ({ children, params }: Props) => {
  const { loading, token, userInfo, handleSetUserInfo, handleSetLoading, handleSetToken } =
    useGlobal();
  const { push } = useRouter();
  const pathname = usePathname();
  const isInPublicRoute = public_routes.includes(pathname);
  const [checking, setChecking] = useState(true);
  const [invalidPath, setInvalidPath] = useState(false);
  const router = useRouter();
  const slugs = useParams();

  const { currentEmpresa } = useEmpresa();
  const isInAdminRoute = adminRoutes.includes(pathname);
  const isInEmpresaRoute = empresaRoutes.includes(pathname);
  const userRoute = currentEmpresa && !isInAdminRoute && !isInEmpresaRoute;

  let empresaStyles = {};
  if (userRoute) {
    empresaStyles = {
      backgroundColor: currentEmpresa.lookAndFeel.colorFondo,
    };
  }



  const [handleGetUserInfo, { isLoading }] = useLazyCurrentUserQuery();

  // useEffect(() => {
  //   if (isInPublicRoute) {
  //     setInvalidPath(true);
  //   }
  // }, [pathname])

  const handleLoadUserInfo = async () => {
    handleSetLoading(true);
    const resp = await handleGetUserInfo({});
    const user = resp?.data?.user;
    if (user) {
      handleSetUserInfo(user);
      if (isInPublicRoute) {
        if (user?.roles?.includes("Admin")) {
          push(appRoutes.adminInicio() as Route);
        } else if (user?.roles?.includes("Vendedor")) {
          push(appRoutes.empresaInico() as Route);
        } else {
          push(appRoutes.userInicio() as Route);
        }
      }
      setChecking(false);
    } else {
      setChecking(false);
      toast.error("Error validando usuario");
      handleSetToken(undefined);
      handleClearToken();
    }
    handleSetLoading(false);
  };

  useEffect(() => {
    if (isInPublicRoute && !userInfo && !isLoading) {
      setChecking(false);
    }
  }, [isInPublicRoute, userInfo, isLoading]);

  // useEffect(() => {
  //   setChecking(false);
  // }, [pathname])

  useEffect(() => {
    if (token && token !== "") {
      handleLoadUserInfo();
    }
    if (token === null || token === undefined || token === "") {
      if (!isInPublicRoute) {
        push(appRoutes.login() as Route);
      }
    }
  }, [token, pathname]);

  const handleCheckRoutes = () => {
    if (!isInPublicRoute) {
      if (userInfo?.roles?.includes("Admin")) {
        const isValidPath = adminRoutes?.find((itm) => {
          return pathname?.includes(itm);
        })
        setInvalidPath(!isValidPath);
      } else if (userInfo?.roles?.includes("Vendedor")) {
        const isValidPath = empresaRoutes?.find((itm) => {
          return pathname?.includes(itm);
        })
        setInvalidPath(!isValidPath);
      } else {
        const isValidPath = userRoutes?.find((itm) => {
          return pathname?.includes(itm);
        })
        setInvalidPath(!isValidPath);
      }
      setChecking(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      handleCheckRoutes();
    }
  }, [pathname, userInfo]);

  if (checking) {
    return null;
  }

  if (invalidPath) {
    return <Page404 />;
  }

  return (
    <div style={empresaStyles} className="bg-white w-full h-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[5000000]"
        theme="light"
      />
      {loading && <Spinner />}
      {children}
    </div>
  );
};

export default SessionWrapper;
