import * as Yup from "yup";

export type CrearPickupForm = {
  nombre: string;
  telefono: string;
  plazoDiasPreparacion: number;
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudad: number;
  departamento: number;
};

export enum CrearPickupFormFields {
  nombre = "nombre",
  telefono = "telefono",
  plazoDiasPreparacion = "plazoDiasPreparacion",
  calle = "calle",
  nroPuerta = "nroPuerta",
  calleEntre1 = "calleEntre1",
  calleEntre2 = "calleEntre2",
  ciudad = "ciudad",
  departamento = "departamento",
}

export const CrearPickupFormValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("Este campo es requerido"),
    telefono: Yup.string().trim().required("Este campo es requerido"),
    plazoDiasPreparacion: Yup.number().required("Este campo es requerido"),
    calle: Yup.string().trim().required("Este campo es requerido"),
    nroPuerta: Yup.string().trim().required("Este campo es requerido"),
    calleEntre1: Yup.string().trim().required("Este campo es requerido"),
    calleEntre2: Yup.string().trim().required("Este campo es requerido"),
    ciudad: Yup.number().required("Este campo es requerido"),
    departamento: Yup.number().required("Este campo es requerido"),
  });
