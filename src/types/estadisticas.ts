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
  productosVendidosEsteMes: number; // simple contador prods este mes
  productosMasVendidos: ProductoMasVendidoItem[]; // detalle top productos
  ventasPorMes: VentasMes[]; // cantidad ventas mes a mes en esta empresa
  ventasUltimaSemana: VentasDia[]; // cantidad ventas por dia, en esta semana para esta empresa
  metodosPagoPreferidos: MetodosPago; // contadores de ventas para cada método de pago
  metodosEnvioPreferidos: MetodosEnvio; // contadores de ventas para cada método de envío
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

export type VentasDia = {
  dia: string;
  cantidadVentas: number;
};

export type VentaMensualEmpresa = {
  empresaId: number;
  empresaNombre: string;
  cantidadVentasMesActual: number;
};

export type MetodosPago = {
  mercadoPago: number;
  tarjeta: number;
  wallet: number;
};

export type MetodosEnvio = {
  direccionPropia: number;
  retiroPickup: number;
};