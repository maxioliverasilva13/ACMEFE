import { CategoriaDestacada } from "./categoria";

export type LookAndFeel = {
  id?: any;
  nombreSitio: string;
  logoUrl: string;
  colorPrincipal: string;
  colorSecundario: string;
  colorFondo: string;
  categoriaDestacada: CategoriaDestacada | null;
};
