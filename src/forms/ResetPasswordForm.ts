import * as Yup from "yup";

export type ResetPasswordForm = {
  confirmPassword: string;
  password: string;
};

export enum ResetPasswordFormFields {
  confirmPassword = "confirmPassword",
  password = "password",
}

export const ResetPasswordValidationForm = () =>
  Yup.object().shape({
    password: Yup.string()
      .required("La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (@$!%*?&)"
      ),
    confirmPassword: Yup.string()
      .required("La confirmación de contraseña es requerida")
      .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir"),
  });
