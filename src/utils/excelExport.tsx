import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { EstadisticasEmpresa } from "@/types/estadisticas";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

type ExcelProps = {
  excelData: any;
  archivoNombre: string;
  data: EstadisticasEmpresa | undefined;
};

const ExportExcel = ({ archivoNombre, data }: ExcelProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const formatDataForExport = () => {
    if (!data) {
      alert("Error al obtener las estadisticas de la empresa.");
      return null;
    }
    const wb = XLSX.utils.book_new();

    // sheet contadores
    const countersSheet = XLSX.utils.aoa_to_sheet([
      [
        "Productos Vendidos Este Mes",
        "Cantidad Productos Registrados",
        "Vendedores Activos",
      ],
      [
        data.productosVendidosEsteMes,
        data.productosRegistrados,
        data.usuariosActivos,
      ],
    ]);

    countersSheet["!cols"] = [{ wch: 25 }, { wch: 27 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, countersSheet, "Indicadores Generales");

    // sheet productos mas vendidos
    const productsSheetData = [
      ["Producto ID", "Empresa ID", "Nombre Producto", "Cantidad Vendida"],
    ];
    data.productosMasVendidos.forEach((product) => {
      productsSheetData.push([
        product.productoId.toString(),
        product.empresaId.toString(),
        product.productoNombre,
        product.cantidadVendida.toString(),
      ]);
    });
    const productsSheet = XLSX.utils.aoa_to_sheet(productsSheetData);

    productsSheet["!cols"] = [
      { wch: 10 },
      { wch: 10 },
      { wch: 40 },
      { wch: 15 },
    ];
    XLSX.utils.book_append_sheet(
      wb,
      productsSheet,
      "Top Productos más Vendidos"
    );

    // sheet ventas mendsuales
    const salesByMonthData = [["Mes", "Cantidad de Ventas"]];
    data.ventasPorMes.forEach((sale) => {
      salesByMonthData.push([sale.mes, sale.cantidadVentas.toString()]);
    });
    const salesByMonthSheet = XLSX.utils.aoa_to_sheet(salesByMonthData);

    salesByMonthSheet["!cols"] = [{ wch: 10 }, { wch: 17 }];
    XLSX.utils.book_append_sheet(wb, salesByMonthSheet, "Ventas por Mes");

    // sheet ventas ultima semana
    const salesLastWeekData = [["Día", "Cantidad de Ventas"]];
    data.ventasUltimaSemana.forEach((sale) => {
      salesLastWeekData.push([sale.dia, sale.cantidadVentas.toString()]);
    });
    const salesLastWeekSheet = XLSX.utils.aoa_to_sheet(salesLastWeekData);

    salesLastWeekSheet["!cols"] = [{ wch: 17 }, { wch: 17 }];
    XLSX.utils.book_append_sheet(
      wb,
      salesLastWeekSheet,
      "Ventas Última Semana"
    );

    // sheet métrodos de pago preferidos
    const metodosPagoSheet = XLSX.utils.aoa_to_sheet([
      ["Mercado Pago", "Tarjeta", "Wallet"],
      [
        data.metodosPagoPreferidos.mercadoPago,
        data.metodosPagoPreferidos.tarjeta,
        data.metodosPagoPreferidos.wallet,
      ],
    ]);
    metodosPagoSheet["!cols"] = [{ wch: 14 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(
      wb,
      metodosPagoSheet,
      "Métodos de Pago Preferidos"
    );

    // sheet métrodos de envío preferidos
    const metodosEnvioSheet = XLSX.utils.aoa_to_sheet([
      ["Dirección Propia", "Retiro Pickup"],
      [
        data.metodosEnvioPreferidos.direccionPropia,
        data.metodosEnvioPreferidos.retiroPickup,
      ],
    ]);
    metodosEnvioSheet["!cols"] = [{ wch: 16 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(
      wb,
      metodosEnvioSheet,
      "Métodos de Envío Preferidos"
    );

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(file, archivoNombre + fileExtension);
  };

  return (
    <ButtonPrimary className="!bg-green-700 !py-3 !px-3" onClick={() => formatDataForExport()}>
      <DocumentArrowDownIcon width={24} height={24} /> Exportar Reporte
    </ButtonPrimary>
  );
};

export default ExportExcel;
