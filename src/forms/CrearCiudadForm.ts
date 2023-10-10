import * as Yup from "yup";

export type CrearCiudadForm = {
  nombre: string;
  departamentoId: number;
};

export enum CrearCiudadFormFields {
  nombre = "nombre",
  departamentoId = "departamentoId",
}

export enum ciudadDefaultValues {
  nombre = "",
  // departamentoId = 0,
}

export const CrearCiudadValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("Un nombre es requerido"),
    departamentoId: Yup.number().required("Un departamento es requerido"),
  });
