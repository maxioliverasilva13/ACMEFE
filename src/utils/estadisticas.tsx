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

export const formatVentasSemanal = (stats: EstadisticasEmpresa) => {
  const labels: string[] = [];
  const data: number[] = [];

  if (stats && stats.ventasUltimaSemana) {
    stats.ventasUltimaSemana.forEach((venta) => {
      if (venta && venta.dia && venta.cantidadVentas !== undefined) {
        labels.push(venta.dia);
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

export const formatMetodosPago = (empresaStats: EstadisticasEmpresa) => {
  const labels: string[] = [];
  const data: number[] = [];

  const metodosPago: any = empresaStats.metodosPagoPreferidos;

  Object.keys(metodosPago).forEach((metodoNombre) => {
    switch (metodoNombre) {
      case "tarjeta":
        labels.push("Tarjeta");
        break;
      case "wallet":
        labels.push("Wallet");
        break;
      case "mercadoPago":
        labels.push("Mercado Pago");
        break;
      default:
        labels.push(metodoNombre);
        break;
    }
    data.push(metodosPago[metodoNombre]);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Compras utilizando este método de pago",
        data: data,
        borderWidth: 1,
      },
    ],
  };
};

export const formatMetodosEnvio = (empresaStats: EstadisticasEmpresa) => {
  const labels: string[] = [];
  const data: number[] = [];

  const metodosEnvio: any = empresaStats.metodosEnvioPreferidos;

  Object.keys(metodosEnvio).forEach((metodoNombre) => {
    switch (metodoNombre) {
      case "direccionPropia":
        labels.push("Direccion Propia");
        break;
      case "retiroPickup":
        labels.push("Retira en Pickup");
        break;
      default:
        labels.push(metodoNombre);
        break;
    }
    data.push(metodosEnvio[metodoNombre]);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Compras utilizando este método de envío",
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


export const formatToSheet = (empresaStats: EstadisticasEmpresa | undefined) => {
  // Crear una matriz que represente tus datos en filas
  const rows = [];

  // Encabezados
  const headers = ["Tipo de Dato", "Valor"];
  rows.push(headers);

  // Función auxiliar para añadir datos al array rows
  const addData = (tipoDato: any, valor: any) => {
    rows.push([tipoDato, valor]);
  };

  // Agregar un espacio vacío entre secciones para mejorar la legibilidad
  const addEmptyRow = () => {
    rows.push(["", ""]);
  };

  // Productos vendidos este mes
  addData("Productos Vendidos Este Mes", empresaStats?.productosVendidosEsteMes);

  // Productos registrados
  addData("Productos Registrados", empresaStats?.productosRegistrados);

  // Usuarios activos
  addData("Usuarios Activos", empresaStats?.usuariosActivos);

  addEmptyRow();

  // Métodos de pago preferidos
  addData("Método de Pago - MercadoPago", empresaStats?.metodosPagoPreferidos.mercadoPago);
  addData("Método de Pago - Tarjeta", empresaStats?.metodosPagoPreferidos.tarjeta);
  addData("Método de Pago - Wallet", empresaStats?.metodosPagoPreferidos.wallet);

  addEmptyRow();

  // Métodos de envío preferidos
  addData("Método de Envío - DireccionPropia", empresaStats?.metodosEnvioPreferidos.direccionPropia);
  addData("Método de Envío - RetiroPickup", empresaStats?.metodosEnvioPreferidos.retiroPickup);

  addEmptyRow();

  // Productos más vendidos
  empresaStats?.productosMasVendidos.forEach(producto => {
    addData(`Producto Más Vendido - ${producto.productoId} - ${producto.productoNombre}`, producto.cantidadVendida);
  });

  addEmptyRow();

  // Ventas por mes
  empresaStats?.ventasPorMes.forEach(venta => {
    addData(`Ventas - ${venta.mes}`, venta.cantidadVentas);
  });

  addEmptyRow();

  // Ventas última semana
  empresaStats?.ventasUltimaSemana.forEach(venta => {
    addData(`Ventas - ${venta.dia}`, venta.cantidadVentas);
  });

  // Formatear el objeto en un formato aceptado por xlsx.utils.json_to_sheet
  const data = rows.reduce((acc: any, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  return [data];
};