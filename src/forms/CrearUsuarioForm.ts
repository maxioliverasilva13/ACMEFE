import * as Yup from "yup";

export type CrearUsuarioForm = {
  name: string;
  lastname: string;
  tel: string;
  dir: string;
  email: string;
};

export enum CrearUsuarioFormFields {
  name = "name",
  lastname = "lastname",
  tel = "tel",
  dir = "dir",
  email = "email",
}

export const CrearUsuarioValidationSchema = () => Yup.object().shape({
  name: Yup.string().trim().required("El nombre es requerido"),
  lastname: Yup.string().trim().required("El apellido es requerido"),
  tel: Yup.string().trim().required("El telefono es requerido"),
  dir: Yup.string().trim().required("La direccion es requerida"),
  email: Yup.string().trim().email("Email invalido").required("El email es requerido"),
});
