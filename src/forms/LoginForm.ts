import * as Yup from "yup";

export type LoginForm = {
  email: string;
  password: string;
};

export enum LoginFormFields {
  email = "email",
  password = "password",
}

export const LoginFormValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Email invalido")
      .trim()
      .required("El email es requerido"),
    password: Yup.string().trim().required("La contraseña es requerida"),
  });
