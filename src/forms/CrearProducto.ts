import * as Yup from "yup";

export type CrearProductoForm = {
  nombre: string;
  titulo: string;
  descripcion: string;
  documentoPdf?: string;
  linkAcata?: string;
  precio: number;
  tipoIva: number;
};

export enum CrearProductoFormFields {
  nombre = "nombre",
  titulo = "titulo",
  descripcion = "descripcion",
  documentoPdf = "documentoPdf",
  linkAcata = "linkAcata",
  precio = "precio",
  tipoIva = "tipoIva",
}

export const CrearProductoValidationSchema = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required("El Nombre es requerido"),
    titulo: Yup.string().trim().required("El Titulo es requerido"),
    descripcion: Yup.string().trim().required("La Descripcion es requerida"),
    documentoPdf: Yup.string().trim(),
    linkAcata: Yup.string().trim(),
    precio: Yup.number().required("El Precio es requerido"),
    tipoIva: Yup.number().required("El Tipo Iva es requerido"),
  });
