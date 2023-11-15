export type Direccion = {
  id?: any;
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudadId: number;
};

export type DireccionDetail = {
  id?: any;
  nombre?: string;
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudadId: number;
  ciudadNombre?: string;
  ciudadDepartamentoId?: number;
  ciudadDepartamentoNombre?: string;
  activo: boolean;
};