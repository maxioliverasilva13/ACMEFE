"use client";

import Text from "@/components/Table/components/Text";
import useGlobal from "@/hooks/useGlobal";
import { useListarEstadisticasEmpresaQuery } from "@/store/service/EstadisticasService";
import { useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import {
  StatCard,
  formatMetodosEnvio,
  formatMetodosPago,
  formatToSheet,
  formatVentasMensuales,
  formatVentasSemanal,
  lineOptions,
  pieOptions,
} from "@/utils/estadisticas";
import clsx from "clsx";
ChartJS.register(
  ArcElement,
  Tooltip,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
import React from "react";
import ExportExcel from "@/utils/excelExport";
import useEmpresa from "@/hooks/useEmpresa";

const VendedorHome = () => {
  const { handleSetLoading } = useGlobal();
  const { currentEmpresa } = useEmpresa();
  const { data: empresaStats, isLoading: isLoadingEmpresaStats } =
    useListarEstadisticasEmpresaQuery({});

  useEffect(() => {
    handleSetLoading(isLoadingEmpresaStats);
  }, [isLoadingEmpresaStats]);

  const mensualData: any =
    !isLoadingEmpresaStats && empresaStats
      ? formatVentasMensuales(empresaStats)
      : { datasets: [] };
  const semanalData: any =
    !isLoadingEmpresaStats && empresaStats
      ? formatVentasSemanal(empresaStats)
      : { datasets: [] };

  const metodosPagoPreferidosData: any =
    !isLoadingEmpresaStats && empresaStats
      ? formatMetodosPago(empresaStats)
      : { datasets: [] };

  const metodosEnvioPreferidosData: any =
    !isLoadingEmpresaStats && empresaStats
      ? formatMetodosEnvio(empresaStats)
      : { datasets: [] };

  const metodosPagoHasData =
    !isLoadingEmpresaStats &&
    empresaStats?.metodosPagoPreferidos &&
    Object.values(empresaStats.metodosPagoPreferidos).some(
      (cantidad) => cantidad > 0
    );

  const metodosEnvioHasData =
    !isLoadingEmpresaStats &&
    empresaStats?.metodosPagoPreferidos &&
    Object.values(empresaStats.metodosEnvioPreferidos).some(
      (cantidad) => cantidad > 0
    );

  return (
    <div className="relative flex flex-col gap-10 py-8 w-full h-full">
      <div className="absolute top-2 right-0">
        <ExportExcel
          excelData={formatToSheet(empresaStats)}
          archivoNombre={`Reporte de Estadísticas de la Empresa ${
            currentEmpresa?.nombre || ""
          }`}
          data={empresaStats}
        />
      </div>

      {/* Stat Cards Container */}
      <div className="flex flex-wrap gap-3 justify-around w-full">
        <StatCard
          title={"Productos Registrados"} // TOTAL EN EL SISTEMA, de esta empresa
          content={empresaStats?.productosRegistrados || 0}
        />
        <StatCard
          title={"Vendedores Activos"}
          content={empresaStats?.usuariosActivos || 0} // TOTAL EN EL SISTEMA, de esta empresa
        />
        <StatCard
          title={"Productos Vendidos"} // ESTE MES
          content={empresaStats?.productosVendidosEsteMes || 0}
        />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-12 w-full pb-5">
        <div className="flex flex-col items-center gap-2 w-full max-w-lg">
          <Text className="underline" message="Top 5 Productos más vendidos" />
          {empresaStats?.productosMasVendidos?.length ? (
            <>
              <div className="flex w-full justify-between px-10">
                <Text message="Nombre" />
                <Text message="Cantidad Vendida" />
              </div>
              <div className="flex flex-col w-full rounded-xl border overflow-hidden bg-slate-100">
                {empresaStats?.productosMasVendidos.map((producto, index) => (
                  <div
                    key={`producto-destacado-${index}`}
                    className={clsx(
                      "flex w-full justify-between px-10 py-4",
                      index % 2 != 0 && "bg-slate-300"
                    )}
                  >
                    <Text message={producto?.productoNombre} />
                    <Text message={producto?.cantidadVendida} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Text message="Actualmente la empresa no cuenta con ventas realizadas." />
          )}
        </div>
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
          <Text className="underline" message="Evolución Mensual de Ventas" />
          <Line datasetIdKey="id" data={mensualData} options={lineOptions} />
        </div>
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <Text className="underline" message="Método de Pago preferidos" />
          {metodosPagoHasData ? (
            <Pie
              datasetIdKey="id"
              data={metodosPagoPreferidosData}
              options={pieOptions}
            />
          ) : (
            <Text message="La empresa no cuenta con ventas activas." />
          )}
        </div>
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <Text className="underline" message="Método de Envío preferidos" />
          {metodosEnvioHasData ? (
            <Pie
              datasetIdKey="id"
              data={metodosEnvioPreferidosData}
              options={pieOptions}
            />
          ) : (
            <Text message="La empresa no cuenta con ventas activas." />
          )}
        </div>
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
          <Text className="underline" message="Evolución Semanal de Ventas" />
          <Line datasetIdKey="id" data={semanalData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default VendedorHome;
