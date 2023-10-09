import * as Yup from "yup";

export type ForgotPasswordForm = {
  email: string;
};

export enum ForgotPasswordFormFields {
  email = "email",
}

export const ForgotPasswordFormValidationForm = () =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("La contraseña es requerida")
      .email("Email invalido"),
  });
