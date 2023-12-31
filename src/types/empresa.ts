import { LookAndFeel } from "./lookAndFeel";

export type Empresa = {
  id?: any;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  imagen: string;
  costoEnvio: number;
  diasEmail?: number;
  wallet: string;
  lookAndFeel: LookAndFeel;
};
