import * as Yup from "yup";

export type UpdateUserForm = {
  nombre: string;
  telefono: string;
};

export enum UpdateUserFormFields {
  nombre = "nombre",
  telefono = "telefono",
}

export const UpdateUserValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es requerido."),
    telefono: Yup.string().trim().required("El número de celular es requerido."),
  });
