import * as Yup from "yup";

export type CrearTipoIvaForm = {
  nombre: string;
  porcentaje: number;
};

export enum CrearTipoIvaFormFields {
  nombre = "nombre",
  porcentaje = "porcentaje",
}

export enum tipoIvaDefaultValues {
  nombre = "",
  porcentaje = 0,
}

export const CrearTipoIvaValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("Un nombre es requerido"),
    porcentaje: Yup.number().required("El porcentaje de IVA es requerido"),
    // porcentaje: Yup.number().required("El porcentaje de IVA es requerido").test(
    //   'is-decimal',
    //   'invalid decimal',
    //   value => ((value + "").match(/^\d*\.{1}\d*$/) || (value + "").match(/^\d*\,{1}\d*$/) || (value%2 == 0)) as any,
    // ),
  });
