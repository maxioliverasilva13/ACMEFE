import * as Yup from "yup";

export type CrearCategoriaForm = {
  name: string;
};

export enum CrearCategoriaFormFields {
  name = "name",
}

export const CrearCategoriaValidationSchema = () => Yup.object().shape({
  name: Yup.string().trim().required("El nombre es requerido"),
});
