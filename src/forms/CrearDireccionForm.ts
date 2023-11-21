import * as Yup from "yup";

export type CrearDireccionForm = {
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudadId: number;
  activo?: boolean;
};

export enum CrearDireccionFormFields {
  calle = "calle",
  nroPuerta = "nroPuerta",
  calleEntre1 = "calleEntre1",
  calleEntre2 = "calleEntre2",
  ciudadId = "ciudadId",
  activo = "activo",
}

export const CrearDireccionValidationSchema = () =>
  Yup.object().shape({
    calle: Yup.string().trim().required("La calle es requerida"),
    nroPuerta: Yup.string().trim().required("El número de puerta es requerido"),
    calleEntre1: Yup.string().trim().required("La calle entre 1 es requerida"),
    calleEntre2: Yup.string().trim().required("La calle entre 2 es requerida"),
    ciudadId: Yup.number().min(1).required("La ciudad es requerida para su dirección"),
    activo: Yup.boolean(),
  });
