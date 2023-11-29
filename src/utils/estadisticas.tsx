import Text from "@/components/Table/components/Text";
import { EstadisticasAdmin, EstadisticasEmpresa } from "@/types/estadisticas";

export const StatCard = ({
  title,
  content,
}: {
  title: string;
  content: any;
}) => {
  return (
    <div className="flex flex-col items-center gap-1 w-full max-w-sm px-12 py-8 rounded-2xl shadow-xl bg-gray-900/70">
      <Text message={title} className="text-lg !text-white" />
      <Text message={content} className="text-xl font-semibold !text-white" />
    </div>
  );
};

export const formatVentasMensuales = (
  stats: EstadisticasAdmin | EstadisticasEmpresa
) => {
  const labels: string[] = [];
  const data: number[] = [];

  if (stats && stats.ventasPorMes) {
    stats.ventasPorMes.forEach((venta) => {
      if (venta && venta.mes && venta.cantidadVentas !== undefined) {
        labels.push(venta.mes);
        data.push(venta.cantidadVentas);
      }
    });
  }
  const chartData = {
    labels,
    datasets: [
      {
        label: "ventas",
        data,
        borderWidth: 1,
      },
    ],
  };
  return chartData;
};

export const formatVentasByEmpresas = (stats: EstadisticasAdmin) => {
  const labels: string[] = [];
  const data: number[] = [];

  stats.ventasMensualesPorEmpresa.forEach((venta) => {
    labels.push(venta.empresaNombre);
    data.push(venta.cantidadVentasMesActual);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Ventas",
        data: data,
        borderWidth: 1,
      },
    ],
  };
};

export const pieOptions = {
  plugins: {
    datalabels: {
      formatter: (value: any, ctx: any) => {
        const datapoints = ctx.chart.data.datasets[0].data;
        const total = datapoints.reduce(
          (total: any, datapoint: any) => total + datapoint,
          0
        );
        const percentage = (value / total) * 100;
        return `${percentage.toFixed(2)}% (${value})`;
      },
      color: "#fff",
    },
  },
};

export const lineOptions = {
  plugins: {
    datalabels: {
      display: false,
    },
  },
};
