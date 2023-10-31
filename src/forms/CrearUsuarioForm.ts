import * as Yup from "yup";

export type CrearUsuarioForm = {
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudadId: number;
};

export enum CrearUsuarioFormFields {
  nombre = "nombre",
  apellido = "apellido",
  celular = "celular",
  email = "email",
  calle = "calle",
  nroPuerta = "nroPuerta",
  calleEntre1 = "calleEntre1",
  calleEntre2 = "calleEntre2",
  ciudadId = "ciudadId",
}

export const CrearUsuarioValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("El nombre es requerido"),
    apellido: Yup.string().trim().required("El apellido es requerido"),
    celular: Yup.string().trim().required("El teléfono es requerido"),
    email: Yup.string()
      .trim()
      .email("Email invalido")
      .required("El email es requerido"),
    calle: Yup.string().trim().required("La calle es requerida"),
    nroPuerta: Yup.string().trim().required("El número de puerta es requerido"),
    calleEntre1: Yup.string().trim().required("La calle entre 1 es requerida"),
    calleEntre2: Yup.string().trim().required("La calle entre 2 es requerida"),
    ciudadId: Yup.number().min(1).required("La ciudad es requerida para su dirección"),
  });
