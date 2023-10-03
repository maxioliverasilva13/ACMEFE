import * as Yup from "yup";

export type CrearEmpresaForm = {
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  costoEnvio: number;
  wallet: string;
};

export enum CrearEmpresaFormFields {
  nombre = "nombre",
  direccion = "direccion",
  telefono = "telefono",
  correo = "correo",
  costoEnvio = "costoEnvio",
  wallet = "wallet",
}

export const CrearEmpresaValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es requerido"),
    direccion: Yup.string().trim().required("La dirección es requerida"),
    telefono: Yup.string().trim().required("El telefono es requerido"),
    costoEnvio: Yup.number().required("La costo de envio es requerido"),
    wallet: Yup.string().trim().required("La wallet es requerida"),
    correo: Yup.string()
      .trim()
      .email("Correo inválido")
      .required("El correo es requerido"),
  });
