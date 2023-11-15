import * as Yup from "yup";

export type PaymentForm = {
  card: string;
  cvc: string;
  expiration: string;
  titular: string;
};

export enum PaymentFormFields {
  card = "card",
  cvc = "cvc",
  expiration = "expiration",
  titular = "titular",
}

export const PaymentFormValidationSchema = () =>
  Yup.object().shape({
    card: Yup.string()
      .trim()
      .matches(/^\d{16}$/, "El número de tarjeta debe contener 16 dígitos")
      .required("El número de tarjeta es requerido"),
    cvc: Yup.string()
      .matches(/^\d{3,4}$/, "El CVC debe contener 3 o 4 dígitos")
      .required("El CVC es requerido"),
    expiration: Yup.string()
      .trim()
      .matches(
        /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
        "La fecha de expiración debe tener el formato MM/YY"
      )
      .required("La fecha de expiración es requerida"),
    titular: Yup.string().trim().required("El titular es requerido"),
  });
