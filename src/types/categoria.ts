export type Categoria = {
  id: number;
  nombre: string;
  productos: number;
};

export type CategoriaList = {
  categoriaNombre: string;
  categoriaId: number;
  cantidadProductos: number;
};

export type CategoriaDestacada = {
  id?: number;
  nombre: string;
  imagenUrl?: string;
  categoriaId: number;
};
