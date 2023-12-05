"use client";

import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import Header from "@/components/Header/Header";
import useGlobal from "@/hooks/useGlobal";
import WelcomeSvg from "@/images/Welcome.jpg";
import WelcomeTwo from "@/images/WelcomeTwo.jpg";
import NoImage from "@/images/noimage.jpg";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useListEmpresasQuery } from "@/store/service/EmpresaService";
import { useListarEstadsiticasSortQuery } from "@/store/service/EstadisticasService";
import {
  BuildingStorefrontIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { appRoutes } from "@/utils/appRoutes";
import { Route } from "next";

const Inicio = () => {
  const { data = [], isLoading: isLoadingEmpresas } = useListEmpresasQuery({});
  const { data: estadisticas, isLoading: isLoadingEstadisticas } =
    useListarEstadsiticasSortQuery({});
  const { number: numberEmpresasActivas } = useSpring({
    number: estadisticas?.empresasActivas,
    from: { number: 0 },
    delay: 1000,
    config: { duration: 2000 },
  });
  const { number: numberProductosVendidos } = useSpring({
    number: estadisticas?.productosVendidos,
    from: { number: 0 },
    delay: 1000,
    config: { duration: 2000 },
  });

  const { number: numberUsuariosActivos } = useSpring({
    number: estadisticas?.usuariosActivos,
    from: { number: 0 },
    delay: 1000,
    config: { duration: 2000 },
  });
  const controls = useAnimation();
  const [text, setText] = useState("");
  const { handleSetLoading } = useGlobal();

  async function animateText() {
    if (controls) {
      const originalText = "Bienvenido a ACME";
      for (let i = 0; i <= originalText.length; i++) {
        setText(originalText.slice(0, i));
        await controls.start({ opacity: 1, x: 0 });
      }
    }
  }
  useEffect(() => {
    animateText();
  }, []);

  useEffect(() => {
    handleSetLoading(isLoadingEmpresas || isLoadingEstadisticas);
  }, [isLoadingEmpresas, isLoadingEstadisticas]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start">
      <Header />

      <div className="w-full relative h-auto py-[250px] md:gap-10 gap-5 bg-gray-50 flex flex-row items-center justify-center md:px-10">
        <div className="w-full md:max-w-[400px] flex-grow h-auto flex flex-col items-start justify-center gap-4">
          <h1 className="max-w-full whitespace-break-spaces text-left font-semibold text-gray-700 text-[40px]">
            <motion.div animate={controls} initial={{ opacity: 0, x: 0 }}>
              {text}
            </motion.div>
          </h1>
          <span className="text-left text-base font-medium text-gray-600">
            Un gusto tenerte en ACME, compra miles de productos en nuestras
            tiendas asociadas, elije una de las siguientes tiendas para comprar
            productos en la misma
          </span>
          <ButtonPrimary
            onClick={() => {
              const empresasContainer = document.getElementById("empresas");
              if (empresasContainer) {
                empresasContainer.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
          >
            Explorar tiendas
          </ButtonPrimary>
        </div>
        <div className="flex w-auto h-auto">
          <div className="w-[400px] z-[2] relative h-[400px] rounded-full shadow-md">
            <Image
              className="rounded-full"
              alt="Welcome Two Image"
              src={WelcomeTwo}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-[55%] left-[55%]">
              <div className="w-[200px] z-[3] relative h-[200px] rounded-full overflow-hidden shadow-md">
                <Image
                  alt="Welcome Image"
                  src={WelcomeSvg}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[650px] h-auto rounded-full px-10 py-5 bg-gray-700 absolute top-[90%] flex flex-row items-start justify-center gap-4">
          <div className="flex-grow w-full max-w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="bg-gray-800 p-2 rounded-full">
              <BuildingStorefrontIcon color="white" width={20} />
            </div>
            <span className="text-center font-semibold text-sm text-white">
              Empresas Activas
            </span>
            <span className="font-normal text-xs text-gray-50 text-center">
              <span className="px-2 py-1 flex items-center justify-center text-center rounded-full font-semibold text-lg bg-gray-800">
                +
                <animated.span>
                  {numberEmpresasActivas.interpolate((val: any) =>
                    Math.floor(val)
                  )}
                </animated.span>
              </span>
            </span>
          </div>
          <div className="flex-grow  w-full max-w-fullh-full flex flex-col items-center justify-center gap-2">
            <div className="bg-gray-800 p-2 rounded-full">
              <PresentationChartLineIcon color="white" width={20} />
            </div>
            <span className="text-center font-semibold text-sm text-white">
              Productos vendidos
            </span>
            <span className="font-normal text-xs text-gray-50 text-center">
              <span className="px-2 py-1 flex items-center justify-center text-center rounded-full font-semibold text-lg bg-gray-800">
                +
                <animated.span>
                  {numberProductosVendidos.interpolate((val: any) =>
                    Math.floor(val)
                  )}
                </animated.span>
              </span>
            </span>
          </div>
          <div className="flex-grow w-full max-w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="bg-gray-800 p-2 rounded-full">
              <UserGroupIcon color="white" width={20} />
            </div>
            <span className="text-center font-semibold text-sm text-white">
              Usuarios activos
            </span>
            <span className="font-normal text-xs text-gray-50 text-center">
              <span className="px-2 py-1 flex items-center justify-center text-center rounded-full font-semibold text-lg bg-gray-800">
                +
                <animated.span>
                  {numberUsuariosActivos.interpolate((val: any) =>
                    Math.floor(val)
                  )}
                </animated.span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start flex-wrap gap-5 bg-[#363032]/80 py-10 px-10">
        <h2
          id="empresas"
          className="text-white text-[26px] font-bold mb-5 mt-[80px]"
        >
          Descubre millones de productos en nuestras tiendas
        </h2>

        {/* Empresa list */}
        <div className="w-full h-auto flex flex-row items-start justify-start gap-4">
          {data &&
            data?.map((empresa) => {
              return (
                <Link
                  href={appRoutes.tiendaHome(empresa?.id) as Route}
                  key={empresa?.id}
                >
                  <div className="flex w-full flex-row items-center justify-start gap-5 flex-wrap">
                    {/* Empresa items */}
                    <div className="w-[230px] transform hover:scale-105 transition-all group relative h-auto flex flex-col items-center justify-start p-5 rounded-2xl shadow-sm shadow-gray-400 bg-white">
                      <div className="w-full transition-all group-hover:blur-sm h-auto flex flex-col items-center justify-start">
                        <div className="w-full h-[120px] rounded-lg overflow-hidden relative">
                          <Image
                            className=""
                            alt="Welcome Two Image"
                            src={empresa?.imagen ?? NoImage}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="w-full mt-4 h-auto flex flex-row items-center justify-start">
                          <FiveStartIconForRate
                            withHover={false}
                            defaultPoint={3}
                          />
                          <span className="text-sm text-gray-600">{"(5)"}</span>
                        </div>
                        <span className="text-lg w-full text-left font-medium text-gray-700">
                          {empresa?.nombre}
                        </span>
                      </div>

                      <div className="w-full absolute h-full items-center justify-center hidden group-hover:flex">
                        <ButtonPrimary className="appears">
                          Ver tienda
                        </ButtonPrimary>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          {data?.length === 0 && (
            <span className="text-white font-medium">
              Ooops..!, no encontramos ninguna empresa
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
