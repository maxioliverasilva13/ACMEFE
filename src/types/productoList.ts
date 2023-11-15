export type TipoIvaLIst = {
  id: number;
  nombre: string;
  porcentaje: number;
};

export type CategoriaList = {
  id: number;
  nombre: string;
};

export type ImageList = {
  id: number;
  url: string;
};

export type Calificacion = {
  calificacionId: number;
  descripcion: string;
  rate: number;
  usuarioImagen: string;
  usuarioNombre: string;
}

export type ProductoList = {
  id: number;
  cantCalificaciones: number;
  rate: number;
  nombre: string;
  descripcion: string;
  documentoPdf: string;
  precio: number;
  tipoIva: TipoIvaLIst;
  linkFicha?: string;
  activo: boolean;
  productosRelacionados: ProductoList[];
  createdAt: string;
  categorias: CategoriaList[];
  imagenes: ImageList[];
  calificaciones: Calificacion[],
};

export type ProductoCarrito = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  activo: boolean;
  tipoIva: TipoIvaLIst;
  fotos: ImageList[];
};

export type CarritoList = {
  id: number;
  cantidad: number;
  producto: ProductoCarrito,
};

