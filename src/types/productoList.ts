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

export type ProductoList = {
  id: number;
  nombre: string;
  descripcion: string;
  documentoPdf: string;
  precio: number;
  tipoIva: TipoIvaLIst;
  categorias: CategoriaList[];
  imagenes: ImageList[];
};
