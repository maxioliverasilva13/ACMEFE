export type EstadisticasSort = {
  usuariosActivos: number;
  empresasActivas: number;
  productosVendidos: number;
};

export type EstadisticasAdmin = {
  productosVendidosEsteMes: number;
  productosMasVendidos: ProductoMasVendidoItem[];
  ventasPorMes: VentasMes[];
  ventasMensualesPorEmpresa: VentaMensualEmpresa[];
};

export type EstadisticasEmpresa = {
  usuariosActivos: number; // total en el sistema de esa empresa
  productosRegistrados: number; // total en el sistema de esa empresa
  productosVendidosEsteMes: number; // cantidad
  productosMasVendidos: ProductoMasVendidoItem[]; // detalle top productos
  ventasPorMes: VentasMes[]; // cantidad ventas mes a mes en esta empresa
};

export type ProductoMasVendidoItem = {
  productoId: number;
  empresaId: number;
  productoNombre: string;
  cantidadVendida: number;
};

export type VentasMes = {
  mes: string;
  cantidadVentas: number;
};

export type VentaMensualEmpresa = {
  empresaId: number;
  empresaNombre: string;
  cantidadVentasMesActual: number;
};