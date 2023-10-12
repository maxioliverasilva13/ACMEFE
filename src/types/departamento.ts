import { Ciudad } from "./ciudad";

export type Departamento = {
  id?: number;
  nombre: string;
  ciudades?: Ciudad[];
};
