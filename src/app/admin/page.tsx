"use client";

import Text from "@/components/Table/components/Text";
import useGlobal from "@/hooks/useGlobal";
import {
  useListarEstadisticasAdminQuery,
  useListarEstadsiticasSortQuery,
} from "@/store/service/EstadisticasService";
import { useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import {
  StatCard,
  formatVentasByEmpresas,
  formatVentasMensuales,
  lineOptions,
  pieOptions,
} from "@/utils/estadisticas";
ChartJS.register(
  ArcElement,
  Tooltip,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ChartDataLabels
);

const AdminHome = () => {
  const { handleSetLoading } = useGlobal();
  const {
    data: estadisticas,
    isLoading: isLoadingEstadisticas,
  } = useListarEstadsiticasSortQuery({});

  const {
    data: adminStats,
    isLoading: isLoadingAdminStats,
  } = useListarEstadisticasAdminQuery({});

  useEffect(() => {
    handleSetLoading(isLoadingEstadisticas || isLoadingAdminStats);
  }, [isLoadingEstadisticas, isLoadingAdminStats]);

  const ventasMensuales: any =
    !isLoadingAdminStats && adminStats
      ? formatVentasMensuales(adminStats)
      : { datasets: [] };

  const ventasByEmpresas: any =
    !isLoadingAdminStats && adminStats
      ? formatVentasByEmpresas(adminStats)
      : { datasets: [] };

  const pieHasData =
    !isLoadingAdminStats && adminStats?.ventasMensualesPorEmpresa.length;
  return (
    <div className="flex flex-col gap-10 py-8 w-full h-full">
      {/* Stat Cards Container */}
      <div className="flex flex-wrap gap-3 justify-around w-full">
        <StatCard
          title={"Empresas Registradas"}
          content={estadisticas?.empresasActivas || 0}
        />
        <StatCard
          title={"Usuarios Activos"}
          content={estadisticas?.usuariosActivos || 0}
        />
        <StatCard
          title={"Ventas Concretadas"}
          content={estadisticas?.productosVendidos || 0}
        />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-12 w-full">
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <Text className="underline" message="Distr. de Ventas por Empresa este mes" />
          {pieHasData ? (
            <Pie
              datasetIdKey="id"
              data={ventasByEmpresas}
              options={pieOptions}
            />
          ) : (
            <Text message="Este mes no cuenta con ventas activas." />
          )}
        </div>
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
          <Text className="underline" message="Evolución Mensual de Ventas" />
          <Line
            datasetIdKey="id"
            data={ventasMensuales}
            options={lineOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
