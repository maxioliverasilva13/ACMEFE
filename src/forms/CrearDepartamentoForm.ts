import * as Yup from "yup";

export type CrearDepartamentoForm = {
  nombre: string;
};

export enum CrearDepartamentoFormFields {
  nombre = "nombre",
}

export enum departamentoDefaultValues {
  nombre = "",
}

export const CrearDepartamentoValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("Un nombre es requerido"),
  });
