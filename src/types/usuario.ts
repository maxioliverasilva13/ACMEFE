import { Direccion } from "./direccion";

export type Usuario = {
  id?: any;
  imagen: string;
  nombre: string;
  celular: string;
  calle: string;
  calificaciones: number;
  email?: string;
};


export type SortUser = {
  email: string,
  nombre: string,
  imagen: string,
  tel: string,
}

export type UsuarioCreate = {
  id?: any;
  nombre: string;
  celular: string;
  imagen: string;
  email: string;
  empresaId: number;
  direccion: Direccion;
};
