import { SortCompra } from "./compra"
import { SortProduct } from "./producto"
import { SortUser } from "./usuario"

export enum EstadReclamo {
    activo = "ACTIVO",
    cerrado = "CERRADO",
}

export type Reclamo = {
    id: number;
    description: string;
    fecha: string;
    usuario: SortUser,
    estado: EstadReclamo,
    compra: SortCompra
}



