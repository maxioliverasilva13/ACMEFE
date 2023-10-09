import * as Yup from "yup";

export type RegisterForm = {
  email: string;
  nombre: string;
  celular: string;
};

export enum RegisterFormFields {
  email = "email",
  nombre = "nombre",
  celular = "celular",
}

export const RegisterValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Email invalido")
      .trim()
      .required("El email es requerido"),
    nombre: Yup.string().trim().required("El nombre es requerido"),
    celular: Yup.string().trim().required("El celular es requerido"),
  });
