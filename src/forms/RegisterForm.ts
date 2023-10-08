import * as Yup from "yup";

export type RegisterForm = {
  email: string;
  password: string;
  nombre: string;
  celular: string;
};

export enum RegisterFormFields {
  email = "email",
  password = "password",
  nombre = "nombre",
  celular = "celular",
}

export const RegisterValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Email invalido")
      .trim()
      .required("El email es requerido"),
    password: Yup.string().trim().required("La contraseña es requerida"),
    nombre: Yup.string().trim().required("El nombre es requerido"),
    celular: Yup.string().trim().required("El celular es requerido"),
  });
