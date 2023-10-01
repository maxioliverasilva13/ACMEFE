import { SortProduct } from "./producto"
import { SortUser } from "./usuario"

export enum EstadReclamo {
    activo = "Activo",
    cerrado = "Cerrado",
}

export type Reclamo = {
    fecha: string,
    producto: SortProduct,
    usuario: SortUser,
    description: string,
    estado: EstadReclamo,
}